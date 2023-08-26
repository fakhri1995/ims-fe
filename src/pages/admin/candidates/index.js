import { DownloadOutlined } from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Input, Modal, Select, Spin, Switch, notification } from "antd";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import QueryString from "qs";
import { useCallback, useEffect, useState } from "react";

import { AccessControl } from "components/features/AccessControl";
import { AddNewFormButton } from "components/screen/resume";

import { useAccessControl } from "contexts/access-control";

import {
  RESUMES_GET,
  RESUME_ADD,
  RESUME_ASSESSMENT_LIST,
  RESUME_COUNT_GET,
  RESUME_GET,
} from "lib/features";

import ButtonSys from "../../../components/button";
import { ChartDoughnut } from "../../../components/chart/chartCustom";
import { DownloadIcon2Svg, DownloadIconSvg } from "../../../components/icon";
import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import ModalCore from "../../../components/modal/modalCore";
import { TableCustomCandidate } from "../../../components/table/tableCustom";
import { H1, H2, Label, Text } from "../../../components/typography";
import {
  createKeyPressHandler,
  permissionWarningNotification,
} from "../../../lib/helper";
import { ResumePDFTemplate } from "./[candidateId]";
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

const CandidatesIndex = ({ initProps, dataProfile, sidemenu }) => {
  // 1. Init
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetResumeList = hasPermission(RESUMES_GET);
  const isAllowedToGetResumeCount = hasPermission(RESUME_COUNT_GET);
  const isAllowedToAddResume = hasPermission(RESUME_ADD);
  const isAllowedToGetAssessmentList = hasPermission(RESUME_ASSESSMENT_LIST);

  const canDownloadResume = hasPermission(RESUME_GET);

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, undefined),
    sort_type: withDefault(StringParam, undefined),
    assessment_ids: withDefault(NumberParam, undefined),
  });

  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);

  // 2. State
  // 2.1. Card Role Kandidat & Total Kandidat
  const [loadingResumeCountData, setLoadingResumeCountData] = useState(true);
  const [dataCountResumes, setDataCountResumes] = useState(0);
  const [topCandidateCount, setTopCandidateCount] = useState([]);
  const [showLogoStatus, setShowLogoStatus] = useState(true);

  // 2.2. Table Semua Kandidat
  const [dataTable, setDataTable] = useState([]);
  const [dataRawResume, setDataRawResume] = useState({
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
  const [loadingResumeList, setLoadingResumeList] = useState(true);

  // Filter
  const [selectedRoleId, setSelectedRoleId] = useState(undefined);
  const [searchingFilterResume, setSearchingFilterResume] = useState("");
  const [loadingRoleList, setLoadingRoleList] = useState(false);
  const [roleList, setRoleList] = useState([]);

  // 2.3. Download Resume
  const [candidateId, setCandidateId] = useState(null);
  const [dataResume, setDataResume] = useState();
  const [loadingResumeData, setLoadingResumeData] = useState(false);
  const [openDownloadModal, setOpenDownloadModal] = useState(false);

  // 3.UseEffect
  // 3.1. Get role filter option
  useEffect(() => {
    if (!isAllowedToGetAssessmentList) {
      permissionWarningNotification("Mendapatkan", "Daftar Role");
      setLoadingRoleList(false);
      return;
    }

    setLoadingRoleList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssessmentList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setRoleList(res2.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingRoleList(false);
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingRoleList(false);
      });
  }, [isAllowedToGetAssessmentList]);

  // 3.2. Get resume count
  useEffect(() => {
    if (!isAllowedToGetResumeCount) {
      permissionWarningNotification("Mendapatkan", "Resume Count");
      setLoadingResumeCountData(false);
      return;
    }

    setLoadingResumeCountData(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCountResume`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataCountResumes(res2.data.assessments_count);
          setTopCandidateCount(res2.data.resume_assessments_count.slice(0, 5));
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingResumeCountData(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingResumeCountData(false);
      });
  }, [isAllowedToGetResumeCount]);

  // 3.3. Get resume list
  useEffect(() => {
    if (!isAllowedToGetResumeList) {
      permissionWarningNotification("Mendapatkan", "Daftar Kandidat");
      setLoadingResumeList(false);
      return;
    }

    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const fetchData = async () => {
      setLoadingResumeList(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getResumes${payload}&keyword=${searchingFilterResume}`,
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
            setDataRawResume(res2.data);
            setDataTable(res2.data.data);
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
        .finally(() => setLoadingResumeList(false));
    };

    const timer = setTimeout(() => fetchData(), 500);

    return () => clearTimeout(timer);
  }, [
    isAllowedToGetResumeList,
    searchingFilterResume,
    queryParams.page,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
    queryParams.assessment_ids,
  ]);

  // 3.4. Get a resume data to download as PDF
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

  /** State to only renders `<PDFDownloadLink>` component after dataResume is available (client-side) */
  const [isOnClient, setIsOnClient] = useState(false);
  useEffect(() => {
    if (dataResume) {
      setIsOnClient(true);
    }
  }, [dataResume]);

  // 4. Event
  const onAddNewCandidateButtonClicked = useCallback(() => {
    rt.push("/admin/candidates/create");
  }, []);

  const onFilterResume = () => {
    setQueryParams({
      assessment_ids: selectedRoleId,
    });
  };

  const { onKeyPressHandler } = createKeyPressHandler(onFilterResume, "Enter");

  // 5. Candidate Table's Columns
  const columnsResume = [
    {
      title: "No.",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <h1 className="text-center">{dataRawResume?.from + index}</h1>
            </>
          ),
        };
      },
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <h1>{record.name}</h1>
            </>
          ),
        };
      },
      sorter: isAllowedToGetResumeList
        ? (a, b) => a.name.toLowerCase() > b.name.toLowerCase()
        : false,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <h1 className="">{record.assessment?.name}</h1>
            </>
          ),
        };
      },
      sorter: isAllowedToGetResumeList
        ? (a, b) =>
            a.assessment?.name.toLowerCase() > b.assessment?.name.toLowerCase()
        : false,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <h1 className="">{record.email}</h1>
            </>
          ),
        };
      },
    },
    {
      title: "Nomor Handphone",
      dataIndex: "telp",
      key: "telp",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <h1 className="">{record.telp}</h1>
            </>
          ),
        };
      },
    },
    {
      key: "button_download",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex items-center space-x-2">
              <ButtonSys
                type={"default"}
                onClick={(event) => {
                  event.stopPropagation();
                  setCandidateId(record.id);
                  setOpenDownloadModal(true);
                }}
              >
                <DownloadOutlined />
              </ButtonSys>
            </div>
          ),
        };
      },
    },
  ];

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
    >
      <div className="grid grid-cols-1">
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col space-y-6 lg:px-5 lg:w-1/3">
            <AddNewFormButton
              title="Tambah Kandidat"
              disabled={!isAllowedToAddResume}
              onButtonClicked={onAddNewCandidateButtonClicked}
            />
            {/* CHART ROLE KANDIDAT */}
            {loadingResumeCountData ? (
              <>
                <Spin />
              </>
            ) : (
              <ChartDoughnut
                title={"Role Kandidat"}
                dataChart={topCandidateCount}
                objName="name"
                value={"resumes_count"}
              />
            )}

            {/* CARD TOTAL KANDIDAT */}
            <div className="flex flex-row justify-between items-center shadow-md rounded-md bg-white p-5 ">
              <H1>Total Kandidat</H1>
              <p className="font-semibold text-4xl">{dataCountResumes}</p>
            </div>
          </div>

          {/* TABEL SEMUA KANDIDAT */}
          <div className="lg:w-2/3 flex flex-col shadow-md rounded-md bg-white p-5 mt-6 md:mt-0">
            <h4 className="mig-heading--4">Semua Kandidat</h4>
            <div className="mt-5 flex flex-col">
              <div className="flex flex-row w-full mb-5 space-x-4">
                <Input
                  defaultValue={searchingFilterResume}
                  style={{ width: `100%` }}
                  placeholder="Kata Kunci.."
                  allowClear
                  onChange={(e) => {
                    setSearchingFilterResume(e.target.value);
                  }}
                  onKeyPress={onKeyPressHandler}
                  disabled={!isAllowedToGetResumeList}
                />

                <Select
                  disabled={!isAllowedToGetAssessmentList}
                  placeholder="Semua Role"
                  defaultValue={queryParams.assessment_ids}
                  allowClear
                  style={{ width: `50%` }}
                  onChange={(value) => {
                    setQueryParams({ assessment_ids: value });
                    setSelectedRoleId(value);
                  }}
                >
                  {roleList.map((doc) => (
                    <Select.Option key={doc.id} value={doc.id}>
                      {doc.name}
                    </Select.Option>
                  ))}
                </Select>

                <ButtonSys
                  type={"primary"}
                  onClick={onFilterResume}
                  disabled={!isAllowedToGetResumeList}
                >
                  Cari
                </ButtonSys>
              </div>
              <TableCustomCandidate
                rt={rt}
                dataSource={dataTable}
                columns={columnsResume}
                loading={loadingResumeList}
                total={dataRawResume?.total}
                queryParams={queryParams}
                setQueryParams={setQueryParams}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Unduh Resume */}
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
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
  var initProps = {};
  if (req && req.headers) {
    const cookies = req.headers.cookie;
    if (!cookies) {
      res.writeHead(302, { Location: "/login" });
      res.end();
    }
    if (typeof cookies === "string") {
      const cookiesJSON = httpcookie.parse(cookies);
      initProps = cookiesJSON.token;
    }
  }
  const resources = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjson = await resources.json();
  const dataProfile = resjson;

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "102",
    },
  };
}

export default CandidatesIndex;
