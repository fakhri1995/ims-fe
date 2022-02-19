/**
 * @access /getModels
 *
 * @see https://jsonformatter.org/json-to-typescript
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/149880837/Get+Models
 */
export interface IGetModelsCriteria {
  page?: number;
  rows?: number;
  asset_id?: number;
  name?: string;
  sort_by?: "name" | "count";
  sort_type?: "asc" | "desc";
}
export interface IGetModels {
  success: boolean;
  message: string;
  data: GetModelsData;
  status: number;
}

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
