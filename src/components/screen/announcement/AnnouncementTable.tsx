import { SearchOutlined } from "@ant-design/icons";
import { Form, Input, Select, Table, notification } from "antd";
import type { ColumnsType } from "antd/lib/table";
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

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { formatDateToLocale } from "lib/date-utils";
import {
  ANNOUNCEMENTS_GET,
  ANNOUNCEMENT_ADD,
  ANNOUNCEMENT_GET,
} from "lib/features";
import { generateNotificationRedirectUrl, stripTags } from "lib/helper";

import {
  AnnouncementData,
  AnnouncementService,
  GetAnnouncementsSucceedResponse,
} from "apis/announcement";

interface IAnnouncementTable {
  isAdminPage: boolean;
}

export const AnnouncementTable: FC<IAnnouncementTable> = ({
  isAdminPage = false,
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
    keyword: withDefault(StringParam, null),
  });

  /**
   * States
   */
  const [dataAnnouncements, setDataAnnouncements] = useState<
    AnnouncementData[]
  >([]);

  const [isShowCreateDrawer, setShowCreateDrawer] = useState(false);

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
          // className="grid grid-cols-1"
          scroll={{ x: 200 }}
          pagination={{
            total: dataRawAnnouncements?.total,
            current: dataRawAnnouncements?.current_page,
            pageSize: queryParams.rows,
            showSizeChanger: true,
            // onChange: onPaginationChanged,
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
            visible={isShowCreateDrawer}
            onvisible={setShowCreateDrawer}
          />
        </AccessControl>
      )}
    </div>
  );
};
