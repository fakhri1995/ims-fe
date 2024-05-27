import { RcFile } from "antd/lib/upload";

import { Group } from "apis/auth";
import { AgentDetailData } from "apis/user";

import {
  HttpRequestWithDataAndPagingSucceedResponse,
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
  push_notif: number;
  user: AgentDetailData;
  thumbnail_image?: ProfileImageAttribute;
}

/**
 * @access POST /addAnnouncement or POST /updateAnnouncement
 */
export interface IAnnouncementPayload {
  _method?: "PUT";
  id?: number;
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

/**
 * @access GET /getMailAnnouncement
 */
export interface GetMailAnnouncementPayload {
  id: number;
  page: number;
  rows: number;
  keyword?: string;
}

export type IGetMailAnnouncementSucceedResponse =
  HttpRequestWithDataAndPagingSucceedResponse<AnnouncementMailData>;

export interface AnnouncementMailData {
  user_id: number;
  title: string;
  deleted_at: Date | string;
  user: AgentDetailData;
  thumbnail_image?: ProfileImageAttribute;
  id: number;
  announcement_id: number;
  publish_at: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
  is_send: number;
  purposes: string[];
  result: AnnouncementMailResultData;
  staff: [];
  group: AnnouncementMailGroupData[];
}

interface AnnouncementMailResultData {
  id: number;
  announcement_mail_id: number;
  description: string;
  created_at: Date | string;
  updated_at: Date | string;
}

interface AnnouncementMailGroupData {
  id: number;
  announcement_mail_id: number;
  group_id: number;
  created_at: Date | string;
  updated_at: Date | string;
  groups: Group;
}

/**
 * @access GET /sendMailAnnouncement
 */
export interface SendMailAnnouncementPayload {
  id: number;
  purpose_type: string; // "staff" | "group"
  purpose_ids: number[]; // array (id user || id group);
  publish_type: string; //"now" | "pending";
  publish_at?: Date | string;
}
