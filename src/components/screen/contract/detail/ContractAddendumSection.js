import { Table, Tabs } from "antd";
import React from "react";
import { useState } from "react";

import { EyeIconSvg } from "../../../icon";
import ModalAddendumDetail from "../../../modal/contracts/modalAddendumDetail";

const ContractAddendumSection = ({
  dataServices,
  loading,
  currentVersion,
  setCurrentVersion,
}) => {
  const [modalDetail, setModalDetail] = useState(false);
  const [rowState, setRowState] = useState(0);
  return (
    <section className="grid grid-cols-1 w-full shadow-md rounded-md bg-white p-6 mb-4 gap-6">
      <h4 className="mig-heading--4">Daftar Kontrak</h4>
      <Table
        className="tableBordered border-2 rounded-md "
        dataSource={dataServices}
        rowKey={(record) => record.id}
        loading={loading}
        scroll={{ x: 200 }}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
        }}
        onRow={(record, rowIndex) => {
          return {
            onMouseOver: () => {
              setRowState(record?.id);
            },
            onClick: () => {
              record.id &&
                // isAllowedToGetInvoice &&
                setCurrentVersion(record?.id);
            },
          };
        }}
        rowClassName={(record, idx) => {
          return `${record.id === rowState && `cursor-pointer `} ${
            record.id === currentVersion && `bg-[#EBF2EC]`
          } 
          }`;
        }}
        columns={[
          {
            title: "No.",
            dataIndex: "no",
            render: (text, record, index) => <p>{index + 1}</p>,
          },
          {
            title: "Kontrak",
            dataIndex: ["addendum", "name"],
            render: (text) => <p className="">{text}</p>,
          },
          {
            title: "Tanggal Berlaku",
            dataIndex: ["addendum", "start_date"],
            render: (text) => <p className="">{text}</p>,
          },

          {
            // title: "Harga",
            dataIndex: "no",
            render: (text, record) => (
              <button
                onClick={() => setModalDetail(true)}
                className="bg-white rounded-md p-2 flex items-center 
                justify-center w-8 h-8"
              >
                <EyeIconSvg color={"#35763B"} size={20} />
              </button>
            ),
          },
        ]}
      />

      <ModalAddendumDetail visible={modalDetail} onvisible={setModalDetail} />
    </section>
  );
};

export default ContractAddendumSection;
