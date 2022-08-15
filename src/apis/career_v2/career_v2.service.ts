import type { AxiosInstance } from "axios";
import QueryString from "qs";

import { objectToFormData } from "lib/helper";

import type {
  AddCareerPayload,
  GetPostedCareerParam,
  GetPostedCareerSucceedResponse,
  GetPostedCareersParams,
  GetPostedCareersSucceedResponse,
} from "./career_v2.types";

export enum CareerV2QueryKeys {
  getPostedCareers = "CAREERS_V2_POSTED_GET",
  getPostedCareer = "CAREER_V2_POSTED_GET",
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
    params: GetPostedCareersParams
  ) {
    const qs = QueryString.stringify(params, { addQueryPrefix: true });

    return await axiosClient.get<GetPostedCareersSucceedResponse>(
      "/v2/getPostedCareers" + qs
    );
  }

  /**
   * Retrieve a specific career.
   *
   * @access GET /v2/getPostedCareer
   */
  static async getPostedCareer(
    axiosClient: AxiosInstance,
    params: GetPostedCareerParam
  ) {
    if (!("id" in params) && !("slug" in params)) {
      throw new Error(
        "getPostedCareer method requires one param, none are given. "
      );
    }

    if (
      ("id" in params && params.id === undefined) ||
      ("slug" in params && params.slug === undefined)
    ) {
      return;
    }

    const qs = QueryString.stringify(params, { addQueryPrefix: true });

    return await axiosClient.get<GetPostedCareerSucceedResponse>(
      "/v2/getPostedCareer" + qs
    );
  }

  /**
   * Apply a job.
   *
   * @access POST /v2/addCareer
   */
  static async addCareer(
    axiosClient: AxiosInstance,
    payload: AddCareerPayload
  ) {
    const payloadFormData = objectToFormData(payload);

    return await axiosClient.post("/v2/addCareer", payloadFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
