import { Form, Input, Select, Table, notification } from "antd";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { NewsIconSvg } from "components/icon";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import {
  ANNOUNCEMENTS_GET,
  ANNOUNCEMENT_EMPLOYEE_GET,
  ANNOUNCEMENT_GET,
} from "lib/features";
import { generateStaticAssetUrl, stripTags } from "lib/helper";

import { AnnouncementService } from "apis/announcement";

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
  const isAllowedToGetAnnouncements = hasPermission(ANNOUNCEMENTS_GET);
  const isAllowedToGetAnnouncement = hasPermission(ANNOUNCEMENT_GET);

  const router = useRouter();
  const axiosClient = useAxiosClient();
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    keyword: withDefault(StringParam, null),
  });

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
            onClick={() => router.push("/dashboard/announcement")}
            disabled={!isAllowedToGetAnnouncements}
            className="mig-caption--bold bg-transparent text-primary100 hover:opacity-80"
          >
            Lihat Berita Terdahulu
          </button>
        </div>
        <div className="grid lg:grid-cols-12 lg:grid-rows-2 gap-6">
          {dataAnnouncements?.length > 0 && (
            <div
              onClick={() =>
                isAllowedToGetAnnouncement &&
                router.push(
                  "/dashboard/announcement/detail/" + dataAnnouncements[0]?.id
                )
              }
              className="lg:row-span-2 lg:col-span-8 flex flex-row gap-6 lg:items-center 
              cursor-pointer hover:opacity-80"
            >
              {/* Thumbnail */}
              <div className="w-6/12 h-60 lg:h-full">
                {dataAnnouncements[0]?.thumbnail_image?.link &&
                dataAnnouncements[0]?.thumbnail_image?.link !=
                  "staging/Announcement/mig-announce-logo.png" ? (
                  <img
                    src={generateStaticAssetUrl(
                      dataAnnouncements[0]?.thumbnail_image?.link
                    )}
                    className="w-full h-full bg-cover object-cover rounded"
                  />
                ) : (
                  <div
                    className="w-full h-full bg-backdrop rounded flex flex-col items-center 
                  justify-center py-10 px-6"
                  >
                    <img
                      src="/mig.png"
                      style={{ width: "10rem", mixBlendMode: "luminosity" }}
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="lg:h-full w-7/12 flex flex-col justify-between">
                <p className="mb-2 mig-caption--medium">
                  by {dataAnnouncements[0]?.user?.position}
                </p>
                <div className="mb-2 lg:w-5/6">
                  <h1 className="mb-2 font-bold text-lg">
                    {dataAnnouncements[0]?.title}
                  </h1>
                  <p className="text-wrap break-words">
                    {stripTags(dataAnnouncements[0]?.text)?.length > 200
                      ? stripTags(dataAnnouncements[0]?.text).slice(0, 200) +
                        "..."
                      : stripTags(dataAnnouncements[0]?.text)}
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
                key={item?.id}
                onClick={() =>
                  router.push("/dashboard/announcement/detail/" + item?.id)
                }
                className="flex flex-row gap-6 lg:col-span-4 lg:items-center 
                cursor-pointer hover:opacity-80"
              >
                {/* Thumbnail */}
                <div className="w-96 h-60 lg:h-full ">
                  {item?.thumbnail_image?.link &&
                  item?.thumbnail_image?.link !=
                    "staging/Announcement/mig-announce-logo.png" ? (
                    <img
                      src={generateStaticAssetUrl(item?.thumbnail_image?.link)}
                      className="w-full h-full bg-cover object-cover rounded"
                    />
                  ) : (
                    <div
                      className="bg-backdrop rounded flex flex-col items-center 
                    justify-center py-10 px-6 h-full"
                    >
                      <img
                        src="/mig.png"
                        style={{ width: "10rem", mixBlendMode: "luminosity" }}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="lg:w-96 lg:h-full flex flex-col justify-between">
                  <p className="mb-2 mig-caption--medium">
                    by {item?.user?.position}
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
