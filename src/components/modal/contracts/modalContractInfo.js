import { Modal } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import "react-quill/dist/quill.snow.css";

import {
  convertDaysToString,
  generateStaticAssetUrl,
  getFileName,
  momentFormatDate,
} from "../../../lib/helper";
import { contractInfoString } from "../../../pages/admin/contracts/[contractId]/invoice-template";
import ButtonSys from "../../button";
import { PlusIconSvg, TrashIconSvg, XIconSvg } from "../../icon";
import { FILE, LIST } from "../../screen/contract/detail/ContractInfoSection";

const ModalContractInfo = ({
  visible,
  onvisible,
  dataContract,
  dataInvoice,
  setDataInvoice,
  isInvoiceForm,
}) => {
  // 1. USE STATE
  const [dataInvoiceNotDisplayed, setDataInvoiceNotDisplayed] = useState([]);
  const [dataInvoiceDisplayed, setDataInvoiceDisplayed] = useState([]);

  // USE EFFECT
  useEffect(() => {
    if (dataContract) {
      const dataExtras =
        dataContract?.extras?.map((extra) => ({
          name: `extras.${extra?.key}`,
          title: extra?.name,
          value: extra?.value,
          type: extra?.type,
        })) || [];

      const tempNotDisplayed = [
        {
          name: "contract_number",
          title: contractInfoString?.contract_number,
          value: dataContract?.contract_number,
        },
        {
          name: "title",
          title: contractInfoString?.title,
          value: dataContract?.title,
        },
        {
          name: "requester",
          title: contractInfoString?.requester,
          value: dataContract?.requester?.name,
        },

        {
          name: "initial_date",
          title: contractInfoString?.initial_date,
          value: momentFormatDate(dataContract?.initial_date),
        },
        {
          name: "start_date",
          title: contractInfoString?.start_date,
          value: momentFormatDate(dataContract?.start_date),
        },
        {
          name: "end_date",
          title: contractInfoString?.end_date,
          value: momentFormatDate(dataContract?.end_date),
        },
        {
          name: "duration",
          title: contractInfoString?.duration,
          value: convertDaysToString(dataContract?.duration),
        },
        ...dataExtras,
      ];

      // Filter for not displayed info
      if (isInvoiceForm) {
        // use for data from invoice/[invoiceId].js
        tempNotDisplayed = tempNotDisplayed.filter(
          (item) => !dataContract?.invoice_attribute?.includes(item?.name)
        );
      } else {
        // use for data from invoice-template.js
        tempNotDisplayed = tempNotDisplayed.filter(
          (item) =>
            !dataContract?.invoice_template?.details?.includes(item?.name)
        );
      }

      setDataInvoiceNotDisplayed(tempNotDisplayed);
    }
  }, [dataContract]);

  useEffect(() => {
    setDataInvoiceDisplayed(dataInvoice);
  }, [dataInvoice]);

  // 2. HANDLER
  const handleAddToDisplay = (item, idx) => {
    setDataInvoiceDisplayed((prev) => [...prev, item]);

    let tempNotDisplayed = [...dataInvoiceNotDisplayed];
    tempNotDisplayed.splice(idx, 1);
    setDataInvoiceNotDisplayed(tempNotDisplayed);
  };

  const handleRemoveFromDisplay = (item, idx) => {
    setDataInvoiceNotDisplayed((prev) => [...prev, item]);

    let tempDisplayed = [...dataInvoiceDisplayed];
    tempDisplayed.splice(idx, 1);
    setDataInvoiceDisplayed(tempDisplayed);
  };

  const handleSaveDisplayedList = () => {
    setDataInvoice(dataInvoiceDisplayed);
    onvisible(false);
  };

  // console.log({ dataInvoiceDisplayed });
  // console.log({ dataInvoiceNotDisplayed });
  // console.log({ dataContract });
  return (
    <Modal
      title={
        <p className="mig-heading--4 text-mono30">
          Tambah Informasi dari Kontrak
        </p>
      }
      visible={visible}
      closable={true}
      onCancel={() => onvisible(false)}
      width={700}
      maskClosable={false}
      footer={
        <ButtonSys
          type={"primary"}
          onClick={handleSaveDisplayedList}
          // disabled={!columnName}
        >
          Simpan Perubahan
        </ButtonSys>
      }
    >
      <div className="grid grid-cols-2 gap-6">
        {/* Informasi Kontrak */}
        <div>
          <h5 className="mig-heading--5 mb-6">Informasi Kontrak</h5>
          <div className="grid grid-cols-1 gap-2">
            {dataInvoiceNotDisplayed?.map((item, idx) => (
              <div
                key={item?.title}
                className="flex items-center justify-between gap-2 border border-inputkategori rounded px-4 py-2"
              >
                <div className="grid grid-cols-1">
                  <p className="mig-caption--bold mb-2">{item?.title}</p>
                  {item?.type === FILE ? (
                    <a
                      href={generateStaticAssetUrl(item?.value?.link)}
                      target="_blank"
                      className="text-primary100 truncate"
                    >
                      {getFileName(item?.value?.link)}
                    </a>
                  ) : item?.type === LIST ? (
                    <ul>
                      {item?.value?.map((val, idx) => (
                        <li key={idx}>{val}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mig-caption">{item?.value}</p>
                  )}
                </div>
                <button
                  onClick={() => handleAddToDisplay(item, idx)}
                  className="w-6 h-6 p-1 rounded-full bg-primary100 bg-opacity-10 flex items-center hover:opacity-75"
                >
                  <PlusIconSvg size={16} color={"#35763B"} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Informasi Ditampilkan */}
        <div>
          <h5 className="mig-heading--5 mb-6">Informasi Ditampilkan</h5>
          <div className="grid grid-cols-1 gap-2">
            {dataInvoiceDisplayed?.map((item, idx) => (
              <div
                key={item.title}
                className="flex items-center justify-between gap-2 border border-inputkategori rounded px-4 py-2"
              >
                <div className="grid grid-cols-1">
                  <p className="mig-caption--bold mb-2">{item?.title}</p>
                  {item?.type === FILE ? (
                    <a
                      href={generateStaticAssetUrl(item?.value?.link)}
                      target="_blank"
                      className="text-primary100 truncate"
                    >
                      {getFileName(item?.value?.link)}
                    </a>
                  ) : item?.type === LIST ? (
                    <ul>
                      {item?.value?.map((val, idx) => (
                        <li key={idx}>{val}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mig-caption">{item?.value}</p>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveFromDisplay(item, idx)}
                  className="w-6 h-6 p-1 rounded-full bg-mono70 bg-opacity-10 flex items-center hover:opacity-75"
                >
                  <XIconSvg size={16} color={"#808080"} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalContractInfo;
