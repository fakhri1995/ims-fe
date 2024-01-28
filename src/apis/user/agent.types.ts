import { DetailProfileData } from "apis/auth";

import { Role } from "./requester.types";

import {
  HttpRequestWithDataSucceedResponse,
  ProfileImageAttribute,
} from "types/common";

/**
 * @access POST /addAgentMember
 */
export interface CreateAgentPayload {
  fullname: string;
  email: string;
  phone_number: string;
  nip: number;

  password: string;
  confirm_password: string;

  position: string;
  company_id: number;

  attendance_form_ids: number[];
  role_ids: number[];

  profile_image: File;
}

/**
 * @access POST /updateAgentDetail
 */
export interface UpdateAgentDetailPayload {
  id: number;
  fullname: string;
  phone_number: string;
  profile_image: File;
  nip: number;
  role_ids: number[];
  attendance_form_ids: number[];
  position: string;
}

/**
 * @access GET /getAgentList
 */

export interface IGetAgentsPaginateParams {
  page?: number;
  rows?: number;
  name?: string;
  company_id?: number;
}

export type IGetAgentsPaginateSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetAgentsPaginateData>;

export interface GetAgentsPaginateData {
  current_page: number;
  data: AgentDetailData[];
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

export interface AgentDetailData {
  id: number;
  name: string;
  nip: string;
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
}
