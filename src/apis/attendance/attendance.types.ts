import { HttpRequestWithDataSucceedResponse } from "types/common";

export enum AttendanceServiceQueryKeys {
  ATTENDANCES_USER_GET = "ATTENDANCES_USER_GET",

  /** Untuk endpoint /getAttendancesUsers (admin) */
  ATTENDANCE_USERS_GET = "ATTENDANCE_USERS_GET",
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

/**
 * @access GET /getAttendancesUsers
 */
export type IGetAttendanceUsersSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetAttendanceUsersData>;

export interface GetAttendanceUsersData {
  users_attendances_count: number;
  absent_users_count: number;
  users_attendances: UsersAttendance[];
  absent_users: AbsentUser[];
}

export interface AbsentUser {
  id: number;
  name: string;
  position: string;
  profile_image: string;
  attendance_forms: AttendanceForm[];
}

export interface AttendanceForm {
  id: number;
  name: string;
}

export interface UsersAttendance {
  id: number;
  user_id: number;
  check_in: Date;
  check_out: Date;
  long_check_in: string;
  lat_check_in: string;
  long_check_out: string;
  lat_check_out: string;
  geo_loc_check_in: string | null;
  geo_loc_check_out: string | null;
  evidence: Evidence;
  is_wfo: number;
  user: User;
}

export interface Evidence {
  /** Both string are URLs to the evidence image */
  check_in_evidence: string;
  check_out_evidence: string;
}

export interface User {
  id: number;
  name: string;
  profile_image: string;
}
