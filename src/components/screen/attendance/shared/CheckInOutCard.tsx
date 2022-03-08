import { Button, Spin } from "antd";
import { FC, useState } from "react";

import { useCheckInOutTimer } from "hooks/use-checkinout-timer";

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

  isUserHasCheckedIn?: boolean;
  attendeeStatus?: "checkin" | "checkout";

  onButtonClicked?: () => void;
}

/**
 * Component CheckInOutCard
 */
export const CheckInOutCard: FC<ICheckInOutCard> = ({
  onlyShowTime = false,
  onButtonClicked,

  isUserHasCheckedIn = false,
  attendeeStatus = "checkout",
}) => {
  const { currentTime, currentDate, isOverAttendTime } = useCheckInOutTimer();

  const buttonClassName = clsx(
    "mig-button relative z-10",
    {
      "mig-button--solid-danger":
        !isOverAttendTime && attendeeStatus === "checkin",
    },
    isOverAttendTime && !isUserHasCheckedIn && !onlyShowTime
      ? "mig-button--solid-notice"
      : {
          "mig-button--solid-primary": attendeeStatus === "checkout",
          "mig-button--solid-danger": attendeeStatus === "checkin",
        }
  );

  const timeTextClassName = clsx(
    "text-center space-y-1 relative z-10",
    isOverAttendTime && !isUserHasCheckedIn && !onlyShowTime
      ? "text-notice"
      : "text-gray-600"
  );

  const blobClassName = clsx(
    "absolute h-120 -z-0",
    isOverAttendTime && !isUserHasCheckedIn && !onlyShowTime
      ? "text-notice/10"
      : "text-primary100/10"
  );

  return (
    <div className="mig-platform flex flex-col items-center justify-center space-y-6 py-8 relative overflow-hidden min-h-[12rem]">
      {currentTime === "" && <Spin size="large" />}

      {currentTime !== "" && (
        <>
          <div className={timeTextClassName}>
            <span className="text-5xl block">{currentTime}</span>
            <span className="font-bold text-xs">{currentDate}</span>
          </div>

          {!onlyShowTime && (
            <Button className={buttonClassName} onClick={onButtonClicked}>
              {attendeeStatus === "checkin" ? "Check Out" : "Check In"}
            </Button>
          )}

          <BlobLeft className={`${blobClassName} -top-20 -left-48`} />
          <BlobRight className={`${blobClassName} -top-44 -right-56`} />
        </>
      )}
    </div>
  );
};
