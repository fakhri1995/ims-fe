import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { FC, useMemo } from "react";

import { getAntdTablePaginationConfig } from "lib/standard-config";

/**
 * Component StaffAttendanceKehadiranTable's props.
 */
export interface IStaffAttendanceKehadiranTable {}

/**
 * Component StaffAttendanceKehadiranTable
 */
export const StaffAttendanceKehadiranTable: FC<
  IStaffAttendanceKehadiranTable
> = (props) => {
  const tableColumns = useMemo<ColumnsType<KehadiranTableItemType>>(
    () => {
      const sortableOpts = {
        sorter: true,
      };

      return [
        {
          key: "id",
          title: "No.",
          render: (_, __, index) => `${++index}`,
          width: 64,
        },
        {
          key: "id",
          title: "Waktu Check In",
          dataIndex: "checkInTime",
          ...sortableOpts,
        },
        {
          key: "id",
          title: "Waktu Check Out",
          dataIndex: "checkOutTime",
          ...sortableOpts,
        },
        {
          key: "id",
          title: "Kerja",
          dataIndex: "workingFrom",
          ...sortableOpts,
        },
        {
          key: "id",
          title: "Lokasi Check In",
          dataIndex: "checkInLocation",
        },
        {
          key: "id",
          title: "Lokasi Check Out",
          dataIndex: "checkOutLocation",
        },
      ];
    },
    [
      /** TODO */
    ]
  );

  const tablePaginationConf = useMemo(
    () => getAntdTablePaginationConfig(),
    [
      /**TODO */
    ]
  );

  return (
    <Table<KehadiranTableItemType>
      columns={tableColumns}
      dataSource={[]}
      pagination={tablePaginationConf}
      onRow={() => {
        return {
          className: "hover:cursor-pointer",
        };
      }}
    />
  );
};

type KehadiranTableItemType = {
  id: number;

  checkInTime: string;
  checkOutTime: string;

  checkInLocation: string;
  checkOutLocation: string;

  workingFrom: "WFH" | "WFO";
};
