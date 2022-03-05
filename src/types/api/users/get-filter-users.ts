export interface IGetFilterUsersCriteria {
  name?: string;

  /**
   * 1 => Agent
   * 2 => Requester
   */
  type?: 1 | 2;
}

/**
 * @access GET /getFilterUsers
 */
export interface IGetFilterUsers {
  success: boolean;
  message: string;
  data: GetFilterUsersDatum[];
  status: number;
}

export interface GetFilterUsersDatum {
  id: number;
  name: string;
  company_id: number;
  profile_image: string;
  position: null | string;
  company: Company;
  attendance_forms: AttendanceForm[];
}

export interface AttendanceForm {
  id: number;
}

export interface Company {
  id: number;
  name: string;
  full_name: string;
}
