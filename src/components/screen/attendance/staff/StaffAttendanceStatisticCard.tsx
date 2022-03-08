import { Skeleton } from "antd";
import { FC, useState } from "react";

/**
 * Component StaffAttendanceStatisticCard's props.
 */
export interface IStaffAttendanceStatisticCard {
  staffId: number;
}

/**
 * Component StaffAttendanceStatisticCard
 */
export const StaffAttendanceStatisticCard: FC<
  IStaffAttendanceStatisticCard
> = ({ staffId }) => {
  const [dummyLoading] = useState(false);

  return (
    <div className="mig-platform space-y-6">
      <h3 className="mig-heading--4">Statistik</h3>

      {dummyLoading && <Skeleton active round paragraph={{ rows: 1 }} />}
      {!dummyLoading && (
        <div className="flex justify-around">
          {/* Hadir */}
          <div className="text-center space-y-2">
            <h4 className="font-bold text-2xl text-primary100">12 hr</h4>
            <p className="text-mono50 text-2xs">Hadir</p>
          </div>

          {/* Terlambat */}
          <div className="text-center space-y-2">
            <h4 className="font-bold text-2xl text-state1">2 hr</h4>
            <p className="text-mono50 text-2xs">Terlambat</p>
          </div>
        </div>
      )}
    </div>
  );
};
