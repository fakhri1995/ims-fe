import { UploadOutlined } from "@ant-design/icons";
import { Drawer, Upload } from "antd";
import moment from "moment";
import { FC, useState } from "react";

import ButtonSys from "components/button";
import { DownloadIconSvg, EditIconSvg } from "components/icon";
import { ModalDelete } from "components/modal/modalConfirmation";

import { useAccessControl } from "contexts/access-control";

import { LEAVE_DELETE, OVERTIME_DELETE, OVERTIME_GET } from "lib/features";
import {
  downloadFileFromPath,
  generateStaticAssetUrl,
  getBase64,
  getFileName,
  notificationError,
  notificationSuccess,
  permissionWarningNotification,
} from "lib/helper";

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
  const isAllowedToGetOvertimeDetail = hasPermission(OVERTIME_GET);
  const isAllowedToDeleteOvertime = hasPermission(OVERTIME_DELETE);
  const [loading, setLoading] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [modalConfirm, setModalConfirm] = useState({
    show: false,
    data: dataDefault?.issued_date,
  });

  const handleCloseModalConfirm = () => {
    setModalConfirm({ show: false, data: null });
  };

  const propsUpload = {
    accept: ".pdf",
    multiple: false,
    maxCount: 1,
    data: { id: dataDefault?.id },
    action: `${process.env.NEXT_PUBLIC_BACKEND_URL}/addOvertimeDocument`,
    headers: {
      authorization: JSON.parse(dataToken),
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        notificationSuccess({
          message: `${info.file.name} file uploaded successfully`,
          duration: 3,
        });
        fetchData();
        onClose();
      } else if (info.file.status === "error") {
        notificationError({
          message: `${info.file.name} file upload failed.`,
          duration: 3,
        });
      }
    },
  };

  const handleCloseModalConfirmCancel = () => {
    setModalConfirm({ show: false, data: null });
    fetchData();
    onClose();
  };

  const batalOvertime = () => {
    setLoadingCancel(true);
    let dataSend = {
      id: dataDefault.id,
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteOvertime`, {
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
          setLoadingCancel(false);
          handleCloseModalConfirmCancel();

          notificationSuccess({
            message: "Overtime request successfully canceled",
            duration: 3,
          });
          handleCloseModalConfirmCancel();
          fetchData();
        } else {
          notificationError({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  return (
    <Drawer
      title={"Overtime Issued Details"}
      visible={visible}
      footer={
        dataDefault?.status?.id != 1
          ? null
          : isAllowedToDeleteOvertime && (
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
                disabled={!isAllowedToDeleteOvertime}
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
            {console.log("isi file ", dataDefault)}
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
          {dataDefault?.status?.id == 2 && dataDefault?.document == null && (
            <div className={"mt-2 flex flex-col gap-2"}>
              <p className={"text-[#4D4D4D] text-xs leading-5 font-medium"}>
                Supporting File :
              </p>
              <div className={"flex flex-col"}>
                <div className="mb-4 ">
                  <Upload {...propsUpload}>
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
            </div>
          )}
          {dataDefault?.document == null ? (
            "-"
          ) : (
            <div
              className={
                "mig-body border p-4 rounded-[5px] flex w-full items-center gap-4"
              }
            >
              <div className="flex w-2/3 items-center gap-4">
                <div>
                  <PdfIcon />
                </div>
                <a
                  href={generateStaticAssetUrl(dataDefault?.document.link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={getFileName(dataDefault?.document?.link)}
                >
                  <p className="truncate w-40">
                    {getFileName(dataDefault?.document?.link)}
                  </p>
                </a>
              </div>
              <div className="w-1/3 text-right">
                <ButtonSys
                  type="primary"
                  color="mono100"
                  square
                  onClick={() =>
                    downloadFileFromPath(dataDefault?.document?.link)
                  }
                >
                  <DownloadIconSvg />
                </ButtonSys>
              </div>
            </div>
          )}
        </div>
      </div>
      {modalConfirm?.show && (
        <ModalDelete
          visible={modalConfirm?.show}
          title="Cancel overtime Request"
          itemName="Overtime Request"
          loading={loadingCancel}
          disabled={!isAllowedToDeleteOvertime}
          onOk={() => batalOvertime()}
          onCancel={() => setModalConfirm({ show: false, data: null })}
        >
          <p>
            Are you sure you want to cancel your overtime request on{" "}
            <strong>
              {moment(dataDefault.issued_date).format("DD MMMM YYYY")}{" "}
              {moment(dataDefault.start_at, "HH:mm:ss").format("HH:mm")}-
              {moment(dataDefault.end_at, "HH:mm:ss").format("HH:mm")}
            </strong>
            ?
          </p>
        </ModalDelete>
      )}
    </Drawer>
  );
};
