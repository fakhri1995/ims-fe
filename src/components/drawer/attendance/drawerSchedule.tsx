import { DatePicker, Form, Input, Select, Spin, notification } from "antd";
import locale from "antd/lib/date-picker/locale/id_ID";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ATTENDANCE_SCHEDULES_GET,
  ATTENDANCE_SCHEDULE_ADD,
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

  const isAllowedToAddSchedule = hasPermission(ATTENDANCE_SCHEDULE_ADD);

  const [instanceForm] = Form.useForm();

  //1. USE STATE
  //1.1 Update
  const [dataSchedule, setDataSchedule] = useState<IUpdateShiftPayload>({
    id: null,
    title: "",
    start_at: "",
    end_at: "",
    start_break: "",
    end_break: "",
  });

  // 2. USE EFFECT
  // 2.1. set initial dataSchedule from data
  useEffect(() => {
    if (visible && data) {
      setDataSchedule({
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
    setDataSchedule({
      ...dataSchedule,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setDataSchedule({
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

  const { mutate: addSchedule, isLoading: loadingAddShift } = useMutation(
    (payload: IAddShiftPayload) =>
      AttendanceShiftService.addShift(
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
        !dataSchedule?.title || !dataSchedule?.start_at || !dataSchedule?.end_at
      }
    >
      <Spin spinning={!data ? null : loadingUpdateShift}>
        <div className="flex flex-col">
          <p className="mb-6 text-red-500 text-xs italic">
            *Informasi ini harus diisi
          </p>
          <Form layout="vertical" form={instanceForm}>
            <div>
              <Form.Item
                label="Karyawan"
                name={"title"}
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
                    // value={dataUpdateProject?.proposed_bys}
                    placeholder="Pilih Kayawan"
                    // disabled={!isAllowedToGetEmployee}
                    // onChange={(value, option) => {
                    //   const updatedProposedBys = getUpdatedStaffs(
                    //     dataUpdateProject?.proposed_bys,
                    //     option
                    //   );
                    //   setDataUpdateProject((prev) => ({
                    //     ...prev,
                    //     proposed_bys: updatedProposedBys,
                    //   }));
                    // }}
                    // onSearch={(value) => {
                    //   onSearchUsers(value, setDataStaffs);
                    // }}
                    // optionFilterProp="children"
                    // filterOption={(input, option) =>
                    //   (option?.children ?? "")
                    //     .toLowerCase()
                    //     .includes(input.toLowerCase())
                    // }
                    className=" mb-2"
                  >
                    {/* {dataStaffs?.map((item) => (
              <Select.Option
                key={item?.id}
                value={item?.id}
                name={item?.name}
                profile_image={item?.profile_image}
              >
                {item?.name}
              </Select.Option>
            ))} */}
                  </Select>
                </div>
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
                    value={
                      moment(dataSchedule.start_at, "DD MMMM YYYY").isValid()
                        ? moment(dataSchedule.start_at, "DD MMMM YYYY")
                        : null
                    }
                    onChange={(values, formatString) => {
                      setDataSchedule((prev) => ({
                        ...prev,
                        tanggal_berlaku: formatString || "",
                      }));
                    }}
                  />
                </div>
              </Form.Item>

              <Form.Item
                label="Tetapkan Shift"
                name={"shift"}
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
                    // value={dataUpdateProject?.proposed_bys}
                    placeholder="Pilih Shift"
                    locale={locale}
                    // disabled={!isAllowedToGetEmployee}
                    // onChange={(value, option) => {
                    //   const updatedProposedBys = getUpdatedStaffs(
                    //     dataUpdateProject?.proposed_bys,
                    //     option
                    //   );
                    //   setDataUpdateProject((prev) => ({
                    //     ...prev,
                    //     proposed_bys: updatedProposedBys,
                    //   }));
                    // }}
                    // onSearch={(value) => {
                    //   onSearchUsers(value, setDataStaffs);
                    // }}
                    // optionFilterProp="children"
                    // filterOption={(input, option) =>
                    //   (option?.children ?? "")
                    //     .toLowerCase()
                    //     .includes(input.toLowerCase())
                    // }
                    className=" mb-2"
                  >
                    {/* {dataStaffs?.map((item) => (
              <Select.Option
                key={item?.id}
                value={item?.id}
                name={item?.name}
                profile_image={item?.profile_image}
              >
                {item?.name}
              </Select.Option>
            ))} */}
                  </Select>
                </div>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Spin>
    </DrawerCore>
  );
};

export default DrawerSchedule;
