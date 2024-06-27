import { notification } from "antd";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { NewsIconSvg } from "components/icon";
import LayoutDashboard from "components/layout-dashboard";
import { AnnouncementCardVertical } from "components/screen/announcement/AnnouncementCardVertical";
import { AnnouncementMessageSection } from "components/screen/announcement/AnnouncementMessageSection";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { ANNOUNCEMENT_GET, ANNOUNCEMENT_MORE_GET } from "lib/features";

import { AnnouncementService } from "apis/announcement";

import httpcookie from "cookie";

import { PageBreadcrumbValue, ProtectedPageProps } from "types/common";

const DashboardAnnouncementDetailPage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetAnnouncementMore = hasPermission(ANNOUNCEMENT_MORE_GET);

  const router = useRouter();
  const axiosClient = useAxiosClient();
  const announcementId = router.query.announcementId as unknown as number;

  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Dashboard",
      hrefValue: "/dashboard/home",
    },
    {
      name: "Daftar Pesan",
      hrefValue: "/dashboard/announcement",
    },
    {
      name: "Detail Pesan",
    },
  ];

  const {
    data: dataAnnouncementMore,
    isLoading: loadingAnnouncementMore,
    refetch: refetchAnnouncementMore,
  } = useQuery(
    [ANNOUNCEMENT_MORE_GET, announcementId],
    () =>
      AnnouncementService.getAnnouncementMore(
        isAllowedToGetAnnouncementMore,
        axiosClient,
        { current_id: announcementId }
      ),
    {
      enabled: isAllowedToGetAnnouncementMore && !!announcementId,
      select: (response) => {
        return response.data.data;
      },
      // onSuccess: (data) => setDataAnnouncements(data.data),
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan daftar announcement lainnya.",
        });
      },
    }
  );

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      fixedBreadcrumbValues={pageBreadcrumb}
      sidemenu="1"
    >
      <div className="px-5 flex flex-col lg:flex-row gap-6">
        <div className="lg:w-9/12">
          <AnnouncementMessageSection announcementId={announcementId} />
        </div>
        <div className="lg:w-3/12">
          <div className="flex gap-2 items-center mb-4">
            <NewsIconSvg size={20} color="#808080" />
            <p>Kabar Lainnya</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {dataAnnouncementMore?.length > 0 &&
              dataAnnouncementMore?.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() =>
                    router.push("/dashboard/announcement/detail/" + item?.id)
                  }
                >
                  <AnnouncementCardVertical data={item} />
                </div>
              ))}
          </div>
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

export default DashboardAnnouncementDetailPage;
