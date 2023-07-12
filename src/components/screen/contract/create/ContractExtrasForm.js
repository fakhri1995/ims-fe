import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popconfirm, Select, Upload } from "antd";
import React, { useCallback, useEffect, useState } from "react";

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
import { beforeUploadFileMaxSize } from "../../../../lib/helper";

const ContractExtrasForm = ({
  type,
  name,
  value,
  idx,
  dataContractUpdate,
  setDataContractUpdate,
}) => {
  // Use State
  const [fileList, setFileList] = useState([]);
  const [uploadFileLoading, setUploadFileLoading] = useState(false);

  // Use Effect
  // 2.1. Display filename when available
  // useEffect(() => {
  //   if (dataContractUpdate?.extras[idx]?.type === FILE) {
  //     const currentFileName = dataContractUpdate?.extras[idx]?.value?.link?.split("/")[2];
  //     setFileList([{ name: currentFileName }]);
  //   } else {
  //     setFileList([]);
  //   }
  // }, [dataContractUpdate?.extras]);

  // Handler
  const beforeUploadFile = useCallback((uploadedFile) => {
    const checkMaxFileSizeFilter = beforeUploadFileMaxSize();
    const isReachedMaxFileSize =
      checkMaxFileSizeFilter(uploadedFile) === Upload.LIST_IGNORE;
    const allowedFileTypes = "application/pdf";

    if (uploadedFile.type !== allowedFileTypes) {
      notification.error({
        message: "File harus memilki format .pdf",
      });
      return Upload.LIST_IGNORE;
    }

    if (isReachedMaxFileSize) {
      return Upload.LIST_IGNORE;
    }

    let tempExtras = [...dataContractUpdate?.extras];
    tempExtras[idx].value = uploadedFile;
    setDataContractUpdate((prev) => ({
      ...prev,
      extras: tempExtras,
    }));
  }, []);

  const onUploadChange = useCallback(({ file }) => {
    setUploadFileLoading(file.status === "uploading");

    if (file.status !== "removed") {
      setFileList([file]);
    }
  }, []);

  const onUploadRemove = useCallback(() => {
    setFileList([]);
    setUploadFileLoading(null);

    let tempExtras = [...dataContractUpdate?.extras];
    tempExtras[idx].value = null;
    setDataContractUpdate((prev) => ({
      ...prev,
      extras: tempExtras,
    }));
  }, []);

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
        const valueList = Array.isArray(
          dataContractUpdate?.extras?.[idx]?.value
        )
          ? dataContractUpdate?.extras?.[idx]?.value
          : [""];
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

                    {valueList.length > 1 && (
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
                    )}
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
          <Form.Item name={"value"} className="col-span-2">
            <div className="relative">
              <em className="text-mono50 mr-3">Unggah File (Maksimal 5 MB)</em>
              <Upload
                accept=".pdf"
                listType="text"
                maxCount={1}
                beforeUpload={beforeUploadFile}
                onChange={onUploadChange}
                onRemove={onUploadRemove}
                disabled={uploadFileLoading}
                fileList={fileList}
              >
                <Button
                  className="btn-sm btn font-semibold px-6 border
                  text-primary100 hover:bg-primary75 border-primary100 
                  hover:border-primary75 hover:text-white bg-white space-x-2
                  focus:border-primary75 focus:text-primary100"
                >
                  <UploadOutlined />
                  <p>Unggah File</p>
                </Button>
              </Upload>
            </div>
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
            tempExtras[idx].value = null;
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
          onClick={() => {
            const tempExtras = [...dataContractUpdate.extras];
            const copiedItem = { ...tempExtras[idx] };
            tempExtras.splice(idx, 0, copiedItem);
            setDataContractUpdate((prev) => ({
              ...prev,
              extras: tempExtras,
            }));
          }}
        >
          <CopyIconSvg size={24} color={"#4D4D4D"} />
        </button>
        <Popconfirm
          title={
            <p className="w-40">
              Apakah Anda yakin ingin menghapus komponen ini?
            </p>
          }
          okText={"Ya"}
          cancelText={"Tidak"}
          onConfirm={() => {
            const tempExtras = [...dataContractUpdate.extras];
            tempExtras.splice(idx, 1);
            setDataContractUpdate((prev) => ({
              ...prev,
              extras: tempExtras,
            }));
          }}
        >
          <button type="button" className="bg-transparent hover:opacity-70">
            <TrashIconSvg size={24} />
          </button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default ContractExtrasForm;
