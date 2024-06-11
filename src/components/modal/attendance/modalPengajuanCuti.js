import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  Checkbox,
  Collapse,
  DatePicker,
  Drawer,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Switch,
  Table,
  Tag,
  message,
  notification,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import PengajuanCutiIcon from "assets/vectors/pengajuan-cuti.svg";

import {
  CheckIconSvg,
  CloseIconSvg,
  UserIconSvg,
  UsercircleIconSvg,
} from "../../icon";

const ModalPengajuanCuti = ({ visible, onClose, setShowDrawerCutiSatuan }) => {
  const [statusActive, setStatusActive] = useState("1");

  const createCuti = () => {
    if (statusActive == "1") {
      setShowDrawerCutiSatuan();
    } else {
      message.info("Coming Soon");
    }
  };
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      title={
        <div className={"flex justify-center"}>
          <p className={"text-[#4D4D4D] font-bold text-[16px] leading-6"}>
            Pilih Pengajuan Cuti
          </p>
        </div>
      }
      footer={null}
    >
      <div className="flex flex-col gap-8">
        <div className={"flex justify-center gap-2"}>
          <div
            onClick={() => setStatusActive("1")}
            className={`${
              statusActive == "1" ? "bg-[#35763B]" : "bg-white"
            } px-4 py-2 rounded-[48px] hover:cursor-pointer`}
          >
            <p
              className={`${
                statusActive == "1" ? "text-white" : "text-[#CCCCCC]"
              } text-xs leading-5 font-bold`}
            >
              Cuti Satuan
            </p>
          </div>
          <div
            onClick={() => setStatusActive("2")}
            className={`${
              statusActive == "2" ? "bg-[#35763B]" : "bg-white"
            } px-4 py-2 rounded-[48px] hover:cursor-pointer`}
          >
            <p
              className={`${
                statusActive == "2" ? "text-white" : "text-[#CCCCCC]"
              } text-xs leading-5 font-bold`}
            >
              Cuti Bersama
            </p>
          </div>
        </div>
        <div className={"flex justify-center"}>
          <PengajuanCutiIcon />
        </div>
        <div className="flex justify-center">
          <p className={"text-[#4D4D4D] text-[14px] leading-6 font-medium "}>
            Buat Pengajuan Cuti untuk{" "}
            {statusActive == "1" ? "satu " : "seluruh "} karyawan
          </p>
        </div>
        <div className={"flex justify-center"}>
          <div
            onClick={() => createCuti()}
            className="hover:cursor-pointer bg-[#35763B] rounded-[5px] py-2 px-6"
          >
            <p className="text-white font-bold text-xs leading-5">
              Buat Cuti {statusActive == "1" ? "Satuan" : "Bersama"}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPengajuanCuti;
