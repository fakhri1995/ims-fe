import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Table,
  Tabs,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
import { isBefore } from "date-fns";
import { useRouter } from "next/router";
import { FC, useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import { AccessControl } from "components/features/AccessControl";
import { DataEmptyState } from "components/states/DataEmptyState";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import {
  ATTENDANCES_USERS_GET,
  ATTENDANCE_ACTIVITY_USERS_EXPORT,
  ATTENDANCE_FORMS_GET,
  ATTENDANCE_FORM_GET,
} from "lib/features";
import { generateStaticAssetUrl } from "lib/helper";
import { getAntdTablePaginationConfig } from "lib/standard-config";

import {
  AbsentUser,
  AttendanceService,
  AttendanceServiceQueryKeys,
  UsersAttendance,
} from "apis/attendance";

import { EksporAbsensiDrawer } from "../shared/EksporAbsensiDrawer";

const { TabPane } = Tabs;

/**
 * Component AttendanceAdminListSection's props.
 */
export interface IAttendanceAdminListSection {}

/**
 * Component AttendanceAdminListSection
 */
export const AttendanceAdminListSection: FC<
  IAttendanceAdminListSection
> = () => {
  const { hasPermission } = useAccessControl();

  const canExportTableData = hasPermission([
    ATTENDANCE_ACTIVITY_USERS_EXPORT,
    ATTENDANCE_FORMS_GET,
    ATTENDANCE_FORM_GET,
  ]);

  const isAllowedToSearchData = hasPermission(ATTENDANCES_USERS_GET);

  /** 1 -> Hadir, 2 -> Absen */
  const [activeTab, setActiveTab] = useState<"1" | "2">("1");
  const [isExportDrawerShown, setIsExportDrawerShown] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="mig-platform space-y-6">
        {/* Header: tabs, buttons, and search box */}
        <div className="flex items-center justify-between">
          <Tabs
            defaultActiveKey="1"
            className="w-1/3"
            onChange={(value) => {
              setActiveTab(value as "1" | "2");
            }}
          >
            <TabPane tab="Hadir" key="1" />
            <TabPane tab="Absen" key="2" />
          </Tabs>

          {/* Table's header */}
          <div className="flex space-x-4 w-2/3 justify-end items-center">
            <ButtonSys
              type={canExportTableData ? "default" : "primary"}
              onClick={() => setIsExportDrawerShown(true)}
              disabled={!canExportTableData}
            >
              <DownloadOutlined className="mr-2" />
              Unduh Tabel
            </ButtonSys>

            <Form
              layout="inline"
              onFinish={(values) => {
                setSearchValue(values.search);
              }}
            >
              <Form.Item name="search">
                <Input
                  placeholder="Cari..."
                  disabled={!isAllowedToSearchData}
                  allowClear
                  onChange={(event) => {
                    if (
                      event.target.value.length === 0 ||
                      event.target.value === ""
                    ) {
                      setSearchValue("");
                    }
                  }}
                />
              </Form.Item>

              <Form.Item noStyle>
                <Button
                  htmlType="submit"
                  disabled={!isAllowedToSearchData}
                  className="mig-button mig-button--solid-primary"
                  icon={<SearchOutlined />}
                >
                  Cari
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        {/* Actual table */}
        <ConfigProvider
          renderEmpty={() => (
            <DataEmptyState caption="Data kehadiran kosong." />
          )}
        >
          {activeTab === "1" && <HadirTable searchValue={searchValue} />}
          {activeTab === "2" && <AbsenTable searchValue={searchValue} />}
        </ConfigProvider>
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
  searchValue?: string;
}

/**
 * @private
 */
const HadirTable: FC<ITable> = ({ searchValue }) => {
  const router = useRouter();
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();
  const isAllowedToGetAttendancesUsers = hasPermission(ATTENDANCES_USERS_GET);

  const { data, isLoading } = useQuery(
    [AttendanceServiceQueryKeys.ATTENDANCE_USERS_GET],
    () => AttendanceService.findAsAdmin(axiosClient),
    {
      enabled: isAllowedToGetAttendancesUsers,
      refetchOnMount: false,
      select: (response) =>
        response.data.data.users_attendances.map((userAttendance) => ({
          ...userAttendance,
          check_in: userAttendance.check_in
            ? new Date(userAttendance.check_in)
            : null,
          check_out: userAttendance.check_out
            ? new Date(userAttendance.check_out)
            : null,
          key: userAttendance.id,
        })),
    }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredData = useMemo(() => {
    if (!data) {
      return [];
    }

    if (!searchValue || searchValue === "") {
      return data;
    }

    return data.filter((attendance) =>
      attendance.user.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, data]);

  const tableHadirColumns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        key: "id",
        title: "No.",
        width: 64,
        render: (_, __, index) =>
          `${(currentPage - 1) * pageSize + index + 1}.`,
      },
      {
        title: "Nama",
        dataIndex: ["user", "name"],
        sorter: (a: UsersAttendance, b: UsersAttendance) =>
          a.user.name < b.user.name ? -1 : 1,
        render: (value, record: UsersAttendance) => {
          const profilePictureSrc = generateStaticAssetUrl(
            record.user.profile_image.link
          );

          return (
            <div className="flex items-center space-x-3">
              {/* Image */}
              <img
                src={profilePictureSrc}
                alt={`${record.user.name}'s Avatar`}
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
        title: "Kerja",
        dataIndex: "is_wfo",
        render: (is_wfo) => (is_wfo === 1 ? "WFO" : "WFH"),
      },
      {
        title: "Waktu Check In",
        dataIndex: "check_in",
        render: (check_in) =>
          formatDateToLocale(check_in, "dd MMM yyyy, HH:mm"),
        sorter: (a: UsersAttendance, b: UsersAttendance) =>
          isBefore(a.check_in as unknown as Date, b.check_in as unknown as Date)
            ? -1
            : 1,
      },
      {
        title: "Lokasi Check In",
        dataIndex: ["geo_loc_check_in", "display_name"],
        ellipsis: true,
      },
      {
        title: "Waktu Check Out",
        dataIndex: "check_out",
        render: (check_out) =>
          !check_out
            ? "-"
            : formatDateToLocale(check_out, "dd MMM yyyy, HH:mm"),
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

  const handleOnRowClicked = useCallback(
    (datum: UsersAttendance) => {
      router?.push(`/attendance/detail/${datum.id}`);
    },
    [router]
  );

  return (
    <Table
      columns={tableHadirColumns}
      dataSource={filteredData}
      pagination={tablePaginationConf}
      loading={isLoading}
      className="tableTypeTask"
      onRow={(datum: UsersAttendance) => {
        return {
          className: "hover:cursor-pointer",
          onClick: () => handleOnRowClicked(datum),
        };
      }}
    />
  );
};

/**
 * @private
 */
const AbsenTable: FC<ITable> = ({ searchValue }) => {
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();
  const isAllowedToGetAttendancesUsers = hasPermission(ATTENDANCES_USERS_GET);

  const { data, isLoading } = useQuery(
    [AttendanceServiceQueryKeys.ATTENDANCE_USERS_GET],
    () => AttendanceService.findAsAdmin(axiosClient),
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

    if (!searchValue || searchValue === "") {
      return data;
    }

    return data.filter((attendance) =>
      attendance.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, data]);

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
      className="tableTypeTask"
      onRow={() => {
        return {
          className: "hover:cursor-pointer",
        };
      }}
    />
  );
};
