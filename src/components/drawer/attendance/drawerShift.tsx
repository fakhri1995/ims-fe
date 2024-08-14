import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Spin,
  notification,
} from "antd";
import moment from "moment";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useMutation, useQueryClient } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ATTENDANCE_SHIFTS_GET,
  ATTENDANCE_SHIFT_ADD,
  ATTENDANCE_SHIFT_UPDATE,
} from "lib/features";
import { notificationError, notificationSuccess } from "lib/helper";

import { AttendanceShiftService } from "apis/attendance/attendance-shift.service";
import {
  IAddShiftPayload,
  IUpdateShiftPayload,
  ShiftDetailData,
} from "apis/attendance/attendance-shift.types";

import DrawerCore from "../drawerCore";

interface IDrawerShift {
  visible: boolean;
  onvisible: Dispatch<SetStateAction<boolean>>;
  data?: ShiftDetailData;
}

const DrawerShift: FC<IDrawerShift> = ({ visible, onvisible, data = null }) => {
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

  const [disableJamKerja, setDisableJamKerja] = useState(false);
  const [valueShiftCheckbox, setValueShiftCheckbox] = useState(false);

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
      if (
        data?.start_at?.slice(0, 5) == "00:00" &&
        data?.end_at?.slice(0, 5) == "00:00"
      ) {
        setDisableJamKerja(true);
        setValueShiftCheckbox(true);
      }
    }
  }, [data, visible]);

  //3. HANDLER
  const onChangeInput = (e) => {
    setDataShift({
      ...dataShift,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeShift = (e) => {
    let value = e.target.checked;
    setDisableJamKerja(value);
    setValueShiftCheckbox(value);
    setDataShift((prev) => ({
      ...prev,
      start_at: "00:00",
      end_at: "00:00",
    }));
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
    notificationSuccess({
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
        notificationError({ message: "Gagal menambah shift." });
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
        notificationError({ message: "Gagal mengubah shift." });
      },
    }
  );

  return (
    <DrawerCore
      title={!data ? "Add Shift" : "Edit Shift"}
      visible={visible}
      onClose={handleClose}
      buttonOkText={"Save"}
      onClick={() => (!data ? addShift(dataShift) : updateShift(dataShift))}
      disabled={
        (!data ? !isAllowedToAddShift : !isAllowedToUpdateShift) ||
        !dataShift?.title ||
        !dataShift?.start_at ||
        !dataShift?.end_at
      }
    >
      <Spin spinning={!data ? null : loadingUpdateShift}>
        <div className="flex flex-col">
          <Form layout="vertical" form={instanceForm}>
            <div>
              <Form.Item
                label="Shift Name"
                name={"title"}
                rules={[
                  {
                    required: true,
                    message: "Shift Name is required",
                  },
                ]}
                className="col-span-2"
              >
                <div>
                  <Input
                    value={dataShift.title}
                    name={"title"}
                    onChange={onChangeInput}
                    placeholder="Insert Shift Name..."
                  />
                </div>
              </Form.Item>

              <Form.Item
                label="Working Hours"
                name={"work_time"}
                rules={[
                  {
                    required: true,
                    message: "Working Hours are required",
                  },
                ]}
                className="col-span-2"
              >
                <div className="flex gap-2 items-center">
                  <DatePicker.RangePicker
                    // allowEmpty
                    picker="time"
                    disabled={disableJamKerja}
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
                    <p className="w-3/12 whitespace-nowrap text-mono80 flex justify-end">
                      (+1 day)
                    </p>
                  )}
                </div>
              </Form.Item>
              <Form.Item>
                <Checkbox checked={valueShiftCheckbox} onChange={onChangeShift}>
                  <span className={"text-mono30 mig-body"}>
                    This shift does not require attendance
                  </span>{" "}
                  <span className={"text-mono80"}>
                    (ex. : cuti bersama, libur nasional, ...)
                  </span>
                </Checkbox>
              </Form.Item>

              <Form.Item
                label="Break Time"
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
                    <p className="w-3/12 whitespace-nowrap text-mono80 flex justify-end">
                      (+1 day)
                    </p>
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
