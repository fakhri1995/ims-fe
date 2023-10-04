import { HttpRequestWithDataSucceedResponse } from "types/common";

/**
 * @access GET /getAttendanceTaskActivities
 */
export type IGetAttendanceTaskActivitiesSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetAttendanceTaskActivitesData>;

export interface GetAttendanceTaskActivitesData {
  today_activities: TaskActivity[];
  last_two_month_activities: TaskActivity[];
}

export interface TaskActivity {
  id: number;
  user_id: number;
  task_id: number;
  updated_at: Date;
  activity: string;
  task: ProjectTask;
}

export interface ProjectTask {
  id: number;
  ticket_number: string;
  name: string;
  start_date: string;
  end_date: string | null;
  description: string;
  status_id: number;
  project_id: number;
  created_by: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  project: Project | null;
}

export interface Project {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  description: string;
  status_id: number;
  created_by: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

/**
 * @access POST /addAttendanceActivity
 */
export interface IAddAttendanceTaskActivityPayload {
  task_ids: number[];
}
