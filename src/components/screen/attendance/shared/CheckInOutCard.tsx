import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Spin, Tooltip } from "antd";
import type { FC } from "react";

import { useCheckInOutTimer } from "hooks/use-checkinout-timer";

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
}

/**
 * Component CheckInOutCard
 */
export const CheckInOutCard: FC<ICheckInOutCard> = ({
  onlyShowTime = false,
  onButtonClicked,
}) => {
  const { currentTime, currentDate, isOverAttendTime } = useCheckInOutTimer();
  const { hasCheckedInToday, attendeeStatus, isItSafeToCheckOut } =
    useGetAttendeeInfo(!onlyShowTime);

  const buttonClassName = clsx(
    "mig-button relative z-10",
    {
      "mig-button--solid-danger":
        !isOverAttendTime && attendeeStatus === "checkin",
    },
    isOverAttendTime && !hasCheckedInToday && !onlyShowTime
      ? "mig-button--solid-notice"
      : {
          "mig-button--solid-primary": attendeeStatus === "checkout",
          "mig-button--solid-danger": attendeeStatus === "checkin",
        }
  );

  const timeTextClassName = clsx(
    "text-center space-y-1 relative z-10",
    isOverAttendTime && !hasCheckedInToday && !onlyShowTime
      ? "text-notice"
      : "text-gray-600"
  );

  const blobClassName = clsx(
    "absolute h-120 -z-0",
    isOverAttendTime && !hasCheckedInToday && !onlyShowTime
      ? "text-notice/10"
      : "text-primary100/10"
  );

  const shouldRenderSpinner =
    currentTime === "" || (!onlyShowTime && attendeeStatus === undefined);

  const shouldDisableCheckOutButton =
    attendeeStatus === "checkin" && !isItSafeToCheckOut;

  return (
    <div className="mig-platform flex flex-col items-center justify-center space-y-6 py-8 relative overflow-hidden min-h-[12rem]">
      {shouldRenderSpinner ? (
        <Spin size="large" />
      ) : (
        <>
          <div className={timeTextClassName}>
            <span className="text-5xl block">{currentTime}</span>
            <span className="font-bold text-xs">{currentDate}</span>
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
                    title="Check Out bisa dilakukan setelah mengisi aktivitas"
                    placement="right"
                    className="relative z-10"
                  >
                    <InfoCircleOutlined className="p-2 hover:cursor-help" />
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

          <BlobLeft className={`${blobClassName} -top-20 -left-48`} />
          <BlobRight className={`${blobClassName} -top-44 -right-56`} />
        </>
      )}
    </div>
  );
};
