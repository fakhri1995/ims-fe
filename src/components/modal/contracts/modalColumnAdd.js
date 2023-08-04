import { DeleteOutlined } from "@ant-design/icons";
import { Form, Input, Modal, notification } from "antd";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";

import { generateStaticAssetUrl, momentFormatDate } from "../../../lib/helper";
import ButtonSys from "../../button";
import { PlusIconSvg, TrashIconSvg } from "../../icon";
import { ModalHapus2 } from "../modalCustom";

const ModalColumnAdd = ({
  visible,
  onvisible,
  dynamicColumns,
  setDynamicColumns,
  dataServiceTemplateValues,
  setDataServiceTemplateValues,
  dataServiceTemplateNames,
  setDataServiceTemplateNames,
  isEdit,
}) => {
  // 1. USE STATE
  const [columnName, setColumnName] = useState("");
  const [modalDeleteColumn, setModalDeleteColumn] = useState(false);
  const [dataCurrentColumn, setDataCurrentColumn] = useState({
    id: -1,
    name: "",
    values: [],
  });

  // 2. HANDLER
  const handleAddColumn = () => {
    const colIdx = dataServiceTemplateNames.length;
    const currentColumnId = columnName.toLowerCase().replace(/ /g, "_");
    let newColumn = {
      key: currentColumnId,
      title: (
        <div className="flex justify-between items-center space-x-2 dynamicColumn">
          <p>{columnName}</p>
          <button
            className="bg-transparent p-0 m-0 hoverComponent"
            onClick={() => {
              setDataCurrentColumn((prev) => ({
                ...prev,
                id: currentColumnId,
                name: columnName,
              }));
              setModalDeleteColumn(true);
            }}
          >
            <TrashIconSvg color={"#4D4D4D"} size={18} />
          </button>
        </div>
      ),
      name: columnName,
      render: (text, record, index) => {
        return (
          <>
            {isEdit?.idx == index && isEdit?.val == true ? (
              <Input
                value={
                  dataServiceTemplateValues?.[index]?.service_template_value
                    ?.details?.[colIdx]
                }
                onChange={(e) => {
                  let dataDynamicColumnValues = [...dataServiceTemplateValues];

                  dataDynamicColumnValues[
                    index
                  ].service_template_value.contract_service_id =
                    dataDynamicColumnValues[index]?.id;

                  if (
                    !dataDynamicColumnValues[index]?.service_template_value
                      ?.details
                  ) {
                    dataDynamicColumnValues[
                      index
                    ].service_template_value.details = [e.target.value];
                  } else {
                    dataDynamicColumnValues[
                      index
                    ].service_template_value.details?.splice(
                      colIdx,
                      1,
                      e.target.value
                    );
                  }

                  setDataServiceTemplateValues(dataDynamicColumnValues);
                }}
              />
            ) : (
              // <p>{record?.service_template_value?.details?.[colIdx]}</p>
              <p>
                {
                  dataServiceTemplateValues?.[index]?.service_template_value
                    ?.details?.[colIdx]
                }
              </p>
            )}
          </>
        );
      },
    };

    setDynamicColumns((prev) => [...prev, newColumn]);
    setDataServiceTemplateNames([
      ...dynamicColumns.map((item) => item?.name),
      columnName,
    ]);
    onvisible(false);
    setColumnName("");
  };

  const handleDeleteColumn = (columnKey) => {
    let tempDyanmicColumns = [...dynamicColumns];
    tempDyanmicColumns = tempDyanmicColumns.filter(
      (column) => column.key !== columnKey
    );

    setDynamicColumns(tempDyanmicColumns);
    setModalDeleteColumn(false);
    onvisible(false);
  };

  // console.log({ dataCurrentColumn });
  return !modalDeleteColumn ? (
    <Modal
      title={<p className="mig-heading--4 text-mono30">Tambah Kolom Baru</p>}
      visible={visible}
      closable={true}
      onCancel={() => onvisible(false)}
      maskClosable={false}
      footer={
        <ButtonSys
          type={"primary"}
          fullWidth
          onClick={handleAddColumn}
          disabled={!columnName}
        >
          <div className="flex items-center space-x-2">
            <p>Tambah Kolom</p>
            <PlusIconSvg size={16} color={"#FFFFFF"} />
          </div>
        </ButtonSys>
      }
    >
      <div className="">
        <Form layout="vertical">
          <Form.Item
            label="Nama Kolom"
            name={"column_name"}
            rules={[
              {
                required: true,
                message: "Nama Kolom wajib diisi",
              },
            ]}
          >
            <>
              <Input
                placeholder="Masukkan nama kolom"
                value={columnName}
                onChange={(e) => setColumnName(e.target.value)}
              ></Input>
            </>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  ) : (
    <ModalHapus2
      title={`Konfirmasi Hapus Kolom`}
      visible={modalDeleteColumn}
      onvisible={setModalDeleteColumn}
      onOk={() => handleDeleteColumn(dataCurrentColumn?.id)}
      onCancel={() => {
        setModalDeleteColumn(false);
      }}
      itemName={"kolom"}
      loading={false}
    >
      Apakah Anda yakin ingin menghapus kolom{" "}
      <strong>{dataCurrentColumn?.name}</strong>?
    </ModalHapus2>
  );
};

export default ModalColumnAdd;
