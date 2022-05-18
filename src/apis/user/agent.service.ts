import type { AxiosInstance } from "axios";

import { objectToFormData } from "lib/helper";

import { CreateAgentPayload, UpdateAgentDetailPayload } from "./agent.types";

import type { HttpRequestBaseSucceedResponse } from "types/common";

export class AgentService {
  /**
   * Create new agent.
   *
   * @access POST /addAgentMember
   */
  static async create(axiosClient: AxiosInstance, payload: CreateAgentPayload) {
    const formDataPayload = objectToFormData(payload);

    return await axiosClient.post("/addAgentMember", formDataPayload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Update an existing agent.
   *
   * @access POST /updateAgentDetail
   */
  static async update(
    axiosClient: AxiosInstance,
    payload: UpdateAgentDetailPayload
  ) {
    const formDataPayload = objectToFormData(payload);

    return await axiosClient.post<HttpRequestBaseSucceedResponse>(
      "/updateAgentDetail",
      formDataPayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
}
