import {
  CameraOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Skeleton,
  Spin,
  Tag,
  Upload,
  UploadProps,
  notification,
} from "antd";
import { FormInstance } from "antd/es/form/Form";
import { UploadChangeParam } from "antd/lib/upload";
import { RcFile, UploadFile } from "antd/lib/upload/interface";
import type { AxiosError, AxiosResponse } from "axios";
import moment from "moment";
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
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
  LEAVE_DELETE,
} from "lib/features";
import {
  generateStaticAssetUrl,
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
type objType = {
  id: number;
  status: string;
  issued_date: string;
  start_date: string;
  end_date: string;
  delegate: {
    name: string;
  };
  notes: string;
  type: {
    name: string;
  };
  document: {
    name: string;
    link: string;
  };
};
export interface IAttendanceStaffLeaveDetailDrawer {
  dataToken: string;
  visible: boolean;
  onClose: () => void;
  fetchData: () => void;
  dataDefault: objType;
}

/**
 * Component AttendanceStaffAktivitasDrawer
 */

export const AttendanceStaffLeaveDetailDrawer: FC<
  IAttendanceStaffLeaveDetailDrawer
> = ({ visible, onClose, fetchData, dataDefault, dataToken }) => {
  const { hasPermission } = useAccessControl();
  const [loading, setLoading] = useState(false);
  const isAllowedToDeleteLeave = hasPermission(LEAVE_DELETE);

  const batalCuti = () => {
    setLoading(true);
    let dataSend = {
      id: dataDefault.id,
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteLeave`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(dataToken),
      },
      body: JSON.stringify(dataSend),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setLoading(false);

          notification["success"]({
            message: "Batalkan Cuti Sukses",
            duration: 3,
          });
          onClose();
          fetchData();
        } else {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  return (
    <Modal
      title={<p className={"text-center"}>Detail of Leave Application</p>}
      open={visible}
      width={487}
      className={"rounded-[10px]"}
      footer={
        dataDefault?.status != "1"
          ? null
          : isAllowedToDeleteLeave && (
              <div
                onClick={() => batalCuti()}
                className={
                  "bg-[#BF4A40] py-2 rounded-[5px] flex justify-center hover:cursor-pointer"
                }
              >
                <div className={"flex items-center gap-2"}>
                  {loading && (
                    <Spin indicator={<LoadingOutlined />} size="small" />
                  )}
                  <p className={"text-white text-xs leading-5 font-bold"}>
                    Cancel
                  </p>
                </div>
              </div>
            )
      }
      onCancel={onClose}
    >
      <div className={"flex flex-col gap-4 "}>
        <div className={"flex flex-col gap-2"}>
          <p className={"text-xs text-[#808080] leading-4 font-normal"}>
            Status
          </p>
          <div
            className={`${
              dataDefault?.status == "1"
                ? "bg-[#E6E6E6]"
                : dataDefault?.status == "2"
                ? "bg-[#35763B]"
                : "bg-[#BF4A40]"
            } py-1 px-4 max-w-max rounded-[5px]`}
          >
            <p
              className={`${
                dataDefault?.status == "1"
                  ? "text-[#4D4D4D]"
                  : dataDefault?.status == "2"
                  ? "text-[#F3F3F3]"
                  : "text-white"
              } leading-4 text-[10px] font-medium`}
            >
              {dataDefault?.status == "1"
                ? "Pending"
                : dataDefault?.status == "2"
                ? "Accepted"
                : "Rejected"}
            </p>
          </div>
        </div>
        <div className={"flex flex-col gap-1"}>
          <p className={"text-xs text-[#808080] leading-4 font-normal"}>
            Issued Date
          </p>
          <p className={"text-sm text-[#4D4D4D] leading-6 font-medium"}>
            {moment(dataDefault?.issued_date).format("DD MMMM YYYY")}
          </p>
        </div>
        <div className={"flex flex-col gap-1"}>
          <p className={"text-xs text-[#808080] leading-4 font-normal"}>
            Leave Date
          </p>
          <p className={"text-sm text-[#4D4D4D] leading-6 font-medium"}>
            {moment(dataDefault?.start_date).format("DD MMMM YYYY")} -{" "}
            {moment(dataDefault?.end_date).format("DD MMMM YYYY")}
          </p>
        </div>
        <div className={"flex flex-col gap-1"}>
          <p className={"text-xs text-[#808080] leading-4 font-normal"}>
            Duration
          </p>
          <p className={"text-sm text-[#4D4D4D] leading-6 font-medium"}>
            {moment(dataDefault?.end_date).diff(
              moment(dataDefault?.start_date),
              "days"
            )}{" "}
            Hari
          </p>
        </div>
        <div className={"flex flex-col gap-1"}>
          <p className={"text-xs text-[#808080] leading-4 font-normal"}>
            Task Delegate
          </p>
          <p className={"text-sm text-[#4D4D4D] leading-6 font-medium"}>
            {dataDefault?.delegate?.name}
          </p>
        </div>
        <div className={"flex flex-col gap-1"}>
          <p className={"text-xs text-[#808080] leading-4 font-normal"}>
            Leave Type
          </p>
          <p className={"text-sm text-[#4D4D4D] leading-6 font-medium"}>
            {dataDefault?.type?.name}
          </p>
        </div>
        <div className={"flex flex-col gap-1"}>
          <p className={"text-xs text-[#808080] leading-4 font-normal"}>
            Notes
          </p>
          <p className={"text-sm text-[#4D4D4D] leading-6 font-medium"}>
            {dataDefault?.notes}
          </p>
        </div>
        <div className={"flex flex-col gap-1"}>
          <p className={"text-xs text-[#808080] leading-4 font-normal"}>
            File Link
          </p>
          <p className={"text-sm text-[#4D4D4D] leading-6 font-medium"}>
            {dataDefault?.document == null ? (
              "-"
            ) : (
              <a
                href={"https://cdn.mig.id/" + dataDefault?.document.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View File
              </a>
            )}
          </p>
        </div>
      </div>
    </Modal>
  );
};
