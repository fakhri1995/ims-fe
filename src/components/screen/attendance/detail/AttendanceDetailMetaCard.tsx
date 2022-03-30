import { isAfter } from "date-fns";
import { FC, memo } from "react";
import { useQuery } from "react-query";

import { DetailCard } from "components/cards/DetailCard";

import { useAxiosClient } from "hooks/use-axios-client";

import { ATTENDANCE_SAFE_TIME } from "lib/constants";
import { formatDateToLocale } from "lib/date-utils";

import { AttendanceService, AttendanceServiceQueryKeys } from "apis/attendance";

/**
 * Component AttendanceDetailMetaCard's props.
 */
export interface IAttendanceDetailMetaCard {
  attendanceId: number;

  fetchAsAdmin?: boolean;
}

/**
 * Component AttendanceDetailMetaCard
 */
export const AttendanceDetailMetaCard: FC<IAttendanceDetailMetaCard> = memo(
  ({ attendanceId, fetchAsAdmin = false }) => {
    const axiosClient = useAxiosClient();
    const { data, isLoading } = useQuery(
      [
        AttendanceServiceQueryKeys.ATTENDANCE_USER_GET,
        attendanceId,
        fetchAsAdmin,
      ],
      () => AttendanceService.findOne(axiosClient, attendanceId, fetchAsAdmin),
      {
        enabled: !!attendanceId,
        select: (response) => {
          const attendanceMeta = response.data.data.user_attendance;

          const attendanceCheckInDate = new Date(attendanceMeta.check_in);
          const attendanceComparableTime = new Date(
            attendanceCheckInDate.getFullYear(),
            attendanceCheckInDate.getMonth(),
            attendanceCheckInDate.getDate(),
            ATTENDANCE_SAFE_TIME.HOUR,
            ATTENDANCE_SAFE_TIME.MINUTE,
            0
          );
          const isLate = isAfter(
            attendanceCheckInDate,
            attendanceComparableTime
          )
            ? "Terlambat"
            : "Tepat Waktu";

          const headerData = formatDateToLocale(
            attendanceCheckInDate,
            "dd MMMM yyyy"
          );

          const contentData = [
            {
              label: "Waktu Check In",
              content: formatDateToLocale(
                attendanceCheckInDate,
                "HH:mm:ss",
                "-"
              ),
            },
            {
              label: "Lokasi Check In",
              content: attendanceMeta.geo_loc_check_in || "-",
            },
            {
              label: "Waktu Check Out",
              content: formatDateToLocale(
                attendanceMeta.check_out,
                "HH:mm:ss",
                "-"
              ),
            },
            {
              label: "Lokasi Check Out",
              content: attendanceMeta.geo_loc_check_out || "-",
            },
            { label: "Keterangan", content: isLate },
          ];

          return { headerData, contentData };
        },
      }
    );

    return (
      <DetailCard
        isLoading={isLoading || !attendanceId}
        estimatedContentLength={6}
        header={
          <h4 className="mig-heading--4 text-center">{data?.headerData}</h4>
        }
        content={data?.contentData || []}
      />
    );
  }
);
AttendanceDetailMetaCard.displayName = "AttendanceDetailMetaCard";
