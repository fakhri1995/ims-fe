import { CalendarFilled } from "@ant-design/icons";
import { FC, useEffect, useState } from "react";

import StatisticCountCard from "components/cards/StatisticCountCard";
import {
  CalendarCheckedFillIconSvg,
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
    // TODO: adjust data if BE done
    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-between gap-3 my-4">
      {/* Card Quota this year */}
      <StatisticCountCard
        dataCount={Number(leaveCount?.leave_total)}
        icon={
          <CircleCheckFilledIconSvg size={24} className={"text-primary100"} />
        }
        title="Quota this year"
        description="to book leave"
      />
      {/* Card Leave remaining */}
      <StatisticCountCard
        dataCount={Number(leaveCount?.leave_remaining)}
        icon={
          <CalendarFilIconSvg size={24} className={"text-accentblue text-lg"} />
        }
        title="Leave remaining"
        description="this year"
      />

      {/* Card Pending Requests */}
      <StatisticCountCard
        dataCount={0}
        icon={<ClockIconFilledSvg size={26} className={"text-warning"} />}
        title="Pending Requests"
        description="awaiting approval"
      />

      {/* Card Leave quota */}
      <StatisticCountCard
        dataCount={Number(leaveCount?.leave_used)}
        icon={
          <CalendarCheckedFillIconSvg size={22} className={"text-danger"} />
        }
        title="Leave quota"
        description="that has been taken"
      />
    </div>
  );
};
