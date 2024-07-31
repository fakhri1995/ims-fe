import {
  CalendarOutlined,
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Select,
  Switch,
  Table,
  Tabs,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
import { isBefore } from "date-fns";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import QueryString from "qs";
import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import { AccessControl } from "components/features/AccessControl";
import { DownloadIconSvg } from "components/icon";
import { DataEmptyState } from "components/states/DataEmptyState";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import {
  ATTENDANCES_USERS_GET,
  ATTENDANCE_ACTIVITY_USERS_EXPORT,
  ATTENDANCE_FORMS_GET,
  ATTENDANCE_FORM_GET,
  ATTENDANCE_USERS_PAGINATE_GET,
  LEAVES_GET,
} from "lib/features";
import {
  generateStaticAssetUrl,
  permissionWarningNotification,
} from "lib/helper";
import { getAntdTablePaginationConfig } from "lib/standard-config";

import {
  AbsentUser,
  AttendanceService,
  AttendanceServiceQueryKeys,
  AttendanceUser,
  GetAttendanceUsersPaginateDatum,
  IGetAttendanceUsersPaginateParams,
  UsersAttendance,
} from "apis/attendance";
import { CompanyService, CompanyServiceQueryKeys } from "apis/company";

import {
  AddNoteSvg,
  EyeIconSvg,
  SettingsIconSvg,
} from "../../../../components/icon";
import BadgeLeaveStatus from "../leave/BadgeLeaveStatus";
import { EksporAbsensiDrawer } from "../shared/EksporAbsensiDrawer";
import { AttendanceAdminOvertimeDrawer } from "./AttendanceAdminOvertimeDrawer";

const { TabPane } = Tabs;

/**
 * Component AttendanceAdminListSection's props.
 */
export interface IAttendanceAdminStatisticOvertime {
  initProps: string;
}

/**
 * Component AttendanceAdminListSection
 */
export const AttendanceAdminStatisticOvertime: FC<
  IAttendanceAdminStatisticOvertime
> = ({ initProps }) => {
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();

  const renderStatistic = (jumlah, status) => {
    return (
      <div className={"flex justify-between h-full"}>
        <div className={"flex flex-col justify-between"}>
          <div>
            <p className={"text-[#4D4D4D] text-lg leading-6 font-bold"}>
              {jumlah}
            </p>
          </div>
          <div className={"flex flex-col gap-1"}>
            <p className={"text-xs leading-5 font-bold text-[#4D4D4D]"}>
              {status}
            </p>
            <p className={"text-[#4D4D4D] text-[10px]"}>from all employee</p>
          </div>
        </div>
        <div className={""}>
          {status == "Request Pending" && (
            <ClockCircleFilled style={{ color: "#F5851E", fontSize: 24 }} />
          )}
          {status == "Request Rejected" && (
            <CloseCircleFilled style={{ color: "#BF4A40", fontSize: 24 }} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={"flex flex-col sm:flex-row sm:gap-8 gap-2"}>
      <div
        className={"w-full sm:w-1/4 h-[108px] bg-white rounded-[10px] p-4"}
        style={{ boxShadow: " 0px 6px 25px 0px rgba(0, 0, 0, 0.05)" }}
      >
        <div className={"flex justify-between h-full"}>
          <div className={"flex flex-col justify-between"}>
            <div>
              <p className={"text-[#4D4D4D] text-lg leading-6 font-bold"}>15</p>
            </div>
            <div className={"flex flex-col gap-1"}>
              <p className={"text-xs leading-5 font-bold text-[#4D4D4D]"}>
                Total Request
              </p>
              <p className={"text-[#4D4D4D] text-[10px]"}>from all employee</p>
            </div>
          </div>
          <div className={""}></div>
        </div>
      </div>
      <div
        className={"w-full sm:w-1/4 h-[108px] bg-white rounded-[10px] p-4"}
        style={{ boxShadow: " 0px 6px 25px 0px rgba(0, 0, 0, 0.05)" }}
      >
        <div className={"flex justify-between h-full"}>
          <div className={"flex flex-col justify-between"}>
            <div>
              <p className={"text-[#4D4D4D] text-lg leading-6 font-bold"}>
                100
              </p>
            </div>
            <div className={"flex flex-col gap-1"}>
              <p className={"text-xs leading-5 font-bold text-[#4D4D4D]"}>
                Request Accepted
              </p>
              <p className={"text-[#4D4D4D] text-[10px]"}>from all employee</p>
            </div>
          </div>
          <div className={""}>
            <CheckCircleFilled style={{ color: "#35763B", fontSize: 24 }} />
          </div>
        </div>
      </div>
      <div
        className={"w-full sm:w-1/4 h-[108px] bg-white rounded-[10px] p-4"}
        style={{ boxShadow: " 0px 6px 25px 0px rgba(0, 0, 0, 0.05)" }}
      >
        {renderStatistic(3, "Request Rejected")}
      </div>
      <div
        className={"w-full sm:w-1/4 h-[108px] bg-white rounded-[10px] p-4"}
        style={{ boxShadow: " 0px 6px 25px 0px rgba(0, 0, 0, 0.05)" }}
      >
        {renderStatistic(3, "Request Pending")}
      </div>
    </div>
  );
};
