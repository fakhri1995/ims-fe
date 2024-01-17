import { DatePicker, Form, Input, Select, Spin, notification } from "antd";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import "react-quill/dist/quill.snow.css";

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

const ModalScheduleUpdate = ({ initProps, visible, onvisible }) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToGetRequesters = hasPermission(REQUESTERS_GET);
  const isAllowedToAddTalentPoolShare = hasPermission(TALENT_POOL_SHARE_ADD);

  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  const [form] = Form.useForm();

  // 1. USE STATE
  const [loading, setLoading] = useState(false);
  const emptyForm = {
    requester_id: null,
    company_name: "",
    expired: null,
  };

  const [dataForm, setDataForm] = useState(emptyForm);
  const [modalLink, setModalLink] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  const sharedLink = getTalentPoolLink(generatedData?.code);

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
    <div className="flex items-center gap-4">
      <p className="mig-heading--4 w-2/3">Perubahan Shift Kerja</p>
      <ButtonSys type={"default"} color={"danger"}>
        Hapus
      </ButtonSys>
    </div>
  );

  return (
    <ModalCore
      title={title}
      visible={visible}
      onCancel={handleClose}
      maskClosable={false}
      width={500}
      footer={
        <div className="flex items-center justify-end gap-4">
          <ButtonSys type={"default"} color={"danger"}>
            Batal
          </ButtonSys>
          <Spin spinning={loading}>
            <ButtonSys
              fullWidth
              type={"primary"}
              onClick={handleGenerate}
              disabled={
                !isAllowedToAddTalentPoolShare || !dataForm.requester_id
              }
            >
              <p>Simpan</p>
            </ButtonSys>
          </Spin>
        </div>
      }
      loading={loading}
    >
      <Form layout="vertical">
        <Form.Item
          label="Karyawan Dipilih"
          name={"employee"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <>
            <Select
              showSearch
              allowClear
              value={dataForm.requester_id}
              placeholder="Pilih nama karyawan"
              disabled={true}
            >
              {requesterList?.map((item) => (
                <Select.Option key={item.id} value={item.id} {...item}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </>
        </Form.Item>

        <Form.Item
          label="Tanggal Berlaku"
          name={"tanggal_berlaku"}
          rules={[
            {
              required: true,
              message: "Tanggal Berlaku wajib diisi",
            },
          ]}
          className="col-span-2"
        >
          <div className="flex gap-2 items-center">
            <DatePicker
              // allowEmpty
              placeholder="Pilih Tanggal Berlaku"
              className="w-full"
              format={"DD MMMM YYYY"}
              disabled={true}
              // value={
              //   moment(dataForm.start_at, "DD MMMM YYYY").isValid()
              //     ? moment(dataForm.start_at, "DD MMMM YYYY")
              //     : null
              // }
              onChange={(values, formatString) => {
                setDataForm((prev) => ({
                  ...prev,
                  tanggal_berlaku: formatString || "",
                }));
              }}
            />
          </div>
        </Form.Item>

        <Form.Item
          label="Tetapkan Shift"
          name={"employee"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <>
            <Select
              showSearch
              allowClear
              // value={dataForm.requester_id}
              placeholder="Pilih shift"
            >
              {/* {requesterList?.map((item) => (
                <Select.Option key={item.id} value={item.id} {...item}>
                  {item.name}
                </Select.Option>
              ))} */}
            </Select>
          </>
        </Form.Item>
      </Form>
    </ModalCore>
  );
};

export default ModalScheduleUpdate;
