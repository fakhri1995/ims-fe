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
    // payload: IAddAttendanceActivityPayload
    payload: FormData
  ) {
    return await axiosClient.post<IAddAttendanceActivitySucceedResponse>(
      "/addAttendanceActivity",
      payload
    );
  }

  /**
   * @access POST /updateAttendanceActivity
   * update function must use POST because it cannot use PUT if File type in payload
   */
  static async update(
    axiosClient: AxiosInstance,
    // payload: IUpdateAttendanceActivityPayload
    payload: FormData
  ) {
    return await axiosClient.post<HttpRequestBaseSucceedResponse>(
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
