export interface IGetAttendanceFormsCriteria {
  page?: number;
  rows?: number;
  sort_by?: "name" | "description" | "updated_at" | "count" | string;
  sort_type?: string;
  keyword?: string;
}

/**
 * @access GET /getAttendanceForms
 */
export interface IGetAttendanceForms {
  success: boolean;
  message: string;
  data: GetAttendanceFormsData;
  status: number;
}

export interface GetAttendanceFormsData {
  current_page: number;
  data: GetAttendanceFormsDatum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface GetAttendanceFormsDatum {
  id: number;
  name: string;
  description: string;
  updated_at: Date | string;
  users_count: number;
}
