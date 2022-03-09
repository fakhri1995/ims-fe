import type { AxiosInstance } from "axios";

import {
  IGetAttendancesUserSucceedResponse,
  ISetAttendanceTogglePayload,
} from "./attendance.types";

import { HttpRequestBaseSucceedResponse } from "types/common";

export class AttendanceService {
  /**
   * Retrieve all current user's attandance log (history).
   *
   * @access GET /getAttendancesUser
   */
  static async getAttendancesLog(axiosClient: AxiosInstance) {
    return await axiosClient.get<IGetAttendancesUserSucceedResponse>(
      "/getAttendancesUser"
    );
  }

  /**
   * Toggle check in and check out status for current logged in user.
   *
   * @access POST /setAttendanceTogle
   */
  static async toggleCheckInCheckOut(
    axiosClient: AxiosInstance,
    payload: ISetAttendanceTogglePayload
  ) {
    return await axiosClient.post<HttpRequestBaseSucceedResponse>(
      "/setAttendanceToggle",
      payload
    );
  }
}
