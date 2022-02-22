import type { AxiosInstance } from "axios";

import { IGetDetailProfile } from "types/api/login/get-detailprofile";

export class LoginService {
  static async me(axiosClient: AxiosInstance) {
    return await axiosClient.get<IGetDetailProfile>("/detailProfile");
  }
}
