import { AppstoreAddOutlined } from "@ant-design/icons";
import { ConfigProvider, Tabs } from "antd";
import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { isBefore } from "date-fns";
import { FC, useCallback, useMemo, useReducer, useState } from "react";

import ButtonSys from "components/button";
import { DataEmptyState } from "components/states/DataEmptyState";

import { formatDateToLocale } from "lib/date-utils";
import { getAntdTablePaginationConfig } from "lib/standard-config";

import { useGetUserAttendanceActivities } from "apis/attendance";

import { AttendanceStaffAktivitasDrawer } from "./AttendanceStaffAktivitasDrawer";

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
> = () => {
  /** 1 => Hari Ini, 2 => Riwayat */
  const [tabActiveKey, setTabActiveKey] = useState<"1" | "2" | string>("1");
  const { dataSource, dynamicNameFieldPairs, isDataSourceLoading } =
    useGetUserAttendanceActivities(tabActiveKey === "1" ? "today" : "past");

  const [activityDrawerState, dispatch] = useReducer(
    _aktivitasDrawerToggleReducer,
    { visible: false }
  );

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

  const mOnRowItemClicked = useCallback(
    (datum: typeof dataSource[0]) => {
      if (tabActiveKey === "2") {
        /** Only allow this click callback when user is on "Hari Ini" tab */
        return;
      }

      /** datum.key adalah unique ID dari aktivitas tersebut. Hanya di map menjadi "key" */
      // onRowItemClicked(datum.key);
      dispatch({
        type: "update",
        visible: true,
        selectedActivityFormId: datum.key,
      });
    },
    [tabActiveKey]
  );

  const mOnAddActivityButtonClicked = useCallback(() => {
    dispatch({ type: "create", visible: true });
  }, []);

  return (
    <>
      <section className="mig-platform space-y-6">
        <h3 className="mig-heading--4">Aktivitas</h3>

        <div className="flex items-center justify-between">
          <Tabs
            defaultActiveKey="1"
            className="w-1/2"
            onChange={setTabActiveKey}
          >
            <TabPane tab="Hari Ini" key="1" />
            <TabPane tab="Riwayat" key="2" />
          </Tabs>

          <div className="flex space-x-6 w-1/2 justify-end items-center">
            <ButtonSys type="primary" onClick={mOnAddActivityButtonClicked}>
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
          <Table<typeof dataSource[0]>
            columns={tableColums}
            dataSource={dataSource}
            pagination={tablePaginationConf}
            loading={isDataSourceLoading}
            scroll={{ x: 640 }}
            className="tableTypeTask"
            onRow={(datum) => {
              return {
                className: "hover:cursor-pointer",
                onClick: () => mOnRowItemClicked(datum),
              };
            }}
          />
        </ConfigProvider>
      </section>

      <AttendanceStaffAktivitasDrawer
        visible={activityDrawerState.visible}
        action={activityDrawerState.openDrawerAs}
        activityFormId={activityDrawerState.selectedActivityFormId}
        onClose={() => dispatch({ type: "create", visible: false })}
      />
    </>
  );
};

/**
 * @private
 */
type AktivitasDrawerActionTypes = "create" | "update";

/**
 * @private
 */
interface IAktivitasDrawerState {
  visible: boolean;
  openDrawerAs?: AktivitasDrawerActionTypes;
  selectedActivityFormId?: number;
}

/**
 * @private
 */
type AktivitasDrawerAction = {
  type: AktivitasDrawerActionTypes;
} & IAktivitasDrawerState;

/**
 * @private
 */
const _aktivitasDrawerToggleReducer = (
  state: IAktivitasDrawerState,
  payload: AktivitasDrawerAction
): IAktivitasDrawerState => {
  switch (payload.type) {
    case "create":
      return {
        ...state,
        visible: payload.visible,
        openDrawerAs: payload.type,
        selectedActivityFormId: undefined,
      };

    case "update":
      if (typeof payload.selectedActivityFormId !== "number") {
        throw new Error(
          "Nilai dari action.selectedActivityFormId harus berupa number!"
        );
      }

      return {
        ...state,
        visible: payload.visible,
        openDrawerAs: payload.type,
        selectedActivityFormId: payload.selectedActivityFormId,
      };

    default:
      throw new Error(
        `Type reducer ${payload.type} tidak diketahui! Gunakan action: \"create\" atau \"update\"`
      );
  }
};
