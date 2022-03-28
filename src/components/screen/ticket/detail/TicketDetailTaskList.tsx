import { Spin } from "antd";
import { useRouter } from "next/router";
import { FC, memo, useState } from "react";

import ButtonSys from "components/button";

import { formatDateToLocale } from "lib/date-utils";

import { TicketDetailTaskCreateDrawer } from "./TicketDetailTaskCreateDrawer";
import clsx from "clsx";

/**
 * Component TicketDetailTaskList's props.
 */
export interface ITicketDetailTaskList {
  /** NOTE: 2 props ini hanya akan dipass ke child component (drawer create) */
  ticketId: number;
  ticketName: string;
}

/**
 * Component TicketDetailTaskList
 */
export const TicketDetailTaskList: FC<ITicketDetailTaskList> = memo(
  ({ ticketId, ticketName }) => {
    const [isCreateTaskDrawerShown, setIsCreateTaskDrawerShown] =
      useState(false);

    /** TODO: replace this with actual data */
    const dummyTaskItems = [
      {
        id: 1,
        name: "First Task",
        deadline: "2022-03-22",
        status: TaskStatus.OPEN,
        userName: "Kennan Fattah",
      },
      {
        id: 1,
        name: "Second Task",
        deadline: "2022-02-24",
        status: TaskStatus.ON_HOLD,
        userName: "Fattah Kennan",
      },
      {
        id: 3,
        name: "Third Task",
        deadline: "2022-01-26",
        status: TaskStatus.ON_PROGRESS,
        userName: "Kennan Fattah",
      },
    ];

    /** TODO: implement this */
    const isLoading = false;

    return (
      <>
        <div className="mig-platform flex flex-col">
          <h4 className="mig-heading--4">Task</h4>

          {/* List Task */}
          <div className="my-6 flex flex-col space-y-6">
            {isLoading && <Spin />}

            {!isLoading &&
              dummyTaskItems.map((datum, index) => (
                <TaskListItemCard
                  key={index}
                  taskId={datum.id}
                  taskName={datum.name}
                  taskDeadlineDate={datum.deadline}
                  taskStatus={datum.status}
                  userName={datum.userName}
                />
              ))}
          </div>

          {/* Add task button */}
          <ButtonSys
            disabled={isLoading}
            type="primary"
            onClick={() => {
              setIsCreateTaskDrawerShown(true);
            }}
          >
            + Tambah Task
          </ButtonSys>
        </div>

        <TicketDetailTaskCreateDrawer
          visible={isCreateTaskDrawerShown}
          onvisible={setIsCreateTaskDrawerShown}
          ticketId={ticketId}
          ticketName={ticketName}
        />
      </>
    );
  }
);
TicketDetailTaskList.displayName = "TicketDetailTaskList";

/**
 * NOTE: exclude the Overdue.
 *
 * @private
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/208109569/Get+Tasks
 */
enum TaskStatus {
  OVERDUE = 1,
  OPEN,
  ON_PROGRESS,
  ON_HOLD,
  COMPLETED,
  CLOSED,
}

/**
 * @private
 */
interface ITaskListItemCard {
  taskId: number;
  taskName: string;
  taskDeadlineDate: Date | string;
  taskStatus: TaskStatus;

  userName: string;
  userAvatarUrl?: string;
}

/**
 * @private
 */
const TaskListItemCard: FC<ITaskListItemCard> = ({
  taskId,
  taskName,
  taskDeadlineDate,
  taskStatus,
  userName,
  userAvatarUrl,
}) => {
  const router = useRouter();
  const deadlineDateContent = formatDateToLocale(
    new Date(taskDeadlineDate),
    "iiii, dd LLL yy"
  );

  const statusBadgeContent = clsx({
    open: taskStatus === TaskStatus.OPEN,
    "on-progress": taskStatus === TaskStatus.ON_PROGRESS,
    "on-hold": taskStatus === TaskStatus.ON_HOLD,
    completed: taskStatus === TaskStatus.COMPLETED,
    closed: taskStatus === TaskStatus.CLOSED,
  });

  const statusBadgeClassName = clsx(
    "mig-caption uppercase inline-block px-2 rounded-sm",
    {
      "text-primary100 bg-primary100/25": taskStatus === TaskStatus.OPEN,
      "text-[#ED962F] bg-[#ED962F]/25": taskStatus === TaskStatus.ON_PROGRESS,
      "text-[#DDB44A] bg-[#DDB44A]/25": taskStatus === TaskStatus.ON_HOLD,
      "text-[#6AAA70] bg-[#6AAA70]/25": taskStatus === TaskStatus.COMPLETED,
      "text-mono50 bg-mono50/25": taskStatus === TaskStatus.CLOSED,
    }
  );

  const hasValidUserAvatarUrl =
    userAvatarUrl && userAvatarUrl !== "" && userAvatarUrl !== "-";

  const handleOnCardClicked = () => {
    router?.push(`/tasks/detail/` + taskId);
  };

  return (
    <div
      className="mig-platform--p-0 p-4 space-y-4 text-gray-400 hover:cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={handleOnCardClicked}
    >
      {/* Name, Deadlie, and No Task */}
      <div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-mono30">{taskName}</span>
          <span className="mig-caption">{deadlineDateContent}</span>
        </div>

        <span className="mig-caption">{taskId}</span>
      </div>

      {/* Status badge and User name and avatar */}
      <div className="flex items-center justify-between">
        <span className={statusBadgeClassName}>{statusBadgeContent}</span>

        <div className="flex items-center space-x-2">
          <span className="mig-caption">{userName}</span>
          <img
            src={hasValidUserAvatarUrl ? userAvatarUrl : "/image/staffTask.png"}
            alt={`${userName}'s Avatar`}
            className="w-5 h-5 rounded-full bg-cover"
          />
        </div>
      </div>
    </div>
  );
};
