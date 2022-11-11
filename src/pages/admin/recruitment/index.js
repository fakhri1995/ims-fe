import {
  Button,
  DatePicker,
  Dropdown,
  Empty,
  Form,
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
import { useRef } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";

import { AccessControl } from "components/features/AccessControl";
import { AddNewFormButton } from "components/screen/resume";

import { useAccessControl } from "contexts/access-control";

import {
  RECRUITMENTS_ADD,
  RECRUITMENTS_DELETE,
  RECRUITMENTS_GET,
  RECRUITMENT_ACCOUNT_GENERATE,
  RECRUITMENT_ACCOUNT_TOKEN_GET,
  RECRUITMENT_ADD,
  RECRUITMENT_COUNT_GET,
  RECRUITMENT_EMAIL_SEND,
  RECRUITMENT_EMAIL_TEMPLATES_LIST_GET,
  RECRUITMENT_EXCEL_TEMPLATE_GET,
  RECRUITMENT_GET,
  RECRUITMENT_JALUR_DAFTARS_LIST_GET,
  RECRUITMENT_PREVIEW_GET,
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
import ButtonSysColor from "../../../components/buttonColor";
import DrawerCore from "../../../components/drawer/drawerCore";
import DrawerCandidateCreate from "../../../components/drawer/recruitment/drawerCandidateCreate";
import DrawerCandidatePreview from "../../../components/drawer/recruitment/drawerCandidatePreview";
import DrawerCandidateSendEmail from "../../../components/drawer/recruitment/drawerCandidateSendEmail";
import {
  CheckIconSvg,
  CopyIconSvg,
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
  const isAllowedToAddRecruitments = hasPermission(RECRUITMENTS_ADD);
  const isAllowedToUpdateRecruitment = hasPermission(RECRUITMENT_UPDATE);
  const isAllowedToDeleteRecruitments = hasPermission(RECRUITMENTS_DELETE);
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
  const isAllowedToGetRecruitmentJalurDaftarsList = hasPermission(
    RECRUITMENT_JALUR_DAFTARS_LIST_GET
  );
  const canUpdateStage = hasPermission(RECRUITMENT_UPDATE_STAGE);
  const canUpdateStatus = hasPermission(RECRUITMENT_UPDATE_STATUS);

  const isAllowedToSendEmailRecruitment = hasPermission(RECRUITMENT_EMAIL_SEND);

  const isAllowedToDownloadTemplate = hasPermission(
    RECRUITMENT_EXCEL_TEMPLATE_GET
  );

  const isAllowedToGetPreviewRecruitment = hasPermission(
    RECRUITMENT_PREVIEW_GET
  );

  const isAllowedToGenerateRecruitmentAccount = hasPermission(
    RECRUITMENT_ACCOUNT_GENERATE
  );

  const isAllowedToGetRecruitmentVerification = hasPermission(
    RECRUITMENT_ACCOUNT_TOKEN_GET
  );

  // 1. Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);

  const [instanceForm] = Form.useForm();
  // 2. Use state
  // 2.1. Role List & Candidate Count
  const [loadingDataCount, setLoadingDataCount] = useState(false);
  const [dataCount, setDataCount] = useState({
    recruitments_count: 0,
    recruitment_roles_count: 0,
  });

  // 2.2. Table Candidate Recruitment
  // filter data
  const [loadingRoleList, setLoadingRoleList] = useState(false);
  const [dataRoleList, setDataRoleList] = useState([]);
  const [loadingStageList, setLoadingStageList] = useState(false);
  const [dataStageList, setDataStageList] = useState([]);
  const [loadingStatusList, setLoadingStatusList] = useState(false);
  const [dataStatusList, setDataStatusList] = useState([]);
  const [loadingJalurDaftarList, setLoadingJalurDaftarList] = useState([]);
  const [dataJalurDaftarList, setDataJalurDaftarList] = useState([]);

  // filter search & selected options
  const [searchingFilterRecruitments, setSearchingFilterRecruitments] =
    useState("");
  const [selectedRoleId, setSelectedRoleId] = useState(0);
  const [selectedStage, setSelectedStage] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(0);

  // sorting
  const [sortingRecruitments, setSortingRecruitments] = useState({
    sort_by: "",
    sort_type: "",
  });

  // table data
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

  // bulk
  const [isBulk, setBulk] = useState(false);
  const [selectedRecruitments, setSelectedRecruitments] = useState([]);
  const [selectedRecruitmentIds, setSelectedRecruitmentIds] = useState([]);

  const [refresh, setRefresh] = useState(-1);
  const [dataRowClicked, setDataRowClicked] = useState({});
  const tempIdClicked = useRef(-1);
  const [triggerRowClicked, setTriggerRowClicked] = useState(-1);

  /**
   * 2.3. Drawer/Modal For Create, Delete, Bulk, Send Email,
   * Import sheet, Preview, send access verification
   * */
  const [isCreateDrawerShown, setCreateDrawerShown] = useState(false);
  const [isEmailDrawerShown, setEmailDrawerShown] = useState(false);
  const [isPreviewDrawerShown, setPreviewDrawerShown] = useState(false);

  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [modalBulk, setModalBulk] = useState(false);
  const [bulkMode, setBulkMode] = useState("");

  const [modalSheetImport, setModalSheetImport] = useState(false);

  const [modalSendAccess, setModalSendAccess] = useState(false);
  const [loadingSendVerifEmail, setLoadingSendVerifEmail] = useState(false);

  const [loadingLink, setLoadingLink] = useState(false);
  const [verificationLink, setVerificationLink] = useState("");

  // 2.4 Update Stage & Status
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [disableUpdate, setDisableUpdate] = useState(false);

  const [modalUpdateStage, setModalUpdateStage] = useState(false);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(false);

  const [dataUpdateStage, setDataUpdateStage] = useState({
    id: null,
    recruitment_stage_id: null,
    notes: null,
    name: "",
    prev_recruitment_stage_name: "",
    recruitment_stage_name: "",
  });

  const [dataUpdateStatus, setDataUpdateStatus] = useState({
    id: null,
    recruitment_status_id: null,
    notes: null,
    name: "",
    prev_recruitment_status_name: "",
    recruitment_status_name: "",
  });

  // 2.5 Create recruitments (import excel)
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [dataRoleOptions, setDataRoleOptions] = useState([]);
  const [dataJalurDaftarOptions, setDataJalurDaftarOptions] = useState([]);
  const [dataStageOptions, setDataStageOptions] = useState([]);
  const [dataStatusOptions, setDataStatusOptions] = useState([]);

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

  // 3.5. Get Jalur Daftar List
  useEffect(() => {
    if (!isAllowedToGetRecruitmentJalurDaftarsList) {
      permissionWarningNotification("Mendapatkan", "Jalur Daftar List");
      setLoadingJalurDaftarList(false);
      return;
    }

    setLoadingJalurDaftarList(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentJalurDaftarsList`,
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
          setDataJalurDaftarList(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingJalurDaftarList(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingJalurDaftarList(false);
      });
  }, [isAllowedToGetRecruitmentJalurDaftarsList, refresh]);

  // 3.6. Get Recruitment Verification Link
  useEffect(() => {
    if (!isAllowedToGetRecruitmentVerification) {
      permissionWarningNotification("Mendapatkan", "Link Verifikasi Rekrutmen");
      setLoadingLink(false);
      return;
    }
    if (dataRowClicked.owner_id && modalSendAccess) {
      setLoadingLink(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentAccountToken?id=${dataRowClicked.id}`,
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
            setVerificationLink(res2.data?.reset_password_url);
          } else {
            notification.error({
              message: `Gagal mendapatkan link verifikasi. ${res2.message}`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: `Gagal mendapatkan link verifikasi. ${err.response}`,
            duration: 3,
          });
        })
        .finally(() => {
          setLoadingLink(false);
        });
    }
  }, [isAllowedToGetRecruitmentVerification, modalSendAccess, refresh]);

  // 3.6. Disable update stage or status if notes empty
  useEffect(() => {
    dataUpdateStage.notes ? setDisableUpdate(false) : setDisableUpdate(true);
  }, [dataUpdateStage]);

  useEffect(() => {
    dataUpdateStatus.notes ? setDisableUpdate(false) : setDisableUpdate(true);
  }, [dataUpdateStatus]);

  // 3.7. Set options in import excel
  useEffect(() => {
    let roleOptions = dataRoleList.map((role) => {
      let newOption = {
        label: role.name,
        value: role.id,
      };
      return newOption;
    });
    // console.log("role",roleOptions)
    setDataRoleOptions(roleOptions);
  }, [dataRoleList]);

  useEffect(() => {
    let jalurDaftarOptions = dataJalurDaftarList.map((jalur) => {
      let newOption = {
        label: jalur.name,
        value: jalur.id,
      };
      return newOption;
    });
    setDataJalurDaftarOptions(jalurDaftarOptions);

    // console.log(roleOptions)
  }, [dataJalurDaftarList]);

  useEffect(() => {
    let stageOptions = dataStageList.map((stage) => {
      let newOption = {
        label: stage.name,
        value: stage.id,
      };
      return newOption;
    });
    setDataStageOptions(stageOptions);
  }, [dataStageList]);

  useEffect(() => {
    let statusOptions = dataStatusList.map((status) => {
      let newOption = {
        label: status.name,
        value: status.id,
      };
      return newOption;
    });
    setDataStatusOptions(statusOptions);
  }, [dataStatusList]);

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

  // 4.2. Create Recruitments (from excel import)
  const handleCreateRecruitments = (data) => {
    if (!isAllowedToAddRecruitments) {
      permissionWarningNotification("Menambah", "Rekrutmen Kandidat");
      return;
    }
    setLoadingCreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addRecruitments`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          notification.success({
            message: `Kandidat berhasil ditambahkan.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal menambahkan kandidat. ${response2.message}`,
            duration: 3,
          });
        }
        setLoadingCreate(false);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan kandidat. ${err.response}`,
          duration: 3,
        });
        setLoadingCreate(false);
      });
  };

  // 4.3. Update Stage per each candidate
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

  // 4.4. Update Status per each candidate
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

  // 4.7. Delete Recruitments
  const onOpenDeleteModal = () => {
    setModalDelete(true);
  };

  const handleDeleteRecruitments = () => {
    const payload = {
      ids: selectedRecruitmentIds,
    };

    if (!isAllowedToDeleteRecruitments) {
      permissionWarningNotification("Menghapus", "Kandidat");
      return;
    }
    setLoadingDelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteRecruitments`, {
      method: "DELETE",
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
          notification.success({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            setModalDelete(false);
            setBulk(false);
            setSelectedRecruitmentIds([]);
          }, 500);
        } else {
          notification.error({
            message: `Gagal menghapus kandidat. ${response2.message}`,
            duration: 3,
          });
        }
        setLoadingDelete(false);
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

  // 4.8. Download Excel Template
  const handleDownloadExcelTemplate = () => {
    if (!isAllowedToDownloadTemplate) {
      permissionWarningNotification("Mengunduh", "Template Excel");
      return;
    }
    setLoadingCreate(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentExcelTemplate`,
      {
        method: "GET",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.blob())
      .then((response2) => {
        // console.log(response2)
        const url = window.URL.createObjectURL(new Blob([response2]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Template-Add Candidates.xlsx`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengunduh template. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingCreate(false);
      });
  };

  /**
   * 4.9. Generate Recruitment Account
   * (automatically create guest and resume object, then send
   * access email to candidate)
   *  */
  const handleGenerateRecruitmentAccount = (currentId) => {
    const payload = {
      id: currentId,
      role_ids: [],
    };
    if (!isAllowedToGenerateRecruitmentAccount) {
      permissionWarningNotification("Membuat", "Resume Kandidat");
      return;
    }
    setLoadingCreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/generateRecruitmentAccount`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          notification.success({
            message: `Akun rekrutmen berhasil dibuat dan email telah dikirim.`,
            duration: 3,
          });
          setModalSendAccess(false);
        } else {
          notification.error({
            message: `Gagal membuat akun rekrutmen. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal membuat akun rekrutmen ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingCreate(false);
      });
  };

  // Dropdown Menu "Tambah Kandidat"
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
          onClick={() => setModalSheetImport(true)}
        >
          <FilePlusIconSvg size={20} color="#4D4D4D" />
          <p className="mig-caption--medium text-mono30">Masukkan dari Excel</p>
        </button>
      </Menu.Item>

      <Menu.Item key={"download_template"}>
        <button
          className="flex flex-row space-x-2 items-center 
					bg-transparent w-full px-2.5 py-2"
          onClick={handleDownloadExcelTemplate}
        >
          <DownloadIconSvg size={20} color="#4D4D4D" />
          <p className="mig-caption--medium text-mono30">
            Unduh Template Excel
          </p>
        </button>
      </Menu.Item>
    </Menu>
  );

  /***
   * Bulk Menu (Dropdown Aksi)
   * (only active when "bulk action" is clicked,
   * then at least 1 candidate is selected)
   ***/
  const bulkMenu = (
    <Menu>
      <Menu.Item key={"stage"}>
        <button
          className={`flex flex-row space-x-2 
          items-center bg-transparent w-full px-1 py-1`}
          onClick={() => {
            setModalBulk(true);
            setBulkMode("stage");
          }}
          disabled={!canUpdateStage}
        >
          <TrendingUpIconSvg size={16} />
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

      <Menu.Item key={"status"}>
        <button
          className="flex flex-row space-x-2 items-center
					bg-transparent w-full px-1 py-1"
          onClick={() => {
            setModalBulk(true);
            setBulkMode("status");
          }}
          disabled={!canUpdateStatus}
        >
          <InfoSquareIconSvg size={16} />
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
      <Menu.Item key={"delete"}>
        <button
          className="flex flex-row space-x-2 items-center 
					bg-transparent w-full px-1 py-1"
          onClick={onOpenDeleteModal}
          disabled={!isAllowedToDeleteRecruitments}
        >
          <TrashIconSvg size={16} />
          <p
            className={
              isAllowedToDeleteRecruitments
                ? `mig-caption--medium text-mono30`
                : `mig-caption--medium text-gray-300`
            }
          >
            Hapus Kandidat
          </p>
        </button>
      </Menu.Item>
    </Menu>
  );

  // "Semua Kandidat" Table's columns
  const columnRecruitment = [
    !isBulk
      ? {
          title: "No",
          key: "number",
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
      key: "name",
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
      key: "role",
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
      key: "stage",
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
      key: "status",
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
      title: "Aksi",
      key: "button_action",
      render: (text, record) => {
        return {
          children: (
            <div className="flex flex-row space-x-2 justify-center">
              <ButtonSysColor
                type={"default"}
                disabled={!isAllowedToGetRecruitment}
                onClick={(event) => {
                  event.stopPropagation();
                  rt.push(`/admin/recruitment/${record.id}`);
                }}
                color={"border-mono30"}
              >
                <SearchIconSvg size={16} color={`#100F0F`} />
              </ButtonSysColor>
              <ButtonSysColor
                type={"default"}
                disabled={!isAllowedToSendEmailRecruitment}
                onClick={(event) => {
                  event.stopPropagation();
                  setDataRowClicked(record);
                  setEmailDrawerShown(true);
                }}
                color={"border-primary100"}
              >
                <MailForwardIconSvg size={16} color={`#35763B`} />
              </ButtonSysColor>
              <ButtonSysColor
                type={"default"}
                disabled={!isAllowedToGenerateRecruitmentAccount}
                onClick={(event) => {
                  event.stopPropagation();
                  setDataRowClicked(record);
                  setModalSendAccess(true);
                }}
                color={
                  record.owner_id ? "border-state2" : "border-secondary100"
                }
              >
                <FileExportIconSvg
                  size={16}
                  color={record.owner_id ? "#DDB44A" : "#00589F"}
                />
              </ButtonSysColor>
            </div>
          ),
        };
      },
    },
  ];

  // DEBUG

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
    >
      <div className="flex flex-col" id="mainWrapper">
        <div className="grid grid-cols-2 lg:grid-cols-3 md:px-5 gap-6">
          <div
            className="col-span-2 flex flex-row items-center w-full 
						justify-between px-6 py-2 shadow-md rounded-md bg-white
						divide-x divide-gray-300"
          >
            <div className="flex flex-col md:flex-row items-center md:justify-between w-full pr-8 ">
              <h4 className="font-semibold lg:mig-heading--4">Jumlah Role</h4>
              <Spin spinning={loadingDataCount}>
                <p className="text-4xl lg:text-5xl text-primary100 pl-2">
                  {dataCount.recruitment_roles_count}
                </p>
              </Spin>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between w-full pl-8">
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

            {/* Import excel */}
            <ReactSpreadsheetImport
              isOpen={modalSheetImport}
              onClose={() => setModalSheetImport(false)}
              onSubmit={(data) => {
                setTimeout(() => {
                  handleCreateRecruitments(data?.validData);
                }, 1000);
              }}
              allowInvalidSubmit={false}
              translations={{
                uploadStep: {
                  manifestTitle: "Data yang diharapkan:",
                  manifestDescription:
                    "(Anda dapat mengubah data pada langkah selanjutnya)",
                },
              }}
              autoMapDistance={3}
              // matchColumnsStepHook={(table, rawData, columns) => {
              //   console.log(table, rawData, columns)
              //   // try {
              //   //   let isFilled = table.some(row => {
              //   //     return ((row.recruitment_jalur_daftar_id !== undefined) &&
              //   //       (row.recruitment_role_id !== undefined) &&
              //   //       (row.recruitment_stage_id !== undefined) &&
              //   //       (row.recruitment_status_id !== undefined))
              //   //   })
              //   //   console.log(isFilled);
              //   // } catch(err) {
              //   //   notification.err("Error")
              //   // }

              // }}
              fields={[
                {
                  label: "Nama",
                  key: "name",
                  alternateMatches: ["Nama", "nama"],
                  fieldType: {
                    type: "input",
                  },
                  example: "John Doe",
                  validations: [
                    {
                      rule: "required",
                      errorMessage: "Nama wajib diisi",
                      level: "error",
                    },
                  ],
                },
                {
                  label: "Email",
                  key: "email",
                  alternateMatches: ["email", "Email"],
                  fieldType: {
                    type: "input",
                  },
                  example: "someone@example-mail.com",
                  validations: [
                    {
                      rule: "required",
                      errorMessage: "Email wajib diisi",
                      level: "error",
                    },
                    {
                      rule: "regex",
                      value: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}",
                      errorMessage: "Email belum terisi dengan benar",
                      level: "warning",
                    },
                  ],
                },
                {
                  label: "Universitas",
                  key: "university",
                  alternateMatches: ["Universitas", "universitas"],
                  fieldType: {
                    type: "input",
                  },
                  example: "Institut Teknologi Bandung",
                  validations: [
                    {
                      rule: "required",
                      errorMessage: "Universitas wajib diisi",
                      level: "error",
                    },
                  ],
                },
                {
                  label: "Role",
                  key: "recruitment_role_id",
                  alternateMatches: ["Role", "role"],
                  fieldType: {
                    type: "select",
                    options: dataRoleOptions,
                  },
                  example: "Product Manager",
                  validations: [
                    {
                      rule: "required",
                      errorMessage: "Role wajib diisi",
                      level: "error",
                    },
                  ],
                },
                {
                  label: "Jalur Daftar",
                  key: "recruitment_jalur_daftar_id",
                  alternateMatches: ["jalur daftar", "Jalur Daftar"],
                  fieldType: {
                    type: "select",
                    options: dataJalurDaftarOptions,
                  },
                  example: "Glints",
                  validations: [
                    {
                      rule: "required",
                      errorMessage: "Jalur Daftar wajib diisi",
                      level: "error",
                    },
                  ],
                },
                {
                  label: "Stage",
                  key: "recruitment_stage_id",
                  alternateMatches: ["Stage", "stage"],
                  fieldType: {
                    type: "select",
                    options: dataStageOptions,
                  },
                  example: "Behavior Interview",
                  validations: [
                    {
                      rule: "required",
                      errorMessage: "Stage wajib diisi",
                      level: "error",
                    },
                  ],
                },
                {
                  label: "Status",
                  key: "recruitment_status_id",
                  alternateMatches: ["Status", "status"],
                  fieldType: {
                    type: "select",
                    options: dataStatusOptions,
                  },
                  example: "On Hold",
                  validations: [
                    {
                      rule: "required",
                      errorMessage: "Status wajib diisi",
                      level: "error",
                    },
                  ],
                },
              ]}
            />

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
                setDrawerShown={setPreviewDrawerShown}
                tempIdClicked={tempIdClicked}
                setTriggerRowClicked={setTriggerRowClicked}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Preview Kandidat */}
      <AccessControl hasPermission={RECRUITMENT_PREVIEW_GET}>
        <DrawerCandidatePreview
          id={tempIdClicked}
          visible={isPreviewDrawerShown}
          initProps={initProps}
          onvisible={setPreviewDrawerShown}
          setRefresh={setRefresh}
          trigger={triggerRowClicked}
          isAllowedToGetRecruitment={isAllowedToGetRecruitment}
          isAllowedToGetPreviewRecruitment={isAllowedToGetPreviewRecruitment}
        />
      </AccessControl>

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

      {/* Drawer Kirim Email */}
      <AccessControl
        hasPermission={[
          RECRUITMENT_EMAIL_SEND,
          RECRUITMENT_EMAIL_TEMPLATES_LIST_GET,
        ]}
      >
        <DrawerCandidateSendEmail
          visible={isEmailDrawerShown}
          initProps={initProps}
          onvisible={setEmailDrawerShown}
          setRefresh={setRefresh}
          dataCandidate={dataRowClicked}
        />
      </AccessControl>

      {/* Modal Hapus Kandidat */}
      <AccessControl hasPermission={RECRUITMENTS_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={handleDeleteRecruitments}
          onCancel={() => {
            setModalDelete(false);
          }}
          itemName={"kandidat"}
          loading={loadingDelete}
          disabled={!isAllowedToDeleteRecruitments}
        >
          <p>Apakah Anda yakin ingin menghapus kandidat berikut?</p>
          {selectedRecruitments.map((candidate, idx) => (
            <p key={candidate.id} className="font-bold">
              {idx + 1}. {candidate.name}
            </p>
          ))}
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

      {/* Modal Bulk */}
      <AccessControl
        hasPermission={[RECRUITMENT_UPDATE_STAGE, RECRUITMENT_UPDATE_STATUS]}
      >
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
            )}
          </div>
        </ModalCore>
      </AccessControl>

      {/* Modal/Drawer Send Access Verification */}
      <AccessControl hasPermission={RECRUITMENT_ACCOUNT_GENERATE}>
        {dataRowClicked.owner_id === null ? (
          <ModalCore
            title={`Apakah Anda yakin ingin memberikan 
            akses ke ${dataRowClicked.name}?`}
            visible={modalSendAccess}
            onCancel={() => {
              setModalSendAccess(false);
            }}
            footer={
              <Spin spinning={loadingCreate}>
                <div className="flex justify-end">
                  <ButtonSys
                    type={"primary"}
                    onClick={() => {
                      handleGenerateRecruitmentAccount(dataRowClicked.id);
                    }}
                    disabled={!isAllowedToGenerateRecruitmentAccount}
                  >
                    Ya, Saya Yakin
                  </ButtonSys>
                </div>
              </Spin>
            }
          >
            <div className="flex flex-col space-y-6">
              <div className="grid grid-cols-2 ">
                <p>Nama</p>
                <p>: {dataRowClicked.name}</p>
                <p>Role</p>
                <p>: {dataRowClicked.role?.name}</p>
                <p>Email</p>
                <p>: {dataRowClicked.email}</p>
              </div>
              <p className="text-center">
                Dengan mengklik tombol <strong>Ya, Saya Yakin</strong>, tautan
                verifikasi akan dikirimkan ke email&nbsp;
                <strong>{dataRowClicked.name}</strong>
              </p>
            </div>
          </ModalCore>
        ) : (
          <DrawerCore
            title={`Tautan Verifikasi`}
            visible={modalSendAccess}
            onClose={() => {
              setModalSendAccess(false);
              setVerificationLink("");
            }}
            footer={null}
          >
            <div className="flex flex-col space-y-6">
              {loadingLink ? (
                <Spin />
              ) : (
                <div className="grid grid-cols-2 ">
                  <p>Nama</p>
                  <div className="flex flex-row space-x-3">
                    <p>:</p>
                    <p>{dataRowClicked.name}</p>
                  </div>
                  <p>Role</p>
                  <div className="flex flex-row space-x-3">
                    <p>:</p>
                    <p>{dataRowClicked.role?.name}</p>
                  </div>
                  <p>Email</p>
                  <div className="flex flex-row space-x-3">
                    <p>:</p>
                    <p className="break-all">{dataRowClicked.email}</p>
                  </div>
                  <p>Tautan Verifikasi</p>
                  {verificationLink.length !== 0 ? (
                    <>
                      <div className="flex flex-row items-center space-x-1">
                        <p className="mr-2">:</p>
                        <a
                          href={verificationLink}
                          target="_blank"
                          className={"truncate "}
                        >
                          {verificationLink}
                        </a>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(verificationLink);
                            notification.success({
                              message: "Link berhasil disalin!",
                              duration: 3,
                            });
                          }}
                        >
                          <CopyIconSvg size={12} color={"#30378F"} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-row ">
                      <p className="mr-3">:</p>
                      <p>Token sudah hangus, kandidat sudah set password.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DrawerCore>
        )}
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
