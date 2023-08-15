import { DatePicker, Form, Input, Modal, Select, Spin } from "antd";
import locale from "antd/lib/date-picker/locale/id_ID";
import moment from "moment";
import "moment/locale/id";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { CONTRACT_INVOICE_ADD } from "lib/features";

import ButtonSys from "../../button";

const ModalInvoiceCreate = ({
  initProps,
  visible,
  onvisible,
  dataContract,
}) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToAddInvoice = hasPermission(CONTRACT_INVOICE_ADD);
  const [form] = Form.useForm();

  // 1. USE STATE

  const [dataInvoiceDraft, setDataInvoiceDraft] = useState({});

  const [loading, setLoading] = useState(false);

  // 2. USE QUERY & USE EFFECT
  useEffect(() => {
    if (visible) {
      setDataInvoiceDraft({
        ...dataContract,
        invoice_raise_at: new Date(),
      });
    }
  }, [dataContract, visible]);

  // 3. HANDLER
  const clearData = () => {
    setDataInvoiceDraft();
    form.resetFields();
  };

  const handleClose = () => {
    onvisible(false);
    clearData();
  };

  const handleAddInvoice = () => {
    if (!isAllowedToAddInvoice) {
      permissionWarningNotification("Menambah", "Invoice");
      return;
    }

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addContractInvoice`, {
      method: `POST`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          handleClose();
          notification.success({
            message: `Draft invoice berhasil dibuat.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal membuat draft invoice. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

  // console.log({ dataInvoiceDraft });
  // console.log({ dataContract });

  return (
    <Modal
      title={"Buat Draft Invoice"}
      visible={visible}
      onCancel={handleClose}
      maskClosable={false}
      footer={
        <Spin spinning={loading}>
          <div className="flex space-x-2 justify-end items-center">
            <button
              onClick={handleClose}
              className="bg-transparent text-mono50 py-2 px-6 hover:text-mono80"
            >
              Batal
            </button>
            <ButtonSys
              type={"primary"}
              onClick={handleAddInvoice}
              disabled={
                !isAllowedToAddInvoice ||
                !dataInvoiceDraft?.title ||
                !dataInvoiceDraft?.invoice_raise_at
              }
            >
              <p>Buat Draft</p>
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Nama Invoice"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Nama invoice wajib diisi",
            },
          ]}
        >
          <>
            <Input
              placeholder="Masukkan nama invoice"
              defaultValue={dataInvoiceDraft?.title}
            />
          </>
        </Form.Item>
        <Form.Item
          label="PT Klien"
          name={"company_client"}
          rules={[
            {
              required: true,
              message: "PT klien wajib diisi",
            },
          ]}
        >
          <Input
            placeholder="Pilih PT klien"
            defaultValue={dataInvoiceDraft?.client?.name}
            disabled
          />
        </Form.Item>

        <Form.Item
          label="Tanggal Terbit Invoice"
          name={"invoice_raise_at"}
          rules={[
            {
              required: true,
              message: "Tanggal terbit wajib diisi",
            },
          ]}
        >
          <>
            <DatePicker
              allowEmpty
              format={"DD MMMM YYYY"}
              locale={locale}
              defaultValue={moment(dataInvoiceDraft?.invoice_raise_at)}
              onChange={(date, datestring) => {
                const defaultFormatDate = date.format("YYYY-MM-DD");
                setDataInvoiceDraft((prev) => ({
                  ...prev,
                  invoice_raise_at: defaultFormatDate,
                }));
              }}
              placeholder="Pilih tanggal terbit"
              renderExtraFooter={() => <div />}
              style={{ width: "100%" }}
            />
          </>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalInvoiceCreate;
