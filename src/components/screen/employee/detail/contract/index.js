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
import "moment/locale/id";
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

const EmployeeContractDetail = ({
  employeeId,
  isAllowedToUpdateEmployeeContract,
  dataEmployee,
}) => {
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
        defaultActiveKey={dataEmployee?.contracts[0]?.id}
        expandIconPosition={"right"}
        expandIcon={({ isActive }) => (
          <UpOutlined rotate={isActive ? 180 : 0} />
        )}
        accordion={true}
      >
        {dataEmployee?.contracts?.map((contract, idx) => (
          <Collapse.Panel
            key={contract.id}
            header={
              <div className="flex flex-row space-x-3 items-center">
                <p className="text-sm font-bold">
                  {contract.contract_name || "-"}
                </p>
                {contract.is_employee_active ? (
                  <Tag
                    color="#35763B1A"
                    className="text-primary100 px-4 py-1 rounded-md"
                  >
                    Aktif
                  </Tag>
                ) : (
                  <Tag
                    color="#BF4A401A"
                    className="text-primary100 px-4 py-1 rounded-md"
                  >
                    Tidak Aktif
                  </Tag>
                )}

                {isAllowedToUpdateEmployeeContract && (
                  <button
                    className="bg-transparent hover:opacity-70"
                    onClick={(e) => {
                      e.stopPropagation();
                      rt.push(`${employeeId}/editContract?id=${contract.id}`);
                    }}
                  >
                    <EditIconSvg color={"#35763B"} size={20} />
                  </button>
                )}
              </div>
            }
          >
            <div className="grid grid-cols-2">
              <h5 className="mig-heading--5 col-span-2 mb-2">INFORMASI UMUM</h5>
              <div className="space-y-1 mb-2">
                <p className="mig-caption--medium text-mono80">Posisi</p>
                <p>{contract.role_name || "-"}</p>
              </div>
              <div className="space-y-1 mb-2">
                <p className="mig-caption--medium text-mono80">
                  Status Kontrak
                </p>
                <p>{contract.contract_status_name || "-"}</p>
              </div>
              <div className="space-y-1 col-span-2 mb-2">
                <p className="mig-caption--medium text-mono80">
                  Dokumen Kontrak
                </p>
                <p>{contract.contract_doc || "-"}</p>
              </div>
              <div className="space-y-1 col-span-2 mb-2">
                <p className="mig-caption--medium text-mono80">
                  Referensi PKWT
                </p>
                <p>{contract.pkwt_reference || "-"}</p>
              </div>
              <div className="space-y-1 mb-2">
                <p className="mig-caption--medium text-mono80">Awal Kontrak</p>
                <p>
                  {contract.contract_start_at
                    ? moment(contract.contract_starts_at).format("DD MMMM YYYY")
                    : "-"}
                </p>
              </div>
              <div className="space-y-1 mb-2">
                <p className="mig-caption--medium text-mono80">Akhir Kontrak</p>
                <p>
                  {contract.contract_end_at
                    ? moment(contract.contract_ends_at).format("DD MMMM YYYY")
                    : "-"}
                </p>
              </div>
              <div className="space-y-1 mb-2">
                <p className="mig-caption--medium text-mono80">Penempatan</p>
                <p>{contract.placement || "-"}</p>
              </div>
              <div className="space-y-1 mb-2">
                <p className="mig-caption--medium text-mono80">Kantor Baru</p>
                <p>{contract.new_office || "-"}</p>
              </div>
              <div className="space-y-1 col-span-2 mb-3">
                <p className="mig-caption--medium text-mono80">
                  Tanggal Resign
                </p>
                <p>
                  {contract.resign_at
                    ? moment(contract.resign_at).format("DD MMMM YYYY")
                    : "-"}
                </p>
              </div>
              {/* TODO: change benefit data */}
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
        ))}
      </Collapse>
    </section>
  );
};

export default EmployeeContractDetail;
