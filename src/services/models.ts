import { AxiosInstance } from "axios";
import qs from "qs";

import { IGetModel } from "types/api/models/get-model";
import type {
  IGetModels,
  IGetModelsCriteria,
} from "types/api/models/get-models";

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

  /**
   * Retrieve a model by its ID.
   *
   * @access GET /getModel
   */
  static async findOne(axiosClient: AxiosInstance, id: string) {
    const querySearchId = qs.stringify({ id }, { addQueryPrefix: true });

    return await axiosClient.get<IGetModel>("/getModel" + querySearchId);
  }
}
