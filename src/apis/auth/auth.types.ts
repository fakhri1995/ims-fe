import { FormAktivitasTypes } from "apis/attendance";

import { HttpRequestWithDataSucceedResponse } from "types/common";

export enum AuthServiceQueryKeys {
  DETAIL_PROFILE = "GET_DETAIL_PROFILE",
}

/**
 * @access GET /detailProfile
 */
export type IDetailProfileSucceedResponse =
  HttpRequestWithDataSucceedResponse<IDetailProfileData>;

export interface IDetailProfileData {
  id: number;
  email: string;
  name: string;
  nip: string;
  profile_image: string;
  phone_number: string;
  role: number;
  position: string;
  created_time: Date;
  features: any[];
  company: Company;
  groups: Group[];
  attendance_forms: AttendanceForm[];
  roles: Group[];
}

export interface AttendanceForm {
  id: number;
  name: string;
  description: string;
  details: Detail[];
}

export interface Detail {
  key: string;
  name: string;
  type: FormAktivitasTypes;
  description: string;
  list?: string[];
  required?: boolean;
}

export interface Company {
  id: number;
  name: string;
  image_logo: string;
  phone_number: string;
  address: string;
  role: number;
  is_enabled: number;
}

export interface Group {
  id: number;
  name: string;
}
