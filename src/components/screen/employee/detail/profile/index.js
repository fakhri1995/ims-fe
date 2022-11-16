import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  notification,
} from "antd";
import moment from "moment";
import React from "react";
import { useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { RESUME_ADD, RESUME_ASSESSMENT_LIST } from "lib/features";

import { UploadIconSvg } from "../../../../../components/icon";
import {
  beforeUploadFileMaxSize,
  permissionWarningNotification,
} from "../../../../../lib/helper";

const EmployeeProfileDetail = () => {
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

  // 3. HANDLER
  const onChangeInput = (e) => {
    setDataProfile({
      ...dataProfile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="flex flex-row space-x-4">
      {/* Left column */}
      <div className="space-y-2 w-full">
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">NIK</p>
          <p>012345678123000</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Alias</p>
          <p>Yasmin</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Domisili</p>
          <p>Jakarta</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Email Pribadi</p>
          <p>yasmin@gmail.com</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Nama Ibu Kandung</p>
          <p>Jane Doe</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Tempat Lahir</p>
          <p>Jakarta Selatan</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Jenis Kelamin</p>
          <p>Perempuan</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Status Kawin</p>
          <p>Belum Kawin</p>
        </div>
      </div>

      {/* Right column */}
      <div className="space-y-2 w-full">
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Nomor NPWP</p>
          <p>012345678123000</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">
            Nomor Rekening Bank KB Bukopin
          </p>
          <p>1234567890</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">
            Nomor BPJS Kesehatan
          </p>
          <p>1234567890</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">
            Nomor BPJS Ketenagakerjaan
          </p>
          <p>1234567890</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">
            Nomor Rekening Bank Lainnya
          </p>
          <p>1234567890</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Tanggal Lahir</p>
          <p>11 November 2000</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Golongan Darah</p>
          <p>A</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Jumlah Anak</p>
          <p>0</p>
        </div>
      </div>
    </section>
  );
};

export default EmployeeProfileDetail;
