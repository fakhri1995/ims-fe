import { Table, Tabs } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";

import { AccessControl } from "components/features/AccessControl";

import {
  CONTRACT_HISTORIES_GET,
  CONTRACT_HISTORY_LOGS_GET,
} from "lib/features";

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
  currentKey,
  setCurrentKey,
}) => {
  const [modalDetail, setModalDetail] = useState(false);
  const [rowState, setRowState] = useState(0);
  const [contractVersionList, setContractVersionList] = useState([]);
  const [currentModalData, setCurrentModalData] = useState({});

  // Get contract histories
  const {
    data: dataContractHistories,
    isLoading: loadingDataContractHistories,
  } = useQuery(
    [CONTRACT_HISTORIES_GET, contractId, refresh],
    () =>
      ContractService.getContractHistories(
        initProps,
        isAllowedToGetContractHistories,
        contractId
      ),
    {
      enabled: isAllowedToGetContractHistories,
      refetchOnMount: true,
      select: (response) => response.data,
    }
  );

  // Construct array for table Daftar Kontrak
  // Utama: last item from addendum or initial
  // Inisiasi: initial
  // Adendum 1-n: items in addendum
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

  const getContractVersionLabel = (category, addendumNum) => {
    switch (category) {
      case "main":
        return "Utama";

      case "initial":
        return "Inisiasi";

      case "addendum":
        return `Adendum ${addendumNum}`;
    }
  };

  // console.log("id di addendum section", currentVersion);
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
                setCurrentKey(record.key);

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
            record.key === currentKey && `bg-[#EBF2EC]`
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
                {getContractVersionLabel(text, record?.rowNum - 2)}
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
                  setCurrentModalData({
                    history_id: record?.id,
                    rowNum: record?.rowNum,
                    category: record?.category,
                    code_number: record?.code_number,
                  });
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

      <AccessControl hasPermission={CONTRACT_HISTORY_LOGS_GET}>
        <ModalAddendumDetail
          initProps={initProps}
          visible={modalDetail}
          onvisible={setModalDetail}
          contractHistoryId={currentModalData?.history_id}
          versionLabel={getContractVersionLabel(
            currentModalData?.category,
            currentModalData?.rowNum - 2
          )}
          contractNumber={currentModalData?.code_number}
        />
      </AccessControl>
    </section>
  );
};

export default ContractAddendumSection;
