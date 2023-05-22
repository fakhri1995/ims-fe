import { Modal } from "antd";
import React from "react";
import "react-quill/dist/quill.snow.css";

import { generateStaticAssetUrl } from "../../../lib/helper";

const ModalStaffList = ({ visible, onvisible, dataStaffs, taskName }) => {
  return (
    <Modal
      title={
        <p className="mig-heading--4 text-mono30">
          Daftar Staff <span className="text-primary100">{taskName}</span>
        </p>
      }
      visible={visible}
      closable={true}
      onCancel={() => onvisible(false)}
      maskClosable={false}
      footer={false}
    >
      <div>
        <p className="mig-caption--bold text-mono30">
          Total Staff: {dataStaffs?.length}
        </p>

        {dataStaffs?.map((staff) => (
          <div key={staff.id} className="flex space-x-2 items-center py-3">
            <img
              src={generateStaticAssetUrl(
                staff?.profile_image?.link ?? "staging/Users/default_user.png"
              )}
              alt={"Profile image"}
              className="w-12 h-12 bg-cover object-cover rounded-full"
            />

            <div>
              <p className={`mig-caption--bold text-mono30`}>
                {staff?.name ?? "-"}
              </p>
              <p className={`mig-caption text-mono50`}>
                {staff?.position ?? "-"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ModalStaffList;
