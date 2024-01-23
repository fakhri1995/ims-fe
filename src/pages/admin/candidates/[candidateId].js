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

import AssessmentResultCard from "../../../components/cards/resume/AssessmentResultCard";
import BasicInfoCard from "../../../components/cards/resume/BasicInfoCard";
import SkillCard from "../../../components/cards/resume/SkillCard";
import SummaryCard from "../../../components/cards/resume/SummaryCard";
import AcademicCard from "../../../components/cards/resume/academic/AcademicCard";
import ExperienceCard from "../../../components/cards/resume/experience/ExperienceCard";
import GeneralCard from "../../../components/cards/resume/general/GeneralCard";
import ProjectCard from "../../../components/cards/resume/project/ProjectCard";
import LayoutDashboard from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import {
  momentFormatDate,
  objectToFormData,
  objectToFormDataNew,
  permissionWarningNotification,
} from "../../../lib/helper";
import httpcookie from "cookie";

const CandidateDetail = ({ initProps, dataProfile, sidemenu, candidateId }) => {
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
    pathTitleArr.splice(1, 1, "Rekrutmen", "Detail Kandidat");
  }

  pathTitleArr[pathTitleArr.length - 1] = "Resume Kandidat";

  // 1. STATE
  // 1.1. display
  const [praloading, setpraloading] = useState(true);
  const [dataDisplay, setDataDisplay] = useState({
    id: null,
    name: "",
    telp: "",
    email: "",
    city: "",
    province: "",
    assessment_id: null,
    educations: [],
    experiences: [],
    projects: [],
    skills: [],
    trainings: [],
    certificates: [],
    achievements: [],
    assessment: {},
    assessment_results: [],
    summaries: {},
  });
  const [assessmentRoles, setAssessmentRoles] = useState([]);
  const [loadingRoleList, setLoadingRoleList] = useState(false);
  const [refresh, setRefresh] = useState(-1);

  // 1.2. update
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [dataUpdateBasic, setDataUpdateBasic] = useState({
    name: "",
    telp: "",
    email: "",
    assessment_id: "",
    city: "",
    province: "",
    profile_image: "",
  });

  const [dataSummary, setDataSummary] = useState({
    id: "",
    description: "",
  });

  // 1.3. delete
  const [loadingDelete, setLoadingDelete] = useState(false);

  // 2. USE EFFECT
  // 2.1 Get candidate/resume detail
  useEffect(() => {
    if (!isAllowedToGetCandidateDetail) {
      permissionWarningNotification("Mendapatkan", "Detail Kandidat");
      setpraloading(false);
      return;
    }

    if (candidateId) {
      setpraloading(true);
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
            setDataDisplay(response2.data);
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
  }, [isAllowedToGetCandidateDetail, candidateId, refresh]);

  // 2.2. Get role option
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
          setAssessmentRoles(res2.data);
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
        false;
      });
  }, [isAllowedToGetAssessmentList]);

  // 3. HANDLER
  // 3.1. Section
  const handleAddSection = (sectionName, data) => {
    const payload = {
      id: Number(candidateId),
      [sectionName]: data,
    };

    if (!isAllowedToAddSection) {
      permissionWarningNotification("Menambah", `Section  ${sectionName}`);
      return;
    }

    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addResumeSection`, {
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
            message: `Section ${sectionName} berhasil ditambahkan.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal menambahkan section ${sectionName}. ${response2.message}`,
            duration: 3,
          });
        }
        setLoadingUpdate(false);
        // setData({ id: null, name: "", add: [{ criteria: "" }] });
        // rt.push(`/admin/candidates/${candidateId}`);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan section ${sectionName}. ${err.response}`,
          duration: 3,
        });
        setLoadingUpdate(false);
      });
  };

  const handleUpdateSection = (sectionName, data) => {
    if (!isAllowedToUpdateCandidate) {
      permissionWarningNotification("Mengubah", `Section ${sectionName}`);
      return;
    }

    const payloadFormData = objectToFormDataNew({
      id: Number(candidateId),
      _method: "PUT",
      [sectionName]: data,
    });

    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateResume`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
      },
      body: payloadFormData,
    })
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          notification.success({
            message: `Berhasil mengubah section ${sectionName}.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal mengubah section ${sectionName}. ${response2.message}`,
            duration: 3,
          });
        }
        setLoadingUpdate(false);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengubah section ${sectionName}. ${err.response}`,
          duration: 3,
        });
        setLoadingUpdate(false);
      });
  };

  const handleDeleteSection = (sectionName, sectionId) => {
    const payload = {
      id: Number(candidateId),
      [sectionName + "_id"]: sectionId,
    };

    if (!isAllowedToDeleteSection) {
      permissionWarningNotification("Menghapus", `Section ${sectionName}`);
      return;
    }

    setLoadingDelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteResumeSection`, {
      method: "DELETE",
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
            message: `Berhasil menghapus ${sectionName}.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal menghapus ${sectionName}. ${response2.message}`,
            duration: 3,
          });
        }
        setLoadingDelete(false);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus ${sectionName}. ${err.response}`,
          duration: 3,
        });
        setLoadingDelete(false);
        // setdatacreate({ id: null, name: "", add: [{ criteria: "" }] });
      });
  };

  // 3.2. Assessment Result
  const handleUpdateAssessment = (data) => {
    if (!isAllowedToUpdateResumeAssessment) {
      permissionWarningNotification("Mengubah", `Nilai Assessment Results`);
      return;
    }

    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateResumeAssessment`, {
      method: "PUT",
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
            message: `Nilai assessment berhasil diubah.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal mengubah nilai assessment. ${response2.message}`,
            duration: 3,
          });
        }
        setLoadingUpdate(false);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengubah nilai assessment. ${err.response}`,
          duration: 3,
        });
        setLoadingUpdate(false);
      });
  };

  // 3.3. Resume/Candidate
  const handleDeleteResume = () => {
    const payload = {
      id: Number(candidateId),
    };

    if (!isAllowedToDeleteCandidate) {
      permissionWarningNotification(("Menghapus", `Kandidat`));
      return;
    }

    setLoadingDelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteResume`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          notification.success({
            message: `Berhasil menghapus kandidat dengan nama ${dataDisplay.name}.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal menghapus kandidat dengan nama ${dataDisplay.name}. ${response2.message}`,
            duration: 3,
          });
        }
        setTimeout(() => {
          setLoadingDelete(false);
          setDataDisplay({
            id: null,
            name: "",
            telp: "",
            email: "",
            city: "",
            province: "",
            assessment_id: null,
            educations: [],
            experiences: [],
            projects: [],
            skills: [],
            trainings: [],
            certificates: [],
            achievements: [],
            assessment: {},
            assessment_results: [],
          });
          rt.push(`/admin/candidates`);
        }, 500);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus kandidat dengan nama ${dataDisplay.name}. ${err.response}`,
          duration: 3,
        });
        setLoadingDelete(false);
        setDataDisplay({
          id: null,
          name: "",
          telp: "",
          email: "",
          city: "",
          province: "",
          assessment_id: null,
          educations: [],
          experiences: [],
          projects: [],
          skills: [],
          trainings: [],
          certificates: [],
          achievements: [],
          assessment: {},
          assessment_results: [],
        });
      });
  };

  //DEBUG

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="grid grid-cols-1">
        {/* SECTION BASIC INFO */}
        <BasicInfoCard
          dataDisplay={dataDisplay}
          dataUpdateBasic={dataUpdateBasic}
          setDataUpdateBasic={setDataUpdateBasic}
          handleUpdate={handleUpdateSection}
          handleDelete={handleDeleteResume}
          praloading={praloading}
          assessmentRoles={assessmentRoles}
          isAllowedToDeleteCandidate={isAllowedToDeleteCandidate}
          isAllowedToGetAssessmentList={isAllowedToGetAssessmentList}
          isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
          loadingDelete={loadingDelete}
          loadingUpdate={loadingUpdate}
        />

        <SummaryCard
          dataDisplay={dataDisplay}
          dataSummary={dataSummary}
          setDataSummary={setDataSummary}
          handleAddSection={handleAddSection}
          handleUpdateSection={handleUpdateSection}
          handleDelete={handleDeleteResume}
          praloading={praloading}
          assessmentRoles={assessmentRoles}
          isAllowedToDeleteCandidate={isAllowedToDeleteCandidate}
          isAllowedToGetAssessmentList={isAllowedToGetAssessmentList}
          isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
          loadingDelete={loadingDelete}
          loadingUpdate={loadingUpdate}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col w-full gap-6">
            {/* SECTION ACADEMIC */}
            <AcademicCard
              dataDisplay={dataDisplay?.educations}
              setDataDisplay={setDataDisplay}
              handleAddSection={handleAddSection}
              handleUpdateSection={handleUpdateSection}
              handleDeleteSection={handleDeleteSection}
              loadingDelete={loadingDelete}
              isAllowedToAddSection={isAllowedToAddSection}
              isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
              isAllowedToDeleteSection={isAllowedToDeleteSection}
            />

            {/* SECTION EXPERIENCE */}
            <ExperienceCard
              dataDisplay={dataDisplay?.experiences}
              handleAddSection={handleAddSection}
              handleUpdateSection={handleUpdateSection}
              handleDeleteSection={handleDeleteSection}
              loadingDelete={loadingDelete}
              isAllowedToAddSection={isAllowedToAddSection}
              isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
              isAllowedToDeleteSection={isAllowedToDeleteSection}
            />

            {/* SECTION PROJECT */}
            <ProjectCard
              dataDisplay={dataDisplay?.projects}
              handleAddSection={handleAddSection}
              handleUpdateSection={handleUpdateSection}
              handleDeleteSection={handleDeleteSection}
              loadingDelete={loadingDelete}
              isAllowedToAddSection={isAllowedToAddSection}
              isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
              isAllowedToDeleteSection={isAllowedToDeleteSection}
            />
          </div>
          <div className="flex flex-col w-full gap-6">
            {/* SECTION SKILLS */}
            <SkillCard
              initProps={initProps}
              dataDisplay={dataDisplay}
              handleAddSection={handleAddSection}
              handleDeleteSection={handleDeleteSection}
              isAllowedToGetSkillLists={isAllowedToGetSkillLists}
              isAllowedToAddSection={isAllowedToAddSection}
              isAllowedToDeleteSection={isAllowedToDeleteSection}
            />

            {/* SECTION TRAINING */}
            <GeneralCard
              dataDisplay={dataDisplay?.trainings}
              handleAddSection={handleAddSection}
              handleUpdateSection={handleUpdateSection}
              handleDeleteSection={handleDeleteSection}
              loadingDelete={loadingDelete}
              isAllowedToAddSection={isAllowedToAddSection}
              isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
              isAllowedToDeleteSection={isAllowedToDeleteSection}
              sectionName={"training"}
            />

            {/* SECTION CERTIFICATION */}
            <GeneralCard
              dataDisplay={dataDisplay?.certificates}
              handleAddSection={handleAddSection}
              handleUpdateSection={handleUpdateSection}
              handleDeleteSection={handleDeleteSection}
              loadingDelete={loadingDelete}
              isAllowedToAddSection={isAllowedToAddSection}
              isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
              isAllowedToDeleteSection={isAllowedToDeleteSection}
              sectionName={"certificate"}
            />

            {/* SECTION ACHIEVEMENT */}
            <GeneralCard
              dataDisplay={dataDisplay?.achievements}
              handleAddSection={handleAddSection}
              handleUpdateSection={handleUpdateSection}
              handleDeleteSection={handleDeleteSection}
              loadingDelete={loadingDelete}
              isAllowedToAddSection={isAllowedToAddSection}
              isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
              isAllowedToDeleteSection={isAllowedToDeleteSection}
              sectionName={"achievement"}
            />

            {/* SECTION ASSESSMENT RESULT */}
            <AssessmentResultCard
              dataDisplay={dataDisplay}
              setDataDisplay={setDataDisplay}
              handleUpdate={handleUpdateAssessment}
              assessmentRoles={assessmentRoles}
              isAllowedToUpdateResumeAssessment={
                isAllowedToUpdateResumeAssessment
              }
            />
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const candidateId = params.candidateId;
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
      candidateId,
    },
  };
}

export default CandidateDetail;
