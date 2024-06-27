import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  Empty,
  Form,
  Input,
  Menu,
  Modal,
  Select,
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
import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
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
  const [datacreate, setdatacreate] = useState({
    name: "",
    description: "",
    qualification: "",
    overview: "",
    salary_min: 0,
    salary_max: 0,
    career_role_type_id: null,
    career_experience_id: null,
    is_posted: 0,
    question: [],
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
    career_experience_id: null,
    is_posted: 0,
    question: [],
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
                disabled={!isAllowedToUpdateCareer}
                onClick={() => {
                  if (!isAllowedToUpdateCareer) {
                    permissionWarningNotification("Memperbarui", "Career");
                    return;
                  }
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
                    career_experience_id: record.career_experience_id,
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
    let dataQuestions = {
      name: datacreate.name,
      description: "New Description",
      details: datacreate.question,
    };
    let dataTemp = null;
    if (datacreate.question.length == 0) {
      dataTemp = {
        name: datacreate.name,
        description: datacreate.description,
        qualification: datacreate.qualification,
        overview: datacreate.overview,
        salary_min: datacreate.salary_min,
        salary_max: datacreate.salary_max,
        career_role_type_id: datacreate.career_role_type_id,
        recruitment_role_id: datacreate.career_role_type_id,
        career_experience_id: datacreate.career_experience_id,
        is_posted: datacreate.is_posted,
      };
    } else {
      dataTemp = {
        name: datacreate.name,
        description: datacreate.description,
        qualification: datacreate.qualification,
        overview: datacreate.overview,
        salary_min: datacreate.salary_min,
        salary_max: datacreate.salary_max,
        career_role_type_id: datacreate.career_role_type_id,
        recruitment_role_id: datacreate.career_role_type_id,
        career_experience_id: datacreate.career_experience_id,
        is_posted: datacreate.is_posted,
        question: dataQuestions,
      };
    }

    setloadingcreate(true);
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
            setloadingcreate(false);
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
          setloadingcreate(false);
          setdrawcreate(false);
        }
      });
  };

  const handleEdit = () => {
    setloadingedit(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/updateCareer`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataedit),
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
            career_role_type_id: null,
            career_experience_id: null,
            question: [],
          });
          setloadingedit(false);
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
          setloadingedit(false);
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
            <div
              className={"bg-white p-6 h-[282px] rounded-[5px]"}
              style={{ boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.10)" }}
            >
              <div className={"flex flex-row justify-between"}>
                <p className={"text-mono30 text-lg leading-6 font-bold "}>
                  Top 5 Lowongan
                </p>
                <div
                  className={"cursor-pointer"}
                  onClick={() => setShowCollapsible(false)}
                >
                  <DownIconSvg size={24} color={"#4D4D4D"} />
                </div>
              </div>
              {dataLabelStatistic.length > 0 && (
                <div className={"mt-4"}>
                  <Bar
                    data={{
                      labels: dataLabelStatistic,
                      datasets: dataSets,
                    }}
                    options={{
                      layout: {
                        margin: {
                          top: 10,
                        },
                      },
                      title: {
                        display: false,
                      },
                      legend: {
                        display: false,
                      },
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          grid: {
                            display: false,
                            drawBorder: false,
                          },
                          ticks: {
                            font: {
                              family: "Montserrat, sans-serif",
                              size: 9,
                            },
                          },
                        },
                        y: {
                          grid: {
                            display: false,
                          },
                          ticks: {
                            display: false,
                          },
                          display: false,
                        },
                      },
                      plugins: {
                        tooltip: {
                          callbacks: {
                            title: (context) => {
                              return context[0].label.replaceAll(",", " ");
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              )}
            </div>
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
              <div
                className={"bg-white md:h-[178px] rounded-[5px] py-6 px-[22px]"}
                style={{ boxShadow: "0px 6px 25px 0px rgba(0, 0, 0, 0.05)" }}
              >
                <p className={"text-lg leading-4 text-mono30 font-bold"}>
                  Ikhtisar Pelamar
                </p>
                {dataIkhtisar.length > 0 && (
                  <div className={"mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"}>
                    {dataIkhtisar.map((dataIkhtisar1) => (
                      <div
                        className={`py-2 self-stretch ${
                          dataIkhtisar1.name == "Unprocessed"
                            ? "bg-bgikhtisar1"
                            : dataIkhtisar1.name == "Shortlisted"
                            ? "bg-bgstatustaskfinish"
                            : "bg-bgBackdropOverdue "
                        } flex flex-col justify-center items-center rounded-[5px] gap-[3px]`}
                      >
                        <p
                          className={`text-2xl leading-8 font-bold ${
                            dataIkhtisar1.name == "Unprocessed"
                              ? "text-mono30"
                              : dataIkhtisar1.name == "Shortlisted"
                              ? "text-primary100"
                              : "text-warning"
                          }`}
                        >
                          {dataIkhtisar1.applicants_count}
                        </p>
                        <p
                          className={`text-[10px] leading-4 font-normal ${
                            dataIkhtisar1.name == "Unprocessed"
                              ? "text-mono30"
                              : dataIkhtisar1.name == "Shortlisted"
                              ? "text-primary100"
                              : "text-warning"
                          }  `}
                        >
                          {dataIkhtisar1.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Table Kandidat */}
          <div className="lg:col-span-3 flex flex-col shadow-md rounded-md bg-white p-5 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="mig-heading--4 ">List Lowongan</h4>
            </div>

            {/* Start: Search criteria */}
            <div className="flex flex-col gap-4 md:flex-row md:justify-between w-full md:items-center mb-4">
              {/* Search by keyword (kata kunci) */}
              <div className="w-full md:w-8/12">
                <Input
                  defaultValue={searchingFilterRecruitments}
                  style={{ width: `100%` }}
                  placeholder="Cari Lowongan ..."
                  allowClear
                  onChange={(e) => {
                    setSearchingFilterRecruitments(e.target.value);
                    setQueryParams({ page: 1 });
                  }}
                  onKeyPress={onKeyPressHandler}
                  disabled={!isAllowedToGetCareer}
                />
              </div>
              {/* filter tanggal */}
              {/* <div className="w-full md:w-2/12 customDatepicker">
              <DatePicker placeholder="Semua Tanggal" className={'w-full'} suffixIcon={<CalendartimeIconSvg size={16} color={'#35763B'}/>} />
              </div> */}

              {/* Search by status (dropdown) */}
              <div className="w-full md:w-2/12 customselectcareer">
                <Select
                  defaultValue={queryParams.is_posted}
                  suffixIcon={<DownIconSvg size={24} color={"#35763B"} />}
                  allowClear
                  name={`status`}
                  placeholder="Semua Status"
                  style={{ width: `100%` }}
                  onChange={(value) => {
                    setQueryParams({ is_posted: value, page: 1 });
                    setSelectedStatus(value);
                  }}
                >
                  {dataStatusList.map((status) => (
                    <Select.Option key={status.id} value={status.id}>
                      <div className="flex items-center">
                        <p className="truncate">{status.name}</p>
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <div className="flex justify-end">
                <ButtonSys
                  type={`primary`}
                  onClick={onFilterRecruitments}
                  disabled={!isAllowedToGetCareer}
                >
                  <div className="flex flex-row space-x-2.5 w-full items-center">
                    <SearchIconSvg size={15} color={`#ffffff`} />
                    <p>Cari Lowongan</p>
                  </div>
                </ButtonSys>
              </div>
            </div>
            {/* End: Search criteria */}

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
                //   return {
                //     onClick: () => {
                //       handleClickCareer(record);
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
          </div>
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
          <div>
            <div className={"flex flex-row mb-6"}>
              <div className={"w-[200px]"}>
                <div
                  className={"flex flex-col gap-1 hover:cursor-pointer"}
                  onClick={() => setActiveTab("1")}
                >
                  <p
                    className={`${
                      activeTab == "1" ? `text-primarygreen` : `text-mono80`
                    } text-sm font-bold leading-6 text-underline`}
                  >
                    Informasi Umum
                  </p>
                  {activeTab == "1" && (
                    <div className={"bg-primarygreen h-0.5 w-[112px] "} />
                  )}
                </div>
              </div>
              <div
                className={"flex flex-col gap-1 hover:cursor-pointer"}
                onClick={() => setActiveTab("2")}
              >
                <p
                  className={`${
                    activeTab == "2" ? `text-primarygreen` : `text-mono80`
                  } text-sm font-bold leading-6 text-underline`}
                >
                  Pertanyaan Untuk Pelamar
                </p>
                {activeTab == "2" && (
                  <div className={"bg-primarygreen h-0.5 w-full "} />
                )}
              </div>
            </div>
            {/* <Tabs
              defaultActiveKey="1"
              // onChange={(value) => {
              //   setActiveTab(value as "1" | "2");
              // }}
            >
              <TabPane tab="Informasi Umum" key="1" />
              <TabPane tab="Pertanyaan" key="2" />
            </Tabs> */}
            <Form
              layout="vertical"
              initialValues={datacreate}
              onFinish={handleCreate}
            >
              {activeTab == "1" ? (
                <div>
                  <p
                    className={
                      "text-warning text-xs italic font-normal leading-4 mb-6"
                    }
                  >
                    * Informasi ini harus diisi
                  </p>
                  <div className="flex flex-col">
                    <Form.Item
                      label="Position Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Position Name wajib diisi",
                        },
                      ]}
                    >
                      <Input
                        defaultValue={datacreate.name}
                        onChange={(e) => {
                          setdatacreate({
                            ...datacreate,
                            name: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Status Kontrak"
                      name="career_role_type_id"
                      rules={[
                        {
                          required: true,
                          message: "Status Kontrak wajib diisi",
                        },
                      ]}
                    >
                      <Select
                        value={
                          datacreate?.career_role_type_id &&
                          Number(datacreate?.career_role_type_id)
                        }
                        onChange={(e) => {
                          setdatacreate({
                            ...datacreate,
                            career_role_type_id: e,
                          });
                        }}
                        placeholder="Pilih status kontrak"
                      >
                        <>
                          {dataRoleTypeList?.map((option) => (
                            <Select.Option key={option.id} value={option.id}>
                              {option.name}
                            </Select.Option>
                          ))}
                        </>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Pengalaman Kerja"
                      name="career_experience_id"
                      rules={[
                        {
                          required: true,
                          message: "Pengalaman Kerja wajib diisi",
                        },
                      ]}
                    >
                      <Select
                        value={
                          datacreate?.career_experience_id &&
                          Number(datacreate?.career_experience_id)
                        }
                        onChange={(e) => {
                          setdatacreate({
                            ...datacreate,
                            career_experience_id: e,
                          });
                        }}
                        placeholder="Pilih pengalaman kerja"
                      >
                        <>
                          {dataExperience?.map((option) => (
                            <Select.Option key={option.id} value={option.id}>
                              {option.name}
                            </Select.Option>
                          ))}
                        </>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="ID Role"
                      name="career_role_type_id"
                      rules={[
                        {
                          required: true,
                          message: "Role wajib diisi",
                        },
                      ]}
                    >
                      <Select
                        showSearch={true}
                        value={
                          datacreate?.career_role_type_id &&
                          Number(datacreate?.career_role_type_id)
                        }
                        onChange={(e) => {
                          setdatacreate({
                            ...datacreate,
                            career_role_type_id: e,
                          });
                        }}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        placeholder="Pilih ID Role"
                      >
                        <>
                          {dataRoles?.map((option) => (
                            <Select.Option key={option.id} value={option.id}>
                              {option.name}
                            </Select.Option>
                          ))}
                        </>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Salary Min"
                      name="salary_min"
                      rules={[
                        {
                          required: true,
                          message: "Salary Min wajib diisi",
                        },
                      ]}
                    >
                      <CurrencyFormat
                        customInput={Input}
                        placeholder={"Masukkan Minimal Gaji"}
                        value={datacreate?.salary_min || 0}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        prefix={"Rp"}
                        allowNegative={false}
                        onValueChange={(values) => {
                          const { formattedValue, value, floatValue } = values;
                          setdatacreate((prev) => ({
                            ...prev,
                            salary_min: floatValue || 0,
                          }));
                        }}
                        renderText={(value) => <p>{value}</p>}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Salary Max"
                      name="salary_max"
                      rules={[
                        {
                          required: true,
                          message: "Salary Max wajib diisi",
                        },
                      ]}
                    >
                      <CurrencyFormat
                        customInput={Input}
                        placeholder={"Masukkan Maksimal Gaji"}
                        value={datacreate?.salary_max || 0}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        prefix={"Rp"}
                        allowNegative={false}
                        onValueChange={(values) => {
                          const { formattedValue, value, floatValue } = values;
                          setdatacreate((prev) => ({
                            ...prev,
                            salary_max: floatValue || 0,
                          }));
                        }}
                        renderText={(value) => <p>{value}</p>}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Overview"
                      name="overview"
                      rules={[
                        {
                          required: true,
                          message: "Overview wajib diisi",
                        },
                      ]}
                    >
                      <ReactQuill
                        theme="snow"
                        value={datacreate?.overview}
                        modules={modules}
                        formats={formats}
                        className="h-44 pb-10"
                        onChange={(value) => {
                          setdatacreate({
                            ...datacreate,
                            overview: value,
                          });
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Description"
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: "Description Job wajib diisi",
                        },
                      ]}
                    >
                      <ReactQuill
                        theme="snow"
                        value={datacreate?.description}
                        modules={modules}
                        formats={formats}
                        className="h-44 pb-10"
                        onChange={(value) => {
                          setdatacreate({
                            ...datacreate,
                            description: value,
                          });
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Qualification"
                      name="qualification"
                      rules={[
                        {
                          required: true,
                          message: "Qualification wajib diisi",
                        },
                      ]}
                    >
                      <ReactQuill
                        theme="snow"
                        value={datacreate?.qualification}
                        modules={modules}
                        formats={formats}
                        className="h-44 pb-10"
                        onChange={(value) => {
                          setdatacreate({
                            ...datacreate,
                            qualification: value,
                          });
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Status"
                      name="is_posted"
                      rules={[
                        {
                          required: true,
                          message: "Status wajib diisi",
                        },
                      ]}
                    >
                      <Switch
                        size="large"
                        checkedChildren="Posted"
                        unCheckedChildren="Archived"
                        defaultChecked
                        checked={datacreate?.is_posted}
                        onChange={(e) => {
                          setdatacreate({
                            ...datacreate,
                            is_posted: e == true ? 1 : 0,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="bottom-0 flex justify-end">
                    <Button
                      type="default"
                      onClick={() => {
                        setdrawcreate(false);
                      }}
                      style={{ marginRight: `1rem` }}
                    >
                      Cancel
                    </Button>
                    <Button
                      htmlType="submit"
                      type="primary"
                      danger
                      icon={<CheckIconSvg size={16} color={"#ffffff"} />}
                      loading={loadingcreate}
                    >
                      Post Lowongan Kerja
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <p
                    className={"text-mono30 text-xs font-medium leading-5 mb-6"}
                  >
                    {" "}
                    Daftar Isian *{" "}
                  </p>
                  {datacreate.question.length === 0 ? (
                    <>
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Daftar isian masih kosong"
                      />
                    </>
                  ) : (
                    datacreate.question.map((doc, idx) => {
                      return (
                        <div
                          key={idx}
                          className="bg-white flex flex-col shadow-md rounded-md p-3 mb-4 border"
                        >
                          <div className="flex items-center justify-between mb-6">
                            <span className="block">Wajib Diisi</span>
                            <Switch
                              checked={doc.required}
                              onChange={(checked) => {
                                var temp = [...datacreate.question];
                                temp[idx].required = checked;
                                setdatacreate((prev) => ({
                                  ...prev,
                                  question: temp,
                                }));
                              }}
                            />
                          </div>
                          <div key={idx} className="grid grid-cols-2 mb-3">
                            <div className="col-span-1 mr-1 mb-3 flex items-center">
                              <div className="mr-2">
                                <Input
                                  value={doc.name}
                                  placeholder="Nama"
                                  onChange={(e) => {
                                    var temp = [...datacreate.question];
                                    temp[idx].name = e.target.value;
                                    setdatacreate((prev) => ({
                                      ...prev,
                                      question: temp,
                                    }));
                                  }}
                                ></Input>
                              </div>
                            </div>
                            <div className="col-span-1 ml-1 mb-3">
                              <Select
                                key={idx}
                                // name={`name`}
                                value={doc.type}
                                style={{ width: `100%` }}
                                onChange={(value) => {
                                  var temp = [...datacreate.question];
                                  delete temp[idx].list;
                                  temp[idx].type = value;
                                  if (value === 3) {
                                    temp[idx].list = [];
                                  } else if (value === 5) {
                                    temp[idx].list = [];
                                  }
                                  temp[idx].required = false;
                                  setdatacreate((prev) => ({
                                    ...prev,
                                    question: temp,
                                  }));
                                }}
                              >
                                <Select.Option value={1}>
                                  <div className="flex items-center">
                                    <AlignJustifiedIconSvg
                                      size={12}
                                      color={`#35763B`}
                                    />
                                    Teks
                                  </div>
                                </Select.Option>
                                <Select.Option value={2}>
                                  <div className="flex items-center">
                                    <AlignJustifiedIconSvg
                                      size={12}
                                      color={`#35763B`}
                                    />
                                    Paragraf
                                  </div>
                                </Select.Option>
                                <Select.Option value={3}>
                                  <div className="flex items-center">
                                    <CheckboxIconSvg
                                      size={12}
                                      color={`#35763B`}
                                    />
                                    Ceklis
                                  </div>
                                </Select.Option>
                                <Select.Option value={4}>
                                  <div className="flex items-center">
                                    <ListNumbersSvg
                                      size={12}
                                      color={`#35763B`}
                                    />
                                    Numeral
                                  </div>
                                </Select.Option>
                                <Select.Option value={5}>
                                  <div className="flex items-center">
                                    <ListNumbersSvg
                                      size={12}
                                      color={`#35763B`}
                                    />
                                    Dropdown
                                  </div>
                                </Select.Option>
                                <Select.Option value={6}>
                                  <div className="flex items-center">
                                    <UploadIconSvg
                                      size={12}
                                      color={`#35763B`}
                                    />
                                    Unggah File
                                  </div>
                                </Select.Option>
                              </Select>
                            </div>

                            <div className="mb-5 col-span-2">
                              <Input
                                placeholder="Deskripsi"
                                value={doc.description}
                                onChange={(e) => {
                                  var temp = [...datacreate.question];
                                  temp[idx].description = e.target.value;
                                  setdatacreate((prev) => ({
                                    ...prev,
                                    question: temp,
                                  }));
                                }}
                              ></Input>
                            </div>

                            {doc.type === 3 && (
                              <div className="flex flex-col mb-3 col-span-2">
                                <div className="mb-3 flex flex-col">
                                  <div className="mb-1">
                                    <Label>Keterangan</Label>
                                  </div>
                                  {doc.list.map((doc2, idx2) => {
                                    return (
                                      <div
                                        key={idx2}
                                        className="flex items-center justify-between mb-2"
                                      >
                                        {/* <div className="cursor-pointer font-bold mr-2">
                                                                                  ::
                                                                              </div> */}
                                        <div className="flex items-center">
                                          <Checkbox
                                            style={{ marginRight: `0.5rem` }}
                                            checked
                                          />
                                          {doc2}
                                        </div>
                                        <div
                                          className=" cursor-pointer"
                                          onClick={() => {
                                            var temp = [...datacreate.question];
                                            temp[idx].list.splice(idx2, 1);
                                            setdatacreate((prev) => ({
                                              ...prev,
                                              question: temp,
                                            }));
                                          }}
                                        >
                                          <CircleXIconSvg
                                            size={15}
                                            color={`#BF4A40`}
                                          />
                                        </div>
                                      </div>
                                    );
                                  })}
                                  <div className="flex items-center">
                                    <div
                                      className="mr-1 cursor-pointer hover:text-primary100"
                                      onClick={() => {
                                        settempcb([]);
                                        var temp = [...datacreate.question];
                                        temp[idx].list.push(tempcb[idx]);
                                        setdatacreate((prev) => ({
                                          ...prev,
                                          question: temp,
                                        }));
                                      }}
                                    >
                                      <H2>+</H2>
                                    </div>
                                    <Input
                                      placeholder="Tambah"
                                      value={tempcb[idx]}
                                      onChange={(e) => {
                                        var temptempcb = [...tempcb];
                                        temptempcb[idx] = e.target.value;
                                        settempcb(temptempcb);
                                      }}
                                      bordered={false}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            {doc.type === 5 && (
                              <div className="flex flex-col mb-3 col-span-2">
                                {doc.list.map((doc4, idx4) => {
                                  return (
                                    <div
                                      key={idx4}
                                      className=" px-3 flex items-center mb-2"
                                    >
                                      {/* <div className="cursor-pointer font-bold mr-2">
                                                                              ::
                                                                          </div> */}
                                      <div className="flex items-center mr-2">
                                        <Input
                                          placeholder="Tambah"
                                          style={{ marginRight: `0.5rem` }}
                                          value={doc4}
                                          onChange={(e) => {
                                            var temp = [...datacreate.question];
                                            temp[idx].list[idx4] =
                                              e.target.value;
                                            setdatacreate((prev) => ({
                                              ...prev,
                                              question: temp,
                                            }));
                                          }}
                                          bordered={false}
                                        />
                                        <div
                                          className="cursor-pointer flex items-center text-center justify-center"
                                          onClick={() => {
                                            var temp = [...datacreate.question];
                                            temp[idx].list.splice(idx4, 1);
                                            setdatacreate((prev) => ({
                                              ...prev,
                                              question: temp,
                                            }));
                                          }}
                                        >
                                          <CircleXIconSvg
                                            size={15}
                                            color={`#BF4A40`}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                                <div className="flex items-center px-3">
                                  <div
                                    className="mr-1 cursor-pointer hover:text-primary100"
                                    onClick={() => {
                                      var temp = [...datacreate.question];
                                      temp[idx].list.push("");
                                      setdatacreate((prev) => ({
                                        ...prev,
                                        question: temp,
                                      }));
                                    }}
                                  >
                                    <h1 className="font-semibold text-sm hover:text-primary100">
                                      + Tambah Value
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* COPY dan DELETE */}
                            <div className=" col-span-2 flex justify-end">
                              <div
                                className="mx-1 cursor-pointer"
                                onClick={() => {
                                  var templastdata = {};
                                  if (doc.type === 1 || doc.type === 2) {
                                    templastdata = {
                                      name: doc.name,
                                      type: doc.type,
                                      description: doc.description,
                                    };
                                  } else if (doc.type === 3) {
                                    templastdata = {
                                      name: doc.name,
                                      type: doc.type,
                                      description: doc.description,
                                      list: [...doc.list],
                                    };
                                  } else if (doc.type === 4) {
                                    templastdata = {
                                      name: doc.name,
                                      type: doc.type,
                                      description: doc.description,
                                    };
                                  } else if (doc.type === 5) {
                                    templastdata = {
                                      name: doc.name,
                                      type: doc.type,
                                      description: doc.description,
                                      list: [...doc.list],
                                    };
                                  } else if (doc.type === 6) {
                                    templastdata = {
                                      name: doc.name,
                                      type: doc.type,
                                      description: doc.description,
                                    };
                                  }
                                  templastdata = {
                                    ...templastdata,
                                    required: doc.required,
                                  };

                                  var temp = [...datacreate.question];
                                  temp.splice(idx + 1, 0, templastdata);
                                  setdatacreate((prev) => ({
                                    ...prev,
                                    question: temp,
                                  }));
                                }}
                              >
                                <CopyIconSvg size={15} color={`#000000`} />
                              </div>
                              <div
                                className="mx-1 cursor-pointer"
                                onClick={() => {
                                  const temp = [...datacreate.question];
                                  temp.splice(idx, 1);
                                  setdatacreate((prev) => ({
                                    ...prev,
                                    question: temp,
                                  }));
                                }}
                              >
                                <TrashIconSvg size={15} color={`#000000`} />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div
                    className="mb-4 border border-dashed border-primary100 hover:border-primary75 py-2 flex justify-center items-center w-full rounded-md cursor-pointer"
                    onClick={() => {
                      setdatacreate((prev) => ({
                        ...prev,
                        question: [
                          ...prev.question,
                          {
                            type: 1,
                            name: "",
                            description: "",
                            required: false,
                          },
                        ],
                      }));
                      settempcb([...tempcb, ""]);
                    }}
                  >
                    <div className="text-primary100 hover:text-primary75">
                      + Tambah Field Baru
                    </div>
                  </div>
                  {datacreate.question.length <= 2 ? (
                    <div className="mt-4 bottom-0 absolute flex justify-end right-6 mb-6">
                      <Button
                        type="default"
                        onClick={() => {
                          setdrawcreate(false);
                        }}
                        style={{ marginRight: `1rem` }}
                      >
                        Cancel
                      </Button>
                      <Button
                        htmlType="submit"
                        type="primary"
                        danger
                        icon={<CheckIconSvg size={16} color={"#ffffff"} />}
                        loading={loadingcreate}
                      >
                        Post Lowongan Kerja
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-4 bottom-0 flex justify-end right-6 mb-6">
                      <Button
                        type="default"
                        onClick={() => {
                          setdrawcreate(false);
                        }}
                        style={{ marginRight: `1rem` }}
                      >
                        Cancel
                      </Button>
                      <Button
                        htmlType="submit"
                        type="primary"
                        danger
                        icon={<CheckIconSvg size={16} color={"#ffffff"} />}
                        loading={loadingcreate}
                      >
                        Post Lowongan Kerja
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Form>
          </div>
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
          loadingEdit={loadingedit}
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
