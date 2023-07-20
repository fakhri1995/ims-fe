import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Table } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { EditSquareIconSvg, PlusIconSvg, TrashIconSvg } from "../../../icon";
import ModalServiceCreate from "../../../modal/contracts/modalServiceCreate";
import ModalServiceUpdate from "../../../modal/contracts/modalServiceUpdate";

const ContractServiceForm = ({
  initProps,
  dataContractUpdate,
  setDataContractUpdate,
}) => {
  const { hasPermission } = useAccessControl();

  // Use State
  const [modalServiceCreate, setModalServiceCreate] = useState(false);
  const [modalServiceUpdate, setModalServiceUpdate] = useState(false);
  const [dataRowClicked, setDataRowClicked] = useState({});
  const [currentIdx, setCurrentIdx] = useState(-1);

  // Handler

  // console.log({ dataContractUpdate });
  return (
    <>
      <Table
        className="tableBordered border-2 rounded-md"
        dataSource={dataContractUpdate?.services}
        rowKey={(record) => record.key}
        // loading={loading}
        scroll={{ x: 200 }}
        pagination={false}
        footer={() => (
          <button
            type="button"
            onClick={() => setModalServiceCreate(true)}
            className="bg-transparent flex items-center space-x-2 text-primary100"
          >
            <PlusIconSvg size={16} color={"#35763B"} />
            <p>Tambah Service Baru</p>
          </button>
        )}
        columns={[
          {
            title: "No",
            dataIndex: "no",
            render: (text, record, index) => <p>{index + 1}</p>,
          },
          {
            title: "Service",
            dataIndex: ["product", "name"],
            width: "400px",
            render: (text) => <p className="">{text}</p>,
          },
          {
            title: "Pax",
            dataIndex: "pax",
          },
          {
            title: "Harga",
            dataIndex: "price",
            render: (text, record) => (
              <p className="">
                Rp {Number(text)?.toLocaleString("id-ID") || "-"}
                <span className="text-mono50">
                  /{record?.unit?.toLowerCase()}
                </span>
              </p>
            ),
          },
          {
            title: "Subtotal",
            dataIndex: "subtotal",
            render: (text, record) => {
              let tempSubtotal = Number(record?.pax) * Number(record?.price);
              return (
                <p className="">
                  Rp{" "}
                  {Number(text || tempSubtotal)?.toLocaleString("id-ID") || "-"}
                </p>
              );
            },
          },
          {
            dataIndex: "action_button",
            render: (text, record, index) => (
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="bg-transparent hover:opacity-70"
                  onClick={() => {
                    setDataRowClicked(record);
                    setCurrentIdx(index);
                    setModalServiceUpdate(true);
                  }}
                >
                  <EditSquareIconSvg size={24} color={"#CCCCCC"} />
                </button>

                <button
                  type="button"
                  className="bg-transparent hover:opacity-70"
                  onClick={() => {
                    const tempServices = [...dataContractUpdate?.services];
                    tempServices.splice(index, 1);

                    setDataContractUpdate((prev) => ({
                      ...prev,
                      services: tempServices,
                    }));
                  }}
                >
                  <TrashIconSvg size={24} color={"#BF4A40"} />
                </button>
              </div>
            ),
          },
        ]}
      />

      <ModalServiceCreate
        initProps={initProps}
        visible={modalServiceCreate}
        onvisible={setModalServiceCreate}
        dataContractUpdate={dataContractUpdate}
        setDataContractUpdate={setDataContractUpdate}
      />

      <ModalServiceUpdate
        initProps={initProps}
        visible={modalServiceUpdate}
        onvisible={setModalServiceUpdate}
        dataContractUpdate={dataContractUpdate}
        setDataContractUpdate={setDataContractUpdate}
        currentIdx={currentIdx}
      />
    </>
  );
};

export default ContractServiceForm;
