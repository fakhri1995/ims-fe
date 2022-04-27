import type { HttpRequestWithDataSucceedResponse } from "types/common";

export enum AssetModelQueryKeys {
  FIND = "MODELS_GET",
  FIND_ONE = "MODEL_GET",
}

/**
 * Query String Parameter to retrieve all models from this endpoint.
 *
 * @access GET /getModels
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/149880837/Get+Models
 */
export type GetModelsParams = {
  page?: number;
  rows?: number;
  asset_id?: number;
  name?: string;
  sort_by?: "name" | "count";
  sort_type?: "asc" | "desc";
};

/**
 * Succeed response from `/getModels` endpoint.
 *
 * @access GET /getModels
 */
export type GetModelsSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetModelsData>;

export interface GetModelsData {
  current_page: number;
  data: GetModelsDatum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface GetModelsDatum {
  id: number;
  asset_id: number;
  name: string;
  description: string;
  manufacturer_id: number;
  required_sn: number;
  deleted_at: null;
  asset_name: string;
  asset_deleted_at: null;
  count: number;
}

/**
 * Succeed response from `/getMode` endpoint.
 *
 * @access GET /getModel?id=:number
 */
export type GetModelSucceedResponse =
  HttpRequestWithDataSucceedResponse<GetModelData>;

export interface GetModelData {
  id: number;
  asset_id: number;
  name: string;
  description: string;
  manufacturer_id: number;
  required_sn: number;
  deleted_at: null;
  inventories_count?: number;
  asset: Asset;
  manufacturer?: Manufacturer;
  model_columns: ModelColumn[];
  model_parts: GetModelData[];
}

export interface Asset {
  id: number;
  name: string;
  code: string;
  required_sn: number;
  deleted_at: null;
}

export interface Manufacturer {
  id: number;
  name: string;
  deleted_at: null;
}

export interface ModelColumn {
  id: number;
  model_id: number;
  name: string;
  data_type: string;
  default: null | string;
  required: number;
  deleted_at: null;
}
