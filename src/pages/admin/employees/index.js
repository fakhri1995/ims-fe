import { DeleteOutlined, EditOutlined, UpOutlined } from "@ant-design/icons";
import { Collapse, Input, Select, Spin, Switch, notification } from "antd";
import moment from "moment";
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

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  COMPANY_CLIENTS_GET,
  EMPLOYEES_GET,
  EMPLOYEE_ADD,
  EMPLOYEE_DELETE,
  EMPLOYEE_GET,
  EMPLOYEE_PLACEMENTS_COUNT_GET,
  EMPLOYEE_ROLES_COUNT_GET,
  EMPLOYEE_STATUSES_COUNT_GET,
  EMPLOYEE_UPDATE,
  RECRUITMENT_ROLES_LIST_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import ButtonSys from "../../../components/button";
import { ChartDoughnut } from "../../../components/chart/chartCustom";
import { SearchIconSvg, UserPlusIconSvg } from "../../../components/icon";
import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import { ModalHapus2 } from "../../../components/modal/modalCustom";
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

const EmployeeListIndex = ({ dataProfile, sidemenu, initProps }) => {
  // 1. Init
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
  const isAllowedToUpdateEmployee = hasPermission(EMPLOYEE_UPDATE);

  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);
  const isAllowedToGetRoleList = hasPermission(RECRUITMENT_ROLES_LIST_GET);
  const isAllowedToGetRoleTypeList = hasPermission(RECRUITMENT_ROLES_LIST_GET);

  const isAllowedToGetPlacementCount = hasPermission(
    EMPLOYEE_PLACEMENTS_COUNT_GET
  );
  const isAllowedToGetRoleCount = hasPermission(EMPLOYEE_ROLES_COUNT_GET);
  const isAllowedToGetStatusCount = hasPermission(EMPLOYEE_STATUSES_COUNT_GET);

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    role_ids: withDefault(NumberParam, undefined),
    placements: withDefault(StringParam, undefined),
    contract_status_ids: withDefault(NumberParam, undefined),
    is_employee_active: withDefault(NumberParam, 1),
    keyword: withDefault(StringParam, undefined),
  });

  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 1, "Daftar Karyawan");

  // 2. Use state
  // 2.1. Charts
  const cursorTooltipRef = useRef(null);
  const [loadingChart, setLoadingChart] = useState(false);
  const [placementCount, setPlacementCount] = useState([]);
  const [roleCount, setRoleCount] = useState([]);
  const [statusCount, setStatusCount] = useState([]);

  // 2.2. Table Employee List
  // filter data
  const [loadingCompanyList, setLoadingCompanyList] = useState(false);
  const [dataCompanyList, setDataCompanyList] = useState([]);

  const [loadingRoleList, setLoadingRoleList] = useState(false);
  const [dataRoleList, setDataRoleList] = useState([]);

  const [loadingContractStatusList, setLoadingContractStatusList] =
    useState(false);
  const [dataContractStatusList, setDataContractStatusList] = useState([]);

  // filter search & selected options
  const [searchingFilterEmployees, setSearchingFilterEmployees] =
    useState(undefined);
  const [selectedPlacement, setSelectedPlacement] = useState(undefined);
  const [selectedRoleId, setSelectedRoleId] = useState(undefined);
  const [selectedContractStatusId, setSelectedContractStatusId] =
    useState(undefined);

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

    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    setLoadingEmployees(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployees${payload}`, {
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
  }, [
    isAllowedToGetEmployees,
    refresh,
    queryParams.page,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
    queryParams.keyword,
    queryParams.role_ids,
    queryParams.placements,
    queryParams.contract_status_ids,
    queryParams.is_employee_active,
  ]);

  // 3.2. Get Company Client List
  useEffect(() => {
    if (!isAllowedToGetCompanyClients) {
      permissionWarningNotification("Mendapatkan", "Daftar Company Client");
      setLoadingCompanyList(false);
      return;
    }

    setLoadingCompanyList(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyClientList?with_mig=1`,
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
  }, [isAllowedToGetCompanyClients]);

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

  // 3.5. Get Employee Placement Count
  useEffect(() => {
    if (!isAllowedToGetPlacementCount) {
      permissionWarningNotification(
        "Mendapatkan",
        "Statistik Employee Placement"
      );
      setLoadingChart(false);
      return;
    }

    setLoadingChart(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeePlacementsCount`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          let resData = res2.data;
          let finalPlacementCount = getFinalStatisticCount(
            resData,
            "placement",
            "placement_count"
          );
          setPlacementCount(finalPlacementCount);
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
        setLoadingChart(false);
      });
  }, [isAllowedToGetPlacementCount]);

  // 3.6. Get Employee Role Count
  useEffect(() => {
    if (!isAllowedToGetRoleCount) {
      permissionWarningNotification("Mendapatkan", "Statistik Employee Role");
      setLoadingChart(false);
      return;
    }

    setLoadingChart(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeeRolesCount`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          let resData = res2.data;
          let mappedRoleCount = resData.map((data) => {
            return {
              role_count: data.role_count,
              role_name: data.role?.name,
            };
          });

          let finalRoleCount = getFinalStatisticCount(
            mappedRoleCount,
            "role_name",
            "role_count"
          );

          setRoleCount(finalRoleCount);
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
        setLoadingChart(false);
      });
  }, [isAllowedToGetRoleCount]);

  // 3.7. Get Employee Status Count
  useEffect(() => {
    if (!isAllowedToGetStatusCount) {
      permissionWarningNotification("Mendapatkan", "Statistik Employee Status");
      setLoadingChart(false);
      return;
    }

    setLoadingChart(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeeStatusesCount`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          let statusCountRes = res2.data;
          let mappedStatusCount = statusCountRes.map((data) => {
            return {
              status_count: data.status_count,
              is_employee_active: Number(data.is_employee_active)
                ? "Aktif"
                : "Tidak Aktif",
            };
          });
          setStatusCount(mappedStatusCount);
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
        setLoadingChart(false);
      });
  }, [isAllowedToGetStatusCount]);

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
            rt.push(
              `/admin/employees/create?id=${response2.data?.id}&prevpath=add`
            );
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
        setModalDelete(false);
      });
  };

  const onFilterEmployees = () => {
    setQueryParams({
      keyword: searchingFilterEmployees,
      role_ids: selectedRoleId,
      placements: selectedPlacement,
      contract_status_ids: selectedContractStatusId,
    });
  };

  const { onKeyPressHandler } = createKeyPressHandler(
    onFilterEmployees,
    "Enter"
  );

  const handleSwitchActiveEmployee = () => {
    if (queryParams.is_employee_active === 1) {
      // fetch all employees
      setQueryParams({
        is_employee_active: 0,
        page: 1,
      });
    } else {
      // fetch active employee only
      setQueryParams({
        is_employee_active: 1,
        page: 1,
      });
    }
  };

  // Use in statistic for displaying only top 5 data and "Lainnya"
  const getFinalStatisticCount = (resData, attrName, attrCount) => {
    resData.sort((a, b) => b[attrCount] - a[attrCount]);
    let top5Data = resData.filter((data) => data[attrName]).slice(0, 5);
    let top5Name = top5Data.map((data) => data[attrName]);

    let othersData = resData.filter(
      (data) => !top5Name.includes(data[attrName])
    );
    let othersSum = othersData.reduce(
      (total, data) => total + data[attrCount],
      0
    );

    top5Data.push({
      [attrName]: "Lainnya",
      [attrCount]: othersSum,
    });

    return top5Data;
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
          children: <>{record.contract?.placement || "-"}</>,
        };
      },
    },
    {
      title: "Status Kontrak",
      dataIndex: "contract_status",
      render: (text, record, index) => {
        return {
          children: <>{record.contract?.contract_status?.name || "-"}</>,
        };
      },
    },
    {
      title: "Posisi",
      dataIndex: "position",
      render: (text, record, index) => {
        return {
          children: <>{record.contract?.role?.name || "-"}</>,
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
              {moment(record?.contract?.contract_end_at).isValid() ? (
                record.contract?.contract_end_countdown <= 30 ? (
                  <p className="text-warning">
                    {record.contract?.contract_end_countdown} hari
                  </p>
                ) : (
                  <p>{record.contract?.contract_end_countdown} hari</p>
                )
              ) : (
                <p>- hari</p>
              )}
            </>
          ),
        };
      },
      sorter: isAllowedToGetEmployees
        ? (a, b) =>
            a.contract?.contract_end_countdown >
            b.contract?.contract_end_countdown
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
                      rt.push(`/admin/employees/${record.id}?tab=2`);
                    }}
                    icon={<EditOutlined />}
                  >
                    <div className="flex flex-row space-x-2 items-center">
                      {/* <EditIconSvg size={16} color={`#35763B`} /> */}
                      <EditOutlined />
                      <p className="whitespace-nowrap">Edit Kontrak</p>
                    </div>
                  </ButtonSys>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <ButtonSys
                    type={isAllowedToUpdateEmployee ? "default" : "primary"}
                    disabled={!isAllowedToUpdateEmployee}
                    onClick={(event) => {
                      event.stopPropagation();
                      rt.push(`/admin/employees/create?id=${record.id}`);
                    }}
                    color={"notice"}
                  >
                    <div className="flex flex-row space-x-2 items-center">
                      {/* <EditIconSvg size={16} color={`#DDB44A`} /> */}
                      <EditOutlined />
                      <p className="whitespace-nowrap">Edit Draft</p>
                    </div>
                  </ButtonSys>
                  <ButtonSys
                    type={isAllowedToDeleteEmployee ? "default" : "primary"}
                    disabled={!isAllowedToDeleteEmployee}
                    onClick={(event) => {
                      event.stopPropagation();
                      setDataRowClicked(record);
                      setModalDelete(true);
                    }}
                    color={"warning"}
                  >
                    <div className="flex flex-row space-x-2 items-center">
                      {/* <TrashIconSvg size={16} color={`#BF4A40`} /> */}
                      <DeleteOutlined />
                      <p className="whitespace-nowrap">Hapus Draft</p>
                    </div>
                  </ButtonSys>
                </div>
              )}
            </>
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
      <div className="grid grid-cols-1 md:grid-cols-3 md:px-5" id="mainWrapper">
        <div
          className="relative mb-5 col-span-3"
          onMouseMove={(e) => {
            let x = e.clientX;
            let y = e.clientY;

            cursorTooltipRef.current.style.left = x - 250 + "px";
            cursorTooltipRef.current.style.top = y - 70 + "px";
          }}
          onMouseEnter={() => {
            cursorTooltipRef.current.style.opacity = 0.85;
          }}
          onMouseLeave={() => {
            cursorTooltipRef.current.style.opacity = 0;
          }}
        >
          {/* Custom tooltip */}
          <div
            ref={cursorTooltipRef}
            className="bg-zinc-900 text-white rounded-sm p-2 z-50"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              opacity: 0,
            }}
          >
            Klik untuk melihat statistik
          </div>

          {/* Collapsible Panel */}
          <Collapse
            className="shadow-md rounded-md bg-white"
            bordered={false}
            ghost={true}
            expandIconPosition="left"
            expandIcon={({ isActive }) => (
              <UpOutlined rotate={isActive ? 180 : 0} />
            )}
            onChange={(openedPanels) => {
              if (openedPanels) {
                cursorTooltipRef.current.style.opacity = 0;
              } else {
                cursorTooltipRef.current.style.opacity = 1;
              }
            }}
          >
            <Collapse.Panel
              header={<div className="mig-heading--4">Statistik</div>}
            >
              <div className="grid md:grid-cols-3 gap-2 lg:gap-6">
                {/* CHART PENEMPATAN KARYAWAN */}
                {loadingChart ? (
                  <Spin />
                ) : (
                  <ChartDoughnut
                    title={"Penempatan Karyawan"}
                    dataChart={placementCount}
                    objName={"placement"}
                    value={"placement_count"}
                  />
                )}
                {/* CHART POSISI */}
                {loadingChart ? (
                  <Spin />
                ) : (
                  <ChartDoughnut
                    title={"Posisi"}
                    dataChart={roleCount}
                    objName={`role_name`}
                    value={"role_count"}
                  />
                )}
                {/* CHART STATUS KARYAWAN */}
                {loadingChart ? (
                  <Spin />
                ) : (
                  <ChartDoughnut
                    title={"Status Karyawan"}
                    dataChart={statusCount}
                    objName={"is_employee_active"}
                    value={"status_count"}
                  />
                )}
              </div>
            </Collapse.Panel>
          </Collapse>
        </div>

        {/* Table Karyawan */}
        <div className="md:col-span-3 flex flex-col shadow-md rounded-md bg-white p-4 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="mig-heading--4 ">Daftar Karyawan</h4>
            <div
              className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 
              items-end md:items-center"
            >
              <div className="flex flex-row items-center space-x-2 text-primary100">
                <Switch
                  checked={queryParams.is_employee_active}
                  onClick={handleSwitchActiveEmployee}
                />
                {queryParams.is_employee_active ? (
                  <p>Karyawan Aktif</p>
                ) : (
                  <p>Karyawan Tidak Aktif</p>
                )}
              </div>
              <ButtonSys
                type={"primary"}
                onClick={onAddEmployeeButtonClicked}
                disabled={!isAllowedToAddEmployee}
              >
                <div className="flex flex-row items-center space-x-2">
                  <UserPlusIconSvg size={16} color="#FFFFFF" />
                  <p className="whitespace-nowrap">Tambah Karyawan</p>
                </div>
              </ButtonSys>
            </div>
          </div>

          {/* Start: Search criteria */}
          <div className="grid grid-cols-2 gap-2 md:flex md:flex-row justify-between w-full items-center mb-4">
            {/* Search by keyword (kata kunci) */}
            <div className="md:w-4/12">
              <Input
                defaultValue={queryParams.keyword}
                style={{ width: `100%` }}
                placeholder="Kata Kunci.."
                allowClear
                onChange={(e) => {
                  if (!e.target.value) {
                    setQueryParams({
                      keyword: undefined,
                    });
                  }
                  setSearchingFilterEmployees(e.target.value);
                }}
                onKeyPress={onKeyPressHandler}
                disabled={!isAllowedToGetEmployees}
              />
            </div>

            {/* Filter by company (dropdown) */}
            <div className="md:w-2/12">
              <Select
                allowClear
                showSearch
                defaultValue={queryParams.placements}
                name={`placement`}
                disabled={!isAllowedToGetCompanyClients}
                placeholder="Semua Penempatan"
                style={{ width: `100%` }}
                onChange={(value) => {
                  setQueryParams({ placements: value });
                  setSelectedPlacement(value);
                }}
                filterOption={(input, option) =>
                  (option?.value ?? "")
                    .toLowerCase()
                    .includes(input.toLocaleLowerCase())
                }
                optionFilterProp="children"
              >
                {/* <Select.Option key={-1} value={""}>
                  Semua Penempatan
                </Select.Option> */}
                {dataCompanyList.map((company) => (
                  <Select.Option key={company.id} value={company.name}>
                    {company.name}
                  </Select.Option>
                ))}
              </Select>
            </div>

            {/* Filter by position (dropdown) */}
            <div className="md:w-2/12">
              <Select
                allowClear
                showSearch
                defaultValue={queryParams.role_ids}
                name={`role`}
                disabled={!isAllowedToGetRoleList}
                placeholder="Semua Posisi"
                style={{ width: `100%` }}
                onChange={(value) => {
                  setQueryParams({ role_ids: value });
                  setSelectedRoleId(value);
                }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {dataRoleList.map((role) => (
                  <Select.Option key={role.id} value={role.id}>
                    {role.name}
                  </Select.Option>
                ))}
              </Select>
            </div>

            {/* Filter by contract status (dropdown) */}
            <div className="md:w-2/12">
              <Select
                defaultValue={queryParams.contract_status_ids}
                allowClear
                name={`status`}
                disabled={!isAllowedToGetRoleTypeList}
                placeholder="Semua Status Kontrak"
                style={{ width: `100%` }}
                onChange={(value) => {
                  setQueryParams({ contract_status_ids: value });
                  setSelectedContractStatusId(value);
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
              rt={rt}
              dataSource={dataEmployees}
              columns={columnEmployee}
              loading={loadingEmployees}
              total={dataRawEmployees?.total}
              queryParams={queryParams}
              setQueryParams={setQueryParams}
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
