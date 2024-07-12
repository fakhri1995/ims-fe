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
    <div className="mig-platform space-y-3">
      <h3 className="mig-body--bold">Attendance Summary</h3>

      {isLoading && <Skeleton active round paragraph={{ rows: 1 }} />}
      {!isLoading && (
        <div className="space-y-3">
          <div className="text-center bg-neutrals60 p-2 rounded-md">
            <h4 className="mig-heading--4">
              {Number(data?.on_time_count) + Number(data?.late_count) || 0} days
            </h4>
            <p className="mig-caption--medium text-neutrals100">
              Total Attendance
            </p>
          </div>

          <div className="flex w-full justify-between gap-3">
            {/* Hadir */}
            <div className="w-full bg-backdrop p-2 rounded-md text-center ">
              <h4 className="mig-heading--4 text-primary100">
                {data?.on_time_count || 0} days
              </h4>
              <p className="mig-caption--medium text-mono50">On Time</p>
            </div>

            {/* Terlambat */}
            <div className="w-full bg-state1 bg-opacity-5 p-2 rounded-md text-center">
              <h4 className="mig-heading--4 text-state1">
                {data?.late_count || 0} days
              </h4>
              <p className="mig-caption--medium text-mono50">Late</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
