import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";

import styles from "components/layout-dashboard.module.css";
import LayoutDashboard from "components/layout-dashboardNew";
import {
  AktivitasTableInfoCard,
  AktivitasUserListEditableCard,
  DetailFormAktivitasCard,
} from "components/screen/form-aktivitas/DetailAktivitas";

import { parseToken } from "lib/auth";
import { getAxiosClient } from "lib/axios-client";

import { LoginService } from "services/auth";

import { ProtectedPageProps } from "types/common";

const ProjectsDetailPage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  const router = useRouter();
  const { aktivitasId } = router.query;
  const pathArr = router.pathname.split("/").slice(1);

  /** TODO: always memo props to be sent to the <DetailFormAktivitasCard> component. Especially the ones that's not primitive value. */
  const _onUbahButtonClicked = useCallback(() => {
    console.log("Ubah Project clicked...");
  }, []);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      pathArr={pathArr}
      st={styles}
    >
      {/* First Row */}
      <div className="flex flex-wrap md:flex-nowrap md:space-x-6 space-y-6 md:space-y-0">
        {/* First Column */}
        <div className="w-full md:w-1/3">
          {/* Project detail card */}
          <DetailFormAktivitasCard
            aktivitasId={+aktivitasId}
            onUbahButtonClicked={_onUbahButtonClicked}
          />
        </div>

        {/* Second Column */}
        <div className="w-full md:w-2/3 h-4 space-y-6">
          {/* Staff (editable) card */}
          <AktivitasUserListEditableCard aktivitasId={+aktivitasId} />

          {/* Aktivitas info card */}
          <AktivitasTableInfoCard aktivitasId={+aktivitasId} />
        </div>
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
    const { data } = await LoginService.me(axiosClient);

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

export default ProjectsDetailPage;
