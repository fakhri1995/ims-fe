import { Form, Input, Select, Table } from "antd";
import type { DefaultOptionType } from "antd/lib/select";
import type { ColumnsType } from "antd/lib/table";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useQueryClient } from "react-query";

import ButtonSys from "components/button";

import { formatDateToLocale } from "lib/date-utils";
import { generateNotificationRedirectUrl } from "lib/helper";

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
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form] = Form.useForm<FormType>();

  /**
   * States
   */
  const [pagination, setPagination] = useState({
    page: 1,
    rows: 10,
  });
  const [isReadFilter, setIsReadFilter] = useState<boolean | undefined>(
    undefined
  );
  const [keywordFilter, setKeywordFilter] = useState<string | undefined>(
    undefined
  );

  /**
   * Queries
   */
  const { data: hasUnreadNotifications } = useGetRecentNotifications({
    select: (response) => response.data.data.is_unread_exist,
  });
  const { data: notificationsListData, isFetching: notificationsListFetching } =
    usePaginatedNotifications({
      page: pagination.page,
      rows: pagination.rows,
      keyword: keywordFilter,
      is_read: isReadFilter,
    });
  const { mutate: readAllNotifications } = useReadAllNotifications();
  const { mutate: readNotification } = useReadNotification();

  /**
   * Callbacks
   */
  const onReadAllClicked = () => {
    if (hasUnreadNotifications) {
      readAllNotifications(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: NotificationServiceQueryKeys.getAll,
            exact: false,
          });
        },
      });
    }
  };

  const onRecordClicked = (
    notificationId: number,
    isRead: number,
    notificationableId: number,
    notificationableType: string
  ) => {
    const hadRead = Boolean(isRead);
    const hrefValue = generateNotificationRedirectUrl(
      notificationableId,
      notificationableType.split("\\").pop().toLowerCase() as any
    );

    const hardRedirect = () => {
      router?.push(hrefValue).then(() => router.reload());
    };

    if (hadRead) {
      hardRedirect();
      return;
    }

    readNotification(notificationId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: NotificationServiceQueryKeys.getAll,
          exact: false,
        });

        hardRedirect();
      },
    });
  };

  const onKeywordAndStatusChanged = ({ keyword, is_read }: FormType) => {
    setIsReadFilter(
      is_read === -1 || is_read === undefined ? undefined : Boolean(is_read)
    );

    setKeywordFilter(
      keyword === undefined || keyword?.length === 0 ? undefined : keyword
    );
  };

  const onPaginationChanged = (page: number, rows: number) => {
    setPagination({ page, rows });
  };

  /**
   * Component's config
   */
  const tableDataSource = notificationsListData?.data.data.data || [];

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

  const tableColumns: ColumnsType<NotificationData> = [
    {
      key: "no",
      title: "No.",
      render: (_, __, index) =>
        `${(notificationsListData?.data.data.from || 0) + index}.`,
    },
    {
      key: "message",
      title: "Pesan Notifikasi",
      dataIndex: "description",
      render: (description, { notificationable_id, notificationable_type }) => {
        const notificationContent = (
          <strong>
            {notificationable_type.split("\\").pop()} {notificationable_id}
          </strong>
        );

        return (
          <>
            {description} {notificationContent}
          </>
        );
      },
    },
    {
      key: "date",
      title: "Waktu",
      dataIndex: "created_at",
      render: (createdAt) =>
        formatDateToLocale(createdAt as unknown as Date, "dd MMM yyyy, HH:mm"),
      sorter: (lhs, rhs) => {
        const lhsDate = new Date(lhs.created_at);
        const rhsDate = new Date(rhs.created_at);

        return lhsDate < rhsDate ? -1 : 1;
      },
    },
    {
      key: "status",
      title: "Dibaca",
      dataIndex: "is_read",
      render: (hadRead) => (
        <div className="flex items-center justify-center">
          {Boolean(hadRead) ? (
            <OpenedMailIcon className="text-mono30 w-6 h-6" />
          ) : (
            <MailIcon className="text-primary100 w-6 h-6 stroke-2" />
          )}
        </div>
      ),
      sorter: (lhs, rhs) => (lhs.is_read < rhs.is_read ? -1 : 1),
    },
  ];

  return (
    <div className="mig-platform flex flex-col space-y-5">
      {/* Title & Tandai Semua Telah Dibaca button */}
      <div className="flex items-center justify-between">
        <h4 className="mig-heading--4">Riwayat Notifikasi</h4>

        <ButtonSys type="default" onClick={onReadAllClicked}>
          <OpenedMailIcon className="w-4 h-4" />
          <span className="ml-2">Tandai Semua Telah Dibaca</span>
        </ButtonSys>
      </div>

      {/* Keyword search, Status filter dropdown, Cari button */}
      <section>
        <Form
          form={form}
          onFinish={onKeywordAndStatusChanged}
          className="flex items-start space-x-4 m-0 p-0"
        >
          <Form.Item name="keyword" className="w-full">
            <Input placeholder="Kata Kunci" />
          </Form.Item>

          <Form.Item name="is_read">
            <Select
              placeholder="Pilih Status"
              options={statusOptions}
              defaultValue={-1}
            />
          </Form.Item>

          <Form.Item>
            <ButtonSys type="primary" submit>
              <div className="flex items-center space-x-2">
                <SearchIcon className="w-4 h-4" />
                <span>Cari</span>
              </div>
            </ButtonSys>
          </Form.Item>
        </Form>
      </section>

      {/* Table */}
      <Table<NotificationData>
        dataSource={tableDataSource}
        loading={notificationsListFetching}
        columns={tableColumns}
        className="tableTask"
        pagination={{
          total: notificationsListData?.data.data.total,
          current: notificationsListData?.data.data.current_page,
          pageSize: pagination.rows,
          onChange: onPaginationChanged,
        }}
        onRow={({
          id,
          is_read,
          notificationable_id,
          notificationable_type,
        }) => {
          return {
            className: "cursor-pointer",
            onClick: () => {
              onRecordClicked(
                id,
                is_read,
                notificationable_id,
                notificationable_type
              );
            },
          };
        }}
      />
    </div>
  );
};
