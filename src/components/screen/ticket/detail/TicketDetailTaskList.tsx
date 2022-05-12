import { Spin } from "antd";
import { FC, memo, useState } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import { AccessControl } from "components/features/AccessControl";
import { H1 } from "components/typography";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  COMPANY_LISTS_GET,
  TASK_ADD,
  TASK_TYPES_GET,
  TICKET_GET,
} from "lib/features";

import { TicketService, TicketServiceQueryKeys } from "apis/ticket";

import { TicketDetailTaskCard } from "./TicketDetailTaskCard";
import { TicketDetailTaskCreateDrawer } from "./TicketDetailTaskCreateDrawer";

/**
 * Component TicketDetailTaskList's props.
 */
export interface ITicketDetailTaskList {
  ticketId: number | string;
  ticketName: string;
}

/**
 * Component TicketDetailTaskList
 */
export const TicketDetailTaskList: FC<ITicketDetailTaskList> = memo(
  ({ ticketId, ticketName }) => {
    const parsedTicketId = parseInt(ticketId as string);
    const hasValidTicketId = !Object.is(parsedTicketId, NaN);

    /**
     * Dependencies
     */
    const { hasPermission } = useAccessControl();
    const isAllowedToGetTicket = hasPermission(TICKET_GET);

    const canAddNewTask = hasPermission([
      TASK_ADD,
      TASK_TYPES_GET,
      COMPANY_LISTS_GET,
    ]);

    const axiosClient = useAxiosClient();
    const { data: tasksData, isLoading } = useQuery(
      [TicketServiceQueryKeys.TICKET_GET, parsedTicketId],
      () => TicketService.findOne(axiosClient, parsedTicketId),
      {
        enabled: isAllowedToGetTicket ? hasValidTicketId : false,
        select: (response) => response.data.data.tasks,
      }
    );

    const [isCreateTaskDrawerShown, setIsCreateTaskDrawerShown] =
      useState(false);

    return (
      <>
        <div className="mig-platform flex flex-col">
          <H1>Task</H1>

          {/* List Task */}
          <div className="my-6 flex flex-col space-y-6">
            {isLoading && <Spin />}

            {!isLoading &&
              tasksData &&
              tasksData.map((task) => (
                <TicketDetailTaskCard key={task.id} {...task} />
              ))}
          </div>

          {/* Add task button */}
          <ButtonSys
            disabled={isLoading || !canAddNewTask}
            type="primary"
            onClick={() => {
              if (!hasValidTicketId) {
                return;
              }

              setIsCreateTaskDrawerShown(true);
            }}
          >
            + Tambah Task
          </ButtonSys>
        </div>

        {hasValidTicketId && (
          <AccessControl
            hasPermission={[TASK_ADD, TASK_TYPES_GET, COMPANY_LISTS_GET]}
          >
            <TicketDetailTaskCreateDrawer
              visible={isCreateTaskDrawerShown}
              onvisible={setIsCreateTaskDrawerShown}
              ticketId={parsedTicketId}
              ticketName={ticketName}
            />
          </AccessControl>
        )}
      </>
    );
  }
);
TicketDetailTaskList.displayName = "TicketDetailTaskList";
