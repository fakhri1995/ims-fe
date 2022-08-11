import type { AxiosInstance } from "axios";
import QueryString from "qs";

import type {
  GetCareersParams,
  GetPostedCareersSucceedResponse,
} from "./career_v2.types";

export enum CareerV2QueryKeys {
  getPostedCareers = "getPostedCareers",
}

export class CareerV2Service {
  /**
   * Retrieve all available careers.
   * No Authorization required.
   *
   * @access GET /v2/getPostedCareers
   */
  static async getPostedCareers(
    axiosClient: AxiosInstance,
    params: GetCareersParams
  ) {
    const qs = QueryString.stringify(params, { addQueryPrefix: true });

    return await axiosClient.get<GetPostedCareersSucceedResponse>(
      "/v2/getPostedCareers" + qs
    );
  }
}
