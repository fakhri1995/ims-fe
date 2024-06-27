import { GetServerSideProps, NextPage } from "next";

import LayoutDashboard from "components/layout-dashboard";
import { AnnouncementTable } from "components/screen/announcement";

import httpcookie from "cookie";

import { PageBreadcrumbValue, ProtectedPageProps } from "types/common";

const AnnouncementPage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Manajemen Pengumuman",
    },
  ];

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      fixedBreadcrumbValues={pageBreadcrumb}
      sidemenu="announcement"
    >
      <div className="px-6 md:px-0">
        <div className="grid grid-cols-1">
          <AnnouncementTable isAdminPage={true} initProps={token} />
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

export default AnnouncementPage;
