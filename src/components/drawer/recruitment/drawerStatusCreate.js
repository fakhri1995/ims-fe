import { Form, Input, Select, Spin, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";

import { permissionWarningNotification } from "../../../lib/helper";
import DrawerCore from "../drawerCore";

const DrawerStageCreate = ({
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
  const [dataStage, setDataStage] = useState({
    id: null,
    name: "",
    description: "",
    color: "#000000",
  });
  const [disabledCreate, setDisabledCreate] = useState(true);

  // USEEFFECT
  // Validate input field
  useEffect(() => {
    if (dataStage.name !== "" && dataStage.description !== "") {
      setDisabledCreate(false);
    } else {
      setDisabledCreate(true);
    }
  }, [dataStage]);

  //HANDLER
  const onChangeInput = (e) => {
    setDataStage({
      ...dataStage,
      [e.target.name]: e.target.value,
    });
  };

  const clearData = () => {
    setDataStage({
      id: null,
      name: "",
      color: "#000000",
      description: "",
    });
  };

  const handleCreateStage = () => {
    if (!isAllowedToAdd) {
      permissionWarningNotification("Menambah", "Status");
      return;
    }
    setLoadingCreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addRecruitmentStatus`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataStage),
    })
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          notification.success({
            message: `Status berhasil ditambahkan.`,
            duration: 3,
          });
          setTimeout(() => {
            onvisible(false);
            clearData();
          }, 500);
        } else {
          notification.error({
            message: `Gagal menambahkan Status. ${response2.message}`,
            duration: 3,
          });
        }
        setLoadingCreate(false);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan Status. ${err.response}`,
          duration: 3,
        });
        setLoadingCreate(false);
      });
  };

  // console.log(dataCandidate);
  return (
    <DrawerCore
      title={"Tambah Status"}
      visible={visible}
      onClose={() => {
        clearData();
        onvisible(false);
      }}
      buttonOkText={"Simpan Status"}
      onClick={handleCreateStage}
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
            className="gap-x-6 w-full"
          >
            <div className="flex flex-row justify-between w-full space-x-8">
              <Form.Item
                label="Nama"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Nama role wajib diisi",
                  },
                ]}
                className="col-span-2 w-full"
              >
                <div>
                  <Input
                    value={dataStage.name}
                    name={"name"}
                    onChange={onChangeInput}
                  />
                </div>
              </Form.Item>
              <Form.Item
                label="Warna"
                name={"color"}
                rules={[
                  {
                    required: true,
                    message: "Color wajib diisi",
                  },
                ]}
                className="col-span-2 w-full"
              >
                <div>
                  <Input
                    value={dataStage.color}
                    name={"color"}
                    type={"color"}
                    onChange={(event) => {
                      setDataStage({
                        ...dataStage,
                        color: event.target.value,
                      });
                    }}
                  ></Input>
                </div>
              </Form.Item>
            </div>
            <Form.Item
              label="Deskripsi"
              name={"description"}
              rules={[
                {
                  required: true,
                  message: "Deskripsi wajib diisi",
                },
              ]}
              className="col-span-2 w-full"
            >
              <div>
                <TextArea
                  value={dataStage.description}
                  name={"description"}
                  type={"description"}
                  rows="4"
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

export default DrawerStageCreate;
