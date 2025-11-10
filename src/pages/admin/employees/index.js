import { DeleteOutlined, EditOutlined, UpOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  Input,
  Select,
  Spin,
  Switch,
  notification,
} from "antd";
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
import { useQuery } from "react-query";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  COMPANY_CLIENTS_GET,
  EMPLOYEES_GET,
  EMPLOYEE_ADD,
  EMPLOYEE_CONTRACT_UPDATE,
  EMPLOYEE_DELETE,
  EMPLOYEE_GET,
  EMPLOYEE_PLACEMENTS_COUNT_GET,
  EMPLOYEE_ROLES_COUNT_GET,
  EMPLOYEE_STATUSES_COUNT_GET,
  EMPLOYEE_UPDATE,
  RECRUITMENT_ROLES_LIST_GET,
  RECRUITMENT_ROLE_TYPES_LIST_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import { EmployeeService } from "../../../apis/employee";
import ButtonSys from "../../../components/button";
import { ChartDoughnut } from "../../../components/chart/chartCustom";
import {
  LinkIconSvg,
  SearchIconSvg,
  UserPlusIconSvg,
} from "../../../components/icon";
import Layout from "../../../components/layout-dashboard-management";
import st from "../../../components/layout-dashboard-management.module.css";
import ModalConnectAccount from "../../../components/modal/employee/modalConnectAccount";
import { ModalHapus2 } from "../../../components/modal/modalCustom";
import { TableCustomEmployeeList } from "../../../components/table/tableCustom";
import { createKeyPressHandler, momentFormatDate } from "../../../lib/helper";
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

  const isAllowedToUpdateEmployeeContract = hasPermission(
    EMPLOYEE_CONTRACT_UPDATE
  );

  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);
  const isAllowedToGetRoleList = hasPermission(RECRUITMENT_ROLES_LIST_GET);
  const isAllowedToGetRoleTypeList = hasPermission(
    RECRUITMENT_ROLE_TYPES_LIST_GET
  );

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
  });
  const [dataSelected, setDataSelected] = useState(null);
  const [showModalConnect, setShowModalConnect] = useState(false);

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

  // 2.2. Table Employee List
  // filter search & selected options
  const [searchingFilterEmployees, setSearchingFilterEmployees] = useState("");
  const [selectedPlacement, setSelectedPlacement] = useState(undefined);
  const [selectedRoleId, setSelectedRoleId] = useState(undefined);
  const [selectedContractStatusId, setSelectedContractStatusId] =
    useState(undefined);

  // table data
  const [dataEmployees, setDataEmployees] = useState([]);
  const [dataRowClicked, setDataRowClicked] = useState({});
  const [dataCompanyList, setDataCompanyList] = useState([]);

  // 2.3. Add employee
  const [loadingAdd, setLoadingAdd] = useState(false);

  // 2.4. Delete employee
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

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

  // 3. UseEffect
  // 3.1. Get Employees
  const {
    data: dataRawEmployees,
    isLoading: loadingEmployees,
    refetch: refetchEmployees,
  } = useQuery(
    [EMPLOYEES_GET, queryParams],
    () =>
      EmployeeService.getEmployees(
        initProps,
        isAllowedToGetEmployees,
        queryParams,
        searchingFilterEmployees
      ),
    {
      enabled: isAllowedToGetEmployees,
      select: (response) => {
        return response.data;
      },
      onSuccess: (data) => {
        setDataEmployees(data);
      },
      onError: (error) => {
        notification.error({ message: "Gagal mendapatkan daftar karyawan." });
      },
    }
  );

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      refetchEmployees();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchingFilterEmployees]);

  // 3.2. Get Company Client List
  const {
    data: dataQueryCompanyList,
    isLoading: loadingCompanyList,
    refetch: refetchCompanyList,
  } = useQuery(
    [COMPANY_CLIENTS_GET],
    () =>
      EmployeeService.getCompanyClientList(
        initProps,
        isAllowedToGetCompanyClients
      ),
    {
      enabled: isAllowedToGetCompanyClients,
      select: (response) => response.data,
      onSuccess: (data) => setDataCompanyList(data),
    }
  );

  // 3.3. Get Employee Role List
  const {
    data: dataRoleList,
    isLoading: loadingRoleList,
    refetch: refetchRoleList,
  } = useQuery(
    [RECRUITMENT_ROLES_LIST_GET],
    () =>
      EmployeeService.getEmployeeRoleList(initProps, isAllowedToGetRoleList),
    {
      enabled: isAllowedToGetRoleList,
      select: (response) => response.data,
    }
  );

  // 3.4. Get Contract Status/Role Type List
  const {
    data: dataContractStatusList,
    isLoading: loadingContractStatusList,
    refetch: refetchContractStatusList,
  } = useQuery(
    [RECRUITMENT_ROLE_TYPES_LIST_GET],
    () =>
      EmployeeService.getRoleTypeList(initProps, isAllowedToGetRoleTypeList),
    {
      enabled: isAllowedToGetRoleTypeList,
      select: (response) => response.data,
    }
  );

  // 3.5. Get Employee Placement Count
  const {
    data: placementCount,
    isLoading: loadingPlacementCount,
    refetch: refetchPlacementCount,
  } = useQuery(
    [EMPLOYEE_PLACEMENTS_COUNT_GET],
    () =>
      EmployeeService.getEmployeePlacementCount(
        initProps,
        isAllowedToGetPlacementCount
      ),
    {
      enabled: isAllowedToGetPlacementCount,
      select: (response) => {
        let finalPlacementCount = getFinalStatisticCount(
          response.data,
          "placement",
          "placement_count"
        );
        return finalPlacementCount;
      },
    }
  );

  // 3.6. Get Employee Role Count
  const {
    data: roleCount,
    isLoading: loadingRoleCount,
    refetch: refetchRoleCount,
  } = useQuery(
    [EMPLOYEE_ROLES_COUNT_GET],
    () =>
      EmployeeService.getEmployeeRoleCount(initProps, isAllowedToGetRoleCount),
    {
      enabled: isAllowedToGetRoleCount,
      select: (response) => {
        let mappedRoleCount = response.data.map((data) => {
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
        return finalRoleCount;
      },
    }
  );

  // 3.7. Get Employee Status Count
  const {
    data: statusCount,
    isLoading: loadingStatusCount,
    refetch: refetchStatusCount,
  } = useQuery(
    [EMPLOYEE_STATUSES_COUNT_GET],
    () =>
      EmployeeService.getEmployeeStatusCount(
        initProps,
        isAllowedToGetStatusCount
      ),
    {
      enabled: isAllowedToGetStatusCount,
      select: (response) => {
        let mappedStatusCount = response.data.map((data) => {
          return {
            status_count: data.status_count,
            is_employee_active: Number(data.is_employee_active)
              ? "Aktif"
              : "Tidak Aktif",
          };
        });
        return mappedStatusCount;
      },
    }
  );

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
        if (response2.success) {
          refetchEmployees();
          refetchPlacementCount();
          refetchRoleCount();
          refetchStatusCount();

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
      role_ids: selectedRoleId,
      placements: selectedPlacement,
      contract_status_ids: selectedContractStatusId,
      page: 1,
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
      title: "Name",
      dataIndex: "name",
      sorter: isAllowedToGetEmployees
        ? (a, b) => a.name?.toLowerCase() > b.name?.toLowerCase()
        : false,
      render: (text, record, index) => {
        return {
          children: (
            <>
              <p className={"text-[#4D4D4D] text-sm/6 font-inter font-normal"}>
                {text || "-"}
              </p>
              <p className={"text-[#808080] text-xs/5 font-inter font-medium"}>
                {record.nip || "-"}
              </p>
            </>
          ),
        };
      },
    },
    {
      title: "Position/Placement",
      dataIndex: ["contract", "placement"],
      render: (text, record, index) => {
        return {
          children: (
            <>
              <p className={"text-[#4D4D4D] text-sm/6 font-inter font-normal"}>
                {text || "-"}
              </p>
              <p className={"text-[#808080] text-xs/5 font-inter font-medium"}>
                {record.role_name || "-"}
              </p>
            </>
          ),
        };
      },
    },
    {
      title: "Join Date",
      dataIndex: "join_at",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <p className={"text-[#4D4D4D] text-sm/6 font-inter font-normal"}>
                {momentFormatDate(text || null, "-", "DD MMM YYYY")}
              </p>
            </>
          ),
        };
      },
    },

    {
      title: "Contact",
      dataIndex: "email_office",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <p className={"text-[#4D4D4D] text-sm/6 font-inter font-normal"}>
                {text || "-"}
              </p>
              <p className={"text-[#808080] text-xs/5 font-inter font-medium"}>
                {record?.phone_number || "-"}
              </p>
            </>
          ),
        };
      },
    },

    {
      title: "Contract Status",
      dataIndex: ["contract", "contract_status", "name"],
      render: (text, record, index) => {
        return {
          children: (
            <div className={"bg-[#F3F3F3] rounded-[5px] py-0.5 px-3 max-w-max"}>
              <p className={"text-[#4D4D4D] text-xs/5 font-inter font-medium"}>
                {text || "-"}
              </p>
            </div>
          ),
        };
      },
    },
    {
      title: "Workdays Left",
      dataIndex: "contract_end_countdown",
      render: (text, record, index) => {
        return {
          children: (
            <p
              className={
                record?.contract?.contract_end_countdown <= 60
                  ? "text-danger"
                  : "text-black"
              }
            >
              {!record?.contract?.contract_end_countdown
                ? "-"
                : record?.contract?.contract_end_countdown < 0
                ? 0
                : record?.contract?.contract_end_countdown}{" "}
              days
            </p>
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
      title: "Action",
      key: "button_action",
      render: (text, record) => {
        return {
          children: (
            <>
              {record.is_posted ? (
                <div className="flex flex-row space-x-2">
                  <Button
                    type={"primary"}
                    disabled={!isAllowedToUpdateEmployeeContract}
                    onClick={(event) => {
                      event.stopPropagation();
                      rt.push(`/admin/employees/${record.id}?tab=2`);
                    }}
                    icon={<EditOutlined />}
                    className="bg-primary100 border-primary100 hover:bg-primary75 hover:border-primary75 focus:bg-primary75 focus:border-primary75"
                  />
                  {(record.user_id == null || record.user_id === 0) && (
                    <Button
                      type={"primary"}
                      disabled={!isAllowedToUpdateEmployeeContract}
                      // onClick={()=>handleConnectAccount(record)}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleConnectAccount(record);
                      }}
                      icon={<LinkIconSvg />}
                      className="bg-primary100 border-primary100 hover:bg-primary75 hover:border-primary75 focus:bg-primary75 focus:border-primary75"
                    />
                  )}
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    type={"primary"}
                    disabled={!isAllowedToUpdateEmployee}
                    onClick={(event) => {
                      event.stopPropagation();
                      rt.push(`/admin/employees/create?id=${record.id}`);
                    }}
                    icon={<EditOutlined />}
                    style={{
                      backgroundColor: "#DDB44A",
                      borderColor: "#DDB44A",
                    }}
                    className="bg-notice border-notice hover:bg-notice hover:opacity-75 hover:border-notice focus:bg-notice focus:border-notice focus:opacity-75"
                  />
                  <Button
                    type={"primary"}
                    disabled={!isAllowedToDeleteEmployee}
                    onClick={(event) => {
                      event.stopPropagation();
                      setDataRowClicked(record);
                      setModalDelete(true);
                    }}
                    icon={<DeleteOutlined />}
                    style={{
                      backgroundColor: "#BF4A40",
                      borderColor: "#BF4A40",
                    }}
                    className="bg-danger border-danger hover:bg-danger hover:opacity-75 hover:border-danger focus:bg-danger focus:border-danger focus:opacity-75"
                  />
                </div>
              )}
            </>
          ),
        };
      },
    },
  ];

  const handleConnectAccount = (record) => {
    setDataSelected(record);
    setShowModalConnect(true);
  };

  const handleCloseModalConnect = () => {
    setDataSelected(null);
    setShowModalConnect(false);
  };

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="" id="mainWrapper">
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
                {loadingPlacementCount ? (
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
                {loadingRoleCount ? (
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
                {loadingStatusCount ? (
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
        <div className="rounded-[8px] border border-neutrals70 shadow-desktopCard bg-white">
          <div className="flex items-center justify-between mb-4 py-3 px-4 border-b">
            <h4 className="text-[16px] leading-6 text-mono30 font-bold mb-2 md:mb-0">
              Employee List
            </h4>
            <div
              className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 
              items-end md:items-center"
            >
              <div
                onClick={onAddEmployeeButtonClicked}
                className="hover:cursor-pointer bg-primary100 rounded-[5px] flex flex-row items-center gap-1.5 px-4 py-2"
              >
                <UserPlusIconSvg size={16} color="#FFFFFF" />
                <p className="text-white text-sm/4 font-medium font-roboto">
                  Add Employee
                </p>
              </div>
            </div>
          </div>

          {/* Start: Search criteria */}
          <div className="flex flex-row justify-between gap-3 items-center mb-4 px-4">
            {/* Search by keyword (kata kunci) */}
            <div className="w-1/5">
              <Input
                defaultValue={searchingFilterEmployees}
                style={{ width: `100%` }}
                placeholder="Search Employee"
                allowClear
                onChange={(e) => {
                  setQueryParams({ page: 1 });
                  setSearchingFilterEmployees(e.target.value);
                }}
                disabled={!isAllowedToGetEmployees}
              />
            </div>

            {/* Filter by company (dropdown) */}
            <div className="w-1/5">
              <Select
                allowClear
                showSearch
                defaultValue={queryParams.placements}
                name={`placement`}
                disabled={!isAllowedToGetCompanyClients}
                placeholder="Select Company"
                style={{ width: `100%` }}
                onChange={(value) => {
                  setQueryParams({ placements: value, page: 1 });
                  setSelectedPlacement(value);
                }}
                filterOption={(input, option) =>
                  (option?.value ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                optionFilterProp="children"
              >
                {/* <Select.Option key={-1} value={""}>
                  Semua Penempatan
                </Select.Option> */}
                {dataCompanyList?.map((company) => (
                  <Select.Option key={company.id} value={company.name}>
                    {company.name}
                  </Select.Option>
                ))}
              </Select>
            </div>

            {/* Filter by position (dropdown) */}
            <div className="w-1/5">
              <Select
                allowClear
                showSearch
                defaultValue={queryParams.role_ids}
                name={`role`}
                disabled={!isAllowedToGetRoleList}
                placeholder="Select Position"
                style={{ width: `100%` }}
                onChange={(value) => {
                  setQueryParams({ role_ids: value, page: 1 });
                  setSelectedRoleId(value);
                }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {dataRoleList?.map((role) => (
                  <Select.Option key={role.id} value={role.id}>
                    {role.role}
                  </Select.Option>
                ))}
              </Select>
            </div>

            {/* Filter by contract status (dropdown) */}
            <div className="w-1/5">
              <Select
                allowClear
                name={`status`}
                defaultValue={queryParams.contract_status_ids}
                disabled={!isAllowedToGetRoleTypeList}
                placeholder="Select contract status"
                style={{ width: `100%` }}
                onChange={(value) => {
                  const stringStatusIds = value?.toString();
                  setQueryParams({
                    contract_status_ids: stringStatusIds,
                    page: 1,
                  });
                  setSelectedContractStatusId(value);
                }}
                optionFilterProp="children"
              >
                {dataContractStatusList?.map((status) => (
                  <Select.Option key={status.id} value={status.id}>
                    <p>{status.name}</p>
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div className="flex flex-row items-center space-x-2 text-primary100 w-1/5">
              <Switch
                checked={queryParams.is_employee_active}
                onClick={handleSwitchActiveEmployee}
              />
              {queryParams.is_employee_active ? (
                <p>Active Employees</p>
              ) : (
                <p>Nonactive Employees</p>
              )}
            </div>
          </div>
          {/* End: Search criteria */}
          <div className={"px-4"}>
            <TableCustomEmployeeList
              rt={rt}
              dataSource={dataEmployees?.data}
              columns={columnEmployee}
              loading={loadingEmployees}
              total={dataRawEmployees?.total}
              queryParams={queryParams}
              setQueryParams={setQueryParams}
            />
          </div>
        </div>
      </div>

      <ModalConnectAccount
        getData={refetchEmployees}
        dataEmployee={dataSelected}
        initProps={initProps}
        visible={showModalConnect}
        onvisible={handleCloseModalConnect}
      />

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
