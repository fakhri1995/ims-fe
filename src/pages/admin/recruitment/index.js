import {
  AppstoreOutlined,
  ArrowDownOutlined,
  CloseOutlined,
  DownOutlined,
  MailOutlined,
  SearchOutlined,
} from "@ant-design/icons";
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
  Switch,
  Table,
  Tooltip as TooltipNew,
  notification,
} from "antd";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import QueryString from "qs";
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
  RECRUITMENTS_UPDATE_STAGE,
  RECRUITMENTS_UPDATE_STATUS,
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
  RECRUITMENT_UPDATE_STAGE,
  RECRUITMENT_UPDATE_STATUS,
  SIDEBAR_RECRUITMENT_SETUP,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import SettingsIcon from "assets/vectors/icon-settings.svg";

import ButtonSys from "../../../components/button";
import ButtonTooltip from "../../../components/buttonTooltip";
import DrawerCore from "../../../components/drawer/drawerCore";
import DrawerCandidateCreate from "../../../components/drawer/recruitment/drawerCandidateCreate";
import DrawerCandidatePreview from "../../../components/drawer/recruitment/drawerCandidatePreview";
import DrawerCandidateSendEmail from "../../../components/drawer/recruitment/drawerCandidateSendEmail";
import {
  CheckIconSvg,
  CopyIconSvg,
  DownloadIconSvg,
  EyeIconSvg,
  FileExcelSvg,
  FileExportIconSvg,
  FilePlusIconSvg,
  InfoSquareIconSvg,
  LinkIconSvg,
  MailForwardIconSvg,
  PlusIconSvg,
  SearchIconSvg,
  TrashIconSvg,
  TrendingUpIconSvg,
  UserPlusIconSvg,
} from "../../../components/icon";
import Layout from "../../../components/layout-dashboard-management";
import st from "../../../components/layout-dashboard-management.module.css";
import ModalCore from "../../../components/modal/modalCore";
import { ModalHapus2, ModalUbah } from "../../../components/modal/modalCustom";
import HeaderCandidate from "../../../components/screen/recruitment/headercandidate";
import RecruitmentNewCandidate from "../../../components/screen/recruitment/newcandidate";
import SearchCandidate from "../../../components/screen/recruitment/searchcandidate";
import TabCandidate from "../../../components/screen/recruitment/tabcandidate";
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
  // 1. Init
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
  const isAllowedToDeleteRecruitments = hasPermission(RECRUITMENTS_DELETE);
  const isAllowedToGetRecruitmentCount = hasPermission(RECRUITMENT_COUNT_GET);

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

  const canUpdateStages = hasPermission(RECRUITMENTS_UPDATE_STAGE);
  const canUpdateStatuses = hasPermission(RECRUITMENTS_UPDATE_STATUS);

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

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    recruitment_role_id: withDefault(NumberParam, undefined),
    recruitment_stage_id: withDefault(NumberParam, undefined),
    recruitment_status_id: withDefault(NumberParam, undefined),
  });

  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 1, "Rekrutmen");

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
  const [selectedRoleId, setSelectedRoleId] = useState(undefined);
  const [selectedStage, setSelectedStage] = useState(undefined);
  const [selectedStatus, setSelectedStatus] = useState(undefined);

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

  const [loadingLink, setLoadingLink] = useState(false);
  const [verificationLink, setVerificationLink] = useState("");

  // 2.4 Update Stage & Status
  const [isAddNote, setIsAddNote] = useState(false);
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
  const [tabActive, setTabActive] = useState("done");
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

    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const fetchData = async () => {
      setLoadingRecruitments(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitments${payload}&keyword=${searchingFilterRecruitments}`,
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

    const timer = setTimeout(() => fetchData(), 500);
    return () => clearTimeout(timer);
  }, [
    isAllowedToGetRecruitments,
    refresh,
    searchingFilterRecruitments,
    queryParams.page,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
    queryParams.recruitment_role_id,
    queryParams.recruitment_stage_id,
    queryParams.recruitment_status_id,
  ]);

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

  // 3.6. Set options in import excel
  useEffect(() => {
    let roleOptions = dataRoleList.map((role) => {
      let newOption = {
        label: role.name,
        value: role.id,
      };
      return newOption;
    });

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
    setQueryParams({
      recruitment_role_id: selectedRoleId,
      recruitment_stage_id: selectedStage,
      recruitment_status_id: selectedStatus,
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

    if (!canUpdateStages) {
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

    if (!canUpdateStatuses) {
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
    <Menu style={{ minWidth: 200 }}>
      <Menu.Item key={"insert_candidate"}>
        <button
          className="flex flex-row space-x-2 items-center 
					bg-transparent w-full px-2.5 py-2"
          onClick={() => {
            setCreateDrawerShown(true);
          }}
          disabled={!isAllowedToAddRecruitment}
        >
          <PlusIconSvg size={20} color="#4D4D4D" />
          <p
            className="mig-caption--medium text-mono30"
            style={{ whiteSpace: "nowrap" }}
          >
            Tambah Perorangan
          </p>
        </button>
      </Menu.Item>

      <Menu.Item key={"insert_excel"}>
        <button
          className="flex flex-row space-x-2 items-center
					bg-transparent w-full px-2.5 py-2"
          onClick={() => setModalSheetImport(true)}
          disabled={!isAllowedToAddRecruitments}
        >
          <img className={"h-4 w-4"} src={"/image/file-excel-2-line.svg"} />
          <p
            className="mig-caption--medium text-mono30 text-nowrap"
            style={{ whiteSpace: "nowrap" }}
          >
            Masukkan dari Excel
          </p>
        </button>
      </Menu.Item>

      {/* <Menu.Item key={"download_template"}>
        <button
          className="flex flex-row space-x-2 items-center 
					bg-transparent w-full px-2.5 py-2"
          onClick={handleDownloadExcelTemplate}
          disabled={!isAllowedToDownloadTemplate}
        >
          <DownloadIconSvg size={20} color="#4D4D4D" />
          <p className="mig-caption--medium text-mono30" style={{ whiteSpace: 'nowrap' }}>
            Unduh Template Excel
          </p>
        </button>
      </Menu.Item> */}
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
          disabled={!canUpdateStages}
        >
          <TrendingUpIconSvg size={16} />
          <p
            className={
              canUpdateStages
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
          disabled={!canUpdateStatuses}
        >
          <InfoSquareIconSvg size={16} />
          <p
            className={
              canUpdateStatuses
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
            style={{ whiteSpace: "nowrap" }}
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
          children: <>{record.role?.role}</>,
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
      title: "Action",
      key: "button_action",
      render: (text, record) => {
        return {
          children: (
            <div className="flex flex-row gap-1">
              <div
                className={`flex w-7 h-7 justify-center ${
                  !isAllowedToGetRecruitment
                    ? "cursor-not-allowed opacity-50"
                    : "hover:cursor-pointer"
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  rt.push(`/admin/recruitment/${record.id}`);
                }}
              >
                <SearchIconSvg size={20} color={"#808080"} />
              </div>
              <div
                className={`flex w-7 h-7 justify-center ${
                  !isAllowedToSendEmailRecruitment
                    ? "cursor-not-allowed opacity-50"
                    : "hover:cursor-pointer"
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  setDataRowClicked(record);
                  setEmailDrawerShown(true);
                }}
              >
                <MailForwardIconSvg size={20} color={"#35763B"} />
              </div>

              {record.user?.is_enabled === 0 ? (
                <></>
              ) : (
                <TooltipNew
                  placement="bottom"
                  title={
                    record.owner_id
                      ? "Sudah diberi akses"
                      : "Belum diberi akses"
                  }
                  color={record.owner_id ? "#DDB44A" : "#00589F"}
                >
                  <div
                    className={`flex w-7 h-7 justify-center ${
                      !isAllowedToGenerateRecruitmentAccount
                        ? "cursor-not-allowed opacity-50"
                        : "hover:cursor-pointer"
                    }`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setDataRowClicked(record);
                      setModalSendAccess(true);
                    }}
                  >
                    <LinkIconSvg size={20} color={"#00589F"} />
                  </div>
                </TooltipNew>
              )}
            </div>
          ),
        };
      },
    },
  ];

  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    // console.log("click", e);
  };

  const items = [
    {
      label: "1st menu item",
      key: "1",
    },
    {
      label: "2nd menu item",
      key: "2",
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="flex flex-col" id="mainWrapper">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            className="lg:col-span-3 flex flex-row items-center w-full 
						justify-between px-4 py-2 bg-white
						divide-x divide-gray-300 rounded-[10px] border border-neutrals70 shadow-desktopCard"
          >
            <div className="flex flex-col md:flex-row items-center md:justify-between w-full pr-8 ">
              <h5 className="font-semibold lg:mig-title-card">Jumlah Role</h5>
              <Spin spinning={loadingDataCount}>
                <p className="text-2xl lg:text-[32px] font-bold font-inter text-primary100 pl-2">
                  {dataCount.recruitment_roles_count}
                </p>
              </Spin>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between w-full pl-8">
              <h5 className="font-semibold lg:mig-title-card">
                Total Kandidat
              </h5>
              <Spin spinning={loadingDataCount}>
                <p className="text-2xl lg:text-[32px] font-bold font-inter text-secondary100 pl-2">
                  {dataCount.recruitments_count}
                </p>
              </Spin>
            </div>
          </div>
          {/* <AddNewFormButton
            icon={<SettingsIcon />}
            title="Kelola Rekrutmen"
            onButtonClicked={onManageRecruitmentButtonClicked}
            disabled={!isAllowedToSetupRecruitment}
          /> */}
          {/* <div className={"lg:col-span-3 flex justify-center"}>
            <div
              className={
                "bg-primary100 rounded-md flex gap-3 self-center p-1 my-4"
              }
            >
              <div
                onClick={() => setTabActive("done")}
                className={`${
                  tabActive == "done" ? "bg-white" : "bg-primary100"
                } p-2 rounded-md hover:cursor-pointer`}
              >
                <p
                  className={`${
                    tabActive == "done" ? "text-black" : "text-white"
                  } text-sm font-semibold `}
                >
                  Validated Candidates
                </p>
              </div>
              <div
                onClick={() => setTabActive("new")}
                className={`${
                  tabActive == "new" ? "bg-white" : "bg-primary100"
                } p-2 rounded-md hover:cursor-pointer`}
              >
                <p
                  className={`${
                    tabActive == "new" ? "text-black" : "text-white"
                  } text-sm font-semibold`}
                >
                  Unvalidated Candidates
                </p>
              </div>
            </div>
          </div> */}

          {/* Table Kandidat */}
          {tabActive == "done" ? (
            <div className="lg:col-span-3 flex flex-col rounded-[10px] border border-neutrals70 shadow-desktopCard bg-white mb-6">
              <HeaderCandidate
                isBulk={isBulk}
                dropdownMenu={dropdownMenu}
                isAllowedToAddRecruitment={isAllowedToAddRecruitment}
                setBulk={setBulk}
                setSelectedRecruitments={setSelectedRecruitments}
                setSelectedRecruitmentIds={setSelectedRecruitmentIds}
                setDataUpdateStage={setDataUpdateStage}
                setDataUpdateStatus={setDataUpdateStatus}
                bulkMenu={bulkMenu}
                selectedRecruitments={selectedRecruitments}
                onButtonClicked={onManageRecruitmentButtonClicked}
                downloadClicked={() => handleDownloadExcelTemplate()}
              />

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
              <TabCandidate activeTab={tabActive} setActiveTab={setTabActive} />
              {/* Start: Search criteria */}
              <SearchCandidate
                searchingFilterRecruitments={searchingFilterRecruitments}
                setSearchingFilterRecruitments={setSearchingFilterRecruitments}
                setQueryParams={setQueryParams}
                onKeyPressHandler={onKeyPressHandler}
                isAllowedToGetRecruitments={isAllowedToGetRecruitments}
                queryParams={queryParams}
                isAllowedToGetRecruitmentRolesList={
                  isAllowedToGetRecruitmentRolesList
                }
                setSelectedRoleId={setSelectedRoleId}
                dataRoleList={dataRoleList}
                isAllowedToGetRecruitmentStagesList={
                  isAllowedToGetRecruitmentStagesList
                }
                setSelectedStage={setSelectedStage}
                dataStageList={dataStageList}
                isAllowedToGetRecruitmentStatusesList={
                  isAllowedToGetRecruitmentStatusesList
                }
                setSelectedStatus={setSelectedStatus}
                dataStatusList={dataStatusList}
                onFilterRecruitments={onFilterRecruitments}
              />
              {/* End: Search criteria */}

              <div className={"px-4"}>
                <TableCustomRecruitmentCandidate
                  dataSource={dataRecruitments}
                  columns={columnRecruitment}
                  loading={loadingRecruitments}
                  total={dataRawRecruitments?.total}
                  isBulk={isBulk}
                  setSelectedRecruitments={setSelectedRecruitments}
                  setSelectedRecruitmentIds={setSelectedRecruitmentIds}
                  setDrawerShown={setPreviewDrawerShown}
                  tempIdClicked={tempIdClicked}
                  setTriggerRowClicked={setTriggerRowClicked}
                  queryParams={queryParams}
                  setQueryParams={setQueryParams}
                />
              </div>
            </div>
          ) : (
            <RecruitmentNewCandidate
              setSelectedStatus={setSelectedStatus}
              onFilterRecruitments={onFilterRecruitments}
              handleCreateRecruitments={handleCreateRecruitments}
              menuProps={menuProps}
              setCreateDrawerShown={setCreateDrawerShown}
              setSelectedRoleId={setSelectedRoleId}
              dataRoleList={dataRoleList}
              setDataUpdateStage={setDataUpdateStage}
              dataUpdateStage={dataUpdateStage}
              refresh={refresh}
              isAllowedToGetRecruitmentRolesList={
                isAllowedToGetRecruitmentRolesList
              }
              isAllowedToGetRecruitmentStagesList={
                isAllowedToGetRecruitmentStagesList
              }
              setSelectedStage={setSelectedStage}
              dataStageList={dataStageList}
              isAllowedToGetRecruitmentStatusesList={
                isAllowedToGetRecruitmentStatusesList
              }
              dataStatusList={dataStatusList}
              isAllowedToGetRecruitments={isAllowedToGetRecruitments}
              isBulk={isBulk}
              setSelectedRecruitments={setSelectedRecruitments}
              setSelectedRecruitmentIds={setSelectedRecruitmentIds}
              setPreviewDrawerShown={setPreviewDrawerShown}
              tempIdClicked={tempIdClicked}
              dataRoleOptions={dataRoleOptions}
              dataJalurDaftarOptions={dataJalurDaftarOptions}
              dataStageOptions={dataStageOptions}
              dataStatusOptions={dataStatusOptions}
              onKeyPressHandler={onKeyPressHandler}
              initProps={initProps}
              setDataUpdateStatus={setDataUpdateStatus}
              dataUpdateStatus={dataUpdateStatus}
              setModalUpdateStatus={setModalUpdateStatus}
              setModalUpdateStage={setModalUpdateStage}
              tabActive={tabActive}
              setTabActive={setTabActive}
            />
          )}
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
      <AccessControl
        hasPermission={[RECRUITMENT_UPDATE_STAGE, RECRUITMENTS_UPDATE_STAGE]}
      >
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
              <div className="flex flex-row items-center space-x-2">
                <p>Tambah catatan:</p>
                <Switch
                  defaultChecked={false}
                  onChange={(checked) => {
                    setIsAddNote(checked);
                  }}
                />
              </div>

              {isAddNote && (
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
              )}

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
              <div className="flex flex-row items-center space-x-2">
                <p>Tambah catatan:</p>
                <Switch
                  defaultChecked={false}
                  onChange={(checked) => {
                    setIsAddNote(checked);
                  }}
                />
              </div>

              {isAddNote && (
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
              )}
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
              <div className="flex flex-row items-center space-x-2">
                <p>Tambah catatan:</p>
                <Switch
                  defaultChecked={false}
                  onChange={(checked) => {
                    setIsAddNote(checked);
                  }}
                />
              </div>

              {isAddNote && (
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
              )}

              <div className="flex flex-wrap space-x-1">
                <p>Apakah Anda yakin ingin mengubah status menjadi</p>
                <strong>{dataUpdateStatus.recruitment_status_name}</strong>?
              </div>
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
              <div className="flex flex-row items-center space-x-2">
                <p>Tambah catatan:</p>
                <Switch
                  defaultChecked={false}
                  onChange={(checked) => {
                    setIsAddNote(checked);
                  }}
                />
              </div>

              {isAddNote && (
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
              )}
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
                  disabled={
                    bulkMode === "stage"
                      ? !dataUpdateStage.recruitment_stage_id
                      : !dataUpdateStatus.recruitment_status_id
                  }
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
                pagination={false}
                scroll={{
                  y: 150,
                }}
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
      <AccessControl
        hasPermission={[
          RECRUITMENT_ACCOUNT_GENERATE,
          RECRUITMENT_ACCOUNT_TOKEN_GET,
        ]}
      >
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
