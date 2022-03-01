import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";

import type {
  GetAttendanceFormsDatum,
  IGetAttendanceFormsCriteria,
} from "types/api/attendances/get-attendance-forms";

export interface IFormAktivitasTable {
  isLoading: boolean;

  data?: GetAttendanceFormsDatum[];
  tablePageSize: number;
  tableTotalData: number;

  onTriggerChangeCriteria: (
    newCriteria: Partial<IGetAttendanceFormsCriteria>
  ) => void;
}

export const FormAktivitasTable: FC<IFormAktivitasTable> = ({
  isLoading,
  data,
  tablePageSize,
  tableTotalData,
  onTriggerChangeCriteria,
}) => {
  const router = useRouter();

  const onRowClicked = (record: GetAttendanceFormsDatum) => {
    if (router.isReady) {
      router.push(`/attendance/form-aktivitas/${record.id}`);
    }
  };

  const mappedData = !data
    ? []
    : [...data].map((datum) => ({
        ...datum,
        key: datum.id,
        updated_at: format(new Date(datum.updated_at), "dd MMM yyyy, hh:mm", {
          locale: idLocale,
        }),
      }));

  const tableColumns: ColumnsType<GetAttendanceFormsDatum> = useMemo(() => {
    return [
      {
        key: "id",
        title: "No.",
        dataIndex: "id",
        render: (_, __, index) => `${++index}.`,
        width: 48,
      },
      {
        key: "id",
        title: "Form Aktivitas",
        dataIndex: "name",
        sorter: true,
        sortDirections: ["ascend", "descend", "ascend"],
      },
      {
        key: "id",
        title: "Tanggal Diubah",
        dataIndex: "updated_at",
        sorter: true,
        sortDirections: ["ascend", "descend", "ascend"],
      },
      {
        key: "id",
        title: "Jumlah Staff",
        dataIndex: "users_count",
        sorter: true,
        sortDirections: ["ascend", "descend", "ascend"],
      },
      {
        key: "id",
        title: "Deskripsi",
        dataIndex: "description",
        ellipsis: { showTitle: true },
      },
    ];
  }, []);

  return (
    <Table<GetAttendanceFormsDatum>
      bordered
      loading={isLoading}
      size="middle"
      columns={tableColumns}
      dataSource={mappedData || []}
      scroll={{ x: 1500 }}
      onChange={(pagination, _, sorter) => {
        let criteria: IGetAttendanceFormsCriteria = {
          page: pagination.current,
          rows: pagination.pageSize,
        };

        if ("field" in sorter) {
          criteria.sort_by =
            sorter.field === "users_count" ? "count" : sorter.field?.toString();
          criteria.sort_type = sorter.order === "ascend" ? "asc" : "desc";
        }

        onTriggerChangeCriteria(criteria);
      }}
      pagination={{
        position: ["bottomLeft"],
        className: "pt-6",
        pageSize: tablePageSize,
        total: tableTotalData,
      }}
      onRow={(datum) => {
        return {
          onClick: () => onRowClicked(datum),
          className: "hover:cursor-pointer",
        };
      }}
    />
  );
};
