import { useRouter } from "next/router";
import React, { useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { CONTRACT_GET, CONTRACT_TEMPLATE_GET } from "lib/features";

import { momentFormatDate } from "../../../../lib/helper";
import {
  BellRingingIconSvg,
  CutIconSvg,
  FileTextIconSvg,
  WritingIconSvg,
} from "../../../icon";

const ContractActionSection = ({
  contractId,
  contractHistoryId,
  contractEndDate,
  invoiceTemplate,
}) => {
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  const isAllowedToGetContractTemplate = hasPermission(CONTRACT_TEMPLATE_GET);
  const isAllowedToGetContract = hasPermission(CONTRACT_GET);

  const rt = useRouter();

  return (
    <>
      <button
        onClick={() => rt.push(`${contractId}/addendum/create`)}
        disabled={!isAllowedToGetContract}
        className={`flex flex-row min-w-min p-2 lg:p-4 bg-backdrop rounded-md items-center ${
          isAllowedToGetContract ? "hover:opacity-75" : "cursor-no-drop"
        }`}
      >
        <WritingIconSvg size={32} color={"#35763B"} />
        <div className="ml-4">
          <p className="mb-2 mig-caption--bold text-primary100">
            Tambah Adendum Kontrak
          </p>
          <p className="mig-caption text-primary75 text-left">
            s.d. {momentFormatDate(contractEndDate)}
          </p>
        </div>
      </button>

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
        onClick={() =>
          rt.push(`${contractId}/invoice-template?ver=${contractHistoryId}`)
        }
        disabled={!isAllowedToGetContractTemplate}
        className={`flex flex-row p-2 lg:p-4 bg-backdrop rounded-md items-center ${
          isAllowedToGetContractTemplate ? "hover:opacity-75" : "cursor-no-drop"
        }`}
      >
        <FileTextIconSvg size={32} color={"#35763B"} />
        <div className="ml-4">
          <p className="mb-2 mig-caption--bold text-primary100">
            Template Invoice
          </p>

          <p className="mig-caption text-primary75 text-left">
            {invoiceTemplate ? "Template tersedia" : "Template belum terisi"}
          </p>
        </div>
      </button>
    </>
  );
};

export default ContractActionSection;
