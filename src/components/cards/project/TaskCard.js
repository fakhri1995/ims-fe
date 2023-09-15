import { Avatar, Tooltip, notification } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";

import { AccessControl } from "../../../components/features/AccessControl";
import { useAccessControl } from "../../../contexts/access-control";
import { ATTENDANCE_TASK_ACTIVITY_ADD } from "../../../lib/features";
import {
  generateStaticAssetUrl,
  momentFormatDate,
  permissionWarningNotification,
} from "../../../lib/helper";
import {
  InfoCircleIconSvg,
  OneUserIconSvg,
  PlusIconSvg,
  SquarePlusIconSvg,
  UserIconSvg,
} from "../../icon";

const TaskCard = ({
  title,
  idTask,
  taskId,
  projectName,
  toDate,
  status,
  taskStaffs,
  dataProfile,
  initProps,
  onClick,
}) => {
  const currentDate = new Date();
  const deadline = new Date(toDate ?? "0000-00-00 00:00:00");
  const isPastDeadline = Boolean(currentDate > deadline && status?.is_active);
  const rt = useRouter();
  const { hasPermission } = useAccessControl();
  const isAllowedToAddTaskActivities = hasPermission(
    ATTENDANCE_TASK_ACTIVITY_ADD
  );
  function checkTask() {
    // console.log('current task ',taskStaffs)
    // console.log('current profile ',dataProfile)
    if (taskStaffs.length > 0) {
      let check = 0;
      for (let a = 0; a < taskStaffs.length; a++) {
        if (taskStaffs[a].id == dataProfile.data.id) {
          return true;
        }
      }
      if (check == 0) {
        return false;
      }
    } else {
      return false;
    }
  }

  const notifAdd = () => {
    rt.push(`/attendance/staff`);
  };

  const addAktifitas = (idTask) => {
    console.log("hasil initprops ", initProps);
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/addAttendanceTaskActivity`;
    let method = "POST";
    let payload = {
      task_id: idTask,
    };

    fetch(url, {
      method: method,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response2) => {
        console.log("response add inventory ", response2);
        if (response2.success) {
          notification.success({
            message: (
              <>
                {" "}
                <p>
                  Task berhasil ditambahkan ke aktivitas{" "}
                  <p
                    style={{ lineHeight: "20px", fontWeight: "700" }}
                    className={"text-primary100 text-sm hover:cursor-pointer"}
                    onClick={() => notifAdd()}
                  >
                    Lihat aktivitas
                  </p>
                </p>
              </>
            ),

            duration: 3,
          });
        } else {
          console.log("masuk ini bro ", response2);
          notification.error({
            message: response2.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Task Gagal ditambahkan ke aktivitas`,
          duration: 3,
        });
        // setLoadingAdd(false);
      });
  };
  return (
    <div className={"bg-white h-full  shadow-lg rounded-md testhover"}>
      <div
        onClick={onClick}
        className="grid grid-cols-1 space-y-4 px-4 py-6 md:p-3 hover:cursor-pointer"
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
        <div className="grid grid-cols-6 gap-2 ">
          <div className="col-span-4 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <h4
                className={`mig-heading--4 ${isPastDeadline && "text-warning"}`}
              >
                {title} ({taskId})
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
                backgroundColor: status?.color
                  ? status?.color + "20"
                  : "#E6E6E6",
                color: status?.color ?? "#808080",
              }}
            >
              {status?.name ?? "-"}
            </p>
          </div>
          <div className="col-span-2 flex flex-col justify-between">
            {moment(toDate).isValid() ? (
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
            ) : (
              <div />
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
                        src={generateStaticAssetUrl(
                          staff?.profile_image?.link ??
                            "staging/Users/default_user.png"
                        )}
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
                      taskStaffs?.[0]?.profile_image?.link ??
                        "staging/Users/default_user.png"
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
      {checkTask() &&
        (isAllowedToAddTaskActivities ? (
          <div
            onClick={() => addAktifitas(idTask)}
            className={
              "w-full bg-primary100 mt-4 py-2 flex justify-center rounded-b-[5px] hover:cursor-pointer testhoverbutton"
            }
          >
            <div className={"flex justify-center"}>
              <PlusIconSvg color={"white"} size={20} />
              <p className={"text-white text-xs ml-2.5 self-center"}>
                Tambahkan ke Aktifitas
              </p>
            </div>
          </div>
        ) : (
          <div></div>
        ))}
    </div>
  );
};

export default TaskCard;
