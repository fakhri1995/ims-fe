import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import LayoutDashboard from "components/layout-dashboardNew";
import {
  AttendanceDetailEvidenceSection,
  AttendanceDetailFormAttendanceSection,
  AttendanceDetailMetaCard,
} from "components/screen/attendance";

import { useAccessControl } from "contexts/access-control";

import { ATTENDANCE_USER_ADMIN_GET, ATTENDANCE_USER_GET } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import httpcookie from "cookie";

import { PageBreadcrumbValue, ProtectedPageProps } from "types/common";

const AttendanceDetailPage: NextPage<ProtectedPageProps> = ({
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

  const router = useRouter();
  const attendanceId = router.query.attendanceId as unknown as number;

  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Absensi",
      hrefValue: "back",
    },
    {
      name: "Detail Absensi",
    },
  ];

  useEffect(() => {
    if (!isAllowedToGet) {
      permissionWarningNotification("Mendapatkan", "Detail Absensi");
    }
  }, [isAllowedToGet]);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      fixedBreadcrumbValues={pageBreadcrumb}
    >
      <div className="px-6 md:px-0 flex space-y-6 lg:space-y-0 lg:space-x-6 flex-col lg:flex-row">
        {/* First column */}
        <div className="w-full lg:w-2/5 xl:w-1/3 2xl:w-1/5 space-y-6">
          {/* Detail attendance meta */}
          <AttendanceDetailMetaCard attendanceId={attendanceId} />
        </div>

        {/* Second column */}
        <div className="w-full lg:w-3/5 xl:w-2/3 2xl:w-4/5">
          <div className="grid grid-cols-12 space-y-6">
            <div className="col-span-full">
              {/* Form attendances detail */}
              <AttendanceDetailFormAttendanceSection
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

export default AttendanceDetailPage;
