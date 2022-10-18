import { Form, Input, Select, Spin, notification } from "antd";
import { data } from "flickity";
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

const DrawerEmailTemplateCreate = ({
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
  const [dataTemplate, setDataTemplate] = useState({
    id: null,
    name: "",
    subject: "",
    body: "",
  });
  const [disabledCreate, setDisabledCreate] = useState(true);

  // USEEFFECT
  // Validate input field
  useEffect(() => {
    if (
      dataTemplate.name !== "" &&
      dataTemplate.subject !== "" &&
      dataTemplate.body !== ""
    ) {
      setDisabledCreate(false);
    } else {
      setDisabledCreate(true);
    }
  }, [dataTemplate]);

  // console.log(dataTemplate)

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

  const handleCreateTemplate = () => {
    if (!isAllowedToAdd) {
      permissionWarningNotification("Menambah", "Template Email Rekrutmen");
      return;
    }
    setLoadingCreate(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/addRecruitmentEmailTemplate`,
      {
        method: "POST",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataTemplate),
      }
    )
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          notification.success({
            message: `Template email berhasil ditambahkan.`,
            duration: 3,
          });
          setTimeout(() => {
            onvisible(false);
            clearData();
          }, 500);
        } else {
          notification.error({
            message: `Gagal menambahkan template email. ${response2.message}`,
            duration: 3,
          });
        }
        setLoadingCreate(false);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan template email. ${err.response}`,
          duration: 3,
        });
        setLoadingCreate(false);
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
      title={"Tambah Template"}
      visible={visible}
      onClose={() => {
        clearData();
        onvisible(false);
      }}
      buttonOkText={"Simpan Template"}
      onClick={handleCreateTemplate}
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
              <div>
                <ReactQuill
                  theme="snow"
                  value={dataTemplate.body}
                  modules={modules}
                  formats={formats}
                  onChange={(value) => {
                    setDataTemplate((prev) => ({
                      ...prev,
                      body: value,
                    }));
                  }}
                  className="h-44 pb-10"
                />
              </div>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerEmailTemplateCreate;
