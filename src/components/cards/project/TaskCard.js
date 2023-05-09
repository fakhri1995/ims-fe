import React from "react";

import { generateStaticAssetUrl, momentFormatDate } from "../../../lib/helper";
import { InfoCircleIconSvg, OneUserIconSvg, UserIconSvg } from "../../icon";

const TaskCard = ({
  title,
  projectName,
  toDate,
  statusName,
  statusBgColor,
  statusTextColor,
  taskStaffs,
}) => {
  const currentDate = new Date();
  const deadline = new Date(toDate);
  const isPastDeadline = currentDate > deadline;
  return (
    <div className="shadow-lg rounded-md bg-white p-4 flex flex-col space-y-4">
      {isPastDeadline && (
        <div className="bg-warning bg-opacity-20 rounded-md p-1 flex space-x-2 items-center">
          <InfoCircleIconSvg color={"#BF4A40"} size={16} />
          <p className="text-warning text-[10px]">
            <strong>Task</strong> ini sudah melewati batas waktu yang telah
            ditentukan.{" "}
          </p>
        </div>
      )}
      <div className="flex space-x-2 justify-between">
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
            className={`${statusBgColor} ${statusTextColor} bg-opacity-20 rounded-md p-1 text-center`}
          >
            {statusName}
          </p>
        </div>
        <div className="flex flex-col justify-between">
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
          {taskStaffs.length > 1 ? (
            <div className="flex items-center justify-end">
              {/* TODO: change component to Avatar from antd */}
              {taskStaffs.map((staff) => (
                <img
                  key={staff.id}
                  src={generateStaticAssetUrl(staff?.profile_image?.link)}
                  alt={staff?.profile_image?.description}
                  className="w-6 h-6 bg-cover object-cover rounded-md -ml-2"
                />
              ))}
            </div>
          ) : (
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
                  className="w-6 h-6 bg-cover object-cover rounded-md"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
