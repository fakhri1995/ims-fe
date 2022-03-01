/**
 * @access POST /addAttendanceForm
 */
export interface IAddAttendanceFormPayload {
  name: string;
  description: string;
  details: Detail[];
}

export interface Detail {
  name: string;
  description: string;
  type: number;
  required: boolean;
  list?: string[];
}

export interface IAddAttendanceFormResponse {
  success: boolean;
  message: string;
  id: number;
  status: number;
}
