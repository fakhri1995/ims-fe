import type { AxiosInstance } from "axios";

import {
  IGetAttendanceUsersSucceedResponse,
  IGetAttendancesUserSucceedResponse,
  ISetAttendanceTogglePayload,
} from "./attendance.types";

import { HttpRequestBaseSucceedResponse } from "types/common";

export class AttendanceService {
  /**
   * Retrieve all current user's attandance log (history).
   *
   * @see {AttendanceServiceQueryKeys.ATTENDANCES_USER_GET}
   * @access GET /getAttendancesUser
   */
  static async find(axiosClient: AxiosInstance) {
    return await axiosClient.get<IGetAttendancesUserSucceedResponse>(
      "/getAttendancesUser"
    );
  }

  /**
   * Retrieve all attendances as an Admin.
   *
   * @see {AttendanceServiceQueryKeys.ATTENDANCE_USERS_GET}
   * @access GET /getAttendancesUsers
   */
  static async findAsAdmin(axiosClient: AxiosInstance) {
    return await axiosClient.get<IGetAttendanceUsersSucceedResponse>(
      "/getAttendancesUsers"
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
