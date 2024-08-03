import { UploadOutlined } from "@ant-design/icons";
import { Drawer, Form, Upload, notification } from "antd";
import moment from "moment";
import { FC, useState } from "react";

import ButtonSys from "components/button";
import { AccessControl } from "components/features/AccessControl";
import { CloseIconSvg, EditIconSvg } from "components/icon";
import { ModalAccept, ModalDelete } from "components/modal/modalConfirmation";
import BadgeLeaveStatus from "components/screen/attendance/leave/BadgeLeaveStatus";

import { useAccessControl } from "contexts/access-control";

import { LEAVE_DELETE, OVERTIME_APPROVE } from "lib/features";
import {
  generateStaticAssetUrl,
  getBase64,
  getFileName,
  notificationError,
  notificationSuccess,
} from "lib/helper";

import PdfIcon from "assets/vectors/pdf-icon.svg";

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
    user: {
      name: string;
    };
    contract: {
      role: {
        name: string;
      };
    };
  };
};

export interface IdrawerOvertimeDetail {
  dataToken: string;
  visible: boolean;
  onClose: () => void;
  fetchData: () => void;
  dataDefault: objType;
}

/**
 * Component AttendanceStaffAktivitasDrawer
 */

export const DrawerOvertimeDetail: FC<IdrawerOvertimeDetail> = ({
  visible,
  onClose,
  fetchData,
  dataDefault,
  dataToken,
}) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToApproveOvertime = hasPermission(OVERTIME_APPROVE);

  const [loading, setLoading] = useState(false);
  const [modalConfirm, setModalConfirm] = useState({
    show: false,
    data: dataDefault?.issued_date,
  });

  const [modalConfirmReject, setModalConfirmReject] = useState(false);
  const [modalConfirmApprove, setModalConfirmApprove] = useState(false);
  const [modalConfirmCancel, setModalConfirmCancel] = useState({
    show: false,
    data: dataDefault?.issued_date,
  });
  const [dataLoading, setDataLoading] = useState({
    loadingApprove: false,
    loadingReject: false,
  });

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

  const processOvertime = (aksi) => {
    if (aksi == "tolak") {
      setDataLoading({
        ...dataLoading,
        loadingReject: true,
      });
    }
    if (aksi == "setuju") {
      setDataLoading({
        ...dataLoading,
        loadingApprove: true,
      });
    }
    let dataSend = {
      id: dataDefault.id,
      approve: aksi == "setuju" ? 1 : 0,
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/approveOvertime`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(dataToken),
      },
      body: JSON.stringify(dataSend),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          if (aksi == "tolak") {
            setDataLoading({
              ...dataLoading,
              loadingReject: false,
            });
            setModalConfirmReject(false);
          }
          if (aksi == "setuju") {
            setDataLoading({
              ...dataLoading,
              loadingApprove: false,
            });
            setModalConfirmApprove(false);
          }

          notificationSuccess({
            message:
              aksi == "setuju"
                ? "Overtime request successfully Approved"
                : "Overtime request successfully Rejected",
            duration: 3,
          });
          onClose();
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
        dataDefault?.status?.id == 1 && (
          <div className={"flex justify-between gap-4 w-full"}>
            <div className="w-1/2">
              <ButtonSys
                fullWidth
                type="default"
                color="danger"
                loading={dataLoading.loadingReject}
                onClick={() => setModalConfirmReject(true)}
              >
                <p>Reject Overtime</p>
              </ButtonSys>
            </div>

            <div className="w-1/2">
              <ButtonSys
                fullWidth
                type="primary"
                loading={dataLoading.loadingApprove}
                onClick={() => setModalConfirmApprove(true)}
              >
                <p>Approve Overtime</p>
              </ButtonSys>
            </div>
          </div>
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
      <ModalAccept
        visible={modalConfirmApprove}
        title="Approve Overtime Request"
        loading={dataLoading?.loadingApprove}
        disabled={!isAllowedToApproveOvertime}
        onOk={() => processOvertime("setuju")}
        onCancel={() => setModalConfirmApprove(false)}
      >
        <p>
          Are you sure you want to approve{" "}
          <strong>{dataDefault?.employee?.user?.name}</strong> overtime request
          on{" "}
          <strong>
            {moment(dataDefault.issued_date).format("DD MMMM YYYY")}{" "}
            {moment(dataDefault.start_at, "HH:mm:ss").format("HH:mm")}-
            {moment(dataDefault.end_at, "HH:mm:ss").format("HH:mm")}
          </strong>
          ?
        </p>
      </ModalAccept>
      {modalConfirmReject && (
        <ModalDelete
          visible={modalConfirmReject}
          title="Reject Overtime Request"
          itemName="Overtime Request"
          loading={dataLoading?.loadingReject}
          disabled={!isAllowedToApproveOvertime}
          onOk={() => processOvertime("tolak")}
          onCancel={() => setModalConfirmReject(false)}
          iconDelete={<CloseIconSvg />}
        >
          <p>
            Are you sure you want to reject{" "}
            <strong>{dataDefault?.employee?.user?.name}</strong> overtime
            request on{" "}
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

export default DrawerOvertimeDetail;
