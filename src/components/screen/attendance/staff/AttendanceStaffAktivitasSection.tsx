import {
  AppstoreAddOutlined,
  FileAddOutlined,
  FileImageFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { Checkbox, ConfigProvider, Input, Modal, Table, Tabs } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { isBefore } from "date-fns";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import { DataEmptyState } from "components/states/DataEmptyState";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import {
  ATTENDANCE_ACTIVITY_ADD,
  ATTENDANCE_ACTIVITY_DELETE,
  ATTENDANCE_ACTIVITY_UPDATE,
} from "lib/features";
import {
  generateStaticAssetUrl,
  getFileName,
  permissionWarningNotification,
} from "lib/helper";
import { getAntdTablePaginationConfig } from "lib/standard-config";

import {
  useGetAttendeeInfo,
  useGetUserAttendanceActivities,
} from "apis/attendance";
import { AuthService, AuthServiceQueryKeys } from "apis/auth";

import { FileImportIconSvg } from "../../../../components/icon";
import { AttendanceStaffAktivitasDrawer } from "./AttendanceStaffAktivitasDrawer";

const { TabPane } = Tabs;

/**
 * Component AttendanceStaffAktivitasSection's props.
 */
export interface IAttendanceStaffAktivitasSection {}

/**
 * Component AttendanceStaffAktivitasSection
 */
export const AttendanceStaffAktivitasSection: FC<
  IAttendanceStaffAktivitasSection
> = () => {
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();
  const isAllowedToAddActivity = hasPermission(ATTENDANCE_ACTIVITY_ADD);
  const isAllowedToUpdateActivity = hasPermission(ATTENDANCE_ACTIVITY_UPDATE);
  const isAllowedToDeleteActivity = hasPermission(ATTENDANCE_ACTIVITY_DELETE);

  /** 1 => Hari Ini, 2 => Riwayat */
  const [tabActiveKey, setTabActiveKey] = useState<"1" | "2" | string>("1");
  const [tabActiveKey2, setTabActiveKey2] = useState<"3" | "4" | string>("3");
  const { dataSource, dynamicNameFieldPairs, isDataSourceLoading } =
    useGetUserAttendanceActivities(tabActiveKey === "1" ? "today" : "past");
  const { attendeeStatus } = useGetAttendeeInfo();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showModalTask, setShowModalTask] = useState(false);

  const [dataTask, setDataTask] = useState([
    {
      id: 1,
      task_name: "Diskusi PRD Attendance (T-2213)",
      project_name: "Diskusi PRD",
      updated_at: "2023-06-07 16:52:57",
      is_selected: true,
    },
    {
      id: 2,
      task_name: "Pengembangan Tampilan Attendance (T-2214)",
      project_name: "Pengembangan Tampilan",
      updated_at: "2023-06-07 16:52:57",
      is_selected: true,
    },
    {
      id: 3,
      task_name: "Revisi Tampilan Mobile Log Activity (T-2222)",
      project_name: "Revisi Tampilan",
      updated_at: "2023-06-07 16:52:57",
      is_selected: true,
    },
  ]);

  const [dataTaskSelected, setDataTaskSelected] = useState([]);
  const [dataTaskTempSelected, setDataTaskTempSelected] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 6),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ "deadline"),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    status_ids: withDefault(StringParam, undefined),
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
    setShowModalTask(!showModalTask);
  };

  useEffect(() => {
    setLoadingTasks(false);
    handleSelectAllTask();
  }, []);

  const handleSelectAllTask = () => {
    let dataTemp = [];
    for (let a = 0; a < dataTask.length; a++) {
      dataTemp.push(dataTask[a].id);
    }
    setDataTaskSelected(dataTemp);
    setDataTaskTempSelected(dataTask);
  };

  const handleUnSelectAllTask = () => {
    let dataTaskTemp = [];
    for (let a = 0; a < dataTaskTempSelected.length; a++) {
      dataTaskTemp.push({
        id: dataTaskTempSelected[a].id,
        task_name: dataTaskTempSelected[a].task_name,
        project_name: dataTaskTempSelected[a].project_name,
        is_selected: false,
      });
    }
    setDataTaskSelected([]);
    setDataTaskTempSelected([...dataTaskTemp]);
  };

  const handleOnSelectTask = (value) => {
    console.log("selected ", value);
    let dataTaskTemp = [];
    for (let a = 0; a < dataTaskTempSelected.length; a++) {
      if (value.target.value == dataTaskTempSelected[a].id) {
        dataTaskTemp.push({
          id: dataTaskTempSelected[a].id,
          task_name: dataTaskTempSelected[a].task_name,
          project_name: dataTaskTempSelected[a].project_name,
          is_selected: value.target.checked,
        });
      } else {
        dataTaskTemp.push({
          id: dataTaskTempSelected[a].id,
          task_name: dataTaskTempSelected[a].task_name,
          project_name: dataTaskTempSelected[a].project_name,
          is_selected: dataTaskTempSelected[a].is_selected,
        });
      }
    }
    let dataTemp = dataTaskSelected;
    if (dataTemp.length == 0) {
      dataTemp.push(value.target.value);
    } else if (dataTaskTempSelected.length > 1) {
      if (value.target.checked == false) {
        dataTemp = dataTemp.filter(function (item) {
          return item !== value.target.value;
        });
      } else {
        dataTemp.push(value.target.value);
      }
      setDataTaskSelected(dataTemp);
    }
    setDataTaskTempSelected([...dataTaskTemp]);

    // let dataTaskTemp = dataTaskTempSelected;
    // if (dataTaskTemp.length == 0) {
    //   dataTaskTemp.push(value.target.value);
    // } else if (dataTaskTempSelected.length > 1) {
    //   if (value.target.checked == false) {
    //     dataTaskTemp = dataTaskTemp.filter(function (item) {
    //       return item !== value.target.value;
    //     });
    //   } else {
    //     dataTaskTemp.push(value.target.value);
    //   }
    // }
    // setDataTaskTempSelected([...dataTaskTemp]);
  };

  const handleSelectTask = () => {
    if (dataTaskSelected.length == dataTaskTempSelected.length) {
      handleUnSelectAllTask();
    } else {
      handleSelectAllTask();
    }
  };
  const columnsTable: ColumnsType = [
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
      dataIndex: "task_name",
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
          dataSource={dataTaskTempSelected}
          loading={loadingTasks}
          pagination={{
            current: queryParams.page,
            pageSize: queryParams.rows,
            total: dataTask.length,
            showSizeChanger: true,
          }}
          onChange={(pagination, filters, sorter, extra) => {
            setQueryParams({
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
                return (
                  <div key={task.id} className="flex-none rounded-md ">
                    <div
                      className={"flex px-4 py-2 border border-inputkategori"}
                    >
                      <div className={"w-11/12"}>
                        <p
                          className={"text-xs font-bold text-mono30"}
                          style={{ lineHeight: "20px" }}
                        >
                          {task.task_name}
                        </p>
                        <p
                          className={"text-xs text-mono50"}
                          style={{ lineHeight: "16px" }}
                        >
                          [{task.project_name}]
                        </p>
                      </div>
                      <div className={"w-1/12 self-center flex justify-end"}>
                        <p>08.33</p>
                      </div>
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
          columns={columnsTable}
          dataSource={dataTaskTempSelected}
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
      );
    }
  }
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
            open={showModalTask}
            width={502}
            footer={null}
            onCancel={() => setShowModalTask(false)}
          >
            <div className="col-span-4">
              <Input
                style={{ width: `100%` }}
                suffix={<SearchOutlined />}
                // defaultValue={queryParams.keyword}
                placeholder="Cari Task.."
                // onChange={onChangeProductSearch}
                // onKeyPress={onKeyPressHandler}
                // allowClear
                // disabled={!isAllowedToSeeModels}
              />
            </div>
            <div className={"mt-7 flex justify-between"}>
              <p
                className={"text-mono30 text-base font-bold "}
                style={{ lineHeight: "24px" }}
              >
                List Task
              </p>
              <button
                className={"bg-transparent"}
                onClick={() => handleSelectTask()}
              >
                <p
                  className={"text-primary100 text-sm font-bold"}
                  style={{ lineHeight: "24px" }}
                >
                  {dataTaskSelected.length == dataTaskTempSelected.length
                    ? "Hapus Semua"
                    : "Pilih semua"}
                </p>
              </button>
            </div>
            <Table
              rowKey={(record) => record.id}
              className=""
              showHeader={false}
              dataSource={dataTaskTempSelected}
              loading={loadingTasks}
              pagination={{
                current: queryParams.page,
                pageSize: queryParams.rows,
                total: dataTask.length,
                showSizeChanger: true,
              }}
              onChange={(pagination, filters, sorter, extra) => {
                setQueryParams({
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
                    return (
                      <div key={task.id} className="flex-none rounded-md ">
                        <div
                          className={
                            "flex px-4 py-2 border border-inputkategori"
                          }
                        >
                          <div className={"w-11/12"}>
                            <p
                              className={"text-xs font-bold text-mono30"}
                              style={{ lineHeight: "20px" }}
                            >
                              {task.task_name}
                            </p>
                            <p
                              className={"text-xs text-mono50"}
                              style={{ lineHeight: "16px" }}
                            >
                              [{task.project_name}]
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
                    );
                  },
                },
              ]}
            />
            <div className={"mt-6 flex justify-end"}>
              <p
                className={"mr-12 self-center hover:cursor-pointer text-sm"}
                style={{ lineHeight: "16px" }}
              >
                Batal
              </p>
              <div
                className={
                  "px-6 py-2 bg-mono80 rounded-[5px] hover:cursor-pointer"
                }
              >
                <p className={"text-sm"} style={{ lineHeight: "16px" }}>
                  Import Task
                </p>
              </div>
            </div>
          </Modal>

          <div className="flex space-x-6 md:w-1/2 justify-end items-center">
            <ButtonSys
              type="default"
              onClick={onImportTask}
              disabled={!isAllowedToAddActivity}
            >
              <FileImportIconSvg />
              <p className={"ml-2"}>Import Task</p>
            </ButtonSys>
            <ButtonSys
              type="primary"
              onClick={mOnAddActivityButtonClicked}
              disabled={!isAllowedToAddActivity}
            >
              <AppstoreAddOutlined className="mr-2" />
              Masukkan Aktivitas
            </ButtonSys>
          </div>
        </div>
        <Tabs
          defaultActiveKey="3"
          className="md:w-1/2"
          onChange={setTabActiveKey2}
        >
          <TabPane tab="Form" key="3" />
          <TabPane tab="Task" key="4" />
        </Tabs>

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
