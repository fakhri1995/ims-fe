import { UpOutlined } from "@ant-design/icons";
import {
  Collapse,
  DatePicker,
  Input,
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

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  PROJECTS_GET,
  PROJECT_ADD,
  PROJECT_DELETE,
  PROJECT_GET,
  PROJECT_STATUSES_GET,
  PROJECT_STATUS_ADD,
  PROJECT_STATUS_DELETE,
  PROJECT_STATUS_GET,
  PROJECT_STATUS_UPDATE,
  PROJECT_TASKS_GET,
  PROJECT_TASK_ADD,
  PROJECT_TASK_DELETE,
  PROJECT_TASK_GET,
  PROJECT_TASK_UPDATE,
  PROJECT_UPDATE,
} from "lib/features";

import ButtonSys from "../../../components/button";
import {
  AdjusmentsHorizontalIconSvg,
  CalendartimeIconSvg,
  ClipboardListIconSvg,
  PlusIconSvg,
  SearchIconSvg,
} from "../../../components/icon";
import st from "../../../components/layout-dashboard.module.css";
import LayoutDashboard from "../../../components/layout-dashboardNew";
import ModalProjectTaskCreate from "../../../components/modal/projects/modalProjectTaskCreate";
import ModalProjectTaskDetailUpdate from "../../../components/modal/projects/modalProjectTaskDetailUpdate";
import {
  TableCustomProjectList,
  TableCustomTaskList,
} from "../../../components/table/tableCustom";
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
  const isAllowedToGetStatus = hasPermission(PROJECT_STATUS_GET);

  // TODO: change constant below
  const isAllowedToGetTaskStatusCount = true;
  const isAllowedToGetTaskDeadlineCount = true;

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
  const [loadingChart, setLoadingChart] = useState(false);
  const [taskStatusCount, setTaskStatusCount] = useState([
    {
      task_status: "Open",
      task_status_count: 24,
    },
    {
      task_status: "On Progress",
      task_status_count: 10,
    },
    {
      task_status: "Overdue",
      task_status_count: 4,
    },
    {
      task_status: "Closed",
      task_status_count: 24,
    },
    {
      task_status: "On Hold",
      task_status_count: 10,
    },
    {
      task_status: "Canceled",
      task_status_count: 4,
    },
  ]);

  const [dataTaskDeadline, setDataTaskDeadline] = useState({
    deadline: {
      today_deadline: 0,
      tomorrow_deadline: 0,
      first_range_deadline: 0,
      second_range_deadline: 0,
      third_range_deadline: 0,
    },
    date: {
      first_start_date: "",
      first_end_date: "",
      second_start_date: "",
      second_end_date: "",
      third_start_date: "",
      third_end_date: "",
    },
  });
  const [dateFilter, setDateFilter] = useState(false);
  const [dateState, setDateState] = useState({
    from: "",
    to: "",
  });

  // 2.2. Table Projects List (Semua Proyek)
  // filter data
  const [refreshTasks, setRefreshTasks] = useState(-1);
  const [loadingStatusList, setLoadingStatusList] = useState(false);
  const [dataStatusList, setDataStatusList] = useState([]);

  // filter search & selected options
  const [searchingFilterTasks, setSearchingFilterTasks] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(undefined);

  // table data
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [dataTasks, setDataTasks] = useState([]);
  const [dataRawTasks, setDataRawTasks] = useState({
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

  // 2.3. Modal
  const [modalAddTask, setModalAddTask] = useState(false);
  const [modalDetailTask, setModalDetailTask] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(0);

  // 3. UseEffect
  // 3.1. Get Tasks
  useEffect(() => {
    if (!isAllowedToGetTasks) {
      permissionWarningNotification("Mendapatkan", "Data Tabel Task");
      setLoadingTasks(false);
      return;
    }

    const params = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const fetchData = async () => {
      setLoadingTasks(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectTasksAdmin${params}&keyword=${searchingFilterTasks}`,
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
            setDataRawTasks(res2.data);
            setDataTasks(res2.data.data);
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
          setLoadingTasks(false);
        });
    };
    const timer = setTimeout(() => fetchData(), 500);

    return () => clearTimeout(timer);
  }, [
    isAllowedToGetTasks,
    refreshTasks,
    searchingFilterTasks,
    queryParams.page,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
    queryParams.status_ids,
  ]);

  // 3.3. Get Project Status List
  useEffect(() => {
    if (!isAllowedToGetStatuses) {
      permissionWarningNotification("Mendapatkan", "Daftar Status Proyek");
      setLoadingStatusList(false);
      return;
    }

    setLoadingStatusList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectStatuses`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataStatusList(res2.data);
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
        setLoadingStatusList(false);
      });
  }, [isAllowedToGetStatuses]);

  // 3.4. Get Data Chart Status Task
  // TODO: uncomment if API is done
  // useEffect(() => {
  //   if (!isAllowedToGetTaskStatusCount) {
  //     setLoadingChart(false);
  //     return;
  //   }

  //   setLoadingChart(true);
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectStatusCount`, {
  //     method: `GET`,
  //     headers: {
  //       Authorization: JSON.parse(initProps),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res2) => {
  //       setTaskStatusCount(res2.data); // "Status Proyek" chart's data source
  //     })
  //     .catch((err) =>
  //       notification.error({
  //         message: "Gagal mendapatkan data statistik status proyek",
  //         duration: 3,
  //       })
  //     )
  //     .finally(() => setLoadingChart(false));
  // }, [isAllowedToGetTaskStatusCount]);

  // 3.5. Get Data Chart Deadline Task
  // TODO: uncomment if API is done
  // useEffect(() => {
  //   if (!isAllowedToGetTaskDeadlineCount) {
  //     setLoadingChart(false);
  //     return;
  //   }

  //   setLoadingChart(true);
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectDeadlines`, {
  //     method: `GET`,
  //     headers: {
  //       Authorization: JSON.parse(initProps),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res2) => {
  //       setDataTaskDeadline(res2.data); // "Deadline Proyek Bulan Ini" chart's data source
  //     }).catch((err) => notification.error({
  //       message: "Gagal mendapatkan data statistik deadline proyek",
  //       duration: 3,
  //     }))
  //     .finally(() => setLoadingChart(false));
  // }, [isAllowedToGetTaskDeadlineCount]);

  // 4. Event
  const onFilterTasks = () => {
    setQueryParams({
      status_ids: selectedStatus,
    });
  };

  const { onKeyPressHandler } = createKeyPressHandler(onFilterTasks, "Enter");

  const handleGetTaskDeadlineCount = (fromDate = "", toDate = "") => {
    if (!isAllowedToGetTaskDeadlineCount) {
      setLoadingChart(false);
      return;
    }

    setLoadingChart(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getDeadlineProjects?from=${fromDate}&to=${toDate}`,
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
          setDateState({
            from: fromDate,
            to: toDate,
          });
          setDataTaskDeadline(res2.data);
          setLoadingChart(false);
        } else {
          notification["error"]({
            message: `Gagal mendapatkan data statistik deadline proyek. ${res2?.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) =>
        notification["error"]({
          message: `Gagal mendapatkan data statistik deadline proyek. ${err?.message}`,
          duration: 3,
        })
      )
      .finally(() => setLoadingChart(false));
  };

  const handleAddTask = () => {
    if (!isAllowedToAddTask) {
      permissionWarningNotification("Menambah", "Task");
      return;
    }

    setLoadingTasks(true);
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
          notification.success({
            message: response.message,
            duration: 3,
          });
          setRefreshTasks((prev) => prev + 1);
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
      .finally(() => setLoadingTasks(false));
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
          children: <>{dataRawTasks?.from + index}</>,
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
      dataIndex: "name",
      sorter: isAllowedToGetTasks
        ? (a, b) => a.name?.toLowerCase().localeCompare(b.name?.toLowerCase())
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
        ? (a, b) => a.start_date.localeCompare(b.start_date)
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
      sorter: isAllowedToGetTasks
        ? (a, b) => a.end_date.localeCompare(b.end_date)
        : false,
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
      <div className="grid grid-cols-1 gap-6 px-4 md:px-5" id="mainWrapper">
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
            {loadingChart ? (
              <div className="text-center">
                <Spin />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-3 px-2">
                {/* CHART STATUS TASK */}
                <div className="grid grid-cols-1 gap-6 shadow-md rounded-md bg-white p-5">
                  <h4 className="mig-heading--4 ">Status Task</h4>
                  <div className="flex flex-col items-center">
                    <div className="w-1/2">
                      <Doughnut
                        data={{
                          labels: taskStatusCount?.map(
                            (doc) => doc?.task_status
                          ),
                          datasets: [
                            {
                              data: taskStatusCount?.map(
                                (doc) => doc?.task_status_count
                              ),
                              backgroundColor: taskStatusCount?.map(
                                (doc, idx) =>
                                  dataColorBar[
                                    idx + (1 % dataColorBar.length) - 1
                                  ]
                              ),
                              borderColor: taskStatusCount?.map(
                                (doc, idx) =>
                                  dataColorBar[
                                    idx + (1 % dataColorBar.length) - 1
                                  ]
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

                      <span className="text-center mt-2">
                        <h4 className="mig-heading--4 text-primary100">
                          2.320
                        </h4>
                        <p className="mig-caption--medium text-mono50">
                          Total Proyek
                        </p>
                      </span>
                    </div>
                  </div>

                  {/* LEGEND STATUS PROYEK */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {taskStatusCount?.map((status, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center space-x-5"
                      >
                        <div className="flex">
                          <div
                            className="w-1 mr-2"
                            style={{
                              backgroundColor: `${
                                dataColorBar[
                                  idx + (1 % dataColorBar.length) - 1
                                ]
                              }`,
                            }}
                          ></div>
                          <p className="mig-caption--medium text-mono30 whitespace-nowrap">
                            {status.task_status || "-"}
                          </p>
                        </div>
                        <p className="font-bold text-right text-mono30">
                          {status.task_status_count}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CHART DEADLINE TASK */}
                <div className="grid grid-cols-1 shadow-md rounded-md bg-white p-5">
                  <div className="flex items-center space-x-2 justify-between mb-4">
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
                        onChange={(dates, datestrings) => {
                          setDateFilter((prev) => !prev);
                          handleGetTaskDeadlineCount(
                            datestrings[0],
                            datestrings[1]
                          );
                        }}
                        renderExtraFooter={() => (
                          <div className=" flex items-center">
                            <p
                              className=" mb-0 text-primary100 hover:text-primary75 cursor-pointer"
                              onClick={() => {
                                setDateFilter((prev) => !prev);
                                handleGetTaskDeadlineCount();
                              }}
                            >
                              Reset
                            </p>
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  {/* CHART */}
                  {loadingChart ? (
                    <Spin />
                  ) : (
                    <div className="">
                      <div className="grid grid-cols-1 mb-4">
                        <Line
                          data={{
                            labels: [
                              `${
                                moment(
                                  dataTaskDeadline.date.first_start_date
                                ).isValid()
                                  ? moment(
                                      dataTaskDeadline.date.first_start_date
                                    )
                                      .locale("id")
                                      .format("Do MMM")
                                  : ""
                              }-${
                                moment(
                                  dataTaskDeadline.date.first_end_date
                                ).isValid()
                                  ? moment(dataTaskDeadline.date.first_end_date)
                                      .locale("id")
                                      .format("Do MMM")
                                  : ""
                              }`,
                              `${
                                moment(
                                  dataTaskDeadline.date.second_start_date
                                ).isValid()
                                  ? moment(
                                      dataTaskDeadline.date.second_start_date
                                    )
                                      .locale("id")
                                      .format("Do MMM")
                                  : ""
                              }-${
                                moment(
                                  dataTaskDeadline.date.second_end_date
                                ).isValid()
                                  ? moment(
                                      dataTaskDeadline.date.second_end_date
                                    )
                                      .locale("id")
                                      .format("Do MMM")
                                  : ""
                              }`,
                              `${
                                moment(
                                  dataTaskDeadline.date.third_start_date
                                ).isValid()
                                  ? moment(
                                      dataTaskDeadline.date.third_start_date
                                    )
                                      .locale("id")
                                      .format("Do MMM")
                                  : ""
                              }-${
                                moment(
                                  dataTaskDeadline.date.third_end_date
                                ).isValid()
                                  ? moment(dataTaskDeadline.date.third_end_date)
                                      .locale("id")
                                      .format("Do MMM")
                                  : ""
                              }`,
                            ],
                            datasets: [
                              {
                                data: [
                                  dataTaskDeadline.deadline
                                    .first_range_deadline,
                                  dataTaskDeadline.deadline
                                    .second_range_deadline,
                                  dataTaskDeadline.deadline
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
                                grid: {
                                  display: false,
                                },
                              },
                            },
                          }}
                        />
                      </div>
                      <div className="flex justify-between items-center space-x-5">
                        <div className="flex">
                          <div
                            className="w-1 mr-2"
                            style={{
                              backgroundColor: `${
                                dataColorBar[0 + (1 % dataColorBar.length) - 1]
                              }`,
                            }}
                          ></div>
                          <p className="mig-caption--medium text-mono30 whitespace-nowrap">
                            Berakhir hari ini
                          </p>
                        </div>
                        <p className="font-bold text-right text-mono30">
                          {dataTaskDeadline.deadline.today_deadline}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* CHART STAFF */}
                <div className="grid grid-cols-1 gap-8 shadow-md rounded-md bg-white p-5"></div>
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
              onClick={() => setModalAddTask(true)}
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
                    });
                  } else {
                    setQueryParams({ sort_by: "end_date", sort_type: value });
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
                  setQueryParams({ status_ids: stringStatusIds });
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
          />
        </div>
      </div>

      {/* Modal Task */}
      <AccessControl hasPermission={PROJECT_TASK_ADD}>
        <ModalProjectTaskCreate
          initProps={initProps}
          visible={modalAddTask}
          onvisible={setModalAddTask}
          isAllowedToAddTask={isAllowedToAddTask}
          isAllowedToGetProjects={isAllowedToGetProjects}
          isAllowedToGetProject={isAllowedToGetProject}
          setRefreshTasks={setRefreshTasks}
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
          setRefreshTasks={setRefreshTasks}
          taskId={currentTaskId}
          dataStatusList={dataStatusList}
          isOutsideProject={true}
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
