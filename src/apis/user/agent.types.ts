/**
 * @access POST /addAgentMember
 */
export interface CreateAgentPayload {
  fullname: string;
  email: string;
  phone_number: string;
  nip: number;

  password: string;
  confirm_password: string;

  position: string;
  company_id: number;

  attendance_form_ids: number[];
  role_ids: number[];

  profile_image: File;
}

/**
 * @access POST /updateAgentDetail
 */
export interface UpdateAgentDetailPayload {
  id: number;
  fullname: string;
  phone_number: string;
  profile_image: File;
  nip: number;
  role_ids: number[];
  attendance_form_ids: number[];
  position: string;
}
