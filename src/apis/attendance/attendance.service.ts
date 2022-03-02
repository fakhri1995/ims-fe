import type { AxiosInstance } from "axios";
import QueryString from "qs";

import {
  IAddAttendanceFormPayload,
  IAddAttendanceFormSucceedResponse,
  IDeleteAttendanceFormSucceedResponse,
  IGetAttendanceFormSucceedResponse,
  IGetAttendanceFormsParams,
  IGetAttendanceFormsSucceedResponse,
  IUpdateAttendanceFormPayload,
  IUpdateAttendanceFormSucceedResponse,
} from "./attendance.types";

export class AttendanceService {
  /**
   * @see {AttendanceServiceQueryKeys.FIND} Query key
   */
  static async find(
    axiosClient: AxiosInstance,
    criteria?: IGetAttendanceFormsParams
  ) {
    const querySearchCriteria = QueryString.stringify(criteria, {
      addQueryPrefix: true,
    });

    return await axiosClient.get<IGetAttendanceFormsSucceedResponse>(
      "/getAttendanceForms" + querySearchCriteria
    );
  }

  /**
   * @see {AttendanceServiceQueryKeys.FIND_ONE} Query key attach with `aktivitasId` (e.g. [FIND, aktivitasId]).
   */
  static async findOne(axiosClient: AxiosInstance, aktivitasId: number) {
    const querySearchCriteria = QueryString.stringify(
      { id: aktivitasId },
      { addQueryPrefix: true }
    );

    return await axiosClient.get<IGetAttendanceFormSucceedResponse>(
      "/getAttendanceForm" + querySearchCriteria
    );
  }

  /**
   * @see {AttendanceServiceQueryKeys.FIND} Use this key to invalidate cache
   *
   * @access POST /addAttendanceForm
   */
  static async add(
    axiosClient: AxiosInstance,
    payload: IAddAttendanceFormPayload
  ) {
    return await axiosClient.post<IAddAttendanceFormSucceedResponse>(
      "/addAttendanceForm",
      payload
    );
  }

  /**
   * @access PUT /updateAttendanceForm
   */
  static async update(
    axiosClient: AxiosInstance,
    payload: IUpdateAttendanceFormPayload
  ) {
    return await axiosClient.put<IUpdateAttendanceFormSucceedResponse>(
      "/updateAttendanceForm",
      payload
    );
  }

  /**
   * @access DELETE /deleteAttendanceForm
   */
  static async remove(axiosClient: AxiosInstance, aktivitasId: number) {
    return await axiosClient.delete<IDeleteAttendanceFormSucceedResponse>(
      "/deleteAttendanceForm",
      {
        data: {
          id: aktivitasId,
        },
      }
    );
  }
}
