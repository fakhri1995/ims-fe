import { Form, Input, Select, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  RECRUITMENT_JALUR_DAFTARS_LIST_GET,
  RECRUITMENT_ROLES_LIST_GET,
} from "lib/features";

import { TrashIconSvg } from "../../icon";
import DrawerCore from "../drawerCore";

const DrawerCandidateUpdate = ({
  title,
  visible,
  onvisible,
  initProps,
  setRefresh,
  isAllowedToUpdateRecruitment,
  dataRecruitment,
  setModalDelete,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetRegistPlatformList = hasPermission(
    RECRUITMENT_JALUR_DAFTARS_LIST_GET
  );

  const isAllowedToGetRecruitmentRolesList = hasPermission(
    RECRUITMENT_ROLES_LIST_GET
  );

  const [instanceForm] = Form.useForm();

  //USESTATE
  //1.1 Update
  const [dataUpdate, setDataUpdate] = useState({
    id: null,
    name: "",
    email: "",
    university: "",
    recruitment_role_id: null,
    recruitment_jalur_daftar_id: null,
    recruitment_stage_id: null,
    recruitment_status_id: null,
  });

  const [modalUpdate, setModalUpdate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [disabledUpdate, setDisabledUpdate] = useState(true);

  const [loadingRegistPlatformList, setLoadingRegistPlatformList] =
    useState(false);
  const [loadingRoleList, setLoadingRoleList] = useState([]);
  const [dataRegistPlatformList, setDataRegistPlatformList] = useState([]);
  const [dataRoleList, setDataRoleList] = useState([]);

  // 2. useEffect
  // 2.1. set initial dataUpdate from dataRecruitment
  useEffect(() => {
    setDataUpdate({
      id: Number(dataRecruitment.id),
      name: dataRecruitment.name,
      email: dataRecruitment.email,
      university: dataRecruitment.university,
      recruitment_role_id: dataRecruitment.recruitment_role_id,
      recruitment_jalur_daftar_id: dataRecruitment.recruitment_jalur_daftar_id,
      recruitment_stage_id: dataRecruitment.recruitment_stage_id,
      recruitment_status_id: dataRecruitment.recruitment_status_id,
    });
  }, [dataRecruitment, visible]);

  // 2.2. Validate input field
  useEffect(() => {
    let allFilled = Object.values(dataUpdate).every(
      (value) => value !== "" && value !== null
    );
    // console.log(allFilled)
    if (allFilled) {
      setDisabledUpdate(false);
    } else {
      setDisabledUpdate(true);
    }
  }, [dataUpdate]);

  // 2.3. Get Recruitment Registration Platform (Jalur Daftar) List
  useEffect(() => {
    if (!isAllowedToGetRegistPlatformList) {
      permissionWarningNotification("Mendapatkan", "Data Jalur Daftar");
      setLoadingRegistPlatformList(false);
      return;
    }

    setLoadingRegistPlatformList(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentJalurDaftarsList`,
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
          setDataRegistPlatformList(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingRegistPlatformList(false);
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingRegistPlatformList(false);
      });
  }, [isAllowedToGetRegistPlatformList]);

  // 2.4. Get Recruitment Role List
  useEffect(() => {
    if (!isAllowedToGetRecruitmentRolesList) {
      permissionWarningNotification("Mendapatkan", "Data Role List");
      setLoadingRoleList(false);
      return;
    }

    setLoadingRoleList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRolesList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataRoleList(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingRoleList(false);
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingRoleList(false);
      });
  }, [isAllowedToGetRecruitmentRolesList]);

  //HANDLER
  const onChangeInput = (e) => {
    setDataUpdate({
      ...dataUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const clearData = () => {
    setDataUpdate({
      id: null,
      name: "",
      email: "",
      university: "",
      recruitment_role_id: null,
      recruitment_jalur_daftar_id: null,
      recruitment_stage_id: null,
      recruitment_status_id: null,
    });
  };

  const handleUpdateRecruitment = () => {
    if (!isAllowedToUpdateRecruitment) {
      permissionWarningNotification("Mengubah", "Rekrutmen Kandidat");
      return;
    }
    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateRecruitment`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUpdate),
    })
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          setLoadingUpdate(false);
          onvisible(false);
          notification.success({
            message: `Kandidat berhasil diubah.`,
            duration: 3,
          });
          // setTimeout(() => {
          //   clearData()
          // }, 500);
        } else {
          setLoadingUpdate(false);
          notification.error({
            message: `Gagal mengubah kandidat. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        setLoadingUpdate(false);
        notification.error({
          message: `Gagal mengubah kandidat. ${err.response}`,
          duration: 3,
        });
      });
  };

  // console.log(dataUpdate);
  return (
    <DrawerCore
      title={"Ubah Kandidat"}
      visible={visible}
      onClose={() => {
        onvisible(false);
      }}
      buttonOkText={"Simpan Kandidat"}
      onClick={handleUpdateRecruitment}
      disabled={disabledUpdate}
      buttonCancelText={
        <div className="flex flex-row space-x-2 items-center">
          <TrashIconSvg size={16} color={"#BF4A40"} />
          <p>Hapus Kandidat</p>
        </div>
      }
      onButtonCancelClicked={(e) => {
        onvisible(false);
        setModalDelete(true);
      }}
    >
      <Spin spinning={loadingUpdate}>
        <div className="flex flex-col">
          <p className="mb-6 text-red-500 text-xs italic">
            *Informasi ini harus diisi
          </p>
          <Form
            layout="vertical"
            form={instanceForm}
            className="grid grid-cols-2 gap-x-6"
          >
            <Form.Item
              label="Nama"
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Nama kandidat wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Input
                  value={dataUpdate.name}
                  name={"name"}
                  onChange={onChangeInput}
                />
              </div>
            </Form.Item>

            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Email kandidat wajib diisi",
                },
                {
                  pattern:
                    /(\-)|(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,
                  message: "Email belum diisi dengan benar",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Input
                  value={dataUpdate.email}
                  name={"email"}
                  onChange={onChangeInput}
                />
              </div>
            </Form.Item>

            <Form.Item
              label="Universitas"
              name={"university"}
              rules={[
                {
                  required: true,
                  message: "Nama universitas wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Input
                  value={dataUpdate.university}
                  name={"university"}
                  onChange={onChangeInput}
                />
              </div>
            </Form.Item>
            <Form.Item
              label="Role"
              name={"role"}
              rules={[
                {
                  required: true,
                  message: "Role kandidat wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Select
                  showSearch
                  placeholder="Pilih role.."
                  style={{ width: `100%` }}
                  defaultValue={dataUpdate.recruitment_role_id}
                  onChange={(value) => {
                    setDataUpdate({
                      ...dataUpdate,
                      recruitment_role_id: value,
                    });
                  }}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {dataRoleList?.map((role) => (
                    <Select.Option key={role.id} value={role.id}>
                      {role.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Form.Item>

            <Form.Item
              label="Jalur Daftar"
              name={"jalur_daftar"}
              rules={[
                {
                  required: true,
                  message: "Jalur daftar wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Select
                  placeholder="Pilih jalur daftar..."
                  style={{ width: `100%` }}
                  defaultValue={dataUpdate.recruitment_jalur_daftar_id}
                  onChange={(value) => {
                    setDataUpdate({
                      ...dataUpdate,
                      recruitment_jalur_daftar_id: value,
                    });
                  }}
                >
                  {dataRegistPlatformList.map((platform) => (
                    <Select.Option key={platform.id} value={platform.id}>
                      {platform.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Form.Item>

            {/* <Form.Item
              label="Stage"
              name={"stage"}
              rules={[
                {
                  required: true,
                  message: "Stage wajib diisi",
                },
              ]}
            >
              <div>
                <Select
                  placeholder="Pilih stage..."
                  defaultValue={dataUpdate.recruitment_stage_id}
                  onChange={(value) => {
                    setDataUpdate({
                      ...dataUpdate,
                      recruitment_stage_id: value,
                    });
                  }}
                >
                  {dataStageList?.map((stage) => (
                    <Select.Option key={stage.id} value={stage.id}>
                      {stage.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Form.Item> */}

            {/* <Form.Item
              label="Status"
              name={"status"}
              rules={[
                {
                  required: true,
                  message: "Status wajib diisi",
                },
              ]}
            >
              <div>
                <Select
                  placeholder="Pilih status..."
                  defaultValue={dataUpdate.recruitment_status_id}
                  onChange={(value) => {
                    setDataUpdate({
                      ...dataUpdate,
                      recruitment_status_id: value,
                    });
                  }}
                >
                  {dataStatusList?.map((status) => (
                    <Select.Option key={status.id} value={status.id}>
                      {status.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Form.Item> */}
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerCandidateUpdate;
