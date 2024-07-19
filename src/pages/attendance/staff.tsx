import { GetServerSideProps, NextPage } from "next";
import { useCallback, useEffect, useState } from "react";

import { AccessControl } from "components/features/AccessControl";
import LayoutDashboard from "components/layout-dashboard";
import {
  AttendanceStaffAktivitasSection,
  AttendanceStaffDetailCard,
  AttendanceStaffKehadiranSection,
  AttendanceStaffStatisticCard,
  CheckInOutCard,
} from "components/screen/attendance";
import { AttendanceStaffCheckInDrawer } from "components/screen/attendance/staff/AttendanceStaffCheckInDrawer";
import { AttendanceStaffShiftCard } from "components/screen/attendance/staff/AttendanceStaffShiftCard";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ATTENDANCES_USER_GET,
  ATTENDANCE_CURRENT_SCHEDULE_GET,
  ATTENDANCE_TOGGLE_SET,
} from "lib/features";
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

  const axiosClient = useAxiosClient();

  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "My Attendance",
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
      <div
        className="flex flex-col lg:flex-row w-full 
          space-y-6 lg:space-y-0 lg:space-x-6"
      >
        {/* Column 1: Check In/Out Button, Staff detail card, Statistic Card */}
        <div className="w-full lg:w-[258px] space-y-5">
          {/* Card Check In/Out */}
          <CheckInOutCard
            onButtonClicked={handleAttendanceButtonClicked}
            checkInTime={dataProfile.data.company.check_in_time}
          />

          {/* Staff Shift Card */}
          <AccessControl hasPermission={ATTENDANCE_CURRENT_SCHEDULE_GET}>
            <AttendanceStaffShiftCard userId={dataProfile?.data?.id} />
          </AccessControl>

          {/* Staff Detail Card */}
          <AttendanceStaffDetailCard />

          {/* Attendance Summary Card */}
          <AttendanceStaffStatisticCard />
        </div>

        {/* Column 2: Aktivitas section (Table and Tabs), Kehadiran section (table) */}
        <div className="flex-1">
          {/* Section: Aktivitas Table */}
          <div className="grid grid-cols-12 space-y-6">
            <div className="col-span-full">
              <AttendanceStaffAktivitasSection
                dataToken={token}
                idUser={dataProfile.data.id}
                username={dataProfile.data.name}
              />
            </div>
            <div className="col-span-full">
              {/* Section: Kehadiran Table */}
              <AttendanceStaffKehadiranSection initProps={token} />
            </div>
          </div>
        </div>
      </div>

      <AccessControl hasPermission={ATTENDANCE_TOGGLE_SET}>
        {console.log("data profile ", dataProfile)}
        <AttendanceStaffCheckInDrawer
          token={token}
          idCompany={dataProfile.data.company.id}
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
