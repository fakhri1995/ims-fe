import { DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Select, Spin, Tooltip, notification } from "antd";
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
import DrawerShiftCreate from "components/drawer/attendance/drawerShiftCreate";
import DrawerShiftUpdate from "components/drawer/attendance/drawerShiftUpdate";
import { AccessControl } from "components/features/AccessControl";
import { EditIconSvg, PlusIconSvg, TrashIconSvg } from "components/icon";
import LayoutDashboard from "components/layout-dashboardNew";
import ModalCore from "components/modal/modalCore";
import { ModalHapus2 } from "components/modal/modalCustom";
import { ModalUbah } from "components/modal/modalCustom";
import {
  AttendanceStaffAktivitasSection,
  AttendanceStaffDetailCard,
  AttendanceStaffKehadiranSection,
  AttendanceStaffStatisticCard,
  CheckInOutCard,
} from "components/screen/attendance";
import { AttendanceStaffCheckInDrawer } from "components/screen/attendance/staff/AttendanceStaffCheckInDrawer";
import { TableCustomShiftList } from "components/table/tableCustom";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ATTENDANCES_USER_GET,
  ATTENDANCE_SHIFTS_GET,
  ATTENDANCE_SHIFT_ADD,
  ATTENDANCE_SHIFT_DELETE,
  ATTENDANCE_SHIFT_STATUS_UPDATE,
  ATTENDANCE_SHIFT_UPDATE,
  ATTENDANCE_TOGGLE_SET,
} from "lib/features";
import { momentFormatDate, permissionWarningNotification } from "lib/helper";

import { AttendanceShiftService } from "apis/attendance/attendance-shift.service";
import {
  IAddShiftPayload,
  IUpdateShiftStatusPayload,
  ShiftDetailData,
} from "apis/attendance/attendance-shift.types";

import httpcookie from "cookie";

import { PageBreadcrumbValue, ProtectedPageProps } from "types/common";

const ShiftAttendancePage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  // if (isAccessControlPending) {
  //   return null;
  // }

  const isAllowedToGetShifts = hasPermission(ATTENDANCE_SHIFTS_GET);
  const isAllowedToAddShift = hasPermission(ATTENDANCE_SHIFT_ADD);
  const isAllowedToUpdateShift = hasPermission(ATTENDANCE_SHIFT_UPDATE);
  const isAllowedToUpdateShiftStatus = hasPermission(
    ATTENDANCE_SHIFT_STATUS_UPDATE
  );
  const isAllowedToDeleteShift = hasPermission(ATTENDANCE_SHIFT_DELETE);

  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Shift Kerja",
    },
  ];

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    keyword: withDefault(StringParam, null),
  });

  const [isShowCreateDrawer, setShowCreateDrawer] = useState(false);
  const [isShowUpdateDrawer, setShowUpdateDrawer] = useState(false);
  const [isShowDeleteModal, setShowDeleteModal] = useState(false);
  const [isShowUpdateStatusModal, setShowUpdateStatusModal] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const [dataShifts, setDataShifts] = useState<ShiftDetailData[]>([]);
  const [currentDataShift, setCurrentDataShift] = useState<ShiftDetailData>({
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

  const [searchingFilterShitfs, setSearchingFilterShitfs] = useState("");

  useEffect(() => {
    if (!isAllowedToGetShifts) {
      permissionWarningNotification("Mendapatkan", "Daftar Shift");
    }
  }, [isAllowedToGetShifts]);

  const {
    data: dataRawShifts,
    isLoading: loadingShifts,
    refetch: refetchShifts,
  } = useQuery(
    [ATTENDANCE_SHIFTS_GET, queryParams],
    () => AttendanceShiftService.getShifts(axiosClient, queryParams),
    {
      enabled: isAllowedToGetShifts,
      select: (response) => response.data.data,
      onSuccess: (data) => setDataShifts(data.data),
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
        isAllowedToDeleteShift,
        axiosClient,
        shiftId
      ),
    {
      onSuccess: (response) => {
        onMutationSucceed(ATTENDANCE_SHIFTS_GET, response.data.message);
        handleCloseDelete();
      },
      // onError: (error) => {
      //   notification.error({"Gagal menambah shift."});
      // }
    }
  );

  const { mutate: updateShiftStatus, isLoading: loadingUpdateShiftStatus } =
    useMutation(
      (payload: IUpdateShiftStatusPayload) =>
        AttendanceShiftService.updateShiftStatus(
          isAllowedToUpdateShiftStatus,
          axiosClient,
          payload
        ),
      {
        onSuccess: (response) => {
          onMutationSucceed(ATTENDANCE_SHIFTS_GET, response.data.message);
          handleCloseUpdateStatus();
        },
        // onError: (error) => {
        //   notification.error({"Gagal menambah shift."});
        // }
      }
    );

  const handleShowUpdate = (data) => {
    setCurrentDataShift(data);
    setShowUpdateDrawer(true);
  };

  const handleShowDelete = (data) => {
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

  const columnShifts = [
    {
      title: "No.",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{dataRawShifts?.from + index}</>,
        };
      },
    },

    {
      title: "Nama Shift",
      dataIndex: "title",
      render: (text, record, index) => {
        return {
          children: <>{text || "-"}</>,
        };
      },
    },
    {
      title: "Jam Kerja",
      dataIndex: "work_time",
      render: (text, record, index) => {
        return {
          children: (
            <>
              {record?.start_at?.slice(0, 5) || "-"} -{" "}
              {record?.end_at?.slice(0, 5) || "-"}
            </>
          ),
        };
      },
    },
    {
      title: "Jam Istirahat",
      dataIndex: "break_time",
      render: (text, record, index) => {
        return {
          children: (
            <>
              {record?.start_break?.slice(0, 5) || "-"} -{" "}
              {record?.end_break?.slice(0, 5) || "-"}
            </>
          ),
        };
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (status, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              <Tooltip
                placement="bottom"
                visible={false}
                color={"#FFF"}
                title={
                  status == 1 ? (
                    <div className="p-2">
                      <div className="flex gap-2 items-center">
                        <div className="bg-primary100 w-2 h-2 rounded-full" />
                        <p className="mig-caption--bold text-mono30">Aktif</p>
                      </div>
                      <p className="text-mono50">
                        Terjadwal di jadwal kerja karyawan dan sedang
                        berlangsung
                      </p>
                    </div>
                  ) : (
                    <div className="p-2">
                      <div className="flex gap-2 items-center">
                        <div className="bg-mono50 w-2 h-2 rounded-full" />
                        <p className="mig-caption--bold text-mono30">
                          Non-Aktif
                        </p>
                      </div>
                      <p className="text-mono50">
                        Tidak terjadwal di jadwal kerja karyawan
                      </p>
                    </div>
                  )
                }
              >
                <Select
                  value={status}
                  disabled={!isAllowedToUpdateShiftStatus}
                  optionFilterProp="children"
                  bordered={false}
                  className={`w-2/3 rounded-md p-1 flex text-center ${
                    status == 1
                      ? "bg-primary100 text-white"
                      : "bg-mono90 text-mono30 "
                  }`}
                  onChange={(value) => {
                    setCurrentDataShift({
                      ...record,
                      id: record?.id,
                      title: record?.title,
                      status: value,
                    });
                    setShowUpdateStatusModal(true);
                  }}
                >
                  {dataStatusList?.map((item, id) => (
                    <Select.Option
                      key={id}
                      value={item?.value}
                      className={`rounded-md px-4 py-2 text-center`}
                    >
                      {item?.title}
                    </Select.Option>
                  ))}
                </Select>
              </Tooltip>
            </div>
          ),
        };
      },
    },
    {
      title: "Aksi",
      dataIndex: "action",
      align: "center",
      render: (status, record, index) => {
        return {
          children: (
            <div className="flex items-center gap-6 justify-center">
              <button
                className="bg-transparent"
                onClick={() => handleShowUpdate(record)}
              >
                <EditIconSvg color={"#808080"} size={24} />
              </button>
              <button
                className="bg-transparent"
                onClick={() => handleShowDelete(record)}
              >
                <TrashIconSvg color={"#BF4A40"} size={24} />
              </button>
            </div>
          ),
        };
      },
    },
  ];

  const dataStatusList = [
    {
      title: "Aktif",
      value: 1,
    },
    {
      title: "Non-Aktif",
      value: 0,
    },
  ];

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      fixedBreadcrumbValues={pageBreadcrumb}
      sidemenu="attendance/shift"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 md:px-5" id="mainWrapper">
        {/* Table Daftar Shift */}
        <div className="md:col-span-3 flex flex-col shadow-md rounded-md bg-white p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h4 className="mig-heading--4 ">Daftar Shift</h4>

            <div className="flex flex-col md:flex-row gap-2 items-end md:items-center lg:w-6/12">
              {/* Search by keyword (kata kunci) */}
              <div className="w-full lg:w-2/3">
                <Input
                  // defaultValue={searchingFilterEmployees}
                  style={{ width: `100%` }}
                  placeholder="Cari Shift..."
                  allowClear
                  onChange={(e) => {
                    // setSearchingFilterEmployees(e.target.value);
                    setQueryParams({
                      keyword: e.target.value,
                    });
                  }}
                  // disabled={!isAllowedToGetEmployees}
                />
              </div>
              <div className="w-full xl:w-1/3">
                <ButtonSys
                  fullWidth
                  type={"primary"}
                  onClick={() => setShowCreateDrawer(true)}
                  // disabled={!isAllowedToAddEmployee}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <PlusIconSvg size={16} color="#FFFFFF" />
                    <p className="whitespace-nowrap">Tambah Shift</p>
                  </div>
                </ButtonSys>
              </div>
            </div>
          </div>

          <div>
            <TableCustomShiftList
              dataSource={dataShifts}
              columns={columnShifts}
              loading={loadingShifts}
              total={dataRawShifts?.total}
              queryParams={queryParams}
              setQueryParams={setQueryParams}
              // onOpenModal={onOpenModal}
              // sortTable={sortTable}
            />
          </div>
        </div>
      </div>

      <AccessControl hasPermission={ATTENDANCE_SHIFT_ADD}>
        <DrawerShiftCreate
          title={"Tambah Shift"}
          visible={isShowCreateDrawer}
          buttonOkText={"Simpan Shift"}
          initProps={token}
          onvisible={setShowCreateDrawer}
          setRefresh={setRefresh}
          isAllowedToAdd={isAllowedToAddShift}
        />
      </AccessControl>

      <AccessControl hasPermission={ATTENDANCE_SHIFT_UPDATE}>
        <DrawerShiftUpdate
          data={currentDataShift}
          visible={isShowUpdateDrawer}
          initProps={token}
          onvisible={setShowUpdateDrawer}
          setRefresh={setRefresh}
        />
      </AccessControl>

      <AccessControl hasPermission={ATTENDANCE_SHIFT_DELETE}>
        <ModalCore
          title={
            currentDataShift?.status == 1 ? "Peringatan" : "Konfirmasi Hapus"
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
                      // disabled={disabled}
                    >
                      <div className="flex flex-row space-x-2">
                        <DeleteOutlined rev={""} />
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
              Apakah Anda yakin ingin menghapus shift{" "}
              <strong>{currentDataShift?.title}</strong>?
            </p>
          )}
        </ModalCore>
      </AccessControl>

      {/* Modal Update Stage */}
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
          // disabled={disableUpdate}
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

export default ShiftAttendancePage;
