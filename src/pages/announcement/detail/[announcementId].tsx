import { DeleteOutlined } from "@ant-design/icons";
import { Skeleton, Spin, notification } from "antd";
import parse from "html-react-parser";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import ButtonSys from "components/button";
import { AccessControl } from "components/features/AccessControl";
import { ArrowLeftIconSvg } from "components/icon";
import LayoutDashboard from "components/layout-dashboardNew";
import { ModalHapus2 } from "components/modal/modalCustom";
import {
  AttendanceDetailEvidenceSection,
  AttendanceDetailFormAttendanceSection,
  AttendanceDetailMetaCard,
} from "components/screen/attendance";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ANNOUNCEMENTS_GET,
  ANNOUNCEMENT_DELETE,
  ANNOUNCEMENT_GET,
  ATTENDANCE_USER_ADMIN_GET,
  ATTENDANCE_USER_GET,
} from "lib/features";
import {
  generateStaticAssetUrl,
  permissionWarningNotification,
} from "lib/helper";

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
      hrefValue: "back",
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
        <Spin spinning={loadingAnnouncement}>
          <div className="mig-platform grid grid-cols-1 space-y-5">
            <div className="flex justify-between items-center">
              <button
                onClick={() => router.back()}
                className="flex gap-1 items-center bg-transparent hover:opacity-70"
              >
                <ArrowLeftIconSvg size={20} />
                <p>Kembali</p>
              </button>

              <ButtonSys
                onClick={() => setShowDeleteModal(true)}
                type={"default"}
                color="danger"
              >
                <div className="flex gap-2 items-center">
                  <DeleteOutlined color="#BF4A40" />
                  <p>Hapus</p>
                </div>
              </ButtonSys>
            </div>
            <hr />
            <h1 className="font-medium text-2xl">{dataAnnouncement?.title}</h1>
            <p className="">
              Oleh:{" "}
              <span className="font-medium">
                {dataAnnouncement?.user?.name}
              </span>
            </p>
            {dataAnnouncement?.thumbnail_image?.link &&
            dataAnnouncement?.thumbnail_image?.link !=
              "staging/Announcement/mig-announce-logo.png" ? (
              <img
                src={generateStaticAssetUrl(
                  dataAnnouncement?.thumbnail_image?.link
                )}
                alt={dataAnnouncement?.thumbnail_image?.description}
                className="md:w-3/5 bg-cover object-cover rounded-md shadow-lg"
              />
            ) : (
              <div
                className="md:w-3/5 h-60 bg-backdrop rounded flex flex-col items-center 
              justify-center py-10 px-6"
              >
                <img
                  src="/mig.png"
                  style={{ width: "10rem", mixBlendMode: "luminosity" }}
                />
              </div>
            )}
            <div className="py-4 parsed">
              {dataAnnouncement?.text ? parse(dataAnnouncement?.text) : ""}
            </div>
          </div>
        </Spin>
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
