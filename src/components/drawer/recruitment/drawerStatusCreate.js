import { Form, Input, Select, Spin, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";

import { permissionWarningNotification } from "../../../lib/helper";
import DrawerCore from "../drawerCore";

const DrawerStatusCreate = ({
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
  const [dataStatus, setDataStatus] = useState({
    id: null,
    name: "",
    description: "",
    color: "#000000",
  });
  const [disabledCreate, setDisabledCreate] = useState(true);

  // USEEFFECT
  // Validate input field
  useEffect(() => {
    if (dataStatus.name !== "" && dataStatus.description !== "") {
      setDisabledCreate(false);
    } else {
      setDisabledCreate(true);
    }
  }, [dataStatus]);

  //HANDLER
  const onChangeInput = (e) => {
    setDataStatus({
      ...dataStatus,
      [e.target.name]: e.target.value,
    });
  };

  const clearData = () => {
    setDataStatus({
      id: null,
      name: "",
      color: "#000000",
      description: "",
    });
  };

  const handleCreateStatus = () => {
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
      body: JSON.stringify(dataStatus),
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
      title={"Add Status"}
      visible={visible}
      onClose={() => {
        clearData();
        onvisible(false);
      }}
      buttonOkText={"Save Status"}
      onClick={handleCreateStatus}
      buttonCancelText={"Cancel"}
      onButtonCancelClicked={() => {
        clearData();
        onvisible(false);
      }}
      disabled={disabledCreate}
    >
      <Spin spinning={loadingCreate}>
        <div className="flex flex-col">
          <p className="mb-6 text-red-500 text-xs italic">
            *This information is required to filled
          </p>
          <Form
            layout="vertical"
            form={instanceForm}
            className="gap-x-6 w-full"
          >
            <div className="flex flex-row justify-between w-full space-x-8">
              <Form.Item
                label="Status Name"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Status Name is required",
                  },
                ]}
                className="col-span-2 w-full"
              >
                <div>
                  <Input
                    value={dataStatus.name}
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
                    message: "Color is required",
                  },
                ]}
                className="col-span-2 w-full"
              >
                <div>
                  <Input
                    value={dataStatus.color}
                    name={"color"}
                    type={"color"}
                    onChange={(event) => {
                      setDataStatus({
                        ...dataStatus,
                        color: event.target.value,
                      });
                    }}
                  ></Input>
                </div>
              </Form.Item>
            </div>
            <Form.Item
              label="Description"
              name={"description"}
              rules={[
                {
                  required: true,
                  message: "Description is required",
                },
              ]}
              className="col-span-2 w-full"
            >
              <div>
                <TextArea
                  value={dataStatus.description}
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

export default DrawerStatusCreate;
