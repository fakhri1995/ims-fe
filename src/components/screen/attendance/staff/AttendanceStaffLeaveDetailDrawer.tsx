import { Drawer, notification } from "antd";
import moment from "moment";
import { FC, useState } from "react";

import ButtonSys from "components/button";
import { AccessControl } from "components/features/AccessControl";
import { EditIconSvg } from "components/icon";
import { OneUserIconSvg, PdfIconSvg } from "components/icon.js";
import { ModalDelete } from "components/modal/modalConfirmation";

import { useAccessControl } from "contexts/access-control";

import { LEAVE_DELETE } from "lib/features";
import { generateStaticAssetUrl, getFileName } from "lib/helper";

import PdfIcon from "assets/vectors/pdf-icon.svg";

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
  const isAllowedToDeleteLeave = hasPermission(LEAVE_DELETE);

  const [loading, setLoading] = useState(false);
  const [modalConfirm, setModalConfirm] = useState({
    show: false,
    data: dataDefault?.issued_date,
  });

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
          handleCloseModalConfirm();

          notification["success"]({
            message: "Leave request successfully canceled",
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
                onClick={() =>
                  setModalConfirm({
                    show: true,
                    data: dataDefault?.issued_date,
                  })
                }
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
              <p className={"mig-caption text-neutrals90"}>
                Approved File by Manager
              </p>
              {dataDefault?.approved_document == null ? (
                "-"
              ) : (
                <div
                  className={
                    "mig-body border p-4 rounded-[5px] flex items-center gap-4"
                  }
                >
                  <div>
                    <PdfIcon />
                  </div>
                  <a
                    href={generateStaticAssetUrl(
                      dataDefault?.approved_document.link
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p>{getFileName(dataDefault.approved_document.link)}</p>
                  </a>
                </div>
              )}
            </div>
            <div className={"flex flex-col gap-4"}>
              <p className={"mig-caption text-neutrals90"}>
                Personal Reason File
              </p>
              {dataDefault?.document == null ? (
                "-"
              ) : (
                <div
                  className={
                    "mig-body border p-4 rounded-[5px] flex items-center gap-4"
                  }
                >
                  <div>
                    <PdfIcon />
                  </div>
                  <a
                    href={generateStaticAssetUrl(dataDefault?.document.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p>{getFileName(dataDefault.document.link)}</p>
                  </a>
                </div>
              )}
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
          </div>
        </div>

        <div>
          <p className={"mig-caption--medium mb-4"}>Task Delegate</p>
          <div className="border p-4 rounded-[5px]">
            {employeeProfile(dataDefault?.delegate)}
          </div>
        </div>
      </div>

      <AccessControl hasPermission={LEAVE_DELETE}>
        <ModalDelete
          visible={modalConfirm?.show}
          title="Cancel Leave Request"
          itemName="Leave Request"
          loading={loading}
          disabled={!isAllowedToDeleteLeave}
          onOk={() => batalCuti()}
          onCancel={() => setModalConfirm({ show: false, data: null })}
        >
          <p>
            Are you sure you want to cancel your leave request on{" "}
            <strong>{moment(modalConfirm?.data).format("DD MMMM YYYY")}</strong>
            ?
          </p>
        </ModalDelete>
      </AccessControl>
    </Drawer>
  );
};
