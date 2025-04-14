import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Drawer,
  Empty,
  Form,
  Input,
  Menu,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  Table,
  Tabs,
  notification,
} from "antd";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import QueryString from "qs";
import React from "react";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import CurrencyFormat from "react-currency-format";
import "react-quill/dist/quill.snow.css";

import { AccessControl } from "components/features/AccessControl";
import {
  AlignJustifiedIconSvg,
  CheckboxIconSvg,
  CircleXIconSvg,
  CopyIconSvg,
  ListNumbersSvg,
  TrashIconSvg,
  UploadIconSvg,
} from "components/icon";
import { AddNewFormButton } from "components/screen/resume";
import { H2, Label } from "components/typography";

import { useAccessControl } from "contexts/access-control";

import {
  CAREERS_V2_APPLY_STATUSES,
  CAREERS_V2_GET,
  CAREERS_V2_TOP_FIVE_GET,
  CAREER_ADD,
  CAREER_DELETE,
  CAREER_UPDATE,
  CAREER_V2_ADD,
  CAREER_V2_DELETE,
  CAREER_V2_UPDATE,
  RECRUITMENT_ROLE_TYPES_LIST_GET,
  SIDEBAR_RECRUITMENT_SETUP,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import ButtonSys from "../../../components/button";
import DrawerCareerAdd from "../../../components/drawer/career/DrawerCareerAdd";
import DrawerCareerEdit from "../../../components/drawer/career/DrawerCareerEdit";
import {
  AddCareerIconSvg,
  CalendartimeIconSvg,
  CheckIconSvg,
  DownIconSvg,
  SearchIconSvg,
  ShowCareerIconSvg,
  UpIconSvg,
} from "../../../components/icon";
import Layout from "../../../components/layout-dashboard-management";
import st from "../../../components/layout-dashboard-management.module.css";
import CareerStatisticApplicant from "../../../components/screen/career/statisticapplicant";
import CareerTableCandidate from "../../../components/screen/career/tablecandidate";
import CareerTopChart from "../../../components/screen/career/topchart";
import { createKeyPressHandler, momentFormatDate } from "../../../lib/helper";
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
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CareerIndex = ({ dataProfile, sidemenu, initProps }) => {
  // 1. Init
  /**
   * Dependencies
   */
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
    ],
  };
  const formats = [
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToSetupRecruitment = hasPermission(SIDEBAR_RECRUITMENT_SETUP);
  const isAllowedToGetCareer = hasPermission(CAREERS_V2_GET);
  const isAllowedToUpdateCareer = hasPermission(CAREER_V2_UPDATE);
  const isAllowedToDeleteCareer = hasPermission(CAREER_V2_DELETE);
  const isAllowedToAddCareer = hasPermission(CAREER_V2_ADD);
  const isAllowedToGetStatusCareer = hasPermission(CAREERS_V2_APPLY_STATUSES);
  const isAllowedToGetTopFiveCareer = hasPermission(CAREERS_V2_TOP_FIVE_GET);
  const [dataIkhtisar, setDataIkhtisar] = useState([]);
  const dataExample = {
    labels: ["Organic", "Sponsored", "Organic", "Sponsored"],
    previousDate: {
      label: "08/10/2019 - 09/30/2019",
      dataSet: [10000, 150000, 10000, 150000],
    },
    currentDate: {
      label: "10/01/2019 - 11/20/2019",
      dataSet: [10000, 225000, 10000, 225000],
    },
  };
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    is_posted: withDefault(NumberParam, undefined),
  });
  const [loadingDraftEdit, setLoadingDraftEdit] = useState(false);

  const [dataStatusList, setDataStatusList] = useState([
    {
      id: undefined,
      name: "All",
    },
    {
      id: 0,
      name: "Draft",
    },
    {
      id: 1,
      name: "Posted",
    },
  ]);
  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 1, "Career Management");

  // 2. Use state
  // 2.1. Role List & Candidate Count

  // filter search & selected options
  const [searchingFilterRecruitments, setSearchingFilterRecruitments] =
    useState("");
  const [selectedStatus, setSelectedStatus] = useState(undefined);
  const [showCollapsible, setShowCollapsible] = useState(true);
  // table data
  const [loadingCareers, setLoadingCareers] = useState(true);
  const [dataCareers, setDataCareers] = useState([]);
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
  //create
  const [drawcreate, setdrawcreate] = useState(false);
  const [loadingcreate, setloadingcreate] = useState(false);
  const [loadingdraft, setloadingdraft] = useState(false);
  const [datacreate, setdatacreate] = useState({
    name: "",
    description: "",
    qualification: "",
    overview: "",
    salary_min: 0,
    salary_max: 0,
    career_role_type_id: null,
    recruitment_role_id: null,
    career_experience_id: null,
    is_posted: 0,
    role: "",
    question: [],
    platforms: null,
  });
  const [tempcb, settempcb] = useState([]);
  const [tempinfo, settempinfo] = useState([]);
  const [drawedit, setdrawedit] = useState(false);
  const [loadingedit, setloadingedit] = useState(false);
  const [dataedit, setdataedit] = useState({
    id: 0,
    name: "",
    description: "",
    qualification: "",
    overview: "",
    salary_min: 0,
    salary_max: 0,
    career_role_type_id: null,
    recruitment_role_id: null,
    career_experience_id: null,
    is_posted: 0,
    question: [],
    platforms: null,
    platform_value: null,
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
  const isAllowedToGetRoleTypeList = hasPermission(
    RECRUITMENT_ROLE_TYPES_LIST_GET
  );
  const [dataRoleTypeList, setDataRoleTypeList] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  //delete
  const [modaldelete, setmodaldelete] = useState(false);
  const [loadingdelete, setloadingdelete] = useState(false);
  const [featureselected, setfeatureselected] = useState("");
  const [datadelete, setdatadelete] = useState({
    id: 0,
  });
  const [dataLabelStatistic, setDataLabelStatistic] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [dataSets, setDataSets] = useState([]);
  const [form] = Form.useForm();
  const { TabPane } = Tabs;
  // 3. UseEffect
  // 3.1. Get Recruitment Count

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

  //get data role
  useEffect(() => {
    if (!isAllowedToGetRoleTypeList) {
      permissionWarningNotification("Mendapatkan", "Daftar Role");
      // setLoadingRoleTypeList(false);
      return;
    }

    // setLoadingRoleTypeList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRolesList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataRoles(res2.data);
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

  //get data status aoply
  useEffect(() => {
    if (!isAllowedToGetStatusCareer) {
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
        setDataIkhtisar(res2);
        // } else {
        //   notification.error({
        //     message: `${res2.message}`,
        //     duration: 3,
        //   });
        // }
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
  }, [isAllowedToGetStatusCareer]);

  useEffect(() => {
    if (!isAllowedToGetTopFiveCareer) {
      permissionWarningNotification("Mendapatkan", "Daftar Top 5 Karir");
      // setLoadingRoleTypeList(false);
      return;
    }

    // setLoadingRoleTypeList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/getTopFiveCareers`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          if (res2.data) {
            if (res2.data.careers.length > 0) {
              let dataCareersTemp = res2.data.careers;
              let dataTemp = [];
              for (let a = 0; a < dataCareersTemp.length; a++) {
                dataTemp.push(dataCareersTemp[a].name);
              }
              setDataLabelStatistic(dataTemp);
            }

            if (res2.data.status_count.length > 0) {
              let dataSetTemp1 = [];
              let dataSetTemp2 = [];
              let dataSetTemp3 = [];
              let dataSetsTemp = [];
              let dataCount = res2.data.status_count;
              for (let a = 0; a < dataCount.length; a++) {
                for (let i = 0; i < dataCount[a].length; i++) {
                  if (dataCount[a][i].name == "Rejected") {
                    dataSetTemp1.push(dataCount[a][i].applicants_count);
                  }
                  if (dataCount[a][i].name == "Shortlisted") {
                    dataSetTemp2.push(dataCount[a][i].applicants_count);
                  }
                  if (dataCount[a][i].name == "Unprocessed") {
                    dataSetTemp3.push(dataCount[a][i].applicants_count);
                  }
                }
              }
              let dataSet1 = {
                stack: "1",
                label: "Rejected",
                pointStyle: "rectRounded",
                backgroundColor: "#BF4A40",
                barThickness: 40,
                categoryPercentage: 1,
                data: dataSetTemp1, //From API
              };
              let dataSet2 = {
                stack: "1",
                label: "Shortlisted",
                backgroundColor: "#6AAA70",
                barThickness: 40,
                categoryPercentage: 1,
                pointStyle: "triangle",
                data: dataSetTemp2, //From API
              };

              let dataSet3 = {
                stack: "1",
                label: "Unprocessed",
                backgroundColor: "#CCCCCC",
                barThickness: 40,
                categoryPercentage: 1,
                pointStyle: "triangle",
                data: dataSetTemp3, //From API
              };

              dataSetsTemp.push(dataSet1, dataSet2, dataSet3);
              setDataSets(dataSetsTemp);
            }
          }
        }
        // setDataIkhtisar(res2);
        // } else {
        //   notification.error({
        //     message: `${res2.message}`,
        //     duration: 3,
        //   });
        // }
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
  }, [isAllowedToGetTopFiveCareer]);

  // 3.3. Get Careers
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
    searchingFilterRecruitments,
    queryParams.page,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
    queryParams.is_posted,
  ]);

  const getCareers = (params) => {
    setLoadingCareers(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/getCareers${params}&keyword=${searchingFilterRecruitments}`,
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

  // 4. Event
  const onManageRecruitmentButtonClicked = useCallback(() => {
    rt.push("/admin/career/general");
  }, []);

  const onAddCareerButtonClicked = useCallback(() => {
    setdrawcreate(true);
  }, []);

  // 4.1. Filter Table
  const onFilterRecruitments = () => {
    setQueryParams({
      is_posted: selectedStatus,
    });
  };

  const handleClickCareer = (record) => {
    rt.push(`/admin/career/${record.id}`);
  };

  const { onKeyPressHandler } = createKeyPressHandler(
    onFilterRecruitments,
    "Enter"
  );

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
            handleClickCareer(record);
          },
        };
      },
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              {dataRawRCareers?.from + index}
            </div>
          ),
        };
      },
    },
    {
      title: "Nama Lowongan",
      key: "name",
      dataIndex: "name",
      onCell: (record) => {
        return {
          onClick: (event) => {
            event.stopPropagation(); // this will avoid onRow being called
            handleClickCareer(record);
          },
        };
      },
      render: (text, record, index) => {
        return {
          children: (
            <div className="xl:w-40">{record.name ? record.name : ""}</div>
          ),
        };
      },
      sorter: isAllowedToGetCareer
        ? (a, b) => a.name?.toLowerCase() > b.name?.toLowerCase()
        : false,
    },
    {
      title: "Tipe Kontrak",
      key: "role_type",
      dataIndex: "role_type",
      onCell: (record) => {
        return {
          onClick: (event) => {
            event.stopPropagation(); // this will avoid onRow being called
            handleClickCareer(record);
          },
        };
      },
      render: (text, record, index) => {
        return {
          children: <>{record.role_type?.name}</>,
        };
      },
    },
    {
      title: "Tanggal Posting",
      key: "created_at",
      dataIndex: "created_at",
      onCell: (record) => {
        return {
          onClick: (event) => {
            event.stopPropagation(); // this will avoid onRow being called
            handleClickCareer(record);
          },
        };
      },
      render: (text, record, index) => {
        return {
          children: <>{moment(text).format("ll, HH:mm")}</>,
        };
      },
    },
    {
      title: "Status",
      key: "is_posted",
      dataIndex: "is_posted",
      onCell: (record) => {
        return {
          onClick: (event) => {
            event.stopPropagation(); // this will avoid onRow being called
            handleClickCareer(record);
          },
        };
      },
      render: (text, record, index) => {
        return {
          children: (
            <>
              {text == 1 ? (
                <div
                  className={
                    "bg-bgstatustaskfinish flex justify-center items-center px-4 py-1 rounded-[5px]"
                  }
                >
                  <p
                    className={
                      "text-[10px] text-primary100 leading-4 font-medium"
                    }
                  >
                    Posted
                  </p>
                </div>
              ) : (
                <div
                  className={
                    "bg-bgstatuscareer flex justify-center items-center px-4 py-1 rounded-[5px]"
                  }
                >
                  <p
                    className={"text-[10px] text-mono30 leading-4 font-medium"}
                  >
                    Draft
                  </p>
                </div>
              )}
            </>
          ),
        };
      },
    },
    {
      title: "Jumlah Pelamar",
      key: "apply_count",
      dataIndex: "apply_count",
      onCell: (record) => {
        return {
          onClick: (event) => {
            event.stopPropagation(); // this will avoid onRow being called
            handleClickCareer(record);
          },
        };
      },
      render: (text, record, index) => {
        return {
          children: <>{text}</>,
        };
      },
    },
    {
      title: "Aksi",
      key: "button_action",
      render: (text, record) => {
        return {
          children: (
            <div className=" flex">
              <Button
                onClick={() => {
                  handleClickCareer(record);
                }}
                style={{
                  paddingTop: `0`,
                  paddingBottom: `0.3rem`,
                  marginRight: `1rem`,
                }}
              >
                <SearchIconSvg size={15} color={`black`} />
              </Button>
              <Button
                disabled={!isAllowedToUpdateCareer}
                onClick={() => {
                  if (!isAllowedToUpdateCareer) {
                    permissionWarningNotification("Memperbarui", "Career");
                    return;
                  }
                  let datatemp = [];
                  setdrawedit(true);
                  setdataedit({
                    id: record.id,
                    name: record.name,
                    description: record.description,
                    qualification: record.qualification,
                    overview: record.overview,
                    salary_min: record.salary_min,
                    salary_max: record.salary_max,
                    career_role_type_id: record.career_role_type_id,
                    recruitment_role_id: record.recruitment_role_id,
                    career_experience_id: record.career_experience_id,
                    platforms: record.platforms,
                    is_posted: record.is_posted,
                    question: record.question ? record.question.details : [],
                  });
                }}
                style={{
                  paddingTop: `0`,
                  paddingBottom: `0.3rem`,
                  marginRight: `1rem`,
                }}
              >
                <EditOutlined />
              </Button>
              <Button
                disabled={!isAllowedToDeleteCareer}
                danger
                onClick={() => {
                  setmodaldelete(true);
                  setdatadelete({ ...datadelete, id: parseInt(record.id) });
                  setfeatureselected(record.name);
                }}
                style={{ paddingTop: `0`, paddingBottom: `0.3rem` }}
              >
                <DeleteOutlined />
              </Button>
            </div>
          ),
        };
      },
    },
  ];
  const handleCreate = () => {
    sendData("posted");
  };

  const sendData = (type) => {
    let dataQuestions = {
      name: datacreate.role,
      description: "New Description",
      details: datacreate.question,
    };
    let dataTemp = null;
    if (datacreate.question.length == 0) {
      dataTemp = {
        name: datacreate.role,
        description: datacreate.description,
        qualification: datacreate.qualification,
        overview: datacreate.overview,
        salary_min: datacreate.salary_min,
        salary_max: datacreate.salary_max,
        career_role_type_id: datacreate.career_role_type_id,
        recruitment_role_id: datacreate.recruitment_role_id,
        career_experience_id: datacreate.career_experience_id,
        is_posted: type == "posted" ? 1 : 0,
        platforms: datacreate.platforms,
      };
    } else {
      dataTemp = {
        name: datacreate.role,
        description: datacreate.description,
        qualification: datacreate.qualification,
        overview: datacreate.overview,
        salary_min: datacreate.salary_min,
        salary_max: datacreate.salary_max,
        career_role_type_id: datacreate.career_role_type_id,
        recruitment_role_id: datacreate.recruitment_role_id,
        career_experience_id: datacreate.career_experience_id,
        is_posted: type == "posted" ? 1 : 0,
        platforms: datacreate.platforms,
        question: dataQuestions,
      };
    }
    if (type == "posted") {
      setloadingcreate(true);
    } else {
      setloadingdraft(true);
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/addCareer`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataTemp),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setdatacreate({
            name: "",
            description: "",
            is_posted: 0,
            qualification: "",
            overview: "",
            salary_min: 0,
            salary_max: 0,
            career_role_type_id: null,
            career_experience_id: null,
            question: [],
          });
          setTimeout(() => {
            if (type == "posted") {
              setloadingcreate(false);
            } else {
              setloadingdraft(false);
            }
            setdrawcreate(false);
            const params = QueryString.stringify(queryParams, {
              addQueryPrefix: true,
            });
            getCareers(params);
          }, 500);
        } else if (!res2.success) {
          notification["error"]({
            message: "Add Career Failed!",
            duration: 3,
          });
          if (type == "posted") {
            setloadingcreate(false);
          } else {
            setloadingdraft(false);
          }
          setdrawcreate(false);
        }
      });
  };

  const handleEdit = () => {
    sendEditData("posted");
  };

  const sendEditData = (type) => {
    if (type == "posted") {
      setloadingedit(true);
    } else {
      setLoadingDraftEdit(true);
    }
    let dataTemp = {
      id: dataedit.id,
      name: dataedit.name,
      description: dataedit.description,
      qualification: dataedit.qualification,
      overview: dataedit.overview,
      salary_min: dataedit.salary_min,
      salary_max: dataedit.salary_max,
      career_role_type_id: dataedit.career_role_type_id,
      recruitment_role_id: dataedit.recruitment_role_id,
      career_experience_id: dataedit.career_experience_id,
      is_posted: type == "posted" ? 1 : 0,
      platforms: dataedit.platform_value,
      // qualification: "qualification",
      question: dataedit.question,
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/updateCareer`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataTemp),
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
            qualification: "",
            overview: "",
            salary_min: 0,
            salary_max: 0,
            recruitment_role_id: null,
            career_role_type_id: null,
            career_experience_id: null,
            platforms: null,
            question: [],
          });
          if (type == "posted") {
            setloadingedit(false);
          } else {
            setLoadingDraftEdit(false);
          }
          setdrawedit(false);
          const params = QueryString.stringify(queryParams, {
            addQueryPrefix: true,
          });
          getCareers(params);
        } else if (!res2.success) {
          notification["error"]({
            message: "Update Career Gagal",
            duration: 3,
          });
          if (type == "posted") {
            setloadingedit(false);
          } else {
            setLoadingDraftEdit(false);
          }
          setdrawedit(false);
        }
      });
  };
  const handleDelete = () => {
    setloadingdelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/deleteCareer`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datadelete),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setdatadelete({
            id: 0,
          });
          setTimeout(() => {
            setloadingdelete(false);
            setmodaldelete(false);
            const params = QueryString.stringify(queryParams, {
              addQueryPrefix: true,
            });
            getCareers(params);
          }, 500);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
          setloadingdelete(false);
          setmodaldelete(false);
        }
      });
  };

  const onChangeJobPlaftorm = (checkedValues) => {
    setdatacreate({
      ...datacreate,
      platforms: checkedValues,
    });
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {showCollapsible ? (
            <CareerTopChart
              dataLabelStatistic={dataLabelStatistic}
              dataSets={dataSets}
              setShowCollapsible={setShowCollapsible}
            />
          ) : (
            <div
              className={"bg-white p-6 rounded-[5px]"}
              style={{ boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.10)" }}
            >
              <div className={"flex flex-row justify-between"}>
                <p className={"text-mono30 text-lg leading-6 font-bold "}>
                  Top 5 Lowongan
                </p>
                <div
                  className={"cursor-pointer"}
                  onClick={() => setShowCollapsible(true)}
                >
                  <UpIconSvg size={24} color={"#4D4D4D"} />
                </div>
              </div>
            </div>
          )}

          <div className={"flex flex-col gap-6"}>
            <div
              className="lg:col-span-2 flex flex-col md:flex-row items-center w-full 
                          justify-between rounded-md
                          gap-4 md:gap-6"
            >
              <AddNewFormButton
                icon={<AddCareerIconSvg />}
                title="Tambah Lowongan Kerja"
                onButtonClicked={onAddCareerButtonClicked}
                disabled={!isAllowedToAddCareer}
              />

              <AddNewFormButton
                icon={<ShowCareerIconSvg />}
                title="Lihat Pelamar Tanpa Lowongan"
                onButtonClicked={onManageRecruitmentButtonClicked}
                disabled={!isAllowedToGetCareer}
              />
            </div>
            {showCollapsible && (
              <CareerStatisticApplicant dataIkhtisar={dataIkhtisar} />
            )}
          </div>

          {/* Table Kandidat */}
          <CareerTableCandidate
            searchingFilterRecruitments={searchingFilterRecruitments}
            setSearchingFilterRecruitments={setSearchingFilterRecruitments}
            queryParams={queryParams}
            setQueryParams={setQueryParams}
            onKeyPressHandler={onKeyPressHandler}
            isAllowedToGetCareer={isAllowedToGetCareer}
            setSelectedStatus={setSelectedStatus}
            dataStatusList={dataStatusList}
            columnRecruitment={columnRecruitment}
            dataCareers={dataCareers}
            loadingCareers={loadingCareers}
            dataRawRCareers={dataRawRCareers}
            onFilterRecruitments={onFilterRecruitments}
          />
        </div>
      </div>
      {/* drawer create careers */}
      <AccessControl hasPermission={CAREER_ADD}>
        <Drawer
          title={`Tambah Lowongan Kerja`}
          maskClosable={false}
          visible={drawcreate}
          onClose={() => {
            setdrawcreate(false);
          }}
          width={400}
          destroyOnClose={true}
        >
          <DrawerCareerAdd
            datacreate={datacreate}
            setdatacreate={setdatacreate}
            loadingdraft={loadingdraft}
            loadingcreate={loadingcreate}
            sendData={sendData}
            onChangeJobPlaftorm={onChangeJobPlaftorm}
            form={form}
            dataRoleTypeList={dataRoleTypeList}
            dataExperience={dataExperience}
            dataRoles={dataRoles}
            handleCreate={handleCreate}
          />
        </Drawer>
      </AccessControl>
      {/* drawer update careers  */}
      <AccessControl hasPermission={CAREER_V2_UPDATE}>
        <DrawerCareerEdit
          title={"Edit Lowongan"}
          visible={drawedit}
          onvisible={setdrawedit}
          buttonOkText={"Update"}
          setdrawedit={setdrawedit}
          setdataedit={setdataedit}
          dataedit={dataedit}
          handleEdit={handleEdit}
          sendEditData={sendEditData}
          loadingEdit={loadingedit}
          loadingDraftEdit={loadingDraftEdit}
          dataRoleTypeList={dataRoleTypeList}
          dataExperience={dataExperience}
          dataRoles={dataRoles}
        />
      </AccessControl>

      {/* drawer delete careers */}
      <AccessControl hasPermission={CAREER_V2_DELETE}>
        <Modal
          title={`Konfirmasi hapus career`}
          visible={modaldelete}
          okButtonProps={{ disabled: loadingdelete }}
          onCancel={() => {
            setmodaldelete(false);
          }}
          onOk={handleDelete}
          maskClosable={false}
          style={{ top: `3rem` }}
          width={500}
          destroyOnClose={true}
        >
          Yakin ingin hapus career dengan posisi {featureselected}?
        </Modal>
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
      sidemenu: "career-management",
    },
  };
}

export default CareerIndex;
