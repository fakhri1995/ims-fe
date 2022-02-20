import {
  CalendarOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  PlusSquareTwoTone,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Collapse,
  Form,
  InputNumber,
  Popconfirm,
  Select,
  Spin,
  Timeline,
} from "antd";
import { FC, useState } from "react";

import { useBulkConfigurationModelParts } from ".";
import { InputPart } from "./InputPart";

const { Panel } = Collapse;

export interface ICreateConfigurationPart {
  isAllowedToEditPart?: boolean;
  editPartIsEnabled?: boolean;
}

export const CreateConfigurationPart: FC<ICreateConfigurationPart> = ({
  isAllowedToEditPart = false,
  editPartIsEnabled = false,
}) => {
  const {
    modelParts,
    currentModelPartQuantity,
    setCurrentModelPartQuantity,
    resetCurrentModelPart,
    updateCurrentModelPart,
    updateModelParts,
  } = useBulkConfigurationModelParts();

  const [isInputPartShown, setIsInputPartShown] = useState(false);

  const closeInputPart = () => {
    setIsInputPartShown(false);
    resetCurrentModelPart();
  };

  const onTambahButtonClicked = () => {
    /**
     * The order is important.
     * - Trigger `updateModalPart()` first. Then close the input part form.
     */
    updateModelParts();
    closeInputPart();
  };

  return (
    <div className="mb-8 col-span-1 md:col-span-4 px-5 flex flex-col bg-red-400 space-y-5">
      <div className="mb-5">
        <h1 className="font-bold text-xl">Konfigurasi Part Model</h1>
      </div>

      {isInputPartShown && (
        <InputPart
          onCloseInputPart={closeInputPart}
          onTambahButtonClicked={onTambahButtonClicked}
          onChangeModelSelection={updateCurrentModelPart}
          currentModelPartQuantity={currentModelPartQuantity}
          onCurrentModelPartQuantityChange={setCurrentModelPartQuantity}
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
