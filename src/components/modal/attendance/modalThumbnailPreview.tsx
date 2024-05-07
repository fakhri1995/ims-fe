import React, { useEffect, useState } from "react";

import ModalCore from "../modalCore";

const ModalThumbnailPreview = ({ imageLink, visible, onvisible }) => {
  // 1. USE STATE
  const [loading, setLoading] = useState(false);

  // 2. USE QUERY & USE EFFECT

  // 3. HANDLER
  const handleClose = () => {
    onvisible(false);
  };

  return (
    <ModalCore
      title="Thumbnail"
      visible={visible}
      onCancel={handleClose}
      maskClosable={false}
      width={500}
      footer={false}
      loading={loading}
    >
      {imageLink && imageLink !== "/mig.png" ? (
        <img src={imageLink} className="h-full w-full object-cover rounded" />
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
    </ModalCore>
  );
};

export default ModalThumbnailPreview;
