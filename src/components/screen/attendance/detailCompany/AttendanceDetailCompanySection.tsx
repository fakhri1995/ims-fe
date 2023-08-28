import { ConfigProvider, Table, Tabs } from "antd";
import { ColumnsType } from "antd/lib/table";
import { isBefore } from "date-fns";
import moment from "moment";
import { useRouter } from "next/router";
import { FC, useEffect, useMemo, useState } from "react";
import React from "react";

import ButtonSys from "components/button";
import { AccessControl } from "components/features/AccessControl";
import { DataEmptyState } from "components/states/DataEmptyState";

import { useAccessControl } from "contexts/access-control";

import { formatDateToLocale } from "lib/date-utils";
import { ATTENDANCE_TASK_ACTIVITIES_GET } from "lib/features";
import { permissionWarningNotification } from "lib/helper";
import { getAntdTablePaginationConfig } from "lib/standard-config";

import { useGetAttendanceDetailDataSource } from "apis/attendance";

/**
 * Component AttendanceDetailCompanySection's props.
 */
const { TabPane } = Tabs;

export interface IAttendanceDetailCompanySection {
  attendanceId?: number;
  token?: string;
}

/**
 * Component AttendanceDetailCompanySection
 */
export const AttendanceDetailCompanySection: FC<
  IAttendanceDetailCompanySection
> = ({ attendanceId, token }) => {
  const { hasPermission } = useAccessControl();
  const router = useRouter();
  const isAllowedToGetTaskActivities = hasPermission(
    ATTENDANCE_TASK_ACTIVITIES_GET
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dataTasks, setDataTasks] = useState([]);
  const [dataHistory, setDataHistory] = useState([]);
  const [dataHistoryTask, setDataHistoryTask] = useState([]);
  const [tabActiveKey, setTabActiveKey] = useState<"1" | "2" | string>("1");
  const [tabActiveKey2, setTabActiveKey2] = useState<"3" | "4" | string>("");
  const [userId, setUserId] = useState(null);
  const { dataSource, dynamicNameFieldPairs, isDataSourceLoading } =
    useGetAttendanceDetailDataSource(attendanceId);
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

    dynamicNameFieldPairs.columnNames.forEach((column, index) => {
      columns.push({
        key: dynamicNameFieldPairs.fieldKeys[index],
        title: column,
        dataIndex: dynamicNameFieldPairs.fieldKeys[index],
      });
    });

    return columns;
  }, [pageSize, currentPage, dynamicNameFieldPairs]);

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

  useEffect(() => {
    getUserId();
    getAttendanceAdmin();
    getAttendance();
    checkActivityTask();
  }, []);

  const getUserId = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAttendanceUserAdmin?id=${attendanceId}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(token),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setUserId(res2.data.user_attendance.user_id);
          getAttendanceTask(res2.data.user_attendance.user_id);
        }
      });
  };

  const getAttendance = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAttendanceActivities?id=${attendanceId}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(token),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          console.log("get data ", res2);
          setDataHistory(res2.data.last_two_month_activities);
        }
      });
  };
  const getAttendanceTask = (id) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserAttendanceTaskActivitiesAdmin?id=${id}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(token),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          console.log("get attendance task ", res2);
          setDataHistoryTask(res2.data.last_two_month_activities);
        }
      });
  };
  const getAttendanceAdmin = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAttendanceTaskActivitiesAdmin?id=${attendanceId}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(token),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataTasks(res2.data);
        }
      });
  };

  const checkActivityTask = () => {
    // if (isAllowedToGetActivity) {
    setTabActiveKey2("3");
    // } else if (isAllowedToGetTaskActivities) {
    // setTabActiveKey2("4");
    // }
  };

  const onViewProject = () => {
    router.push(`/attendanceCompany/projects/${userId}`);
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
      dataIndex: "activity",
    },
  ];

  function checkFormOrTask() {
    if (tabActiveKey == "1" && tabActiveKey2 == "3") {
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
          />
        </ConfigProvider>
      );
    } else if (tabActiveKey == "2" && tabActiveKey2 == "3") {
      return (
        <ConfigProvider
          renderEmpty={() => (
            <DataEmptyState caption="Belum ada riwayat aktivitas" />
          )}
        >
          <Table<typeof dataSource[0]>
            columns={tableColums}
            dataSource={dataHistory}
            pagination={tablePaginationConf}
            loading={isDataSourceLoading}
            scroll={{ x: "max-content" }}
            className="tableTypeTask"
          />
        </ConfigProvider>
      );
    } else if (tabActiveKey == "1" && tabActiveKey2 == "4") {
      return (
        dataTasks.length > 0 &&
        dataTasks.map((task, index) => (
          <div key={task.id} className="flex-none rounded-md ">
            <div className={"flex px-4 py-2 border border-inputkategori"}>
              <div className={"w-11/12"}>
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
            </div>
          </div>
        ))
      );
    } else {
      return (
        <Table<typeof dataSource[0]>
          columns={columnsTable}
          dataSource={dataHistoryTask}
          // pagination={tablePaginationConf}
          loading={isDataSourceLoading}
          scroll={{ x: "max-content" }}
          className="tableTypeTask"
        />
      );
    }
  }

  return (
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
        {userId && (
          <ButtonSys
            type="default"
            onClick={onViewProject}
            // disabled={!isAllowedToAddTaskActivities}
          >
            <p className={"ml-2"}>Lihat Proyek dan Tugas</p>
          </ButtonSys>
        )}
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
  );
};
