import {
  HttpRequestBaseSucceedResponse,
  HttpRequestWithDataSucceedResponse,
} from "types/common";

export enum AttendanceActivityQueryKeys {
  FIND = "ATTENDANCE_ACTIVITIES_GET",
}

/**
 * @access GET /getAttendanceActivities
 */
export type IGetAttendanceActivitiesSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetAttendanceActivitesData>;

export interface GetAttendanceActivitesData {
  today_activities: Activity[];
  last_two_month_activities: Activity[];
}

export interface Activity {
  id: number;
  user_id: number;
  attendance_form_id: number;
  details: AcivityDetail[];
  updated_at: Date;
}

export interface AcivityDetail {
  value: number[] | string;
  key: string;
}

/**
 * @access POST /addAttendanceActivity
 */
export interface IAddAttendanceActivityPayload {
  attendance_form_id: number;
  details: AcivityDetail[];
}

export interface IAddAttendanceActivitySucceedResponse
  extends HttpRequestBaseSucceedResponse {
  id: number;
}

/**
 * @access PUT /updateAttendanceActivity
 */
export interface IUpdateAttendanceActivityPayload {
  id: number;
  details: AcivityDetail[];
}
