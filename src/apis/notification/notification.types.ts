import { HttpRequestWithDataSucceedResponse } from "types/common";

/**
 * @access GET /getNotifications
 */
export interface GetNotificationsPayload {
  page: number;
  rows: number;
}

/**
 * @access GET /getNotification
 */
export type GetLastTenNotificationSucceedResponse =
  HttpRequestWithDataSucceedResponse<NotificationData[]>;

/**
 * @access GET /getNotifications
 */
export type GetNotificationsSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetNotificationsPaginationData>;

export interface GetNotificationsPaginationData {
  current_page: number;
  data: NotificationData[];
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

export interface NotificationData {
  notification_id: number;
  user_id: number;
  is_read: number;
  id: number;
  description: string;
  created_by: number;
  created_at: Date | string;
  notificationable_id: number;
  notificationable_type: string;
  link: string;
  image_type: string;
  color_type: string;
  need_push_notification: number;
}
