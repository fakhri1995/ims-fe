import { Table, Tabs } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
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
  refresh,
  setIsAddendum,
}) => {
  const [modalDetail, setModalDetail] = useState(false);
  const [rowState, setRowState] = useState(0);
  const [contractVersionList, setContractVersionList] = useState([]);

  // Get contract histories
  const {
    data: dataContractHistories,
    isLoading: loadingDataContractHistories,
  } = useQuery(
    [CONTRACT_HISTORIES_GET, contractId, refresh, currentVersion],
    () =>
      ContractService.getContractHistories(
        initProps,
        isAllowedToGetContractHistories,
        contractId
      ),
    {
      enabled: isAllowedToGetContractHistories,
      refetchOnMount: false,
      select: (response) => response.data,
    }
  );

  // Construct array for table Daftar Kontrak
  useEffect(() => {
    if (!loadingDataContractHistories) {
      setContractVersionList([
        dataContractHistories?.addendum[
          dataContractHistories?.addendum?.length - 1
        ] || dataContractHistories?.initial,
        dataContractHistories?.initial,
        ...dataContractHistories?.addendum,
      ]);
    }
  }, [dataContractHistories]);

  return (
    <section className="grid grid-cols-1 w-full shadow-md rounded-md bg-white p-6 mb-4 gap-6">
      <h4 className="mig-heading--4">Daftar Kontrak</h4>
      <Table
        className="tableBordered border-2 rounded-md "
        dataSource={contractVersionList?.map((item, idx) => ({
          ...item,
          key: idx === 0 ? "0" : item?.id,
          category: idx === 0 ? "main" : item?.category,
          rowNum: idx + 1,
        }))}
        rowKey={(record) => record.key}
        loading={loadingDataContractHistories}
        scroll={{ x: 200 }}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
        }}
        onRow={(record) => {
          return {
            onMouseOver: () => {
              setRowState(record?.id);
            },
            onClick: () => {
              if (record.id) {
                setCurrentVersion(record?.id);

                if (record?.category == "addendum") {
                  setIsAddendum(true);
                } else {
                  setIsAddendum(false);
                }
              }
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
            render: (text, record) => <p>{record?.rowNum}</p>,
          },
          {
            title: "Kontrak",
            dataIndex: "category",
            render: (text, record) => (
              <p className="">
                {text == "main" && `Utama`}
                {text == "initial" && `Inisiasi`}
                {text == "addendum" && `Adendum ${record?.rowNum - 2}`}
              </p>
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
