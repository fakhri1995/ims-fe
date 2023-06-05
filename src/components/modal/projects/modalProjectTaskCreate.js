import {
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Switch,
  Tag,
  notification,
} from "antd";
import moment from "moment";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { GROUPS_GET, USERS_GET } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import { generateStaticAssetUrl } from "../../../lib/helper";
import ButtonSys from "../../button";
import { InfoCircleIconSvg, XIconSvg } from "../../icon";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ModalProjectTaskCreate = ({
  initProps,
  visible,
  onvisible,
  isAllowedToGetProject,
  isAllowedToAddTask,
  isAllowedToGetProjects,
  setRefreshTasks,
  defaultProject,
  isAddMyTask,
  dataProfile,
}) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToGetUsers = hasPermission(USERS_GET);
  const isAllowedToGetGroups = hasPermission(GROUPS_GET);
  const [form] = Form.useForm();
  const searchTimeoutRef = useRef(null);

  // 1. USE STATE
  const [dataTask, setDataTask] = useState({
    name: "",
    project_id: 0,
    start_date: "",
    end_date: "",
    task_staffs: [],
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [isDetailOn, setIsDetailOn] = useState(false);
  const [isSwitchGroup, setIsSwitchGroup] = useState(false);
  const [isStaffsFromAgents, setIsStaffsFromAgents] = useState(false);

  const [dataProjectList, setDataProjectList] = useState([]);
  const [dataStaffsOrGroups, setDataStaffsOrGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);

  // 2. USE EFFECT
  // 2.1. Set default project if used in project detail page
  useEffect(() => {
    setDataTask((prev) => ({ ...prev, project_id: defaultProject?.id }));
  }, [defaultProject]);

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
    if (!visible) {
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
    dataTask.project_id,
    visible,
  ]);

  // 2.4. Auto fill task staff with self user id (in Tambah Task Saya)
  useEffect(() => {
    if (visible && isAddMyTask) {
      const selfUserObj = {
        key: Number(dataProfile?.data?.id),
        id: Number(dataProfile?.data?.id),
        name: dataProfile?.data?.name,
        position: dataProfile?.data?.position,
        profile_image: dataProfile?.data?.profile_image,
      };
      setDataTask((prev) => ({ ...prev, task_staffs: [selfUserObj] }));
    }
  }, [visible]);

  // 3. HANDLER
  const clearData = () => {
    setDataTask({
      ...dataTask,
      name: "",
      start_date: "",
      end_date: "",
      task_staffs: [],
      description: "",
    });
    setSelectedGroups([]);
    form.resetFields();
  };

  const handleClose = () => {
    onvisible(false);
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

    setLoading(true);
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
        .finally(() => setLoading(false));
    }, 500);
  };

  const handleAddTask = () => {
    if (!isAllowedToAddTask) {
      permissionWarningNotification("Menambah", "Task");
      return;
    }

    const payload = {
      ...dataTask,
      task_staffs: dataTask?.task_staffs?.map((staff) => Number(staff.key)),
    };

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addProjectTask`, {
      method: `POST`,
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
          message: `Gagal menambahkan task baru. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
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

  return (
    <Modal
      title={
        <div className="flex flex-col space-y-2 ">
          <p>Tambah Task Baru</p>
          <p className="text-warning text-[12px] italic">
            * Field ini harus diisi
          </p>
        </div>
      }
      visible={visible}
      onCancel={() => {
        clearData();
        onvisible(false);
      }}
      maskClosable={false}
      footer={
        <Spin spinning={loading}>
          <div className="flex space-x-2 justify-end items-center">
            <button
              onClick={() => onvisible(false)}
              className="bg-transparent text-mono50 py-2 px-6 hover:text-mono80"
            >
              Batal
            </button>
            <ButtonSys
              type={"primary"}
              onClick={handleAddTask}
              disabled={!isAllowedToAddTask || !dataTask.name}
            >
              <p>Tambah Task</p>
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="Proyek" name={"project_id"}>
          <Select
            allowClear
            showSearch
            defaultValue={dataTask.project_id}
            disabled={!isAllowedToGetProjects}
            placeholder="Pilih Proyek"
            style={{ width: `100%` }}
            onChange={(value) => {
              setDataTask((prev) => ({
                ...prev,
                project_id: value,
                task_staffs: [],
              }));
              setIsSwitchGroup(false);
              setSelectedGroups([]);
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
        </Form.Item>
        <div className="text-notice flex space-x-2 items-center mb-6">
          <InfoCircleIconSvg color={"#DDB44A"} size={16} />
          <p className="text-xs">
            Kosongkan proyek jika task yang ditambah tidak terafiliasi dengan
            proyek manapun.
          </p>
        </div>
        <Form.Item
          label="Nama Task"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Nama task wajib diisi",
            },
          ]}
        >
          <Input
            name={"name"}
            placeholder="Masukkan nama task"
            value={dataTask.name}
            onChange={(e) =>
              setDataTask((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </Form.Item>

        <div className="flex justify-between items-center mb-6">
          <p>Tampilkan field lainnya</p>
          <Switch
            checked={isDetailOn}
            onChange={(checked) => setIsDetailOn(checked)}
          />
        </div>

        {isDetailOn && (
          <div>
            <Form.Item label="Tanggal Dimulai" name={"start_date"}>
              <DatePicker
                allowClear
                allowEmpty
                showTime={{
                  format: "HH:mm",
                }}
                value={
                  dataTask.start_date === ""
                    ? null
                    : moment(dataTask.start_date)
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
            </Form.Item>
            <Form.Item label="Tanggal Selesai" name={"end_date"}>
              <DatePicker
                allowClear
                allowEmpty
                showTime={{
                  format: "HH:mm",
                }}
                value={
                  dataTask.end_date === "" ? null : moment(dataTask.end_date)
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
            </Form.Item>

            <div className="flex flex-col md:flex-row">
              <div className="w-full mb-2">
                <p className="mb-2">Staff Task</p>
                <Select
                  showSearch
                  mode="multiple"
                  className="dontShow"
                  value={isSwitchGroup ? selectedGroups : dataTask?.task_staffs}
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
                    const getStaffsFromGroups = () => {
                      let staffs = dataTask?.task_staffs;
                      for (let group of option) {
                        for (let user of group?.users) {
                          if (
                            !staffs
                              ?.map((staff) => staff.name)
                              ?.includes(user.name)
                          ) {
                            let userWithKey = { ...user, key: user?.id };
                            staffs.push(userWithKey);
                          }
                        }
                      }
                      return staffs;
                    };

                    if (isSwitchGroup) {
                      setSelectedGroups(option);
                    }

                    let newTaskStaffs = isSwitchGroup
                      ? getStaffsFromGroups()
                      : option;

                    setDataTask((prev) => ({
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
                  {dataStaffsOrGroups.map((item) => {
                    return (
                      <Select.Option
                        key={item?.id}
                        value={item.id}
                        position={item?.position}
                        users={item?.users}
                        name={item?.name}
                        profile_image={item?.profile_image}
                      >
                        {item?.name}
                      </Select.Option>
                    );
                  })}
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
                    }}
                  />
                  <p>Group</p>
                </div>
              )}
            </div>

            {/* List of selected users */}
            <div className="flex flex-wrap mb-4">
              {dataTask?.task_staffs?.map((staff, idx) => {
                return (
                  <Tag
                    key={staff.key}
                    closable
                    onClose={() => {
                      const newTags = dataTask?.task_staffs?.filter(
                        (tag) => tag.key !== staff.key
                      );
                      setDataTask((prev) => ({
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

            <Form.Item label="Deskripsi Task" name={"description"}>
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
            </Form.Item>
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default ModalProjectTaskCreate;
