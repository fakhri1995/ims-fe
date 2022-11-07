import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import {
  Button,
  Dropdown,
  Input,
  Menu,
  Modal,
  Popover,
  Select,
  Spin,
  Timeline,
  notification,
} from "antd";
import moment from "moment";
import "moment/locale/id";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Html from "react-pdf-html";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  RECRUITMENT_DELETE,
  RECRUITMENT_EMAIL_TEMPLATES_LIST_GET,
  RECRUITMENT_GET,
  RECRUITMENT_LOG_GET,
  RECRUITMENT_LOG_NOTES_ADD,
  RECRUITMENT_SEND_EMAIL_TEMPLATE,
  RECRUITMENT_STAGES_LIST_GET,
  RECRUITMENT_STATUSES_LIST_GET,
  RECRUITMENT_UPDATE,
  RECRUITMENT_UPDATE_STAGE,
  RECRUITMENT_UPDATE_STATUS,
} from "lib/features";

import ButtonSys from "../../../components/button";
import DrawerCandidateSendEmail from "../../../components/drawer/recruitment/drawerCandidateSendEmail";
import DrawerCandidateUpdate from "../../../components/drawer/recruitment/drawerCandidateUpdate";
import {
  DotsIconSvg,
  DownloadIconSvg,
  EditIconSvg,
  ExternalLinkIconSvg,
  InfoCircleIconSvg,
  MailForwardIconSvg,
  OneUserIconSvg,
  PlusIconSvg,
} from "../../../components/icon";
import LayoutDashboard from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import ModalCore from "../../../components/modal/modalCore";
import { ModalHapus2, ModalUbah } from "../../../components/modal/modalCustom";
import { permissionWarningNotification } from "../../../lib/helper";
import httpcookie from "cookie";

moment.locale("id");

const RecruitmentDetailIndex = ({
  initProps,
  dataProfile,
  sidemenu,
  recruitmentId,
}) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetRecruitment = hasPermission(RECRUITMENT_GET);
  const isAllowedToUpdateRecruitment = hasPermission(RECRUITMENT_UPDATE);
  const isAllowedToGetRecruitmentStatusesList = hasPermission(
    RECRUITMENT_STATUSES_LIST_GET
  );
  const isAllowedToGetRecruitmentStagesList = hasPermission(
    RECRUITMENT_STAGES_LIST_GET
  );
  const isAllowedToDeleteRecruitment = hasPermission(RECRUITMENT_DELETE);
  const isAllowedToGetRecruitmentLog = hasPermission(RECRUITMENT_LOG_GET);
  const isAllowedToAddRecruitmentLogNotes = hasPermission(
    RECRUITMENT_LOG_NOTES_ADD
  );

  const canUpdateStage = hasPermission(RECRUITMENT_UPDATE_STAGE);
  const canUpdateStatus = hasPermission(RECRUITMENT_UPDATE_STATUS);
  const isAllowedToSendEmailRecruitment = hasPermission(
    RECRUITMENT_SEND_EMAIL_TEMPLATE
  );

  //INIT
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  // console.log(pathArr);
  pathArr[pathArr.length - 1] = "Detail Kandidat";

  // 1. STATE
  // 1.1. display
  const [praloading, setpraloading] = useState(true);
  const [dataRecruitment, setDataRecruitment] = useState({});
  const [refresh, setRefresh] = useState(-1);
  const [dataStageList, setDataStageList] = useState([]);
  const [dataStatusList, setDataStatusList] = useState([]);
  const [loadingStageList, setLoadingStageList] = useState(false);
  const [loadingStatusList, setLoadingStatusList] = useState(false);

  // 1.2 Update
  const [drawerUpdate, setDrawerUpdate] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(-1);

  // 1.3. Delete
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // 1.4. Notes & Activity
  const [modalNotes, setModalNotes] = useState(false);
  const [loadingAddNotes, setLoadingAddNotes] = useState(false);
  const [disableAddNotes, setDisableAddNotes] = useState(true);
  const [dataNotes, setDataNotes] = useState({
    id: Number(recruitmentId),
    notes: "",
  });
  const [loadingActivities, setLoadingActivities] = useState([]);
  const [dataActivities, setDataActivities] = useState([]);
  const [modalMore, setModalMore] = useState(false);
  const [moreMode, setMoreMode] = useState("");

  // 1.5. Update Stage & Status
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modeUpdate, setModeUpdate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [disableUpdate, setDisableUpdate] = useState(true);
  const [dataUpdateStage, setDataUpdateStage] = useState({
    id: Number(recruitmentId),
    recruitment_stage_id: null,
    notes: "",
  });
  const [dataUpdateStatus, setDataUpdateStatus] = useState({
    id: Number(recruitmentId),
    recruitment_status_id: null,
    notes: "",
  });

  // 1.6. Send Email
  const [isEmailDrawerShown, setEmailDrawerShown] = useState(false);

  // 2. USE EFFECT
  // 2.1 Get recruitment candidate detail
  useEffect(() => {
    if (!isAllowedToGetRecruitment) {
      permissionWarningNotification("Mendapatkan", "Detail Rekrutmen Kandidat");
      setpraloading(false);
      return;
    }

    if (recruitmentId) {
      setpraloading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitment?id=${recruitmentId}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((response) => response.json())
        .then((response2) => {
          if (response2.success) {
            setDataRecruitment(response2.data);
          } else {
            notification.error({
              message: `${response2.message}`,
              duration: 3,
            });
          }
          setpraloading(false);
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
          setpraloading(false);
        });
    }
  }, [isAllowedToGetRecruitment, recruitmentId, refresh]);

  // 2.2. Get Stage List
  useEffect(() => {
    if (!isAllowedToGetRecruitmentStagesList) {
      permissionWarningNotification("Mendapatkan", "Recruitment Stages List");
      setLoadingStageList(false);
      return;
    }

    setLoadingStageList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentStagesList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataStageList(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingStageList(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingStageList(false);
      });
  }, [isAllowedToGetRecruitmentStagesList, refresh]);

  // 2.3. Get Status List
  useEffect(() => {
    if (!isAllowedToGetRecruitmentStatusesList) {
      permissionWarningNotification("Mendapatkan", "Recruitment Statuses List");
      setLoadingStatusList(false);
      return;
    }

    setLoadingStatusList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentStatusesList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataStatusList(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingStatusList(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingStatusList(false);
      });
  }, [isAllowedToGetRecruitmentStatusesList, refresh]);

  // 2.4. Get Activities
  useEffect(() => {
    if (!isAllowedToGetRecruitmentLog) {
      permissionWarningNotification("Mendapatkan", "Recruitment Activity Log");
      setLoadingActivities(false);
      return;
    }

    setLoadingActivities(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentLog?id=${recruitmentId}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataActivities(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingActivities(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingActivities(false);
      });
  }, [isAllowedToGetRecruitmentLog, refresh]);

  // 2.5. Disable add notes
  useEffect(() => {
    dataNotes.notes ? setDisableAddNotes(false) : setDisableAddNotes(true);
  }, [dataNotes]);

  // 2.6. Disable update stage and status
  useEffect(() => {
    let allFilled = Object.values(dataUpdateStage).every(
      (value) => value !== "" && value !== null
    );
    // console.log(allFilled)
    if (allFilled) {
      setDisableUpdate(false);
    } else {
      setDisableUpdate(true);
    }
  }, [dataUpdateStage]);

  useEffect(() => {
    let allFilled = Object.values(dataUpdateStatus).every(
      (value) => value !== "" && value !== null
    );
    // console.log(allFilled)
    if (allFilled) {
      setDisableUpdate(false);
    } else {
      setDisableUpdate(true);
    }
  }, [dataUpdateStatus]);

  // 3. Event
  const checkStageIsAvailable = (currrentStage) => {
    let isAvailable = dataStageList.some(
      (stage) => stage.name == currrentStage
    );
    return isAvailable;
  };

  const checkStatusIsAvailable = (currentStatus) => {
    let isAvailable = dataStatusList.some(
      (status) => status.name == currentStatus
    );
    return isAvailable;
  };

  const handleDeleteRecruitment = () => {
    if (!isAllowedToDeleteRecruitment) {
      permissionWarningNotification("Menghapus", "Kandidat");
      return;
    }
    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteRecruitment?id=${Number(
        recruitmentId
      )}`,
      {
        method: "DELETE",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification.success({
            message: res2.message,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal menghapus kandidat. ${res2.response}`,
            duration: 3,
          });
        }
        rt.push("/admin/recruitment");
        setTimeout(() => {
          setLoadingDelete(false);
          setModalDelete(false);
          setDataRecruitment({});
        }, 500);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus kandidat. ${err.response}`,
          duration: 3,
        });
        setLoadingDelete(false);
        setModalDelete(false);
      });
  };

  const handleAddNotes = () => {
    if (!isAllowedToAddRecruitmentLogNotes) {
      permissionWarningNotification("Menambah", "Log Catatan");
      return;
    }
    setLoadingAddNotes(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addRecruitmentLogNotes`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataNotes),
    })
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          notification.success({
            message: `Catatan berhasil ditambahkan.`,
            duration: 3,
          });
          setTimeout(() => {
            setModalNotes(false);
            setDataNotes({});
          }, 500);
        } else {
          notification.error({
            message: `Gagal menambahkan catatan. ${response2.message}`,
            duration: 3,
          });
        }
        setLoadingAddNotes(false);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan catatan. ${err.response}`,
          duration: 3,
        });
        setLoadingAddNotes(false);
      });
  };

  const handleUpdateStage = () => {
    const payload = {
      id: dataUpdateStage.id,
      recruitment_stage_id: dataUpdateStage.recruitment_stage_id,
      notes: dataUpdateStage.notes,
    };

    if (!canUpdateStage) {
      permissionWarningNotification("Mengubah", "Stage Kandidat");
      setLoadingUpdate(false);
      return;
    }

    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateRecruitment/stage`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res2) => {
        setRefresh((prev) => prev + 1);
        if (res2.success) {
          setTimeout(() => {
            setDataUpdateStage({
              id: Number(recruitmentId),
              recruitment_stage_id: null,
              notes: "",
            });
          }, 1500);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
        } else {
          notification["error"]({
            message: `Gagal mengubah stage kandidat. ${res2.message}`,
            duration: 3,
          });
        }
        setLoadingUpdate(false);
        setModalUpdate(false);
      })
      .catch((err) => {
        setLoadingUpdate(false);
        notification["error"]({
          message: `Gagal mengubah stage kandidat. ${err.message}`,
          duration: 3,
        });
      });
  };

  const handleUpdateStatus = () => {
    const payload = {
      id: dataUpdateStatus.id,
      recruitment_status_id: dataUpdateStatus.recruitment_status_id,
      notes: dataUpdateStatus.notes,
    };

    if (!canUpdateStatus) {
      permissionWarningNotification("Mengubah", "Status Kandidat");
      setLoadingUpdate(false);
      return;
    }

    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateRecruitment/status`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res2) => {
        setRefresh((prev) => prev + 1);
        if (res2.success) {
          setTimeout(() => {
            setDataUpdateStatus({
              id: Number(recruitmentId),
              recruitment_status_id: null,
              notes: "",
            });
          }, 1500);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
        } else {
          notification["error"]({
            message: `Gagal mengubah status kandidat. ${res2.message}`,
            duration: 3,
          });
        }
        setLoadingUpdate(false);
        setModalUpdate(false);
      })
      .catch((err) => {
        setLoadingUpdate(false);
        notification["error"]({
          message: `Gagal mengubah status kandidat. ${err.message}`,
          duration: 3,
        });
      });
  };

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
    >
      <div className="flex flex-row gap-4 w-full">
        {/* Left Column */}
        <div className="flex flex-col gap-4 w-1/3">
          {/* Card Primary Info */}
          <div className="flex flex-col shadow-lg rounded-md bg-white p-4 space-y-4">
            <div className="flex flex-row space-x-2 items-center justify-center">
              <OneUserIconSvg size={32} color="#4D4D4D" />
              <h3 className="mig-heading--3">{dataRecruitment.name}</h3>
            </div>
            <ButtonSys
              type={isAllowedToUpdateRecruitment ? "default" : "primary"}
              onClick={() => setDrawerUpdate(true)}
              disabled={!isAllowedToUpdateRecruitment}
            >
              <div className="flex flex-row space-x-3 items-center">
                <EditIconSvg size={16} color="#35763B" />
                <p>Ubah Kandidat</p>
              </div>
            </ButtonSys>
            <div className="space-y-2">
              <p className="mig-caption--medium text-mono80">Email</p>
              <p className="text-md">{dataRecruitment.email}</p>
            </div>
            {/* <div className="space-y-2">
							<p className="mig-caption--medium text-mono80">Password</p>
							<p className="text-md">pass</p>
						</div> */}
            <div className="space-y-2">
              <p className="mig-caption--medium text-mono80">Universitas</p>
              <p className="text-md">{dataRecruitment.university}</p>
            </div>
            <div className="space-y-2">
              <p className="mig-caption--medium text-mono80">
                Role yang Didaftarkan
              </p>
              <p className="text-md">{dataRecruitment.role?.name}</p>
            </div>
            <div className="space-y-2">
              <p className="mig-caption--medium text-mono80">Tipe Role</p>
              <p className="text-md">{dataRecruitment.role?.type?.name}</p>
            </div>
            <div className="space-y-2">
              <p className="mig-caption--medium text-mono80">Jalur Daftar</p>
              <p className="text-md">{dataRecruitment.jalur_daftar?.name}</p>
            </div>
            <div className="space-y-2">
              <p className="mig-caption--medium text-mono80">Tanggal Daftar</p>
              <p className="text-md">
                {moment(dataRecruitment.created_at).format("LL")},&nbsp;
                {moment(dataRecruitment.created_at).format("LT")}
              </p>
            </div>
            <ButtonSys
              type={"primary"}
              onClick={() => setEmailDrawerShown(true)}
              disabled={!isAllowedToSendEmailRecruitment}
            >
              <div className="flex flex-row space-x-3 items-center">
                <MailForwardIconSvg size={16} color="#FFFFFF" />
                <p>Kirim Email</p>
              </div>
            </ButtonSys>
          </div>

          {/* Card Catatan */}
          <div className="shadow-lg rounded-md bg-white p-4">
            <div className="flex flex-row justify-between items-center mb-6">
              <h4 className="mig-heading--4">Catatan</h4>
              {isAllowedToAddRecruitmentLogNotes && (
                <button
                  className="bg-transparent"
                  onClick={() => setModalNotes(true)}
                >
                  <PlusIconSvg size={24} color="#35763B" />
                </button>
              )}
            </div>
            <Spin spinning={loadingActivities}>
              {dataActivities?.slice(0, 5).map((activity) => (
                <div key={activity.id} className="mb-6">
                  <p className="text-md mb-2">{activity.notes}</p>
                  <div className="flex flex-row justify-between flex-wrap items-center">
                    <div className="flex flex-row text-wrap w-30">
                      <img
                        src="/default-users.jpeg"
                        className="rounded-full w-5 h-5 mr-2"
                      ></img>
                      <p className="mig-caption--medium text-primary100 ">
                        {`${activity.causer?.name} - ${activity.causer?.roles[0].name}`}
                      </p>
                    </div>
                    <p className="text-sm text-mono80">
                      {/* {moment(activity.created_at).format('ll')},&nbsp;
											{moment(activity.created_at).format('LT')} */}
                      {moment(activity.created_at).calendar()}
                    </p>
                  </div>
                </div>
              ))}
              {dataActivities.length > 5 && (
                <p
                  className="flex justify-end mig-caption hover:text-mono50 
                  cursor-pointer"
                  onClick={() => {
                    setMoreMode("notes");
                    setModalMore(true);
                  }}
                >
                  Lihat Semua
                </p>
              )}
            </Spin>
          </div>

          {/* Card Aktivitas */}
          <div className="shadow-lg rounded-md bg-white p-4">
            <h4 className="mig-heading--4 mb-6">Aktivitas</h4>
            <Spin spinning={loadingActivities}>
              {dataActivities?.slice(0, 5).map((activity) => (
                <div key={activity.id} className="mb-6">
                  <p className="text-md mb-2">{activity.description}</p>
                  <div className="flex flex-row justify-between flex-wrap items-center">
                    <div className="flex flex-row text-wrap w-30">
                      <img
                        src="/default-users.jpeg"
                        className="rounded-full w-5 h-5 mr-2"
                      ></img>
                      <p className="mig-caption--medium text-primary100 ">
                        {`${activity.causer?.name} - ${activity.causer?.roles[0].name}`}
                      </p>
                    </div>
                    <p className="text-sm text-mono80 ">
                      {/* {moment(activity.created_at).format('ll')},&nbsp;
											{moment(activity.created_at).format('LT')} */}
                      {moment(activity.created_at).calendar()}
                    </p>
                  </div>
                </div>
              ))}
              {dataActivities.length > 5 && (
                <p
                  className="flex justify-end mig-caption hover:text-mono50 
                  cursor-pointer"
                  onClick={() => {
                    setMoreMode("activity");
                    setModalMore(true);
                  }}
                >
                  Lihat Semua
                </p>
              )}
            </Spin>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 w-2/3">
          {/* Card Stage & Status */}
          <div
            className="shadow-lg rounded-md bg-white py-2 px-4 
						flex flex-row gap-4 items-center"
          >
            <div className="flex flex-col space-y-2 w-full py-4">
              <div className="flex flex-row justify-between items-center">
                <p>Stage</p>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key={"update_stage"}>
                        <button
                          className="flex flex-row space-x-2 items-center 
													bg-transparent w-full border-0"
                          onClick={() => {
                            setModalUpdate(true);
                            setModeUpdate("stage");
                          }}
                          disabled={!canUpdateStage}
                        >
                          <EditIconSvg size={20} color="#4D4D4D" />
                          <p
                            className={
                              canUpdateStage
                                ? `mig-caption--medium text-mono30`
                                : `mig-caption--medium text-gray-300`
                            }
                          >
                            Ubah Stage
                          </p>
                        </button>
                      </Menu.Item>
                    </Menu>
                  }
                  placement="bottomRight"
                >
                  <Button
                    icon={<DotsIconSvg size={16} color="#4D4D4D" />}
                    ghost={true}
                  />
                </Dropdown>
              </div>
              <div className="flex flex-row space-x-1 items-center">
                <h4 className="mig-heading--4">
                  {dataRecruitment.stage?.name}
                </h4>
                {checkStageIsAvailable(dataRecruitment.stage?.name) ===
                  false && (
                  <Popover
                    content={
                      <div className="flex flex-row space-x-4 w-80">
                        <InfoCircleIconSvg color={"#BF4A40"} size={18} />
                        <p>
                          Stage {dataRecruitment.stage?.name} telah dihapus.
                          Silahkan lakukan pengubahan Stage.
                        </p>
                      </div>
                    }
                  >
                    <Button
                      icon={<InfoCircleIconSvg size={16} color="#4D4D4D" />}
                      className="border-0"
                      size="small"
                    />
                  </Popover>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-2 w-full py-4">
              <div className="flex flex-row justify-between items-center">
                <p>Status</p>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key={"update_status"}>
                        <button
                          className="flex flex-row space-x-2 items-center 
													bg-transparent w-full"
                          onClick={() => {
                            setModalUpdate(true);
                            setModeUpdate("status");
                          }}
                          disabled={!canUpdateStatus}
                        >
                          <EditIconSvg size={20} color="#4D4D4D" />
                          <p
                            className={
                              canUpdateStatus
                                ? `mig-caption--medium text-mono30`
                                : `mig-caption--medium text-gray-300`
                            }
                          >
                            Ubah Status
                          </p>
                        </button>
                      </Menu.Item>
                    </Menu>
                  }
                  placement="bottomRight"
                >
                  <Button
                    icon={<DotsIconSvg size={16} color="#4D4D4D" />}
                    ghost={true}
                  />
                </Dropdown>
              </div>
              <div className="flex flex-row space-x-2 items-center">
                <div
                  className="rounded-full w-4 h-4"
                  style={{
                    backgroundColor: `${dataRecruitment.status?.color}`,
                  }}
                />
                <h4 className="mig-heading--4">
                  {dataRecruitment.status?.name}
                </h4>
                {checkStatusIsAvailable(dataRecruitment.status?.name) ===
                  false && (
                  <Popover
                    content={
                      <div className="flex flex-row space-x-4 w-80">
                        <InfoCircleIconSvg color={"#BF4A40"} size={18} />
                        <p>
                          Status {dataRecruitment.status?.name} telah dihapus.
                          Silahkan lakukan pengubahan Status.
                        </p>
                      </div>
                    }
                  >
                    <Button
                      icon={<InfoCircleIconSvg size={16} color="#4D4D4D" />}
                      className="border-0"
                      size="small"
                    />
                  </Popover>
                )}
              </div>
            </div>
          </div>

          {/* Card Profil Kandidat */}
          <div className="shadow-lg rounded-md bg-white p-4 divide-y-2">
            <div className="flex flex-row justify-between items-center mb-4">
              <h4 className="mig-heading--4">Profil Kandidat</h4>
              <ButtonSys type={"default"}>
                <div className="flex flex-row space-x-3 items-center">
                  <DownloadIconSvg size={16} color="#35763B" />
                  <p>Unduh Profil</p>
                </div>
              </ButtonSys>
            </div>
            <div className="flex flex-col pt-4 pb-8">
              <p className="text-sm font-bold text-primary100 mb-4">
                Informasi Dasar
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <p className="mig-caption--medium text-mono80">Nama</p>
                  <p className="text-md">John Doe</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="mig-caption--medium text-mono80">
                    Nomor Telepon
                  </p>
                  <p className="text-md">1234567890</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="mig-caption--medium text-mono80">Email</p>
                  <p className="text-md">someone@example-mail.com</p>
                </div>
                <div className="flex flex-col space-y-2 col-span-2">
                  <p className="mig-caption--medium text-mono80">Alamat</p>
                  <p className="text-md">
                    Jalan Terang Bulan 20 blok C nomor III, Jakarta Selatan
                    12345, Indonesia
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col pt-4 pb-2">
              <p className="text-sm font-bold text-primary100 mb-9">
                Pengalaman Kerja
              </p>
              <Timeline className="pl-6">
                <Timeline.Item color="#35763B">
                  <p className="text-sm text-mono30 font-bold mb-1">
                    Associate Product Manager
                  </p>
                  <p className="mig-caption text-mono50 mb-2">
                    PT ABC, Internship
                  </p>
                  <p className="mig-caption text-mono80">
                    Agustus 2021 - Sekarang
                  </p>
                </Timeline.Item>
                <Timeline.Item color="#35763B">
                  <p className="text-sm text-mono30 font-bold mb-1">
                    Associate Product Manager
                  </p>
                  <p className="mig-caption text-mono50 mb-2">
                    PT ABC, Internship
                  </p>
                  <p className="mig-caption text-mono80">
                    Agustus 2021 - Sekarang
                  </p>
                </Timeline.Item>
              </Timeline>
            </div>
            <div className="flex flex-col pt-4 pb-2">
              <p className="text-sm font-bold text-primary100 mb-9">
                Riwayat Pendidikan
              </p>
              <Timeline className="pl-6">
                <Timeline.Item color="#35763B">
                  <p className="text-sm text-mono30 font-bold mb-1">
                    Institut Teknologi Bandung
                  </p>
                  <p className="mig-caption text-mono50 mb-2">S2, Manajemen</p>
                  <p className="mig-caption text-mono80">
                    Agustus 2021 - Sekarang
                  </p>
                </Timeline.Item>
              </Timeline>
            </div>
            <div className="flex flex-col pt-4 pb-2">
              <p className="text-sm font-bold text-primary100 mb-9">
                Pengalaman Organisasi/Relawan
              </p>
              <Timeline className="pl-6">
                <Timeline.Item color="#35763B">
                  <p className="text-sm text-mono30 font-bold mb-1">
                    Anggota Divisi Intrakampus
                  </p>
                  <p className="mig-caption text-mono50 mb-2">
                    Himpunan Mahasiswa Teknik Informatika (HMIF) ITB
                  </p>
                  <p className="mig-caption text-mono80">
                    Agustus 2021 - Sekarang
                  </p>
                </Timeline.Item>
              </Timeline>
            </div>
            <div className="flex flex-col py-4">
              <p className="text-sm font-bold text-primary100 mb-4">
                Lisensi dan Sertifikasi
              </p>
              <div className="flex flex-col space-y-2">
                <p className="mig-caption--bold text-mono30">
                  Machine Learning
                </p>
                <p className="mig-caption text-mono50">
                  Kaggle, berlaku sampai Juni 2025
                </p>
                <div className="flex items-center space-x-2">
                  <p className="mig-caption text-mono50">0000-0000-0000</p>
                  <ExternalLinkIconSvg size={16} color={"#808080"} />
                </div>
              </div>
            </div>
            <div className="flex flex-col py-4">
              <p className="text-sm font-bold text-primary100 mb-4">
                Penghargaan
              </p>
              <div className="flex flex-col space-y-2">
                <p className="mig-caption--bold text-mono30">
                  Juara II, Competitive Programming
                </p>
                <p className="mig-caption text-mono50">Compfest, Juni 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Update Recruitment Candidate */}
      <AccessControl hasPermission={RECRUITMENT_UPDATE}>
        <DrawerCandidateUpdate
          dataRecruitment={dataRecruitment}
          visible={drawerUpdate}
          initProps={initProps}
          onvisible={setDrawerUpdate}
          setRefresh={setRefresh}
          trigger={triggerUpdate}
          isAllowedToGetRecruitment={isAllowedToGetRecruitment}
          isAllowedToUpdateRecruitment={isAllowedToUpdateRecruitment}
          isAllowedToDeleteRecruitment={isAllowedToDeleteRecruitment}
          setModalDelete={setModalDelete}
        />
      </AccessControl>

      {/* Drawer Kirim Email */}
      <AccessControl
        hasPermission={[
          RECRUITMENT_SEND_EMAIL_TEMPLATE,
          RECRUITMENT_EMAIL_TEMPLATES_LIST_GET,
        ]}
      >
        <DrawerCandidateSendEmail
          visible={isEmailDrawerShown}
          initProps={initProps}
          onvisible={setEmailDrawerShown}
          setRefresh={setRefresh}
          dataCandidate={dataRecruitment}
        />
      </AccessControl>

      {/* Modal Update Stage & Status*/}
      <AccessControl
        hasPermission={[RECRUITMENT_UPDATE_STAGE, RECRUITMENT_UPDATE_STATUS]}
      >
        <ModalUbah
          title={`Konfirmasi Perubahan`}
          visible={modalUpdate}
          onvisible={setModalUpdate}
          onOk={modeUpdate === "stage" ? handleUpdateStage : handleUpdateStatus}
          onCancel={() => {
            setModalUpdate(false);
            modeUpdate === "stage"
              ? setDataUpdateStage({
                  id: Number(recruitmentId),
                  recruitment_stage_id: null,
                  notes: "",
                })
              : setDataUpdateStatus({
                  id: Number(recruitmentId),
                  recruitment_status_id: null,
                  notes: "",
                });
          }}
          loading={loadingUpdate}
          disabled={disableUpdate}
        >
          {modeUpdate === "stage" ? (
            <div className="space-y-4">
              <div className="flex flex-row items-center space-x-4 justify-between">
                <p className="font-bold">
                  {`Stage ${dataRecruitment?.stage?.name}`}
                </p>
                <p className="font-bold"> → </p>
                <Select
                  placeholder="Pilih Stage..."
                  value={dataUpdateStage.recruitment_stage_id}
                  style={{ width: `50%` }}
                  onChange={(value) =>
                    setDataUpdateStage({
                      ...dataUpdateStage,
                      recruitment_stage_id: value,
                    })
                  }
                >
                  {dataStageList.map((stage) => (
                    <Select.Option key={stage.id} value={stage.id}>
                      {stage.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <p>Tambah catatan:</p>
              <Input.TextArea
                // placeholder="Masukkan catatan"
                required={true}
                rows={2}
                value={dataUpdateStage.notes ? dataUpdateStage.notes : null}
                onChange={(event) => {
                  setDataUpdateStage({
                    ...dataUpdateStage,
                    notes: event.target.value,
                  });
                }}
              />
              <p>Apakah Anda yakin ingin menyimpan perubahan?</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-row items-center space-x-4 justify-between">
                <p className="font-bold">
                  {`Status ${dataRecruitment?.status?.name}`}
                </p>
                <p className="font-bold"> → </p>
                <Select
                  placeholder="Pilih status..."
                  value={dataUpdateStatus.recruitment_status_id}
                  style={{ width: `50%` }}
                  onChange={(value) =>
                    setDataUpdateStatus({
                      ...dataUpdateStatus,
                      recruitment_status_id: value,
                    })
                  }
                >
                  {dataStatusList.map((status) => (
                    <Select.Option key={status.id} value={status.id}>
                      <div className="flex flex-row items-center space-x-2">
                        <div
                          className="rounded-full w-4 h-4"
                          style={{ backgroundColor: `${status.color}` }}
                        />
                        <p>{status.name}</p>
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <p>Tambah catatan:</p>
              <Input.TextArea
                // placeholder="Masukkan catatan"
                required={true}
                rows={2}
                value={dataUpdateStatus.notes ? dataUpdateStatus.notes : null}
                onChange={(event) => {
                  setDataUpdateStatus({
                    ...dataUpdateStatus,
                    notes: event.target.value,
                  });
                }}
              />
              <p>Apakah Anda yakin ingin menyimpan perubahan?</p>
            </div>
          )}
        </ModalUbah>
      </AccessControl>

      {/* Modal Lihat Semua (View More) */}
      <AccessControl hasPermission={RECRUITMENT_LOG_GET}>
        <Modal
          title={moreMode === "notes" ? "Semua Catatan" : "Semua Aktivitas"}
          visible={modalMore}
          onCancel={() => setModalMore(false)}
          loading={loadingActivities}
          destroyOnClose={true}
          footer={null}
        >
          <div className="h-72 overflow-y-scroll pr-2">
            {dataActivities?.map((activity) => (
              <div key={activity.id} className="mb-6">
                {moreMode === "notes" ? (
                  <p className="text-md mb-2">{activity.notes}</p>
                ) : (
                  <p className="text-md mb-2">{activity.description}</p>
                )}
                <div className="flex flex-row justify-between flex-wrap items-center">
                  <div className="flex flex-row text-wrap w-30">
                    <img
                      src="/default-users.jpeg"
                      className="rounded-full w-5 h-5 mr-2"
                    ></img>
                    <p className="mig-caption--medium text-primary100 ">
                      {`${activity.causer?.name} - ${activity.causer?.roles[0].name}`}
                    </p>
                  </div>
                  <p className="text-sm text-mono80">
                    {/* {moment(activity.created_at).format('ll')},&nbsp;
                    {moment(activity.created_at).format('LT')} */}
                    {moment(activity.created_at).calendar()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      </AccessControl>

      {/* Modal Delete Recruitment Candidate */}
      <AccessControl hasPermission={RECRUITMENT_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={handleDeleteRecruitment}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"kandidat"}
          loading={loadingDelete}
        >
          Apakah Anda yakin ingin menghapus kandidat{" "}
          <strong>{dataRecruitment?.name}</strong>?
        </ModalHapus2>
      </AccessControl>

      {/* Modal Add Catatan */}
      <AccessControl hasPermission={RECRUITMENT_LOG_NOTES_ADD}>
        <ModalCore
          title={`Tambah Catatan`}
          visible={modalNotes}
          onCancel={() => {
            setModalNotes(false);
            setDataNotes({});
          }}
          footer={
            <Spin spinning={loadingAddNotes}>
              <div className="flex justify-end">
                <ButtonSys
                  type={"primary"}
                  onClick={handleAddNotes}
                  disabled={disableAddNotes}
                >
                  Tambah
                </ButtonSys>
              </div>
            </Spin>
          }
          loading={loadingAddNotes}
        >
          <Input.TextArea
            placeholder="Masukkan catatan..."
            rows={3}
            value={dataNotes.notes}
            onChange={(event) => {
              // console.log(event.target.value)
              setDataNotes({
                ...dataNotes,
                notes: event.target.value,
              });
            }}
          />
        </ModalCore>
      </AccessControl>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const recruitmentId = params.recruitmentId;
  var initProps = {};
  if (!req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
  if (!cookiesJSON1.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  initProps = cookiesJSON1.token;
  const resourcesGP = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "111",
      recruitmentId,
    },
  };
}

export default RecruitmentDetailIndex;
