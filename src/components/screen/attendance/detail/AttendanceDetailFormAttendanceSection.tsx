import { ConfigProvider, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { isBefore } from "date-fns";
import { FC, useMemo, useState } from "react";
import React from "react";

import { DataEmptyState } from "components/states/DataEmptyState";

import { formatDateToLocale } from "lib/date-utils";
import { getAntdTablePaginationConfig } from "lib/standard-config";

import { useGetAttendanceDetailDataSource } from "apis/attendance";

/**
 * Component AttendanceDetailFormAttendanceSection's props.
 */
export interface IAttendanceDetailFormAttendanceSection {
  attendanceId?: number;
}

/**
 * Component AttendanceDetailFormAttendanceSection
 */
export const AttendanceDetailFormAttendanceSection: FC<
  IAttendanceDetailFormAttendanceSection
> = ({ attendanceId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

  return (
    <section className="mig-platform space-y-6 text-gray-500">
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
    </section>
  );
};
