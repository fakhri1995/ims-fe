import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import LayoutDashboard from "components/layout-dashboard";
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
      <div
        className="flex flex-col lg:flex-row w-full 
          space-y-6 lg:space-y-0 lg:space-x-6"
      >
        {/* First column */}
        <div className="w-full lg:w-[258px] space-y-6">
          {/* Detail attendance meta */}
          <AttendanceDetailMetaCard attendanceId={attendanceId} />
        </div>

        {/* Second column */}
        <div className="flex-1">
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
