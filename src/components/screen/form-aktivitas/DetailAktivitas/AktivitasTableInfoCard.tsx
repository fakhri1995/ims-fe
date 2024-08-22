import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { FC, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { ATTENDANCE_FORM_GET } from "lib/features";

import {
  AttendanceFormAktivitasService,
  AttendanceFormAktivitasServiceQueryKeys,
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
  const { hasPermission } = useAccessControl();

  const { data, isLoading } = useQuery(
    [AttendanceFormAktivitasServiceQueryKeys.FIND_ONE, aktivitasId],
    () => AttendanceFormAktivitasService.findOne(axiosClient, aktivitasId, 0),
    {
      enabled: hasPermission(ATTENDANCE_FORM_GET),
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
  const [aktivitasTitle, setAktivitasTitle] = useState("");
  const [aktivitasDescription, setAktivitasDescription] = useState("");
  const [aktivitasIsRequired, setAktivitasIsRequired] = useState(false);

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
    setAktivitasIsRequired(record.required);
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    setDataSource(data);

    if (data.length > 0) {
      onRowClicked(data[0]);
    }
  }, [data]);

  const tableColumns = useMemo<ColumnsType<AktivitasDetailType>>(
    () => [
      {
        key: "id",
        title: "Activity",
        dataIndex: "name",
        sorter: (a, b) => +(a.name > b.name) || -(a.name < b.name),
        showSorterTooltip: false,
        render: (value, record) => {
          const selectedClassname = record.selected ? "text-primary100" : "";

          return <span className={selectedClassname}>{value}</span>;
        },
      },
    ],
    []
  );

  return (
    <div className="mig-platform w-full flex flex-wrap md:flex-nowrap md:space-x-10 space-y-6 md:space-y-0">
      {/* Table */}
      <div className="w-full md:w-1/3">
        <Table<AktivitasDetailType>
          loading={isLoading}
          columns={tableColumns}
          dataSource={dataSource}
          className="tableTypeTask"
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
        {!isLoading && data && (
          <>
            {/* Aktivitas Title */}
            <span className="py-3 block font-bold text-sm">
              {aktivitasTitle}
            </span>

            <p>
              {aktivitasIsRequired ? "Required field" : "Not required field"}
            </p>

            {/* Aktivitas Deskription */}
            <p className="mt-6">{aktivitasDescription}</p>
          </>
        )}
      </div>
    </div>
  );
};

type AktivitasDetailType = Detail & { selected: boolean };
