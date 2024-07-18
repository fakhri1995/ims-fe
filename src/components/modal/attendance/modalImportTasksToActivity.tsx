import { SearchOutlined } from "@ant-design/icons";
import { Checkbox, Empty, Input, Modal, notification } from "antd";
import QueryString from "qs";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

import ButtonSys from "components/button";
import { FileImportIconSvg } from "components/icon";
import { DataEmptyState } from "components/states/DataEmptyState";

import { useAccessControl } from "contexts/access-control";

import {
  ATTENDANCE_TASK_ACTIVITIES_GET,
  ATTENDANCE_TASK_ACTIVITY_ADD,
} from "lib/features";
import {
  notificationError,
  notificationSuccess,
  permissionWarningNotification,
} from "lib/helper";

import ModalCore from "../modalCore";

const ModalImportTasksToActivity = ({
  visible,
  onvisible,
  dataToken,
  queryParams,
  displayDataTaskToday,
  onChangeSearch,
}) => {
  const queryClient = useQueryClient();
  const { hasPermission } = useAccessControl();

  const isAllowedToAddTaskActivities = hasPermission(
    ATTENDANCE_TASK_ACTIVITY_ADD
  );
  const isAllowedToGetTaskActivities = hasPermission(
    ATTENDANCE_TASK_ACTIVITIES_GET
  );

  // 1. USE STATE
  const [dataTaskSelected, setDataTaskSelected] = useState([]);
  const [displayDataImport, setDisplayDataImport] = useState([]);

  useEffect(() => {
    getDataModal();
  }, [
    queryParams.page,
    queryParams.rows,
    queryParams.keyword,
    isAllowedToGetTaskActivities,
    displayDataTaskToday,
  ]);

  // 3. HANDLER
  const getDataModal = () => {
    if (!isAllowedToGetTaskActivities) {
      permissionWarningNotification("Mendapatkan", "Daftar Task");
      return;
    } else {
      const payload = QueryString.stringify(queryParams, {
        addQueryPrefix: true,
      });
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectTasks${payload}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(dataToken),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          if (res2.success) {
            let datafromapi = res2.data.data;
            let dataTemp = [];

            const importedTaskIds = displayDataTaskToday.map(
              (item) => item.task_id
            );

            for (let a = 0; a < datafromapi.length; a++) {
              // Filter task which has not been added to activity
              if (!importedTaskIds.includes(datafromapi[a].id)) {
                dataTemp.push({
                  id: datafromapi[a].id,
                  ticket_number: datafromapi[a].ticket_number,
                  name: datafromapi[a].name,
                  start_date: datafromapi[a].start_date,
                  project_name: datafromapi[a].project
                    ? datafromapi[a].project.name
                    : null,
                  end_date: datafromapi[a].end_date,
                  is_selected: false,
                });
              }
            }
            setDisplayDataImport(dataTemp);
          }
        });
    }
  };

  const handleOnSelectTask = (value) => {
    let dataTaskTemp = [];
    for (let a = 0; a < displayDataImport.length; a++) {
      if (value.target.value == displayDataImport[a].id) {
        dataTaskTemp.push({
          id: displayDataImport[a].id,
          ticket_number: displayDataImport[a].ticket_number,
          name: displayDataImport[a].name,
          project_name: displayDataImport[a].project_name,
          start_date: displayDataImport[a].start_date,
          end_date: displayDataImport[a].end_date,
          is_selected: value.target.checked,
        });
      } else {
        dataTaskTemp.push({
          id: displayDataImport[a].id,
          ticket_number: displayDataImport[a].ticket_number,
          name: displayDataImport[a].name,
          project_name: displayDataImport[a].project_name,
          start_date: displayDataImport[a].start_date,
          end_date: displayDataImport[a].end_date,
          is_selected: displayDataImport[a].is_selected,
        });
      }

      //check selected
    }
    let dataTemp = dataTaskSelected;
    if (dataTemp.length == 0) {
      dataTemp.push(value.target.value);
    } else if (displayDataImport.length >= 1) {
      if (value.target.checked == false) {
        dataTemp = dataTemp.filter(function (item) {
          return item !== value.target.value;
        });
      } else {
        dataTemp.push(value.target.value);
      }
      setDataTaskSelected(dataTemp);
    }
    setDisplayDataImport([...dataTaskTemp]);
  };

  const handleSelectAllTask = () => {
    let dataTemp = [];
    let dataTemp2 = [];
    for (let a = 0; a < displayDataImport.length; a++) {
      dataTemp.push(displayDataImport[a].id);
      dataTemp2.push({
        id: displayDataImport[a].id,
        ticket_number: displayDataImport[a].ticket_number,
        name: displayDataImport[a].name,
        project_name: displayDataImport[a].project_name,
        start_date: displayDataImport[a].start_date,
        end_date: displayDataImport[a].end_date,
        is_selected: true,
      });
    }
    setDataTaskSelected(dataTemp);
    setDisplayDataImport(dataTemp2);
  };

  const handleUnSelectAllTask = () => {
    let dataTaskTemp = [];
    for (let a = 0; a < displayDataImport.length; a++) {
      dataTaskTemp.push({
        id: displayDataImport[a].id,
        ticket_number: displayDataImport[a].ticket_number,
        name: displayDataImport[a].name,
        project_name: displayDataImport[a].project_name,
        start_date: displayDataImport[a].start_date,
        end_date: displayDataImport[a].end_date,
        is_selected: false,
      });
    }
    setDataTaskSelected([]);
    setDisplayDataImport(dataTaskTemp);
  };

  const handleSelectTask = () => {
    if (dataTaskSelected.length == displayDataImport.length) {
      handleUnSelectAllTask();
    } else {
      handleSelectAllTask();
    }
  };

  const handleCloseModalImportTask = () => {
    onvisible(false);
    handleUnSelectAllTask();
  };

  const importMultipleTask = () => {
    if (!isAllowedToAddTaskActivities) {
      permissionWarningNotification("Menambahkan", "Task ke Aktivitas");
      return;
    }

    if (dataTaskSelected.length > 0) {
      let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/addAttendanceTaskActivities`;
      let method = "POST";
      let payload = {
        task_ids: dataTaskSelected,
      };

      fetch(url, {
        method: method,
        headers: {
          Authorization: JSON.parse(dataToken),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((response2) => {
          if (response2.success) {
            notificationSuccess({
              message: (
                <>
                  {" "}
                  <p>Successfully add task to activity</p>
                </>
              ),

              duration: 3,
            });
            queryClient.invalidateQueries(ATTENDANCE_TASK_ACTIVITIES_GET);
            handleCloseModalImportTask();
          } else {
            notificationError({
              message: response2.message,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          notificationError({
            message: `Failed to add task to activity`,
            duration: 3,
          });
          // setLoadingAdd(false);
        });
    }
  };

  return (
    <ModalCore
      title="Import Tasks to Activity"
      visible={visible}
      onOk={() => importMultipleTask()}
      loading={false}
      buttonOkText="Import Selected Task"
      onCancel={handleCloseModalImportTask}
      buttonCancelText="Cancel"
      disabled={dataTaskSelected.length < 1}
      width={502}
    >
      <div>
        <div className="col-span-4">
          <Input
            style={{ width: `100%` }}
            suffix={<SearchOutlined />}
            defaultValue={queryParams.keyword}
            placeholder="Search Task.."
            onChange={onChangeSearch}
            allowClear
          />
        </div>
        <div className={"my-4 flex justify-between"}>
          <p className={"mig-body--bold"}>Task List</p>
          {displayDataImport.length > 0 && (
            <button
              className={"bg-transparent"}
              onClick={() => handleSelectTask()}
            >
              <p className={"text-primary100 mig-body--bold"}>
                {dataTaskSelected.length == displayDataImport.length
                  ? "Deselect All"
                  : "Select All"}
              </p>
            </button>
          )}
        </div>

        {displayDataImport.length > 0 ? (
          <div className="flex flex-col gap-4">
            {displayDataImport.map((task, index) => (
              <div
                key={task.id}
                className={
                  "flex px-4 py-2 border rounded-md border-inputkategori"
                }
              >
                <div className={"w-11/12"}>
                  <p
                    className={"text-xs font-bold text-mono30"}
                    style={{ lineHeight: "20px" }}
                  >
                    {task.name} T-{task.id}
                  </p>
                  <p
                    className={"text-xs text-mono50"}
                    style={{ lineHeight: "16px" }}
                  >
                    [{task.project_name ? task.project_name : " - "}]
                  </p>
                </div>
                <div className={"w-1/12 self-center items-end"}>
                  <Checkbox
                    key={task.id}
                    value={task.id}
                    checked={task.is_selected}
                    onChange={(e) => {
                      handleOnSelectTask(e);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <DataEmptyState />
        )}
      </div>
    </ModalCore>
  );
};

export default ModalImportTasksToActivity;
