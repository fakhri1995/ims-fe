import { FC, useEffect, useState } from "react";

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
      <div className="mig-card md:w-1/3 flex justify-between items-start">
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
      <div className="mig-card md:w-1/3 flex justify-between items-start">
        <div className="flex flex-col gap-4 justify-between">
          <h4 className="mig-heading--4">0</h4>
          <div>
            <p className="mig-caption--bold">Pending Requests</p>
            <p className="mig-small">awaiting approval</p>
          </div>
        </div>

        <ClockIconFilledSvg size={28} className={"text-warning"} />
      </div>

      {/* Card Days Used */}
      <div className="mig-card md:w-1/3 flex justify-between items-start">
        <div className="flex flex-col gap-4 justify-between">
          <h4 className="mig-heading--4">{Math.abs(leaveCount)}</h4>
          <div>
            <p className="mig-caption--bold">Days</p>
            <p className="mig-small">leave has been taken</p>
          </div>
        </div>

        <CalendarFilIconSvg size={24} className={"text-accentblue"} />
      </div>
    </div>
  );
};
