import { notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useAccessControl } from "contexts/access-control";

import {
  RESUME_GET,
  RESUME_SECTION_ADD,
  RESUME_SECTION_DELETE,
  RESUME_SKILL_LISTS,
  RESUME_UPDATE,
} from "lib/features";

import BasicInfoCard from "../../../components/cards/resume/BasicInfoCard";
import SkillCard from "../../../components/cards/resume/SkillCard";
import AcademicCard from "../../../components/cards/resume/academic/AcademicCard";
import AchievementCard from "../../../components/cards/resume/achievement/AchievementCard";
import CertificationCard from "../../../components/cards/resume/certification/CertificationCard";
import ExperienceCard from "../../../components/cards/resume/experience/ExperienceCard";
import ProjectCard from "../../../components/cards/resume/project/ProjectCard";
import TrainingCard from "../../../components/cards/resume/training/TrainingCard";
import LayoutDashboard from "../../../components/layout-dashboard";
import LayoutDashboard2 from "../../../components/layout-dashboard2";
import st from "../../../components/layout-dashboard.module.css";
import { permissionWarningNotification } from "../../../lib/helper";
import httpcookie from "cookie";

const CandidateDetail = ({ initProps, dataProfile, sidemenu, resumeId }) => {
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

  const isAllowedToAddSection = hasPermission(RESUME_SECTION_ADD);
  const isAllowedToDeleteSection = hasPermission(RESUME_SECTION_DELETE);

  const isAllowedToGetSkillLists = hasPermission(RESUME_SKILL_LISTS);

  //INIT
  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.asPath.split("/").slice(1);
  pathArr.splice(1, 1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr[pathTitleArr.length - 2] = "Lamaran Saya";
  pathTitleArr[pathTitleArr.length - 1] = "Edit Profil";

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
  });

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

    if (resumeId) {
      setpraloading(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getResume?id=${resumeId}`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      })
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
  }, [isAllowedToGetCandidateDetail, resumeId, refresh]);

  // 3. HANDLER
  // 3.1. Section
  const handleAddSection = (sectionName, data) => {
    const payload = {
      id: Number(resumeId),
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
    const payload = {
      id: Number(resumeId),
      [sectionName]: data,
    };

    if (!isAllowedToUpdateCandidate) {
      permissionWarningNotification("Mengubah", `Section ${sectionName}`);
      return;
    }

    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateResume`, {
      method: "PUT",
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
      id: Number(resumeId),
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
      });
  };

  //DEBUG
  // console.log(dataDisplay);
  // console.log(dataUpdateEdu);

  return (
    <LayoutDashboard2
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="flex flex-col gap-6">
        {/* SECTION BASIC INFO */}
        <BasicInfoCard
          dataDisplay={dataDisplay}
          dataUpdateBasic={dataUpdateBasic}
          setDataUpdateBasic={setDataUpdateBasic}
          handleUpdate={handleUpdateSection}
          praloading={praloading}
          // assessmentRoles={assessmentRoles}
          loadingUpdate={loadingUpdate}
          isGuest={true}
        />

        <div className="flex flex-row gap-6">
          <div className="flex flex-col w-full gap-6">
            {/* SECTION ACADEMIC */}
            <AcademicCard
              dataDisplay={dataDisplay}
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
              dataDisplay={dataDisplay}
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
              dataDisplay={dataDisplay}
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
            <TrainingCard
              dataDisplay={dataDisplay}
              handleAddSection={handleAddSection}
              handleUpdateSection={handleUpdateSection}
              handleDeleteSection={handleDeleteSection}
              loadingDelete={loadingDelete}
              isAllowedToAddSection={isAllowedToAddSection}
              isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
              isAllowedToDeleteSection={isAllowedToDeleteSection}
            />

            {/* SECTION CERTIFICATION */}
            <CertificationCard
              dataDisplay={dataDisplay}
              handleAddSection={handleAddSection}
              handleUpdateSection={handleUpdateSection}
              handleDeleteSection={handleDeleteSection}
              loadingDelete={loadingDelete}
              isAllowedToAddSection={isAllowedToAddSection}
              isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
              isAllowedToDeleteSection={isAllowedToDeleteSection}
            />

            {/* SECTION ACHIEVEMENT */}
            <AchievementCard
              dataDisplay={dataDisplay}
              handleAddSection={handleAddSection}
              handleUpdateSection={handleUpdateSection}
              handleDeleteSection={handleDeleteSection}
              loadingDelete={loadingDelete}
              isAllowedToAddSection={isAllowedToAddSection}
              isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
              isAllowedToDeleteSection={isAllowedToDeleteSection}
            />
          </div>
        </div>
      </div>
    </LayoutDashboard2>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const resumeId = params.resumeId;
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
      sidemenu: "application",
      resumeId,
    },
  };
}

export default CandidateDetail;
