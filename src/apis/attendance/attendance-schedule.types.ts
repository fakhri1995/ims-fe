import { Role } from "apis/user";

import type {
  HttpRequestWithDataSucceedResponse,
  ProfileImageAttribute,
} from "types/common";

/**
 * @access GET /getSchedules
 */

export interface IGetSchedulesPaginateParams {
  page?: number;
  rows?: number;
  keyword?: string;
  start_at: string;
}

export type IGetSchedulesPaginateSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetSchedulesPaginateData>;

export interface GetSchedulesPaginateData {
  current_page: number;
  data: EmployeeScheduleData[];
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

export interface EmployeeScheduleData {
  id: number;
  name: string;
  nip: number;
  email: string;
  role: number;
  company_id: number;
  position: string;
  phone_number: string;
  created_time: string;
  is_enabled: number;
  company_name: string;
  profile_image: ProfileImageAttribute;
  roles: Role[];
  schedule: ScheduleData[];
}

export interface ScheduleData {
  id: number;
  user_id: number;
  shift_id: number;
  date: string;
  created_at: string;
  upated_at: string;
}

/**
 * @access GET /getSchedule
 */
export type IGetScheduleSucceedResponse =
  HttpRequestWithDataSucceedResponse<ScheduleDetailData>;

export interface ScheduleDetailData extends ScheduleData {
  user: ScheduleUserData;
}

export interface ScheduleUserData {
  id: number;
  email: string;
  name: string;
  nip: string;
  phone_number: string;
  company_id: number;
  role: number;
  position: string;
  is_enabled: number;
  created_time: string;
  deleted_at?: string | null;
  company: ScheduleCompanyData;
}

export interface ScheduleCompanyData {
  id: number;
  parent_id: number;
  name: string;
  address: string;
  phone_number: string;
  role: number;
  is_enabled: number;
  singkatan: string;
  tanggal_pkp: Date | string;
  penanggung_jawab: string;
  npwp: string;
  fax: string;
  email: string;
  website: string;
  check_in_time?: string;
  autocheckout: number;
  deleted_at?: string;
}

/**
 * @access POST /addSchedule
 */
export interface IAddSchedulePayload {
  user_ids: number[];
  shift_id: number;
  date: string;
}

/**
 * @access PUT /updateSchedule
 */
export interface IUpdateSchedulePayload {
  id: number;
  shift_id: number;
}
