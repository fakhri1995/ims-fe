import { Dropdown, List, Skeleton } from "antd";
import { isToday } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC, MouseEventHandler } from "react";

import { H2 } from "components/typography";

import { formatDateToLocale } from "lib/date-utils";
import { generateNotificationRedirectUrl } from "lib/helper";

import {
  NotificationData,
  useGetRecentNotifications,
  useReadAllNotifications,
  useReadNotification,
} from "apis/notification";

import BellIcon from "assets/vectors/icon-bell.svg";
import ClipboardCheckedIcon from "assets/vectors/icon-clipboard-checked.svg";
import ExclamationIcon from "assets/vectors/icon-exclamation.svg";
import TicketIcon from "assets/vectors/icon-ticket.svg";

import clsx from "clsx";

export const Notification: FC = () => {
  /**
   * Queries
   */
  const { data: hasUnreadNotifications } = useGetRecentNotifications({
    select: (response) => response.data.data.is_unread_exist,
  });

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      className="cursor-pointer flex items-center"
      overlay={<NotificationOverlayContainer />}
    >
      <div className="relative">
        <button className="bg-white/0">
          <BellIcon className="text-mono30 w-8 h-8 stroke-2" />

          {hasUnreadNotifications && (
            <span className="w-3 h-3 bg-state1 absolute rounded-full top-[2px] right-[2px]" />
          )}
        </button>
      </div>
    </Dropdown>
  );
};

type GrouppedRecentNotifications = {
  today: NotificationData[];
  past: NotificationData[];
};

const NotificationOverlayContainer: FC = () => {
  /**
   * Queries
   */
  const {
    data: {
      hasUnreadNotifications,
      past: pastNotificationItems,
      today: todayNotificationItems,
    },
    isFetching,
  } = useGetRecentNotifications({
    select: (data) => {
      const hasUnreadNotifications = data.data.data.is_unread_exist;

      const { today, past } = data.data.data.notifications.reduce(
        (prev, curr) => {
          const isNotifiedToday = isToday(new Date(curr.created_at));

          if (isNotifiedToday) {
            prev.today.push(curr);
          } else {
            prev.past.push(curr);
          }

          return prev;
        },
        {
          today: [],
          past: [],
        } as GrouppedRecentNotifications
      );

      return {
        hasUnreadNotifications,
        today,
        past,
      };
    },
  });
  const { mutate: readAllNotifications } = useReadAllNotifications();

  /**
   * Callbacks
   */
  const onReadAllNotificationClicked: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    if (hasUnreadNotifications) {
      readAllNotifications();
    }
  };

  const isNotificationListEmpty =
    pastNotificationItems.length === 0 && todayNotificationItems.length === 0;

  return (
    <div className="mig-platform--p-0 relative w-96 flex flex-col space-y-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <H2>Notifikasi</H2>

        <span
          className="cursor-pointer text-primary100 hover:opacity-75"
          onClick={onReadAllNotificationClicked}
        >
          Tandai semua telah dibaca
        </span>
      </div>

      {/* List container */}
      <div className="max-h-224 overflow-y-auto scrollbar-hide pb-16 px-4">
        {isNotificationListEmpty && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <img src="/404-illustration.png" alt="Not Found" />
            <span className="mig-caption text-mono50">
              Tidak ada Notifikasi
            </span>
          </div>
        )}

        {!isNotificationListEmpty && (
          <>
            <NotificationList
              label="Hari ini"
              items={todayNotificationItems}
              loading={isFetching}
            />

            <NotificationList
              label="Lebih lama"
              items={pastNotificationItems}
              loading={isFetching}
            />
          </>
        )}
      </div>

      {/* Footer */}
      <div className="w-full absolute bottom-0 left-0 p-4 bg-white">
        <Link href="/notifications">
          <a className="cursor-pointer text-primary100 hover:text-primary100/75">
            Lihat Semua
          </a>
        </Link>
      </div>
    </div>
  );
};

/**
 * @private
 */
interface INotificationList {
  label: string;
  items: NotificationData[];
  loading?: boolean;
}

/**
 * @private
 */
const NotificationList: FC<INotificationList> = ({
  label,
  items,
  loading = false,
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <span className="mig-caption text-mono50">{label}</span>
      <List
        loading={loading}
        dataSource={items}
        renderItem={({
          id,
          description,
          color_type,
          image_type,
          created_at,
          notificationable_id,
          notificationable_type,
          is_read,
        }) => (
          <List.Item key={id} className="p-0">
            <NotificationItem
              notificationId={id}
              content={description}
              colorType={color_type as any}
              imageType={image_type as any}
              createdAt={created_at}
              notificationableId={notificationable_id}
              notificationableType={notificationable_type}
              isRead={is_read as 0 | 1}
            />
          </List.Item>
        )}
      ></List>
    </>
  );
};

/**
 * @private
 */
interface INotificationItem {
  notificationId: number;

  content: string;

  colorType: "red" | "green";
  imageType: "task" | "ticket" | "exclamation";
  createdAt: Date | string;

  notificationableId?: number;
  notificationableType?: string;

  isRead: 0 | 1;
}

/**
 * @private
 */
const NotificationItem: FC<INotificationItem> = ({
  notificationId,
  content,
  colorType,
  imageType,
  createdAt,
  notificationableId,
  notificationableType,
  isRead,
}) => {
  /**
   * Dependencies
   */
  const router = useRouter();

  /**
   * Queries
   */
  const { mutate: readNotification } = useReadNotification();

  /**
   * Callbacks
   */
  const onItemClicked: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();

    const hardRedirect = () => {
      router.push(hrefValue).then(() => router.reload());
    };

    if (!Boolean(isRead)) {
      readNotification(notificationId, {
        onSuccess: hardRedirect,
      });
    } else {
      hardRedirect();
    }
  };

  const iconBackgroundClassName = clsx(
    {
      "bg-primary100/25": colorType === "green",
      "bg-state1/25": colorType === "red",
    },
    "h-12 w-12 rounded-full flex items-center justify-center"
  );

  const iconClassName = clsx(
    {
      "text-primary100": colorType === "green",
      "text-state1": colorType === "red",
    },
    "stroke-2 w-8 h-8"
  );

  // Selasa, 12 Apr 2022 - 08:00
  const formattedCreatedAt = formatDateToLocale(
    createdAt as unknown as Date,
    "dd MMM yyyy - HH:mm"
  );

  // Transform 'App\\Task' -> 'Task' (or 'Ticket')
  const notificationableTypeValue = notificationableType.split("\\").pop();

  const hrefValue = generateNotificationRedirectUrl(
    notificationableId,
    notificationableTypeValue.toLowerCase() as "task" | "ticket"
  );

  const notificationContent = (
    <strong>
      {notificationableTypeValue} {notificationableId}
    </strong>
  );

  return (
    <a
      href={hrefValue}
      className="mig-platform--p-0 p-2 my-4 cursor-pointer flex items-start justify-between space-x-4 hover:bg-primary100/10 transition-colors duration-300 w-full"
      onClick={onItemClicked}
    >
      {/* Icon */}
      <div className="flex space-x-4">
        <div>
          <div className={iconBackgroundClassName}>
            {imageType === "exclamation" && (
              <ExclamationIcon className={iconClassName} />
            )}
            {imageType === "task" && (
              <ClipboardCheckedIcon className={iconClassName} />
            )}
            {imageType === "ticket" && <TicketIcon className={iconClassName} />}
          </div>
        </div>

        {/* Content and Date */}
        <div className="flex flex-col space-y-2">
          <p className="text-mono30">
            {content} {notificationContent}
          </p>
          <span className="mig-caption text-mono80">{formattedCreatedAt}</span>
        </div>
      </div>

      {!Boolean(isRead) && (
        <div className="h-4 self-center flex justify-end">
          <span className="block w-3 h-3 rounded-full bg-state1" />
        </div>
      )}
    </a>
  );
};

/**
 * @private
 */
const NotificationItemSkeleton: FC = () => (
  <div className="mig-platform--p-0 p-2 cursor-progress flex items-start space-x-4 opacity-75">
    <Skeleton active avatar paragraph={{ rows: 1 }} />
  </div>
);
