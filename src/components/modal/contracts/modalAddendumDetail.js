import { DeleteOutlined } from "@ant-design/icons";
import { Modal, notification } from "antd";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";

import { generateStaticAssetUrl, momentFormatDate } from "../../../lib/helper";
import ButtonSys from "../../button";
import { ArrowNarrowRightIconSvg } from "../../icon";
import { ModalHapus2 } from "../modalCustom";

const ModalAddendumDetail = ({
  initProps,
  visible,
  onvisible,
  // dataNote,
  // setRefreshNotes,
}) => {
  // 1. USE STATE

  // 2. HANDLER

  return (
    <Modal
      width={600}
      title={
        <div className="flex space-x-2 mr-5">
          <p className="mig-heading--4 text-mono30">[no]/CNTR/BKP/III/2020</p>
          <p className="bg-backdrop text-primary100 px-2 py-1 rounded-md font-bold">
            Addendum 1
          </p>
        </div>
      }
      visible={visible}
      closable={true}
      onCancel={() => onvisible(false)}
      footer={false}
    >
      <div className="">
        <div className="flex justify-between items-center">
          <div className="w-5/12">
            <p className="mig-caption--bold">Klien</p>
            <p>PT. Mitramas</p>
          </div>
          <div className="w-2/12 text-center">
            <ArrowNarrowRightIconSvg color={"#35763B"} size={24} />
          </div>
          <div className="w-5/12">
            <p className="mig-caption--bold">Klien</p>
            <p>PT. BKP</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddendumDetail;
