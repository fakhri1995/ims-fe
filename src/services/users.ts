import { AxiosInstance } from "axios";
import QueryString from "qs";

import {
  IGetFilterUsers,
  IGetFilterUsersCriteria,
} from "types/api/users/get-filter-users";

export class UsersService {
  static async getFilterUsers(
    axiosClient: AxiosInstance,
    criteria?: IGetFilterUsersCriteria
  ) {
    const querySearchCriteria = QueryString.stringify(criteria, {
      addQueryPrefix: true,
    });

    return await axiosClient.get<IGetFilterUsers>(
      "/getFilterUsers" + querySearchCriteria
    );
  }
}
