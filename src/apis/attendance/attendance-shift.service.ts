import type { AxiosInstance } from "axios";
import { addDays } from "date-fns";
import QueryString from "qs";

import { formatDateToLocale } from "lib/date-utils";
import { objectToFormData } from "lib/helper";

import {
  IGetShiftSucceedResponse,
  IGetShiftsPaginateParams,
  IGetShiftsPaginateSucceedResponse,
} from "./attendance-shift.types";

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
}
