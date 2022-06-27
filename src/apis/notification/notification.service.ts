import type { AxiosInstance } from "axios";
import QueryString from "qs";

import type {
  GetLastTenNotificationSucceedResponse,
  GetNotificationsPayload,
  GetNotificationsSucceedResponse,
} from "./notification.types";

import type { HttpRequestBaseSucceedResponse } from "types/common";

export class NotificationService {
  /**
   * Retrieve up to recent-most 10 notifications.
   *
   * @access GET /getNotification
   */
  static async getLastTen(axiosClient: AxiosInstance) {
    return await axiosClient.get<GetLastTenNotificationSucceedResponse>(
      "/getNotification"
    );
  }

  /**
   * Retrieve many notifications with `page` and `rows` options.
   *
   * @access GET /getNotifications
   */
  static async getAll(
    axiosClient: AxiosInstance,
    payload: GetNotificationsPayload = {
      page: 1,
      rows: 10,
    }
  ) {
    const qs = QueryString.stringify(payload, { addQueryPrefix: true });

    return await axiosClient.get<GetNotificationsSucceedResponse>(
      "/getNotifications" + qs
    );
  }

  /**
   * Mark one notification if the User had read it.
   *
   * @access POST /readNotification
   */
  static async readOne(axiosClient: AxiosInstance, notificationId: number) {
    return await axiosClient.post<HttpRequestBaseSucceedResponse>(
      "/readNotification",
      { id: notificationId }
    );
  }

  /**
   * Mark all notifications that had read.
   * E.g. by clicking "Tandai semua telah dibaca".
   *
   * @access POST /readAllNotifications
   */
  static async readAll(axiosClient: AxiosInstance) {
    return await axiosClient.post<HttpRequestBaseSucceedResponse>(
      "/readAllNotifications"
    );
  }
}
