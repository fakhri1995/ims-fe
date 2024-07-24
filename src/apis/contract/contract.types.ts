import { HttpRequestWithDataSucceedResponse } from "types/common";

/**
 * @access GET /getContracts
 */
export interface IGetContractsPayload {
  page: number;
  rows: number;
  keyword?: string;
}

export type IGetContractsSucceedResponse =
  HttpRequestWithDataSucceedResponse<IGetContractsPaginationData>;

export interface IGetContractsPaginationData {
  current_page: number;
  data: IContractData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: string;
  prev_page_url: null;
  to: number;
  total: number;
}

/**
 * @access GET /getContract
 */
export type IGetContractSucceedResponse =
  HttpRequestWithDataSucceedResponse<IContractData>;

export interface IContractData {
  id: number;
  is_employee_active: string;
  contract_name: string;
  role_id: string;
  contract_status_id: string;
  pkwt_reference: string;
  contract_start_at: Date | string;
  contract_end_at: Date | string;
  placement: string;
  new_office: string;
  resign_at: null;
  annual_leave: number;
  gaji_pokok: string;
  bpjs_ks: string;
  bpjs_tk_jht: string;
  bpjs_tk_jkk: string;
  bpjs_tk_jkm: string;
  bpjs_tk_jp: string;
  pph21: string;
  show_all_benefit: number;
  employee_id: number;
  created_at: Date | string;
  updated_at: Date | string;
  created_by: number;
  deleted_at: null;
  contract_end_countdown: number;
  role: IRole;
  contract_status: IContractStatus;
}

export interface IContractStatus {
  id: number;
  name: string;
}

export interface IRole {
  id: number;
  name: string;
  alias: string;
}
