import { DeleteOutlined, PlusSquareTwoTone } from "@ant-design/icons";
import { Button, Form, InputNumber, Select, Spin } from "antd";
import { FC, useState } from "react";

import { useDebounce } from "hooks/use-debounce-value";

import { useGetModels } from "apis/asset";

export interface IInputPart {
  /** Handler ketika close / trash can button diklik */
  onCloseInputPart: () => void;

  /** Handler ketika tombol "Tambah" diklik */
  onTambahButtonClicked: () => void;

  /** Handler untuk select component */
  onChangeModelSelection: (modelId: number) => void;

  /** Jumlah quantity dari model yang sedang dipilih. Ini harus sync dengan state `modelParts` */
  currentModelPartQuantity: number;

  /** Handler ketika InputNumber berubah. Callback ini akan memperbarui nilai `currentModelPartQuantity`. */
  onCurrentModelPartQuantityChange: (quantity: number) => void;

  /** Callback untuk toggle modal create new model */
  onModalCrateNewModel: () => void;
}

/**
 * InputPart adalah komponen untuk melakukan input data Konfigurasi Part Model.
 *
 * Terdapat 2 jenis input data:
 * 1. Select - mencari dan memilih nama model yang diinginkan.
 * 2. InputNumber - menentukan banyaknya jumlah model tersebut.
 */
export const InputPart: FC<IInputPart> = ({
  onCloseInputPart,
  onTambahButtonClicked,
  onChangeModelSelection,
  currentModelPartQuantity,
  onCurrentModelPartQuantityChange,
  onModalCrateNewModel,
}) => {
  const [modelSearchValue, setModelSearchValue] = useState("");
  const debouncedModelSearchValue = useDebounce(modelSearchValue);

  const { data: models, isFetching: isFetchingModels } = useGetModels({
    rows: 10,
    name: debouncedModelSearchValue,
  });

  return (
    <div className="shadow-md border p-8 flex flex-col rounded-md relative">
      <button
        className="absolute top-2 right-5 text-lg cursor-pointer bg-white/0"
        onClick={onCloseInputPart}
      >
        x
      </button>

      <Form layout="vertical">
        <div className="flex mb-2 space-x-4">
          <div className="w-2/3">
            <Form.Item
              name="id"
              label="Nama Model"
              rules={[
                {
                  required: true,
                  message: "Nama Model wajib diisi",
                },
              ]}
            >
              <Select
                notFoundContent={
                  isFetchingModels ? <Spin size="small" /> : undefined
                }
                onSearch={(searchValue) => {
                  setModelSearchValue(searchValue);
                }}
                showSearch
                optionFilterProp="children"
                placeholder="Cari nama modul"
                onChange={(value) => {
                  onChangeModelSelection(value);
                }}
                filterOption
              >
                {models?.map((doc) => (
                  <Select.Option key={doc.id} value={doc.id}>
                    {doc.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="w-1/3 flex items-center space-x-4">
            <label htmlFor="part-quantity">Jumlah</label>

            <div className="flex w-full justify-end space-x-4">
              <InputNumber
                id="part-quantity"
                min={0}
                value={currentModelPartQuantity}
                onChange={onCurrentModelPartQuantityChange}
              />

              <button
                className="cursor-pointer bg-white/0"
                onClick={onModalCrateNewModel}
              >
                <PlusSquareTwoTone style={{ fontSize: `1.5rem` }} />
              </button>
            </div>
          </div>
        </div>

        <hr />

        <div className="flex mt-4 justify-end">
          <button
            className="flex items-center mr-4 hover:text-red-500 cursor-pointer bg-white/0"
            onClick={onCloseInputPart}
          >
            <DeleteOutlined style={{ fontSize: `1.25rem` }}></DeleteOutlined>
          </button>

          <Button
            type="primary"
            onClick={() => {
              onTambahButtonClicked();
            }}
          >
            Tambah
          </Button>
        </div>
      </Form>
    </div>
  );
};
