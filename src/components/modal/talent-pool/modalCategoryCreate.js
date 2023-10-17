import {
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Spin,
  notification,
} from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { PRODUCTS_GET } from "lib/features";

import { ProductCatalogService } from "../../../apis/product-catalog";
import {
  countSubTotal,
  permissionWarningNotification,
} from "../../../lib/helper";
import ButtonSys from "../../button";
import { PlusIconSvg } from "../../icon";
import { InputCurrency } from "../../input";

const ModalCategoryCreate = ({
  initProps,
  visible,
  onvisible,
  isAllowedToAddCategory,
  setRefreshCategory,
}) => {
  const { hasPermission } = useAccessControl();
  const [form] = Form.useForm();

  // 1. USE STATE
  const category = { name: "", description: "" };

  const [loading, setLoading] = useState(false);
  const [serviceTypeSearch, setServiceTypeSearch] = useState("");
  const [disableAdd, setDisableAdd] = useState(true);
  const [dataCategory, setDataCategory] = useState(category);

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
          setRefreshCategory((prev) => prev + 1);
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

  return (
    <Modal
      title={"Tambah Service"}
      visible={visible}
      onCancel={handleClose}
      maskClosable={false}
      width={700}
      footer={
        <Spin spinning={loading}>
          <div className="flex  items-center">
            <ButtonSys
              fullWidth
              type={"primary"}
              color={"mono50"}
              onClick={handleAdd}
              disabled={!dataCategory.name || !dataCategory.description}
            >
              <p>Tambah</p>
            </ButtonSys>
          </div>
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
  );
};

export default ModalCategoryCreate;
