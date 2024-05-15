import type { AxiosInstance } from "axios";
import QueryString from "qs";

import { objectToFormData, permissionWarningNotification } from "lib/helper";

import type {
  GetAnnouncementEmployeeSucceedResponse,
  GetAnnouncementMorePayload,
  GetAnnouncementsPayload,
  GetAnnouncementsSucceedResponse,
  GetMailAnnouncementPayload,
  IAddAnnouncementPayload,
  IGetAnnouncementSucceedResponse,
  IGetMailAnnouncementSucceedResponse,
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

    const payloadFormData = objectToFormData(payload);

    return await axiosClient.post<HttpRequestBaseSucceedResponse>(
      "/addAnnouncement",
      payloadFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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

    const payloadFormData = objectToFormData(payload);

    return await axiosClient.post<HttpRequestBaseSucceedResponse>(
      "/updateAnnouncement",
      payloadFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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

  /**
   * Retrieve announcements in home dashboard.
   *
   * @access GET /getAnnouncemenEmployee
   */
  static async getAnnouncementEmployee(
    hasFeature: boolean,
    axiosClient: AxiosInstance
  ) {
    if (!hasFeature) {
      permissionWarningNotification(
        "Mendapatkan",
        "Daftar Employee Announcement"
      );
      return;
    }

    return await axiosClient.get<GetAnnouncementEmployeeSucceedResponse>(
      "/getAnnouncementEmployee"
    );
  }

  /**
   * Retrieve more announcements in home dashboard
   *
   * @access GET /getAnnouncementMore
   */
  static async getAnnouncementMore(
    hasFeature: boolean,
    axiosClient: AxiosInstance,
    params: GetAnnouncementMorePayload
  ) {
    if (!hasFeature) {
      permissionWarningNotification("Mendapatkan", "Daftar More Announcement");
      return;
    }

    const qs = QueryString.stringify(params, { addQueryPrefix: true });

    return await axiosClient.get<GetAnnouncementEmployeeSucceedResponse>(
      "/getAnnouncementMore" + qs
    );
  }

  /**
   * Retrieve email history of an announcement by announcement ID.
   *
   * @access GET /getMailAnnouncement
   */
  static async getMailAnnouncement(
    hasFeature: boolean,
    axiosClient: AxiosInstance,
    params?: GetMailAnnouncementPayload
  ) {
    if (!hasFeature) {
      permissionWarningNotification(
        "Mendapatkan",
        "Riwayat Email Announcement"
      );
      return;
    }

    const qs = QueryString.stringify(params, { addQueryPrefix: true });

    return await axiosClient.get<IGetMailAnnouncementSucceedResponse>(
      "/getMailAnnouncement" + qs
    );
  }
}
