import { TeamOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import type { FC } from "react";
import { useQuery } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { ATTENDANCES_USERS_GET } from "lib/features";

import { AttendanceService, AttendanceServiceQueryKeys } from "apis/attendance";

/**
 * Component AttendanceAdminTodayStatCard's props.
 */
export interface IAttendanceAdminTodayStatCard {
  role: number;
}

/**
 * Component AttendanceAdminTodayStatCard
 */
export const AttendanceAdminTodayStatCard: FC<
  IAttendanceAdminTodayStatCard
> = ({ role }) => {
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();
  const isAllowedToGetAttendancesUsers = hasPermission(ATTENDANCES_USERS_GET);

  const { data, isLoading } = useQuery(
    [AttendanceServiceQueryKeys.ATTENDANCE_USERS_GET],
    () =>
      role == 1
        ? AttendanceService.findAsAdmin(axiosClient)
        : AttendanceService.findAsAdminCompany(axiosClient),
    {
      enabled: isAllowedToGetAttendancesUsers,
      select: (response) => {
        console.log("response ", response);
        return {
          jumlah_hadir: response.data.data.users_attendances_count,
          jumlah_absen: response.data.data.absent_users_count,
        };
      },
    }
  );

  return (
    <div className="mig-platform h-full">
      <h3 className="mig-heading--4">Hari ini</h3>

      <div
        className={"flex items-center justify-around".concat(
          " ",
          isLoading ? "h-full" : ""
        )}
      >
        {isLoading && <Spin size="large" />}
        {!isLoading && (
          <>
            {/* Hadir */}
            <div className="flex flex-col text-center">
              <h4 className="text-5xl py-4 mb-2 text-primary100">
                {data?.jumlah_hadir || 0}
              </h4>

              <div>
                <span className="font-bold text-mono30 text-sm flex items-center">
                  <TeamOutlined className="mr-1" /> Orang
                </span>
                <span className="mig-caption text-gray-400">Hadir</span>
              </div>
            </div>

            {/* Absen */}
            <div className="flex flex-col text-center">
              <h4 className="text-5xl py-4 mb-2 text-mono80">
                {data?.jumlah_absen || 0}
              </h4>

              <div>
                <span className="font-bold text-mono30 text-s flex items-center">
                  <TeamOutlined className="mr-1" /> Orang
                </span>
                <span className="mig-caption text-gray-400">Absen</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
