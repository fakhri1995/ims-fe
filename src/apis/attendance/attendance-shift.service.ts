import type { AxiosInstance } from "axios";
import { addDays } from "date-fns";
import QueryString from "qs";

import { formatDateToLocale } from "lib/date-utils";
import { objectToFormData, permissionWarningNotification } from "lib/helper";

import {
  IAddShiftPayload,
  IGetShiftSucceedResponse,
  IGetShiftsPaginateParams,
  IGetShiftsPaginateSucceedResponse,
} from "./attendance-shift.types";

import { HttpRequestBaseSucceedResponse } from "types/common";

export class AttendanceShiftService {
  /**
   * Retrieve all shifts with pagination.
   *
   * @access GET /getShifts
   */
  static async getShifts(
    axiosClient: AxiosInstance,
    params?: IGetShiftsPaginateParams
  ) {
    const qs = QueryString.stringify(params, { addQueryPrefix: true });

    return await axiosClient.get<IGetShiftsPaginateSucceedResponse>(
      "/getShifts" + qs
    );
  }

  /**
   * Retrieve shift detail by its ID.
   *
   * @access GET /getShift
   */
  static async getShift(axiosClient: AxiosInstance, shiftId: number) {
    const querySearch = QueryString.stringify(
      { id: shiftId },
      { addQueryPrefix: true }
    );

    return await axiosClient.get<IGetShiftSucceedResponse>(
      "/getShift" + querySearch
    );
  }

  /**
   * Add new shift
   *
   * @access POST /addShift
   */
  static async addShift(
    hasFeature: boolean,
    axiosClient: AxiosInstance,
    payload: IAddShiftPayload
  ) {
    if (!hasFeature) {
      permissionWarningNotification("Menambah", "Shift Kerja");
      return;
    }

    return await axiosClient.post<HttpRequestBaseSucceedResponse>(
      "/addShift",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
