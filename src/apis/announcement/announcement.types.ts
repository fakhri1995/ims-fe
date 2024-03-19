import { RcFile } from "antd/lib/upload";

import { AgentDetailData } from "apis/user";

import {
  HttpRequestWithDataSucceedResponse,
  ProfileImageAttribute,
} from "types/common";

/**
 * @access GET /getAnnouncements
 */
export interface GetAnnouncementsPayload {
  page: number;
  rows: number;
  keyword?: string;
}

export type GetAnnouncementsSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetAnnouncementsPaginationData>;

export interface GetAnnouncementsPaginationData {
  current_page: number;
  data: AnnouncementData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: string;
  prev_page_url: null;
  to: number;
  total: number;
}

/**
 * @access GET /getAnnouncement
 */
export type IGetAnnouncementSucceedResponse =
  HttpRequestWithDataSucceedResponse<AnnouncementData>;

export interface AnnouncementData {
  user_id: number;
  id: number;
  title: string;
  text: string;
  publish_at: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at: Date | string;
  user: AgentDetailData;
  thumbnail_image?: ProfileImageAttribute;
}

/**
 * @access POST /addAnnouncement
 */
export interface IAddAnnouncementPayload {
  title: string;
  text: string | HTMLElement;
  publish_type: "now" | "pending";
  publish_at?: Date | string;
  thumbnail_image?: RcFile | Blob | File;
}

/**
 * @access POST /updateAnnouncement
 */
export interface IUpdateAnnouncementPayload {
  _method?: "PUT";
  id: number;
  title: string;
  text: string | HTMLElement;
  publish_type: "now" | "pending";
  publish_at?: Date | string;
  thumbnail_image?: RcFile | Blob | File;
}

/**
 * @access GET /getAnnouncementEmployee
 */

export type GetAnnouncementEmployeeSucceedResponse =
  HttpRequestWithDataSucceedResponse<AnnouncementData[]>;

/**
 * @access GET /getAnnouncementMore
 */
export interface GetAnnouncementMorePayload {
  current_id: number;
}
