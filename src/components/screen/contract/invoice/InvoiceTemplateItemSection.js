import { Input, Table } from "antd";
import React, { useCallback, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

import { createKeyPressHandler } from "../../../../lib/helper";
import ButtonSys from "../../../button";
import {
  CheckIconSvg,
  EditSquareIconSvg,
  SearchIconSvg,
  SquarePlusIconSvg,
  TrashIconSvg,
  XIconSvg,
} from "../../../icon";
import ModalColumnAdd from "../../../modal/contracts/modalColumnAdd";
import { ModalHapus2 } from "../../../modal/modalCustom";

const InvoiceTemplateItemSection = ({
  dataServiceTemplateNames,
  setDataServiceTemplateNames,
  dataServices,
  setDataServices,
  loading,
}) => {
  // 1.Use State
  const [dynamicColumns, setDynamicColumns] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [modalAddColumn, setModalAddColumn] = useState(false);
  const [modalDeleteColumn, setModalDeleteColumn] = useState(false);
  const [dataCurrentColumn, setDataCurrentColumn] = useState({
    idx: -1,
    name: "",
  });
  const [currentRowValues, setCurrentRowValues] = useState([]);
  const [currentRowIndex, setCurrentRowIndex] = useState(-1);
  const [searchingFilterItems, setSearchingFilterItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const prevRowValues = useRef();
  const prevRowIndex = useRef();

  // 2. Use Effect
  // 2.1. Render dynamic columns when dataServiceTemplateNames is changing
  useEffect(() => {
    const tempDyanmicColumns = [];
    for (let colIdx in dataServiceTemplateNames) {
      let newColumn = renderNewColumn(colIdx, dataServiceTemplateNames[colIdx]);
      tempDyanmicColumns.push(newColumn);
    }
    setDynamicColumns(tempDyanmicColumns);
  }, [dataServiceTemplateNames, isEdit, currentRowValues]);

  // 2.2. Add contract_service_id & details attribute if not yet available
  useEffect(() => {
    let tempServices = dataServices?.map((service, idx) => ({
      ...service,
      key: idx + 1,
      service_template_value: {
        ...service?.service_template_value,
        contract_service_id: service?.id,
        details: service.service_template_value
          ? [...service.service_template_value?.details]
          : [""],
      },
    }));
    setDataServices(tempServices);
  }, [dataServiceTemplateNames]);

  // 2.3. Filter service items
  useEffect(() => {
    setFilteredItems(dataServices);
  }, [dataServices]);

  useEffect(() => {
    onFilterItems();
  }, [searchingFilterItems]);

  // 2.4. Save previous row index and values in item table
  useEffect(() => {
    prevRowValues.current = currentRowValues;
  }, [currentRowValues]);

  useEffect(() => {
    prevRowIndex.current = currentRowIndex;
  }, [currentRowIndex]);

  // 3. Handler
  const onFilterItems = () => {
    const tempFilteredItems = dataServices?.filter((service) =>
      service?.product?.name
        ?.toLowerCase()
        ?.includes(searchingFilterItems?.toLowerCase())
    );
    setFilteredItems(tempFilteredItems);
  };

  const { onKeyPressHandler } = createKeyPressHandler(onFilterItems, "Enter");
  const onSaveRowValues = (rowIndex, rowValues) => {
    let tempDataServices = [...dataServices];

    // update row values
    if (dataServices?.[rowIndex]?.service_template_value) {
      tempDataServices[rowIndex].service_template_value.details = rowValues;
    }

    setDataServices(tempDataServices);
    setIsEdit(null);
  };

  const renderNewColumn = (idx, name) => ({
    key: name?.toLowerCase().replace(/ /g, "_"),
    name: name,
    title: (
      <div className="flex justify-between items-center space-x-2 dynamicColumn">
        <p>{name}</p>
        <button
          className="hoverComponent bg-transparent hover:opacity-75"
          onClick={() => {
            setDataCurrentColumn((prev) => ({
              ...prev,
              idx: idx,
              name: name,
            }));
            setModalDeleteColumn(true);
          }}
        >
          <TrashIconSvg color={"#4D4D4D"} size={18} />
        </button>
      </div>
    ),
    render: (text, record, rowIndex) => {
      return (
        <>
          {isEdit == rowIndex ? (
            <Input
              defaultValue={
                dataServices?.[rowIndex]?.service_template_value?.details?.[idx]
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onSaveRowValues(currentRowIndex, currentRowValues);
                }
              }}
              onChange={(e) => {
                setCurrentRowValues((prev) => {
                  const tempRowValues = [...prev];
                  tempRowValues[idx] = e.target.value;
                  return tempRowValues;
                });

                setDataCurrentColumn({ idx: idx, name: name });
                setCurrentRowIndex(rowIndex);
              }}
            />
          ) : (
            <p>
              {dataServices?.[rowIndex]?.service_template_value?.details?.[idx]}
            </p>
          )}
        </>
      );
    },
  });

  const handleAddColumn = () => {
    const colIdx = dataServiceTemplateNames?.length;
    const colName = dataCurrentColumn?.name;
    let newColumn = renderNewColumn(colIdx, colName);

    setDynamicColumns((prev) => [...prev, newColumn]);
    setDataServiceTemplateNames([
      ...dynamicColumns.map((item) => item?.name),
      colName,
    ]);

    setModalAddColumn(false);
    setDataCurrentColumn({ idx: -1, name: "" });
  };

  const { onKeyPressHandler: onEnterAddColumn } = createKeyPressHandler(
    handleAddColumn,
    "Enter"
  );

  const handleDeleteColumn = (idx) => {
    // Delete column name
    let tempDyanmicColumns = [...dynamicColumns];
    tempDyanmicColumns.splice(idx, 1);

    // Delete column values
    const updatedServices = [];
    for (let item of dataServices) {
      let tempValues = [...item?.service_template_value?.details];
      tempValues.splice(idx, 1);
      let tempService = {
        ...item,
        service_template_value: {
          ...item.service_template_value,
          details: tempValues,
        },
      };
      updatedServices.push(tempService);
    }

    setDynamicColumns(tempDyanmicColumns);
    setDataServiceTemplateNames(tempDyanmicColumns.map((item) => item?.name));
    setDataServices(updatedServices);
    setModalDeleteColumn(false);
  };

  // console.log({ dataServices });
  // console.log({ currentRowValues });
  // console.log({ dataServiceTemplateNames });
  // console.log({ dynamicColumns });
  // console.log({ dataCurrentColumn });

  return (
    <>
      <div className="flex justify-between">
        <h4 className="mig-heading--4 mb-6">Data Item</h4>
        {/* Search by keyword (kata kunci) */}
        {/* TODO: implement search if API is ready */}
        <div className="flex gap-2 md:gap-6">
          <div className="w-full ">
            <Input
              defaultValue={null}
              style={{ width: `100%` }}
              placeholder="Cari Item.."
              allowClear
              onChange={(e) => {
                setTimeout(() => setSearchingFilterItems(e.target.value), 500);
              }}
              onKeyPress={onKeyPressHandler}
              // disabled={!isAllowedToGetContracts}
            />
          </div>
          <div className="flex justify-end">
            <ButtonSys
              type={`primary`}
              onClick={onFilterItems}
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
        dataSource={filteredItems}
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
            dataIndex: "key",
            render: (text, record, index) => <p>{text}</p>,
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
                className="bg-transparent hover:opacity-75"
              >
                <SquarePlusIconSvg color={"#4D4D4D"} size={20} />
              </button>
            ),
            dataIndex: "actionButton",
            render: (text, record, rowIndex) => {
              return (
                Boolean(dataServiceTemplateNames?.length) &&
                (isEdit == rowIndex ? (
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => {
                        onSaveRowValues(rowIndex, currentRowValues);
                      }}
                      className="bg-transparent hover:opacity-75"
                    >
                      <CheckIconSvg size={20} color={"#CCCCCC"} />
                    </button>
                    <button
                      onClick={(e) => {
                        setIsEdit(null);
                      }}
                      className="bg-transparent hover:opacity-75"
                    >
                      <XIconSvg size={20} color={"#CCCCCC"} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      // Auto save previous edited row
                      if ((isEdit !== null) & (isEdit !== rowIndex)) {
                        onSaveRowValues(
                          prevRowIndex.current,
                          prevRowValues.current
                        );
                      }

                      let tempRowValues = [];
                      if (dataServices?.[rowIndex]?.service_template_value) {
                        tempRowValues = [
                          ...dataServices?.[rowIndex]?.service_template_value
                            ?.details,
                        ];
                      }
                      setCurrentRowIndex(rowIndex);
                      setCurrentRowValues(tempRowValues);
                      setIsEdit(rowIndex);
                    }}
                    className="bg-transparent hover:opacity-75"
                  >
                    <EditSquareIconSvg size={24} color={"#CCCCCC"} />
                  </button>
                ))
              );
            },
          },
        ]}
      />

      <ModalColumnAdd
        visible={modalAddColumn}
        onvisible={setModalAddColumn}
        handleAddColumn={handleAddColumn}
        dataCurrentColumn={dataCurrentColumn}
        setDataCurrentColumn={setDataCurrentColumn}
        onEnterAddColumn={onEnterAddColumn}
      />

      <ModalHapus2
        title={`Konfirmasi Hapus Kolom`}
        visible={modalDeleteColumn}
        onvisible={setModalDeleteColumn}
        onOk={() => handleDeleteColumn(dataCurrentColumn?.idx)}
        onCancel={() => {
          setModalDeleteColumn(false);
        }}
        itemName={"kolom"}
        loading={false}
      >
        Apakah Anda yakin ingin menghapus kolom{" "}
        <strong>{dataCurrentColumn?.name}</strong>?
      </ModalHapus2>
    </>
  );
};

export default InvoiceTemplateItemSection;
