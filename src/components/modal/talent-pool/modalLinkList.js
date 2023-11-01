import React, { useState } from "react";
import { useEffect } from "react";
import "react-quill/dist/quill.snow.css";

import { InfoCircleIconSvg } from "../../icon";
import ModalCore from "../modalCore";
import { ModalHapus2 } from "../modalCustom";

const ModalLinkList = ({
  initProps,
  visible,
  onvisible,
  isAllowedToAddCategory,
  category,
  // refetchCategories,
}) => {
  // 1. USE STATE
  const [loading, setLoading] = useState(false);

  const [linkList, setLinkList] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);

  // 2. USE QUERY & USE EFFECT
  // useEffect(() => {
  //   const requiredFields = ["name", "category"];
  //   const allFieldIsFilled = requiredFields.every((item) => dataForm[item]);
  //   if (allFieldIsFilled) {
  //     setDisableAdd(false);
  //   }
  // }, [dataForm]);

  // 3. HANDLER

  const handleClose = () => {
    onvisible(false);
  };

  const title = !modalDelete ? (
    <div className="flex items-center gap-2">
      <p className="mig-heading--4">Daftar Tautan</p>
      <InfoCircleIconSvg size={16} color={"#000000"} />
    </div>
  ) : (
    <div className="flex items-center gap-2 ">
      <InfoCircleIconSvg size={32} color="#BF4A40" />
      <p className="mig-heading--3 text-warning">
        Konfirmasi Pemberhentian Tautan
      </p>
    </div>
  );
  if (modalDelete) {
    return (
      <ModalHapus2
        title={title}
        visible={modalDelete}
        onvisible={setModalDelete}
        // onOk={handleDelete}
        okButtonText={"Berhentikan"}
        onCancel={() => setModalDelete(false)}
        loading={loading}
      >
        <p className="mb-4">
          Apakah anda yakin ingin membatalkan tautan untuk{" "}
          <strong>nama user</strong>?
        </p>
      </ModalHapus2>
    );
  }

  return (
    <ModalCore
      title={title}
      visible={visible}
      onCancel={handleClose}
      maskClosable={true}
      width={700}
      footer={null}
      loading={loading}
    >
      <div>
        <div className="flex items-center justify-between p-4 rounded-md border rounded-md">
          <div>
            <p className="mig-caption--bold">nama requester</p>
            <p className="mig-caption--medium text-primary100">
              link token auth
            </p>
          </div>
          <button
            onClick={() => setModalDelete(true)}
            className="mig-caption--medium text-warning px-3 py-1 
          bg-warning bg-opacity-20 rounded-full"
          >
            Stop
          </button>
        </div>
      </div>
    </ModalCore>
  );
};

export default ModalLinkList;
