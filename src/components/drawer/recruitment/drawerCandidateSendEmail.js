import { Form, Input, Select, Spin, notification } from "antd";
import parse from "html-react-parser";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { ASSESSMENT_ADD } from "lib/features";
import { RECRUITMENT_EMAIL_TEMPLATES_LIST_GET } from "lib/features";

import ButtonSys from "../../button";
import { TrashIconSvg } from "../../icon";
import { InputRequired } from "../../input";
import { Label } from "../../typography";
import DrawerCore from "../drawerCore";

// Quill library for text editor has to be imported dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const DrawerCandidateSendEmail = ({
  visible,
  onvisible,
  initProps,
  setRefresh,
  isAllowedToAddRecruitment,
  dataCandidate,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetEmailTemplateList = hasPermission(
    RECRUITMENT_EMAIL_TEMPLATES_LIST_GET
  );
  const isAllowedToSendEmail = hasPermission(
    RECRUITMENT_EMAIL_TEMPLATES_LIST_GET
  );

  const [instanceForm] = Form.useForm();

  //USESTATE
  const [dataSendEmail, setDataSendEmail] = useState({
    email: "",
    name: "", //template name
    subject: "",
    body: "",
  });
  const [textEditorContent, setTextEditorContent] = useState("");
  const [loadingSendEmail, setLoadingSendEmail] = useState(false);
  const [disabledSendEmail, setDisabledSendEmail] = useState(true);

  const [loadingEmailTemplateList, setLoadingEmailTemplateList] =
    useState(false);
  const [dataEmailTemplateList, setDataEmailTemplateList] = useState([]);

  // useEffect
  // 3.1. Autofill email input when drawer opened
  useEffect(() => {
    if (visible === true) {
      setDataSendEmail({
        ...dataSendEmail,
        email: dataCandidate.email,
      });
    }
  }, [visible]);

  // 3.2. Get Recruitment Email Template List
  useEffect(() => {
    if (!isAllowedToGetEmailTemplateList) {
      permissionWarningNotification("Mendapatkan", "Daftar Template Email");
      setLoadingEmailTemplateList(false);
      return;
    }

    setLoadingEmailTemplateList(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentEmailTemplatesList`,
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
          setDataEmailTemplateList(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingEmailTemplateList(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingEmailTemplateList(false);
      });
  }, [isAllowedToGetEmailTemplateList]);

  // 3.3. Auto replace candidate name and role name format
  useEffect(() => {
    const mapObj = {
      "[role_name]": dataCandidate.role?.name,
      "[candidate_name]": dataCandidate.name,
    };
    let finalSubject = dataSendEmail.subject?.replace(
      /\[role_name\]|\[candidate_name\]/gi,
      function (matched) {
        return mapObj[matched];
      }
    );

    let finalBody = dataSendEmail.body?.replace(
      /\[role_name\]|\[candidate_name\]/gi,
      function (matched) {
        return mapObj[matched];
      }
    );

    setDataSendEmail({
      ...dataSendEmail,
      subject: finalSubject,
      body: finalBody,
    });
  }, [dataSendEmail.name]);

  // 3.4. Check if all input is filled
  useEffect(() => {
    let allFilled = Object.values(dataSendEmail).every(
      (value) => value !== "" && value !== null
    );
    if (allFilled && textEditorContent.length > 1) {
      setDisabledSendEmail(false);
    } else {
      setDisabledSendEmail(true);
    }
  }, [dataSendEmail, textEditorContent]);

  //HANDLER
  const onChangeInput = (e) => {
    setDataSendEmail({
      ...dataSendEmail,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendEmail = () => {
    if (!isAllowedToSendEmail) {
      permissionWarningNotification("Mengirim", "email kepada kandidat");
      return;
    }
    setLoadingSendEmail(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sendEmail`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSendEmail),
    })
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          notification.success({
            message: `Email berhasil dikirim.`,
            duration: 3,
          });
          setTimeout(() => {
            onvisible(false);
            setDataSendEmail({});
          }, 500);
        } else {
          notification.error({
            message: `Gagal mengirim email. ${response2.message}`,
            duration: 3,
          });
        }
        setLoadingSendEmail(false);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengirim email. ${err.response}`,
          duration: 3,
        });
        setLoadingSendEmail(false);
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
      title={"Kirim Email"}
      visible={visible}
      onClose={() => {
        setDataSendEmail({
          email: "",
          name: "", //template name
          subject: "",
          body: "",
        });
        onvisible(false);
      }}
      buttonOkText={"Kirim Email"}
      onClick={handleSendEmail}
      disabled={disabledSendEmail}
    >
      <Spin spinning={loadingSendEmail}>
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
              label="Email"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Email kandidat wajib diisi",
                },
                {
                  pattern:
                    /(\-)|(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,
                  message: "Email belum diisi dengan benar",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Input
                  value={dataSendEmail.email}
                  name={"email"}
                  onChange={onChangeInput}
                  disabled={true}
                />
              </div>
            </Form.Item>

            <Form.Item
              label="Template"
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Template email wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Select
                  name={"name"}
                  placeholder="Pilih template email..."
                  value={dataSendEmail.name}
                  onChange={(value) => {
                    let selectedTemplate = dataEmailTemplateList.find(
                      (template) => template.id === value
                    );
                    setDataSendEmail({
                      ...dataSendEmail,
                      name: value,
                      subject: selectedTemplate.subject,
                      body: selectedTemplate.body,
                    });
                    setTextEditorContent(selectedTemplate.body);
                  }}
                >
                  {dataEmailTemplateList.map((template) => (
                    <Select.Option key={template.id} value={template.id}>
                      {template.name}
                    </Select.Option>
                  ))}
                </Select>
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
                  value={dataSendEmail.subject}
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
                  value={dataSendEmail.body}
                  onChange={(content, delta, source, editor) => {
                    setDataSendEmail((prev) => ({
                      ...prev,
                      body: content,
                    }));
                    setTextEditorContent(editor.getText(content));
                  }}
                  modules={modules}
                  formats={formats}
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

export default DrawerCandidateSendEmail;
