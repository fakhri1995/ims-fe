import { Input, Table, Tabs } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import ButtonSys from "../../../button";
import { SearchIconSvg, SquarePlusIconSvg } from "../../../icon";
import ModalColumnAdd from "../../../modal/contracts/modalColumnAdd";

const ContractInvoiceItemSection = ({
  dataContract,
  dataServiceTemplate,
  setDataServiceTemplate,
  loading,
}) => {
  const [dynamicColumns, setDynamicColumns] = useState([]);
  const [dynamicColumnValues, setDynamicColumnValues] = useState([]);
  const [modalAddColumn, setModalAddColumn] = useState(false);

  useEffect(() => {
    const dynamicColNames = dynamicColumns.map((item) => item.name);
    setDataServiceTemplate((prev) => ({
      ...prev,
      colNames: dynamicColNames,
      // colValues: dataServiceTemplate?.colValues,
    }));
  }, [dynamicColumns]);

  console.log({ dynamicColumns });
  return (
    <>
      <div className="flex justify-between">
        <h4 className="mig-heading--4 mb-6">Data Item</h4>
        {/* Search by keyword (kata kunci) */}
        <div className="flex gap-2 md:gap-6">
          <div className="w-full ">
            <Input
              // defaultValue={}
              style={{ width: `100%` }}
              placeholder="Cari Item.."
              allowClear
              onChange={(e) => {
                // setTimeout(
                //   () => setSearchingFilterContracts(e.target.value),
                //   500
                // );
              }}
              // onKeyPress={onKeyPressHandler}
              // disabled={!isAllowedToGetContracts}
            />
          </div>
          <div className="flex justify-end">
            <ButtonSys
              type={`primary`}
              // onClick={onFilterRecruitments}
              // disabled={!isAllowedToGetContracts}
            >
              <div className="flex flex-row space-x-2.5 w-full items-center">
                <SearchIconSvg size={15} color={`#ffffff`} />
                <p>Cari</p>
              </div>
            </ButtonSys>
          </div>
        </div>
      </div>
      <Table
        className="tableBordered border-2 rounded-md"
        dataSource={dataServiceTemplate?.colValues}
        rowKey={(record) => record.id}
        loading={loading}
        scroll={{ x: 200 }}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
        }}
        columns={[
          {
            title: "No",
            dataIndex: "no",
            render: (text, record, index) => <p>{index + 1}</p>,
          },
          {
            title: "Nama Item",
            dataIndex: ["product", "name"],
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
          ...dynamicColumns,
          {
            title: (
              <button
                onClick={() => setModalAddColumn(true)}
                className="bg-transparent"
              >
                <SquarePlusIconSvg color={"#4D4D4D"} size={20} />
              </button>
            ),
            dataIndex: "addColumn",
          },
        ]}
      />

      <ModalColumnAdd
        visible={modalAddColumn}
        onvisible={setModalAddColumn}
        dynamicColumns={dynamicColumns}
        setDynamicColumns={setDynamicColumns}
        dataServiceTemplate={dataServiceTemplate}
        setDataServiceTemplate={setDataServiceTemplate}
        setDynamicColumnValues={setDynamicColumnValues}
      />
    </>
  );
};

export default ContractInvoiceItemSection;
