import { Button, notification } from "antd";
import React, { FC, useEffect, useState } from "react";

import { GetModelData, useGetModel } from "apis/asset";

import { useBulkConfigurationModelParts } from ".";
import { InputPart } from "./InputPart";
import { ModelPartAccordionList } from "./ModelPartAccordionList";
import { ModelPartTimelineItem } from "./ModelPartTimelineItem";

export interface ICreateConfigurationPart {
  /** Provide an existing model data (primarily for Update page) */
  existingModelParts?: GetModelData[];

  /** State to control whether the "Tambah Part Button" is enabled or disabled */
  isAllowedToEditPart?: boolean;

  /** Toggle the modal to create new modal (passthrough props) */
  toggleModalCreateModel: (isVisible: boolean) => void;

  /** Callback to its parent to decide how to manipulate any changes */
  onUpdateModelPartsPayload: (
    modelId: number,
    quantity: number,
    action: "upsert" | "delete"
  ) => void;
}

/**
 * CreateConfigurationPart adalah komponen yang meng-handle section "Konfigurasi Part Model" pada screen atau halaman `/admin/models/create`.
 */
export const CreateConfigurationPart: FC<ICreateConfigurationPart> = ({
  existingModelParts,
  isAllowedToEditPart = false,
  toggleModalCreateModel,
  onUpdateModelPartsPayload,
}) => {
  const {
    modelParts,
    setModelParts,
    currentModelPartId,
    currentModelPartQuantity,
    setCurrentModelPartQuantity,
    resetCurrentModelPart,
    updateCurrentModelPart,
    updateModelParts,
  } = useBulkConfigurationModelParts();

  const {
    data: modelPartData,
    setData: setModelPartData,
    refetchData: updateModelPartData,
  } = useGetModel();

  useEffect(() => {
    if (!existingModelParts) {
      return;
    }

    // Set the data for rendering List of configuration parts (model_parts) in an Accordion
    setModelPartData(existingModelParts);

    // Map all existing model_parts ID and quantity into business logic
    // Then, it can be manipulated later.
    const buffer = {};
    existingModelParts.forEach(({ id, quantity }) => {
      buffer[id] = quantity;
    });
    setModelParts(buffer);
  }, [existingModelParts]);

  const [isInputPartShown, setIsInputPartShown] = useState(false);

  const closeInputPart = () => {
    setIsInputPartShown(false);
    resetCurrentModelPart();
  };

  const onTambahButtonClicked = () => {
    if (!currentModelPartId) {
      notification.error({
        message:
          "Pastikan telah mengisi Nama Model pada Konfigurasi Part Model.",
      });
      return;
    }

    if (currentModelPartQuantity === 0) {
      notification.error({
        message:
          "Field Jumlah pada Konfigurasi Part Model harus lebih besar dari 0.",
      });
      return;
    }

    /**
     * The order is important.
     * - Trigger `updateModalPart()` first. Then close the input part form.
     * - Update model part data. (It will be rendered under Collapse component).
     */
    /** Update id dan quantity */
    updateModelParts();

    /** Update `modelPartData` untuk ditampilkan pada Accordion. */
    updateModelPartData(currentModelPartId);

    /** Update parent's state untuk menjadi payload ke endpoint POST `/addModel` */
    onUpdateModelPartsPayload(
      currentModelPartId,
      currentModelPartQuantity,
      "upsert"
    );

    notification.success({
      message: "Konfigurasi Part Berhasil diperbarui.",
    });

    closeInputPart();
  };

  const onCloseAccordionItemButtonClicked = (
    modelId: number,
    modelPartDataIndex: number
  ) => {
    /** Update accordion list item by removing `modelDataPart[modelPartDataIndex] */
    setModelPartData((prev) =>
      prev.filter((_, _idx) => _idx !== modelPartDataIndex)
    );

    /** Delete the id-quantity record from `modelParts` object. */
    setModelParts((prev) => {
      if (!(modelId in prev)) {
        return prev;
      }

      const mutatedPrevState = { ...prev };
      delete mutatedPrevState[modelId];

      return mutatedPrevState;
    });

    /** Update parent's state untuk menjadi payload ke endpoint POST `/addModel`. Quantity 0 untuk menghapus. */
    onUpdateModelPartsPayload(modelId, 0, "delete");

    closeInputPart();
  };

  const onModalCreateNewModelButtonClicked = () => {
    toggleModalCreateModel(true);
  };

  const renderChildPartModel = (item) => {
    return item.map((doc, idx) => {
      const renderCount = doc.quantity || 1;

      return (
        <React.Fragment key={idx}>
          {Array(renderCount)
            .fill(null)
            .map((_, idx2) => (
              <ModelPartTimelineItem
                doc={doc}
                idx={idx2}
              ></ModelPartTimelineItem>
            ))}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="mb-8 col-span-1 md:col-span-4 px-5 flex flex-col space-y-5">
      <div className="mb-5">
        <h1 className="font-bold text-xl">Konfigurasi Part Model</h1>
      </div>

      <ModelPartAccordionList
        modelPartData={modelPartData}
        modelPartQuantityRecord={modelParts}
        onDeleteModelPartItem={onCloseAccordionItemButtonClicked}
        renderChildPartModel={renderChildPartModel}
      />

      {isInputPartShown && (
        <InputPart
          onCloseInputPart={closeInputPart}
          onTambahButtonClicked={onTambahButtonClicked}
          onChangeModelSelection={updateCurrentModelPart}
          currentModelPartQuantity={currentModelPartQuantity}
          onCurrentModelPartQuantityChange={setCurrentModelPartQuantity}
          onModalCrateNewModel={onModalCreateNewModelButtonClicked}
        />
      )}

      <Button
        disabled={!isAllowedToEditPart || isInputPartShown}
        type="dashed"
        onClick={() => {
          setIsInputPartShown((prev) => !prev);
          // seteditpart(true);
        }}
        className="w-full h-16"
      >
        + Tambah Part Model
      </Button>
    </div>
  );
};
