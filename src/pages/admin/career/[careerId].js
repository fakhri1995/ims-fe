import { CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  Button,
  Drawer,
  Input,
  Select,
  Spin,
  Switch,
  Table,
  Tabs,
  Tag,
  Timeline,
  notification,
} from "antd";
import axios from "axios";
import parse from "html-react-parser";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import Link from "next/link";
import { useRouter } from "next/router";
import QueryString from "qs";
import React from "react";
import { useEffect, useState } from "react";

import { AccessControl } from "components/features/AccessControl";
import ResumePDFTemplate from "components/screen/resume/ResumePDFTemplate";

import { useAccessControl } from "contexts/access-control";

import {
  CAREERS_V2_APPLY_STATUSES,
  CAREERS_V2_GET,
  CAREER_UPDATE,
  CAREER_V2_APPLY_EXPORT,
  CAREER_V2_APPLY_UPDATE,
  CAREER_V2_GET,
  RECRUITMENT_ROLE_TYPES_LIST_GET,
  RESUME_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import ButtonSys from "../../../components/button";
import DrawerInformationEdit from "../../../components/drawer/career/DrawerInformationEdit";
import DrawerQuestionEdit from "../../../components/drawer/career/DrawerQuestionEdit";
import {
  AddCareerIconSvg,
  CheckIconSvg,
  CloseIconSvg,
  DownIconSvg,
  DownloadIcon2Svg,
  DownloadIconSvg,
  EditSquareIconSvg,
  EyeIconSvg,
  SearchIconSvg,
  ShowCareerIconSvg,
  UpIconSvg,
  UserPlusIconSvg,
} from "../../../components/icon";
import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import ModalCore from "../../../components/modal/modalCore";
import { ModalEkspor, ModalUbah } from "../../../components/modal/modalCustom";
import {
  createKeyPressHandler,
  downloadFile,
  generateStaticAssetUrl,
  getNameInitial,
  momentFormatDate,
} from "../../../lib/helper";
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
const { TabPane } = Tabs;

const CareerDetailIndex = ({ initProps, dataProfile, sidemenu, careerId }) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  //INIT
  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 2);
  pathTitleArr.splice(1, 2, "Career Management", "Detail Lowongan Kerja");

  const [refresh, setRefresh] = useState(-1);
  const isAllowedToGetStatusApply = hasPermission(CAREERS_V2_APPLY_STATUSES);
  const isAllowedToGetCareer = hasPermission(CAREERS_V2_GET);
  const isAllowedToGetDetailCareer = hasPermission(CAREERS_V2_GET);
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    career_id: withDefault(NumberParam, careerId),
    has_career: withDefault(NumberParam, 1),
    keyword: withDefault(StringParam, undefined),
    career_apply_status_id: withDefault(NumberParam, undefined),
  });
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [disableUpdate, setDisableUpdate] = useState(false);
  const [loadingEkspor, setLoadingEkspor] = useState(false);
  const [disableEkspor, setDisableEkspor] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(undefined);
  const [selectedName, setSelectedName] = useState(undefined);
  const [showCollapsible, setShowCollapsible] = useState(true);
  const canDownloadResume = hasPermission(RESUME_GET);
  const [loadingCareers, setLoadingCareers] = useState(true);
  const [dataStatusApply, setDataStatusApply] = useState([]);
  const [dataCareers, setDataCareers] = useState([]);
  const [tabActiveKey, setTabActiveKey] = useState("1");
  const currencyI18n = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const [isOnClient, setIsOnClient] = useState(false);
  const [detailCareer, setDetailCareer] = useState(null);
  const [dataRawRCareers, setDataRawCareers] = useState({
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
  const [drawedit, setdrawedit] = useState(false);
  const [loadingedit, setloadingedit] = useState(false);
  const [dataedit, setdataedit] = useState({
    id: 0,
    name: "",
    description: "",
    question: [],
  });

  const [draweditinformation, setdraweditinformation] = useState(false);
  const [loadingeditinformation, setloadingeditinformation] = useState(false);
  const [dataeditinformation, setdataeditinformation] = useState({
    id: 0,
    name: "",
    description: "",
    qualification: "",
    overview: "",
    salary_min: 0,
    salary_max: 0,
    career_role_type_id: null,
    career_experience_id: null,
    recruitment_role_id: null,
    is_posted: 0,
  });
  // 2.3. Download Resume
  const [candidateId, setCandidateId] = useState(null);
  const [resumeLink, setResumeLink] = useState(null);
  const [dataResume, setDataResume] = useState();
  const [loadingResumeData, setLoadingResumeData] = useState(false);
  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const [showLogoStatus, setShowLogoStatus] = useState(true);
  const [drawDetailPelamar, setDrawDetailPelamar] = useState(false);
  const [dataTerpilih, setDataTerpilih] = useState(null);
  const canUpdateStatuses = hasPermission(CAREER_V2_APPLY_UPDATE);
  const canExportCandidate = hasPermission(CAREER_V2_APPLY_EXPORT);
  const isAllowedToGetRoleTypeList = hasPermission(
    RECRUITMENT_ROLE_TYPES_LIST_GET
  );
  const [dataUpdateStatus, setDataUpdateStatus] = useState({
    id: null,
    recruitment_status_id: null,
    name: "",
    prev_recruitment_status_name: "",
    recruitment_status_name: "",
  });
  const [dataExportStatus, setDataExportStatus] = useState({
    id: null,
    name: "",
  });
  const [modalUpdateStatus, setModalUpdateStatus] = useState(false);
  const [modalExportStatus, setModalExportStatus] = useState(false);
  const [countQuestion, setCountQuestion] = useState(0);
  const [dataRoleTypeList, setDataRoleTypeList] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  const [dataTalent, setDataTalent] = useState({
    id: 1,
    name: "Yasmin A",
    telp: "0888881",
    email: "yasminadelia@mitrasolusi.group",
    city: "Bogor",
    province: "Jawa Barat",
    assessment_id: 1,
    created_at: "2023-06-09 10:52:00",
    updated_at: "2024-03-06 15:45:40",
    created_by: 26,
    deleted_at: null,
    owner_id: 26,
    educations: [
      {
        id: 18,
        university: "Harvard",
        major: "S2",
        gpa: "3.33",
        start_date: null,
        end_date: null,
        graduation_year: null,
        resume_id: 1,
        display_order: 1,
        start_date_format: null,
        end_date_format: null,
      },
      {
        id: 22,
        university: "testt",
        major: "www",
        gpa: null,
        start_date: "2023-02-01",
        end_date: null,
        graduation_year: null,
        resume_id: 1,
        display_order: 2,
        start_date_format: "2023-02",
        end_date_format: null,
      },
      {
        id: 20,
        university: "MIT",
        major: "S23 Ultra",
        gpa: "3.33",
        start_date: null,
        end_date: "2023-03-31",
        graduation_year: null,
        resume_id: 1,
        display_order: 3,
        start_date_format: null,
        end_date_format: "2023-03",
      },
      {
        id: 19,
        university: "Stanford",
        major: "S3",
        gpa: null,
        start_date: "2023-02-01",
        end_date: "2024-04-30",
        graduation_year: null,
        resume_id: 1,
        display_order: 4,
        start_date_format: "2023-02",
        end_date_format: "2024-04",
      },
    ],
    experiences: [
      {
        id: 22,
        role: "QA",
        company: "MIG",
        start_date: "2023-12-08",
        end_date: "0000-00-00",
        description: "<p>deskripsi</p>",
        resume_id: 1,
        display_order: 1,
      },
      {
        id: 4,
        role: "testt baru update",
        company: "ccc",
        start_date: "2023-12-01",
        end_date: "0000-00-00",
        description:
          '<ul><li>dess</li><li>tess</li><li class="ql-indent-1">tess</li></ul>',
        resume_id: 1,
        display_order: 2,
      },
      {
        id: 3,
        role: "test update",
        company: "company3",
        start_date: "2023-05-02",
        end_date: "0000-00-00",
        description: "<p>testt</p>",
        resume_id: 1,
        display_order: 3,
      },
    ],
    projects: [
      {
        id: 2,
        name: "project 2 upp",
        year: "2021-09-21",
        description: "test lagi",
        resume_id: 1,
        display_order: 1,
      },
      {
        id: 1,
        name: "project 1",
        year: "2020-09-21",
        description: "testt",
        resume_id: 1,
        display_order: 2,
      },
      {
        id: 3,
        name: "project 32",
        year: "2022-09-21",
        description: "yoooo",
        resume_id: 1,
        display_order: 3,
      },
      {
        id: 12,
        name: "proyek pembangunan negeri",
        year: "2020-12-11",
        description:
          '<ul><li>satu</li><li>dua</li></ul><p><u>underline </u><em>italic </em><strong>bold </strong><a href="http://localhost:3000/admin/candidates/1" rel="noopener noreferrer" target="_blank">link</a></p>',
        resume_id: 1,
        display_order: 4,
      },
    ],
    skills: [
      {
        id: 3,
        name: "React",
        resume_id: 1,
      },
      {
        id: 4,
        name: "TailwindCSS",
        resume_id: 1,
      },
      {
        id: 5,
        name: "Javascript",
        resume_id: 1,
      },
      {
        id: 22,
        name: "Apache",
        resume_id: 1,
      },
    ],
    trainings: [
      {
        id: 3,
        name: "test6",
        organizer: "rrr",
        year: "2020-09-25",
        resume_id: 1,
        display_order: 1,
      },
      {
        id: 2,
        name: "trainq",
        organizer: "comp",
        year: "2021-09-25",
        resume_id: 1,
        display_order: 2,
      },
      {
        id: 7,
        name: "yyy",
        organizer: "yy",
        year: "2021-09-26",
        resume_id: 1,
        display_order: 3,
      },
      {
        id: 10,
        name: "aaa",
        organizer: "aaaa",
        year: "2020-12-18",
        resume_id: 1,
        display_order: 4,
      },
    ],
    certificates: [
      {
        id: 5,
        name: "rrrw",
        organizer: "hhh",
        year: "2020-09-26",
        resume_id: 1,
        display_order: 1,
      },
      {
        id: 2,
        name: "cert36",
        organizer: "comp",
        year: "2020-09-25",
        resume_id: 1,
        display_order: 2,
      },
      {
        id: 7,
        name: "sss",
        organizer: "aa",
        year: "2023-12-18",
        resume_id: 1,
        display_order: 3,
      },
    ],
    achievements: [
      {
        id: 1,
        name: "adddtt",
        organizer: "fff",
        year: "2020-09-21",
        resume_id: 1,
        display_order: 1,
      },
      {
        id: 4,
        name: "weewww",
        organizer: "qqqq",
        year: "2020-09-26",
        resume_id: 1,
        display_order: 2,
      },
      {
        id: 5,
        name: "testt",
        organizer: "yyy",
        year: "2020-09-26",
        resume_id: 1,
        display_order: 3,
      },
    ],
    assessment: {
      id: 1,
      name: "Frontend Developer",
      created_at: "2023-06-09 10:51:08",
      updated_at: "2024-02-29 08:54:36",
    },
    assessment_results: [
      {
        id: 232,
        criteria: "HTML",
        value: "",
        resume_id: 1,
      },
      {
        id: 233,
        criteria: "CSS",
        value: "",
        resume_id: 1,
      },
      {
        id: 234,
        criteria: "JS",
        value: "",
        resume_id: 1,
      },
    ],
    summaries: {
      id: 3,
      description:
        '<p>test <strong>bold </strong><em>italic </em><u>underline </u><a href="https://developers.google.com/fonts/docs/developer_api?apix_params=%7B%22sort%22%3A%22ALPHA%22%7D" rel="noopener noreferrer" target="_blank">link</a></p>',
      resume_id: 1,
    },
    profile_image: {
      id: 0,
      link: "staging/Users/default_user.png",
      description: "profile_image",
    },
  });
  const [dataExperience, setDataExperience] = useState([
    {
      id: 1,
      name: "0 - 1 Tahun",
    },
    {
      id: 2,
      name: "1 - 3 Tahun",
    },
    {
      id: 3,
      name: "3 - 5 Tahun",
    },
    {
      id: 4,
      name: "Lebih dari 5 Tahun",
    },
  ]);

  const onFilterRecruitments = () => {
    setQueryParams({
      career_apply_status_id: selectedStatus,
      keyword: selectedName,
    });
  };

  const downloadNoData = () => {
    notification.error({
      message: `Pelamar tidak punya file resume`,
      duration: 3,
    });
  };

  // "Semua Kandidat" Table's columns
  const columnRecruitment = [
    {
      title: "No",
      key: "number",
      dataIndex: "num",
      onCell: (record) => {
        return {
          onClick: (event) => {
            event.stopPropagation(); // this will avoid onRow being called
            handleClickDetailPelamar(record);
          },
        };
      },
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex justify-center cursor-pointer">
              {dataRawRCareers?.from + index}
            </div>
          ),
        };
      },
    },
    {
      title: "Tanggal Melamar",
      key: "created_at",
      dataIndex: "created_at",
      onCell: (record) => {
        return {
          onClick: (event) => {
            event.stopPropagation(); // this will avoid onRow being called
            handleClickDetailPelamar(record);
          },
        };
      },
      render: (text, record, index) => {
        return {
          children: (
            <div className={"cursor-pointer"}>
              {moment(text).format("DD MMMM YYYY")}
            </div>
          ),
        };
      },
    },
    {
      title: "Nama Pelamar",
      key: "name",
      dataIndex: "name",
      onCell: (record) => {
        return {
          onClick: (event) => {
            event.stopPropagation(); // this will avoid onRow being called
            handleClickDetailPelamar(record);
          },
        };
      },
      render: (text, record, index) => {
        return {
          children: (
            <div className="xl:w-40 cursor-pointer">
              {record.name ? record.name : ""}
            </div>
          ),
        };
      },
      sorter: isAllowedToGetCareer
        ? (a, b) => a.name?.toLowerCase() > b.name?.toLowerCase()
        : false,
    },
    {
      title: "Kontak Pelamar",
      key: "phone",
      dataIndex: "phone",
      onCell: (record) => {
        return {
          onClick: (event) => {
            event.stopPropagation(); // this will avoid onRow being called
            handleClickDetailPelamar(record);
          },
        };
      },
      render: (text, record, index) => {
        return {
          children: <div className={"cursor-pointer"}>{text}</div>,
        };
      },
    },
    {
      title: "Email Pelamar",
      key: "email",
      dataIndex: "email",
      onCell: (record) => {
        return {
          onClick: (event) => {
            event.stopPropagation(); // this will avoid onRow being called
            handleClickDetailPelamar(record);
          },
        };
      },
      render: (text, record, index) => {
        return {
          children: <div className={"cursor-pointer"}>{text}</div>,
        };
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      onCell: (record) => {
        return {
          onClick: (event) => {
            event.stopPropagation(); // this will avoid onRow being called
            handleClickDetailPelamar(record);
          },
        };
      },
      render: (text, record, index) => {
        return {
          children: (
            <>
              <select
                value={record.status?.id}
                className="rounded-md py-1 hover:cursor-pointer bg-bgstatuscareer2 px-2 customcareerselectstatus"
                onClick={(e) => e.stopPropagation()}
                onChange={(event) => {
                  setDataUpdateStatus({
                    ...dataUpdateStatus,
                    id: record.id,
                    name: record.name,
                    prev_recruitment_status_name: record.status.name,
                    recruitment_status_name:
                      event.target.selectedOptions[0].text,
                    recruitment_status_id: Number(event.target.value),
                  });
                  setDataTerpilih(null);
                  setModalUpdateStatus(true);
                }}
                style={{
                  backgroundColor:
                    record.status?.id == 1
                      ? "#4D4D4D1A"
                      : record.status?.id == 2
                      ? "#35763B"
                      : "#BF4A40",
                  color: record.status?.id != 1 ? "white" : "#4D4D4D",
                }}
              >
                {dataStatusApply.map((status) => (
                  <option
                    key={status.id}
                    value={status.id}
                    style={{
                      backgroundColor:
                        status.id == 1
                          ? "#4D4D4D1A"
                          : status?.id == 2
                          ? "#35763B"
                          : "#BF4A40",
                      color: status.id != 1 ? "white" : "#4D4D4D",
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
    },
    {
      title: "Action",
      key: "button_action",
      render: (text, record) => {
        return {
          // children: record.resume ? (
          //   <a
          //     download={record.name + ".pdf"}
          //     href={"https://cdn.mig.id/" + record.resume.link}
          //     target="_blank"
          //     rel="noopener noreferrer"
          //   >
          //     <ButtonSys type={"default"}>
          //       <DownloadOutlined />
          //     </ButtonSys>
          //   </a>
          // ) : (
          //   <ButtonSys type={"default"} onClick={() => downloadNoData()}>
          //     <DownloadOutlined />
          //   </ButtonSys>
          // ),
          children: (
            <div className={"flex flex-row gap-2.5"}>
              <div
                onClick={() => handleClickExportPelamar(record, "")}
                className={
                  "p-2 rounded-[5px] bg-bgstatustaskfinish flex justify-center items-center hover:cursor-pointer"
                }
              >
                <UserPlusIconSvg size={20} color={"#35763B"} />
              </div>
              <div
                onClick={() => handleClickDetailPelamar(record)}
                className={
                  "p-2 rounded-[5px] bg-mono100 flex justify-center items-center hover:cursor-pointer"
                }
              >
                <EyeIconSvg size={20} color={"#808080"} />
              </div>
            </div>
          ),
        };
      },
    },
  ];

  useEffect(() => {
    if (!isAllowedToGetRoleTypeList) {
      permissionWarningNotification("Mendapatkan", "Daftar Role");
      // setLoadingRoleTypeList(false);
      return;
    }

    // setLoadingRoleTypeList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRoles`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataRoles(res2.data.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        // setLoadingRoleTypeList(false);
      });
  }, [isAllowedToGetRoleTypeList]);

  //get data type role list
  useEffect(() => {
    if (!isAllowedToGetRoleTypeList) {
      permissionWarningNotification("Mendapatkan", "Daftar Tipe Role");
      // setLoadingRoleTypeList(false);
      return;
    }

    // setLoadingRoleTypeList(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRoleTypesList`,
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
          setDataRoleTypeList(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        // setLoadingRoleTypeList(false);
      });
  }, [isAllowedToGetRoleTypeList]);
  useEffect(() => {
    if (dataResume) {
      setIsOnClient(true);
    }
  }, [dataResume]);
  //get data type role list
  useEffect(() => {
    if (!isAllowedToGetStatusApply) {
      permissionWarningNotification("Mendapatkan", "Daftar Status Apply");
      // setLoadingRoleTypeList(false);
      return;
    }

    // setLoadingRoleTypeList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/getCareerApplyStatuses`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        // if (res2.success) {
        setDataStatusApply(res2);
        // } else {
        //     console.log('error apa ',res2)
        //     notification.error({
        //         message: `${res2.message}`,
        //         duration: 3,
        //     });
        // }
      })
      .catch((err) => {
        // notification.error({
        //     message: `${err.response}`,
        //     duration: 3,
        // });
      })
      .finally(() => {
        // setLoadingRoleTypeList(false);
      });
  }, [isAllowedToGetStatusApply]);

  //get detail career
  useEffect(() => {
    if (!isAllowedToGetDetailCareer) {
      permissionWarningNotification("Mendapatkan", "Detail Career");
      // setLoadingRoleTypeList(false);
      return;
    }
    // setLoadingRoleTypeList(true);
    getDetailCareer();
  }, [permissionWarningNotification]);

  const getDetailCareer = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/getCareer?id=${careerId}`,
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
          setDetailCareer(res2.data);
          if (res2.data.question != null) {
            setCountQuestion(res2.data.question.details.length);
          }
        }
      })
      .catch((err) => {
        // notification.error({
        //     message: `${err.response}`,
        //     duration: 3,
        // });
      })
      .finally(() => {
        // setLoadingRoleTypeList(false);
      });
  };

  useEffect(() => {
    if (!isAllowedToGetCareer) {
      permissionWarningNotification("Mendapatkan", "Daftar Lowongan");
      setLoadingCareers(false);
      return;
    }

    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const fetchData = async () => {
      getCareers(payload);
    };

    const timer = setTimeout(() => fetchData(), 500);
    return () => clearTimeout(timer);
  }, [
    isAllowedToGetCareer,
    refresh,
    queryParams.page,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
    queryParams.career_apply_status_id,
    queryParams.keyword,
  ]);

  const getCareers = (params) => {
    setLoadingCareers(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/getCareerApplys${params}`,
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
          setDataRawCareers(res2.data);
          setDataCareers(res2.data.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingCareers(false);
      });
  };

  //download resume data
  useEffect(() => {
    let url_new = "https://cdn.mig.id/";
    if (resumeLink) {
      setLoadingResumeData(true);
      fetch(`${url_new}${resumeLink}`, {
        method: `GET`,
        headers: {
          "Content-Type": "application/pdf",
        },
        headers: {
          Origin: location.origin,
        },
        mode: "cors",
      })
        .then((response) => response.blob())
        .then((response2) => {
          const url = window.URL.createObjectURL(new Blob([response2]));

          const link = document.createElement("a");
          link.href = url;
          link.download = fileName;

          document.body.appendChild(link);

          link.click();

          link.parentNode.removeChild(link);
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
          setLoadingResumeData(false);
        });
    }
  }, [resumeLink]);

  //get resume data
  useEffect(() => {
    if (!canDownloadResume) {
      permissionWarningNotification("Mengunduh", "PDF Resume");
      setLoadingResumeData(false);
      return;
    }

    if (candidateId) {
      setLoadingResumeData(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getResume?id=${candidateId}`,
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
            setDataResume(response2.data);
            setLoadingResumeData(false);
          } else {
            notification.error({
              message: `${response2.message}`,
              duration: 3,
            });
            setLoadingResumeData(false);
          }
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
          setLoadingResumeData(false);
        });
    }
  }, [canDownloadResume, candidateId]);

  const handleClickDetailPelamar = (record) => {
    setDataTerpilih(record);
    setDrawDetailPelamar(true);
  };

  const handleClickExportPelamar = (record, jenis) => {
    if (jenis != "terpilih") {
      setDataTerpilih(null);
    }
    setDataExportStatus({
      id: record.id,
      name: record.name,
    });
    setModalExportStatus(true);
  };

  const handleUpdateExport = () => {
    const payload = {
      id: dataExportStatus.id,
    };

    if (!canExportCandidate) {
      permissionWarningNotification("Mengekspor", "Data Kandidat");
      setLoadingEkspor(false);
      return;
    }

    setLoadingEkspor(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/exportCareerApply`, {
      method: "POST",
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
            setDataExportStatus({});
            if (dataTerpilih) {
              setDataTerpilih({
                ...dataTerpilih,
                status: {
                  id: 2,
                  name: "Shortlisted",
                  display_oder: 2,
                },
              });
            }
          }, 1500);
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
        } else {
          notification["error"]({
            message: `Gagal mengekspor data kandidat. ${res2.message}`,
            duration: 3,
          });
        }
        setLoadingEkspor(false);
        setModalExportStatus(false);
      })
      .catch((err) => {
        setLoadingEkspor(false);
        notification["error"]({
          message: `Gagal mengekspor data kandidat. ${err.message}`,
          duration: 3,
        });
      });
  };

  const handleUpdateStatus = () => {
    const payload = {
      id: dataUpdateStatus.id,
      career_id: careerId,
      career_apply_status_id: dataUpdateStatus.recruitment_status_id,
    };

    if (!canUpdateStatuses) {
      permissionWarningNotification("Mengubah", "Status Kandidat");
      setLoadingUpdate(false);
      return;
    }

    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/updateCareerApply`, {
      method: "POST",
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
            if (dataTerpilih) {
              setDataTerpilih({
                ...dataTerpilih,
                status: {
                  id: dataUpdateStatus.recruitment_status_id,
                  name: dataUpdateStatus.recruitment_status_name,
                  display_order: dataUpdateStatus.recruitment_status_id,
                },
              });
            }
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
  const handleUpdateQuestion = () => {
    setloadingedit(true);
    let dataUpdateQuestion = {
      id: dataedit.id,
      name: dataedit.name,
      description: dataedit.description,
      details: dataedit.question,
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/updateCareerQuestion`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUpdateQuestion),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setdataedit({
            id: 0,
            name: "",
            description: "",
            question: [],
          });
          setloadingedit(false);
          setdrawedit(false);
          getDetailCareer();
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
          setloadingedit(false);
          setdrawedit(false);
        }
      });
  };

  const handleEditInformation = () => {
    setloadingeditinformation(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/updateCareer`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataeditinformation),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setdataeditinformation({
            id: 0,
            name: "",
            description: "",
            qualification: "",
            overview: "",
            salary_min: 0,
            salary_max: 0,
            career_role_type_id: null,
            career_experience_id: null,
            recruitment_role_id: null,
          });
          setloadingeditinformation(false);
          setdraweditinformation(false);
          getDetailCareer();
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
          setloadingeditinformation(false);
          setdraweditinformation(false);
        }
      });
  };

  const renderType = (type) => {
    if (type == 1) {
      return "Teks";
    } else if (type == 2) {
      return "Paragraf";
    } else if (type == 3) {
      return "Ceklis";
    } else if (type == 4) {
      return "Numeral";
    } else if (type == 5) {
      return "Dropdown";
    } else if (type == 1) {
      return "Unggah File";
    }
  };

  const exportRejectPelamar = (data, type) => {
    setDataUpdateStatus({
      ...dataUpdateStatus,
      id: data?.id,
      name: data?.name,
      prev_recruitment_status_name: data?.status.name,
      recruitment_status_name: type == "export" ? "Shortlisted" : "Rejected",
      recruitment_status_id: type == "export" ? 2 : 3,
    });

    setModalUpdateStatus(true);
  };

  return (
    <Layout
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="flex flex-col" id="mainWrapper">
        <div className="lg:col-span-3 flex flex-col shadow-md rounded-md bg-white p-6 mb-6">
          <div className={"grid grid-cols-1 md:grid-cols-2"}>
            <div className={"flex flex-col md:flex-row"}>
              <p className={"text-lg leading-6 font-bold text-mono30 mr-2.5"}>
                {detailCareer?.name}
              </p>
              <p
                className={
                  "text-sm leading-6 font-bold w-3/4 md:w-auto px-3 text-primary100 bg-backdrop md:mt-0 mt-2"
                }
              >
                Posted on
                <span
                  className={
                    "text-sm rounded-[5px] ml-3 leading-6 font-bold text-mono30"
                  }
                >
                  {detailCareer &&
                    moment(detailCareer.created_at).format("DD MMMM YYYY")}
                </span>
              </p>
            </div>

            {showCollapsible ? (
              <div
                className={"hidden md:flex justify-end cursor-pointer"}
                onClick={() => setShowCollapsible(false)}
              >
                <UpIconSvg size={24} color={"#4D4D4D"} />
              </div>
            ) : (
              <div
                className={"hidden md:flex justify-end cursor-pointer"}
                onClick={() => setShowCollapsible(true)}
              >
                <DownIconSvg size={24} color={"#4D4D4D"} />
              </div>
            )}
          </div>
          <div className={"md:flex md:flex-row md:justify-between mt-7"}>
            <Tabs
              defaultActiveKey="1"
              className={`md:w-3/4`}
              onChange={setTabActiveKey}
            >
              <TabPane tab="Informasi Umum" key="1" />
              <TabPane
                tab={"Pertanyaan Pelamar (" + countQuestion + ")"}
                key="2"
              />
            </Tabs>
            {tabActiveKey == "1" ? (
              <div
                onClick={() => {
                  setdraweditinformation(true);
                  setdataeditinformation({
                    id: detailCareer.id,
                    name: detailCareer.name,
                    description: detailCareer.description,
                    qualification: detailCareer.qualification,
                    overview: detailCareer.overview,
                    salary_min: detailCareer.salary_min,
                    salary_max: detailCareer.salary_max,
                    career_role_type_id: detailCareer.career_role_type_id,
                    career_experience_id: detailCareer.career_experience_id,
                    recruitment_role_id: detailCareer.recruitment_role
                      ? detailCareer.recruitment_role.id
                      : NULL,
                    is_posted: detailCareer.is_posted,
                  });
                }}
                className={
                  "mt-2 max-w-fit md:mt-0 flex gap-2 border border-primarygreen rounded-[5px] px-4 py-1.5 h-8 self-center hover:cursor-pointer"
                }
              >
                <EditSquareIconSvg size={20} color={"#35763B"} />
                <p className={"text-primarygreen text-sm font-bold leading-5"}>
                  Edit Informasi Umum
                </p>
              </div>
            ) : (
              <div
                onClick={() => {
                  if (countQuestion > 0) {
                    setdrawedit(true);
                    setdataedit({
                      id: detailCareer.question.id,
                      name: detailCareer.question.name,
                      description: detailCareer.question.description,
                      question: detailCareer.question.details,
                    });
                  } else {
                    notification.error({
                      message: `Tidak Dapat Diedit karena tidak ada pertanyaan`,
                      duration: 3,
                    });
                  }
                }}
                className={
                  "mt-2 max-w-fit md:mt-0 flex gap-2 border border-primarygreen rounded-[5px] px-4 py-1.5 h-8 self-center hover:cursor-pointer"
                }
              >
                <EditSquareIconSvg size={20} color={"#35763B"} />
                <p className={"text-primarygreen text-sm font-bold leading-5"}>
                  Edit Pertanyaan Pelamar
                </p>
              </div>
            )}
          </div>
          {showCollapsible &&
            (tabActiveKey == "1" ? (
              <div>
                <div className={"mt-5 flex flex-col md:flex-row"}>
                  <div className={"w-full md:w-1/4 mt-3 md:mt-0"}>
                    <p className={"text-mono50 font-medium leading-5 "}>
                      TIpe Kontrak
                    </p>
                    <p
                      className={
                        "mt-2.5 text-sm leading-6 font-normal text-mono30"
                      }
                    >
                      {detailCareer?.role_type?.name}
                    </p>
                  </div>
                  <div className={"w-full md:w-1/4 mt-3 md:mt-0"}>
                    <p className={"text-mono50 font-medium leading-5 "}>
                      Rentang Pengalaman
                    </p>
                    <p
                      className={
                        "mt-2.5 text-sm leading-6 font-normal text-mono30"
                      }
                    >
                      {detailCareer?.experience?.str}
                    </p>
                  </div>
                  <div className={"w-full md:w-1/4 mt-3 md:mt-0"}>
                    <p className={"text-mono50 font-medium leading-5 "}>
                      Rentan Gaji
                    </p>
                    <p
                      className={
                        "mt-2.5 text-sm leading-6 font-normal text-mono30"
                      }
                    >
                      {detailCareer
                        ? currencyI18n.format(detailCareer.salary_min)
                        : "0"}{" "}
                      -{" "}
                      {detailCareer
                        ? currencyI18n.format(detailCareer.salary_max)
                        : "0"}
                    </p>
                  </div>
                  <div className={"w-full md:w-1/4 mt-3 md:mt-0"}>
                    <p className={"text-mono50 font-medium leading-5 "}>Role</p>
                    <p
                      className={
                        "mt-2.5 text-sm leading-6 font-normal text-mono30"
                      }
                    >
                      {detailCareer?.recruitment_role?.name}
                    </p>
                  </div>
                </div>
                <div className={"mt-4"}>
                  <p className={"text-mono50 font-medium leading-5 "}>
                    Overview
                  </p>
                  <p
                    className={
                      "mt-2.5 text-sm leading-6 font-normal text-mono30"
                    }
                  >
                    {detailCareer ? parse(detailCareer?.overview) : ""}
                  </p>
                </div>
                <div className={"mt-4 flex flex-col md:flex-row"}>
                  <div className={"w-full md:w-1/2 mt-3 md:mt-0"}>
                    <p className={"text-mono50 font-medium leading-5 "}>
                      Deskripsi Pekerjaan
                    </p>
                    <p
                      className={
                        "mt-2.5 text-sm leading-6 font-normal text-mono30"
                      }
                    >
                      {detailCareer ? parse(detailCareer?.description) : ""}
                    </p>
                  </div>
                  <div className={"w-full md:w-1/2 mt-3 md:mt-0"}>
                    <p className={"text-mono50 font-medium leading-5 "}>
                      Spesifikasi Minimal
                    </p>
                    <p
                      className={
                        "mt-2.5 text-sm leading-6 font-normal text-mono30"
                      }
                    >
                      {detailCareer ? parse(detailCareer?.qualification) : ""}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={"mt-6 grid md:grid-cols-2 gap-6"}>
                {detailCareer &&
                  detailCareer.question != null &&
                  detailCareer.question.details.map((data, key) => (
                    <div
                      className={
                        "w-full  px-4 py-3 rounded-[5px] border border-solid border-inputkategori bg-white"
                      }
                    >
                      <p
                        className={
                          "text-mono30 text-[14px] font-bold leading-6 "
                        }
                      >
                        {key + 1}. {data.name}
                      </p>
                      <p
                        className={"text-mono50 text-sm font-medium leading-5 "}
                      >
                        {renderType(data.type)}
                      </p>
                    </div>
                  ))}
                {/* {detailCareer?.question.map((data, key) => (
                  <div
                    className={
                      "w-full  px-4 py-3 rounded-[5px] border border-solid border-inputkategori bg-white"
                    }
                  >
                    <p
                      className={"text-mono30 text-[14px] font-bold leading-6 "}
                    >
                      {key}. {data.details.name}
                    </p>
                    <p className={"text-mono50 text-sm font-medium leading-5 "}>
                      {data.details.type}
                    </p>
                  </div>
                ))} */}
              </div>
            ))}
        </div>
        <div
          className="lg:col-span-3 flex flex-col rounded-md bg-white p-5 mb-6"
          style={{ boxShadow: "0px 6px 25px 0px rgba(0, 0, 0, 0.05)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className={"w-3/4"}>
              <h4 className="mig-heading--4 ">Pelamar {detailCareer?.name}</h4>
            </div>
            <div className={"flex flex-row gap-4 w-2/4"}>
              <div className="w-full">
                <Input
                  defaultValue={queryParams.keyword}
                  style={{ width: `100%` }}
                  placeholder="Cari Nama ..."
                  allowClear
                  onChange={(e) => {
                    setQueryParams({ keyword: e.target.value });
                    setSelectedName(e.target.value);
                  }}
                  // onKeyPress={onKeyPressHandler}
                  // disabled={!isAllowedToGetCareer}
                />
              </div>
              <div className="w-full md:w-1/2 customselectcareer">
                <Select
                  defaultValue={queryParams.career_apply_status_id}
                  allowClear
                  name={`status`}
                  placeholder="Pilih Status"
                  style={{ width: `100%` }}
                  onChange={(value) => {
                    setQueryParams({ career_apply_status_id: value });
                    setSelectedStatus(value);
                  }}
                  suffixIcon={<DownIconSvg size={24} color={"#35763B"} />}
                >
                  {dataStatusApply.map((status) => (
                    <Select.Option key={status.id} value={status.id}>
                      <div className="flex items-center">
                        <p className="truncate">{status.name}</p>
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <div className={"flex justify-end ml-8"}>
                <ButtonSys
                  type={`primary`}
                  onClick={onFilterRecruitments}
                  disabled={!isAllowedToGetCareer}
                >
                  <div className="flex flex-row space-x-2.5 w-full items-center">
                    <p>Simpan Filter</p>
                  </div>
                </ButtonSys>
              </div>
            </div>
          </div>

          <div>
            <Table
              columns={columnRecruitment}
              className={"cursor-pointer"}
              dataSource={dataCareers}
              loading={loadingCareers}
              rowKey={(record) => record.id}
              pagination={{
                current: queryParams.page,
                pageSize: queryParams.rows,
                total: dataRawRCareers?.total,
                showSizeChanger: true,
              }}
              // onRow={(record, rowIndex) => {
              //   console.log('row index ',rowIndex)
              //   return {

              //     onClick: () => {handleClickDetailPelamar(record)
              //     },
              //   };
              // }}
              onChange={(pagination, filters, sorter, extra) => {
                const sortTypePayload =
                  sorter.order === "ascend"
                    ? "asc"
                    : sorter.order === "descend"
                    ? "desc"
                    : undefined;

                setQueryParams({
                  sort_type: sortTypePayload,
                  sort_by:
                    sortTypePayload === undefined ? undefined : sorter.field,
                  page: pagination.current,
                  rows: pagination.pageSize,
                });
              }}
              scroll={{ x: 300 }}
            ></Table>
          </div>
          <AccessControl hasPermission={RESUME_GET}>
            <ModalCore
              title={"Unduh Resume"}
              visible={openDownloadModal}
              onCancel={() => setOpenDownloadModal(false)}
              footer={<></>}
            >
              <Spin spinning={loadingResumeData}>
                {isOnClient && (
                  <div className="flex flex-col space-y-5 ml-1">
                    <p className="">
                      Klik untuk mengunduh resume kandidat dengan nama&nbsp;
                      <strong>{dataResume.name}</strong>
                    </p>
                    <div className={"mt-6 flex"}>
                      <Switch
                        checked={showLogoStatus}
                        onChange={() => setShowLogoStatus(!showLogoStatus)}
                      />
                      <p className={"ml-4 text-mono30 text-xs self-center"}>
                        {showLogoStatus
                          ? "Menampilkan Logo Migsys"
                          : "Tidak Menampilkan Logo Migsys"}
                      </p>
                    </div>
                    <div className={"flex self-end"}>
                      <p
                        onClick={() => setOpenDownloadModal(false)}
                        className={
                          "flex items-center mr-8 text-xs text-mono50 cursor-pointer"
                        }
                      >
                        Batalkan
                      </p>
                      <PDFDownloadLink
                        document={
                          <ResumePDFTemplate
                            dataResume={dataResume}
                            logoStatus={showLogoStatus}
                          />
                        }
                        fileName={`CV-${dataResume?.assessment?.name}-${dataResume?.name}.pdf`}
                      >
                        <ButtonSys
                          type={"primary"}
                          // onClick={() => rt.push('/admin/candidates/pdfTemplate')}
                        >
                          <div className={"flex flex-row"}>
                            <DownloadIcon2Svg size={16} color={"#fffffff"} />
                            <p className={"ml-2 text-xs text-white"}>
                              Unduh Resume
                            </p>
                          </div>
                        </ButtonSys>
                      </PDFDownloadLink>
                    </div>
                  </div>
                )}
              </Spin>
            </ModalCore>
          </AccessControl>
          <AccessControl hasPermission={CAREERS_V2_GET}>
            <Drawer
              title={`Informasi Pelamar`}
              maskClosable={false}
              visible={drawDetailPelamar}
              onClose={() => {
                setDrawDetailPelamar(false);
              }}
              width={731}
              destroyOnClose={true}
            >
              <div
                className={
                  "flex flex-col gap-4 mt-4 border border-[#F3F3F3] rounded-[6px] p-4"
                }
              >
                <div className={"flex flex-row items-center gap-2"}>
                  <p className={"text-xs font-medium leading-5 text-mono50"}>
                    Status:
                  </p>
                  <select
                    value={dataTerpilih?.status?.id}
                    className="rounded-md py-1 hover:cursor-pointer bg-bgstatuscareer2 px-2 customcareerselectstatus"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(event) => {
                      setDataUpdateStatus({
                        ...dataUpdateStatus,
                        id: dataTerpilih?.id,
                        name: dataTerpilih?.name,
                        prev_recruitment_status_name: dataTerpilih?.status.name,
                        recruitment_status_name:
                          event.target.selectedOptions[0].text,
                        recruitment_status_id: Number(event.target.value),
                      });

                      setModalUpdateStatus(true);
                    }}
                    style={{
                      backgroundColor:
                        dataTerpilih?.status?.id == 1
                          ? "#4D4D4D1A"
                          : dataTerpilih?.status?.id == 2
                          ? "#35763B"
                          : "#BF4A40",
                      color:
                        dataTerpilih?.status?.id != 1 ? "white" : "#4D4D4D",
                    }}
                  >
                    {dataStatusApply.map((status) => (
                      <option
                        key={status.id}
                        value={status.id}
                        style={{
                          backgroundColor:
                            status.id == 1
                              ? "#4D4D4D1A"
                              : status?.id == 2
                              ? "#35763B"
                              : "#BF4A40",
                          color: status.id != 1 ? "white" : "#4D4D4D",
                        }}
                      >
                        {status?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={"flex flex-row"}>
                  <div className={"flex flex-col gap-2.5 w-1/2"}>
                    <p className={"text-xs font-medium leading-5 text-mono50"}>
                      Nama Pelamar
                    </p>
                    <p className={"text-sm text-mono30 font-medium leading-5"}>
                      {dataTerpilih ? dataTerpilih?.name : "-"}
                    </p>
                  </div>
                  <div className={"flex flex-col gap-2.5 w-1/2"}>
                    <p className={"text-xs font-medium leading-5 text-mono50"}>
                      Tanggal Melamar
                    </p>
                    <p className={"text-sm text-mono30 font-medium leading-5"}>
                      {dataTerpilih
                        ? moment(dataTerpilih.created_at).format("DD MMMM YYYY")
                        : "-"}
                    </p>
                  </div>
                </div>
                <div className={"flex flex-row"}>
                  <div className={"flex flex-col gap-2.5 w-1/2"}>
                    <p className={"text-xs font-medium leading-5 text-mono50"}>
                      Nomor Ponsel
                    </p>
                    <p className={"text-sm text-mono30 font-medium leading-5"}>
                      {dataTerpilih ? dataTerpilih?.phone : "-"}
                    </p>
                  </div>
                  <div className={"flex flex-col gap-2.5 w-1/2"}>
                    <p className={"text-xs font-medium leading-5 text-mono50"}>
                      Email Pelamar
                    </p>
                    <p className={"text-sm text-mono30 font-medium leading-5"}>
                      {dataTerpilih ? dataTerpilih?.email : "-"}
                    </p>
                  </div>
                </div>

                {dataTerpilih?.status?.id == 1 && (
                  <div className={"flex gap-4"}>
                    <div
                      onClick={() =>
                        handleClickExportPelamar(dataTerpilih, "terpilih")
                      }
                      className={
                        "flex gap-2 items-center justify-center w-[143px] h-6 bg-[#F4FAF5] rounded hover:cursor-pointer"
                      }
                    >
                      <UserPlusIconSvg size={14} color={"#35763B"} />
                      <p
                        className={"text-[#35763B] text-xs leading-4 font-bold"}
                      >
                        Export Pelamar
                      </p>
                    </div>
                    <div
                      onClick={() =>
                        exportRejectPelamar(dataTerpilih, "reject")
                      }
                      className={
                        "flex gap-2 items-center justify-center w-[143px] h-6 bg-[#BF4A40] bg-opacity-20 rounded hover:cursor-pointer"
                      }
                    >
                      <CloseIconSvg size={14} color={"#BF4A40"} />
                      <p
                        className={"text-[#BF4A40] text-xs leading-4 font-bold"}
                      >
                        Reject
                      </p>
                    </div>
                  </div>
                )}
                {dataTerpilih?.status?.id == 2 && (
                  <div
                    className={
                      "flex gap-2 justify-center items-center rounded-[3px] bg-[#35763B] h-[28px] py-1.5"
                    }
                  >
                    <CheckIconSvg color={"#ffffff"} size={16} />
                    <p className={"text-white text-xs leading-4 font-bold"}>
                      Pelamar ini Sudah Diekspor
                    </p>
                  </div>
                )}
                {dataTerpilih?.status?.id == 3 && (
                  <div
                    className={
                      "flex gap-2 justify-center items-center rounded-[3px] bg-[#BF4A40] h-[28px] py-1.5"
                    }
                  >
                    <CloseIconSvg />
                    <p className={"text-white text-xs leading-4 font-bold"}>
                      Pelamar ini Sudah Tersisihkan
                    </p>
                  </div>
                )}
              </div>
              <div
                className={"mt-6 border border-solid border-[#f0f0f0] -mx-6"}
              ></div>
              <div className={"mt-6"}>
                <p className={"text-[#4D4D4D] text-[14px] leading-6 font-bold"}>
                  Resume Pelamar
                </p>
              </div>
              <div className={"mt-4"}>
                {dataTerpilih && dataTerpilih.resume ? (
                  <a
                    download
                    href={"https://cdn.mig.id/" + dataTerpilih.resume.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ButtonSys
                      fullWidth={true}
                      type={"primary"}
                      // onClick={() => rt.push('/admin/candidates/pdfTemplate')}
                    >
                      <div className={"flex flex-row"}>
                        <DownloadIcon2Svg size={16} color={"#fffffff"} />
                        <p className={"ml-2 text-xs text-white"}>
                          Unduh CV Pelamar
                        </p>
                      </div>
                    </ButtonSys>
                  </a>
                ) : (
                  <ButtonSys
                    onClick={() => downloadNoData()}
                    fullWidth={true}
                    type={"primary"}
                    // onClick={() => rt.push('/admin/candidates/pdfTemplate')}
                  >
                    <div className={"flex flex-row"}>
                      <DownloadIcon2Svg size={16} color={"#fffffff"} />
                      <p className={"ml-2 text-xs text-white"}>
                        Unduh CV Pelamar
                      </p>
                    </div>
                  </ButtonSys>
                )}
              </div>

              {dataTerpilih && dataTerpilih.question != null && (
                <div>
                  <div
                    className={
                      "mt-6 border border-solid border-[#f0f0f0] -mx-6"
                    }
                  ></div>
                  <p className={"text-mono30 text-lg leading-6 font-bold mt-6"}>
                    Jawaban Pertanyaan Tambahan
                  </p>
                  {dataTerpilih.question.details.map((data, index) =>
                    dataTerpilih.question.question.details[index].type == 1 ||
                    dataTerpilih.question.question.details[index].type == 2 ||
                    dataTerpilih.question.question.details[index].type == 4 ? (
                      <div
                        className={
                          "mt-6 py-3 px-4 rounded-[5px] border border-solid border-inputkategori "
                        }
                      >
                        <p
                          className={
                            "text-xs font-medium text-mono50 leading-5  "
                          }
                        >
                          {index + 1}.{" "}
                          {
                            dataTerpilih.question.question.details[index]
                              .description
                          }
                        </p>
                        <p
                          className={"text-sm font-bold leading-6 text-mono30"}
                        >
                          {data.value}
                        </p>
                      </div>
                    ) : dataTerpilih.question.question.details[index].type ==
                      3 ? (
                      <div
                        className={
                          "mt-6 py-3 px-4 rounded-[5px] border border-solid border-inputkategori "
                        }
                      >
                        <p
                          className={
                            "text-xs font-medium text-mono50 leading-5  "
                          }
                        >
                          {index + 1}.{" "}
                          {
                            dataTerpilih.question.question.details[index]
                              .description
                          }{" "}
                          ({" "}
                          {dataTerpilih.question.question.details[
                            index
                          ].list.map((data, index) => data + " ")}{" "}
                          )
                        </p>
                        <p
                          className={"text-sm font-bold leading-6 text-mono30"}
                        >
                          {data.value.map(
                            (data1, index2) =>
                              dataTerpilih.question.question.details[index]
                                .list[data1]
                          )}
                        </p>
                      </div>
                    ) : dataTerpilih.question.question.details[index].type ==
                      5 ? (
                      <div
                        className={
                          "mt-6 py-3 px-4 rounded-[5px] border border-solid border-inputkategori "
                        }
                      >
                        <p
                          className={
                            "text-xs font-medium text-mono50 leading-5  "
                          }
                        >
                          {index + 1}.{" "}
                          {
                            dataTerpilih.question.question.details[index]
                              .description
                          }{" "}
                          diantara berikut ini : ({" "}
                          {dataTerpilih.question.question.details[
                            index
                          ].list.map((data, indexnew) => data + " ")}{" "}
                          )
                        </p>
                        <p
                          className={"text-sm font-bold leading-6 text-mono30"}
                        >
                          {data.value}
                        </p>
                      </div>
                    ) : (
                      <div
                        className={
                          "mt-6 py-3 px-4 rounded-[5px] border border-solid border-inputkategori "
                        }
                      >
                        <p
                          className={
                            "text-xs font-medium text-mono50 leading-5  "
                          }
                        >
                          {index + 1}.{" "}
                          {
                            dataTerpilih.question.question.details[index]
                              .description
                          }
                        </p>
                        {data.value ? (
                          <a
                            download
                            href={"https://cdn.mig.id/" + data.value}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download File
                          </a>
                        ) : (
                          <p
                            className={
                              "text-sm font-bold leading-6 text-mono30"
                            }
                          >
                            -
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
            </Drawer>
          </AccessControl>
          <AccessControl hasPermission={CAREERS_V2_GET}>
            <ModalUbah
              title={`Konfirmasi Perubahan`}
              visible={modalUpdateStatus}
              onvisible={setModalUpdateStatus}
              onOk={handleUpdateStatus}
              onCancel={() => {
                setModalUpdateStatus(false);
                setDataUpdateStatus({});
              }}
              loading={loadingUpdate}
              disabled={disableUpdate}
            >
              <div className="space-y-4">
                <p className="">
                  Anda telah melakukan perubahan pada kandidat{" "}
                  <strong>{dataUpdateStatus.name}</strong>
                  &nbsp;pada item berikut
                </p>
                <p className="font-bold">
                  {`Status ${dataUpdateStatus.prev_recruitment_status_name} → ${dataUpdateStatus.recruitment_status_name}`}
                </p>

                <p>Apakah Anda yakin ingin menyimpan perubahan?</p>
              </div>
            </ModalUbah>
          </AccessControl>
          {/*drawer konfirmasi export data */}
          <AccessControl hasPermission={CAREERS_V2_GET}>
            <ModalEkspor
              title={`Konfirmasi Eksport`}
              visible={modalExportStatus}
              onvisible={setModalExportStatus}
              onOk={handleUpdateExport}
              onCancel={() => {
                setModalExportStatus(false);
                setDataExportStatus({});
              }}
              loading={loadingEkspor}
              disabled={disableEkspor}
            >
              <div className="space-y-4">
                <p className="">
                  Anda akan melakukan eksport pada kandidat{" "}
                  <strong>{dataExportStatus.name}</strong>
                </p>

                <p>Apakah Anda yakin ingin mengeksport?</p>
              </div>
            </ModalEkspor>
          </AccessControl>
          <AccessControl hasPermission={CAREER_UPDATE}>
            {/* drawer edit pertanyaan */}
            <DrawerQuestionEdit
              title={"Edit Pertanyaan"}
              visible={drawedit}
              onvisible={setdrawedit}
              buttonOkText={"Update"}
              setdrawedit={setdrawedit}
              setdataedit={setdataedit}
              handleUpdateQuestion={handleUpdateQuestion}
              dataedit={dataedit}
              loadingEdit={loadingedit}
            />
          </AccessControl>
          <AccessControl hasPermission={CAREER_UPDATE}>
            {/* drawer edit informasi */}
            <DrawerInformationEdit
              title={"Edit Informasi Umum"}
              visible={draweditinformation}
              onvisible={setdraweditinformation}
              buttonOkText={"Update"}
              setdraweditinformation={setdraweditinformation}
              setdataeditinformation={setdataeditinformation}
              handleEditInformation={handleEditInformation}
              dataeditinformation={dataeditinformation}
              dataExperience={dataExperience}
              dataRoleTypeList={dataRoleTypeList}
              dataRoles={dataRoles}
              loadingeditinformation={loadingeditinformation}
            />
          </AccessControl>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const careerId = params.careerId;
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
      sidemenu: "career-management",
      careerId,
    },
  };
}

export default CareerDetailIndex;
