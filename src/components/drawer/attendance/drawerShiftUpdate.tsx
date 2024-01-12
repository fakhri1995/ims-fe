import { DatePicker, Form, Input, Select, Spin, notification } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { ATTENDANCE_SHIFTS_GET, ATTENDANCE_SHIFT_UPDATE } from "lib/features";

import { AttendanceShiftService } from "apis/attendance/attendance-shift.service";
import {
  IAddShiftPayload,
  IUpdateShiftPayload,
} from "apis/attendance/attendance-shift.types";

import DrawerCore from "../drawerCore";

const DrawerShiftUpdate = ({ visible, onvisible, data }) => {
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

  const isAllowedToUpdateShift = hasPermission(ATTENDANCE_SHIFT_UPDATE);

  const [instanceForm] = Form.useForm();

  //USESTATE
  //1.1 Update
  const [dataUpdate, setDataUpdate] = useState<IUpdateShiftPayload>({
    id: null,
    title: "",
    start_at: "",
    end_at: "",
    start_break: "",
    end_break: "",
  });

  const [loadingUpdate, setLoadingUpdate] = useState(false);

  // 2. useEffect
  // 2.1. set initial dataUpdate from data
  useEffect(() => {
    if (visible) {
      setDataUpdate(data);
    }
  }, [data, visible]);

  //HANDLER
  const onChangeInput = (e) => {
    setDataUpdate({
      ...dataUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setDataUpdate({
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
      title={"Edit Shift"}
      visible={visible}
      onClose={() => {
        onvisible(false);
      }}
      buttonOkText={"Simpan Shift"}
      onClick={() => updateShift(dataUpdate)}
      disabled={
        !dataUpdate?.title || !dataUpdate?.start_at || !dataUpdate?.end_at
      }
    >
      <Spin spinning={loadingUpdate}>
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
                    value={dataUpdate.title}
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
                      moment(dataUpdate.start_at, "HH:mm").isValid()
                        ? moment(dataUpdate.start_at, "HH:mm")
                        : null,
                      moment(dataUpdate.end_at, "HH:mm").isValid()
                        ? moment(dataUpdate.end_at, "HH:mm")
                        : null,
                    ]}
                    onChange={(values, formatString) => {
                      setDataUpdate((prev) => ({
                        ...prev,
                        start_at: formatString[0] || "",
                        end_at: formatString[1] || "",
                      }));
                    }}
                  />
                  {dataUpdate?.end_at < dataUpdate?.start_at && (
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
                      moment(dataUpdate.start_break, "HH:mm").isValid()
                        ? moment(dataUpdate.start_break, "HH:mm")
                        : null,
                      moment(dataUpdate.end_break, "HH:mm").isValid()
                        ? moment(dataUpdate.end_break, "HH:mm")
                        : null,
                    ]}
                    onCalendarChange={(values, formatString) => {
                      setDataUpdate((prev) => ({
                        ...prev,
                        start_break: formatString[0] || "",
                        end_break: formatString[1] || "",
                      }));
                    }}
                  />
                  {dataUpdate?.end_break < dataUpdate?.start_break && (
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

export default DrawerShiftUpdate;
