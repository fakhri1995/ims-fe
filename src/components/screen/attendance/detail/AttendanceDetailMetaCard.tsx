import { isAfter } from "date-fns";
import { FC, memo } from "react";
import { useQuery } from "react-query";

import { DetailCard } from "components/cards/DetailCard";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { ATTENDANCE_SAFE_TIME } from "lib/constants";
import { formatDateToLocale } from "lib/date-utils";
import { ATTENDANCE_USER_ADMIN_GET, ATTENDANCE_USER_GET } from "lib/features";

import { AttendanceService, AttendanceServiceQueryKeys } from "apis/attendance";

/**
 * Component AttendanceDetailMetaCard's props.
 */
export interface IAttendanceDetailMetaCard {
  attendanceId: number;
}

/**
 * Component AttendanceDetailMetaCard
 */
export const AttendanceDetailMetaCard: FC<IAttendanceDetailMetaCard> = memo(
  ({ attendanceId }) => {
    const axiosClient = useAxiosClient();
    const { hasPermission } = useAccessControl();
    const isAllowedToGetAsAdmin = hasPermission(ATTENDANCE_USER_ADMIN_GET);
    const isAllowedToGetAsUser = hasPermission(ATTENDANCE_USER_GET);
    const isAllowedToGet = isAllowedToGetAsAdmin || isAllowedToGetAsUser;

    const { data, isLoading } = useQuery(
      [
        AttendanceServiceQueryKeys.ATTENDANCE_USER_GET,
        attendanceId,
        isAllowedToGetAsAdmin,
      ],
      () =>
        AttendanceService.findOne(
          axiosClient,
          attendanceId,
          isAllowedToGetAsAdmin
        ),
      {
        enabled: !isAllowedToGet ? false : !!attendanceId,
        select: (response) => {
          const attendanceMeta = response.data.data.user_attendance;
          const attendanceCheckInDate = new Date(attendanceMeta.check_in);

          const isLate = attendanceMeta.is_late ? "Late" : "On Time";

          const contentData = [
            {
              label: "Date",
              content: formatDateToLocale(
                attendanceCheckInDate,
                "dd MMMM yyyy"
              ),
            },

            {
              label: "Name",
              content: attendanceMeta?.name || "-",
            },

            {
              label: "Check In",
              content: formatDateToLocale(
                attendanceCheckInDate,
                "HH:mm:ss",
                "-"
              ),
            },
            {
              label: "Check In Location",
              content: attendanceMeta.geo_loc_check_in?.display_name || "-",
            },
            {
              label: "Check Out",
              content: formatDateToLocale(
                attendanceMeta.check_out,
                "HH:mm:ss",
                "-"
              ),
            },
            {
              label: "Check Out Location",
              content: attendanceMeta.geo_loc_check_out?.display_name || "-",
            },
            { label: "Present", content: isLate },
          ];

          return { contentData };
        },
      }
    );

    return isAllowedToGet ? (
      <DetailCard
        isLoading={isLoading || !attendanceId}
        estimatedContentLength={6}
        header={<h4 className="mig-body--bold ">Details</h4>}
        content={data?.contentData || []}
      />
    ) : null;
  }
);
AttendanceDetailMetaCard.displayName = "AttendanceDetailMetaCard";
