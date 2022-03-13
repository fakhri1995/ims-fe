import isToday from "date-fns/isToday";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { useAxiosClient } from "hooks/use-axios-client";

import { AuthService, AuthServiceQueryKeys } from "apis/auth";

import { AttendanceActivityServivce } from "./attendance-activity.service";
import {
  AttendanceActivityQueryKeys,
  IAddAttendanceActivityPayload,
} from "./attendance-activity.types";
import { AttendanceFormAktivitasService } from "./attendance-form-aktivitas.service";
import {
  AttendanceFormAktivitasServiceQueryKeys,
  FormAktivitasTypes,
  IAddAttendanceFormPayload,
  IAddUserAttendanceFormPayload,
  IRemoveUserAttendanceFormPayload,
  IUpdateAttendanceFormPayload,
} from "./attendance-form-aktivitas.types";
import { AttendanceService } from "./attendance.service";
import {
  AttendanceServiceQueryKeys,
  ISetAttendanceTogglePayload,
} from "./attendance.types";

/**
 * Custom mutation hook to add new Form Aktivitas data and trigger
 *  cache invalidation on succeed.
 *
 * It's used just to add new form aktivitas.
 */
export const useAddFormAktivitas = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation(
    (payload: IAddAttendanceFormPayload) =>
      AttendanceFormAktivitasService.add(axiosClient, payload),
    {
      onSuccess: () => {
        /** NOTE: do not return anything. Let it run asynchronously!!! */
        queryClient.invalidateQueries(
          AttendanceFormAktivitasServiceQueryKeys.FIND
        );
      },
    }
  );
};

export const useUpdateFormAktivitas = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation(
    (payload: IUpdateAttendanceFormPayload) =>
      AttendanceFormAktivitasService.update(axiosClient, payload),
    {
      onSuccess: (_, payload) => {
        queryClient.invalidateQueries([
          AttendanceFormAktivitasServiceQueryKeys.FIND_ONE,
          payload.id,
        ]);
      },
    }
  );
};

/**
 * @param redirectTo Halaman ketika operasi delete berhasil.
 */
export const useDeleteFormAktivitas = (redirectTo: string) => {
  const router = useRouter();
  const axiosClient = useAxiosClient();

  return useMutation(
    (formAktivitasId: number) =>
      AttendanceFormAktivitasService.remove(axiosClient, formAktivitasId),
    {
      onSuccess: () => {
        router.push(redirectTo);
      },
    }
  );
};

export const useDeleteFormAktivitasStaff = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation(
    (payload: IRemoveUserAttendanceFormPayload) =>
      AttendanceFormAktivitasService.removeUsers(axiosClient, payload),
    {
      onSuccess: (_, payload) => {
        queryClient.invalidateQueries([
          AttendanceFormAktivitasServiceQueryKeys.FIND_ONE,
          payload.id,
        ]);
      },
    }
  );
};

export const useAddFormAktivitasStaff = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation(
    (payload: IAddUserAttendanceFormPayload) =>
      AttendanceFormAktivitasService.addUsers(axiosClient, payload),
    {
      onSuccess: (_, payload) => {
        queryClient.invalidateQueries([
          AttendanceFormAktivitasServiceQueryKeys.FIND_ONE,
          payload.id,
        ]);
      },
    }
  );
};

/**
 * Custom hook untuk retrieve data Kehadiran untuk user yang login saat ini.
 *
 * Hook ini juga ditambah logic untuk memastikan bahwa user sudah login hari ini dan
 *  logic untuk memastikan status kehadiran user. Apakah saat ini user sedang checked in atau checked out.
 */
export const useGetAttendeeInfo = () => {
  const axiosClient = useAxiosClient();

  const [hasCheckedInToday, setHasCheckedInToday] = useState<
    boolean | undefined
  >(undefined);
  const [attendeeStatus, setAttendeeStatus] = useState<
    "checkout" | "checkin" | undefined
  >(undefined);
  const [isItSafeToCheckOut, setIsItSafeToCheckOut] = useState(false);

  const { data: userAttendanceForm } = useQuery(
    AuthServiceQueryKeys.DETAIL_PROFILE,
    () => AuthService.whoAmI(axiosClient),
    {
      select: (response) => response.data.data.attendance_forms,
    }
  );

  const { data: todayActivitiesLength } = useQuery(
    AttendanceActivityQueryKeys.FIND,
    () => AttendanceActivityServivce.find(axiosClient),
    {
      enabled: !!userAttendanceForm,
      select: (response) => {
        if (!userAttendanceForm || userAttendanceForm.length === 0) {
          return 0;
        }

        const userAttendanceFormId = userAttendanceForm[0].id;
        const userTodayActivities = response.data.data.today_activities.filter(
          (activity) => activity.attendance_form_id === userAttendanceFormId
        );

        return userTodayActivities.length;
      },
    }
  );

  const { data: attendancesLog } = useQuery(
    AttendanceServiceQueryKeys.ATTENDANCES_USER_GET,
    () => AttendanceService.find(axiosClient),
    {
      select: (response) => response.data.data,
    }
  );

  useEffect(() => {
    setIsItSafeToCheckOut(todayActivitiesLength > 0);
  }, [todayActivitiesLength]);

  useEffect(() => {
    if (!attendancesLog) {
      return;
    }

    /** Special case: when the user is new or the data is just empty */
    if (attendancesLog.user_attendances.length === 0) {
      setHasCheckedInToday(false);
      setAttendeeStatus("checkout");

      return;
    }

    /**
     * Backend guarantee kalau index === 0 adalah data / log check in dan check out
     *  paling terbaru (sorted by time).
     */
    const latestAttendanceData = attendancesLog.user_attendances[0];
    const latestCheckInTime = new Date(latestAttendanceData.check_in);

    setHasCheckedInToday(isToday(latestCheckInTime));
    setAttendeeStatus(
      latestAttendanceData.check_out === null ? "checkin" : "checkout"
    );
  }, [attendancesLog]);

  return {
    /** Check apakah user sudah melakukan checkin untuk hari ini */
    hasCheckedInToday,

    /** Check status si user saat ini apakah sedang checkin atau checkout */
    attendeeStatus,

    /** Digunakan untuk mengatur button "Check Out" state (whether disabled or not) */
    isItSafeToCheckOut,
  };
};

/**
 * Custom hook untuk switch status kehadiran User. Jika transaksi berhasil,
 *  trigger query invalidation dengan key @see AttendanceServiceQueryKeys.ATTENDANCES_USER_GET .
 *
 * Hook ini digunakan ketika drawer check in or out dijalankan.
 */
export const useToggleCheckInCheckOut = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation(
    (payload: ISetAttendanceTogglePayload) =>
      AttendanceService.toggleCheckInCheckOut(axiosClient, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(
          AttendanceServiceQueryKeys.ATTENDANCES_USER_GET
        );
      },
    }
  );
};

/**
 * Internal type acquisition for `useGetUserAttendanceActivities` hook.
 *
 * @private
 */
type DynamicTableTypes = {
  key: number;
  updated_at: string;

  [key: string]: string | number;
};

/**
 * Custom hook yang mempermudah mendapatkan data untuk table Aktivitas.
 * Terdapat dua jenis data:
 * 1. Hari Ini  => Seluruh aktivitas yang ditambahkan hari ini
 * 2. Riwayat   => 2 bulan ke belakang dari hari ini
 *
 * Riwayat tidak dapat diubah (immutable), sedangkan Hari Ini dapat diperbarui (update dan delete).
 *
 * Hooks ini akan menghasilkan:
 * 1. Data untuk nilai dari table component (`dataSource`).
 * 2. Pasangan antara dynamic column name dengan key.
 * 3. Indikator loading ketika data diperbarui (sync) dengan backend.
 */
export const useGetUserAttendanceActivities = (
  criteria: "today" | "past" = "today"
) => {
  const axiosClient = useAxiosClient();

  const { data: userAttendanceForm } = useQuery(
    AuthServiceQueryKeys.DETAIL_PROFILE,
    () => AuthService.whoAmI(axiosClient),
    {
      select: (response) => response.data.data.attendance_forms,
    }
  );

  const {
    data: rawDataSource,
    isLoading: isDataSourceLoading,
    isRefetching: isDataSourceRefetching,
  } = useQuery(
    AttendanceActivityQueryKeys.FIND,
    () => AttendanceActivityServivce.find(axiosClient),
    {
      enabled: !!userAttendanceForm,
      select: (response) => {
        if (!userAttendanceForm || userAttendanceForm.length === 0) {
          return [];
        }

        return criteria === "today"
          ? response.data.data.today_activities.filter(
              (activity) =>
                activity.attendance_form_id === userAttendanceForm[0].id
            )
          : response.data.data.last_two_month_activities.filter(
              (activity) =>
                activity.attendance_form_id === userAttendanceForm[0].id
            );
      },
    }
  );

  const { dynamic, keyValuePairs } = useMemo<{
    dynamic: {
      columnNames: string[];
      fieldKeys: string[];
    };
    keyValuePairs: { [key: string]: string[] };
  }>(() => {
    if (!userAttendanceForm || userAttendanceForm.length === 0) {
      return {
        dynamic: { columnNames: [], fieldKeys: [] },
        keyValuePairs: {},
      };
    }

    const dynamic = userAttendanceForm[0].details.reduce(
      (prevValue, currValue) => {
        return {
          ...prevValue,
          columnNames: [...prevValue.columnNames, currValue.name],
          fieldKeys: [...prevValue.fieldKeys, currValue.key],
        };
      },
      {
        columnNames: [],
        fieldKeys: [],
      } as {
        columnNames: string[];
        fieldKeys: string[];
      }
    );

    const keyValuePairs = userAttendanceForm[0].details.reduce(
      (previousValue, curr) => {
        const newValue = { ...previousValue };
        if (curr.list && curr.type === FormAktivitasTypes.CHECKLIST) {
          newValue[curr.key] = curr.list;
          return newValue;
        }

        return newValue;
      },
      {} as { [key: string]: string[] }
    );

    return { dynamic, keyValuePairs };
  }, [userAttendanceForm]);

  /** Menghasilkan dataSource untuk table. */
  const mappedDataSource = useMemo(() => {
    if (
      !rawDataSource ||
      rawDataSource.length === 0 ||
      !userAttendanceForm ||
      userAttendanceForm.length === 0
    ) {
      return undefined;
    }

    const result: DynamicTableTypes[] = [];

    /** NOTE: iterasi di bawah ini cukup berat. Sangat mungkin menjadi performance issue. */
    rawDataSource.forEach((activity) => {
      const buffer: DynamicTableTypes = {
        key: activity.id,
        updated_at: activity.updated_at.toString(),
      };

      activity.details.forEach((activityDetail) => {
        if (!dynamic.fieldKeys.includes(activityDetail.key)) {
          return;
        }

        if (activityDetail.value instanceof Array) {
          const actualListValues = keyValuePairs[activityDetail.key];

          const actualValues = [];
          activityDetail.value.forEach((valueIndex) => {
            actualValues.push(actualListValues[valueIndex]);
          });

          buffer[activityDetail.key] = actualValues.join(", ");
        } else {
          buffer[activityDetail.key] = activityDetail.value;
        }
      });

      result.push(buffer);
    });

    return result;
  }, [rawDataSource, userAttendanceForm]);

  return {
    /**
     * Murni data yang akan ditampilkan ke component <Table> tidak perlu mapping lagi pada consumer component.
     *
     *
     * @example
     * ```tsx
     * <Table dataSource={dataSource} />
     * ```
     */
    dataSource: mappedDataSource,

    /** An indicator when there is data loading (refer to `dataSource` property above) */
    isDataSourceLoading: isDataSourceLoading || isDataSourceRefetching,

    /**
     * Object yang berisi pasangan column name beserta keynya.
     *
     * Object ini digunakan untuk mapping dynamic table column header dengan assign dataIndex sesuai
     *  key dari column namenya.
     *
     *
     * @example
     * ```ts
     * dynamicNameFieldPairs.columnNames[0]: dynamicNameFieldPairs.fieldKey[0]
     * ```
     */
    dynamicNameFieldPairs: dynamic,
  };
};

export const useAddAttendanceActivity = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation(
    (payload: IAddAttendanceActivityPayload) =>
      AttendanceActivityServivce.add(axiosClient, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(AttendanceActivityQueryKeys.FIND);
      },
    }
  );
};
