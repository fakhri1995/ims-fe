import { DownloadOutlined } from "@ant-design/icons";
import { ConfigProvider, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { FC, useCallback, useMemo } from "react";

import ButtonSys from "components/button";
import { DataEmptyState } from "components/states/DataEmptyState";

import { getAntdTablePaginationConfig } from "lib/standard-config";

/**
 * Component AttendanceStaffKehadiranSection's props.
 */
export interface IAttendanceStaffKehadiranSection {}

/**
 * Component AttendanceStaffKehadiranSection
 */
export const AttendanceStaffKehadiranSection: FC<
  IAttendanceStaffKehadiranSection
> = (props) => {
  const tableColumns = useMemo<ColumnsType<KehadiranTableItemType>>(
    () => {
      const sortableOpts = {
        sorter: true,
      };

      /**
       * TODO: render text warna merah ketika `Waktu Check In` dan `Waktu Check Out` terlambat.
       */
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

  const onRowItemClicked = useCallback((datum: KehadiranTableItemType) => {
    alert(`Row with id ${datum.id} is clicked!`);
  }, []);

  return (
    <section className="mig-platform space-y-6">
      {/* Header: Title and Unduh Table button */}
      <div className="flex items-center justify-between">
        <h3 className="mig-heading--4">Kehadiran</h3>
        <ButtonSys
          type="default"
          onClick={() => {
            alert("Button Unduh Tabel clicked");
          }}
        >
          <DownloadOutlined className="mr-2" />
          Unduh Tabel
        </ButtonSys>
      </div>

      {/* TODO: Table */}
      <ConfigProvider
        renderEmpty={() => <DataEmptyState caption="Data kehadiran kosong." />}
      >
        <Table<KehadiranTableItemType>
          columns={tableColumns}
          dataSource={[]}
          pagination={tablePaginationConf}
          onRow={(datum) => {
            /**
             * TODO: add bg red ketika terdapat record yang terdeteksi terlambat.
             */
            return {
              className: "hover:cursor-pointer",
              onClick: () => onRowItemClicked(datum),
            };
          }}
        />
      </ConfigProvider>
    </section>
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
