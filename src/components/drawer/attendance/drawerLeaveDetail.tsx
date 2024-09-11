import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Drawer } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import InfoBanner from "components/InfoBanner";
import ButtonSys from "components/button";
import { AccessControl } from "components/features/AccessControl";
import { ArrowLeftIconSvg, EditIconSvg, OneUserIconSvg } from "components/icon";
import { ModalAccept, ModalDelete } from "components/modal/modalConfirmation";
import BadgeLeaveStatus from "components/screen/attendance/leave/BadgeLeaveStatus";

import { useAccessControl } from "contexts/access-control";

import { LEAVE_APPROVE, LEAVE_DELETE } from "lib/features";
import {
  downloadFileFromPath,
  notificationError,
  notificationSuccess,
} from "lib/helper";
import { generateStaticAssetUrl, getFileName } from "lib/helper";

import { LeaveStatus } from "apis/attendance";
import { IEmployeeData } from "apis/employee/employee.types";

import PdfIcon from "assets/vectors/pdf-icon.svg";

import { CloseIconSvg, DownloadIconSvg } from "../../icon";

import { IFileAttribute } from "types/common";

/**
 * Component DrawerLeaveDetail's props.
 */
export interface IDrawerLeaveDetail {
  visible: boolean;
  dataDefault: {
    id: number;
    status: 1 | 2 | 3; // 1 -> pending | 2 -> accepted | 3 -> rejected
    issued_date: Date | string;
    start_date: Date | string;
    end_date: Date | string;
    notes: string;
    admin_notes: string;
    type: {
      name: string;
    };
    approval: IFileAttribute;
    document: IFileAttribute;
    delegate: IEmployeeData;
    employee: IEmployeeData;
  };
  isAdmin?: boolean;
  closeDrawer: () => void;
  initProps: string;
  fetchData: () => void;
}

/**
 * Component DrawerLeaveDetail
 */
const DrawerLeaveDetail: FC<IDrawerLeaveDetail> = ({
  visible,
  dataDefault,
  closeDrawer,
  initProps,
  fetchData,
  isAdmin = false,
}) => {
  const { hasPermission } = useAccessControl();
  const isAllowedToApproveLeave = hasPermission(LEAVE_APPROVE);
  const isAllowedToDeleteLeave = hasPermission(LEAVE_DELETE);

  const [showData, setShowData] = useState("1");
  const [detailEmployee, setDetailEmployee] = useState({
    nama: null,
    role: null,
    company: null,
    nip: null,
    no_telp: null,
    email: null,
    jumlah_cuti_tahunan: null,
  });

  const [dataLoading, setDataLoading] = useState({
    loadingApprove: false,
    loadingReject: false,
  });
  const [adminNotes, setAdminNotes] = useState("");

  const [loadingCancel, setLoadingCancel] = useState(false);

  const [modalConfirmReject, setModalConfirmReject] = useState(false);
  const [modalConfirmApprove, setModalConfirmApprove] = useState(false);

  const [modalConfirmCancel, setModalConfirmCancel] = useState({
    show: false,
    data: dataDefault?.issued_date,
  });

  useEffect(() => {
    if (visible && dataDefault && dataDefault.admin_notes) {
      setAdminNotes(dataDefault.admin_notes);
    }
  }, [dataDefault, visible]);

  const clickDetailEmployee = (record) => {
    console.log("isi detail ", record);
    setDetailEmployee({
      nama: record?.name,
      role: record?.contract?.role?.name,
      company: record?.contract?.placement,
      nip: record?.nip,
      no_telp: record?.phone_number,
      email: record?.email_office,
      jumlah_cuti_tahunan: record?.leave_quota,
    });
    setShowData("2");
  };

  const closeDrawerNew = () => {
    if (showData == "2") {
      setShowData("1");
    } else {
      setAdminNotes("");
      closeDrawer();
    }
  };

  const handleCloseModalConfirmCancel = () => {
    setModalConfirmCancel({ show: false, data: null });
  };

  const processCuti = (aksi) => {
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
      admin_notes: adminNotes,
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/approveLeave`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(initProps),
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
                ? "Approve leave request success"
                : "Reject leave request success",
            duration: 3,
          });
          setAdminNotes("");
          closeDrawer();
          fetchData();
        } else {
          notificationError({
            message: res2.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notificationError({
          message: "Failed to handle leave request",
          duration: 3,
        });
      })
      .finally(() =>
        setDataLoading({
          ...dataLoading,
          loadingReject: false,
          loadingApprove: false,
        })
      );
  };

  const batalCuti = () => {
    setLoadingCancel(true);
    let dataSend = {
      id: dataDefault.id,
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteLeave`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(initProps),
      },
      body: JSON.stringify(dataSend),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setLoadingCancel(false);
          handleCloseModalConfirmCancel();

          notificationSuccess({
            message: "Leave request successfully canceled",
            duration: 3,
          });
          fetchData();
        } else {
          notificationError({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  const employeeProfile = (employee) => (
    <div className="flex justify-between items-center">
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
      <div
        className={"flex gap-2 items-center hover:cursor-pointer"}
        onClick={() => clickDetailEmployee(employee)}
      >
        <p className="text-[#35763B] text-xs leading-4 font-medium">
          View Detail
        </p>
      </div>
    </div>
  );

  return (
    <Drawer
      title={
        showData == "1" ? (
          "Leave Issued Details"
        ) : (
          <div className="flex items-center gap-3">
            <button
              className="hover:opacity-75 flex items-center bg-transparent"
              onClick={() => setShowData("1")}
            >
              <ArrowLeftIconSvg size={20} color={"#808080"} />
            </button>
            <p>Employee Details</p>
          </div>
        )
      }
      open={visible}
      closeIcon={showData == "1" && <CloseOutlined size={24} color="black" />}
      onClose={() => closeDrawerNew()}
      footer={
        isAdmin ? (
          showData == "1" &&
          dataDefault?.status == LeaveStatus.PENDING && (
            <div className={"flex justify-between gap-4 w-full"}>
              <div className="w-1/2">
                <ButtonSys
                  fullWidth
                  type="default"
                  color="danger"
                  loading={dataLoading.loadingReject}
                  onClick={() => setModalConfirmReject(true)}
                >
                  <p>Reject Leave</p>
                </ButtonSys>
              </div>

              <div className="w-1/2">
                <ButtonSys
                  fullWidth
                  type="primary"
                  loading={dataLoading.loadingApprove}
                  onClick={() => setModalConfirmApprove(true)}
                >
                  <p>Approve Leave</p>
                </ButtonSys>
              </div>
            </div>
          )
        ) : dataDefault?.status == LeaveStatus.PENDING ? (
          <ButtonSys
            fullWidth
            color={"mono30"}
            loading={loadingCancel}
            onClick={() =>
              setModalConfirmCancel({
                show: true,
                data: dataDefault?.issued_date,
              })
            }
            disabled={!isAllowedToDeleteLeave}
          >
            Cancel Leave Submission
          </ButtonSys>
        ) : null
      }
    >
      {showData == "1" && (
        <div className={"flex flex-col gap-4"}>
          <h3 className="mig-caption--medium">Requested by</h3>
          <div className="border rounded-[5px] ">
            {/* Requester Detail */}
            <div className="border-b p-4 ">
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
                  Leave Form Approved by Manager
                </p>
                {dataDefault?.approval == null ? (
                  "-"
                ) : (
                  <div
                    className={
                      "mig-body border p-4 rounded-[5px] flex items-center gap-4 justify-between"
                    }
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <PdfIcon />
                      </div>
                      <a
                        href={generateStaticAssetUrl(
                          dataDefault?.approval?.link
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={getFileName(dataDefault?.approval?.link)}
                      >
                        <p className="truncate w-40">
                          {getFileName(dataDefault?.approval?.link)}
                        </p>
                      </a>
                    </div>
                    <ButtonSys
                      type="primary"
                      color="mono100"
                      square
                      onClick={() =>
                        downloadFileFromPath(dataDefault?.approval?.link)
                      }
                    >
                      <DownloadIconSvg />
                    </ButtonSys>
                  </div>
                )}
              </div>
              <div className={"flex flex-col gap-4"}>
                <p className={"mig-caption text-neutrals90"}>MIG Leave Form</p>
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
                        href={generateStaticAssetUrl(
                          dataDefault?.document.link
                        )}
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

              {!isAdmin && !!dataDefault?.admin_notes && (
                <InfoBanner
                  icon={<EditIconSvg />}
                  text={dataDefault.admin_notes}
                />
              )}

              {isAdmin && (
                <div className={"mt-2 flex flex-col gap-2"}>
                  <p className="mig-caption text-neutrals90">
                    Additional Notes{" "}
                    <span className="text-[12px] font-medium text-neutrals80">
                      (optional)
                    </span>
                  </p>
                  <textarea
                    rows={3}
                    className={" border border-solid border-[#E6E6E6] p-4"}
                    value={adminNotes}
                    onChange={(e) => {
                      setAdminNotes(e.target.value);
                    }}
                    disabled={dataDefault?.status != 1}
                  />
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
      )}
      {showData == "2" && (
        <div className={"flex flex-col gap-4"}>
          <div
            className="flex flex-col justify-center items-center
           bg-backdrop text-primary100 py-2 rounded-[5px]"
          >
            <h5 className="mig-heading--5 text-primary100">
              {detailEmployee.jumlah_cuti_tahunan
                ? Number(detailEmployee.jumlah_cuti_tahunan)
                : "0 "}
              days quota
            </h5>
            <p>leave remaining</p>
          </div>
          <div className={"flex flex-col"}>
            <p className={"mig-caption text-neutrals90"}>Name</p>
            <p className={"mig-body text-neutrals100"}>
              {detailEmployee?.nama || "-"}
            </p>
          </div>
          <div className={"flex flex-col"}>
            <p className={"mig-caption text-neutrals90"}>Role</p>
            <p className={"mig-body text-neutrals100"}>
              {detailEmployee?.role || "-"}
            </p>
          </div>
          <div className={"flex flex-col"}>
            <p className={"mig-caption text-neutrals90"}>Company</p>
            <p className={"mig-body text-neutrals100"}>
              {detailEmployee?.company || "-"}
            </p>
          </div>
          <div className={"flex flex-col"}>
            <p className={"mig-caption text-neutrals90"}>NIP</p>
            <p className={"mig-body text-neutrals100"}>
              {detailEmployee?.nip || "-"}
            </p>
          </div>
          <div className={"flex flex-col"}>
            <p className={"mig-caption text-neutrals90"}>Phone Number</p>
            <p className={"mig-body text-neutrals100"}>
              {detailEmployee?.no_telp || "-"}
            </p>
          </div>
          <div className={"flex flex-col"}>
            <p className={"mig-caption text-neutrals90"}>Email</p>
            <p className={"mig-body text-neutrals100"}>
              {detailEmployee?.email || "-"}
            </p>
          </div>
        </div>
      )}

      <AccessControl hasPermission={LEAVE_APPROVE}>
        <ModalDelete
          visible={modalConfirmReject}
          title="Reject Leave Request"
          itemName="Leave Request"
          loading={dataLoading?.loadingReject}
          disabled={!isAllowedToApproveLeave}
          onOk={() => processCuti("tolak")}
          onCancel={() => setModalConfirmReject(false)}
          iconDelete={<CloseIconSvg />}
        >
          <p>
            Are you sure you want to reject{" "}
            <strong>{dataDefault?.employee?.name}</strong> leave request on{" "}
            <strong>
              {moment(dataDefault?.start_date).format("DD MMMM YYYY")}-
              {moment(dataDefault?.end_date).format("DD MMMM YYYY")}
            </strong>
            ?
          </p>
        </ModalDelete>
      </AccessControl>

      <AccessControl hasPermission={LEAVE_APPROVE}>
        <ModalAccept
          visible={modalConfirmApprove}
          title="Approve Leave Request"
          loading={dataLoading?.loadingApprove}
          disabled={!isAllowedToApproveLeave}
          onOk={() => processCuti("setuju")}
          onCancel={() => setModalConfirmApprove(false)}
        >
          <p>
            Are you sure you want to approve{" "}
            <strong>{dataDefault?.employee?.name}</strong> leave request on{" "}
            <strong>
              {moment(dataDefault?.start_date).format("DD MMMM YYYY")}-
              {moment(dataDefault?.end_date).format("DD MMMM YYYY")}
            </strong>
            ?
          </p>
        </ModalAccept>
      </AccessControl>

      <AccessControl hasPermission={LEAVE_DELETE}>
        <ModalDelete
          visible={modalConfirmCancel?.show}
          title="Cancel Leave Request"
          itemName="Leave Request"
          loading={loadingCancel}
          disabled={!isAllowedToDeleteLeave}
          onOk={() => batalCuti()}
          onCancel={() => setModalConfirmCancel({ show: false, data: null })}
        >
          <p>
            Are you sure you want to cancel your leave request on{" "}
            <strong>
              {moment(modalConfirmCancel?.data).format("DD MMMM YYYY")}
            </strong>
            ?
          </p>
        </ModalDelete>
      </AccessControl>
    </Drawer>
  );
};

export default DrawerLeaveDetail;
