import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  UpOutlined,
} from "@ant-design/icons";
import {
  Button,
  Collapse,
  DatePicker,
  Form,
  Input,
  Select,
  Tag,
  Upload,
  notification,
} from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { RESUME_ADD, RESUME_ASSESSMENT_LIST } from "lib/features";

import {
  DownIconSvg,
  EditIconSvg,
  FileTextIconSvg,
  UploadIconSvg,
} from "../../../../../components/icon";
import {
  beforeUploadFileMaxSize,
  permissionWarningNotification,
} from "../../../../../lib/helper";

const EmployeeInventoryDetail = ({ employeeId }) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToCreateCandidate = hasPermission(RESUME_ADD);
  const isAllowedToGetAssessmentList = hasPermission(RESUME_ASSESSMENT_LIST);

  const [instanceForm] = Form.useForm();
  const rt = useRouter();

  // 1. USE STATE
  const [dataProfile, setDataProfile] = useState({
    id_photo: "",
    name: "",
    nip: "",
    nik: "",
    alias: "",
    telp: "",
    email_office: "",
    email_personal: "",
    domicile: "",
    birth_place: "",
    birth_date: "",
    gender: "",
    blood_type: "",
    marital_status: "",
    child_total: "",
    mother_name: "",
    npwp: "",
    bpjsk: "",
    bpjstk: "",
    rek_bukopin: "",
    rek_other: "",
  });
  const [inventoryId, setInventoryId] = useState(0);

  // 3. HANDLER
  const onChangeInput = (e) => {
    setDataProfile({
      ...dataProfile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="">
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIconPosition={"right"}
        expandIcon={({ isActive }) => (
          <UpOutlined rotate={isActive ? 180 : 0} />
        )}
      >
        {/* TODO: Loop devices */}
        <Collapse.Panel
          key={"1"}
          header={
            <div className="flex flex-row space-x-3 items-center">
              <p className="text-md font-bold">Laptop</p>
              <button
                className="bg-transparent hover:opacity-70"
                onClick={(e) => {
                  e.stopPropagation();
                  rt.push(`${employeeId}/editInventory?id=${inventoryId}`);
                }}
              >
                <EditIconSvg color={"#35763B"} size={20} />
              </button>
            </div>
          }
        >
          <div className="grid grid-cols-2">
            <div className="space-y-1 mb-2">
              <p className="mig-caption--medium text-mono80">ID</p>
              <p>1211342423</p>
            </div>
            <div className="space-y-1 mb-2">
              <p className="mig-caption--medium text-mono80">
                Referensi Inventaris
              </p>
              <p>12345678</p>
            </div>
            <div className="space-y-1 mb-2">
              <p className="mig-caption--medium text-mono80">Tipe</p>
              <p>Asus Vivobook</p>
            </div>
            <div className="space-y-1 mb-2">
              <p className="mig-caption--medium text-mono80">Nomor Serial</p>
              <p>12345678</p>
            </div>
            <div className="space-y-1 mb-2">
              <p className="mig-caption--medium text-mono80">
                Tanggal Penyerahan
              </p>
              <p>27 Oktober 2022</p>
            </div>
            <div className="space-y-1 mb-2">
              <p className="mig-caption--medium text-mono80">
                Tanggal Pengembalian
              </p>
              <p>27 Oktober 2024</p>
            </div>
            <div className="space-y-1 mb-2">
              <p className="mig-caption--medium text-mono80">
                Penanggung Jawab Penyerahan
              </p>
              <p>John Watson</p>
            </div>
            <div className="space-y-1 mb-2">
              <p className="mig-caption--medium text-mono80">
                Penanggung Jawab Pengembalian
              </p>
              <p>John Watson</p>
            </div>
            <div className="space-y-1 mb-3">
              <p className="mig-caption--medium text-mono80">
                Dokumen Penyerahan
              </p>
              <div className="flex flex-row space-x-3 items-center ">
                <FileTextIconSvg size={48} color={"black"} />
                <a>DokumenPenyerahan-Yasmin.pdf</a>
              </div>
            </div>
            <div className="space-y-1 mb-3">
              <p className="mig-caption--medium text-mono80">
                Dokumen Pengembalian
              </p>
              <div className="flex flex-row space-x-3 items-center ">
                <FileTextIconSvg size={48} color={"black"} />
                <a>DokumenPengembalian-Yasmin.pdf</a>
              </div>
            </div>
          </div>
        </Collapse.Panel>
      </Collapse>
    </section>
  );
};

export default EmployeeInventoryDetail;
