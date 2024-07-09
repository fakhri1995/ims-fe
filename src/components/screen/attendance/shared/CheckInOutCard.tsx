import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Spin, Tooltip } from "antd";
import type { FC } from "react";

import { useAccessControl } from "contexts/access-control";

import { useCheckInOutTimer } from "hooks/use-checkinout-timer";

import { ATTENDANCE_TOGGLE_SET } from "lib/features";

import { useGetAttendeeInfo } from "apis/attendance";

import BlobLeft from "assets/vectors/blob-left.svg";
import BlobRight from "assets/vectors/blob-right.svg";

import clsx from "clsx";

/**
 * Component CheckInOutCard's props.
 */
export interface ICheckInOutCard {
  /**
   * Set this props to true whenever you want to only render realtime clock and ignore
   *  the logic of check in or check out feature.
   *
   * This is useful to reuse this component in Admin Attendance page.
   */
  onlyShowTime?: boolean;

  onButtonClicked?: () => void;

  checkInTime?: string;
}

/**
 * Component CheckInOutCard
 */
export const CheckInOutCard: FC<ICheckInOutCard> = ({
  onlyShowTime = false,
  onButtonClicked,
  checkInTime,
}) => {
  const checkInArr = checkInTime?.split(":") || [0, 0];
  const checkInHour = Number(checkInArr[0]);
  const checkInMin = Number(checkInArr[1]);

  const { currentTime, currentDate, isOverAttendTime } = useCheckInOutTimer(
    "HH:mm:ss",
    checkInHour,
    checkInMin
  );

  const { hasCheckedInToday, attendeeStatus, isItSafeToCheckOut } =
    useGetAttendeeInfo(!onlyShowTime);

  const { hasPermission } = useAccessControl();
  const isAllowedToToggleCheckInCheckOut = hasPermission(ATTENDANCE_TOGGLE_SET);

  const buttonClassName = clsx(
    "mig-button relative z-10 border-none",
    {
      "mig-button--solid-danger":
        !isOverAttendTime && attendeeStatus === "checkin",
    },
    isOverAttendTime && !hasCheckedInToday && !onlyShowTime
      ? "mig-button--outlined-notice"
      : {
          "mig-button--outlined-primary": attendeeStatus === "checkout",
          "mig-button--outlined-danger": attendeeStatus === "checkin",
        }
  );

  const timeTextClassName = clsx(
    "text-center space-y-1 relative z-10 text-white"
    // isOverAttendTime && !hasCheckedInToday && !onlyShowTime
    //   ? "text-notice"
    //   : "text-white"
  );

  const blobClassName = clsx(
    "absolute h-120 -z-0",
    isOverAttendTime && !hasCheckedInToday && !onlyShowTime
      ? "text-notice/10"
      : "text-primary100/10"
  );

  const shouldRenderSpinner = !isAllowedToToggleCheckInCheckOut
    ? false
    : currentTime === "" || (!onlyShowTime && attendeeStatus === undefined);

  const shouldDisableCheckOutButton =
    (attendeeStatus === "checkin" && !isItSafeToCheckOut) ||
    !isAllowedToToggleCheckInCheckOut;
  const disabledButtonTooltipContent = isAllowedToToggleCheckInCheckOut
    ? "Check Out bisa dilakukan setelah mengisi aktivitas"
    : "Anda tidak memiliki fitur untuk Check In atau Check Out";

  return (
    <div
      className="bg-cover mig-platform flex flex-col items-center 
      justify-center space-y-3 overflow-hidden min-h-fit"
      style={{
        backgroundImage:
          isOverAttendTime && !hasCheckedInToday && !onlyShowTime
            ? `url('/image/mesh-gradient-warning.svg')`
            : `url('/image/mesh-gradient-default.svg')`,
      }}
    >
      {shouldRenderSpinner ? (
        <Spin size="large" />
      ) : (
        <>
          <div className={timeTextClassName}>
            <h2 className="mig-heading--2 text-white block">{currentTime}</h2>
            <span className="mig-caption--medium">{currentDate}</span>
          </div>

          {!onlyShowTime && (
            <>
              {shouldDisableCheckOutButton && (
                <div className="flex items-center space-x-1">
                  <Button
                    className={buttonClassName}
                    onClick={onButtonClicked}
                    disabled
                  >
                    {attendeeStatus === "checkin" ? "Check Out" : "Check In"}
                  </Button>

                  <Tooltip
                    title={disabledButtonTooltipContent}
                    placement="right"
                    className="relative z-10"
                  >
                    <InfoCircleOutlined className="p-2 hover:cursor-help text-white" />
                  </Tooltip>
                </div>
              )}

              {!shouldDisableCheckOutButton && (
                <Button className={buttonClassName} onClick={onButtonClicked}>
                  {attendeeStatus === "checkin" ? "Check Out" : "Check In"}
                </Button>
              )}
            </>
          )}

          {/* <BlobLeft className={`${blobClassName} -top-20 -left-48`} />
          <BlobRight className={`${blobClassName} -top-44 -right-56`} /> */}
        </>
      )}
    </div>
  );
};
