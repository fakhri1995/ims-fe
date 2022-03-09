import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  AttendanceFormAktivitasService,
  AttendanceServiceQueryKeys,
  Detail,
} from "apis/attendance";

/**
 * Component AktivitasTableInfoCard's props.
 */
export interface IAktivitasTableInfoCard {
  aktivitasId: number;
}

/**
 * Component AktivitasTableInfoCard
 */
export const AktivitasTableInfoCard: FC<IAktivitasTableInfoCard> = ({
  aktivitasId,
}) => {
  const axiosClient = useAxiosClient();
  const { data, isLoading } = useQuery(
    [AttendanceServiceQueryKeys.FIND_ONE, aktivitasId],
    () => AttendanceFormAktivitasService.findOne(axiosClient, aktivitasId),
    {
      select: (response) => {
        return response.data.data.details.map((datum) => ({
          ...datum,
          selected: false,
        })) as AktivitasDetailType[];
      },
    }
  );

  /**
   * We need to create a copy of `data` from the server to be manipulated locally.
   *
   * It is necessary becasue we want to display the detail description on every
   *  User select specific record from the table.
   *
   * We'll manipulate this state `{ selected: boolean }` value.
   */
  const [dataSource, setDataSource] = useState<AktivitasDetailType[]>([]);
  useEffect(() => {
    setDataSource(data || []);
  }, [data]);

  const [aktivitasTitle, setAktivitasTitle] = useState("");
  const [aktivitasDescription, setAktivitasDescription] = useState("");

  const onRowClicked = (record: AktivitasDetailType) => {
    setDataSource((prev) => {
      return [...prev].map((oldRecord) => {
        if (oldRecord.key === record.key) {
          return { ...oldRecord, selected: true };
        }

        if (oldRecord.selected && oldRecord.key !== record.key) {
          return { ...oldRecord, selected: false };
        }

        return oldRecord;
      });
    });

    setAktivitasTitle(record.name);
    setAktivitasDescription(record.description);
  };

  return (
    <div className="mig-platform w-full flex flex-wrap md:flex-nowrap md:space-x-10 space-y-6 md:space-y-0">
      {/* Table */}
      <div className="w-full md:w-1/3">
        <Table<AktivitasDetailType>
          loading={isLoading}
          columns={tableColumns}
          dataSource={dataSource}
          scroll={{ y: 480 }}
          pagination={{
            pageSize: 100,
            position: [
              /** No Pagination */
            ],
          }}
          onRow={(datum) => ({
            className: "hover:cursor-pointer",
            onClick: () => onRowClicked(datum),
          })}
        />
      </div>

      {/* Content */}
      <div className="w-full md:w-2/3 text-mono30">
        {/* Aktivitas Title */}
        <span className="py-3 block font-bold text-sm">{aktivitasTitle}</span>

        {/* Aktivitas Deskription */}
        <p className="mt-6">{aktivitasDescription}</p>
      </div>
    </div>
  );
};

type AktivitasDetailType = Detail & { selected: boolean };

const tableColumns: ColumnsType<AktivitasDetailType> = [
  {
    key: "id",
    title: "Aktivitas",
    dataIndex: "name",
    sorter: (a, b) => +(a.name > b.name) || -(a.name < b.name),
    showSorterTooltip: false,
    render: (value, record) => {
      const selectedClassname = record.selected ? "text-primary100" : "";

      return <span className={selectedClassname}>{value}</span>;
    },
  },
];
