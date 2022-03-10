import { DownloadOutlined } from "@ant-design/icons";
import { ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { FC, useCallback, useMemo } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import { DataEmptyState } from "components/states/DataEmptyState";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
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
export interface IAttendanceStaffKehadiranSection {}

/**
 * Component AttendanceStaffKehadiranSection
 *
 * TODO: add pagination table in this component. (Local pagination...).
 */
export const AttendanceStaffKehadiranSection: FC<
  IAttendanceStaffKehadiranSection
> = () => {
  const axiosClient = useAxiosClient();
  const {
    data: kehadiranData,
    isLoading,
    isRefetching,
  } = useQuery(
    AttendanceServiceQueryKeys.ATTENDANCES_USER_GET,
    () => AttendanceService.find(axiosClient),
    {
      select: (response) =>
        response.data.data.user_attendances.map((datum) => {
          return {
            ...datum,
            check_out:
              datum.check_out === null
                ? "-"
                : formatDateToLocale(
                    new Date(datum.check_out),
                    "dd MMM yyyy, HH:mm:ss"
                  ),
            check_in: formatDateToLocale(
              new Date(datum.check_in),
              "dd MMM yyyy, HH:mm:ss"
            ),
            geo_loc_check_in: datum.geo_loc_check_in || "-",
            geo_loc_check_out: datum.geo_loc_check_out || "-",
            is_wfo: datum.is_wfo === 1 ? "WFO" : "WFH",
            key: datum.id.toString(),
          } as IModifiedDataKehadiran;
        }),
    }
  );

  const tableColumns = useMemo<ColumnsType<IModifiedDataKehadiran>>(
    () => {
      const sortableOpts = {
        sorter: true,
      };

      return [
        {
          key: "id",
          title: "No.",
          render: (_, datum, index) => {
            const spanClassName = datum.is_late ? "text-state1" : "";

            return <span className={spanClassName}>{++index}.</span>;
          },
          width: 64,
        },
        {
          key: "id",
          title: "Waktu Check In",
          dataIndex: "check_in",
          render: (_, datum) => {
            const spanClassName = datum.is_late ? "text-state1" : "";

            return <span className={spanClassName}>{datum.check_in}</span>;
          },
          ...sortableOpts,
        },
        {
          key: "id",
          title: "Waktu Check Out",
          dataIndex: "check_out",
          render: (_, datum) => {
            const spanClassName = datum.is_late ? "text-state1" : "";

            return <span className={spanClassName}>{datum.check_out}</span>;
          },
          ...sortableOpts,
        },
        {
          key: "id",
          title: "Kerja",
          dataIndex: "is_wfo",
          ...sortableOpts,
        },
        {
          key: "id",
          title: "Lokasi Check In",
          dataIndex: "geo_loc_check_in",
        },
        {
          key: "id",
          title: "Lokasi Check Out",
          dataIndex: "geo_loc_check_out",
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

  const onRowItemClicked = useCallback((datum: IModifiedDataKehadiran) => {
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
        <Table<IModifiedDataKehadiran>
          columns={tableColumns}
          dataSource={kehadiranData}
          pagination={tablePaginationConf}
          loading={isLoading || isRefetching}
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
    | "check_out"
    | "check_in"
    | "geo_loc_check_in"
    | "geo_loc_check_out"
    | "is_wfo"
  > {
  key: string;
  check_out: string;
  check_in: string;
  geo_loc_check_in: string;
  geo_loc_check_out: string;
  is_wfo: string;
}
