import { Spin } from "antd";
import { FC, memo } from "react";
import { useQuery } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { ATTENDANCE_FORMS_GET } from "lib/features";

import {
  AttendanceFormAktivitasService,
  AttendanceFormAktivitasServiceQueryKeys,
} from "apis/attendance";

export interface ITotalFormAktivitasCard {}

export const TotalFormAktivitasCard: FC<ITotalFormAktivitasCard> = memo(() => {
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();

  const { data, isLoading } = useQuery(
    AttendanceFormAktivitasServiceQueryKeys.FIND,
    () => AttendanceFormAktivitasService.find(axiosClient),
    {
      enabled: hasPermission(ATTENDANCE_FORMS_GET),
    }
  );

  return (
    <div className="mig-platform flex items-center justify-between">
      <span className="font-bold text-lg text-mono30">
        Total Form Aktivitas
      </span>

      <span className="text-5xl text-primary100">
        {!isLoading && data ? (
          <>
            {isLoading && <Spin />}
            {data && data.data.data.total}
          </>
        ) : (
          "-"
        )}
      </span>
    </div>
  );
});
TotalFormAktivitasCard.displayName = "TotalFormAktivitasCard";
