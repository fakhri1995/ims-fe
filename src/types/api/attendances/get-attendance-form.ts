/**
 * @access GET /getAttendanceForm?id=[aktivitasId]
 */
export interface IGetAttendanceForm {
  success: boolean;
  message: string;
  data: GetAttendanceFormData;
  status: number;
}

export interface GetAttendanceFormData {
  id: number;
  name: string;
  description: string;
  details: Detail[];
  updated_at: Date | string;
  deleted_at: null;
  users: User[];
  creator: Creator;
}

export interface Creator {
  id: number;
  name: string;
  profile_image: string;
  position: string;
}

export interface Detail {
  key: string;
  name: string;
  type: number;
  description: string;
  list?: string[];
}

export interface User {
  id: number;
  email: string;
  name: string;
  nip: string;
  profile_image: string;
  phone_number: string;
  company_id: number;
  role: number;
  position: string;
  is_enabled: number;
  created_time: Date;
  deleted_at: null;
}
