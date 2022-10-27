import { Form, Input, Select, Spin, notification } from "antd";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { ASSESSMENT_ADD } from "lib/features";
import { RECRUITMENT_EMAIL_TEMPLATES_LIST_GET } from "lib/features";

import ButtonSys from "../../button";
import { TrashIconSvg } from "../../icon";
import { InputRequired } from "../../input";
import { Label } from "../../typography";
import DrawerCore from "../drawerCore";

const DrawerCandidateSendEmail = ({
  visible,
  onvisible,
  initProps,
  setRefresh,
  isAllowedToAddRecruitment,
  dataRoleList,
  dataStageList,
  dataStatusList,
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
    name: "",
    subject: "",
    body: "",
  });
  const [loadingSendEmail, setLoadingSendEmail] = useState(false);
  const [disabledSendEmail, setDisabledSendEmail] = useState(true);

  const [loadingEmailTemplateList, setLoadingEmailTemplateList] =
    useState(false);
  const [dataEmailTemplateList, setDataEmailTemplateList] = useState([]);

  // useEffect
  // 3.1. Get Recruitment Email Template List
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

  // USEEFFECT
  useEffect(() => {
    let allFilled = Object.values(dataSendEmail).every(
      (value) => value !== "" && value !== null
    );
    if (allFilled) {
      setDisabledSendEmail(false);
    } else {
      setDisabledSendEmail(true);
    }
  }, [dataSendEmail]);

  return (
    <DrawerCore
      title={"Kirim Email"}
      visible={visible}
      onClose={() => {
        setDataSendEmail({});
        onvisible(false);
      }}
      buttonOkText={"Kirim Email"}
      // onClick={handleSendEmail}
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
          </Form>
          {dataSendEmail.name && (
            <div className="flex flex-col space-y-6">
              <div>
                <p className="mig-caption--medium">Subject</p>
                <p>{dataSendEmail.subject}</p>
              </div>
              <div>
                <p className="mig-caption--medium">Body</p>
                <p>{dataSendEmail.body ? parse(dataSendEmail.body) : null}</p>
              </div>
            </div>
          )}
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerCandidateSendEmail;
