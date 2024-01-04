import { Input } from "antd";
import { GetServerSideProps, NextPage } from "next";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useCallback, useEffect, useState } from "react";

import ButtonSys from "components/button";
import DrawerShiftCreate from "components/drawer/attendance/drawerShiftCreate";
import { AccessControl } from "components/features/AccessControl";
import { EditIconSvg, PlusIconSvg, TrashIconSvg } from "components/icon";
import LayoutDashboard from "components/layout-dashboardNew";
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

import { ATTENDANCES_USER_GET, ATTENDANCE_TOGGLE_SET } from "lib/features";
import { momentFormatDate, permissionWarningNotification } from "lib/helper";

import httpcookie from "cookie";

import { PageBreadcrumbValue, ProtectedPageProps } from "types/common";

const ShiftAttendancePage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetShifts = hasPermission(ATTENDANCES_USER_GET);
  const isAllowedToAddShift = hasPermission(ATTENDANCES_USER_GET);

  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Shift Kerja",
    },
  ];

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    status_ids: withDefault(StringParam, undefined),
  });

  const [isShowCreateDrawer, setShowCreateDrawer] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [dataRawShifts, setDataRawShifts] = useState({ from: 1 });
  const [dataShifts, setDataShifts] = useState([
    {
      name: "SHift Malam",
      work_time: "19.00 - 23.00",
      rest_time: "20.00",
      status: "Aktif",
    },
  ]);
  const [loadingShifts, setLoadingShifts] = useState(false);
  const [sortTable, setSortTable] = useState({
    sort_by: undefined,
    sort_type: undefined,
  });

  useEffect(() => {
    if (!isAllowedToGetShifts) {
      permissionWarningNotification("Mendapatkan", "Daftar Shift");
    }
  }, [isAllowedToGetShifts]);

  const onOpenModal = (taskId) => {
    // setCurrentTaskId(taskId);
    // setModalDetailTask(true);
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
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: <>{record.name || "-"}</>,
        };
      },

      sorter: isAllowedToGetShifts
        ? (a, b) => a?.name?.toLowerCase() - b?.name?.toLowerCase()
        : false,
    },
    {
      title: "Jam Kerja",
      dataIndex: "work_time",
      render: (text, record, index) => {
        return {
          children: <>{text || "-"}</>,
        };
      },
    },
    {
      title: "Jam Istirahat",
      dataIndex: "rest_time",
      render: (text, record, index) => {
        return {
          children: <>{text || "-"}</>,
        };
      },
      sorter: isAllowedToGetShifts
        ? (a, b) => a?.start_date - b?.start_date
        : false,
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (status, record, index) => {
        return {
          children:
            status == "Aktif" ? (
              <p
                className={`rounded-md p-1 text-center bg-primary100 text-white`}
              >
                Aktif
              </p>
            ) : (
              <p className={`rounded-md p-1 text-center bg-mono90 text-mono30`}>
                Non-Aktif
              </p>
            ),
        };
      },
      // sorter: isAllowedToGetShifts
      //   ? (a, b) => {
      //       const dataStatusListIds = dataStatusList?.map(
      //         (status) => status.id
      //       );
      //       const indexA = dataStatusListIds?.indexOf(a.status?.id);
      //       const indexB = dataStatusListIds?.indexOf(b.status?.id);
      //       return indexA - indexB;
      //     }
      //   : false,
    },
    {
      title: "Aksi",
      dataIndex: "action",
      render: (status, record, index) => {
        return {
          children: (
            <div className="flex items-center gap-6 justify-center">
              <button className="bg-transparent">
                <EditIconSvg color={"#808080"} size={24} />
              </button>
              <button className="bg-transparent">
                <TrashIconSvg color={"#BF4A40"} size={24} />
              </button>
            </div>
          ),
        };
      },
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
              // total={dataRawShifts?.total}
              queryParams={queryParams}
              setQueryParams={setQueryParams}
              onOpenModal={onOpenModal}
              sortTable={sortTable}
            />
          </div>
        </div>
      </div>

      {/* <AccessControl hasPermission={RECRUITMENT_PREVIEW_GET}> */}
      <DrawerShiftCreate
        title={"Tambah Shift"}
        visible={isShowCreateDrawer}
        buttonOkText={"Simpan Shift"}
        initProps={token}
        onvisible={setShowCreateDrawer}
        setRefresh={setRefresh}
        isAllowedToAdd={isAllowedToAddShift}
      />
      {/* </AccessControl> */}
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
