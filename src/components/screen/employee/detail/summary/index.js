import React from "react";

import { momentFormatDate } from "../../../../../lib/helper";

const EmployeeProfileSummary = ({ dataEmployee }) => {
  return (
    <div className="shadow-lg rounded-md bg-white pb-4 py-3 md:py-4 px-3 md:px-6 divide-y-2 mt-3 md:mt-0">
      <h4 className="mig-heading--4 mb-3">Ringkasan Profil</h4>
      <div className="grid md:grid-cols-2 gap-4 pt-3">
        <div className="flex flex-col space-y-1">
          <p className="mig-caption--medium text-mono80">Nama</p>
          <p>{dataEmployee?.name || "-"}</p>
        </div>
        <div className="flex flex-col space-y-1">
          <p className="mig-caption--medium text-mono80">NIP</p>
          <p>{dataEmployee?.nip || "-"}</p>
        </div>
        <div className="flex flex-col space-y-1">
          <p className="mig-caption--medium text-mono80">Posisi</p>
          <p>{dataEmployee?.contracts?.[0]?.role?.name || "-"}</p>
        </div>
        <div className="flex flex-col space-y-1">
          <p className="mig-caption--medium text-mono80">Status Kontrak</p>
          <p>{dataEmployee?.contracts[0]?.contract_status?.name || "-"}</p>
        </div>
        <div className="flex flex-col space-y-1">
          <p className="mig-caption--medium text-mono80">E-mail</p>
          <p>{dataEmployee?.email_office || "-"}</p>
        </div>
        <div className="flex flex-col space-y-1">
          <p className="mig-caption--medium text-mono80">Nomor Telepon</p>
          <p>{dataEmployee?.phone_number || "-"}</p>
        </div>
        <div className="flex flex-col space-y-1">
          <p className="mig-caption--medium text-mono80">Tanggal Bergabung</p>
          <p>{momentFormatDate(dataEmployee?.join_at || null, "-")}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileSummary;
