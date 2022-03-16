import { TeamOutlined } from "@ant-design/icons";
import { GetServerSideProps, NextPage } from "next";

import styles from "components/layout-dashboard.module.css";
import LayoutDashboard from "components/layout-dashboardNew";
import {
  AttendanceAdminTable,
  AttendanceAdminTodayStatCard,
  CheckInOutCard,
} from "components/screen/attendance";

import { parseToken } from "lib/auth";
import { getAxiosClient } from "lib/axios-client";

import { AuthService } from "apis/auth";

import { PageBreadcrumbValue, ProtectedPageProps } from "types/common";

const AdminAttendancePage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Absensi",
    },
  ];

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      st={styles}
      sidemenu="attendance/admin"
      fixedBreadcrumbValues={pageBreadcrumb}
    >
      <div className="px-5 space-y-6">
        {/* First row: real time clock, today attendance stat, maps */}
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
          {/* First column: real time clock, today attendance stat */}
          <div className="flex flex-col w-full lg:w-2/5 xl:w-1/5 space-y-6">
            <CheckInOutCard onlyShowTime />

            <AttendanceAdminTodayStatCard />
          </div>

          {/* Second column: maps */}
          <div className="flex w-full lg:w-3/5 xl:w-4/5">
            <div className="mig-platform w-full">
              {/* TODO: Leaflet's map */}
              <div className="w-full h-full bg-slate-50 rounded-xl border border-mono80"></div>
            </div>
          </div>
        </div>

        {/* Second row: Table all attendance */}
        <AttendanceAdminTable />
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

export default AdminAttendancePage;
