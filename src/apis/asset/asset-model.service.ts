import type { AxiosInstance } from "axios";
import QueryString from "qs";

import type {
  GetModelSucceedResponse,
  GetModelsParams,
  GetModelsSucceedResponse,
} from "./asset-model.types";

export class AssetModelService {
  /**
   * Retrieve the data from specified endpoint with given criteria.
   *
   * @access GET /getModels
   * @see {AssetModelQueryKeys.FIND}
   */
  static async find(axiosClient: AxiosInstance, criteria?: GetModelsParams) {
    const querySearchCriteria = QueryString.stringify(criteria, {
      addQueryPrefix: true,
    });

    return await axiosClient.get<GetModelsSucceedResponse>(
      "/getModels" + querySearchCriteria
    );
  }

  /**
   * Retrieve a model by its ID.
   *
   * @access GET /getModel
   * @see {AssetModelQueryKeys.FIND_ONE}
   */
  static async findOne(axiosClient: AxiosInstance, id: string) {
    const querySearchId = QueryString.stringify(
      { id },
      { addQueryPrefix: true }
    );

    return await axiosClient.get<GetModelSucceedResponse>(
      "/getModel" + querySearchId
    );
  }
}
