import { DeleteOutlined } from "@ant-design/icons";
import { Form, Input, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";

import { permissionWarningNotification } from "../../../lib/helper";
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
      permissionWarningNotification("Mendapatkan", "Data Stage");
      return;
    }

    if (trigger !== -1) {
      setLoadingDataStage(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentStage?id=${id.current}`,
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
      permissionWarningNotification("Mengubah", "Stage Rekrutmen");
      return;
    }
    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateRecruitmentStage`, {
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
            message: `Gagal mengubah stage. ${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        setLoadingUpdate(false);
        notification["error"]({
          message: `Gagal mengubah stage. ${err.message}`,
          duration: 3,
        });
      });
  };

  // console.log(dataCandidate);
  return (
    <DrawerCore
      title={"Edit Stage"}
      visible={visible}
      onClose={() => {
        clearData();
        onvisible(false);
      }}
      buttonOkText={"Save Change"}
      onClick={handleUpdateStage}
      disabled={disabledUpdate}
      buttonCancelText={"Cancel"}
      onButtonCancelClicked={() => {
        clearData();
        onvisible(false);
      }}
    >
      <Spin spinning={loadingUpdate}>
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

export default DrawerStageUpdate;
