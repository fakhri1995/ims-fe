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

export const useAddFormAktivitas = () => {
  const { axiosClient } = useAxiosClient();
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
