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
  RECRUITMENTS_ADD,
  RECRUITMENTS_DELETE,
  RECRUITMENTS_GET,
  RECRUITMENTS_UPDATE_STAGE,
  RECRUITMENTS_UPDATE_STATUS,
  RECRUITMENT_ACCOUNT_GENERATE,
  RECRUITMENT_ACCOUNT_TOKEN_GET,
  RECRUITMENT_ADD,
  RECRUITMENT_COUNT_GET,
  RECRUITMENT_EMAIL_SEND,
  RECRUITMENT_EMAIL_TEMPLATES_LIST_GET,
  RECRUITMENT_EXCEL_TEMPLATE_GET,
  RECRUITMENT_GET,
  RECRUITMENT_JALUR_DAFTARS_LIST_GET,
  RECRUITMENT_PREVIEW_GET,
  RECRUITMENT_ROLES_LIST_GET,
  RECRUITMENT_STAGES_LIST_GET,
  RECRUITMENT_STATUSES_LIST_GET,
  RECRUITMENT_UPDATE_STAGE,
  RECRUITMENT_UPDATE_STATUS,
  SIDEBAR_RECRUITMENT_SETUP,
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
import { createKeyPressHandler } from "../../../lib/helper";
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

  const isAllowedToSetupRecruitment = hasPermission(SIDEBAR_RECRUITMENT_SETUP);
  const isAllowedToGetContracts = hasPermission(RECRUITMENTS_GET);
  const isAllowedToGetRecruitment = hasPermission(RECRUITMENT_GET);
  const isAllowedToAddRecruitment = hasPermission(RECRUITMENT_ADD);
  const isAllowedToAddRecruitments = hasPermission(RECRUITMENTS_ADD);
  const isAllowedToDeleteRecruitments = hasPermission(RECRUITMENTS_DELETE);
  const isAllowedToGetContractCount = hasPermission(RECRUITMENT_COUNT_GET);

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
    [RECRUITMENT_COUNT_GET],
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
      [RECRUITMENTS_GET, queryParams],
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
  const onManageRecruitmentButtonClicked = useCallback(() => {
    rt.push("/admin/recruitment/role");
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
  const handleCreateRecruitments = (data) => {
    if (!isAllowedToAddRecruitments) {
      permissionWarningNotification("Menambah", "Rekrutmen Kandidat");
      return;
    }
    setLoadingCreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addRecruitments`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          notification.success({
            message: `Kandidat berhasil ditambahkan.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal menambahkan kandidat. ${response2.message}`,
            duration: 3,
          });
        }
        setLoadingCreate(false);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan kandidat. ${err.response}`,
          duration: 3,
        });
        setLoadingCreate(false);
      });
  };

  // "Semua Kandidat" Table's columns
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
      title: "Nama Kontrak",
      key: "name",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: (
            <div className="xl:w-40">{record.name ? record.name : ""}</div>
          ),
        };
      },
      sorter: isAllowedToGetContracts
        ? (a, b) => a.name?.toLowerCase() > b.name?.toLowerCase()
        : false,
    },
    {
      title: "Judul Kontrak",
      key: "role",
      dataIndex: "role",
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
      title: "Nama Klien",
      key: "stage",
      dataIndex: "stage",
      render: (text, record, index) => {
        return {
          children: <div>PT Bukopin</div>,
        };
      },
    },
    {
      title: "Tanggal Berlaku",
      key: "stage",
      dataIndex: "stage",
      render: (text, record, index) => {
        return {
          children: <div>26 September 2021</div>,
        };
      },
      sorter: isAllowedToGetContracts
        ? (a, b) =>
            a.stage?.name
              .toLowerCase()
              .localeCompare(b.stage?.name.toLowerCase())
        : false,
    },
    {
      title: "Sisa Durasi",
      key: "role",
      dataIndex: "role",
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

  // if (isAccessControlPending) {
  //   return null;
  // }

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
            // onButtonClicked={onManageRecruitmentButtonClicked}
            disabled={!isAllowedToSetupRecruitment}
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
