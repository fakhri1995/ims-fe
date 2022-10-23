import { Form, Input, Select, Spin, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";

import { permissionWarningNotification } from "../../../lib/helper";
import { TrashIconSvg } from "../../icon";
import DrawerCore from "../drawerCore";

const DrawerStageUpdate = ({
  id,
  visible,
  onvisible,
  initProps,
  trigger,
  setRefresh,
  isAllowedToGetStage,
  isAllowedToUpdateStage,
  setLoadingUpdate,
  loadingUpdate,
  onClickDelete,
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
    recruitments_count: 0,
  });
  const [loadingDataStage, setLoadingDataStage] = useState(false);
  const [disabledUpdate, setDisabledUpdate] = useState(true);

  // USEEFFECT
  // Validate input field
  useEffect(() => {
    if (dataStage.name !== "" && dataStage.description !== "") {
      setDisabledUpdate(false);
    } else {
      setDisabledUpdate(true);
    }
  }, [dataStage]);

  // Get stage data
  useEffect(() => {
    if (!isAllowedToGetStage) {
      setLoadingDataStage(false);
      permissionWarningNotification("Mendapatkan", "Data Status");
      return;
    }

    if (trigger !== -1) {
      setLoadingDataStage(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentStatus?id=${id.current}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setDataStage((prev) => ({
            ...prev,
            id: res2.data.id,
            name: res2.data.name,
            color: res2.data.color,
            description: res2.data.description,
            recruitments_count: res2.data.recruitments_count,
          }));
          setLoadingDataStage(false);
        });
    }
  }, [trigger, isAllowedToGetStage]);

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
      description: "",
    });
  };

  const handleUpdateStage = () => {
    if (!isAllowedToUpdateStage) {
      permissionWarningNotification("Mengubah", "Stage Status");
      return;
    }
    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateRecruitmentStatus`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataStage),
    })
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
            message: `Gagal mengubah Status. ${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        setLoadingUpdate(false);
        notification["error"]({
          message: `Gagal mengubah Status. ${err.message}`,
          duration: 3,
        });
      });
  };

  // console.log(dataCandidate);
  return (
    <DrawerCore
      title={"Ubah Status"}
      visible={visible}
      onClose={() => {
        clearData();
        onvisible(false);
      }}
      buttonOkText={"Simpan Status"}
      onClick={handleUpdateStage}
      disabled={disabledUpdate}
      buttonCancelText={
        <div className="flex flex-row space-x-2 items-center">
          <TrashIconSvg size={16} color={"#BF4A40"} />
          <p>Hapus Status</p>
        </div>
      }
      onButtonCancelClicked={() => {
        onClickDelete(dataStage);
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

export default DrawerStageUpdate;
