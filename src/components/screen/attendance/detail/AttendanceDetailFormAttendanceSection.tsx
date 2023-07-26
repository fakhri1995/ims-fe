import { ConfigProvider, Table, Tabs } from "antd";
import { ColumnsType } from "antd/lib/table";
import { isBefore } from "date-fns";
import moment from "moment";
import { FC, useEffect, useMemo, useState } from "react";
import React from "react";

import { AccessControl } from "components/features/AccessControl";
import { DataEmptyState } from "components/states/DataEmptyState";

import { useAccessControl } from "contexts/access-control";

import { formatDateToLocale } from "lib/date-utils";
import { ATTENDANCE_TASK_ACTIVITIES_GET } from "lib/features";
import { permissionWarningNotification } from "lib/helper";
import { getAntdTablePaginationConfig } from "lib/standard-config";

import { useGetAttendanceDetailDataSource } from "apis/attendance";

/**
 * Component AttendanceDetailFormAttendanceSection's props.
 */
const { TabPane } = Tabs;
export interface IAttendanceDetailFormAttendanceSection {
  attendanceId?: number;
  token?: string;
}

/**
 * Component AttendanceDetailFormAttendanceSection
 */
export const AttendanceDetailFormAttendanceSection: FC<
  IAttendanceDetailFormAttendanceSection
> = ({ attendanceId, token }) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToGetTaskActivities = hasPermission(
    ATTENDANCE_TASK_ACTIVITIES_GET
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dataTasks, setDataTasks] = useState([]);
  const [tabActiveKey, setTabActiveKey] = useState<"1" | "2" | string>("1");
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
          const formattedDate = formatDateToLocale(new Date(value), "HH:mm");

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
  }, []);

  return (
    <section className="mig-platform space-y-6 text-gray-500">
      <div className="flex items-center justify-between">
        <Tabs
          defaultActiveKey="1"
          className="md:w-1/2"
          onChange={setTabActiveKey}
        >
          <TabPane tab="Form" key="1" />
          <AccessControl hasPermission={ATTENDANCE_TASK_ACTIVITIES_GET}>
            <TabPane tab="Task" key="2" />
          </AccessControl>
        </Tabs>
      </div>

      {tabActiveKey == "1" ? (
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
      ) : (
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
                  [{task.project ? task.project.name : " - "}]
                </p>
              </div>
              <div className={"w-1/12 self-center flex justify-end"}>
                <p>{moment(task.updated_at).format("HH:mm")}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </section>
  );
};
