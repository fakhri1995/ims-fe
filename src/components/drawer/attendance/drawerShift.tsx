import { DatePicker, Form, Input, Select, Spin, notification } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ATTENDANCE_SHIFTS_GET,
  ATTENDANCE_SHIFT_ADD,
  ATTENDANCE_SHIFT_UPDATE,
} from "lib/features";

import { AttendanceShiftService } from "apis/attendance/attendance-shift.service";
import {
  IAddShiftPayload,
  IUpdateShiftPayload,
} from "apis/attendance/attendance-shift.types";

import DrawerCore from "../drawerCore";

const DrawerShift = ({ visible, onvisible, data = null }) => {
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

  const isAllowedToAddShift = hasPermission(ATTENDANCE_SHIFT_ADD);
  const isAllowedToUpdateShift = hasPermission(ATTENDANCE_SHIFT_UPDATE);

  const [instanceForm] = Form.useForm();

  //1. USE STATE
  //1.1 Update
  const [dataShift, setDataShift] = useState<IUpdateShiftPayload>({
    id: null,
    title: "",
    start_at: "",
    end_at: "",
    start_break: "",
    end_break: "",
  });

  // 2. USE EFFECT
  // 2.1. set initial dataShift from data
  useEffect(() => {
    if (visible && data) {
      setDataShift({
        ...data,
        start_at: data?.start_at?.slice(0, 5),
        end_at: data?.end_at?.slice(0, 5),
        start_break: data?.start_break?.slice(0, 5),
        end_break: data?.end_break?.slice(0, 5),
      });
    }
  }, [data, visible]);

  //3. HANDLER
  const onChangeInput = (e) => {
    setDataShift({
      ...dataShift,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setDataShift({
      id: 0,
      title: "",
      start_at: "",
      end_at: "",
      start_break: "",
      end_break: "",
    });
    onvisible(false);
  };

  const onMutationSucceed = (queryKey: string, message: string) => {
    queryClient.invalidateQueries(queryKey);
    notification.success({
      message,
    });
  };

  const { mutate: addShift, isLoading: loadingAddShift } = useMutation(
    (payload: IAddShiftPayload) =>
      AttendanceShiftService.addShift(
        isAllowedToAddShift,
        axiosClient,
        payload
      ),
    {
      onSuccess: (response) => {
        onMutationSucceed(ATTENDANCE_SHIFTS_GET, response.data.message);
        handleClose();
      },
      onError: (error) => {
        notification.error({ message: "Gagal menambah shift." });
      },
    }
  );

  const { mutate: updateShift, isLoading: loadingUpdateShift } = useMutation(
    (payload: IUpdateShiftPayload) =>
      AttendanceShiftService.updateShift(
        isAllowedToUpdateShift,
        axiosClient,
        payload
      ),
    {
      onSuccess: (response) => {
        onMutationSucceed(ATTENDANCE_SHIFTS_GET, response.data.message);
        handleClose();
      },
      onError: (error) => {
        notification.error({ message: "Gagal mengubah shift." });
      },
    }
  );

  return (
    <DrawerCore
      title={!data ? "Tambah Shift" : "Edit Shift"}
      visible={visible}
      onClose={() => {
        onvisible(false);
      }}
      buttonOkText={"Simpan Shift"}
      onClick={() => (!data ? addShift(dataShift) : updateShift(dataShift))}
      disabled={!dataShift?.title || !dataShift?.start_at || !dataShift?.end_at}
    >
      <Spin spinning={!data ? null : loadingUpdateShift}>
        <div className="flex flex-col">
          <p className="mb-6 text-red-500 text-xs italic">
            *Informasi ini harus diisi
          </p>
          <Form layout="vertical" form={instanceForm}>
            <div>
              <Form.Item
                label="Nama Shift"
                name={"title"}
                rules={[
                  {
                    required: true,
                    message: "Nama Shift wajib diisi",
                  },
                ]}
                className="col-span-2"
              >
                <div>
                  <Input
                    value={dataShift.title}
                    name={"title"}
                    onChange={onChangeInput}
                    placeholder="Masukkan Nama Shift..."
                  />
                </div>
              </Form.Item>

              <Form.Item
                label="Jam Kerja"
                name={"work_time"}
                rules={[
                  {
                    required: true,
                    message: "Jam kerja wajib diisi",
                  },
                ]}
                className="col-span-2"
              >
                <div className="flex gap-2 items-center">
                  <DatePicker.RangePicker
                    // allowEmpty
                    picker="time"
                    className="w-full"
                    format={"HH:mm"}
                    order={false}
                    value={[
                      moment(dataShift.start_at, "HH:mm").isValid()
                        ? moment(dataShift.start_at, "HH:mm")
                        : null,
                      moment(dataShift.end_at, "HH:mm").isValid()
                        ? moment(dataShift.end_at, "HH:mm")
                        : null,
                    ]}
                    onChange={(values, formatString) => {
                      setDataShift((prev) => ({
                        ...prev,
                        start_at: formatString[0] || "",
                        end_at: formatString[1] || "",
                      }));
                    }}
                  />
                  {dataShift?.end_at < dataShift?.start_at && (
                    <p className="whitespace-nowrap text-mono80">(+1 hari)</p>
                  )}
                </div>
              </Form.Item>

              <Form.Item
                label="Jam Istirahat"
                name={"break_time"}
                className="col-span-2"
              >
                <div className="flex gap-2 items-center ">
                  <DatePicker.RangePicker
                    picker="time"
                    className="w-full"
                    format={"HH:mm"}
                    order={false}
                    value={[
                      moment(dataShift.start_break, "HH:mm").isValid()
                        ? moment(dataShift.start_break, "HH:mm")
                        : null,
                      moment(dataShift.end_break, "HH:mm").isValid()
                        ? moment(dataShift.end_break, "HH:mm")
                        : null,
                    ]}
                    onCalendarChange={(values, formatString) => {
                      setDataShift((prev) => ({
                        ...prev,
                        start_break: formatString[0] || "",
                        end_break: formatString[1] || "",
                      }));
                    }}
                  />
                  {dataShift?.end_break < dataShift?.start_break && (
                    <p className="whitespace-nowrap text-mono80">(+1 hari)</p>
                  )}
                </div>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerShift;
