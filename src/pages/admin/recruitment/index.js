import {
  Button,
  DatePicker,
  Dropdown,
  Empty,
  Input,
  Menu,
  Select,
  Spin,
  Table,
  TreeSelect,
  notification,
} from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import { AccessControl } from "components/features/AccessControl";
import { AddNewFormButton } from "components/screen/resume";

import { useAccessControl } from "contexts/access-control";

import {
  RECRUITMENTS_GET,
  RECRUITMENT_ADD,
  RECRUITMENT_COUNT_GET,
  RECRUITMENT_DELETE,
  RECRUITMENT_GET,
  RECRUITMENT_LOG_GET,
  RECRUITMENT_LOG_NOTES_ADD,
  RECRUITMENT_ROLES_LIST_GET,
  RECRUITMENT_STAGES_LIST_GET,
  RECRUITMENT_STATUSES_LIST_GET,
  RECRUITMENT_UPDATE,
  RECRUITMENT_UPDATE_STAGE,
  RECRUITMENT_UPDATE_STATUS,
  SIDEBAR_RECRUITMENT_SETUP,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import SettingsIcon from "assets/vectors/icon-settings.svg";

import ButtonSys from "../../../components/button";
import DrawerCandidateCreate from "../../../components/drawer/recruitment/drawerCandidateCreate";
import {
  CheckIconSvg,
  DownIconSvg,
  DownloadIconSvg,
  FileExportIconSvg,
  FilePlusIconSvg,
  InfoSquareIconSvg,
  LayoutGridSvg,
  MailForwardIconSvg,
  PlusIconSvg,
  SearchIconSvg,
  TrashIconSvg,
  TrendingUpIconSvg,
  UserPlusIconSvg,
  XIconSvg,
} from "../../../components/icon";
import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import ModalCore from "../../../components/modal/modalCore";
import { ModalHapus2, ModalUbah } from "../../../components/modal/modalCustom";
import { TableCustomRecruitmentCandidate } from "../../../components/table/tableCustom";
import { createKeyPressHandler } from "../../../lib/helper";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import httpcookie from "cookie";

Chart.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

const RecruitmentCandidateIndex = ({ dataProfile, sidemenu, initProps }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToSetupRecruitment = hasPermission(SIDEBAR_RECRUITMENT_SETUP);
  const isAllowedToGetRecruitments = hasPermission(RECRUITMENTS_GET);
  const isAllowedToGetRecruitment = hasPermission(RECRUITMENT_GET);
  const isAllowedToAddRecruitment = hasPermission(RECRUITMENT_ADD);
  const isAllowedToUpdateRecruitment = hasPermission(RECRUITMENT_UPDATE);
  const isAllowedToDeleteRecruitment = hasPermission(RECRUITMENT_DELETE);
  const isAllowedToGetRecruitmentCount = hasPermission(RECRUITMENT_COUNT_GET);
  const canUpdateRecruitment = hasPermission([
    RECRUITMENT_UPDATE,
    RECRUITMENT_GET,
  ]);

  const isAllowedToGetRecruitmentRolesList = hasPermission(
    RECRUITMENT_ROLES_LIST_GET
  );

  const isAllowedToGetRecruitmentStatusesList = hasPermission(
    RECRUITMENT_STATUSES_LIST_GET
  );
  const isAllowedToGetRecruitmentStagesList = hasPermission(
    RECRUITMENT_STAGES_LIST_GET
  );
  const canUpdateStage = hasPermission([RECRUITMENT_UPDATE_STAGE]);
  const canUpdateStatus = hasPermission([RECRUITMENT_UPDATE_STATUS]);

  // 1. Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);

  // 2. Use state
  // 2.1. Role List & Candidate Count
  const [loadingDataCount, setLoadingDataCount] = useState(false);
  const [dataCount, setDataCount] = useState({
    recruitments_count: 0,
    recruitment_roles_count: 0,
  });

  // 2.2. Table Candidate Recruitment
  const [loadingRoleList, setLoadingRoleList] = useState(false);
  const [dataRoleList, setDataRoleList] = useState([]);
  const [loadingStageList, setLoadingStageList] = useState(false);
  const [dataStageList, setDataStageList] = useState([]);
  const [loadingStatusList, setLoadingStatusList] = useState(false);
  const [dataStatusList, setDataStatusList] = useState([]);

  const [loadingRecruitments, setLoadingRecruitments] = useState(true);
  const [dataRecruitments, setDataRecruitments] = useState([]);
  const [dataRawRecruitments, setDataRawRecruitments] = useState({
    current_page: "",
    data: [],
    first_page_url: "",
    from: null,
    last_page: null,
    last_page_url: "",
    next_page_url: "",
    path: "",
    per_page: null,
    prev_page_url: null,
    to: null,
    total: null,
  });

  const [pageRecruitments, setPageRecruitments] = useState(1);
  const [rowsRecruitment, setRowsRecruitments] = useState(10);
  const [sortingRecruitments, setSortingRecruitments] = useState({
    sort_by: "",
    sort_type: "",
  });
  const [searchingFilterRecruitments, setSearchingFilterRecruitments] =
    useState("");
  const [selectedRoleId, setSelectedRoleId] = useState(0);
  const [selectedStage, setSelectedStage] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(0);

  const [isBulk, setBulk] = useState(false);
  const [selectedRecruitments, setSelectedRecruitments] = useState([]);
  const [selectedRecruitmentIds, setSelectedRecruitmentIds] = useState([]);

  // 2.3. Drawer & Modal
  const [isCreateDrawerShown, setCreateDrawerShown] = useState(false);
  const [refresh, setRefresh] = useState(-1);

  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [modalUpdate, setModalUpdate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [modalBulk, setModalBulk] = useState(false);
  const [bulkMode, setBulkMode] = useState("");

  // 2.4. Update Recruitment
  const [dataUpdate, setDataUpdate] = useState({
    id: null,
    name: "",
    email: "",
    university: "",
    recruitment_role_id: null,
    recruitment_jalur_daftar_id: null,
    recruitment_stage_id: null,
    recruitment_status_id: null,
  });
  const [disableUpdate, setDisableUpdate] = useState(false);

  // 2.5. Update Stage
  const [dataUpdateStage, setDataUpdateStage] = useState({
    id: null,
    recruitment_stage_id: null,
    notes: null,
    name: "",
    prev_recruitment_stage_name: "",
    recruitment_stage_name: "",
  });
  const [modalUpdateStage, setModalUpdateStage] = useState(false);

  // 2.6. Update Status
  const [dataUpdateStatus, setDataUpdateStatus] = useState({
    id: null,
    recruitment_status_id: null,
    notes: null,
    name: "",
    prev_recruitment_status_name: "",
    recruitment_status_name: "",
  });
  const [modalUpdateStatus, setModalUpdateStatus] = useState(false);

  // 3. UseEffect
  // 3.1. Get Recruitment Count
  useEffect(() => {
    if (!isAllowedToGetRecruitmentCount) {
      permissionWarningNotification("Mendapatkan", "Data Recruitment Count");
      setLoadingDataCount(false);
      return;
    }

    setLoadingDataCount(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCountRecruitment`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataCount(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingDataCount(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingDataCount(false);
      });
  }, [isAllowedToGetRecruitmentCount, refresh]);

  // 3.2. Get Recruitment Roles List
  useEffect(() => {
    if (!isAllowedToGetRecruitmentRolesList) {
      permissionWarningNotification(
        "Mendapatkan",
        "Data Recruitment Role List"
      );
      setLoadingRoleList(false);
      return;
    }

    setLoadingRoleList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRolesList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataRoleList(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingRoleList(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingRoleList(false);
      });
  }, [isAllowedToGetRecruitmentRolesList, refresh]);

  // 3.3. Get Recruitments
  useEffect(() => {
    if (!isAllowedToGetRecruitments) {
      permissionWarningNotification("Mendapatkan", "Daftar Recruitment");
      setLoadingRecruitments(false);
      return;
    }

    setLoadingRecruitments(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitments?rows=10`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataRawRecruitments(res2.data);
          setDataRecruitments(res2.data.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingRecruitments(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingRecruitments(false);
      });
  }, [isAllowedToGetRecruitments, refresh]);

  // 3.4. Get Stage List
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

  // 3.5. Get Status List
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

  // 3.6. Disable update stage or status if notes empty
  useEffect(() => {
    dataUpdateStage.notes ? setDisableUpdate(false) : setDisableUpdate(true);
  }, [dataUpdateStage]);

  useEffect(() => {
    dataUpdateStatus.notes ? setDisableUpdate(false) : setDisableUpdate(true);
  }, [dataUpdateStatus]);

  // 4. Event
  const onManageRecruitmentButtonClicked = useCallback(() => {
    rt.push("/admin/recruitment/role");
  }, []);

  // 4.1. Filter Table
  const onFilterRecruitments = () => {
    setLoadingRecruitments(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitments?sort_by=${sortingRecruitments.sort_by}&sort_type=${sortingRecruitments.sort_type}&recruitment_role_id=${selectedRoleId}&recruitment_stage_id=${selectedStage}&recruitment_status_id=${selectedStatus}&keyword=${searchingFilterRecruitments}&page=${pageRecruitments}&rows=${rowsRecruitment}`,
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
          setDataRawRecruitments(res2.data);
          setDataRecruitments(res2.data.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingRecruitments(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingRecruitments(false);
      });
  };

  const { onKeyPressHandler } = createKeyPressHandler(
    onFilterRecruitments,
    "Enter"
  );

  // 4.2. Update Recruitment
  const handleUpdateRecruitment = () => {
    if (!isAllowedToUpdateRecruitment) {
      permissionWarningNotification("Mengubah", "Data Recruitment Kandidat");
      setLoadingUpdate(false);
      return;
    }

    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateRecruitment`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUpdate),
    })
      .then((res) => res.json())
      .then((res2) => {
        setRefresh((prev) => prev + 1);
        if (res2.success) {
          setTimeout(() => {
            setDataUpdate({
              id: null,
              name: "",
              email: "",
              university: "",
              role: null,
              jalur_daftar: null,
              stage: null,
              status: null,
            });
          }, 1500);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
        } else {
          notification["error"]({
            message: `Gagal mengubah kandidat. ${res2.message}`,
            duration: 3,
          });
        }
        setLoadingUpdate(false);
      })
      .catch((err) => {
        setLoadingUpdate(false);
        notification["error"]({
          message: `Gagal mengubah kandidat. ${err.message}`,
          duration: 3,
        });
      });
  };

  // 4.3. Update Stage
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
            setDataUpdateStage({});
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
        setModalUpdateStage(false);
      })
      .catch((err) => {
        setLoadingUpdate(false);
        notification["error"]({
          message: `Gagal mengubah stage kandidat. ${err.message}`,
          duration: 3,
        });
      });
  };

  // 4.4. Update Status
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
            setDataUpdateStatus({});
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
        setModalUpdateStatus(false);
      })
      .catch((err) => {
        setLoadingUpdate(false);
        notification["error"]({
          message: `Gagal mengubah status kandidat. ${err.message}`,
          duration: 3,
        });
      });
  };

  // 4.5. Bulk Update Stages
  const handleUpdateStages = () => {
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
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateRecruitments/stage`, {
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
            setDataUpdateStage({});
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
        setModalBulk(false);
        setModalUpdateStage(false);
        setBulk(false);
      })
      .catch((err) => {
        setLoadingUpdate(false);
        notification["error"]({
          message: `Gagal mengubah stage kandidat. ${err.message}`,
          duration: 3,
        });
      });
  };

  // 4.6. Bulk Update Statuses
  const handleUpdateStatuses = () => {
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
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateRecruitments/status`, {
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
            setDataUpdateStatus({});
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
        setModalBulk(false);
        setModalUpdateStatus(false);
        setBulk(false);
      })
      .catch((err) => {
        setLoadingUpdate(false);
        notification["error"]({
          message: `Gagal mengubah status kandidat. ${err.message}`,
          duration: 3,
        });
      });
  };

  // 4.7. Delete Recruitment
  const onOpenDeleteModal = () => {
    setModalDelete(true);
  };

  const handleDeleteRecruitment = () => {
    if (!isAllowedToDeleteRecruitment) {
      permissionWarningNotification("Menghapus", "Kandidat");
      return;
    }
    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteRecruitment?id=${selectedRecruitments[0]?.id}`,
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
        }
        setTimeout(() => {
          setLoadingDelete(false);
          setModalDelete(false);
          setRefresh((prev) => prev + 1);
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

  // Dropdown Menu
  const dropdownMenu = (
    <Menu>
      <Menu.Item key={"insert_candidate"}>
        <button
          className="flex flex-row space-x-2 items-center 
					bg-transparent w-full px-2.5 py-2"
          onClick={() => {
            setCreateDrawerShown(true);
          }}
        >
          <PlusIconSvg size={20} color="#4D4D4D" />
          <p className="mig-caption--medium text-mono30">Tambah Perorangan</p>
        </button>
      </Menu.Item>

      <Menu.Item key={"insert_excel"}>
        <button
          className="flex flex-row space-x-2 items-center
					bg-transparent w-full px-2.5 py-2"
        >
          <FilePlusIconSvg size={20} color="#4D4D4D" />
          <p className="mig-caption--medium text-mono30">Masukkan dari Excel</p>
        </button>
      </Menu.Item>

      <Menu.Item key={"download_template"}>
        <button
          className="flex flex-row space-x-2 items-center 
					bg-transparent w-full px-2.5 py-2"
        >
          <DownloadIconSvg size={20} color="#4D4D4D" />
          <p className="mig-caption--medium text-mono30">
            Unduh Template Excel
          </p>
        </button>
      </Menu.Item>
    </Menu>
  );

  // Bulk Menu
  const bulkMenu = (
    <Menu>
      <Menu.Item key={"stage"}>
        <button
          className="flex flex-row space-x-2 items-center 
					bg-transparent w-full px-1 py-1"
          onClick={() => {
            setModalBulk(true);
            setBulkMode("stage");
          }}
          disabled={!isAllowedToUpdateRecruitment}
        >
          <TrendingUpIconSvg size={16} />
          <p className="mig-caption--medium text-mono30">Ubah Stage</p>
        </button>
      </Menu.Item>

      <Menu.Item key={"status"}>
        <button
          className="flex flex-row space-x-2 items-center
					bg-transparent w-full px-1 py-1"
          onClick={() => {
            setModalBulk(true);
            setBulkMode("status");
          }}
          disabled={!isAllowedToUpdateRecruitment}
        >
          <InfoSquareIconSvg size={16} />
          <p className="mig-caption--medium text-mono30">Ubah Status</p>
        </button>
      </Menu.Item>

      <Menu.Item key={"send_email"}>
        <button
          className="flex flex-row space-x-2 items-center 
					bg-transparent w-full px-1 py-1"
        >
          <MailForwardIconSvg size={16} />
          <p className="mig-caption--medium text-mono30">Kirim Email</p>
        </button>
      </Menu.Item>
      <Menu.Item key={"send_profile"}>
        <button
          className="flex flex-row space-x-2 items-center 
					bg-transparent w-full px-1 py-1"
        >
          <FileExportIconSvg size={16} />
          <p className="mig-caption--medium text-mono30">Kirim Form Profil</p>
        </button>
      </Menu.Item>
      <Menu.Item key={"delete"}>
        <button
          className="flex flex-row space-x-2 items-center 
					bg-transparent w-full px-1 py-1"
          onClick={onOpenDeleteModal}
          disabled={!isAllowedToDeleteRecruitment}
        >
          <TrashIconSvg size={16} />
          <p className="mig-caption--medium text-mono30">Hapus Kandidat</p>
        </button>
      </Menu.Item>
    </Menu>
  );

  // Table's columns
  const columnRecruitment = [
    !isBulk
      ? {
          title: "No",
          dataIndex: "num",
          render: (text, record, index) => {
            return {
              children: (
                <div className="flex justify-center">
                  {dataRawRecruitments?.from + index}
                </div>
              ),
            };
          },
        }
      : {},
    {
      title: "Nama",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: (
            <div className="xl:w-40">{record.name ? record.name : ""}</div>
          ),
        };
      },
      sorter: isAllowedToGetRecruitments
        ? (a, b) => a.name?.toLowerCase() > b.name?.toLowerCase()
        : false,
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record, index) => {
        return {
          children: <>{record.role?.name}</>,
        };
      },
      sorter: isAllowedToGetRecruitments
        ? (a, b) =>
            a.role?.name.toLowerCase().localeCompare(b.role?.name.toLowerCase())
        : false,
    },
    {
      title: "Stage",
      dataIndex: "stage",
      render: (text, record, index) => {
        return {
          children: (
            <div>
              <select
                disabled={!isAllowedToGetRecruitmentStagesList || isBulk}
                className="rounded-md py-1 hover:cursor-pointer"
                value={record.recruitment_stage_id}
                style={{ width: `100%` }}
                onClick={(e) => e.stopPropagation()}
                onChange={(event) => {
                  setDataUpdateStage({
                    ...dataUpdateStage,
                    id: record.id,
                    name: record.name,
                    prev_recruitment_stage_name: record.stage?.name,
                    recruitment_stage_name:
                      event.target?.selectedOptions[0]?.text,
                    recruitment_stage_id: Number(event.target?.value),
                  });
                  setModalUpdateStage(true);
                }}
              >
                {dataStageList.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.name}
                  </option>
                ))}
              </select>
            </div>
          ),
        };
      },
      sorter: isAllowedToGetRecruitments
        ? (a, b) =>
            a.stage?.name
              .toLowerCase()
              .localeCompare(b.stage?.name.toLowerCase())
        : false,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <select
                disabled={!isAllowedToGetRecruitmentStatusesList || isBulk}
                value={record.recruitment_status_id}
                className="rounded-md py-1 hover:cursor-pointer"
                style={{
                  width: `100%`,
                  backgroundColor: `${record.status?.color}10`,
                  color: `${record.status?.color}`,
                }}
                onClick={(e) => e.stopPropagation()}
                onChange={(event) => {
                  setDataUpdateStatus({
                    ...dataUpdateStatus,
                    id: record.id,
                    name: record.name,
                    prev_recruitment_status_name: record.status?.name,
                    recruitment_status_name:
                      event.target?.selectedOptions[0]?.text,
                    recruitment_status_id: Number(event.target?.value),
                  });
                  setModalUpdateStatus(true);
                }}
              >
                {dataStatusList.map((status) => (
                  <option
                    key={status.id}
                    value={status.id}
                    style={{
                      backgroundColor: `${status?.color}20`,
                      color: `${status?.color}`,
                    }}
                  >
                    {status?.name}
                  </option>
                ))}
              </select>
            </>
          ),
        };
      },
      sorter: isAllowedToGetRecruitments
        ? (a, b) =>
            a.status?.name
              .toLowerCase()
              .localeCompare(b.status?.name.toLowerCase())
        : false,
    },
    {
      key: "button_action",
      render: (text, record) => {
        return {
          children: (
            <div className="flex flex-row space-x-2 justify-center">
              <ButtonSys
                type={"default"}
                // type={canUpdateRoleAssessment ? "default" : "primary"}
                // disabled={!canUpdateRoleAssessment}
                // onClick={(event) => {
                //   event.stopPropagation();
                // }}
              >
                <MailForwardIconSvg size={16} color={`#35763B`} />
              </ButtonSys>
              <ButtonSys
                type={"default"}
                // type={isAllowedToDeleteRoleAssessment ? "default" : "primary"}
                // color="danger"
                // disabled={!isAllowedToDeleteRoleAssessment}
                // onClick={(event) => {
                //   event.stopPropagation();
                // }}
              >
                <FileExportIconSvg size={16} color={`#00589F`} />
              </ButtonSys>
            </div>
          ),
        };
      },
    },
  ];

  // console.log(dataUpdateStage)
  // console.log(refresh)
  // console.log(selectedRecruitments)
  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
    >
      <div className="flex flex-col" id="mainWrapper">
        <div className="grid grid-cols-2 lg:grid-cols-3 px-5 gap-6">
          <div
            className="col-span-2 flex flex-row items-center w-full 
						justify-between px-6 py-2 shadow-md rounded-md bg-white
						divide-x divide-gray-300"
          >
            <div className="flex flex-row items-center justify-between w-full pr-8 ">
              <h4 className="font-semibold lg:mig-heading--4">Jumlah Role</h4>
              <Spin spinning={loadingDataCount}>
                <p className="text-4xl lg:text-5xl text-primary100 pl-2">
                  {dataCount.recruitment_roles_count}
                </p>
              </Spin>
            </div>

            <div className="flex flex-row items-center justify-between w-full pl-8">
              <h4 className="font-semibold lg:mig-heading--4">
                Total Kandidat
              </h4>
              <Spin spinning={loadingDataCount}>
                <p className="text-4xl lg:text-5xl text-secondary100 pl-2">
                  {dataCount.recruitments_count}
                </p>
              </Spin>
            </div>
          </div>
          <AddNewFormButton
            icon={<SettingsIcon />}
            title="Kelola Rekrutmen"
            onButtonClicked={onManageRecruitmentButtonClicked}
            disabled={!isAllowedToSetupRecruitment}
          />

          {/* Card Jalur Daftar */}
          {/* <div className="col-span-1 flex flex-col shadow-md rounded-md bg-white p-6">
            <div className="flex flex-row justify-between items-center w-full">
              <h4 className="mig-heading--4">Jalur Daftar</h4>
              <ListSearchIconSvg size={24} />
            </div>
          </div> */}

          {/* Card Stage */}
          {/* <div className="col-span-1 flex flex-col shadow-md rounded-md bg-white p-6">
            <div className="flex flex-row justify-between items-center w-full">
              <h4 className="mig-heading--4">Stage</h4>
              <ListSearchIconSvg size={24} />
            </div>
          </div> */}

          {/* Card Status */}
          {/* <div className="col-span-1 flex flex-col shadow-md rounded-md bg-white p-6">
            <div className="flex flex-row justify-between items-center w-full">
              <h4 className="mig-heading--4">Status</h4>
              <ListSearchIconSvg size={24} />
            </div>
          </div> */}

          {/* Table Kandidat */}
          <div className="col-span-3 flex flex-col shadow-md rounded-md bg-white p-5 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="mig-heading--4 ">Semua Kandidat</h4>
              {isBulk === false ? (
                <div className="flex flex-col lg:flex-row space-x-6 space-y-2 lg:space-y-0">
                  <ButtonSys type={"default"} onClick={() => setBulk(true)}>
                    <div className="flex flex-row space-x-2.5 items-center">
                      <LayoutGridSvg size={16} color="#35763B" />
                      <p>Bulk Action</p>
                    </div>
                  </ButtonSys>

                  {/* Dropdown Tambah Kandidat */}
                  <Dropdown
                    overlay={dropdownMenu}
                    trigger={["click"]}
                    placement="bottomRight"
                    className="z-0"
                    disabled={!isAllowedToAddRecruitment}
                  >
                    <Button
                      type={"primary"}
                      className="btn btn-sm text-white font-semibold px-6 border 
                        bg-primary100 hover:bg-primary75 border-primary100 
                        hover:border-primary75 focus:bg-primary100 focus:border-primary100"
                      icon={<UserPlusIconSvg size={16} color="#FFFFFF" />}
                    >
                      Tambah Kandidat
                    </Button>
                  </Dropdown>
                </div>
              ) : (
                <div className="flex flex-row space-x-6">
                  <ButtonSys
                    type={"default"}
                    color={"danger"}
                    onClick={() => {
                      setBulk(false);
                      setSelectedRecruitments([]);
                      setSelectedRecruitmentIds([]);
                      setDataUpdateStage([]);
                      setDataUpdateStatus([]);
                    }}
                  >
                    <div className="flex flex-row space-x-1 items-center">
                      <XIconSvg size={16} color={"#BF4A40"} />
                      <p>Batal</p>
                    </div>
                  </ButtonSys>

                  {/* Dropdown Aksi */}
                  <Dropdown
                    overlay={bulkMenu}
                    trigger={["click"]}
                    placement="bottomRight"
                    disabled={selectedRecruitments.length === 0}
                  >
                    <Button
                      type={"default"}
                      className="btn btn-sm font-semibold px-6 border border-primary100
                        hover:border-primary75  hover:bg-primary75 focus:bg-white
                        focus:border-primary100 text-primary100 hover:text-white focus:text-primary100"
                    >
                      <div className="flex flex-row items-center space-x-3.5">
                        <p>Aksi</p>
                        <DownIconSvg size={16} color={"#35763B"} />
                      </div>
                    </Button>
                  </Dropdown>
                </div>
                // <div></div>
              )}
            </div>

            {/* Start: Search criteria */}
            <div className="flex flex-row justify-between w-full space-x-4 items-center mb-4">
              {/* Search by keyword (kata kunci) */}
              <div className="w-4/12">
                <Input
                  value={
                    searchingFilterRecruitments === ""
                      ? null
                      : searchingFilterRecruitments
                  }
                  style={{ width: `100%` }}
                  placeholder="Kata Kunci.."
                  allowClear
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setSearchingFilterRecruitments("");
                    } else {
                      setSearchingFilterRecruitments(e.target.value);
                    }
                  }}
                  onKeyPress={onKeyPressHandler}
                  disabled={!isAllowedToGetRecruitments}
                />
              </div>

              {/* Filter by role (dropdown) */}
              <div className="w-2/12">
                <Select
                  value={selectedRoleId === 0 ? null : selectedRoleId}
                  allowClear
                  name={`role`}
                  disabled={!isAllowedToGetRecruitmentRolesList}
                  placeholder="Semua Role"
                  style={{ width: `100%` }}
                  onChange={(value) => {
                    typeof value === "undefined"
                      ? setSelectedRoleId(0)
                      : setSelectedRoleId(value);
                  }}
                >
                  {/* <Select.Option value={0}>Semua Role</Select.Option> */}
                  {dataRoleList.map((role) => (
                    <Select.Option key={role.id} value={role.id}>
                      {role.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              {/* Filter by stage */}
              <div className="w-2/12">
                <Select
                  value={selectedStage === 0 ? null : selectedStage}
                  allowClear
                  name={`stage`}
                  disabled={!isAllowedToGetRecruitmentStagesList}
                  placeholder="Semua Stage"
                  defaultValue={0}
                  style={{ width: `100%` }}
                  onChange={(value) => {
                    typeof value === "undefined"
                      ? setSelectedStage(0)
                      : setSelectedStage(value);
                  }}
                >
                  <Select.Option value={0}>Semua Stage</Select.Option>
                  {dataStageList.map((stage) => (
                    <Select.Option key={stage.id} value={stage.id}>
                      {stage.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              {/* Search by status (dropdown) */}
              <div className="w-2/12">
                <Select
                  value={selectedStatus === 0 ? null : selectedStatus}
                  allowClear
                  name={`status`}
                  disabled={!isAllowedToGetRecruitmentStatusesList}
                  placeholder="Semua Status"
                  defaultValue={0}
                  style={{ width: `100%` }}
                  onChange={(value) => {
                    typeof value === "undefined"
                      ? setSelectedStatus(0)
                      : setSelectedStatus(value);
                  }}
                >
                  <Select.Option value={0}>Semua Status</Select.Option>
                  {dataStatusList.map((status) => (
                    <Select.Option key={status.id} value={status.id}>
                      <div className="flex items-center">
                        <div
                          className="rounded-full w-4 h-4 mr-2"
                          style={{ backgroundColor: `${status.color}` }}
                        />
                        <p className="truncate">{status.name}</p>
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <ButtonSys
                type={`primary`}
                onClick={onFilterRecruitments}
                disabled={!isAllowedToGetRecruitments}
              >
                <div className="flex flex-row space-x-2.5 w-full items-center">
                  <SearchIconSvg size={15} color={`#ffffff`} />
                  <p>Cari</p>
                </div>
              </ButtonSys>
            </div>
            {/* End: Search criteria */}

            <div>
              <TableCustomRecruitmentCandidate
                dataSource={dataRecruitments}
                setDataSource={setDataRecruitments}
                columns={columnRecruitment}
                loading={loadingRecruitments}
                setpraloading={setLoadingRecruitments}
                pageSize={rowsRecruitment}
                total={dataRawRecruitments?.total}
                initProps={initProps}
                setpage={setPageRecruitments}
                pagefromsearch={pageRecruitments}
                setdataraw={setDataRawRecruitments}
                setsorting={setSortingRecruitments}
                sorting={sortingRecruitments}
                searching={searchingFilterRecruitments}
                selectedRoleId={selectedRoleId}
                selectedStage={selectedStage}
                selectedStatus={selectedStatus}
                isBulk={isBulk}
                setSelectedRecruitments={setSelectedRecruitments}
                setSelectedRecruitmentIds={setSelectedRecruitmentIds}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Tambah Kandidat */}
      <AccessControl hasPermission={RECRUITMENT_ADD}>
        <DrawerCandidateCreate
          title={"Tambah Kandidat"}
          visible={isCreateDrawerShown}
          buttonOkText={"Simpan Kandidat"}
          initProps={initProps}
          onvisible={setCreateDrawerShown}
          setRefresh={setRefresh}
          isAllowedToAddRecruitment={isAllowedToAddRecruitment}
          dataRoleList={dataRoleList}
          dataStageList={dataStageList}
          dataStatusList={dataStatusList}
        />
      </AccessControl>

      {/* Drawer Hapus Kandidat */}
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
          // disabled={candidateCount > 0}
        >
          Apakah Anda yakin ingin menghapus kandidat{" "}
          <strong>{selectedRecruitments[0]?.name}</strong>?
        </ModalHapus2>
      </AccessControl>

      {/* Modal Update Stage */}
      <AccessControl hasPermission={RECRUITMENT_UPDATE_STAGE}>
        <ModalUbah
          title={`Konfirmasi Perubahan`}
          visible={modalUpdateStage}
          onvisible={setModalUpdateStage}
          onOk={isBulk ? handleUpdateStages : handleUpdateStage}
          onCancel={() => {
            setModalUpdateStage(false);
            setDataUpdateStage({});
          }}
          loading={loadingUpdate}
          disabled={disableUpdate}
        >
          {modalUpdateStage && isBulk ? (
            <div className="space-y-4">
              <p className="">
                Anda telah melakukan perubahan pada{" "}
                <strong>{selectedRecruitmentIds.length} kandidat</strong>
                &nbsp;berikut
              </p>
              {selectedRecruitmentIds.map((value, idx) => (
                <p key={value} className="font-bold">
                  {`${idx + 1}. ${dataUpdateStage.name[idx]} - ${
                    dataUpdateStage.prev_recruitment_stage_name[idx]
                  }`}
                </p>
              ))}
              <p>Tambah catatan:</p>
              <Input.TextArea
                // placeholder="Masukkan catatan"
                required={true}
                rows={2}
                value={dataUpdateStage.notes}
                onChange={(event) => {
                  setDataUpdateStage({
                    ...dataUpdateStage,
                    notes: event.target.value,
                  });
                }}
              />
              <p>
                Apakah Anda yakin ingin mengubah stage menjadi{" "}
                <strong>{dataUpdateStage.recruitment_stage_name}</strong>?
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="">
                Anda telah melakukan perubahan pada kandidat{" "}
                <strong>{dataUpdateStage.name}</strong>
                &nbsp;pada item berikut
              </p>
              <p className="font-bold">
                {`Stage ${dataUpdateStage.prev_recruitment_stage_name} → ${dataUpdateStage.recruitment_stage_name}`}
              </p>
              <p>Tambah catatan:</p>
              <Input.TextArea
                // placeholder="Masukkan catatan"
                required={true}
                rows={2}
                value={dataUpdateStage.notes}
                onChange={(event) => {
                  setDataUpdateStage({
                    ...dataUpdateStage,
                    notes: event.target.value,
                  });
                }}
              />
              <p>Apakah Anda yakin ingin menyimpan perubahan?</p>
            </div>
          )}
        </ModalUbah>
      </AccessControl>

      {/* Modal Update Status */}
      <AccessControl hasPermission={RECRUITMENT_UPDATE_STATUS}>
        <ModalUbah
          title={`Konfirmasi Perubahan`}
          visible={modalUpdateStatus}
          onvisible={setModalUpdateStatus}
          onOk={isBulk ? handleUpdateStatuses : handleUpdateStatus}
          onCancel={() => {
            setModalUpdateStatus(false);
            setDataUpdateStatus({});
          }}
          loading={loadingUpdate}
          disabled={disableUpdate}
        >
          {modalUpdateStatus && isBulk ? (
            <div className="space-y-4">
              <p className="">
                Anda telah melakukan perubahan pada{" "}
                <strong>{selectedRecruitmentIds.length} kandidat</strong>
                &nbsp;berikut
              </p>
              {selectedRecruitmentIds?.map((value, idx) => (
                <p key={value} className="font-bold">
                  {`${idx + 1}. ${dataUpdateStatus.name[idx]} - ${
                    dataUpdateStatus.prev_recruitment_status_name[idx]
                  }`}
                </p>
              ))}
              <p>Tambah catatan:</p>
              <Input.TextArea
                // placeholder="Masukkan catatan"
                required={true}
                rows={2}
                value={dataUpdateStatus.notes}
                onChange={(event) => {
                  setDataUpdateStatus({
                    ...dataUpdateStatus,
                    notes: event.target.value,
                  });
                }}
              />
              <p>
                Apakah Anda yakin ingin mengubah status menjadi{" "}
                <strong>{dataUpdateStatus.recruitment_status_name}</strong>?
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="">
                Anda telah melakukan perubahan pada kandidat{" "}
                <strong>{dataUpdateStatus.name}</strong>
                &nbsp;pada item berikut
              </p>
              <p className="font-bold">
                {`Status ${dataUpdateStatus.prev_recruitment_status_name} → ${dataUpdateStatus.recruitment_status_name}`}
              </p>
              <p>Tambah catatan:</p>
              <Input.TextArea
                // placeholder="Masukkan catatan"
                required={true}
                rows={2}
                value={dataUpdateStatus.notes}
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

      {/* <AccessControl hasPermission={RECRUITMENT_UPDATE}>
        <ModalUbah
          title={`Konfirmasi Perubahan`}
          visible={modalUpdate}
          onvisible={setModalUpdate}
          // onOk={handleUpdateRoleAssessment}
          onCancel={() => {
            setModalUpdate(false);
          }}
          loading={loadingUpdate}
        >
          <div className="space-y-4">
            <p className="">
                Anda telah melakukan perubahan pada kandidat <strong>{candidateName}</strong>
                pada item berikut
              </p>
            <p className="font-bold">[perubahan]</p>
            <p>Apakah Anda yakin ingin menyimpan perubahan tersebut?</p>
          </div>
        </ModalUbah>
      </AccessControl> */}

      {/* Modal Bulk */}
      <AccessControl hasPermission={RECRUITMENT_UPDATE}>
        <ModalCore
          title={`Mengubah ${selectedRecruitments.length} Kandidat`}
          visible={modalBulk}
          onCancel={() => {
            setModalBulk(false);
            // setDataUpdateStage({})
          }}
          footer={
            <Spin spinning={loadingUpdate}>
              <div className="flex justify-end">
                <ButtonSys
                  type={"primary"}
                  onClick={() => {
                    {
                      bulkMode === "stage"
                        ? setModalUpdateStage(true)
                        : setModalUpdateStatus(true);
                    }
                    setModalBulk(false);
                  }}
                  // disabled={disabled}
                >
                  <div className="flex flex-row space-x-2">
                    <CheckIconSvg size={16} color={`white`} />
                    {bulkMode === "stage" ? (
                      <p>Ubah Stage</p>
                    ) : (
                      <p>Ubah Status</p>
                    )}
                  </div>
                </ButtonSys>
              </div>
            </Spin>
          }
        >
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-4">
              <p>Berikut ini adalah kandidat yang akan diubah:</p>
              <Table
                rowKey={(record) => record.id}
                className="border border-mono90 rounded-md"
                // rowSelection={{
                //   type: "checkbox",
                //   onChange: (selectedRowKeys, selectedRows) => {
                //     console.log(
                //       `selectedRowKeys: ${selectedRowKeys}`,
                //       "selectedRows: ",
                //       selectedRows
                //     );
                //     setSelectedRecruitments(selectedRows);
                //   },
                // }}
                columns={[
                  {
                    title: "Nama Kandidat",
                    dataIndex: "name",
                    render: (record) => {
                      return {
                        children: <p className="">{record ? record : ""}</p>,
                      };
                    },
                  },
                ]}
                dataSource={selectedRecruitments}
              ></Table>
            </div>

            {bulkMode === "stage" ? (
              <div className="flex flex-col space-y-4">
                <p>Stage</p>
                <Select
                  disabled={!isAllowedToGetRecruitmentStagesList}
                  placeholder={"Pilih stage..."}
                  className={"border-none active:border-none"}
                  value={dataUpdateStage.recruitment_stage_id}
                  style={{ width: `100%` }}
                  onChange={(value, option) => {
                    let candidateNames = selectedRecruitments.map(
                      (selected) => selected.name
                    );
                    let prevStageNames = selectedRecruitments.map(
                      (selected) => selected.stage?.name
                    );
                    setDataUpdateStage({
                      ...dataUpdateStage,
                      id: selectedRecruitmentIds,
                      name: candidateNames,
                      prev_recruitment_stage_name: prevStageNames,
                      recruitment_stage_name: option.children,
                      recruitment_stage_id: value,
                    });
                  }}
                >
                  {dataStageList.map((stage) => (
                    <Select.Option key={stage.id} value={stage.id}>
                      {stage.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <p>Status</p>
                <Select
                  disabled={!isAllowedToGetRecruitmentStatusesList}
                  placeholder={"Pilih status..."}
                  className={"border-none active:border-none"}
                  value={dataUpdateStatus.recruitment_status_id}
                  style={{ width: `100%` }}
                  onChange={(value, option) => {
                    let candidateNames = selectedRecruitments.map(
                      (selected) => selected.name
                    );
                    let prevStatusNames = selectedRecruitments.map(
                      (selected) => selected.status?.name
                    );
                    setDataUpdateStatus({
                      ...dataUpdateStatus,
                      id: selectedRecruitmentIds,
                      name: candidateNames,
                      prev_recruitment_status_name: prevStatusNames,
                      recruitment_status_name: option.children,
                      recruitment_status_id: value,
                    });
                  }}
                >
                  {dataStatusList.map((status) => (
                    <Select.Option key={status.id} value={status.id}>
                      {status.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            )}
          </div>
        </ModalCore>
      </AccessControl>
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
  let initProps = {};
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
      method: "GET",
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
    },
  };
}

export default RecruitmentCandidateIndex;
