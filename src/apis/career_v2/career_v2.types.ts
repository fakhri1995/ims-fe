import type { HttpRequestWithDataSucceedResponse } from "types/common";

export type GetCareersParams = {
  limit?: number;
  page?: number;
  rows?: number;
  date_from?: string;
  date_to?: string;
  is_posted?: boolean;
  role?: string | number;
  experience?: string | number;
  sort?: 1 | 2 | 3 | 4 | 5 | 6;
  order?: "asc" | "dsc";
  search?: string;
};

/**
 * @access GET /v2/getCareers
 */
export type GetPostedCareersSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetCareersData>;

interface GetCareersData {
  current_page: number;
  data: Career[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: null;
  path: string;
  per_page: string;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface Career {
  id: number;
  name: string;
  slug: string;
  career_role_type_id: number;
  career_experience_id: number;
  salary_min: number;
  salary_max: number;
  overview: string;
  description: string;
  qualification: string;
  created_by: number;
  is_posted: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  apply_count: number;
  role_type: RoleType;
  experience: Experience;
}

interface Experience {
  id: number;
  min: number;
  max: number;
  str: string;
}

interface RoleType {
  id: number;
  name: string;
}
