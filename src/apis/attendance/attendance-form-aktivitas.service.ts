import { AxiosInstance } from "axios";
import QueryString from "qs";

import {
  IAddAttendanceFormPayload,
  IAddAttendanceFormSucceedResponse,
  IAddUserAttendanceFormPayload,
  IAddUserAttendanceFormSucceedResponse,
  IDeleteAttendanceFormSucceedResponse,
  IGetAttendanceFormSucceedResponse,
  IGetAttendanceFormsParams,
  IGetAttendanceFormsSucceedResponse,
  IRemoveUserAttendanceFormPayload,
  IRemoveUserAttendanceFormSucceedResponse,
  IUpdateAttendanceFormPayload,
  IUpdateAttendanceFormSucceedResponse,
} from "./attendance.types";

export class AttendanceFormAktivitasService {
  /**
   * @see {AttendanceServiceQueryKeys.FIND} Query key
   * @access GEt /getAttendanceForms
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
   * @access GET /getAttendanceForm
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

  /**
   * @access POST /addUserAttendanceForm
   */
  static async addUsers(
    axiosClient: AxiosInstance,
    payload: IAddUserAttendanceFormPayload
  ) {
    return await axiosClient.post<IAddUserAttendanceFormSucceedResponse>(
      "/addUserAttendanceForm",
      payload
    );
  }

  /**
   * @access DELETE /removeUserAttendanceForm
   */
  static async removeUsers(
    axiosClient: AxiosInstance,
    payload: IRemoveUserAttendanceFormPayload
  ) {
    return await axiosClient.delete<IRemoveUserAttendanceFormSucceedResponse>(
      "/removeUserAttendanceForm",
      {
        data: payload,
      }
    );
  }
}
