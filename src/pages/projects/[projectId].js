import { UpOutlined } from "@ant-design/icons";
import {
  Avatar,
  Collapse,
  DatePicker,
  Input,
  Select,
  Spin,
  Table,
  Tag,
  Tooltip,
  notification,
} from "antd";
import parse from "html-react-parser";
import moment from "moment";
import {
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
import { useQuery, useQueryClient } from "react-query";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  PROJECTS_GET,
  PROJECT_DELETE,
  PROJECT_GET,
  PROJECT_STATUSES_GET,
  PROJECT_TASKS_COUNT_GET,
  PROJECT_TASKS_DEADLINE_GET,
  PROJECT_TASKS_GET,
  PROJECT_TASK_ADD,
  PROJECT_TASK_DELETE,
  PROJECT_TASK_GET,
  PROJECT_TASK_UPDATE,
  PROJECT_UPDATE,
} from "lib/features";

import { ProjectManagementService } from "../../apis/project-management";
import ButtonSys from "../../components/button";
import TaskCard from "../../components/cards/project/TaskCard";
import {
  CalendartimeIconSvg,
  ClipboardListIconSvg,
  EditSquareIconSvg,
  PlusIconSvg,
  SearchIconSvg,
} from "../../components/icon";
import st from "../../components/layout-dashboard.module.css";
import LayoutDashboard from "../../components/layout-dashboardNew";
import ModalProjectTaskCreate from "../../components/modal/projects/modalProjectTaskCreate";
import ModalProjectTaskDetailUpdate from "../../components/modal/projects/modalProjectTaskDetailUpdate";
import ModalProjectUpdate from "../../components/modal/projects/modalProjectUpdate";
import ModalStaffList from "../../components/modal/projects/modalStaffList";
import LogsSection from "../../components/screen/project/LogsSection";
import NotesSection from "../../components/screen/project/NotesSection";
import { PROJECT_LOGS_GET } from "../../lib/features";
import {
  createKeyPressHandler,
  generateStaticAssetUrl,
  momentFormatDate,
  permissionWarningNotification,
} from "../../lib/helper";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  TooltipChart,
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

const ProjectDetailIndex = ({
  dataProfile,
  sidemenu,
  initProps,
  projectId,
}) => {
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
  const isAllowedToUpdateProject = hasPermission(PROJECT_UPDATE);
  const isAllowedToDeleteProject = hasPermission(PROJECT_DELETE);

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

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 6),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ "deadline"),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    status_ids: withDefault(StringParam, undefined),
  });

  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  const queryClient = useQueryClient();

  const dataColorBar = [
    "#2F80ED",
    "#BF4A40",
    "#ED962F",
    "#DDB44A",
    "#6AAA70",
    "#808080",
  ];

  // 2. useState
  const [refresh, setRefresh] = useState(-1); // use for all data project data

  // 2.1. Charts
  const [taskStatusCount, setTaskStatusCount] = useState([]);
  const [taskTotal, setTaskTotal] = useState(0);

  // const [dataTaskDeadline, setDataTaskDeadline] = useState({
  //   deadline: {
  //     today_deadline: 0,
  //     tomorrow_deadline: 0,
  //     first_range_deadline: 0,
  //     second_range_deadline: 0,
  //     third_range_deadline: 0,
  //   },
  //   date: {
  //     first_start_date: "",
  //     first_end_date: "",
  //     second_start_date: "",
  //     second_end_date: "",
  //     third_start_date: "",
  //     third_end_date: "",
  //   },
  // });
  const [dateFilter, setDateFilter] = useState(false);
  const [dateState, setDateState] = useState({
    from: "",
    to: "",
  });

  // 2.2. Table Task List
  // filter data
  // const [loadingStatusList, setLoadingStatusList] = useState(false);
  // const [dataStatusList, setDataStatusList] = useState([]);

  // filter search & selected options
  const [searchingFilterTasks, setSearchingFilterTasks] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(undefined);
  const [selectedSortType, setSelectedSortType] = useState(undefined);

  // table data
  const [loadingAdd, setLoadingAdd] = useState(true);
  const [dataTasks, setDataTasks] = useState([]);
  const [dataRowClicked, setDataRowClicked] = useState({});

  // 2.3. Project Detail
  const [dataProject, setDataProject] = useState({});
  const [loadingProject, setLoadingProject] = useState(false);
  const [currentStatus, setCurrentStatus] = useState({});

  // 2.4. Modal
  const [modalUpdateProject, setModalUpdateProject] = useState(false);
  const [modalStaffs, setModalStaffs] = useState(false);
  const [modalAddTask, setModalAddTask] = useState(false);
  const [modalDetailTask, setModalDetailTask] = useState(false);

  // const [dataProjectList, setDataProjectList] = useState([]);
  const [currentTaskId, setCurrentTaskId] = useState(0);

  // 3. UseEffect
  // 3.1. Get project list
  const { data: dataProjectList } = useQuery(
    [PROJECTS_GET],
    () =>
      ProjectManagementService.getProjectList(
        initProps,
        isAllowedToGetProjects
      ),
    {
      enabled: isAllowedToGetProjects,
      select: (response) => {
        return response.data;
      },
    }
  );

  // 3.2. Get Project Status List
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

  // 3.3. Get Project
  const { data: project, refetch: refetchProject } = useQuery(
    [PROJECT_GET, projectId],
    () =>
      ProjectManagementService.getProject(
        initProps,
        isAllowedToGetProject,
        projectId
      ),
    {
      enabled: isAllowedToGetProject,
      select: (response) => {
        return response.data;
      },
      onSuccess: (data) => {
        setDataProject(data);
      },
    }
  );

  // 3.4. Get current status object
  useEffect(() => {
    const status = dataStatusList?.find(
      (status) => status.id === dataProject?.status_id
    );
    setCurrentStatus(status);
  }, [dataStatusList, dataProject?.status_id]);

  // 3.5. Get Task List
  const taskListParams = {
    ...queryParams,
    project_id: projectId,
    keyword: searchingFilterTasks,
  };

  const {
    data: dataRawTasks,
    isLoading: loadingTasks,
    refetch: refetchTasks,
  } = useQuery(
    [PROJECT_TASKS_GET, queryParams, projectId],
    () =>
      ProjectManagementService.getTaskList(
        initProps,
        isAllowedToGetTasks,
        taskListParams
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

  // 3.6. Get Data Chart Status Task
  const statusParams = {
    project_id: projectId,
  };
  const { data, isLoading: loadingStatusCount } = useQuery(
    [PROJECT_TASKS_COUNT_GET, statusParams],
    () =>
      ProjectManagementService.getTaskStatusCount(
        initProps,
        isAllowedToGetTaskStatusCount,
        statusParams
      ),
    {
      enabled: isAllowedToGetTaskStatusCount,
      select: (response) => {
        return response.data;
      },
      onSuccess: (data) => {
        setTaskStatusCount(data?.status); // "Status Proyek" chart's data source
        setTaskTotal(data?.total);
      },
    }
  );

  // 3.7. Get Data Chart Deadline Task
  const { data: dataTaskDeadline, isLoading: loadingDeadlineCount } = useQuery(
    [PROJECT_TASKS_DEADLINE_GET, dateState, projectId],
    () =>
      ProjectManagementService.getTaskDeadlineCount(
        initProps,
        isAllowedToGetTaskDeadlineCount,
        dateState.from || dateState.to ? dateState : null,
        projectId
      ),
    {
      enabled: isAllowedToGetTaskDeadlineCount,
      select: (response) => {
        return response.data;
      },
    }
  );

  // 3.8. Update number of rows in task table based on the device width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 820) {
        setQueryParams({ rows: 3 }); // Set smaller page size for smaller devices
      } else {
        setQueryParams({ rows: 6 }); // Set default page size for larger devices
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 4. Event
  const onFilterTasks = () => {
    setQueryParams({
      sort_by: "deadline",
      sort_type: selectedSortType,
      status_ids: selectedStatus,
      page: 1,
    });
  };

  const { onKeyPressHandler } = createKeyPressHandler(onFilterTasks, "Enter");

  const handleUpdateProjectStatus = (statusId) => {
    if (!isAllowedToUpdateProject) {
      permissionWarningNotification("Mengubah", "Status Proyek");
      return;
    }

    const payload = {
      id: dataProject?.id,
      status_id: statusId,
    };

    setLoadingProject(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateProject_status`, {
      method: `PUT`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          notification.success({
            message: response.message,
            duration: 3,
          });
          queryClient.invalidateQueries(PROJECT_LOGS_GET);
          refetchProject();
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengubah status proyek. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingProject(false));
  };

  const handleAddTask = () => {
    if (!isAllowedToAddTask) {
      permissionWarningNotification("Menambah", "Task");
      return;
    }

    const payload = {
      project_id: projectId,
    };

    setLoadingAdd(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addProjectTask`, {
      method: `POST`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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

  // String of project staffs for project detail
  const lastIndexStaff = dataProject?.project_staffs?.length - 1;
  let staffsString =
    dataProject?.project_staffs?.length > 3
      ? dataProject?.project_staffs
          ?.slice(0, 3)
          ?.map((staff) => staff.name)
          ?.join(", ")
      : dataProject?.project_staffs
          ?.map((staff, index) =>
            index !== lastIndexStaff ? staff.name : null
          )
          ?.join(", ");

  const pageBreadcrumbValue = useMemo(
    () => [
      { name: "Manajemen Proyek", hrefValue: "/projects" },
      { name: dataProject?.name, hrefValue: `/projects/${projectId}` },
    ],
    [dataProject?.name]
  );

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      fixedBreadcrumbValues={pageBreadcrumbValue}
    >
      <div
        className="grid grid-cols-1 gap-4 lg:gap-6 px-6 md:px-0"
        id="mainWrapper"
      >
        {/* Statistik Task Proyek */}
        <div className="flex flex-col">
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
                  <p>Statistik Proyek {dataProject?.name}</p>
                </div>
              }
            >
              {loadingStatusCount || loadingDeadlineCount ? (
                <div className="text-center">
                  <Spin />
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-3 px-2">
                  {/* CHART STATUS TASK */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 shadow-md rounded-md bg-white p-5">
                    <div className="grid grid-cols-1">
                      <h4 className="mig-heading--4 mb-4">Status Task</h4>
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
                          cutout: 60,
                          spacing: 10,
                        }}
                      />
                    </div>

                    {/* LEGEND STATUS TASK */}
                    <div className="grid gap-4">
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
                              {status.name || "-"}
                            </p>
                          </div>
                          <p className="font-bold text-right text-mono30">
                            {status.project_tasks_count || 0}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CHART DEADLINE TASK BULAN INI */}
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

                    {/* CHART */}
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
                                    dataTaskDeadline?.date?.first_start_date
                                  ).isValid()
                                    ? moment(
                                        dataTaskDeadline?.date?.first_start_date
                                      )
                                        .locale("id")
                                        .format("Do MMM")
                                    : ""
                                }-${
                                  moment(
                                    dataTaskDeadline?.date?.first_end_date
                                  ).isValid()
                                    ? moment(
                                        dataTaskDeadline?.date?.first_end_date
                                      )
                                        .locale("id")
                                        .format("Do MMM")
                                    : ""
                                }`,
                                `${
                                  moment(
                                    dataTaskDeadline?.date?.second_start_date
                                  ).isValid()
                                    ? moment(
                                        dataTaskDeadline?.date
                                          ?.second_start_date
                                      )
                                        .locale("id")
                                        .format("Do MMM")
                                    : ""
                                }-${
                                  moment(
                                    dataTaskDeadline?.date?.second_end_date
                                  ).isValid()
                                    ? moment(
                                        dataTaskDeadline?.date?.second_end_date
                                      )
                                        .locale("id")
                                        .format("Do MMM")
                                    : ""
                                }`,
                                `${
                                  moment(
                                    dataTaskDeadline?.date?.third_start_date
                                  ).isValid()
                                    ? moment(
                                        dataTaskDeadline?.date?.third_start_date
                                      )
                                        .locale("id")
                                        .format("Do MMM")
                                    : ""
                                }-${
                                  moment(
                                    dataTaskDeadline?.date?.third_end_date
                                  ).isValid()
                                    ? moment(
                                        dataTaskDeadline?.date?.third_end_date
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
                                      ?.first_range_deadline,
                                    dataTaskDeadline?.deadline
                                      ?.second_range_deadline,
                                    dataTaskDeadline?.deadline
                                      ?.third_range_deadline,
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
                                      return Number.isInteger(value)
                                        ? value
                                        : "";
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
                              {dataTaskDeadline?.deadline?.today_deadline}
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
                              {dataTaskDeadline?.deadline?.tomorrow_deadline}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Collapse.Panel>
          </Collapse>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">
          {/* Detail, Log, Catatan Proyek */}
          <div className="lg:w-5/12 xl:w-2/6 flex flex-col gap-4 lg:gap-6">
            {/* Detail */}
            <Collapse
              className="shadow-md rounded-md bg-white"
              bordered={false}
              ghost={true}
              defaultActiveKey={1}
              expandIconPosition="right"
              expandIcon={({ isActive }) => (
                <UpOutlined rotate={isActive ? 180 : 0} />
              )}
            >
              <Collapse.Panel
                key={1}
                header={
                  <div className="mig-heading--4 flex space-x-2 items-center">
                    <p>Detail Proyek {dataProject?.name}</p>
                  </div>
                }
              >
                <Spin spinning={loadingProject}>
                  <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                    <div>
                      <p className="text-mono30 font-bold mb-2">
                        Diajukan oleh:
                      </p>
                      <div>
                        {dataProject?.proposed_bys?.length > 1 ? (
                          <div className="flex items-center">
                            <Avatar.Group
                              size={30}
                              maxCount={3}
                              className="cursor-help"
                              maxStyle={{
                                color: "#f56a00",
                                backgroundColor: "#fde3cf",
                              }}
                            >
                              {dataProject?.proposed_bys?.map((staff) => (
                                <Tooltip
                                  key={staff.id}
                                  title={staff?.name}
                                  placement="top"
                                >
                                  <Avatar
                                    src={generateStaticAssetUrl(
                                      staff?.profile_image?.link ??
                                        "staging/Users/default_user.png"
                                    )}
                                    className=""
                                    size={30}
                                  />
                                </Tooltip>
                              ))}
                            </Avatar.Group>
                          </div>
                        ) : dataProject?.proposed_bys?.length > 0 ? (
                          <div className="flex items-center space-x-2">
                            <img
                              src={generateStaticAssetUrl(
                                dataProject?.proposed_bys?.[0]?.profile_image
                                  ?.link ?? "staging/Users/default_user.png"
                              )}
                              alt={
                                dataProject?.proposed_bys?.[0]?.profile_image
                                  ?.description
                              }
                              className="w-8 h-8 bg-cover object-cover rounded-full"
                            />
                            <p className={`mig-caption--medium text-mono50`}>
                              {dataProject?.proposed_bys?.[0]?.name}
                            </p>
                          </div>
                        ) : (
                          <div>-</div>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="mig-caption--bold mb-2">Status:</p>
                      <div>
                        <Select
                          allowClear
                          value={dataProject?.status_id}
                          disabled={!isAllowedToGetStatuses}
                          placeholder="Ubah Status"
                          onChange={(value) => {
                            setDataProject((prev) => ({
                              ...prev,
                              status_id: value,
                            }));
                            handleUpdateProjectStatus(value);
                          }}
                          optionFilterProp="children"
                          bordered={false}
                          className="mig-caption--bold bg-transparent hover:opacity-75 
                        rounded-md px-2 py-1 "
                          style={{
                            backgroundColor: currentStatus?.color
                              ? currentStatus?.color + "20"
                              : "#E6E6E6",
                            color: currentStatus?.color ?? "#808080",
                          }}
                        >
                          {dataStatusList?.map((item) => (
                            <Select.Option
                              key={item?.id}
                              value={item?.id}
                              style={{
                                backgroundColor:
                                  (item?.color ?? "#E6E6E6") + "20",
                                color: item?.color ?? "#808080",
                              }}
                              className="rounded-md px-4 py-2 m-2"
                            >
                              {item?.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div>
                      <p className="mig-caption--bold mb-2">Tanggal Dimulai:</p>
                      <p className="text-mono50">
                        {momentFormatDate(dataProject?.start_date, "-")}
                      </p>
                    </div>
                    <div>
                      <p className="mig-caption--bold mb-2">
                        Ekspektasi Tanggal Selesai:
                      </p>
                      <p className="text-mono50">
                        {momentFormatDate(dataProject?.end_date, "-")}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-mono30 font-bold mb-2">
                        Staff Proyek:
                      </p>
                      <div className="flex items-center space-x-2">
                        {dataProject?.project_staffs?.length > 1 ? (
                          <div onClick={() => setModalStaffs(true)}>
                            <Avatar.Group
                              size={30}
                              maxCount={3}
                              className="cursor-pointer"
                              maxStyle={{
                                color: "#f56a00",
                                backgroundColor: "#fde3cf",
                              }}
                            >
                              {dataProject?.project_staffs?.map((staff) => (
                                <Avatar
                                  key={staff.id}
                                  src={generateStaticAssetUrl(
                                    staff?.profile_image?.link ??
                                      "staging/Users/default_user.png"
                                  )}
                                  size={30}
                                />
                              ))}
                            </Avatar.Group>
                            {dataProject?.project_staffs?.length > 3 ? (
                              <p className="text-secondary100">
                                <strong>{staffsString}, </strong>
                                dan{" "}
                                <strong>
                                  {dataProject?.project_staffs?.length - 3}{" "}
                                  lainnya{" "}
                                </strong>
                                merupakan staff proyek ini.
                              </p>
                            ) : (
                              <p className="text-secondary100">
                                <strong>{staffsString}</strong> dan{" "}
                                <strong>
                                  {
                                    dataProject?.project_staffs?.[
                                      lastIndexStaff
                                    ]?.name
                                  }
                                </strong>{" "}
                                merupakan staff proyek ini.
                              </p>
                            )}
                          </div>
                        ) : dataProject?.project_staffs?.length > 0 ? (
                          <div className="flex space-x-2 items-center">
                            <img
                              src={generateStaticAssetUrl(
                                dataProject?.project_staffs?.[0]?.profile_image
                                  ?.link ?? "staging/Users/default_user.png"
                              )}
                              alt={"Profile image"}
                              className="w-8 h-8 bg-cover object-cover rounded-full"
                            />

                            <p className={`mig-caption--medium text-mono50`}>
                              {dataProject?.project_staffs?.[0]?.name}
                            </p>
                          </div>
                        ) : (
                          <div>-</div>
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-mono30 font-bold mb-2">Deskripsi:</p>
                      <div className="text-mono50">
                        {dataProject?.description
                          ? parse(dataProject?.description)
                          : "-"}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-mono30 font-bold mb-2">Tag:</p>
                      <div className="flex flex-wrap">
                        {dataProject?.categories?.length
                          ? dataProject?.categories?.map((tag) => (
                              <Tag
                                key={tag?.id}
                                color="#35763B1A"
                                className="text-primary100 mb-3"
                              >
                                {tag?.name}
                              </Tag>
                            ))
                          : "-"}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <ButtonSys
                        type={"primary"}
                        fullWidth={true}
                        size={"large"}
                        onClick={() => setModalUpdateProject(true)}
                        disabled={!isAllowedToUpdateProject}
                      >
                        <div className="flex space-x-2 items-center ">
                          <EditSquareIconSvg size={24} color={"#ffffff"} />
                          <p>Edit Detail Proyek</p>
                        </div>
                      </ButtonSys>
                    </div>
                  </div>
                </Spin>
              </Collapse.Panel>
            </Collapse>

            {/* Log */}
            <LogsSection
              initProps={initProps}
              projectId={projectId}
              projectName={dataProject?.name}
            />

            {/* Catatan */}
            <NotesSection
              initProps={initProps}
              projectId={projectId}
              projectName={dataProject?.name}
            />
          </div>

          {/* Task Proyek */}
          <div className="lg:w-7/12 xl:w-4/6">
            <div className=" shadow-md rounded-md bg-white">
              <div
                className="flex flex-row justify-between items-center 
               mb-4 lg:mb-6 p-4 pb-0"
              >
                <h4 className="mig-heading--4 ">
                  Task Proyek {dataProject?.name}
                </h4>
                <ButtonSys
                  type={"primary"}
                  onClick={handleAddTask}
                  disabled={!isAllowedToAddTask}
                >
                  <div className="flex items-center space-x-2">
                    <PlusIconSvg size={16} color={"#ffffff"} />
                    <p>Tambah Task Baru</p>
                  </div>
                </ButtonSys>
              </div>

              {/* Start: Filter table */}
              <div className="grid grid-cols-2 gap-2 md:flex md:flex-row justify-between w-full items-center p-4">
                {/* Search by keyword (kata kunci) */}
                <div className="md:w-3/12">
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
                <div className="md:w-5/12">
                  <Select
                    allowClear
                    defaultValue={queryParams.sort_type}
                    disabled={!isAllowedToGetTasks}
                    placeholder="Urutkan Deadline"
                    style={{ width: `100%` }}
                    onChange={(value) => {
                      setQueryParams({
                        sort_by: "deadline",
                        sort_type: value,
                        page: 1,
                      });
                      setSelectedSortType(value);
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

              <Table
                rowKey={(record) => record.id}
                className="px-2"
                showHeader={false}
                dataSource={dataTasks}
                loading={loadingTasks}
                pagination={{
                  current: queryParams.page,
                  pageSize: queryParams.rows,
                  total: dataRawTasks?.total,
                  showSizeChanger: true,
                }}
                onChange={(pagination, filters, sorter, extra) => {
                  const sortTypePayload =
                    sorter.order === "ascend"
                      ? "asc"
                      : sorter.order === "descend"
                      ? "desc"
                      : undefined;

                  setQueryParams({
                    sort_type: sortTypePayload,
                    sort_by:
                      sortTypePayload === undefined ? undefined : sorter.field,
                    page: pagination.current,
                    rows: pagination.pageSize,
                  });
                }}
                columns={[
                  {
                    title: "Task",
                    dataIndex: "name",
                    key: "name",
                    render: (_, task) => {
                      const currentProject = dataProjectList?.find(
                        (project) => project.id === task.project_id
                      );

                      return (
                        <div key={task.id} className="flex-none rounded-md ">
                          <TaskCard
                            title={task?.name}
                            idTask={task?.id}
                            initProps={initProps}
                            taskId={task?.ticket_number}
                            projectName={currentProject?.name}
                            toDate={task?.end_date}
                            status={task?.status}
                            taskStaffs={task?.task_staffs}
                            dataProfile={dataProfile}
                            onClick={() => {
                              setCurrentTaskId(task?.id);
                              setModalDetailTask(true);
                            }}
                          />
                        </div>
                      );
                    },
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Project */}
      <AccessControl hasPermission={PROJECT_UPDATE}>
        <ModalProjectUpdate
          initProps={initProps}
          visible={modalUpdateProject}
          onvisible={setModalUpdateProject}
          isAllowedToUpdateProject={isAllowedToUpdateProject}
          isAllowedToDeleteProject={isAllowedToDeleteProject}
          dataProject={dataProject}
          dataStatusList={dataStatusList}
        />
      </AccessControl>

      <AccessControl hasPermission={PROJECT_GET}>
        <ModalStaffList
          visible={modalStaffs}
          onvisible={setModalStaffs}
          dataStaffs={dataProject?.project_staffs}
          taskName={dataProject?.name}
        />
      </AccessControl>

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
          defaultProject={dataProject}
          taskId={currentTaskId}
          refreshProject={refresh}
          setRefreshProject={setRefresh}
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
          refreshProject={refresh}
          setRefreshProject={setRefresh}
          dataProfile={dataProfile}
        />
      </AccessControl>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const projectId = params.projectId;
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
      sidemenu: "projects",
      projectId,
    },
  };
}

export default ProjectDetailIndex;
