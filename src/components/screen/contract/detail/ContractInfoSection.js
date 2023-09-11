import { DeleteOutlined, PrinterOutlined, UpOutlined } from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Spin, notification } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";

import ButtonSys from "components/button";
import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  CONTRACT_DELETE,
  CONTRACT_GET,
  CONTRACT_HISTORY_DELETE,
  CONTRACT_UPDATE,
} from "lib/features";

import {
  convertDaysToString,
  generateStaticAssetUrl,
  getFileName,
  momentFormatDate,
  permissionWarningNotification,
} from "../../../../lib/helper";
import { ContractPDFTemplate } from "../../../../pages/admin/contracts/[contractId]/contractPDF";
import { FileTextIconSvg } from "../../../icon";
import { ModalHapus2 } from "../../../modal/modalCustom";

// enum for extras detail
const extrasType = {
  TEXT: "1",
  LIST: "2",
  FILE: "3",
};

export const { TEXT, LIST, FILE } = extrasType;

// Conditional render
export const getExtrasDetail = (type, value) => {
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
          <a
            href={generateStaticAssetUrl(value?.link)}
            target="_blank"
            className="text-primary100 truncate"
          >
            {getFileName(value?.link)}
          </a>
        </div>
      );
  }
};

const ContractInfoSection = ({
  initProps,
  contractId,
  contractHistoryId,
  dataContract,
  loadingDataContract,
  isAddendum,
  setRefresh,
  versionLabel,
}) => {
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  const isAllowedToGetContract = hasPermission(CONTRACT_GET);
  const isAllowedToUpdateContract = hasPermission(CONTRACT_UPDATE);
  const isAllowedToDeleteContract = hasPermission(CONTRACT_DELETE);
  const isAllowedToDeleteContractHistory = hasPermission(
    CONTRACT_HISTORY_DELETE
  );

  const rt = useRouter();

  // Use State
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  // Handler
  const handleDeleteContract = () => {
    if (!isAllowedToDeleteContract) {
      permissionWarningNotification("Menghapus", "Kontrak");
      return;
    }

    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteContract?id=${contractId}`,
      {
        method: `DELETE`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setModalDelete(false);
          rt.push(`/admin/contracts`);
          setRefresh((prev) => prev + 1);
          setTimeout(
            () =>
              notification.success({
                message: response.message,
                duration: 3,
              }),
            1000
          );
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus kontrak. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingDelete(false));
  };

  const handleDeleteContractHistory = () => {
    if (!isAllowedToDeleteContractHistory) {
      permissionWarningNotification("Menghapus", "Riwayat Kontrak");
      return;
    }

    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteContractHistory?id=${contractHistoryId}`,
      {
        method: `DELETE`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setModalDelete(false);
          setRefresh((prev) => prev + 1);
          setTimeout(
            () =>
              notification.success({
                message: response.message,
                duration: 3,
              }),
            1000
          );
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus riwayat kontrak. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingDelete(false));
  };

  if (isAccessControlPending) {
    return null;
  }

  // console.log({ dataContract });
  // console.log("id di info section", contractHistoryId);
  return (
    <section className="grid grid-cols-1 shadow-md rounded-md bg-white p-6 mb-4 gap-6">
      <Spin spinning={loadingDataContract}>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-6">
          <div className="flex space-x-2 items-center ">
            <h4 className="mig-heading--4">
              {dataContract?.code_number || "-"}
            </h4>
            <p className="bg-backdrop text-primary100 px-2 py-1 rounded-md font-bold">
              {versionLabel == "Utama" ? "Aktif" : versionLabel}
            </p>
          </div>
          <div className="flex flex-col xl:flex-row xl:items-center gap-2">
            <ButtonSys
              type={"default"}
              color="danger"
              onClick={() => setModalDelete(true)}
              disabled={!isAllowedToDeleteContract}
            >
              <div className="flex space-x-2 items-center">
                <DeleteOutlined />
                <p>Hapus Kontrak</p>
              </div>
            </ButtonSys>

            <PDFDownloadLink
              document={<ContractPDFTemplate dataContract={dataContract} />}
              fileName={`Contract_${dataContract?.code_number}.pdf`}
            >
              {({ blob, url, loading, error }) => (
                <Spin spinning={loading}>
                  <ButtonSys
                    type={"default"}
                    disabled={!isAllowedToGetContract}
                    fullWidth
                  >
                    <div className="flex space-x-2 items-center">
                      <PrinterOutlined />
                      <p>Cetak Kontrak</p>
                    </div>
                  </ButtonSys>
                </Spin>
              )}
            </PDFDownloadLink>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <h5 className="mig-caption--bold mb-2">Judul Kontrak</h5>
            <p>{dataContract?.title || "-"}</p>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h5 className="mig-caption--bold mb-2">Requester</h5>
            <p>{dataContract?.requester?.name || "-"}</p>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h5 className="mig-caption--bold mb-2">Klien</h5>
            <p>{dataContract?.client?.name || "-"}</p>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h5 className="mig-caption--bold mb-2">Tanggal Dimulai</h5>
            <p>{momentFormatDate(dataContract?.start_date)}</p>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h5 className="mig-caption--bold mb-2">Tanggal Selesai</h5>
            <p>{momentFormatDate(dataContract?.end_date)}</p>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h5 className="mig-caption--bold mb-2">Durasi Kontrak</h5>
            <p>
              {dataContract?.duration
                ? convertDaysToString(dataContract?.duration)
                : "-"}
            </p>
          </div>

          <div className="col-span-2 lg:col-span-1">
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
        </div>
      </Spin>

      <AccessControl hasPermission={CONTRACT_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={() =>
            isAddendum ? handleDeleteContractHistory() : handleDeleteContract()
          }
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={isAddendum ? "adendum" : "kontrak"}
          loading={loadingDelete}
        >
          {isAddendum ? (
            <p className="mb-4">
              Apakah Anda yakin ingin melanjutkan penghapusan adendum kontrak{" "}
              <strong>{dataContract?.code_number}</strong>?
            </p>
          ) : (
            <p className="mb-4">
              Apakah Anda yakin ingin melanjutkan penghapusan kontrak{" "}
              <strong>{dataContract?.code_number}</strong>?
            </p>
          )}
        </ModalHapus2>
      </AccessControl>
    </section>
  );
};

export default ContractInfoSection;
