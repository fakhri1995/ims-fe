import { Form, Input, Select, Spin, notification } from "antd";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import "react-quill/dist/quill.snow.css";

import AsyncSelect from "components/AsyncSelect";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { RequesterService } from "apis/user";

import { TalentPoolService } from "../../../apis/talent-pool/talent-pool.service";
import {
  REQUESTERS_GET,
  TALENT_POOL_SHARES_GET,
  TALENT_POOL_SHARE_ADD,
} from "../../../lib/features";
import ButtonSys from "../../button";
import { CopyIconSvg, InfoCircleIconSvg } from "../../icon";
import ModalCore from "../modalCore";

export const getTalentPoolLink = (code) => {
  return window.location.host + "/talent/" + code;
};

const ModalShare = ({ initProps, visible, onvisible, category }) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToGetRequesters = hasPermission(REQUESTERS_GET);
  const isAllowedToAddTalentPoolShare = hasPermission(TALENT_POOL_SHARE_ADD);

  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  const [form] = Form.useForm();

  // 1. USE STATE
  const [loading, setLoading] = useState(false);
  const emptyForm = {
    category_id: category.id,
    requester_id: null,
    company_name: "",
    expired: null,
  };

  const [dataForm, setDataForm] = useState(emptyForm);
  const [modalLink, setModalLink] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  const [lockScroll, setLockScroll] = useState(false);
  const [requesterList, setRequesterList] = useState([]);

  const sharedLink = getTalentPoolLink(generatedData?.code);

  const [filterParams, setFilterParams] = useState({
    page: 1,
    rows: 10,
    name: "",
  });

  // 2. USE QUERY & USE EFFECT
  const {
    data: dataRawRequesters,
    isLoading: loadingRequesters,
    refetch: refetchRequesters,
  } = useQuery(
    [REQUESTERS_GET, filterParams],
    () => RequesterService.getRequesterList(axiosClient, filterParams),
    {
      enabled: isAllowedToGetRequesters && visible,
      select: (response) => response.data.data,
      onSuccess: (data) => {
        setLockScroll(false);
        if (filterParams.page == 1) {
          setRequesterList(data.data);
        } else {
          if (data.data.length > 0) {
            let updatedData = [...requesterList, ...data.data];
            setRequesterList(updatedData);
          } else {
            setLockScroll(true);
          }
        }
      },
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan daftar requester.",
        });
      },
    }
  );

  // 3. HANDLER
  const clearData = () => {
    setDataForm(emptyForm);
    form.resetFields();
    setFilterParams({
      page: 1,
      rows: 10,
      name: "",
    });
  };

  const handleClose = () => {
    onvisible(false);
    setModalLink(false);
    clearData();
    setLockScroll(false);
  };

  const handleGenerate = () => {
    setLoading(true);
    const payload = { ...dataForm, expired: dataForm.expired ?? 0 };
    TalentPoolService.generateSharedLink(
      initProps,
      isAllowedToAddTalentPoolShare,
      payload
    )
      .then((res) => {
        if (res.success) {
          setGeneratedData(res?.data);
          setModalLink(true);
          queryClient.invalidateQueries(TALENT_POOL_SHARES_GET);
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
    <div className="flex items-center gap-2">
      <p className="mig-heading--4">Bagikan Daftar Talent {category.name}</p>
      <InfoCircleIconSvg size={16} color={"#000000"} />
    </div>
  );

  if (modalLink) {
    return (
      <ModalCore
        title={title}
        visible={modalLink}
        onCancel={handleClose}
        closable={true}
        maskClosable={true}
        footer={null}
      >
        <div
          className="flex items-center justify-between mig-caption--bold text-primary100 
          p-4 bg-backdrop rounded-md"
        >
          <p>{sharedLink}</p>
          <button
            className="bg-transparent hover:opacity-70"
            onClick={() => {
              navigator.clipboard.writeText(sharedLink).then(() =>
                notification.success({
                  message: "Link berhasil disalin!",
                  duration: 3,
                })
              );
            }}
          >
            <div className="flex items-center gap-2 mig-caption--bold">
              <CopyIconSvg size={24} color={"#35763B"} />
              <p>Salin Link</p>
            </div>
          </button>
        </div>
      </ModalCore>
    );
  }

  return (
    <ModalCore
      title={title}
      visible={visible}
      onCancel={handleClose}
      maskClosable={false}
      width={500}
      footer={
        <Spin spinning={loading}>
          <ButtonSys
            fullWidth
            type={"primary"}
            onClick={handleGenerate}
            disabled={!isAllowedToAddTalentPoolShare || !dataForm.requester_id}
          >
            <p>Generate</p>
          </ButtonSys>
        </Spin>
      }
      loading={loading}
    >
      <Form layout="vertical">
        <Form.Item
          label="Nama Peminta"
          name={"requester_id"}
          rules={[
            {
              required: true,
              message: "Nama Peminta wajib diisi",
            },
          ]}
        >
          <>
            <AsyncSelect
              allowClear
              value={dataForm.requester_id}
              placeholder="Pilih nama peminta"
              disabled={!isAllowedToGetRequesters}
              lock={lockScroll}
              setFilterParams={setFilterParams}
              onChange={(value, option) => {
                setDataForm((prev) => ({
                  ...prev,
                  requester_id: value ?? null,
                  company_name: option?.company_name ?? null,
                }));
              }}
              data={requesterList}
            />
          </>
        </Form.Item>

        {!!dataForm.company_name && (
          <Form.Item label="Nama Perusahaan" name={"company_name"}>
            <>
              <Input value={dataForm.company_name} disabled />
            </>
          </Form.Item>
        )}

        <Form.Item label="Masa Berlaku Link" name={"name"}>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Masukkan masa berlaku link"
              value={dataForm?.expired}
              onChange={(e) => {
                setDataForm((prev) => ({
                  ...prev,
                  expired: e.target.value,
                }));
              }}
              type="number"
              min={0}
              className="w-11/12"
              disabled={!isAllowedToAddTalentPoolShare}
            />
            <p className="">Hari</p>
          </div>
        </Form.Item>
      </Form>
    </ModalCore>
  );
};

export default ModalShare;
