import { DownloadOutlined } from "@ant-design/icons";
import { FC, useCallback, useMemo, useState } from "react";

import ButtonSys from "components/button";
import { DetailCard } from "components/cards/DetailCard";

/**
 * Component AttendanceStaffDetailCard's props.
 */
export interface IAttendanceStaffDetailCard {
  staffId: number;
}

/**
 * Component AttendanceStaffDetailCard
 */
export const AttendanceStaffDetailCard: FC<IAttendanceStaffDetailCard> = ({
  staffId,
}) => {
  const [dummyLoading] = useState(false);

  /**
   * TODO:
   * - use query by `staffId` and impl actual loading
   *
   * TODO:
   * - profile picture url
   * - name
   * - nip
   */
  const dummyContent = useMemo(() => {
    return [
      { label: "Jabatan", content: "UI/UX Designer" },
      { label: "Email", content: "yusron@mitramas.com" },
      { label: "No. Telp", content: "+62-812-3456-7890" },
    ];
  }, []);

  const onUnduhIdCardButtonClicked = useCallback(() => {
    alert("Unduh ID Card clicked!");
  }, []);

  return (
    <DetailCard
      content={dummyContent}
      isLoading={dummyLoading}
      estimatedContentLength={5}
      header={
        !dummyLoading && (
          <div className="flex flex-col items-center space-y-6">
            {/* Avatar */}
            <div className="w-32 h-32 bg-mono80 rounded-full">
              <img
                src="/image/staffTask.png"
                alt="Yusron's Avatar"
                className="w-full h-full bg-cover pointer-events-none select-none"
              />
            </div>

            {/* Name and NIP? */}
            <div className="text-center space-y-2">
              <h3 className="mig-heading--4">Yusron Taufiq</h3>
              <p className="mig-caption mig-caption--medium text-mono80">
                121223
              </p>
            </div>
          </div>
        )
      }
      footer={
        !dummyLoading && (
          <div className="flex justify-center">
            <ButtonSys type="default" onClick={onUnduhIdCardButtonClicked}>
              <DownloadOutlined className="mr-2" />
              Unduh ID Card
            </ButtonSys>
          </div>
        )
      }
    />
  );
};
