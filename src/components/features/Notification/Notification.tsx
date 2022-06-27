import { Dropdown } from "antd";
import type { FC } from "react";

import { H2 } from "components/typography";

import BellIcon from "assets/vectors/icon-bell.svg";
import ExclamationIcon from "assets/vectors/icon-exclamation.svg";

interface INotification {}

export const Notification: FC<INotification> = () => {
  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      className="cursor-pointer"
      overlay={<NotificationOverlayContainer />}
      // visible
    >
      <button className="bg-white/0">
        <BellIcon className="text-black w-8 h-8 stroke-" />
      </button>
    </Dropdown>
  );
};

const NotificationOverlayContainer: FC = () => {
  return (
    <div className="mig-platform w-96 flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <H2>Notifikasi</H2>

        <span className="cursor-pointer text-primary100 hover:opacity-75">
          Tandai semua telah dibaca
        </span>
      </div>

      <span className="mig-caption text-mono50">Hari ini</span>
      {/* Notification Item */}
      <div className="mig-platform--p-0 p-2 cursor-pointer flex items-start space-x-4 hover:bg-gray-50 transition-colors duration-300">
        {/* Icon */}
        <div>
          <div className="h-12 w-12 rounded-full bg-state1/25 flex items-center justify-center">
            <ExclamationIcon className="text-state1 stroke-2 w-8 h-8" />
          </div>
        </div>

        {/* Content and Date */}
        <div className="flex flex-col space-y-2">
          <p className="text-mono30">
            Sisa waktu <strong>Task 000892</strong> 1 jam lagi
          </p>
          <span className="mig-caption text-mono80">Hari Ini, 16:00</span>
        </div>

        <div className="h-4 self-center flex justify-end">
          <span className="block w-3 h-3 rounded-full bg-state1" />
        </div>
      </div>

      {/* Notification Item */}
      <div className="mig-platform--p-0 p-2 cursor-pointer flex items-start space-x-4 opacity-75">
        {/* Icon */}
        <div>
          <div className="h-12 w-12 rounded-full bg-state1/25 flex items-center justify-center">
            <ExclamationIcon className="text-state1 stroke-2 w-8 h-8" />
          </div>
        </div>

        {/* Content and Date */}
        <div className="flex flex-col space-y-2">
          <p className="text-mono30">
            Kennan menolak Closed <strong>Task 000123</strong> dari Anda
          </p>
          <span className="mig-caption text-mono80">
            Selasa, 12 Apr 2022 - 08:00
          </span>
        </div>

        {/* <div className="h-4 self-center flex justify-end">
          <span className="block w-3 h-3 rounded-full bg-state1" />
        </div> */}
      </div>

      <span className="mig-caption text-mono50">Lebih lama</span>
    </div>
  );
};
