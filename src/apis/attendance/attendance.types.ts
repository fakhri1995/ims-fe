import { HttpRequestWithDataSucceedResponse } from "types/common";

export enum AttendanceServiceQueryKeys {
  ATTENDANCES_USER_GET = "ATTENDANCES_USER_GET",
}

/**
 * @access GET /getAttendancesUser
 */
export type IGetAttendancesUserSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetAttendancesUserData>;

export interface GetAttendancesUserData {
  user_attendances: UserAttendance[];
  late_count: number;
  on_time_count: number;
}

export interface UserAttendance {
  id: number;
  user_id: number;
  check_in: Date;
  check_out: Date | null;
  long_check_in: string;
  lat_check_in: string;
  long_check_out: null | string;
  lat_check_out: null | string;
  geo_loc_check_in: null | string;
  geo_loc_check_out: null | string;
  evidence: Evidence;
  is_wfo: number;
  is_late: boolean;
}

export interface Evidence {
  check_in_evidence: string;
  check_out_evidence: string;
}

/**
 * @access POST /setAttendanceToggle
 */
export interface ISetAttendanceTogglePayload {
  long: string;
  lat: string;
  geo_loc: string | null;
  evidence: string;
  wfo: boolean;
}
