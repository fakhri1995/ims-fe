import { UploadOutlined } from "@ant-design/icons";
import { Drawer, Form, Upload, notification } from "antd";
import moment from "moment";
import { FC, useState } from "react";

import ButtonSys from "components/button";
import { AccessControl } from "components/features/AccessControl";
import { EditIconSvg } from "components/icon";
import { OneUserIconSvg, PdfIconSvg } from "components/icon";
import { ModalApply, ModalDelete } from "components/modal/modalConfirmation";

import { useAccessControl } from "contexts/access-control";

import { LEAVE_DELETE } from "lib/features";
import { generateStaticAssetUrl, getBase64, getFileName } from "lib/helper";

import PdfIcon from "assets/vectors/pdf-icon.svg";

import BadgeLeaveStatus from "../leave/BadgeLeaveStatus";

/**
 * Component AttendanceStaffAktivitasDrawer's props.
 */
type objType = {
  id: number;
  status: {
    id: number;
    name: string;
  };
  issued_date: string;
  start_at: string;
  end_at: string;
  duration: number;
  delegate: {
    name: string;
  };
  notes: string;
  type: {
    name: string;
  };
  project: {
    name: string;
  };
  manager: {
    name: string;
  };
  admin_notes: string; // TODO: adjust if BE done
  document: {
    name: string;
    link: string;
  };
  approved_document: {
    // TODO: adjust if BE done
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

export interface IAttendanceStaffOvertimeDetailDrawer {
  dataToken: string;
  visible: boolean;
  onClose: () => void;
  fetchData: () => void;
  dataDefault: objType;
}

/**
 * Component AttendanceStaffAktivitasDrawer
 */

export const AttendanceStaffOvertimeDetailDrawer: FC<
  IAttendanceStaffOvertimeDetailDrawer
> = ({ visible, onClose, fetchData, dataDefault, dataToken }) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToDeleteLeave = hasPermission(LEAVE_DELETE);

  const [loading, setLoading] = useState(false);
  const [modalConfirm, setModalConfirm] = useState({
    show: false,
    data: dataDefault?.issued_date,
  });

  const handleCloseModalConfirm = () => {
    setModalConfirm({ show: false, data: null });
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

  const onChangePersonalFile = async (info) => {
    if (info.file.status === "uploading") {
      // setLoadingupload(true);
      return;
    }
    if (info.file.status === "done") {
      const blobFile = info.file.originFileObj;
      const base64Data = await getBase64(blobFile);
      // setPersonalFileBlob(blobFile);
    }
  };

  return (
    <Drawer
      title={"Overtime Issued Details"}
      visible={visible}
      footer={
        dataDefault?.status?.id != 1
          ? null
          : isAllowedToDeleteLeave && (
              <ButtonSys
                fullWidth
                color={"mono30"}
                loading={loading}
                onClick={() =>
                  setModalConfirm({
                    show: true,
                    data: dataDefault?.issued_date,
                  })
                }
                disabled={!isAllowedToDeleteLeave}
              >
                Cancel Overtime Submission
              </ButtonSys>
            )
      }
      onClose={onClose}
    >
      <div className={"flex flex-col gap-4"}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <p className={"mig-caption text-neutrals90"}>Issued Date</p>
              <p className={"mig-body"}>
                {moment(dataDefault?.issued_date).format("DD MMMM YYYY")}
              </p>
            </div>

            <BadgeLeaveStatus status={dataDefault?.status?.id} />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className={"mig-caption text-neutrals90"}>Over Time</p>
              <p className={"mig-body"}>
                {moment(dataDefault?.start_at, "HH:mm:ss").format("HH:mm")} -{" "}
                {moment(dataDefault?.end_at, "HH:mm:ss").format("HH:mm")}
              </p>
            </div>

            <p
              className={`mig-caption--medium bg-neutrals60 rounded-[5px] px-2 py-[2px] `}
            >
              {dataDefault?.duration} Hours
            </p>
          </div>
          <div>
            <p className={"mig-caption text-neutrals90"}>Project's Name</p>
            <p className={"mig-body"}>{dataDefault?.project?.name}</p>
          </div>
          <div>
            <p className={"mig-caption text-neutrals90"}>Manager's Name</p>
            <p className={"mig-body"}>{dataDefault?.manager?.name}</p>
          </div>
          <div>
            <p className={"mig-caption text-neutrals90"}>Notes</p>
            <p className={"mig-body"}>{dataDefault?.notes || "-"}</p>
          </div>
          {!!dataDefault?.admin_notes && (
            <div
              className="py-2 px-3 rounded bg-secondary100 bg-opacity-10 
              text-secondary100 flex items-center gap-2"
            >
              <EditIconSvg />
              <p className="mig-caption">{dataDefault.admin_notes}</p>
            </div>
          )}
          {/* <div className={"mt-2 flex flex-col gap-2"}>
            <p className={"text-[#4D4D4D] text-xs leading-5 font-medium"}>
              Supporting File :
            </p>
            <div className={"flex flex-col"}>
              <div className="mb-4 ">
                <Upload
                  accept=".pdf"
                  multiple={false}
                  maxCount={1}
                  onChange={onChangePersonalFile}
                >
                  <ButtonSys>
                    <div className="flex justify-center items-center gap-2 ">
                      <UploadOutlined size={16} />
                      <p>Upload File</p>
                    </div>
                  </ButtonSys>
                </Upload>
              </div>

              <em className={"text-[#808080] text-xs leading-4 font-normal "}>
                Upload File (Max. 5 MB).
              </em>
            </div>
          </div> */}
        </div>
      </div>

      {/* <AccessControl hasPermission={LEAVE_DELETE}>
        <ModalApply
          visible={true}
          title="Confirm Your Overtime"
          buttonOkText="Apply Overtime"
          loading={loading}
          disabled={!isAllowedToDeleteLeave}
          onOk={() => batalCuti()}
          onCancel={() => setModalConfirm({ show: false, data: null })}
        >
          <p>
            You have exceeded your working hours, do you want to apply for
            overtime?
          </p>
        </ModalApply>
      </AccessControl> */}
    </Drawer>
  );
};
