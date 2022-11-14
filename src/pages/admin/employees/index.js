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
  const isAllowedToDeleteEmployee = hasPermission(EMPLOYEE_DELETE);
  const canUpdateEmployee = hasPermission([EMPLOYEE_UPDATE, EMPLOYEE_GET]);

  // TODO: change variable and constant to appropriate feature
  const isAllowedToGetRecruitmentRolesList = hasPermission(
    RECRUITMENT_ROLES_LIST_GET
  );
  const isAllowedToGetRecruitmentStatusesList = hasPermission(
    RECRUITMENT_ROLES_LIST_GET
  );

  // 1. Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);

  const [instanceForm] = Form.useForm();
  // 2. Use state

  // 2.2. Table Employee List
  // filter data
  const [loadingRoleList, setLoadingRoleList] = useState(false);
  const [dataRoleList, setDataRoleList] = useState([]);
  const [loadingContractStatusList, setLoadingContractStatusList] =
    useState(false);
  const [dataContractStatusList, setDataContractStatusList] = useState([]);

  // filter search & selected options
  const [searchingFilterEmployees, setSearchingFilterEmployees] = useState("");
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

  /**
   * 2.3. Drawer/Modal For Create, Delete, Bulk, Send Email,
   * Import sheet, Preview, send access verification
   * */
  const [isCreateDrawerShown, setCreateDrawerShown] = useState(false);
  const [isEmailDrawerShown, setEmailDrawerShown] = useState(false);
  const [isPreviewDrawerShown, setPreviewDrawerShown] = useState(false);

  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [modalBulk, setModalBulk] = useState(false);
  const [bulkMode, setBulkMode] = useState("");

  const [modalSheetImport, setModalSheetImport] = useState(false);

  const [modalVerif, setModalVerif] = useState(false);
  const [isAccessSent, setIsAccessSent] = useState(false);
  const [loadingVerif, setLoadingVerif] = useState(false);

  // 3. UseEffect
  // 3.3. Get Employees
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

  // 3.2. Get Employee Role List
  useEffect(() => {
    if (!isAllowedToGetRecruitmentRolesList) {
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
  }, [isAllowedToGetRecruitmentRolesList, refresh]);

  // 3.5. Get Status List
  useEffect(() => {
    if (!isAllowedToGetRecruitmentStatusesList) {
      permissionWarningNotification("Mendapatkan", "Contract Status List");
      setLoadingContractStatusList(false);
      return;
    }

    setLoadingContractStatusList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeeStatusList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
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
  }, [isAllowedToGetRecruitmentStatusesList, refresh]);

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
          children: <>{record.days_left ? record.days_left : ""}</>,
        };
      },
    },
    {
      title: "Aksi",
      key: "button_action",
      render: (text, record) => {
        return {
          children: (
            <div className="flex flex-col space-x-2 justify-center">
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
              <ButtonSys
                type={isAllowedToUpdateEmployee ? "default" : "primary"}
                disabled={!isAllowedToUpdateEmployee}
                onClick={(event) => {
                  event.stopPropagation();
                  // setDataRowClicked(record);
                  // setEmailDrawerShown(true);
                }}
              >
                <CirclePlusIconSvg size={12} color={`#35763B`} />
                <p>Tambah Kontrak</p>
              </ButtonSys>
            </div>
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
    >
      <div className="flex flex-col" id="mainWrapper">
        <div className="grid grid-cols-2 lg:grid-cols-3 md:px-5 gap-6">
          {/* Table Karyawan */}
          <div className="col-span-3 flex flex-col shadow-md rounded-md bg-white p-5 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="mig-heading--4 ">Semua Karyawan</h4>
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

              {/* Filter by role (dropdown) */}
              <div className="w-3/12">
                <Select
                  value={selectedRoleId === 0 ? null : selectedRoleId}
                  allowClear
                  name={`role`}
                  disabled={!isAllowedToGetRecruitmentRolesList}
                  placeholder="Semua Role"
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

              {/* Search by status (dropdown) */}
              <div className="w-3/12">
                <Select
                  value={
                    selectedContractStatus === 0 ? null : selectedContractStatus
                  }
                  allowClear
                  name={`status`}
                  disabled={!isAllowedToGetRecruitmentStatusesList}
                  placeholder="Semua Status"
                  defaultValue={0}
                  style={{ width: `100%` }}
                  onChange={(value) => {
                    typeof value === "undefined"
                      ? setSelectedContractStatus(0)
                      : setSelectedContractStatus(value);
                  }}
                >
                  <Select.Option value={0}>Semua Status</Select.Option>
                  {dataContractStatusList.map((status) => (
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
