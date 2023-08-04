import { Input, Table, Tabs } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import ButtonSys from "../../../button";
import {
  EditIconSvg,
  EditSquareIconSvg,
  SearchIconSvg,
  SquarePlusIconSvg,
  TrashIconSvg,
} from "../../../icon";
import ModalColumnAdd from "../../../modal/contracts/modalColumnAdd";

const ContractInvoiceItemSection = ({
  dataContract,
  dataServiceTemplateNames,
  setDataServiceTemplateNames,
  dataServiceTemplateValues,
  setDataServiceTemplateValues,
  loading,
}) => {
  const [dynamicColumns, setDynamicColumns] = useState([]);
  const [dynamicColumnValues, setDynamicColumnValues] = useState([]);
  const [modalAddColumn, setModalAddColumn] = useState(false);
  const [isEdit, setIsEdit] = useState({ idx: -1, val: false });

  // useEffect(() => {
  //   const dynamicColNames = dynamicColumns.map((item) => item.name);
  //   setDataServiceTemplateNames(dynamicColNames);
  // }, [dynamicColumns]);

  useEffect(() => {
    const tempDyanmicColumns = [];
    for (let colIdx in dataServiceTemplateNames) {
      let newColumn = {
        key: dataServiceTemplateNames[colIdx],
        name: dataServiceTemplateNames[colIdx],
        title: (
          <div className="flex justify-between items-center space-x-2 dynamicColumn">
            <p>{dataServiceTemplateNames[colIdx]}</p>
            <button
              className="bg-transparent p-0 m-0 hoverComponent"
              // onClick={() => {
              //   setDataCurrentColumn((prev) => ({
              //     ...prev,
              //     id: currentColumnId,
              //     name: columnName,
              //   }));
              //   setModalDeleteColumn(true);
              // }}
            >
              <TrashIconSvg color={"#4D4D4D"} size={18} />
            </button>
          </div>
        ),
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
                    let dataDynamicColumnValues = [
                      ...dataServiceTemplateValues,
                    ];

                    // dataDynamicColumnValues[
                    //   index
                    // ].service_template_value.contract_service_id =
                    //   dataDynamicColumnValues[index]?.id;

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
                      ].service_template_value.details[colIdx] = e.target.value;
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

      tempDyanmicColumns.push(newColumn);
    }
    setDynamicColumns(tempDyanmicColumns);
  }, [dataServiceTemplateNames, isEdit]);

  // console.log({ dataServiceTemplateValues });
  // console.log({ dataServiceTemplateNames });
  // console.log({ dynamicColumns });
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
        dataSource={dataServiceTemplateValues}
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
            dataIndex: "actionButton",
            render: (text, record, index) => {
              return (
                Boolean(dataServiceTemplateNames.length) && (
                  <button
                    onClick={(e) => {
                      setIsEdit({ idx: index, val: !isEdit.val });
                    }}
                    className="bg-transparent"
                  >
                    <EditSquareIconSvg size={24} color={"#CCCCCC"} />
                  </button>
                )
              );
            },
          },
        ]}
      />

      <ModalColumnAdd
        visible={modalAddColumn}
        onvisible={setModalAddColumn}
        dynamicColumns={dynamicColumns}
        setDynamicColumns={setDynamicColumns}
        dataServiceTemplateValues={dataServiceTemplateValues}
        setDataServiceTemplateValues={setDataServiceTemplateValues}
        dataServiceTemplateNames={dataServiceTemplateNames}
        setDataServiceTemplateNames={setDataServiceTemplateNames}
        isEdit={isEdit}
      />
    </>
  );
};

export default ContractInvoiceItemSection;
