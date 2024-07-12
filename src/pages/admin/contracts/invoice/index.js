import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  Select,
  Spin,
  Tooltip,
  notification,
} from "antd";
import locale from "antd/lib/date-picker/locale/id_ID";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import { AccessControl } from "components/features/AccessControl";
import {
  DownloadIconSvg,
  EditSquareIconSvg,
  FileDownloadIconSvg,
  SearchIconSvg,
} from "components/icon";
import Layout from "components/layout-dashboard-management";
import st from "components/layout-dashboard-management.module.css";
import { ModalHapus2 } from "components/modal/modalCustom";
import { TableCustomInvoiceList } from "components/table/tableCustom";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  COMPANY_CLIENTS_GET,
  COMPANY_DETAIL_GET,
  CONTRACT_INVOICES_GET,
  CONTRACT_INVOICE_DELETE,
  CONTRACT_INVOICE_GET,
  CONTRACT_INVOICE_UPDATE,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";
import { createKeyPressHandler, momentFormatDate } from "lib/helper";

import { CompanyService } from "apis/company";
import { ContractService } from "apis/contract";

import {
  AlertCircleIconSvg,
  DownloadIcon2Svg,
  PlusIconSvg,
  TrashIconSvg,
} from "../../../../components/icon";
import { InputCurrency } from "../../../../components/input";
import ModalCore from "../../../../components/modal/modalCore";
import { convertDaysToString } from "../../../../lib/helper";
import { contractInfoString } from "../[contractId]/invoice-template";
import ContractInvoicePDF, { InvoicePDFTemplate } from "./invoicePDF";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js";
import httpcookie from "cookie";

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

const ContractInvoiceIndex = ({ dataProfile, sidemenu, initProps }) => {
  // 1. Init
  /**
   * Dependencies
   */
  const axiosClient = useAxiosClient();
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  const isAllowedToGetInvoices = hasPermission(CONTRACT_INVOICES_GET);
  const isAllowedToGetInvoice = hasPermission(CONTRACT_INVOICE_GET);
  const isAllowedToUpdateInvoice = hasPermission(CONTRACT_INVOICE_UPDATE);
  const isAllowedToDeleteInvoice = hasPermission(CONTRACT_INVOICE_DELETE);

  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);
  const isAllowedToGetCompanyDetail = hasPermission(COMPANY_DETAIL_GET);

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    total_min: withDefault(NumberParam, undefined),
    total_max: withDefault(NumberParam, undefined),
    client_ids: withDefault(NumberParam, undefined),
    is_posted: withDefault(NumberParam, undefined),
    year: withDefault(NumberParam, moment().format("YYYY")),
    month: withDefault(NumberParam, moment().format("M")),
  });

  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 2, "Kontrak", "Invoice");

  const priceRangeList = [
    { name: "Rp 0 - Rp 50.000.000", value: "0,50000000" },
    { name: "Rp 50.000.001 - Rp 100.000.000", value: "50000001,100000000" },
    { name: "> Rp 100.000.000", value: "100000000," },
  ];

  const dataStatusList = [
    {
      id: 0,
      name: "Draft",
      color: "#4D4D4D",
    },
    {
      id: 1,
      name: "Terbit",
      color: "#35763B",
    },
  ];

  // 2. Use state
  // 2.1. Table Contract
  // filter search & selected options
  const [searchingFilterInvoices, setSearchingFilterInvoices] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 0]);
  const [selectedCompany, setSelectedCompany] = useState(undefined);
  const [selectedStatus, setSelectedStatus] = useState(undefined);
  const [selectedMonthYear, setSelectedMonthYear] = useState(moment());

  // Modal Price Range Filter
  const [modalPriceRange, setModalPriceRange] = useState(false);
  const [priceRangeInput, setPriceRangeInput] = useState([0, 0]);

  const [refresh, setRefresh] = useState(-1);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [dataRowClicked, setDataRowClicked] = useState({});

  // Download PDF
  const [dataInvoice, setDataInvoice] = useState({});
  const [dataInvoiceDetail, setDataInvoiceDetail] = useState([]);
  const [dataClient, setDataClient] = useState({ id: null });
  const [loadingContractInvoice, setLoadingContractInvoice] = useState(false);
  const [isOnClient, setIsOnClient] = useState(-1); // use invoiceId as argument
  const [openDownloadModal, setOpenDownloadModal] = useState(false);

  // 3. UseEffect & UseQuery
  // 3.1. Get Company Client List
  const { data: dataCompanyList, isLoading: loadingCompanyList } = useQuery(
    [COMPANY_CLIENTS_GET],
    () => CompanyService.getCompanyClientList(axiosClient, true),
    {
      enabled: isAllowedToGetCompanyClients,
      select: (response) => response.data.data,
    }
  );

  // 3.2. Get Invoices
  const { data: dataRawContracts, isLoading: loadingDataRawContracts } =
    useQuery(
      [CONTRACT_INVOICES_GET, queryParams, searchingFilterInvoices, refresh],
      () =>
        ContractService.getInvoices(
          initProps,
          isAllowedToGetInvoices,
          queryParams,
          searchingFilterInvoices
        ),
      {
        enabled: isAllowedToGetInvoices,
        select: (response) => response.data,
      }
    );

  // 3.4. State to only renders `<PDFDownloadLink>` component
  // after dataInvoice is available (client-side)
  useEffect(() => {
    if (
      dataInvoice.id &&
      dataInvoice?.id == dataRowClicked?.id &&
      dataClient?.id
    ) {
      setIsOnClient(dataRowClicked?.id);
    } else {
      setIsOnClient(-1);
    }
  }, [dataInvoice?.id, dataRowClicked?.id, dataClient?.id]);

  if (isAccessControlPending) {
    return null;
  }

  // 4. Event
  // 4.1. Filter Table
  const onFilterRecruitments = () => {
    setQueryParams({
      total_min: selectedPriceRange[0],
      total_max: selectedPriceRange[1],
      client_ids: selectedCompany,
      is_posted: selectedStatus,
      page: 1,
    });
  };

  const { onKeyPressHandler } = createKeyPressHandler(
    onFilterRecruitments,
    "Enter"
  );

  const onAddPriceRange = () => {
    setQueryParams({
      total_min: priceRangeInput[0],
      total_max: priceRangeInput[1],
    });
    setSelectedPriceRange([...priceRangeInput]);
    setModalPriceRange(false);
  };

  // 4.2. Delete Invoice
  const handleDeleteInvoice = (id) => {
    if (!isAllowedToDeleteInvoice) {
      permissionWarningNotification("Menghapus", "Draft Invoice");
      return;
    }

    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteContractInvoice?id=${id}`,
      {
        method: `DELETE`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setRefresh((prev) => prev + 1);
          setModalDelete(false);

          notification.success({
            message: response.message,
            duration: 3,
          });
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus draft invoice. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingDelete(false));
  };

  // 4.3. [PDF] Get Invoice Data
  const handleGetInvoiceData = (invoiceId) => {
    if (!isAllowedToGetInvoice) {
      permissionWarningNotification("Mendapatkan", "Data Contract Invoice");
      setLoadingContractInvoice(false);
      return;
    }

    if (invoiceId) {
      setLoadingContractInvoice(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getContractInvoice?id=${invoiceId}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          if (res2.success) {
            setDataInvoice(res2.data);
            handleSetInvoiceDetail(res2.data);
          } else {
            notification.error({
              message: `${res2.message}`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
        })
        .finally(() => {
          setLoadingContractInvoice(false);
        });
    }
  };

  // 4.4. [PDF] Set displayed invoice detail
  const handleSetInvoiceDetail = (data) => {
    if (data?.invoice_attribute?.length) {
      const currentInvoiceDetail = [];
      for (let item of data?.invoice_attribute) {
        if (!item?.includes("extras")) {
          let tempValue = data[item];

          if (["initial_date", "start_date", "end_date"].includes(item)) {
            tempValue = momentFormatDate(tempValue);
          }

          if (item == "duration") {
            tempValue = convertDaysToString(tempValue);
          }

          if (item == "requester") {
            tempValue = data?.requester?.name;
          }

          if (item == "client") {
            tempValue = data?.client?.name;
          }

          currentInvoiceDetail.push({
            name: item,
            title: contractInfoString[item],
            value: tempValue,
          });
        } else {
          for (let extra of data?.extras) {
            if (`extras.${extra?.key}` == item) {
              const dataExtra = {
                name: `extras.${extra?.key}`,
                title: extra?.name,
                value: extra?.value,
                type: extra?.type,
              };

              currentInvoiceDetail.push(dataExtra);
            }
          }
        }
      }
      setDataInvoiceDetail(currentInvoiceDetail);
    }
  };

  // 4.5. [PDF] Get client data
  const handleGetClientData = (clientId) => {
    if (!isAllowedToGetCompanyDetail) {
      permissionWarningNotification("Mendapatkan", "Detail Company");
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyDetail?id=${clientId}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataClient(res2?.data);
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      });
  };

  const handleDownloadClick = (event, record) => {
    event.stopPropagation();
    setDataRowClicked({ id: record?.id });

    // get required data used for PDF
    handleGetInvoiceData(record?.id);
    handleGetClientData(record?.contract_template?.client_id);

    setOpenDownloadModal(true);
  };

  // Use for price range filter
  const getPriceRangeLabel = (priceRangeArr) =>
    `Rp ${Number(priceRangeArr[0])?.toLocaleString("id-ID")} - Rp ${Number(
      priceRangeArr[1]
    )?.toLocaleString("id-ID")}`;

  const getPriceRangeValue = (priceRangeArr) =>
    `${priceRangeArr[0]},${priceRangeArr[1]}`;

  // Kontrak Table's columns
  const columnInvoices = [
    {
      title: "No.",
      key: "number",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              {dataRawContracts?.from + index}
            </div>
          ),
        };
      },
    },
    {
      title: "Nomor Invoice",
      key: "invoice_number",
      dataIndex: "invoice_number",
      render: (text, record, index) => {
        return {
          children: <div className="xl:w-40">{text || "-"}</div>,
        };
      },
    },
    {
      title: "Nama Invoice",
      key: "invoice_name",
      dataIndex: "invoice_name",
      render: (text, record, index) => {
        return {
          children: <>{record.invoice_name || "-"}</>,
        };
      },
    },
    {
      title: "PT Klien",
      key: "client_name",
      dataIndex: ["contract_template", "client", "name"],
    },
    {
      title: "Tanggal Terbit",
      key: "invoice_raise_at",
      dataIndex: "invoice_raise_at",
      render: (text, record, index) => {
        return {
          children: <div>{momentFormatDate(text)}</div>,
        };
      },
      sorter: isAllowedToGetInvoices
        ? (a, b) => a?.invoice_raise_at?.localeCompare(b?.invoice_raise_at)
        : false,
    },
    {
      title: "Total Tagihan",
      key: "invoice_total",
      dataIndex: "invoice_total",
      render: (text, record, index) => {
        return {
          children: <>Rp {Number(text)?.toLocaleString("id-ID") || "-"}</>,
        };
      },
    },
    {
      title: "Status",
      key: "is_posted",
      dataIndex: "is_posted",
      render: (text, record, index) => {
        return {
          children: (
            <>
              {record.is_posted ? (
                <div
                  className="rounded-md py-1 px-4 hover:cursor-pointer text-center mig-caption--bold
                   text-primary100 bg-primary100 bg-opacity-10 whitespace-nowrap"
                >
                  Terbit
                </div>
              ) : (
                <div
                  className="rounded-md py-1 px-4 hover:cursor-pointer 
                  text-center mig-caption--bold text-mono30 bg-mono90"
                >
                  Draft
                </div>
              )}
            </>
          ),
        };
      },
    },
    {
      title: "Aksi",
      key: "action_button",
      dataIndex: "action_button",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex flex-col md:flex-row gap-2 items-center">
              {!record?.is_posted && (
                <Button
                  type={"primary"}
                  disabled={!isAllowedToUpdateInvoice}
                  onClick={(event) => {
                    event.stopPropagation();
                    rt.push(`invoice/${record.id}`);
                  }}
                  icon={<EditSquareIconSvg size={20} color={"#FFFFFF"} />}
                  className="invoiceButton bg-mono50 border-transparent hover:bg-mono80 
                    hover:border-transparent focus:bg-mono50 focus:border-mono50"
                />
              )}

              <Button
                type={"primary"}
                disabled={
                  !record.id ||
                  !isAllowedToGetInvoice ||
                  !isAllowedToGetCompanyDetail
                }
                onClick={(event) => handleDownloadClick(event, record)}
                icon={<DownloadIconSvg size={20} color={"#FFFFFF"} />}
                className="bg-secondary100 border-secondary100 hover:bg-secondary 
                      hover:border-secondary focus:bg-secondary100 focus:border-secondary100"
              />

              {!record?.is_posted && (
                <Button
                  type={"primary"}
                  disabled={!isAllowedToDeleteInvoice}
                  onClick={(event) => {
                    event.stopPropagation();
                    setDataRowClicked({
                      id: record?.id,
                      invoice_number: record?.invoice_number,
                    });
                    setModalDelete(true);
                  }}
                  icon={<TrashIconSvg size={20} color={"#FFFFFF"} />}
                  className="bg-danger border-danger hover:bg-danger hover:opacity-75
                  hover:border-danger focus:bg-danger focus:border-danger"
                />
              )}
            </div>
          ),
        };
      },
    },
  ];

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="grid grid-cols-1 gap-6" id="mainWrapper">
        <div className="">
          {/* Table Kontrak */}
          <div className="flex flex-col gap-6 shadow-md rounded-md bg-white p-5 mb-6">
            <div className="flex gap-4 items-center">
              <h4 className="mig-heading--4">Daftar Invoice</h4>
              <p className="mig-caption--medium text-mono50">Bulan</p>
              <DatePicker
                className="themedDatePicker"
                value={selectedMonthYear}
                format={"MMMM YYYY"}
                picker="month"
                locale={locale}
                onChange={(date) => {
                  if (date) {
                    setQueryParams({
                      month: date.format("M"),
                      year: date.format("YYYY"),
                      page: 1,
                    });
                    setSelectedMonthYear(date);
                  } else {
                    setQueryParams({
                      month: moment().format("M"),
                      year: moment().format("YYYY"),
                      page: 1,
                    });
                    setSelectedMonthYear(moment());
                  }
                }}
              />
            </div>
            <div className="flex flex-col gap-4">
              <div
                className="flex flex-col gap-4 lg:flex-row lg:justify-between 
                w-full lg:items-center"
              >
                {/* Start: Search criteria */}
                {/* Search by keyword (kata kunci) */}
                <div className="w-full lg:w-3/12">
                  <Input
                    defaultValue={searchingFilterInvoices}
                    style={{ width: `100%` }}
                    placeholder="Cari..."
                    allowClear
                    onChange={(e) => {
                      setTimeout(() => {
                        setQueryParams({ page: 1 });
                        setSearchingFilterInvoices(e.target.value);
                      }, 1000);
                    }}
                    onKeyPress={onKeyPressHandler}
                    disabled={!isAllowedToGetInvoices}
                  />
                </div>

                {/* Filter by status (dropdown) */}
                <div className="w-full lg:w-2/12">
                  <Select
                    defaultValue={queryParams.is_posted}
                    allowClear
                    name={`is_posted`}
                    placeholder="Status"
                    style={{ width: `100%` }}
                    className="themedSelector"
                    onChange={(value) => {
                      setQueryParams({ is_posted: value, page: 1 });
                      setSelectedStatus(value);
                    }}
                    optionLabelProp="children"
                  >
                    {dataStatusList?.map((status) => (
                      <Select.Option key={status.id} value={status.id}>
                        <div className="flex items-center">
                          <div
                            className="rounded-full w-4 h-4 p-2 mr-2"
                            style={{ backgroundColor: `${status.color}` }}
                          />
                          <p className="truncate">{status.name}</p>
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </div>

                {/* Filter by company client */}
                <div className="w-full lg:w-2/12">
                  <Select
                    defaultValue={queryParams.client_ids}
                    allowClear
                    name={`client`}
                    disabled={!isAllowedToGetCompanyClients}
                    placeholder="PT Klien"
                    style={{ width: `100%` }}
                    className="themedSelector"
                    onChange={(value) => {
                      setQueryParams({ client_ids: value, page: 1 });
                      setSelectedCompany(value);
                    }}
                  >
                    {dataCompanyList?.map((client) => (
                      <Select.Option key={client.id} value={client.id}>
                        {client.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>

                {/* Filter by total price (dropdown) */}
                <div className="w-full lg:w-4/12">
                  <Select
                    value={
                      getPriceRangeValue(selectedPriceRange) != "0,0"
                        ? getPriceRangeValue(selectedPriceRange)
                        : undefined
                    }
                    allowClear
                    name={`role`}
                    placeholder="Pilih Range Total Tagihan"
                    style={{ width: `100%` }}
                    className="themedSelector"
                    onChange={(value) => {
                      if (value) {
                        const tempPriceRange = value?.split(",");
                        setQueryParams({
                          total_min: tempPriceRange[0],
                          total_max: tempPriceRange[1],
                          page: 1,
                        });
                        setSelectedPriceRange(tempPriceRange);
                      } else {
                        setQueryParams({
                          total_min: undefined,
                          total_max: undefined,
                          page: 1,
                        });
                        setSelectedPriceRange([0, 0]);
                      }
                    }}
                    optionLabelProp="label"
                  >
                    {priceRangeList?.map((item, idx) => (
                      <Select.Option
                        key={idx + 1}
                        label={item.name}
                        value={item.value}
                      >
                        {item.name}
                      </Select.Option>
                    ))}

                    <Select.Option
                      key={5}
                      label={getPriceRangeLabel(priceRangeInput)}
                      value={getPriceRangeValue(priceRangeInput)}
                    >
                      {/* <div onClick={() => setModalPriceRange(true)}> */}
                      {priceRangeInput[0] || priceRangeInput[1] ? (
                        <div className="flex items-center justify-between">
                          <p>{getPriceRangeLabel(priceRangeInput)}</p>
                          <p
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalPriceRange(true);
                            }}
                            className="mig-caption--bold text-primary100 bg-backdrop 
                            rounded-xl px-2 hover:opacity-75"
                          >
                            Ubah
                          </p>
                        </div>
                      ) : (
                        <p
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalPriceRange(true);
                          }}
                          className="mig-caption--bold text-primary100"
                        >
                          Kustom Nominal
                        </p>
                      )}
                      {/* </div> */}
                    </Select.Option>
                  </Select>
                </div>

                {/* End: Search criteria */}

                <div className="flex justify-end">
                  <ButtonSys
                    type={`primary`}
                    onClick={onFilterRecruitments}
                    disabled={!isAllowedToGetInvoices}
                  >
                    <div className="flex flex-row space-x-2.5 w-full items-center">
                      <SearchIconSvg size={15} color={`#ffffff`} />
                      <p>Cari</p>
                    </div>
                  </ButtonSys>
                </div>
              </div>

              <p className="mig-caption text-mono30">
                Menampilkan invoice bulan{" "}
                <strong>
                  {momentFormatDate(selectedMonthYear, "-", "MMMM YYYY")}
                  {/* {momentFormatDate(new Date(), "-", "MMMM YYYY")} */}
                </strong>
              </p>
            </div>

            <div>
              <TableCustomInvoiceList
                rt={rt}
                dataSource={dataRawContracts?.data}
                columns={columnInvoices}
                loading={loadingDataRawContracts}
                total={dataRawContracts?.total}
                queryParams={queryParams}
                setQueryParams={setQueryParams}
                isAllowedToGetInvoice={isAllowedToGetInvoice}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Price Range */}
      <AccessControl hasPermission={CONTRACT_INVOICES_GET}>
        <Modal
          title={"Kustom Nominal"}
          visible={modalPriceRange}
          onCancel={() => setModalPriceRange(false)}
          maskClosable={false}
          footer={
            <ButtonSys fullWidth type={"primary"} onClick={onAddPriceRange}>
              <div className="flex gap-2 items-center">
                <PlusIconSvg size={16} color={"#FFFFFF"} />

                <p>Tambah Nominal</p>
              </div>
            </ButtonSys>
          }
          // loading={}
        >
          <div className="space-y-4">
            <p>Masukkan Nominal Kustom</p>
            <div className="flex gap-2 items-center">
              <InputCurrency
                placeholder="Nominal Minimum"
                value={priceRangeInput[0]}
                onChange={(value) => {
                  setPriceRangeInput((prev) => [value, prev[1]]);
                }}
              />
              <p>-</p>
              <InputCurrency
                placeholder="Nominal Maksimum"
                value={priceRangeInput[1]}
                onChange={(value) => {
                  setPriceRangeInput((prev) => [prev[0], value]);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    onAddPriceRange();
                  }
                }}
              />
            </div>
          </div>
        </Modal>
      </AccessControl>

      {/* Modal Delete Invoice */}
      <AccessControl hasPermission={CONTRACT_INVOICE_DELETE}>
        <ModalHapus2
          title={
            <div className="flex gap-2 items-center">
              <AlertCircleIconSvg size={28} color={"#BF4A40"} />
              <h3 className="mig-heading--3 text-danger">
                Konfirmasi Hapus Invoice
              </h3>
            </div>
          }
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={() => handleDeleteInvoice(dataRowClicked?.id)}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"invoice"}
          loading={loadingDelete}
        >
          <p className="mb-4">
            Apakah Anda yakin ingin menghapus invoice dengan nomor invoice{" "}
            <strong>{dataRowClicked?.invoice_number || "- "}?</strong>
          </p>
        </ModalHapus2>
      </AccessControl>

      {/* Modal Download Invoice */}
      <AccessControl hasPermission={CONTRACT_INVOICE_GET}>
        <ModalCore
          title={
            <h3 className="mig-heading--3 text-primary100">Unduh Invoice</h3>
          }
          visible={openDownloadModal}
          onCancel={() => setOpenDownloadModal(false)}
          footer={
            <div className="flex gap-4 items-center justify-end">
              <ButtonSys
                type={"primary"}
                color={"mono100"}
                onClick={() => {
                  setOpenDownloadModal(false);
                }}
              >
                Batalkan
              </ButtonSys>
              <PDFDownloadLink
                document={
                  <InvoicePDFTemplate
                    dataInvoice={dataInvoice}
                    dataInvoiceDetail={dataInvoiceDetail}
                    dataClient={dataClient}
                    initProps={initProps}
                  />
                }
                fileName={`Invoice_${dataInvoice?.invoice_number}.pdf`}
              >
                {({ blob, url, loading, error }) => (
                  <Spin spinning={loading}>
                    <ButtonSys type={"primary"}>
                      <div className={"flex items-center"}>
                        <DownloadIcon2Svg size={16} color={"#fffffff"} />
                        <p className={"ml-2 text-white"}>Unduh Invoice</p>
                      </div>
                    </ButtonSys>
                  </Spin>
                )}
              </PDFDownloadLink>
            </div>
          }
        >
          <Spin spinning={!isOnClient}>
            <p>
              Klik untuk mengunduh invoice dengan nomor&nbsp;
              <strong>{dataInvoice.invoice_number || "-"}</strong>
            </p>
          </Spin>
        </ModalCore>
      </AccessControl>
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
  let initProps = {};
  if (!req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
  if (!cookiesJSON1.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  initProps = cookiesJSON1.token;
  const resourcesGP = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: "GET",
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "contract-invoice",
    },
  };
}

export default ContractInvoiceIndex;
