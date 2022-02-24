import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useQuery } from "react-query";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  FormAktivitasQueryKeys,
  FormAktivitasService,
} from "services/form-aktivitas";

import type { GetAttendanceFormsDatum } from "types/api/attendances/get-attendance-forms";

export interface IFormAktivitasTable {}

export const FormAktivitasTable: FC<IFormAktivitasTable> = () => {
  const router = useRouter();

  const { axiosClient } = useAxiosClient();
  const { data, isLoading } = useQuery(
    FormAktivitasQueryKeys.FIND,
    () => FormAktivitasService.find(axiosClient),
    {
      select: (response) => {
        /**
         * Transform incoming data from the backend and do some adjustment:
         * 1. Re-format the format of `updated_date`
         * 2. Attach new `key` property.
         */
        const formattedDate = [...response.data.data.data].map((datum) => ({
          ...datum,
          key: datum.id,
          updated_at: format(new Date(datum.updated_at), "dd MMM yyyy, hh:mm", {
            locale: idLocale,
          }),
        }));

        response.data.data.data = formattedDate;
        return response;
      },
    }
  );

  const onPaginationChange = (pageNumber: number, pageSize: number) => {
    /** TODO: trigger data fetching on page change? */
    console.log(`pagination.onChange(${pageNumber}, ${pageSize})`);
  };

  const onRowClicked = (record: GetAttendanceFormsDatum) => {
    if (router.isReady) {
      router.push(`/attendance/form-aktivitas/${record.id}`);
    }
  };

  return (
    <Table<GetAttendanceFormsDatum>
      bordered
      loading={isLoading}
      size="middle"
      columns={tableColumns}
      dataSource={data?.data.data.data || []}
      scroll={{ y: 640 }}
      pagination={{
        position: ["bottomLeft"],
        className: "pt-6",
        onChange: onPaginationChange,
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

const tableColumns: ColumnsType<GetAttendanceFormsDatum> = [
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
  },
  {
    key: "id",
    title: "Tanggal Diubah",
    dataIndex: "updated_at",
    sorter: (a, b) => {
      return a.updated_at.toString().length - b.updated_at.toString().length;
    },
  },
  {
    key: "id",
    title: "Jumlah Staff",
    dataIndex: "users_count",
    sorter: (a, b) => {
      /** TODO: Add third param in this sorter function `SortOrder` to sync with backend */

      /** Sort client-side */
      return a.users_count - b.users_count;
    },
  },
  {
    key: "id",
    title: "Deskripsi",
    dataIndex: "description",
    ellipsis: { showTitle: true },
  },
];
