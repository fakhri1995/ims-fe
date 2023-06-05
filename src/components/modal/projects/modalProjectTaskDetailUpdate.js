import { DeleteOutlined } from "@ant-design/icons";
import {
  Avatar,
  DatePicker,
  Form,
  Modal,
  Select,
  Spin,
  Switch,
  Tag,
  Tooltip,
  notification,
} from "antd";
import parse from "html-react-parser";
import moment from "moment";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { GROUPS_GET, USERS_GET } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import { generateStaticAssetUrl, momentFormatDate } from "../../../lib/helper";
import ButtonSys from "../../button";
import { EditSquareIconSvg, ExternalLinkIconSvg } from "../../icon";
import { ModalHapus2 } from "../modalCustom";
import ModalStaffList from "./modalStaffList";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ModalProjectTaskDetailUpdate = ({
  initProps,
  visible,
  onvisible,
  isAllowedToGetTask,
  isAllowedToUpdateTask,
  isAllowedToDeleteTask,
  isAllowedToGetProjects,
  isAllowedToGetProject,
  isAllowedToGetStatuses,
  setRefreshTasks,
  taskId,
  dataStatusList,
  isOutsideProject,
}) => {
  const { hasPermission } = useAccessControl();

  const isAllowedToGetUsers = hasPermission(USERS_GET);
  const isAllowedToGetGroups = hasPermission(GROUPS_GET);

  const [form] = Form.useForm();
  const rt = useRouter();
  const searchTimeoutRef = useRef(null);

  // 1. USE STATE
  // Current state: detail, edit
  const [currentState, setCurrentState] = useState("detail");
  const [isSwitchGroup, setIsSwitchGroup] = useState(false);
  const [isStaffsFromAgents, setIsStaffsFromAgents] = useState(false);

  const [dataTask, setDataTask] = useState({
    id: 0,
    name: "",
    status_id: 0,
    project_id: 0,
    start_date: "",
    end_date: "",
    task_staffs: [],
    description: "",
  });
  const [dataTaskUpdate, setDataTaskUpdate] = useState({});

  const [loadingDataTask, setLoadingDataTask] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalStaffs, setModalStaffs] = useState(false);

  // Option data
  const [dataProjectList, setDataProjectList] = useState([]);
  const [dataStaffsOrGroups, setDataStaffsOrGroups] = useState([]);

  // Selected data
  const [currentStatus, setCurrentStatus] = useState({});
  const [selectedGroups, setSelectedGroups] = useState([]);

  // 2. USE EFFECT
  // 2.1. Get Task Detail
  useEffect(() => {
    if (!isAllowedToGetTask) {
      permissionWarningNotification("Mendapatkan", "Detail Task Proyek");
      setLoadingDataTask(false);
      return;
    }

    if (taskId && visible) {
      setLoadingDataTask(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectTask?id=${taskId}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          if (res2.success) {
            setDataTask(res2.data);
          } else {
            notification.error({
              message: `${res2.message}`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
        })
        .finally(() => {
          setLoadingDataTask(false);
        });
    }
  }, [isAllowedToGetTask, taskId, visible]);

  useEffect(() => {
    if (visible) {
      let updatedTaskStaffs = dataTask?.task_staffs?.map((staff) => ({
        ...staff,
        key: Number(staff.id),
      }));
      setDataTaskUpdate({ ...dataTask, task_staffs: updatedTaskStaffs });
    }
  }, [dataTask, currentState]);

  // 2.2. Get project list
  useEffect(() => {
    if (!isAllowedToGetProjects) {
      permissionWarningNotification("Mendapatkan", "Daftar Proyek");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectsList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataProjectList(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      });
  }, [isAllowedToGetProjects]);

  // 2.3. Get users or groups for task staff options
  useEffect(() => {
    if (!visible || currentState !== "edit") {
      return;
    }

    const getStaffOptionsFromAgents = () => {
      setIsStaffsFromAgents(true);
      if (isSwitchGroup) {
        if (!isAllowedToGetGroups) {
          permissionWarningNotification("Mendapatkan", "Daftar Group");
          return;
        }
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterGroupsWithUsers`,
          {
            method: `GET`,
            headers: {
              Authorization: JSON.parse(initProps),
            },
          }
        )
          .then((res) => res.json())
          .then((res2) => {
            setDataStaffsOrGroups(res2.data);
          })
          .catch((err) =>
            notification.error({
              message: "Gagal mendapatkan daftar grup",
              duration: 3,
            })
          );
      } else {
        if (!isAllowedToGetUsers) {
          permissionWarningNotification("Mendapatkan", "Daftar User");
          return;
        }

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterUsers`, {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        })
          .then((res) => res.json())
          .then((res2) => {
            setDataStaffsOrGroups(res2.data);
          })
          .catch((err) =>
            notification.error({
              message: "Gagal mendapatkan daftar user",
              duration: 3,
            })
          );
      }
    };

    // If task doesn't have a project, then staff options will be taken from users (agent) or groups
    if (!dataTask.project_id) {
      getStaffOptionsFromAgents();
    } else {
      // If task has a project, then staff options will follow project's staff
      if (!isAllowedToGetProject) {
        permissionWarningNotification("Mendapatkan", "Detail Proyek");
        return;
      }
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProject?id=${dataTask.project_id}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          if (res2.data?.project_staffs?.length > 0) {
            setDataStaffsOrGroups(res2.data?.project_staffs);
          } else {
            // if project has no staff, then staff options will be taken from users (agent) or group
            getStaffOptionsFromAgents();
          }
        })
        .catch((err) => {
          notification.error({
            message: "Gagal mendapatkan daftar staff proyek",
            duration: 3,
          });
        });
    }
  }, [
    isAllowedToGetGroups,
    isAllowedToGetUsers,
    isSwitchGroup,
    dataTaskUpdate.project_id,
    currentState,
  ]);

  // 2.3. Get current status object
  useEffect(() => {
    const status = dataStatusList.find(
      (status) => status.id === dataTaskUpdate.status_id
    );
    setCurrentStatus(status);
  }, [dataStatusList, dataTaskUpdate.status_id]);

  // 3. HANDLER
  const clearData = () => {
    setDataTaskUpdate(dataTask);
    setSelectedGroups([]);
  };

  const handleClose = () => {
    onvisible(false);
    setModalDelete(false);
    setCurrentState("detail");
    clearData();
  };

  const onSearchUsers = (searchKey, setData) => {
    if (!isAllowedToGetUsers) {
      permissionWarningNotification("Mendapatkan", "Daftar User");
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setLoadingSave(true);
    searchTimeoutRef.current = setTimeout(() => {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterUsers?type=1&name=${searchKey}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setData(res2.data);
        })
        .catch((err) =>
          notification.error({
            message: "Gagal mendapatkan daftar user",
            duration: 3,
          })
        )
        .finally(() => setLoadingSave(false));
    }, 500);
  };

  const handleUpdateTaskStatus = (statusId) => {
    if (!isAllowedToUpdateTask) {
      permissionWarningNotification("Mengubah", "Status Task");
      return;
    }

    const payload = {
      id: dataTaskUpdate?.id,
      status_id: statusId,
    };

    setLoadingSave(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateProjectTask_status`, {
      method: `PUT`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          handleClose();
          notification.success({
            message: response.message,
            duration: 3,
          });
          setRefreshTasks((prev) => prev + 1);
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengubah status task. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingSave(false));
  };

  const handleUpdateTask = () => {
    if (!isAllowedToUpdateTask) {
      permissionWarningNotification("Mengubah", "Task");
      return;
    }

    const payload = {
      ...dataTaskUpdate,
      task_staffs: dataTaskUpdate.task_staffs?.map((staff) =>
        Number(staff.key)
      ),
    };

    setLoadingSave(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateProjectTask`, {
      method: `PUT`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          handleClose();
          notification.success({
            message: response.message,
            duration: 3,
          });
          setRefreshTasks((prev) => prev + 1);
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengubah task. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingSave(false));
  };

  const handleDeleteTask = () => {
    if (!isAllowedToDeleteTask) {
      permissionWarningNotification("Menghapus", "Task");
      return;
    }

    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteProjectTask?id=${taskId}`,
      {
        method: `DELETE`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          handleClose();
          notification.success({
            message: response.message,
            duration: 3,
          });
          setRefreshTasks((prev) => prev + 1);
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus task. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingDelete(false));
  };

  // Text Editor Config
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
    ],
  };
  const formats = [
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  // String of task staffs
  const lastIndexStaff = dataTask?.task_staffs?.length - 1;
  let staffsString =
    dataTask?.task_staffs?.length > 3
      ? dataTask?.task_staffs
          ?.slice(0, 3)
          ?.map((staff) => staff.name)
          ?.join(", ")
      : dataTask?.task_staffs
          ?.map((staff, index) =>
            index !== lastIndexStaff ? staff.name : null
          )
          ?.join(", ");

  // Switch modal body and footer according to current state
  let body, footer;
  switch (currentState) {
    case "detail":
      body = (
        <Spin spinning={loadingDataTask}>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="flex flex-col space-y-2">
              <p className="mig-caption--bold">Proyek:</p>
              <p>{dataTask.project?.name ?? "-"}</p>
            </div>
            {isOutsideProject && dataTask.project_id && (
              <button
                onClick={() => rt.push(`/projects/${dataTask?.project_id}`)}
                className="flex justify-end items-start bg-transparent "
                type="button"
                disabled={!isAllowedToGetProject}
              >
                <div className="flex space-x-2 items-center">
                  <ExternalLinkIconSvg color={"#35763B"} size={16} />
                  <p className="mig-caption--bold text-primary100 hover:text-primary75">
                    Lihat Proyek Terkait
                  </p>
                </div>
              </button>
            )}
            <div className="flex flex-col space-y-2 md:col-span-2">
              <p className="mig-caption--bold">Status:</p>
              <div>
                <Select
                  allowClear
                  value={dataTaskUpdate.status_id}
                  disabled={!isAllowedToGetStatuses}
                  placeholder="Ubah Status"
                  onChange={(value) => {
                    setDataTaskUpdate((prev) => ({
                      ...prev,
                      status_id: value,
                    }));
                    handleUpdateTaskStatus(value);
                  }}
                  optionFilterProp="children"
                  bordered={false}
                  className="mig-caption--bold bg-transparent hover:opacity-75 
                rounded-md px-2 py-1 "
                  style={{
                    backgroundColor: currentStatus?.color
                      ? currentStatus?.color + "20"
                      : "#E6E6E6",
                    color: currentStatus?.color ?? "#808080",
                  }}
                >
                  {dataStatusList.map((item) => (
                    <Select.Option
                      key={item?.id}
                      value={item?.id}
                      style={{
                        backgroundColor: (item?.color ?? "#E6E6E6") + "20",
                        color: item?.color ?? "#808080",
                      }}
                      className="rounded-md px-4 py-2 m-2"
                    >
                      {item?.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="mig-caption--bold">Tanggal Dimulai:</p>
              <p>
                {momentFormatDate(
                  dataTask.start_date,
                  "-",
                  "DD MMMM YYYY, HH:mm"
                )}
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="mig-caption--bold">Ekspektasi Tanggal Selesai:</p>
              <p>
                {momentFormatDate(
                  dataTask.end_date,
                  "-",
                  "DD MMMM YYYY, HH:mm"
                )}
              </p>
            </div>
            <div className="flex flex-col space-y-2 md:col-span-2">
              <p className="mig-caption--bold">Staff Task:</p>
              <div className="flex items-center space-x-2">
                {dataTask?.task_staffs?.length > 1 ? (
                  <div onClick={() => setModalStaffs(true)}>
                    <Avatar.Group
                      size={30}
                      maxCount={3}
                      className="cursor-pointer"
                      maxStyle={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                      }}
                    >
                      {dataTask?.task_staffs?.map((staff) => (
                        <Avatar
                          key={staff.id}
                          src={generateStaticAssetUrl(
                            staff?.profile_image?.link ??
                              "staging/Users/default_user.png"
                          )}
                          size={30}
                        />
                      ))}
                    </Avatar.Group>
                    {dataTask?.task_staffs?.length > 3 ? (
                      <p className="text-secondary100">
                        <strong>{staffsString}, </strong>
                        dan{" "}
                        <strong>
                          {dataTask?.task_staffs?.length - 3} lainnya{" "}
                        </strong>
                        merupakan staff task ini.
                      </p>
                    ) : (
                      <p className="text-secondary100">
                        <strong>{staffsString}</strong> dan{" "}
                        <strong>
                          {dataTask?.task_staffs?.[lastIndexStaff]?.name}
                        </strong>{" "}
                        merupakan staff task ini.
                      </p>
                    )}
                  </div>
                ) : dataTask?.task_staffs?.length > 0 ? (
                  <div className="flex space-x-2 items-center">
                    <img
                      src={generateStaticAssetUrl(
                        dataTask?.task_staffs?.[0]?.profile_image?.link ??
                          "staging/Users/default_user.png"
                      )}
                      alt={"Profile image"}
                      className="w-8 h-8 bg-cover object-cover rounded-full"
                    />

                    <p className={`mig-caption--medium text-mono50`}>
                      {dataTask?.task_staffs?.[0]?.name}
                    </p>
                  </div>
                ) : (
                  <div>-</div>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-2 md:col-span-2">
              <p className="mig-caption--bold">Deskripsi Task</p>
              <div>
                {dataTask.description ? parse(dataTask.description) : "-"}
              </div>
            </div>
          </div>
        </Spin>
      );

      footer = (
        <Spin spinning={loadingSave}>
          <ButtonSys
            fullWidth
            type={"primary"}
            onClick={() => setCurrentState("edit")}
            disabled={!isAllowedToUpdateTask}
          >
            <div className="flex space-x-2 items-center">
              <EditSquareIconSvg color={"#ffffff"} size={24} />
              <p>Edit Task</p>
            </div>
          </ButtonSys>
        </Spin>
      );

      break;

    case "edit":
      body = (
        <Form
          layout="vertical"
          form={form}
          className="grid md:grid-cols-2 md:gap-x-6"
        >
          <div className="md:col-span-2">
            <Form.Item label="Proyek" name={"project_id"}>
              <>
                <Select
                  allowClear
                  showSearch
                  value={dataTaskUpdate.project_id}
                  disabled={true}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.children ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {dataProjectList.map((item) => (
                    <Select.Option key={item?.id} value={item?.id}>
                      {item?.name}
                    </Select.Option>
                  ))}
                </Select>
              </>
            </Form.Item>
          </div>

          <div className="flex flex-col space-y-2 md:col-span-2 mb-4 md:mb-6">
            <p>Status</p>
            <div>
              <Select
                allowClear
                value={dataTaskUpdate.status_id}
                disabled={!isAllowedToGetStatuses}
                placeholder="Ubah Status"
                onChange={(value) => {
                  setDataTaskUpdate((prev) => ({
                    ...prev,
                    status_id: value,
                  }));
                }}
                optionFilterProp="children"
                bordered={false}
                className="mig-caption--bold bg-transparent hover:opacity-75 
                rounded-md px-2 py-1 "
                style={{
                  backgroundColor: currentStatus?.color
                    ? currentStatus?.color + "20"
                    : "#E6E6E6",
                  color: currentStatus?.color ?? "#808080",
                }}
              >
                {dataStatusList.map((item) => (
                  <Select.Option
                    key={item?.id}
                    value={item?.id}
                    style={{
                      backgroundColor: (item?.color ?? "#E6E6E6") + "20",
                      color: item?.color ?? "#808080",
                    }}
                    className="rounded-md px-4 py-2 m-2"
                  >
                    {item?.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <Form.Item label="Tanggal Dimulai" name={"start_date"}>
              <>
                <DatePicker
                  allowClear
                  allowEmpty
                  showTime={{
                    format: "HH:mm",
                  }}
                  value={
                    moment(dataTaskUpdate.start_date).isValid()
                      ? moment(dataTaskUpdate.start_date)
                      : null
                  }
                  placeholder={"Pilih Tanggal Mulai"}
                  style={{ width: `100%` }}
                  onChange={(dates, datestrings) => {
                    setDataTaskUpdate((prev) => ({
                      ...prev,
                      start_date: datestrings,
                    }));
                  }}
                />
              </>
            </Form.Item>
          </div>

          <div>
            <Form.Item label="Ekspektasi Tanggal Selesai" name={"end_date"}>
              <>
                <DatePicker
                  allowClear
                  allowEmpty
                  showTime={{
                    format: "HH:mm",
                  }}
                  value={
                    moment(dataTaskUpdate.end_date).isValid()
                      ? moment(dataTaskUpdate.end_date)
                      : null
                  }
                  placeholder={"Pilih Tanggal Selesai"}
                  style={{ width: `100%` }}
                  onChange={(dates, datestrings) => {
                    setDataTaskUpdate((prev) => ({
                      ...prev,
                      end_date: datestrings,
                    }));
                  }}
                />
              </>
            </Form.Item>
          </div>
          <div className="md:col-span-2">
            <div className="flex flex-col md:flex-row">
              <div className="w-full mb-2">
                <p className="mb-2">Staff Task</p>
                <Select
                  showSearch
                  mode="multiple"
                  className="dontShow"
                  value={
                    isSwitchGroup ? selectedGroups : dataTaskUpdate.task_staffs
                  }
                  disabled={!isAllowedToGetUsers}
                  placeholder={
                    isSwitchGroup ? "Cari Nama Grup..." : "Cari Nama Staff..."
                  }
                  style={{ width: `100%` }}
                  onSearch={(value) =>
                    isStaffsFromAgents &&
                    !isSwitchGroup &&
                    onSearchUsers(value, setDataStaffsOrGroups)
                  }
                  onChange={(value, option) => {
                    // use when group switch is on
                    const getStaffsFromGroups = () => {
                      let staffs = dataTaskUpdate?.task_staffs || [];
                      for (let group of option) {
                        for (let user of group?.users) {
                          if (
                            !staffs
                              ?.map((staff) => staff.key)
                              ?.includes(user.id)
                          ) {
                            let userWithKey = {
                              ...user,
                              key: Number(user?.id),
                            };
                            staffs.push(userWithKey);
                          }
                        }
                      }

                      return staffs;
                    };

                    // use when group switch is off
                    const getUpdatedStaffs = () => {
                      // cannot use "option" directly because the dropdown options are dynamic
                      let staffs = dataTaskUpdate?.task_staffs || [];
                      for (let user of option) {
                        if (
                          user?.key &&
                          !staffs
                            ?.map((staff) => Number(staff.key))
                            ?.includes(Number(user.key))
                        ) {
                          staffs.push(user);
                        }
                      }
                      return staffs;
                    };

                    if (isSwitchGroup) {
                      setSelectedGroups(option);
                    }

                    let newTaskStaffs = isSwitchGroup
                      ? getStaffsFromGroups()
                      : getUpdatedStaffs();

                    setDataTaskUpdate((prev) => ({
                      ...prev,
                      task_staffs: newTaskStaffs,
                    }));
                  }}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.children ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {dataStaffsOrGroups.map((item) => (
                    <Select.Option
                      key={Number(item?.id)}
                      value={Number(item?.id)}
                      position={item?.position}
                      users={item?.users}
                      name={item?.name}
                      profile_image={item?.profile_image}
                    >
                      {item?.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              {/* If task doesn't have a project, then show group switch */}
              {(!dataTaskUpdate.project_id || isStaffsFromAgents) && (
                <div className="flex space-x-2 items-center absolute right-6">
                  <p>Staff</p>
                  <Switch
                    checked={isSwitchGroup}
                    onChange={(checked) => {
                      setIsSwitchGroup(checked);
                    }}
                  />
                  <p>Group</p>
                </div>
              )}
            </div>

            {/* List of selected users */}
            <div className="flex flex-wrap mb-4">
              {dataTaskUpdate?.task_staffs?.map((staff, idx) => {
                return (
                  <Tag
                    key={staff.key}
                    closable
                    onClose={() => {
                      const newTags = dataTaskUpdate?.task_staffs?.filter(
                        (tag) => tag.key !== staff.key
                      );
                      setDataTaskUpdate((prev) => ({
                        ...prev,
                        task_staffs: newTags.map((tag) => tag),
                      }));
                    }}
                    className="flex items-center p-2 w-max mb-2"
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        src={generateStaticAssetUrl(
                          staff?.profile_image?.link ??
                            "staging/Users/default_user.png"
                        )}
                        alt={staff?.name}
                        className="w-6 h-6 bg-cover object-cover rounded-full"
                      />
                      <p className="truncate">
                        <strong>{staff?.name}</strong> - {staff?.position}
                      </p>
                    </div>
                  </Tag>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-2">
            <Form.Item label="Deskripsi Task" name={"description"}>
              <>
                <ReactQuill
                  theme="snow"
                  value={dataTaskUpdate.description}
                  modules={modules}
                  formats={formats}
                  className="h-44 pb-10"
                  onChange={(value) => {
                    setDataTaskUpdate((prev) => ({
                      ...prev,
                      description: value,
                    }));
                  }}
                />
              </>
            </Form.Item>
          </div>
        </Form>
      );

      footer = (
        <Spin spinning={loadingSave}>
          <div className="flex space-x-2 justify-end items-center">
            <button
              onClick={() => {
                setCurrentState("detail");
                clearData();
              }}
              className="bg-transparent text-mono50 py-2 px-6 hover:text-mono80"
            >
              Batal
            </button>
            <ButtonSys
              type={"primary"}
              onClick={handleUpdateTask}
              disabled={!isAllowedToUpdateTask}
            >
              Simpan
            </ButtonSys>
          </div>
        </Spin>
      );

      break;
  }

  return modalDelete ? (
    <ModalHapus2
      title={`Perhatian`}
      visible={modalDelete}
      onvisible={setModalDelete}
      onOk={handleDeleteTask}
      onCancel={() => {
        setModalDelete(false);
        onvisible(false);
      }}
      itemName={"task"}
      loading={loadingDelete}
    >
      <p className="mb-4">
        Apakah Anda yakin ingin menghapus task <strong>{dataTask?.name}</strong>
        ?
      </p>
    </ModalHapus2>
  ) : (
    <Modal
      title={
        currentState === "detail" ? (
          <div className="flex items-center justify-between mr-5">
            <p className="mig-heading--4">
              {dataTask.name} ({dataTask.ticket_number})
            </p>
            <ButtonSys
              type={"default"}
              color={"danger"}
              onClick={() => {
                setModalDelete(true);
              }}
              disabled={!isAllowedToDeleteTask}
            >
              <div className="flex space-x-2 items-center">
                <DeleteOutlined />
                <p>Hapus Task</p>
              </div>
            </ButtonSys>
          </div>
        ) : (
          <p className="mig-heading--4">
            {dataTask.name} ({dataTask.ticket_number})
          </p>
        )
      }
      visible={visible}
      onCancel={handleClose}
      maskClosable={false}
      footer={footer}
      loadingSave={loadingSave}
    >
      {body}

      <ModalStaffList
        visible={modalStaffs}
        onvisible={setModalStaffs}
        dataStaffs={dataTask?.task_staffs}
        taskName={dataTask?.name}
      />
    </Modal>
  );
};

export default ModalProjectTaskDetailUpdate;
