import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import { CareerV2QueryKeys, CareerV2Service } from "./career_v2.service";
import type {
  GetCareersParams,
  GetCareersSucceedResponse,
} from "./career_v2.types";

/**
 * Retrieve all available careers.
 *
 * @access — GET /v2/getCareer
 */
export const useGetCareers = <T extends any = GetCareersSucceedResponse>(
  params?: GetCareersParams,
  select?: (data: AxiosResponse<GetCareersSucceedResponse, any>) => T
) => {
  const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  });

  return useQuery(
    [CareerV2QueryKeys.getCareers, params],
    () => CareerV2Service.getCareers(axiosClient, params),
    { select }
  );
};
