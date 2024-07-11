import { Skeleton } from "antd";
import { FC } from "react";
import { useQuery } from "react-query";

import {
  CalendarFilIconSvg,
  CircleCheckFilledIconSvg,
  ClockIconFilledSvg,
} from "components/icon";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { ATTENDANCES_USER_GET } from "lib/features";

import { AttendanceService, AttendanceServiceQueryKeys } from "apis/attendance";

/**
 * Component AttendanceStaffLeaveStatisticCards' props.
 */
export interface IAttendanceStaffLeaveStatisticCards {
  leaveCount: number;
}

/**
 * Component AttendanceStaffLeaveStatisticCards
 */
export const AttendanceStaffLeaveStatisticCards: FC<
  IAttendanceStaffLeaveStatisticCards
> = ({ leaveCount }) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToGetAttendanceStatistic = hasPermission(ATTENDANCES_USER_GET);

  return (
    <div className="w-full flex justify-between gap-3 my-4">
      {/* <div
                className={
                  "my-4 bg-[#00589F] rounded-[5px] h-8 flex justify-between px-3 py-1 text-white text-[14px] leading-6 font-bold"
                }>
                <p className={""}>Amount of Annual Leave :</p>
                <p>{leaveCount} Days Remaining</p>
              </div> */}

      {/* Card Days Available */}
      <div className="mig-card w-1/3 flex justify-between items-start">
        <div className="flex flex-col gap-4 justify-between">
          <h4 className="mig-heading--4">{12 + Number(leaveCount)}</h4>
          <div>
            <p className="mig-caption--bold">Days available</p>
            <p className="mig-small">to book paid leave</p>
          </div>
        </div>

        <CircleCheckFilledIconSvg size={24} className={"text-primary100"} />
      </div>

      {/* Card Pending Requests */}
      <div className="mig-card w-1/3 flex justify-between items-start">
        <div className="flex flex-col gap-4 justify-between">
          <h4 className="mig-heading--4">0</h4>
          <div>
            <p className="mig-caption--bold">Pending Requests</p>
            <p className="mig-small">awaiting approval</p>
          </div>
        </div>

        <ClockIconFilledSvg size={28} className={"text-danger"} />
      </div>

      {/* Card Days Used */}
      <div className="mig-card w-1/3 flex justify-between items-start">
        <div className="flex flex-col gap-4 justify-between">
          <h4 className="mig-heading--4">{Math.abs(leaveCount)}</h4>
          <div>
            <p className="mig-caption--bold">Days Used</p>
            <p className="mig-small">
              {Math.abs(leaveCount)} days paid leave taken
            </p>
          </div>
        </div>

        <CalendarFilIconSvg size={24} className={"text-accentblue"} />
      </div>
    </div>
  );
};
