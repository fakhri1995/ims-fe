import { useRouter } from "next/router";
import React, { useState } from "react";

import { useAccessControl } from "contexts/access-control";

import {
  COMPANY_CLIENTS_GET,
  CONTRACTS_COUNT_GET,
  CONTRACTS_GET,
  CONTRACT_ADD,
  CONTRACT_DELETE,
  CONTRACT_GET,
  CONTRACT_UPDATE,
  RECRUITMENT_STATUSES_LIST_GET,
} from "lib/features";

import {
  BellRingingIconSvg,
  CutIconSvg,
  FileTextIconSvg,
  WritingIconSvg,
} from "../../../icon";

const ContractActionSection = ({ contractId }) => {
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  const isAllowedToGetContract = hasPermission(CONTRACT_GET);
  const isAllowedToUpdateContract = hasPermission(CONTRACT_UPDATE);
  const isAllowedToDeleteContract = hasPermission(CONTRACT_DELETE);

  const rt = useRouter();

  return (
    <>
      <div className="flex flex-row min-w-min p-2 lg:p-4 bg-backdrop rounded-md items-center">
        <WritingIconSvg size={32} color={"#35763B"} />
        <div className="ml-4">
          <p className="mb-2 mig-caption--bold text-primary100">
            Tambah Adendum Kontrak
          </p>
          <p className="mig-caption text-primary75">s.d. 05 Desember 2022</p>
        </div>
      </div>

      {/* <div className="flex flex-row min-w-min p-2 lg:p-4 bg-backdrop rounded-md items-center">
        <CutIconSvg size={32} color={"#35763B"} />
        <div className="ml-4">
          <p className="mb-2 mig-caption--bold text-primary100">
            Batalkan Kontrak
          </p>
          <p className="mig-caption text-primary75">Belum ada pembatalan</p>
        </div>
      </div>

      <div className="flex flex-row min-w-min p-2 lg:p-4 bg-backdrop rounded-md items-center">
        <BellRingingIconSvg size={32} color={"#35763B"} />
        <div className="ml-4">
          <p className="mb-2 mig-caption--bold text-primary100">
            Atur Notifikasi
          </p>
          <p className="mig-caption text-primary75">
            50 hari sebelum berakhir (Klien, Int)
          </p>
        </div>
      </div> */}

      <button
        onClick={() => rt.push(`${contractId}/invoice-template`)}
        className="flex flex-row min-w-min p-2 lg:p-4 bg-backdrop rounded-md items-center hover:opacity-75"
      >
        <FileTextIconSvg size={32} color={"#35763B"} />
        <div className="ml-4">
          <p className="mb-2 mig-caption--bold text-primary100">
            Template Invoice
          </p>
          <p className="mig-caption text-primary75">Template belum terisi</p>
        </div>
      </button>
    </>
  );
};

export default ContractActionSection;
