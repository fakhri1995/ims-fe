import { UpOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
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
  TreeSelect,
  notification,
} from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";

import { AccessControl } from "components/features/AccessControl";
import { AddNewFormButton } from "components/screen/resume";

import { useAccessControl } from "contexts/access-control";

import {
  COMPANY_LISTS_GET,
  EMPLOYEES_GET,
  EMPLOYEE_ADD,
  EMPLOYEE_DELETE,
  EMPLOYEE_GET,
  EMPLOYEE_UPDATE,
  RECRUITMENT_ROLES_LIST_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import SettingsIcon from "assets/vectors/icon-settings.svg";

import ButtonSys from "../../../components/button";
import ButtonSysColor from "../../../components/buttonColor";
import DrawerCore from "../../../components/drawer/drawerCore";
import DrawerCandidateCreate from "../../../components/drawer/recruitment/drawerCandidateCreate";
import DrawerCandidatePreview from "../../../components/drawer/recruitment/drawerCandidatePreview";
import DrawerCandidateSendEmail from "../../../components/drawer/recruitment/drawerCandidateSendEmail";
import {
  CheckIconSvg,
  CirclePlusIconSvg,
  CopyIconSvg,
  DownIconSvg,
  DownloadIconSvg,
  EditIconSvg,
  FileExportIconSvg,
  FilePlusIconSvg,
  InfoSquareIconSvg,
  LayoutGridSvg,
  MailForwardIconSvg,
  PlusIconSvg,
  SearchIconSvg,
  TrashIconSvg,
  TrendingUpIconSvg,
  UserPlusIconSvg,
  XIconSvg,
} from "../../../components/icon";
import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import ModalCore from "../../../components/modal/modalCore";
import { ModalHapus2, ModalUbah } from "../../../components/modal/modalCustom";
import {
  TableCustomEmployeeList,
  TableCustomRecruitmentCandidate,
} from "../../../components/table/tableCustom";
import { H1 } from "../../../components/typography";
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

const EmployeeListIndex = ({ dataProfile, sidemenu, initProps }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetEmployees = hasPermission(EMPLOYEES_GET);
  const isAllowedToGetEmployee = hasPermission(EMPLOYEE_GET);
  const isAllowedToAddEmployee = hasPermission(EMPLOYEE_ADD);
  const isAllowedToUpdateEmployee = hasPermission(EMPLOYEE_UPDATE);
  const canUpdateEmployee = hasPermission([EMPLOYEE_UPDATE, EMPLOYEE_GET]);

  // TODO: change variable and constant to appropriate feature
  const isAllowedToGetCompanyList = hasPermission(COMPANY_LISTS_GET);

  const isAllowedToGetRoleList = hasPermission(RECRUITMENT_ROLES_LIST_GET);
  const isAllowedToGetRoleTypeList = hasPermission(RECRUITMENT_ROLES_LIST_GET);

  // 1. Init
  const [instanceForm] = Form.useForm();
  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 1, "Daftar Karyawan");

  // 2. Use state
  // 2.1. Charts
  const [loadingChart, setLoadingChart] = useState(false);

  // 2.2. Table Employee List
  // filter data
  const [activeEmployeeSwitch, setActiveEmployeeSwitch] = useState(false);

  const [loadingCompanyList, setLoadingCompanyList] = useState(false);
  const [dataCompanyList, setDataCompanyList] = useState([]);

  const [loadingRoleList, setLoadingRoleList] = useState(false);
  const [dataRoleList, setDataRoleList] = useState([]);

  const [loadingContractStatusList, setLoadingContractStatusList] =
    useState(false);
  const [dataContractStatusList, setDataContractStatusList] = useState([]);

  // filter search & selected options
  const [searchingFilterEmployees, setSearchingFilterEmployees] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState(0);
  const [selectedRoleId, setSelectedRoleId] = useState(0);
  const [selectedContractStatus, setSelectedContractStatus] = useState(0);

  // sorting
  const [sortingEmployees, setSortingEmployees] = useState({
    sort_by: "",
    sort_type: "",
  });

  // table data
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [dataEmployees, setDataEmployees] = useState([]);
  const [dataRawEmployees, setDataRawEmployees] = useState({
    current_page: "",
    data: [],
    first_page_url: "",
    from: null,
    last_page: null,
    last_page_url: "",
    next_page_url: "",
    path: "",
    per_page: null,
    prev_page_url: null,
    to: null,
    total: null,
  });
  const [pageEmployees, setPageEmployees] = useState(1);
  const [rowsEmployees, setRowsEmployees] = useState(10);

  const [refresh, setRefresh] = useState(-1);
  const [dataRowClicked, setDataRowClicked] = useState({});
  const tempIdClicked = useRef(-1);
  const [triggerRowClicked, setTriggerRowClicked] = useState(-1);

  // 3. UseEffect
  // 3.1. Get Employees
  useEffect(() => {
    if (!isAllowedToGetEmployees) {
      permissionWarningNotification("Mendapatkan", "Daftar Employee");
      setLoadingEmployees(false);
      return;
    }

    setLoadingEmployees(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployees?rows=10`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataRawEmployees(res2.data);
          setDataEmployees(res2.data.data);
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
        setLoadingEmployees(false);
      });
  }, [isAllowedToGetEmployees, refresh]);

  // 3.2. Get Company Client List
  useEffect(() => {
    if (!isAllowedToGetCompanyList) {
      permissionWarningNotification("Mendapatkan", "Daftar Company Client");
      setLoadingCompanyList(false);
      return;
    }

    setLoadingCompanyList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyClientList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataCompanyList(res2.data);
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
        setLoadingCompanyList(false);
      });
  }, [isAllowedToGetCompanyList]);

  // 3.3. Get Employee Role List
  useEffect(() => {
    if (!isAllowedToGetRoleList) {
      permissionWarningNotification("Mendapatkan", "Data Employee Role List");
      setLoadingRoleList(false);
      return;
    }

    setLoadingRoleList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRolesList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataRoleList(res2.data);
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
        setLoadingRoleList(false);
      });
  }, [isAllowedToGetRoleList, refresh]);

  // 3.4. Get Contract Status/Role Type List
  useEffect(() => {
    if (!isAllowedToGetRoleTypeList) {
      permissionWarningNotification("Mendapatkan", "Daftar Tipe Role");
      setLoadingContractStatusList(false);
      return;
    }

    setLoadingContractStatusList(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRoleTypesList`,
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
          setDataContractStatusList(res2.data);
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
        setLoadingContractStatusList(false);
      });
  }, [isAllowedToGetRoleTypeList]);

  // 4. Event
  const onAddEmployeeButtonClicked = useCallback(() => {
    rt.push("/admin/employees/create");
  }, []);

  // 4.1. Filter Table
  const onFilterEmployees = () => {
    setLoadingEmployees(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployees?sort_by=${sortingEmployees.sort_by}&sort_type=${sortingEmployees.sort_type}&recruitment_role_id=${selectedRoleId}&recruitment_stage_id=${selectedStage}&recruitment_status_id=${selectedContractStatus}&keyword=${searchingFilterEmployees}&page=${pageEmployees}&rows=${rowsEmployees}`,
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
          setDataRawEmployees(res2.data);
          setDataEmployees(res2.data.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingEmployees(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingEmployees(false);
      });
  };

  const { onKeyPressHandler } = createKeyPressHandler(
    onFilterEmployees,
    "Enter"
  );

  // "Daftar Karyawan" Table's columns
  const columnEmployee = [
    {
      title: "No.",
      key: "number",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{dataRawEmployees?.from + index}</>,
        };
      },
    },
    {
      title: "Nama",
      key: "name",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: <>{record.name ? record.name : ""}</>,
        };
      },
      sorter: isAllowedToGetEmployees
        ? (a, b) => a.name?.toLowerCase() > b.name?.toLowerCase()
        : false,
    },
    {
      title: "NIP",
      key: "nip",
      dataIndex: "nip",
      render: (text, record, index) => {
        return {
          children: <>{record.nip ? record.nip : ""}</>,
        };
      },
    },
    {
      title: "Penempatan",
      key: "placement",
      dataIndex: "placement",
      render: (text, record, index) => {
        return {
          children: <>{record.placement ? record.placement : ""}</>,
        };
      },
    },
    {
      title: "Status Kontrak",
      key: "status",
      dataIndex: "status",
      render: (text, record, index) => {
        return {
          children: <>{record.status ? record.status : ""}</>,
        };
      },
    },
    {
      title: "Posisi",
      key: "role",
      dataIndex: "role",
      render: (text, record, index) => {
        return {
          children: <>{record.role?.name}</>,
        };
      },
    },
    {
      title: "No. Telepon",
      key: "phone",
      dataIndex: "phone",
      render: (text, record, index) => {
        return {
          children: <>{record.phone ? record.phone : ""}</>,
        };
      },
    },
    {
      title: "Sisa Hari Kerja",
      key: "days_left",
      dataIndex: "days_left",
      render: (text, record, index) => {
        return {
          children: (
            <>
              {record.days_left <= 30 ? (
                <p className="text-warning">{record.days_left} hari</p>
              ) : (
                <p>{record.days_left} hari</p>
              )}
            </>
          ),
        };
      },
      sorter: isAllowedToGetEmployees
        ? (a, b) => a.days_left > b.days_left
        : false,
    },
    {
      title: "Aksi",
      key: "button_action",
      render: (text, record) => {
        return {
          children: (
            <>
              {record.is_draft ? (
                <ButtonSysColor
                  type={"default"}
                  // disabled={!isAllowedToEditDraft}
                  onClick={(event) => {
                    event.stopPropagation();
                    // rt.push(`/admin/recruitment/${record.id}`);
                  }}
                  color={"border-notice text-notice"}
                >
                  <EditIconSvg size={12} color={`#DDB44A`} />
                  <p>Edit Draft</p>
                </ButtonSysColor>
              ) : (
                <ButtonSys
                  type={isAllowedToGetEmployee ? "default" : "primary"}
                  disabled={!isAllowedToGetEmployee}
                  onClick={(event) => {
                    event.stopPropagation();
                    // rt.push(`/admin/recruitment/${record.id}`);
                  }}
                >
                  <EditIconSvg size={12} color={`#35763B`} />
                  <p>Edit Kontrak</p>
                </ButtonSys>
              )}
            </>
          ),
        };
      },
    },
  ];

  // DEBUG

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="flex flex-col" id="mainWrapper">
        <Collapse
          className="col-span-3 mb-5"
          bordered={false}
          ghost={true}
          expandIconPosition={"right"}
          expandIcon={({ isActive }) => (
            <UpOutlined rotate={isActive ? 180 : 0} />
          )}
        >
          <Collapse.Panel
            header={<h4 className="mig-heading--4">Statistik</h4>}
          >
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {/* CHART PENEMPATAN KARYAWAN */}
              {loadingChart ? (
                <>
                  <Spin />
                </>
              ) : (
                <div className="flex flex-col shadow-md rounded-md bg-white p-5 ">
                  <div className="flex items-center justify-between mb-4">
                    <H1>Penempatan Karyawan</H1>
                  </div>
                  <div className=" w-full flex justify-center">
                    {/* <Doughnut
                      data={{
                        labels: topCompanyCount.map((doc) => doc.name),
                        datasets: [
                          {
                            data: topCompanyCount.map((doc) => doc.resumes_count),
                            backgroundColor: topCompanyCount.map(
                              (doc, idx) =>
                                dataColorBar[idx + (1 % dataColorBar.length) - 1]
                            ),
                            borderColor: topCompanyCount.map(
                              (doc, idx) =>
                                dataColorBar[idx + (1 % dataColorBar.length) - 1]
                            ),
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        title: {
                          display: false,
                        },
                        legend: {
                          display: false,
                        },
                        maintainAspectRatio: false,
                        cutout: 55,
                        spacing: 5,
                      }}
                    /> */}
                  </div>

                  {/* <div className="flex flex-col w-full mt-5">
                    {topCompanyCount.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center mb-1"
                      >
                        <div className="flex">
                          <div
                            className=" w-1 mr-2"
                            style={{
                              backgroundColor: `${
                                dataColorBar[idx + (1 % dataColorBar.length) - 1]
                              }`,
                            }}
                          ></div>
                          <Text>{doc.name}</Text>
                        </div>
                        <div className="flex">
                          <H2>{doc.resumes_count}</H2>
                        </div>
                      </div>
                    ))}
                  </div> */}
                </div>
              )}
              {/* CHART POSISI */}
              {loadingChart ? (
                <>
                  <Spin />
                </>
              ) : (
                <div className="flex flex-col shadow-md rounded-md bg-white p-5">
                  <div className="flex items-center justify-between mb-4">
                    <H1>Posisi</H1>
                  </div>
                  <div className=" w-full flex justify-center"></div>
                </div>
              )}
              {/* CHART STATUS KARYAWAN */}
              {loadingChart ? (
                <>
                  <Spin />
                </>
              ) : (
                <div className="flex flex-col shadow-md rounded-md bg-white p-5">
                  <div className="flex items-center justify-between mb-4">
                    <H1>Status Karyawan</H1>
                  </div>
                  <div className=" w-full flex justify-center"></div>
                </div>
              )}
            </div>
          </Collapse.Panel>
        </Collapse>

        {/* Table Karyawan */}
        <div className="col-span-3 flex flex-col shadow-md rounded-md bg-white p-4 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="mig-heading--4 ">Daftar Karyawan</h4>
            <div className="flex flex-row items-center space-x-6">
              <div className="flex flex-row items-center space-x-2 text-primary100">
                <Switch
                  checked={activeEmployeeSwitch}
                  onClick={() => setActiveEmployeeSwitch(!activeEmployeeSwitch)}
                />
                <p>Karyawan Aktif</p>
              </div>

              <Button
                type={"primary"}
                className="btn btn-sm text-white font-semibold px-6 border 
                    bg-primary100 hover:bg-primary75 border-primary100 
                    hover:border-primary75 focus:bg-primary100 focus:border-primary100"
                icon={<UserPlusIconSvg size={16} color="#FFFFFF" />}
                onClick={onAddEmployeeButtonClicked}
                // disabled
              >
                Tambah Karyawan
              </Button>
            </div>
          </div>

          {/* Start: Search criteria */}
          <div className="flex flex-row justify-between w-full items-center mb-4">
            {/* Search by keyword (kata kunci) */}
            <div className="w-4/12">
              <Input
                value={
                  searchingFilterEmployees === ""
                    ? null
                    : searchingFilterEmployees
                }
                style={{ width: `100%` }}
                placeholder="Kata Kunci.."
                allowClear
                onChange={(e) => {
                  if (e.target.value === "") {
                    setSearchingFilterEmployees("");
                  } else {
                    setSearchingFilterEmployees(e.target.value);
                  }
                }}
                onKeyPress={onKeyPressHandler}
                disabled={!isAllowedToGetEmployees}
              />
            </div>

            {/* Filter by company (dropdown) */}
            <div className="w-2/12">
              <Select
                value={selectedCompanyId === 0 ? null : selectedCompanyId}
                allowClear
                name={`role`}
                disabled={!isAllowedToGetRoleList}
                placeholder="Semua Penempatan"
                style={{ width: `100%` }}
                onChange={(value) => {
                  typeof value === "undefined"
                    ? setSelectedCompanyId(0)
                    : setSelectedCompanyId(value);
                }}
              >
                {/* <Select.Option value={0}>Semua Role</Select.Option> */}
                {dataCompanyList.map((company) => (
                  <Select.Option key={company.id} value={company.id}>
                    {company.name}
                  </Select.Option>
                ))}
              </Select>
            </div>

            {/* Filter by position (dropdown) */}
            <div className="w-2/12">
              <Select
                value={selectedRoleId === 0 ? null : selectedRoleId}
                allowClear
                name={`role`}
                disabled={!isAllowedToGetRoleList}
                placeholder="Semua Posisi"
                style={{ width: `100%` }}
                onChange={(value) => {
                  typeof value === "undefined"
                    ? setSelectedRoleId(0)
                    : setSelectedRoleId(value);
                }}
              >
                {/* <Select.Option value={0}>Semua Role</Select.Option> */}
                {dataRoleList.map((role) => (
                  <Select.Option key={role.id} value={role.id}>
                    {role.name}
                  </Select.Option>
                ))}
              </Select>
            </div>

            {/* Filter by contract status (dropdown) */}
            <div className="w-2/12">
              <Select
                value={
                  selectedContractStatus === 0 ? null : selectedContractStatus
                }
                allowClear
                name={`status`}
                disabled={!isAllowedToGetRoleTypeList}
                placeholder="Semua Status Kontrak"
                defaultValue={0}
                style={{ width: `100%` }}
                onChange={(value) => {
                  typeof value === "undefined"
                    ? setSelectedContractStatus(0)
                    : setSelectedContractStatus(value);
                }}
              >
                {dataContractStatusList.map((status) => (
                  <Select.Option key={status.id} value={status.id}>
                    <p>{status.name}</p>
                  </Select.Option>
                ))}
              </Select>
            </div>

            <ButtonSys
              type={`primary`}
              onClick={onFilterEmployees}
              disabled={!isAllowedToGetEmployees}
            >
              <div className="flex flex-row space-x-2.5 w-full items-center">
                <SearchIconSvg size={15} color={`#ffffff`} />
                <p>Cari</p>
              </div>
            </ButtonSys>
          </div>
          {/* End: Search criteria */}
          <div>
            <TableCustomEmployeeList
              dataSource={dataEmployees}
              setDataSource={setDataEmployees}
              columns={columnEmployee}
              loading={loadingEmployees}
              setpraloading={setLoadingEmployees}
              pageSize={rowsEmployees}
              total={dataRawEmployees?.total}
              initProps={initProps}
              setpage={setPageEmployees}
              pagefromsearch={pageEmployees}
              setdataraw={setDataRawEmployees}
              setsorting={setSortingEmployees}
              sorting={sortingEmployees}
              searching={searchingFilterEmployees}
              selectedRoleId={selectedRoleId}
              selectedContractStatus={selectedContractStatus}
              tempIdClicked={tempIdClicked}
              setTriggerRowClicked={setTriggerRowClicked}
            />
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
      sidemenu: "employee-list",
    },
  };
}

export default EmployeeListIndex;
