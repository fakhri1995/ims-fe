import { UpOutlined } from "@ant-design/icons";
import { Collapse, DatePicker, Input, Select, Table, notification } from "antd";
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

import ButtonSys from "../../components/button";
import TaskCard from "../../components/cards/project/TaskCard";
import { ChartDoughnut } from "../../components/chart/chartCustom";
import {
  AdjusmentsHorizontalIconSvg,
  ClipboardListIconSvg,
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
  momentFormatDate,
  permissionWarningNotification,
} from "../../lib/helper";
import httpcookie from "cookie";

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

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    from: withDefault(StringParam, undefined),
    to: withDefault(StringParam, undefined),
    status_ids: withDefault(ArrayParam, undefined),
    keyword: withDefault(StringParam, undefined),
  });

  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  const pageBreadcrumbValue = useMemo(
    () => [{ name: "Manajemen Proyek", hrefValue: "/projects" }],
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
  const [projectStatusCount, setProjectStatusCount] = useState([
    {
      project_status: "Open",
      project_status_count: 24,
    },
    {
      project_status: "On Progress",
      project_status_count: 10,
    },
    {
      project_status: "Overdue",
      project_status_count: 4,
    },
    {
      project_status: "Closed",
      project_status_count: 24,
    },
    {
      project_status: "On Hold",
      project_status_count: 10,
    },
    {
      project_status: "Canceled",
      project_status_count: 4,
    },
  ]);

  // 2.2. Table Projects List
  // filter data
  const [loadingStatusList, setLoadingStatusList] = useState(false);
  const [dataStatusList, setDataStatusList] = useState([]);

  // filter search & selected options
  const [searchingFilterProjects, setSearchingFilterProjects] =
    useState(undefined);
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(undefined);

  // table data
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [dataProjects, setDataProjects] = useState([]);
  const [dataRawProjects, setDataRawProjects] = useState({
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

  // 2.3. My Task List
  const [dataRawMyTaskList, setDataRawMyTaskList] = useState({});
  const [dataMyTaskList, setDataMyTaskList] = useState([]);
  const [loadingMyTaskList, setLoadingMyTaskList] = useState(false);
  const [dataProjectList, setDataProjectList] = useState([]);
  const [pageMyTaskList, setPageMyTaskList] = useState(1);

  // 2.4. Modal
  const [modalAddProject, setModalAddProject] = useState(false);
  const [modalAddTask, setModalAddTask] = useState(false);
  const [modalDetailTask, setModalDetailTask] = useState(false);
  const [modalManageStatus, setModalManageStatus] = useState(false);

  const [currentTaskId, setCurrentTaskId] = useState(0);

  // 3. UseEffect
  // 3.1. Get Projects
  useEffect(() => {
    if (!isAllowedToGetProjects) {
      permissionWarningNotification("Mendapatkan", "Data Tabel Proyek");
      setLoadingProjects(false);
      return;
    }

    const params = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    setLoadingProjects(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjects${params}`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataRawProjects(res2.data);
          setDataProjects(res2.data.data);
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
        setLoadingProjects(false);
      });
  }, [
    isAllowedToGetProjects,
    refresh,
    queryParams.page,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
    queryParams.keyword,
    queryParams.status_ids,
    queryParams.from,
    queryParams.to,
  ]);

  // 3.2. Get project list
  useEffect(() => {
    if (!isAllowedToGetProjects) {
      permissionWarningNotification("Mendapatkan", "Daftar Proyek");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectsList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataProjectList(res2.data);
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
      });
  }, [isAllowedToGetProjects, refresh]);

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
  }, [isAllowedToGetStatuses, refresh]);

  // 3.4. Get My Task List
  useEffect(() => {
    if (!isAllowedToGetStatuses) {
      permissionWarningNotification("Mendapatkan", "Daftar Task Saya");
      setLoadingMyTaskList(false);
      return;
    }

    setLoadingMyTaskList(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectTasks?user_id=${dataProfile?.data?.id}&rows=4&page=${pageMyTaskList}`,
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
          setDataRawMyTaskList(res2.data);
          setDataMyTaskList(res2.data.data);
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
        setLoadingMyTaskList(false);
      });
  }, [isAllowedToGetTasks, refresh, pageMyTaskList]);

  // 4. Event
  const onFilterProjects = () => {
    setQueryParams({
      keyword: searchingFilterProjects,
      from: selectedFromDate,
      to: selectedToDate,
      status_ids: selectedStatus,
    });
  };

  const { onKeyPressHandler } = createKeyPressHandler(
    onFilterProjects,
    "Enter"
  );

  // "Semua Proyek" Table columns
  const columnProjects = [
    {
      title: "No.",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{dataRawProjects?.from + index}</>,
        };
      },
    },
    {
      title: "Nama",
      dataIndex: "name",
      sorter: isAllowedToGetProjects
        ? (a, b) => a.name?.toLowerCase() > b.name?.toLowerCase()
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
          children: <>{momentFormatDate(text, "-", "DD MMM YYYY, HH:mm")}</>,
        };
      },
    },
    {
      title: "Ekspektasi Selesai",
      dataIndex: "end_date",
      render: (text, record, index) => {
        return {
          children: <>{momentFormatDate(text, "-", "DD MMM YYYY, HH:mm")}</>,
        };
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, record, index) => {
        // const currentStatus = dataStatusList.find(
        //   (status) => status.id === text
        // );
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
    },
  ];

  const TableProjectSection = (
    <div className="shadow-md rounded-md bg-white p-4 mb-6">
      <h4 className="mig-heading--4 mb-6">Semua Proyek</h4>

      {/* Start: Filter table */}
      <div className="grid grid-cols-2 gap-2 md:flex md:flex-row justify-between w-full items-center mb-4">
        {/* Search by keyword (kata kunci) */}
        <div className="md:w-3/12">
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
              setSearchingFilterProjects(e.target.value);
            }}
            onKeyPress={onKeyPressHandler}
            disabled={!isAllowedToGetProjects}
          />
        </div>

        {/* Filter by date */}
        <div className="md:w-5/12">
          <DatePicker.RangePicker
            allowClear
            allowEmpty
            showTime={{
              format: "HH:mm",
            }}
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
              });
              setSelectedFromDate(datestrings[0]);
              setSelectedToDate(datestrings[1]);
            }}
          />
        </div>

        {/* Filter by statuses (dropdown) */}
        <div className="md:w-3/12">
          <Select
            allowClear
            showSearch
            mode="multiple"
            defaultValue={queryParams.status_ids}
            disabled={!isAllowedToGetProjects}
            placeholder="Semua Status"
            style={{ width: `100%` }}
            onChange={(value) => {
              setQueryParams({ status_ids: value });
              setSelectedStatus(value);
            }}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option.children ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {dataStatusList.map((status) => (
              <Select.Option key={status.id} value={status.id}>
                {status.name}
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
      <div>
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
    </div>
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
        className="grid grid-cols-1 md:grid-cols-6 gap-6 px-4 md:px-5"
        id="mainWrapper"
      >
        <div className="flex flex-col md:col-span-4 gap-6">
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
              {/* CHART STATUS PROYEK */}
              {loadingChart ? (
                <Spin />
              ) : (
                <div className="grid md:grid-cols-3 gap-2 lg:gap-6">
                  <ChartDoughnut
                    title={"Status Proyek"}
                    dataChart={projectStatusCount}
                    objName={"project_status"}
                    value={"project_status_count"}
                    customLegend={
                      <div className="text-md flex justify-between items-center mt-4">
                        <p className="text-mono30 font-semibold">
                          Total Proyek Saya
                        </p>
                        <p className="text-primary100 font-bold">20</p>
                      </div>
                    }
                  />
                  <div className="grid md:col-span-2 grid-cols-2 gap-2 lg:gap-6">
                    {projectStatusCount.map((status, idx) => (
                      <div
                        key={status.project_status}
                        className="grid grid-cols-4 items-center shadow-md rounded-md bg-white p-5 text-left"
                      >
                        <ClipboardListIconSvg
                          size={36}
                          color={
                            dataColorBar[idx + (1 % dataColorBar.length) - 1]
                          }
                        />
                        <div className="flex flex-col text-right col-span-3">
                          <p className="text-lg font-bold text-mono30">
                            {status.project_status_count}
                          </p>
                          <p className="text-mono50">{status.project_status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Collapse.Panel>
          </Collapse>

          {/* Table Semua Proyek */}
          <div className="hidden md:block">{TableProjectSection}</div>
        </div>

        <div className="grid grid-cols-2 md:flex flex-col md:col-span-2 gap-6">
          {/* Tambah Proyek Baru */}
          <div className="">
            <button
              onClick={() => setModalAddProject(true)}
              className="mig-platform--p-0 px-4 py-2 w-full flex space-x-2 items-center text-white bg-primary100 disabled:bg-gray-200 hover:bg-primary75 overflow-hidden"
            >
              <PlusIconSvg color={"#ffffff"} size={32} />
              <p className="font-bold text-sm">Tambah Proyek Baru</p>
            </button>
          </div>

          {/* Kelola Status Task & Proyek */}
          <div className="">
            <button
              onClick={() => setModalManageStatus(true)}
              className="mig-platform--p-0 px-4 py-2 w-full flex space-x-2 items-center text-white bg-mono50 disabled:bg-gray-200 hover:bg-opacity-75 overflow-hidden"
            >
              <AdjusmentsHorizontalIconSvg color={"#ffffff"} size={32} />
              <p className="font-bold text-sm">Kelola Status Task & Proyek</p>
            </button>
          </div>

          {/* Task Saya */}
          <div className="col-span-2 flex flex-col shadow-md rounded-md bg-white mb-2 xl:mb-6">
            <div
              className="flex flex-col xl:flex-row xl:justify-between xl:items-center 
              space-y-2 xl:space-y-0 mb-4 xl:mb-6 p-4 pb-0"
            >
              <h4 className="mig-heading--4 ">Task Saya</h4>
              <ButtonSys type={"primary"} onClick={() => setModalAddTask(true)}>
                <div className="flex items-center space-x-2">
                  <PlusIconSvg size={16} color={"#ffffff"} />
                  <p>Tambah Task Saya</p>
                </div>
              </ButtonSys>
            </div>

            {/* <div
              className="flex overflow-x-auto md:overflow-hidden md:flex-col 
              pb-6 space-x-4 md:space-x-0 md:space-y-4 xl:space-y-6"> */}
            <Table
              rowKey={(record) => record.id}
              className="p-2"
              showHeader={false}
              dataSource={dataMyTaskList}
              loading={loadingMyTaskList}
              pagination={{
                current: pageMyTaskList,
                pageSize: 4,
                total: dataRawMyTaskList?.total,
              }}
              onChange={(pagination) => {
                setPageMyTaskList(pagination.current);
              }}
              columns={[
                {
                  title: "Task",
                  dataIndex: "name",
                  key: "name",
                  render: (_, task) => {
                    const currentStatus = dataStatusList.find(
                      (status) => status.id === task.status_id
                    );

                    const currentProject = dataProjectList.find(
                      (project) => project.id === task.project_id
                    );
                    return (
                      <div key={task.id} className="flex-none rounded-md ">
                        <TaskCard
                          title={task.name}
                          projectName={currentProject?.name}
                          toDate={task.end_date}
                          statusName={currentStatus?.name}
                          statusColor={currentStatus?.color}
                          taskStaffs={task.task_staffs}
                          onClick={() => {
                            setCurrentTaskId(task.id);
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
          {/* </div> */}
        </div>

        {/* Table Semua Proyek (in mobile layout)*/}
        <div className="block md:hidden">{TableProjectSection}</div>
      </div>

      {/* Modal Project */}
      <AccessControl hasPermission={PROJECT_ADD}>
        <ModalProjectCreate
          initProps={initProps}
          visible={modalAddProject}
          onvisible={setModalAddProject}
          isAllowedToAddProject={isAllowedToAddProject}
          setRefresh={setRefresh}
        />
      </AccessControl>

      {/* Modal Task */}
      <AccessControl hasPermission={PROJECT_TASK_ADD}>
        <ModalProjectTaskCreate
          initProps={initProps}
          visible={modalAddTask}
          onvisible={setModalAddTask}
          isAllowedToAddTask={isAllowedToAddTask}
          isAllowedToGetProjects={isAllowedToGetProjects}
          isAllowedToGetProject={isAllowedToGetProject}
          setRefresh={setRefresh}
          dataProjectList={dataProjectList}
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
          setRefresh={setRefresh}
          taskId={currentTaskId}
          dataStatusList={dataStatusList}
          dataProjectList={dataProjectList}
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
          setRefresh={setRefresh}
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
