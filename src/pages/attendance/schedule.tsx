import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  Select,
  Spin,
  Table,
  Tooltip,
  notification,
} from "antd";
import locale from "antd/lib/date-picker/locale/id_ID";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { GetServerSideProps, NextPage } from "next";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import ButtonSys from "components/button";
import DrawerSchedule from "components/drawer/attendance/drawerSchedule";
import { AccessControl } from "components/features/AccessControl";
import {
  AlertCircleIconSvg,
  CalendarOffIconSvg,
  CalendarStatsIconSvg,
  CheckIconSvg,
  EditIconSvg,
  LeftIconSvg,
  PlusIconSvg,
  RightIconSvg,
  SearchIconSvg,
  TrashIconSvg,
} from "components/icon";
import LayoutDashboard from "components/layout-dashboardNew";
import ModalScheduleUpdate from "components/modal/attendance/modalScheduleUpdate";
import { ModalHapus2 } from "components/modal/modalCustom";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ATTENDANCE_SCHEDULES_GET,
  ATTENDANCE_SCHEDULE_ADD,
  ATTENDANCE_SCHEDULE_ALL_DELETE,
  ATTENDANCE_SCHEDULE_UPDATE,
  COMPANY_CLIENTS_GET,
  RECRUITMENT_ROLES_LIST_GET,
} from "lib/features";

import {
  AgentScheduleData,
  AttendanceScheduleService,
  ScheduleData,
} from "apis/attendance";
import { CompanyService } from "apis/company";
import { EmployeeService } from "apis/employee";

import httpcookie from "cookie";

import { PageBreadcrumbValue, ProtectedPageProps } from "types/common";

const ScheduleAttendancePage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  // 1. Init
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetSchedules = hasPermission(ATTENDANCE_SCHEDULES_GET);
  const isAllowedToAddSchedule = hasPermission(ATTENDANCE_SCHEDULE_ADD);
  const isAllowedToUpdateSchedule = hasPermission(ATTENDANCE_SCHEDULE_UPDATE);
  const isAllowedToGetCompanyList = hasPermission(COMPANY_CLIENTS_GET);
  const isAllowedToGetRoleList = hasPermission(RECRUITMENT_ROLES_LIST_GET);
  const isAllowedToDeleteAllSchedule = hasPermission(
    ATTENDANCE_SCHEDULE_ALL_DELETE
  );

  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    keyword: withDefault(StringParam, null),
    start_at: withDefault(
      StringParam,
      moment().startOf("week").add(1, "day").format("YYYY-MM-DD")
    ),
    company_id: withDefault(NumberParam, 0),
    position: withDefault(StringParam, null),
  });

  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Jadwal Kerja",
    },
  ];

  // 2. Use State
  const [dataSchedules, setDataSchedules] = useState<AgentScheduleData[]>([]);
  const [currentDataSchedule, setCurrentDataSchedule] = useState<ScheduleData>({
    id: null,
    user_id: null,
    date: "",
    shift_id: null,
  });

  const [isShowCreateDrawer, setShowCreateDrawer] = useState(false);
  const [isShowUpdateModal, setShowUpdateModal] = useState(false);
  const [isShowDeleteAllModal, setShowDeleteAllModal] = useState(false);

  const [currentStartOfWeek, setCurrentStartOfWeek] = useState(
    moment().startOf("week").add(1, "days")
  );
  const [currentEndOfWeek, setCurrentEndOfWeek] = useState(
    moment().startOf("week").add(7, "days")
  );

  const [isSelectMode, setSelectMode] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<
    AgentScheduleData[]
  >([]);

  // 3. Use Effect & Use Query
  const {
    data: dataRawSchedules,
    isLoading: loadingSchedules,
    refetch: refetchSchedules,
  } = useQuery(
    [ATTENDANCE_SCHEDULES_GET, queryParams],
    () =>
      AttendanceScheduleService.getSchedules(
        isAllowedToGetSchedules,
        axiosClient,
        queryParams
      ),
    {
      enabled: isAllowedToGetSchedules,
      select: (response) => response.data.data,
      onSuccess: (data) => {
        let schedules = data.data;
        setDataSchedules(schedules);
      },
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan daftar jadwal kerja.",
        });
      },
    }
  );

  const {
    data: companyList,
    isLoading: loadingCompanyListt,
    refetch: refetchCompanyList,
  } = useQuery(
    [COMPANY_CLIENTS_GET],
    () => CompanyService.getCompanyClientList(axiosClient, true),
    {
      enabled: isAllowedToGetCompanyList,
      select: (response) => response.data.data,
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan daftar company.",
        });
      },
    }
  );

  const {
    data: roleList,
    isLoading: loadingRoleList,
    refetch: refetchRoleList,
  } = useQuery(
    [RECRUITMENT_ROLES_LIST_GET],
    () => EmployeeService.getEmployeeRoleList(token, isAllowedToGetRoleList),
    {
      enabled: isAllowedToGetRoleList,
      select: (response) => response.data,
    }
  );

  const onMutationSucceed = (queryKey: string, message: string) => {
    queryClient.invalidateQueries(queryKey);
    notification.success({
      message,
    });
  };

  // 4. Event Handler
  const { mutate: deleteAllSchedule, isLoading: loadingDeleteAllSchedule } =
    useMutation(
      (userIds: number[]) =>
        AttendanceScheduleService.deleteAllSchedule(
          isAllowedToDeleteAllSchedule,
          axiosClient,
          userIds
        ),
      {
        onSuccess: (response) => {
          onMutationSucceed(ATTENDANCE_SCHEDULES_GET, response.data.message);
          handleCloseDelete();
        },
        onError: (error) => {
          notification.error({ message: "Gagal mengosongkan jadwal." });
        },
      }
    );

  const handleShowUpdate = (data: ScheduleData) => {
    setCurrentDataSchedule(data);
    setShowUpdateModal(true);
  };

  const handleCloseDelete = () => {
    setSelectedEmployees([]);
    setShowDeleteAllModal(false);
    setSelectMode(false);
  };

  const setCurrentWeekRange = (startDate) => {
    setCurrentStartOfWeek(startDate);
    setCurrentEndOfWeek(moment(startDate).add(6, "days"));
    setQueryParams({
      start_at: moment(startDate).format("YYYY-MM-DD"),
    });
  };

  const handleClickPrevWeek = () => {
    let startOfWeek = moment(currentStartOfWeek)
      .startOf("week")
      ?.subtract(1, "week")
      ?.add(1, "days");
    setCurrentWeekRange(startOfWeek);
  };

  const handleClickNextWeek = () => {
    let startOfWeek = moment(currentStartOfWeek)
      .startOf("week")
      ?.add(1, "week")
      ?.add(1, "days");
    setCurrentWeekRange(startOfWeek);
  };

  const handleClickPrevMonth = () => {
    let startOfWeek = moment(currentStartOfWeek)
      ?.subtract(1, "month")
      ?.startOf("week")
      ?.add(1, "days");
    setCurrentWeekRange(startOfWeek);
  };

  const handleClickNextMonth = () => {
    let startOfWeek = moment(currentStartOfWeek)
      ?.add(1, "month")
      ?.startOf("week")
      ?.add(1, "days");
    setCurrentWeekRange(startOfWeek);
  };

  // 5. Constants
  const currentStartMonth = moment(currentStartOfWeek).format("MMMM YYYY");
  const currentEndMonth = moment(currentEndOfWeek).format("MMMM YYYY");
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  const dateColumns = Array.from({ length: 7 }, (_, i) => {
    const currentDate = moment(currentStartOfWeek).add(i, "days");
    const isToday = currentDate.isSame(new Date(), "day");
    return {
      title: (
        <div className="flex flex-col justify-center items-center">
          <div
            className={`px-2 py-1 w-16 h-16 rounded-full flex flex-col
            items-center justify-center 
            ${
              isToday
                ? `bg-primary100 border-2 border-primary25 text-white text-center`
                : `text-mono50`
            }`}
          >
            <p className="">{days[i].toUpperCase()}</p>
            <p className="font-bold text-lg">{currentDate?.format("DD")}</p>
          </div>
        </div>
      ),
      dataIndex: ["schedule"],
      key: `date-${i}`,
      // width: 10,
      render: (schedules, record, index) => {
        let scheduleIdx = schedules.findIndex(
          (i) => i.date == currentDate?.format("YYYY-MM-DD")
        );

        return {
          children: scheduleIdx > -1 && (
            <div className="flex justify-center">
              <button
                onClick={() => handleShowUpdate(schedules[scheduleIdx])}
                disabled={!isAllowedToUpdateSchedule}
                className="bg-backdrop flex flex-col items-center justify-center 
                px-5 py-4 rounded-md "
              >
                <p className="mig-caption--bold text-mono30 text-center">
                  {schedules[scheduleIdx]?.shift?.title}
                </p>
                <p className="mig-caption text-mono50 whitespace-nowrap">
                  {schedules[scheduleIdx]?.shift?.start_at?.slice(0, 5)} -{" "}
                  {schedules[scheduleIdx]?.shift?.end_at?.slice(0, 5)}
                </p>
              </button>
            </div>
          ),
        };
      },
    };
  });

  const calendarColumns: ColumnsType<AgentScheduleData> = [
    {
      title: isSelectMode ? (
        <ButtonSys
          fullWidth
          type={"default"}
          color="danger"
          onClick={() => setShowDeleteAllModal(true)}
          disabled={!isAllowedToDeleteAllSchedule}
        >
          <div className="flex flex-row items-center space-x-2">
            <CalendarOffIconSvg size={16} color="#BF4A40" />
            <p className="whitespace-nowrap">Kosongkan Jadwal</p>
          </div>
        </ButtonSys>
      ) : (
        ""
      ),
      dataIndex: "name",
      key: "name",
      width: 200,
      className: "border-r",
      render: (text, record, index) => {
        return {
          children: (
            <div className="px-3 py-2 bg-mono120 flex flex-col gap-1 rounded-md border-">
              <p className="mig-caption--bold text-mono30">{record?.name}</p>
              <p className="mig-caption text-mono50">{record?.position}</p>
              <p className="mig-caption text-mono50">{record?.company_name}</p>
            </div>
          ),
        };
      },
    },
    {
      title: (
        <button
          onClick={handleClickPrevWeek}
          className="bg-mono100 p-2 w-9 h-9 rounded-full 
            flex items-center justify-center"
        >
          <LeftIconSvg color={"#808080"} size={16} />
        </button>
      ),
      width: 60,
    },

    ...dateColumns,
    {
      title: (
        <button
          onClick={handleClickNextWeek}
          className="bg-mono100 p-2 w-9 h-9 rounded-full 
            flex items-center justify-center"
        >
          <RightIconSvg color={"#808080"} size={16} />
        </button>
      ),
      width: 60,
    },
  ];

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      fixedBreadcrumbValues={pageBreadcrumb}
      sidemenu="attendance/schedule"
    >
      <div className="grid grid-cols-1 px-4 md:px-5" id="mainWrapper">
        {/* Table Daftar Jadwal */}
        <div className="flex flex-col shadow-md rounded-md bg-white p-4 mb-6 gap-6">
          {/* Filter */}
          <div className="flex flex-col lg:flex-row items-end md:items-center gap-4">
            {/* Search by keyword (kata kunci) */}
            <div className="w-full lg:w-2/12">
              <Input
                style={{ width: `100%` }}
                placeholder="Cari Jadwal..."
                allowClear
                onChange={(e) => {
                  setTimeout(
                    () =>
                      setQueryParams({
                        keyword: e.target.value,
                      }),
                    500
                  );
                }}
                disabled={!isAllowedToGetSchedules}
              />
            </div>
            <div className="w-full lg:w-2/12">
              <Select
                allowClear
                showSearch
                disabled={!isAllowedToGetCompanyList}
                placeholder="Pilih Perusahaan"
                style={{ width: `100%` }}
                onChange={(value) => {
                  setQueryParams({ company_id: value });
                }}
                optionFilterProp="children"
                filterOption={(
                  input,
                  option: { label: string; value: number }
                ) => option?.label?.toLowerCase().includes(input.toLowerCase())}
              >
                {companyList?.map((item) => (
                  <Select.Option
                    key={item.id}
                    value={item.id}
                    label={item.name}
                  >
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="w-full lg:w-2/12">
              <Select
                allowClear
                showSearch
                disabled={!isAllowedToGetRoleList}
                placeholder="Pilih Posisi"
                style={{ width: `100%` }}
                onChange={(value) => {
                  setQueryParams({ position: value });
                }}
                optionFilterProp="children"
                filterOption={(
                  input,
                  option: { label: string; value: string }
                ) => option?.label?.toLowerCase().includes(input.toLowerCase())}
              >
                {roleList?.map((item) => (
                  <Select.Option
                    key={item.id}
                    value={item.name}
                    label={item.name}
                  >
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            {!isSelectMode ? (
              <>
                <div className="w-full lg:w-3/12">
                  <ButtonSys
                    fullWidth
                    type={"default"}
                    onClick={() => setSelectMode(true)}
                    disabled={!isAllowedToDeleteAllSchedule}
                  >
                    <div className="flex flex-row items-center space-x-2">
                      <CalendarOffIconSvg size={16} color="#35763B" />
                      <p className="">Kosongkan Jadwal</p>
                    </div>
                  </ButtonSys>
                </div>
                <div className="w-full lg:w-3/12">
                  <ButtonSys
                    fullWidth
                    type={"primary"}
                    onClick={() => setShowCreateDrawer(true)}
                    disabled={!isAllowedToAddSchedule}
                  >
                    <div className="flex flex-row items-center space-x-2">
                      <CalendarStatsIconSvg size={16} color="#FFFFFF" />
                      <p className="">Jadwalkan Karywan</p>
                    </div>
                  </ButtonSys>
                </div>
              </>
            ) : (
              <ButtonSys
                type={"default"}
                color={"danger"}
                onClick={() => {
                  setSelectMode(false);
                  setSelectedEmployees([]);
                }}
              >
                <div className="flex flex-row space-x-1 items-center">
                  <CloseOutlined rev={""} />
                  <p>Batal</p>
                </div>
              </ButtonSys>
            )}
          </div>

          {isSelectMode && (
            <div className="flex gap-2 items-center">
              <CheckIconSvg color="#35763B" size={20} />
              <p className="mig-caption--bold">
                {selectedEmployees?.length} Karyawan Dipilih
              </p>
            </div>
          )}

          {!!queryParams?.keyword?.length && (
            <div className="flex gap-2 items-center">
              <SearchIconSvg color="#35763B" size={20} />
              <p className="mig-caption">
                Menampilkan {dataRawSchedules?.total} data pencarian dari{" "}
                <strong>{queryParams?.keyword}</strong>
              </p>
            </div>
          )}

          {/* Calendar */}
          <div>
            {/* Month header */}
            <div className="flex justify-between items-center p-4 border-x border-t">
              <button
                onClick={() => handleClickPrevMonth()}
                className="bg-mono100 p-2 w-9 h-9 rounded-full 
                flex items-center justify-center"
              >
                <LeftIconSvg color={"#808080"} size={16} />
              </button>

              <div className="flex gap-2 items-center justify-center">
                <h4 className="mig-heading--4">
                  {currentStartMonth == currentEndMonth
                    ? currentStartMonth
                    : `${currentStartMonth} - ${currentEndMonth}`}
                </h4>

                <DatePicker
                  // picker="month"
                  // open
                  allowClear={false}
                  bordered={false}
                  locale={locale}
                  format={"MMMM YYYY"}
                  value={currentStartOfWeek}
                  className="scheduleCalendar cursor-pointer"
                  style={{
                    color: "#4D4D4D",
                    fontSize: "18px",
                    fontWeight: 700,
                  }}
                  onChange={(date) => {
                    if (date) {
                      setQueryParams({
                        start_at: moment(date)
                          .startOf("week")
                          .add(1, "day")
                          .format("YYYY-MM-DD"),
                      });
                      let startOfWeek = moment(date)
                        .startOf("week")
                        .add(1, "days");

                      setCurrentWeekRange(startOfWeek);
                    } else {
                      setQueryParams({
                        start_at: moment()
                          .startOf("week")
                          .add(1, "day")
                          .format("YYYY-MM-DD"),
                      });
                      let startOfWeek = moment().startOf("week").add(1, "days");
                      setCurrentWeekRange(startOfWeek);
                    }
                  }}
                />
              </div>
              <button
                onClick={handleClickNextMonth}
                className="bg-mono100 p-2 w-9 h-9 rounded-full 
                flex items-center justify-center"
              >
                <RightIconSvg color={"#808080"} size={16} />
              </button>
            </div>

            <Table
              dataSource={dataSchedules}
              columns={calendarColumns}
              rowKey={(record) => record.id}
              loading={loadingSchedules}
              className="border border-collapse tableSchedule"
              scroll={{ x: 200 }}
              pagination={{
                current: queryParams.page,
                pageSize: queryParams.rows,
                total: dataRawSchedules?.total,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `Showing ${range[0]}-${range[1]} of ${total} items`,
              }}
              onChange={(pagination, filters, sorter, extra) => {
                setQueryParams({
                  page: pagination.current,
                  rows: pagination.pageSize,
                });
              }}
              rowSelection={
                isSelectMode && {
                  type: "checkbox",
                  onChange: (_, selectedRows) => {
                    setSelectedEmployees(selectedRows);
                  },
                }
              }
            />
          </div>
        </div>
      </div>

      {/* Drawer Add Schedule */}
      <AccessControl hasPermission={ATTENDANCE_SCHEDULE_ADD}>
        <DrawerSchedule
          visible={isShowCreateDrawer}
          onvisible={setShowCreateDrawer}
          companyList={companyList}
        />
      </AccessControl>

      {/* Modal Update Schedule */}
      <AccessControl hasPermission={ATTENDANCE_SCHEDULE_UPDATE}>
        <ModalScheduleUpdate
          initProps={token}
          visible={isShowUpdateModal}
          onvisible={setShowUpdateModal}
          scheduleId={currentDataSchedule?.id}
        />
      </AccessControl>

      {/* Modal Confirmation Kosongkan Jadwal */}
      <AccessControl hasPermission={ATTENDANCE_SCHEDULE_ALL_DELETE}>
        <ModalHapus2
          title={
            <div className="flex items-center gap-4">
              <AlertCircleIconSvg color={"#BF4A40"} size={24} />
              <p className="font-bold">Peringatan</p>
            </div>
          }
          visible={isShowDeleteAllModal}
          onvisible={setShowDeleteAllModal}
          onOk={() => {
            const selectedEmployeeeIds = selectedEmployees?.map((e) => e.id);
            deleteAllSchedule(selectedEmployeeeIds);
          }}
          onCancel={() => setShowDeleteAllModal(false)}
          itemName={"jadwal"}
          loading={loadingDeleteAllSchedule}
        >
          <div>
            <p className="mb-2">
              Apakah Anda yakin ingin mengosongkan semua jadwal milik{" "}
              <strong>{selectedEmployees.length} karyawan</strong>
              &nbsp;berikut:
            </p>
            {selectedEmployees?.map((item, idx) => (
              <p key={item?.id} className="font-bold">
                {`${idx + 1}. ${item.name}`}
              </p>
            ))}
          </div>
        </ModalHapus2>
      </AccessControl>
    </LayoutDashboard>
  );
};

export const getServerSideProps: GetServerSideProps<
  ProtectedPageProps
> = async (ctx) => {
  var initProps = "";
  if (!ctx.req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const cookiesJSON1 = httpcookie.parse(ctx.req.headers.cookie);
  if (!cookiesJSON1.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  initProps = cookiesJSON1.token;
  const resourcesGP = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;

  return {
    props: {
      dataProfile,
      token: initProps,
    },
  };
};

export default ScheduleAttendancePage;
