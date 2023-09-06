import { Table, Tabs } from "antd";
import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";

import { CONTRACT_HISTORIES_GET } from "lib/features";

import { ContractService } from "apis/contract";

import { momentFormatDate } from "../../../../lib/helper";
import { EyeIconSvg } from "../../../icon";
import ModalAddendumDetail from "../../../modal/contracts/modalAddendumDetail";

const ContractAddendumSection = ({
  currentVersion,
  setCurrentVersion,
  isAllowedToGetContractHistories,
  contractId,
  initProps,
}) => {
  const [modalDetail, setModalDetail] = useState(false);
  const [rowState, setRowState] = useState(0);

  // Get contract histories
  const {
    data: dataContractHistories,
    isLoading: loadingDataContractHistories,
  } = useQuery(
    [CONTRACT_HISTORIES_GET],
    () =>
      ContractService.getContractHistories(
        initProps,
        isAllowedToGetContractHistories,
        contractId
      ),
    {
      enabled: isAllowedToGetContractHistories,
      refetchOnMount: true,
      select: (response) => response.data.addendum,
    }
  );

  return (
    <section className="grid grid-cols-1 w-full shadow-md rounded-md bg-white p-6 mb-4 gap-6">
      <h4 className="mig-heading--4">Daftar Kontrak</h4>
      <Table
        className="tableBordered border-2 rounded-md "
        dataSource={dataContractHistories}
        rowKey={(record) => record.id}
        loading={loadingDataContractHistories}
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
            dataIndex: "category",
            render: (text, record, index) => (
              <p className="">{text == "addendum" && `Adendum ${index + 1}`}</p>
            ),
          },
          {
            title: "Tanggal Berlaku",
            dataIndex: ["start_date"],
            render: (text) => <p className="">{momentFormatDate(text)}</p>,
          },

          {
            // title: "Harga",
            dataIndex: "no",
            render: (text, record) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalDetail(true);
                }}
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
