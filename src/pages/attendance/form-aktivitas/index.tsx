import type { GetServerSideProps, NextPage } from "next";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useCallback, useEffect, useState } from "react";

import { AccessControl } from "components/features/AccessControl";
import LayoutDashboard from "components/layout-dashboard";
import {
  AddNewAktivitasButton,
  FormAktivitasDrawer,
  FormAktivitasTable,
  FormAktivitasTableHeader,
  TotalFormAktivitasCard,
} from "components/screen/form-aktivitas";

import { useAccessControl } from "contexts/access-control";

import { ATTENDANCE_FORMS_GET, ATTENDANCE_FORM_ADD } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import { IGetAttendanceFormsParams } from "apis/attendance";

import httpcookie from "cookie";

import { PageBreadcrumbValue, ProtectedPageProps } from "types/common";

const ListFormAktivitasPage: NextPage<ProtectedPageProps> = ({
  token,
  dataProfile,
}) => {
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetForms = hasPermission(ATTENDANCE_FORMS_GET);

  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Form Aktivitas",
    },
  ];

  const [criteria, setCriteria] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, ""),
    sort_type: withDefault(StringParam, ""),
    keyword: withDefault(StringParam, ""),
  });

  const onTriggerChangeCriteria = useCallback(
    (newCriteria: Partial<IGetAttendanceFormsParams>) => {
      setCriteria({
        page: newCriteria.page,
        rows: newCriteria.rows,
        sort_by: newCriteria.sort_by,
        sort_type: newCriteria.sort_type,
        keyword: newCriteria.keyword,
      });
    },
    []
  );

  const [isCreateDrawerShown, setCreateDrawerShown] = useState(false);

  const onAddNewAktivitasButtonClicked = useCallback(() => {
    setCreateDrawerShown(true);
  }, []);
  const onSearchTriggered = useCallback((searchValue: string) => {
    onTriggerChangeCriteria({
      keyword: searchValue,
    });
  }, []);

  useEffect(() => {
    if (!isAllowedToGetForms) {
      permissionWarningNotification("Mendapatkan", "Daftar Form Aktivitas");
    }
  }, [isAllowedToGetForms]);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      fixedBreadcrumbValues={pageBreadcrumb}
      sidemenu="attendance/form-aktivitas"
    >
      <div className="px-6 md:px-0">
        {/* First Row */}
        <div className="flex mb-6 md:space-x-6 space-y-6 md:space-y-0 flex-wrap md:flex-nowrap">
          {/* Total Form Aktivitas */}
          <div className="w-full md:w-1/2">
            <TotalFormAktivitasCard />
          </div>

          {/* Create new Form Aktivitas */}
          <div className="w-full md:w-1/2">
            <AddNewAktivitasButton
              disabled={!hasPermission(ATTENDANCE_FORM_ADD)}
              onButtonClicked={onAddNewAktivitasButtonClicked}
            />
          </div>
        </div>

        {/* Second Row */}
        {/* Table: Form Aktivitas */}
        <div className="mig-platform">
          {/* Table header */}
          <FormAktivitasTableHeader onSearchTriggered={onSearchTriggered} />

          {/* Table */}
          <div className="my-6">
            <FormAktivitasTable
              page={criteria.page}
              rows={criteria.rows}
              sort_by={criteria.sort_by}
              sort_type={criteria.sort_type}
              keyword={criteria.keyword}
              onTriggerChangeCriteria={onTriggerChangeCriteria}
            />
          </div>
        </div>

        <AccessControl hasPermission={ATTENDANCE_FORM_ADD}>
          <FormAktivitasDrawer
            title="Tambah Form Aktivitas Baru"
            buttonOkText="Simpan Form"
            onvisible={setCreateDrawerShown}
            visible={isCreateDrawerShown}
          />
        </AccessControl>
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

export default ListFormAktivitasPage;
