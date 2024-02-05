import type { AxiosInstance } from "axios";
import { addDays } from "date-fns";
import QueryString from "qs";

import { formatDateToLocale } from "lib/date-utils";
import { objectToFormData, permissionWarningNotification } from "lib/helper";

import {
  IAddSchedulePayload,
  IGetCurrentScheduleParams,
  IGetCurrentScheduleSucceedResponse,
  IGetScheduleSucceedResponse,
  IGetSchedulesPaginateParams,
  IGetSchedulesPaginateSucceedResponse,
  IUpdateSchedulePayload,
} from "./attendance-schedule.types";

import { HttpRequestBaseSucceedResponse } from "types/common";

export class AttendanceScheduleService {
  /**
   * Retrieve all schedules with pagination.
   *
   * @access GET /getSchedules
   */
  static async getSchedules(
    hasFeature: boolean,
    axiosClient: AxiosInstance,
    params?: IGetSchedulesPaginateParams
  ) {
    if (!hasFeature) {
      permissionWarningNotification("Mendapatkan", "Daftar Jadwal Kerja");
      return;
    }

    const qs = QueryString.stringify(params, { addQueryPrefix: true });

    return await axiosClient.get<IGetSchedulesPaginateSucceedResponse>(
      "/getSchedules" + qs
    );
  }

  /**
   * Retrieve schedule detail by its ID.
   *
   * @access GET /getSchedule
   */
  static async getSchedule(
    hasFeature: boolean,
    axiosClient: AxiosInstance,
    scheduleId: number
  ) {
    if (!hasFeature) {
      permissionWarningNotification("Mendapatkan", "Detail Jadwal Kerja");
      return;
    }

    const querySearch = QueryString.stringify(
      { id: scheduleId },
      { addQueryPrefix: true }
    );

    return await axiosClient.get<IGetScheduleSucceedResponse>(
      "/getSchedule" + querySearch
    );
  }

  /**
   * Add new schedule
   *
   * @access POST /addSchedule
   */
  static async addSchedule(
    hasFeature: boolean,
    axiosClient: AxiosInstance,
    payload: IAddSchedulePayload
  ) {
    if (!hasFeature) {
      permissionWarningNotification("Menambah", "Jadwal Kerja");
      return;
    }

    return await axiosClient.post<HttpRequestBaseSucceedResponse>(
      "/addSchedule",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  /**
   * Update schedule by its ID
   *
   * @access PUT /updateSchedule
   */
  static async updateSchedule(
    hasFeature: boolean,
    axiosClient: AxiosInstance,
    payload: IUpdateSchedulePayload
  ) {
    if (!hasFeature) {
      permissionWarningNotification("Mengubah", "Jadwal Kerja");
      return;
    }

    return await axiosClient.put<HttpRequestBaseSucceedResponse>(
      "/updateSchedule",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  /**
   * Delete schedule by its ID.
   *
   * @access DELETE /deleteSchedule
   */
  static async deleteSchedule(
    hasFeature: boolean,
    axiosClient: AxiosInstance,
    scheduleId: number
  ) {
    const querySearch = QueryString.stringify(
      { id: scheduleId },
      { addQueryPrefix: true }
    );
    if (!hasFeature) {
      permissionWarningNotification("Menghapus", "Jadwal Kerja");
      return;
    }

    return await axiosClient.delete<HttpRequestBaseSucceedResponse>(
      "/deleteSchedule" + querySearch
    );
  }

  /**
   * Delete all schedule by user IDs.
   *
   * @access DELETE /deleteAllSchedule
   */
  static async deleteAllSchedule(
    hasFeature: boolean,
    axiosClient: AxiosInstance,
    userIds: number[]
  ) {
    if (!hasFeature) {
      permissionWarningNotification("Mengosongkan", "Jadwal Kerja");
      return;
    }

    const payload = {
      user_ids: userIds,
    };

    return await axiosClient.delete<HttpRequestBaseSucceedResponse>(
      "/deleteAllSchedule",
      {
        headers: { "Content-Type": "application/json" },
        data: payload,
      }
    );
  }

  /**
   * Retrieve user's current schedule by user ID.
   *
   * @access GET /getCurrentSchedule
   */
  static async getCurrentSchedule(
    hasFeature: boolean,
    axiosClient: AxiosInstance,
    params: IGetCurrentScheduleParams
  ) {
    if (!hasFeature) {
      permissionWarningNotification(
        "Mendapatkan",
        "Jadwal Kerja Karyawan Saat Ini"
      );
      return;
    }

    const querySearch = QueryString.stringify(params, { addQueryPrefix: true });

    return await axiosClient.get<IGetCurrentScheduleSucceedResponse>(
      "/getCurrentSchedule" + querySearch
    );
  }
}
