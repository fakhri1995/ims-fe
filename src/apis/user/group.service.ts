import type { AxiosInstance } from "axios";
import QueryString from "qs";

import { permissionWarningNotification } from "lib/helper";

import {
  GetFilterGroupsWithUsersParamsType,
  IGetFilterGroupsWithUsersSucceedResponse,
} from "./group.types ";

export class GroupService {
  /**
   * @access GET /getFilterGroupsWithUsers
   *
   */
  static async filterGroupsWithUsers(
    hasFeature: boolean,
    axiosClient: AxiosInstance
  ) {
    if (!hasFeature) {
      permissionWarningNotification("Mendapatkan", "Daftar Group With Users");
      return;
    }

    return axiosClient.get<IGetFilterGroupsWithUsersSucceedResponse>(
      "/getFilterGroupsWithUsers"
    );
  }
}
