import { notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useAccessControl } from "contexts/access-control";

import {
  RESUME_ASSESSMENT_LIST,
  RESUME_ASSESSMENT_UPDATE,
  RESUME_DELETE,
  RESUME_GET,
  RESUME_SECTION_ADD,
  RESUME_SECTION_DELETE,
  RESUME_SKILL_LISTS,
  RESUME_UPDATE,
} from "lib/features";

import MdChevronDown from "assets/vectors/icon-chevron-down.svg";

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

const CVDetail = ({ initProps, dataProfile, sidemenu, cvdetailId }) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetCandidateDetail = hasPermission(RESUME_GET);
  const isAllowedToUpdateCandidate = hasPermission(RESUME_UPDATE);
  const isAllowedToDeleteCandidate = hasPermission(RESUME_DELETE);

  const isAllowedToAddSection = hasPermission(RESUME_SECTION_ADD);
  const isAllowedToDeleteSection = hasPermission(RESUME_SECTION_DELETE);

  const isAllowedToUpdateResumeAssessment = hasPermission(
    RESUME_ASSESSMENT_UPDATE
  );

  const isAllowedToGetAssessmentList = hasPermission(RESUME_ASSESSMENT_LIST);
  const isAllowedToGetSkillLists = hasPermission(RESUME_SKILL_LISTS);

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
            Need to Review (6)
          </p>
          <div className={"p-1.5 flex gap-1.5 "}>
            <LeftIconSvg size={16} color={"#E6E6E6"} />
            <p className={"text-[#808080] text-xs leading-5 font-medium"}>
              1 of 5
            </p>
            <RightIconSvg size={16} color={"#35763B"} />
          </div>
        </div>
        <div className={"mt-6 flex gap-[10px]"}>
          {dataExample.map((doc, idx) => (
            <div
              onClick={() => setIdChoose(doc.id)}
              className={`w-1/5 px-3 py-2.5 rounded-[5px] ${
                doc.id == idChoose ? "bg-primary100" : "bg-white"
              } border-1.5 ${
                doc.id == idChoose ? "border-primary100" : "border-[#E6E6E6]"
              } hover:cursor-pointer`}
            >
              <div className={"flex flex-col gap-2"}>
                <p
                  className={`${
                    doc.id == idChoose ? "text-white" : "text-mono30"
                  } text-sm leading-6 font-bold`}
                >
                  {doc.nama}
                </p>
                <div className={"flex flex-col gap-1"}>
                  <div className={"flex gap-1 items-start"}>
                    <StarFillIconSvg color={"#E9C600"} />
                    <p className={"text-[#E9C600] text-[10px] font-medium"}>
                      {doc.jurusan} {doc.kampus} {doc.tahun_lulus}
                    </p>
                  </div>
                  <div className={"flex gap-1 items-start"}>
                    <RocketIconSvg
                      color={doc.id == idChoose ? "white" : "#4D4D4D"}
                    />
                    <p
                      className={`${
                        doc.id == idChoose ? "text-white" : "text-mono30"
                      } text-[10px] font-medium`}
                    >
                      {doc.skills.map((skill, index) => (
                        <span key={index}>
                          {skill}
                          {index < doc.skills.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={"mt-6"}>
          <p className={"text-[#4D4D4D] text-lg leading-6 font-bold"}>
            Lulu Agustin
          </p>
        </div>
        <div className={"mt-2 flex gap-4"}>
          <div
            className={
              "border border-[#E6E6E6] rounded-[10px] bg-white w-2/5 h-[750px]"
            }
          ></div>
          <div className={"flex flex-col w-3/5"}>
            <PersonalInfoCard />
            <ExperienceInfoCard />
            <EducationInfoCard />
            <SkillCard />
            <LanguageCard />
            <ToolsCard />
            <EvaluationCard />
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const cvdetailId = params.cvdetailId;
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
      cvdetailId,
    },
  };
}

export default CVDetail;
