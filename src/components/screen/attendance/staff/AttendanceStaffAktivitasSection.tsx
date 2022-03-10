import { AppstoreAddOutlined, DownloadOutlined } from "@ant-design/icons";
import { ConfigProvider, Tabs } from "antd";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { FC, useCallback, useMemo, useState } from "react";

import ButtonSys from "components/button";
import { DataEmptyState } from "components/states/DataEmptyState";

import { getAntdTablePaginationConfig } from "lib/standard-config";

import { useGetUserActivities } from "apis/attendance";

const { TabPane } = Tabs;

/**
 * Component AttendanceStaffAktivitasSection's props.
 */
export interface IAttendanceStaffAktivitasSection {}

/**
 * Component AttendanceStaffAktivitasSection
 */
export const AttendanceStaffAktivitasSection: FC<
  IAttendanceStaffAktivitasSection
> = (props) => {
  /** 1 => Hari Ini, 2 => Riwayat */
  const [tabActiveKey, setTabActiveKey] = useState<"1" | "2" | string>("1");
  const { dynamicActivityColumns } = useGetUserActivities(
    tabActiveKey === "1" ? "today" : "past"
  );

  /**
   * TODO: generate tableColumns dynamically sesuai data backend
   */
  const tableColums = useMemo<ColumnsType<{}>>(() => {
    const columns: ColumnsType<{}> = [
      {
        key: "id",
        title: "No.",
        render: (_, __, index) => `${++index}`,
        width: 64,
      },
      {
        key: "id",
        title: "Waktu Pengisian",
        sorter: true,
      },
    ];

    /** Append dynamic columns into fixed columns */
    dynamicActivityColumns.forEach((column) => {
      columns.push({
        key: "id",
        title: column,
      });
    });

    return columns;
  }, [dynamicActivityColumns]);

  const tablePaginationConf = useMemo(
    () => getAntdTablePaginationConfig(),
    [
      /**TODO */
    ]
  );

  const onRowItemClicked = useCallback((datum) => {
    alert(`Row with id ${datum} is clicked!`);
  }, []);

  return (
    <section className="mig-platform space-y-6">
      <h3 className="mig-heading--4">Aktivitas</h3>

      <div className="flex items-center justify-between">
        <Tabs defaultActiveKey="1" className="w-1/2" onChange={setTabActiveKey}>
          <TabPane tab="Hari Ini" key="1" />
          <TabPane tab="Riwayat" key="2" />
        </Tabs>

        <div className="flex space-x-6 w-1/2 justify-end items-center">
          {/* <ButtonSys
            type="default"
            onClick={() => {
              alert("Button Unduh Tabel clicked");
            }}
          >
            <DownloadOutlined className="mr-2" />
            Unduh Tabel
          </ButtonSys> */}

          <ButtonSys
            type="primary"
            onClick={() => {
              alert("Button Masukkan Aktivitas Clicked");
            }}
          >
            <AppstoreAddOutlined className="mr-2" />
            Masukkan Aktivitas
          </ButtonSys>
        </div>
      </div>

      <ConfigProvider
        renderEmpty={() => (
          <DataEmptyState caption="Belum ada aktivitas. Silakan masukkan aktivitas untuk hari ini" />
        )}
      >
        <Table
          columns={tableColums}
          // TODO: render data berdasarkan state si tab
          dataSource={[]}
          pagination={tablePaginationConf}
          onRow={(datum) => {
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
