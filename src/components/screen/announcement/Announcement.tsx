import { SearchOutlined } from "@ant-design/icons";
import { Form, Input, Select, Table, notification } from "antd";
import type { DefaultOptionType } from "antd/lib/select";
import type { ColumnsType } from "antd/lib/table";
import parse from "html-react-parser";
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
  ANNOUNCEMENT_DELETE,
  ANNOUNCEMENT_UPDATE,
} from "lib/features";
import { generateNotificationRedirectUrl, stripTags } from "lib/helper";

import { AnnouncementData, AnnouncementService } from "apis/announcement";
import {
  NotificationData,
  NotificationServiceQueryKeys,
  useGetRecentNotifications,
  usePaginatedNotifications,
  useReadAllNotifications,
  useReadNotification,
} from "apis/notification";

import SearchIcon from "assets/vectors/icon-magnifier.svg";
import OpenedMailIcon from "assets/vectors/icon-mail-opened.svg";
import MailIcon from "assets/vectors/icon-mail.svg";

type FormType = {
  keyword?: string;
  is_read?: number;
};

export const Announcement: FC = () => {
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
  const isAllowedToUpdateAnnouncement = hasPermission(ANNOUNCEMENT_UPDATE);
  const isAllowedToDeleteAnnouncement = hasPermission(ANNOUNCEMENT_DELETE);

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
      select: (response) => response.data.data,
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
      width: "200px",
      render: (title) => {
        return <h1 className="font-bold">{title?.slice(0, 120)}</h1>;
      },
    },
    {
      key: "text",
      title: "Isi",
      dataIndex: "text",
      width: "500px",
      render: (text) => {
        const slicedText = stripTags(text).slice(0, 120);
        return <p>{slicedText}...</p>;
      },
    },
    {
      key: "user",
      title: "Penulis",
      dataIndex: "user",
      render: (user) => {
        return <p>{user?.name}</p>;
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
            prefix={<SearchOutlined rev={""} className="text-mono80" />}
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
          <ButtonSys type="primary" onClick={() => setShowCreateDrawer(true)}>
            <div className="flex items-center space-x-2">
              <PlusIconSvg />
              <span>Buat Pesan</span>
            </div>
          </ButtonSys>
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
              onClick: () => router.push(`announcement/detail/${id}`),
            };
          }}
        />
      </div>

      <AccessControl hasPermission={ANNOUNCEMENT_ADD}>
        <DrawerAnnouncement
          visible={isShowCreateDrawer}
          onvisible={setShowCreateDrawer}
        />
      </AccessControl>
    </div>
  );
};
