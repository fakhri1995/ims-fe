import { UpOutlined } from "@ant-design/icons";
import {
  Collapse,
  DatePicker,
  Input,
  Progress,
  Select,
  Spin,
  Table,
  notification,
} from "antd";
import moment from "moment";
import {
  ArrayParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import QueryString from "qs";
import React, { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { useQuery } from "react-query";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  PROJECTS_GET,
  PROJECT_GET,
  PROJECT_STATUSES_GET,
  PROJECT_TASKS_COUNT_GET,
  PROJECT_TASKS_DEADLINE_GET,
  PROJECT_TASKS_GET,
  PROJECT_TASK_ADD,
  PROJECT_TASK_DELETE,
  PROJECT_TASK_GET,
  PROJECT_TASK_STAFF_COUNT_GET,
  PROJECT_TASK_UPDATE,
} from "lib/features";

import { ProjectManagementService } from "../../../apis/project-management";
import ButtonSys from "../../../components/button";
import {
  AdjusmentsHorizontalIconSvg,
  CalendartimeIconSvg,
  ClipboardListIconSvg,
  PlusIconSvg,
  SearchIconSvg,
  UserIconSvg,
} from "../../../components/icon";
import LayoutDashboard from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard-management.module.css";
import ModalProjectTaskCreate from "../../../components/modal/projects/modalProjectTaskCreate";
import ModalProjectTaskDetailUpdate from "../../../components/modal/projects/modalProjectTaskDetailUpdate";
import {
  TableCustomProjectList,
  TableCustomTaskList,
} from "../../../components/table/tableCustom";
import { H1, H2, Label, Text } from "../../../components/typography";
import {
  createKeyPressHandler,
  momentFormatDate,
  permissionWarningNotification,
} from "../../../lib/helper";
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

const TaskAdminIndex = ({ dataProfile, sidemenu, initProps }) => {
  // 1. Init
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetProjects = hasPermission(PROJECTS_GET);
  const isAllowedToGetProject = hasPermission(PROJECT_GET);

  const isAllowedToAddTask = hasPermission(PROJECT_TASK_ADD);
  const isAllowedToGetTask = hasPermission(PROJECT_TASK_GET);
  const isAllowedToUpdateTask = hasPermission(PROJECT_TASK_UPDATE);
  const isAllowedToGetTasks = hasPermission(PROJECT_TASKS_GET);
  const isAllowedToDeleteTask = hasPermission(PROJECT_TASK_DELETE);

  const isAllowedToGetStatuses = hasPermission(PROJECT_STATUSES_GET);

  const isAllowedToGetTaskStatusCount = hasPermission(PROJECT_TASKS_COUNT_GET);
  const isAllowedToGetTaskDeadlineCount = hasPermission(
    PROJECT_TASKS_DEADLINE_GET
  );
  const isAllowedToGetStaffCount = hasPermission(PROJECT_TASK_STAFF_COUNT_GET);

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    status_ids: withDefault(StringParam, undefined),
  });

  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  const pageBreadcrumbValue = useMemo(
    () => [{ name: "Task Admin", hrefValue: "task-admin" }],
    []
  );

  const dataColorBar = [
    "#2F80ED",
    "#BF4A40",
    "#ED962F",
    "#DDB44A",
    "#6AAA70",
    "#808080",
  ];

  // 2. useState
  // 2.1. Charts
  const [taskStatusCount, setTaskStatusCount] = useState([]);
  const [taskTotal, setTaskTotal] = useState(0);
  const [dateFilter, setDateFilter] = useState(false);
  const [dateState, setDateState] = useState({
    from: "",
    to: "",
  });

  // 2.2. Table Projects List (Semua Proyek)
  // filter data
  const [refreshProject, setRefreshProject] = useState(-1);

  // filter search & selected options
  const [searchingFilterTasks, setSearchingFilterTasks] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(undefined);

  // table data
  const [loadingAdd, setLoadingAdd] = useState(true);
  const [dataTasks, setDataTasks] = useState([]);
  const [sortTable, setSortTable] = useState({
    sort_by: undefined,
    sort_type: undefined,
  });

  // 2.3. Modal
  const [modalAddTask, setModalAddTask] = useState(false);
  const [modalDetailTask, setModalDetailTask] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(0);

  // 3. UseQuery & UseEffect
  // 3.1. Get Tasks
  const {
    data: dataRawTasks,
    isLoading: loadingTasks,
    refetch: refetchTasks,
  } = useQuery(
    [PROJECT_TASKS_GET, queryParams],
    () =>
      ProjectManagementService.getAdminTaskList(
        initProps,
        isAllowedToGetTasks,
        queryParams,
        searchingFilterTasks
      ),
    {
      enabled: isAllowedToGetTasks,
      select: (response) => {
        return response.data;
      },
      onSuccess: (data) => {
        setDataTasks(data.data);
      },
    }
  );

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      refetchTasks();
      setQueryParams({ page: 1 });
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchingFilterTasks]);

  // 3.3. Get Project Status List
  const {
    data: dataStatusList,
    isLoading: loadingStatusList,
    refetch: refetchStatusList,
  } = useQuery(
    [PROJECT_STATUSES_GET],
    () =>
      ProjectManagementService.getStatusList(initProps, isAllowedToGetStatuses),
    {
      enabled: isAllowedToGetStatuses,
      select: (response) => {
        return response.data;
      },
    }
  );

  // 3.4. Get Data Chart Status Task
  const { data, isLoading: loadingStatusCount } = useQuery(
    [PROJECT_TASKS_COUNT_GET],
    () =>
      ProjectManagementService.getTaskStatusCount(
        initProps,
        isAllowedToGetTaskStatusCount
      ),
    {
      enabled: isAllowedToGetTaskStatusCount,
      select: (response) => {
        return response.data;
      },
      onSuccess: (data) => {
        setTaskStatusCount(data?.status); // "Status Task" chart's data source
        setTaskTotal(data?.total);
      },
    }
  );

  // 3.5. Get Data Chart Deadline Task
  const { data: dataTaskDeadline, isLoading: loadingDeadlineCount } = useQuery(
    [PROJECT_TASKS_DEADLINE_GET, dateState],
    () =>
      ProjectManagementService.getTaskDeadlineCount(
        initProps,
        isAllowedToGetTaskDeadlineCount,
        dateState.from || dateState.to ? dateState : null
      ),
    {
      enabled: isAllowedToGetTaskDeadlineCount,
      select: (response) => {
        return response.data;
      },
    }
  );

  // 3.6. Get Data Chart Staff
  const { data: staffCount, isLoading: loadingStaffCount } = useQuery(
    [PROJECT_TASK_STAFF_COUNT_GET],
    () =>
      ProjectManagementService.getTaskStaffCount(
        initProps,
        isAllowedToGetStaffCount
      ),
    {
      enabled: isAllowedToGetStaffCount,
      select: (response) => {
        return response.data;
      },
    }
  );

  // 4. Event
  const onFilterTasks = () => {
    setQueryParams({
      sort_by: sortTable.sort_by,
      sort_type: sortTable.sort_type,
      status_ids: selectedStatus,
      page: 1,
    });
  };

  const { onKeyPressHandler } = createKeyPressHandler(onFilterTasks, "Enter");

  const handleAddTask = () => {
    if (!isAllowedToAddTask) {
      permissionWarningNotification("Menambah", "Task");
      return;
    }

    setLoadingAdd(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addProjectTask`, {
      method: `POST`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setCurrentTaskId(response.data?.id);
          setModalAddTask(true);
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan task baru. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingAdd(false));
  };

  const onOpenModalTask = (taskId) => {
    setCurrentTaskId(taskId);
    setModalDetailTask(true);
  };

  // Task Table columns
  const columnTasks = [
    {
      title: "No.",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{Number(dataRawTasks?.from + index)}</>,
        };
      },
    },
    {
      title: "Nomor Task",
      dataIndex: "ticket_number",
      render: (text, record, index) => {
        return {
          children: <>{text}</>,
        };
      },
    },
    {
      title: "Nama Task",
      dataIndex: "task_name",
      render: (text, record, index) => {
        return {
          children: <>{record.name || "-"}</>,
        };
      },

      sorter: isAllowedToGetTasks
        ? (a, b) => a?.name?.toLowerCase() - b?.name?.toLowerCase()
        : false,
    },
    {
      title: "Nama Proyek",
      dataIndex: ["project", "name"],
      render: (text, record, index) => {
        return {
          children: <>{text || "-"}</>,
        };
      },
    },
    {
      title: "Tanggal Mulai",
      dataIndex: "start_date",
      render: (text, record, index) => {
        return {
          children: <>{momentFormatDate(text, "-", "DD MMM YYYY, HH:mm")}</>,
        };
      },
      sorter: isAllowedToGetTasks
        ? (a, b) => a?.start_date - b?.start_date
        : false,
    },
    {
      title: "Tanggal Selesai",
      dataIndex: "end_date",
      render: (text, record, index) => {
        return {
          children: <>{momentFormatDate(text, "-", "DD MMM YYYY, HH:mm")}</>,
        };
      },
      sorter: isAllowedToGetTasks ? (a, b) => a?.end_date - b?.end_date : false,
    },
    {
      title: "Staff",
      dataIndex: "task_staffs",
      render: (taskStaffs, record, index) => {
        return {
          children: (
            <div className="truncate w-28">
              {taskStaffs?.length > 0
                ? taskStaffs.map((user) => user?.name)?.join(", ")
                : "-"}
            </div>
          ),
        };
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (status, record, index) => {
        return {
          children: (
            <p
              className={`rounded-md p-1 text-center`}
              style={{
                backgroundColor: status?.color
                  ? status?.color + "20"
                  : "#E6E6E6",
                color: status?.color ?? "#808080",
              }}
            >
              {status?.name ?? "-"}
            </p>
          ),
        };
      },
      sorter: isAllowedToGetTasks
        ? (a, b) => {
            const dataStatusListIds = dataStatusList?.map(
              (status) => status.id
            );
            const indexA = dataStatusListIds?.indexOf(a.status?.id);
            const indexB = dataStatusListIds?.indexOf(b.status?.id);
            return indexA - indexB;
          }
        : false,
    },
  ];

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      fixedBreadcrumbValues={pageBreadcrumbValue}
    >
      <div className="grid grid-cols-1 gap-6 px-6 md:px-0" id="mainWrapper">
        {/* Statistik Task */}
        <Collapse
          className="shadow-md rounded-md bg-white"
          bordered={false}
          ghost={true}
          expandIconPosition="right"
          expandIcon={({ isActive }) => (
            <UpOutlined rotate={isActive ? 180 : 0} />
          )}
        >
          <Collapse.Panel
            header={
              <div className="mig-heading--4 flex space-x-2 items-center">
                <ClipboardListIconSvg size={32} />
                <p>Statistik Task</p>
              </div>
            }
          >
            {loadingStatusCount || loadingDeadlineCount || loadingStaffCount ? (
              <div className="text-center">
                <Spin />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-3 px-2">
                {/* CARD STATUS TASK */}
                <div className="grid grid-cols-1 shadow-md rounded-md bg-white p-5 gap-6">
                  <h4 className="mig-heading--4 ">Status Task</h4>
                  {/* CHART STATUS TASK */}
                  <div className="flex flex-col items-center">
                    <div className="w-1/2 space-y-4">
                      <Doughnut
                        data={{
                          labels: taskStatusCount?.map((doc) => doc?.name),
                          datasets: [
                            {
                              data: taskStatusCount?.map(
                                (doc) => doc?.project_tasks_count
                              ),
                              backgroundColor: taskStatusCount?.map(
                                (doc, idx) => doc?.color
                              ),
                              borderColor: taskStatusCount?.map(
                                (doc, idx) => doc?.color
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
                          maintainAspectRatio: true,
                          cutout: 50,
                          spacing: 10,
                        }}
                      />

                      <div className="text-center">
                        <h4 className="mig-heading--4 text-primary100">
                          {taskTotal}
                        </h4>
                        <p className="mig-caption--medium text-mono50">
                          Total Task
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* LEGEND STATUS TASK */}
                  <div className="flex flex-wrap gap-4">
                    {taskStatusCount?.map((status, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center space-x-5"
                      >
                        <div className="flex">
                          <div
                            className="w-1 mr-2"
                            style={{
                              backgroundColor: status?.color,
                            }}
                          ></div>
                          <p className="mig-caption--medium text-mono30 whitespace-nowrap">
                            {status?.name || "-"}
                          </p>
                        </div>
                        <p className="font-bold text-right text-mono30">
                          {status?.project_tasks_count || 0}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CARD DEADLINE TASK */}
                <div className="grid grid-cols-1 shadow-md rounded-md bg-white p-5 gap-6">
                  <div className="flex items-center space-x-2 justify-between ">
                    <h4 className="mig-heading--4 text-mono30">
                      Deadline Task Bulan Ini
                    </h4>
                    <div className="flex items-center text-right">
                      <div
                        className=" cursor-pointer"
                        onClick={() => {
                          if (!isAllowedToGetTaskDeadlineCount) {
                            permissionWarningNotification(
                              "Mendapatkan",
                              "Informasi Deadline Task"
                            );
                            return;
                          }
                          setDateFilter((prev) => !prev);
                        }}
                      >
                        <CalendartimeIconSvg color={`#4D4D4D`} size={24} />
                      </div>

                      <DatePicker.RangePicker
                        value={
                          moment(dateState.from).isValid()
                            ? [moment(dateState.from), moment(dateState.to)]
                            : [null, null]
                        }
                        allowEmpty
                        style={{
                          visibility: `hidden`,
                          width: `0`,
                          padding: `0`,
                        }}
                        className="datepickerStatus"
                        open={dateFilter}
                        onOpenChange={setDateFilter}
                        onChange={(dates, datestrings) => {
                          setDateFilter((prev) => !prev);
                          setDateState({
                            from: datestrings[0],
                            to: datestrings[1],
                          });
                        }}
                        renderExtraFooter={() => (
                          <div className=" flex items-center">
                            <p
                              className=" mb-0 text-primary100 hover:text-primary75 cursor-pointer"
                              onClick={() => {
                                setDateFilter((prev) => !prev);
                                setDateState({ from: "", to: "" });
                              }}
                            >
                              Reset
                            </p>
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  {/* CHART DEADLINE TASK*/}
                  {loadingDeadlineCount ? (
                    <Spin />
                  ) : (
                    <div className="">
                      <div className="grid grid-cols-1 mb-6 h-60">
                        <Line
                          data={{
                            labels: [
                              `${
                                moment(
                                  dataTaskDeadline?.date.first_start_date
                                ).isValid()
                                  ? moment(
                                      dataTaskDeadline?.date.first_start_date
                                    )
                                      .locale("id")
                                      .format("Do MMM")
                                  : ""
                              }-${
                                moment(
                                  dataTaskDeadline?.date.first_end_date
                                ).isValid()
                                  ? moment(
                                      dataTaskDeadline?.date.first_end_date
                                    )
                                      .locale("id")
                                      .format("Do MMM")
                                  : ""
                              }`,
                              `${
                                moment(
                                  dataTaskDeadline?.date.second_start_date
                                ).isValid()
                                  ? moment(
                                      dataTaskDeadline?.date.second_start_date
                                    )
                                      .locale("id")
                                      .format("Do MMM")
                                  : ""
                              }-${
                                moment(
                                  dataTaskDeadline?.date.second_end_date
                                ).isValid()
                                  ? moment(
                                      dataTaskDeadline?.date.second_end_date
                                    )
                                      .locale("id")
                                      .format("Do MMM")
                                  : ""
                              }`,
                              `${
                                moment(
                                  dataTaskDeadline?.date.third_start_date
                                ).isValid()
                                  ? moment(
                                      dataTaskDeadline?.date.third_start_date
                                    )
                                      .locale("id")
                                      .format("Do MMM")
                                  : ""
                              }-${
                                moment(
                                  dataTaskDeadline?.date.third_end_date
                                ).isValid()
                                  ? moment(
                                      dataTaskDeadline?.date.third_end_date
                                    )
                                      .locale("id")
                                      .format("Do MMM")
                                  : ""
                              }`,
                            ],
                            datasets: [
                              {
                                data: [
                                  dataTaskDeadline?.deadline
                                    .first_range_deadline,
                                  dataTaskDeadline?.deadline
                                    .second_range_deadline,
                                  dataTaskDeadline?.deadline
                                    .third_range_deadline,
                                ],
                                borderColor: "#35763B",
                                tension: 0.5,
                                fill: false,
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
                            scales: {
                              x: {
                                grid: {
                                  display: false,
                                },
                              },
                              y: {
                                suggestedMin: 0,
                                ticks: {
                                  callback: (value) => {
                                    return Number.isInteger(value) ? value : "";
                                  },
                                },
                                grid: {
                                  display: false,
                                },
                              },
                            },
                          }}
                        />
                      </div>
                      {/* LEGEND DEADLINE TASK */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center space-x-5">
                          <div className="flex">
                            <div
                              className="w-1 mr-2"
                              style={{
                                backgroundColor: `${dataColorBar[0]}`,
                              }}
                            ></div>
                            <p className="mig-caption--medium text-mono30 whitespace-nowrap">
                              Berakhir hari ini
                            </p>
                          </div>
                          <p className="font-bold text-right text-mono30">
                            {dataTaskDeadline?.deadline.today_deadline}
                          </p>
                        </div>
                        <div className="flex justify-between items-center space-x-5">
                          <div className="flex">
                            <div
                              className="w-1 mr-2"
                              style={{
                                backgroundColor: `${dataColorBar[4]}`,
                              }}
                            ></div>
                            <p className="mig-caption--medium text-mono30 whitespace-nowrap">
                              Berakhir besok
                            </p>
                          </div>
                          <p className="font-bold text-right text-mono30">
                            {dataTaskDeadline?.deadline.tomorrow_deadline}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* CARD STAFF */}
                <div className="grid grid-cols-1 gap-6 shadow-md rounded-md bg-white p-5">
                  <h4 className="mig-heading--4 ">Staff</h4>

                  {loadingStaffCount ? (
                    <>
                      <Spin />
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center mb-3 h-40">
                        <Progress
                          type="dashboard"
                          percent={staffCount?.percentage}
                          strokeColor={"#35763B"}
                          strokeWidth={8}
                          width={170}
                          format={(percent) => (
                            <div className=" flex flex-col items-center">
                              <div>
                                <p className="font-bold text-3xl">{percent}%</p>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center">
                          <div className="mb-1 mr-1">
                            <UserIconSvg />
                          </div>
                          <div>
                            <H2>
                              {staffCount?.total_staff_without_task} /{" "}
                              {staffCount?.total_staff}
                            </H2>
                          </div>
                        </div>
                        <div>
                          <p className="mig-caption--medium text-mono50">
                            Staff tidak memiliki task
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center space-x-5 mb-2">
                          <div className="flex">
                            <div
                              className="w-1 mr-2"
                              style={{
                                backgroundColor: `${dataColorBar[0]}`,
                              }}
                            ></div>
                            <p className="mig-caption--medium text-mono30 whitespace-nowrap">
                              Total Staff
                            </p>
                          </div>
                          <p className="font-bold text-right text-mono30">
                            {staffCount?.total_staff}
                          </p>
                        </div>
                        <div className="flex justify-between items-center space-x-5 mb-2">
                          <div className="flex">
                            <div
                              className="w-1 mr-2"
                              style={{
                                backgroundColor: `${dataColorBar[4]}`,
                              }}
                            ></div>
                            <p className="mig-caption--medium text-mono30 whitespace-nowrap">
                              Staff tidak memiliki task
                            </p>
                          </div>
                          <p className="font-bold text-right text-mono30">
                            {staffCount?.total_staff_without_task}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </Collapse.Panel>
        </Collapse>

        {/* Table Task */}
        <div className="shadow-md rounded-md bg-white p-6 mb-6">
          <div className="flex justify-between items-center space-x-4 mb-6">
            <h4 className="mig-heading--4 ">Task</h4>
            <ButtonSys
              type={`primary`}
              onClick={handleAddTask}
              disabled={!isAllowedToAddTask}
            >
              <div className="flex flex-row space-x-2.5 w-full items-center">
                <PlusIconSvg size={15} color={`#ffffff`} />
                <p>Tambah Task</p>
              </div>
            </ButtonSys>
          </div>

          {/* Start: Filter table */}
          <div className="grid grid-cols-2 gap-2 md:flex md:flex-row justify-between w-full items-center mb-4">
            {/* Search by keyword (kata kunci) */}
            <div className="md:w-5/12">
              <Input
                defaultValue={searchingFilterTasks}
                style={{ width: `100%` }}
                placeholder="Kata Kunci.."
                allowClear
                onChange={(e) => {
                  setSearchingFilterTasks(e.target.value);
                }}
                disabled={!isAllowedToGetTasks}
              />
            </div>

            {/* Sort by date */}
            <div className="md:w-3/12">
              <Select
                allowClear
                defaultValue={queryParams.sort_type}
                disabled={!isAllowedToGetTasks}
                placeholder="Urutkan Deadline"
                style={{ width: `100%` }}
                onChange={(value) => {
                  if (!value) {
                    setQueryParams({
                      sort_by: undefined,
                      sort_type: undefined,
                      page: 1,
                    });
                    setSortTable({
                      sort_by: undefined,
                      sort_type: undefined,
                    });
                  } else {
                    setQueryParams({
                      sort_by: "end_date",
                      sort_type: value,
                      page: 1,
                    });
                    setSortTable({ sort_by: "end_date", sort_type: value });
                  }
                }}
                optionFilterProp="children"
              >
                <Select.Option key={0} value={"asc"}>
                  Terdekat
                </Select.Option>
                <Select.Option key={1} value={"desc"}>
                  Terjauh
                </Select.Option>
              </Select>
            </div>

            {/* Filter by statuses (dropdown) */}
            <div className="md:w-3/12">
              <Select
                allowClear
                showSearch
                mode="multiple"
                defaultValue={queryParams.status_ids}
                disabled={!isAllowedToGetTasks}
                placeholder="Semua Status"
                style={{ width: `100%` }}
                onChange={(value) => {
                  const stringStatusIds = value.toString();
                  setQueryParams({ status_ids: stringStatusIds, page: 1 });
                  setSelectedStatus(stringStatusIds);
                }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {dataStatusList?.map((status) => (
                  <Select.Option key={status.id} value={status.id}>
                    {status.name}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <ButtonSys
              type={`primary`}
              onClick={onFilterTasks}
              disabled={!isAllowedToGetTasks}
            >
              <div className="flex flex-row space-x-2.5 w-full items-center">
                <SearchIconSvg size={15} color={`#ffffff`} />
                <p>Cari</p>
              </div>
            </ButtonSys>
          </div>
          {/* End: Filter table */}

          <TableCustomTaskList
            rt={rt}
            dataSource={dataTasks}
            columns={columnTasks}
            loading={loadingTasks}
            total={dataRawTasks?.total}
            queryParams={queryParams}
            setQueryParams={setQueryParams}
            onOpenModal={onOpenModalTask}
            sortTable={sortTable}
          />
        </div>
      </div>

      {/* Modal Task */}
      <AccessControl hasPermission={PROJECT_TASK_ADD}>
        <ModalProjectTaskCreate
          initProps={initProps}
          visible={modalAddTask}
          onvisible={setModalAddTask}
          isAllowedToUpdateTask={isAllowedToUpdateTask}
          isAllowedToDeleteTask={isAllowedToDeleteTask}
          isAllowedToGetProjects={isAllowedToGetProjects}
          isAllowedToGetProject={isAllowedToGetProject}
          dataProfile={dataProfile}
          taskId={currentTaskId}
        />
      </AccessControl>
      <AccessControl hasPermission={PROJECT_TASK_GET}>
        <ModalProjectTaskDetailUpdate
          initProps={initProps}
          visible={modalDetailTask}
          onvisible={setModalDetailTask}
          isAllowedToGetTask={isAllowedToGetTask}
          isAllowedToUpdateTask={isAllowedToUpdateTask}
          isAllowedToDeleteTask={isAllowedToDeleteTask}
          isAllowedToGetProjects={isAllowedToGetProjects}
          isAllowedToGetProject={isAllowedToGetProject}
          isAllowedToGetStatuses={isAllowedToGetStatuses}
          taskId={currentTaskId}
          dataStatusList={dataStatusList}
          isOutsideProject={true}
          refreshProject={refreshProject}
          setRefreshProject={setRefreshProject}
          dataProfile={dataProfile}
        />
      </AccessControl>
    </LayoutDashboard>
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
      sidemenu: "projects/task-admin",
    },
  };
}

export default TaskAdminIndex;
