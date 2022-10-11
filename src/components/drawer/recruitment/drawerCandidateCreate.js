import { Input, Select, Spin, notification } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { ASSESSMENT_ADD } from "lib/features";
import { RECRUITMENT_JALUR_DAFTAR_LIST_GET } from "lib/features";

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
    RECRUITMENT_JALUR_DAFTAR_LIST_GET
  );

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
          <div className="mb-8">
            <p className="mb-0 text-red-500 text-xs italic">
              *Informasi ini harus diisi
            </p>
          </div>

          <div className=" mb-5 flex flex-col">
            <div className="flex mb-1">
              <Label>Nama&nbsp;</Label>
              <span className="text-red-500">*</span>
            </div>
            <Input
              style={{ width: `100%` }}
              name="name"
              defaultValue={dataCandidate.name}
              onChange={onChangeInput}
            ></Input>
          </div>

          <div className=" mb-5 flex flex-col">
            <div className="flex mb-1">
              <Label>Email&nbsp;</Label>
              <span className="text-red-500">*</span>
            </div>
            <Input
              style={{ width: `100%` }}
              name="email"
              defaultValue={dataCandidate.email}
              onChange={onChangeInput}
            ></Input>
          </div>

          <div className=" mb-5 flex flex-col">
            <div className="flex mb-1">
              <Label>Universitas&nbsp;</Label>
              <span className="text-red-500">*</span>
            </div>
            <Input
              style={{ width: `100%` }}
              name="university"
              defaultValue={dataCandidate.university}
              onChange={onChangeInput}
            ></Input>
          </div>

          <div className=" mb-5 flex flex-col">
            <div className="flex mb-1">
              <Label>Role&nbsp;</Label>
              <span className="text-red-500">*</span>
            </div>
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
            >
              {/* <Select.Option value={0}>Semua Role</Select.Option> */}
              {dataRoleList?.map((role) => (
                <Select.Option key={role.id} value={role.id}>
                  {role.name}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className=" mb-5 flex flex-col">
            <div className="flex mb-1">
              <Label>Jalur Daftar&nbsp;</Label>
              <span className="text-red-500">*</span>
            </div>
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
              {/* <Select.Option value={0}>Semua Jalur Daftar</Select.Option> */}
              {dataRegistPlatformList.map((platform) => (
                <Select.Option key={platform.id} value={platform.id}>
                  {platform.name}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="flex flex-row space-x-6">
            <div className=" mb-5 flex flex-col w-full">
              <div className="flex mb-1">
                <Label>Stage&nbsp;</Label>
                <span className="text-red-500">*</span>
              </div>
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
                {/* <Select.Option value={0}>Semua Stage</Select.Option> */}
                {dataStageList?.map((stage) => (
                  <Select.Option key={stage.id} value={stage.id}>
                    {stage.name}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div className=" mb-5 flex flex-col w-full">
              <div className="flex mb-1 ">
                <Label>Status&nbsp;</Label>
                <span className="text-red-500">*</span>
              </div>
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
                {/* <Select.Option value={0}>Semua Status</Select.Option> */}
                {dataStatusList?.map((status) => (
                  <Select.Option key={status.id} value={status.id}>
                    {status.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerCandidateCreate;
