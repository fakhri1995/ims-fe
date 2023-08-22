import { Skeleton } from "antd";
import { FC, memo } from "react";
import { useQuery } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { ATTENDANCES_USER_GET } from "lib/features";

import { AttendanceService, AttendanceServiceQueryKeys } from "apis/attendance";

/**
 * Component AttendanceStaffStatisticCard's props.
 */
export interface IAttendanceCompanyStatisticCard {
  lateCount: number;
  onTimeCount: number;
}

/**
 * Component AttendanceStaffStatisticCard
 */
export const AttendanceCompanyStatisticCard: FC<
  IAttendanceCompanyStatisticCard
> = ({ lateCount, onTimeCount }) => {
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();
  const isAllowedToGetAttendanceStatistic = hasPermission(ATTENDANCES_USER_GET);

  return (
    <div className="mig-platform space-y-6">
      <h3 className="mig-heading--4">Statistik</h3>

      <div className="flex justify-around">
        {/* Hadir */}
        <div className="text-center space-y-2">
          <h4 className="font-bold text-2xl text-primary100">
            {onTimeCount || 0} hari
          </h4>
          <p className="text-mono50 text-2xs">Hadir</p>
        </div>

        {/* Terlambat */}
        <div className="text-center space-y-2">
          <h4 className="font-bold text-2xl text-state1">
            {lateCount || 0} hari
          </h4>
          <p className="text-mono50 text-2xs">Terlambat</p>
        </div>
      </div>
    </div>
  );
};
