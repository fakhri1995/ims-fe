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
      sidemenu={"attendance/staff"}
      forceNewBreadcrumbStrategy
    >
      <div className="px-5 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Column 1: Check In/Out Button, Staff detail card, Statistic Card */}
        <div className="w-full lg:w-2/5 xl:w-1/5 space-y-6">
          {/* Card Check In/Out */}
          <CheckInOutCard />

          {/* Staff Detail Card */}
          <StaffDetailCard staffId={0} />

          {/* Statistic Card */}
          <StaffAttendanceStatisticCard staffId={0} />
        </div>

        {/* Column 2: Aktivitas card (Table and Tabs), Kehadiran card (table) */}
        <div className="w-full lg:w-3/5 xl:w-4/5 bg-red-400"></div>
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
