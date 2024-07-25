import {
  ClockCircleFilled,
  ClockCircleOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Dropdown,
  Input,
  Menu,
  Modal,
  Space,
  Table,
  Tabs,
  notification,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
import { AxiosError, AxiosResponse } from "axios";
import { isBefore } from "date-fns";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import QueryString from "qs";
import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useQuery, useQueryClient } from "react-query";

import ButtonSys from "components/button";
import ButtonTooltip from "components/buttonTooltip";
import { AccessControl } from "components/features/AccessControl";
import ModalImportTasksToActivity from "components/modal/attendance/modalImportTasksToActivity";
import { ModalDelete, ModalWarning } from "components/modal/modalConfirmation";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import {
  ATTENDANCE_ACTIVITIES_GET,
  ATTENDANCE_ACTIVITY_ADD,
  ATTENDANCE_ACTIVITY_DELETE,
  ATTENDANCE_ACTIVITY_UPDATE,
  ATTENDANCE_ACTIVITY_USER_EXPORT,
  ATTENDANCE_TASK_ACTIVITIES_GET,
  ATTENDANCE_TASK_ACTIVITY_ADD,
  ATTENDANCE_TASK_ACTIVITY_DELETE,
  LEAVES_COUNT_GET,
  LEAVES_USER_GET,
  LEAVE_USER_ADD,
} from "lib/features";
import {
  generateStaticAssetUrl,
  getFileName,
  notificationError,
  notificationSuccess,
  permissionWarningNotification,
} from "lib/helper";
import { getAntdTablePaginationConfig } from "lib/standard-config";

import {
  useGetAttendeeInfo,
  useGetUserAttendanceActivities,
  useMutateAttendanceActivity,
} from "apis/attendance";
import { AttendanceTaskActivityService } from "apis/attendance/attendance-task-activity.service";
import { AuthService, AuthServiceQueryKeys } from "apis/auth";

import {
  AddNoteSvg,
  CirclePlusIconSvg,
  DownIconSvg,
  DownloadIconSvg,
  FileExportIconSvg,
  HistoryIconSvg,
  TrashIconSvg,
  XIconSvg,
} from "../../../../components/icon";
import BadgeLeaveStatus from "../leave/BadgeLeaveStatus";
import { EksporAbsensiDrawer } from "../shared/EksporAbsensiDrawer";
import { AttendanceStaffAktivitasDetailDrawer } from "./AttendanceStaffAktivitasDetailDrawer";
import { AttendanceStaffAktivitasDrawer } from "./AttendanceStaffAktivitasDrawer";
import { AttendanceStaffLeaveDetailDrawer } from "./AttendanceStaffLeaveDetailDrawer";
import { AttendanceStaffLeaveDrawer } from "./AttendanceStaffLeaveDrawer";
import { AttendanceStaffLeaveStatisticCards } from "./AttendanceStaffLeaveStatisticCards";

export interface IGetLeaveUser {
  start_date: string;
  end_date: string;
  issued_date: string;
  type: {
    name: string;
  };
  status: string;
}

/**
 * Component AttendanceStaffAktivitasSection's props.
 */
export interface IAttendanceStaffAktivitasSection {
  dataToken: string;
  idUser: number;
  username: string;
  isEmployee: boolean;
}

/**
 * Component AttendanceStaffAktivitasSection
 */
export const AttendanceStaffAktivitasSection: FC<
  IAttendanceStaffAktivitasSection
> = ({ dataToken, idUser, username, isEmployee }) => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  const { hasPermission } = useAccessControl();
  const isAllowedToAddActivity = hasPermission(ATTENDANCE_ACTIVITY_ADD);
  const isAllowedToGetActivity = hasPermission(ATTENDANCE_ACTIVITIES_GET);
  const isAllowedToUpdateActivity = hasPermission(ATTENDANCE_ACTIVITY_UPDATE);
  const isAllowedToDeleteActivity = hasPermission(ATTENDANCE_ACTIVITY_DELETE);
  const isAllowedToGetTaskActivities = hasPermission(
    ATTENDANCE_TASK_ACTIVITIES_GET
  );
  const isAllowedToAddTaskActivities = hasPermission(
    ATTENDANCE_TASK_ACTIVITY_ADD
  );
  const isAllowedToDeleteTaskActivity = hasPermission(
    ATTENDANCE_TASK_ACTIVITY_DELETE
  );
  const isAllowedToExportTable = hasPermission(ATTENDANCE_ACTIVITY_USER_EXPORT);

  const isAllowedToGetLeavesUser = hasPermission(LEAVES_USER_GET) && isEmployee;
  const isAllowedToAddLeaveUser = hasPermission(LEAVE_USER_ADD) && isEmployee;

  // Constant for Activity State
  const [TODAY, HISTORY, FORM, TASK] = ["TODAY", "HISTORY", "FORM", "TASK"];

  /** 1 => Hari Ini, 2 => Riwayat */
  const [tabActiveKey, setTabActiveKey] = useState<
    "TODAY" | "HISTORY" | string
  >(TODAY);
  /** 3 => Form, 4 => Task */
  const [tabActiveKey2, setTabActiveKey2] = useState<"FORM" | "TASK" | string>(
    FORM
  );
  const { dataSource, dynamicNameFieldPairs, isDataSourceLoading } =
    useGetUserAttendanceActivities(tabActiveKey === TODAY ? "today" : "past");

  const { attendeeStatus } = useGetAttendeeInfo();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showModalTask, setShowModalTask] = useState(false);
  const [showModalLeave, setShowModalLeave] = useState(false);
  const [showModalCheckinWarning, setShowModalCheckinWarning] = useState(false);
  const [showModalRemoveActivity, setShowModalRemoveActivity] = useState({
    visible: false,
    data: null,
  });
  const [showModalRemoveTask, setShowModalRemoveTask] = useState({
    visible: false,
    data: null,
  });
  const [showDrawerAktivitasDetail, setShowDrawerAktivitasDetail] = useState({
    visible: false,
    data: null,
    idx: null,
  });
  const [displayDataLeaves, setDisplayDataLeaves] = useState([]);
  const [displayDataTaskToday, setDisplayDataTaskToday] = useState([]);
  const [displayDataTaskHistory, setDisplayDataTaskHistory] = useState([]);
  const [isExportDrawerShown, setIsExportDrawerShown] = useState(false);

  const [activeSubmenu, setActiveSubmenu] = useState("aktivitas");
  const [rowstate, setrowstate] = useState(0);
  const [dataDefault, setDataDefault] = useState(null);
  const [showDetailCuti, setShowDetailCuti] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingLeaves, setLoadingLeaves] = useState(true);
  const [loadingDeleteTaskActivity, setLoadingDeleteTaskActivity] =
    useState(false);
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
  });

  const [rawDataLeaves, setRawDataLeaves] = useState({
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

  const columnLeaves: ColumnsType<IGetLeaveUser> = [
    {
      title: "No",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{index + 1}</>,
        };
      },
    },
    {
      title: "Leave Date",
      dataIndex: "start_date",
      render: (text, record, index) => {
        return {
          children: <>{moment(record.start_date).format("DD MMMM YYYY")}</>,
        };
      },
    },
    {
      title: "Duration",
      dataIndex: "start_date",
      render: (text, record, index) => {
        return {
          children: (
            <>
              {moment(record.end_date).diff(moment(record.start_date), "days")}{" "}
              days
            </>
          ),
        };
      },
    },
    {
      title: "Issued Date",
      dataIndex: "issued_date",
      render: (text, record, index) => {
        return {
          children: <>{moment(record.issued_date).format("DD MMMM YYYY")}</>,
        };
      },
    },
    {
      title: "Leave Type",
      dataIndex: ["type", "name"],
      render: (text, record, index) => {
        return {
          children: <>{text}</>,
        };
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              <BadgeLeaveStatus status={record?.status} />
            </div>
          ),
        };
      },
    },
  ];

  const detailCuti = (record) => {
    setShowDetailCuti(true);
    setDataDefault(record);
  };

  const cancelShowDetail = () => {
    setShowDetailCuti(false);
  };
  const [queryParams2, setQueryParams2] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 20),
    keyword: withDefault(StringParam, undefined),
    user_id: withDefault(NumberParam, idUser),
    is_active: withDefault(NumberParam, 1),
  });

  const [activityDrawerState, dispatch] = useReducer(
    _aktivitasDrawerToggleReducer,
    { visible: false }
  );

  const { data: userAttendanceForm } = useQuery(
    [AuthServiceQueryKeys.DETAIL_PROFILE],
    () => AuthService.whoAmI(axiosClient),
    {
      select: (response) => response.data.data.attendance_forms[0],
    }
  );

  const tableColums = useMemo<ColumnsType>(() => {
    const columns: ColumnsType = [
      {
        key: "id",
        title: "No.",
        render: (_, __, index) =>
          `${(currentPage - 1) * pageSize + index + 1}.`,
        width: 51,
        align: "center",
      },
      {
        key: "id",
        title: "Input Time",
        dataIndex: "updated_at",
        sorter: (a: string, b: string) => {
          const lhsDate = new Date(a);
          const rhsDate = new Date(b);

          return isBefore(rhsDate, lhsDate) ? -1 : 1;
        },
        render: (value) => {
          const formattedDate = formatDateToLocale(
            new Date(value),
            tabActiveKey === TODAY ? "HH:mm" : "dd MMM yyyy, HH:mm"
          );
          return <p className="whitespace-nowrap">{formattedDate}</p>;
        },
        width: 120,
        align: "center",
      },
    ];

    const renderCell = (text: string) => {
      const regex = /\.(png|jpe?g|pdf|csv|docx?|pptx?|xlsx?)$/i;

      // use for displaying url of uploaded file
      if (regex.test(text)) {
        const fileName = getFileName(text);
        return (
          <a
            title={fileName}
            onClick={(e) => e.stopPropagation()}
            href={generateStaticAssetUrl(text)}
            target="_blank"
            rel="external"
          >
            <p className="truncate max-w-[180px]">{fileName}</p>
          </a>
        );
      }

      return (
        <p title={text} className={"truncate max-w-[252px]"}>
          {text}
        </p>
      );
    };

    dynamicNameFieldPairs.columnNames.forEach((column, index) => {
      columns.push({
        key: dynamicNameFieldPairs.fieldKeys[index],
        title: column,
        dataIndex: dynamicNameFieldPairs.fieldKeys[index],
        render: renderCell,
        width: 252,
      });
    });

    if (tabActiveKey == TODAY) {
      columns.push({
        key: "delete",
        title: "Actions",
        render: (_, record: (typeof dataSource)[0]) => {
          return (
            <button
              className="bg-transparent text-danger hover:opacity-75"
              onClick={(e) => {
                e.stopPropagation();
                setShowModalRemoveActivity({
                  visible: true,
                  data: record?.key,
                });
                // handleOnDeleteAktivitas(record?.key);
              }}
            >
              <TrashIconSvg />
            </button>
          );
        },
        align: "center",
        width: 60,
      });
    }

    return columns;
  }, [pageSize, currentPage, tabActiveKey, dynamicNameFieldPairs]);

  const tablePaginationConf = useMemo(
    () =>
      getAntdTablePaginationConfig({
        onChange: (pageNumber, pageSize) => {
          setCurrentPage(pageNumber);
          setPageSize(pageSize);
        },
      }),
    []
  );

  const mOnRowItemClicked = useCallback(
    (datum: (typeof dataSource)[0], dataIndex?: number) => {
      if (tabActiveKey === HISTORY) {
        setShowDrawerAktivitasDetail({
          visible: true,
          data: datum,
          idx: dataIndex,
        });
        return;
      }

      if (!isAllowedToUpdateActivity) {
        permissionWarningNotification("Memperbarui", "Aktivitas");
        return;
      }

      /** datum.key adalah unique ID dari aktivitas tersebut. Hanya di map menjadi "key" */
      dispatch({
        type: "update",
        visible: true,
        selectedActivityFormId: datum.key,
      });
    },
    [tabActiveKey, isAllowedToUpdateActivity, attendeeStatus]
  );

  const mOnAddActivityButtonClicked = useCallback(() => {
    if (!userAttendanceForm) {
      Modal.error({
        centered: true,
        title: "Error Occurred!",
        content:
          "You don't have an activity form yet. Please contact Admin to immediately add your activity form.",
        okText: "Back",
        closable: true,
      });

      return;
    }

    /** Prevent user membuka drawer ketika mereka belum check in */
    if (attendeeStatus !== "checkin") {
      setShowModalCheckinWarning(true);

      return;
    }

    dispatch({ type: "create", visible: true });
  }, [userAttendanceForm, attendeeStatus]);

  const onImportTask = () => {
    if (attendeeStatus !== "checkin") {
      setShowModalCheckinWarning(true);
    } else {
      setShowModalTask(!showModalTask);
    }
  };

  const {
    data: dataTaskActivities,
    isLoading: loadingTaskActivities,
    refetch: refetchTaskActivities,
  } = useQuery(
    [ATTENDANCE_TASK_ACTIVITIES_GET],
    () => AttendanceTaskActivityService.find(axiosClient),
    {
      enabled: isAllowedToGetTaskActivities,
      select: (response) => response.data.data,
      onSuccess: (data) => {
        if (data.today_activities) {
          setDisplayDataTaskToday(data.today_activities);
        }
        if (data.last_two_month_activities) {
          setDisplayDataTaskHistory(data.last_two_month_activities);
        }
      },
      onError: (error) => {
        notificationError({
          message: "Failed to get task activities data",
        });
      },
    }
  );

  const onChangeProductSearch = (e) => {
    setQueryParams2({
      keyword: e.target.value === "" ? undefined : e.target.value,
    });
  };

  useEffect(() => {
    setLoadingTasks(false);
    checkActivityTask();
  }, []);

  useEffect(() => {
    if (isAllowedToGetLeavesUser) {
      fetchDataLeaves();
    }
  }, [isAllowedToGetLeavesUser, queryParams.page, queryParams.rows]);

  const fetchDataLeaves = async () => {
    if (!isAllowedToGetLeavesUser) {
      permissionWarningNotification("Mendapatkan", "Data Cuti");
    } else {
      const params = QueryString.stringify(queryParams, {
        addQueryPrefix: true,
      });
      setLoadingLeaves(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getLeavesUser${params}`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(dataToken),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          if (res2.success) {
            setRawDataLeaves(res2.data);
            setDisplayDataLeaves(res2.data.data); // table-related data source
            // setDataTipeCutis(res2.data);
          } else {
            notificationError({ message: res2?.message });
          }
        })
        .catch((err) => {
          notificationError({ message: "Failed to get user leaves" });
        })
        .finally(() => setLoadingLeaves(false));
    }
  };

  const checkActivityTask = () => {
    if (isAllowedToGetActivity) {
      setTabActiveKey2(FORM);
    } else if (isAllowedToGetTaskActivities) {
      setTabActiveKey2(TASK);
    }
  };

  const TableTaskColumns: ColumnsType = [
    {
      key: "id",
      title: "No.",
      render: (_, __, index) => `${(currentPage - 1) * pageSize + index + 1}.`,
      width: 51,
      align: "center",
    },
    {
      key: "id",
      title: "Input Time",
      dataIndex: "updated_at",
      sorter: (a: string, b: string) => {
        const lhsDate = new Date(a);
        const rhsDate = new Date(b);

        return isBefore(rhsDate, lhsDate) ? -1 : 1;
      },
      render: (value) => {
        const formattedDate = formatDateToLocale(
          new Date(value),
          tabActiveKey === TODAY ? "HH:mm" : "dd MMM yyyy, HH:mm"
        );

        return <p className="whitespace-nowrap">{formattedDate}</p>;
      },
      width: 120,
      align: "center",
    },
    {
      key: "id",
      title: "Task Name",
      dataIndex: "activity",
      render: (value) => <p className="truncate max-w-120">{value}</p>,
      width: 480,
    },
  ];

  function renderName(task) {
    if (task.task == null) {
      return task.task_export.name;
    } else {
      return task.task.name;
    }
  }

  function checkFormOrTask() {
    if (tabActiveKey2 == FORM && activeSubmenu == "aktivitas") {
      return (
        <Table<(typeof dataSource)[0]>
          columns={tableColums}
          rowKey={(record) => record.id}
          dataSource={dataSource}
          pagination={tablePaginationConf}
          loading={isDataSourceLoading}
          scroll={{ x: "max-content" }}
          className="tableTypeTask"
          onRow={(datum, rowIndex) => {
            const currentDataIdx =
              currentPage * pageSize - (pageSize - rowIndex);
            return {
              className: "hover:cursor-pointer",
              onClick: () => mOnRowItemClicked(datum, currentDataIdx),
            };
          }}
        />
      );
    } else if (
      tabActiveKey == TODAY &&
      tabActiveKey2 == TASK &&
      activeSubmenu == "aktivitas"
    ) {
      return (
        <Table
          rowKey={(record) => record.id}
          className=""
          showHeader={false}
          dataSource={displayDataTaskToday}
          loading={loadingTasks}
          columns={[
            {
              title: "Task",
              dataIndex: "activity",
              key: "activity",
              render: (_, task) => {
                return (
                  <div key={task.id} className="flex-none rounded-md ">
                    <div
                      className={
                        "flex items-center px-4 py-2 gap-2 border border-inputkategori"
                      }
                    >
                      <div className={"w-10/12"}>
                        <p
                          className={"text-xs font-bold text-mono30"}
                          style={{ lineHeight: "20px" }}
                        >
                          {task.activity} (T-
                          {task.task_id ? task.task_id : task.task_export_id})
                        </p>
                        <p
                          className={"text-xs text-mono50"}
                          style={{ lineHeight: "16px" }}
                        >
                          {renderName(task)}
                        </p>
                      </div>
                      <div className={"w-1/12 self-center flex justify-end"}>
                        <p>{moment(task.updated_at).format("HH:mm")}</p>
                      </div>
                      <button
                        className={`bg-transparent hover:opacity-75 ${
                          !isAllowedToDeleteTaskActivity
                            ? "cursor-not-allowed"
                            : undefined
                        }`}
                        onClick={() =>
                          setShowModalRemoveTask({
                            visible: true,
                            data: task.id,
                          })
                        }
                        disabled={!isAllowedToDeleteTaskActivity}
                      >
                        <XIconSvg size={24} color="#BF4A40" />
                      </button>
                    </div>
                  </div>
                );
              },
            },
          ]}
        />
      );
    } else if (activeSubmenu == "aktivitas") {
      return (
        <Table<(typeof dataSource)[0]>
          columns={TableTaskColumns}
          dataSource={displayDataTaskHistory}
          rowKey={(record) => record.id}
          // pagination={tablePaginationConf}
          loading={isDataSourceLoading}
          scroll={{ x: "max-content" }}
          className="tableTypeTask"
          onRow={(datum) => {
            return {
              className: "hover:cursor-pointer",
              onClick: () => mOnRowItemClicked(datum),
            };
          }}
        />
      );
    }
  }

  const {
    deleteMutation: {
      mutate: deleteAttendanceActivity,
      isLoading: loadingDeleteActivity,
    },
  } = useMutateAttendanceActivity();

  const onMutationSucceed = useCallback((response: AxiosResponse<any, any>) => {
    notificationSuccess({ message: response.data.message });
  }, []);

  const onMutationFailed = useCallback((error: AxiosError) => {
    notificationError({ message: error.response.data.message });
  }, []);

  const handleOnDeleteAktivitas = useCallback(
    (activityFormId) => {
      if (!isAllowedToDeleteActivity) {
        permissionWarningNotification("Menghapus", "Aktivitas");
        return;
      }
      deleteAttendanceActivity(activityFormId, {
        onSuccess: onMutationSucceed,
        onError: onMutationFailed,
      });
      setShowModalRemoveActivity({ visible: false, data: null });
    },
    [tabActiveKey, isAllowedToDeleteActivity, attendeeStatus]
  );

  const handleDeleteTaskActivity = useCallback(
    (taskActivityId) => {
      if (!isAllowedToDeleteTaskActivity) {
        permissionWarningNotification("Menghapus", "Task Aktivitas");
        return;
      }

      setLoadingDeleteTaskActivity(true);
      AttendanceTaskActivityService.remove(axiosClient, taskActivityId)
        .then((res) => {
          if (res.data.success) {
            setShowModalRemoveTask({ visible: false, data: null });

            notificationSuccess({
              message: "Successfully removed task from activity",
              duration: 3,
            });
            // getDataTaskActivities();
            queryClient.invalidateQueries(ATTENDANCE_TASK_ACTIVITIES_GET);
          } else {
            notificationError({
              message: res.data.message,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          notificationError({
            message: "Failed to delete task from activity",
            duration: 3,
          });
        })
        .finally(() => setLoadingDeleteTaskActivity(false));
    },
    [isAllowedToDeleteTaskActivity]
  );

  function onClickPrevNextData(type: "next" | "prev") {
    const nextIdx = showDrawerAktivitasDetail.idx + 1;
    const prevIdx = showDrawerAktivitasDetail.idx - 1;

    if (type == "next" && nextIdx < dataSource.length) {
      setShowDrawerAktivitasDetail((prev) => ({
        ...prev,
        data: dataSource[nextIdx],
        idx: nextIdx,
      }));
    } else if (type == "prev" && prevIdx > -1) {
      setShowDrawerAktivitasDetail((prev) => ({
        ...prev,
        data: dataSource[prevIdx],
        idx: prevIdx,
      }));
    }
  }

  return (
    <>
      <section className="mig-platform--p-0">
        {/* Header */}
        <div className={"flex justify-between items-center border-b py-3 px-4"}>
          {tabActiveKey == TODAY ? (
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu selectedKeys={[activeSubmenu]}>
                  <Menu.Item
                    key={"aktivitas"}
                    onClick={() => setActiveSubmenu("aktivitas")}
                    disabled={
                      !isAllowedToGetActivity || !isAllowedToGetTaskActivities
                    }
                  >
                    Activity
                  </Menu.Item>
                  <Menu.Item
                    key={"cuti"}
                    onClick={() => setActiveSubmenu("cuti")}
                    disabled={!isAllowedToGetLeavesUser}
                  >
                    Paid Leave
                  </Menu.Item>
                  {/* <Menu.Item
                    key={"overtime"}
                    onClick={() => setActiveSubmenu("overtime")}
                    disabled={!isAllowedToGetLeavesUser}
                  >
                    Overtime
                  </Menu.Item> */}
                </Menu>
              }
            >
              <a onClick={(e) => e.preventDefault()} className="mig-body--bold">
                <div className="flex items-center gap-2">
                  {activeSubmenu == "aktivitas"
                    ? "Activity"
                    : activeSubmenu == "cuti"
                    ? "Paid Leave"
                    : "Overtime"}
                  <DownIconSvg />
                </div>
              </a>
            </Dropdown>
          ) : (
            <h1 className="mig-body--bold text-neutrals100">
              History of Activities
            </h1>
          )}

          {activeSubmenu == "aktivitas" && (
            <div className="flex gap-3">
              <ButtonTooltip
                square
                type="primary"
                color={tabActiveKey == TODAY ? "mono100" : ""}
                onClick={() =>
                  setTabActiveKey(tabActiveKey == TODAY ? HISTORY : TODAY)
                }
                disabled={!isAllowedToGetActivity}
                tooltipTitle="History of Activities"
              >
                <HistoryIconSvg size={16} />
              </ButtonTooltip>

              {tabActiveKey == TODAY && (
                <AccessControl hasPermission={ATTENDANCE_ACTIVITY_USER_EXPORT}>
                  <ButtonTooltip
                    square
                    type="primary"
                    color={"mono100"}
                    onClick={() => setIsExportDrawerShown(true)}
                    disabled={!isAllowedToExportTable}
                    tooltipTitle="Download Activity"
                  >
                    <DownloadIconSvg size={16} />
                  </ButtonTooltip>
                </AccessControl>
              )}
            </div>
          )}

          {activeSubmenu == "cuti" && isAllowedToAddLeaveUser && (
            <ButtonSys type={"primary"}>
              <div
                onClick={() => setShowModalLeave(true)}
                className={"flex items-center gap-2 "}
              >
                <AddNoteSvg />
                <p className="whitespace-nowrap">Apply for Leave</p>
              </div>
            </ButtonSys>
          )}
          {activeSubmenu == "overtime" && isAllowedToAddLeaveUser && (
            <ButtonSys type={"primary"}>
              <div
                onClick={() => setShowModalLeave(true)}
                className={"flex items-center gap-2 "}
              >
                <ClockCircleOutlined />
                <p className="whitespace-nowrap">Request Overtime</p>
              </div>
            </ButtonSys>
          )}
        </div>

        {/* Tabs */}
        {activeSubmenu == "aktivitas" && (
          <div className="flex justify-between gap-3 py-3 px-4">
            <div className={"flex gap-3 "}>
              <div
                onClick={() => setTabActiveKey2(FORM)}
                className={`${
                  tabActiveKey2 == FORM
                    ? "bg-primary100 mig-body--medium text-white"
                    : "bg-white border hover:bg-primary75 mig-body text-mono80 hover:text-white"
                } rounded-[48px] py-1 px-4 hover:cursor-pointer `}
              >
                <p>Form</p>
              </div>
              {isAllowedToGetTaskActivities && (
                <div
                  onClick={() => setTabActiveKey2(TASK)}
                  className={`${
                    tabActiveKey2 == TASK
                      ? "bg-primary100 mig-body--medium text-white"
                      : "bg-white border hover:bg-primary75 mig-body text-mono80 hover:text-white "
                  } rounded-[48px] py-1 px-4 hover:cursor-pointer`}
                >
                  <p>Task</p>
                </div>
              )}
            </div>

            {tabActiveKey == TODAY &&
              (isAllowedToAddActivity && tabActiveKey2 == FORM ? (
                <div>
                  <ButtonSys
                    type="primary"
                    onClick={mOnAddActivityButtonClicked}
                    disabled={!isAllowedToAddActivity}
                    fullWidth
                  >
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <CirclePlusIconSvg />
                      <p>Add Activity</p>
                    </div>
                  </ButtonSys>
                </div>
              ) : isAllowedToAddTaskActivities && tabActiveKey2 == TASK ? (
                <div>
                  <ButtonSys
                    type="primary"
                    onClick={onImportTask}
                    disabled={!isAllowedToAddTaskActivities}
                    fullWidth
                  >
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <FileExportIconSvg />
                      <p>Import Task</p>
                    </div>
                  </ButtonSys>
                </div>
              ) : null)}

            <AccessControl hasPermission={ATTENDANCE_TASK_ACTIVITY_ADD}>
              <ModalImportTasksToActivity
                visible={showModalTask}
                onvisible={setShowModalTask}
                dataToken={dataToken}
                queryParams={queryParams2}
                displayDataTaskToday={displayDataTaskToday}
                onChangeSearch={onChangeProductSearch}
              />
            </AccessControl>
          </div>
        )}

        {/* Table "Activites" */}
        {activeSubmenu == "aktivitas" && (
          <div className="px-4">{checkFormOrTask()}</div>
        )}

        {/* Table "Paid Leave" */}
        {activeSubmenu == "cuti" && (
          <AccessControl hasPermission={[LEAVES_USER_GET, LEAVES_COUNT_GET]}>
            <div
              className={
                "bg-white rounded-[5px] mt-3 first-letter:border border-solid px-6"
              }
            >
              <AttendanceStaffLeaveStatisticCards dataToken={dataToken} />

              <Table
                className="tableTask"
                dataSource={displayDataLeaves}
                columns={columnLeaves}
                loading={loadingLeaves}
                scroll={{ x: "max-content" }}
                pagination={{
                  current: queryParams.page,
                  pageSize: queryParams.rows,
                  total: rawDataLeaves?.total,
                }}
                onChange={(pagination, _, sorter) => {
                  setQueryParams({
                    page: pagination.current,
                    rows: pagination.pageSize,
                  });
                }}
                onRow={(record) => {
                  return {
                    onClick: (e) => detailCuti(record),
                  };
                }}
                rowClassName={(record, idx) => {
                  return `cursor-pointer`;
                }}
              />

              <AttendanceStaffLeaveDrawer
                getDataNew={fetchDataLeaves}
                dataToken={dataToken}
                idUser={idUser}
                username={username}
                visible={showModalLeave}
                // action={activityDrawerState.openDrawerAs}
                activityFormId={activityDrawerState.selectedActivityFormId}
                onClose={() => setShowModalLeave(false)}
              />
              <AttendanceStaffLeaveDetailDrawer
                fetchData={fetchDataLeaves}
                visible={showDetailCuti}
                dataDefault={dataDefault}
                dataToken={dataToken}
                onClose={cancelShowDetail}
              />
            </div>
          </AccessControl>
        )}

        {/* table overtime */}
        {activeSubmenu == "overtime" && (
          <div
            className={
              "bg-white rounded-[5px] mt-3 first-letter:border border-solid px-6"
            }
          >
            <Table
              className="tableTask"
              dataSource={displayDataLeaves}
              columns={columnLeaves}
              loading={loadingLeaves}
              scroll={{ x: "max-content" }}
              pagination={{
                current: queryParams.page,
                pageSize: queryParams.rows,
                total: rawDataLeaves?.total,
              }}
              onChange={(pagination, _, sorter) => {
                setQueryParams({
                  page: pagination.current,
                  rows: pagination.pageSize,
                });
              }}
              onRow={(record) => {
                return {
                  onClick: (e) => detailCuti(record),
                };
              }}
              rowClassName={(record, idx) => {
                return `cursor-pointer`;
              }}
            />
            <AttendanceStaffLeaveDrawer
              getDataNew={fetchDataLeaves}
              dataToken={dataToken}
              idUser={idUser}
              username={username}
              visible={showModalLeave}
              activityFormId={activityDrawerState.selectedActivityFormId}
              onClose={() => setShowModalLeave(false)}
            />
            <AttendanceStaffLeaveDetailDrawer
              fetchData={fetchDataLeaves}
              visible={showDetailCuti}
              dataDefault={dataDefault}
              dataToken={dataToken}
              onClose={cancelShowDetail}
            />
          </div>
        )}
      </section>

      {(isAllowedToAddActivity ||
        isAllowedToUpdateActivity ||
        isAllowedToDeleteActivity) && (
        <AttendanceStaffAktivitasDrawer
          visible={activityDrawerState.visible}
          action={activityDrawerState.openDrawerAs}
          activityFormId={activityDrawerState.selectedActivityFormId}
          onClose={() => dispatch({ type: "create", visible: false })}
        />
      )}

      <AccessControl hasPermission={ATTENDANCE_ACTIVITIES_GET}>
        <AttendanceStaffAktivitasDetailDrawer
          visible={showDrawerAktivitasDetail.visible}
          activityData={showDrawerAktivitasDetail.data}
          onClickPrevNext={onClickPrevNextData}
          onClose={() =>
            setShowDrawerAktivitasDetail({
              visible: false,
              data: null,
              idx: null,
            })
          }
        />
      </AccessControl>

      <AccessControl hasPermission={ATTENDANCE_ACTIVITY_USER_EXPORT}>
        <EksporAbsensiDrawer
          visible={isExportDrawerShown}
          token={dataToken}
          exportActivity
          onClose={() => setIsExportDrawerShown(false)}
        />
      </AccessControl>

      <ModalWarning
        visible={showModalCheckinWarning}
        okText={"I Got It"}
        onOk={() => setShowModalCheckinWarning(false)}
        onCancel={() => setShowModalCheckinWarning(false)}
      >
        <p>You need to Check In first to add or update activity!</p>
      </ModalWarning>

      <AccessControl hasPermission={ATTENDANCE_ACTIVITY_DELETE}>
        <ModalDelete
          visible={showModalRemoveActivity?.visible}
          itemName={"Activity"}
          onOk={() => handleOnDeleteAktivitas(showModalRemoveActivity?.data)}
          onCancel={() =>
            setShowModalRemoveActivity({ visible: false, data: null })
          }
          loading={loadingDeleteActivity}
          disabled={!isAllowedToDeleteActivity}
        >
          <p>
            Are you sure you want to remove this activity? This action can’t be
            undone.
          </p>
        </ModalDelete>
      </AccessControl>

      <AccessControl hasPermission={ATTENDANCE_TASK_ACTIVITY_DELETE}>
        <ModalDelete
          visible={showModalRemoveTask?.visible}
          itemName={"Task"}
          onOk={() => handleDeleteTaskActivity(showModalRemoveTask?.data)}
          onCancel={() =>
            setShowModalRemoveTask({ visible: false, data: null })
          }
          loading={loadingDeleteTaskActivity}
          disabled={!isAllowedToDeleteTaskActivity}
        >
          <p>
            Are you sure you want to remove this task? This action can’t be
            undone.
          </p>
        </ModalDelete>
      </AccessControl>
    </>
  );
};

/**
 * @private
 */
type AktivitasDrawerActionTypes = "create" | "update";

/**
 * @private
 */
interface IAktivitasDrawerState {
  visible: boolean;
  openDrawerAs?: AktivitasDrawerActionTypes;
  selectedActivityFormId?: number;
}

/**
 * @private
 */
type AktivitasDrawerAction = {
  type: AktivitasDrawerActionTypes;
} & IAktivitasDrawerState;

/**
 * @private
 */
const _aktivitasDrawerToggleReducer = (
  state: IAktivitasDrawerState,
  payload: AktivitasDrawerAction
): IAktivitasDrawerState => {
  switch (payload.type) {
    case "create":
      return {
        ...state,
        visible: payload.visible,
        openDrawerAs: payload.type,
        selectedActivityFormId: undefined,
      };

    case "update":
      if (typeof payload.selectedActivityFormId !== "number") {
        throw new Error(
          "Nilai dari action.selectedActivityFormId harus berupa number!"
        );
      }

      return {
        ...state,
        visible: payload.visible,
        openDrawerAs: payload.type,
        selectedActivityFormId: payload.selectedActivityFormId,
      };

    default:
      throw new Error(
        `Type reducer ${payload.type} tidak diketahui! Gunakan action: \"create\" atau \"update\"`
      );
  }
};
