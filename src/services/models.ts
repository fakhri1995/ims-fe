import { AxiosInstance } from "axios";
import qs from "qs";
import type { IGetModels } from "types/api/models/get-models";

interface IGetModelsCriteria {
  page?: number;
  rows?: number;
  asset_id?: number;
  name?: string;
  sort_by?: "name" | "count";
  sort_type?: "asc" | "desc";
}

export class ModelsService {
  /**
   * Retrieve the data from specified endpoint with given criteria.
   *
   * @access GET /getModels
   */
  static async find(axiosClient: AxiosInstance, criteria?: IGetModelsCriteria) {
    const querySearchCriteria = qs.stringify(criteria, {
      addQueryPrefix: true,
    });

    return await axiosClient.get<IGetModels>(
      "/getModels" + querySearchCriteria
    );
  }
}
