import {
  AppstoreOutlined,
  CloseOutlined,
  DownOutlined,
  MailOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Dropdown,
  Empty,
  Form,
  Input,
  Menu,
  Select,
  Spin,
  Switch,
  Table,
  notification,
} from "antd";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import QueryString from "qs";
import React from "react";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useQuery } from "react-query";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";

import { AccessControl } from "components/features/AccessControl";
import { AddNewFormButton } from "components/screen/resume";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  COMPANY_CLIENTS_GET,
  CONTRACTS_COUNT_GET,
  CONTRACTS_GET,
  CONTRACT_ADD,
  CONTRACT_GET,
  RECRUITMENT_STATUSES_LIST_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import { CompanyService } from "apis/company";
import { ContractService } from "apis/contract";

import SettingsIcon from "assets/vectors/icon-settings.svg";

import ButtonSys from "../../../components/button";
import { SearchIconSvg } from "../../../components/icon";
import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import { TableCustomContractList } from "../../../components/table/tableCustom";
import { createKeyPressHandler, momentFormatDate } from "../../../lib/helper";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import httpcookie from "cookie";

Chart.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

const ContractIndex = ({ dataProfile, sidemenu, initProps }) => {
  // 1. Init
  /**
   * Dependencies
   */
  const axiosClient = useAxiosClient();
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  const isAllowedToGetContracts = hasPermission(CONTRACTS_GET);
  const isAllowedToGetContract = hasPermission(CONTRACT_GET);
  const isAllowedToAddContract = hasPermission(CONTRACT_ADD);
  const isAllowedToGetContractCount = hasPermission(CONTRACTS_COUNT_GET);

  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);

  const isAllowedToGetContractStatusList = hasPermission(
    RECRUITMENT_STATUSES_LIST_GET
  );

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    duration: withDefault(StringParam, undefined),
    company_id: withDefault(NumberParam, undefined),
    contract_status_id: withDefault(NumberParam, undefined),
  });

  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 1, "Kontrak");

  // 2. Use state
  // 2.1. Table Contract
  // filter search & selected options
  const [searchingFilterContracts, setSearchingFilterContracts] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(undefined);
  const [selectedCompany, setSelectedCompany] = useState(undefined);
  const [selectedStatus, setSelectedStatus] = useState(undefined);

  const [loadingAdd, setLoadingAdd] = useState(false);
  // table data
  // const [dataRawContracts, setDataRawContracts] = useState({
  //   current_page: "",
  //   data: [],
  //   first_page_url: "",
  //   from: null,
  //   last_page: null,
  //   last_page_url: "",
  //   next_page_url: "",
  //   path: "",
  //   per_page: null,
  //   prev_page_url: null,
  //   to: null,
  //   total: null,
  // });

  const [refresh, setRefresh] = useState(-1);
  const [dataRowClicked, setDataRowClicked] = useState({});
  const tempIdClicked = useRef(-1);
  const [triggerRowClicked, setTriggerRowClicked] = useState(-1);

  // 3. UseEffect & UseQuery
  // 3.1. Get Contract Count
  const { data: dataCount, isLoading: loadingDataCount } = useQuery(
    [CONTRACTS_COUNT_GET],
    () =>
      ContractService.getCountContract(initProps, isAllowedToGetContractCount),
    {
      enabled: isAllowedToGetContractCount,
      refetchOnMount: false,
      select: (response) => response.data,
    }
  );

  // 3.2. Get Company List
  const { data: dataCompanyList, isLoading: loadingCompanyList } = useQuery(
    [COMPANY_CLIENTS_GET],
    () => CompanyService.getCompanyClientList(axiosClient, true),
    {
      enabled: isAllowedToGetCompanyClients,
      refetchOnMount: false,
      select: (response) => response.data.data,
    }
  );

  // 3.3. Get Contracts
  const { data: dataRawContracts, isLoading: loadingDataRawContracts } =
    useQuery(
      [CONTRACTS_GET, queryParams],
      () =>
        ContractService.getContracts(
          initProps,
          isAllowedToGetContracts,
          queryParams,
          searchingFilterContracts
        ),
      {
        enabled: isAllowedToGetContracts,
        refetchOnMount: false,
        select: (response) => response.data,
      }
    );

  console.log({ dataRawContracts });

  // 3.5. Get Status List
  const { data: dataStatusList, isLoading: loadingStatusList } = useQuery(
    [RECRUITMENT_STATUSES_LIST_GET],
    () =>
      ContractService.getStatusList(
        initProps,
        isAllowedToGetContractStatusList
      ),
    {
      enabled: isAllowedToGetContractStatusList,
      refetchOnMount: false,
      select: (response) => response.data,
    }
  );

  // 4. Event
  const onAddContract = useCallback(() => {
    handleAddContract();
  }, []);

  // 4.1. Filter Table
  const onFilterRecruitments = () => {
    setQueryParams({
      duration: selectedDuration,
      company_id: selectedCompany,
      contract_status_id: selectedStatus,
    });
  };

  const { onKeyPressHandler } = createKeyPressHandler(
    onFilterRecruitments,
    "Enter"
  );

  // 4.2. Create Recruitments (from excel import)
  const handleAddContract = () => {
    if (!isAllowedToAddContract) {
      permissionWarningNotification("Menambah", "Kontrak");
      return;
    }
    setLoadingAdd(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addContract`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          setTimeout(() => {
            rt.push(
              `/admin/contracts/create?id=${response2.data?.id}&prevpath=add`
            );
          }, 500);
        } else {
          notification.error({
            message: `Gagal menambahkan kontrak. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan kontrak. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingAdd(false));
  };

  // Kontrak Table's columns
  const columnContracts = [
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
      title: "Nomor Kontrak",
      key: "contract_number",
      dataIndex: "contract_number",
      render: (text, record, index) => {
        return {
          children: <div className="xl:w-40">{text || "-"}</div>,
        };
      },
      sorter: isAllowedToGetContracts
        ? (a, b) =>
            a.contract_number?.toLowerCase() > b.contract_number?.toLowerCase()
        : false,
    },
    {
      title: "Judul Kontrak",
      key: "title",
      dataIndex: "title",
      render: (text, record, index) => {
        return {
          children: <>{record.title || "-"}</>,
        };
      },
      sorter: isAllowedToGetContracts
        ? (a, b) => a.title?.toLowerCase().localeCompare(b.title?.toLowerCase())
        : false,
    },
    {
      title: "Nama Klien",
      key: "client_name",
      dataIndex: "client_name",
      render: (text, record, index) => {
        return {
          children: <div>{record.client_name || "_"}</div>,
        };
      },
    },
    {
      title: "Tanggal Berlaku",
      key: "initial_date",
      dataIndex: "initial_date",
      render: (text, record, index) => {
        return {
          children: <div>{momentFormatDate(text)}</div>,
        };
      },
    },
    {
      title: "Sisa Durasi",
      key: "duration_left",
      dataIndex: "duration_left",
      render: (text, record, index) => {
        return {
          children: <>{record.role?.name}</>,
        };
      },
      sorter: isAllowedToGetContracts
        ? (a, b) =>
            a.role?.name.toLowerCase().localeCompare(b.role?.name.toLowerCase())
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
              <div
                className="rounded-md py-1 hover:cursor-pointer text-center"
                style={{
                  width: `100%`,
                  backgroundColor: `${record.status?.color}10`,
                  color: `${record.status?.color}`,
                }}
              >
                {record?.status?.name}
              </div>
            </>
          ),
        };
      },
      sorter: isAllowedToGetContracts
        ? (a, b) =>
            a.status?.name
              .toLowerCase()
              .localeCompare(b.status?.name.toLowerCase())
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
      <div className="flex flex-col gap-6" id="mainWrapper">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:px-5 gap-6">
          <div
            className="flex flex-row items-center w-full 
						justify-between px-6 py-2 shadow-md rounded-md bg-white
						divide-x divide-gray-300"
          >
            <div className="flex flex-row items-center justify-between w-full">
              <h4 className="font-semibold lg:mig-heading--4">Kontrak Aktif</h4>
              <Spin spinning={loadingDataCount}>
                <p className="text-4xl lg:text-5xl text-primary100">
                  {dataCount?.recruitment_roles_count}
                </p>
              </Spin>
            </div>
          </div>
          <AddNewFormButton
            title="Buat Kontrak"
            subtitle="Jumat, 07 Januari 2021"
            onButtonClicked={onAddContract}
            disabled={!isAllowedToAddContract || loadingAdd}
          />
        </div>
        <div className="md:px-5">
          {/* Table Kontrak */}
          <div className="flex flex-col shadow-md rounded-md bg-white p-5 mb-6">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between w-full md:items-center mb-4">
              <h4 className="mig-heading--4 w-full md:w-2/12">Kontrak</h4>
              {/* Start: Search criteria */}

              {/* Filter by duration (dropdown) */}
              <div className="w-full md:w-2/12">
                <Select
                  defaultValue={queryParams.duration}
                  allowClear
                  name={`role`}
                  disabled={!isAllowedToGetCompanyClients}
                  placeholder="Rentang Durasi"
                  style={{ width: `100%` }}
                  onChange={(value) => {
                    setQueryParams({ duration: value });
                    setSelectedDuration(value);
                  }}
                >
                  {dataCompanyList?.map((role) => (
                    <Select.Option key={role.id} value={role.id}>
                      {role.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              {/* Filter by company client */}
              <div className="w-full md:w-2/12">
                <Select
                  defaultValue={queryParams.company_id}
                  allowClear
                  name={`company`}
                  disabled={!isAllowedToGetCompanyClients}
                  placeholder="Semua Klien"
                  style={{ width: `100%` }}
                  onChange={(value) => {
                    setQueryParams({ company_id: value });
                    setSelectedCompany(value);
                  }}
                >
                  {dataCompanyList?.map((company) => (
                    <Select.Option key={company.id} value={company.id}>
                      {company.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              {/* Search by status (dropdown) */}
              <div className="w-full md:w-2/12">
                <Select
                  defaultValue={queryParams.contract_status_id}
                  allowClear
                  name={`status`}
                  disabled={!isAllowedToGetContractStatusList}
                  placeholder="Semua Status"
                  style={{ width: `100%` }}
                  onChange={(value) => {
                    setQueryParams({ contract_status_id: value });
                    setSelectedStatus(value);
                  }}
                >
                  {dataStatusList?.map((status) => (
                    <Select.Option key={status.id} value={status.id}>
                      <div className="flex items-center">
                        <div
                          className="rounded-full w-4 h-4 mr-2"
                          style={{ backgroundColor: `${status.color}` }}
                        />
                        <p className="truncate">{status.name}</p>
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              </div>

              {/* Search by keyword (kata kunci) */}
              <div className="w-full md:w-4/12">
                <Input
                  defaultValue={searchingFilterContracts}
                  style={{ width: `100%` }}
                  placeholder="Cari.."
                  allowClear
                  onChange={(e) => {
                    setSearchingFilterContracts(e.target.value);
                  }}
                  onKeyPress={onKeyPressHandler}
                  disabled={!isAllowedToGetContracts}
                />
              </div>

              {/* End: Search criteria */}

              <div className="flex justify-end">
                <ButtonSys
                  type={`primary`}
                  onClick={onFilterRecruitments}
                  disabled={!isAllowedToGetContracts}
                >
                  <div className="flex flex-row space-x-2.5 w-full items-center">
                    <SearchIconSvg size={15} color={`#ffffff`} />
                    <p>Cari</p>
                  </div>
                </ButtonSys>
              </div>
            </div>

            <div>
              <TableCustomContractList
                rt={rt}
                dataSource={dataRawContracts?.data}
                columns={columnContracts}
                loading={loadingDataRawContracts}
                total={dataRawContracts?.total}
                queryParams={queryParams}
                setQueryParams={setQueryParams}
              />
            </div>
          </div>
        </div>
      </div>
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
      sidemenu: "contract-list",
    },
  };
}

export default ContractIndex;
