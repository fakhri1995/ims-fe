import { AppstoreAddOutlined } from "@ant-design/icons";
import { ConfigProvider, Tabs } from "antd";
import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { isBefore } from "date-fns";
import { FC, useCallback, useMemo, useState } from "react";

import ButtonSys from "components/button";
import { DataEmptyState } from "components/states/DataEmptyState";

import { formatDateToLocale } from "lib/date-utils";
import { getAntdTablePaginationConfig } from "lib/standard-config";

import { useGetUserAttendanceActivities } from "apis/attendance";

const { TabPane } = Tabs;

/**
 * Component AttendanceStaffAktivitasSection's props.
 */
export interface IAttendanceStaffAktivitasSection {
  onAddActivityButtonClicked: () => void;
}

/**
 * Component AttendanceStaffAktivitasSection
 */
export const AttendanceStaffAktivitasSection: FC<
  IAttendanceStaffAktivitasSection
> = ({ onAddActivityButtonClicked }) => {
  /** 1 => Hari Ini, 2 => Riwayat */
  const [tabActiveKey, setTabActiveKey] = useState<"1" | "2" | string>("1");
  const { dataSource, dynamicNameFieldPairs, isDataSourceLoading } =
    useGetUserAttendanceActivities(tabActiveKey === "1" ? "today" : "past");

  const tableColums = useMemo<ColumnsType>(() => {
    const columns: ColumnsType = [
      {
        key: "id",
        title: "No.",
        render: (_, __, index) => `${++index}.`,
        width: 64,
      },
      {
        key: "id",
        title: "Waktu Pengisian",
        dataIndex: "updated_at",
        sorter: (a: string, b: string) => {
          const lhsDate = new Date(a);
          const rhsDate = new Date(b);

          return isBefore(rhsDate, lhsDate) ? -1 : 1;
        },
        render: (value) => {
          const formattedDate = formatDateToLocale(
            new Date(value),
            tabActiveKey === "1" ? "HH:mm" : "dd MMM yyyy, HH:mm"
          );

          return <>{formattedDate}</>;
        },
      },
    ];

    dynamicNameFieldPairs.columnNames.forEach((column, index) => {
      columns.push({
        key: dynamicNameFieldPairs.fieldKeys[index],
        title: column,
        dataIndex: dynamicNameFieldPairs.fieldKeys[index],
      });
    });

    return columns;
  }, [tabActiveKey, dynamicNameFieldPairs]);

  const tablePaginationConf = useMemo(
    () => getAntdTablePaginationConfig(),
    [
      /**TODO */
    ]
  );

  const onRowItemClicked = useCallback((datum) => {
    console.log(datum);
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
          <ButtonSys type="primary" onClick={onAddActivityButtonClicked}>
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
          dataSource={dataSource}
          pagination={tablePaginationConf}
          loading={isDataSourceLoading}
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
