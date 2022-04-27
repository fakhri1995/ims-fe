import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useAxiosClient } from "hooks/use-axios-client";

import { AssetModelService } from "./asset-model.service";
import { AssetModelQueryKeys, GetModelData } from "./asset-model.types";
import type { GetModelsParams } from "./asset-model.types";

/**
 * Custom hook to retrieve all models.
 *
 * @access GET /getModels
 */
export const useGetModels = (params?: GetModelsParams) => {
  const axiosClient = useAxiosClient();

  return useQuery(
    [AssetModelQueryKeys.FIND, params],
    () => AssetModelService.find(axiosClient, params),
    {
      select: (response) => {
        return response.data.data.data;
      },
    }
  );
};

/**
 * Custom hook to reterieve a model from the server.
 *
 * @access /getModel
 */
export const useGetModel = () => {
  const axiosClient = useAxiosClient();

  // `modelId` is a temporary state to add new model with this given id into `modelDataLocal`
  const [modelId, setModelId] = useState<number | undefined>();
  const [modelDataLocal, setModelDataLocal] = useState<GetModelData[]>([]);

  const { refetch } = useQuery(
    [AssetModelQueryKeys.FIND_ONE, modelId],
    (params) => {
      const modelId = params.queryKey[1];

      return AssetModelService.findOne(axiosClient, modelId.toString());
    },
    {
      enabled: false,
      onSuccess: (response) => {
        const mappedData = { ...response.data.data };
        mappedData.model_columns = mappedData.model_columns.map((datum) => {
          if (
            datum.data_type !== "dropdown" &&
            datum.data_type !== "checkbox"
          ) {
            return datum;
          }

          return {
            ...datum,
            default: JSON.parse(datum.default),
          };
        });

        setModelDataLocal((prev) => {
          const existingIds = prev.map((datum) => datum.id);
          const dataExists = existingIds.includes(mappedData.id);

          return dataExists ? prev : [...prev, mappedData];
        });

        // reset after data is fetched and update its local state
        setModelId(undefined);
      },
    }
  );

  useEffect(() => {
    if (modelId !== undefined) {
      refetch();
    }
  }, [modelId]);

  return {
    data: modelDataLocal,
    setData: setModelDataLocal,
    refetchData: setModelId,
  };
};
