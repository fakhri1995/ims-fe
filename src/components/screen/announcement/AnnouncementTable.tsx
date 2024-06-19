import { SearchOutlined } from "@ant-design/icons";
import { Empty, Input, Pagination, notification } from "antd";
import { AxiosResponse } from "axios";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import DrawerAnnouncement from "components/drawer/announcement/drawerAnnouncement";
import { AccessControl } from "components/features/AccessControl";
import { ArrowsSortIconSvg, PlusIconSvg } from "components/icon";
import ModalThumbnailPreview from "components/modal/attendance/modalThumbnailPreview";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import {
  ANNOUNCEMENTS_GET,
  ANNOUNCEMENT_ADD,
  ANNOUNCEMENT_GET,
} from "lib/features";
import { generateStaticAssetUrl, stripTags } from "lib/helper";

import {
  AnnouncementData,
  AnnouncementService,
  GetAnnouncementsSucceedResponse,
} from "apis/announcement";

interface IAnnouncementTable {
  isAdminPage: boolean;
  initProps?: string;
}

export const AnnouncementTable: FC<IAnnouncementTable> = ({
  isAdminPage = false,
  initProps,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetAnnouncements = hasPermission(ANNOUNCEMENTS_GET);
  const isAllowedToAddAnnouncement = hasPermission(ANNOUNCEMENT_ADD);
  const isAllowedToGetAnnouncement = hasPermission(ANNOUNCEMENT_GET);

  const router = useRouter();
  const axiosClient = useAxiosClient();
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    order_by: withDefault(
      StringParam,
      /** @type {"publish_at"} */ "publish_at"
    ),
    order_to: withDefault(StringParam, /** @type {"asc"|"desc"} */ "desc"),
    keyword: withDefault(StringParam, null),
    status: withDefault(StringParam, !isAdminPage ? "published" : null),
  });

  /**
   * States
   */
  const [dataAnnouncements, setDataAnnouncements] = useState<
    AnnouncementData[]
  >([]);

  const [isShowDrawer, setShowDrawer] = useState(false);
  const [isShowPreviewModal, setShowPreviewModal] = useState(false);
  const [currentImageLink, setCurrentImageLink] = useState("");

  /**
   * Queries
   */
  const {
    data: dataRawAnnouncements,
    isLoading: loadingAnnouncements,
    refetch: refetchAnnouncements,
  } = useQuery(
    [ANNOUNCEMENTS_GET, queryParams],
    () =>
      AnnouncementService.getAnnouncements(
        isAllowedToGetAnnouncements,
        axiosClient,
        queryParams
      ),
    {
      enabled: isAllowedToGetAnnouncements,
      select: (response: AxiosResponse<GetAnnouncementsSucceedResponse>) =>
        response.data.data,
      onSuccess: (data) => setDataAnnouncements(data.data),
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan daftar announcement.",
        });
      },
    }
  );

  const handleClickThumbnail = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    imageLink: string
  ) => {
    e.stopPropagation();
    setCurrentImageLink(imageLink);
    setShowPreviewModal(true);
  };

  return (
    <div className="mig-platform flex flex-col space-y-6">
      {/* Keyword search, Cari button */}
      <section className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="w-full md:w-4/12">
          <Input
            placeholder="Cari Pengumuman Di sini..."
            prefix={<SearchOutlined className="text-mono80" />}
            allowClear
            onChange={(e) => {
              setTimeout(
                () =>
                  setQueryParams({
                    keyword: e.target.value,
                    page: 1,
                  }),
                500
              );
            }}
            disabled={!isAllowedToGetAnnouncements}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {
            <button
              className="bg-transparent"
              onClick={() =>
                setQueryParams({
                  order_to: queryParams.order_to == "asc" ? "desc" : "asc",
                })
              }
            >
              <div className="flex gap-2 items-center">
                <ArrowsSortIconSvg size={16} />
                <p className="text-mono50 text-left">
                  {queryParams.order_to == "asc"
                    ? "Urutkan Waktu Terbaru"
                    : "Urutkan Waktu Terlama"}
                </p>
              </div>
            </button>
          }

          {isAdminPage && (
            <ButtonSys
              type="primary"
              onClick={() => setShowDrawer(true)}
              disabled={!isAllowedToAddAnnouncement}
            >
              <div className="flex items-center space-x-2">
                <PlusIconSvg />
                <span>Buat Pesan</span>
              </div>
            </ButtonSys>
          )}
        </div>
      </section>

      {/* Table */}
      <div className="grid grid-cols-1 gap-5 overflow-x-auto">
        {dataAnnouncements.length > 0 ? (
          <>
            {dataAnnouncements.map((item, idx) => {
              const thisDate = (item?.publish_at as string).slice(0, 10);
              const prevDate =
                idx > 0
                  ? (dataAnnouncements?.[idx - 1]?.publish_at as string).slice(
                      0,
                      10
                    )
                  : "";

              const MAX_LENGTH = 120;
              const slicedText = stripTags(item?.text).slice(0, MAX_LENGTH);

              return (
                <div key={item.id} className="flex flex-col gap-3">
                  {thisDate != prevDate && (
                    <>
                      {idx !== 0 && <hr />}
                      <p className="text-mono30 font-medium ">
                        {formatDateToLocale(
                          item?.publish_at as unknown as Date,
                          "d MMM yyyy"
                        )}
                      </p>
                    </>
                  )}

                  <div
                    onClick={() =>
                      isAllowedToGetAnnouncement &&
                      router.push(`announcement/detail/${item?.id}`)
                    }
                    className="flex gap-6 items-center justify-between 
                hover:bg-mono120 hover:cursor-pointer"
                  >
                    <div className="flex items-center gap-6 lg:w-10/12">
                      {/* Cover Image */}
                      <div>
                        {item?.thumbnail_image?.link &&
                        item?.thumbnail_image?.link !=
                          "staging/Announcement/mig-announce-logo.png" ? (
                          <div
                            onClick={(
                              e: React.MouseEvent<HTMLImageElement, MouseEvent>
                            ) => {
                              const imageElement = e.target as HTMLImageElement;
                              handleClickThumbnail(e, imageElement.src);
                            }}
                            className="hover:shadow-md"
                          >
                            <img
                              src={generateStaticAssetUrl(
                                item?.thumbnail_image?.link
                              )}
                              className="h-20 w-20 lg:h-[130px] lg:w-[130px] 
                            object-cover rounded"
                            />
                          </div>
                        ) : (
                          <div
                            onClick={(e) => handleClickThumbnail(e, "/mig.png")}
                            className="h-20 w-20 lg:h-[130px] lg:w-[130px] 
                          bg-backdrop rounded flex flex-col items-center 
                          justify-center py-4 px-3"
                          >
                            <img
                              src="/mig.png"
                              style={{
                                width: "10rem",
                                mixBlendMode: "luminosity",
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/*Announcement Text */}
                      <div className="flex flex-col gap-2 w-80 lg:w-96 xl:w-[600px]">
                        <div className="flex items-center gap-2">
                          <h1 className="mig-heading--4 ">{item?.title}</h1>
                          {moment().diff(moment(item?.publish_at), "days") <=
                          2 ? (
                            <div className="bg-primary100 px-2 py-0.5 rounded-md text-white mig-caption--bold">
                              Baru
                            </div>
                          ) : null}
                        </div>

                        <p className="mig-caption--medium">
                          oleh{" "}
                          {isAdminPage
                            ? item?.user?.name
                            : item?.user?.position}
                        </p>
                        <p className="text-mono50 break-all ">
                          {slicedText?.length < MAX_LENGTH
                            ? slicedText
                            : `${slicedText}...`}
                        </p>
                      </div>
                    </div>

                    {/* <div>
                    <p>
                      {formatDateToLocale(
                        item?.publish_at as unknown as Date,
                        "HH:mm"
                      )}
                    </p>
                  </div> */}

                    {isAdminPage && (
                      <div>
                        {item?.is_publish ? (
                          <div className="rounded-md h-auto px-3 text-center py-1 bg-primary10 text-primary100 font-semibold">
                            Delivered
                          </div>
                        ) : (
                          <div className="rounded-md h-auto px-3 text-center py-1 bg-mono90 text-mono-30 font-semibold">
                            Scheduled
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <hr />
          </>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>

      <div className="flex justify-end">
        <Pagination
          current={queryParams.page}
          total={dataRawAnnouncements?.total}
          pageSize={queryParams.rows}
          onChange={(page, pageSize) => {
            setQueryParams({
              page: page,
              // rows: pageSize,
            });
          }}
        />
      </div>

      {isAdminPage && (
        <AccessControl hasPermission={ANNOUNCEMENT_ADD}>
          <DrawerAnnouncement
            initProps={initProps}
            visible={isShowDrawer}
            onvisible={setShowDrawer}
          />
        </AccessControl>
      )}

      <AccessControl hasPermission={ANNOUNCEMENTS_GET}>
        <ModalThumbnailPreview
          imageLink={currentImageLink}
          visible={isShowPreviewModal}
          onvisible={setShowPreviewModal}
        />
      </AccessControl>
    </div>
  );
};
