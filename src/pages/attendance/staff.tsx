import { GetServerSideProps, NextPage } from "next";
import { useCallback, useEffect, useState } from "react";

import { AccessControl } from "components/features/AccessControl";
import LayoutDashboard from "components/layout-dashboardNew";
import {
  AttendanceStaffAktivitasSection,
  AttendanceStaffDetailCard,
  AttendanceStaffKehadiranSection,
  AttendanceStaffStatisticCard,
  CheckInOutCard,
} from "components/screen/attendance";
import { AttendanceStaffCheckInDrawer } from "components/screen/attendance/staff/AttendanceStaffCheckInDrawer";

import { useAccessControl } from "contexts/access-control";

import { ATTENDANCES_USER_GET, ATTENDANCE_TOGGLE_SET } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import httpcookie from "cookie";

import { PageBreadcrumbValue, ProtectedPageProps } from "types/common";

const StaffAttendancePage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToShowAttendanceData = hasPermission(ATTENDANCES_USER_GET);

  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Absensi Saya",
    },
  ];

  const [isCheckInDrawerShown, setIsCheckInDrawerShown] = useState(false);

  const toggleCheckInDrawer = useCallback(() => {
    return setIsCheckInDrawerShown((prev) => !prev);
  }, []);

  const handleAttendanceButtonClicked = useCallback(() => {
    setIsCheckInDrawerShown(true);
  }, []);

  useEffect(() => {
    if (!isAllowedToShowAttendanceData) {
      permissionWarningNotification("Mendapatkan", "Detail Absensi Saya");
    }
  }, [isAllowedToShowAttendanceData]);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      fixedBreadcrumbValues={pageBreadcrumb}
      sidemenu="attendance/staff"
    >
      <div className="px-5 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Column 1: Check In/Out Button, Staff detail card, Statistic Card */}
        <div className="w-full lg:w-2/5 xl:w-1/3 2xl:w-1/5 space-y-6">
          {/* Card Check In/Out */}
          <CheckInOutCard onButtonClicked={handleAttendanceButtonClicked} />

          {/* Staff Detail Card */}
          <AttendanceStaffDetailCard />

          {/* Statistic Card */}
          <AttendanceStaffStatisticCard />
        </div>

        {/* Column 2: Aktivitas section (Table and Tabs), Kehadiran section (table) */}
        <div className="w-full lg:w-3/5 xl:w-2/3 2xl:w-4/5">
          {/* Section: Aktivitas Table */}
          <div className="grid grid-cols-12 space-y-6">
            <div className="col-span-full">
              <AttendanceStaffAktivitasSection />
            </div>

            <div className="col-span-full">
              {/* Section: Kehadiran Table */}
              <AttendanceStaffKehadiranSection />
            </div>
          </div>
        </div>
      </div>

      <AccessControl hasPermission={ATTENDANCE_TOGGLE_SET}>
        <AttendanceStaffCheckInDrawer
          visible={isCheckInDrawerShown}
          onClose={toggleCheckInDrawer}
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

export default StaffAttendancePage;
