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

const DrawerShiftCreate = ({
  title,
  visible,
  onvisible,
  buttonOkText,
  initProps,
  setRefresh,
  isAllowedToAdd,
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
    lampiran: [],
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

  const handleCreateRecruitment = () => {
    if (!isAllowedToAdd) {
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
              lampiran: [],
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
    let allFilled = Object.values(dataCandidate).every((value) => value);
    let attachmentIsFilled = dataCandidate?.lampiran?.every(
      (attachment) => attachment.judul_lampiran && attachment.isi_lampiran
    );
    if (allFilled && attachmentIsFilled) {
      setdisabledcreate(false);
    } else {
      setdisabledcreate(true);
    }
  }, [dataCandidate]);

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
          lampiran: [],
        });
        onvisible(false);
      }}
      buttonOkText={buttonOkText}
      onClick={handleCreateRecruitment}
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
              label="Nama Shift"
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Nama Shift wajib diisi",
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
              label="Jam Kerja"
              name={"work_time"}
              rules={[
                {
                  required: true,
                  message: "Jam kerja wajib diisi",
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
              label="Jam Istirahat"
              name={"break_Time"}
              rules={[
                {
                  required: true,
                  message: "Jam istirahat wajib diisi",
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
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerShiftCreate;
