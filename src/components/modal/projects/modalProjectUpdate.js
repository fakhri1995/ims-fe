import {
  DatePicker,
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
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { GROUPS_GET, USERS_GET } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import { generateStaticAssetUrl } from "../../../lib/helper";
import ButtonSys from "../../button";
import { CheckIconSvg, EditSquareIconSvg } from "../../icon";
import { ModalHapus2 } from "../modalCustom";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ModalProjectUpdate = ({
  initProps,
  visible,
  onvisible,
  isAllowedToUpdateProject,
  isAllowedToDeleteProject,
  setRefresh,
  dataProject,
  dataStatusList,
}) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToGetUsers = hasPermission(USERS_GET);
  const isAllowedToGetGroups = hasPermission(GROUPS_GET);

  const rt = useRouter();
  const searchTimeoutRef = useRef(null);

  // 1. USE STATE
  const [dataUpdateProject, setDataUpdateProject] = useState({
    id: 0,
    name: "",
    proposed_bys: [],
    status_id: 0,
    start_date: "",
    end_date: "",
    project_staffs: [],
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [dataStaffsOrGroups, setDataStaffsOrGroups] = useState([]);
  const [dataStaffs, setDataStaffs] = useState([]);

  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isSwitchGroup, setIsSwitchGroup] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);

  const [modalDelete, setModalDelete] = useState(false);

  // 2. USE EFFECT
  // 2.1. Get project detail from parent
  useEffect(() => {
    if (visible) {
      let updatedProposedBys = dataProject?.proposed_bys?.map((staff) => ({
        ...staff,
        key: staff.id,
      }));
      let updatedProjectStaffs = dataProject?.project_staffs?.map((staff) => ({
        ...staff,
        key: staff.id,
      }));

      setDataUpdateProject({
        ...dataProject,
        proposed_bys: updatedProposedBys,
        project_staffs: updatedProjectStaffs,
      });
    }
  }, [dataProject, visible]);

  // 2.2. Get users or groups for project staff options
  useEffect(() => {
    if (!visible) {
      return;
    }

    // Staff options will be taken from users (agent) or groups
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
          setDataStaffs(res2.data);
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
    setDataUpdateProject(dataProject);
    setSelectedGroups([]);
    setIsEditTitle(false);
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

  const handleUpdateProject = () => {
    if (!isAllowedToUpdateProject) {
      permissionWarningNotification("Mengubah", "Proyek");
      return;
    }

    // map proposed_bys and project_staffs into ids
    const proposedBysId = dataUpdateProject?.proposed_bys?.map((staff) =>
      Number(staff.key)
    );
    const projectStaffsId = dataUpdateProject?.project_staffs?.map((staff) =>
      Number(staff.key)
    );

    const payload = {
      ...dataUpdateProject,
      proposed_bys: proposedBysId,
      project_staffs: projectStaffsId,
    };

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateProject`, {
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
          onvisible(false);
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
          message: `Gagal mengubah proyek. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteProject = () => {
    if (!isAllowedToDeleteProject) {
      permissionWarningNotification("Menghapus", "Proyek");
      return;
    }

    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteProject?id=${dataProject?.id}`,
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
          onvisible(false);
          rt.push("/projects");
          notification.success({
            message: response.message,
            duration: 3,
          });
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus proyek. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

  // Used in staff field (diajukan oleh & staff proyek)
  const getUpdatedStaffs = (currentStaffList, option) => {
    let staffs = currentStaffList || [];
    for (let user of option) {
      if (
        user?.key &&
        !staffs?.map((staff) => Number(staff.key))?.includes(Number(user.key))
      ) {
        staffs.push(user);
      }
    }
    return staffs;
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

  return modalDelete ? (
    <ModalHapus2
      title={`Perhatian`}
      visible={modalDelete}
      onvisible={setModalDelete}
      onOk={handleDeleteProject}
      onCancel={() => {
        setModalDelete(false);
        onvisible(false);
      }}
      itemName={"proyek"}
      loading={loading}
    >
      <p className="mb-4">
        Apakah Anda yakin ingin menghapus proyek{" "}
        <strong>{dataProject?.name}</strong>?
      </p>
    </ModalHapus2>
  ) : (
    <Modal
      title={
        isEditTitle ? (
          <div className="flex items-center space-x-2 w-2/3">
            <Input
              value={dataUpdateProject.name}
              placeholder="Masukkan nama proyek..."
              onChange={(e) =>
                setDataUpdateProject((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            ></Input>
            <button
              onClick={() => {
                setIsEditTitle(false);
              }}
              disabled={!dataUpdateProject?.name}
              className="bg-transparent"
            >
              <CheckIconSvg size={24} color={"#35763B"} />
            </button>
          </div>
        ) : (
          <button
            className="flex space-x-2 items-center bg-transparent hover:opacity-75"
            type="button"
            onClick={() => setIsEditTitle(true)}
          >
            <EditSquareIconSvg color={"#4D4D4D"} size={24} />
            <p className="mig-heading--4">{dataUpdateProject?.name}</p>
          </button>
        )
      }
      visible={visible}
      onCancel={() => {
        onvisible(false);
        clearData();
      }}
      maskClosable={false}
      footer={
        <Spin spinning={loading}>
          <div className="flex space-x-2 justify-end items-center">
            <ButtonSys
              type={"primary"}
              color={"danger"}
              onClick={() => {
                setModalDelete(true);
              }}
              disabled={!isAllowedToDeleteProject || !dataProject?.id}
            >
              <p>Hapus</p>
            </ButtonSys>
            <button
              onClick={() => {
                onvisible(false);
                clearData();
              }}
              className="bg-transparent text-mono50 py-2 px-6 hover:text-mono80"
            >
              Batal
            </button>
            <ButtonSys
              type={"primary"}
              onClick={handleUpdateProject}
              disabled={
                !isAllowedToUpdateProject ||
                !dataUpdateProject.name ||
                !dataUpdateProject.proposed_bys?.length
              }
            >
              <p>Simpan</p>
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Diajukan oleh */}
        <div>
          <p className="mb-2">Diajukan oleh</p>
          <Select
            showSearch
            mode="multiple"
            value={dataUpdateProject?.proposed_bys}
            placeholder="Tambahkan Pengaju"
            disabled={!isAllowedToGetUsers}
            onChange={(value, option) => {
              const updatedProposedBys = getUpdatedStaffs(
                dataUpdateProject?.proposed_bys,
                option
              );
              setDataUpdateProject((prev) => ({
                ...prev,
                proposed_bys: updatedProposedBys,
              }));
            }}
            onSearch={(value) => {
              onSearchUsers(value, setDataStaffs);
            }}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            className="mig-caption--bold text-secondary100 bg-transparent 
            hover:opacity-75 w-full dontShow mb-2"
          >
            {dataStaffs?.map((item) => (
              <Select.Option
                key={item?.id}
                value={item?.id}
                name={item?.name}
                profile_image={item?.profile_image}
              >
                {item?.name}
              </Select.Option>
            ))}
          </Select>

          {/* List of selected users */}
          <div className="flex flex-wrap w-full">
            {dataUpdateProject?.proposed_bys?.map((staff, idx) => {
              return (
                <Tag
                  key={staff?.id || staff?.key}
                  closable
                  onClose={() => {
                    const newTags = dataUpdateProject?.proposed_bys?.filter(
                      (tag) => tag.key !== staff.key
                    );
                    setDataUpdateProject((prev) => ({
                      ...prev,
                      proposed_bys: newTags?.map((tag) => tag),
                    }));
                  }}
                  className="flex items-center p-2 mb-2"
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
                    <p className="truncate font-bold">{staff?.name}</p>
                  </div>
                </Tag>
              );
            })}
          </div>
        </div>

        {/* Status */}
        <div>
          <p className="mb-2">Status</p>
          <div className="flex space-x-2 items-center">
            <Select
              allowClear
              value={dataUpdateProject.status_id}
              placeholder="Ubah Status"
              onChange={(value, option) => {
                setDataUpdateProject((prev) => ({
                  ...prev,
                  status_id: value,
                  status: option,
                }));
              }}
              optionFilterProp="children"
              bordered={false}
              className="mig-caption--bold bg-transparent hover:opacity-75 
              rounded-md px-2 py-1 "
              style={{
                backgroundColor: dataUpdateProject?.status?.color
                  ? dataUpdateProject?.status?.color + "20"
                  : "#E6E6E6",
                color: dataUpdateProject?.status?.color ?? "#808080",
              }}
            >
              {dataStatusList?.map((item) => (
                <Select.Option
                  key={item?.id}
                  value={item?.id}
                  color={item?.color}
                  name={item?.name}
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

        {/* Tanggal Mulai */}
        <div>
          <p className="mb-2">Tanggal Mulai</p>
          <DatePicker
            allowClear
            allowEmpty
            value={
              moment(dataUpdateProject.start_date).isValid()
                ? moment(dataUpdateProject.start_date)
                : null
            }
            placeholder={"Pilih Tanggal Mulai"}
            style={{ width: `100%` }}
            onChange={(dates, datestrings) => {
              setDataUpdateProject((prev) => ({
                ...prev,
                start_date: datestrings,
              }));
            }}
          />
        </div>

        {/* Tanggal Selesai */}
        <div>
          <p className="mb-2">Ekspektasi Tanggal Selesai</p>
          <DatePicker
            allowClear
            allowEmpty
            value={
              moment(dataUpdateProject.end_date).isValid()
                ? moment(dataUpdateProject.end_date)
                : null
            }
            placeholder={"Pilih Tanggal Selesai"}
            style={{ width: `100%` }}
            onChange={(dates, datestrings) => {
              setDataUpdateProject((prev) => ({
                ...prev,
                end_date: datestrings,
              }));
            }}
          />
        </div>

        {/* Staff Proyek */}
        <div className="grid grid-cols-1 md:col-span-2 gap-2">
          <div className="flex flex-col md:flex-row ">
            <div className="w-full">
              <p className="mb-2">Staff Proyek</p>
              <Select
                showSearch
                mode="multiple"
                className="dontShow"
                value={
                  isSwitchGroup
                    ? selectedGroups
                    : dataUpdateProject.project_staffs
                }
                disabled={!isAllowedToGetUsers}
                placeholder={
                  isSwitchGroup ? "Cari Nama Grup..." : "Cari Nama Staff..."
                }
                style={{ width: `100%` }}
                onSearch={(value) =>
                  !isSwitchGroup && onSearchUsers(value, setDataStaffsOrGroups)
                }
                onChange={(value, option) => {
                  const getStaffsFromGroups = () => {
                    let staffs = dataUpdateProject?.project_staffs || [];
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
                    : getUpdatedStaffs(
                        dataUpdateProject?.project_staffs,
                        option
                      );

                  setDataUpdateProject((prev) => ({
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
                {dataStaffsOrGroups?.map((item) => {
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
          <div className="flex flex-wrap ">
            {dataUpdateProject?.project_staffs?.map((staff, idx) => {
              return (
                <Tag
                  key={staff?.id || staff?.key}
                  closable
                  onClose={() => {
                    const newTags = dataUpdateProject?.project_staffs?.filter(
                      (tag) => tag.key !== staff.key
                    );
                    setDataUpdateProject((prev) => ({
                      ...prev,
                      project_staffs: newTags?.map((tag) => tag),
                    }));
                  }}
                  className="flex items-center p-2 mb-2"
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

        {/* Deskripsi Proyek */}
        <div className="md:col-span-2">
          <p className="mb-2">Deskripsi Proyek</p>
          <ReactQuill
            theme="snow"
            value={dataUpdateProject.description}
            modules={modules}
            formats={formats}
            className="h-44 pb-10"
            onChange={(value) => {
              setDataUpdateProject((prev) => ({
                ...prev,
                description: value,
              }));
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalProjectUpdate;
