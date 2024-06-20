import { Modal } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import ButtonSys from "components/button";

import { generateStaticAssetUrl } from "lib/helper";

import ModalCore from "../modalCore";

const ModalAnnouncementPopup = ({ data, visible, onvisible }) => {
  const rt = useRouter();

  // 1. USE STATE
  const [loading, setLoading] = useState(false);

  // 3. HANDLER
  const handleClose = () => {
    onvisible(false);
  };

  return (
    <Modal
      open={visible}
      onCancel={handleClose}
      footer={false}
      width={500}
      // maskClosable={false}
      // closable={closable}
      bodyStyle={{ padding: 0 }}
      className="modalRounded"
    >
      <div>
        <div className="p-8">
          <h2 className="mig-heading--2 text-secondary100 mb-2">
            {data?.title}
          </h2>
          <p className="mig-caption--medium text-mono30">
            by {data?.user?.position}
          </p>
        </div>
        {data?.thumbnail_image?.link &&
        data?.thumbnail_image?.link !== "/mig.png" ? (
          <img
            src={generateStaticAssetUrl(data?.thumbnail_image?.link)}
            className="h-full w-full object-cover rounded"
          />
        ) : (
          <div
            className="h-full w-full bg-backdrop rounded flex flex-col items-center 
                  justify-center py-10 px-6"
          >
            <img
              src="/mig.png"
              style={{ width: "10rem", mixBlendMode: "luminosity" }}
            />
          </div>
        )}
        <div className="py-9 px-6 flex gap-6 items-center w-full">
          <div className="w-1/3">
            <ButtonSys color={"mono100"} fullWidth onClick={handleClose}>
              <p>Tutup</p>
            </ButtonSys>
          </div>
          <div className="w-2/3">
            <ButtonSys
              type={"primary"}
              fullWidth
              onClick={() => {
                rt.push("/dashboard/announcement/detail/" + data?.id);
              }}
            >
              <p>Lihat Pengumuman</p>
            </ButtonSys>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAnnouncementPopup;
