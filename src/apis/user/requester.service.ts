import type { AxiosInstance } from "axios";

import { objectToFormData } from "lib/helper";

import type {
  CreateRequesterPayload,
  UpdateRequesterPayload,
} from "./requester.types";

import type { HttpRequestBaseSucceedResponse } from "types/common";

export class RequesterService {
  /**
   * Create new requester.
   *
   * @access POST /addRequesterMember
   */
  static async create(
    axiosClient: AxiosInstance,
    payload: CreateRequesterPayload
  ) {
    const payloadFormData = objectToFormData(payload);

    return await axiosClient.post<
      HttpRequestBaseSucceedResponse & { id: number }
    >("/addRequesterMember", payloadFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Update existing requester.
   *
   * @access POST /updateRequesterDetail
   */
  static async update(
    axiosClient: AxiosInstance,
    payload: UpdateRequesterPayload
  ) {
    const payloadFormData = objectToFormData(payload);

    return await axiosClient.post<HttpRequestBaseSucceedResponse>(
      "/updateRequesterDetail",
      payloadFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
}
