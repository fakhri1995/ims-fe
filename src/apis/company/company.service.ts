import type { AxiosInstance } from "axios";
import QueryString from "qs";

import { objectToFormData } from "lib/helper";

import type {
  AddCompanyPayload,
  GetCompanyClientListSucceedResponse,
  UpdateCompanyPayload,
} from "./company.types";

export class CompanyService {
  /**
   * Retrieve list of client company and additional option to include the main company.
   *
   * @access GET /getCompanyClientList
   * @param withMainCompany Whether include the main company (e.g. Mitramas Infosys Global) or only the client.
   */
  static async getCompanyClientList(
    axiosClient: AxiosInstance,
    withMainCompany: boolean = false
  ) {
    const qs = QueryString.stringify(
      { with_mig: withMainCompany },
      { addQueryPrefix: true }
    );

    return await axiosClient.get<GetCompanyClientListSucceedResponse>(
      "/getCompanyClientList" + qs
    );
  }

  /**
   * Update existing company.
   *
   * @access POST /updateCompany
   */
  static async update(
    axiosClient: AxiosInstance,
    payload: UpdateCompanyPayload
  ) {
    const payloadFormData = objectToFormData(payload);

    return await axiosClient.post("/updateCompany", payloadFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Add new company location.
   *
   * @access POST /addCompanyBranch   "main"
   * @access POST /addCompanySub      "sub"
   * @access POST /addCompanyClient   "client"
   */
  static async addCompany(
    axiosClient: AxiosInstance,
    payload: AddCompanyPayload,
    target: "main" | "sub" | "client"
  ) {
    const payloadFormData = objectToFormData(payload);

    const endpoints = {
      main: "/addCompanyBranch",
      sub: "/addCompanySub",
      client: "/addCompanyClient",
    };

    return await axiosClient.post(endpoints[target], payloadFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
