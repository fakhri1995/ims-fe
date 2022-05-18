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
