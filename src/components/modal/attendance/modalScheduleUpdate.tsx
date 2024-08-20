import { DatePicker, Form, Input, Select, Spin, notification } from "antd";
import { AxiosResponse } from "axios";
import moment from "moment";
import { isKeyword } from "prettier";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import "react-quill/dist/quill.snow.css";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { notificationError, notificationSuccess } from "lib/helper";

import {
  AttendanceScheduleService,
  IGetScheduleSucceedResponse,
  IUpdateSchedulePayload,
  ScheduleDetailData,
} from "apis/attendance";

import { AttendanceShiftService } from "../../../apis/attendance/attendance-shift.service";
import {
  AGENTS_GET,
  ATTENDANCE_SCHEDULES_GET,
  ATTENDANCE_SCHEDULE_DELETE,
  ATTENDANCE_SCHEDULE_GET,
  ATTENDANCE_SCHEDULE_UPDATE,
  ATTENDANCE_SHIFTS_GET,
} from "../../../lib/features";
import ButtonSys from "../../button";
import { CheckIconSvg } from "../../icon";
import { ModalDelete } from "../modalConfirmation";
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
      select: (response: AxiosResponse<IGetScheduleSucceedResponse>) =>
        response.data.data,
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
    notificationSuccess({
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
          notificationError({ message: "Failed to update schedule." });
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
          notificationError({ message: "Failed to delete schedule." });
        },
      }
    );

  const title = <p className="mig-heading--4 w-2/3">Work Shift Change</p>;
  // console.log({ dataSchedule });

  if (modalDelete) {
    return (
      <AccessControl hasPermission={ATTENDANCE_SCHEDULE_DELETE}>
        <ModalDelete
          title={"Warning"}
          visible={modalDelete}
          onOk={() => deleteSchedule(dataSchedule?.id)}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"schedule"}
          loading={loadingDeleteSchedule}
          disabled={!isAllowedToDeleteSchedule}
        >
          <p className="mb-4">
            Are you sure you want to delete this schedule owned by{" "}
            <strong>{dataSchedule?.user?.name}</strong>?
          </p>
        </ModalDelete>
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
        <div className="flex items-center justify-between gap-4">
          <ButtonSys
            type={"ghost"}
            color={"danger"}
            onClick={() => setModalDelete(true)}
            disabled={!isAllowedToDeleteSchedule}
          >
            Delete
          </ButtonSys>

          <div className="flex items-center gap-4">
            <ButtonSys
              onClick={() => onvisible(false)}
              type={"default"}
              color={"mono50"}
            >
              Cancel
            </ButtonSys>
            <Spin spinning={loading}>
              <ButtonSys
                fullWidth
                type={"primary"}
                onClick={() => updateSchedule(dataSchedule)}
                disabled={!isAllowedToUpdateSchedule}
              >
                <div className="flex items-center gap-2">
                  <CheckIconSvg size={16} />
                  <p>Save Changes</p>
                </div>
              </ButtonSys>
            </Spin>
          </div>
        </div>
      }
      loading={loading}
    >
      <Form layout="vertical">
        <Form.Item
          label="Employee Selected"
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
              placeholder="Select employee name"
              disabled={true}
            ></Select>
          </>
        </Form.Item>

        <Form.Item
          label="Effective Date"
          name={"tanggal_berlaku"}
          rules={[
            {
              required: true,
              message: "Effective Date is required",
            },
          ]}
          className="col-span-2"
        >
          <div className="flex gap-2 items-center">
            <DatePicker
              // allowEmpty
              placeholder="Select Effective Date"
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
          label="Shift"
          name={"shift"}
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
              placeholder="Select Shift"
              disabled={!isAllowedToGetShifts}
              onChange={(value) =>
                setDataSchedule((prev) => ({
                  ...prev,
                  shift_id: value,
                }))
              }
            >
              {shifts?.map((item) => {
                const label = `${item?.title} (${item?.start_at?.slice(
                  0,
                  5
                )} - ${item?.end_at?.slice(0, 5)})`;
                return (
                  <Select.Option
                    {...item}
                    key={item.id}
                    value={item.id}
                    label={label}
                  >
                    {label}
                  </Select.Option>
                );
              })}
            </Select>
          </>
        </Form.Item>
      </Form>
    </ModalCore>
  );
};

export default ModalScheduleUpdate;
