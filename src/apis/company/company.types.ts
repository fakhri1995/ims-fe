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
  HttpRequestWithDataSucceedResponse<GetCompanyClientListData[]>;

export interface GetCompanyClientListData {
  id: number;
  name: string;
  address: string;
  phone_number: string;
  image_logo: string;
  role: number;
  is_enabled: number;
}

/**
 * @access POST /updateCompany
 */
export interface UpdateCompanyPayload {
  id: number;
  name: string;
  address: string;
  phone_number: string;
  company_logo: File | null;
  singkatan: string;
  tanggal_pkp: Date | string;
  penanggung_jawab: string;
  npwp: string;
  fax: string;
  email: string;
  website: string;
  level: number;
  check_in_time?: number;
}

/**
 * @access POST /updateMainCompany
 */
export interface UpdateMainCompany {
  name: string;
  address: string;
  phone_number: string;
  company_logo: File;
  singkatan?: string;
  tanggal_pkp?: Date | string;
  penanggung_jawab?: string;
  npwp?: string;
  fax?: string;
  email?: string;
  website?: string;
}

/**
 * @access POST /addCompanyBranch
 * @access POST /addCompanyClient
 * @access POST /addCompanySub
 */
export interface AddCompanyPayload {
  name: string;

  address: string;

  phone_number: string;
  company_logo: File | null;
  parent_id: number;
  singkatan: string;
  tanggal_pkp?: Date | string;
  penanggung_jawab: string;
  npwp?: string;
  fax?: string;
  email?: string;
  website?: string;
}
