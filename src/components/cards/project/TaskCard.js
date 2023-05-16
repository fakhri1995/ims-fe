import { Avatar, Tooltip } from "antd";
import moment from "moment";
import React from "react";

import { generateStaticAssetUrl, momentFormatDate } from "../../../lib/helper";
import { InfoCircleIconSvg, OneUserIconSvg, UserIconSvg } from "../../icon";

const TaskCard = ({
  title,
  projectName,
  toDate,
  statusName,
  statusColor,
  taskStaffs,
  onClick,
}) => {
  const currentDate = new Date();
  const deadline = new Date(toDate);
  const isPastDeadline = currentDate > deadline;

  return (
    <div
      onClick={onClick}
      className="grid grid-cols-1 space-y-4 bg-white h-full px-4 py-6 md:p-3 shadow-lg rounded-md hover:cursor-pointer"
    >
      {isPastDeadline && (
        <div className="bg-warning bg-opacity-20 rounded-md p-1 flex space-x-2 items-center">
          <InfoCircleIconSvg color={"#BF4A40"} size={16} />
          <p className="text-warning text-[10px]">
            <strong>Task</strong> ini sudah melewati batas waktu yang telah
            ditentukan.{" "}
          </p>
        </div>
      )}
      <div className="grid grid-cols-2 space-x-2 ">
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <h4
              className={`mig-heading--4 ${isPastDeadline && "text-warning"}`}
            >
              {title}
            </h4>
            <h5
              className={`mig-heading--5 ${
                isPastDeadline ? "text-warning" : "text-mono50"
              } `}
            >
              {projectName}
            </h5>
          </div>
          <p
            className={`rounded-md p-1 text-center`}
            style={{
              backgroundColor: statusColor ? statusColor + "20" : "#E6E6E6",
              color: statusColor ?? "#808080",
            }}
          >
            {statusName ?? "-"}
          </p>
        </div>
        <div className="flex flex-col justify-between">
          {moment(toDate).isValid() && (
            <div
              className={`flex flex-col space-y-1 text-right ${
                isPastDeadline ? "text-warning" : "text-mono50"
              }`}
            >
              <p className="mig-caption--bold">Task Deadline:</p>
              <p className="mig-caption">
                {momentFormatDate(toDate, "-", "ddd, D MMMM YYYY")}
              </p>
            </div>
          )}
          {taskStaffs?.length > 1 ? (
            <div className="flex items-center justify-end">
              <Avatar.Group
                size={24}
                maxCount={2}
                className="cursor-help"
                maxStyle={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                }}
              >
                {taskStaffs.map((staff) => (
                  <Tooltip key={staff.id} title={staff?.name} placement="top">
                    <Avatar
                      src={generateStaticAssetUrl(staff?.profile_image?.link)}
                      className=""
                      size={24}
                    />
                  </Tooltip>
                ))}
              </Avatar.Group>
            </div>
          ) : taskStaffs?.length > 0 ? (
            <div className="flex space-x-2 items-center justify-end">
              <p
                className={`mig-caption--bold ${
                  isPastDeadline ? "text-warning" : "text-mono30"
                }`}
              >
                {taskStaffs?.[0]?.name}
              </p>
              {taskStaffs?.[0]?.profile_image?.link ? (
                <img
                  src={generateStaticAssetUrl(
                    taskStaffs?.[0]?.profile_image?.link
                  )}
                  alt={taskStaffs?.[0]?.profile_image?.description}
                  className="w-6 h-6 bg-cover object-cover rounded-full"
                />
              ) : isPastDeadline ? (
                <div
                  className={`bg-warning rounded-full w-6 h-6 flex items-center justify-center`}
                >
                  <OneUserIconSvg size={12} color={"#ffffff"} />
                </div>
              ) : (
                <div
                  className={`bg-primary100 rounded-full w-6 h-6 flex items-center justify-center`}
                >
                  <OneUserIconSvg size={12} color={"#ffffff"} />
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
