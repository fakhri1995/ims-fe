import { Form, Input, Select, Spin, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";

import { permissionWarningNotification } from "../../../lib/helper";
import { TrashIconSvg } from "../../icon";
import DrawerCore from "../drawerCore";

const DrawerRegistrationUpdate = ({
  id,
  visible,
  onvisible,
  initProps,
  trigger,
  setRefresh,
  isAllowedToGetRegistration,
  isAllowedToUpdateRegistration,
  setLoadingUpdate,
  loadingUpdate,
  onClickDelete,
}) => {
  /**
   * Dependencies
   */

  const [instanceForm] = Form.useForm();

  // USESTATE
  const [dataRegistration, setDataRegistration] = useState({
    id: null,
    name: "",
    description: "",
    recruitments_count: 0,
  });
  const [loadingDataRegistration, setLoadingDataRegistration] = useState(false);
  const [disabledUpdate, setDisabledUpdate] = useState(true);

  // USEEFFECT
  // Validate input field
  useEffect(() => {
    if (dataRegistration.name !== "") {
      setDisabledUpdate(false);
    } else {
      setDisabledUpdate(true);
    }
  }, [dataRegistration]);

  // Get Registration data
  useEffect(() => {
    if (!isAllowedToGetRegistration) {
      setLoadingDataRegistration(false);
      permissionWarningNotification("Mendapatkan", "Data Jalur Daftar");
      return;
    }

    if (trigger !== -1) {
      setLoadingDataRegistration(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentJalurDaftar?id=${id.current}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setDataRegistration((prev) => ({
            ...prev,
            id: res2.data.id,
            name: res2.data.name,
            description: res2.data.description,
            recruitments_count: res2.data.recruitments_count,
          }));
          setLoadingDataRegistration(false);
        });
    }
  }, [trigger, isAllowedToGetRegistration]);

  //HANDLER
  const onChangeInput = (e) => {
    setDataRegistration({
      ...dataRegistration,
      [e.target.name]: e.target.value,
    });
  };

  const clearData = () => {
    setDataRegistration({
      id: null,
      name: "",
      description: "",
    });
  };

  const handleUpdateRegistration = () => {
    if (!isAllowedToUpdateRegistration) {
      permissionWarningNotification("Mengubah", "Registration Jalur Daftar");
      return;
    }
    setLoadingUpdate(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/updateRecruitmentJalurDaftar`,
      {
        method: "PUT",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataRegistration),
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setRefresh((prev) => prev + 1);
        if (res2.success) {
          setLoadingUpdate(false);
          onvisible(false);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          clearData();
        } else {
          setLoadingUpdate(false);
          notification["error"]({
            message: `Gagal mengubah Jalur Daftar. ${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        setLoadingUpdate(false);
        notification["error"]({
          message: `Gagal mengubah Jalur Daftar. ${err.message}`,
          duration: 3,
        });
      });
  };

  // console.log(dataCandidate);
  return (
    <DrawerCore
      title={"Ubah Jalur Daftar"}
      visible={visible}
      onClose={() => {
        clearData();
        onvisible(false);
      }}
      buttonOkText={"Simpan Jalur Daftar"}
      onClick={handleUpdateRegistration}
      disabled={disabledUpdate}
      buttonSpace="space-x-2"
      buttonCancelText={
        <div className="flex flex-row space-x-1 items-center">
          <TrashIconSvg size={16} color={"#BF4A40"} />
          <p>Hapus Jalur Daftar</p>
        </div>
      }
      onButtonCancelClicked={() => {
        onClickDelete(dataRegistration);
        onvisible(false);
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
                  message: "Nama role wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <TextArea
                  value={dataRegistration.name}
                  name={"name"}
                  rows={3}
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

export default DrawerRegistrationUpdate;
