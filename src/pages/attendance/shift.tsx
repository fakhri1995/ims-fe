import { Button, Input, Select, Spin, Tooltip, notification } from "antd";
import { AxiosResponse } from "axios";
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
  CirclePlusIconSvg,
  EditIconSvg,
  EditSquareIconSvg,
  PlusIconSvg,
  TrashIconSvg,
} from "components/icon";
import LayoutDashboard from "components/layout-dashboard";
import {
  ModalAccept,
  ModalDelete,
  ModalWarning,
} from "components/modal/modalConfirmation";
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
  ATTENDANCE_SHIFT_UPDATE,
} from "lib/features";

import { AttendanceShiftService } from "apis/attendance/attendance-shift.service";
import {
  IGetShiftsPaginateSucceedResponse,
  IUpdateShiftStatusPayload,
  ShiftDetailData,
} from "apis/attendance/attendance-shift.types";

import httpcookie from "cookie";

import { PageBreadcrumbValue, ProtectedPageProps } from "types/common";

const ShiftAttendancePage: NextPage<ProtectedPageProps> = ({
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

  const isAllowedToGetShifts = hasPermission(ATTENDANCE_SHIFTS_GET);
  const isAllowedToAddShift = hasPermission(ATTENDANCE_SHIFT_ADD);
  const isAllowedToUpdateShift = hasPermission(ATTENDANCE_SHIFT_UPDATE);

  const isAllowedToDeleteShift = hasPermission(ATTENDANCE_SHIFT_DELETE);

  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    keyword: withDefault(StringParam, null),
  });

  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Work Shift",
    },
  ];

  // 2. Use State
  const [dataShifts, setDataShifts] = useState<ShiftDetailData[]>([]);
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

  // 3. Use Effect & Use Query
  const {
    data: dataRawShifts,
    isLoading: loadingShifts,
    refetch: refetchShifts,
  } = useQuery(
    [ATTENDANCE_SHIFTS_GET, queryParams],
    () =>
      AttendanceShiftService.getShifts(
        isAllowedToGetShifts,
        axiosClient,
        queryParams
      ),
    {
      enabled: isAllowedToGetShifts,
      select: (response: AxiosResponse<IGetShiftsPaginateSucceedResponse>) =>
        response.data.data,
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
        isAllowedToDeleteShift,
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
          isAllowedToUpdateShift,
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

  const columnShifts = [
    {
      title: "No.",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{Number(dataRawShifts?.from + index)}</>,
        };
      },
    },

    {
      title: "Shift Name",
      dataIndex: "title",
      render: (text, record, index) => {
        return {
          children: <>{text || "-"}</>,
        };
      },
    },
    {
      title: "Working Hours",
      dataIndex: "work_time",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex items-center gap-2">
              <p className="whitespace-nowrap">
                {record?.start_at?.slice(0, 5)} - {record?.end_at?.slice(0, 5)}
              </p>
              {record?.end_at < record?.start_at && (
                <p
                  className="whitespace-nowrap mig-caption--medium
                 text-secondary100 bg-secondary100 bg-opacity-10 
                 rounded-full px-[10px] py-0.5"
                >
                  +1 day
                </p>
              )}
            </div>
          ),
        };
      },
    },
    {
      title: "Break Time",
      dataIndex: "break_time",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex items-center gap-2">
              <p className="whitespace-nowrap">
                {record?.start_break?.slice(0, 5)} -{" "}
                {record?.end_break?.slice(0, 5)}
              </p>
              {record?.end_break < record?.start_break && (
                <p
                  className="whitespace-nowrap mig-caption--medium
               text-secondary100 bg-secondary100 bg-opacity-10 
               rounded-full px-[10px] py-0.5"
                >
                  +1 day
                </p>
              )}
            </div>
          ),
        };
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      className: "w-2/12",
      render: (status, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              <Tooltip
                placement="right"
                overlayClassName="z-0 w-36"
                // visible={false}
                color={"#FFF"}
                title={
                  status == 1 ? (
                    <div className="p-2">
                      <div className="flex gap-2 items-center">
                        <div className="bg-primary100 w-2 h-2 rounded-full" />
                        <p className="mig-caption--bold text-mono30">Active</p>
                      </div>
                      <p className="text-mono50">
                        Scheduled in the employee's work schedule and ongoing
                      </p>
                    </div>
                  ) : (
                    <div className="p-2">
                      <div className="flex gap-2 items-center">
                        <div className="bg-mono50 w-2 h-2 rounded-full" />
                        <p className="mig-caption--bold text-mono30">
                          Inactive
                        </p>
                      </div>
                      <p className="text-mono50">
                        Not scheduled in the employee's work schedule
                      </p>
                    </div>
                  )
                }
              >
                <Select
                  value={status}
                  disabled={!isAllowedToUpdateShift}
                  optionFilterProp="children"
                  bordered={false}
                  className={`w-fit rounded-md flex text-center
                     ${
                       status == 1
                         ? "bg-primary100 bg-opacity-10 text-primary100"
                         : "bg-mono30 bg-opacity-10 text-mono30 "
                     }
                      `}
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
                      className={`rounded-md px-4 py-2  `}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 flex rounded-full ${
                            item.value == 1 ? "bg-primary100" : "bg-mono30"
                          } `}
                        ></div>
                        <p
                          className={`${
                            item.value == 1 ? "text-primary100" : "text-mono30"
                          } `}
                        >
                          {item?.title}
                        </p>
                      </div>
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
      title: "Actions",
      dataIndex: "action",
      align: "center",
      render: (status, record, index) => {
        return {
          children: (
            <div className="flex items-center gap-2 justify-center">
              <button
                className="bg-transparent"
                onClick={() => handleShowDelete(record)}
                disabled={!isAllowedToDeleteShift}
              >
                <TrashIconSvg color={"#BF4A40"} size={24} />
              </button>
              <button
                className="bg-transparent"
                onClick={() => handleShowUpdate(record)}
                disabled={!isAllowedToUpdateShift}
              >
                <EditSquareIconSvg color={"#808080"} size={24} />
              </button>
            </div>
          ),
        };
      },
    },
  ];

  const dataStatusList = [
    {
      title: "Active",
      value: 1,
    },
    {
      title: "Inactive",
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
      <div className="grid grid-cols-1" id="mainWrapper">
        {/* Table Daftar Shift */}
        <div className="flex flex-col mig-platform--p-0">
          <div className="flex items-center justify-between gap-4 border-b py-3 px-4">
            <h4 className="mig-body--bold">List of Work Shift</h4>

            <div className="w-fit">
              <ButtonSys
                fullWidth
                type={"primary"}
                onClick={() => setShowCreateDrawer(true)}
                disabled={!isAllowedToAddShift}
              >
                <div className="flex flex-row items-center space-x-2">
                  <CirclePlusIconSvg size={20} color="#FFFFFF" />
                  <p className="whitespace-nowrap">Add Work Shift</p>
                </div>
              </ButtonSys>
            </div>
          </div>

          {/* Search by keyword (kata kunci) */}
          <div className="w-full py-3 px-4">
            <Input
              style={{ width: `100%` }}
              placeholder="Search shift name..."
              allowClear
              onChange={(e) => {
                setTimeout(
                  () =>
                    setQueryParams({
                      keyword: e.target.value,
                      page: 1,
                    }),
                  1000
                );
              }}
              disabled={!isAllowedToGetShifts}
            />
          </div>

          <div className=" px-4">
            <TableCustomShiftList
              dataSource={dataShifts}
              columns={columnShifts}
              loading={loadingShifts}
              total={dataRawShifts?.total}
              queryParams={queryParams}
              setQueryParams={setQueryParams}
            />
          </div>
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
        {currentDataShift?.status == 1 ? (
          <ModalWarning
            title={"Warning"}
            visible={isShowDeleteModal}
            okText="I Understand"
            onCancel={() => setShowDeleteModal(false)}
            loading={loadingDeleteShift}
            disabled={!isAllowedToDeleteShift}
            onOk={() => setShowDeleteModal(false)}
          >
            <p>
              <strong>{currentDataShift?.title}</strong> is currently active.
              You cannot delete an active work shift.
            </p>
          </ModalWarning>
        ) : (
          <ModalDelete
            visible={isShowDeleteModal}
            onCancel={() => setShowDeleteModal(false)}
            itemName="Shift"
            loading={loadingDeleteShift}
            disabled={!isAllowedToDeleteShift}
            onOk={() => deleteShift(currentDataShift?.id)}
          >
            <p>
              Are you sure you want to delete{" "}
              <strong>{currentDataShift?.title}</strong>?
            </p>
          </ModalDelete>
        )}
      </AccessControl>

      {/* Modal Update Status Shift */}
      <AccessControl hasPermission={ATTENDANCE_SHIFT_UPDATE}>
        <ModalAccept
          title={`Confirm Changes`}
          visible={isShowUpdateStatusModal}
          onOk={() =>
            updateShiftStatus({
              id: currentDataShift?.id,
              status: Boolean(currentDataShift?.status),
            })
          }
          onCancel={() => handleCloseUpdateStatus()}
          loading={loadingUpdateShiftStatus}
          disabled={!isAllowedToUpdateShift}
        >
          <div className="space-y-4">
            <p className="">
              Are you sure you want to change status of shift{" "}
              <strong>{currentDataShift.title}</strong> to{" "}
              <strong>
                {currentDataShift.status == 1 ? "Active ?" : "Inactive ?"}
              </strong>
            </p>
          </div>
        </ModalAccept>
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
