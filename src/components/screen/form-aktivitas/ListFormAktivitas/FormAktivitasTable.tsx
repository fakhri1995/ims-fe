import { faker } from "@faker-js/faker";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import type { FC } from "react";

export interface IFormAktivitasTable {}

export const FormAktivitasTable: FC<IFormAktivitasTable> = () => {
  const onPaginationChange = (pageNumber: number, pageSize: number) => {
    /** TODO: trigger data fetching on page change? */
    console.log(`pagination.onChange(${pageNumber}, ${pageSize})`);
  };

  const onRowClicked = (record: AktivitasData) => {
    alert(`Clicked id: ${record.id}`);
  };

  return (
    <Table<AktivitasData>
      onRow={(datum, index) => {
        return {
          onClick: () => onRowClicked(datum),
          className: "hover:cursor-pointer",
        };
      }}
      size="middle"
      columns={tableColumns}
      dataSource={tableData}
      scroll={{ y: 640 }}
      pagination={{
        position: ["bottomLeft"],
        className: "pt-6",
        onChange: onPaginationChange,
      }}
    />
  );
};

interface AktivitasData {
  id: number | string;
  title: string;
  updatedDate: string;
  staffCount: number;
  description: string;
}

const tableColumns: ColumnsType<AktivitasData> = [
  {
    key: "id",
    title: "No.",
    dataIndex: "id",
    render: (_, __, index) => `${++index}.`,
  },
  {
    key: "id",
    title: "Form Aktivitas",
    dataIndex: "title",
  },
  {
    key: "id",
    title: "Tanggal Diubah",
    dataIndex: "updatedDate",
    sorter: (a, b) => {
      return a.updatedDate.length - b.updatedDate.length;
    },
  },
  {
    key: "id",
    title: "Jumlah Staff",
    dataIndex: "staffCount",
    sorter: (a, b) => {
      /** TODO: Add third param in this sorter function `SortOrder` to sync with backend */

      /** Sort client-side */
      return a.staffCount - b.staffCount;
    },
  },
  {
    key: "id",
    title: "Deskripsi",
    dataIndex: "description",
    ellipsis: { showTitle: true },
  },
];

/** TODO: use actual data */
const tableData: AktivitasData[] = Array(100)
  .fill(0)
  .map(() => {
    return {
      id: faker.random.alphaNumeric(5),
      title: faker.name.title(),
      updatedDate: format(faker.date.past(), "dd MMM yyyy, hh:mm", {
        locale: idLocale,
      }),
      staffCount: faker.datatype.number(),
      description: faker.random.words(4),
    };
  });
