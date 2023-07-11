import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Table } from "antd";
import React, { useState } from "react";

import { beforeUploadFileMaxSize } from "../../../../lib/helper";
import ButtonSys from "../../../button";
import { EditSquareIconSvg, PlusIconSvg, TrashIconSvg } from "../../../icon";
import ModalServiceCreate from "../../../modal/contracts/modalServiceCreate";
import { FILE, LIST, TEXT } from "../detail/ContractInfoSection";

const ContractServiceForm = ({ initProps }) => {
  // Use State
  const [modalCreate, setModalCreate] = useState(false);

  // 2. Use Effect

  // Handler

  const dataSource = [
    {
      key: "1",
      service: "PC",
      type: "Hardware",
      pax: 5,
      price: "500000",
      subtotal: "10000000",
    },
    {
      key: "2",
      service: "ATM",
      type: "Hardware",
      pax: 3,
      price: "400000",
      subtotal: "2400000",
    },
  ];

  return (
    <>
      <Table
        className="tableBordered border-2 rounded-md"
        dataSource={dataSource}
        rowKey={(record) => record.key}
        // loading={loading}
        scroll={{ x: 200 }}
        pagination={false}
        footer={() => (
          <button
            type="button"
            onClick={() => setModalCreate(true)}
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
            dataIndex: "service",
            width: "400px",
            render: (text, record) => (
              <p className="">
                {text} <span>{record?.type}</span>
              </p>
            ),
          },
          {
            title: "Pax",
            dataIndex: "pax",
          },
          {
            title: "Harga",
            dataIndex: "price",
            render: (text) => (
              <p className="">
                Rp {Number(text)?.toLocaleString("id-ID") || "-"}/bulan
              </p>
            ),
          },
          {
            title: "Subtotal",
            dataIndex: "subtotal",
            render: (text) => (
              <p className="">
                Rp {Number(text)?.toLocaleString("id-ID") || "-"}
              </p>
            ),
          },
          {
            dataIndex: "action_button",
            render: (text) => (
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="bg-transparent hover:opacity-70"
                  onClick={() => setModalCreate(true)}
                >
                  <EditSquareIconSvg size={24} color={"#CCCCCC"} />
                </button>

                <button
                  type="button"
                  className="bg-transparent hover:opacity-70"
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
        visible={modalCreate}
        onvisible={setModalCreate}
      />
    </>
  );
};

export default ContractServiceForm;
