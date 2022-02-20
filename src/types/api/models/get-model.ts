/**
 * @access GET /getModel?id={id}
 *
 * @see https://jsonformatter.org/json-to-typescript
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/149585952/Get+Model
 */
export interface IGetModel {
  success: boolean;
  message: string;
  data: GetModelData;
  status: number;
}

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
  name: Name;
  data_type: DataType | string;
  default: null | string;
  required: number;
  deleted_at: null;
}

export enum DataType {
  String = "String",
}

export enum Name {
  Kapasitas = "Kapasitas",
  Processor = "Processor",
}
