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

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { RESUME_ADD, RESUME_ASSESSMENT_LIST } from "lib/features";

import {
  DownloadIconSvg,
  EditIconSvg,
  UploadIconSvg,
} from "../../../../../components/icon";
import {
  beforeUploadFileMaxSize,
  permissionWarningNotification,
} from "../../../../../lib/helper";
import ButtonSys from "../../../../button";
import { ModalDownloadPayslip } from "../../../../modal/modalCustom";

const EmployeePayslipDetail = ({ employeeId }) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToDownloadEmployeePayslip = hasPermission(RESUME_ADD);
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
  const [modalDownload, setModalDownload] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [downloadPass, setDownloadPass] = useState("");

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
        accordion={true}
      >
        {/* TODO: Loop payslips */}
        <Collapse.Panel
          key={"1"}
          header={
            <div className="flex flex-row space-x-3 items-center">
              <p className="text-sm font-bold">Oktober 2022</p>
              <Tag
                color="#35763B1A"
                className="text-primary100 px-4 py-1 rounded-md"
              >
                Diterbitkan
              </Tag>
            </div>
          }
        >
          <div className="flex flex-row justify-between items-center">
            <div className="grid grid-cols-2">
              <div className="space-y-1">
                <p className="mig-caption--medium text-mono80">
                  Total Hari Kerja
                </p>
                <p>25 hari</p>
              </div>
              <div className="space-y-1">
                <p className="mig-caption--medium text-mono80">
                  Tanggal Dibayarkan
                </p>
                <p>1 November 2022</p>
              </div>
            </div>
            <ButtonSys
              type={!isAllowedToDownloadEmployeePayslip ? "primary" : "default"}
              onClick={() => setModalDownload(true)}
              disabled={!isAllowedToDownloadEmployeePayslip}
            >
              <DownloadIconSvg color={"#35763B"} size={16} />
              <p className="ml-2">Unduh Slip Gaji</p>
            </ButtonSys>
          </div>
        </Collapse.Panel>
        <Collapse.Panel
          key={"2"}
          header={
            <div className="flex flex-row space-x-3 items-center">
              <p className="text-sm font-bold">Oktober 2022</p>
              <Tag
                color="#35763B1A"
                className="text-primary100 px-4 py-1 rounded-md"
              >
                Diterbitkan
              </Tag>
            </div>
          }
        >
          <div className="flex flex-row justify-between">
            <div className="grid grid-cols-2">
              <div className="space-y-1 mb-2">
                <p className="mig-caption--medium text-mono80">
                  Total Hari Kerja
                </p>
                <p>25 hari</p>
              </div>
              <div className="space-y-1 mb-2">
                <p className="mig-caption--medium text-mono80">
                  Tanggal Dibayarkan
                </p>
                <p>1 November 2022</p>
              </div>
            </div>
            <ButtonSys
              type={!isAllowedToDownloadEmployeePayslip ? "primary" : "default"}
              onClick={() => setModalDownload(true)}
              disabled={!isAllowedToDownloadEmployeePayslip}
            >
              <DownloadIconSvg color={"#35763B"} size={16} />
              <p className="ml-2">Unduh Slip Gaji</p>
            </ButtonSys>
          </div>
        </Collapse.Panel>
      </Collapse>

      {/* Modal Download Payslip */}
      {/* TODO: change access control */}
      <AccessControl hasPermission={RESUME_ADD}>
        <ModalDownloadPayslip
          visible={modalDownload}
          onvisible={setModalDownload}
          // onOk
          loading={loadingDownload}
          disabled={!isAllowedToDownloadEmployeePayslip}
          downloadPass={downloadPass}
          setDownloadPass={setDownloadPass}
          instanceForm={instanceForm}
          monthOfPayslip={"Oktober 2022"}
        />
      </AccessControl>
    </section>
  );
};

export default EmployeePayslipDetail;
