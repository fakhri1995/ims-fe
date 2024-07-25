import {
  ConfigProvider,
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
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
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
  COMPANY_CLIENTS_GET,
} from "lib/features";
import { generateStaticAssetUrl } from "lib/helper";
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

import { EksporAbsensiDrawer } from "../shared/EksporAbsensiDrawer";

const { TabPane } = Tabs;

/**
 * Component AttendanceAdminListSection's props.
 */
export interface IAttendanceAdminListSection {
  initProps: string;
  role: number;
  companyId: number;
}

/**
 * Component AttendanceAdminListSection
 */
export const AttendanceAdminListSection: FC<IAttendanceAdminListSection> = ({
  initProps,
  role,
  companyId,
}) => {
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();

  const canExportTableData = hasPermission([
    ATTENDANCE_ACTIVITY_USERS_EXPORT,
    ATTENDANCE_FORMS_GET,
    ATTENDANCE_FORM_GET,
  ]);

  const isAllowedToSearchData = hasPermission(ATTENDANCES_USERS_GET);
  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    company_ids:
      role == 1
        ? withDefault(StringParam, undefined)
        : withDefault(NumberParam, companyId),
    is_late: withDefault(NumberParam, undefined),
    is_hadir: withDefault(NumberParam, undefined),
    keyword: withDefault(StringParam, undefined),
  });

  const onTriggerChangeParams = useCallback(
    (newParams: Partial<IGetAttendanceUsersPaginateParams>) => {
      setQueryParams({
        page: newParams.page,
        rows: newParams.rows,
        sort_by: newParams.sort_by,
        sort_type: newParams.sort_type,
        keyword: newParams.keyword,
        company_ids: newParams.company_ids,
        is_late: newParams.is_late,
        is_hadir: newParams.is_hadir,
      });
    },
    []
  );

  let timer: NodeJS.Timeout; // use for delay time in table's search

  /** 1 -> Hadir, 2 -> Absen */
  const [activeTab, setActiveTab] = useState<"1" | "2">("1");
  const [isExportDrawerShown, setIsExportDrawerShown] = useState(false);

  const { data: dataCompanyList, isLoading: loadingCompanyClients } = useQuery(
    [CompanyServiceQueryKeys.COMPANY_CLIENTS_GET],
    () => CompanyService.getCompanyClientList(axiosClient, true),
    {
      enabled: isAllowedToGetCompanyClients,
      refetchOnMount: false,
      select: (response) => response.data.data,
    }
  );

  return (
    <>
      <div className="mig-platform--p-0">
        {/* Header: tabs, buttons, filter, and search box */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between pt-3 px-4">
            <h4 className="mig-body--bold">Employee Attendance List</h4>
            {role == 1 && (
              <ButtonSys
                square
                type={"primary"}
                color="mono100"
                onClick={() => setIsExportDrawerShown(true)}
                disabled={!canExportTableData}
              >
                <DownloadIconSvg />
              </ButtonSys>
            )}
          </div>
          <div className="border-b space-y-3 px-4">
            <Tabs
              defaultActiveKey="1"
              className="headerTab"
              onChange={(value) => {
                setActiveTab(value as "1" | "2");
              }}
            >
              <TabPane tab="Present" key="1" />
              <TabPane tab="Absent" key="2" />
            </Tabs>
          </div>

          {/* Table's filter */}
          <div className="px-4 py-3">
            <Form
              className="flex w-full justify-between xl:justify-end items-center space-x-2"
              onFinish={(values) => {
                setQueryParams({ keyword: values.search, page: 1 });
              }}
            >
              <Form.Item noStyle name="search">
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
                      clearTimeout(timer);
                      timer = setTimeout(() => {
                        setQueryParams({ keyword: event.target.value });
                      }, 500);
                    }
                  }}
                />
              </Form.Item>
              {activeTab === "1" && role == 1 && (
                <>
                  <Form.Item noStyle>
                    <Select
                      allowClear
                      showSearch
                      mode="multiple"
                      className="w-full"
                      defaultValue={queryParams.company_ids}
                      disabled={
                        !isAllowedToGetCompanyClients || loadingCompanyClients
                      }
                      placeholder="Select Placement"
                      onChange={(value) => {
                        setQueryParams({ company_ids: value, page: 1 });
                      }}
                      filterOption={(input, option) =>
                        (String(option?.children) ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      loading={loadingCompanyClients}
                      optionFilterProp="children"
                    >
                      {dataCompanyList?.map((company) => (
                        <Select.Option key={company.id} value={company.id}>
                          {company.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  {/* TODO: uncomment & adjust if BE is done */}
                  {/* <Form.Item noStyle>
                    <DatePicker
                      allowClear
                      className="w-full"
                      defaultValue={queryParams.date}
                      disabled={
                        !isAllowedToGetCompanyClients || loadingCompanyClients
                      }
                      placeholder="Select Date"
                      onChange={(value) => {
                        setQueryParams({ date: value, page: 1 });
                      }}
                    />
                  </Form.Item> */}
                </>
              )}

              {activeTab === "1" && (
                <Form.Item noStyle>
                  {queryParams.is_late ? (
                    <p className="text-overdue">Late</p>
                  ) : (
                    <p className="text-primary100 whitespace-nowrap">On Time</p>
                  )}

                  <Switch
                    checked={!queryParams.is_late}
                    onChange={(checked) =>
                      setQueryParams({ is_late: !checked ? 1 : 0, page: 1 })
                    }
                  />
                </Form.Item>
              )}
            </Form>
          </div>
        </div>

        {/* Actual table */}
        <div className="px-4 pb-3">
          <ConfigProvider
            renderEmpty={() => (
              <DataEmptyState caption="Data kehadiran kosong." />
            )}
          >
            {activeTab === "1" && (
              <HadirTable
                page={queryParams.page}
                rows={queryParams.rows}
                sort_by={queryParams.sort_by}
                sort_type={queryParams.sort_type}
                keyword={queryParams.keyword}
                is_late={queryParams.is_late}
                is_hadir={queryParams.is_hadir}
                company_ids={queryParams.company_ids}
                onTriggerChangeParams={onTriggerChangeParams}
              />
            )}
            {activeTab === "2" && (
              <AbsenTable keyword={queryParams.keyword} role={role} />
            )}
          </ConfigProvider>
        </div>
      </div>

      <AccessControl hasPermission={ATTENDANCE_ACTIVITY_USERS_EXPORT}>
        <EksporAbsensiDrawer
          exportAsAdmin
          visible={isExportDrawerShown}
          onClose={() => setIsExportDrawerShown(false)}
        />
      </AccessControl>
    </>
  );
};

/**
 * @private
 */
interface ITable {
  page: number;
  rows: number;
  sort_by: string;
  sort_type: string;
  keyword: string;
  is_late: number;
  is_hadir: number;
  company_ids: string;
  onTriggerChangeParams: (
    newParams: Partial<IGetAttendanceUsersPaginateParams>
  ) => void;
}

/**
 * @private
 */
const HadirTable: FC<ITable> = memo(
  ({
    onTriggerChangeParams,
    page = 1,
    rows = 10,
    sort_by = "",
    sort_type = "",
    keyword = "",
    is_late = 0,
    is_hadir = 1,
    company_ids = "",
  }) => {
    const router = useRouter();
    const axiosClient = useAxiosClient();
    const { hasPermission } = useAccessControl();
    const isAllowedToGetAttendancesUsersPaginate = hasPermission(
      ATTENDANCE_USERS_PAGINATE_GET
    );

    const tableQueryCriteria = useMemo(
      () => ({
        page,
        rows,
        sort_by,
        sort_type,
        keyword,
        is_late,
        is_hadir,
        company_ids,
      }),
      [page, rows, sort_by, sort_type, keyword, is_late, is_hadir, company_ids]
    );

    const { data, isLoading } = useQuery(
      [
        AttendanceServiceQueryKeys.ATTENDANCE_USERS_PAGINATE_GET,
        tableQueryCriteria,
      ],
      () =>
        AttendanceService.findAsAdminPaginate(axiosClient, tableQueryCriteria),
      {
        enabled: isAllowedToGetAttendancesUsersPaginate,
        select: (response) => {
          const mappedData = response.data.data.data.map((user) => {
            return {
              ...user,
              check_in: user.attendance_user?.check_in
                ? new Date(user.attendance_user?.check_in)
                : null,
              check_out: user.attendance_user?.check_out
                ? new Date(user.attendance_user?.check_out)
                : null,
              key: user.id,
            };
          });

          response.data.data.data = mappedData;
          return response;
        },
      }
    );

    const tableHadirColumns = useMemo<ColumnsType<any>>(() => {
      return [
        {
          key: "id",
          title: "No.",
          width: 64,
          render: (_, __, index) => `${(page - 1) * rows + index + 1}.`,
        },
        {
          title: "Nama",
          dataIndex: ["user", "name"],
          sorter: (
            a: GetAttendanceUsersPaginateDatum,
            b: GetAttendanceUsersPaginateDatum
          ) => (a.name < b.name ? -1 : 1),
          render: (value, record: GetAttendanceUsersPaginateDatum) => {
            const profilePictureSrc = generateStaticAssetUrl(
              record?.profile_image?.link
            );
            return (
              <div className="flex items-center space-x-3">
                {/* Image */}
                <img
                  src={profilePictureSrc}
                  alt={`${record.name}'s Avatar`}
                  className="w-8 h-8 bg-mono80 rounded-full"
                />

                <Typography.Text className="max-w-full" ellipsis>
                  {record.name}
                </Typography.Text>
              </div>
            );
          },
        },
        {
          title: "Kerja",
          dataIndex: ["attendance_user", "is_wfo"],
          width: "70px",
          render: (is_wfo) => (is_wfo === 1 ? "WFO" : "WFH"),
        },
        {
          title: "Company",
          dataIndex: ["company", "name"],
        },
        {
          title: "Waktu Check In",
          dataIndex: ["attendance_user", "check_in"],
          render: (check_in) => {
            return formatDateToLocale(check_in, "dd MMM yyyy, HH:mm");
          },
          sorter: (a: AttendanceUser, b: AttendanceUser) =>
            isBefore(
              a?.check_in as unknown as Date,
              b?.check_in as unknown as Date
            )
              ? -1
              : 1,
        },
        {
          title: "Lokasi Check In",
          dataIndex: ["attendance_user", "geo_loc_check_in", "display_name"],
          ellipsis: true,
        },
        {
          title: "Waktu Check Out",
          dataIndex: ["attendance_user", "check_out"],
          render: (check_out) =>
            !check_out
              ? "-"
              : formatDateToLocale(check_out, "dd MMM yyyy, HH:mm"),
        },
      ];
    }, [rows, page]);

    const tablePaginationConf = useMemo(
      () =>
        getAntdTablePaginationConfig({
          current: page,
          pageSize: rows,
          total: data?.data.data.total || 0,
        }),
      [rows, data, page]
    );

    const handleOnRowClicked = useCallback(
      (datum: GetAttendanceUsersPaginateDatum) => {
        router?.push(`/attendance/detail/${datum.attendance_user.id}`);
      },
      [router]
    );

    return (
      <Table
        columns={tableHadirColumns}
        dataSource={data?.data.data.data || []}
        pagination={tablePaginationConf}
        loading={isLoading}
        className="tableTypeTask"
        scroll={{ x: 800 }}
        onChange={(pagination, _, sorter) => {
          let criteria: IGetAttendanceUsersPaginateParams = {
            page: pagination.current,
            rows: pagination.pageSize,
            is_late: is_late,
            is_hadir: is_hadir,
            company_ids: company_ids,
            keyword: keyword,
          };

          onTriggerChangeParams(criteria);
        }}
        onRow={(datum: GetAttendanceUsersPaginateDatum) => {
          return {
            className: "hover:cursor-pointer",
            onClick: () => handleOnRowClicked(datum),
          };
        }}
      />
    );
  }
);

/**
 * @private
 */
interface IAbsenTable {
  keyword: string;
  role: number;
}

/**
 * @private
 */
const AbsenTable: FC<IAbsenTable> = ({ keyword, role }) => {
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();
  const isAllowedToGetAttendancesUsers = hasPermission(ATTENDANCES_USERS_GET);

  const { data, isLoading } = useQuery(
    [AttendanceServiceQueryKeys.ATTENDANCE_USERS_GET],
    () =>
      role == 1
        ? AttendanceService.findAsAdmin(axiosClient)
        : AttendanceService.findAsAdminCompany(axiosClient),
    {
      enabled: isAllowedToGetAttendancesUsers,
      refetchOnMount: false,
      select: (response) =>
        response.data.data.absent_users.map((absentUser) => ({
          ...absentUser,
          key: absentUser.id,
        })),
    }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredData = useMemo(() => {
    if (!data) {
      return [];
    }

    if (!keyword || keyword === "") {
      return data;
    }

    return data.filter((attendance) =>
      attendance.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword, data]);

  const tableAbsenColumns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        title: "No.",
        width: 64,
        render: (_, __, index) =>
          `${(currentPage - 1) * pageSize + index + 1}.`,
      },
      {
        title: "Nama",
        dataIndex: "name",
        ellipsis: true,
        sorter: (a: AbsentUser, b: AbsentUser) => (a.name < b.name ? -1 : 1),
        render: (value, record: AbsentUser) => {
          const profilePictureSrc = generateStaticAssetUrl(
            record.profile_image.link
          );

          return (
            <div className="flex items-center space-x-3">
              {/* Image */}
              <img
                src={profilePictureSrc}
                alt={`${record.name}'s Avatar`}
                className="w-8 h-8 bg-mono80 rounded-full"
              />

              <Typography.Text className="max-w-full" ellipsis>
                {value}
              </Typography.Text>
            </div>
          );
        },
      },
      {
        title: "Jabatan",
        dataIndex: "position",
        sorter: (a: AbsentUser, b: AbsentUser) =>
          a.position < b.position ? -1 : 1,
      },
      {
        title: "Form Aktivitas",
        dataIndex: ["attendance_forms", 0, "name"],
        render: (value) => (!value ? "-" : value),
        sorter: (a: AbsentUser, b: AbsentUser) => {
          const aAttendanceForm = a.attendance_forms[0];
          const bAttendanceForm = b.attendance_forms[0];

          if (!aAttendanceForm) {
            return -1;
          }

          if (!bAttendanceForm) {
            return 1;
          }

          return aAttendanceForm.name < bAttendanceForm.name ? -1 : 1;
        },
      },
    ];
  }, [pageSize, currentPage]);

  const tablePaginationConf = useMemo(
    () =>
      getAntdTablePaginationConfig({
        onChange: (pageNumber, pageSize) => {
          setCurrentPage(pageNumber);
          setPageSize(pageSize);
        },
      }),
    []
  );

  return (
    <Table
      columns={tableAbsenColumns}
      dataSource={filteredData}
      pagination={tablePaginationConf}
      loading={isLoading}
      scroll={{ x: 500 }}
      className="tableTypeTask"
      onRow={() => {
        return {
          className: "hover:cursor-pointer",
        };
      }}
    />
  );
};
