import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

import LayoutDashboard from "components/layout-dashboard";
import styles from "components/layout-dashboard.module.css";
import { DetailProjectCard } from "components/screen/projects/DetailProject";

import { parseToken } from "lib/auth";
import { getAxiosClient } from "lib/axios-client";

import { LoginService } from "services/auth";

import { ProtectedPageProps } from "types/common";

const ProjectsDetailPage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  const router = useRouter();
  const pathArr = router.pathname.split("/").slice(1);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      pathArr={pathArr}
      st={styles}
    >
      {/* First Row */}
      <div className="flex flex-wrap md:flex-nowrap md:space-x-6">
        {/* First Column */}
        <div className="w-full md:w-1/3">
          {/* Project detail card */}
          <DetailProjectCard
            title="UI/UX Designer"
            description="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
            updatedDate="12 Januari 2020"
            staffCount="20"
            createdBy={{ name: "Bintang", avatarUrl: "/image/staffTask.png" }}
            onUbahProjectButtonClicked={() => {
              console.log("Ubah Project clicked...");
            }}
          />
        </div>

        {/* Second Column */}
        <div className="w-full md:w-2/3 h-4 bg-indigo-400">
          {/* Staff (editable) card */}
          <div></div>

          {/* Aktivitas info card */}
          <div></div>
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
