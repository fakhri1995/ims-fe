import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";

import { CareerV2QueryKeys, CareerV2Service } from "./career_v2.service";
import type {
  AddCareerPayload,
  GetPostedCareerParam,
  GetPostedCareerSucceedResponse,
  GetPostedCareersParams,
  GetPostedCareersSucceedResponse,
} from "./career_v2.types";

/**
 * Retrieve all available careers.
 * No Authorization required.
 *
 * @access — GET /v2/getPostedCareers
 */
export const useGetPostedCareers = <
  T extends any = GetPostedCareersSucceedResponse
>(
  params?: GetPostedCareersParams,
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

/**
 * Retrieve a specific career.
 *
 * @access — GET /v2/getPostedCareer
 */
export const useGetPostedCareer = <
  T extends any = GetPostedCareerSucceedResponse
>(
  params: GetPostedCareerParam,
  select?: (data?: AxiosResponse<GetPostedCareerSucceedResponse, any>) => T
) => {
  const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  });

  return useQuery(
    [CareerV2QueryKeys.getPostedCareer, params],
    () => CareerV2Service.getPostedCareer(axiosClient, params),
    { select }
  );
};

/**
 * Apply a job.
 *
 * @access POST /v2/addCareer
 */
export const useApplyCareer = () => {
  const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  });

  return useMutation((payload: AddCareerPayload) =>
    CareerV2Service.addCareer(axiosClient, payload)
  );
};
