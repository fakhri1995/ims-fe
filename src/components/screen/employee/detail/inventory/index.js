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

const EmployeeInventoryDetail = ({
  employeeId,
  isAllowedToUpdateEmployeeInventory,
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
  const [inventoryList, setInventoryList] = useState(["test"]);

  // 3. HANDLER
  const onChangeInput = (e) => {
    setDataProfile({
      ...dataProfile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="">
      {dataEmployee?.inventories?.length > 0 ? (
        <Collapse
          bordered={false}
          defaultActiveKey={dataEmployee?.inventories[0]?.id}
          expandIconPosition={"right"}
          expandIcon={({ isActive }) => (
            <UpOutlined rotate={isActive ? 180 : 0} />
          )}
          accordion={true}
        >
          {dataEmployee?.inventories?.map((inventory, idx) => (
            <Collapse.Panel
              key={inventory.id}
              header={
                <div className="flex flex-row space-x-3 items-center">
                  <p className="text-md font-bold">
                    {inventory.device_name || "-"}
                  </p>
                  {isAllowedToUpdateEmployeeInventory && (
                    <button
                      className="bg-transparent hover:opacity-70"
                      onClick={(e) => {
                        e.stopPropagation();
                        rt.push(
                          `${employeeId}/editInventory?id=${inventory.id}`
                        );
                      }}
                    >
                      <EditIconSvg color={"#35763B"} size={20} />
                    </button>
                  )}
                </div>
              }
            >
              <div className="grid grid-cols-2">
                <div className="space-y-1 mb-2">
                  <p className="mig-caption--medium text-mono80">ID</p>
                  <p>{inventory.id_number || "-"}</p>
                </div>
                <div className="space-y-1 mb-2">
                  <p className="mig-caption--medium text-mono80">
                    Referensi Inventaris
                  </p>
                  <p>{inventory.referance_invertory || "-"}</p>
                </div>
                <div className="space-y-1 mb-2">
                  <p className="mig-caption--medium text-mono80">Tipe</p>
                  <p>{inventory.device_type || "-"}</p>
                </div>
                <div className="space-y-1 mb-2">
                  <p className="mig-caption--medium text-mono80">
                    Nomor Serial
                  </p>
                  <p>{inventory.serial_number || "-"}</p>
                </div>
                <div className="space-y-1 mb-2">
                  <p className="mig-caption--medium text-mono80">
                    Tanggal Penyerahan
                  </p>
                  <p>{inventory.date_delivery || "-"}</p>
                </div>
                <div className="space-y-1 mb-2">
                  <p className="mig-caption--medium text-mono80">
                    Tanggal Pengembalian
                  </p>
                  <p>{inventory.date_taking || "-"}</p>
                </div>
                <div className="space-y-1 mb-2">
                  <p className="mig-caption--medium text-mono80">
                    Penanggung Jawab Penyerahan
                  </p>
                  <p>{inventory.pic_delivery || "-"}</p>
                </div>
                <div className="space-y-1 mb-2">
                  <p className="mig-caption--medium text-mono80">
                    Penanggung Jawab Pengembalian
                  </p>
                  <p>{inventory.pic_taking || "-"}</p>
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
          ))}
        </Collapse>
      ) : (
        <p>Tidak ada inventaris & piranti pada {dataEmployee?.name}</p>
      )}
    </section>
  );
};

export default EmployeeInventoryDetail;
