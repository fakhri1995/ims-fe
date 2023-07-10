import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Select } from "antd";
import React from "react";

import ButtonSys from "../../../../components/button";
import {
  AlignJustifiedIconSvg,
  CopyIconSvg,
  FileTextIconSvg,
  SquareCheckIconSvg,
  TrashIconSvg,
  XIconSvg,
} from "../../../../components/icon";
import {
  FILE,
  LIST,
  TEXT,
} from "../../../../components/screen/contract/detail/ContractInfoSection";

const ContractExtrasForm = ({
  type,
  name,
  value,
  idx,
  dataContractUpdate,
  setDataContractUpdate,
}) => {
  // Conditonal render in Komponen Tambahan Kontrak field
  const showExtrasContentField = (type, value, idx) => {
    switch (type) {
      case TEXT:
        return (
          <Form.Item
            name={"value"}
            rules={[
              {
                required: true,
                message: "Isi deskripsi wajib diisi",
              },
            ]}
            className="col-span-2"
          >
            <>
              <Input
                name={"value"}
                value={value}
                onChange={(e) => {
                  let newValue = e.target.value;
                  const tempExtras = [...dataContractUpdate.extras];
                  tempExtras[idx].value = newValue;
                  setDataContractUpdate((prev) => ({
                    ...prev,
                    extras: tempExtras,
                  }));
                }}
                placeholder="Masukkan isi deskripsi"
              />
            </>
          </Form.Item>
        );

      case LIST:
        const valueList = dataContractUpdate?.extras?.[idx]?.value || [];
        return (
          <div className="col-span-2 mb-6">
            <ul className="mb-4 space-y-3">
              {valueList?.map((item, valIdx) => (
                <li key={valIdx}>
                  <div className="flex flex-row space-x-2 items-center">
                    <Input
                      name={`value-${valIdx}`}
                      value={item}
                      onChange={(e) => {
                        valueList.splice(valIdx, 1, e.target.value);
                        const tempExtras = [...dataContractUpdate.extras];
                        tempExtras[idx].value = valueList;
                        setDataContractUpdate((prev) => ({
                          ...prev,
                          extras: tempExtras,
                        }));
                      }}
                      placeholder={`Masukkan isi ${valIdx + 1}`}
                    />

                    <button
                      type="button"
                      className="bg-transparent hover:opacity-70"
                      onClick={(e) => {
                        valueList.splice(valIdx, 1);
                        const tempExtras = [...dataContractUpdate.extras];
                        tempExtras[idx].value = valueList;
                        setDataContractUpdate((prev) => ({
                          ...prev,
                          extras: tempExtras,
                        }));
                      }}
                    >
                      <XIconSvg size={20} color={"#BF4A40"} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="text-right">
              <ButtonSys
                type={"default"}
                onClick={() => {
                  valueList.push("");
                  const tempExtras = [...dataContractUpdate.extras];
                  tempExtras[idx].value = valueList;
                  setDataContractUpdate((prev) => ({
                    ...prev,
                    extras: tempExtras,
                  }));
                }}
              >
                <div className="flex items-center space-x-2">
                  <PlusOutlined />
                  <p>Tambah List</p>
                </div>
              </ButtonSys>
            </div>
          </div>
        );

      case FILE:
        return (
          <Form.Item
            name={"value"}
            rules={[
              {
                required: true,
                message: "Isi deskripsi wajib diisi",
              },
            ]}
            className="col-span-2"
          >
            <>
              <Input
                name={"value"}
                value={value}
                onChange={(e) => {
                  let newValue = e.target.value;
                  const tempExtras = [...dataContractUpdate.extras];
                  tempExtras[idx].value = newValue;
                  setDataContractUpdate((prev) => ({
                    ...prev,
                    extras: tempExtras,
                  }));
                }}
                placeholder="Masukkan isi deskripsi"
              />
            </>
          </Form.Item>
        );
    }
  };

  return (
    <div
      className="col-span-6 grid grid-cols-1 md:grid-cols-2 shadow-lg rounded-md 
                    bg-white gap-x-3 md:gap-x-6 p-3 md:p-6 mb-6"
    >
      <Form.Item
        rules={[
          {
            required: true,
            message: "Judul deskripsi wajib diisi",
          },
        ]}
      >
        <Input
          name={"name"}
          value={name}
          onChange={(e) => {
            let newName = e.target.value;
            const tempExtras = [...dataContractUpdate.extras];
            tempExtras[idx].name = newName;
            setDataContractUpdate((prev) => ({
              ...prev,
              extras: tempExtras,
            }));
          }}
          placeholder="Masukkan judul deskripsi"
        />
      </Form.Item>
      <Form.Item>
        <Select
          name={"type"}
          value={type}
          onChange={(value) => {
            const tempExtras = [...dataContractUpdate.extras];
            tempExtras[idx].type = value;
            setDataContractUpdate((prev) => ({
              ...prev,
              extras: tempExtras,
            }));
          }}
          // disabled={!isAllowedToGetCompanyClients}
        >
          <>
            <Select.Option key={TEXT} value={TEXT}>
              <div className="flex space-x-2 items-center">
                <AlignJustifiedIconSvg color={"#35763B"} size={20} />
                <p className="text-primary100 font-bold">Teks</p>
              </div>
            </Select.Option>
            <Select.Option key={LIST} value={LIST}>
              <div className="flex space-x-2 items-center">
                <SquareCheckIconSvg color={"#35763B"} size={20} />
                <p className="text-primary100 font-bold">List</p>
              </div>
            </Select.Option>
            <Select.Option key={FILE} value={FILE}>
              <div className="flex space-x-2 items-center">
                <FileTextIconSvg color={"#35763B"} size={20} />
                <p className="text-primary100 font-bold">File</p>
              </div>
            </Select.Option>
          </>
        </Select>
      </Form.Item>

      {showExtrasContentField(type, value, idx)}

      <div className="col-span-2 flex justify-end space-x-4">
        <button
          type="button"
          className="bg-transparent hover:opacity-70"
          // onClick={() => remove(description)}
        >
          <CopyIconSvg size={24} color={"#4D4D4D"} />
        </button>
        <button
          type="button"
          className="bg-transparent hover:opacity-70"
          onClick={(e) => {
            const tempExtras = [...dataContractUpdate.extras];
            tempExtras.splice(idx, 1);
            setDataContractUpdate((prev) => ({
              ...prev,
              extras: tempExtras,
            }));
          }}
        >
          <TrashIconSvg size={24} />
        </button>
      </div>
    </div>
  );
};

export default ContractExtrasForm;
