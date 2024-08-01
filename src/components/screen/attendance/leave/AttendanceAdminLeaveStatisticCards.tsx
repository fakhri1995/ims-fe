import { FC, useEffect, useState } from "react";

import StatisticCountCard from "components/cards/StatisticCountCard";
import {
  CalendarFilIconSvg,
  CircleCheckFilledIconSvg,
  CircleXFilledIconSvg,
  ClockIconFilledSvg,
  UsersFilledIconSvg,
} from "components/icon";

import { useAccessControl } from "contexts/access-control";

import {
  LEAVES_COUNT_GET,
  LEAVE_STATISTICS_GET,
  LEAVE_STATUSES_GET,
} from "lib/features";
import { notificationError, permissionWarningNotification } from "lib/helper";

/**
 * Component AttendanceAdminLeaveStatisticCards' props.
 */
export interface IAttendanceAdminLeaveStatisticCards {
  dataToken: string;
}

/**
 * Component AttendanceAdminLeaveStatisticCards
 */
export const AttendanceAdminLeaveStatisticCards: FC<
  IAttendanceAdminLeaveStatisticCards
> = ({ dataToken }) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToGetLeaveStatus = hasPermission(LEAVE_STATUSES_GET);
  const isAllowedToGetLeaveStatics = hasPermission(LEAVE_STATISTICS_GET);

  const [dataStatusCuti, setDataStatusCuti] = useState([]);
  const [dataStatusPengajuan, setDataStatusPengajuan] = useState([]);

  useEffect(() => {
    fetchDataStatus();
    fetchDataStatusPengajuan();
  }, []);

  const fetchDataStatus = async () => {
    if (!isAllowedToGetLeaveStatus) {
      permissionWarningNotification("Mendapatkan", "Data Status Cuti");
    } else {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getLeaveStatuses`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(dataToken),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          let dataTemp = [];
          for (let a = 0; a < res2.data.length; a++) {
            if (res2.data[a].status == 2) {
              dataTemp[0] = res2.data[a].total;
            }
            if (res2.data[a].status == 1) {
              dataTemp[1] = res2.data[a].total;
            }
            if (res2.data[a].status == 3) {
              dataTemp[2] = res2.data[a].total;
            }
          }
          setDataStatusCuti(dataTemp);
        });
    }
  };

  const fetchDataStatusPengajuan = async () => {
    if (!isAllowedToGetLeaveStatics) {
      permissionWarningNotification(
        "Mendapatkan",
        "Data Status Pengajuan Cuti"
      );
    } else {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getLeaveStatistics`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(dataToken),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          let dataTemp = [];
          dataTemp.push(res2.data.has_leave);
          dataTemp.push(res2.data.no_leave);
          setDataStatusPengajuan(dataTemp);
        });
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-between gap-3 lg:gap-5">
      {/* Card Leave Accepted */}
      <StatisticCountCard
        dataCount={dataStatusCuti?.[0]}
        icon={
          <CircleCheckFilledIconSvg size={24} className={"text-primary100"} />
        }
        title="Leave Accepted"
        description="to all employees"
      />

      {/* Card Leave Rejected */}
      <StatisticCountCard
        dataCount={dataStatusCuti?.[2]}
        icon={<CircleXFilledIconSvg size={24} className={"text-danger"} />}
        title="Leave Rejected"
        description="to all employees"
      />

      {/* Card Pending Requests */}
      <StatisticCountCard
        dataCount={dataStatusCuti?.[1]}
        icon={<ClockIconFilledSvg size={28} className={"text-warning"} />}
        title="Pending Requests"
        description="awaiting approval"
      />

      {/* Card Employees */}
      <StatisticCountCard
        dataCount={dataStatusPengajuan?.[0]}
        icon={<UsersFilledIconSvg size={24} className={"text-accentblue"} />}
        title="Employees"
        description="already submitted for leave"
      />
    </div>
  );
};
