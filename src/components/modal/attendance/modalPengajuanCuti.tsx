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

import ButtonSys from "components/button";

import PengajuanCutiIcon from "assets/vectors/pengajuan-cuti.svg";

import {
  CheckIconSvg,
  CloseIconSvg,
  UserIconSvg,
  UsercircleIconSvg,
} from "../../icon";

const ModalPengajuanCuti = ({
  visible,
  onClose,
  setShowDrawerCutiSatuan,
}: {
  visible: boolean;
  onClose: () => void;
  setShowDrawerCutiSatuan: () => void;
}) => {
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
      className="modalCore"
      title={
        <div className={"flex justify-center"}>
          <p className={"mig-body--bold"}>Select Leave Request</p>
        </div>
      }
      footer={null}
      width={450}
    >
      <div className="flex flex-col gap-3 ">
        <div className={"flex justify-center gap-2"}>
          <div
            onClick={() => setStatusActive("1")}
            className={`${
              statusActive == "1" ? "bg-primary100" : "bg-transparent border"
            } px-4 py-1 rounded-[48px] hover:cursor-pointer hover:bg-primary100`}
          >
            <p
              className={`${
                statusActive == "1"
                  ? "mig-body--medium text-white"
                  : "mig-body text-neutrals90 hover:text-white"
              }`}
            >
              Single Leave
            </p>
          </div>
          <div
            onClick={() => setStatusActive("2")}
            className={`${
              statusActive == "2" ? "bg-primary100" : "bg-transparent border"
            } px-4 py-1 rounded-[48px] hover:cursor-pointer hover:bg-primary100`}
          >
            <p
              className={`${
                statusActive == "2"
                  ? "mig-body--medium text-white"
                  : "mig-body text-neutrals90 hover:text-white"
              } `}
            >
              Joint Leave
            </p>
          </div>
        </div>
        <div className={"flex justify-center"}>
          <PengajuanCutiIcon />
        </div>
        <div className="flex justify-center">
          <p className={"text-[#4D4D4D] text-[14px] leading-6 font-medium "}>
            Create a leave request for
            {statusActive == "1" ? " one " : " all "} employee.
          </p>
        </div>
        <div className={"flex justify-center"}>
          <ButtonSys type="primary" onClick={() => createCuti()}>
            <p className="">
              Make {statusActive == "1" ? "Single" : "Joint"} Leave Request
            </p>
          </ButtonSys>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPengajuanCuti;
