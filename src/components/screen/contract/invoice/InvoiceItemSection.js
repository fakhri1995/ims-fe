import { Input, Popconfirm, Table } from "antd";
import React, { useCallback, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

import { countSubTotal, createKeyPressHandler } from "../../../../lib/helper";
import ButtonSys from "../../../button";
import {
  CheckIconSvg,
  EditSquareIconSvg,
  PlusIconSvg,
  SearchIconSvg,
  SquarePlusIconSvg,
  TrashIconSvg,
  XIconSvg,
} from "../../../icon";
import ModalColumnAdd from "../../../modal/contracts/modalColumnAdd";
import ModalServiceCreate from "../../../modal/contracts/modalServiceCreate";
import ModalServiceUpdate from "../../../modal/contracts/modalServiceUpdate";
import { ModalHapus2 } from "../../../modal/modalCustom";

const InvoiceItemSection = ({
  initProps,
  dataInvoiceUpdate,
  setDataInvoiceUpdate,
  dataServiceTemplateNames,
  setDataServiceTemplateNames,
  dataServices,
  setDataServices,
  loading,
}) => {
  // 1. Use state & ref
  const [dynamicColumns, setDynamicColumns] = useState([]);
  const [isEdit, setIsEdit] = useState({ row: null, col: null });
  const [dataCurrentColumn, setDataCurrentColumn] = useState({
    idx: -1,
    name: "",
  });

  // Filter item table
  const [searchingFilterItems, setSearchingFilterItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);

  // Cell values and index in dynamic column (Item table)
  const [currentCellValue, setCurrentCellValue] = useState(null);
  const [currentCellIndex, setCurrentCellIndex] = useState({
    row: null,
    col: null,
  });
  const prevCellValue = useRef();
  const prevCellIndex = useRef();

  // Modal
  const [modalAddColumn, setModalAddColumn] = useState(false);
  const [modalDeleteColumn, setModalDeleteColumn] = useState(false);
  const [modalAddItem, setModalAddItem] = useState(false);
  const [modalEditItem, setModalEditItem] = useState(false);

  // 2. Use Effect
  // 2.1. Render dynamic columns when dataServiceTemplateNames is changing
  useEffect(() => {
    const tempDyanmicColumns = [];
    for (let colIdx in dataServiceTemplateNames) {
      let newColumn = renderDynamicColumn(
        colIdx,
        dataServiceTemplateNames[colIdx]
      );
      tempDyanmicColumns.push(newColumn);
    }
    setDynamicColumns(tempDyanmicColumns);
  }, [dataServiceTemplateNames, isEdit, currentCellValue]);

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

  // 2.4. Save previous cell index and values in item table
  useEffect(() => {
    prevCellValue.current = currentCellValue;
  }, [currentCellValue]);

  useEffect(() => {
    prevCellIndex.current = currentCellIndex;
  }, [currentCellIndex]);

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

  const onSaveCellValue = (cellIdx, value) => {
    let tempDataServices = [...dataServices];

    // update row values
    if (dataServices?.[cellIdx.row]?.service_template_value) {
      tempDataServices[cellIdx.row].service_template_value.details[
        cellIdx.col
      ] = value;
    } else {
      tempDataServices[cellIdx.row].service_template_value = {
        details: [value],
      };
    }

    setDataServices(tempDataServices);
    setIsEdit({ row: null, col: null });
  };

  const renderDynamicColumn = (colIdx, name) => ({
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
              idx: colIdx,
              name: name,
            }));
            setModalDeleteColumn(true);
          }}
        >
          <TrashIconSvg color={"#4D4D4D"} size={18} />
        </button>
      </div>
    ),
    render: (text, record, rowIdx) => {
      return (
        <>
          {isEdit.row == rowIdx && isEdit.col == colIdx ? (
            <div className="flex gap-2 items-center">
              <Input
                defaultValue={
                  dataServices?.[rowIdx]?.service_template_value?.details?.[
                    colIdx
                  ]
                }
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    onSaveCellValue(currentCellIndex, e.target.value);
                  }
                }}
                onChange={(e) => {
                  setCurrentCellValue(e.target.value);
                  setCurrentCellIndex({ row: rowIdx, col: colIdx });
                  setDataCurrentColumn({ idx: colIdx, name: name });
                }}
              />
              <button
                onClick={() => {
                  onSaveCellValue(currentCellIndex, currentCellValue);
                }}
                className="bg-transparent hover:opacity-75"
              >
                <CheckIconSvg size={20} color={"#CCCCCC"} />
              </button>
              <button
                onClick={(e) => {
                  setIsEdit({ row: null, col: null });
                }}
                className="bg-transparent hover:opacity-75"
              >
                <XIconSvg size={20} color={"#CCCCCC"} />
              </button>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <p>
                {
                  dataServices?.[rowIdx]?.service_template_value?.details?.[
                    colIdx
                  ]
                }
              </p>
              <button
                onClick={(e) => {
                  // Auto save previous edited cell
                  if (
                    isEdit.row !== null &&
                    isEdit.col !== null &&
                    (isEdit.row !== rowIdx || isEdit.col !== colIdx)
                  ) {
                    onSaveCellValue(
                      prevCellIndex.current,
                      prevCellValue.current
                    );
                  }

                  let tempCellValue = [];
                  if (dataServices?.[rowIdx]?.service_template_value) {
                    tempCellValue =
                      dataServices?.[rowIdx]?.service_template_value?.details?.[
                        colIdx
                      ];
                  }
                  setCurrentCellIndex({ row: rowIdx, col: colIdx });
                  setCurrentCellValue(tempCellValue);
                  setIsEdit({ row: rowIdx, col: colIdx });
                }}
                className="bg-transparent hover:opacity-75"
              >
                <EditSquareIconSvg size={24} color={"#CCCCCC"} />
              </button>
            </div>
          )}
        </>
      );
    },
  });

  const handleAddColumn = () => {
    const colIdx = dataServiceTemplateNames?.length;
    const colName = dataCurrentColumn?.name;
    let newColumn = renderDynamicColumn(colIdx, colName);

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
        footer={() => (
          <button
            type="button"
            onClick={() => setModalAddItem(true)}
            className="bg-transparent flex items-center space-x-2 
            text-primary100 hover:opacity-75"
          >
            <PlusIconSvg size={16} color={"#35763B"} />
            <p>Tambah Item Baru</p>
          </button>
        )}
        columns={[
          {
            title: "No",
            dataIndex: "key",
            render: (text, record, index) => <p>{text || index + 1}</p>,
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
              const tempSubtotal = countSubTotal(record?.pax, record?.price);
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
              <div className="flex justify-center">
                <button
                  onClick={() => setModalAddColumn(true)}
                  className="bg-transparent hover:opacity-75 "
                >
                  <SquarePlusIconSvg color={"#4D4D4D"} size={20} />
                </button>
              </div>
            ),
            dataIndex: "actionButton",
            render: (text, record, rowIndex) => {
              return (
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => {
                      setCurrentCellIndex({ row: rowIndex, col: 0 });
                      setModalEditItem(true);
                    }}
                    className="bg-transparent hover:opacity-75"
                  >
                    <EditSquareIconSvg size={24} color={"#CCCCCC"} />
                  </button>
                  <Popconfirm
                    title={
                      <p className="w-40">
                        Apakah Anda yakin ingin menghapus item ini?
                      </p>
                    }
                    okText={"Ya"}
                    cancelText={"Tidak"}
                    placement="bottomRight"
                    onConfirm={() => {
                      let tempDataServices = [...dataServices];
                      tempDataServices.splice(rowIndex, 1);
                      setDataServices(tempDataServices);
                    }}
                  >
                    <button className="bg-transparent hover:opacity-75">
                      <TrashIconSvg color={"#CCCCCC"} size={24} />
                    </button>
                  </Popconfirm>
                </div>
              );
            },
          },
        ]}
      />

      {/* Modal add and delete dynamic column in item table*/}
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

      {/* Modal add and update item row */}
      <ModalServiceCreate
        initProps={initProps}
        visible={modalAddItem}
        onvisible={setModalAddItem}
        dataContractUpdate={dataInvoiceUpdate}
        setDataContractUpdate={setDataInvoiceUpdate}
        isInvoiceForm={true}
      />

      <ModalServiceUpdate
        initProps={initProps}
        visible={modalEditItem}
        onvisible={setModalEditItem}
        dataContractUpdate={dataInvoiceUpdate}
        setDataContractUpdate={setDataInvoiceUpdate}
        currentIdx={currentCellIndex?.row}
        isInvoiceForm={true}
      />
    </>
  );
};

export default InvoiceItemSection;
