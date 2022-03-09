import { HttpRequestWithDataSucceedResponse } from "types/common";

export enum UserServiceQueryKeys {
  FILTER_USERS = "USERS_GET",
}

export enum FilterUsersTypeParamEnum {
  AGENT = 1,
  REQUESTER = 2,
}

export type FilterUsersType =
  | FilterUsersTypeParamEnum.AGENT
  | FilterUsersTypeParamEnum.REQUESTER
  | null;

export type GetFilterUsersParamsType = Partial<{
  name: string;
  type: FilterUsersType;
}>;

/**
 * @access GET /getFilterUsers
 */
export type IGetFilterUsersSucceedResponse = HttpRequestWithDataSucceedResponse<
  GetFilterUsersDatum[]
>;

/** a.k.a User */
export interface GetFilterUsersDatum {
  id: number;
  name: string;
  company_id: number;
  profile_image: string;
  position: null | string;
  company: Company;
  attendance_forms: AttendanceForm[];
}

export interface AttendanceForm {
  id: number;
}

export interface Company {
  id: number;
  name: string;
  full_name: string;
}
