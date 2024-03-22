import { Skeleton, Spin, notification } from "antd";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { AccessControl } from "components/features/AccessControl";
import LayoutDashboard from "components/layout-dashboardNew";
import { ModalHapus2 } from "components/modal/modalCustom";
import { AnnouncementMessageSection } from "components/screen/announcement/AnnouncementMessageSection";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ANNOUNCEMENTS_GET,
  ANNOUNCEMENT_DELETE,
  ANNOUNCEMENT_GET,
} from "lib/features";

import { AnnouncementService } from "apis/announcement";

import httpcookie from "cookie";

import { PageBreadcrumbValue, ProtectedPageProps } from "types/common";

const AnnouncementDetailPage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetAnnouncement = hasPermission(ANNOUNCEMENT_GET);
  const isAllowedToDeleteAnnouncement = hasPermission(ANNOUNCEMENT_DELETE);

  const router = useRouter();
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();
  const announcementId = router.query.announcementId as unknown as number;

  const [isShowDeleteModal, setShowDeleteModal] = useState(false);

  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Manajemen Pesan",
      hrefValue: "/announcement",
    },
    {
      name: "Detail Pesan",
    },
  ];

  const {
    data: dataAnnouncement,
    isLoading: loadingAnnouncement,
    refetch: refetchAnnouncement,
  } = useQuery(
    [ANNOUNCEMENT_GET],
    () =>
      AnnouncementService.getAnnouncement(
        isAllowedToGetAnnouncement,
        axiosClient,
        announcementId
      ),
    {
      enabled: isAllowedToGetAnnouncement && !!announcementId,
      select: (response) => response.data.data,
      // onSuccess: (data) => setDataAnnouncements(data.data),
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan detail announcement.",
        });
      },
    }
  );

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
  };

  const onMutationSucceed = (queryKey: string, message: string) => {
    queryClient.invalidateQueries(queryKey);
    notification.success({
      message,
    });
  };

  const { mutate: deleteAnnouncement, isLoading: loadingDeleteAnnouncement } =
    useMutation(
      (announcementId: number) =>
        AnnouncementService.deleteAnnouncement(
          isAllowedToDeleteAnnouncement,
          axiosClient,
          announcementId
        ),
      {
        onSuccess: (response) => {
          router.back();
          onMutationSucceed(ANNOUNCEMENTS_GET, response.data.message);
          handleCloseDelete();
        },
        onError: (error) => {
          notification.error({ message: "Gagal menghapus pesan pengumuman." });
        },
      }
    );

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      fixedBreadcrumbValues={pageBreadcrumb}
      sidemenu="announcement"
    >
      <div className="px-5">
        <AnnouncementMessageSection
          announcementId={announcementId}
          setShowDeleteModal={setShowDeleteModal}
        />
      </div>

      <AccessControl hasPermission={ANNOUNCEMENT_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={isShowDeleteModal}
          onvisible={setShowDeleteModal}
          onOk={() => deleteAnnouncement(announcementId)}
          onCancel={() => {
            setShowDeleteModal(false);
          }}
          itemName={"pesan"}
          loading={loadingDeleteAnnouncement}
        >
          <p className="mb-4">
            Apakah Anda yakin ingin melanjutkan penghapusan pesan dengan judul{" "}
            <strong>{dataAnnouncement?.title}</strong>?
          </p>
        </ModalHapus2>
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

export default AnnouncementDetailPage;
