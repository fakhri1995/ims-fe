import { Skeleton } from "antd";
import { FC } from "react";
import { useQuery } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { ATTENDANCES_USER_GET } from "lib/features";

import { AttendanceService, AttendanceServiceQueryKeys } from "apis/attendance";

/**
 * Component AttendanceStaffStatisticCard's props.
 */
export interface IAttendanceStaffStatisticCard {}

/**
 * Component AttendanceStaffStatisticCard
 */
export const AttendanceStaffStatisticCard: FC<
  IAttendanceStaffStatisticCard
> = () => {
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();
  const isAllowedToGetAttendanceStatistic = hasPermission(ATTENDANCES_USER_GET);

  const { data, isLoading } = useQuery(
    [AttendanceServiceQueryKeys.ATTENDANCES_USER_GET],
    () => AttendanceService.find(axiosClient),
    {
      enabled: isAllowedToGetAttendanceStatistic,
      select: (response) => {
        const { late_count, on_time_count } = response.data.data;

        return { late_count, on_time_count };
      },
    }
  );

  return (
    <div className="mig-platform space-y-6">
      <h3 className="mig-heading--4">Statistik</h3>

      {isLoading && <Skeleton active round paragraph={{ rows: 1 }} />}
      {!isLoading && (
        <div className="flex justify-around">
          {/* Hadir */}
          <div className="text-center space-y-2">
            <h4 className="font-bold text-2xl text-primary100">
              {data?.on_time_count || 0} hari
            </h4>
            <p className="text-mono50 text-2xs">Hadir</p>
          </div>

          {/* Terlambat */}
          <div className="text-center space-y-2">
            <h4 className="font-bold text-2xl text-state1">
              {data?.late_count || 0} hari
            </h4>
            <p className="text-mono50 text-2xs">Terlambat</p>
          </div>
        </div>
      )}
    </div>
  );
};
