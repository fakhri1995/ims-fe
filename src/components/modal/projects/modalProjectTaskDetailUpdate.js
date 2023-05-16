import {
  DatePicker,
  Form,
  Modal,
  Select,
  Spin,
  Switch,
  Tag,
  notification,
} from "antd";
import parse from "html-react-parser";
import moment from "moment";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { GROUPS_GET, USERS_GET } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import { generateStaticAssetUrl, momentFormatDate } from "../../../lib/helper";
import ButtonSys from "../../button";
import { EditIconSvg, EditSquareIconSvg } from "../../icon";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ModalProjectTaskDetailUpdate = ({
  initProps,
  visible,
  onvisible,
  isAllowedToGetTask,
  isAllowedToUpdateTask,
  isAllowedToGetProjects,
  isAllowedToGetProject,
  isAllowedToGetStatuses,
  setRefresh,
  taskId,
  dataStatusList,
  dataProjectList,
}) => {
  const { hasPermission } = useAccessControl();

  const isAllowedToGetUsers = hasPermission(USERS_GET);
  const isAllowedToGetGroups = hasPermission(GROUPS_GET);

  const [form] = Form.useForm();

  // 1. USE STATE
  // Current state: detail, edit
  const [currentState, setCurrentState] = useState("detail");
  const [isSwitchGroup, setIsSwitchGroup] = useState(false);
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

  const [loadingDataTask, setLoadingDataTask] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  // Option data
  const [dataStaffsOrGroups, setDataStaffsOrGroups] = useState([]);

  // Selected data
  const [selectedStaffsOrGroups, setSelectedStaffsOrGroups] = useState([]);
  const [currentStatus, setCurrentStatus] = useState({});

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

  // 2.2. Get users or groups for task staff options
  useEffect(() => {
    if (!visible || currentState !== "edit") {
      return;
    }

    // If task has a project, then staff options will follow project's staff
    if (dataTask.project_id) {
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
          setDataStaffsOrGroups(res2.data?.project_staffs);
        })
        .catch((err) =>
          notification.error({
            message: "Gagal mendapatkan daftar staff proyek",
            duration: 3,
          })
        );
      return;
    }

    // If task doesn't have a project, then staff options will be taken from users (agent) or groups
    if (isSwitchGroup) {
      if (!isAllowedToGetGroups) {
        permissionWarningNotification("Mendapatkan", "Daftar Group");
        return;
      }
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterGroups`, {
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
  }, [
    isAllowedToGetGroups,
    isAllowedToGetUsers,
    isSwitchGroup,
    dataTask.project_id,
    currentState,
  ]);

  // 2.3. Get current status object
  useEffect(() => {
    const status = dataStatusList.find(
      (status) => status.id === dataTask.status_id
    );
    setCurrentStatus(status);
  }, [dataStatusList, dataTask.status_id]);

  // 3. HANDLER
  const clearData = () => {
    setDataTask({
      id: 0,
      name: "",
      project_id: 0,
      start_date: "",
      end_date: "",
      task_staffs: [],
      description: "",
    });
    form.resetFields();
    setSelectedStaffsOrGroups([]);
  };

  const handleClose = () => {
    onvisible(false);
    setCurrentState("detail");
    clearData();
  };

  const handleUpdateTask = () => {
    if (!isAllowedToUpdateTask) {
      permissionWarningNotification("Mengubah", "Task");
      return;
    }

    // const taskStaffsPayload = dataTask.task_staffs?.map((staff) => staff.id);
    // const payload = { ...dataTask, task_staffs: taskStaffsPayload };

    setLoadingSave(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateProjectTask`, {
      method: `PUT`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataTask),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          handleClose();
          notification.success({
            message: response.message,
            duration: 3,
          });
          setRefresh((prev) => prev + 1);
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

  // Switch modal body and footer according to current state
  let body, footer;
  switch (currentState) {
    case "detail":
      body = (
        <Spin spinning={loadingDataTask}>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="flex flex-col space-y-2 md:col-span-2">
              <p className="mig-caption--bold">Proyek:</p>
              <p>{dataTask.project?.name ?? "-"}</p>
            </div>
            <div className="flex flex-col space-y-2 md:col-span-2">
              <p className="mig-caption--bold">Status:</p>
              <p
                className="px-4 py-2 rounded-md w-max"
                style={{
                  backgroundColor: currentStatus?.color
                    ? currentStatus?.color + "20"
                    : "#E6E6E6",
                  color: currentStatus?.color ?? "#808080",
                }}
              >
                {currentStatus?.name ?? "-"}
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="mig-caption--bold">Tanggal Dimulai:</p>
              <p>{momentFormatDate(dataTask.start_date, "-")}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="mig-caption--bold">Ekspektasi Tanggal Selesai:</p>
              <p>{momentFormatDate(dataTask.end_date, "-")}</p>
            </div>
            <div className="flex flex-col space-y-2 md:col-span-2">
              <p className="mig-caption--bold">Staff Task:</p>
              <div className="flex">
                {dataTask?.task_staffs?.length > 0 ? (
                  dataTask?.task_staffs?.map((staff) => (
                    <li
                      key={staff.id}
                      className="flex space-x-2 items-center p-2"
                    >
                      <img
                        src={generateStaticAssetUrl(staff?.profile_image?.link)}
                        alt={staff?.profile_image?.description}
                        className="w-8 h-8 bg-cover object-cover rounded-md"
                      />
                      <p>
                        <strong>{staff?.name}</strong> - {staff?.position}
                      </p>
                    </li>
                  ))
                ) : (
                  <p>-</p>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-2 md:col-span-2">
              <p className="mig-caption--bold">Deskripsi Task</p>
              <p>{dataTask.description ? parse(dataTask.description) : "-"}</p>
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
                  value={dataTask.project_id}
                  disabled={!isAllowedToGetProjects}
                  onChange={(value) => {
                    setDataTask((prev) => ({
                      ...prev,
                      project_id: value,
                    }));
                  }}
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
            <div className="flex space-x-2 items-center">
              <p
                style={{
                  backgroundColor: currentStatus?.color
                    ? currentStatus?.color + "20"
                    : "#E6E6E6",
                  color: currentStatus?.color ?? "#808080",
                }}
                className="rounded-md px-4 py-2"
              >
                {currentStatus?.name ?? "-"}
              </p>
              <Select
                allowClear
                value={dataTask.status_id}
                disabled={!isAllowedToGetStatuses}
                placeholder="Ubah Status"
                onChange={(value) => {
                  setDataTask((prev) => ({
                    ...prev,
                    status_id: value,
                  }));
                }}
                optionFilterProp="children"
                bordered={false}
                size="small"
                className="mig-caption--bold text-secondary100 bg-transparent 
                hover:opacity-75 dontShow"
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
                    moment(dataTask.start_date).isValid()
                      ? moment(dataTask.start_date)
                      : null
                  }
                  placeholder={"Pilih Tanggal Mulai"}
                  style={{ width: `100%` }}
                  onChange={(dates, datestrings) => {
                    setDataTask((prev) => ({
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
                    moment(dataTask.end_date).isValid()
                      ? moment(dataTask.end_date)
                      : null
                  }
                  placeholder={"Pilih Tanggal Selesai"}
                  style={{ width: `100%` }}
                  onChange={(dates, datestrings) => {
                    setDataTask((prev) => ({
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
                  allowClear
                  showSearch
                  mode="multiple"
                  className="dontShow"
                  value={dataTask.task_staffs}
                  disabled={!isAllowedToGetUsers}
                  placeholder={
                    isSwitchGroup ? "Cari Nama Grup..." : "Cari Nama Staff..."
                  }
                  style={{ width: `100%` }}
                  onChange={(value, option) => {
                    setSelectedStaffsOrGroups(option);
                    setDataTask((prev) => ({
                      ...prev,
                      task_staffs: value,
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
                      key={item?.id}
                      value={item?.id}
                      position={item?.position}
                      image={generateStaticAssetUrl(item.profile_image?.link)}
                    >
                      {item?.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              {/* If task doesn't have a project, then show group switch */}
              {!dataTask.project_id && (
                <div className="flex space-x-2 items-center absolute right-6">
                  <p>Staff</p>
                  <Switch
                    checked={isSwitchGroup}
                    onChange={(checked) => {
                      setIsSwitchGroup(checked);
                      setSelectedStaffsOrGroups([]);
                      setDataTask((prev) => ({
                        ...prev,
                        task_staffs: [],
                      }));
                    }}
                  />
                  <p>Group</p>
                </div>
              )}
            </div>

            {/* List of selected users or groups */}
            <div className="flex flex-wrap mb-4">
              {selectedStaffsOrGroups.map((staff, idx) => {
                return (
                  <Tag
                    key={staff.key}
                    closable
                    onClose={() => {
                      const newTags = selectedStaffsOrGroups.filter(
                        (tag) => tag.key !== staff.key
                      );
                      setSelectedStaffsOrGroups(newTags);
                      setDataTask((prev) => ({
                        ...prev,
                        task_staffs: newTags.map((tag) => tag.value),
                      }));
                    }}
                    className="flex items-center p-2 w-max mb-2"
                  >
                    {isSwitchGroup ? (
                      // Group Tag
                      <div className="flex items-center space-x-2">
                        <p className="truncate">
                          <strong>{staff?.children}</strong>
                        </p>
                      </div>
                    ) : (
                      // User Tag
                      <div className="flex items-center space-x-2">
                        <img
                          src={generateStaticAssetUrl(staff?.image)}
                          alt={staff?.children}
                          className="w-6 h-6 bg-cover object-cover rounded-full"
                        />
                        <p className="truncate">
                          <strong>{staff?.children}</strong> - {staff?.position}
                        </p>
                      </div>
                    )}
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
                  value={dataTask.description}
                  modules={modules}
                  formats={formats}
                  className="h-44 pb-10"
                  onChange={(value) => {
                    setDataTask((prev) => ({
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
              onClick={() => setCurrentState("detail")}
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
  return (
    <Modal
      title={<p className="mig-heading--4">{dataTask.name}</p>}
      visible={visible}
      onCancel={handleClose}
      maskClosable={false}
      footer={footer}
      loadingSave={loadingSave}
    >
      {body}
    </Modal>
  );
};

export default ModalProjectTaskDetailUpdate;
