import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

import styles from "components/layout-dashboard.module.css";
import LayoutDashboard from "components/layout-dashboardNew";
import {
  AddNewAktivitasButton,
  FormAktivitasTable,
  FormAktivitasTableHeader,
  TotalFormAktivitasCard,
} from "components/screen/form-aktivitas/ListFormAktivitas";

import { parseToken } from "lib/auth";
import { getAxiosClient } from "lib/axios-client";

import { LoginService } from "services/auth";

import { ProtectedPageProps } from "types/common";

const ProjectsPage: NextPage<ProtectedPageProps> = ({ token, dataProfile }) => {
  const router = useRouter();
  const pathArr = router.pathname.split("/").slice(1);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      pathArr={pathArr}
      st={styles}
    >
      <>
        {/* First Row */}
        <div className="flex mb-6 md:space-x-6 space-y-6 md:space-y-0 flex-wrap md:flex-nowrap">
          {/* Total Project */}
          <div className="w-full md:w-1/2">
            <TotalFormAktivitasCard />
          </div>

          {/* Create new project */}
          <div className="w-full md:w-1/2">
            <AddNewAktivitasButton
              onButtonClicked={() => {
                console.log("clicked!");
              }}
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="w-full">
          {/* Table: Form Aktivitas */}
          <div className="w-full bg-white rounded-md shadow-md p-6">
            {/* Table header */}
            <FormAktivitasTableHeader
              onSearchTriggered={(searchValue) => {
                alert(`Search value: ${searchValue}`);
              }}
            />

            {/* Table */}
            <div className="my-6">
              <FormAktivitasTable />
            </div>
          </div>
        </div>
      </>
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

export default ProjectsPage;
