import type { AxiosInstance } from "axios";

import { IDetailProfileSucceedResponse } from "./auth.types";

export class AuthService {
  /**
   * Retrieve current user's information.
   *
   * @see {AuthServiceQueryKeys.DETAIL_PROFILE}
   * @access GET /detailProfile
   */
  static async whoAmI(axiosClient: AxiosInstance) {
    return await axiosClient.get<IDetailProfileSucceedResponse>(
      "/detailProfile"
    );
  }
}
