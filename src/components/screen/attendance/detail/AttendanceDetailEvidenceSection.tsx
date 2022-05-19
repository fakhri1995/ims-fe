import { Empty, Spin } from "antd";
import { FC, memo, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { ATTENDANCE_USER_ADMIN_GET, ATTENDANCE_USER_GET } from "lib/features";
import { generateStaticAssetUrl } from "lib/helper";

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
          const mappedData = {
            check_in_evidence: null,
            check_out_evidence: null,
          };

          response.data.data.user_attendance.evidence.forEach(
            ({ link, description }) => {
              switch (description) {
                case "check_in_evidence":
                  mappedData.check_in_evidence = generateStaticAssetUrl(link);
                  break;

                case "check_out_evidence":
                  mappedData.check_out_evidence = generateStaticAssetUrl(link);
                  break;
              }
            }
          );

          return mappedData;
        },
      }
    );

    const [isCheckInEvidenceImageError, setIsCheckInEvidenceImageError] =
      useState(false);
    const [isCheckOutEvidenceImageError, setIsCheckOutEvidenceImageError] =
      useState(false);

    const imageErrorContent = (
      <>
        {Empty.PRESENTED_IMAGE_SIMPLE}
        <span className="mig-caption mig-caption--medium text-center text-mono50 block">
          Belum memiliki bukti.
        </span>
      </>
    );

    /**
     * Flag respective evidence to "error" because the source is null.
     * It will render "Belum memiliki bukti" component (@see {imageErrorContent})
     */
    useEffect(() => {
      if (!data) {
        return;
      }

      if (data.check_in_evidence === null) {
        return setIsCheckInEvidenceImageError(true);
      }

      if (data.check_out_evidence === null) {
        return setIsCheckOutEvidenceImageError(true);
      }
    }, [data]);

    /**
     * Conditional rendering logic.
     */
    const shouldShowSpinner = isLoading || !attendanceId;
    const shouldShowNotFoundCheckIn = !isLoading && isCheckInEvidenceImageError;
    const shouldShowNotFoundCheckOut =
      !isLoading && isCheckOutEvidenceImageError;

    const hasValidEvidenceCheckInImage =
      data && data.check_in_evidence && !isCheckInEvidenceImageError;
    const hasValidEvidenceCheckOutImage =
      data && data.check_out_evidence && !isCheckOutEvidenceImageError;

    const checkInEvidenceFileName = hasValidEvidenceCheckInImage
      ? data.check_in_evidence.split("/").pop()
      : "";
    const checkOutEvidenceFileName = hasValidEvidenceCheckOutImage
      ? data.check_out_evidence.split("/").pop()
      : "";

    return isAllowedToGet ? (
      <section className="mig-platform space-y-4 flex flex-col">
        {/* Evidence: checkin */}
        <span className="mig-caption text-gray-400">Bukti Check In</span>
        <div className="max-w-lg w-full space-y-3 flex flex-col items-center">
          {shouldShowSpinner && <Spin size="large" />}

          {!shouldShowSpinner && data.check_in_evidence !== null && (
            <>
              <img
                src={data.check_in_evidence}
                alt="Evidence Check In Image"
                className="w-full h-full bg-cover"
              />
              <span className="mig-caption mig-caption--medium text-center text-mono50 block">
                {checkInEvidenceFileName}
              </span>
            </>
          )}

          {shouldShowNotFoundCheckIn && imageErrorContent}
        </div>

        {/* Evidence: checkout */}
        <span className="mig-caption text-gray-400">Bukti Check Out</span>
        <div className="max-w-lg w-full space-y-3 flex flex-col items-center">
          {shouldShowSpinner && <Spin size="large" />}

          {!shouldShowSpinner && data.check_out_evidence !== null && (
            <>
              <img
                src={data.check_out_evidence}
                alt="Evidence Check Out Image"
                className="w-full h-full bg-cover"
              />
              <span className="mig-caption mig-caption--medium text-center text-mono50 block">
                {checkOutEvidenceFileName}
              </span>
            </>
          )}

          {shouldShowNotFoundCheckOut && imageErrorContent}
        </div>
      </section>
    ) : null;
  });
AttendanceDetailEvidenceSection.displayName = "AttendanceDetailEvidenceSection";
