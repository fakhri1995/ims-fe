import { useAxiosClient } from "hooks/use-axios-client";
import { useCallback, useDebugValue, useEffect, useState } from "react";
import { GetModelData } from "types/api/models/get-model";
import {
  GetModelsDatum,
  IGetModelsCriteria,
} from "types/api/models/get-models";

import { ModelsService } from "services/models";

/**
 * Custom hook to retrieve all models.
 *
 * @access GET /getModels
 */
export const useGetModels = (criteria?: IGetModelsCriteria) => {
  const { axiosClient } = useAxiosClient();

  const [data, setData] = useState<GetModelsDatum[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchModels = useCallback(async (criteria?: IGetModelsCriteria) => {
    try {
      const { data } = await ModelsService.find(axiosClient, criteria);

      setData(data.data.data);
    } catch {
      setData([]);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetchData = useCallback((criteria?: IGetModelsCriteria) => {
    setIsLoading(true);
    fetchModels(criteria);
  }, []);

  useEffect(() => {
    refetchData(criteria);
  }, [criteria]);

  return { data, setData, refetchData, isLoading, isError };
};

/**
 * Custom hook to reterieve a model from the server.
 */
export const useGetModel = (modelId?: string) => {
  const { axiosClient } = useAxiosClient();

  const [data, setData] = useState<GetModelData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useDebugValue({ data });

  const fetchModel = useCallback(async (modelId: string) => {
    try {
      const { data } = await ModelsService.findOne(axiosClient, modelId);

      const mappedData = { ...data.data };
      mappedData.model_columns = mappedData.model_columns.map((datum) => {
        if (datum.data_type !== "dropdown" && datum.data_type !== "checkbox") {
          return datum;
        }

        return {
          ...datum,
          default: JSON.parse(datum.default),
        };
      });

      setData((prev) => {
        let dataExists = false;
        for (let i = 0; i < prev.length; i++) {
          if (prev[i].id === mappedData.id) {
            dataExists = true;
            break;
          }
        }

        return dataExists ? prev : [...prev, mappedData];
      });
    } catch {
      setData([]);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetchData = useCallback((modelId: string) => {
    setIsLoading(true);
    fetchModel(modelId);
  }, []);

  useEffect(() => {
    if (modelId && modelId.length > 0) {
      fetchModel(modelId);
    }
  }, [modelId]);

  return { data, setData, refetchData, isLoading, isError };
};
