import { CalendarOutlined, PlusCircleOutlined } from "@ant-design/icons";
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
export interface IAttendanceAdminListOvertime {
  initProps: string;
}

export interface IGetOvertimeUser {
  start_date: string;
  end_date: string;
  issued_date: string;
  type: {
    name: string;
  };
  employee: {
    name: string;
  };
  status: string;
}

/**
 * Component AttendanceAdminListSection
 */
export const AttendanceAdminListOvertime: FC<IAttendanceAdminListOvertime> = ({
  initProps,
}) => {
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();

  const canExportTableData = hasPermission([
    ATTENDANCE_ACTIVITY_USERS_EXPORT,
    ATTENDANCE_FORMS_GET,
    ATTENDANCE_FORM_GET,
  ]);

  const isAllowedToSearchData = hasPermission(ATTENDANCES_USERS_GET);
  const isAllowedToGetLeave = hasPermission(LEAVES_GET);
  const [dataAnnualLeave, setDataAnnualLeave] = useState([]);
  const [displayDataLeaves, setDisplayDataLeaves] = useState({
    current_page: "",
    data: [],
    first_page_url: "",
    from: null,
    last_page: null,
    last_page_url: "",
    next_page_url: "",
    path: "",
    per_page: null,
    prev_page_url: null,
    to: null,
    total: null,
  });
  const [showDrawer, setShowDrawer] = useState(false);
  const [dataDefault, setDataDefault] = useState(null);
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    company_ids: withDefault(StringParam, undefined),
    is_late: withDefault(NumberParam, undefined),
    is_hadir: withDefault(NumberParam, undefined),
    keyword: withDefault(StringParam, undefined),
  });
  const [showModalOvertime, setShowModalOvertime] = useState(false);

  const columns: ColumnsType<IGetOvertimeUser> = [
    {
      title: "Nama Karyawan",
      dataIndex: "nama",
      key: "nama",
      render: (text, record, index) => <p>{record.employee?.name}</p>,
    },
    {
      title: "Tanggal Awal Cuti",
      dataIndex: "start_date",
      key: "start_date",
      render: (text, record, index) => (
        <p>{moment(record.start_date).format("DD MMMM YYYY")}</p>
      ),
    },
    {
      title: "Tanggal Pengajuan Cuti",
      dataIndex: "issued_date",
      key: "issued_date",
      render: (text, record, index) => (
        <p>{moment(record.issued_date).format("DD MMMM YYYY")}</p>
      ),
    },
    {
      title: "Durasi Cuti",
      dataIndex: "durasi_cuti",
      key: "durasi_cuti",
      render: (text, record, index) => (
        <p>
          {moment(record.end_date).diff(moment(record.start_date), "days")} Hari
        </p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      align: `center`,
      render: (text, record, index) => {
        return {
          children: (
            <div className={"flex gap-8 justify-center"}>
              <BadgeLeaveStatus status={record.status} />
              <div
                onClick={() => detailCuti(record)}
                className={"hover:cursor-pointer"}
              >
                <EyeIconSvg size={16} />
              </div>
            </div>
          ),
        };
      },
    },
  ];

  const detailCuti = (record) => {
    setShowDrawer(true);
    setDataDefault(record);
  };

  useEffect(() => {
    fetchData();
  }, [queryParams.page, queryParams.rows]);

  const fetchData = async () => {
    if (!isAllowedToGetLeave) {
      permissionWarningNotification("Mendapatkan", "Data Cuti");
    } else {
      const params = QueryString.stringify(queryParams, {
        addQueryPrefix: true,
      });
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getLeaves${params}`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          setDisplayDataLeaves(res2.data); // table-related data source
          setDataAnnualLeave(res2.data.data);
        });
    }
  };

  return (
    <>
      <div
        className={"flex flex-col p-6  mt-8"}
        style={{ boxShadow: " 0px 6px 25px 0px rgba(0, 0, 0, 0.05)" }}
      >
        <div className={"flex w-full justify-between items-center"}>
          <p className="text-[14px] leading-6 font-bold text-[#4D4D4D]">
            List of Overtime Requests
          </p>
          <div
            onClick={() => setShowModalOvertime(true)}
            className={
              "flex items-center justify-center gap-2 h-[32px] w-[152px] rounded bg-[#35763B] "
            }
          >
            <PlusCircleOutlined style={{ fontSize: 16, color: "white" }} />
            <p className={"text-white text-[14px] leading-4"}>Apply Overtime</p>
          </div>
        </div>
        <div
          className={
            "mt-4 flex flex-col sm:flex-row w-full sm:items-center gap-4 "
          }
        >
          <div className={"w-[40%] overtime-input"}>
            <Input
              placeholder="Search employee's name..."
              disabled={!isAllowedToSearchData}
              allowClear
              className="w-full"
              onChange={(event) => {
                if (
                  event.target.value.length === 0 ||
                  event.target.value === ""
                ) {
                  setQueryParams({ keyword: "" });
                } else {
                  setQueryParams({ keyword: event.target.value });
                }
              }}
            />
          </div>
          <div className={"w-[20%] overtime-input"}>
            <DatePicker
              className="w-full"
              suffixIcon={
                <CalendarOutlined style={{ color: "#808080", fontSize: 16 }} />
              }
            />
          </div>
          <div className={"w-[20%] overtime-input"}>
            <Select
              bordered={false}
              placeholder={"Select Placement"}
              className="w-full"
            />
          </div>
          <div className={"w-[20%] overtime-input"}>
            <Select
              bordered={false}
              placeholder={"Select Status"}
              className="w-full"
            />
          </div>
        </div>
        <div className={"mt-6"}>
          <Table
            columns={columns}
            dataSource={dataAnnualLeave}
            pagination={{
              current: queryParams.page,
              pageSize: queryParams.rows,
              total: displayDataLeaves.total,
            }}
            onChange={(pagination, _, sorter) => {
              setQueryParams({
                page: pagination.current,
                rows: pagination.pageSize,
              });
            }}
          />
        </div>
      </div>
      <AttendanceAdminOvertimeDrawer
        getDataNew={fetchData}
        dataToken={initProps}
        username={"bakhtiar"}
        visible={showModalOvertime}
        onClose={() => setShowModalOvertime(false)}
      />

      {/* <AccessControl hasPermission={ATTENDANCE_ACTIVITY_USERS_EXPORT}>
          <EksporAbsensiDrawer
            exportAsAdmin
            visible={isExportDrawerShown}
            onClose={() => setIsExportDrawerShown(false)}
          />
        </AccessControl> */}
    </>
  );
};
