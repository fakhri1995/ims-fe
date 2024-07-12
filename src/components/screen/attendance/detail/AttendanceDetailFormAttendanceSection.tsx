import { ConfigProvider, Table, Tabs } from "antd";
import { ColumnsType } from "antd/lib/table";
import { isBefore } from "date-fns";
import moment from "moment";
import { FC, useEffect, useMemo, useState } from "react";
import React from "react";

import { AccessControl } from "components/features/AccessControl";

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
          const formattedDate = formatDateToLocale(new Date(value), "HH:mm");

          return <>{formattedDate}</>;
        },
        align: "center",
      },
    ];

    dynamicNameFieldPairs.columnNames.forEach((column, index) => {
      columns.push({
        key: dynamicNameFieldPairs.fieldKeys[index],
        title: column,
        dataIndex: dynamicNameFieldPairs.fieldKeys[index],
        render: (value) => <p className="truncate max-w-80">{value}</p>,
        width: 320,
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

  function renderTaskName(task) {
    if (task.task != null) {
      if (task.task.name != null) {
        return task.task.name;
      } else {
        return "-";
      }
    } else {
      if (task.task_export.name != null) {
        return task.task_export.name;
      } else {
        return "-";
      }
    }
  }

  return (
    <section className="mig-platform--p-0 text-gray-500 pb-3">
      <h1 className="mig-body--bold border-b py-3 px-4">Activity</h1>
      <div className="flex items-center gap-3 py-3 px-4">
        <div
          onClick={() => setTabActiveKey("1")}
          className={`${
            tabActiveKey == "1"
              ? "bg-primary100 mig-body--medium text-white"
              : "bg-white border hover:bg-primary75 mig-body text-mono80 hover:text-white"
          } rounded-[48px] py-1 px-4 hover:cursor-pointer `}
        >
          <p>Form</p>
        </div>
        {isAllowedToGetTaskActivities && (
          <div
            onClick={() => setTabActiveKey("2")}
            className={`${
              tabActiveKey == "2"
                ? "bg-primary100 mig-body--medium text-white"
                : "bg-white border hover:bg-primary75 mig-body text-mono80 hover:text-white "
            } rounded-[48px] py-1 px-4 hover:cursor-pointer`}
          >
            <p>Task</p>
          </div>
        )}
      </div>

      <div className="px-4">
        {tabActiveKey == "1" ? (
          <Table<(typeof dataSource)[0]>
            columns={tableColums}
            dataSource={dataSource}
            pagination={tablePaginationConf}
            loading={isDataSourceLoading}
            scroll={{ x: "max-content" }}
            className="tableTypeTask"
          />
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
                    {task.activity} (T-
                    {task.task_id ? task.task_id : task.task_export_id})
                  </p>
                  <p
                    className={"text-xs text-mono50"}
                    style={{ lineHeight: "16px" }}
                  >
                    [{renderTaskName(task)}]
                  </p>
                </div>
                <div className={"w-1/12 self-center flex justify-end"}>
                  <p>{moment(task.updated_at).format("HH:mm")}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
