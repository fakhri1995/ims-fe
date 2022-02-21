import { Button, message } from "antd";
import { useGetModel } from "hooks/api/models";
import { FC, useState } from "react";

import { useBulkConfigurationModelParts } from ".";
import { InputPart } from "./InputPart";
import { ModelPartAccordionList } from "./ModelPartAccordionList";
import { ModelPartTimelineItem } from "./ModelPartTimelineItem";

export interface ICreateConfigurationPart {
  /** State to control whether the "Tambah Part Button" is enabled or disabled */
  isAllowedToEditPart?: boolean;

  /** Toggle the modal to create new modal (passthrough props) */
  toggleModalCreateModel: (isVisible: boolean) => void;

  onUpdateModelPartsPayload: (modelId: number, quantity: number) => void;
}

/**
 * CreateConfigurationPart adalah komponen yang meng-handle section "Konfigurasi Part Model" pada screen atau halaman `/admin/models/create`.
 */
export const CreateConfigurationPart: FC<ICreateConfigurationPart> = ({
  isAllowedToEditPart = false,
  toggleModalCreateModel,
  onUpdateModelPartsPayload,
}) => {
  const {
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

  const [isInputPartShown, setIsInputPartShown] = useState(false);

  const closeInputPart = () => {
    setIsInputPartShown(false);
    resetCurrentModelPart();
  };

  const onTambahButtonClicked = () => {
    if (!currentModelPartId || currentModelPartQuantity === 0) {
      message.error({
        content:
          "Pastikan telah mengisi Nama Model dan Jumlah lebih besar dari 0.",
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
    onUpdateModelPartsPayload(currentModelPartId, currentModelPartQuantity);

    message.success({
      content: "Konfigurasi Part Berhasil diperbarui.",
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
    onUpdateModelPartsPayload(modelId, 0);

    closeInputPart();
  };

  const onModalCreateNewModelButtonClicked = () => {
    toggleModalCreateModel(true);
  };

  const renderChildPartModel = (item) => {
    return item.map((doc, idx) => {
      return (
        <ModelPartTimelineItem
          doc={doc}
          renderChildPartComponent={renderChildPartModel}
          idx={idx}
        ></ModelPartTimelineItem>
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
