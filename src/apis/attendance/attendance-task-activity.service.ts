import type { AxiosInstance } from "axios";

import {
  IAddAttendanceTaskActivityPayload,
  IGetAttendanceTaskActivitiesSucceedResponse,
} from "./attendance-task-activity.types";

import { HttpRequestBaseSucceedResponse } from "types/common";

export class AttendanceTaskActivityService {
  /**
   * Retrieve all attendance task activities for current logged in user.
   *
   * @access GET /getAttendanceTaskActivites
   */
  static async find(axiosClient: AxiosInstance) {
    return await axiosClient.get<IGetAttendanceTaskActivitiesSucceedResponse>(
      "/getAttendanceTaskActivities"
    );
  }

  /**
   * @access POST /addAttendanceTaskActivity
   */
  static async add(
    axiosClient: AxiosInstance,
    payload: IAddAttendanceTaskActivityPayload
  ) {
    return await axiosClient.post<HttpRequestBaseSucceedResponse>(
      "/addAttendanceTaskActivity",
      payload
    );
  }

  /**
   * @access DELETE /deleteAttendanceTaskActivity
   */
  static async remove(axiosClient: AxiosInstance, taskActivityId: number) {
    return await axiosClient.delete<HttpRequestBaseSucceedResponse>(
      "/deleteAttendanceTaskActivity",
      {
        data: {
          id: taskActivityId,
        },
      }
    );
  }
}
