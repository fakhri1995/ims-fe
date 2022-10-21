import { Form, Input, Select, Spin, notification } from "antd";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { permissionWarningNotification } from "../../../lib/helper";
import ButtonSys from "../../button";
import { TrashIconSvg } from "../../icon";
import { InputRequired } from "../../input";
import { Label } from "../../typography";
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

  // Text Editor Config
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <DrawerCore
      title={"Ubah Template"}
      visible={visible}
      onClose={() => {
        clearData();
        onvisible(false);
      }}
      buttonOkText={"Simpan Template"}
      onClick={handleUpdateTemplate}
      disabled={disabledUpdate}
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
                  message: "Nama template wajib diisi",
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
              label="Subyek"
              name={"subject"}
              rules={[
                {
                  required: true,
                  message: "Subyek wajib diisi",
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
                  message: "Body wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <>
                <ReactQuill
                  theme="snow"
                  value={dataTemplate.body}
                  modules={modules}
                  formats={formats}
                  onChange={(content, delta, source, editor) => {
                    setDataTemplate((prev) => ({
                      ...prev,
                      body: content,
                    }));
                    setTextEditorContent(editor.getText(content));
                  }}
                  className="h-44 pb-10"
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
