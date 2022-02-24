import type { AxiosInstance } from "axios";
import QueryString from "qs";

import { IGetAttendanceForm } from "types/api/attendances/get-attendance-form";
import type {
  IGetAttendanceForms,
  IGetAttendanceFormsCriteria,
} from "types/api/attendances/get-attendance-forms";

export enum FormAktivitasQueryKeys {
  FIND = "form-aktivitas",
}

export class FormAktivitasService {
  /**
   * @see {FormAktivitasQueryKeys.FIND} Query key
   */
  static async find(
    axiosClient: AxiosInstance,
    criteria?: IGetAttendanceFormsCriteria
  ) {
    const querySearchCriteria = QueryString.stringify(criteria, {
      addQueryPrefix: true,
    });

    return await axiosClient.get<IGetAttendanceForms>(
      "/getAttendanceForms" + querySearchCriteria
    );
  }

  /**
   * @see {FormAktivitasQueryKeys.FIND} Query key attach with `aktivitasId` (e.g. [FIND, aktivitasId]).
   */
  static async findOne(axiosClient: AxiosInstance, aktivitasId: number) {
    const querySearchCriteria = QueryString.stringify(
      { id: aktivitasId },
      { addQueryPrefix: true }
    );

    return await axiosClient.get<IGetAttendanceForm>(
      "/getAttendanceForm" + querySearchCriteria
    );
  }
}
