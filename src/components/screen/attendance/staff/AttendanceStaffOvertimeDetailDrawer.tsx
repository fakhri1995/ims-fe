import { UploadOutlined } from "@ant-design/icons";
import { Drawer, Upload } from "antd";
import moment from "moment";
import { FC, useState } from "react";

import ButtonSys from "components/button";
import { EditIconSvg } from "components/icon";
import { ModalDelete } from "components/modal/modalConfirmation";

import { useAccessControl } from "contexts/access-control";

import { LEAVE_DELETE, OVERTIME_DELETE } from "lib/features";
import { getBase64, notificationError, notificationSuccess } from "lib/helper";

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
          {dataDefault?.status?.id == 2 && (
            <div className={"mt-2 flex flex-col gap-2"}>
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
