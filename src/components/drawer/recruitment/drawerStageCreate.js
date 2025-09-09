import { Form, Input, Select, Spin, notification } from "antd";
import { data } from "flickity";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { permissionWarningNotification } from "../../../lib/helper";
import ButtonSys from "../../button";
import { TrashIconSvg } from "../../icon";
import { InputRequired } from "../../input";
import { Label } from "../../typography";
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
      description: "",
    });
  };

  const handleCreateStage = () => {
    if (!isAllowedToAdd) {
      permissionWarningNotification("Menambah", "Stage Rekrutmen");
      return;
    }
    setLoadingCreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addRecruitmentStage`, {
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
            message: `Stage berhasil ditambahkan.`,
            duration: 3,
          });
          setTimeout(() => {
            onvisible(false);
            clearData();
          }, 500);
        } else {
          notification.error({
            message: `Gagal menambahkan stage. ${response2.message}`,
            duration: 3,
          });
        }
        setLoadingCreate(false);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan stage. ${err.response}`,
          duration: 3,
        });
        setLoadingCreate(false);
      });
  };

  // console.log(dataCandidate);
  return (
    <DrawerCore
      title={"Add Stage"}
      visible={visible}
      onClose={() => {
        clearData();
        onvisible(false);
      }}
      buttonOkText={"Save Stage"}
      onClick={handleCreateStage}
      disabled={disabledCreate}
      buttonCancelText={"Cancel"}
      onButtonCancelClicked={() => {
        clearData();
        onvisible(false);
      }}
    >
      <Spin spinning={loadingCreate}>
        <div className="flex flex-col">
          <p className="mb-6 text-red-500 text-xs italic">
            *This information is required to filled
          </p>
          <Form
            layout="vertical"
            form={instanceForm}
            className="grid grid-cols-2 gap-x-6"
          >
            <Form.Item
              label="Stage Name"
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Stage Name is required",
                },
              ]}
              className="col-span-2"
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
              label="Description"
              name={"description"}
              rules={[
                {
                  required: true,
                  message: "Description is required",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Input.TextArea
                  value={dataStage.description}
                  name={"description"}
                  onChange={onChangeInput}
                  rows={4}
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
