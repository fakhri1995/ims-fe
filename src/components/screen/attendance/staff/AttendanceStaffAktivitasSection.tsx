import { AppstoreAddOutlined } from "@ant-design/icons";
import { ConfigProvider, Modal, Tabs, notification } from "antd";
import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { isBefore } from "date-fns";
import { FC, useCallback, useMemo, useReducer, useState } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import { DataEmptyState } from "components/states/DataEmptyState";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import {
  ATTENDANCE_ACTIVITY_ADD,
  ATTENDANCE_ACTIVITY_DELETE,
  ATTENDANCE_ACTIVITY_UPDATE,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";
import { getAntdTablePaginationConfig } from "lib/standard-config";

import {
  useGetAttendeeInfo,
  useGetUserAttendanceActivities,
} from "apis/attendance";
import { AuthService, AuthServiceQueryKeys } from "apis/auth";

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
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();
  const isAllowedToAddActivity = hasPermission(ATTENDANCE_ACTIVITY_ADD);
  const isAllowedToUpdateActivity = hasPermission(ATTENDANCE_ACTIVITY_UPDATE);
  const isAllowedToDeleteActivity = hasPermission(ATTENDANCE_ACTIVITY_DELETE);

  /** 1 => Hari Ini, 2 => Riwayat */
  const [tabActiveKey, setTabActiveKey] = useState<"1" | "2" | string>("1");

  const { dataSource, dynamicNameFieldPairs, isDataSourceLoading } =
    useGetUserAttendanceActivities(tabActiveKey === "1" ? "today" : "past");
  const { attendeeStatus } = useGetAttendeeInfo();

  const [currentPage, setCurrentPage] = useState(1);

  const [activityDrawerState, dispatch] = useReducer(
    _aktivitasDrawerToggleReducer,
    { visible: false }
  );

  const { data: userAttendanceForm } = useQuery(
    AuthServiceQueryKeys.DETAIL_PROFILE,
    () => AuthService.whoAmI(axiosClient),
    {
      select: (response) => response.data.data.attendance_forms[0],
    }
  );

  const tableColums = useMemo<ColumnsType>(() => {
    const columns: ColumnsType = [
      {
        key: "id",
        title: "No.",
        render: (_, __, index) => `${(currentPage - 1) * 10 + index + 1}.`,
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
    () =>
      getAntdTablePaginationConfig({
        onChange: (pageNumber) => setCurrentPage(pageNumber),
      }),
    []
  );

  const mOnRowItemClicked = useCallback(
    (datum: typeof dataSource[0]) => {
      if (tabActiveKey === "2") {
        /** Only allow this click callback when user is on "Hari Ini" tab */
        return;
      }

      if (!isAllowedToUpdateActivity) {
        permissionWarningNotification("Memperbarui", "Aktivitas");
        return;
      }

      /** Prevent user membuka drawer ketika mereka belum check in */
      if (attendeeStatus !== "checkin") {
        Modal.error({
          centered: true,
          title: "Perhatian!",
          content:
            "Anda perlu Check In terlebih dahulu untuk menambahkan atau memperbarui aktivitas!",
          okText: "Kembali",
          closable: true,
        });

        return;
      }

      /** datum.key adalah unique ID dari aktivitas tersebut. Hanya di map menjadi "key" */
      dispatch({
        type: "update",
        visible: true,
        selectedActivityFormId: datum.key,
      });
    },
    [tabActiveKey, isAllowedToUpdateActivity, attendeeStatus]
  );

  const mOnAddActivityButtonClicked = useCallback(() => {
    if (!userAttendanceForm) {
      Modal.error({
        centered: true,
        title: "Terjadi kesalahan!",
        content:
          "Anda belum memiliki form aktivitas. Mohon hubungi Admin untuk segera menambahkan Anda ke dalam form aktivitas.",
        okText: "Kembali",
        closable: true,
      });

      return;
    }

    /** Prevent user membuka drawer ketika mereka belum check in */
    if (attendeeStatus !== "checkin") {
      Modal.error({
        centered: true,
        title: "Perhatian!",
        content:
          "Anda perlu Check In terlebih dahulu untuk menambahkan atau memperbarui aktivitas!",
        okText: "Kembali",
        closable: true,
      });

      return;
    }

    dispatch({ type: "create", visible: true });
  }, [userAttendanceForm, attendeeStatus]);

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
            <ButtonSys
              type="primary"
              onClick={mOnAddActivityButtonClicked}
              disabled={!isAllowedToAddActivity}
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
          <Table<typeof dataSource[0]>
            columns={tableColums}
            dataSource={dataSource}
            pagination={tablePaginationConf}
            loading={isDataSourceLoading}
            scroll={{ x: "max-content" }}
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

      {(isAllowedToAddActivity ||
        isAllowedToUpdateActivity ||
        isAllowedToDeleteActivity) && (
        <AttendanceStaffAktivitasDrawer
          visible={activityDrawerState.visible}
          action={activityDrawerState.openDrawerAs}
          activityFormId={activityDrawerState.selectedActivityFormId}
          onClose={() => dispatch({ type: "create", visible: false })}
        />
      )}
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
