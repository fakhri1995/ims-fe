import { Button, Modal, notification } from "antd";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import QueryString from "qs";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { useAccessControl } from "contexts/access-control";

import { RECRUITMENTS_GET } from "lib/features";

import EducationInfoCard from "../../../../components/cards/resume/educationinfo/EducationInfoCard";
import EvaluationCard from "../../../../components/cards/resume/evaluation/EvaluationCard";
import ExperienceInfoCard from "../../../../components/cards/resume/experienceinfo/ExperienceInfoCard";
import LanguageCard from "../../../../components/cards/resume/language/LanguageCard";
import PersonalInfoCard from "../../../../components/cards/resume/personalinfo/PersonalInfoCard";
import SkillCard from "../../../../components/cards/resume/skill/SkillCard";
import ToolsCard from "../../../../components/cards/resume/tools/ToolsCard";
import {
  DownIconSvg,
  EditCvIconSvg,
  LeftIconSvg,
  LineDownIconSvg,
  RightIconSvg,
  RocketIconSvg,
  StarFillIconSvg,
} from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard-management";
import st from "../../../../components/layout-dashboard-management.module.css";
import {
  momentFormatDate,
  objectToFormData,
  objectToFormDataNew,
  permissionWarningNotification,
} from "../../../../lib/helper";
import httpcookie from "cookie";

const CVDetail = ({ initProps, dataProfile, sidemenu }) => {
  /**
   * Dependencies
   */

  if (typeof window !== "undefined") {
    pdfjs.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs";
  }

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetRecruitments = hasPermission(RECRUITMENTS_GET);

  //INIT
  const rt = useRouter();

  // Breadcrumb url
  const pathArr = rt.asPath.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  // use when this page comes from Recruitment Detail
  // url path: `/admin/recruitment/:recruitmentId/:resumeId` (config in next.config.js)
  if (pathTitleArr.length === 4) {
    pathTitleArr.splice(1, 1);
    pathTitleArr.splice(1, 1, "Candidates", "CV");
  }

  pathTitleArr[pathTitleArr.length - 1] = "Detail CV";
  const [idChoose, setIdChoose] = useState(null);
  const [modalValidate, setModalValidate] = useState(false);
  const [loadingValidate, setLoadingValidate] = useState(false);
  const [dataChoose, setDataChoose] = useState({
    id: null,
    name: null,
    cv_path: null,
    skill_set: null,
  });
  const [dataSkillSet, setDataSkillSet] = useState([]);
  const [personalInfo, setDataPersonalInfo] = useState({
    id: null,
    name: null,
    email: null,
    location: null,
    phone: null,
    linkedin: null,
    summary: null,
  });
  const [toolData, setToolData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [educationInfo, setDataEducationInfo] = useState({
    name: null,
    degree: null,
    field: null,
    gpa: null,
    location: null,
    honors: null,
    relevant_coursework: null,
  });
  const [evaluationData, setEvaluationData] = useState({
    id: null,
    grammar_and_spelling: null,
    content_validity: null,
    skill_alignment: null,
    flags: null,
    improvement_points: null,
  });
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [formEdit, setFormEdit] = useState({
    personal: false,
    experience: false,
    education: false,
    skill: false,
    languages: false,
    tools: false,
    evaluation: false,
  });
  const dataExample = [
    {
      id: 1,
      nama: "Andi Pratama",
      jurusan: "Informatika",
      kampus: "Universitas Indonesia",
      tahun_lulus: 2022,
      skills: ["Java", "Python", "HTML", "CSS"],
    },
    {
      id: 2,
      nama: "Siti Aisyah",
      jurusan: "Sistem Informasi",
      kampus: "Institut Teknologi Bandung",
      tahun_lulus: 2021,
      skills: ["JavaScript", "React", "Node.js", "SQL"],
    },
    {
      id: 3,
      nama: "Budi Santoso",
      jurusan: "Teknik Komputer",
      kampus: "Universitas Gadjah Mada",
      tahun_lulus: 2023,
      skills: ["C", "C++", "Java", "Git"],
    },
    {
      id: 4,
      nama: "Rina Melati",
      jurusan: "Desain Komunikasi Visual",
      kampus: "Institut Seni Indonesia",
      tahun_lulus: 2020,
      skills: ["Adobe Photoshop", "Illustrator", "HTML", "JavaScript"],
    },
    {
      id: 5,
      nama: "Hendra Wijaya",
      jurusan: "Teknik Elektro",
      kampus: "Universitas Diponegoro",
      tahun_lulus: 2022,
      skills: ["Embedded Systems", "C", "Python", "MATLAB"],
    },
  ];
  const [refresh, setRefresh] = useState(-1);
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

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 5),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
  });

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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getPendingRecruitmentsAI${payload}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          // console.log("get api ai bro ", res2);
          if (res2.success) {
            setDataRawRecruitments(res2.data);
            setDataRecruitments(res2.data.data);
            if (res2.data.data.length > 0) {
              let doc = res2.data.data[0];
              onChooseData(doc);
            }
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
    queryParams.page,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
  ]);

  const onChooseData = (doc) => {
    console.log("on choose ", doc);
    let skillset = null;
    let path = null;
    if (doc.lampiran.length > 0) {
      path = "https://cdn.mig.id/" + doc.lampiran[0].isi_lampiran;
    }
    if (doc.resume) {
      skillset = doc.resume?.skills;
      setDataPersonalInfo({
        ...personalInfo,
        id: doc.resume?.id,
        name: doc.resume?.name,
        email: doc.resume?.email,
        phone: doc.resume?.telp,
        location: doc.resume?.location,
        linkedin: doc.resume?.linkedin,
        summary: doc.resume?.summary,
      });
      if (skillset) {
        setDataSkillSet(skillset);
      } else {
        setDataSkillSet([]);
      }
      if (doc.resume.last_education) {
        setDataEducationInfo({
          ...educationInfo,
          name: doc.resume.last_education.university,
          field: doc.resume.last_education.major,
          gpa: doc.resume.last_education.gpa,
        });
      }
      if (doc.resume.tools) {
        setToolData(doc.resume.tools);
      } else {
        setToolData([]);
      }
      if (doc.resume.experiences) {
        setExperienceData(doc.resume.experiences);
      } else {
        setExperienceData([]);
      }
      if (doc.resume.evaluation) {
        let evaluation = doc.resume.evaluation;
        setEvaluationData({
          ...evaluationData,
          id: doc.resume.id,
          grammar_and_spelling: evaluation.grammar_and_spelling,
          content_validity: evaluation.content_validity,
          skill_alignment: evaluation.skill_alignment,
          flags: evaluation.flags,
          improvement_points: evaluation.improvement_points,
        });
      } else {
        setEvaluationData({
          ...evaluationData,
          id: doc.resume.id,
          grammar_and_spelling: null,
          content_validity: null,
          skill_alignment: null,
          flags: null,
          improvement_points: null,
        });
      }
    } else {
      setDataPersonalInfo({
        ...personalInfo,
        id: null,
        name: null,
        email: null,
        phone: null,
        location: null,
        linkedin: null,
        summary: null,
      });
      setDataEducationInfo({
        ...educationInfo,
        name: null,
        field: null,
        gpa: null,
      });
    }
    setDataChoose({
      id: doc.id,
      name: doc.name,
      cv_path: path,
      skill_set: skillset,
    });
    setFormEdit({
      ...formEdit,
      personal: false,
      experience: false,
      education: false,
      skill: false,
      languages: false,
      tools: false,
      evaluation: false,
    });
  };
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Navigasi ke halaman berikutnya
  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  // Navigasi ke halaman sebelumnya
  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleValidate = () => {};

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
      backgroundColor={"#FFFFFF"}
    >
      <div className="grid grid-cols-1">
        <div className={"flex justify-between"}>
          <p className={"text-[#4D4D4D] text-lg leading-6 font-bold"}>
            Need to Review ({dataRawRecruitments.total ?? "0"})
          </p>
          <div className={"p-1.5 flex gap-1.5 "}>
            {dataRawRecruitments?.from == 1 ? (
              <LeftIconSvg size={16} color={"#E6E6E6"} />
            ) : (
              <div
                className={"hover:cursor-pointer"}
                onClick={() =>
                  setQueryParams({
                    ...queryParams,
                    page: dataRawRecruitments?.current_page - 1,
                  })
                }
              >
                <LeftIconSvg size={16} color={"#35763B"} />
              </div>
            )}
            <p className={"text-[#808080] text-xs leading-5 font-medium"}>
              {dataRawRecruitments?.from} of {dataRawRecruitments?.to}
            </p>
            {dataRawRecruitments?.current_page ==
            dataRawRecruitments?.last_page ? (
              <RightIconSvg size={16} color={"#E6E6E6"} />
            ) : (
              <div
                className={"hover:cursor-pointer"}
                onClick={() =>
                  setQueryParams({
                    ...queryParams,
                    page: dataRawRecruitments?.from + 1,
                  })
                }
              >
                <RightIconSvg size={16} color={"#35763B"} />
              </div>
            )}
          </div>
        </div>
        <div className={"mt-6 flex gap-[10px]"}>
          {dataRecruitments?.map((doc, idx) => (
            <div
              onClick={() => onChooseData(doc)}
              className={`w-1/5 px-3 py-2.5 rounded-[5px] ${
                doc.id == dataChoose?.id ? "bg-primary100" : "bg-white"
              } border-1.5 ${
                doc.id == dataChoose?.id
                  ? "border-primary100"
                  : "border-[#E6E6E6]"
              } hover:cursor-pointer`}
            >
              <div className={"flex flex-col gap-2"}>
                <p
                  className={`${
                    doc.id == dataChoose?.id ? "text-white" : "text-mono30"
                  } text-sm leading-6 font-bold`}
                >
                  {doc.name}
                </p>
                <div className={"flex flex-col gap-1"}>
                  <div className={"flex gap-1 items-start"}>
                    <StarFillIconSvg color={"#E9C600"} />
                    <p className={"text-[#E9C600] text-[10px] font-medium"}>
                      {doc?.resume?.last_education?.university}
                    </p>
                  </div>
                  <div className={"flex gap-1 items-start"}>
                    <RocketIconSvg
                      color={doc.id == dataChoose?.id ? "white" : "#4D4D4D"}
                    />
                    {doc?.resume?.skills ? (
                      <p
                        className={`${
                          doc.id == dataChoose?.id
                            ? "text-white"
                            : "text-mono30"
                        } text-[10px] font-medium`}
                      >
                        {doc?.resume?.skills.map((skill, index) => (
                          <span key={index}>
                            {skill.name}
                            {index < doc?.resume?.skills.length - 1 && ", "}
                          </span>
                        ))}
                      </p>
                    ) : (
                      <p
                        className={`${
                          doc.id == dataChoose?.id
                            ? "text-white"
                            : "text-mono30"
                        } text-[10px] font-medium`}
                      >
                        -
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={"mt-6 flex justify-between mb-2"}>
          <p className={"text-[#4D4D4D] text-lg leading-6 font-bold"}>
            {dataChoose?.name}
          </p>
          <div
            onClick={() => setModalValidate(true)}
            className={
              "hover:cursor-pointer btn btn-sm text-white font-semibold px-6 border bg-primary100 hover:bg-primary75 border-primary100 hover:border-primary75 focus:bg-primary100 focus:border-primary100 flex-nowrap w-full md:w-fit"
            }
          >
            Validate
          </div>
        </div>
        <div className={"mt-2 flex gap-4"}>
          <div
            className={`border border-[#E6E6E6] rounded-[10px] bg-white ${
              dataChoose?.cv_path ? "max-w-2/5" : "w-3/5"
            } p-4`}
          >
            {dataChoose?.cv_path && (
              <Document
                re
                file={{
                  url: dataChoose?.cv_path,
                }}
                onLoadError={(error) => console.log("Inside Error", error)}
                onLoadSuccess={onLoadSuccess}
              >
                <Page
                  pageNumber={pageNumber}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Document>
            )}
            {dataChoose?.cv_path && (
              <div className={"flex justify-center gap-2"}>
                <Button onClick={goToPrevPage} disabled={pageNumber === 1}>
                  Previous
                </Button>
                <Button
                  onClick={goToNextPage}
                  disabled={pageNumber === numPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
          <div className={"flex flex-col w-3/5"}>
            <PersonalInfoCard
              dataPersonalInfo={personalInfo}
              setDataPersonalInfo={setDataPersonalInfo}
              initProps={initProps}
              idResume={dataChoose?.id}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              statusEdit={formEdit.personal}
              data={personalInfo}
            />
            <ExperienceInfoCard data={experienceData} />
            <EducationInfoCard
              data={educationInfo}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              statusEdit={formEdit.education}
            />
            <SkillCard
              skillSet={dataSkillSet}
              initProps={initProps}
              formEdit={formEdit}
              statusEdit={formEdit.skill}
              setFormEdit={setFormEdit}
              setData={setDataSkillSet}
            />
            <LanguageCard />
            <ToolsCard
              data={toolData}
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              statusEdit={formEdit.tools}
            />
            <EvaluationCard
              formEdit={formEdit}
              setFormEdit={setFormEdit}
              statusEdit={formEdit.evaluation}
              data={evaluationData}
              setEvaluationData={setEvaluationData}
              initProps={initProps}
            />
          </div>
          <Modal
            title={
              <h1 className="font-semibold">
                Apakah anda yakin ingin validate data dengan nama "
                <span className={"font-bold"}>{dataChoose?.name}</span>"?
              </h1>
            }
            visible={modalValidate}
            onCancel={() => {
              setModalValidate(false);
            }}
            okText="Ya"
            cancelText="Tidak"
            onOk={handleValidate}
            okButtonProps={{ loading: loadingValidate }}
          >
            {/* <div className="flex flex-col">
              <div className="flex flex-col">
                <p className="mb-0">Notes</p>
                <Input
                  placeholder="Masukkan Notes"
                  onChange={(e) => {
                    setupdatedata((prev) => {
                      var temp = prev;
                      temp.notes = e.target.value;
                      return temp;
                    });
                  }}
                ></Input>
              </div>
            </div> */}
          </Modal>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res, params }) {
  //   const cvdetailId = params.cvdetailId;
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
      sidemenu: "102",
    },
  };
}

export default CVDetail;
