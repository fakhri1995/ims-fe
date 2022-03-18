import { GetServerSideProps, NextPage } from "next";

import styles from "components/layout-dashboard.module.css";
import LayoutDashboard from "components/layout-dashboardNew";
import {
  AttendanceAdminListSection,
  AttendanceAdminTodayStatCard,
  CheckInOutCard,
} from "components/screen/attendance";
import { AttendanceAdminLeafletMapNoSSR } from "components/screen/attendance";

import httpcookie from "cookie";

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
          <div className="flex flex-col w-full lg:w-2/5 xl:w-1/5 space-y-6 justify-around">
            <div className="min-h-[12rem] flex-grow">
              <CheckInOutCard onlyShowTime />
            </div>

            <div className="min-h-[12rem] flex-grow h-full">
              <AttendanceAdminTodayStatCard />
            </div>
          </div>

          {/* Second column: maps */}
          <div className="flex w-full lg:w-3/5 xl:w-4/5">
            <div className="mig-platform w-full">
              <AttendanceAdminLeafletMapNoSSR />
            </div>
          </div>
        </div>

        {/* Second row: Table all attendance */}
        <AttendanceAdminListSection />
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

export default AdminAttendancePage;
