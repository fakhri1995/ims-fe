import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import { CareerV2QueryKeys, CareerV2Service } from "./career_v2.service";
import type {
  GetCareersParams,
  GetPostedCareersSucceedResponse,
} from "./career_v2.types";

/**
 * Retrieve all available careers.
 * No Authorization required.
 *
 * @access — GET /v2/getCareer
 */
export const useGetPostedCareers = <
  T extends any = GetPostedCareersSucceedResponse
>(
  params?: GetCareersParams,
  select?: (data: AxiosResponse<GetPostedCareersSucceedResponse, any>) => T
) => {
  const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  });

  return useQuery(
    [CareerV2QueryKeys.getPostedCareers, params],
    () => CareerV2Service.getPostedCareers(axiosClient, params),
    { select }
  );
};
