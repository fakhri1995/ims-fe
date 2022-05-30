import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { useRouter } from "next/router";
import { FC, memo, useMemo } from "react";
import { useQuery } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import { ATTENDANCE_FORMS_GET } from "lib/features";
import { getAntdTablePaginationConfig } from "lib/standard-config";

import {
  AttendanceFormAktivitasService,
  AttendanceFormAktivitasServiceQueryKeys,
  GetAttendanceFormsDatum,
  IGetAttendanceFormsParams,
} from "apis/attendance";

export interface IFormAktivitasTable {
  page: number;
  rows: number;
  sort_by: string;
  sort_type: string;
  keyword: string;

  onTriggerChangeCriteria: (
    newCriteria: Partial<IGetAttendanceFormsParams>
  ) => void;
}

export const FormAktivitasTable: FC<IFormAktivitasTable> = memo(
  ({
    onTriggerChangeCriteria,
    page = 1,
    rows = 10,
    sort_by = "",
    sort_type = "",
    keyword = "",
  }) => {
    const router = useRouter();
    const axiosClient = useAxiosClient();
    const { hasPermission } = useAccessControl();

    const tableQueryCriteria = useMemo(
      () => ({
        page,
        rows,
        sort_by,
        sort_type,
        keyword,
      }),
      [page, rows, sort_by, sort_type, keyword]
    );

    const { data, isLoading } = useQuery(
      [AttendanceFormAktivitasServiceQueryKeys.FIND, tableQueryCriteria],
      () =>
        AttendanceFormAktivitasService.find(axiosClient, tableQueryCriteria),
      {
        enabled: hasPermission(ATTENDANCE_FORMS_GET),
        select: (response) => {
          const mappedData = response.data.data.data.map((datum) => {
            return {
              ...datum,
              key: datum.id,
              updated_at: formatDateToLocale(
                new Date(datum.updated_at),
                "dd MMM yyyy, hh:mm",
                datum.updated_at as string
              ),
            } as GetAttendanceFormsDatum;
          });

          response.data.data.data = mappedData;

          return response;
        },
      }
    );

    const onRowClicked = (record: GetAttendanceFormsDatum) => {
      if (router.isReady) {
        router.push(`/attendance/form-aktivitas/${record.id}`);
      }
    };

    const tableColumns = useMemo<ColumnsType<GetAttendanceFormsDatum>>(() => {
      return [
        {
          key: "id",
          title: "No.",
          dataIndex: "id",
          render: (_, __, index) => `${data?.data.data.from + index}.`,
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
    }, [data]);

    const tablePaginationConf = useMemo(() => {
      return getAntdTablePaginationConfig({
        pageSize: rows,
        total: data?.data.data.total || 0,
        current: page || 1,
      });
    }, [rows, data, page]);

    return (
      <Table<GetAttendanceFormsDatum>
        loading={isLoading}
        columns={tableColumns}
        dataSource={data?.data.data.data || []}
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
  }
);
FormAktivitasTable.displayName = "FormAktivitasTable";
