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

const ModalCategoryCreate = ({
  initProps,
  visible,
  onvisible,
  isAllowedToAddCategory,
  refetchCategories,
}) => {
  const { hasPermission } = useAccessControl();
  const [form] = Form.useForm();

  // 1. USE STATE
  const category = { name: "", description: "" };

  const [loading, setLoading] = useState(false);
  const [disableAdd, setDisableAdd] = useState(true);
  const [dataCategory, setDataCategory] = useState(category);
  const [modalConfirm, setModalConfirm] = useState(false);

  // 2. USE QUERY & USE EFFECT
  useEffect(() => {
    const requiredFields = ["name", "category"];
    const allFieldIsFilled = requiredFields.every((item) => dataCategory[item]);
    if (allFieldIsFilled) {
      setDisableAdd(false);
    }
  }, [dataCategory]);

  // 3. HANDLER
  const clearData = () => {
    setDataCategory(category);
    form.resetFields();
  };

  const handleClose = () => {
    onvisible(false);
    setModalConfirm(false);
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
      body: JSON.stringify(dataCategory),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          handleClose();
          notification.success({
            message: response.message,
            duration: 3,
          });
          refetchCategories();
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

  // console.log({ dataServiceList });
  // console.log({ dataCategory });

  return !modalConfirm ? (
    <Modal
      title={"Tambah Kategori"}
      visible={visible}
      onCancel={handleClose}
      maskClosable={false}
      width={700}
      footer={
        <Spin spinning={loading}>
          <ButtonSys
            fullWidth
            type={"primary"}
            onClick={() => setModalConfirm(true)}
            disabled={!dataCategory.name || !dataCategory.description}
          >
            <p>Tambah</p>
          </ButtonSys>
        </Spin>
      }
      loading={loading}
    >
      <div>
        <Form layout="vertical" form={form}>
          <div className="grid grid-cols-1 gap-x-6">
            <Form.Item
              label="Nama Kategori"
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Nama kategori wajib diisi",
                },
              ]}
            >
              <Input
                placeholder="Masukkan Nama Kategori"
                value={dataCategory?.name}
                onChange={(e) => {
                  setDataCategory((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
              />
            </Form.Item>
            <Form.Item
              label="Deskripsi Kategori"
              name={"description"}
              rules={[
                {
                  required: true,
                  message: "Deskripsi kategori wajib diisi",
                },
              ]}
            >
              <Input
                placeholder="Masukkan Deskripsi Kategori"
                value={dataCategory?.description}
                onChange={(e) => {
                  setDataCategory((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  ) : (
    <ModalUbah
      title={
        <div className="flex gap-2 items-center">
          <AlertCircleIconSvg size={32} color="#4D4D4D" />
          <h3 className="mig-heading--3">Konfirmasi Tambah Kategori</h3>
        </div>
      }
      visible={modalConfirm}
      onvisible={setModalConfirm}
      onOk={handleAdd}
      onCancel={() => setModalConfirm(false)}
      loading={loading}
      disabled={!isAllowedToAddCategory}
      okButtonText={"Ya, tambahkan"}
      closable={true}
    >
      <p>
        Apakah anda yakin ingin menambahkan kategori dengan nama{" "}
        <strong>{dataCategory?.name}</strong>?
      </p>
    </ModalUbah>
  );
};

export default ModalCategoryCreate;
