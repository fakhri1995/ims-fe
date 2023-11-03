import {
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Spin,
  notification,
} from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import "react-quill/dist/quill.snow.css";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { RequesterService } from "apis/user";

import { TalentPoolService } from "../../../apis/talent-pool/talent-pool.service";
import { REQUESTERS_GET, TALENT_POOL_SHARE_ADD } from "../../../lib/features";
import { permissionWarningNotification } from "../../../lib/helper";
import ButtonSys from "../../button";
import { AlertCircleIconSvg, CopyIconSvg, InfoCircleIconSvg } from "../../icon";
import ModalCore from "../modalCore";
import { ModalUbah } from "../modalCustom";

const ModalShare = ({
  initProps,
  visible,
  onvisible,
  isAllowedToAddCategory,
  category,
  // refetchCategories,
}) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToGetRequesters = hasPermission(REQUESTERS_GET);
  const isAllowedToAddTalentPoolShare = hasPermission(TALENT_POOL_SHARE_ADD);

  const axiosClient = useAxiosClient();
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
  const sharedLink = window.location.host + "/talent/" + generatedData?.code;

  const [filterParams, setFilterParams] = useState({
    page: 1,
    rows: 10,
    name: "",
  });

  // 2. USE QUERY & USE EFFECT
  const {
    data: requesterList,
    isLoading: loadingRequesterList,
    refetch: refetchRequesters,
  } = useQuery(
    [REQUESTERS_GET, filterParams],
    () => RequesterService.getRequesterList(axiosClient, filterParams),
    {
      enabled: isAllowedToGetRequesters && visible,
      select: (response) => response.data.data.data,
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
  };

  const handleGenerate = () => {
    setLoading(true);
    TalentPoolService.generateSharedLink(
      initProps,
      isAllowedToAddTalentPoolShare,
      dataForm
    ).then((res) => {
      setLoading(false);
      setGeneratedData(res.data);
      setModalLink(true);
    });
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
            <Select
              showSearch
              allowClear
              value={dataForm.requester_id}
              placeholder="Pilih nama peminta"
              onSearch={(value) => {
                setTimeout(() =>
                  setFilterParams((prev) => ({ ...prev, name: value }), 500)
                );
              }}
              optionFilterProp="children"
              onChange={(value, option) => {
                setDataForm((prev) => ({
                  ...prev,
                  requester_id: value ?? null,
                  company_name: option?.company_name ?? null,
                }));
              }}
              disabled={!isAllowedToGetRequesters}
            >
              {requesterList?.map((item) => (
                <Select.Option key={item.id} value={item.id} {...item}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
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
