import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
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
import DrawerShift from "components/drawer/attendance/drawerShift";
import { AccessControl } from "components/features/AccessControl";
import {
  AlertCircleIconSvg,
  CalendarOffIconSvg,
  CalendarStatsIconSvg,
  EditIconSvg,
  LeftIconSvg,
  PlusIconSvg,
  RightIconSvg,
  TrashIconSvg,
} from "components/icon";
import LayoutDashboard from "components/layout-dashboardNew";
import ModalScheduleUpdate from "components/modal/attendance/modalScheduleUpdate";
import ModalCore from "components/modal/modalCore";
import { ModalHapus2 } from "components/modal/modalCustom";
import { ModalUbah } from "components/modal/modalCustom";
import { TableCustomShiftList } from "components/table/tableCustom";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ATTENDANCE_SCHEDULES_GET,
  ATTENDANCE_SCHEDULE_ADD,
  ATTENDANCE_SCHEDULE_DELETE,
  ATTENDANCE_SCHEDULE_UPDATE,
  ATTENDANCE_SHIFTS_GET,
  ATTENDANCE_SHIFT_ADD,
  ATTENDANCE_SHIFT_DELETE,
  ATTENDANCE_SHIFT_STATUS_UPDATE,
  ATTENDANCE_SHIFT_UPDATE,
  COMPANY_CLIENTS_GET,
  RECRUITMENT_ROLES_GET,
} from "lib/features";

import {
  AgentScheduleData,
  AttendanceScheduleService,
  IUpdateSchedulePayload,
  ScheduleDetailData,
} from "apis/attendance";
import { AttendanceShiftService } from "apis/attendance/attendance-shift.service";
import {
  IUpdateShiftStatusPayload,
  ShiftDetailData,
} from "apis/attendance/attendance-shift.types";

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
  const isAllowedToDeleteSchedule = hasPermission(ATTENDANCE_SCHEDULE_DELETE);
  const isAllowedToGetCompanyList = hasPermission(COMPANY_CLIENTS_GET);
  const isAllowedToGetRoleList = hasPermission(RECRUITMENT_ROLES_GET);

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
  const [companyList, setCompanyList] = useState([]);
  const [roleList, setRoleList] = useState([]);

  const [currentDataSchedule, setCurrentDataSchedule] =
    useState<ShiftDetailData>({
      id: 0,
      title: "",
      start_at: "",
      end_at: "",
      start_break: "",
      end_break: "",
      status: 0,
    });

  const [isShowCreateDrawer, setShowCreateDrawer] = useState(false);
  const [isShowUpdateModal, setShowUpdateModal] = useState(false);
  const [isShowDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedMonthYear, setSelectedMonthYear] = useState(moment());
  const [numOfDaysFromCurWeek, setNumOfDaysFromCurWeek] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(moment().month()); // 0: January
  const [currentWeek, setCurrentWeek] = useState(moment().week());

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
        // let adjustedSchedules = schedules?.map((employee) => ({
        //   ...employee,
        //   schedule: employee?.schedule?.map((schedule) => ({
        //     ...schedule,
        //     dayNoInWeek: moment(schedule?.date).day(),
        //     startWeek: moment(schedule?.date)
        //       .startOf("week")
        //       .add(1, "day")
        //       .format("YYYY-MM-DD"),
        //   })),
        // }));

        setDataSchedules(schedules);
      },
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan daftar jadwal kerja.",
        });
      },
    }
  );

  const onMutationSucceed = (queryKey: string, message: string) => {
    queryClient.invalidateQueries(queryKey);
    notification.success({
      message,
    });
  };

  const { mutate: deleteSchedule, isLoading: loadingDeleteSchedule } =
    useMutation(
      (scheduleId: number) =>
        AttendanceScheduleService.deleteSchedule(
          isAllowedToDeleteSchedule,
          axiosClient,
          scheduleId
        ),
      {
        onSuccess: (response) => {
          onMutationSucceed(ATTENDANCE_SCHEDULES_GET, response.data.message);
          handleCloseDelete();
        },
        onError: (error) => {
          notification.error({ message: "Gagal menghapus jadwal." });
        },
      }
    );

  const { mutate: updateSchedule, isLoading: loadingUpdateSchedule } =
    useMutation(
      (payload: IUpdateSchedulePayload) =>
        AttendanceScheduleService.updateSchedule(
          isAllowedToUpdateSchedule,
          axiosClient,
          payload
        ),
      {
        onSuccess: (response) => {
          onMutationSucceed(ATTENDANCE_SCHEDULES_GET, response.data.message);
          handleCloseUpdate();
        },
        onError: (error) => {
          notification.error({ message: "Gagal mengubah jadwal." });
        },
      }
    );

  const handleShowUpdate = (data: ShiftDetailData) => {
    setCurrentDataSchedule(data);
    setShowUpdateModal(true);
  };

  const handleShowDelete = (data: ShiftDetailData) => {
    setCurrentDataSchedule(data);
    setShowDeleteModal(true);
  };

  const handleCloseUpdate = () => {
    setCurrentDataSchedule({
      id: 0,
      company_id: 0,
      title: "",
      start_at: "",
      end_at: "",
      start_break: "",
      end_break: "",
      status: 0,
      created_at: "",
      updated_at: "",
      deleted_at: "",
    });
    setShowUpdateModal(false);
  };

  const handleCloseDelete = () => {
    setCurrentDataSchedule({
      id: 0,
      company_id: 0,
      title: "",
      start_at: "",
      end_at: "",
      start_break: "",
      end_break: "",
      status: 0,
      created_at: "",
      updated_at: "",
      deleted_at: "",
    });
    setShowDeleteModal(false);
  };

  const handleClickNextWeek = () => {
    setNumOfDaysFromCurWeek((prev) => prev + 7);
  };

  const handleClickPrevWeek = () => {
    setNumOfDaysFromCurWeek((prev) => prev - 7);
  };

  const date = new Date();
  // const currentMonth = date.toISOString();
  const currentStartOfWeek = moment().startOf("week").add(1, "days");
  const endOfWeek = moment().endOf("week").add(1, "days").toDate();
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  const dateColumns = Array.from({ length: 7 }, (_, i) => {
    let currentDate = moment()
      .startOf("week")
      .add(i + 1 + numOfDaysFromCurWeek, "days");
    let isToday = currentDate.isSame(new Date(), "day");
    return {
      title: (
        <div className="flex flex-col justify-center items-center w-full">
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
      render: (schedules, record, index) => {
        // console.log({ schedules });
        // console.log(currentDate?.format("YYYY-MM-DD"));
        // console.log(schedules[i]?.date);
        let scheduleIdx = schedules.findIndex(
          (i) => i.date == currentDate?.format("YYYY-MM-DD")
        );

        return {
          children: scheduleIdx > -1 && (
            <div>
              <div
                onClick={() => setShowUpdateModal(true)}
                className="bg-backdrop flex flex-col items-center justify-center 
                px-5 py-4 rounded-md cursor-pointer"
              >
                <p className="mig-caption--bold text-mono30 text-center">
                  {schedules[scheduleIdx]?.shift?.title}
                </p>
                <p className="mig-caption text-mono50">
                  {schedules[scheduleIdx]?.shift?.start_at?.slice(0, 5)} -{" "}
                  {schedules[scheduleIdx]?.shift?.end_at?.slice(0, 5)}
                </p>
              </div>
            </div>
          ),
        };
      },
    };
  });

  // console.log({ dataSchedules });

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      fixedBreadcrumbValues={pageBreadcrumb}
      sidemenu="attendance/schedule"
    >
      <div className="grid grid-cols-1 px-4 md:px-5" id="mainWrapper">
        {/* Table Daftar Shift */}
        <div className="flex flex-col shadow-md rounded-md bg-white p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-2 items-end md:items-center gap-4 mb-6">
            {/* Search by keyword (kata kunci) */}
            <div className="w-full lg:w-4/12">
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
                // defaultValue={queryParams.company_id}
                disabled={!isAllowedToGetCompanyList}
                placeholder="Pilih Perusahaan"
                style={{ width: `100%` }}
                onChange={(value) => {
                  setQueryParams({ company_id: value });
                  // setSelectedExpYear(value);
                }}
              >
                {companyList?.map((item) => (
                  <Select.Option key={item.year} value={item.year}>
                    {item.year}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="w-full lg:w-2/12">
              <Select
                allowClear
                showSearch
                // defaultValue={queryParams.company_id}
                disabled={!isAllowedToGetRoleList}
                placeholder="Pilih Posisi"
                style={{ width: `100%` }}
                onChange={(value) => {
                  setQueryParams({ position: value });
                  // setSelectedExpYear(value);
                }}
              >
                {roleList?.map((item) => (
                  <Select.Option key={item.year} value={item.year}>
                    {item.year}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="w-full lg:w-2/12">
              <ButtonSys
                fullWidth
                type={"default"}
                onClick={() => setShowCreateDrawer(true)}
                disabled={!isAllowedToAddSchedule}
              >
                <div className="flex flex-row items-center space-x-2">
                  <CalendarOffIconSvg size={16} color="#35763B" />
                  <p className="whitespace-nowrap">Kosongkan Jadwal</p>
                </div>
              </ButtonSys>
            </div>
            <div className="w-full lg:w-2/12">
              <ButtonSys
                fullWidth
                type={"primary"}
                onClick={() => setShowCreateDrawer(true)}
                disabled={!isAllowedToAddSchedule}
              >
                <div className="flex flex-row items-center space-x-2">
                  <CalendarStatsIconSvg size={16} color="#FFFFFF" />
                  <p className="whitespace-nowrap">Jadwalkan Karywan</p>
                </div>
              </ButtonSys>
            </div>
          </div>

          {/* Month header */}
          <div className="flex justify-between items-center p-4 border-x border-t">
            <button
              className="bg-mono100 p-2 w-9 h-9 rounded-full 
                flex items-center justify-center"
            >
              <LeftIconSvg color={"#808080"} size={16} />
            </button>
            <DatePicker
              // picker="month"
              bordered={false}
              locale={locale}
              format={"MMMM YYYY"}
              value={selectedMonthYear}
              style={{
                color: "#4D4D4D",
                fontSize: "18px",
                fontWeight: 700,
              }}
              onChange={(date) => {
                if (date) {
                  // setQueryParams({
                  //   month: date.format("M"),
                  //   year: date.format("YYYY"),
                  //   page: 1,
                  // });
                  setSelectedMonthYear(date);
                } else {
                  // setQueryParams({
                  //   month: moment().format("M"),
                  //   year: moment().format("YYYY"),
                  //   page: 1,
                  // });
                  setSelectedMonthYear(moment());
                }
              }}
            />
            <button
              className="bg-mono100 p-2 w-9 h-9 rounded-full 
                flex items-center justify-center"
            >
              <RightIconSvg color={"#808080"} size={16} />
            </button>
          </div>

          <Table
            dataSource={dataSchedules}
            rowKey={(record) => record.id}
            className="border border-collapse"
            scroll={{ x: 200 }}
            pagination={{
              current: queryParams.page,
              pageSize: queryParams.rows,
              total: dataRawSchedules?.total,
              showSizeChanger: true,
            }}
            onChange={(pagination, filters, sorter, extra) => {
              setQueryParams({
                page: pagination.current,
                rows: pagination.pageSize,
              });
            }}
            columns={[
              {
                title: "Karyawan",
                dataIndex: "name",
                key: "name",
                fixed: "left",
                render: (text, record, index) => {
                  return {
                    children: (
                      <div className="px-3 py-2 bg-mono120 flex flex-col gap-1 rounded-md">
                        <p className="mig-caption--bold text-mono30">
                          {record?.name}
                        </p>
                        <p className="mig-caption text-mono50">
                          {record?.position}
                        </p>
                        <p className="mig-caption text-mono50">
                          {record?.company_name}
                        </p>
                      </div>
                    ),
                  };
                },
              },
              {
                title: (
                  <>
                    <button
                      onClick={handleClickPrevWeek}
                      className="bg-mono100 p-2 w-9 h-9 rounded-full 
                      flex items-center justify-center"
                    >
                      <LeftIconSvg color={"#808080"} size={16} />
                    </button>
                  </>
                ),
                width: 70,
              },

              ...dateColumns,
              {
                title: (
                  <>
                    <button
                      onClick={handleClickNextWeek}
                      className="bg-mono100 p-2 w-9 h-9 rounded-full 
                      flex items-center justify-center"
                    >
                      <RightIconSvg color={"#808080"} size={16} />
                    </button>
                  </>
                ),
                width: 70,
              },
            ]}
          ></Table>
        </div>
      </div>

      <AccessControl hasPermission={ATTENDANCE_SHIFT_ADD}>
        <DrawerSchedule
          visible={isShowCreateDrawer}
          onvisible={setShowCreateDrawer}
        />
      </AccessControl>

      {/* Modal Delete Shift */}
      <AccessControl hasPermission={ATTENDANCE_SHIFT_DELETE}>
        <ModalCore
          title={
            <div className="flex gap-4 items-center">
              <AlertCircleIconSvg color={"#BF4A40"} size={24} />
              <p>
                {currentDataSchedule?.status == 1
                  ? "Peringatan"
                  : "Konfirmasi Hapus"}
              </p>
            </div>
          }
          visible={isShowDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          footer={
            <Spin spinning={loadingDeleteSchedule}>
              <div className="flex gap-4 items-center justify-end">
                <ButtonSys
                  type={"primary"}
                  color={"mono100"}
                  onClick={() => {
                    setShowDeleteModal(false);
                  }}
                >
                  Tutup
                </ButtonSys>
                {currentDataSchedule?.status == 0 && (
                  <div className="col-span-2 hover:opacity-75">
                    <ButtonSys
                      type={"primary"}
                      color={"danger"}
                      onClick={() => deleteShift(currentDataSchedule?.id)}
                      disabled={!isAllowedToDeleteSchedule}
                    >
                      <div className="flex flex-row gap-2 items-center">
                        <TrashIconSvg size={16} color={"#FFFFFF"} />
                        <p>Hapus Shift</p>
                      </div>
                    </ButtonSys>
                  </div>
                )}
              </div>
            </Spin>
          }
          loading={loadingDeleteSchedule}
        >
          {currentDataSchedule?.status == 1 ? (
            <p>
              Shift <strong>{currentDataSchedule?.title}</strong> sedang aktif.
              Anda tidak bisa menghapus shift kerja yang sedang aktif.
            </p>
          ) : (
            <p>
              Apakah Anda yakin ingin menghapus{" "}
              <strong>{currentDataSchedule?.title}</strong>?
            </p>
          )}
        </ModalCore>
      </AccessControl>

      {/* Modal Update Schedule */}
      <AccessControl hasPermission={ATTENDANCE_SCHEDULE_UPDATE}>
        <ModalScheduleUpdate
          initProps={token}
          visible={isShowUpdateModal}
          onvisible={setShowUpdateModal}
        />
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
