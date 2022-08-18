import type { HttpRequestWithDataSucceedResponse } from "types/common";

export enum RoleTypeId {
  FULL_TIME = 1,
  INTERNSHIP,
  CONTRACT,
  PART_TIME,
}

export enum ExperienceId {
  ZERO_TO_ONE_YEAR = 1,
  ONE_TO_THREE_YEAR,
  THREE_TO_FIVE_YEAR,
  FIVE_AND_MORE_YEAR,
}

export enum SortBy {
  NAME = 1,
  CREATED_AT,
  IS_POSTED,
  TOTAL,
  EXPERIENCE,
  ROLE_TYPE,
}

export type GetPostedCareersParams = {
  page?: number;
  rows?: number;
  date_from?: string;
  date_to?: string;
  is_posted?: boolean;
  role_type_id?: string; // string of concatenated `RoleTypeId` (e.g. 1,2,3)
  experience_id?: string; // string of concatenated `ExperienceId` (e.g. 1,2,3)
  sort?: SortBy;
  order?: "asc" | "desc";
  keyword?: string;
};

export type GetPostedCareerParam = { id: number } | { slug: string };

export type AddCareerPayload = {
  name: string;
  email: string;
  phone: string;
  career_id: number;
  resume: Blob | File;
  "g-recaptcha-response": string;
};

/**
 * @access GET /v2/getPostedCareers
 */
export type GetPostedCareersSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetCareersData>;

/**
 * @access GET /v2/getPostedCareer
 */
export type GetPostedCareerSucceedResponse =
  HttpRequestWithDataSucceedResponse<Career>;

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
