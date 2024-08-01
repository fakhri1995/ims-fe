import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";

import LayoutDashboard from "components/layout-dashboard";
import {
  AttendanceAdminListSection,
  AttendanceAdminTodayStatCard,
  CheckInOutCard,
} from "components/screen/attendance";
import { AttendanceAdminLeafletMapNoSSR } from "components/screen/attendance";

import { useAccessControl } from "contexts/access-control";

import { ATTENDANCES_USERS_GET } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import httpcookie from "cookie";

import { PageBreadcrumbValue, ProtectedPageProps } from "types/common";

const AdminAttendancePage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToDisplayContent = hasPermission(ATTENDANCES_USERS_GET);
  const [roles, setRoles] = useState(0);
  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Admin Attendance",
    },
  ];

  useEffect(() => {
    if (!isAllowedToDisplayContent) {
      permissionWarningNotification("Mendapatkan", "Daftar Absensi");
    }
  }, [isAllowedToDisplayContent]);

  useEffect(() => {
    if (dataProfile) {
      if (dataProfile.data.roles.length > 0) {
        let dataRoles = dataProfile.data.roles;
        for (let a = 0; a < dataRoles.length; a++) {
          if (dataRoles[a].name == "Super Admin") {
            setRoles(1);
            a = dataRoles.length;
          }
        }
      }
    }
  }, [dataProfile]);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      sidemenu="attendance/admin"
      fixedBreadcrumbValues={pageBreadcrumb}
    >
      <div className="space-y-5">
        {/* First row: real time clock, today attendance stat, maps */}
        <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-5">
          {/* First column: real time clock, today attendance stat */}
          <div className="flex flex-col w-full sm:w-[258px] space-y-5 justify-around">
            <div className="h-1/2">
              <CheckInOutCard onlyShowTime />
            </div>

            <div className="h-1/2">
              <AttendanceAdminTodayStatCard role={roles} />
            </div>
          </div>

          {/* Second column: maps */}
          <div className="mig-platform flex-1 h-[292px]">
            <AttendanceAdminLeafletMapNoSSR />
          </div>
        </div>

        {/* Second row: Table all attendance */}
        <div className="grid grid-cols-12">
          <div className="col-span-full">
            <AttendanceAdminListSection
              initProps={token}
              role={roles}
              companyId={dataProfile.data.company.id}
            />
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

export default AdminAttendancePage;
