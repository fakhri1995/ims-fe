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

import ButtonSys from "components/button";
import DrawerCore from "components/drawer/drawerCore";
import { CalendartimeIconSvg, UsercircleIconSvg } from "components/icon";
import { OneUserIconSvg, PdfIconSvg } from "components/icon.js";

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

import { BadgeLeaveStatus } from "../leave/BadgeLeaveStatus";

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
  employee: {
    name: string;
    nip: string;
    email: string;
    contract: {
      role: {
        name: string;
      };
    };
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

  const employeeProfile = (employee) => (
    <div className="flex items-center gap-4">
      {/* TODO: Add profile image from detailProfile */}
      <div className="w-12 h-12 rounded-full flex justify-center items-center bg-backdrop">
        <OneUserIconSvg size={20} color={"#35763B"} strokeWidth={2} />
      </div>

      <div>
        <h1 className="mig-body--medium">{employee?.name}</h1>
        <p className="mig-caption text-mono50">
          {employee?.contract?.role?.name}
        </p>
        <p className="mig-caption text-mono50">{employee?.nip}</p>
      </div>
    </div>
  );

  return (
    <Drawer
      title={"Leave Issued Details"}
      visible={visible}
      footer={
        dataDefault?.status != "1"
          ? null
          : isAllowedToDeleteLeave && (
              <ButtonSys
                fullWidth
                color={"mono30"}
                loading={loading}
                onClick={() => batalCuti()}
                disabled={!isAllowedToDeleteLeave}
              >
                Cancel Leave Submission
              </ButtonSys>
            )
      }
      onClose={onClose}
    >
      <div className={"flex flex-col gap-4 "}>
        <h3 className="mig-caption--medium">Request by</h3>
        <div className="border rounded-[5px] ">
          {/* Requester Detail */}
          <div className="border-b p-4">
            {employeeProfile(dataDefault?.employee)}
          </div>

          {/* Leave Detail */}
          <div className="p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <p className={"mig-caption text-neutrals90"}>Issued Date</p>
                <p className={"mig-body"}>
                  {moment(dataDefault?.issued_date).format("DD MMMM YYYY")}
                </p>
              </div>

              <BadgeLeaveStatus status={dataDefault?.status} />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className={"mig-caption text-neutrals90"}>Leave Date</p>
                <p className={"mig-body"}>
                  {moment(dataDefault?.start_date).format("DD MMMM YYYY")} -{" "}
                  {moment(dataDefault?.end_date).format("DD MMMM YYYY")}
                </p>
              </div>

              <p
                className={`mig-caption--medium bg-neutrals60 rounded-[5px] px-2 py-[2px] `}
              >
                {moment(dataDefault?.end_date).diff(
                  moment(dataDefault?.start_date),
                  "days"
                )}{" "}
                Days
              </p>
            </div>

            <div>
              <p className={"mig-caption text-neutrals90"}>Leave Type</p>
              <p className={"mig-body"}>{dataDefault?.type?.name}</p>
            </div>
            <div>
              <p className={"mig-caption text-neutrals90"}>Notes</p>
              <p className={"mig-body"}>{dataDefault?.notes || "-"}</p>
            </div>
            <div className={"flex flex-col gap-4"}>
              <p className={"mig-caption text-neutrals90"}>Supporting File</p>
              {dataDefault?.document == null ? (
                "-"
              ) : (
                <p className={"mig-body border p-4 rounded-[5px]"}>
                  <a
                    href={generateStaticAssetUrl(dataDefault?.document.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-2">
                      <PdfIconSvg size={28} />
                      <p>{getFileName(dataDefault.document.link)}</p>
                    </div>
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <p className={"mig-caption--medium mb-4"}>Task Delegate</p>
          <div className="border p-4 rounded-[5px]">
            {employeeProfile(dataDefault?.delegate)}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
