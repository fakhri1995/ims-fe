import type { AxiosInstance } from "axios";

import {
  IGetAttendancesUserSucceedResponse,
  ISetAttendanceTogglePayload,
} from "./attendance.types";

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

  static async updateAttendeeStatus(
    axiosClient: AxiosInstance,
    payload: ISetAttendanceTogglePayload
  ) {}
}
