import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";

import { getAntdTablePaginationConfig } from "lib/standard-config";

import {
  GetAttendanceFormsDatum,
  IGetAttendanceFormsParams,
} from "apis/attendance";

export interface IFormAktivitasTable {
  isLoading: boolean;

  data?: GetAttendanceFormsDatum[];
  tablePageSize: number;
  tableTotalData: number;

  onTriggerChangeCriteria: (
    newCriteria: Partial<IGetAttendanceFormsParams>
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

  const tableColumns = useMemo<ColumnsType<GetAttendanceFormsDatum>>(() => {
    return [
      {
        key: "id",
        title: "No.",
        dataIndex: "id",
        render: (_, __, index) => `${++index}.`,
        width: 64,
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
        width: 192,
      },
      {
        key: "id",
        title: "Deskripsi",
        dataIndex: "description",
        ellipsis: { showTitle: true },
      },
    ];
  }, []);

  const tablePaginationConf = useMemo(() => {
    return getAntdTablePaginationConfig({
      pageSize: tablePageSize,
      total: tableTotalData,
    });
  }, [tablePageSize, tableTotalData]);

  return (
    <Table<GetAttendanceFormsDatum>
      loading={isLoading}
      columns={tableColumns}
      dataSource={mappedData || []}
      scroll={{ x: 1500 }}
      onChange={(pagination, _, sorter) => {
        let criteria: IGetAttendanceFormsParams = {
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
      pagination={tablePaginationConf}
      onRow={(datum) => {
        return {
          onClick: () => onRowClicked(datum),
          className: "hover:cursor-pointer",
        };
      }}
    />
  );
};
