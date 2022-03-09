import { DownloadOutlined } from "@ant-design/icons";
import { ConfigProvider, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { isAfter } from "date-fns";
import { FC, useCallback, useMemo } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import { DataEmptyState } from "components/states/DataEmptyState";

import { useAxiosClient } from "hooks/use-axios-client";

import { ATTENDANCE_SAFE_TIME } from "lib/constants";
import { formatDateToLocale } from "lib/date-utils";
import { getAntdTablePaginationConfig } from "lib/standard-config";

import {
  AttendanceService,
  AttendanceServiceQueryKeys,
  GetAttendancesUserData,
} from "apis/attendance";

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
  const axiosClient = useAxiosClient();
  const { data: kehadiranData, isLoading } = useQuery(
    AttendanceServiceQueryKeys.ATTENDANCES_USER_GET,
    () => AttendanceService.find(axiosClient),
    {
      select: (response) =>
        response.data.data.map((datum) => {
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
              new Date(datum.check_out),
              "dd MMM yyyy, HH:mm:ss"
            ),
            geo_loc_check_in: datum.geo_loc_check_in || "-",
            geo_loc_check_out: datum.geo_loc_check_out || "-",
            is_wfo: datum.is_wfo === 1 ? "WFO" : "WFH",
          } as IModifiedDataKehadiran;
        }),
    }
  );

  const tableColumns = useMemo<ColumnsType<IModifiedDataKehadiran>>(
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
          render: (_, datum, index) => {
            const spanClassName = _isCheckInLate(datum.check_in)
              ? "text-state1"
              : "";

            return <span className={spanClassName}>{++index}.</span>;
          },
          width: 64,
        },
        {
          key: "id",
          title: "Waktu Check In",
          dataIndex: "check_in",
          render: (_, datum) => {
            const spanClassName = _isCheckInLate(datum.check_in)
              ? "text-state1"
              : "";

            return <span className={spanClassName}>{datum.check_in}</span>;
          },
          ...sortableOpts,
        },
        {
          key: "id",
          title: "Waktu Check Out",
          dataIndex: "check_out",
          render: (_, datum) => {
            const spanClassName = _isCheckInLate(datum.check_in)
              ? "text-state1"
              : "";

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
          loading={isLoading}
          onRow={(datum) => {
            /**
             * TODO: ini perlu di discuss lagi.
             *
             * Fact: Untuk saat ini, setiap waktu check in yang lebih dari waktu absen akan di mark
             *      dengan background merah. Karena itu cara paling mudah dan memungkinkan.
             *
             * Question: Gimana kalau checkin pertama hari ini tidak terlambat, kemudian checkout,
             *      dan checkin lagi di jam siang (lebih dari waktu terlambat)?
             *      Hasilnya, akan tetap di mark dengan background merah.
             *
             * Workaround / solution:
             *      Backend memberikan "flag" untuk menandai apakah record itu terlambat secara valid
             *      atau tidak.
             *
             */
            const rowClassName = clsx("hover:cursor-pointer", {
              "bg-state1/10": _isCheckInLate(datum.check_in),
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
    GetAttendancesUserData,
    | "check_out"
    | "check_in"
    | "geo_loc_check_in"
    | "geo_loc_check_out"
    | "is_wfo"
  > {
  check_out: string;
  check_in: string;
  geo_loc_check_in: string;
  geo_loc_check_out: string;
  is_wfo: string;
}

/**
 * @private
 */
const _isCheckInLate = (_checkInTime: string): boolean => {
  const checkInTime = new Date(_checkInTime);
  const attendSafeTime = new Date(
    checkInTime.getFullYear(),
    checkInTime.getMonth(),
    checkInTime.getDate(),
    ATTENDANCE_SAFE_TIME.HOUR,
    ATTENDANCE_SAFE_TIME.MINUTE,
    0
  );

  return isAfter(checkInTime, attendSafeTime);
};
