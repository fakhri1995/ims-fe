import { useMutation, useQueryClient } from "react-query";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  FormAktivitasQueryKeys,
  FormAktivitasService,
} from "services/form-aktivitas";

import { IAddAttendanceFormPayload } from "types/api/attendances/add-attendance-form";

export { AddNewAktivitasButton } from "./AddNewAktivitasButton";
export { TotalFormAktivitasCard } from "./TotalFormAktivitasCard";
export { FormAktivitasTable } from "./FormAktivitasTable";
export { FormAktivitasTableHeader } from "./FormAktivitasTableHeader";
export { BuatFormAktivitasDrawer } from "./BuatFormAktivitasDrawer";

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
      FormAktivitasService.add(axiosClient, payload),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(FormAktivitasQueryKeys.FIND);
      },
    }
  );
};
