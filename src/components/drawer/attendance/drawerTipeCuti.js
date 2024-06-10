import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Collapse,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  Spin,
  Switch,
  Table,
  Tag,
  notification,
} from "antd";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

import PdfIcon from "assets/vectors/pdf-icon.svg";

import {
  CheckIconSvg,
  CloseIconSvg,
  UserIconSvg,
  UsercircleIconSvg,
} from "../../icon";

const DrawerTipeCuti = ({
  visible,
  onClose,
  fetchData,
  initProps,
  dataDefault,
}) => {
  const [showData, setShowData] = useState("1");
  const [isTahunan, setIsTahunan] = useState(false);
  const [isDocumentRequired, setIsDocumentRequired] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [instanceForm] = Form.useForm();
  const clickDetailEmployee = () => {
    setShowData("2");
  };

  const closeDrawer = () => {
    if (showData == "2") {
      setShowData("1");
    } else {
    }
  };

  const handleSubmit = (values) => {
    setLoadingSave(true);
    let datapayload = {
      name: values.nama,
      description: values.deskripsi,
      is_tahunan: isTahunan ? 1 : 0,
      is_document_required: isDocumentRequired ? 1 : 0,
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addLeaveType `, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datapayload),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setLoadingSave(false);
          onClose();
          fetchData();
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
        } else {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  useEffect(() => {
    if (dataDefault) {
      console.log("isi datadefault ", dataDefault);
      instanceForm.setFieldValue("nama", dataDefault.name);
      instanceForm.setFieldValue("deskripsi", dataDefault.description);
      setIsTahunan(dataDefault.is_tahunan == 0 ? false : true);
      setIsDocumentRequired(
        dataDefault.is_document_required == 0 ? false : true
      );
    }
  }, [dataDefault]);

  return (
    <Drawer
      width={550}
      title={dataDefault ? "Update Tipe Cuti" : "Tambah Tipe Cuti"}
      open={visible}
      onClose={onClose}
      footer={
        <div className={"flex gap-4 justify-end p-2"}>
          <div
            onClick={onClose}
            className={
              "bg-[#F3F3F3] py-2.5 px-8 rounded-[5px] hover:cursor-pointer"
            }
          >
            <p className={"text-xs leading-5 text-[#808080] font-bold"}>
              Batalkan
            </p>
          </div>
          <div
            onClick={() => instanceForm.submit()}
            className={
              "bg-[#35763B] flex items-center gap-4 h-[40px] py-2.5 px-8 rounded-[5px] hover:cursor-pointer"
            }
          >
            {loadingSave && (
              <Spin indicator={<LoadingOutlined style={{ fontSize: 18 }} />} />
            )}
            <p className="text-white text-xs leading-5 font-bold">Simpan</p>
          </div>
        </div>
      }
    >
      <div className={"flex flex-col gap-8"}>
        <p className={"text-xs leading-4 italic font-normal text-[#BF4A40]"}>
          *Informasi ini harus diisi
        </p>
        <Form layout="vertical" form={instanceForm} onFinish={handleSubmit}>
          <Form.Item
            label="Nama Cuti"
            name={"nama"}
            className="col-span-2"
            rules={[
              {
                required: true,
                message: "Nama Cuti wajib diisi",
              },
            ]}
          >
            <div className="flex gap-2 items-center ">
              <Input.TextArea placeholder="nama cuti" rows={2} />
            </div>
          </Form.Item>
          <Form.Item
            label="Deskripsi"
            name={"deskripsi"}
            className="col-span-2"
            rules={[
              {
                required: true,
                message: "Deskripsi wajib diisi",
              },
            ]}
          >
            <div className="flex gap-2 items-center ">
              <Input.TextArea placeholder="isi deskripsi" rows={4} />
            </div>
          </Form.Item>
        </Form>
        <div
          className={"h-[1px]"}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.06)" }}
        ></div>
        <div className={"flex flex-col gap-4"}>
          <p className={"text-lg text-[#4D4D4D] leading-6 font-bold"}>
            Konfigurasi Tipe Cuti
          </p>
          <div className={"flex flex-row justify-between items-center"}>
            <p className={"text-[#4D4D4D] text-xs leading-5 font-bold"}>
              Cuti Tahunan
            </p>
            <div className={"flex flex-row gap-2 items-center"}>
              <p className={"text-[#808080] text-xs leading-5 font-medium"}>
                Mengurangi Cuti
              </p>
              <Switch
                checked={isTahunan}
                onChange={() => setIsTahunan(!isTahunan)}
              />
            </div>
          </div>
          <div className={"flex flex-row justify-between items-center"}>
            <p className={"text-[#4D4D4D] text-xs leading-5 font-bold"}>
              File Pendukung
            </p>
            <div className={"flex flex-row gap-2 items-center"}>
              <p className={"text-[#808080] text-xs leading-5 font-medium"}>
                Wajib Diisi
              </p>
              <Switch
                checked={isDocumentRequired}
                onChange={() => setIsDocumentRequired(!isDocumentRequired)}
              />
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerTipeCuti;
