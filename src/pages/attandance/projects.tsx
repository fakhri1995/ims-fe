import { parseToken } from "lib/auth";
import { getAxiosClient } from "lib/axios-client";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { IGetDetailProfile } from "types/api/login/get-detailprofile";

import styles from "components/layout-dashboard.module.css";
import LayoutDashboard from "components/layout-dashboardNew";
import {
  AddNewProjectButton,
  TotalProjectCard,
} from "components/screen/projects/ListProject";

import { LoginService } from "services/auth";

interface IProjecsPage {
  token: string;
  sidemenu: string;
  dataProfile: IGetDetailProfile;
}

const ProjectsPage: NextPage<IProjecsPage> = ({ token, dataProfile }) => {
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
        <div className="flex mb-6 md:space-x-6 space-y-6 md:space-y-0 flex-wrap md:flex-nowrap">
          {/* Total Project */}
          <div className="w-full md:w-1/2">
            <TotalProjectCard projectCount={23} />
          </div>

          {/* Create new project */}
          <div className="w-full md:w-1/2">
            <AddNewProjectButton
              onButtonClicked={() => {
                console.log("clicked!");
              }}
            />
          </div>
        </div>

        <div className="w-full bg-purple-400 h-4"></div>
      </>
      {/* First row */}

      {/* Second row */}
      {/* Table */}
      {/* TODO */}
    </LayoutDashboard>
  );
};

export const getServerSideProps: GetServerSideProps<IProjecsPage> = async (
  ctx
) => {
  let defaultProps: IProjecsPage = {} as IProjecsPage;

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
