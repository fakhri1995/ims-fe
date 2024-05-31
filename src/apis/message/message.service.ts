import type { AxiosInstance } from "axios";
import QueryString from "qs";

import { permissionWarningNotification } from "lib/helper";

import type {
  GetMessagesPayload,
  GetMessagesSucceedResponse,
} from "./message.types";

export class MessageService {
  /**
   * Retrieve many announcements with `page` and `rows` options.
   *
   * @access GET /getPaginateMessage
   */
  static async getPaginateMessages(
    hasFeature: boolean,
    axiosClient: AxiosInstance,
    params?: GetMessagesPayload
  ) {
    if (!hasFeature) {
      permissionWarningNotification("Mendapatkan", "Daftar Message");
      return;
    }

    const qs = QueryString.stringify(params, { addQueryPrefix: true });

    return await axiosClient.get<GetMessagesSucceedResponse>(
      "/getPaginateMessage" + qs
    );
  }
}
