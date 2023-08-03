import { DeleteOutlined } from "@ant-design/icons";
import { Form, Input, Modal, notification } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import "react-quill/dist/quill.snow.css";

import {
  convertDaysToString,
  generateStaticAssetUrl,
  getFileName,
  momentFormatDate,
} from "../../../lib/helper";
import { contractInfoString } from "../../../pages/admin/contracts/[contractId]/invoice";
import ButtonSys from "../../button";
import { PlusIconSvg, TrashIconSvg, XIconSvg } from "../../icon";
import { FILE } from "../../screen/contract/detail/ContractInfoSection";
import { ModalHapus2 } from "../modalCustom";

const ModalContractInfo = ({
  visible,
  onvisible,
  dataContract,
  dataInvoiceTemplate,
  setDataInvoiceTemplate,
}) => {
  // 1. USE STATE
  const [columnName, setColumnName] = useState("");
  const [modalDeleteColumn, setModalDeleteColumn] = useState(false);
  const [dataCurrentColumn, setDataCurrentColumn] = useState({});
  const [dataNotDisplayedInfo, setDataNotDisplayedInfo] = useState([]);
  const [dataDisplayedInfo, setDataDisplayedInfo] = useState([]);

  // USE EFFECT
  useEffect(() => {
    if (dataContract) {
      const tempNotDisplayed = [
        {
          name: "title",
          title: contractInfoString?.title,
          value: dataContract?.title,
        },
        {
          name: "requester_id",
          title: contractInfoString?.requester_id,
          value: dataContract?.requester_id,
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
      ];

      if (!dataContract?.invoice_template?.details?.includes("extras")) {
        for (let item of dataContract?.extras) {
          const dataExtra = {
            title: item?.name,
            value: item?.value,
            type: item?.type,
          };

          tempNotDisplayed.push(dataExtra);
        }
      }

      tempNotDisplayed = tempNotDisplayed.filter(
        (item) => !dataContract?.invoice_template?.details?.includes(item?.name)
      );

      console.log({ dataInvoiceTemplate });
      console.log({ tempNotDisplayed });

      setDataNotDisplayedInfo(tempNotDisplayed);
    }
  }, [dataContract]);

  useEffect(() => {
    setDataDisplayedInfo(dataInvoiceTemplate);
  }, [dataInvoiceTemplate]);

  // 2. HANDLER
  const handleAddToDisplay = (item, idx) => {
    setDataDisplayedInfo((prev) => [...prev, item]);

    let tempNotDisplayed = [...dataNotDisplayedInfo];
    tempNotDisplayed.splice(idx, 1);
    setDataNotDisplayedInfo(tempNotDisplayed);
  };

  const handleRemoveFromDisplay = (item, idx) => {
    setDataNotDisplayedInfo((prev) => [...prev, item]);

    let tempDisplayed = [...dataDisplayedInfo];
    tempDisplayed.splice(idx, 1);
    setDataDisplayedInfo(tempDisplayed);
  };

  const handleSaveDisplayedList = () => {
    setDataInvoiceTemplate(dataDisplayedInfo);
    onvisible(false);
  };

  console.log({ dataNotDisplayedInfo });
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
            {dataNotDisplayedInfo?.map((item, idx) => (
              <div
                key={item.title}
                className="flex items-center justify-between gap-2 border border-inputkategori rounded px-4 py-2"
              >
                <div>
                  <p className="mig-caption--bold mb-2">{item?.title}</p>
                  {item?.type === FILE ? (
                    <a
                      href={generateStaticAssetUrl(item?.value?.link)}
                      target="_blank"
                      className="text-primary100 truncate"
                    >
                      {getFileName(item?.value?.link)}
                    </a>
                  ) : (
                    <p className="mig-caption">{item?.value}</p>
                  )}
                </div>
                <button
                  onClick={() => handleAddToDisplay(item, idx)}
                  className="w-6 h-6 p-1 rounded-full bg-primary100 bg-opacity-10 flex items-center"
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
            {dataDisplayedInfo?.map((item, idx) => (
              <div
                key={item.title}
                className="flex items-center justify-between gap-2 border border-inputkategori rounded px-4 py-2"
              >
                <div>
                  <p className="mig-caption--bold mb-2">{item?.title}</p>
                  {item?.type === FILE ? (
                    <a
                      href={generateStaticAssetUrl(item?.value?.link)}
                      target="_blank"
                      className="text-primary100 truncate"
                    >
                      {getFileName(item?.value?.link)}
                    </a>
                  ) : (
                    <p className="mig-caption">{item?.value}</p>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveFromDisplay(item, idx)}
                  className="w-6 h-6 p-1 rounded-full bg-mono70 bg-opacity-10 flex items-center"
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
