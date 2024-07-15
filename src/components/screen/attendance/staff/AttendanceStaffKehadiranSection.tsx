import { ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { isBefore } from "date-fns";
import { useRouter } from "next/router";
import { FC, useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import { ATTENDANCES_USER_GET } from "lib/features";
import { getAntdTablePaginationConfig } from "lib/standard-config";

import {
  AttendanceService,
  AttendanceServiceQueryKeys,
  UserAttendance,
} from "apis/attendance";

import clsx from "clsx";

/**
 * Component AttendanceStaffKehadiranSection's props.
 */
export interface IAttendanceStaffKehadiranSection {
  initProps: string;
}

/**
 * Component AttendanceStaffKehadiranSection
 */
export const AttendanceStaffKehadiranSection: FC<
  IAttendanceStaffKehadiranSection
> = (initProps) => {
  const router = useRouter();
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();
  const isAllowedToGetKehadiranData = hasPermission(ATTENDANCES_USER_GET);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: kehadiranData,
    isLoading,
    isRefetching,
  } = useQuery(
    [AttendanceServiceQueryKeys.ATTENDANCES_USER_GET],
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
              {(currentPage - 1) * pageSize + index + 1}.
            </span>
          );
        },
        width: 45,
        align: "center",
      },
      {
        title: "Check In",
        dataIndex: "check_in",
        render: (_, datum) => {
          const spanClassName = datum.is_late ? "text-state1" : "";
          const formattedDate = formatDateToLocale(
            datum.check_in,
            "dd MMM yyyy, HH:mm:ss",
            "-"
          );

          return (
            <span className={`${spanClassName} whitespace-nowrap`}>
              {formattedDate}
            </span>
          );
        },
        sorter: (a, b) => {
          const lhsDate = new Date(a.check_in);
          const rhsDate = new Date(b.check_in);

          return isBefore(rhsDate, lhsDate) ? -1 : 1;
        },
        width: 120,
      },
      {
        key: "id",
        title: "Check In Location",
        dataIndex: ["geo_loc_check_in", "display_name"],
        render: (value) => (
          <p title={value} className="max-w-28 truncate">
            {value}
          </p>
        ),
      },
      {
        title: "Check Out",
        dataIndex: "check_out",
        render: (_, datum) => {
          const spanClassName = datum.is_late ? "text-state1" : "";
          const formattedDate = formatDateToLocale(
            datum.check_out,
            "dd MMM yyyy, HH:mm:ss",
            "-"
          );

          return (
            <span className={`${spanClassName} whitespace-nowrap`}>
              {formattedDate}
            </span>
          );
        },
        sorter: (a, b) => {
          const lhsDate = new Date(a.check_out);
          const rhsDate = new Date(b.check_out);

          return isBefore(rhsDate, lhsDate) ? -1 : 1;
        },
        width: 120,
      },
      {
        key: "id",
        title: "Check Out Location",
        dataIndex: ["geo_loc_check_out", "display_name"],
        render: (value) => (
          <p title={value} className="max-w-28 truncate">
            {value}
          </p>
        ),
      },

      {
        title: "Work",
        dataIndex: "is_wfo",
        sorter: (a, b) => (b.is_wfo < a.is_wfo ? -1 : 1),
        align: "center",
      },
    ];
  }, [pageSize, currentPage]);

  const tablePaginationConf = useMemo(
    () =>
      getAntdTablePaginationConfig({
        onChange: (pageNumber, pageSize) => {
          setCurrentPage(pageNumber);
          setPageSize(pageSize);
        },
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
      <section className="mig-platform--p-0 space-y-6">
        {/* Header: Title and Unduh Table button */}
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="mig-body--bold">Attendance History</h4>
        </div>
        <div className="px-4">
          <Table<IModifiedDataKehadiran>
            columns={tableColumns}
            dataSource={kehadiranData}
            pagination={tablePaginationConf}
            loading={isLoading || isRefetching}
            scroll={{ x: 640 }}
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
        </div>
      </section>
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
