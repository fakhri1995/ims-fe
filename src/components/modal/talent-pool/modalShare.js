import { InfoCircleOutlined } from "@ant-design/icons";
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
import { AlertCircleIconSvg } from "../../icon";
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
  const [requesterList, setRequesterList] = useState([]);

  // 2. USE QUERY & USE EFFECT
  useEffect(() => {
    const requiredFields = ["name", "category"];
    const allFieldIsFilled = requiredFields.every((item) => dataForm[item]);
    if (allFieldIsFilled) {
      setDisableAdd(false);
    }
  }, [dataForm]);

  // 3. HANDLER
  const clearData = () => {
    setDataForm(category);
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

  if (modalLink) {
    return (
      <ModalUbah
        title={
          <div className="flex gap-2 items-center">
            <AlertCircleIconSvg size={32} color="#4D4D4D" />
            <h3 className="mig-heading--3">Konfirmasi Tambah Kategori</h3>
          </div>
        }
        visible={modalLink}
        onvisible={setModalLink}
        onOk={handleAdd}
        onCancel={() => setModalLink(false)}
        loading={loading}
        disabled={!isAllowedToAddCategory}
        okButtonText={"Ya, tambahkan"}
        closable={true}
      >
        <p>
          Apakah anda yakin ingin menambahkan kategori dengan nama{" "}
          <strong>{dataForm?.name}</strong>?
        </p>
      </ModalUbah>
    );
  }

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

  // console.log({ dataServiceList });
  // console.log({ dataForm });

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <p>Bagikan Daftar Talent {category.name}</p>
          <InfoCircleOutlined size={16} />
        </div>
      }
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
            disabled={!dataForm.name || !dataForm.description}
          >
            <p>Generate</p>
          </ButtonSys>
        </Spin>
      }
      loading={loading}
    >
      <div>
        <Form layout="vertical" form={form}>
          <div className="grid grid-cols-1 gap-x-6">
            <Form.Item
              label="Nama Peminta"
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Nama Peminta wajib diisi",
                },
              ]}
            >
              <Select
                // defaultValue={dataUpdateBasic.assessment_id}
                onChange={(value, option) => {
                  setDataForm((prev) => ({
                    ...prev,
                    requester_id: value,
                    company_name: option?.company_name,
                  }));
                }}
                // disabled={}
              >
                {requesterList?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Nama Perusahaan" name={"company_name"} disabled>
              <Input
                placeholder="Masukkan Nama Perusahaan"
                value={dataForm?.company_name}
                onChange={(e) => {
                  setDataForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              />
            </Form.Item>
            <Form.Item label="Masa Berlaku Link" name={"name"}>
              <Select
                // defaultValue={dataUpdateBasic.assessment_id}
                onChange={(value, option) => {
                  console.log({ value, option });
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
    </Modal>
  );
};

export default ModalShare;
