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
import ButtonSys from "../../button";
import { PlusIconSvg, TrashIconSvg } from "../../icon";
import { FILE } from "../../screen/contract/detail/ContractInfoSection";
import { ModalHapus2 } from "../modalCustom";

const ModalContractInfo = ({ visible, onvisible, dataContract }) => {
  // 1. USE STATE
  const [columnName, setColumnName] = useState("");
  const [modalDeleteColumn, setModalDeleteColumn] = useState(false);
  const [dataCurrentColumn, setDataCurrentColumn] = useState({});
  const [dataContractInfoList, setDataContractInfoList] = useState([]);

  // USE EFFECT
  useEffect(() => {
    const tempContractInfo = [
      {
        title: "Judul Kontrak",
        value: dataContract?.title,
      },
      {
        title: "Tanggal Dibuat",
        value: momentFormatDate(dataContract?.initial_date),
      },
      {
        title: "Tanggal Berlaku",
        value: momentFormatDate(dataContract?.start_date),
      },
      {
        title: "Tanggal Selesai",
        value: momentFormatDate(dataContract?.end_date),
      },
      {
        title: "Durasi Kontrak",
        value: convertDaysToString(dataContract?.duration),
      },
    ];

    for (let item of dataContract?.extras) {
      const dataExtra = {
        title: item?.name,
        value: item?.value,
        type: item?.type,
      };

      tempContractInfo.push(dataExtra);
    }

    setDataContractInfoList(tempContractInfo);
  }, [dataContract]);

  // 2. HANDLER
  const handleAddColumn = () => {};

  const handleDeleteColumn = (columnKey) => {};

  // console.log({ dataCurrentColumn });
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
          onClick={handleAddColumn}
          disabled={!columnName}
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
            {dataContractInfoList?.map((item) => (
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
                <div className="w-6 h-6 p-1 rounded-full bg-primary100 bg-opacity-10 flex items-center">
                  <PlusIconSvg size={16} color={"#35763B"} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informasi Ditampilkan */}
        <div>
          <h5 className="mig-heading--5 mb-6">Informasi Ditampilkan</h5>
          <div className="flex items-center border border-inputkategori rounded px-4 py-2">
            <div>
              <p className="mig-caption--bold mb-2">Judul Kontrak</p>
              <p className="mig-caption">
                Perjanjian Kerjasama PT XYZ tahun 2022 hingga 2025
              </p>
            </div>
            <div className="w-6 h-6 p-1 rounded-full bg-primary100 bg-opacity-10 flex items-center">
              <PlusIconSvg size={16} color={"#35763B"} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalContractInfo;
