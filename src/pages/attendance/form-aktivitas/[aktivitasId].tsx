import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";

import LayoutDashboard from "components/layout-dashboardNew";
import { FormAktivitasDrawer } from "components/screen/form-aktivitas";
import {
  AktivitasTableInfoCard,
  AktivitasUserListEditableCard,
  DetailFormAktivitasCard,
} from "components/screen/form-aktivitas/DetailAktivitas";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { ATTENDANCE_FORM_GET } from "lib/features";

import {
  AttendanceFormAktivitasService,
  AttendanceFormAktivitasServiceQueryKeys,
} from "apis/attendance";

import httpcookie from "cookie";

import { PageBreadcrumbValue, ProtectedPageProps } from "types/common";

const FormAktivitasDetailPage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  const router = useRouter();
  const axiosClient = useAxiosClient();
  const { hasPermission } = useAccessControl();

  const { aktivitasId } = router.query;

  const { data } = useQuery(
    [AttendanceFormAktivitasServiceQueryKeys.FIND_ONE, +aktivitasId],
    () => AttendanceFormAktivitasService.findOne(axiosClient, +aktivitasId),
    {
      enabled: hasPermission(ATTENDANCE_FORM_GET),
    }
  );

  const [isDrawerShown, setIsDrawerShown] = useState(false);

  const pageBreadcrumb = useMemo(() => {
    const pageBreadcrumbValue: PageBreadcrumbValue[] = [
      { name: "Form Aktivitas", hrefValue: "/attendance/form-aktivitas" },
    ];

    if (!data) {
      return pageBreadcrumbValue;
    }

    const aktivitasName = data.data.data.name;
    pageBreadcrumbValue.push({ name: aktivitasName });

    return pageBreadcrumbValue;
  }, [data]);

  const onUbahButtonClicked = useCallback(() => {
    setIsDrawerShown(true);
  }, []);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      fixedBreadcrumbValues={pageBreadcrumb}
      sidemenu="attendance/form-aktivitas"
    >
      {/* First Row */}
      <div className="px-5 flex flex-wrap lg:flex-nowrap lg:space-x-6 space-y-6 lg:space-y-0">
        {/* First Column */}
        <div className="w-full lg:w-2/5 xl:w-1/3 2xl:w-1/5">
          {/* Project detail card */}
          <DetailFormAktivitasCard
            aktivitasId={+aktivitasId}
            onUbahButtonClicked={onUbahButtonClicked}
          />
        </div>

        {/* Second Column */}
        <div className="w-full lg:w-3/5 xl:w-2/3 2xl:w-4/5 space-y-6">
          {/* Staff (editable) card */}
          <AktivitasUserListEditableCard aktivitasId={+aktivitasId} />

          {/* Aktivitas info card */}
          <AktivitasTableInfoCard aktivitasId={+aktivitasId} />
        </div>
      </div>

      <FormAktivitasDrawer
        title="Perbarui Form Aktivitas"
        buttonOkText="Simpan Form"
        onvisible={setIsDrawerShown}
        visible={isDrawerShown}
        formAktivitasId={+aktivitasId}
      />
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

export default FormAktivitasDetailPage;
