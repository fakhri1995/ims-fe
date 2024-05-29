import { HttpRequestWithDataAndPagingSucceedResponse } from "types/common";

/**
 * @access GET /getPaginateMessage
 */
export interface GetMessagesPayload {
  page: number;
  rows: number;
  keyword?: string;
}

export type GetMessagesSucceedResponse =
  HttpRequestWithDataAndPagingSucceedResponse<MessageData>;

export interface MessageData {
  id: number;
  name: string;
  company_email: string;
  company_name: string;
  interested_in: string;
  phone_number: string;
  message: string;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at: Date | string;
}
