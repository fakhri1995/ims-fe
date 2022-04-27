import { AxiosInstance } from "axios";
import QueryString from "qs";

import type { GetCompanyClientListSucceedResponse } from "./company.types";

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
}
