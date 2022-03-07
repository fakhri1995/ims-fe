import { GetServerSideProps, NextPage } from "next";

import styles from "components/layout-dashboard.module.css";
import LayoutDashboard from "components/layout-dashboardNew";
import {
  CheckInOutCard,
  StaffAttendanceStatisticCard,
  StaffDetailCard,
} from "components/screen/attendance";

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

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      fixedBreadcrumbValues={pageBreadcrumb}
      st={styles}
      forceNewBreadcrumbStrategy
    >
      <div className="px-5 flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
        {/* Column 1: Check In/Out Button, Staff detail card, Statistic Card */}
        <div className="w-full sm:w-1/3 md:w-1/5 space-y-6">
          {/* Card Check In/Out */}
          <CheckInOutCard />

          {/* Staff Detail Card */}
          <StaffDetailCard staffId={0} />

          {/* Statistic Card */}
          <StaffAttendanceStatisticCard staffId={0} />
        </div>

        {/* Column 2: Aktivitas card (Table and Tabs), Kehadiran card (table) */}
        <div className="w-full sm:w-2/3 md:w-4/5 bg-purple-400"></div>
      </div>
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
