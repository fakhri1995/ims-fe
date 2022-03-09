import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

import { useAxiosClient } from "hooks/use-axios-client";

import { AttendanceFormAktivitasService } from "./attendance-form-aktivitas.service";
import {
  AttendanceServiceQueryKeys,
  IAddAttendanceFormPayload,
  IAddUserAttendanceFormPayload,
  IRemoveUserAttendanceFormPayload,
  IUpdateAttendanceFormPayload,
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
        queryClient.invalidateQueries(AttendanceServiceQueryKeys.FIND);
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
          AttendanceServiceQueryKeys.FIND_ONE,
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
          AttendanceServiceQueryKeys.FIND_ONE,
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
          AttendanceServiceQueryKeys.FIND_ONE,
          payload.id,
        ]);
      },
    }
  );
};
