import {
  CaretDownOutlined,
  CaretUpOutlined,
  DownloadOutlined,
  UpOutlined,
} from "@ant-design/icons";
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
import { useQuery } from "react-query";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  PROJECTS_COUNT_GET,
  PROJECTS_DEADLINE_GET,
  PROJECTS_EXPORT,
  PROJECTS_GET,
  PROJECT_ADD,
  PROJECT_CATEGORIES_GET,
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

import { ProjectService } from "apis/project";

import { ProjectManagementService } from "../../apis/project-management";
import ButtonSys from "../../components/button";
import TaskCard from "../../components/cards/project/TaskCard";
import {
  AdjusmentsHorizontalIconSvg,
  CalendartimeIconSvg,
  ClipboardListIconSvg,
  DownloadIconSvg,
  PlusIconSvg,
  SearchIconSvg,
} from "../../components/icon";
import st from "../../components/layout-dashboard.module.css";
import LayoutDashboard from "../../components/layout-dashboardNew";
import ModalProjectCreate from "../../components/modal/projects/modalProjectCreate";
import ModalProjectTaskCreate from "../../components/modal/projects/modalProjectTaskCreate";
import ModalProjectTaskDetailUpdate from "../../components/modal/projects/modalProjectTaskDetailUpdate";
import ModalStatusManage from "../../components/modal/projects/modalStatusManage";
import { TableCustomProjectList } from "../../components/table/tableCustom";
import {
  createKeyPressHandler,
  downloadFile,
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

const ProjectIndex = ({ dataProfile, sidemenu, initProps }) => {
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
  const isAllowedToAddProject = hasPermission(PROJECT_ADD);
  const isAllowedToUpdateProject = hasPermission(PROJECT_UPDATE);
  const isAllowedToDeleteProject = hasPermission(PROJECT_DELETE);
  const isAllowedToExportProjects = hasPermission(PROJECTS_EXPORT);

  const isAllowedToAddTask = hasPermission(PROJECT_TASK_ADD);
  const isAllowedToGetTask = hasPermission(PROJECT_TASK_GET);
  const isAllowedToUpdateTask = hasPermission(PROJECT_TASK_UPDATE);
  const isAllowedToGetTasks = hasPermission(PROJECT_TASKS_GET);
  const isAllowedToDeleteTask = hasPermission(PROJECT_TASK_DELETE);

  const isAllowedToGetStatuses = hasPermission(PROJECT_STATUSES_GET);
  const isAllowedToGetStatus = hasPermission(PROJECT_STATUS_GET);
  const isAllowedToAddStatus = hasPermission(PROJECT_STATUS_ADD);
  const isAllowedToEditStatus = hasPermission(PROJECT_STATUS_UPDATE);
  const isAllowedToDeleteStatus = hasPermission(PROJECT_STATUS_DELETE);

  const isAllowedToGetProjectStatusCount = hasPermission(PROJECTS_COUNT_GET);
  const isAllowedToGetProjectDeadlineCount = hasPermission(
    PROJECTS_DEADLINE_GET
  );

  const isAllowedToGetTagList = hasPermission(PROJECT_CATEGORIES_GET);
  const axiosClient = useAxiosClient();
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    from: withDefault(StringParam, undefined),
    to: withDefault(StringParam, undefined),
    status_ids: withDefault(StringParam, undefined),
    category_ids: withDefault(StringParam, undefined),
  });

  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  const pageBreadcrumbValue = useMemo(
    () => [{ name: "Manajemen Proyek", hrefValue: "/projects" }],
    []
  );

  const { showtaskid } = rt.query;

  // 2. useState
  // 2.1. Charts
  const [projectStatusCount, setProjectStatusCount] = useState([]);
  const [projectTotalCount, setProjectTotalCount] = useState(0);
  const [dateFilter, setDateFilter] = useState(false);
  const [dateState, setDateState] = useState({
    from: "",
    to: "",
  });

  // 2.2. Table Projects List (Semua Proyek)
  // filter search & selected options
  const [searchingFilterProjects, setSearchingFilterProjects] = useState("");
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(undefined);
  const [selectedCategory, setSelectedCategory] = useState(undefined);

  // table data
  const [loading, setLoading] = useState(true);
  const [dataProjects, setDataProjects] = useState([]);
  // const [dataRawProjects, setDataRawProjects] = useState({
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

  // 2.3. My Task List (Task Saya)
  const [dataMyTaskList, setDataMyTaskList] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [pageMyTaskList, setPageMyTaskList] = useState(1);
  const [rowsMyTaskList, setRowsMyTaskList] = useState(4);
  const [sortColumn, setSortColumn] = useState("deadline");
  const [sortOrder, setSortOrder] = useState("asc");

  // 2.4. Modal
  const [modalAddProject, setModalAddProject] = useState(false);
  const [modalAddTask, setModalAddTask] = useState(false);
  const [modalDetailTask, setModalDetailTask] = useState(false);
  const [modalManageStatus, setModalManageStatus] = useState(false);

  const [currentProject, setCurrentProject] = useState({});
  const [currentTaskId, setCurrentTaskId] = useState(0);

  // 3. UseEffect
  // 3.1. Get Projects
  const {
    data: dataRawProjects,
    isLoading: loadingProjects,
    refetch: refetchProjects,
  } = useQuery(
    [PROJECTS_GET, queryParams],
    () =>
      ProjectManagementService.getProjects(
        initProps,
        isAllowedToGetProjects,
        queryParams,
        searchingFilterProjects
      ),
    {
      enabled: isAllowedToGetProjects,
      select: (response) => {
        return response.data;
      },
      onSuccess: (data) => {
        setDataProjects(data.data);
      },
    }
  );

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      refetchProjects();
      setQueryParams({ page: 1 });
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchingFilterProjects]);

  // 3.2. Get project list
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

  // 3.4. Get My Task List
  const taskListParams = {
    user_id: dataProfile?.data?.id,
    rows: rowsMyTaskList,
    page: pageMyTaskList,
    sort_by: sortColumn,
    sort_type: sortOrder,
  };
  const {
    data: dataRawMyTaskList,
    isLoading: loadingMyTaskList,
    refetch: refetchMyTaskList,
  } = useQuery(
    [PROJECT_TASKS_GET, taskListParams],
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
        setDataMyTaskList(data.data);
      },
    }
  );

  // 3.5. Get Data Chart Status Proyek
  const { data, isLoading: loadingStatusCount } = useQuery(
    [PROJECTS_COUNT_GET],
    () =>
      ProjectManagementService.getProjectStatusCount(
        initProps,
        isAllowedToGetProjectStatusCount
      ),
    {
      enabled: isAllowedToGetProjectStatusCount,
      select: (response) => {
        return response.data;
      },
      onSuccess: (data) => {
        setProjectStatusCount(data?.status); // "Status Proyek" chart's data source
        setProjectTotalCount(data?.total);
      },
    }
  );

  // 3.6. Get Data Chart Deadline Proyek
  const { data: dataProjectDeadline, isLoading: loadingDeadlineCount } =
    useQuery(
      [PROJECTS_DEADLINE_GET, dateState],
      () =>
        ProjectManagementService.getProjectDeadlineCount(
          initProps,
          isAllowedToGetProjectDeadlineCount,
          dateState
        ),
      {
        enabled: isAllowedToGetProjectDeadlineCount,
        select: (response) => {
          return response.data;
        },
      }
    );

  // 3.7. Get Project Category List
  const { data: dataCategoryList, isLoading: loadingCategoryList } = useQuery(
    [PROJECT_CATEGORIES_GET],
    () =>
      ProjectManagementService.getProjectCategoryList(
        initProps,
        isAllowedToGetTagList
      ),
    {
      enabled: isAllowedToGetTagList,
      select: (response) => {
        return response.data;
      },
    }
  );

  // 3.8. Update number of rows in task table based on the device width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 820) {
        setRowsMyTaskList(3); // Set smaller page size for smaller devices
      } else {
        setRowsMyTaskList(4); // Set default page size for larger devices
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 3.9. Show modal task from notification (URL: /projects?showtaskid=[taskId])
  useEffect(() => {
    if (showtaskid) {
      setCurrentTaskId(showtaskid);
      setModalDetailTask(true);
    }
  }, [showtaskid]);

  // 4. Event
  const onFilterProjects = () => {
    setQueryParams({
      from: selectedFromDate,
      to: selectedToDate,
      status_ids: selectedStatus,
      category_ids: selectedCategory,
      page: 1,
    });
  };
  const exportExcelProject = async () => {
    const { file, fileName } = await ProjectService.exportExcelData(
      axiosClient
    );
    downloadFile(file, fileName);

    notification.success({
      message: `Berhasil mengunduh file ${fileName}`,
    });
  };
  const { onKeyPressHandler } = createKeyPressHandler(
    onFilterProjects,
    "Enter"
  );

  const handleAddProject = () => {
    if (!isAllowedToAddProject) {
      permissionWarningNotification("Menambah", "Proyek");
      return;
    }

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addProject`, {
      method: `POST`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setCurrentProject(response.data);
          setModalAddProject(true);
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan proyek baru. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

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

  // "Semua Proyek" Table columns
  const columnProjects = [
    {
      title: "No.",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{Number(dataRawProjects?.from + index)}</>,
        };
      },
    },
    {
      title: "Nama",
      dataIndex: "name",
      sorter: isAllowedToGetProjects
        ? (a, b) => a.name?.toLowerCase()?.localeCompare(b.name?.toLowerCase())
        : false,
    },
    {
      title: "Diajukan oleh",
      dataIndex: "proposed_bys",
      render: (proposedBys, record, index) => {
        return {
          children: (
            <div className="truncate w-28">
              {proposedBys?.map((user) => user?.name)?.join(", ")}
            </div>
          ),
        };
      },
    },
    {
      title: "Tanggal Mulai",
      dataIndex: "start_date",
      render: (text, record, index) => {
        return {
          children: <>{momentFormatDate(text, "-", "DD MMM YYYY")}</>,
        };
      },
      sorter: isAllowedToGetProjects
        ? (a, b) => a?.start_date?.localeCompare(b?.start_date)
        : false,
    },
    {
      title: "Ekspektasi Selesai",
      dataIndex: "end_date",
      render: (text, record, index) => {
        return {
          children: <>{momentFormatDate(text, "-", "DD MMM YYYY")}</>,
        };
      },
      sorter: isAllowedToGetProjects
        ? (a, b) => a?.end_date?.localeCompare(b?.end_date)
        : false,
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
      sorter: isAllowedToGetProjects
        ? (a, b) => {
            const dataStatusListIds = dataStatusList?.map(
              (status) => status.id
            );
            const indexA = dataStatusListIds?.indexOf(a?.status?.id);
            const indexB = dataStatusListIds?.indexOf(b?.status?.id);
            return indexA - indexB;
          }
        : false,
    },
  ];

  // Table Semua Proyek
  const TableProjectSection = (
    <div className="shadow-md rounded-md bg-white p-4 mb-6">
      <h4 className="mig-heading--4 mb-6">Semua Proyek</h4>

      {/* Start: Filter table */}
      <div className="grid grid-cols-2 gap-2 md:flex md:flex-row justify-between w-full items-center mb-4">
        {/* Search by keyword (kata kunci) */}
        <div className="md:w-2/12">
          <Input
            defaultValue={searchingFilterProjects}
            style={{ width: `100%` }}
            placeholder="Kata Kunci.."
            allowClear
            onChange={(e) => {
              setSearchingFilterProjects(e.target.value);
            }}
            disabled={!isAllowedToGetProjects}
          />
        </div>

        {/* Filter by date */}
        <div className="md:w-4/12">
          <DatePicker.RangePicker
            allowClear
            allowEmpty
            value={
              selectedFromDate === ""
                ? [null, null]
                : [moment(queryParams.from), moment(queryParams.to)]
            }
            placeholder={["Tanggal Mulai", "Tanggal Selesai"]}
            disabled={!isAllowedToGetProjects}
            style={{ width: `100%` }}
            onChange={(dates, datestrings) => {
              setQueryParams({
                from: datestrings[0],
                to: datestrings[1],
                page: 1,
              });
              setSelectedFromDate(datestrings[0]);
              setSelectedToDate(datestrings[1]);
            }}
          />
        </div>

        {/* Filter by statuses (dropdown) */}
        <div className="md:w-2/12">
          <Select
            allowClear
            showSearch
            mode="multiple"
            defaultValue={queryParams.status_ids}
            disabled={!isAllowedToGetProjects}
            placeholder="Semua Status"
            style={{ width: `100%` }}
            onChange={(value) => {
              const stringStatusIds = value?.toString();
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

        {/* Filter by category (dropdown) */}
        <div className="md:w-2/12">
          <Select
            allowClear
            showSearch
            mode="multiple"
            defaultValue={queryParams.category_ids}
            disabled={!isAllowedToGetTagList}
            placeholder="Semua Tag"
            style={{ width: `100%` }}
            onChange={(value) => {
              const stringCategoryIds = value?.toString();
              setQueryParams({ category_ids: stringCategoryIds, page: 1 });
              setSelectedStatus(stringCategoryIds);
            }}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option.children ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {dataCategoryList?.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </div>

        <ButtonSys
          type={`primary`}
          onClick={onFilterProjects}
          disabled={!isAllowedToGetProjects}
        >
          <div className="flex flex-row space-x-2.5 w-full items-center">
            <SearchIconSvg size={15} color={`#ffffff`} />
            <p>Cari</p>
          </div>
        </ButtonSys>
      </div>
      {/* End: Filter table */}

      <TableCustomProjectList
        rt={rt}
        dataSource={dataProjects}
        columns={columnProjects}
        loading={loadingProjects}
        total={dataRawProjects?.total}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
      />
    </div>
  );

  // Sorting table Task Saya
  const handleSortTasks = () => {
    if (sortColumn === "deadline") {
      setSortColumn("status");
      setSortOrder("asc");
    }

    if (sortColumn === "status") {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else {
        setSortColumn("deadline");
        setSortOrder("asc");
      }
    }
  };

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
        className="grid grid-cols-1 xl:grid-cols-6 gap-6 px-4 md:px-5"
        id="mainWrapper"
      >
        <div className="flex flex-col xl:col-span-4 gap-6">
          {/* Statistik Proyek */}
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
                  <p>Statistik Proyek</p>
                </div>
              }
            >
              {loadingDeadlineCount || loadingStatusCount ? (
                <div className="text-center">
                  <Spin />
                </div>
              ) : (
                <div className="grid grid-cols-6 xl:grid-cols-12 gap-6 py-3 px-2">
                  {/* CARD STATUS PROYEK */}
                  <div className="col-span-6 md:col-span-4 xl:col-span-6">
                    <div className="grid grid-cols-1 shadow-md rounded-md bg-white p-5">
                      <h4 className="mig-heading--4 mb-4">Status Proyek</h4>
                      <div className="w-9/12 xl:w-7/12 flex mx-auto">
                        <Doughnut
                          data={{
                            labels: projectStatusCount?.map((doc) => doc?.name),
                            datasets: [
                              {
                                data: projectStatusCount?.map(
                                  (doc) => doc?.projects_count
                                ),
                                backgroundColor: projectStatusCount?.map(
                                  (doc, idx) => doc?.color
                                ),
                                borderColor: projectStatusCount?.map(
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
                      <div className="text-md flex justify-between items-center mt-4">
                        <p className="text-mono30 font-semibold">
                          Total Proyek Saya
                        </p>
                        <p className="text-primary100 font-bold">
                          {projectTotalCount}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CARD DEADLINE PROYEK BULAN INI */}
                  <div className="grid order-last xl:order-none col-span-6 xl:col-span-6 shadow-md rounded-md p-5 bg-white">
                    <div className="flex items-center space-x-2 justify-between mb-4">
                      <h4 className="mig-heading--4 text-mono30">
                        Deadline Proyek Bulan Ini
                      </h4>
                      <div className="flex items-center text-right">
                        <div
                          className=" cursor-pointer"
                          onClick={() => {
                            if (!isAllowedToGetProjectDeadlineCount) {
                              permissionWarningNotification(
                                "Mendapatkan",
                                "Informasi Deadline Proyek"
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
                          picker="month"
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
                      <div>
                        <div className="grid grid-cols-1 mb-4">
                          <Line
                            data={{
                              labels: dataProjectDeadline?.map(
                                (deadline) => deadline?.year_month_str
                              ),
                              datasets: [
                                {
                                  data: dataProjectDeadline?.map(
                                    (deadline) => deadline?.total
                                  ),
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
                                    display: true,
                                  },
                                },
                              },
                            }}
                          />
                        </div>
                        <div className="flex flex-row justify-between items-center space-x-2 mb-1 ">
                          <h5 className="mig-caption--medium text-mono30">
                            Proyek yang berakhir bulan ini
                          </h5>
                          <h5 className="font-bold text-mono30 text-right">
                            {dataProjectDeadline?.find((project) => {
                              const today = new Date();
                              const todayMonth = today.getMonth(); // today's month in number, start from 0
                              return project.month === todayMonth + 1;
                            })?.total ?? "0"}
                          </h5>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* LEGEND STATUS PROYEK */}
                  <div className="flex flex-wrap col-span-6 md:col-span-2 xl:col-span-12 gap-4 xl:justify-between">
                    {projectStatusCount?.map((status, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center space-x-5"
                      >
                        <div className="flex">
                          <div
                            className="w-1 mr-2"
                            style={{
                              backgroundColor: `${status?.color}`,
                            }}
                          ></div>
                          <p className="mig-caption--medium text-mono30 whitespace-nowrap">
                            {status.name || "-"}
                          </p>
                        </div>
                        <p className="font-bold text-right text-mono30">
                          {status.projects_count}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Collapse.Panel>
          </Collapse>

          {/* Table Semua Proyek */}
          <div className="hidden xl:block">{TableProjectSection}</div>
        </div>

        <div className="grid grid-cols-2 xl:flex flex-col xl:col-span-2 gap-6">
          {/* Tambah Proyek Baru */}
          <div className="col-span-2 md:col-span-1 xl:col-span-2">
            <button
              onClick={handleAddProject}
              className="mig-platform--p-0 px-4 py-2 w-full flex space-x-2 items-center text-white bg-primary100 disabled:bg-gray-200 hover:bg-primary75 overflow-hidden"
              disabled={!isAllowedToAddProject}
            >
              <PlusIconSvg color={"#ffffff"} size={32} />
              <p className="font-bold text-sm text-left">Tambah Proyek Baru</p>
            </button>
          </div>

          {/* Kelola Status Task & Proyek */}
          <div className="flex gap-6 justify-between col-span-2 md:col-span-1 xl:col-span-2">
            <button
              onClick={() => setModalManageStatus(true)}
              className="mig-platform--p-0 px-4 py-2 w-[85%] flex space-x-2 items-center text-white bg-mono50 disabled:bg-gray-200 hover:bg-opacity-75 overflow-hidden"
              disabled={!isAllowedToEditStatus}
            >
              <AdjusmentsHorizontalIconSvg color={"#ffffff"} size={32} />
              <p className="font-bold text-xs text-left">
                Kelola Status Task & Proyek
              </p>
            </button>
            <button
              onClick={() => exportExcelProject()}
              className="mig-platform--p-0 px-4 py-2 w-[10%] flex space-x-2 items-center justify-center bg-primary100 disabled:bg-gray-200 hover:bg-opacity-75 overflow-hidden"
              disabled={!isAllowedToExportProjects}
            >
              <DownloadIconSvg size={24} color={"#ffffff"} />
            </button>
          </div>

          {/* Task Saya */}
          <div className="col-span-2 flex flex-col shadow-md rounded-md bg-white mb-2 xl:mb-6">
            <Table
              rowKey={(record) => record.id}
              className="tableProjectTask p-2"
              dataSource={dataMyTaskList}
              loading={loadingMyTaskList}
              pagination={{
                current: pageMyTaskList,
                pageSize: rowsMyTaskList,
                total: dataRawMyTaskList?.total,
              }}
              onChange={(pagination, filters, sorter) => {
                const sortTypePayload =
                  sorter.order === "ascend"
                    ? "asc"
                    : sorter.order === "descend"
                    ? "desc"
                    : "asc";

                setPageMyTaskList(pagination.current);
                setSortOrder(sortTypePayload);
              }}
              columns={[
                {
                  title: () => (
                    <div
                      onClick={handleSortTasks}
                      className="flex flex-col xl:flex-row xl:justify-between xl:items-center 
                      xl:space-x-2 space-y-2 xl:space-y-0 "
                    >
                      <div className="flex space-x-3 items-center">
                        <h4 className="mig-heading--4 ">Task Saya</h4>
                        <span className="flex flex-col -space-y-1">
                          <CaretUpOutlined
                            className="mr-1"
                            style={{
                              color:
                                sortColumn === "status" && sortOrder === "asc"
                                  ? "#1890ff"
                                  : "#00000060",
                            }}
                          />
                          <CaretDownOutlined
                            className="mr-1"
                            style={{
                              color:
                                sortColumn === "status" && sortOrder === "desc"
                                  ? "#1890ff"
                                  : "#00000060",
                            }}
                          />
                        </span>
                      </div>
                      <ButtonSys
                        type={"primary"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddTask();
                        }}
                        disabled={!isAllowedToAddTask}
                      >
                        <div className="flex items-center space-x-2">
                          <PlusIconSvg size={16} color={"#ffffff"} />
                          <p>Tambah Task Saya</p>
                        </div>
                      </ButtonSys>
                    </div>
                  ),
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
                          idTask={task.id}
                          taskId={task?.ticket_number}
                          projectName={currentProject?.name}
                          toDate={task?.end_date}
                          status={task?.status}
                          taskStaffs={task.task_staffs}
                          initProps={initProps}
                          dataProfile={dataProfile}
                          onClick={() => {
                            setCurrentTaskId(task.id);
                            setModalDetailTask(true);
                          }}
                        />
                      </div>
                    );
                  },
                  sorter: isAllowedToGetTasks
                    ? (a, b) => {
                        const dataStatusListIds = dataStatusList?.map(
                          (status) => status.id
                        );
                        const indexA = dataStatusListIds?.indexOf(a.status_id);
                        const indexB = dataStatusListIds?.indexOf(b.status_id);
                        return indexA - indexB;
                      }
                    : false,
                },
              ]}
            />
          </div>
          {/* </div> */}
        </div>

        {/* Table Semua Proyek (in mobile layout)*/}
        <div className="block xl:hidden">{TableProjectSection}</div>
      </div>

      {/* Modal Project */}
      <AccessControl hasPermission={PROJECT_ADD}>
        <ModalProjectCreate
          initProps={initProps}
          visible={modalAddProject}
          onvisible={setModalAddProject}
          isAllowedToUpdateProject={isAllowedToUpdateProject}
          isAllowedToDeleteProject={isAllowedToDeleteProject}
          currentProject={currentProject}
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
          isAddMyTask={true}
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
          dataProfile={dataProfile}
        />
      </AccessControl>

      {/* Modal Status */}
      <AccessControl hasPermission={PROJECT_STATUS_UPDATE}>
        <ModalStatusManage
          initProps={initProps}
          visible={modalManageStatus}
          onvisible={setModalManageStatus}
          isAllowedToAddStatus={isAllowedToAddStatus}
          isAllowedToEditStatus={isAllowedToEditStatus}
          isAllowedToGetStatus={isAllowedToGetStatus}
          isAllowedToDeleteStatus={isAllowedToDeleteStatus}
          currentStatusList={dataStatusList}
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
      sidemenu: "projects",
    },
  };
}

export default ProjectIndex;
