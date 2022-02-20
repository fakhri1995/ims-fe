import { useAxiosClient } from "hooks/use-axios-client";
import { useCallback, useEffect, useState } from "react";
import {
  GetModelsDatum,
  IGetModelsCriteria,
} from "types/api/models/get-models";

import { ModelsService } from "services/models";

/**
 * Custom hook to retrieve all models and then used to show <Select>'s option in Edit Part Input form.
 *
 * @access GET /getModels
 */
export const useGetModels = () => {
  const { axiosClient } = useAxiosClient();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [data, setData] = useState<GetModelsDatum[]>([]);

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
    fetchModels();
  }, []);

  return { data, refetchData, isLoading, isError };
};
