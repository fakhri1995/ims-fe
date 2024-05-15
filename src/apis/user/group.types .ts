import { User } from "apis/attendance";

import type {
  HttpRequestWithDataSucceedResponse,
  ProfileImageAttribute,
} from "types/common";

export enum FilterUsersTypeParamEnum {
  AGENT = 1,
  REQUESTER = 2,
}

export type FilterUsersType =
  | FilterUsersTypeParamEnum.AGENT
  | FilterUsersTypeParamEnum.REQUESTER
  | null;

export type GetFilterGroupsWithUsersParamsType = Partial<{
  name: string;
  type: FilterUsersType;
  company_id: number;
}>;

/**
 * @access GET /getFilterUsers
 */
export type IGetFilterGroupsWithUsersSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetFilterGroupsWithUsersDatum[]>;

/** a.k.a User */
export interface GetFilterGroupsWithUsersDatum {
  id: number;
  name: string;
  users: User[];
}
