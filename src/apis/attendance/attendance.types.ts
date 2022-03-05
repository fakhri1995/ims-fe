export enum AttendanceServiceQueryKeys {
  FIND = "ATTENDANCE_FORMS_GET",
  FIND_ONE = "ATTENDANCE_FORM_GET",
}

/**
 * @access GET /getAttendanceForm?id=[aktivitasId]
 */
export interface IGetAttendanceFormSucceedResponse {
  success: boolean;
  message: string;
  data: GetAttendanceFormData;
  status: number;
}

export interface GetAttendanceFormData {
  id: number;
  name: string;
  description: string;
  details: Detail[];
  updated_at: Date | string;
  deleted_at: null;
  users: User[];
  creator: Creator;
}

export interface Creator {
  id: number;
  name: string;
  profile_image: string;
  position: string;
}

export interface Detail {
  key: string;
  name: string;
  type: number;
  description: string;
  list?: string[];
}

export interface User {
  id: number;
  name: string;
  profile_image: string;
  position: string;
}

/**
 * @access GET /getAttendanceForms
 */
export interface IGetAttendanceFormsParams {
  page?: number;
  rows?: number;
  sort_by?: "name" | "description" | "updated_at" | "count" | string;
  sort_type?: string;
  keyword?: string;
}

export interface IGetAttendanceFormsSucceedResponse {
  success: boolean;
  message: string;
  data: GetAttendanceFormsData;
  status: number;
}

export interface GetAttendanceFormsData {
  current_page: number;
  data: GetAttendanceFormsDatum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface GetAttendanceFormsDatum {
  id: number;
  name: string;
  description: string;
  updated_at: Date | string;
  users_count: number;
}

/**
 * @access POST /addAttendanceForm
 */
export interface IAddAttendanceFormPayload {
  name: string;
  description: string;
  details: Detail[];
}

export interface IAddAttendanceFormSucceedResponse {
  success: boolean;
  message: string;
  id: number;
  status: number;
}

export interface Detail {
  name: string;
  description: string;
  type: number;
  required: boolean;
  list?: string[];
}

/**
 * @access PUT /updateAttendanceForm
 */
export interface IUpdateAttendanceFormPayload {
  id: number;
  name: string;
  description: string;
}

export interface IUpdateAttendanceFormSucceedResponse {
  success: boolean;
  message: string;
  status: number;
}

/**
 * @access POST /addUserAttendanceForm
 * @access DELETE /removeUserAttendanceForm
 */
export interface IAddUserAttendanceFormPayload {
  id: number;
  user_ids: number[];
}
export type IRemoveUserAttendanceFormPayload = IAddUserAttendanceFormPayload;

/** Aliases */
export type IDeleteAttendanceFormSucceedResponse = IUpdateAttendanceFormPayload;
export type IAddUserAttendanceFormSucceedResponse =
  IUpdateAttendanceFormPayload;
export type IRemoveUserAttendanceFormSucceedResponse =
  IUpdateAttendanceFormPayload;
