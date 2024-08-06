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
import StatisticCountCard from "components/cards/StatisticCountCard";
import { AccessControl } from "components/features/AccessControl";
import {
  CircleCheckFilledIconSvg,
  CircleXFilledIconSvg,
  ClockIconFilledSvg,
  DownloadIconSvg,
  UsersFilledIconSvg,
} from "components/icon";
import { DataEmptyState } from "components/states/DataEmptyState";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import { OVERTIME_STATISTICS_GET } from "lib/features";
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
  request: number;
  accepted: number;
  rejected: number;
  pending: number;
}

/**
 * Component AttendanceAdminListSection
 */
export const AttendanceAdminStatisticOvertime: FC<
  IAttendanceAdminStatisticOvertime
> = ({ initProps, rejected, request, accepted, pending }) => {
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();
  const isAllowedTogetStatistics = hasPermission(OVERTIME_STATISTICS_GET);

  return (
    <div className={"flex flex-col sm:flex-row sm:gap-5 gap-2"}>
      <StatisticCountCard
        dataCount={request}
        icon={<UsersFilledIconSvg size={24} className={"text-accentblue"} />}
        title="Request Overtime"
        description="from all employees this month"
      />
      <StatisticCountCard
        dataCount={accepted}
        icon={
          <CircleCheckFilledIconSvg size={24} className={"text-primary100"} />
        }
        title="Request Accepted"
        description="from all employees this month"
      />
      <StatisticCountCard
        dataCount={rejected}
        icon={<CircleXFilledIconSvg size={24} className={"text-danger"} />}
        title="Request Rejected"
        description="from all employees this month"
      />
      <StatisticCountCard
        dataCount={pending}
        icon={<ClockIconFilledSvg size={28} className={"text-warning"} />}
        title="Request pending"
        description="awaiting approval"
      />
    </div>
  );
};
