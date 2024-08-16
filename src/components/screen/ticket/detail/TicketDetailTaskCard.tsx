import { UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";

import { formatDateToLocale } from "lib/date-utils";
import { generateStaticAssetUrl } from "lib/helper";

import { Task, TaskStatus } from "apis/ticket";

import UsersIcon from "assets/vectors/icon-users.svg";

import clsx from "clsx";

/**
 * Component TicketDetailTaskCard menampilkan informasi terkait task pada halaman
 *  detail ticket.
 *
 * Component ini hanya dirender dan diberikan data dari component @see TicketDetailTaskList
 */
export const TicketDetailTaskCard: FC<Task> = ({
  id,
  name,
  deadline,
  group,
  group_id,
  users,
  status,
}) => {
  const router = useRouter();

  const deadlineDateContent = formatDateToLocale(
    deadline !== null ? new Date(deadline) : null,
    "iiii, dd LLL yy",
    "-"
  );
  const taskIdContent = _transformTaskId(id);

  const statusBadgeContent = clsx({
    overdue: status === TaskStatus.OVERDUE,
    open: status === TaskStatus.OPEN,
    "on-progress": status === TaskStatus.ON_PROGRESS,
    "on-hold": status === TaskStatus.ON_HOLD,
    completed: status === TaskStatus.COMPLETED,
    closed: status === TaskStatus.CLOSED,
  });

  const statusBadgeClassName = clsx(
    "mig-caption uppercase inline-block px-2 rounded-sm",
    {
      "text-state1 bg-state1/25": status === TaskStatus.OVERDUE,
      "text-primary100 bg-primary100/25": status === TaskStatus.OPEN,
      "text-[#ED962F] bg-[#ED962F]/25": status === TaskStatus.ON_PROGRESS,
      "text-[#DDB44A] bg-[#DDB44A]/25": status === TaskStatus.ON_HOLD,
      "text-[#6AAA70] bg-[#6AAA70]/25": status === TaskStatus.COMPLETED,
      "text-mono50 bg-mono50/25": status === TaskStatus.CLOSED,
    }
  );

  /** Kondisi ketika Task belum di assign ke siapapun */
  const isAssigned = group_id !== null || users.length > 0;

  // it can be either a User object or undefined.
  const tasksUser = isAssigned ? users[0] : undefined;

  const isGroup = group_id !== null;
  const groupName = group?.name;
  const usersLength = users.length;

  const hasMultipleUsers = isGroup || usersLength > 1;

  const usersDropdownList = hasMultipleUsers ? (
    <div className="bg-white rounded-md p-2 shadow-md max-h-80 overflow-y-auto">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center space-x-4 p-3 hover:bg-primary10 rounded-md max-w-xs cursor-pointer transition-colors"
        >
          {/* Profile Image */}
          <img
            src={generateStaticAssetUrl(user.profile_image.link)}
            alt={`${user.name}'s Avatar`}
            className="w-5 h-5 rounded-full bg-cover"
          />

          {/* Name */}
          <span className="text-mono30 font-medium">{user.name}</span>
        </div>
      ))}
    </div>
  ) : null;

  const destinationUrl = `/tasks/detail/${id}`;
  const originUrl = encodeURIComponent(router?.asPath);

  return (
    <Link
      href={`${destinationUrl}?prevpath=${originUrl}`}
      className="mig-platform--p-0 p-4 space-y-4 text-gray-400 hover:text-gray-400 hover:cursor-pointer hover:bg-gray-50 transition-colors"
      legacyBehavior
    >
      {/* Name, Deadlie, and No Task */}
      <div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-mono30">{name}</span>
          <span className="mig-caption text-right">{deadlineDateContent}</span>
        </div>

        <span className="mig-caption">{taskIdContent}</span>
      </div>

      {/* Status badge and User name and avatar */}
      <div className="flex items-center">
        <div className="w-1/2">
          <span className={statusBadgeClassName}>{statusBadgeContent}</span>
        </div>

        {isAssigned && (
          <div className="flex w-1/2 justify-end items-center space-x-2">
            {!hasMultipleUsers ? (
              <>
                <span className="mig-caption">{tasksUser.name}</span>
                <img
                  src={generateStaticAssetUrl(tasksUser.profile_image?.link)}
                  alt={`${tasksUser.name}'s Avatar`}
                  className="w-5 h-5 rounded-full"
                />
              </>
            ) : (
              <Dropdown
                arrow
                placement="bottomLeft"
                overlay={usersDropdownList}
              >
                <div className="flex space-x-2">
                  <span className="mig-caption">
                    {!isGroup ? `${usersLength} Orang` : groupName}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-primary100 flex items-center justify-center">
                    <UsersIcon />
                  </div>
                </div>
              </Dropdown>
            )}
          </div>
        )}

        {/* Kondisi ketika task belum di assign staff / group */}
        {!isAssigned && (
          <div className="flex w-1/2 justify-end items-center space-x-2">
            <span className="mig-caption">Belum ditugaskan</span>
            <div className="w-5 h-5 rounded-full flex justify-center items-center overflow-hidden bg-primary100">
              <UserOutlined className="text-white" />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

/**
 * Transform numeric `id` menjadi string dengan format:
 *  T-000000
 *
 * Contoh:
 *  id = 23
 *  result = T-000023
 *
 * @private
 * @param id
 * @returns {string} Formatted string menyesuaikan ketentuan ID task.
 */
const _transformTaskId = (id: number): string => {
  const taskIdInString = id.toString();
  const remainder = 6 - taskIdInString.length;
  const result = "T-".concat("0".repeat(remainder), taskIdInString);

  return result;
};
