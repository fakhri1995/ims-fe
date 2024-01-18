import type { AxiosInstance } from "axios";
import QueryString from "qs";

import { objectToFormData, permissionWarningNotification } from "lib/helper";

import {
  CreateAgentPayload,
  IGetAgentsPaginateParams,
  IGetAgentsPaginateSucceedResponse,
  UpdateAgentDetailPayload,
} from "./agent.types";

import type { HttpRequestBaseSucceedResponse } from "types/common";

export class AgentService {
  /**
   * Create new agent.
   *
   * @access POST /addAgentMember
   */
  static async create(axiosClient: AxiosInstance, payload: CreateAgentPayload) {
    const formDataPayload = objectToFormData(payload);

    return await axiosClient.post<
      HttpRequestBaseSucceedResponse & { id: number }
    >("/addAgentMember", formDataPayload, {
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

  /**
   * Retrieve all agents with pagination.
   *
   * @access GET /getAgentList
   */
  static async getAgents(
    hasFeature: boolean,
    axiosClient: AxiosInstance,
    params?: IGetAgentsPaginateParams
  ) {
    if (!hasFeature) {
      permissionWarningNotification("Mendapatkan", "Daftar Agent");
      return;
    }

    const qs = QueryString.stringify(params, { addQueryPrefix: true });

    return await axiosClient.get<IGetAgentsPaginateSucceedResponse>(
      "/getAgentList" + qs
    );
  }
}
