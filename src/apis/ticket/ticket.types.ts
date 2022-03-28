import type { HttpRequestWithDataSucceedResponse } from "types/common";

export enum TicketServiceQueryKeys {
  TICKET_GET = "TICKET_GET",
}

/**
 * Enum ini digunakan untuk mapping `status` task.
 * Saat code ini ditulis, Overdue (1) tidak akan dicantumkan. Kalau dicantumkan,
 * maka map menjadi "-".
 *
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/208109569/Get+Tasks
 */
export enum TaskStatus {
  OVERDUE = 1,
  OPEN,
  ON_PROGRESS,
  ON_HOLD,
  COMPLETED,
  CLOSED,
}

/**
 * @access GET /getTicket?id={{ticketId}}
 */
export type IGetTicketSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetTicketData>;

export interface GetTicketData {
  id: number;
  ticketable_id: number;
  created_by: number;
  status: number;
  raised_at: string;
  closed_at: string | null;
  resolved_times: string;
  deadline: string;
  name: string;
  status_name: string;
  tasks: Task[];
  creator: Creator;
  ticketable: Ticketable;
}

export interface Creator {
  id: number;
  name: string;
  company_id: number;
  location: string;
  company: {
    id: number;
    name: string;
  };
}

export interface User {
  id: number;
  name: string;
  profile_image: /** "-" == empty */ string;
}

export interface Task {
  id: number;
  name: string;
  status: TaskStatus;
  reference_id: number;
  group_id: number | null;
  deadline: string;
  users: User[];
  group: {
    id: number;
    name: string;
  } | null;
}

export interface Ticketable {
  id: number;
  product_type: number;
  product_id: string;
  pic_name: string;
  pic_contact: string;
  location_id: number;
  inventory_id: number | null;
  problem: string;
  incident_time: string;
  files: any[];
  description: string;
  deleted_at: string | null;
  asset_type_name: string;
  original_incident_time: string;
  location: Location;
  asset_type: AssetType;
  inventory: /** Unknown */ null;
}

export interface AssetType {
  id: number;
  ticket_type_id: number;
  name: string;
  description: string;
  deleted_at: string | null;
}

export interface Location {
  id: number;
  name: string;
  full_location: string;
}
