import { AppstoreAddOutlined, SearchOutlined } from "@ant-design/icons";
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

import { FileImportIconSvg, XIconSvg } from "../../../../components/icon";
import { AttendanceStaffAktivitasDrawer } from "./AttendanceStaffAktivitasDrawer";

const { TabPane } = Tabs;

/**
 * Component AttendanceStaffAktivitasSection's props.
 */
export interface IAttendanceStaffAktivitasSection {
  dataToken: string;
  idUser: number;
}

/**
 * Component AttendanceStaffAktivitasSection
 */
export const AttendanceStaffAktivitasSection: FC<
  IAttendanceStaffAktivitasSection
> = ({ dataToken, idUser }) => {
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

  const [dataTaskSelected, setDataTaskSelected] = useState([]);
  const [displayDataImport, setDisplayDataImport] = useState([]);
  const [displayDataTaskToday, setDisplayDataTaskToday] = useState([]);
  const [displayDataTaskHistory, setDisplayDataTaskHistory] = useState([]);

  const [loadingTasks, setLoadingTasks] = useState(true);
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 6),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ "deadline"),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    status_ids: withDefault(StringParam, undefined),
  });

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
    (datum: typeof dataSource[0]) => {
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
  }, []);

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

  function checkFormOrTask() {
    if (tabActiveKey2 == "3") {
      return (
        <ConfigProvider
          renderEmpty={() => (
            <DataEmptyState caption="Belum ada aktivitas. Silakan masukkan aktivitas untuk hari ini" />
          )}
        >
          <Table<typeof dataSource[0]>
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
    } else if (tabActiveKey == "1" && tabActiveKey2 == "4") {
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
                          {task.activity} (T-{task.task_id})
                        </p>
                        <p
                          className={"text-xs text-mono50"}
                          style={{ lineHeight: "16px" }}
                        >
                          [{task.task.project ? task.task.project.name : " - "}]
                        </p>
                      </div>
                      <div className={"w-1/12 self-center flex justify-end"}>
                        <p>{moment(task.updated_at).format("HH:mm")}</p>
                      </div>
                      <button
                        className="bg-transparent hover:opacity-75 -mt-0.5"
                        onClick={() => handleDeleteTaskActivity(task.id)}
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
    } else {
      return (
        <Table<typeof dataSource[0]>
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
        <h3 className="mig-heading--4">Aktivitas</h3>

        <div className="flex items-center justify-between">
          <Tabs
            defaultActiveKey="1"
            className="md:w-1/2"
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
                suffix={<SearchOutlined rev={""} />}
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
                  <div className={"flex px-4 py-2 border border-inputkategori"}>
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

          <div className="flex flex-wrap gap-2 md:w-1/2 justify-end items-center">
            <AccessControl hasPermission={ATTENDANCE_TASK_ACTIVITIES_GET}>
              <ButtonSys
                type="default"
                onClick={onImportTask}
                disabled={!isAllowedToAddTaskActivities}
              >
                <FileImportIconSvg />
                <p className={"ml-2"}>Import Task</p>
              </ButtonSys>
            </AccessControl>
            {isAllowedToAddActivity && (
              <ButtonSys
                type="primary"
                onClick={mOnAddActivityButtonClicked}
                disabled={!isAllowedToAddActivity}
              >
                <AppstoreAddOutlined rev={""} className="mr-2" />
                Masukkan Aktivitas
              </ButtonSys>
            )}
          </div>
        </div>
        {isAllowedToGetActivity == true ||
        isAllowedToGetTaskActivities == true ? (
          <Tabs
            defaultActiveKey="3"
            className="md:w-1/2"
            onChange={setTabActiveKey2}
          >
            {isAllowedToGetActivity && <TabPane tab="Form" key="3" />}
            {isAllowedToGetTaskActivities && <TabPane tab="Task" key="4" />}
          </Tabs>
        ) : (
          <div></div>
        )}

        {checkFormOrTask()}
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
