import {
  AppstoreAddOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  ConfigProvider,
  Input,
  Modal,
  Table,
  Tabs,
  notification,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
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
import { AccessControl } from "components/features/AccessControl";
import { AddNoteSvg, FileImportIconSvg, XIconSvg } from "components/icon";
import { DataEmptyState } from "components/states/DataEmptyState";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import {
  ATTENDANCE_ACTIVITIES_GET,
  ATTENDANCE_ACTIVITY_ADD,
  ATTENDANCE_ACTIVITY_DELETE,
  ATTENDANCE_ACTIVITY_UPDATE,
  ATTENDANCE_TASK_ACTIVITIES_GET,
  ATTENDANCE_TASK_ACTIVITY_ADD,
  ATTENDANCE_TASK_ACTIVITY_DELETE,
  LEAVES_COUNT_GET,
  LEAVES_USER_GET,
  LEAVE_USER_ADD,
} from "lib/features";
import {
  createKeyPressHandler,
  generateStaticAssetUrl,
  getFileName,
  permissionWarningNotification,
} from "lib/helper";
import { getAntdTablePaginationConfig } from "lib/standard-config";

import {
  useGetAttendeeInfo,
  useGetUserAttendanceActivities,
} from "apis/attendance";
import { AttendanceTaskActivityService } from "apis/attendance/attendance-task-activity.service";
import { AuthService, AuthServiceQueryKeys } from "apis/auth";

import { AttendanceStaffAktivitasDrawer } from "./AttendanceStaffAktivitasDrawer";
import { AttendanceStaffLeaveDrawer } from "./AttendanceStaffLeaveDrawer";
import { AttendanceStaffLeaveDetailDrawer } from "./OldAttendanceStaffLeaveDetailDrawer";

const { TabPane } = Tabs;

/**../../../icon
 * Component AttendanceStaffAktivitasSection's props.
 */
export interface IAttendanceStaffAktivitasSection {
  dataToken: string;
  idUser: number;
  username: string;
}

/**
 * Component AttendanceStaffAktivitasSection
 */
export const AttendanceStaffAktivitasSection: FC<
  IAttendanceStaffAktivitasSection
> = ({ dataToken, idUser, username }) => {
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

  const isAllowedToLeavesUser = hasPermission(LEAVES_USER_GET);
  const isAllowedToLeaveCount = hasPermission(LEAVES_COUNT_GET);
  const isAllowedToAddLeaveUser = hasPermission(LEAVE_USER_ADD);

  /** 1 => Hari Ini, 2 => Riwayat */
  const [tabActiveKey, setTabActiveKey] = useState<"1" | "2" | string>("1");
  /** 3 => Form, 4 => Task */
  const [tabActiveKey2, setTabActiveKey2] = useState<"3" | "4" | string>("");
  const { dataSource, dynamicNameFieldPairs, isDataSourceLoading } =
    useGetUserAttendanceActivities(tabActiveKey === "1" ? "today" : "past");
  const { attendeeStatus } = useGetAttendeeInfo();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showModalTask, setShowModalTask] = useState(false);
  const [showModalLeave, setShowModalLeave] = useState(false);
  const [dataTaskSelected, setDataTaskSelected] = useState([]);
  const [displayDataImport, setDisplayDataImport] = useState([]);
  const [displayDataLeaves, setDisplayDataLeaves] = useState([]);
  const [displayDataTaskToday, setDisplayDataTaskToday] = useState([]);
  const [displayDataTaskHistory, setDisplayDataTaskHistory] = useState([]);
  const [activeSubmenu, setActiveSubmenu] = useState("aktivitas");
  const [rowstate, setrowstate] = useState(0);
  const [dataDefault, setDataDefault] = useState(null);
  const [showDetailCuti, setShowDetailCuti] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [leaveCount, setLeaveCount] = useState(null);
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

  const columnLeaves = [
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
      title: "Tanggal Cuti",
      dataIndex: "start_date",
      render: (text, record, index) => {
        return {
          children: <>{moment(record.start_date).format("DD MMMM YYYY")}</>,
        };
      },
    },
    {
      title: "Durasi",
      dataIndex: "start_date",
      render: (text, record, index) => {
        return {
          children: (
            <>
              {moment(record.end_date).diff(moment(record.start_date), "days")}{" "}
              Hari
            </>
          ),
        };
      },
    },
    {
      title: "Tanggal Pengajuan",
      dataIndex: "issued_date",
      render: (text, record, index) => {
        return {
          children: <>{moment(record.issued_date).format("DD MMMM YYYY")}</>,
        };
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record, index) => {
        return {
          children: (
            <div
              className={`${
                record.status == 1
                  ? "bg-[#E6E6E6]"
                  : record.status == 2
                  ? "bg-[#35763B]"
                  : "bg-[#BF4A40]"
              } py-1 px-4 max-w-max rounded-[5px]`}
            >
              <p
                className={`${
                  record.status == 1
                    ? "text-[#4D4D4D]"
                    : record.status == 2
                    ? "text-[#F3F3F3]"
                    : "text-white"
                } leading-4 text-[10px] font-medium`}
              >
                {record.status == 1
                  ? "Pending"
                  : record.status == 2
                  ? "Diterima"
                  : "Ditolak"}
              </p>
            </div>
          ),
        };
      },
    },
    {
      title: "Aksi",
      dataIndex: "button_action",
      render: (text, record, index) => {
        return {
          children: (
            <div
              onClick={() => detailCuti(record)}
              className={"hover:cursor-pointer"}
            >
              <EyeOutlined />
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
        width: 64,
      },
      {
        key: "id",
        title: "Waktu Pengisian",
        dataIndex: "updated_at",
        sorter: (a: string, b: string) => {
          const lhsDate = new Date(a);
          const rhsDate = new Date(b);

          return isBefore(rhsDate, lhsDate) ? -1 : 1;
        },
        render: (value) => {
          const formattedDate = formatDateToLocale(
            new Date(value),
            tabActiveKey === "1" ? "HH:mm" : "dd MMM yyyy, HH:mm"
          );

          return <>{formattedDate}</>;
        },
      },
    ];

    const renderCell = (text: string) => {
      const regex = /\.(png|jpe?g|pdf|csv|docx?|pptx?|xlsx?)$/i;

      // use for displaying url of uploaded file
      if (regex.test(text)) {
        return (
          <a
            onClick={(e) => e.stopPropagation()}
            href={generateStaticAssetUrl(text)}
            target="_blank"
            rel="external"
            className="truncate max-w-[200px]"
          >
            {getFileName(text)}
          </a>
        );
      }

      return text;
    };

    dynamicNameFieldPairs.columnNames.forEach((column, index) => {
      columns.push({
        key: dynamicNameFieldPairs.fieldKeys[index],
        title: column,
        dataIndex: dynamicNameFieldPairs.fieldKeys[index],
        render: renderCell,
      });
    });

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
    (datum: (typeof dataSource)[0]) => {
      if (tabActiveKey === "2") {
        /** Only allow this click callback when user is on "Hari Ini" tab */
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
        title: "Terjadi kesalahan!",
        content:
          "Anda belum memiliki form aktivitas. Mohon hubungi Admin untuk segera menambahkan Anda ke dalam form aktivitas.",
        okText: "Kembali",
        closable: true,
      });

      return;
    }

    /** Prevent user membuka drawer ketika mereka belum check in */
    if (attendeeStatus !== "checkin") {
      Modal.error({
        centered: true,
        title: "Perhatian!",
        content:
          "Anda perlu Check In terlebih dahulu untuk menambahkan atau memperbarui aktivitas!",
        okText: "Kembali",
        closable: true,
      });

      return;
    }

    dispatch({ type: "create", visible: true });
  }, [userAttendanceForm, attendeeStatus]);

  const onImportTask = () => {
    if (attendeeStatus !== "checkin") {
      Modal.error({
        centered: true,
        title: "Perhatian!",
        content:
          "Anda perlu Check In terlebih dahulu untuk menambahkan atau memperbarui aktivitas!",
        okText: "Kembali",
        closable: true,
      });
    } else {
      setShowModalTask(!showModalTask);
    }
  };

  const importMultipleTask = () => {
    if (dataTaskSelected.length > 0) {
      if (attendeeStatus !== "checkin") {
        Modal.error({
          centered: true,
          title: "Perhatian!",
          content:
            "Anda perlu Check In terlebih dahulu untuk menambahkan atau memperbarui aktivitas!",
          okText: "Kembali",
          closable: true,
        });
      } else {
        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/addAttendanceTaskActivities`;
        let method = "POST";
        let payload = {
          task_ids: dataTaskSelected,
        };

        fetch(url, {
          method: method,
          headers: {
            Authorization: JSON.parse(dataToken),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.json())
          .then((response2) => {
            if (response2.success) {
              notification.success({
                message: (
                  <>
                    {" "}
                    <p>Task berhasil ditambahkan ke aktivitas</p>
                  </>
                ),

                duration: 3,
              });
              getDataTaskActivities();
              queryClient.invalidateQueries(ATTENDANCE_TASK_ACTIVITIES_GET);
              handleCloseModalImportTask();
            } else {
              notification.error({
                message: response2.message,
                duration: 3,
              });
            }
          })
          .catch((err) => {
            notification.error({
              message: `Task Gagal ditambahkan ke aktivitas`,
              duration: 3,
            });
            // setLoadingAdd(false);
          });
      }
    }
  };

  const getDataTaskActivities = () => {
    if (!isAllowedToGetTaskActivities) {
      permissionWarningNotification("Mendapatkan", "Daftar Task");
    } else {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAttendanceTaskActivities`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(dataToken),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          if (res2.success) {
            if (res2.data) {
              if (res2.data.today_activities) {
                setDisplayDataTaskToday(res2.data.today_activities);
              }
              if (res2.data.last_two_month_activities) {
                setDisplayDataTaskHistory(res2.data.last_two_month_activities);
              }
            }
          }
        });
    }
  };

  const onChangeProductSearch = (e) => {
    setQueryParams2({
      keyword: e.target.value === "" ? undefined : e.target.value,
    });
  };

  useEffect(() => {
    setLoadingTasks(false);
    getDataTaskActivities();
    checkActivityTask();
    fetchDataCount();
  }, []);

  useEffect(() => {
    fetchData();
  }, [queryParams.page, queryParams.rows]);

  const fetchData = async () => {
    if (!isAllowedToLeavesUser) {
      permissionWarningNotification("Mendapatkan", "Data Cuti");
    } else {
      const params = QueryString.stringify(queryParams, {
        addQueryPrefix: true,
      });
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getLeavesUser${params}`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(dataToken),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          setRawDataLeaves(res2.data);
          setDisplayDataLeaves(res2.data.data); // table-related data source
          // setDataTipeCutis(res2.data);
        });
    }
  };

  const fetchDataCount = async () => {
    if (!isAllowedToLeaveCount) {
      permissionWarningNotification("Mendapatkan", "Jumlah Cuti");
    } else {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getLeavesCount`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(dataToken),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          setLeaveCount(res2.data);
        });
    }
  };

  const checkActivityTask = () => {
    if (isAllowedToGetActivity) {
      setTabActiveKey2("3");
    } else if (isAllowedToGetTaskActivities) {
      setTabActiveKey2("4");
    }
  };

  useEffect(() => {
    getDataModal();
  }, [
    queryParams2.page,
    queryParams2.rows,
    queryParams2.keyword,
    isAllowedToGetTaskActivities,
    displayDataTaskToday,
  ]);

  const getDataModal = () => {
    if (!isAllowedToGetTaskActivities) {
      permissionWarningNotification("Mendapatkan", "Daftar Task");
    } else {
      const payload = QueryString.stringify(queryParams2, {
        addQueryPrefix: true,
      });
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectTasks${payload}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(dataToken),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          if (res2.success) {
            let datafromapi = res2.data.data;
            let dataTemp = [];

            const importedTaskIds = displayDataTaskToday.map(
              (item) => item.task_id
            );

            for (let a = 0; a < datafromapi.length; a++) {
              // Filter task which has not been added to activity
              if (!importedTaskIds.includes(datafromapi[a].id)) {
                dataTemp.push({
                  id: datafromapi[a].id,
                  ticket_number: datafromapi[a].ticket_number,
                  name: datafromapi[a].name,
                  start_date: datafromapi[a].start_date,
                  project_name: datafromapi[a].project
                    ? datafromapi[a].project.name
                    : null,
                  end_date: datafromapi[a].end_date,
                  is_selected: false,
                });
              }
            }
            setDisplayDataImport(dataTemp);
          }
        });
    }
  };

  const handleSelectAllTask = () => {
    let dataTemp = [];
    let dataTemp2 = [];
    for (let a = 0; a < displayDataImport.length; a++) {
      dataTemp.push(displayDataImport[a].id);
      dataTemp2.push({
        id: displayDataImport[a].id,
        ticket_number: displayDataImport[a].ticket_number,
        name: displayDataImport[a].name,
        project_name: displayDataImport[a].project_name,
        start_date: displayDataImport[a].start_date,
        end_date: displayDataImport[a].end_date,
        is_selected: true,
      });
    }
    setDataTaskSelected(dataTemp);
    setDisplayDataImport(dataTemp2);
  };

  const handleUnSelectAllTask = () => {
    let dataTaskTemp = [];
    for (let a = 0; a < displayDataImport.length; a++) {
      dataTaskTemp.push({
        id: displayDataImport[a].id,
        ticket_number: displayDataImport[a].ticket_number,
        name: displayDataImport[a].name,
        project_name: displayDataImport[a].project_name,
        start_date: displayDataImport[a].start_date,
        end_date: displayDataImport[a].end_date,
        is_selected: false,
      });
    }
    setDataTaskSelected([]);
    setDisplayDataImport(dataTaskTemp);
  };

  const handleOnSelectTask = (value) => {
    let dataTaskTemp = [];
    for (let a = 0; a < displayDataImport.length; a++) {
      if (value.target.value == displayDataImport[a].id) {
        dataTaskTemp.push({
          id: displayDataImport[a].id,
          ticket_number: displayDataImport[a].ticket_number,
          name: displayDataImport[a].name,
          project_name: displayDataImport[a].project_name,
          start_date: displayDataImport[a].start_date,
          end_date: displayDataImport[a].end_date,
          is_selected: value.target.checked,
        });
      } else {
        dataTaskTemp.push({
          id: displayDataImport[a].id,
          ticket_number: displayDataImport[a].ticket_number,
          name: displayDataImport[a].name,
          project_name: displayDataImport[a].project_name,
          start_date: displayDataImport[a].start_date,
          end_date: displayDataImport[a].end_date,
          is_selected: displayDataImport[a].is_selected,
        });
      }

      //check selected
    }
    let dataTemp = dataTaskSelected;
    if (dataTemp.length == 0) {
      dataTemp.push(value.target.value);
    } else if (displayDataImport.length >= 1) {
      if (value.target.checked == false) {
        dataTemp = dataTemp.filter(function (item) {
          return item !== value.target.value;
        });
      } else {
        dataTemp.push(value.target.value);
      }
      setDataTaskSelected(dataTemp);
    }
    setDisplayDataImport([...dataTaskTemp]);
  };

  const handleSelectTask = () => {
    if (dataTaskSelected.length == displayDataImport.length) {
      handleUnSelectAllTask();
    } else {
      handleSelectAllTask();
    }
  };

  const TableTaskColumns: ColumnsType = [
    {
      key: "id",
      title: "No.",
      render: (_, __, index) => `${(currentPage - 1) * pageSize + index + 1}.`,
      width: 64,
    },
    {
      key: "id",
      title: "Waktu Pengisian",
      dataIndex: "updated_at",
      sorter: (a: string, b: string) => {
        const lhsDate = new Date(a);
        const rhsDate = new Date(b);

        return isBefore(rhsDate, lhsDate) ? -1 : 1;
      },
      render: (value) => {
        const formattedDate = formatDateToLocale(
          new Date(value),
          tabActiveKey === "1" ? "HH:mm" : "dd MMM yyyy, HH:mm"
        );

        return <>{formattedDate}</>;
      },
    },
    {
      key: "id",
      title: "Nama Task",
      dataIndex: "activity",
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
    if (tabActiveKey2 == "3" && activeSubmenu == "aktivitas") {
      return (
        <ConfigProvider
          renderEmpty={() => (
            <DataEmptyState caption="Belum ada aktivitas. Silakan masukkan aktivitas untuk hari ini" />
          )}
        >
          <Table<(typeof dataSource)[0]>
            columns={tableColums}
            rowKey={(record) => record.id}
            dataSource={dataSource}
            pagination={tablePaginationConf}
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
        </ConfigProvider>
      );
    } else if (
      tabActiveKey == "1" &&
      tabActiveKey2 == "4" &&
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
                          !isAllowedToDeleteActivity
                            ? "cursor-not-allowed"
                            : undefined
                        }`}
                        onClick={() => handleDeleteTaskActivity(task.id)}
                        disabled={!isAllowedToDeleteActivity}
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

  const handleDeleteTaskActivity = useCallback(
    (taskActivityId) => {
      if (!isAllowedToDeleteTaskActivity) {
        permissionWarningNotification("Menghapus", "Task Aktivitas");
        return;
      }

      Modal.confirm({
        centered: true,
        title: "Perhatian!",
        content: "Apakah Anda yakin ingin menghapus task ini dari aktivitas?",
        okText: "Hapus Task",
        cancelText: "Kembali",
        onOk: () => {
          AttendanceTaskActivityService.remove(axiosClient, taskActivityId)
            .then((res) => {
              if (res.data.success) {
                notification.success({
                  message: "Task berhasil dihapus dari aktivitas",
                  duration: 3,
                });
                getDataTaskActivities();
                queryClient.invalidateQueries(ATTENDANCE_TASK_ACTIVITIES_GET);
              } else {
                notification.error({
                  message: res.data.message,
                  duration: 3,
                });
              }
            })
            .catch((err) => {
              notification.error({
                message: "Task gagal dihapus dari aktivitas",
                duration: 3,
              });
            });
        },
      });
    },
    [isAllowedToDeleteTaskActivity]
  );

  const handleCloseModalImportTask = () => {
    setShowModalTask(false);
    handleUnSelectAllTask();
  };

  return (
    <>
      <section className="mig-platform">
        <div className={"flex justify-between"}>
          <div className={"flex gap-4"}>
            <div
              onClick={() => setActiveSubmenu("aktivitas")}
              className={`${
                activeSubmenu == "aktivitas" ? "bg-[#35763B]" : "bg-white"
              } rounded-[48px] py-2 px-4 hover:cursor-pointer`}
            >
              <p
                className={`${
                  activeSubmenu == "aktivitas"
                    ? "text-white font-medium"
                    : "text-[#CCCCCC] font-bold"
                }text-xs leading-5 `}
              >
                Aktivitas
              </p>
            </div>
            {isAllowedToLeavesUser && (
              <div
                onClick={() => setActiveSubmenu("cuti")}
                className={`${
                  activeSubmenu == "cuti" ? "bg-[#35763B]" : "bg-white"
                } rounded-[48px] py-2 px-4 hover:cursor-pointer`}
              >
                <p
                  className={`${
                    activeSubmenu == "cuti"
                      ? "text-white font-medium"
                      : "text-[#CCCCCC] font-bold"
                  }text-xs leading-5 `}
                >
                  Cuti Saya
                </p>
              </div>
            )}
          </div>
          {activeSubmenu == "cuti" && isAllowedToAddLeaveUser && (
            <div
              onClick={() => setShowModalLeave(true)}
              className={
                "hover:cursor-pointer bg-[#35763B] flex items-center rounded-[5px] gap-2 w-[133px] h-[36px] px-5"
              }
            >
              <AddNoteSvg />
              <p className="text-white text-xs leading-5 font-bold">
                Ajukan Cuti
              </p>
            </div>
          )}
        </div>

        {activeSubmenu == "aktivitas" && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <Tabs
              defaultActiveKey="1"
              className="w-1/2"
              onChange={setTabActiveKey}
            >
              <TabPane tab="Hari Ini" key="1" />
              <TabPane tab="Riwayat" key="2" />
            </Tabs>

            <Modal
              title="Import Task ke Aktivitas"
              visible={showModalTask}
              width={502}
              footer={null}
              onCancel={handleCloseModalImportTask}
              maskClosable={false}
            >
              <div className="col-span-4">
                <Input
                  style={{ width: `100%` }}
                  suffix={<SearchOutlined />}
                  defaultValue={queryParams2.keyword}
                  placeholder="Cari Task.."
                  onChange={onChangeProductSearch}
                  allowClear
                />
              </div>
              <div className={"mt-7 flex justify-between mb-4"}>
                <p
                  className={"text-mono30 text-base font-bold "}
                  style={{ lineHeight: "24px" }}
                >
                  List Task
                </p>
                {displayDataImport.length > 0 && (
                  <button
                    className={"bg-transparent"}
                    onClick={() => handleSelectTask()}
                  >
                    <p
                      className={"text-primary100 text-sm font-bold"}
                      style={{ lineHeight: "24px" }}
                    >
                      {dataTaskSelected.length == displayDataImport.length
                        ? "Hapus Semua"
                        : "Pilih semua"}
                    </p>
                  </button>
                )}
              </div>
              {displayDataImport.length > 0 ? (
                displayDataImport.map((task, index) => (
                  <div key={task.id} className="flex-none rounded-md ">
                    <div
                      className={"flex px-4 py-2 border border-inputkategori"}
                    >
                      <div className={"w-11/12"}>
                        <p
                          className={"text-xs font-bold text-mono30"}
                          style={{ lineHeight: "20px" }}
                        >
                          {task.name} T-{task.id}
                        </p>
                        <p
                          className={"text-xs text-mono50"}
                          style={{ lineHeight: "16px" }}
                        >
                          [{task.project_name ? task.project_name : " - "}]
                        </p>
                      </div>
                      <div className={"w-1/12 self-center items-end"}>
                        <Checkbox
                          key={task.id}
                          value={task.id}
                          checked={task.is_selected}
                          onChange={(e) => {
                            handleOnSelectTask(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className={"mt-4 text-center"}>Tidak Ada Data</p>
              )}

              <div
                onClick={handleCloseModalImportTask}
                className={"mt-6 flex justify-end hover:cursor-pointer "}
              >
                <p
                  className={"mr-12 self-center text-sm"}
                  style={{ lineHeight: "16px" }}
                >
                  Batal
                </p>
                <div
                  onClick={() => importMultipleTask()}
                  className={
                    dataTaskSelected.length > 0
                      ? "px-6 py-2 bg-primary100 rounded-[5px] hover:cursor-pointer"
                      : "px-6 py-2 bg-mono80 rounded-[5px]"
                  }
                >
                  <p
                    className={
                      dataTaskSelected.length > 0
                        ? "text-sm text-white"
                        : "text-sm text-mono30"
                    }
                    style={{ lineHeight: "16px" }}
                  >
                    Import Task
                  </p>
                </div>
              </div>
            </Modal>

            <div className="flex flex-col xl:flex-row gap-2 w-full md:w-5/12 xl:w-4/12 md:justify-end items-center">
              <AccessControl hasPermission={ATTENDANCE_TASK_ACTIVITIES_GET}>
                <div className="w-full">
                  <ButtonSys
                    type="default"
                    onClick={onImportTask}
                    disabled={!isAllowedToAddTaskActivities}
                    fullWidth
                  >
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <FileImportIconSvg />
                      <p>Import Task</p>
                    </div>
                  </ButtonSys>
                </div>
              </AccessControl>
              {isAllowedToAddActivity && (
                <div className="w-full">
                  <ButtonSys
                    type="primary"
                    onClick={mOnAddActivityButtonClicked}
                    disabled={!isAllowedToAddActivity}
                    fullWidth
                  >
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <AppstoreAddOutlined />
                      <p>Masukkan Aktivitas</p>
                    </div>
                  </ButtonSys>
                </div>
              )}
            </div>
          </div>
        )}

        {activeSubmenu == "aktivitas" && (
          <Tabs
            defaultActiveKey="3"
            className="md:w-1/2"
            onChange={setTabActiveKey2}
          >
            {isAllowedToGetActivity && activeSubmenu == "aktivitas" && (
              <TabPane tab="Form" key="3" />
            )}
            {isAllowedToGetTaskActivities && activeSubmenu == "aktivitas" && (
              <TabPane tab="Task" key="4" />
            )}
          </Tabs>
        )}
        {activeSubmenu == "aktivitas" && checkFormOrTask()}
        {activeSubmenu == "cuti" && (
          <div
            className={
              "bg-white rounded-[5px] mt-8 first-letter:border border-solid  p-6"
            }
            style={{ boxShadow: "0px 0px 12px 2px #000E3312" }}
          >
            <p className={"text-base font-bold leading-6 text-[#4D4D4D  ]"}>
              Daftar Pengajuan Cuti
            </p>
            {isAllowedToLeaveCount && (
              <div
                className={
                  "my-4 bg-[#00589F] rounded-[5px] h-8 flex justify-between px-3 py-1 text-white text-[14px] leading-6 font-bold"
                }
              >
                <p className={""}>Jumlah Cuti Tahunan :</p>
                <p>{leaveCount} Hari Tersisa</p>
              </div>
            )}
            <Table
              className="tableTask"
              dataSource={displayDataLeaves}
              columns={columnLeaves}
              loading={loadingTasks}
              scroll={{ x: "max-content" }}
              pagination={{
                current: queryParams.page,
                pageSize: queryParams.rows,
                total: rawDataLeaves.total,
              }}
              onChange={(pagination, _, sorter) => {
                setQueryParams({
                  page: pagination.current,
                  rows: pagination.pageSize,
                });
              }}
              rowClassName={(record, idx) => {
                return `${record.id === rowstate && `cursor-pointer`} ${
                  record.status === 1 && `bg-bgBackdropOverdue`
                }`;
              }}
            />
            <AttendanceStaffLeaveDrawer
              getDataNew={fetchData}
              dataToken={dataToken}
              idUser={idUser}
              username={username}
              visible={showModalLeave}
              activityFormId={activityDrawerState.selectedActivityFormId}
              onClose={() => setShowModalLeave(false)}
            />
            <AttendanceStaffLeaveDetailDrawer
              fetchData={fetchData}
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
