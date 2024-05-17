import { CameraOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Skeleton,
  Upload,
  UploadProps,
  notification,
} from "antd";
import { FormInstance } from "antd/es/form/Form";
import { UploadChangeParam } from "antd/lib/upload";
import { RcFile, UploadFile } from "antd/lib/upload/interface";
import type { AxiosError, AxiosResponse } from "axios";
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQuery } from "react-query";

import DrawerCore from "components/drawer/drawerCore";
import { CalendartimeIconSvg } from "components/icon";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  ATTENDANCE_ACTIVITY_ADD,
  ATTENDANCE_ACTIVITY_DELETE,
  ATTENDANCE_ACTIVITY_UPDATE,
} from "lib/features";
import {
  getBase64,
  getFileName,
  objectToFormData,
  permissionWarningNotification,
} from "lib/helper";

import {
  FormAktivitasTypes,
  IAddAttendanceActivityPayload,
  IUpdateAttendanceActivityPayload,
  useGetUserAttendanceTodayActivities,
  useMutateAttendanceActivity,
} from "apis/attendance";
import { AuthService, AuthServiceQueryKeys } from "apis/auth";
import { Detail } from "apis/auth";

/**
 * Component AttendanceStaffAktivitasDrawer's props.
 */
export interface IAttendanceStaffLeaveDrawer {
  action: "create" | "update";

  /**
   * Arg ini diperlukan untuk `action === "update"`.
   */
  activityFormId?: number;

  visible: boolean;
  onClose: () => void;
}

/**
 * Component AttendanceStaffAktivitasDrawer
 */
export const AttendanceStaffLeaveDrawer: FC<IAttendanceStaffLeaveDrawer> = ({
  action = "create",
  visible,
  onClose,
  activityFormId,
}) => {
  const [form] = Form.useForm();
  const axiosClient = useAxiosClient();
  const { todayActivities, findTodayActivity } =
    useGetUserAttendanceTodayActivities();
  const { hasPermission } = useAccessControl();
  const isAllowedToAddActivity = hasPermission(ATTENDANCE_ACTIVITY_ADD);
  const isAllowedToUpdateActivity = hasPermission(ATTENDANCE_ACTIVITY_UPDATE);
  const isAllowedToDeleteActivity = hasPermission(ATTENDANCE_ACTIVITY_DELETE);

  useEffect(() => {
    /** Always clean up the form fields on close */
    if (!visible) {
      form.resetFields();
    }
  }, [visible]);

  const [dataCuti, setDataCuti] = useState({
    nama_karyawan: null,
    start_date: null,
    end_date: null,
    delegasi: null,
    tipe_cuti: null,
    catatan: null,
  });

  const handleChangeTipe = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <DrawerCore
      title={`Pengajuan Cuti`}
      buttonOkText="Simpan"
      visible={visible}
      width={550}
      onClose={onClose}
      onClick={() => form.submit()}
      buttonCancelText={"Batalkan"}
    >
      <div className="space-y-6">
        <p className={"text-[#BF4A40] text-xs leading-4 font-normal"}>
          *Informasi ini harus diisi
        </p>
        <div className={"mt-4 flex flex-col gap-2"}>
          <p className={"text-mono30 text-xs font-medium leading-5"}>
            Nama Karyawan
          </p>
          <Input
            value={"Bakhtiar"}
            className={"h-[52px] border border-solid border-[#E6E6E6]"}
            disabled
          />
        </div>
        <div className={"mt-4 flex"}>
          <div className={"w-5/12"}>
            <p className={"text-mono30 text-xs font-medium leading-5"}>
              Mulai Cuti*
            </p>
          </div>
          <div className="w-2/12"></div>
          <div className="w-5/12">
            <p className={"text-mono30 text-xs font-medium leading-5"}>
              Selesai Cuti
            </p>
          </div>
        </div>
        <div className={"mt-2 flex items-center"}>
          <div className={"w-[47%] calendar-cuti"}>
            <DatePicker
              placeholder="Pilih Mulai Cuti"
              style={{ height: 52, width: "100%", borderColor: "#E6E6E6" }}
              suffixIcon={<CalendartimeIconSvg size={20} color={"#808080"} />}
            />
          </div>
          <div className={"w-[6%] flex justify-center items-center"}>
            <p>-</p>
          </div>
          <div className={"w-[47%] calendar-cuti"}>
            <DatePicker
              placeholder="Pilih Selesai Cuti"
              style={{ height: 52, width: "100%", borderColor: "#E6E6E6" }}
              suffixIcon={<CalendartimeIconSvg size={20} color={"#808080"} />}
            />
          </div>
        </div>
        <div className={"mt-4 flex flex-col gap-2"}>
          <p className={"text-mono30 text-xs font-medium leading-5"}>
            Delegasi Tugas
          </p>
          <Input
            className={"h-[52px] border border-solid border-[#E6E6E6]"}
            placeholder="Cari nama atau masukkan manual"
          />
        </div>
        <div className={"mt-4 flex flex-col gap-2"}>
          <p className={"text-mono30 text-xs font-medium leading-5"}>
            Tipe Cuti
          </p>
          <Select
            defaultValue="liburan"
            placeholder="Pilih Tipe Cuti"
            size="large"
            onChange={handleChangeTipe}
            options={[
              {
                value: "sakit",
                label: "Sakit",
              },
              {
                value: "liburan",
                label: "Liburan",
              },
            ]}
          />
        </div>
        <div className={"mt-4 flex flex-col gap-2"}>
          <p className={"text-mono30 text-xs font-medium leading-5"}>Catatan</p>
          <Input.TextArea
            rows={4}
            className={"h-[164px] border border-solid border-[#E6E6E6]"}
            placeholder="Masukan scope kerja dan alasan mengambil Overtime"
          />
        </div>
        <div className={"mt-4 flex flex-col gap-2"}>
          <p className={"text-mono30 text-xs font-medium leading-5"}>
            Unggah Dokumen Pendukung
          </p>
          <div className={"flex justify-between items-center"}>
            <p
              className={"text-[#808080] text-xs leading-4 font-normal italic"}
            >
              Unggah File (Maksimal 5 MB), bisa lebih dari satu.
            </p>
            <Upload>
              <div
                className={
                  "flex justify-center items-center gap-2 hover:cursor-pointer py-2 px-4 border border-[#35763B] rounded-[5px]"
                }
              >
                <UploadOutlined size={16} />
                <p>Unggah File</p>
              </div>
            </Upload>
          </div>
        </div>
      </div>
    </DrawerCore>
  );
};
