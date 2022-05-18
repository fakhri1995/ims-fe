/**
 * @access POST /addRequesterMember
 */
export interface CreateRequesterPayload {
  fullname: string;
  email: string;
  role_ids: number[];
  phone_number: string;
  profile_image: File;
  company_id: number;
  password: string;
  confirm_password: string;
  position: string;
}

/**
 * @access POST /updateRequesterDetail
 */
export interface UpdateRequesterPayload {
  id: number;
  fullname: string;
  role: number;
  phone_number: string;
  profile_image: File;
  company_id: number;
  email: string;
  role_ids: number[];
  position: string;
}
