import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { AccessControl } from "components/features/AccessControl";
import LayoutDashboard from "components/layout-dashboard";
import { FormAktivitasDrawer } from "components/screen/form-aktivitas";
import {
  AktivitasTableInfoCard,
  AktivitasUserListEditableCard,
  DetailFormAktivitasCard,
} from "components/screen/form-aktivitas/DetailAktivitas";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ATTENDANCE_FORM_DELETE,
  ATTENDANCE_FORM_GET,
  ATTENDANCE_FORM_UPDATE,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

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
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToShowFormAktivitasDetail = hasPermission(ATTENDANCE_FORM_GET);
  const isAllowedToUpdateFormDetail = hasPermission(ATTENDANCE_FORM_UPDATE);
  const isAllowedToDeleteFormDetail = hasPermission(ATTENDANCE_FORM_DELETE);

  const canOpenUpdateDrawer =
    isAllowedToUpdateFormDetail || isAllowedToDeleteFormDetail;

  const router = useRouter();
  const axiosClient = useAxiosClient();

  const { aktivitasId } = router.query;

  const { data } = useQuery(
    [AttendanceFormAktivitasServiceQueryKeys.FIND_ONE, +aktivitasId],
    () => AttendanceFormAktivitasService.findOne(axiosClient, +aktivitasId, 0),
    {
      enabled: isAllowedToShowFormAktivitasDetail,
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

  useEffect(() => {
    if (!isAllowedToShowFormAktivitasDetail) {
      permissionWarningNotification("Mendapatkan", "Detail Form Aktivitas");
    }
  }, [isAllowedToShowFormAktivitasDetail]);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      fixedBreadcrumbValues={pageBreadcrumb}
      sidemenu="attendance/form-aktivitas"
    >
      <AccessControl hasPermission={ATTENDANCE_FORM_GET}>
        <div className="w-full flex flex-col lg:flex-row  gap-6 ">
          {/* First Column */}
          <div className="w-full lg:w-[258px]">
            {/* Project detail card */}
            <DetailFormAktivitasCard
              aktivitasId={+aktivitasId}
              onUbahButtonClicked={onUbahButtonClicked}
            />
          </div>

          {/* Second Column */}
          <div className="flex-1 space-y-6">
            {/* Staff (editable) card */}
            <AktivitasUserListEditableCard aktivitasId={+aktivitasId} />

            {/* Aktivitas info card */}
            <AktivitasTableInfoCard aktivitasId={+aktivitasId} />
          </div>
        </div>

        {canOpenUpdateDrawer && (
          <FormAktivitasDrawer
            title="Perbarui Form Aktivitas"
            buttonOkText="Simpan Form"
            onvisible={setIsDrawerShown}
            visible={isDrawerShown}
            formAktivitasId={+aktivitasId}
          />
        )}
      </AccessControl>
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
