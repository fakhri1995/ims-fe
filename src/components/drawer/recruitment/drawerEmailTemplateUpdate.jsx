import { Form, Input, Select, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

import { permissionWarningNotification } from "../../../lib/helper";
import CustomTextEditor from "../../CustomTextEditor";
import DrawerCore from "../drawerCore";

const DrawerEmailTemplateUpdate = ({
  id,
  visible,
  onvisible,
  initProps,
  trigger,
  setRefresh,
  isAllowedToGetEmailTemplate,
  isAllowedToUpdateEmailTemplate,
  setLoadingUpdate,
  loadingUpdate,
  onClickDelete,
}) => {
  /**
   * Dependencies
   */

  const [instanceForm] = Form.useForm();

  // USESTATE
  const [dataTemplate, setDataTemplate] = useState({
    id: null,
    name: "",
    subject: "",
    body: "",
  });
  const [loadingDataUpdate, setLoadingDataUpdate] = useState(false);
  const [disabledUpdate, setDisabledUpdate] = useState(true);
  const [textEditorContent, setTextEditorContent] = useState("");

  // USEEFFECT
  // Validate input field
  useEffect(() => {
    if (
      dataTemplate.name !== "" &&
      dataTemplate.subject !== "" &&
      textEditorContent.length > 1
    ) {
      setDisabledUpdate(false);
    } else {
      setDisabledUpdate(true);
    }
  }, [dataTemplate, textEditorContent]);

  // Get email template data
  useEffect(() => {
    if (!isAllowedToGetEmailTemplate) {
      setLoadingDataUpdate(false);
      permissionWarningNotification("Mendapatkan", "Data Template Email");
      return;
    }

    if (trigger !== -1) {
      setLoadingDataUpdate(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentEmailTemplate?id=${id.current}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          setDataTemplate((prev) => ({
            ...prev,
            id: res2.data.id,
            name: res2.data.name,
            subject: res2.data.subject,
            body: res2.data.body,
          }));
          setTextEditorContent(res2.data.body);
          setLoadingDataUpdate(false);
        });
    }
  }, [trigger, isAllowedToGetEmailTemplate]);

  //HANDLER
  const onChangeInput = (e) => {
    setDataTemplate({
      ...dataTemplate,
      [e.target.name]: e.target.value,
    });
  };

  const clearData = () => {
    setDataTemplate({
      id: null,
      name: "",
      subject: "",
      body: "",
    });
  };

  const handleUpdateTemplate = () => {
    if (!isAllowedToUpdateEmailTemplate) {
      permissionWarningNotification("Mengubah", "Template Email Rekrutmen");
      return;
    }
    setLoadingUpdate(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/updateRecruitmentEmailTemplate`,
      {
        method: "PUT",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataTemplate),
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
            message: `Gagal mengubah template email. ${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        setLoadingUpdate(false);
        notification["error"]({
          message: `Gagal mengubah template email. ${err.message}`,
          duration: 3,
        });
      });
  };

  return (
    <DrawerCore
      title={"Edit Template"}
      visible={visible}
      onClose={() => {
        clearData();
        onvisible(false);
      }}
      buttonOkText={"Save Change"}
      onClick={handleUpdateTemplate}
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
              label="Template Name"
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Template Name is required",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Input
                  value={dataTemplate.name}
                  name={"name"}
                  onChange={onChangeInput}
                />
              </div>
            </Form.Item>

            <Form.Item
              label="Subject"
              name={"subject"}
              rules={[
                {
                  required: true,
                  message: "Subject is required",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Input
                  value={dataTemplate.subject}
                  name={"subject"}
                  onChange={onChangeInput}
                />
              </div>
            </Form.Item>
            <Form.Item
              label="Body"
              name={"body"}
              rules={[
                {
                  required: true,
                  message: "Body is required",
                },
              ]}
              className="col-span-2"
            >
              <>
                <CustomTextEditor
                  placeholder={""}
                  value={dataTemplate.body}
                  onChange={(content, delta, source, editor) => {
                    setDataTemplate((prev) => ({
                      ...prev,
                      body: content,
                    }));
                    setTextEditorContent(editor.getText(content));
                  }}
                />
              </>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerEmailTemplateUpdate;
