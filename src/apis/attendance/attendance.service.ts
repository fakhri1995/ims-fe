import type { AxiosInstance } from "axios";
import QueryString from "qs";

import { formatDateToLocale } from "lib/date-utils";

import {
  AttendanceExportExcelDataCriteria,
  AttendanceExportExcelDataResult,
  IGetAttendanceUserSucceedResponse,
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
   * Retrieve an attendance detail by its ID.
   *
   * @access GET /getAttendanceUser
   */
  static async findOne(axiosClient: AxiosInstance, attendanceId: number) {
    const querySearch = QueryString.stringify(
      { id: attendanceId },
      { addQueryPrefix: true }
    );

    return await axiosClient.get<IGetAttendanceUserSucceedResponse>(
      "/getAttendanceUser" + querySearch
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

  /**
   * Retrieve a binary large object file (Excel file, I assume) from the backend.
   *
   * @access GET /exportAttendanceActivityUsers
   * @access GET /exportAttendanceActivityUser
   */
  static async exportExcelData(
    axiosClient: AxiosInstance,
    criteria: AttendanceExportExcelDataCriteria
  ): Promise<AttendanceExportExcelDataResult | Error> {
    const [formattedFrom, formattedTo] = [criteria.from, criteria.to].map(
      (value) => formatDateToLocale(value, "yyyy-MM-dd")
    );

    const qsParam: any = {
      ...criteria,
      from: formattedFrom,
      to: formattedTo,
    };

    if (criteria.user_ids) {
      qsParam["user_ids"] = `[${criteria.user_ids.join(",")}]`;
    }

    const querySearch = QueryString.stringify(qsParam, {
      addQueryPrefix: true,
    });

    const isExportMany =
      criteria.attendance_form_id !== undefined &&
      criteria.user_ids !== undefined;

    const endpoint = isExportMany
      ? "/exportAttendanceActivityUsers"
      : "/exportAttendanceActivityUser";

    const result: AttendanceExportExcelDataResult = {
      file: null,
      fileName: "",
    };

    try {
      const response = await axiosClient.get(endpoint + querySearch, {
        responseType: "blob",
        headers: {
          Accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      });

      const fileNamePrefix = isExportMany ? "all" : "my";
      const fileName = "attendance_data-".concat(
        formatDateToLocale(Date.now(), "yyyy-MM-dd"),
        ".xlsx"
      );

      result.file = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      result.fileName = fileNamePrefix.concat("-", fileName);
    } catch (error) {
      return error;
    }

    return result;
  }
}
