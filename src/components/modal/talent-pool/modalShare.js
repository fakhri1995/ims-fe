import {
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Spin,
  notification,
} from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { permissionWarningNotification } from "../../../lib/helper";
import ButtonSys from "../../button";
import { AlertCircleIconSvg, CopyIconSvg, InfoCircleIconSvg } from "../../icon";
import ModalCore from "../modalCore";
import { ModalUbah } from "../modalCustom";

const ModalShare = ({
  initProps,
  visible,
  onvisible,
  isAllowedToAddCategory,
  category,
  // refetchCategories,
}) => {
  const { hasPermission } = useAccessControl();
  const [form] = Form.useForm();

  // 1. USE STATE
  const [loading, setLoading] = useState(false);
  const [disableAdd, setDisableAdd] = useState(true);
  const [dataForm, setDataForm] = useState({
    requester_id: 0,
    company_name: "",
    duration: 0,
  });
  const [modalLink, setModalLink] = useState(false);
  const [requesterList, setRequesterList] = useState([
    { id: 1, name: "person1", company_name: "PT1" },
    { id: 2, name: "person2", company_name: "PT2" },
  ]);

  // 2. USE QUERY & USE EFFECT
  // useEffect(() => {
  //   const requiredFields = ["name", "category"];
  //   const allFieldIsFilled = requiredFields.every((item) => dataForm[item]);
  //   if (allFieldIsFilled) {
  //     setDisableAdd(false);
  //   }
  // }, [dataForm]);

  // 3. HANDLER
  const clearData = () => {
    setDataForm({ requester_id: 0, company_name: "", duration: 0 });
    form.resetFields();
  };

  const handleClose = () => {
    onvisible(false);
    setModalLink(false);
    clearData();
  };

  const handleAdd = () => {
    if (!isAllowedToAddCategory) {
      permissionWarningNotification("Membuat", "Kategori");
      return;
    }

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addTalentPoolCategory`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataForm),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          handleClose();
          notification.success({
            message: response.message,
            duration: 3,
          });
          // refetchCategories();
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambah kategori. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

  const durationList = [
    {
      label: "1 Hari",
      value: 1,
    },
    {
      label: "3 Hari",
      value: 3,
    },
    {
      label: "5 Hari",
      value: 5,
    },
    {
      label: "1 Minggu",
      value: 7,
    },
    {
      label: "1 Bulan",
      value: 30,
    },
  ];

  const title = (
    <div className="flex items-center gap-2">
      <p className="mig-heading--4">Bagikan Daftar Talent {category.name}</p>
      <InfoCircleIconSvg size={16} color={"#000000"} />
    </div>
  );

  if (modalLink) {
    return (
      <ModalCore
        title={title}
        visible={modalLink}
        onCancel={handleClose}
        closable={true}
        maskClosable={true}
        footer={null}
      >
        <div
          className="flex items-center justify-between mig-caption--bold text-primary100 
        p-4 bg-backdrop rounded-md"
        >
          <p>[link token auth]</p>
          <div className="flex items-center gap-2">
            <CopyIconSvg size={24} color={"#35763B"} />
            <p>Salin Link</p>
          </div>
        </div>
      </ModalCore>
    );
  }

  return (
    <ModalCore
      title={title}
      visible={visible}
      onCancel={handleClose}
      maskClosable={false}
      width={700}
      footer={
        <Spin spinning={loading}>
          <ButtonSys
            fullWidth
            type={"primary"}
            onClick={() => setModalLink(true)}
            // disabled={!dataForm.requester_id}
          >
            <p>Generate</p>
          </ButtonSys>
        </Spin>
      }
      loading={loading}
    >
      <div>
        <Form layout="vertical">
          <div className="grid grid-cols-1 gap-x-6">
            <Form.Item
              label="Nama Peminta"
              name={"requester_id"}
              rules={[
                {
                  required: true,
                  message: "Nama Peminta wajib diisi",
                },
              ]}
            >
              <Select
                value={dataForm.requester_id}
                onChange={(value, option) => {
                  setDataForm((prev) => ({
                    ...prev,
                    requester_id: value,
                    company_name: option.company_name,
                  }));
                }}
                // disabled={}
              >
                {requesterList?.map((item) => (
                  <Select.Option key={item.id} value={item.id} {...item}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Nama Perusahaan" name={"company_name"}>
              <Input
                placeholder="Masukkan Nama Perusahaan"
                value={dataForm.company_name}
                disabled
              />
            </Form.Item>
            <Form.Item label="Masa Berlaku Link" name={"name"}>
              <Select
                value={dataForm?.duration}
                onChange={(value, option) => {
                  setDataForm((prev) => ({
                    ...prev,
                    duration: value,
                  }));
                }}
                // disabled={}
                options={durationList}
              ></Select>
            </Form.Item>
          </div>
        </Form>
      </div>
    </ModalCore>
  );
};

export default ModalShare;
