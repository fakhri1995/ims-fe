import isToday from "date-fns/isToday";
import { useRouter } from "next/router";
import { useDebugValue, useEffect, useMemo, useState } from "react";
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
 *
 * TODO: check juga logic untuk apakah user bisa checkout (aktivitas hari ini tidak kosong)
 *
 * @returns {{
 *   hasCheckedInToday: boolean;
 *   attendeeStatus: "checkout" | "checkin" | undefined;
 *   isItSafeToCheckOut: boolean;
 *   query: UseQueryResult;
 * }}
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

  const { data: todayActivitiesLength, refetch: refetchActivities } = useQuery(
    AttendanceActivityQueryKeys.FIND,
    () => AttendanceActivityServivce.find(axiosClient),
    {
      enabled: false,
      select: (response) => response.data.data.today_activities.length,
    }
  );

  const attendancesLogQuery = useQuery(
    AttendanceServiceQueryKeys.ATTENDANCES_USER_GET,
    () => AttendanceService.find(axiosClient),
    {
      refetchOnMount: false,
      select: (response) => response.data.data,
      onSuccess: () => {
        refetchActivities();
      },
    }
  );

  useEffect(() => {
    setIsItSafeToCheckOut(todayActivitiesLength > 0);
  }, [todayActivitiesLength]);

  useEffect(() => {
    if (!attendancesLogQuery.data) {
      return;
    }

    /** Special case: when the user is new or the data is just empty */
    if (attendancesLogQuery.data.user_attendances.length === 0) {
      setHasCheckedInToday(false);
      setAttendeeStatus("checkout");

      return;
    }

    /**
     * Backend guarantee kalau index === 0 adalah data / log check in dan check out
     *  paling terbaru (sorted by time).
     */
    const latestAttendanceData = attendancesLogQuery.data.user_attendances[0];
    const latestCheckInTime = new Date(latestAttendanceData.check_in);

    setHasCheckedInToday(isToday(latestCheckInTime));
    setAttendeeStatus(
      latestAttendanceData.check_out === null ? "checkin" : "checkout"
    );
  }, [attendancesLogQuery.data]);

  return {
    /** Check apakah user sudah melakukan checkin untuk hari ini */
    hasCheckedInToday,

    /** Check status si user saat ini apakah sedang checkin atau checkout */
    attendeeStatus,

    /** Digunakan untuk mengatur button "Check Out" state (whether disabled or not) */
    isItSafeToCheckOut,

    /** Pass ke consumer untuk melakukan refetching secara manual */
    query: attendancesLogQuery,
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
 * Custom hook yang mempermudah mendapatkan data untuk table Aktivitas.
 * Terdapat dua jenis data:
 * 1. Hari Ini  => Seluruh aktivitas yang ditambahkan hari ini
 * 2. Riwayat   => 2 bulan ke belakang dari hari ini
 *
 * Riwayat tidak dapat diubah (immutable), sedangkan Hari Ini dapat diperbarui (update dan delete).
 *
 * Hooks ini akan menghasilkan:
 * 1. Array of columns value    => Column pada table bersifat dinamis sesuai dengan form aktivitas si user.
 * 2. Data source               => Data untuk table itu sendiri. Data berubah menyesuaikan argument `criteria`.
 */
export const useGetUserAttendanceActivities = (
  criteria: "today" | "past" = "today"
) => {
  const axiosClient = useAxiosClient();

  /**
   * TODO: trrigger query everytime arg `criteria` changes (?).
   */
  const { data: rawDataSource, refetch: refetchAttendanceActivities } =
    useQuery(
      AttendanceActivityQueryKeys.FIND,
      () => AttendanceActivityServivce.find(axiosClient),
      {
        enabled: false,
        select: (response) => {
          return criteria === "today"
            ? response.data.data.today_activities
            : response.data.data.last_two_month_activities;
        },
      }
    );

  const { data: userAtendanceForms } = useQuery(
    AuthServiceQueryKeys.DETAIL_PROFILE,
    () => AuthService.whoAmI(axiosClient),
    {
      select: (response) => response.data.data.attendance_forms,
      onSuccess: () => {
        refetchAttendanceActivities();
      },
    }
  );

  const { dynamicColumNames, dynamicFieldKeys, keyValuePairs } = useMemo<{
    dynamicColumNames: string[];
    dynamicFieldKeys: string[];
    keyValuePairs: { [key: string]: string[] };
  }>(() => {
    if (!userAtendanceForms || userAtendanceForms.length === 0) {
      return { dynamicColumNames: [], dynamicFieldKeys: [], keyValuePairs: {} };
    }

    const dynamicColumNames = userAtendanceForms[0].details.map(
      (detail) => detail.name
    );

    const dynamicFieldKeys = userAtendanceForms[0].details.map(
      (detail) => detail.key
    );

    const keyValuePairs = userAtendanceForms[0].details.reduce((accu, curr) => {
      const newAccu = { ...accu };
      if (curr.list && curr.type === FormAktivitasTypes.CHECKLIST) {
        newAccu[curr.key] = curr.list;
        return newAccu;
      }

      return newAccu;
    }, {} as { [key: string]: string[] });

    return { dynamicColumNames, dynamicFieldKeys, keyValuePairs };
  }, [userAtendanceForms]);

  const mappedDataSource = useMemo(() => {
    if (!rawDataSource || !userAtendanceForms) {
      return undefined;
    }

    const result: DynamicTableTypes[] = [];

    rawDataSource.forEach((activity) => {
      activity.details.forEach((activityDetail) => {
        if (!dynamicFieldKeys.includes(activityDetail.key)) {
          return;
        }

        const buffer: DynamicTableTypes = {
          activityId: activity.id,
          key: activityDetail.key,
          value: activityDetail.value,
          updated_at: activity.updated_at.toString(),
        };

        if (buffer.value instanceof Array) {
          const actualListValue = keyValuePairs[buffer.key] || [];

          if (actualListValue) {
            const actualValues = [];

            buffer.value.forEach((valueIndex) => {
              actualValues.push(actualListValue[valueIndex]);
            });

            // finally flush to buffer
            buffer.value = actualValues.join(", ");
          }
        }

        if (buffer) result.push(buffer);
      });
    });

    return result;
  }, [rawDataSource, userAtendanceForms]);

  return {
    dynamicActivityColumns: dynamicColumNames,
    dataSource: mappedDataSource,
  };
};

type DynamicTableTypes = {
  activityId: number;
  key: string;
  value: number[] | string;
  updated_at: string;
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
