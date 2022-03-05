import type { AxiosInstance } from "axios";
import QueryString from "qs";

import {
  GetFilterUsersParamsType,
  IGetFilterUsersSucceedResponse,
} from "./user.types";

export class UserService {
  /**
   * @access GET /getFilterUsers
   *
   * @see {UserServiceQueryKeys.FILTER_USERS}
   */
  static async filterUsers(
    axiosClient: AxiosInstance,
    params?: GetFilterUsersParamsType
  ) {
    const querySearch = QueryString.stringify(params, { addQueryPrefix: true });

    return axiosClient.get<IGetFilterUsersSucceedResponse>(
      "/getFilterUsers" + querySearch
    );
  }
}
