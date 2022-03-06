import type { AxiosInstance } from "axios";

import { IDetailProfileSucceedResponse } from "./auth.types";

export class AuthService {
  static async whoAmI(axiosClient: AxiosInstance) {
    return await axiosClient.get<IDetailProfileSucceedResponse>(
      "/detailProfile"
    );
  }
}
