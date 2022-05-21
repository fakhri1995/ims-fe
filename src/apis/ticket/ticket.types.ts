import type {
  HttpRequestWithDataSucceedResponse,
  ProfileImageAttribute,
} from "types/common";

export enum TicketServiceQueryKeys {
  TICKET_GET = "TICKET_GET",
  TICKET_LOG_GET = "TICKET_LOG_GET",
}

/**
 * @access PUT /updateStatusTicket
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/229867523/Update+Status+Ticket
 */
export type TicketUpdateStatusPayload = {
  id: number;
  status: TaskStatus;
  notes: string;
};

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
 * @access POST /addTicket
 */
export interface AddticketPayload {
  type_id: number;
  ticket_detail_type_id: number;
  product_id: number;
  pic_name: string;
  pic_contact: string;
  location_id: number;
  problem: string;
  incident_time: Date | string;
  attachments: File[];
  description: string;
}

/**
 * @access POST /updateTicket
 */
export interface UpdateTicketPayload {
  id: number;
  requester_id: number;
  raised_at: Date | string;
  closed_at: Date | string;
  ticket_detail_type_id: number;
  product_id: number;
  pic_name: string;
  pic_contact: string;
  location_id: number;
  problem: string;
  incident_time: Date | string;
  attachments: File[] | File;
  description: string;
}

/**
 * @access DELETE /deleteFileTicket
 */
export interface DeleteFileTicketPayload {
  id: number; // file uid
  ticket_id: number;
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
  profile_image: /** "-" == empty */ ProfileImageAttribute;
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

/**
 * @access /getClientTicketLog?id={{id}}
 * @access /getTicketLog?id={{id}}
 */
export type IGetTicketLogSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetTicketLogData>;

export interface GetTicketLogData {
  normal_logs: AlLog[];
  special_logs: AlLog[];
}

export interface AlLog {
  id: number;
  log_name: string;
  description: string | null;
  subject_id: number;
  causer_id: number;
  created_at: string;
  causer: LogCauser;
}

export interface LogCauser {
  id: number;
  name: string;
  role: number;
  profile_image: ProfileImageAttribute;
}
