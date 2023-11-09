import { SearchOutlined } from "@ant-design/icons";
import { Checkbox, Input, Modal, Spin, Table, notification } from "antd";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import "react-quill/dist/quill.snow.css";

import { getNameInitial } from "lib/helper";

import { TalentPoolPublicService } from "../../../apis/talent-pool";
import {
  TALENT_POOL_SHARE_PUBLICS_GET,
  TALENT_POOL_SHARE_PUBLIC_CUTS_GET,
} from "../../../lib/features";
import { InfoCircleIconSvg } from "../../icon";
import CandidateDetailCard from "../../screen/talent-pool/CandidateDetailCard";
import ModalCore from "../modalCore";
import { ModalHapus2, ModalUbah } from "../modalCustom";

const ModalEliminatedTalent = ({ visible, onvisible, category, shareId }) => {
  const queryClient = useQueryClient();

  // 1. USE STATE
  const [params, setParams] = useState({
    page: 1,
    rows: 10,
    category_id: category?.id,
  });
  const [loading, setLoading] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [searchTalent, setSearchTalent] = useState("");
  const [rowState, setRowState] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [dataRowClicked, setDataRowClicked] = useState(null);

  // 2. USE QUERY & USE EFFECT
  const {
    data: dataEliminatedTalents,
    isLoading: loadingEliminatedTalents,
    refetch: refetchEliminatedTalents,
  } = useQuery(
    [TALENT_POOL_SHARE_PUBLIC_CUTS_GET, shareId, searchTalent],
    () => TalentPoolPublicService.getEliminates(shareId, searchTalent),
    {
      enabled: !!shareId,
      select: (response) => response.data,
    }
  );

  // 3. HANDLER
  const handleClose = () => {
    onvisible(false);
    setModalConfirm(false);
  };

  const onChangeSearchCandidate = (e) => {
    setTimeout(() => setSearchTalent(e.target.value), 500);
  };

  const handleCancelElimination = () => {
    setLoading(true);
    TalentPoolPublicService.cancelEliminate(shareId, dataRowClicked?.id)
      .then((res) => {
        if (res.success) {
          setModalConfirm(false);
          notification.success({
            message: <div>Eliminasi Talent berhasil dibatalkan.</div>,
            duration: 3,
          });
          refetchEliminatedTalents();
          queryClient.invalidateQueries(TALENT_POOL_SHARE_PUBLICS_GET);
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

  const title = (
    <div className="flex items-center gap-2 ">
      <InfoCircleIconSvg size={32} color="#BF4A40" />
      <p className="mig-heading--3 text-warning">Konfirmasi Eliminasi Talent</p>
    </div>
  );

  if (modalConfirm) {
    return (
      <ModalHapus2
        title={title}
        visible={modalConfirm}
        onvisible={setModalConfirm}
        onOk={handleCancelElimination}
        okButtonText={"Eliminasi"}
        onCancel={handleClose}
        loading={loading}
      >
        <p className="mb-4">
          Apakah anda yakin ingin membatalkan eliminasi talent dengan nama{" "}
          <strong>{dataRowClicked?.resume?.name}</strong> dengan role{" "}
          <strong>{dataRowClicked?.resume?.last_assessment?.name}</strong>?
        </p>
      </ModalHapus2>
    );
  }

  return (
    <ModalCore
      title={<p className="mig-heading--4">Daftar Talent Dieliminasi</p>}
      visible={visible}
      onCancel={handleClose}
      maskClosable={false}
      width={700}
      footer={null}
      loading={loading}
    >
      <div className="grid grid-cols-1 gap-4">
        <Input
          style={{ width: `100%` }}
          suffix={<SearchOutlined rev={""} />}
          placeholder="Cari Nama Talent.."
          onChange={onChangeSearchCandidate}
          allowClear
        />
        <Table
          rowKey={(record) => record.id}
          className="tableTalentCandidate"
          dataSource={dataEliminatedTalents}
          loading={loadingEliminatedTalents}
          pagination={{
            current: params.page,
            pageSize: params.rows,
            total: dataEliminatedTalents?.length,
            showSizeChanger: true,
            pageSizeOptions: [10, 20],
            showTotal: (total, range) =>
              `Showing ${range[0]}-${range[1]} of ${total} items`,
          }}
          onChange={(pagination, filters, sorter) => {
            setParams((prev) => ({
              ...prev,
              page: pagination.current,
              rows: pagination.pageSize,
            }));
          }}
          onRow={(record) => {
            return {
              onMouseOver: () => {
                setRowState(record.id);
              },
            };
          }}
          columns={[
            {
              title: undefined,
              dataIndex: "candidate",
              key: "candidate",
              render: (_, record, cardIdx) => {
                return (
                  <div
                    onMouseEnter={() => {
                      setIsHovered(true);
                    }}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`p-3 relative bg-transparent hover:bg-backdrop rounded-md flex 
                    items-center mb-2 border border-mono100 cursor-pointer `}
                  >
                    <div className="flex gap-3 items-center w-11/12">
                      <div
                        className={`rounded-full w-12 h-12 flex justify-center 
                        items-center mig-caption--bold p-1 ${
                          isHovered && rowState === record.id
                            ? "bg-white"
                            : "bg-backdrop"
                        }`}
                      >
                        {getNameInitial(record?.talent?.resume?.name)}
                      </div>
                      <div>
                        <p className="font-medium">
                          {record?.talent?.resume?.name}
                        </p>
                        <p className="mig-caption text-mono50">
                          {record?.talent?.resume?.last_assessment?.name}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setDataRowClicked(record?.talent);
                        setModalConfirm(true);
                      }}
                      className="mig-caption--medium text-primary100 px-3 py-1 
                    bg-primary100 bg-opacity-10 hover:opacity-70 rounded-full 
                      whitespace-nowrap"
                    >
                      Batal Eliminasi
                    </button>
                    {isHovered && rowState === record.id && (
                      <div
                        className={`absolute left-0 w-full h-full z-50 
                        ${
                          // Bottom card will show popup above the row
                          dataEliminatedTalents.length > 2 &&
                          cardIdx > dataEliminatedTalents.length - 3
                            ? "-top-[17rem]"
                            : "top-20"
                        }`}
                      >
                        <CandidateDetailCard
                          candidateData={record?.talent?.resume}
                        />
                      </div>
                    )}
                  </div>
                );
              },
            },
          ]}
        />
      </div>
    </ModalCore>
  );
};

export default ModalEliminatedTalent;
