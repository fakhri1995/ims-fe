import { useCallback, useState } from "react";

export type { ICreateConfigurationPart } from "./CreateConfigurationPart";
export { CreateConfigurationPart } from "./CreateConfigurationPart";

type PartQuantity = number;
enum PartQuantityFallbackValue {
  FALLBACK,
}

interface IModelParts {
  [id: number]: PartQuantity;
}

/**
 * Custom hook to handle multiple "Konfigurasi Part Model" at the same time.
 * We use the state `modelParts` as a payload to endpoint: POST /addModel
 *  as `model_parts` property.
 *
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/149880856/Add+Model
 */
export const useBulkConfigurationModelParts = (initialValue?: IModelParts) => {
  const [modelParts, setModelParts] = useState<IModelParts>(initialValue || {});

  const [currentModelPartId, setCurrentModelPartId] = useState<
    number | undefined
  >(undefined);

  const [currentModelPartQuantity, setCurrentModelPartQuantity] =
    useState<number>(() => {
      let _currentModelPartQuantity =
        modelParts[currentModelPartId] || PartQuantityFallbackValue.FALLBACK;

      return _currentModelPartQuantity;
    });

  /**
   * A function to update current (selected) model part ID and Quantity.
   * Call this function to handle `onChange` event on a Select component.
   */
  const updateCurrentModelPart = useCallback(
    (modelId: number, quantityFallback: number = 0) => {
      /**
       * Read if there is existing data from `modelParts`.
       *  - YES -> load from that data.
       *  - NO -> use the `quantityFallback` parameter.
       */
      const _currentModelPartQuantity = modelParts[modelId] || quantityFallback;

      setCurrentModelPartId(modelId);
      setCurrentModelPartQuantity(_currentModelPartQuantity);
    },
    [modelParts]
  );

  /**
   * Store current model part stat (id and quantity) into `moodelParts` state.
   * Call this function only when the User click "Tambah" button.
   */
  const updateModelParts = useCallback(() => {
    setModelParts((prev) => ({
      ...prev,
      [currentModelPartId]: currentModelPartQuantity,
    }));
  }, [currentModelPartId, currentModelPartQuantity]);

  /**
   * Do not forget to clean up current model when the Input form is being closed.
   * The terms "current model" is like a buffer and we need to flush them by calling `updateModelParts`.
   */
  const resetCurrentModelPart = useCallback(() => {
    setCurrentModelPartId(undefined);
    setCurrentModelPartQuantity(PartQuantityFallbackValue.FALLBACK);
  }, []);

  return {
    modelParts,
    setModelParts,

    currentModelPartId,
    setCurrentModelPartId,

    currentModelPartQuantity,
    setCurrentModelPartQuantity,

    resetCurrentModelPart,
    updateCurrentModelPart,

    updateModelParts,
  };
};
