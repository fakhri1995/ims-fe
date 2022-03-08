import { Spin } from "antd";
import { FC, memo } from "react";
import { useQuery } from "react-query";

import { useAxiosClient } from "hooks/use-axios-client";

import { AttendanceService, AttendanceServiceQueryKeys } from "apis/attendance";

export interface ITotalFormAktivitasCard {}

export const TotalFormAktivitasCard: FC<ITotalFormAktivitasCard> = memo(() => {
  const axiosClient = useAxiosClient();
  const { data, isLoading, isError } = useQuery(
    AttendanceServiceQueryKeys.FIND,
    () => AttendanceService.find(axiosClient)
  );

  return (
    <div className="mig-platform flex items-center justify-between">
      <span className="font-bold text-lg text-mono30">
        Total Form Aktivitas
      </span>

      <span className="text-5xl text-primary100">
        {!isError ? (
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
