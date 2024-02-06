import { DatePicker, Form, Input, Select, Spin, notification } from "antd";
import moment from "moment";
import { isKeyword } from "prettier";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import "react-quill/dist/quill.snow.css";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  AttendanceScheduleService,
  IUpdateSchedulePayload,
  ScheduleData,
  ScheduleDetailData,
} from "apis/attendance";
import { RequesterService } from "apis/user";

import { AttendanceShiftService } from "../../../apis/attendance/attendance-shift.service";
import {
  AGENTS_GET,
  ATTENDANCE_SCHEDULES_GET,
  ATTENDANCE_SCHEDULE_DELETE,
  ATTENDANCE_SCHEDULE_GET,
  ATTENDANCE_SCHEDULE_UPDATE,
  ATTENDANCE_SHIFTS_GET,
  REQUESTERS_GET,
  TALENT_POOL_SHARES_GET,
  TALENT_POOL_SHARE_ADD,
} from "../../../lib/features";
import ButtonSys from "../../button";
import { AlertCircleIconSvg, CopyIconSvg, InfoCircleIconSvg } from "../../icon";
import { ModalHapus2 } from "../../modal/modalCustom";
import ModalCore from "../modalCore";

const ModalScheduleUpdate = ({ initProps, scheduleId, visible, onvisible }) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToGetAgents = hasPermission(AGENTS_GET);
  const isAllowedToGetShifts = hasPermission(ATTENDANCE_SHIFTS_GET);
  const isAllowedToGetSchedule = hasPermission(ATTENDANCE_SCHEDULE_GET);

  const isAllowedToUpdateSchedule = hasPermission(ATTENDANCE_SCHEDULE_UPDATE);
  const isAllowedToDeleteSchedule = hasPermission(ATTENDANCE_SCHEDULE_DELETE);

  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  const [form] = Form.useForm();

  // 1. USE STATE
  const [loading, setLoading] = useState(false);
  const [dataSchedule, setDataSchedule] = useState<ScheduleDetailData>();
  const [shiftParams, setShiftParams] = useState({
    page: 1,
    rows: 10,
    keyword: "",
  });
  const [modalDelete, setModalDelete] = useState(false);

  // 2. USE QUERY & USE EFFECT
  // useEffect(() => {
  //   setDataSchedule(data);
  // }, [data]);

  const {
    data: shifts,
    isLoading: loadingShifts,
    refetch: refetchShifts,
  } = useQuery(
    [ATTENDANCE_SHIFTS_GET, shiftParams],
    () =>
      AttendanceShiftService.getShifts(
        isAllowedToGetShifts,
        axiosClient,
        shiftParams
      ),
    {
      enabled: isAllowedToGetShifts && visible,
      select: (response) => response.data.data.data,
    }
  );

  const {
    data: schedule,
    isLoading: loadingSchedule,
    refetch: refetchSchedule,
  } = useQuery(
    [ATTENDANCE_SCHEDULE_GET, scheduleId],
    () =>
      AttendanceScheduleService.getSchedule(
        isAllowedToGetSchedule,
        axiosClient,
        scheduleId
      ),
    {
      enabled: isAllowedToGetSchedule && visible,
      select: (response) => response.data.data,
      onSuccess: (data) => setDataSchedule(data),
    }
  );

  // 3. HANDLER
  const clearData = () => {
    // setDataSchedule(emptyForm);
    form.resetFields();
    setShiftParams({
      page: 1,
      rows: 10,
      keyword: "",
    });
  };

  const handleClose = () => {
    onvisible(false);
    setModalDelete(false);
    clearData();
  };

  const onMutationSucceed = (queryKey: string, message: string) => {
    queryClient.invalidateQueries(queryKey);
    notification.success({
      message,
    });
  };

  const { mutate: updateSchedule, isLoading: loadingUpdateSchedule } =
    useMutation(
      (payload: IUpdateSchedulePayload) =>
        AttendanceScheduleService.updateSchedule(
          isAllowedToUpdateSchedule,
          axiosClient,
          payload
        ),
      {
        onSuccess: (response) => {
          onMutationSucceed(ATTENDANCE_SCHEDULES_GET, response.data.message);
          handleClose();
        },
        onError: (error) => {
          notification.error({ message: "Gagal mengubah jadwal." });
        },
      }
    );

  const { mutate: deleteSchedule, isLoading: loadingDeleteSchedule } =
    useMutation(
      (scheduleId: number) =>
        AttendanceScheduleService.deleteSchedule(
          isAllowedToDeleteSchedule,
          axiosClient,
          scheduleId
        ),
      {
        onSuccess: (response) => {
          onMutationSucceed(ATTENDANCE_SCHEDULES_GET, response.data.message);
          handleClose();
        },
        onError: (error) => {
          notification.error({ message: "Gagal menghapus jadwal." });
        },
      }
    );

  const title = (
    <div className="flex items-center gap-4">
      <p className="mig-heading--4 w-2/3">Perubahan Shift Kerja</p>
      <ButtonSys
        type={"default"}
        color={"danger"}
        onClick={() => setModalDelete(true)}
        disabled={!isAllowedToDeleteSchedule}
      >
        Hapus
      </ButtonSys>
    </div>
  );
  // console.log({ dataSchedule });

  if (modalDelete) {
    return (
      <AccessControl hasPermission={ATTENDANCE_SCHEDULE_DELETE}>
        <ModalHapus2
          title={
            <div className="flex items-center gap-4">
              <AlertCircleIconSvg color={"#BF4A40"} size={24} />
              <p className="font-bold">Peringatan</p>
            </div>
          }
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={() => deleteSchedule(dataSchedule?.id)}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"jadwal"}
          loading={loadingDeleteSchedule}
        >
          <p className="mb-4">
            Apakah Anda yakin ingin melanjutkan penghapusan jadwal milik{" "}
            <strong>{dataSchedule?.user?.name}</strong>?
          </p>
        </ModalHapus2>
      </AccessControl>
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
        <div className="flex items-center justify-end gap-4">
          <ButtonSys
            onClick={() => onvisible(false)}
            type={"default"}
            color={"danger"}
          >
            Batal
          </ButtonSys>
          <Spin spinning={loading}>
            <ButtonSys
              fullWidth
              type={"primary"}
              onClick={() => updateSchedule(dataSchedule)}
              disabled={!isAllowedToUpdateSchedule}
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
              value={dataSchedule?.user?.name}
              placeholder="Pilih nama karyawan"
              disabled={true}
            ></Select>
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
              value={
                moment(dataSchedule?.date, "DD MMMM YYYY").isValid()
                  ? moment(dataSchedule?.date, "DD MMMM YYYY")
                  : null
              }
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
              value={dataSchedule?.shift_id}
              placeholder="Pilih shift"
              disabled={!isAllowedToGetShifts}
              onChange={(value) =>
                setDataSchedule((prev) => ({
                  ...prev,
                  shift_id: value,
                }))
              }
            >
              {shifts?.map((item) => (
                <Select.Option key={item.id} value={item.id} {...item}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </>
        </Form.Item>
      </Form>
    </ModalCore>
  );
};

export default ModalScheduleUpdate;
