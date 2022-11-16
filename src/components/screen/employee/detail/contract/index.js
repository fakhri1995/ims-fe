import { UpOutlined } from "@ant-design/icons";
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

import { EditIconSvg, UploadIconSvg } from "../../../../../components/icon";
import {
  beforeUploadFileMaxSize,
  permissionWarningNotification,
} from "../../../../../lib/helper";

const EmployeeContractDetail = ({ employeeId }) => {
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

  const [contractId, setContractId] = useState(0);

  // 3. HANDLER
  const onChangeInput = (e) => {
    setDataProfile({
      ...dataProfile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIconPosition={"right"}
        expandIcon={({ isActive }) => (
          <UpOutlined rotate={isActive ? 180 : 0} />
        )}
      >
        {/* TODO: Loop contracts */}
        <Collapse.Panel
          key={"1"}
          header={
            <div className="flex flex-row space-x-3 items-center">
              <p className="text-sm font-bold">
                Kontrak Kerja Full Time Frontend Engineer
              </p>
              <Tag
                color="#35763B1A"
                className="text-primary100 px-4 py-1 rounded-md"
              >
                Aktif
              </Tag>
              <button
                className="bg-transparent hover:opacity-70"
                onClick={(e) => {
                  e.stopPropagation();
                  rt.push(`${employeeId}/editContract?id=${contractId}`);
                }}
              >
                <EditIconSvg color={"#35763B"} size={20} />
              </button>
            </div>
          }
        >
          <div className="grid grid-cols-2">
            <h5 className="mig-heading--5 col-span-2 mb-2">INFORMASI UMUM</h5>
            <div className="space-y-1 mb-2">
              <p className="mig-caption--medium text-mono80">Posisi</p>
              <p>Frontend Engineer</p>
            </div>
            <div className="space-y-1 mb-2">
              <p className="mig-caption--medium text-mono80">Status Kontrak</p>
              <p>Tetap</p>
            </div>
            <div className="space-y-1 col-span-2 mb-2">
              <p className="mig-caption--medium text-mono80">Dokumen Kontrak</p>
              <p>Tetap</p>
            </div>
            <div className="space-y-1 col-span-2 mb-2">
              <p className="mig-caption--medium text-mono80">Referensi PKWT</p>
              <p>Tetap</p>
            </div>
            <div className="space-y-1 mb-2">
              <p className="mig-caption--medium text-mono80">Awal Kontrak</p>
              <p>27 Oktober 2022</p>
            </div>
            <div className="space-y-1 mb-2">
              <p className="mig-caption--medium text-mono80">Akhir Kontrak</p>
              <p>27 Oktober 2024</p>
            </div>
            <div className="space-y-1 mb-2">
              <p className="mig-caption--medium text-mono80">Penempatan</p>
              <p>Jakarta Selatan</p>
            </div>
            <div className="space-y-1 mb-2">
              <p className="mig-caption--medium text-mono80">Kantor Baru</p>
              <p>Kantor MIG</p>
            </div>
            <div className="space-y-1 col-span-2 mb-3">
              <p className="mig-caption--medium text-mono80">Tanggal Resign</p>
              <p>27 Oktober 2024</p>
            </div>
            <div className="mb-3">
              <p className="mig-heading--5 mb-2">BENEFIT PENERIMAAN</p>
              <div className="space-y-1 col-span-2">
                <p className="mig-caption--medium text-mono80">Gaji Pokok</p>
                <p>Rp3.500.000</p>
              </div>
              <div className="space-y-1 col-span-2">
                <p className="mig-caption--medium text-mono80">
                  Tunjangan Uang Makan
                </p>
                <p>Rp550.000</p>
              </div>
            </div>
            <div className="mb-3">
              <p className="mig-heading--5 mb-2">BENEFIT PENGURANGAN</p>
              <div className="space-y-1 col-span-2">
                <p className="mig-caption--medium text-mono80">PPh 21</p>
                <p>Rp0</p>
              </div>
            </div>
          </div>
        </Collapse.Panel>
      </Collapse>
    </section>
  );
};

export default EmployeeContractDetail;
