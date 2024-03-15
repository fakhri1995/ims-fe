import type { AxiosInstance } from "axios";
import QueryString from "qs";

import { permissionWarningNotification } from "lib/helper";

import type {
  GetAnnouncementsPayload,
  GetAnnouncementsSucceedResponse,
  IAddAnnouncementPayload,
  IGetAnnouncementSucceedResponse,
  IUpdateAnnouncementPayload,
} from "./announcement.types";

import type { HttpRequestBaseSucceedResponse } from "types/common";

export class AnnouncementService {
  /**
   * Retrieve many announcements with `page` and `rows` options.
   *
   * @access GET /getAnnouncements
   */
  static async getAnnouncements(
    hasFeature: boolean,
    axiosClient: AxiosInstance,
    params?: GetAnnouncementsPayload
  ) {
    if (!hasFeature) {
      permissionWarningNotification("Mendapatkan", "Daftar Announcement");
      return;
    }

    const qs = QueryString.stringify(params, { addQueryPrefix: true });

    return await axiosClient.get<GetAnnouncementsSucceedResponse>(
      "/getAnnouncements" + qs
    );
  }

  /**
   * Retrieve announcement detail by its ID.
   *
   * @access GET /getAnnouncement
   */
  static async getAnnouncement(
    hasFeature: boolean,
    axiosClient: AxiosInstance,
    announcementId: number
  ) {
    if (!hasFeature) {
      permissionWarningNotification("Mendapatkan", "Detail Announcement");
      return;
    }

    const querySearch = QueryString.stringify(
      { id: announcementId },
      { addQueryPrefix: true }
    );

    return await axiosClient.get<IGetAnnouncementSucceedResponse>(
      "/getAnnouncement" + querySearch
    );
  }

  /**
   * Add new announcement
   *
   * @access POST /addAnnouncement
   */
  static async addAnnouncement(
    hasFeature: boolean,
    axiosClient: AxiosInstance,
    payload: IAddAnnouncementPayload
  ) {
    if (!hasFeature) {
      permissionWarningNotification("Menambah", "Announcement");
      return;
    }

    return await axiosClient.post<HttpRequestBaseSucceedResponse>(
      "/addAnnouncement",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  /**
   * Update announcement by its ID
   *
   * @access POST /updateAnnouncement
   */
  static async updateAnnouncement(
    hasFeature: boolean,
    axiosClient: AxiosInstance,
    payload: IUpdateAnnouncementPayload
  ) {
    if (!hasFeature) {
      permissionWarningNotification("Mengubah", "Announcement");
      return;
    }

    return await axiosClient.post<HttpRequestBaseSucceedResponse>(
      "/updateAnnouncement",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  /**
   * Delete Announcement by its ID.
   *
   * @access DELETE /deleteAnnouncement
   */
  static async deleteAnnouncement(
    hasFeature: boolean,
    axiosClient: AxiosInstance,
    announcementId: number
  ) {
    const querySearch = QueryString.stringify(
      { id: announcementId },
      { addQueryPrefix: true }
    );
    if (!hasFeature) {
      permissionWarningNotification("Menghapus", "Announcement");
      return;
    }

    return await axiosClient.delete<IGetAnnouncementSucceedResponse>(
      "/deleteAnnouncement" + querySearch
    );
  }
}
