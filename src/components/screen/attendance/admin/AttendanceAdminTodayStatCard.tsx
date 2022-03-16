import { TeamOutlined } from "@ant-design/icons";
import type { FC } from "react";

/**
 * Component AttendanceAdminTodayStatCard's props.
 */
export interface IAttendanceAdminTodayStatCard {}

/**
 * Component AttendanceAdminTodayStatCard
 */
export const AttendanceAdminTodayStatCard: FC<
  IAttendanceAdminTodayStatCard
> = () => {
  return (
    <div className="mig-platform">
      <h3 className="mig-heading--4 mb-3">Hari ini</h3>

      <div className="flex items-center justify-around">
        {/* Hadir */}
        <div className="flex flex-col text-center">
          {/* TODO: update the following element's content */}
          <h4 className="text-5xl py-4 mb-2 text-primary100">200</h4>

          <div>
            <span className="font-bold text-mono30 text-sm flex items-center">
              <TeamOutlined className="mr-1" /> Orang
            </span>
            <span className="mig-caption text-gray-400">Hadir</span>
          </div>
        </div>

        {/* Absen */}
        <div className="flex flex-col text-center">
          {/* TODO: update the following element's content */}
          <h4 className="text-5xl py-4 mb-2 text-mono80">23</h4>

          <div>
            <span className="font-bold text-mono30 text-s flex items-center">
              <TeamOutlined className="mr-1" /> Orang
            </span>
            <span className="mig-caption text-gray-400">Hadir</span>
          </div>
        </div>
      </div>
    </div>
  );
};
