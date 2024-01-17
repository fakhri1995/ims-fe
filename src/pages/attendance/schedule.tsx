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
import ModalCore from "components/modal/modalCore";
import { ModalHapus2 } from "components/modal/modalCustom";
import { ModalUbah } from "components/modal/modalCustom";
import { TableCustomShiftList } from "components/table/tableCustom";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ATTENDANCE_SHIFTS_GET,
  ATTENDANCE_SHIFT_ADD,
  ATTENDANCE_SHIFT_DELETE,
  ATTENDANCE_SHIFT_STATUS_UPDATE,
  ATTENDANCE_SHIFT_UPDATE,
} from "lib/features";

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

  const isAllowedToGetSchedules = hasPermission(ATTENDANCE_SHIFTS_GET);
  const isAllowedToAddSchedule = hasPermission(ATTENDANCE_SHIFT_ADD);
  const isAllowedToUpdateSchedule = hasPermission(
    ATTENDANCE_SHIFT_STATUS_UPDATE
  );
  const isAllowedToDeleteSchedule = hasPermission(ATTENDANCE_SHIFT_DELETE);
  const isAllowedToGetCompanyList = hasPermission(ATTENDANCE_SHIFTS_GET);
  const isAllowedToGetRoleList = hasPermission(ATTENDANCE_SHIFTS_GET);

  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    keyword: withDefault(StringParam, null),
    company_id: withDefault(NumberParam, 0),
    role_id: withDefault(NumberParam, 0),
  });

  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Jadwal Kerja",
    },
  ];

  // 2. Use State
  const [dataShifts, setDataShifts] = useState<ShiftDetailData[]>([]);
  const [companyList, setCompanyList] = useState([]);
  const [roleList, setRoleList] = useState([]);

  const [currentDataShift, setCurrentDataShift] = useState<ShiftDetailData>({
    id: 0,
    title: "",
    start_at: "",
    end_at: "",
    start_break: "",
    end_break: "",
    status: 0,
  });

  const [isShowCreateDrawer, setShowCreateDrawer] = useState(false);
  const [isShowUpdateDrawer, setShowUpdateDrawer] = useState(false);
  const [isShowDeleteModal, setShowDeleteModal] = useState(false);
  const [isShowUpdateStatusModal, setShowUpdateStatusModal] = useState(false);

  const [selectedMonthYear, setSelectedMonthYear] = useState(moment());
  const [numOfDaysFromCurWeek, setNumOfDaysFromCurWeek] = useState(0);

  // const [dataSchedules, setDataSchedules] = useState([])

  const dataSchedules = [
    {
      id: 24,
      name: "Agent 8",
      nip: "108",
      email: "agent8@mitramas.com",
      role: 1,
      company_id: 26,
      position: "Contract Employee",
      phone_number: "-",
      created_time: "2022-02-09 09:37:19",
      is_enabled: 1,
      company_name: "WILAYAH 3 JAWA - BASE BANDUNG",
      profile_image: {
        id: 0,
        link: "staging/Users/default_user.png",
        description: "profile_image",
      },
      roles: [
        {
          id: 14,
          name: "Default Agent Users",
          description: "For Created Agent Users From Default",
          deleted_at: null,
        },
        {
          id: 19,
          name: "Project Team Member",
          description: "+ Mendapatkan fitur modul proyek\n+ Full akses tugas",
          deleted_at: null,
        },
      ],
      schedule: [
        {
          id: 1,
          user_id: 24,
          shift_id: 2,
          date: "2024-01-01",
          created_at: "2024-01-15T18:03:49.000000Z",
          updated_at: "2024-01-15T18:03:49.000000Z",
        },
      ],
    },
  ];

  // 3. Use Effect & Use Query
  const {
    data: dataRawShifts,
    isLoading: loadingShifts,
    refetch: refetchShifts,
  } = useQuery(
    [ATTENDANCE_SHIFTS_GET, queryParams],
    () =>
      AttendanceShiftService.getShifts(
        isAllowedToGetSchedules,
        axiosClient,
        queryParams
      ),
    {
      enabled: isAllowedToGetSchedules,
      select: (response) => response.data.data,
      onSuccess: (data) => setDataShifts(data.data),
      onError: (error) => {
        notification.error({ message: "Gagal mendapatkan daftar shift." });
      },
    }
  );

  const onMutationSucceed = (queryKey: string, message: string) => {
    queryClient.invalidateQueries(queryKey);
    notification.success({
      message,
    });
  };

  const { mutate: deleteShift, isLoading: loadingDeleteShift } = useMutation(
    (shiftId: number) =>
      AttendanceShiftService.deleteShift(
        isAllowedToDeleteSchedule,
        axiosClient,
        shiftId
      ),
    {
      onSuccess: (response) => {
        onMutationSucceed(ATTENDANCE_SHIFTS_GET, response.data.message);
        handleCloseDelete();
      },
      onError: (error) => {
        notification.error({ message: "Gagal menghapus shift." });
      },
    }
  );

  const { mutate: updateShiftStatus, isLoading: loadingUpdateShiftStatus } =
    useMutation(
      (payload: IUpdateShiftStatusPayload) =>
        AttendanceShiftService.updateShiftStatus(
          isAllowedToUpdateSchedule,
          axiosClient,
          payload
        ),
      {
        onSuccess: (response) => {
          onMutationSucceed(ATTENDANCE_SHIFTS_GET, response.data.message);
          handleCloseUpdateStatus();
        },
        onError: (error) => {
          notification.error({ message: "Gagal mengubah status shift." });
        },
      }
    );

  const handleShowUpdate = (data: ShiftDetailData) => {
    setCurrentDataShift(data);
    setShowUpdateDrawer(true);
  };

  const handleShowDelete = (data: ShiftDetailData) => {
    setCurrentDataShift(data);
    setShowDeleteModal(true);
  };

  const handleCloseDelete = () => {
    setCurrentDataShift({
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

  const handleCloseUpdateStatus = () => {
    setCurrentDataShift({
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
    setShowUpdateStatusModal(false);
  };

  const handleClickNextWeek = () => {
    setNumOfDaysFromCurWeek((prev) => prev + 7);
  };

  const handleClickPrevWeek = () => {
    setNumOfDaysFromCurWeek((prev) => prev - 7);
  };

  const date = new Date();
  const currentMonth = date.toISOString();
  const startOfWeek = moment().startOf("week").add(1, "days").format("dddd");
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
      // dataIndex: "position",
      key: `date-${i}`,
      render: (text, record, index) => {
        return {
          children: (
            <div>
              <div
                className="bg-backdrop flex flex-col items-center justify-center 
                px-5 py-4 rounded-md"
              >
                <p className="mig-caption--bold text-mono30 text-center">
                  Shift Normal
                </p>
                <p className="mig-caption text-mono50">08:00 - 17:00</p>
              </div>
            </div>
          ),
        };
      },
    };
  });

  console.log({ dateColumns });

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
                  setQueryParams({ role_id: value });
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
              },
            ]}
          ></Table>
        </div>
      </div>

      <AccessControl hasPermission={ATTENDANCE_SHIFT_ADD}>
        <DrawerShift
          visible={isShowCreateDrawer}
          onvisible={setShowCreateDrawer}
        />
      </AccessControl>

      <AccessControl hasPermission={ATTENDANCE_SHIFT_UPDATE}>
        <DrawerShift
          data={currentDataShift}
          visible={isShowUpdateDrawer}
          onvisible={setShowUpdateDrawer}
        />
      </AccessControl>

      {/* Modal Delete Shift */}
      <AccessControl hasPermission={ATTENDANCE_SHIFT_DELETE}>
        <ModalCore
          title={
            <div className="flex gap-4 items-center">
              <AlertCircleIconSvg color={"#BF4A40"} size={24} />
              <p>
                {currentDataShift?.status == 1
                  ? "Peringatan"
                  : "Konfirmasi Hapus"}
              </p>
            </div>
          }
          visible={isShowDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          footer={
            <Spin spinning={loadingDeleteShift}>
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
                {currentDataShift?.status == 0 && (
                  <div className="col-span-2 hover:opacity-75">
                    <ButtonSys
                      type={"primary"}
                      color={"danger"}
                      onClick={() => deleteShift(currentDataShift?.id)}
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
          loading={loadingDeleteShift}
        >
          {currentDataShift?.status == 1 ? (
            <p>
              Shift <strong>{currentDataShift?.title}</strong> sedang aktif.
              Anda tidak bisa menghapus shift kerja yang sedang aktif.
            </p>
          ) : (
            <p>
              Apakah Anda yakin ingin menghapus{" "}
              <strong>{currentDataShift?.title}</strong>?
            </p>
          )}
        </ModalCore>
      </AccessControl>

      {/* Modal Update Status Shift */}
      <AccessControl hasPermission={ATTENDANCE_SHIFT_STATUS_UPDATE}>
        <ModalUbah
          title={`Konfirmasi Perubahan`}
          visible={isShowUpdateStatusModal}
          onvisible={setShowUpdateStatusModal}
          onOk={() =>
            updateShiftStatus({
              id: currentDataShift?.id,
              status: Boolean(currentDataShift?.status),
            })
          }
          okButtonText="Ya, saya yakin"
          onCancel={() => handleCloseUpdateStatus()}
          loading={loadingUpdateShiftStatus}
          disabled={!isAllowedToUpdateSchedule}
        >
          <div className="space-y-4">
            <p className="">
              Apakah Anda yakin ingin mengubah status pada shift kerja{" "}
              <strong>{currentDataShift.title}</strong> menjadi{" "}
              <strong>
                {currentDataShift.status == 1 ? "Aktif ?" : "Non-Aktif ?"}
              </strong>
            </p>
          </div>
        </ModalUbah>
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
