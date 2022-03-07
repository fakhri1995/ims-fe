import { Button } from "antd";
import { FC, useState } from "react";

import { useCheckInOutTimer } from "hooks/use-checkinout-timer";

import BlobLeft from "assets/vectors/blob-left.svg";
import BlobRight from "assets/vectors/blob-right.svg";

import clsx from "clsx";

/**
 * Component CheckInOutCard's props.
 */
export interface ICheckInOutCard {
  showButtonCheckInOut?: boolean;
  onCheckInOutButtonClicked?: () => void;
}

/**
 * Component CheckInOutCard
 */
export const CheckInOutCard: FC<ICheckInOutCard> = ({
  showButtonCheckInOut = true,
  onCheckInOutButtonClicked,
}) => {
  const { currentTime, currentDate, isOverAttendTime } = useCheckInOutTimer(
    "HH:mm:ss",
    8
  );

  /**
   * Dummy data
   */
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState<
    "checkin" | "checkout"
  >("checkout");

  const buttonClassName = clsx(
    "mig-button relative z-10",
    {
      "mig-button--solid-danger":
        !isOverAttendTime && attendanceStatus === "checkin",
    },
    isOverAttendTime && !hasCheckedIn
      ? "mig-button--solid-notice"
      : {
          "mig-button--solid-primary": attendanceStatus === "checkout",
          "mig-button--solid-danger": attendanceStatus === "checkin",
        }
  );

  const timeTextClassName = clsx(
    "text-center space-y-1 relative z-10",
    isOverAttendTime && !hasCheckedIn ? "text-notice" : "text-gray-600"
  );

  const blobClassName = clsx(
    "absolute h-120 -z-0",
    isOverAttendTime && !hasCheckedIn ? "text-notice/10" : "text-primary100/10"
  );

  const handleOnCheckInOutButtonClicked = () => {
    setAttendanceStatus((prev) =>
      prev === "checkin" ? "checkout" : "checkin"
    );
    setHasCheckedIn((prev) => {
      if (prev) {
        return prev;
      }

      return true;
    });

    // TODO:
    // onCheckInOutButtonClicked();
  };

  return (
    <div className="rounded-md shadow-md flex bg-white flex-col items-center space-y-6 py-8 relative overflow-hidden">
      <div className={timeTextClassName}>
        {/* <Clock format="HH:mm:ss" ticking timezone="Asia/Jakarta" className="block text-5xl" /> */}
        <span className="text-5xl block">{currentTime}</span>
        <span className="font-bold text-xs">{currentDate}</span>
      </div>

      {showButtonCheckInOut && (
        <Button
          className={buttonClassName}
          onClick={handleOnCheckInOutButtonClicked}
        >
          {attendanceStatus === "checkin" ? "Check Out" : "Check In"}
        </Button>
      )}

      <BlobLeft className={`${blobClassName} -top-20 -left-48`} />
      <BlobRight className={`${blobClassName} -top-44 -right-56`} />
    </div>
  );
};
