import { notification } from "antd";
import moment from "moment";
import React, { FC, memo } from "react";
import { useQuery } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { ATTENDANCE_CURRENT_SCHEDULE_GET } from "lib/features";
import { notificationError } from "lib/helper";

import { AttendanceScheduleService } from "apis/attendance";

/**
 * Component AttendanceStaffShiftCard's props.
 */
export interface IAttendanceStaffShiftCard {
  userId: number;
}

/**
 * Component AttendanceStaffShiftCard
 */
export const AttendanceStaffShiftCard: FC<IAttendanceStaffShiftCard> = memo(
  ({ userId }) => {
    const { hasPermission, isPending: isAccessControlPending } =
      useAccessControl();
    if (isAccessControlPending) {
      return null;
    }

    const isAllowedToGetCurrentSchedule = hasPermission(
      ATTENDANCE_CURRENT_SCHEDULE_GET
    );

    const axiosClient = useAxiosClient();

    const today = moment().format("YYYY-MM-DD");
    const tomorrow = moment().add(1, "day").format("YYYY-MM-DD");
    const dayAfterTomorrow = moment().add(2, "day").format("YYYY-MM-DD");

    const dateParams = [today, tomorrow, dayAfterTomorrow];

    const currentScheduleQueries = dateParams.map((date) =>
      useQuery(
        [ATTENDANCE_CURRENT_SCHEDULE_GET, userId, date],
        () =>
          AttendanceScheduleService.getCurrentSchedule(
            isAllowedToGetCurrentSchedule,
            axiosClient,
            {
              user_id: userId,
              date: date,
            }
          ),
        {
          enabled: isAllowedToGetCurrentSchedule,
          select: (response) => response.data,
          retry: 1,
          onError: (error: any) => {
            if (error?.response?.status !== 404) {
              notificationError({
                message: "Gagal mendapatkan jadwal kerja karyawan saat ini.",
              });
            }
          },
        }
      )
    );

    return (
      <div className="mig-platform flex flex-col">
        <h4 className="mig-body--bold mb-3">Work Schedule</h4>

        {currentScheduleQueries?.map((schedule, idx) => {
          return (
            <React.Fragment key={idx}>
              {idx === 0 ? (
                <div className="flex flex-col justify-center items-center p-2 bg-mono120 rounded-md mb-3">
                  <p className="mig-caption--medium text-neutrals90">Today</p>
                  {/* <p className="mig-caption--medium text-xs text-mono50">
                    {schedule?.data?.data?.shift?.title}
                  </p> */}
                  <h4 className="mig-heading--4">
                    {schedule?.data?.data?.shift?.start_at?.slice(0, 5)} -{" "}
                    {schedule?.data?.data?.shift?.end_at?.slice(0, 5)}
                  </h4>
                </div>
              ) : (
                <div className="flex justify-between gap-2 items-center mb-2">
                  <p className="w-1/2 mig-caption--medium text-xs text-mono50 whitespace-nowrap">
                    {moment(dateParams[idx]).format("dddd, D MMM")}
                  </p>
                  {/* <p className="w-1/3 mig-caption--medium text-xs text-mono50">
                    {schedule?.data?.data?.shift?.title ?? "-"}
                  </p> */}
                  <p className="w-1/2 mig-caption--bold text-xs text-mono30 text-right">
                    {schedule?.data?.data?.shift?.start_at?.slice(0, 5)} -{" "}
                    {schedule?.data?.data?.shift?.end_at?.slice(0, 5)}
                  </p>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);
AttendanceStaffShiftCard.displayName = "AttendanceStaffShiftCard";
