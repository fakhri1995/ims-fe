import { Form, Input, Select, Spin, notification } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { ASSESSMENT_ADD } from "lib/features";
import { RECRUITMENT_JALUR_DAFTARS_LIST_GET } from "lib/features";

import ButtonSys from "../../button";
import { TrashIconSvg } from "../../icon";
import { InputRequired } from "../../input";
import { Label } from "../../typography";
import DrawerCore from "../drawerCore";

const DrawerCandidateCreate = ({
  title,
  visible,
  onvisible,
  buttonOkText,
  initProps,
  setRefresh,
  isAllowedToAddRecruitment,
  dataRoleList,
  dataStageList,
  dataStatusList,
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

  const [instanceForm] = Form.useForm();

  //USESTATE
  const [dataCandidate, setDataCandidate] = useState({
    name: "",
    email: "",
    university: "",
    recruitment_role_id: null,
    recruitment_jalur_daftar_id: null,
    recruitment_stage_id: null,
    recruitment_status_id: null,
  });
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [disabledcreate, setdisabledcreate] = useState(true);

  const [loadingRegistPlatformList, setLoadingRegistPlatformList] =
    useState(false);
  const [dataRegistPlatformList, setDataRegistPlatformList] = useState([]);

  // useEffect
  // 3.1. Get Recruitment Registration Platform (Jalur Daftar) List
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

  //HANDLER
  const onChangeInput = (e) => {
    setDataCandidate({
      ...dataCandidate,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateForm = () => {
    if (!isAllowedToAddRecruitment) {
      permissionWarningNotification("Menambah", "Rekrutmen Kandidat");
      return;
    }
    setLoadingCreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addRecruitment`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataCandidate),
    })
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          notification.success({
            message: `Kandidat berhasil ditambahkan.`,
            duration: 3,
          });
          setTimeout(() => {
            onvisible(false);
            setDataCandidate({
              name: "",
              email: "",
              university: "",
              recruitment_role_id: null,
              recruitment_jalur_daftar_id: null,
              recruitment_stage_id: null,
              recruitment_status_id: null,
            });
          }, 500);
        } else {
          notification.error({
            message: `Gagal menambahkan kandidat. ${response2.message}`,
            duration: 3,
          });
        }
        setLoadingCreate(false);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan kandidat. ${err.response}`,
          duration: 3,
        });
        setLoadingCreate(false);
      });
  };

  // USEEFFECT
  useEffect(() => {
    let allFilled = Object.values(dataCandidate).every(
      (value) => value !== "" && value !== null
    );
    // console.log(allFilled)
    if (allFilled) {
      setdisabledcreate(false);
    } else {
      setdisabledcreate(true);
    }
  }, [dataCandidate]);

  // console.log(dataCandidate);
  return (
    <DrawerCore
      title={title}
      visible={visible}
      onClose={() => {
        setDataCandidate({
          name: "",
          email: "",
          university: "",
          recruitment_role_id: null,
          recruitment_jalur_daftar_id: null,
          recruitment_stage_id: null,
          recruitment_status_id: null,
        });
        onvisible(false);
      }}
      buttonOkText={buttonOkText}
      onClick={handleCreateForm}
      disabled={disabledcreate}
    >
      <Spin spinning={loadingCreate}>
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
                  value={dataCandidate.name}
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
                  value={dataCandidate.email}
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
                  value={dataCandidate.university}
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
                  defaultValue={dataCandidate.recruitment_role_id}
                  onChange={(value) => {
                    setDataCandidate({
                      ...dataCandidate,
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
                  defaultValue={dataCandidate.recruitment_jalur_daftar_id}
                  onChange={(value) => {
                    setDataCandidate({
                      ...dataCandidate,
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

            <Form.Item
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
                  defaultValue={dataCandidate.recruitment_stage_id}
                  onChange={(value) => {
                    setDataCandidate({
                      ...dataCandidate,
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
            </Form.Item>

            <Form.Item
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
                  defaultValue={dataCandidate.recruitment_status_id}
                  onChange={(value) => {
                    setDataCandidate({
                      ...dataCandidate,
                      recruitment_status_id: value,
                    });
                  }}
                >
                  {dataStatusList?.map((status) => (
                    <Select.Option key={status.id} value={status.id}>
                      <div className="flex flex-row items-center space-x-2">
                        <div
                          className="rounded-full w-4 h-4"
                          style={{ backgroundColor: `${status.color}` }}
                        />
                        <p>{status.name}</p>
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerCandidateCreate;
