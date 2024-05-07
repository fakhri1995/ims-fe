import { SearchOutlined } from "@ant-design/icons";
import { Form, Input, Select, Table, notification } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { SorterResult } from "antd/lib/table/interface";
import { AxiosResponse } from "axios";
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
    order_by: withDefault(StringParam, /** @type {"publish_at"} */ undefined),
    order_to: withDefault(StringParam, /** @type {"asc"|"desc"} */ "asc"),
    keyword: withDefault(StringParam, null),
    status: withDefault(StringParam, !isAdminPage ? "published" : null),
  });

  /**
   * States
   */
  const [dataAnnouncements, setDataAnnouncements] = useState<
    AnnouncementData[]
  >([]);

  const [isShowCreateDrawer, setShowCreateDrawer] = useState(false);
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

  const tableColumns: ColumnsType<AnnouncementData> = [
    {
      key: "no",
      title: "No.",
      width: "10px",
      render: (_, __, index) => (
        <p className="text-center">
          {(dataRawAnnouncements?.from || 0) + index}.
        </p>
      ),
    },
    {
      key: "thumbnail",
      title: "Thumbnail",
      dataIndex: "thumbnail_image",
      render: (image) => {
        return image?.link &&
          image?.link != "staging/Announcement/mig-announce-logo.png" ? (
          <div
            className="h-18"
            onClick={(e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
              const imageElement = e.target as HTMLImageElement;
              handleClickThumbnail(e, imageElement.src);
            }}
          >
            <img
              src={generateStaticAssetUrl(image?.link)}
              className="h-18 w-20 object-cover rounded"
            />
          </div>
        ) : (
          <div
            onClick={(e) => handleClickThumbnail(e, "/mig.png")}
            className="h-18 w-20 bg-backdrop rounded flex flex-col items-center 
                  justify-center py-4 px-3"
          >
            <img
              src="/mig.png"
              style={{ width: "10rem", mixBlendMode: "luminosity" }}
            />
          </div>
        );
      },
    },
    {
      key: "title",
      title: "Judul",
      dataIndex: "title",
      render: (title) => {
        return <h1 className="font-bold">{title}</h1>;
      },
    },
    {
      key: "text",
      title: "Isi",
      dataIndex: "text",
      render: (text) => {
        const MAX_LENGTH = 120;
        const slicedText = stripTags(text).slice(0, MAX_LENGTH);
        return (
          <p className="w-36 md:w-72 lg:w-96 xl:w-120">
            {slicedText?.length < MAX_LENGTH ? slicedText : `${slicedText}...`}
          </p>
        );
      },
    },
    {
      key: "user",
      title: "Penulis",
      dataIndex: "user",
      render: (user) => {
        return <p>{isAdminPage ? user?.name : user?.position}</p>;
      },
    },
    {
      key: "date",
      title: "Waktu",
      dataIndex: "publish_at",
      render: (publishAt) =>
        formatDateToLocale(publishAt as unknown as Date, "dd MMM yyyy, HH:mm"),
      sorter: (lhs, rhs) => {
        const lhsDate = new Date(lhs.created_at);
        const rhsDate = new Date(rhs.created_at);
        return lhsDate < rhsDate ? -1 : 1;
      },
    },
  ];

  return (
    <div className="mig-platform flex flex-col space-y-5">
      {/* Keyword search, Status filter dropdown, Cari button */}
      <section className="flex justify-between items-center">
        {/* Title */}
        <h4 className="mig-heading--4">Daftar Pesan</h4>
        <div className="flex items-center gap-6">
          <Input
            placeholder="Cari Sesuatu..."
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
          {isAdminPage && (
            <ButtonSys
              type="primary"
              onClick={() => setShowCreateDrawer(true)}
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
      <div className="grid grid-cols-1">
        <Table<AnnouncementData>
          rowKey={(record) => record.id}
          dataSource={dataAnnouncements}
          loading={loadingAnnouncements}
          columns={tableColumns}
          scroll={{ x: 200 }}
          pagination={{
            total: dataRawAnnouncements?.total,
            current: queryParams?.page,
            pageSize: queryParams.rows,
            showSizeChanger: true,
          }}
          onChange={(pagination, filters, sorter: SorterResult<any>, extra) => {
            const sortTypePayload =
              sorter.order === "ascend"
                ? "asc"
                : sorter.order === "descend"
                ? "desc"
                : undefined;

            setQueryParams({
              page: pagination.current,
              rows: pagination.pageSize,
              order_by:
                sortTypePayload === undefined ? undefined : sorter.field,
              order_to: sortTypePayload,
            });
          }}
          onRow={({ id }) => {
            return {
              className: "cursor-pointer",
              onClick: () =>
                isAllowedToGetAnnouncement &&
                router.push(`announcement/detail/${id}`),
            };
          }}
        />
      </div>

      {isAdminPage && (
        <AccessControl hasPermission={ANNOUNCEMENT_ADD}>
          <DrawerAnnouncement
            initProps={initProps}
            visible={isShowCreateDrawer}
            onvisible={setShowCreateDrawer}
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
