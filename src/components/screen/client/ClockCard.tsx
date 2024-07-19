import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Spin, Tooltip, notification } from "antd";
import type { FC } from "react";
import { useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { useCheckInOutTimer } from "hooks/use-checkinout-timer";

import { ATTENDANCE_TOGGLE_SET } from "lib/features";

import { useGetAttendeeInfo } from "apis/attendance";

import BlobLeft from "assets/vectors/bg-clock-left.svg";
import BlobRight from "assets/vectors/bg-clock-right.svg";

import { H1, H2, Label, Text } from "../../../components/typography";
import clsx from "clsx";

/**
 * Component CheckInOutCard's props.
 */
export interface IClockCard {
  /**
   * Set this props to true whenever you want to only render realtime clock and ignore
   *  the logic of check in or check out feature.
   *
   * This is useful to reuse this component in Admin Attendance page.
   */
  onlyShowTime?: boolean;

  onButtonClicked?: () => void;
  initProps?: string;
}

/**
 * Component CheckInOutCard
 */
export const ClockCard: FC<IClockCard> = ({
  onlyShowTime = false,
  onButtonClicked,
  initProps,
}) => {
  const { currentTime, currentDate, isOverAttendTime } = useCheckInOutTimer();
  const { hasCheckedInToday, attendeeStatus, isItSafeToCheckOut } =
    useGetAttendeeInfo(!onlyShowTime);

  const { hasPermission } = useAccessControl();
  const isAllowedToToggleCheckInCheckOut = hasPermission(ATTENDANCE_TOGGLE_SET);

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

  const shouldRenderSpinner = !isAllowedToToggleCheckInCheckOut
    ? false
    : currentTime === "" || (!onlyShowTime && attendeeStatus === undefined);

  const [scdata, setscdata] = useState({
    late_count: 0,
    on_time_count: 0,
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getAttendancesClient`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setscdata({
            on_time_count: res2.data.on_time_count,
            late_count: res2.data.late_count,
          });
        } else {
          // notification.error({
          //   message: `${res2.message}`,
          //   duration: 3,
          // });
        }
      })
      .catch((err) => {
        // console.log('error bro ',err)
        // notification.error({
        //   message: `${err.response}`,
        //   duration: 3,
        // });
      })
      .finally(() => {});
  };

  return (
    <div className="mig-platform flex flex-col justify-between  md:col-span-10 lg:col-span-4  space-y-6 relative overflow-hidden">
      {shouldRenderSpinner ? (
        <Spin size="large" />
      ) : (
        <>
          <div className={"mb-4"}>
            <H1>Waktu Lokal</H1>
          </div>
          <div className={timeTextClassName}>
            <span className="text-5xl block">{currentTime}</span>
            <span className="font-bold text-xs">{currentDate}</span>
          </div>
          <div className={"flex flex-col"}>
            <div className="flex justify-between items-center mb-1">
              <div className="flex">
                <div className={`w-1 mr-1 bg-primary100`}></div>
                <Text>Tepat Waktu</Text>
              </div>
              <div className="flex">
                <H2>{scdata?.on_time_count}</H2>
              </div>
            </div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex">
                <div className={`w-1 mr-1 bg-state1`}></div>
                <Text>Terlambat</Text>
              </div>
              <div className="flex">
                <H2>{scdata?.late_count}</H2>
              </div>
            </div>
          </div>

          <BlobRight className={`${blobClassName} -top-10 -left-10`} />
          <BlobLeft className={`${blobClassName} -top-6 -left-4`} />
        </>
      )}
    </div>
  );
};
