import { AxiosInstance } from "axios";
import QueryString from "qs";

import {
  IAddAttendanceFormDetailsPayload,
  IAddAttendanceFormPayload,
  IAddAttendanceFormSucceedResponse,
  IAddUserAttendanceFormPayload,
  IGetAttendanceFormSucceedResponse,
  IGetAttendanceFormsParams,
  IGetAttendanceFormsSucceedResponse,
  IRemoveUserAttendanceFormPayload,
  IUpdateAttendanceFormPayload,
  IUpdateAttendanceFormSucceedResponse,
} from "./attendance-form-aktivitas.types";

import type { HttpRequestBaseSucceedResponse } from "types/common";

export class AttendanceFormAktivitasService {
  /**
   * @see {AttendanceFormAktivitasServiceQueryKeys.FIND} Query key
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

  static async findCompany(
    axiosClient: AxiosInstance,
    criteria?: IGetAttendanceFormsParams
  ) {
    const querySearchCriteria = QueryString.stringify(criteria, {
      addQueryPrefix: true,
    });

    return await axiosClient.get<IGetAttendanceFormsSucceedResponse>(
      "/getAttendanceFormCompany" + querySearchCriteria
    );
  }

  /**
   * @see {AttendanceFormAktivitasServiceQueryKeys.FIND_ONE} Query key attach with `aktivitasId` (e.g. [FIND, aktivitasId]).
   * @access GET /getAttendanceForm
   */
  static async findOne(
    axiosClient: AxiosInstance,
    aktivitasId: number[] | number,
    role: number
  ) {
    const querySearchCriteria = QueryString.stringify(
      { id: aktivitasId },
      { addQueryPrefix: true }
    );
    if (role == 1) {
      return await axiosClient.get<IGetAttendanceFormSucceedResponse>(
        "/getAttendanceForm" + querySearchCriteria
      );
    } else {
      return await axiosClient.get<IGetAttendanceFormSucceedResponse>(
        "/getAttendanceFormCompany" + querySearchCriteria
      );
    }
  }

  static async findCompanyOne(
    axiosClient: AxiosInstance,
    aktivitasId: number[] | number
  ) {
    const querySearchCriteria = QueryString.stringify(
      { id: aktivitasId },
      { addQueryPrefix: true }
    );

    return await axiosClient.get<IGetAttendanceFormSucceedResponse>(
      "/getAttendanceFormCompany" + querySearchCriteria
    );
  }

  /**
   * @see {AttendanceFormAktivitasServiceQueryKeys.FIND} Use this key to invalidate cache
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

  static async addDetails(
    axiosClient: AxiosInstance,
    payload: IAddAttendanceFormDetailsPayload
  ) {
    return await axiosClient.put<IUpdateAttendanceFormSucceedResponse>(
      "/addAttendanceFormDetails",
      payload
    );
  }

  /**
   * @access DELETE /deleteAttendanceForm
   */
  static async remove(axiosClient: AxiosInstance, aktivitasId: number) {
    return await axiosClient.delete<HttpRequestBaseSucceedResponse>(
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
    return await axiosClient.post<HttpRequestBaseSucceedResponse>(
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
    return await axiosClient.delete<HttpRequestBaseSucceedResponse>(
      "/removeUserAttendanceForm",
      {
        data: payload,
      }
    );
  }
}
