import React from "react";

import { useAccessControl } from "contexts/access-control";

import { momentFormatDate } from "../../../../../lib/helper";

const EmployeeProfileDetail = ({ dataEmployee }) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const maritalStatusList = [
    {
      value: 0,
      label: "Belum kawin",
    },
    {
      value: 1,
      label: "Kawin",
    },
    {
      value: 2,
      label: "Cerai hidup",
    },
    {
      value: 3,
      label: "Cerai mati",
    },
  ];

  // Mapping marital status ID to label
  const mappingMaritalStatus = () =>
    maritalStatusList.find(
      (status) => status.value === dataEmployee?.marital_status
    ).label;

  return (
    <section className="flex flex-row space-x-4">
      {/* Left column */}
      <div className="space-y-2 w-full">
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">NIK</p>
          <p>{dataEmployee?.nik || "-"}</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Alias</p>
          <p>{dataEmployee?.alias || "-"}</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Domisili</p>
          <p>{dataEmployee?.domicile || "-"}</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Email Pribadi</p>
          <p>{dataEmployee?.email_personal || "-"}</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Nama Ibu Kandung</p>
          <p>{dataEmployee?.bio_mother_name || "-"}</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Tempat Lahir</p>
          <p>{dataEmployee?.birth_place || "-"}</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Jenis Kelamin</p>
          <p>{dataEmployee?.gender || "-"}</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Status Kawin</p>
          <p>{dataEmployee?.marital_status ? mappingMaritalStatus() : "-"}</p>
        </div>
      </div>

      {/* Right column */}
      <div className="space-y-2 w-full">
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Nomor NPWP</p>
          <p>{dataEmployee?.npwp || "-"}</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">
            Nomor Rekening Bank KB Bukopin
          </p>
          <p>{dataEmployee?.acc_number_bukopin || "-"}</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">
            Nomor BPJS Kesehatan
          </p>
          <p>{dataEmployee?.bpjs_kesehatan || "-"}</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">
            Nomor BPJS Ketenagakerjaan
          </p>
          <p>{dataEmployee?.bpjs_ketenagakerjaan || "-"}</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">
            Nomor Rekening Bank Lainnya
          </p>
          <p>
            {dataEmployee?.acc_name_another} -{" "}
            {dataEmployee?.acc_number_another}
          </p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Tanggal Lahir</p>
          <p>{momentFormatDate(dataEmployee?.birth_date, "-")}</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Golongan Darah</p>
          <p>{dataEmployee?.blood_type || "-"}</p>
        </div>
        <div className="space-y-1">
          <p className="mig-caption--medium text-mono80">Jumlah Anak</p>
          <p>{dataEmployee?.number_of_children || "-"}</p>
        </div>
      </div>
    </section>
  );
};

export default EmployeeProfileDetail;
