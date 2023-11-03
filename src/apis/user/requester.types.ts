import type {
  HttpRequestWithDataSucceedResponse,
  ProfileImageAttribute,
} from "types/common";

/**
 * @access POST /addRequesterMember
 */
export interface CreateRequesterPayload {
  fullname: string;
  email: string;
  role_ids: number[];
  phone_number: string;
  profile_image: File;
  company_id: number;
  password: string;
  confirm_password: string;
  position: string;
}

/**
 * @access POST /updateRequesterDetail
 */
export interface UpdateRequesterPayload {
  id: number;
  fullname: string;
  role: number;
  phone_number: string;
  profile_image: File;
  company_id: number;
  email: string;
  role_ids: number[];
  position: string;
}

export interface GetRequesterParams {
  page: number;
  rows: number;
  name: string;
  company_id: number;
  is_enabled: boolean;
}

/**
 * @access GET /getRequesterList
 */
export type IGetRequesterListSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetRequesterDatum[]>;

/** a.k.a Requester */
export interface GetRequesterDatum {
  id: number;
  name: string;
  nip: number;
  email: string;
  role: number;
  company_id: number;
  positon: string;
  phone_number: string;
  created_time: string;
  is_enabled: boolean;
  company_name: string;
  roles: Role[];
  profile_image: ProfileImageAttribute;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  deleted_at: string | null;
}
