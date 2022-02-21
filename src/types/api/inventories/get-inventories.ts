/** @access GET /getInventories */
export interface IGetInventories {
  success: boolean;
  message: string;
  data: GetInventoriesData;
  status: number;
}

export interface GetInventoriesData {
  current_page: number;
  data: GetInventoriesDatum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: null;
  path: string;
  per_page: string;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface GetInventoriesDatum {
  id: number;
  model_id: number;
  mig_id: null | string;
  status_condition: LocationInventory;
  status_usage: LocationInventory;
  location: number;
  location_inventory: LocationInventory;
  model_inventory: ModelInventory;
}

export interface LocationInventory {
  id: number;
  name: string;
}

export interface ModelInventory {
  id: number;
  name: string;
  asset_id: number;
  required_sn: number;
  deleted_at: null;
  asset: Asset;
}

export interface Asset {
  id: number;
  name: string;
  code: string;
  deleted_at: null;
  asset_name: string;
}
