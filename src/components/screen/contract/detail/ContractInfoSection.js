import { PrinterOutlined, UpOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";

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

import { ContractService } from "apis/contract";

import { momentFormatDate } from "../../../../lib/helper";
import { FileTextIconSvg } from "../../../icon";

// enum for extras detail
const extrasType = {
  TEXT: "1",
  LIST: "2",
  FILE: "3",
};

export const { TEXT, LIST, FILE } = extrasType;

const ContractInfoSection = ({ initProps, contractId }) => {
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  const isAllowedToGetContract = hasPermission(CONTRACT_GET);
  const isAllowedToUpdateContract = hasPermission(CONTRACT_UPDATE);
  const isAllowedToDeleteContract = hasPermission(CONTRACT_DELETE);

  // 1. Use Query
  const { data: dataContract, isLoading: loadingDataContract } = useQuery(
    [CONTRACT_GET],
    () =>
      ContractService.getContract(
        initProps,
        isAllowedToGetContract,
        contractId
      ),
    {
      enabled: isAllowedToGetContract,
      refetchOnMount: true,
      select: (response) => response.data,
    }
  );

  if (isAccessControlPending) {
    return null;
  }

  const getExtrasDetail = (type, value) => {
    switch (type) {
      case TEXT:
        return <p>{value}</p>;

      case LIST:
        return (
          <ul>
            {value?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );

      case FILE:
        return (
          <div className="flex space-x-2 items-center">
            <FileTextIconSvg size={24} color={"#35763B"} />
            <p className="text-primary100">Document_000323.pdf</p>
          </div>
        );
    }
  };

  // console.log({ loadingDataContract });

  return (
    <section className="grid grid-cols-2 shadow-md rounded-md bg-white p-6 mb-4 gap-6">
      {loadingDataContract ? (
        <Spin className="col-span-2" spinning={loadingDataContract} />
      ) : (
        <>
          <div className="col-span-2 flex flex-col lg:flex-row lg:justify-between ">
            <div className="flex space-x-2 items-center mb-4 lg:mb-0">
              <h4 className="mig-heading--4">
                {dataContract?.contract_number || "-"}
              </h4>
              <p className="bg-backdrop text-primary100 px-2 py-1 rounded-md font-bold">
                Aktif
              </p>
            </div>
            <ButtonSys type={"default"}>
              <div className="flex space-x-2 items-center">
                <PrinterOutlined />
                <p>Cetak Kontrak</p>
              </div>
            </ButtonSys>
          </div>

          {/* Main detail */}
          <div className="col-span-2">
            <h5 className="mig-caption--bold mb-2">Judul Kontrak</h5>
            <p>{dataContract?.title || "-"}</p>
          </div>

          <div className="">
            <h5 className="mig-caption--bold mb-2">Requester</h5>
            <p>{dataContract?.requester?.name || "-"}</p>
          </div>

          <div className="">
            <h5 className="mig-caption--bold mb-2">Klien</h5>
            <p>{dataContract?.client?.name || "-"}</p>
          </div>
          <div className="">
            <h5 className="mig-caption--bold mb-2">Tanggal Dimulai</h5>
            <p>{momentFormatDate(dataContract?.start_date)}</p>
          </div>

          <div className="">
            <h5 className="mig-caption--bold mb-2">Tanggal Selesai</h5>
            <p>{momentFormatDate(dataContract?.end_date)}</p>
          </div>

          <div className="">
            <h5 className="mig-caption--bold mb-2">Durasi Kontrak</h5>
            <p>{dataContract?.duration || "-"}</p>
          </div>

          <div className="">
            <h5 className="mig-caption--bold mb-2">Tanggal Dibuat</h5>
            <p>{momentFormatDate(dataContract?.initial_date)}</p>
          </div>

          <hr className="col-span-2" />

          {/* Extras */}
          {dataContract?.extras?.length > 0 &&
            dataContract?.extras?.map((item) => (
              <div key={item?.key} className="col-span-2">
                <h5 className="mig-caption--bold mb-2">{item?.name || "-"}</h5>
                {getExtrasDetail(item?.type, item?.value)}
              </div>
            ))}
        </>
      )}
    </section>
  );
};

export default ContractInfoSection;
