import type { AxiosInstance } from "axios";
import { addDays } from "date-fns";
import QueryString from "qs";

import { formatDateToLocale } from "lib/date-utils";
import { objectToFormData } from "lib/helper";

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
    const additionalFlags = QueryString.stringify(
      { is_all: true },
      { addQueryPrefix: true }
    );

    return await axiosClient.get<IGetAttendancesUserSucceedResponse>(
      "/getAttendancesUser" + additionalFlags
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
   * @access GET /getAttendanceUserAdmin
   * @access GET /getAttendanceUser
   */
  static async findOne(
    axiosClient: AxiosInstance,
    attendanceId: number,
    withAdminEndpoint: boolean = false
  ) {
    const querySearch = QueryString.stringify(
      { id: attendanceId },
      { addQueryPrefix: true }
    );

    const endpoint = withAdminEndpoint
      ? "/getAttendanceUserAdmin"
      : "/getAttendanceUser";

    return await axiosClient.get<IGetAttendanceUserSucceedResponse>(
      endpoint + querySearch
    );
  }

  /**
   * Toggle check in and check out status for current logged in user.
   *
   * @access POST /setAttendanceTogle
   */
  static async toggleCheckInCheckOut(
    axiosClient: AxiosInstance,
    payload: ISetAttendanceTogglePayload<any>
  ) {
    const payloadFormData = objectToFormData(payload);

    return await axiosClient.post<HttpRequestBaseSucceedResponse>(
      "/setAttendanceToggle",
      payloadFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
    /** NOTE: we need to add `to` a day to include today's activities */
    const [formattedFrom, formattedTo] = [
      criteria.from,
      addDays(new Date(criteria.to), 1),
    ].map((value) => formatDateToLocale(value, "yyyy-MM-dd"));

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
