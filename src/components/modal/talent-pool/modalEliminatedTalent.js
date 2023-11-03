import { SearchOutlined } from "@ant-design/icons";
import { Checkbox, Input, Modal, Spin, Table, notification } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { TALENT_POOL_ADD, TALENT_POOL_CANDIDATES_GET } from "lib/features";
import { getNameInitial, permissionWarningNotification } from "lib/helper";

import { TalentPoolService } from "apis/talent-pool/talent-pool.service";

import ButtonSys from "../../button";
import { AlertCircleIconSvg, InfoCircleIconSvg, PlusIconSvg } from "../../icon";
import CandidateDetailCard from "../../screen/talent-pool/CandidateDetailCard";
import ModalCore from "../modalCore";
import { ModalHapus2, ModalUbah } from "../modalCustom";

const ModalEliminatedTalent = ({ initProps, visible, onvisible, category }) => {
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetCandidates = hasPermission(TALENT_POOL_CANDIDATES_GET);
  const isAllowedToAddTalentPool = hasPermission(TALENT_POOL_ADD);

  // 1. USE STATE
  const [params, setParams] = useState({
    page: 1,
    rows: 10,
    category_id: category?.id,
  });
  const [loading, setLoading] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [searchCandidate, setSearchCandidate] = useState("");
  const [rowState, setRowState] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 2. USE QUERY & USE EFFECT
  const {
    data: dataRawCandidates,
    isLoading: loadingCandidates,
    refetch: refetchCandidates,
  } = useQuery(
    [TALENT_POOL_CANDIDATES_GET, params, searchCandidate],
    () =>
      TalentPoolService.getCandidates(
        initProps,
        isAllowedToGetCandidates,
        params,
        searchCandidate
      ),
    {
      enabled: isAllowedToGetCandidates,
      select: (response) => response.data,
    }
  );

  // 3. HANDLER

  const handleClose = () => {
    onvisible(false);
    setModalConfirm(false);
  };

  const onChangeSearchCandidate = (e) => {
    setTimeout(() => setSearchCandidate(e.target.value), 500);
  };

  // console.log({ dataServiceList });
  // console.log({ dataCategory });
  // console.log({ dataRawCandidates });

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
        // onOk={handleDelete}
        okButtonText={"Eliminasi"}
        onCancel={handleClose}
        loading={loading}
      >
        <p className="mb-4">
          Apakah anda yakin ingin mengeliminasi talent dengan nama{" "}
          <strong>nama user</strong> dengan role <strong>nama role</strong>?
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
          dataSource={dataRawCandidates?.data}
          loading={loadingCandidates}
          pagination={{
            current: params.page,
            pageSize: params.rows,
            total: dataRawCandidates?.total,
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
                      setTimeout(() => {
                        setIsHovered(true);
                      }, 500);
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
                        {getNameInitial(record?.name)}
                      </div>
                      <div>
                        <p className="font-medium">{record?.name}</p>
                        <p className="mig-caption text-mono50">
                          {record?.last_assessment?.name}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setModalConfirm(true)}
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
                          // Last 3 card will show popup above the row
                          cardIdx >
                          dataRawCandidates?.to - dataRawCandidates?.from - 3
                            ? "-top-[17rem]"
                            : "top-20"
                        }`}
                      >
                        <CandidateDetailCard candidateData={record} />
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
