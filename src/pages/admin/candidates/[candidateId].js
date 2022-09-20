import { Form, Modal, notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  ASSESSMENTS_GET,
  RESUME_ADD,
  RESUME_ASSESSMENT_ADD,
  RESUME_ASSESSMENT_DELETE,
  RESUME_ASSESSMENT_UPDATE,
  RESUME_DELETE,
  RESUME_GET,
  RESUME_SECTION_ADD,
  RESUME_SECTION_DELETE,
  RESUME_UPDATE,
} from "lib/features";

import ButtonSys from "../../../components/button";
import AssessmentResultCard from "../../../components/cards/resume/AssessmentResultCard";
import BasicInfoCard from "../../../components/cards/resume/BasicInfoCard";
import SkillCard from "../../../components/cards/resume/SkillCard";
import AcademicCard from "../../../components/cards/resume/academic/AcademicCard";
import AchievementCard from "../../../components/cards/resume/achievement/AchievementCard";
import CertificationCard from "../../../components/cards/resume/certification/CertificationCard";
import ExperienceCard from "../../../components/cards/resume/experience/ExperienceCard";
import ProjectCard from "../../../components/cards/resume/project/ProjectCard";
import TrainingCard from "../../../components/cards/resume/training/TrainingCard";
import { TrashIconSvg } from "../../../components/icon";
import LayoutDashboard from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import { ModalHapus2 } from "../../../components/modal/modalCustom";
import { H1, H2 } from "../../../components/typography";
import httpcookie from "cookie";

const CandidateDetail = ({
  initProps,
  dataProfile,
  dataResume,
  sidemenu,
  candidateId,
  dataListRoleAssessments,
}) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToCreateCandidate = hasPermission(RESUME_ADD);
  const isAllowedToGetCandidateDetail = hasPermission(RESUME_GET);
  const isAllowedToUpdateCandidate = hasPermission(RESUME_UPDATE);
  const isAllowedToDeleteCandidate = hasPermission(RESUME_DELETE);

  const isAllowedToAddSection = hasPermission(RESUME_SECTION_ADD);
  const isAllowedToDeleteSection = hasPermission(RESUME_SECTION_DELETE);

  const isAllowedToAddResumeAssessment = hasPermission(RESUME_ASSESSMENT_ADD);
  const isAllowedToUpdateResumeAssessment = hasPermission(
    RESUME_ASSESSMENT_UPDATE
  );
  const isAllowedToDeleteResumeAssessment = hasPermission(
    RESUME_ASSESSMENT_DELETE
  );

  const isAllowedToGetRoleAssessmentList = hasPermission(ASSESSMENTS_GET);

  //INIT
  const rt = useRouter();
  const tok = initProps;
  const pathArr = rt.pathname.split("/").slice(1);
  // console.log(pathArr);
  pathArr[pathArr.length - 1] = "Detail Kandidat";
  const [instanceForm] = Form.useForm();

  //STATE
  //1. display
  const [praloading, setpraloading] = useState(true);
  const [dataDisplay, setDataDisplay] = useState({
    id: null,
    name: "",
    telp: "",
    email: "",
    role: "",
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
    assessment_results: [],
  });
  const [assessmentRoles, setAssessmentRoles] = useState([]);

  //2. update
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [disabledUpdate, setDisabledUpdate] = useState(false);
  const [disabledtrigger, setdisabledtrigger] = useState(-1);
  const [isShowInput, setIsShowInput] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({
    id: Number(candidateId),
    basic_information: {},
    education: {},
    experience: {},
    project: {},
    skill: {},
    training: {},
    certificate: {},
    achievement: {},
  });

  const [dataUpdateBasic, setDataUpdateBasic] = useState({
    name: "",
    telp: "",
    email: "",
    role: "",
    city: "",
    province: "",
  });

  const [dataUpdateEdu, setDataUpdateEdu] = useState({
    id: null,
    university: "",
    major: "",
    gpa: null,
    graduation_year: "",
    resume_id: null,
  });

  const [dataUpdateExp, setDataUpdateExp] = useState({
    id: null,
    role: "",
    company: "",
    start_date: "",
    end_date: "",
    description: "",
    resume_id: null,
  });

  const [dataUpdateProj, setDataUpdateProj] = useState({
    id: null,
    name: "",
    year: "",
    description: "",
    resume_id: null,
  });

  const [dataUpdateSkill, setDataUpdateSkill] = useState({
    id: null,
    name: "",
    resume_id: null,
  });

  const [dataUpdateTrain, setDataUpdateTrain] = useState({
    id: null,
    name: "",
    organizer: "",
    year: "",
    resume_id: null,
  });

  const [dataUpdateCert, setDataUpdateCert] = useState({
    id: null,
    name: "",
    organizer: "",
    year: "",
    resume_id: null,
  });

  const [dataUpdateAchiev, setDataUpdateAchiev] = useState({
    id: null,
    achievement: "",
    name: "",
    organizer: "",
    year: "",
    resume_id: null,
  });

  const [dataUpdateAssessment, setDataUpdateAssessment] = useState({
    id: Number(candidateId),
    delete_assessment: false,
    change_assessment: false,
    assessment_id: null,
    assessment_result_values: [],
  });

  // 3. delete
  const [loadingDelete, setLoadingDelete] = useState(false);

  //HANDLER
  const onChangeInput = (e) => {
    setDataDisplay({
      ...dataDisplay,
      [e.target.name]: e.target.value,
    });
    setDataUpdate({
      ...dataUpdate,
      [e.target.name]: e.target.value,
    });
    // setdisabledtrigger((prev) => prev + 1);
  };

  const handleAddSection = (sectionName, data) => {
    const payload = {
      id: Number(candidateId),
      [sectionName]: data,
    };

    if (!isAllowedToAddSection) {
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
        setTimeout(() => {
          setLoadingUpdate(false);
          // setData({ id: null, name: "", add: [{ criteria: "" }] });
          rt.push(`/admin/candidates/${candidateId}`);
        }, 500);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan section ${sectionName}. ${err.response}`,
          duration: 3,
        });
        setLoadingUpdate(false);
        // setdatacreate({ id: null, name: "", add: [{ criteria: "" }] });
      });
  };

  const handleUpdateSection = (sectionName, data) => {
    const payload = {
      id: Number(candidateId),
      [sectionName]: data,
    };

    if (!isAllowedToUpdateCandidate) {
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
        if (response2.success) {
          notification.success({
            message: `Berhasil mengubah section ${sectionName}.`,
            duration: 3,
          });
          setTimeout(() => {
            setLoadingUpdate(false);
            rt.push(`/admin/candidates/${candidateId}`);
          }, 500);
        } else {
          notification.error({
            message: `Gagal mengubah section ${sectionName}. ${response2.message}`,
            duration: 3,
          });
          setTimeout(() => {
            setLoadingUpdate(false);
          }, 500);
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengubah section ${sectionName}. ${err.response}`,
          duration: 3,
        });
        setLoadingUpdate(false);
        // setdatacreate({ id: null, name: "", add: [{ criteria: "" }] });
      });
  };

  const handleDeleteSection = (sectionName, sectionId) => {
    const payload = {
      id: Number(candidateId),
      [sectionName + "_id"]: sectionId,
    };
    console.log(payload);
    if (!isAllowedToDeleteCandidate) {
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
        setTimeout(() => {
          setLoadingDelete(false);
          // setData({ id: null, name: "", add: [{ criteria: "" }] });
          rt.push(`/admin/candidates/${candidateId}`);
        }, 500);
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

  const handleAddAssessment = () => {
    if (!isAllowedToAddResumeAssessment) {
      return;
    }

    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addResumeAssessment`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUpdateAssessment),
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          notification.success({
            message: `Assessment result berhasil ditambahkan.`,
            duration: 3,
          });
          setTimeout(() => {
            setLoadingUpdate(false);
            setDataUpdateAssessment({
              id: Number(candidateId),
              delete_assessment: false,
              change_assessment: false,
              assessment_id: null,
              assessment_result_values: [],
            });
            rt.push(`/admin/candidates/${candidateId}`);
          }, 500);
        } else {
          notification.error({
            message: `Gagal menambahkan assessment result. ${response2.message}`,
            duration: 3,
          });
          setTimeout(() => {
            setLoadingUpdate(false);
            rt.push(`/admin/candidates/${candidateId}`);
          }, 500);
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan assessment result. ${err.response}`,
          duration: 3,
        });
        setLoadingUpdate(false);
        // setdatacreate({ id: null, name: "", add: [{ criteria: "" }] });
      });
  };

  const handleDeleteAssessment = () => {
    if (!isAllowedToDeleteResumeAssessment) {
      return;
    }

    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteResumeAssessment?id=${candidateId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(payload),
      }
    )
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          notification.success({
            message: `Berhasil menghapus hasil assessment.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal menghapus hasil assessment. ${response2.message}`,
            duration: 3,
          });
        }
        setTimeout(() => {
          setLoadingDelete(false);
          rt.push(`/admin/candidates/${candidateId}`);
        }, 500);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus hasil assessment. ${response2.message}`,
          duration: 3,
        });
        setTimeout(() => {
          setLoadingDelete(false);
          rt.push(`/admin/candidates/${candidateId}`);
        }, 500);
      });
  };

  const handleDeleteResume = () => {
    const payload = {
      id: Number(candidateId),
    };

    if (!isAllowedToUpdateCandidate) {
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
            role: "",
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
          role: "",
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
          assessment_results: [],
        });
      });
  };

  //USE EFFECT
  useEffect(() => {
    if (!isAllowedToGetCandidateDetail) {
      setpraloading(false);
      return;
    }

    if (dataResume !== undefined) {
      setDataDisplay(dataResume.data);
      setpraloading(false);
    }
  }, [isAllowedToGetCandidateDetail, dataResume]);

  useEffect(() => {
    if (!isAllowedToGetRoleAssessmentList) {
      return;
    }

    const roles = dataListRoleAssessments.data.data;
    setAssessmentRoles(roles);
  }, [isAllowedToGetRoleAssessmentList, dataListRoleAssessments]);

  //DEBUG
  // console.log(dataDisplay);
  // console.log(dataUpdateEdu);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
    >
      {/* START UBAH */}
      <div className="flex flex-col gap-6">
        {/* SECTION BASIC INFO */}
        <BasicInfoCard
          dataDisplay={dataDisplay}
          setDataDisplay={setDataDisplay}
          dataUpdateBasic={dataUpdateBasic}
          setDataUpdateBasic={setDataUpdateBasic}
          handleUpdate={handleUpdateSection}
          handleDelete={handleDeleteResume}
          // onChangeInput={onChangeInput}
          praloading={praloading}
          assessmentRoles={assessmentRoles}
          isAllowedToDeleteCandidate={isAllowedToDeleteCandidate}
          loadingDelete={loadingDelete}
        />

        <div className="flex flex-row gap-6">
          <div className="flex flex-col w-full gap-6">
            {/* SECTION ACADEMIC */}
            <AcademicCard
              dataDisplay={dataDisplay}
              setDataDisplay={setDataDisplay}
              dataUpdateEdu={dataUpdateEdu}
              setDataUpdateEdu={setDataUpdateEdu}
              handleAddSection={handleAddSection}
              handleUpdateSection={handleUpdateSection}
              handleDeleteSection={handleDeleteSection}
              loadingDelete={loadingDelete}
            />

            {/* SECTION EXPERIENCE */}
            <ExperienceCard
              dataDisplay={dataDisplay}
              dataUpdateExp={dataUpdateExp}
              setDataUpdateExp={setDataUpdateExp}
              handleAddSection={handleAddSection}
              handleUpdateSection={handleUpdateSection}
              handleDeleteSection={handleDeleteSection}
              loadingDelete={loadingDelete}
            />

            {/* SECTION PROJECT */}
            <ProjectCard
              dataDisplay={dataDisplay}
              dataUpdateProj={dataUpdateProj}
              setDataUpdateProj={setDataUpdateProj}
              handleAddSection={handleAddSection}
              handleUpdateSection={handleUpdateSection}
              handleDeleteSection={handleDeleteSection}
              loadingDelete={loadingDelete}
            />
          </div>
          <div className="flex flex-col w-full gap-6">
            {/* SECTION SKILLS */}
            <SkillCard
              dataDisplay={dataDisplay}
              dataUpdateSkill={dataUpdateSkill}
              setDataUpdateSkill={setDataUpdateSkill}
              handleAddSection={handleAddSection}
              handleDeleteSection={handleDeleteSection}
            />

            {/* SECTION TRAINING */}
            <TrainingCard
              dataDisplay={dataDisplay}
              dataUpdateTrain={dataUpdateTrain}
              setDataUpdateTrain={setDataUpdateTrain}
              handleAddSection={handleAddSection}
              handleUpdateSection={handleUpdateSection}
              handleDeleteSection={handleDeleteSection}
              loadingDelete={loadingDelete}
            />

            {/* SECTION CERTIFICATION */}
            <CertificationCard
              dataDisplay={dataDisplay}
              dataUpdateCert={dataUpdateCert}
              setDataUpdateCert={setDataUpdateCert}
              handleAddSection={handleAddSection}
              handleUpdateSection={handleUpdateSection}
              handleDeleteSection={handleDeleteSection}
              loadingDelete={loadingDelete}
            />

            {/* SECTION ACHIEVEMENT */}
            <AchievementCard
              dataDisplay={dataDisplay}
              dataUpdateAchiev={dataUpdateAchiev}
              setDataUpdateAchiev={setDataUpdateAchiev}
              handleAddSection={handleAddSection}
              handleUpdateSection={handleUpdateSection}
              handleDeleteSection={handleDeleteSection}
              loadingDelete={loadingDelete}
            />

            {/* SECTION ASSESSMENT RESULT */}
            <AssessmentResultCard
              dataDisplay={dataDisplay}
              dataUpdate={dataUpdateAssessment}
              setDataUpdate={setDataUpdateAssessment}
              handleAdd={handleAddAssessment}
              // handleUpdate={handleUpdateAssessment}
              handleDelete={handleDeleteAssessment}
              assessmentRoles={assessmentRoles}
              isAllowedToDeleteResumeAssessment={
                isAllowedToDeleteResumeAssessment
              }
              loadingDelete={loadingDelete}
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

  const resourcesGR = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getResume?id=${candidateId}`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGR = await resourcesGR.json();
  const dataResume = resjsonGR;

  const resourcesGA = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssessments?rows=10`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGA = await resourcesGA.json();
  const dataListRoleAssessments = resjsonGA;

  return {
    props: {
      initProps,
      dataProfile,
      dataResume,
      sidemenu: "102",
      candidateId,
      dataListRoleAssessments,
    },
  };
}

export default CandidateDetail;
