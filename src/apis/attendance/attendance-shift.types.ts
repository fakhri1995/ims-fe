import type {
  HttpRequestWithDataSucceedResponse,
  ProfileImageAttribute,
} from "types/common";

/**
 * @access GET /getShifts
 */

export interface IGetShiftsPaginateParams {
  page?: number;
  rows?: number;
  keyword?: string;
}

export type IGetShiftsPaginateSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetShiftsPaginateData>;

export interface GetShiftsPaginateData {
  current_page: number;
  data: ShiftDetailData[];
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

export interface ShiftDetailData {
  id: number;
  company_id: number | null;
  title: string;
  start_at: string;
  end_at: string;
  start_break: string;
  end_break: string;
  status: number;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}

/**
 * @access GET /getShift
 */
export type IGetShiftSucceedResponse =
  HttpRequestWithDataSucceedResponse<ShiftDetailData>;

/**
 * @access POST /addShift
 */
export interface IAddShiftPayload {
  title: string;
  start_at: string;
  end_at: string;
  start_break: string;
  end_break: string;
}

/**
 * @access PUT /updateShift
 */
export interface IUpdateShiftPayload {
  id: number;
  title: string;
  start_at: string;
  end_at: string;
  start_break: string;
  end_break: string;
}

/**
 * @access PUT /updateShiftStatus
 */
export interface IUpdateShiftStatusPayload {
  id: number;
  status: boolean;
}
