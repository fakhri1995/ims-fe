import { DatePicker, Form, Input, Select, Spin, notification } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { ATTENDANCE_SHIFTS_GET, ATTENDANCE_SHIFT_ADD } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import { AttendanceShiftService } from "apis/attendance/attendance-shift.service";
import { IAddShiftPayload } from "apis/attendance/attendance-shift.types";

import DrawerCore from "../drawerCore";

const DrawerShiftCreate = ({
  title,
  visible,
  onvisible,
  buttonOkText,
  initProps,
  setRefresh,
  isAllowedToAdd,
}) => {
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

  const [instanceForm] = Form.useForm();

  //USESTATE
  const [dataShift, setDataShift] = useState<IAddShiftPayload>({
    title: "",
    start_at: "",
    end_at: "",
    start_break: "",
    end_break: "",
  });

  // useEffect

  //HANDLER
  const onChangeInput = (e) => {
    setDataShift({
      ...dataShift,
      [e.target.name]: e.target.value,
    });
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
      // onError: (error) => {
      //   notification.error({"Gagal menambah shift."});
      // }
    }
  );

  // USEEFFECT
  // useEffect(() => {
  //   let allFilled = Object.values(dataShift).every((value) => value);

  //   if (allFilled) {
  //     setdisabledcreate(false);
  //   } else {
  //     setdisabledcreate(true);
  //   }
  // }, [dataShift]);

  const handleClose = () => {
    setDataShift({
      title: "",
      start_at: "",
      end_at: "",
      start_break: "",
      end_break: "",
    });
    onvisible(false);
  };
  return (
    <DrawerCore
      title={title}
      visible={visible}
      onClose={handleClose}
      buttonOkText={buttonOkText}
      onClick={() => addShift(dataShift)}
      disabled={!dataShift?.title || !dataShift?.start_at || !dataShift?.end_at}
    >
      <Spin spinning={loadingAddShift}>
        <div className="flex flex-col">
          <p className="mb-6 text-red-500 text-xs italic">
            *Informasi ini harus diisi
          </p>
          <Form
            layout="vertical"
            form={instanceForm}
            className="grid grid-cols-2 gap-x-6"
          >
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
              <div>
                <DatePicker.RangePicker
                  // allowEmpty={true}

                  // open={calendarOpen}
                  // onOpenChange={setCalendarOpen}
                  onCalendarChange={(values, formatString) => {
                    // console.log({ formatString });
                    setDataShift((prev) => ({
                      ...prev,
                      start_at: formatString[0] || "",
                      end_at: formatString[1] || "",
                    }));
                  }}
                  picker="time"
                  className="w-full"
                  format={"HH:mm"}
                />
              </div>
            </Form.Item>
            <Form.Item
              label="Jam Istirahat"
              name={"break_time"}
              className="col-span-2"
            >
              <div>
                <DatePicker.RangePicker
                  // allowEmpty={true}

                  // open={calendarOpen}
                  // onOpenChange={setCalendarOpen}
                  onCalendarChange={(values, formatString) => {
                    // console.log({ formatString });
                    setDataShift((prev) => ({
                      ...prev,
                      start_break: formatString[0] || "",
                      end_break: formatString[1] || "",
                    }));
                  }}
                  picker="time"
                  className="w-full"
                  format={"HH:mm"}
                />
              </div>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerShiftCreate;
