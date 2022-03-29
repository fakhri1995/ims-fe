import isToday from "date-fns/isToday";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { useAxiosClient } from "hooks/use-axios-client";

import { AuthService, AuthServiceQueryKeys } from "apis/auth";

import { IUpdateAttendanceActivityPayload } from ".";
import { AttendanceActivityService } from "./attendance-activity.service";
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
 * NOTE: pass false as its arg to disable all three queries inside. It's useful when the consumer does not consume the data.
 *        for example when <CheckInOutCard> component rendered in Admin's attendance page.
 */
export const useGetAttendeeInfo = (isEnabled: boolean = true) => {
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
      enabled: isEnabled,
      select: (response) => response.data.data.attendance_forms,
    }
  );

  const { data: todayActivitiesLength } = useQuery(
    AttendanceActivityQueryKeys.FIND,
    () => AttendanceActivityService.find(axiosClient),
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
      enabled: isEnabled,
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
    () => AttendanceActivityService.find(axiosClient),
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

/**
 * Custom hook untuk mendapatkan list seluruh aktivitas hari ini per User.
 *
 * NOTE: data yang dihasilkan tidak difilter untuk menyesuaikan form_attendance User. Hal ini tidak diperlukan
 *  karena yang kita butuhkan hanya 1 object aktivitas. Setiap object aktivitas memiliki ID yang unique.
 *
 * @example
 * ```
 * const { findTodayActivity } = useGetUserAttendanceTodayActivities();
 *
 * const activity: Activity | undefined = findTodayActivity(23);
 * ```
 */
export const useGetUserAttendanceTodayActivities = () => {
  const axiosClient = useAxiosClient();

  const { data } = useQuery(
    AttendanceActivityQueryKeys.FIND,
    () => AttendanceActivityService.find(axiosClient),
    {
      select: (response) => response.data.data.today_activities,
    }
  );

  const findById = useCallback(
    (selectId: number) => {
      if (!data) {
        return;
      }

      return data.find((activity) => activity.id === selectId);
    },
    [data]
  );

  return {
    todayActivities: data,
    findTodayActivity: findById,
  };
};

/**
 * Custom hook untuk mutate data Aktivitas (attendance).
 * Konteks mutate: add, update, delete.
 *
 * Setiap mutasi berhasil akan update @see AttendanceActivityQueryKeys.FIND agar UI sync dengan backend.
 */
export const useMutateAttendanceActivity = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  const onSucceed = useCallback(() => {
    queryClient.invalidateQueries(AttendanceActivityQueryKeys.FIND);
  }, []);

  const addMutation = useMutation(
    (payload: IAddAttendanceActivityPayload) =>
      AttendanceActivityService.add(axiosClient, payload),
    {
      onSuccess: onSucceed,
    }
  );

  const updateMutation = useMutation(
    (payload: IUpdateAttendanceActivityPayload) =>
      AttendanceActivityService.update(axiosClient, payload),
    {
      onSuccess: onSucceed,
    }
  );

  const deleteMutation = useMutation(
    (activityId: number) =>
      AttendanceActivityService.remove(axiosClient, activityId),
    {
      onSuccess: onSucceed,
    }
  );

  return { addMutation, updateMutation, deleteMutation };
};

/**
 * Custom hook digunakan untuk dan hanya pada halaman detail attendance.
 * Hook akan mempersiapkan data yang akan ditampilkan oleh UI component sehingga tidak ada lagi manipulasi pada consumer hook ini.
 *
 * Hook ini melakukan:
 * 1. Handle ketika aktivitas diganti (aktivitas jam X diganti dengan aktivitas jam Y).
 * 2. Merge data dari backend sehingga bisa ditampilkan pada UI.
 *
 * NOTE: arg `attendanceId` sangat mungkin memiliki nilai `undefined`. Oleh karena itu hanya jalankan query ketika `attendanceId !== undefined`.
 */
export const useAttendanceDetailSelector = (
  attendanceId: number,
  isAdminRole: boolean = false
) => {
  const axiosClient = useAxiosClient();

  const [selectedActivityIndex, setSelectedActivityIndex] = useState<
    number | undefined
  >(undefined);

  const { data, isLoading } = useQuery(
    [AttendanceServiceQueryKeys.ATTENDANCE_USER_GET, attendanceId],
    () => AttendanceService.findOne(axiosClient, attendanceId, isAdminRole),
    {
      enabled: !!attendanceId,
      select: (response) => {
        const data: Data = [];
        response.data.data.attendance_activities.forEach(
          (attendanceActivity) => {
            const attendanceForm = attendanceActivity.attendance_form;

            /** Record object (Map-like) untuk mempermudah manipulasi berikutnya */
            const attendanceFormShape: AttendanceFormShapeType = {};
            attendanceForm.details.forEach((detail) => {
              attendanceFormShape[detail.key] = {
                name: detail.name,
                list: detail.list || undefined,
              };
            });

            const datum: Datum = {
              timestamp: attendanceActivity.updated_at,
              activities: {},
            };

            attendanceActivity.details.forEach((detail) => {
              const activityName = attendanceFormShape[detail.key].name;

              // normal activity
              if (typeof detail.value === "string") {
                datum.activities[activityName] = detail.value;
              } else {
                const checkboxActivityDetail: CheckboxActivityType = {};

                attendanceFormShape[detail.key].list.forEach(
                  (checkboxValue, index) => {
                    let isSelected = false;
                    (detail.value as number[]).forEach((selectedIndex) => {
                      if (isSelected) {
                        return;
                      }

                      isSelected = selectedIndex === index;
                    });

                    checkboxActivityDetail[checkboxValue] = isSelected;
                  }
                );

                datum.activities[activityName] = checkboxActivityDetail;
              }
            });

            data.push(datum);
          }
        );

        return data;
      },
    }
  );

  /**
   * Seleksi satu data yang saat ini sedang ditampilkan.
   * Data yang terpilih akan berubah ketika timestamp yang dipilih oleh User berbeda.
   *
   * Data yang dihasilkan akan ditampilkan pada komponen @see {AttendanceDetailFormAttendanceSection}
   */
  const currentActivityData = useMemo(() => {
    if (!data) {
      return undefined;
    }

    if (selectedActivityIndex === undefined) {
      setSelectedActivityIndex(0);
      return undefined;
    }

    return data.find((_, index) => index === selectedActivityIndex);
  }, [data, selectedActivityIndex]);

  return {
    data,
    isLoading,
    currentActivityData,
    selectedActivityIndex,
    setSelectedActivityIndex,
  };
};

/**
 * Type helpers for `useAttendanceDetailSelector` hook.
 *
 * @private
 */
type AttendanceFormShapeType = Record<
  string,
  { name: string; list?: string[] }
>;
type Data = Datum[];
interface Datum {
  timestamp: Date | string;
  activities: Record<ActivityName, ActivityDetail>;
}
type ActivityName = string;
type ActivityDetail = ActivityExplanation | CheckboxActivityType;
type ActivityExplanation = string;
type CheckboxActivityType = Record<string, boolean>;
