import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Table } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { CONTRACTS_GET } from "lib/features";

import { ProductCatalogService } from "../../../../apis/product-catalog";
import { beforeUploadFileMaxSize } from "../../../../lib/helper";
import ButtonSys from "../../../button";
import { EditSquareIconSvg, PlusIconSvg, TrashIconSvg } from "../../../icon";
import ModalServiceCreate from "../../../modal/contracts/modalServiceCreate";
import ModalServiceUpdate from "../../../modal/contracts/modalServiceUpdate";
import { FILE, LIST, TEXT } from "../detail/ContractInfoSection";

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

  // Handler

  const dataSource = [
    {
      key: "1",
      id: 1,
      name: "PC Hardware",
      pax: 5,
      price: "500000",
      priceOption: "bulan",
      subtotal: "10000000",
    },
    {
      key: "2",
      id: 2,
      name: "ATM Hardware",
      pax: 3,
      price: "400000",
      priceOption: "bulan",
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
            dataIndex: "name",
            width: "400px",
            render: (text, record) => <p className="">{text}</p>,
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
                Rp {Number(text)?.toLocaleString("id-ID") || "-"}/
                {record.priceOption}
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
            render: (text, record) => (
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="bg-transparent hover:opacity-70"
                  onClick={() => {
                    setDataRowClicked(record);
                    setModalServiceUpdate(true);
                  }}
                >
                  <EditSquareIconSvg size={24} color={"#CCCCCC"} />
                </button>

                <button
                  type="button"
                  className="bg-transparent hover:opacity-70"
                  // TODO: implement delete service in selected row
                  // onClick={()}
                >
                  <TrashIconSvg size={24} color={"#BF4A40"} />
                </button>
              </div>
            ),
          },
        ]}
      />
      {/* <AccessControl
        hasPermission={CONTRACT_SERVICE_ADD}
      > */}
      <ModalServiceCreate
        initProps={initProps}
        visible={modalServiceCreate}
        onvisible={setModalServiceCreate}
        dataContractUpdate={dataContractUpdate}
        setDataContractUpdate={setDataContractUpdate}
      />
      {/* </AccessControl> */}

      <ModalServiceUpdate
        initProps={initProps}
        visible={modalServiceUpdate}
        onvisible={setModalServiceUpdate}
        currentService={dataRowClicked}
        dataContractUpdate={dataContractUpdate}
        setDataContractUpdate={setDataContractUpdate}
      />
    </>
  );
};

export default ContractServiceForm;
