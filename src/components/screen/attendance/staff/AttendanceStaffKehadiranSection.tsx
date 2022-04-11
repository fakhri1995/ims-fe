import { DownloadOutlined } from "@ant-design/icons";
import { ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { isBefore } from "date-fns";
import { useRouter } from "next/router";
import { FC, useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import { AccessControl } from "components/features/AccessControl";
import { DataEmptyState } from "components/states/DataEmptyState";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import {
  ATTENDANCES_USER_GET,
  ATTENDANCE_ACTIVITY_USER_EXPORT,
} from "lib/features";
import { getAntdTablePaginationConfig } from "lib/standard-config";

import {
  AttendanceService,
  AttendanceServiceQueryKeys,
  UserAttendance,
} from "apis/attendance";

import { EksporAbsensiDrawer } from "../shared/EksporAbsensiDrawer";
import clsx from "clsx";

/**
 * Component AttendanceStaffKehadiranSection's props.
 */
export interface IAttendanceStaffKehadiranSection {}

/**
 * Component AttendanceStaffKehadiranSection
 */
export const AttendanceStaffKehadiranSection: FC<
  IAttendanceStaffKehadiranSection
> = () => {
  const router = useRouter();
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();
  const isAllowedToGetKehadiranData = hasPermission(ATTENDANCES_USER_GET);
  const isAllowedToExportTable = hasPermission(ATTENDANCE_ACTIVITY_USER_EXPORT);

  const [isExportDrawerShown, setIsExportDrawerShown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: kehadiranData,
    isLoading,
    isRefetching,
  } = useQuery(
    AttendanceServiceQueryKeys.ATTENDANCES_USER_GET,
    () => AttendanceService.find(axiosClient),
    {
      enabled: isAllowedToGetKehadiranData,
      select: (response) =>
        response.data.data.user_attendances.map((datum) => {
          return {
            ...datum,
            geo_loc_check_in: datum.geo_loc_check_in || "-",
            geo_loc_check_out: datum.geo_loc_check_out || "-",
            is_wfo: datum.is_wfo === 1 ? "WFO" : "WFH",
            key: datum.id.toString(),
          } as IModifiedDataKehadiran;
        }),
    }
  );

  const tableColumns = useMemo<ColumnsType<IModifiedDataKehadiran>>(() => {
    return [
      {
        key: "id",
        title: "No.",
        render: (_, datum, index) => {
          const spanClassName = datum.is_late ? "text-state1" : "";

          return (
            <span className={spanClassName}>
              {(currentPage - 1) * 10 + index + 1}.
            </span>
          );
        },
        width: 64,
      },
      {
        title: "Waktu Check In",
        dataIndex: "check_in",
        render: (_, datum) => {
          const spanClassName = datum.is_late ? "text-state1" : "";
          const formattedDate = formatDateToLocale(
            datum.check_in,
            "dd MMM yyyy, HH:mm:ss",
            "-"
          );

          return <span className={spanClassName}>{formattedDate}</span>;
        },
        sorter: (a, b) => {
          const lhsDate = new Date(a.check_in);
          const rhsDate = new Date(b.check_in);

          return isBefore(rhsDate, lhsDate) ? -1 : 1;
        },
      },
      {
        title: "Waktu Check Out",
        dataIndex: "check_out",
        render: (_, datum) => {
          const spanClassName = datum.is_late ? "text-state1" : "";
          const formattedDate = formatDateToLocale(
            datum.check_out,
            "dd MMM yyyy, HH:mm:ss",
            "-"
          );

          return <span className={spanClassName}>{formattedDate}</span>;
        },
        sorter: (a, b) => {
          const lhsDate = new Date(a.check_out);
          const rhsDate = new Date(b.check_out);

          return isBefore(rhsDate, lhsDate) ? -1 : 1;
        },
      },
      {
        title: "Kerja",
        dataIndex: "is_wfo",
        sorter: (a, b) => (b.is_wfo < a.is_wfo ? -1 : 1),
      },
      {
        key: "id",
        title: "Lokasi Check In",
        dataIndex: ["geo_loc_check_in", "display_name"],
      },
      {
        key: "id",
        title: "Lokasi Check Out",
        dataIndex: ["geo_loc_check_out", "display_name"],
      },
    ];
  }, [currentPage]);

  const tablePaginationConf = useMemo(
    () =>
      getAntdTablePaginationConfig({
        onChange: (pageNumber) => setCurrentPage(pageNumber),
      }),
    []
  );

  const onRowItemClicked = useCallback(
    (datum: IModifiedDataKehadiran) => {
      router?.push(`/attendance/detail/${datum.id}`);
    },
    [router]
  );

  return (
    <>
      <section className="mig-platform space-y-6">
        {/* Header: Title and Unduh Table button */}
        <div className="flex items-center justify-between">
          <h3 className="mig-heading--4">Kehadiran</h3>
          <ButtonSys
            type={!isAllowedToExportTable ? "primary" : "default"}
            onClick={() => setIsExportDrawerShown(true)}
            disabled={!isAllowedToExportTable}
          >
            <DownloadOutlined className="mr-2" />
            Unduh Tabel
          </ButtonSys>
        </div>

        <ConfigProvider
          renderEmpty={() => (
            <DataEmptyState caption="Data kehadiran kosong." />
          )}
        >
          <Table<IModifiedDataKehadiran>
            columns={tableColumns}
            dataSource={kehadiranData}
            pagination={tablePaginationConf}
            loading={isLoading || isRefetching}
            scroll={{ x: 640 }}
            className="tableTypeTask"
            onRow={(datum) => {
              const rowClassName = clsx("hover:cursor-pointer", {
                "bg-state1/10": datum.is_late,
              });

              return {
                className: rowClassName,
                onClick: () => onRowItemClicked(datum),
              };
            }}
          />
        </ConfigProvider>
      </section>

      <AccessControl hasPermission={ATTENDANCE_ACTIVITY_USER_EXPORT}>
        <EksporAbsensiDrawer
          visible={isExportDrawerShown}
          onClose={() => setIsExportDrawerShown(false)}
        />
      </AccessControl>
    </>
  );
};

/**
 * Re-define type @see GetAttendancesUserData menyesuaikan keperluan UI.
 * Data transformation terjadi ketika `useQuery` berhasil dieksekusi (refer to its select option).
 *
 * @private
 */
interface IModifiedDataKehadiran
  extends Omit<
    UserAttendance,
    "geo_loc_check_in" | "geo_loc_check_out" | "is_wfo"
  > {
  key: string;
  geo_loc_check_in: string;
  geo_loc_check_out: string;
  is_wfo: string;
}
