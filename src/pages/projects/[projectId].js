import { PlusOutlined, UpOutlined } from "@ant-design/icons";
import {
  Avatar,
  Collapse,
  DatePicker,
  Input,
  Select,
  Table,
  Tooltip,
  notification,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import parse from "html-react-parser";
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
  PROJECT_LOGS_GET,
  PROJECT_NOTES_GET,
  PROJECT_NOTE_ADD,
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
  EditSquareIconSvg,
  OneUserIconSvg,
  PlusIconSvg,
  SearchIconSvg,
} from "../../components/icon";
import st from "../../components/layout-dashboard.module.css";
import LayoutDashboard from "../../components/layout-dashboardNew";
import ModalProjectCreate from "../../components/modal/projects/modalProjectCreate";
import ModalProjectTaskCreate from "../../components/modal/projects/modalProjectTaskCreate";
import ModalProjectTaskDetailUpdate from "../../components/modal/projects/modalProjectTaskDetailUpdate";
import ModalProjectUpdate from "../../components/modal/projects/modalProjectUpdate";
import ModalStaffList from "../../components/modal/projects/modalStaffList";
import ModalStatusManage from "../../components/modal/projects/modalStatusManage";
import { TableCustomProjectList } from "../../components/table/tableCustom";
import {
  createKeyPressHandler,
  generateStaticAssetUrl,
  momentFormatDate,
  permissionWarningNotification,
} from "../../lib/helper";
import httpcookie from "cookie";

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

  const isAllowedToGetNotes = hasPermission(PROJECT_NOTES_GET);
  const isAllowedToAddNote = hasPermission(PROJECT_NOTE_ADD);

  const isAllowedToGetLogs = hasPermission(PROJECT_LOGS_GET);

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

  // 2.2. Table Task List
  // filter data
  const [loadingStatusList, setLoadingStatusList] = useState(false);
  const [dataStatusList, setDataStatusList] = useState([]);

  // filter search & selected options
  const [searchingFilterTasks, setSearchingFilterTasks] = useState(undefined);
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");
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
  const [dataRowClicked, setDataRowClicked] = useState({});

  // 2.3. Project Detail
  const [dataProject, setDataProject] = useState({});
  const [loadingProject, setLoadingProject] = useState(false);

  // 2.4. Project Logs
  const [dataRawProjectLogs, setDataRawProjectLogs] = useState({});
  const [dataProjectLogs, setDataProjectLogs] = useState([]);
  const [loadingProjectLog, setLoadingProjectLog] = useState(false);
  const [searchingFilterLogs, setSearchingFilterLogs] = useState(undefined);

  // 2.5. Project Notes
  const [dataRawProjectNotes, setDataRawProjectNotes] = useState({});
  const [dataProjectNotes, setDataProjectNotes] = useState([]);
  const [loadingProjectNotes, setLoadingProjectNotes] = useState(false);
  const [searchingFilterNotes, setSearchingFilterNotes] = useState(undefined);
  const [isNoteInput, setIsNoteInput] = useState(false);
  const [dataInputNote, setDataInputNote] = useState("");

  // 2.6. Modal
  const [modalUpdateProject, setModalUpdateProject] = useState(false);
  const [modalStaffs, setModalStaffs] = useState(false);
  const [modalAddTask, setModalAddTask] = useState(false);
  const [modalDetailTask, setModalDetailTask] = useState(false);

  const [dataProjectList, setDataProjectList] = useState([]);
  const [currentTaskId, setCurrentTaskId] = useState(0);

  // 3. UseEffect
  // 3.1. Get Project
  useEffect(() => {
    if (!isAllowedToGetProject) {
      permissionWarningNotification("Mendapatkan", "Data Proyek");
      setLoadingProject(false);
      return;
    }

    setLoadingProject(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getProject?id=${projectId}`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataProject(res2.data);
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
        setLoadingProject(false);
      });
  }, [isAllowedToGetProject, refresh]);

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

  // 3.4. Get Task List
  useEffect(() => {
    if (!isAllowedToGetTasks) {
      permissionWarningNotification("Mendapatkan", "Daftar Task Proyek");
      setLoadingTasks(false);
      return;
    }

    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    setLoadingTasks(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectTasks${payload}`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
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
  }, [
    isAllowedToGetTasks,
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

  // 3.5. Get Project Logs
  useEffect(() => {
    if (!isAllowedToGetLogs) {
      permissionWarningNotification("Mendapatkan", "Log Aktivitas Proyek");
      setLoadingProjectLog(false);
      return;
    }

    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    setLoadingProjectLog(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectLogs?project_id=${projectId}`,
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
          setDataRawProjectLogs(res2.data);
          setDataProjectLogs(res2.data.data);
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
        setLoadingProjectLog(false);
      });
  }, [
    isAllowedToGetLogs,
    refresh,
    queryParams.page,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
    queryParams.keyword,
  ]);

  // 3.6. Get Project Notes
  useEffect(() => {
    if (!isAllowedToGetNotes) {
      permissionWarningNotification("Mendapatkan", "Catatan Proyek");
      setLoadingProjectNotes(false);
      return;
    }

    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    setLoadingProjectNotes(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectLogNotes?project_id=${projectId}`,
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
          setDataRawProjectNotes(res2.data);
          setDataProjectNotes(res2.data.data);
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
        setLoadingProjectNotes(false);
      });
  }, [
    isAllowedToGetNotes,
    refresh,
    queryParams.page,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
    queryParams.keyword,
  ]);

  // 4. Event
  const onFilterTasks = () => {
    setQueryParams({
      keyword: searchingFilterTasks,
      from: selectedFromDate,
      to: selectedToDate,
      status_ids: selectedStatus,
    });
  };

  const { onKeyPressHandler } = createKeyPressHandler(onFilterTasks, "Enter");

  const handleAddNote = (notes) => {
    if (!isAllowedToAddNote) {
      permissionWarningNotification("Menambah", "Catatan");
      return;
    }

    setLoadingProjectNotes(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/addProjectLogNotes?project_id=${projectId}&notes=${notes}`,
      {
        method: `POST`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          notification.success({
            message: response.message,
            duration: 3,
          });
          setDataInputNote("");
          setRefresh((prev) => prev + 1);
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambah catatan. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingProjectNotes(false));
  };

  // String of project staffs
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
    [dataProject.name]
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
        className="grid grid-cols-1 gap-4 lg:gap-6 px-4 md:px-5"
        id="mainWrapper"
      >
        {/* Statistik Proyek */}
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
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">
          {/* Detail, Log, Catatan Proyek */}
          <div className="lg:w-2/6 flex flex-col gap-4 lg:gap-6">
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
                <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <p className="text-mono30 font-bold mb-2">Diajukan oleh:</p>
                    <div>
                      {dataProject?.proposed_bys?.length > 1 ? (
                        <div className="flex items-center">
                          <Avatar.Group
                            size={30}
                            maxCount={5}
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
                    <p
                      className="px-4 py-2 rounded-md w-max"
                      style={{
                        backgroundColor: dataProject?.status?.color
                          ? dataProject?.status?.color + "20"
                          : "#E6E6E6",
                        color: dataProject?.status?.color ?? "#808080",
                      }}
                    >
                      {dataProject?.status?.name ?? "-"}
                    </p>
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
                    <p className="text-mono30 font-bold mb-2">Staff Proyek:</p>
                    <div className="flex items-center space-x-2">
                      {dataProject?.project_staffs?.length > 1 ? (
                        <div onClick={() => setModalStaffs(true)}>
                          <Avatar.Group
                            size={30}
                            maxCount={3}
                            className="cursor-help"
                            maxStyle={{
                              color: "#f56a00",
                              backgroundColor: "#fde3cf",
                            }}
                          >
                            {dataProject?.project_staffs?.map((staff) => (
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
                                  size={30}
                                />
                              </Tooltip>
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
                                  dataProject?.project_staffs?.[lastIndexStaff]
                                    ?.name
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
                    <p className="text-mono50">
                      {dataProject?.description
                        ? parse(dataProject?.description)
                        : "-"}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <ButtonSys
                      type={"primary"}
                      fullWidth={true}
                      size={"large"}
                      onClick={() => setModalUpdateProject(true)}
                    >
                      <div className="flex space-x-2 items-center ">
                        <EditSquareIconSvg size={24} color={"#ffffff"} />
                        <p>Edit Detail Proyek</p>
                      </div>
                    </ButtonSys>
                  </div>
                </div>
              </Collapse.Panel>
            </Collapse>

            {/* Log */}
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
                    <p>Log Aktivitas Proyek {dataProject?.name}</p>
                  </div>
                }
              >
                <div className="grid gap-2 lg:gap-6">
                  {/* Search by keyword (kata kunci) */}
                  <div className="">
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
                        setSearchingFilterLogs(e.target.value);
                      }}
                      onKeyPress={onKeyPressHandler}
                      disabled={!isAllowedToGetLogs}
                    />
                  </div>

                  <Table
                    rowKey={(record) => record.id}
                    showHeader={false}
                    dataSource={dataProjectLogs}
                    loading={loadingProjectLog}
                    pagination={{
                      current: queryParams.page,
                      pageSize: queryParams.rows,
                      total: dataRawProjectLogs.total,
                      showSizeChanger: true,
                    }}
                    columns={[
                      {
                        title: "Logs",
                        dataIndex: "id",
                        key: "id",
                        render: (_, log) => {
                          return (
                            <div key={log?.id} className="">
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center space-x-2">
                                  <img
                                    src={generateStaticAssetUrl(
                                      log?.causer?.profile_image?.link ??
                                        "staging/Users/default_user.png"
                                    )}
                                    alt={"profile image"}
                                    className="w-8 h-8 bg-cover object-cover rounded-full"
                                  />
                                  <p className="truncate">
                                    <strong>{log?.causer?.name}</strong> -{" "}
                                    {log?.causer?.roles?.[0]?.name}
                                  </p>
                                </div>
                                <p className="text-right">
                                  {momentFormatDate(
                                    log?.created_at,
                                    "-",
                                    "D MMM YYYY, HH:mm",
                                    true
                                  )}
                                </p>
                              </div>
                              <p>{log?.description ?? "-"}</p>
                            </div>
                          );
                        },
                      },
                    ]}
                  />
                </div>
              </Collapse.Panel>
            </Collapse>

            {/* Catatan */}
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
                    <p>Catatan Proyek {dataProject?.name}</p>
                  </div>
                }
              >
                <div className="grid gap-2 lg:gap-6">
                  {/* Search by keyword (kata kunci) */}
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
                      setSearchingFilterLogs(e.target.value);
                    }}
                    onKeyPress={onKeyPressHandler}
                    disabled={!isAllowedToGetLogs}
                  />

                  <Table
                    rowKey={(record) => record.id}
                    showHeader={false}
                    dataSource={dataProjectNotes}
                    loading={loadingProjectNotes}
                    pagination={{
                      current: queryParams.page,
                      pageSize: queryParams.rows,
                      total: dataRawProjectNotes.total,
                      showSizeChanger: true,
                    }}
                    columns={[
                      {
                        title: "Notes",
                        dataIndex: "id",
                        key: "id",
                        render: (_, note) => {
                          return (
                            <div key={note?.id} className="">
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center space-x-2">
                                  <img
                                    src={generateStaticAssetUrl(
                                      note?.causer?.profile_image?.link ??
                                        "staging/Users/default_user.png"
                                    )}
                                    alt={"profile image"}
                                    className="w-8 h-8 bg-cover object-cover rounded-full"
                                  />
                                  <p className="truncate">
                                    <strong>{note?.causer?.name}</strong> -{" "}
                                    {note?.causer?.roles?.[0]?.name}
                                  </p>
                                </div>
                                <p className="text-right">
                                  {momentFormatDate(
                                    note?.created_at,
                                    "-",
                                    "D MMM YYYY, HH:mm",
                                    true
                                  )}
                                </p>
                              </div>
                              <p>{note?.notes ?? "-"}</p>
                            </div>
                          );
                        },
                      },
                    ]}
                  />

                  {isNoteInput ? (
                    <div className="space-y-2">
                      <TextArea
                        size="large"
                        value={dataInputNote}
                        onChange={(e) => setDataInputNote(e.target.value)}
                      ></TextArea>
                      <div className="text-right">
                        <button
                          onClick={() => {
                            setIsNoteInput(false);
                            setDataInputNote("");
                          }}
                          className="bg-transparent text-mono50 py-2 px-6 hover:text-mono80"
                        >
                          Batal
                        </button>
                        <ButtonSys
                          type={"primary"}
                          onClick={() => handleAddNote(dataInputNote)}
                          disabled={!isAllowedToAddNote}
                        >
                          Simpan
                        </ButtonSys>
                      </div>
                    </div>
                  ) : (
                    <ButtonSys
                      type={"default"}
                      size={"large"}
                      fullWidth={true}
                      onClick={() => setIsNoteInput(true)}
                    >
                      <div className="flex space-x-2 items-center ">
                        <PlusOutlined />
                        <p className="mig-caption--bold ">Tambah Catatan</p>
                      </div>
                    </ButtonSys>
                  )}
                </div>
              </Collapse.Panel>
            </Collapse>
          </div>

          {/* Task Proyek */}
          <div className="lg:w-4/6">
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
                  onClick={() => setModalAddTask(true)}
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
                  // total: total,
                  showSizeChanger: true,
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
          setRefresh={setRefresh}
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

      {/* Modal Notes */}
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
