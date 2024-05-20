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
import { generateStaticAssetUrl, stripTagsNewLine } from "lib/helper";

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
    <section className="flex flex-col px-6 md:px-0" id="mainWrapper">
      <div className="grid grid-cols-1">
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
        <div className="grid xl:grid-cols-12 xl:grid-rows-2 gap-4">
          {dataAnnouncements?.length > 0 && (
            <div
              onClick={() =>
                isAllowedToGetAnnouncement &&
                router.push(
                  "/dashboard/announcement/detail/" + dataAnnouncements[0]?.id
                )
              }
              className="mig-platform flex flex-col md:flex-row gap-6 xl:row-span-2 xl:col-span-7 xl:items-center 
              cursor-pointer hover:opacity-80 w-full"
            >
              {/* Thumbnail */}
              <div className="">
                {dataAnnouncements[0]?.thumbnail_image?.link &&
                dataAnnouncements[0]?.thumbnail_image?.link !=
                  "staging/Announcement/mig-announce-logo.png" ? (
                  <div
                    className="w-full h-72 md:w-48 md:h-48 xl:w-60 xl:h-60 bg-backdrop rounded flex flex-col items-center 
                    justify-center"
                  >
                    <img
                      src={generateStaticAssetUrl(
                        dataAnnouncements[0]?.thumbnail_image?.link
                      )}
                      className="w-full h-72 md:w-48 md:h-48 xl:w-60 xl:h-60 bg-cover object-cover rounded"
                    />
                  </div>
                ) : (
                  <div
                    className="w-full h-72 md:w-48 md:h-48 xl:w-60 xl:h-60 bg-backdrop rounded flex flex-col items-center 
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
              <div className="flex flex-col justify-between h-52 md:h-48 xl:h-60">
                <div className="flex flex-col justify-between gap-2">
                  <h1 className="font-bold text-lg text-mono30">
                    {dataAnnouncements[0]?.title}
                  </h1>
                  <p className="mig-caption--medium text-mono50">
                    by{" "}
                    <span className="text-mono30">
                      {dataAnnouncements[0]?.user?.position}
                    </span>
                  </p>

                  <p
                    className="text-wrap break-words text-mono50"
                    dangerouslySetInnerHTML={{
                      __html:
                        stripTagsNewLine(dataAnnouncements[0]?.text)?.length >
                        120
                          ? stripTagsNewLine(dataAnnouncements[0]?.text).slice(
                              0,
                              120
                            ) + "..."
                          : stripTagsNewLine(dataAnnouncements[0]?.text),
                    }}
                  />
                </div>
                <p className="text-mono50">
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
                className="mig-platform flex flex-col md:flex-row gap-6 xl:col-span-5 xl:items-center 
                cursor-pointer hover:opacity-80"
              >
                {/* Thumbnail */}
                <div className="">
                  {item?.thumbnail_image?.link &&
                  item?.thumbnail_image?.link !=
                    "staging/Announcement/mig-announce-logo.png" ? (
                    <div
                      className="bg-backdrop rounded flex flex-col items-center 
                      justify-center w-full h-72 md:w-24 md:h-24"
                    >
                      <img
                        src={generateStaticAssetUrl(
                          item?.thumbnail_image?.link
                        )}
                        className="w-full h-72 md:w-24 md:h-24 bg-cover object-cover rounded"
                      />
                    </div>
                  ) : (
                    <div
                      className="bg-backdrop rounded flex flex-col items-center 
                    justify-center py-10 px-6 w-full h-72 md:w-24 md:h-24"
                    >
                      <img
                        src="/mig.png"
                        style={{ width: "10rem", mixBlendMode: "luminosity" }}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className=" flex flex-col justify-between max-h-24 ">
                  <h1 className="mb-2 font-bold text-md text-mono30 max-h-20 text-ellipsis ">
                    {item?.title}
                  </h1>
                  <p className="mb-2 mig-caption--medium text-mono50">
                    by{" "}
                    <span className="text-mono30">{item?.user?.position}</span>
                  </p>
                  <p className="text-mono50">
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
