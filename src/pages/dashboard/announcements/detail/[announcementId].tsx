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
import { NewsIconSvg } from "components/icon";
import LayoutDashboard from "components/layout-dashboardNew";
import { ModalHapus2 } from "components/modal/modalCustom";
import {
  AttendanceDetailEvidenceSection,
  AttendanceDetailFormAttendanceSection,
  AttendanceDetailMetaCard,
} from "components/screen/attendance";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import {
  ANNOUNCEMENTS_GET,
  ANNOUNCEMENT_DELETE,
  ANNOUNCEMENT_GET,
  ANNOUNCEMENT_MORE_GET,
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

const DashboardAnnouncementDetailPage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetAnnouncement = hasPermission(ANNOUNCEMENT_GET);
  const isAllowedToGetAnnouncementMore = hasPermission(ANNOUNCEMENT_MORE_GET);

  const router = useRouter();
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();
  const announcementId = router.query.announcementId as unknown as number;

  const [isShowDeleteModal, setShowDeleteModal] = useState(false);

  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Daftar Pesan",
      hrefValue: "/dashboard/announcements",
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
    [ANNOUNCEMENT_GET, announcementId],
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

  const {
    data: dataAnnouncementMore,
    isLoading: loadingAnnouncementMore,
    refetch: refetchAnnouncementMore,
  } = useQuery(
    [ANNOUNCEMENT_MORE_GET, announcementId],
    () =>
      AnnouncementService.getAnnouncementMore(
        isAllowedToGetAnnouncement,
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

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
  };

  const onMutationSucceed = (queryKey: string, message: string) => {
    queryClient.invalidateQueries(queryKey);
    notification.success({
      message,
    });
  };

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      fixedBreadcrumbValues={pageBreadcrumb}
      sidemenu="1"
    >
      <div className="px-5 flex flex-col lg:flex-row gap-6">
        {/* <Spin spinning={loadingAnnouncement}> */}
        <div className="mig-platform grid grid-cols-1 space-y-5 lg:w-9/12">
          <div className="flex justify-between items-center">
            <button
              onClick={() => router.back()}
              className="flex gap-1 items-center bg-transparent hover:opacity-70"
            >
              <ArrowLeftIconSvg size={20} />
              <p>Kembali</p>
            </button>
          </div>
          <hr />
          <h1 className="font-medium text-2xl">{dataAnnouncement?.title}</h1>
          <p className="">
            Oleh:{" "}
            <span className="font-medium">{dataAnnouncement?.user?.name}</span>
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
        {/* </Spin> */}
        <div className="lg:w-3/12">
          <div className="flex gap-2 items-center mb-4">
            <NewsIconSvg size={20} color="#808080" />
            <p>Kabar Lainnya</p>
          </div>
          <div className="flex flex-col gap-4">
            {dataAnnouncementMore?.length > 0 &&
              dataAnnouncementMore?.map((item, idx) => (
                <div
                  onClick={() =>
                    router.push("/dashboard/announcements/detail/" + item?.id)
                  }
                  className="flex flex-col gap-6 cursor-pointer hover:opacity-80 bg-white pb-4 rounded-lg shadow-migcard"
                >
                  {/* Thumbnail */}
                  {item?.thumbnail_image?.link &&
                  item?.thumbnail_image?.link !=
                    "staging/Announcement/mig-announce-logo.png" ? (
                    <div className="h-28  rounded-t-lg">
                      <img
                        src={generateStaticAssetUrl(
                          item?.thumbnail_image?.link
                        )}
                        className="w-full h-full bg-cover object-cover rounded-t-lg"
                      />
                    </div>
                  ) : (
                    <div
                      className="h-28 bg-backdrop rounded-t-lg flex flex-col items-center 
                    justify-center py-10 px-6"
                    >
                      <img
                        src="/mig.png"
                        style={{ width: "10rem", mixBlendMode: "luminosity" }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className=" flex flex-col justify-between px-4">
                    <p className="mb-2 mig-caption--medium">
                      by {item?.user?.name}
                    </p>
                    <h1 className="mb-2 font-bold text-lg">{item?.title}</h1>
                    <p className="">
                      {formatDateToLocale(
                        item?.publish_at as unknown as Date,
                        "dd MMM yyyy, HH:mm"
                      )}
                    </p>
                  </div>
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
