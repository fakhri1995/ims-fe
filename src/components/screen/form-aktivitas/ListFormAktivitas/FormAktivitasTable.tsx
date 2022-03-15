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

  currentPage?: number;

  onTriggerChangeCriteria: (
    newCriteria: Partial<IGetAttendanceFormsParams>
  ) => void;
}

export const FormAktivitasTable: FC<IFormAktivitasTable> = ({
  isLoading,
  data,
  tablePageSize,
  tableTotalData,
  currentPage,
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
        // render: (_, __, index) => `${(((currentPage || 1) - 1) * 10 + index) + 1}.`,
        width: 64,
      },
      {
        title: "Form Aktivitas",
        dataIndex: "name",
        sorter: true,
      },
      {
        title: "Tanggal Diubah",
        dataIndex: "updated_at",
        sorter: true,
      },
      {
        title: "Jumlah Staff",
        dataIndex: "users_count",
        sorter: true,
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
      current: currentPage || 1,
    });
  }, [tablePageSize, tableTotalData, currentPage]);

  return (
    <Table<GetAttendanceFormsDatum>
      loading={isLoading}
      columns={tableColumns}
      dataSource={mappedData}
      scroll={{ x: 640 }}
      className="tableTypeTask"
      onChange={(pagination, _, sorter) => {
        let criteria: IGetAttendanceFormsParams = {
          page: pagination.current,
          rows: pagination.pageSize,
        };

        if ("field" in sorter) {
          criteria.sort_by =
            sorter.order === undefined
              ? ""
              : sorter.field === "users_count"
              ? "count"
              : sorter.field?.toString();
          criteria.sort_type =
            sorter.order === undefined
              ? ""
              : sorter.order === "ascend"
              ? "asc"
              : "desc";
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
