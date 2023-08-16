import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
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
import { useCallback } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import { AccessControl } from "components/features/AccessControl";
import {
  DownloadIconSvg,
  EditSquareIconSvg,
  FileDownloadIconSvg,
  SearchIconSvg,
} from "components/icon";
import Layout from "components/layout-dashboard";
import st from "components/layout-dashboard.module.css";
import { ModalHapus2 } from "components/modal/modalCustom";
import {
  TableCustomContractList,
  TableCustomInvoiceList,
} from "components/table/tableCustom";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  COMPANY_CLIENTS_GET,
  CONTRACTS_GET,
  CONTRACT_DELETE,
  CONTRACT_INVOICES_GET,
  CONTRACT_INVOICE_ADD,
  CONTRACT_INVOICE_DELETE,
  CONTRACT_INVOICE_GET,
  CONTRACT_INVOICE_UPDATE,
  RECRUITMENT_STATUSES_LIST_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";
import {
  convertDaysToString,
  createKeyPressHandler,
  momentFormatDate,
} from "lib/helper";

import { CompanyService } from "apis/company";
import { ContractService } from "apis/contract";

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
  const isAllowedToAddInvoice = hasPermission(CONTRACT_INVOICE_ADD);

  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);

  const isAllowedToGetInvoicestatusList = hasPermission(
    RECRUITMENT_STATUSES_LIST_GET
  );

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    duration: withDefault(NumberParam, undefined),
    client_ids: withDefault(NumberParam, undefined),
    status_types: withDefault(StringParam, undefined),
  });

  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 2, "Kontrak", "Invoice");

  const durationRangeList = [
    { name: "1 Bulan", value: 30 },
    { name: "3 Bulan", value: 90 },
    { name: "1 Tahun", value: 365 },
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
  const [searchingFilterInvoices, setSearchingFilterContracts] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(undefined);
  const [selectedCompany, setSelectedCompany] = useState(undefined);
  const [selectedStatus, setSelectedStatus] = useState(undefined);

  // Modal Duration Range Filter
  const [modalDuration, setModalDuration] = useState(false);
  const [durationInput, setDurationInput] = useState(0);

  const [refresh, setRefresh] = useState(-1);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [dataRowClicked, setDataRowClicked] = useState({});

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

  // 4. Event
  // 4.1. Filter Table
  const onFilterRecruitments = () => {
    setQueryParams({
      duration: selectedDuration,
      client_ids: selectedCompany,
      status_types: selectedStatus,
    });
  };

  const { onKeyPressHandler } = createKeyPressHandler(
    onFilterRecruitments,
    "Enter"
  );

  // 4.3. Delete Invoice
  const handleDeleteInvoice = (id) => {
    if (!isAllowedToDeleteInvoice) {
      permissionWarningNotification("Menghapus", "Kontrak");
      return;
    }

    setLoadingDelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteContract?id=${id}`, {
      method: `DELETE`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
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
          message: `Gagal menghapus proyek. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingDelete(false));
  };

  // Kontrak Table's columns
  const columnInvoices = [
    {
      title: "No",
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
      sorter: isAllowedToGetInvoices
        ? (a, b) =>
            a.invoice_number?.toLowerCase() > b.invoice_number?.toLowerCase()
        : false,
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
      sorter: isAllowedToGetInvoices
        ? (a, b) =>
            a.invoice_name
              ?.toLowerCase()
              .localeCompare(b.invoice_name?.toLowerCase())
        : false,
    },
    {
      title: "Nama Klien",
      key: "client_name",
      dataIndex: ["client", "name"],
      render: (text, record, index) => {
        return {
          children: <div>{text || "-"}</div>,
        };
      },
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
          children: <>Rp{Number(text)?.toLocaleString("id-ID") || "-"}</>,
        };
      },
      sorter: isAllowedToGetInvoices
        ? (a, b) => a?.invoice_total - b?.invoice_total
        : false,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
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
      sorter: isAllowedToGetInvoices
        ? (a, b) => {
            const dataStatusListIds = dataStatusList?.map(
              (status) => status?.id
            );
            const indexA = dataStatusListIds?.indexOf(a?.status);
            const indexB = dataStatusListIds?.indexOf(b?.status);
            return indexA - indexB;
          }
        : false,
    },
    {
      title: "Aksi",
      key: "action_button",
      dataIndex: "action_button",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex flex-col md:flex-row gap-2 items-center">
              {!record?.is_posted ? (
                <Button
                  type={"primary"}
                  disabled={true}
                  onClick={(event) => {
                    event.stopPropagation();
                    // rt.push(`/admin/employees/${record.id}?tab=2`);
                  }}
                  icon={<EditSquareIconSvg size={20} color={"#FFFFFF"} />}
                  className="invoiceButton bg-mono50 border-transparent hover:bg-mono80 
                  hover:border-transparent focus:bg-mono80 focus:border-mono80"
                />
              ) : (
                <Tooltip
                  className="border rounded-md"
                  placement="bottomRight"
                  color="#FFFFFF"
                  title={
                    <div className="flex gap-2 text-mono30 p-2">
                      <div>
                        <EditSquareIconSvg size={20} color={"#4D4D4D"} />
                      </div>
                      <div>
                        <p className="mig-caption--bold">Sunting Invoice</p>
                        <p className="mig-caption">
                          Sunting invoice untuk merubah data.
                        </p>
                      </div>
                    </div>
                  }
                >
                  <Button
                    type={"primary"}
                    disabled={!isAllowedToUpdateInvoice}
                    onClick={(event) => {
                      event.stopPropagation();
                      rt.push(`invoice/${record.id}`);
                    }}
                    icon={<EditSquareIconSvg size={20} color={"#FFFFFF"} />}
                    className="invoiceButton bg-mono50 border-transparent hover:bg-mono80 
                    hover:border-transparent focus:bg-mono80 focus:border-mono80"
                  />
                </Tooltip>
              )}

              <Tooltip
                className="border rounded-md"
                placement="bottomRight"
                color="#FFFFFF"
                title={
                  <div className="flex gap-2 p-2">
                    <div>
                      <FileDownloadIconSvg size={20} color={"#35763B"} />
                    </div>
                    <div>
                      <p className="mig-caption--bold text-primary100">
                        Unduh File Invoice
                      </p>
                      <p className="text-mono30 mig-caption">
                        Unduh invoice dengan format pdf/excel.
                      </p>
                    </div>
                  </div>
                }
              >
                <Button
                  type={"primary"}
                  // disabled={!isAllowedToUpdateEmployeeContract}
                  onClick={(event) => {
                    event.stopPropagation();
                    // rt.push(`/admin/employees/${record.id}?tab=2`);
                  }}
                  icon={<DownloadIconSvg size={20} color={"#FFFFFF"} />}
                  className="bg-primary100 border-primary100 hover:bg-primary75 
                hover:border-primary75 focus:bg-primary75 focus:border-primary75"
                />
              </Tooltip>
            </div>
          ),
        };
      },
      sorter: isAllowedToGetInvoices
        ? (a, b) =>
            a.role?.name.toLowerCase().localeCompare(b.role?.name.toLowerCase())
        : false,
    },
  ];

  if (isAccessControlPending) {
    return null;
  }

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
        <div className="md:px-5">
          {/* Table Kontrak */}
          <div className="flex flex-col gap-6 shadow-md rounded-md bg-white p-5 mb-6">
            <div className="flex gap-4 items-center">
              <h4 className="mig-heading--4">Daftar Invoice</h4>
              <p className="mig-caption--medium text-mono50">Bulan</p>

              <DatePicker
                className="themedDatePicker"
                defaultValue={moment()}
                format={"MMMM YYYY"}
                picker="month"
                locale={locale}
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 md:flex-row md:justify-between w-full md:items-center ">
                {/* Start: Search criteria */}
                {/* Search by keyword (kata kunci) */}
                <div className="w-full md:w-4/12">
                  <Input
                    defaultValue={searchingFilterInvoices}
                    style={{ width: `100%` }}
                    placeholder="Cari..."
                    allowClear
                    onChange={(e) => {
                      setTimeout(
                        () => setSearchingFilterContracts(e.target.value),
                        1000
                      );
                    }}
                    onKeyPress={onKeyPressHandler}
                    disabled={!isAllowedToGetInvoices}
                  />
                </div>

                {/* Filter by status (dropdown) */}
                <div className="w-full md:w-2/12">
                  <Select
                    defaultValue={queryParams.status_types}
                    allowClear
                    name={`status`}
                    disabled={!isAllowedToGetInvoicestatusList}
                    placeholder="Semua Status"
                    style={{ width: `100%` }}
                    className="themedSelector"
                    onChange={(value) => {
                      setQueryParams({ status_types: value });
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
                <div className="w-full md:w-2/12">
                  <Select
                    defaultValue={queryParams.client_ids}
                    allowClear
                    name={`client`}
                    disabled={!isAllowedToGetCompanyClients}
                    placeholder="Semua Klien"
                    style={{ width: `100%` }}
                    className="themedSelector"
                    onChange={(value) => {
                      setQueryParams({ client_ids: value });
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
                <div className="w-full md:w-2/12">
                  <Select
                    defaultValue={queryParams.duration}
                    allowClear
                    name={`role`}
                    disabled={!isAllowedToGetCompanyClients}
                    placeholder="Harga Total"
                    style={{ width: `100%` }}
                    className="themedSelector"
                    onChange={(value) => {
                      setQueryParams({ duration: value });
                      setSelectedDuration(value);
                    }}
                    dropdownRender={(options) => (
                      <>
                        {options}
                        <p
                          onClick={() => setModalDuration(true)}
                          className={`flex justify-center py-1 px-2 text-center 
                        rounded hover:bg-primary100 hover:text-white hover:cursor-pointer`}
                        >
                          Custom Range
                        </p>
                      </>
                    )}
                  >
                    {durationRangeList?.map((item, idx) => (
                      <Select.Option key={idx + 1} value={item.value}>
                        <p
                          className={`px-2 text-center rounded  
                        ${
                          selectedDuration === item.value &&
                          "bg-primary100 text-white"
                        }`}
                        >
                          {item.name}
                        </p>
                      </Select.Option>
                    ))}
                    {durationInput && (
                      <Select.Option key={5} value={durationInput * 30}>
                        <p
                          className={`px-2 text-center rounded
                      ${
                        selectedDuration === durationInput * 30 &&
                        "bg-primary100 text-white"
                      }`}
                        >
                          {durationInput} Bulan (Custom)
                        </p>
                      </Select.Option>
                    )}
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
                  {momentFormatDate(new Date(), "-", "MMMM YYYY")}
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
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Duration Range */}
      <AccessControl hasPermission={CONTRACTS_GET}>
        <Modal
          title={"Masukkan Jumlah Bulan"}
          visible={modalDuration}
          onCancel={() => setModalDuration(false)}
          maskClosable={false}
          footer={
            <div className="flex space-x-2 justify-end items-center">
              <button
                onClick={() => setModalDuration(false)}
                className="bg-transparent text-mono50 py-2 px-6 hover:text-mono80"
              >
                Batal
              </button>
              <ButtonSys
                type={"primary"}
                onClick={() => setModalDuration(false)}
              >
                <p>Tambah</p>
              </ButtonSys>
            </div>
          }
          // loading={}
        >
          <div className="space-y-2">
            <p>Jumlah Bulan</p>
            <Input
              type="number"
              min={0}
              placeholder="Masukkan jumlah bulan"
              value={durationInput}
              onChange={(e) => setDurationInput(e.target.value)}
            />
          </div>
        </Modal>
      </AccessControl>

      {/* Modal Delete Contract */}
      <AccessControl hasPermission={CONTRACT_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={() => handleDeleteInvoice(dataRowClicked?.id)}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"kontrak"}
          loading={loadingDelete}
        >
          <p className="mb-4">
            Apakah Anda yakin ingin melanjutkan penghapusan kontrak{" "}
            <strong>{dataRowClicked?.contract_number}</strong>?
          </p>
        </ModalHapus2>
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
