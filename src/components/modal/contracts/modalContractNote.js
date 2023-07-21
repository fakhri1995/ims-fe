import { DeleteOutlined } from "@ant-design/icons";
import { Modal, notification } from "antd";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";

import { generateStaticAssetUrl, momentFormatDate } from "../../../lib/helper";
import ButtonSys from "../../button";
import { ModalHapus2 } from "../modalCustom";

const ModalContractNote = ({
  initProps,
  visible,
  onvisible,
  dataNote,
  isAllowedToDeleteNote,
  setRefreshNotes,
}) => {
  // 1. USE STATE
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // 2. HANDLER
  const handleDeleteNote = () => {
    if (!isAllowedToDeleteNote) {
      permissionWarningNotification("Menghapus", "Catatan Kontrak");
      setLoadingDelete(false);
      return;
    }
    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteContractLogNotes?id=${dataNote?.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setModalDelete(false);
          onvisible(false);
          notification.success({
            message: res2?.message,
            duration: 3,
          });
          setRefreshNotes((prev) => prev + 1);
        } else {
          notification.error({
            message: `Gagal menghapus catatan kontrak.`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus catatan kontrak. ${err?.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingDelete(false));
  };

  return modalDelete ? (
    <ModalHapus2
      title={`Perhatian`}
      visible={modalDelete}
      onvisible={setModalDelete}
      onOk={handleDeleteNote}
      onCancel={() => {
        setModalDelete(false);
        onvisible(false);
      }}
      itemName={"catatan"}
      loading={loadingDelete}
    >
      <p className="mb-4">Apakah Anda yakin ingin menghapus catatan ini?</p>
    </ModalHapus2>
  ) : (
    <Modal
      title={
        <div className="flex justify-between mr-5">
          <p className="mig-heading--4 text-mono30">Detail Catatan</p>
          <ButtonSys
            type={"default"}
            color={"danger"}
            onClick={() => {
              setModalDelete(true);
            }}
            disabled={!isAllowedToDeleteNote}
          >
            <div className="flex space-x-2 items-center">
              <DeleteOutlined />
              <p>Hapus Catatan</p>
            </div>
          </ButtonSys>
        </div>
      }
      visible={visible}
      closable={true}
      onCancel={() => onvisible(false)}
      maskClosable={false}
      footer={false}
    >
      <div key={dataNote?.id} className="">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <img
              src={generateStaticAssetUrl(
                dataNote?.causer?.profile_image?.link ??
                  "staging/Users/default_user.png"
              )}
              alt={"profile image"}
              className="w-8 h-8 bg-cover object-cover rounded-full"
            />
            <p className="truncate">
              <strong>{dataNote?.causer?.name}</strong> -{" "}
              {dataNote?.causer?.roles?.[0]?.name}
            </p>
          </div>
          <p className="text-right">
            {momentFormatDate(
              dataNote?.created_at,
              "-",
              "D MMM YYYY, HH:mm",
              true
            )}
          </p>
        </div>
        <p>{dataNote?.notes ?? "-"}</p>
      </div>
    </Modal>
  );
};

export default ModalContractNote;
