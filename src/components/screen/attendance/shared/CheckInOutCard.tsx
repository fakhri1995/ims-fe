import { Button } from "antd";
import type { FC } from "react";

import BlobLeft from "assets/vectors/blob-left.svg";
import BlobRight from "assets/vectors/blob-right.svg";

/**
 * Component CheckInOutCard's props.
 */
export interface ICheckInOutCard {
  showButtonCheckInOut?: boolean;
  onCheckInOutButtonClicked?: () => void;
}

/**
 * Component CheckInOutCard
 *
 * TODO: handle conditional checkin / checkout state
 */
export const CheckInOutCard: FC<ICheckInOutCard> = ({
  showButtonCheckInOut = true,
  onCheckInOutButtonClicked,
}) => {
  return (
    <div className="rounded-md shadow-md flex bg-white flex-col items-center space-y-6 py-8 relative overflow-hidden">
      <div className="text-center space-y-1 text-gray-600 relative z-10">
        <h3 className="text-5xl">08:55:25</h3>
        <span className="font-bold text-xs">Selasa, 25 Februari 2022</span>
      </div>

      {showButtonCheckInOut && (
        <Button
          className="mig-button mig-button--solid-primary relative z-10"
          onClick={onCheckInOutButtonClicked}
        >
          Check In
        </Button>
      )}

      <BlobLeft className="text-primary100/10 absolute -top-20 -left-48 h-120 -z-0" />
      <BlobRight className="text-primary100/10 absolute -top-44 -right-56 h-120 -z-0" />
    </div>
  );
};
