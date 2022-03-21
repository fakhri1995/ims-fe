import type { AxiosInstance } from "axios";
import QueryString from "qs";

import { formatDateToLocale } from "lib/date-utils";

import {
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
   * @TODO I'm not sure with this code. Try with actual response later.
   *
   * @access GET /exportAttendanceActivityUsers
   * @access GET /exportAttendanceActivityUser
   */
  static async exportExcelData(
    axiosClient: AxiosInstance,
    criteria: ExportExcelDataCriteria
  ): Promise<ExportExcelDataResult | Error> {
    const [formattedFrom, formattedTo] = [criteria.from, criteria.to].map(
      (value) => formatDateToLocale(value, "YY-mm-dd")
    );

    const querySearch = QueryString.stringify(
      {
        ...criteria,
        from: formattedFrom,
        to: formattedTo,
      },
      {
        addQueryPrefix: true,
      }
    );

    const isExportMany =
      criteria.attendance_form_id !== undefined &&
      criteria.user_ids !== undefined;

    const endpoint = isExportMany
      ? "/exportAttendanceActivityUsers"
      : "/exportAttendanceActivityUser";

    const result: ExportExcelDataResult = {
      file: null,
      fileName: "",
    };

    try {
      const response = await axiosClient.get(endpoint + querySearch, {
        responseType: "blob",
      });

      const fileName = "attendance_data-".concat(
        formatDateToLocale(new Date(), "YYYY-mmmm-dd.xlsx")
      );

      result.file = response.data;
      result.fileName = fileName;
    } catch (error) {
      return error;
    }

    return result;
  }
}

/**
 * @private
 */
type ExportExcelDataCriteria = {
  from: Date;
  to: Date;

  attendance_form_id?: number;
  user_ids?: number[];
};

/**
 * @private
 */
type ExportExcelDataResult = {
  file: Blob | null;
  fileName: string;
};
