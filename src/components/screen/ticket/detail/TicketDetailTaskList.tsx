import { Spin } from "antd";
import { FC, memo, useState } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";

import { useAxiosClient } from "hooks/use-axios-client";

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
    if (Object.is(parsedTicketId, NaN)) {
      return null;
    }

    const axiosClient = useAxiosClient();
    const { data: tasksData, isLoading } = useQuery(
      [TicketServiceQueryKeys.TICKET_GET, parsedTicketId],
      () => TicketService.findOne(axiosClient, parsedTicketId),
      {
        enabled: parsedTicketId !== NaN,
        select: (response) => response.data.data.tasks,
      }
    );

    const [isCreateTaskDrawerShown, setIsCreateTaskDrawerShown] =
      useState(false);

    return (
      <>
        <div className="mig-platform flex flex-col">
          <h4 className="mig-heading--4">Task</h4>

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
          ticketId={parsedTicketId}
          ticketName={ticketName}
        />
      </>
    );
  }
);
TicketDetailTaskList.displayName = "TicketDetailTaskList";
