import { Spin } from "antd";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

import LayoutDashboard from "components/layout-dashboardNew";
import {
  AttendanceDetailClickableAktivitasSelector,
  AttendanceDetailEvidenceSection,
  AttendanceDetailFormAttendanceSection,
  AttendanceDetailMetaCard,
} from "components/screen/attendance";

import { useAccessControl } from "contexts/access-control";

import { ATTENDANCE_USER_ADMIN_GET, ATTENDANCE_USER_GET } from "lib/features";

import { useAttendanceDetailSelector } from "apis/attendance";

import httpcookie from "cookie";

import { PageBreadcrumbValue, ProtectedPageProps } from "types/common";

const AttendanceDetailPage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  const router = useRouter();
  const { hasPermission } = useAccessControl();
  const isAllowedToGetAsAdmin = hasPermission(ATTENDANCE_USER_ADMIN_GET);
  const isAllowedToGetAsUser = hasPermission(ATTENDANCE_USER_GET);
  const isAllowedToGet = isAllowedToGetAsAdmin || isAllowedToGetAsUser;

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

  const {
    data,
    isLoading,
    currentActivityData,
    selectedActivityIndex,
    setSelectedActivityIndex,
  } = useAttendanceDetailSelector(attendanceId);

  const shouldShowAktivitasSpinner = data === undefined || isLoading;

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      fixedBreadcrumbValues={pageBreadcrumb}
    >
      <div className="px-5 flex space-y-6 lg:space-y-0 lg:space-x-6 flex-col lg:flex-row">
        {/* First column */}
        <div className="w-full lg:w-2/5 xl:w-1/3 2xl:w-1/5 space-y-6">
          {/* Detail attendance meta */}
          <AttendanceDetailMetaCard attendanceId={attendanceId} />

          {/* Aktivitas selector */}
          {isAllowedToGet && (
            <div className="mig-platform--p-0">
              <h4 className="mig-heading--4 p-6">Aktivitas</h4>

              {shouldShowAktivitasSpinner && (
                <div className="px-6 pb-6 flex justify-center">
                  <Spin size="large" />
                </div>
              )}

              {/* Dynamic selected aktivitas */}
              {data && !isLoading && (
                <aside className="pb-6">
                  {data.length > 0 ? (
                    data.map((datum, index) => (
                      <AttendanceDetailClickableAktivitasSelector
                        key={index}
                        content={datum.timestamp}
                        isActive={index === selectedActivityIndex}
                        onClick={() => {
                          setSelectedActivityIndex(index);
                        }}
                      />
                    ))
                  ) : (
                    <AttendanceDetailClickableAktivitasSelector
                      content="Belum memiliki aktivitas."
                      isActive
                      onClick={null}
                    />
                  )}
                </aside>
              )}
            </div>
          )}
        </div>

        {/* Second column */}
        <div className="w-full lg:w-3/5 xl:w-2/3 2xl:w-4/5 space-y-6">
          {/* Form attendances detail */}
          <AttendanceDetailFormAttendanceSection
            activities={currentActivityData?.activities}
            isLoading={isLoading}
          />

          {/* Evidence detail */}
          <AttendanceDetailEvidenceSection attendanceId={attendanceId} />
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
