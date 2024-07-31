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
  notification,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import PengajuanCutiIcon from "assets/vectors/pengajuan-cuti.svg";

import {
  AlertCircleIconSvg,
  CheckBoldSvg,
  CheckIconSvg,
  CloseIconSvg,
  CloseOverlay,
  UserIconSvg,
  UsercircleIconSvg,
} from "../../icon";

const ModalSetujuiCuti = () => {
  const [statusActive, setStatusActive] = useState("1");

  return (
    <Modal
      open={false}
      title={
        <div className={"flex gap-3"}>
          <AlertCircleIconSvg size={24} />
          <p className={"text-[#4D4D4D] text-[14px] leading-6 font-bold"}>
            Konfirmasi Setujui Pengajuan Cuti
          </p>
        </div>
      }
      footer={
        <div className={"flex gap-4 justify-end py-3 px-6"}>
          <div
            className={
              "bg-[#F3F3F3] py-2.5 px-8 rounded-[5px] hover:cursor-pointer"
            }
          >
            <p className={"text-xs leading-5 text-[#808080] font-bold"}>
              Batal
            </p>
          </div>
          <div
            className={
              "bg-[#35763B] flex items-center gap-2 py-2.5 px-8 rounded-[5px] hover:cursor-pointer"
            }
          >
            <CheckBoldSvg size={16} color={"white"} />
            <p className="text-white text-xs leading-5 font-bold">Setujui</p>
          </div>
        </div>
      }
      closeIcon={<CloseOverlay size={24} />}
    >
      <p className={"text-[#4D4D4D] font-medium text-xs leading-5"}>
        Apakah anda yakin ingin menyetujui pengajuan cuti{" "}
        <span className={"font-bold"}>Hadi</span> pada{" "}
        <span className={"font-bold"}>17 Juni 2024</span> ?
      </p>
    </Modal>
  );
};

export default ModalSetujuiCuti;
