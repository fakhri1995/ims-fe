import {
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  notification,
} from "antd";
import locale from "antd/lib/date-picker/locale/id_ID";
import moment from "moment";
import "moment/locale/id";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { CONTRACT_INVOICE_ADD } from "lib/features";

import { momentFormatDate } from "../../../lib/helper";
import ButtonSys from "../../button";
import { AlertCircleIconSvg } from "../../icon";
import { ModalUbah } from "../modalCustom";

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
  const [modalConfirm, setModalConfirm] = useState(false);

  // 2. USE QUERY & USE EFFECT
  useEffect(() => {
    if (visible) {
      setDataInvoiceDraft({
        invoice_name: dataContract?.title,
        invoice_raise_at: moment(new Date()).format("YYYY-MM-DD"),
        contract_template_id: dataContract?.id,
      });
    }
  }, [dataContract, visible]);

  // 3. HANDLER
  const clearData = () => {
    setDataInvoiceDraft({});
    form.resetFields();
  };

  const handleClose = () => {
    onvisible(false);
    setModalConfirm(false);
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
      body: JSON.stringify(dataInvoiceDraft),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          handleClose();
          notification.success({
            message: `Draft invoice berhasil ditambahkan.`,
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
          message: `Gagal menambahkan draft invoice. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

  // console.log({ dataInvoiceDraft });
  // console.log({ dataContract });

  return !modalConfirm ? (
    <Modal
      title={"Buat Draft Invoice"}
      visible={visible}
      onCancel={handleClose}
      maskClosable={false}
      footer={
        <Spin spinning={loading}>
          <div className="flex space-x-4 justify-end items-center">
            <ButtonSys type={"primary"} color={"mono100"} onClick={handleClose}>
              Batalkan
            </ButtonSys>
            <ButtonSys
              type={"primary"}
              onClick={() => setModalConfirm(true)}
              disabled={
                !isAllowedToAddInvoice ||
                !dataInvoiceDraft?.invoice_name ||
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
          name={"invoice_name"}
          rules={[
            {
              required: true,
              message: "Nama invoice wajib diisi",
            },
          ]}
        >
          <>
            <Input
              name="invoice_name"
              placeholder="Masukkan nama invoice"
              value={dataInvoiceDraft?.invoice_name}
              onChange={(e) =>
                setDataInvoiceDraft((prev) => ({
                  ...prev,
                  invoice_name: e.target.value,
                }))
              }
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
            defaultValue={dataContract?.client?.name}
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
              value={moment(dataInvoiceDraft?.invoice_raise_at)}
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
  ) : (
    <ModalUbah
      title={
        <div className="flex gap-2 items-center">
          <AlertCircleIconSvg size={28} color={"#35763B75"} />
          <h3 className="mig-heading--3 text-primary100">
            Konfirmasi Buat Draft
          </h3>
        </div>
      }
      visible={modalConfirm}
      onvisible={setModalConfirm}
      onOk={handleAddInvoice}
      onCancel={() => setModalConfirm(false)}
      loading={loading}
      disabled={!isAllowedToAddInvoice}
      okButtonText={"Ya, Buat Draft"}
      closable={false}
    >
      <p>
        Apakah Anda yakin ingin membuat draft dengan nama invoice{" "}
        <strong>{dataInvoiceDraft?.invoice_name}</strong> dari PT klien{" "}
        <strong>{dataContract?.client?.name}</strong> dengan tanggal terbit{" "}
        <strong>{momentFormatDate(dataInvoiceDraft?.invoice_raise_at)}</strong>.
      </p>
    </ModalUbah>
  );
};

export default ModalInvoiceCreate;
