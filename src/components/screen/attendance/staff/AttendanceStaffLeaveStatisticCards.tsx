import { FC, useEffect, useState } from "react";

import StatisticCountCard from "components/cards/StatisticCountCard";
import {
  CalendarFilIconSvg,
  CircleCheckFilledIconSvg,
  ClockIconFilledSvg,
} from "components/icon";

import { useAccessControl } from "contexts/access-control";

import { LEAVES_COUNT_GET } from "lib/features";
import { notificationError, permissionWarningNotification } from "lib/helper";

/**
 * Component AttendanceStaffLeaveStatisticCards' props.
 */
export interface IAttendanceStaffLeaveStatisticCards {
  dataToken: string;
}

/**
 * Component AttendanceStaffLeaveStatisticCards
 */
export const AttendanceStaffLeaveStatisticCards: FC<
  IAttendanceStaffLeaveStatisticCards
> = ({ dataToken }) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToGetLeavesCount = hasPermission(LEAVES_COUNT_GET);

  const [leaveCount, setLeaveCount] = useState(null);

  useEffect(() => {
    fetchDataCount();
  }, []);
  const fetchDataCount = async () => {
    if (!isAllowedToGetLeavesCount) {
      permissionWarningNotification("Mendapatkan", "Jumlah Cuti");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getLeavesCount`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(dataToken),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setLeaveCount(res2?.data);
      })
      .catch((err) => {
        notificationError({ message: "Failed to get leaves count" });
      });
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-between gap-3 my-4">
      {/* Card Days Available */}
      <StatisticCountCard
        dataCount={12 + Number(leaveCount)}
        icon={
          <CircleCheckFilledIconSvg size={24} className={"text-primary100"} />
        }
        title="Days available"
        description="to book paid leave"
      />

      {/* Card Pending Requests */}
      <StatisticCountCard
        dataCount={0}
        icon={<ClockIconFilledSvg size={28} className={"text-warning"} />}
        title="Pending Requests"
        description="awaiting approval"
      />

      {/* Card Days Used */}
      <StatisticCountCard
        dataCount={Math.abs(leaveCount)}
        icon={<CalendarFilIconSvg size={24} className={"text-accentblue"} />}
        title="Days"
        description="leave has been taken"
      />
    </div>
  );
};
