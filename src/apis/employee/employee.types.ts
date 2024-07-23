import { IContractData } from "apis/contract/contract.types";

import {
  HttpRequestWithDataAndPagingSucceedResponse,
  HttpRequestWithDataSucceedResponse,
  ProfileImageAttribute,
} from "types/common";

/**
 * @access GET /getEmployees
 */
export interface IGetEmployeesPayload {
  page: number;
  rows: number;
  keyword?: string;
}

export type IGetEmployeesSucceedResponse =
  HttpRequestWithDataSucceedResponse<IGetEmployeesPaginationData>;

export interface IGetEmployeesPaginationData {
  current_page: number;
  data: IEmployeeData[];
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
 * @access GET /getEmployee
 */
export type IGetEmployeeSucceedResponse =
  HttpRequestWithDataSucceedResponse<IEmployeeData>;

export interface IEmployeeData {
  user_id: number;
  id: number;
  name: string;
  join_at: Date | string;
  nip: string;
  nik: string;
  alias: string;
  email_office: string;
  email_personal: string;
  domicile?: string;
  phone_number: string;
  birth_place: string;
  birth_date: Date | string;
  gender: string;
  blood_type: string;
  marital_status: number;
  number_of_children: number;
  bio_mother_name: string;
  npwp: string;
  bpjs_kesehatan: string;
  bpjs_ketenagakerjaan: string;
  acc_number_bukopin: string;
  acc_number_another: string;
  acc_name_another: string;
  is_posted: number;
  last_contract_id: number;
  created_at: Date | string;
  updated_at: Date | string;
  created_by: number;
  updating_by: number;
  deleted_at?: Date | string;
  role_name: string;
  contract: IContractData;
}

/**
 * @access POST /addAnnouncement or POST /updateAnnouncement
 */
// export interface IAnnouncementPayload {
//   _method?: "PUT";
//   id?: number;
//   title: string;
//   text: string | HTMLElement;
//   publish_type: "now" | "pending";
//   publish_at?: Date | string;
//   thumbnail_image?: RcFile | Blob | File | ProfileImageAttribute;
// }
