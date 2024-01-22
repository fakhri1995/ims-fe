import { DatePicker, Form, Input, Select, Spin, notification } from "antd";
import locale from "antd/lib/date-picker/locale/id_ID";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  AGENTS_GET,
  ATTENDANCE_SCHEDULES_GET,
  ATTENDANCE_SCHEDULE_ADD,
  ATTENDANCE_SHIFTS_GET,
} from "lib/features";

import { AttendanceScheduleService } from "apis/attendance";
import { IAddSchedulePayload } from "apis/attendance/attendance-schedule.types";
import { AttendanceShiftService } from "apis/attendance/attendance-shift.service";
import { IGetShiftsPaginateParams } from "apis/attendance/attendance-shift.types";
import { AgentService, IGetAgentsPaginateParams } from "apis/user";

import DrawerCore from "../drawerCore";

const DrawerSchedule = ({ visible, onvisible, data = null }) => {
  /**
   * Dependencies
   */
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetAgents = hasPermission(AGENTS_GET);
  const isAllowedToGetShifts = hasPermission(ATTENDANCE_SHIFTS_GET);
  const isAllowedToAddSchedule = hasPermission(ATTENDANCE_SCHEDULE_ADD);

  const [instanceForm] = Form.useForm();

  //1. USE STATE
  const [dataSchedule, setDataSchedule] = useState<IAddSchedulePayload>({
    user_ids: [],
    shift_id: null,
    date: "",
  });

  const [agentFilterParams, setAgentFilterParams] =
    useState<IGetAgentsPaginateParams>({
      page: 1,
      rows: 10,
      name: "",
    });

  const [shiftFilterParams, setShiftFilterParams] =
    useState<IGetShiftsPaginateParams>({
      page: 1,
      rows: 10,
      keyword: "",
    });

  // 2. USE EFFECT
  const {
    data: dataAgents,
    isLoading: loadingAgents,
    refetch: refetchAgents,
  } = useQuery(
    [AGENTS_GET, agentFilterParams],
    () =>
      AgentService.getAgents(
        isAllowedToGetAgents,
        axiosClient,
        agentFilterParams
      ),
    {
      enabled: isAllowedToGetAgents && visible,

      select: (response) => response.data.data.data,
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan daftar karyawan (agent).",
        });
      },
    }
  );

  const {
    data: dataShifts,
    isLoading: loadingShifts,
    refetch: refetchShifts,
  } = useQuery(
    [ATTENDANCE_SHIFTS_GET, shiftFilterParams],
    () =>
      AttendanceShiftService.getShifts(
        isAllowedToGetShifts,
        axiosClient,
        shiftFilterParams
      ),
    {
      enabled: isAllowedToGetShifts && visible,

      select: (response) => response.data.data.data,
      onError: (error) => {
        notification.error({
          message: "Gagal mendapatkan daftar shift.",
        });
      },
    }
  );

  console.log({ dataAgents });

  //3. HANDLER
  const handleClose = () => {
    setDataSchedule({
      user_ids: [],
      shift_id: null,
      date: "",
    });
    onvisible(false);
  };

  const onMutationSucceed = (queryKey: string, message: string) => {
    queryClient.invalidateQueries(queryKey);
    notification.success({
      message,
    });
  };

  const { mutate: addSchedule, isLoading: loadingAddSchedule } = useMutation(
    (payload: IAddSchedulePayload) =>
      AttendanceScheduleService.addSchedule(
        isAllowedToAddSchedule,
        axiosClient,
        payload
      ),
    {
      onSuccess: (response) => {
        onMutationSucceed(ATTENDANCE_SCHEDULES_GET, response.data.message);
        handleClose();
      },
      onError: (error) => {
        notification.error({ message: "Gagal menambah jadwal." });
      },
    }
  );

  return (
    <DrawerCore
      title={"Jadwalkan Karyawan"}
      visible={visible}
      onClose={() => {
        onvisible(false);
      }}
      buttonOkText={"Simpan"}
      buttonCancelText={"Batal"}
      onClick={() => addSchedule(dataSchedule)}
      onButtonCancelClicked={() => onvisible(false)}
      disabled={
        !dataSchedule?.user_ids?.length ||
        !dataSchedule?.date ||
        !dataSchedule?.shift_id
      }
    >
      <div className="flex flex-col">
        <p className="mb-6 text-red-500 text-xs italic">
          *Informasi ini harus diisi
        </p>
        <Form layout="vertical" form={instanceForm}>
          <div>
            <Form.Item
              label="Karyawan"
              name={"user_ids"}
              rules={[
                {
                  required: true,
                  message: "Karyawan wajib diisi",
                },
              ]}
              className="col-span-2"
            >
              <div>
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Pilih Kayawan"
                  disabled={!isAllowedToGetAgents}
                  className="mb-2"
                  onChange={(value) => {
                    setDataSchedule((prev) => ({
                      ...prev,
                      user_ids: value,
                    }));
                  }}
                  onSearch={(value) => {
                    setTimeout(
                      () =>
                        setAgentFilterParams((prev) => ({
                          ...prev,
                          name: value,
                        })),
                      500
                    );
                  }}
                  optionFilterProp="children"
                  filterOption={(
                    input,
                    option: { label: string; value: number }
                  ) =>
                    option?.label?.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {dataAgents?.map((item) => (
                    <Select.Option
                      key={item?.id}
                      value={item?.id}
                      label={item?.name}
                    >
                      {item?.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Form.Item>

            <Form.Item
              label="Tanggal Berlaku"
              name={"date"}
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
                  placeholder="Pilih Tanggal Berlaku"
                  className="w-full"
                  format={"DD MMMM YYYY"}
                  locale={locale}
                  value={
                    moment(dataSchedule.date).isValid()
                      ? moment(dataSchedule.date)
                      : null
                  }
                  onChange={(value) => {
                    let formattedDate = moment(value).format("YYYY-MM-DD");
                    setDataSchedule((prev) => ({
                      ...prev,
                      date: formattedDate,
                    }));
                  }}
                />
              </div>
            </Form.Item>

            <Form.Item
              label="Tetapkan Shift"
              name={"shift_id"}
              className="col-span-2"
              rules={[
                {
                  required: true,
                  message: "Shift wajib diisi",
                },
              ]}
            >
              <div className="flex gap-2 items-center ">
                <Select
                  showSearch
                  placeholder="Pilih Shift"
                  disabled={!isAllowedToGetShifts}
                  className=" mb-2"
                  onChange={(value, option) => {
                    setDataSchedule((prev) => ({
                      ...prev,
                      shift_id: value,
                    }));
                  }}
                  onSearch={(value) => {
                    setTimeout(
                      () =>
                        setShiftFilterParams((prev) => ({
                          ...prev,
                          keyword: value,
                        })),
                      500
                    );
                  }}
                  optionFilterProp="children"
                  filterOption={(
                    input,
                    option: { label: string; value: number }
                  ) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {dataShifts?.map((item) => (
                    <Select.Option
                      key={item?.id}
                      value={item?.id}
                      label={item?.title}
                    >
                      {item?.title}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </DrawerCore>
  );
};

export default DrawerSchedule;
