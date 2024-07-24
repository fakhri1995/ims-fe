import { TeamOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import type { FC } from "react";
import { useQuery } from "react-query";

import { UsersFilledIconSvg } from "components/icon";

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
        return {
          jumlah_hadir: response.data.data.users_attendances_count,
          jumlah_absen: response.data.data.absent_users_count,
        };
      },
    }
  );

  return (
    <div className="mig-platform h-full">
      <h3 className="mig-body--bold mb-3">Employee Attendance</h3>

      <div
        className={"flex items-center justify-around".concat(
          " ",
          isLoading ? "h-full" : ""
        )}
      >
        {isLoading && <Spin size="large" />}
        {!isLoading && (
          <div className="flex items-center w-full space-x-3">
            {/* Hadir */}
            <div className="w-1/2 flex flex-col py-[10px] justify-center bg-backdrop rounded-md space-y-1">
              <h4 className="mig-caption--medium text-primary100 text-center">
                On Time
              </h4>
              <div className="flex items-center gap-1 text-primary100 justify-center">
                <UsersFilledIconSvg className="" />
                <h4 className="mig-heading--4 text-primary100">
                  {data?.jumlah_hadir || 0}
                </h4>
              </div>
            </div>

            {/* Absen */}
            <div className="w-1/2 flex flex-col py-[10px] justify-center bg-danger bg-opacity-5 rounded-md space-y-1">
              <h4 className="mig-caption--medium text-danger text-center">
                Late
              </h4>
              <div className="flex items-center gap-1 text-danger justify-center">
                <UsersFilledIconSvg className="" />
                <h4 className="mig-heading--4 text-danger">
                  {data?.jumlah_absen || 0}
                </h4>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
