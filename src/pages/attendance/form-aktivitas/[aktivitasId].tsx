import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";

import styles from "components/layout-dashboard.module.css";
import LayoutDashboard from "components/layout-dashboardNew";
import { FormAktivitasDrawer } from "components/screen/form-aktivitas";
import {
  AktivitasTableInfoCard,
  AktivitasUserListEditableCard,
  DetailFormAktivitasCard,
} from "components/screen/form-aktivitas/DetailAktivitas";

import { useAxiosClient } from "hooks/use-axios-client";

import { parseToken } from "lib/auth";
import { getAxiosClient } from "lib/axios-client";

import { AttendanceService, AttendanceServiceQueryKeys } from "apis/attendance";
import { AuthService } from "apis/auth";

import { ProtectedPageProps } from "types/common";

const FormAktivitasDetailPage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  const router = useRouter();
  const { aktivitasId } = router.query;
  const pathArr = router.pathname.split("/").slice(1);

  const axiosClient = useAxiosClient();
  const { data } = useQuery(
    [AttendanceServiceQueryKeys.FIND_ONE, +aktivitasId],
    () => AttendanceService.findOne(axiosClient, +aktivitasId)
  );

  const [isDrawerShown, setIsDrawerShown] = useState(false);

  const modifiedPathArr = useMemo(() => {
    if (!data) {
      return pathArr;
    }

    return [...pathArr, data.data.data.name];
  }, [data]);

  const onUbahButtonClicked = useCallback(() => {
    setIsDrawerShown(true);
  }, []);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      pathArr={modifiedPathArr}
      st={styles}
    >
      <div className="px-5">
        {/* First Row */}
        <div className="flex flex-wrap md:flex-nowrap md:space-x-6 space-y-6 md:space-y-0">
          {/* First Column */}
          <div className="w-full md:w-1/3">
            {/* Project detail card */}
            <DetailFormAktivitasCard
              aktivitasId={+aktivitasId}
              onUbahButtonClicked={onUbahButtonClicked}
            />
          </div>

          {/* Second Column */}
          <div className="w-full md:w-2/3 space-y-6">
            {/* Staff (editable) card */}
            <AktivitasUserListEditableCard aktivitasId={+aktivitasId} />

            {/* Aktivitas info card */}
            <AktivitasTableInfoCard aktivitasId={+aktivitasId} />
          </div>
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

export default FormAktivitasDetailPage;
