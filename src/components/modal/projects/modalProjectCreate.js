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
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { GROUPS_GET, USERS_GET } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import { generateStaticAssetUrl } from "../../../lib/helper";
import ButtonSys from "../../button";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ModalProjectCreate = ({
  initProps,
  visible,
  onvisible,
  isAllowedToAddProject,
}) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToGetUsers = hasPermission(USERS_GET);
  const isAllowedToGetGroups = hasPermission(GROUPS_GET);
  const [form] = Form.useForm();
  const rt = useRouter();
  const searchTimeoutRef = useRef(null);

  // 1. USE STATE
  const [dataProject, setDataProject] = useState({
    name: "",
    start_date: "",
    end_date: "",
    project_staffs: [],
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [isDetailOn, setIsDetailOn] = useState(false);
  const [isSwitchGroup, setIsSwitchGroup] = useState(false);

  const [dataStaffsOrGroups, setDataStaffsOrGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);

  // 2 USE EFFECT
  // 2.1. Get users or groups for task staff options
  useEffect(() => {
    if (!visible) {
      return;
    }

    if (isSwitchGroup) {
      if (!isAllowedToGetGroups) {
        permissionWarningNotification("Mendapatkan", "Daftar Group");
        return;
      }
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getFilterGroupsWithUsers`, {
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
  }, [isAllowedToGetGroups, isAllowedToGetUsers, isSwitchGroup, visible]);

  // 3. HANDLER
  const clearData = () => {
    setDataProject({
      name: "",
      start_date: "",
      end_date: "",
      project_staffs: [],
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

  const handleAddProject = () => {
    if (!isAllowedToAddProject) {
      permissionWarningNotification("Menambah", "Proyek");
      return;
    }

    const payload = {
      ...dataProject,
      project_staffs: dataProject?.project_staffs?.map((staff) =>
        Number(staff.key)
      ),
    };

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addProject`, {
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
          rt.push(`projects/${response?.data?.id}`);
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan proyek baru. ${err.response}`,
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
          <p>Tambah Proyek Baru</p>
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
              onClick={handleClose}
              className="bg-transparent text-mono50 py-2 px-6 hover:text-mono80"
            >
              Batal
            </button>
            <ButtonSys
              type={"primary"}
              onClick={handleAddProject}
              disabled={!isAllowedToAddProject || !dataProject.name}
            >
              <p>Tambah Proyek</p>
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Nama Proyek"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Nama proyek wajib diisi",
            },
          ]}
        >
          <Input
            name={"name"}
            placeholder="Masukkan nama proyek"
            value={dataProject.name}
            onChange={(e) =>
              setDataProject((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </Form.Item>

        <div className="flex justify-between items-center mb-6">
          <p>Tambahkan Detail Proyek lainnya</p>
          <Switch
            checked={isDetailOn}
            onChange={(checked) => setIsDetailOn(checked)}
          ></Switch>
        </div>

        {isDetailOn && (
          <div>
            <Form.Item label="Tanggal Dimulai" name={"start_date"}>
              <DatePicker
                allowClear
                allowEmpty
                value={
                  dataProject.start_date === ""
                    ? null
                    : moment(dataProject.start_date)
                }
                placeholder={"Pilih Tanggal Mulai"}
                style={{ width: `100%` }}
                onChange={(dates, datestrings) => {
                  setDataProject((prev) => ({
                    ...prev,
                    start_date: datestrings,
                  }));
                }}
              />
            </Form.Item>
            <Form.Item label="Ekspektasi Tanggal Selesai" name={"end_date"}>
              <DatePicker
                allowClear
                allowEmpty
                value={
                  dataProject.end_date === ""
                    ? null
                    : moment(dataProject.end_date)
                }
                placeholder={"Pilih Tanggal Selesai"}
                style={{ width: `100%` }}
                onChange={(dates, datestrings) => {
                  setDataProject((prev) => ({
                    ...prev,
                    end_date: datestrings,
                  }));
                }}
              />
            </Form.Item>
            <div className="flex flex-col md:flex-row">
              <div className="w-full mb-2">
                <p className="mb-2">Staff Proyek</p>
                <Select
                  showSearch
                  mode="multiple"
                  className="dontShow"
                  value={
                    isSwitchGroup ? selectedGroups : dataProject?.project_staffs
                  }
                  disabled={!isAllowedToGetUsers}
                  placeholder={
                    isSwitchGroup ? "Cari Nama Grup..." : "Cari Nama Staff..."
                  }
                  style={{ width: `100%` }}
                  onSearch={(value) =>
                    !isSwitchGroup &&
                    onSearchUsers(value, setDataStaffsOrGroups)
                  }
                  onChange={(value, option) => {
                    const getStaffsFromGroups = () => {
                      let staffs = dataProject?.project_staffs || [];
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

                    let newProjectStaffs = isSwitchGroup
                      ? getStaffsFromGroups()
                      : option;

                    setDataProject((prev) => ({
                      ...prev,
                      project_staffs: newProjectStaffs,
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
            </div>

            {/* List of selected users or groups */}
            <div className="flex flex-wrap mb-4">
              {dataProject?.project_staffs?.map((staff, idx) => {
                return (
                  <Tag
                    key={staff.key}
                    closable
                    onClose={() => {
                      const newTags = dataProject?.project_staffs?.filter(
                        (tag) => tag.key !== staff.key
                      );
                      setDataProject((prev) => ({
                        ...prev,
                        project_staffs: newTags.map((tag) => tag),
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

            <Form.Item label="Deskripsi Proyek" name={"description"}>
              <ReactQuill
                theme="snow"
                value={dataProject.description}
                modules={modules}
                formats={formats}
                className="h-44 pb-10"
                onChange={(value) => {
                  setDataProject((prev) => ({
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

export default ModalProjectCreate;
