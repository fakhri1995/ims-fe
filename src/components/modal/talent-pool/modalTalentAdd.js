import { SearchOutlined } from "@ant-design/icons";
import { Checkbox, Input, Modal, Spin, Table, notification } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { TalentPoolService } from "../../../apis/talent-pool/talent-pool.service";
import {
  TALENT_POOL_ADD,
  TALENT_POOL_CANDIDATES_GET,
} from "../../../lib/features";
import {
  getNameInitial,
  permissionWarningNotification,
} from "../../../lib/helper";
import ButtonSys from "../../button";
import { AlertCircleIconSvg, PlusIconSvg } from "../../icon";
import CandidateDetailCard from "../../screen/talent-pool/CandidateDetailCard";
import { ModalUbah } from "../modalCustom";

const ModalTalentAdd = ({
  initProps,
  visible,
  onvisible,
  category,
  refetchPool,
  refetchFilters,
}) => {
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
  const [selectedCandidates, setSelectedCandidates] = useState([]); // talent pool candidate id is same as resume id
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

  useEffect(() => {
    return () => {
      clearData();
    };
  }, []);

  // 3. HANDLER
  const clearData = () => {
    setSelectedCandidates([]);
    setSearchCandidate("");
  };

  const handleClose = () => {
    onvisible(false);
    setModalConfirm(false);
    clearData();
  };

  const onChangeSearchCandidate = (e) => {
    setTimeout(() => setSearchCandidate(e.target.value), 500);
  };

  const handleSelect = (e) => {
    const currentSelected = e.target.value;
    if (e.target.checked) {
      setSelectedCandidates((prev) => [...prev, currentSelected]);
    } else {
      setSelectedCandidates((prev) => {
        return prev.filter((obj) => obj.id !== currentSelected.id);
      });
    }
  };

  const handleSelectAll = () => {
    setSelectedCandidates(dataRawCandidates.data);
  };

  const handleUnselectAll = () => {
    setSelectedCandidates([]);
  };

  const handleAddTalent = () => {
    if (!isAllowedToAddTalentPool) {
      permissionWarningNotification("Menambah", "Talent Pool");
      return;
    }

    const payload = {
      resume_ids: selectedCandidates.map((item) => item.id),
      category_id: category?.id,
    };
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addTalentPool`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          handleClose();
          notification.success({
            message: response.message,
            duration: 3,
          });
          refetchPool();
          refetchFilters();
          refetchCandidates();
        } else {
          notification.error({
            message: response.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambah talent pool. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoading(false));
  };

  return !modalConfirm ? (
    <Modal
      title={<p className="mig-heading--4">Tambah Talent</p>}
      visible={visible}
      onCancel={handleClose}
      maskClosable={false}
      width={700}
      footer={
        <Spin spinning={loading}>
          <div className="flex  items-center">
            <ButtonSys
              fullWidth
              type={"primary"}
              onClick={() => setModalConfirm(true)}
              disabled={!selectedCandidates.length}
            >
              <div className="flex gap-2 items-center">
                <PlusIconSvg size={16} color={"#FFFFFF"} />
                <p>Tambahkan Talent</p>
              </div>
            </ButtonSys>
          </div>
        </Spin>
      }
      loading={loading}
    >
      <div className="grid grid-cols-1 gap-4">
        {/* TODO: Implement tab  */}
        <Input
          style={{ width: `100%` }}
          suffix={<SearchOutlined rev={""} />}
          placeholder="Cari Nama Talent.."
          onChange={onChangeSearchCandidate}
          allowClear
        />
        <div className="flex justify-between items-center gap-2">
          <p className="mig-caption--bold text-mono30">
            Daftar Kandidat Resume
          </p>
          {selectedCandidates?.length !== dataRawCandidates?.data?.length ? (
            <button
              className="mig-caption--bold text-primary100 bg-transparent 
              hover:opacity-75"
              onClick={handleSelectAll}
            >
              Pilih Semua
            </button>
          ) : (
            <button
              className="mig-caption--bold text-primary100 bg-transparent 
              hover:opacity-75"
              onClick={handleUnselectAll}
            >
              Hapus Semua
            </button>
          )}
        </div>

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
                const isChecked = selectedCandidates.some(
                  (item) => item.id === record.id
                );
                return (
                  <div
                    onMouseEnter={() => {
                      setTimeout(() => {
                        setIsHovered(true);
                      }, 500);
                    }}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`p-3 relative hover:bg-backdrop rounded-md flex 
                    items-center mb-2 border border-mono100 cursor-pointer ${
                      isChecked ? "bg-backdrop" : "bg-transparent"
                    }`}
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
                    <Checkbox
                      key={record.id}
                      value={record}
                      checked={isChecked}
                      onChange={handleSelect}
                    />
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
    </Modal>
  ) : (
    <ModalUbah
      title={
        <div className="flex gap-2 items-center">
          <AlertCircleIconSvg size={32} color="#4D4D4D" />
          <h3 className="mig-heading--3">Konfirmasi Tambah Talent</h3>
        </div>
      }
      visible={modalConfirm}
      onvisible={setModalConfirm}
      onOk={handleAddTalent}
      onCancel={() => setModalConfirm(false)}
      loading={loading}
      disabled={!isAllowedToAddTalentPool}
      okButtonText={"Ya, tambahkan"}
      closable={true}
    >
      <div className="flex flex-col gap-2">
        <p>
          Anda telah memilih{" "}
          <strong>{selectedCandidates.length} kandidat</strong> berikut:
        </p>
        <ol>
          {selectedCandidates.map((item) => (
            <li key={item.id} className="font-bold">
              {item.name}
            </li>
          ))}
        </ol>
        <p>
          Apakah Anda yakin ingin menambahkannya sebagai talent{" "}
          <strong>{category?.name}</strong>?
        </p>
      </div>
    </ModalUbah>
  );
};

export default ModalTalentAdd;
