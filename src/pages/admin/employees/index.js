import { UpOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  Form,
  Input,
  Menu,
  Select,
  Spin,
  Switch,
  notification,
} from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";

import { AccessControl } from "components/features/AccessControl";

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
import { ChartDoughnut } from "../../../components/chart/chartCustom";
import {
  EditIconSvg,
  SearchIconSvg,
  TrashIconSvg,
  UserPlusIconSvg,
} from "../../../components/icon";
import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import { ModalHapus2, ModalUbah } from "../../../components/modal/modalCustom";
import { TableCustomEmployeeList } from "../../../components/table/tableCustom";
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
  const isAllowedToDeleteEmployee = hasPermission(EMPLOYEE_DELETE);

  const isAllowedToGetCompanyList = hasPermission(COMPANY_LISTS_GET);
  const isAllowedToGetRoleList = hasPermission(RECRUITMENT_ROLES_LIST_GET);
  const isAllowedToGetRoleTypeList = hasPermission(RECRUITMENT_ROLES_LIST_GET);

  // 1. Init
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
  const [topCompanyCount, setTopCompanyCount] = useState([
    {
      name: "Bank Bukopin",
      employee_count: 5,
    },
    {
      name: "Mitramas",
      employee_count: 10,
    },
  ]);
  const [topPositionCount, setTopPositionCount] = useState([]);
  const [statusCount, setStatusCount] = useState([]);

  // 2.2. Table Employee List
  // filter data
  const [isEmployeeActive, setIsEmployeeActive] = useState(1);

  const [loadingCompanyList, setLoadingCompanyList] = useState(false);
  const [dataCompanyList, setDataCompanyList] = useState([]);

  const [loadingRoleList, setLoadingRoleList] = useState(false);
  const [dataRoleList, setDataRoleList] = useState([]);

  const [loadingContractStatusList, setLoadingContractStatusList] =
    useState(false);
  const [dataContractStatusList, setDataContractStatusList] = useState([]);

  // filter search & selected options
  const [searchingFilterEmployees, setSearchingFilterEmployees] = useState("");
  const [selectedPlacement, setSelectedPlacement] = useState(0);
  const [selectedRoleId, setSelectedRoleId] = useState(0);
  const [selectedContractStatusId, setSelectedContractStatusId] = useState(0);

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

  // 2.3. Add employee
  const [loadingAdd, setLoadingAdd] = useState(false);

  // 2.4. Delete employee
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // 3. UseEffect
  // 3.1. Get Employees
  useEffect(() => {
    if (!isAllowedToGetEmployees) {
      permissionWarningNotification("Mendapatkan", "Daftar Employee");
      setLoadingEmployees(false);
      return;
    }

    setLoadingEmployees(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployees?rows=10&is_employe_active=${isEmployeeActive}`,
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
  }, [isAllowedToGetEmployees, isEmployeeActive, refresh]);

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
    handleAddEmployee();
  }, []);

  const handleAddEmployee = () => {
    if (!isAllowedToAddEmployee) {
      permissionWarningNotification("Menambah", "Karyawan");
      return;
    }
    setLoadingAdd(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addEmployee`, {
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
            setLoadingAdd(false);
            rt.push(`/admin/employees/create?id=${response2.data?.id}`);
          }, 500);
        } else {
          notification.error({
            message: `Gagal menambahkan karyawan. ${response2.message}`,
            duration: 3,
          });
          setTimeout(() => {
            setLoadingAdd(false);
          }, 500);
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan karyawan. ${err.response}`,
          duration: 3,
        });
        setLoadingAdd(false);
      });
  };

  const handleDeleteEmployee = (employeeId) => {
    if (!isAllowedToDeleteEmployee) {
      permissionWarningNotification("Menghapus", "Karyawan");
      return;
    }
    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteEmployee?id=${employeeId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          notification.success({
            message: response2.message,
            duration: 3,
          });
          setModalDelete(false);
        } else {
          notification.error({
            message: `Gagal menghapus karyawan. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus karyawan. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  // 4.1. Filter Table
  const onFilterEmployees = () => {
    setLoadingEmployees(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployees?sort_by=${sortingEmployees.sort_by}&sort_type=${sortingEmployees.sort_type}&role_id=${selectedRoleId}&placement=${selectedPlacement}&contract_status_id=${selectedContractStatusId}&is_employe_active=${isEmployeeActive}&keyword=${searchingFilterEmployees}&page=${pageEmployees}&rows=${rowsEmployees}`,
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

  // 4.2. Show active employees only
  const handleSwitchActiveEmployee = () => {
    if (isEmployeeActive === 1) {
      // fetch all emmployees
      setIsEmployeeActive(0);
    } else {
      // fetch active employee only
      setIsEmployeeActive(1);
    }
  };

  // "Daftar Karyawan" Table's columns
  const columnEmployee = [
    {
      title: "No.",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{dataRawEmployees?.from + index}</>,
        };
      },
    },
    {
      title: "Nama",
      dataIndex: "name",
      sorter: isAllowedToGetEmployees
        ? (a, b) => a.name?.toLowerCase() > b.name?.toLowerCase()
        : false,
    },
    {
      title: "NIP",
      dataIndex: "nip",
    },
    {
      title: "Penempatan",
      dataIndex: "placement",
      render: (text, record, index) => {
        return {
          children: <>{record.contracts[0]?.placement}</>,
        };
      },
    },
    {
      title: "Status Kontrak",
      dataIndex: "contract_status",
      render: (text, record, index) => {
        return {
          children: <>{record.contracts[0]?.contract_status_id}</>,
        };
      },
    },
    {
      title: "Posisi",
      dataIndex: "position",
      render: (text, record, index) => {
        return {
          children: <>{record.contracts[0]?.role_id}</>,
        };
      },
    },
    {
      title: "No. Telepon",
      dataIndex: "phone_number",
    },
    {
      title: "Sisa Hari Kerja",
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
              {record.is_posted ? (
                <div className="flex flex-col space-y-2">
                  <ButtonSys
                    type={isAllowedToGetEmployee ? "default" : "primary"}
                    disabled={!isAllowedToGetEmployee}
                    onClick={(event) => {
                      event.stopPropagation();
                      rt.push(
                        `/admin/employees/${record.id}/editContract?id=${record?.contracts[0]?.id}`
                      );
                    }}
                  >
                    <div className="flex flex-row space-x-2 items-center">
                      <EditIconSvg size={16} color={`#35763B`} />
                      <p className="whitespace-nowrap">Edit Kontrak</p>
                    </div>
                  </ButtonSys>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <ButtonSysColor
                    type={"default"}
                    // disabled={!isAllowedToEditDraft}
                    onClick={(event) => {
                      event.stopPropagation();
                      rt.push(`/admin/employees/create?id=${record.id}`);
                    }}
                    color={"border-notice text-notice bg-notice bg-opacity-10"}
                  >
                    <div className="flex flex-row space-x-2 items-center">
                      <EditIconSvg size={16} color={`#DDB44A`} />
                      <p className="whitespace-nowrap">Edit Draft</p>
                    </div>
                  </ButtonSysColor>
                  <ButtonSysColor
                    type={"default"}
                    disabled={!isAllowedToDeleteEmployee}
                    onClick={(event) => {
                      event.stopPropagation();
                      setDataRowClicked(record);
                      setModalDelete(true);
                    }}
                    color={
                      "border-warning text-warning bg-warning bg-opacity-10"
                    }
                  >
                    <div className="flex flex-row space-x-2 items-center">
                      <TrashIconSvg size={16} color={`#BF4A40`} />
                      <p className="whitespace-nowrap">Hapus Draft</p>
                    </div>
                  </ButtonSysColor>
                </div>
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
          className="col-span-3 mb-5 shadow-md rounded-md bg-white"
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
                <Spin />
              ) : (
                <ChartDoughnut
                  title={"Penempatan Karyawan"}
                  dataChart={topCompanyCount}
                  objName={"name"}
                  value={"employee_count"}
                />
              )}
              {/* CHART POSISI */}
              {loadingChart ? (
                <Spin />
              ) : (
                <ChartDoughnut
                  title={"Posisi"}
                  dataChart={topCompanyCount}
                  objName={"name"}
                  value={"employee_count"}
                />
              )}
              {/* CHART STATUS KARYAWAN */}
              {loadingChart ? (
                <Spin />
              ) : (
                <ChartDoughnut
                  title={"Status Karyawan"}
                  dataChart={topCompanyCount}
                  objName={"name"}
                  value={"employee_count"}
                />
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
                  checked={isEmployeeActive}
                  onClick={handleSwitchActiveEmployee}
                />
                {isEmployeeActive ? (
                  <p>Karyawan Aktif</p>
                ) : (
                  <p>Karyawan Tidak Aktif</p>
                )}
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
                value={selectedPlacement === 0 ? null : selectedPlacement}
                allowClear
                name={`role`}
                disabled={!isAllowedToGetRoleList}
                placeholder="Semua Penempatan"
                style={{ width: `100%` }}
                onChange={(value) => {
                  typeof value === "undefined"
                    ? setSelectedPlacement(0)
                    : setSelectedPlacement(value);
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
                  selectedContractStatusId === 0
                    ? null
                    : selectedContractStatusId
                }
                allowClear
                name={`status`}
                disabled={!isAllowedToGetRoleTypeList}
                placeholder="Semua Status Kontrak"
                defaultValue={0}
                style={{ width: `100%` }}
                onChange={(value) => {
                  typeof value === "undefined"
                    ? setSelectedContractStatusId(0)
                    : setSelectedContractStatusId(value);
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
              selectedContractStatusId={selectedContractStatusId}
              selectedPlacement={selectedPlacement}
              isEmployeeActive={isEmployeeActive}
            />
          </div>
        </div>
      </div>

      {/* Modal Hapus Karyawan */}
      <AccessControl hasPermission={EMPLOYEE_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={() => handleDeleteEmployee(dataRowClicked.id)}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"draft"}
          loading={loadingDelete}
          disabled={!isAllowedToDeleteEmployee}
        >
          <p>
            Apakah Anda yakin ingin melanjutkan penghapusan draft karyawan
            dengan nama <strong>{dataRowClicked.name}?</strong>
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
      sidemenu: "employee-list",
    },
  };
}

export default EmployeeListIndex;
