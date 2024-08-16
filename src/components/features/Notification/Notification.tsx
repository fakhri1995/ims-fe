import { Dropdown, List, Skeleton } from "antd";
import { isToday } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC, MouseEventHandler } from "react";

import {
  ArrowRightIconSvg,
  CalendarFilIconSvg,
  MessageFilledIconSvg,
  MessageIconSvg,
  NotifIconSvg,
  PartyIconSvg,
  SolarStarsIconSvg,
  TaskFilledIconSvg,
  TicketFilledIconSvg,
} from "components/icon";

import { formatDateToLocale } from "lib/date-utils";
import { generateNotificationRedirectUrl } from "lib/helper";

import {
  NotificationData,
  useGetRecentNotifications,
  useReadAllNotifications,
  useReadNotification,
} from "apis/notification";

import ExclamationIcon from "assets/vectors/icon-exclamation.svg";

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
      <button className="relative bg-white/0 ">
        <NotifIconSvg
          className="text-mono30 relative top-[1px] left-0.5"
          size={24}
        />
        {hasUnreadNotifications && (
          <span className="w-2 h-2 bg-state1 absolute rounded-full top-[1px] right-[4px]" />
        )}
      </button>
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
    <div
      className="mig-platform--p-0 relative w-96 flex flex-col overflow-hidden
     shadow-desktopBubble rounded-[15px] border border-mono70"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h5 className="mig-heading--5">Notification</h5>

        <span
          className="mig-caption--medium cursor-pointer text-primary100 hover:opacity-75"
          onClick={onReadAllNotificationClicked}
        >
          Mark all as read
        </span>
      </div>

      {/* List container */}
      <div className="max-h-224 overflow-y-auto scrollbar-hide">
        {isNotificationListEmpty && (
          <div className="flex flex-col items-center justify-center space-y-4 my-4">
            <img src="/404-illustration.png" alt="Not Found" />
            <span className="mig-caption text-mono50">No notification yet</span>
          </div>
        )}

        {!isNotificationListEmpty && (
          <>
            <NotificationList
              label="Latest"
              items={todayNotificationItems}
              loading={isFetching}
            />

            <NotificationList
              label="Previous"
              items={pastNotificationItems}
              loading={isFetching}
            />
          </>
        )}
      </div>

      {/* Footer */}
      {!isNotificationListEmpty && (
        <div className="w-full p-4 bg-white flex justify-center">
          <Link href="/notifications" className="" legacyBehavior>
            <div
              className="cursor-pointer flex items-center gap-[6px] 
          text-primary100 hover:text-primary100/75 mig-caption--medium"
            >
              <p>View All</p>
              <ArrowRightIconSvg />
            </div>
          </Link>
        </div>
      )}
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
      <p className="px-4 mig-caption text-mono50 my-[10px]">{label}</p>
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
        }) => {
          let colorTypeFixed = color_type;
          let imageTypeFixed = image_type;
          const lowerDesc = description.toLowerCase();

          // Special case for announcement notif
          if (lowerDesc.includes("birthday")) {
            colorTypeFixed = "purple";
            imageTypeFixed = "announcement-birthday";
          } else if (lowerDesc.includes("notice")) {
            colorTypeFixed = "red";
            imageTypeFixed = "announcement-notice";
          } else if (lowerDesc.includes("mighty year")) {
            colorTypeFixed = "yellow";
            imageTypeFixed = "announcement-anniv";
          }

          // onboard & last day included in announcement

          return (
            <List.Item key={id} className="p-0" style={{ borderBottom: 0 }}>
              <NotificationItem
                notificationId={id}
                content={description}
                colorType={colorTypeFixed as any}
                imageType={imageTypeFixed as any}
                createdAt={created_at}
                notificationableId={notificationable_id}
                notificationableType={notificationable_type}
                isRead={is_read as 0 | 1}
              />
            </List.Item>
          );
        }}
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

  colorType: "red" | "green" | "blue" | "yellow" | "purple";
  imageType:
    | "task"
    | "ticket"
    | "exclamation"
    | "announcement"
    | "announcement-birthday"
    | "announcement-notice"
    | "announcement-anniv";
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
      router.push(hrefValue);
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
      "bg-primary100": colorType === "green",
      "bg-state1": colorType === "red",
      "bg-secondary100": colorType === "blue",
      "bg-yellow": colorType === "yellow",
      "bg-purple": colorType === "purple",
    },
    "h-8 w-8 rounded flex items-center justify-center"
  );

  const iconClassName = clsx(
    {
      "text-primary100": colorType === "green",
      "text-state1": colorType === "red",
      "text-secondary100": colorType === "blue",
      "text-onprogress": colorType === "yellow",
    },
    "stroke-2 h-8"
  );

  // Selasa, 12 Apr 2022 - 08:00
  const formattedCreatedAt = formatDateToLocale(
    createdAt as unknown as Date,
    "dd MMM yyyy, HH:mm"
  );

  // Transform 'App\\Task' -> 'Task' (or 'Ticket')
  const notificationableTypeValue = notificationableType.split("\\").pop();

  const hrefValue = generateNotificationRedirectUrl(
    notificationableId,
    notificationableTypeValue.toLowerCase() as
      | "task"
      | "ticket"
      | "projecttask"
      | "announcement"
  );

  const notificationContent = (
    <>
      {notificationableTypeValue !== "Announcement" && (
        <strong>
          {notificationableTypeValue} {notificationableId}
        </strong>
      )}
    </>
  );

  return (
    <a
      href={hrefValue}
      className="py-[6px] px-4 cursor-pointer flex space-x-4 hover:bg-neutrals50 transition-colors duration-300 w-full"
      onClick={onItemClicked}
    >
      {/* Icon */}
      <div className="flex space-x-3 items-center">
        <div>
          <div className={iconBackgroundClassName}>
            {imageType === "exclamation" && (
              <ExclamationIcon className={"text-white"} size={24} />
            )}
            {imageType === "task" && (
              <TaskFilledIconSvg className={"text-white"} size={24} />
            )}
            {imageType === "ticket" && (
              <TicketFilledIconSvg className={"text-white"} size={20} />
            )}
            {imageType === "announcement" && (
              <MessageFilledIconSvg className={"text-white"} size={24} />
            )}
            {imageType === "announcement-notice" && (
              <CalendarFilIconSvg className={"text-white"} size={24} />
            )}
            {imageType === "announcement-anniv" && (
              <SolarStarsIconSvg className={"text-white"} size={24} />
            )}
            {imageType === "announcement-birthday" && (
              <PartyIconSvg className={"text-white ml-1"} size={24} />
            )}
          </div>
        </div>

        {/* Content and Date */}
        <div className="flex flex-col">
          <p
            className="text-mono30 mig-body--medium w-[270px] truncate"
            title={content}
          >
            {content} {notificationContent}
          </p>
          <span className="mig-caption text-neutrals90">
            {formattedCreatedAt}
          </span>
        </div>
      </div>

      {!Boolean(isRead) && (
        <div className="flex self-center">
          <p className="block w-2 h-2 rounded-full bg-state1" />
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
