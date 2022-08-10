import type { AxiosInstance } from "axios";
import QueryString from "qs";

import type {
  GetCareersParams,
  GetCareersSucceedResponse,
} from "./career_v2.types";

export enum CareerV2QueryKeys {
  getCareers = "CAREERS_V2_GET",
}

export class CareerV2Service {
  /**
   * Retrieve all available careers.
   *
   * @access GET /v2/getCareer
   */
  static async getCareers(
    axiosClient: AxiosInstance,
    params: GetCareersParams
  ) {
    const qs = QueryString.stringify(params, { addQueryPrefix: true });

    return await axiosClient.get<GetCareersSucceedResponse>(
      "/v2/getCareers" + qs
    );
  }
}
