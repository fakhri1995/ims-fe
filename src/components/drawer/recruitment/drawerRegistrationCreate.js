import { Form, Input, Select, Spin, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";

import { permissionWarningNotification } from "../../../lib/helper";
import DrawerCore from "../drawerCore";

const DrawerRegistrationCreate = ({
  visible,
  onvisible,
  initProps,
  setRefresh,
  isAllowedToAdd,
  setLoadingCreate,
  loadingCreate,
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
  });
  const [disabledCreate, setDisabledCreate] = useState(true);

  // USEEFFECT
  // Validate input field
  useEffect(() => {
    if (dataRegistration.name !== "") {
      setDisabledCreate(false);
    } else {
      setDisabledCreate(true);
    }
  }, [dataRegistration]);

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

  const handleCreateRegistration = () => {
    if (!isAllowedToAdd) {
      permissionWarningNotification("Menambah", "Jalur Daftar Rekrutmen");
      return;
    }
    setLoadingCreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addRecruitmentJalurDaftar`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataRegistration),
    })
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          notification.success({
            message: `Jalur Daftar berhasil ditambahkan.`,
            duration: 3,
          });
          setTimeout(() => {
            onvisible(false);
            clearData();
          }, 500);
        } else {
          notification.error({
            message: `Gagal menambahkan Jalur Daftar. ${response2.message}`,
            duration: 3,
          });
        }
        setLoadingCreate(false);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan Jalur Daftar. ${err.response}`,
          duration: 3,
        });
        setLoadingCreate(false);
      });
  };

  // console.log(dataCandidate);
  return (
    <DrawerCore
      title={"Tambah Jalur Daftar"}
      visible={visible}
      onClose={() => {
        clearData();
        onvisible(false);
      }}
      buttonOkText={"Simpan Jalur Daftar"}
      onClick={handleCreateRegistration}
      disabled={disabledCreate}
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

export default DrawerRegistrationCreate;
