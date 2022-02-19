import { useAxiosClient } from "hooks/use-axios-client";
import {
  useCallback,
  useDebugValue,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  GetModelsDatum,
  IGetModelsCriteria,
} from "types/api/models/get-models";

import { ModelsService } from "services/models";

export type { ICreateConfigurationPart } from "./CreateConfigurationPart";
export { CreateConfigurationPart } from "./CreateConfigurationPart";

export const useModels = () => {
  const { axiosClient } = useAxiosClient();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [models, setModels] = useState<GetModelsDatum[]>([]);

  const fetchModels = useCallback(async (criteria?: IGetModelsCriteria) => {
    try {
      const { data } = await ModelsService.find(axiosClient, criteria);

      setModels(data.data.data);
    } catch {
      setModels([]);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetchModels = useCallback((criteria?: IGetModelsCriteria) => {
    setIsLoading(true);
    fetchModels(criteria);
  }, []);

  useEffect(() => {
    fetchModels();
  }, []);

  return { models, refetchModels, isLoading, isError };
};

type PartQuantity = number;
interface IModelParts {
  [id: number]: PartQuantity;
}

interface IModelPartsReducerAction {
  type: "INSERT" | "INCREASE" | "DECREASE";
  payload: {
    modelPartId: number;
    quantity?: PartQuantity;
  };
}
const modelPartsReducer = (
  state: IModelParts,
  { type, payload }: IModelPartsReducerAction
): IModelParts => {
  switch (type) {
    case "INSERT":
      return {
        ...state,
        [payload.modelPartId]: payload.quantity || 1,
      };

    case "INCREASE":
      return {
        ...state,
        [payload.modelPartId]: (state[payload.modelPartId] || 0) + 1,
      };

    case "DECREASE":
      return {
        ...state,
        [payload.modelPartId]: (state[payload.modelPartId] || 0) - 1,
      };

    default:
      return state;
  }
};

export const useBulkModelParts = (initialValue?: IModelParts) => {
  const [currentModelPartId, setCurrentModelPartId] = useState<
    number | undefined
  >(undefined);
  const [modelParts, dispatch] = useReducer(
    modelPartsReducer,
    initialValue || {}
  );

  useDebugValue({ modelParts, currentModelPartId });

  const resetCurrentModelPartId = useCallback(() => {
    setCurrentModelPartId(undefined);
  }, []);

  const updateModelPart = (quantity: PartQuantity) => {
    dispatch({
      type: "INSERT",
      payload: { modelPartId: currentModelPartId, quantity },
    });
  };

  const increaseModelPart = () => {
    dispatch({
      type: "INCREASE",
      payload: { modelPartId: currentModelPartId },
    });
  };

  const decreaseModelPart = () => {
    dispatch({
      type: "DECREASE",
      payload: { modelPartId: currentModelPartId },
    });
  };

  const currentModelPartQuantity =
    typeof currentModelPartId === "undefined"
      ? 0
      : modelParts[currentModelPartId] || 0;

  return {
    modelParts,
    setCurrentModelPartId,
    resetCurrentModelPartId,
    currentModelPartQuantity,
    updateModelPart,
    increaseModelPart,
    decreaseModelPart,
  };
};
