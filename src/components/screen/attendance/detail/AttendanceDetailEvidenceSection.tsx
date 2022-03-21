import { Empty, Spin } from "antd";
import { FC, memo, useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useAxiosClient } from "hooks/use-axios-client";

import { AttendanceService, AttendanceServiceQueryKeys } from "apis/attendance";

/**
 * Component AttendanceDetailEvidenceSection's props.
 */
export interface IAttendanceDetailEvidenceSection {
  attendanceId: number;
}

/**
 * Component AttendanceDetailEvidenceSection
 */
export const AttendanceDetailEvidenceSection: FC<IAttendanceDetailEvidenceSection> =
  memo(({ attendanceId }) => {
    const axiosClient = useAxiosClient();
    const { data, isLoading } = useQuery(
      [AttendanceServiceQueryKeys.ATTENDANCE_USER_GET, attendanceId],
      () => AttendanceService.findOne(axiosClient, attendanceId),
      {
        enabled: !!attendanceId,
        select: (response) => response.data.data.user_attendance.evidence,
      }
    );

    const [isCheckInEvidenceImageError, setIsCheckInEvidenceImageError] =
      useState(false);
    const [isCheckOutEvidenceImageError, setIsCheckOutEvidenceImageError] =
      useState(false);

    const handleOnImageError = (imageType: "checkin" | "checkout") => {
      if (!data) {
        return;
      }

      switch (imageType) {
        case "checkin":
          return setIsCheckInEvidenceImageError(true);

        case "checkout":
          return setIsCheckOutEvidenceImageError(true);
      }
    };

    const imageErrorContent = (
      <>
        {Empty.PRESENTED_IMAGE_SIMPLE}
        <span className="mig-caption mig-caption--medium text-center text-mono50 block">
          Data tidak ditemukan!
        </span>
      </>
    );

    const shouldShowSpinner = isLoading || !attendanceId;

    const hasData = !isLoading && data;
    const hasValidEvidenceCheckInImage =
      hasData && !isCheckInEvidenceImageError;
    const hasValidEvidenceCheckOutImage =
      hasData && !isCheckOutEvidenceImageError;

    return (
      <section className="mig-platform space-y-4 flex flex-col">
        {/* Evidence: checkin */}
        <span className="mig-caption text-gray-400">Bukti Check In</span>
        <div className="max-w-lg w-full space-y-3 flex flex-col items-center">
          {shouldShowSpinner && <Spin size="large" />}
          {hasValidEvidenceCheckInImage && (
            <>
              <img
                src={data.check_in_evidence}
                alt="Evidence Check In Image"
                className="w-full h-full bg-cover"
                onError={() => handleOnImageError("checkin")}
              />
              <span className="mig-caption mig-caption--medium text-center text-mono50 block">
                {data?.check_in_evidence}
              </span>
            </>
          )}

          {hasData && isCheckInEvidenceImageError && imageErrorContent}
        </div>

        {/* Evidence: checkout */}
        <span className="mig-caption text-gray-400">Bukti Check Out</span>
        <div className="max-w-lg w-full space-y-3 flex flex-col items-center">
          {shouldShowSpinner && <Spin size="large" />}
          {hasValidEvidenceCheckOutImage && (
            <>
              <img
                src={data.check_out_evidence}
                alt="Evidence Check In Image"
                className="w-full h-full bg-cover"
                onError={() => handleOnImageError("checkout")}
              />
              <span className="mig-caption mig-caption--medium text-center text-mono50 block">
                {data?.check_in_evidence}
              </span>
            </>
          )}

          {hasData && isCheckOutEvidenceImageError && imageErrorContent}
        </div>
      </section>
    );
  });
AttendanceDetailEvidenceSection.displayName = "AttendanceDetailEvidenceSection";
