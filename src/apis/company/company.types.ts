import type { HttpRequestWithDataSucceedResponse } from "types/common";

export enum CompanyServiceQueryKeys {
  COMPANY_CLIENTS_GET = "COMPANY_CLIENTS_GET",
}

/**
 * Succeed response from endpoint `/getCompanyClientList`
 *
 * @access GET /getCompanyClientList
 */
export type GetCompanyClientListSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetCompanyClientListData>;

export interface GetCompanyClientListData {
  id: number;
  name: string;
  address: string;
  phone_number: string;
  image_logo: string;
  role: number;
  is_enabled: number;
}
