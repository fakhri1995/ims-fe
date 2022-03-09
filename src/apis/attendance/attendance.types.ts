/**
 * @access GET /getAttendancesUser
 */
export interface IGetAttendancesUserSucceedResponse {
  success: boolean;
  message: string;
  data: IGetAttendancesUserData[];
  status: number;
}

export interface IGetAttendancesUserData {
  id: number;
  user_id: number;
  check_in: Date;
  check_out: Date;
  long_check_in: string;
  lat_check_in: string;
  long_check_out: string;
  lat_check_out: string;
  geo_loc_check_in: null;
  geo_loc_check_out: null;
  evidence: Evidence;
  is_wfo: number;
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
