import { SearchOutlined } from "@ant-design/icons";
import { Form, Input, Select, Table, notification } from "antd";
import type { DefaultOptionType } from "antd/lib/select";
import type { ColumnsType } from "antd/lib/table";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import ButtonSys from "components/button";
import DrawerAnnouncement from "components/drawer/announcement/drawerAnnouncement";
import { AccessControl } from "components/features/AccessControl";
import { PlusIconSvg } from "components/icon";
import { NewsIconSvg } from "components/icon";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import {
  ANNOUNCEMENTS_GET,
  ANNOUNCEMENT_ADD,
  ANNOUNCEMENT_DELETE,
  ANNOUNCEMENT_EMPLOYEE_GET,
  ANNOUNCEMENT_MORE_GET,
  ANNOUNCEMENT_UPDATE,
} from "lib/features";
import {
  generateNotificationRedirectUrl,
  generateStaticAssetUrl,
  stripTags,
} from "lib/helper";

import { AnnouncementData, AnnouncementService } from "apis/announcement";
import {
  NotificationData,
  NotificationServiceQueryKeys,
  useGetRecentNotifications,
  usePaginatedNotifications,
  useReadAllNotifications,
  useReadNotification,
} from "apis/notification";

type FormType = {
  keyword?: string;
  is_read?: number;
};

export const AnnouncementCard: FC = () => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetAnnouncementEmployee = hasPermission(
    ANNOUNCEMENT_EMPLOYEE_GET
  );
  const isAllowedToGetAnnouncementMore = hasPermission(ANNOUNCEMENT_MORE_GET);

  const router = useRouter();
  const queryClient = useQueryClient();
  const axiosClient = useAxiosClient();
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    keyword: withDefault(StringParam, null),
  });
  const [form] = Form.useForm<FormType>();

  /**
   * States
   */

  /**
   * Queries
   */
  const {
    data: dataAnnouncements,
    isLoading: loadingAnnouncements,
    refetch: refetchAnnouncements,
  } = useQuery(
    [ANNOUNCEMENTS_GET, queryParams],
    () =>
      AnnouncementService.getAnnouncementEmployee(
        isAllowedToGetAnnouncementEmployee,
        axiosClient
      ),
    {
      enabled: isAllowedToGetAnnouncementEmployee,
      select: (response) => response.data.data,
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan daftar announcement employee.",
        });
      },
    }
  );

  return (
    <section className="flex flex-col px-5" id="mainWrapper">
      <div className="mig-platform grid grid-cols-1 px-5 ">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 items-center">
            <NewsIconSvg size={20} color="#808080" />
            <p>Kabar Terbaru</p>
          </div>
          <button
            onClick={() => router.push("/dashboard/announcements")}
            className="mig-caption--bold bg-transparent text-primary100"
          >
            Lihat Berita Terdahulu
          </button>
        </div>
        <div className="grid lg:grid-cols-12 lg:grid-rows-2 gap-6">
          {dataAnnouncements?.length > 0 && (
            <div
              onClick={() =>
                router.push(
                  "/dashboard/announcements/detail/" + dataAnnouncements[0]?.id
                )
              }
              className="lg:row-span-2 lg:col-span-8 flex flex-col lg:flex-row gap-6 lg:items-center 
              cursor-pointer hover:opacity-80"
            >
              {/* Thumbnail */}
              {dataAnnouncements[0]?.thumbnail_image?.link &&
              dataAnnouncements[0]?.thumbnail_image?.link !=
                "staging/Announcement/mig-announce-logo.png" ? (
                <div className="lg:w-2/5 h-60 lg:h-full">
                  <img
                    src={generateStaticAssetUrl(
                      dataAnnouncements[0]?.thumbnail_image?.link
                    )}
                    className="w-full h-full bg-cover object-cover rounded"
                  />
                </div>
              ) : (
                <div
                  className="lg:w-2/5 h-60 lg:h-full bg-backdrop rounded flex flex-col items-center 
                  justify-center py-10 px-6"
                >
                  <img
                    src="/mig.png"
                    style={{ width: "10rem", mixBlendMode: "luminosity" }}
                  />
                </div>
              )}

              {/* Content */}
              <div className="lg:h-full lg:w-2/3 flex flex-col justify-between">
                <p className="mb-2 mig-caption--medium">
                  by {dataAnnouncements[0]?.user?.name}
                </p>
                <div className="mb-2 lg:w-5/6">
                  <h1 className="mb-2 font-bold text-lg">
                    {dataAnnouncements[0]?.title}
                  </h1>
                  <p className="">
                    {stripTags(dataAnnouncements[0]?.text).slice(0, 200)}...
                  </p>
                </div>
                <p className="">
                  {formatDateToLocale(
                    dataAnnouncements[0]?.publish_at as unknown as Date,
                    "dd MMM yyyy, HH:mm"
                  )}
                </p>
              </div>
            </div>
          )}

          {dataAnnouncements?.length > 1 &&
            dataAnnouncements?.slice(1)?.map((item, idx) => (
              <div
                onClick={() =>
                  router.push("/dashboard/announcements/detail/" + item?.id)
                }
                className="flex flex-col lg:flex-row gap-6 lg:col-span-4 lg:items-center 
                cursor-pointer hover:opacity-80"
              >
                {/* Thumbnail */}
                {item?.thumbnail_image?.link &&
                item?.thumbnail_image?.link !=
                  "staging/Announcement/mig-announce-logo.png" ? (
                  <div className="lg:w-36 h-60 lg:h-36 rounded">
                    <img
                      src={generateStaticAssetUrl(item?.thumbnail_image?.link)}
                      className="w-full h-full bg-cover object-cover rounded"
                    />
                  </div>
                ) : (
                  <div
                    className="lg:w-36 h-60 lg:h-36 bg-backdrop rounded flex flex-col items-center 
                    justify-center py-10 px-6"
                  >
                    <img
                      src="/mig.png"
                      style={{ width: "10rem", mixBlendMode: "luminosity" }}
                    />
                  </div>
                )}

                {/* Content */}
                <div className="lg:h-full lg:w-7/12 flex flex-col justify-between">
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
    </section>
  );
};
