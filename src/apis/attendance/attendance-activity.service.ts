import type { AxiosInstance } from "axios";

import {
  IAddAttendanceActivityPayload,
  IAddAttendanceActivitySucceedResponse,
  IGetAttendanceActivitiesSucceedResponse,
  IUpdateAttendanceActivityPayload,
} from "./attendance-activity.types";

import { HttpRequestBaseSucceedResponse } from "types/common";

export class AttendanceActivityService {
  /**
   * Retrieve all attendance activities for current logged in user.
   *
   * @see {AttendanceActivityQueryKeys.FIND}
   * @access GET /getAttendanceActivites
   */
  static async find(axiosClient: AxiosInstance) {
    return await axiosClient.get<IGetAttendanceActivitiesSucceedResponse>(
      "/getAttendanceActivities"
    );
  }

  /**
   * @access POST /addAttendanceActivity
   */
  static async add(
    axiosClient: AxiosInstance,
    payload: IAddAttendanceActivityPayload
  ) {
    return await axiosClient.post<IAddAttendanceActivitySucceedResponse>(
      "/addAttendanceActivity",
      payload
    );
  }

  /**
   * @access PUT /updateAttendanceActivity
   */
  static async update(
    axiosClient: AxiosInstance,
    payload: IUpdateAttendanceActivityPayload
  ) {
    return await axiosClient.put<HttpRequestBaseSucceedResponse>(
      "/updateAttendanceActivity",
      payload
    );
  }

  /**
   * @access DELETE /deleteAttendanceActivity
   */
  static async remove(
    axiosClient: AxiosInstance,
    formAttendanceActivityId: number
  ) {
    return await axiosClient.delete<HttpRequestBaseSucceedResponse>(
      "/deleteAttendanceActivity",
      {
        data: {
          id: formAttendanceActivityId,
        },
      }
    );
  }
}
