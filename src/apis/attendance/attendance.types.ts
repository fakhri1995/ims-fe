import type {
  HttpRequestWithDataSucceedResponse,
  ProfileImageAttribute,
} from "types/common";

export enum AttendanceServiceQueryKeys {
  /** Informasi attendance staff (currently logged in User) */
  ATTENDANCES_USER_GET = "ATTENDANCES_USER_GET",

  /** Untuk endpoint /getAttendancesUsers (admin) */
  ATTENDANCE_USERS_GET = "ATTENDANCE_USERS_GET",

  /** Untuk endpoint /getAttendancesUsersPaginate (admin) */
  ATTENDANCE_USERS_PAGINATE_GET = "ATTENDANCE_USERS_PAGINATE_GET",

  /** Detail attendance */
  ATTENDANCE_USER_GET = "ATTENDANCE_USER_GET",

  ATTENDANCES_CLIENT_GET = "ATTENDANCES_CLIENT_GET",
}

export type AttendanceExportExcelDataCriteria = {
  from: Date;
  to: Date;

  attendance_form_id?: number;
  user_ids?: number[];
};

export type AttendanceExportExcelDataResult = {
  file: Blob | null;
  fileName: string;
};

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
  geo_loc_check_in: GeolocationCheckInOut | null;
  geo_loc_check_out: GeolocationCheckInOut | null;
  evidence: Evidence[];
  is_wfo: number;
  is_late: boolean;
}

export interface GeolocationCheckInOut {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  place_rank: number;
  category: string;
  type: string;
  addresstype: string;
  name: string;
  display_name: string;
  address: Address;
}

export interface Address {
  road: string;
  suburb: string;
  city: string;
  county: string;
  postcode: string;
  country: string;
  country_code: string;
}

/**
 * @access POST /setAttendanceToggle
 */
export interface ISetAttendanceTogglePayload<T extends File> {
  long: string;
  lat: string;
  geo_loc: string | null;
  evidence: T;
  wfo: 1 | 0;
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
  profile_image: ProfileImageAttribute;
  attendance_forms: AttendanceForm[];
}

export interface AttendanceForm {
  id: number;
  name: string;
}

export interface UsersAttendance {
  id: number;
  user_id: number;
  check_in: string;
  check_out: string;
  long_check_in: string;
  lat_check_in: string;
  long_check_out: string;
  lat_check_out: string;
  geo_loc_check_in: GeolocationCheckInOut | null;
  geo_loc_check_out: GeolocationCheckInOut | null;
  is_wfo: 0 | 1;
  checked_out_by_system: 0 | 1;
  evidence: Evidence[];
  user: UsersAttendanceUser;
}

export interface UsersAttendanceUser {
  id: number;
  name: string;
  profile_image: ProfileImageAttribute;
}

/**
 * @access GET /getAttendancesUsersPaginate
 */

export interface IGetAttendanceUsersPaginateParams {
  page?: number;
  rows?: number;
  sort_by?: "name" | "description" | "updated_at" | "count" | string;
  sort_type?: string;
  keyword?: string;
  company_ids?: string;
  is_late?: number;
  is_hadir?: number;
}

export type IGetAttendanceUsersPaginateSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetAttendanceUsersPaginateData>;

export interface GetAttendanceUsersPaginateData {
  current_page: number;
  data: GetAttendanceUsersPaginateDatum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface GetAttendanceUsersPaginateDatum {
  id: number;
  name: string;
  attendance_user: AttendanceUser;
  profile_image?: ProfileImageAttribute;
}

export interface AttendanceUser {
  id: number;
  user_id: number;
  check_in: string;
  check_out: string;
  long_check_in: string;
  lat_check_in: string;
  long_check_out: string;
  lat_check_out: string;
  geo_loc_check_in: GeolocationCheckInOut | null;
  geo_loc_check_out: GeolocationCheckInOut | null;
  is_wfo: 0 | 1;
  is_late: 0 | 1;
  checked_out_by_system: 0 | 1;
}

/**
 * @access GET /getAttendanceUser
 */
export type IGetAttendanceUserSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetAttendanceUserData>;

export interface GetAttendanceUserData {
  user_attendance: UserAttendanceDetailData;
  attendance_activities: AttendanceActivity[];
}

export interface UserAttendanceDetailData {
  id: number;
  user_id: number;
  name: string;
  check_in: Date;
  check_out: Date;
  long_check_in: string;
  lat_check_in: string;
  long_check_out: string;
  lat_check_out: string;
  geo_loc_check_in: GeolocationCheckInOut | null;
  geo_loc_check_out: GeolocationCheckInOut | null;
  is_late: number;
  is_wfo: number;
  checked_out_by_system: number;
  evidence: Evidence[];
}

export interface AttendanceActivity {
  id: number;
  user_id: number;
  attendance_form_id: number;
  details: AttendanceActivityDetail[];
  updated_at: string;
  attendance_form: AttendanceForm;
}

export interface AttendanceForm {
  id: number;
  details: AttendanceFormDetail[];
}

export interface AttendanceFormDetail {
  key: string;
  name: string;
  type: number;
  required: boolean;
  description: string;
  list?: any[];
}

export interface AttendanceActivityDetail {
  key: string;
  value: number[] | string;
}

export interface Evidence {
  link: string;
  description: "check_in_evidence" | "check_out_evidence";
}
