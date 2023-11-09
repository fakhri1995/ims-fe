import { Empty, Spin, notification } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { TalentPoolService } from "../../../apis/talent-pool/talent-pool.service";
import {
  TALENT_POOL_SHARES_GET,
  TALENT_POOL_SHARE_DELETE,
} from "../../../lib/features";
import { InfoCircleIconSvg } from "../../icon";
import ModalCore from "../modalCore";
import { ModalHapus2 } from "../modalCustom";
import { getTalentPoolLink } from "./modalShare";

const ModalLinkList = ({ initProps, visible, onvisible, category }) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToGetTalentPoolShares = hasPermission(TALENT_POOL_SHARES_GET);
  const isAllowedToDeleteTalentPoolShare = hasPermission(
    TALENT_POOL_SHARE_DELETE
  );

  // 1. USE STATE
  const [loading, setLoading] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [currentModalData, setCurrentModalData] = useState({});

  // 2. USE QUERY & USE EFFECT
  // 2.1. Get Shared Talent Pool Links
  const {
    data: dataLinks,
    isLoading: loadingLinks,
    refetch: refetchLinks,
  } = useQuery(
    [TALENT_POOL_SHARES_GET, category?.id],
    () =>
      TalentPoolService.getSharedLinks(
        initProps,
        isAllowedToGetTalentPoolShares,
        category?.id
      ),
    {
      enabled: isAllowedToGetTalentPoolShares && !!category?.id,
      select: (response) => response.data,
      refetchOnMount: true,
    }
  );

  // 3. HANDLER
  const handleDelete = () => {
    setLoading(true);
    TalentPoolService.deleteSharedLink(
      initProps,
      isAllowedToDeleteTalentPoolShare,
      currentModalData?.id
    )
      .then((res) => {
        if (res.success) {
          notification.success({
            message: "Link berhasil dihapus",
            duration: 3,
          });
          refetchLinks();
          setModalDelete(false);
        } else {
          notification.error({
            message: res.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleClose = () => {
    onvisible(false);
  };

  const title = !modalDelete ? (
    <div className="flex items-center gap-2">
      <p className="mig-heading--4">Daftar Tautan {category.name}</p>
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
        onOk={handleDelete}
        okButtonText={"Berhentikan"}
        onCancel={() => setModalDelete(false)}
        loading={loading}
      >
        <p className="mb-4">
          Apakah anda yakin ingin membatalkan tautan untuk{" "}
          <strong>{currentModalData.user?.name}</strong>?
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
      <Spin spinning={loadingLinks}>
        <div className="grid grid-cols-1 gap-2">
          {!dataLinks?.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          {dataLinks?.map((item) => {
            const link = getTalentPoolLink(item.code);
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-md border"
              >
                <div>
                  <p className="mig-caption--bold">{item.user?.name}</p>
                  <p
                    onClick={() => {
                      navigator.clipboard.writeText(link).then(() =>
                        notification.success({
                          message: "Link berhasil disalin!",
                          duration: 3,
                        })
                      );
                    }}
                    className="mig-caption--medium text-primary100 cursor-pointer hover:opacity-70"
                  >
                    {link}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCurrentModalData(item);
                    setModalDelete(true);
                  }}
                  className="mig-caption--medium text-warning px-3 py-1 
                bg-warning bg-opacity-20 rounded-full hover:opacity-70"
                >
                  Stop
                </button>
              </div>
            );
          })}
        </div>
      </Spin>
    </ModalCore>
  );
};

export default ModalLinkList;
