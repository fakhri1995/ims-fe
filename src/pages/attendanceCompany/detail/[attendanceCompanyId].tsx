import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  AttendanceCompanyStatisticCard,
  AttendanceDetailCompanySection,
  AttendanceDetailEvidenceSection,
  AttendanceDetailFormAttendanceSection,
  AttendanceDetailMetaCard,
} from "components/screen/attendance";

import { useAccessControl } from "contexts/access-control";

import { ATTENDANCE_USER_ADMIN_GET, ATTENDANCE_USER_GET } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import LayoutDashboard from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

import { PageBreadcrumbValue, ProtectedPageProps } from "types/common";

const AttendanceCompanyDetailPage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetAsAdmin = hasPermission(ATTENDANCE_USER_ADMIN_GET);
  const isAllowedToGetAsUser = hasPermission(ATTENDANCE_USER_GET);
  const isAllowedToGet = isAllowedToGetAsAdmin || isAllowedToGetAsUser;
  const [lateCount, setLateCount] = useState(-1);
  const [onTimeCount, setOnTimeCount] = useState(-1);
  const router = useRouter();
  const attendanceId = router.query.attendanceCompanyId as unknown as number;
  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Dashboard Kehadiran",
      hrefValue: "back",
    },
    {
      name: "Detail Kehadiran Karyawan",
    },
  ];

  useEffect(() => {
    if (!isAllowedToGet) {
      permissionWarningNotification("Mendapatkan", "Detail Kehadiran Karyawan");
    }
  }, [isAllowedToGet]);

  useEffect(() => {
    getUserId();
  });

  const getUserId = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAttendanceUserAdmin?id=${attendanceId}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(token),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          getCountLate(res2.data.user_attendance.user_id);
        }
      });
  };

  const getCountLate = (user_id) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}//getAttendanceLateCount?id=${user_id}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(token),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setLateCount(res2.data.late_count);
          setOnTimeCount(res2.data.on_time_count);
          // setDataHistory(res2.data.last_two_month_activities);
        }
      });
  };

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      st={st}
      tok={token}
      sidemenu={"1"}
      fixedBreadcrumbValues={pageBreadcrumb}
    >
      <div className="px-5 flex space-y-6 lg:space-y-0 lg:space-x-6 flex-col lg:flex-row">
        {/* First column */}
        <div className="w-full lg:w-2/5 xl:w-1/3 2xl:w-1/5 space-y-6">
          {/* Detail attendance meta */}
          <AttendanceDetailMetaCard attendanceId={attendanceId} />
          {lateCount != -1 && onTimeCount != -1 ? (
            <AttendanceCompanyStatisticCard
              lateCount={lateCount}
              onTimeCount={onTimeCount}
            />
          ) : (
            <div></div>
          )}
        </div>

        {/* Second column */}
        <div className="w-full lg:w-3/5 xl:w-2/3 2xl:w-4/5">
          <div className="grid grid-cols-12 space-y-6">
            <div className="col-span-full">
              {/* Form attendances detail */}
              <AttendanceDetailCompanySection
                attendanceId={attendanceId}
                token={token}
              />
            </div>

            <div className="col-span-full">
              {/* Evidence detail */}
              <AttendanceDetailEvidenceSection attendanceId={attendanceId} />
            </div>
          </div>
        </div>
      </div>
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

export default AttendanceCompanyDetailPage;
