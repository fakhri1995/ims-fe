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
import { generateNotificationRedirectUrl } from "lib/helper";

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

  const [isReadFilter, setIsReadFilter] = useState<boolean | undefined>(
    undefined
  );
  const [keywordFilter, setKeywordFilter] = useState<string | undefined>(
    undefined
  );

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

  /**
   * Component's config
   */

  const statusOptions: DefaultOptionType[] = [
    {
      label: "Semua Status",
      value: -1,
    },
    {
      label: "Belum dibaca",
      value: 0,
    },
    {
      label: "Sudah dibaca",
      value: 1,
    },
  ];

  const tableColumns: ColumnsType<AnnouncementData> = [
    {
      key: "no",
      title: "No.",
      render: (_, __, index) => `${(dataRawAnnouncements.from || 0) + index}.`,
    },
    {
      key: "title",
      title: "Judul",
      dataIndex: "title",
      render: (title) => {
        return <>{title}</>;
      },
    },
    {
      key: "text",
      title: "Isi",
      dataIndex: "text",
      render: (text) => {
        return <>{parse(text)}</>;
      },
    },
    {
      key: "user",
      title: "Penulis",
      dataIndex: "user",
      render: (user) => {
        return <>{user?.name}</>;
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
        {/* <div className="flex items-center justify-between"> */}
        <h4 className="mig-heading--4">Daftar Pesan</h4>
        {/* </div> */}

        <div className="flex items-center gap-6">
          <Input placeholder="Cari Sesuatu..." />
          <ButtonSys type="primary" onClick={() => setShowCreateDrawer(true)}>
            <div className="flex items-center space-x-2">
              <PlusIconSvg />
              <span>Buat Pesan</span>
            </div>
          </ButtonSys>
        </div>
      </section>

      {/* Table */}
      <Table<AnnouncementData>
        dataSource={dataAnnouncements}
        loading={loadingAnnouncements}
        columns={tableColumns}
        // className="tableTask"
        pagination={{
          total: dataRawAnnouncements?.total,
          current: dataRawAnnouncements?.current_page,
          pageSize: queryParams.rows,
          showSizeChanger: true,
          // onChange: onPaginationChanged,
        }}
        // onRow={({
        //   id,
        //   is_read,
        //   notificationable_id,
        //   notificationable_type,
        // }) => {
        //   return {
        //     className: "cursor-pointer",
        //     onClick: () => {
        //       onRecordClicked(
        //         id,
        //         is_read,
        //         notificationable_id,
        //         notificationable_type
        //       );
        //     },
        //   };
        // }}
      />

      <AccessControl hasPermission={ANNOUNCEMENT_ADD}>
        <DrawerAnnouncement
          visible={isShowCreateDrawer}
          onvisible={setShowCreateDrawer}
        />
      </AccessControl>
    </div>
  );
};
