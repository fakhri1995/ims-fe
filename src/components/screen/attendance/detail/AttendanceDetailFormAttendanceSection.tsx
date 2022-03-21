import { Skeleton } from "antd";
import type { FC } from "react";
import React from "react";

import CheckedIcon from "assets/vectors/icon-checked.svg";
import UncheckedIcon from "assets/vectors/icon-unchecked.svg";

/**
 * Component AttendanceDetailFormAttendanceSection's props.
 */
export interface IAttendanceDetailFormAttendanceSection {
  activities?: Record<string, string | Record<string, boolean>>;
}

/**
 * Component AttendanceDetailFormAttendanceSection
 */
export const AttendanceDetailFormAttendanceSection: FC<
  IAttendanceDetailFormAttendanceSection
> = ({ activities }) => {
  return (
    <section className="mig-platform space-y-6 text-gray-500">
      {!activities && (
        <div>
          <Skeleton round active paragraph={{ rows: 2 }} />
          <Skeleton round active paragraph={{ rows: 1 }} />
          <Skeleton round active paragraph={{ rows: 3 }} />
        </div>
      )}

      {activities &&
        Object.entries(activities).map(
          ([activityName, activityValue], index) => {
            return typeof activityValue === "string" ? (
              <div key={index} className="space-y-2">
                <p className="mig-caption mig-caption--medium text-gray-400">
                  {activityName}
                </p>
                <p>{activityValue}</p>
              </div>
            ) : (
              <React.Fragment key={index}>
                <p className="mig-caption mig-caption--medium text-gray-400">
                  {activityName}
                </p>

                <div className="border rounded-sm">
                  <CheckboxItem items={activityValue} />
                </div>
              </React.Fragment>
            );
          }
        )}
    </section>
  );
};

interface ICheckboxItem {
  items: Record<string, boolean>;
}
const CheckboxItem: FC<ICheckboxItem> = ({ items }) => {
  return (
    <>
      {Object.entries(items).map(([key, value], index) => (
        <div key={index} className="w-full flex p-3 flex-wrap">
          <div className="w-full lg:w-1/3 text-center py-1 lg:py-0 lg:text-left">
            <p>{key}</p>
          </div>
          <div className="w-full lg:w-2/3 flex items-center space-x-3 py-1 lg:py-0 justify-center lg:justify-start">
            {value ? (
              <>
                <span>
                  <CheckedIcon />
                </span>
                <p>Telah diceklis</p>
              </>
            ) : (
              <>
                <span>
                  <UncheckedIcon />
                </span>
                <p>Tidak diceklis</p>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
