import { GetServerSideProps, NextPage } from "next";
import { useCallback, useState } from "react";

import styles from "components/layout-dashboard.module.css";
import LayoutDashboard from "components/layout-dashboardNew";
import {
  AttendanceStaffAktivitasSection,
  AttendanceStaffDetailCard,
  AttendanceStaffKehadiranSection,
  AttendanceStaffStatisticCard,
  CheckInOutCard,
} from "components/screen/attendance";
import { AttendanceStaffCheckInDrawer } from "components/screen/attendance/staff/AttendanceStaffCheckInDrawer";

import { parseToken } from "lib/auth";
import { getAxiosClient } from "lib/axios-client";

import { AuthService } from "apis/auth";

import { PageBreadcrumbValue, ProtectedPageProps } from "types/common";

const StaffAttendancePage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
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
    /**
     * TODO: add more functional logic
     */
    setIsCheckInDrawerShown(true);
  }, []);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      fixedBreadcrumbValues={pageBreadcrumb}
      st={styles}
      sidemenu={"attendance/staff"}
      forceNewBreadcrumbStrategy
    >
      <div className="px-5 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Column 1: Check In/Out Button, Staff detail card, Statistic Card */}
        <div className="w-full lg:w-2/5 xl:w-1/5 space-y-6">
          {/* Card Check In/Out */}
          <CheckInOutCard onButtonClicked={handleAttendanceButtonClicked} />

          {/* Staff Detail Card */}
          <AttendanceStaffDetailCard />

          {/* Statistic Card */}
          <AttendanceStaffStatisticCard staffId={0} />
        </div>

        {/* Column 2: Aktivitas section (Table and Tabs), Kehadiran section (table) */}
        <div className="w-full lg:w-3/5 xl:w-4/5 space-y-6">
          {/* Section: Aktivitas Table */}
          <AttendanceStaffAktivitasSection />

          {/* Section: Kehadiran Table */}
          <AttendanceStaffKehadiranSection />
        </div>
      </div>

      <AttendanceStaffCheckInDrawer
        visible={isCheckInDrawerShown}
        onClose={toggleCheckInDrawer}
      />
    </LayoutDashboard>
  );
};

export const getServerSideProps: GetServerSideProps<
  ProtectedPageProps
> = async (ctx) => {
  let defaultProps: ProtectedPageProps = {} as ProtectedPageProps;

  const { token, hasNoToken } = parseToken(ctx);
  if (hasNoToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      props: defaultProps,
    };
  }

  defaultProps.token = token;

  const axiosClient = getAxiosClient(token);
  try {
    const { data } = await AuthService.whoAmI(axiosClient);

    defaultProps.dataProfile = data;
  } catch {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      props: defaultProps,
    };
  }

  return {
    props: defaultProps,
  };
};

export default StaffAttendancePage;
