import { CalendarOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { DatePicker, Input, Select, Table, Tabs } from "antd";
import type { ColumnsType } from "antd/lib/table";
import moment from "moment";
import {
  DateParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import QueryString from "qs";
import { FC, useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ATTENDANCES_USERS_GET,
  ATTENDANCE_ACTIVITY_USERS_EXPORT,
  ATTENDANCE_FORMS_GET,
  ATTENDANCE_FORM_GET,
  COMPANY_CLIENTS_GET,
  OVERTIMES_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";
import { getAntdTablePaginationConfig } from "lib/standard-config";

import { LeaveStatus } from "apis/attendance";

import DrawerOvertimeDetail from "../../../../components/drawer/attendance/drawerOvertimeDetail";
import BadgeOvertimeStatus from "../overtime/BadgeOvertimeStatus";
import { AttendanceAdminOvertimeDrawer } from "./AttendanceAdminOvertimeDrawer";

const { TabPane } = Tabs;

/**
 * Component AttendanceAdminListSection's props.
 */
export interface IAttendanceAdminListOvertime {
  initProps: string;
}

export interface IGetOvertimeAdmin {
  start_date: string;
  end_date: string;
  issued_date: string;
  type: {
    name: string;
  };
  employee: {
    name: string;
    user: {
      name: string;
      position: string;
      company: {
        name: string;
      };
    };
  };
  status: {
    id: number;
    name: string;
  };
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
  const isAllowedToGetOvertime = hasPermission(OVERTIMES_GET);
  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);
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
  const [dataCompanyList, setDataCompanyList] = useState([]);
  const [loadingCompanyList, setLoadingCompanyList] = useState(false);
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    issued_date: withDefault(StringParam, undefined),
    issued_date_form: withDefault(DateParam, undefined),
    company_id: withDefault(StringParam, undefined),
    employee: withDefault(StringParam, undefined),
    status: withDefault(StringParam, undefined),
  });
  const [showDetailOvertime, setShowDetailOvertime] = useState(false);
  const [showModalOvertime, setShowModalOvertime] = useState(false);
  const overtimeStatuses = [
    {
      label: "Pending",
      value: LeaveStatus.PENDING,
    },
    {
      label: "Accepted",
      value: LeaveStatus.ACCEPTED,
    },
    {
      label: "Rejected",
      value: LeaveStatus.REJECTED,
    },
  ];
  const columns: ColumnsType<IGetOvertimeAdmin> = [
    {
      title: "Employee Name",
      dataIndex: "nama",
      key: "nama",
      render: (text, record, index) => <p>{record.employee?.user?.name}</p>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record, index) => (
        <p>{record?.employee?.user?.position}</p>
      ),
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (text, record, index) => (
        <p>{record.employee.user.company.name}</p>
      ),
    },
    {
      title: "Issued Date",
      dataIndex: "issued_date",
      key: "issued_date",
      render: (text, record, index) => (
        <p>{moment(record.issued_date).format("DD MMMM YYYY")}</p>
      ),
    },
    {
      title: "Overtime Date",
      dataIndex: "issued_date",
      key: "issued_date",
      render: (text, record, index) => (
        <p>{moment(record.issued_date).format("DD MMMM YYYY")}</p>
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (text, record, index) => <p>{text} hour</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: `center`,
      render: (text, record, index) => {
        return {
          children: (
            <div
              onClick={() => detailOvertime(record)}
              className={"flex gap-8 justify-center hover:cursor-pointer"}
            >
              <BadgeOvertimeStatus status={record?.status?.id} />
            </div>
          ),
        };
      },
    },
  ];

  const detailOvertime = (record) => {
    setShowDetailOvertime(true);
    setDataDefault(record);
  };

  useEffect(() => {
    fetchData();
  }, [
    queryParams.page,
    queryParams.rows,
    queryParams.company_id,
    queryParams.employee,
    queryParams.issued_date,
    queryParams.status,
  ]);

  useEffect(() => {
    fetchDataCompany();
  }, []);

  const fetchData = async () => {
    if (!isAllowedToGetOvertime) {
      permissionWarningNotification("Mendapatkan", "Data Cuti");
    } else {
      const params = QueryString.stringify(queryParams, {
        addQueryPrefix: true,
      });
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getOvertimes${params}`, {
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

  const fetchDataCompany = async () => {
    if (!isAllowedToGetCompanyClients) {
      permissionWarningNotification("Mendapatkan", "Data Company");
    } else {
      setLoadingCompanyList(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyClientList`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          setDataCompanyList(res2.data);
          setLoadingCompanyList(false);
        });
    }
  };

  const onChangeIssuedDate = (date, dateString) => {
    setQueryParams({ issued_date: dateString, page: 1 });
  };

  const closeDetailDrawer = () => {
    setShowDetailOvertime(false);
  };

  return (
    <>
      <div
        className={"mig-platform--p-0 flex flex-col p-6  mt-8"}
        style={{ boxShadow: " 0px 6px 25px 0px rgba(0, 0, 0, 0.05)" }}
      >
        <div className={"flex w-full justify-between items-center"}>
          <p className="text-[14px] leading-6 font-bold text-[#4D4D4D]">
            List of Overtime Requests
          </p>
          <div
            onClick={() => setShowModalOvertime(true)}
            className={
              "flex items-center justify-center gap-2 h-[32px] w-[152px] rounded bg-[#35763B] hover:cursor-pointer"
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
                  setQueryParams({ employee: "" });
                } else {
                  setQueryParams({ employee: event.target.value });
                }
              }}
            />
          </div>
          <div className={"w-[20%] overtime-input"}>
            <DatePicker
              className="w-full"
              // defaultValue={queryParams.issued_date_form}
              suffixIcon={
                <CalendarOutlined style={{ color: "#808080", fontSize: 16 }} />
              }
              onChange={onChangeIssuedDate}
            />
          </div>
          <div className={"w-[20%] overtime-input"}>
            <Select
              allowClear
              showSearch
              mode="multiple"
              className="w-full"
              defaultValue={queryParams.company_id}
              disabled={!isAllowedToGetCompanyClients || loadingCompanyList}
              placeholder="Select Placement"
              onChange={(value) => {
                setQueryParams({ company_id: value, page: 1 });
              }}
              filterOption={(input, option) =>
                (String(option?.children) ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              loading={loadingCompanyList}
              optionFilterProp="children"
            >
              {dataCompanyList?.map((company) => (
                <Select.Option key={company.id} value={company.id}>
                  {company.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className={"w-[20%] overtime-input"}>
            <Select
              allowClear
              bordered={false}
              className="w-full"
              defaultValue={queryParams.status}
              placeholder="Status"
              onChange={(value) => {
                setQueryParams({ status: value, page: 1 });
              }}
            >
              {overtimeStatuses?.map((item) => (
                <Select.Option key={item.label} value={item.value}>
                  <BadgeOvertimeStatus status={item.value} />
                </Select.Option>
              ))}
            </Select>
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
            onRow={(datum, rowIndex) => {
              return {
                className: "hover:cursor-pointer",
                onClick: () => detailOvertime(datum),
              };
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
      {showDetailOvertime && (
        <DrawerOvertimeDetail
          visible={showDetailOvertime}
          dataToken={initProps}
          fetchData={fetchData}
          dataDefault={dataDefault}
          onClose={closeDetailDrawer}
        />
      )}

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
