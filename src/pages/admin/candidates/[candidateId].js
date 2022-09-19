import { Form, Modal, notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  RESUME_ADD,
  RESUME_DELETE,
  RESUME_GET,
  RESUME_SECTION_ADD,
  RESUME_SECTION_DELETE,
  RESUME_UPDATE,
} from "lib/features";

import ButtonSys from "../../../components/button";
import AcademicCard from "../../../components/cards/resume/AcademicCard";
import AchievementCard from "../../../components/cards/resume/AchievementCard";
import AssessmentResultCard from "../../../components/cards/resume/AssessmentResultCard";
import BasicInfoCard from "../../../components/cards/resume/BasicInfoCard";
import CertificationCard from "../../../components/cards/resume/CertificationCard";
import ExperienceCard from "../../../components/cards/resume/ExperienceCard";
import ProjectCard from "../../../components/cards/resume/ProjectCard";
import SkillCard from "../../../components/cards/resume/SkillCard";
import TrainingCard from "../../../components/cards/resume/TrainingCard";
import { TrashIconSvg } from "../../../components/icon";
import LayoutDashboard from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
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

  //INIT
  const rt = useRouter();
  const tok = initProps;
  const pathArr = rt.pathname.split("/").slice(1);
  console.log(pathArr);
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
  const assessmentRoles = dataListRoleAssessments.data.data;

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
    resume_id: 12,
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

  // 3. delete
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

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

  const onOpenDeleteModal = () => {
    setModalDelete(true);
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
            message: `Section ${sectionName} berhasil diubah.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal mengubah section ${sectionName}. ${response2.message}`,
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

    if (!isAllowedToUpdateCandidate) {
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

  const handleDeleteAssessment = () => {
    const payload = {
      id: Number(candidateId),
    };

    if (!isAllowedToUpdateCandidate) {
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

  // useEffect(() => {

  // })

  //DEBUG
  console.log(dataDisplay);
  console.log(dataUpdateEdu);

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
          onOpenDeleteModal={onOpenDeleteModal}
          isAllowedToDeleteCandidate={isAllowedToDeleteCandidate}
          // onChangeInput={onChangeInput}
          praloading={praloading}
          assessmentRoles={assessmentRoles}
        />
        <div className="flex flex-row gap-6">
          <div className="flex flex-col w-full gap-6">
            {/* SECTION ACADEMIC */}
            <AcademicCard
              dataDisplay={dataDisplay}
              dataUpdateEdu={dataUpdateEdu}
              setDataUpdateEdu={setDataUpdateEdu}
              handleAddSection={handleAddSection}
              handleDeleteSection={handleDeleteSection}
            />

            {/* SECTION EXPERIENCE */}
            <ExperienceCard
              dataDisplay={dataDisplay}
              dataUpdateExp={dataUpdateExp}
              setDataUpdateExp={setDataUpdateExp}
              handleAddSection={handleAddSection}
              handleDeleteSection={handleDeleteSection}
            />

            {/* SECTION PROJECT */}
            <ProjectCard
              dataDisplay={dataDisplay}
              dataUpdateProj={dataUpdateProj}
              setDataUpdateProj={setDataUpdateProj}
              handleAddSection={handleAddSection}
              handleDeleteSection={handleDeleteSection}
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
              handleDeleteSection={handleDeleteSection}
            />

            {/* SECTION CERTIFICATION */}
            <CertificationCard
              dataDisplay={dataDisplay}
              dataUpdateCert={dataUpdateCert}
              setDataUpdateCert={setDataUpdateCert}
              handleAddSection={handleAddSection}
              handleDeleteSection={handleDeleteSection}
            />

            {/* SECTION ACHIEVEMENT */}
            <AchievementCard
              dataDisplay={dataDisplay}
              dataUpdateAchiev={dataUpdateAchiev}
              setDataUpdateAchiev={setDataUpdateAchiev}
              handleAddSection={handleAddSection}
              handleDeleteSection={handleDeleteSection}
            />

            {/* SECTION ASSESSMENT RESULT */}
            <AssessmentResultCard
              dataDisplay={dataDisplay}
              dataUpdateAchiev={dataUpdateAchiev}
              setDataUpdateAchiev={setDataUpdateAchiev}
              handleAddSection={handleAddSection}
              handleDeleteSection={handleDeleteSection}
              assessmentRoles={assessmentRoles}
            />
          </div>
        </div>
      </div>

      <AccessControl hasPermission={RESUME_DELETE}>
        <Modal
          title={`Peringatan`}
          visible={modalDelete}
          maskClosable={false}
          style={{ top: `3rem` }}
          width={500}
          onCancel={() => {
            setModalDelete(false);
          }}
          destroyOnClose={true}
          footer={
            <div className="flex flex-row justify-between">
              <ButtonSys
                type={"default"}
                onClick={() => {
                  setModalDelete(false);
                }}
              >
                Batalkan
              </ButtonSys>
              ,
              <ButtonSys
                type={"primary"}
                color={"danger"}
                onClick={handleDeleteResume}
                disabled={loadingDelete}
              >
                <div className="flex flex-row space-x-2">
                  <TrashIconSvg size={16} color={`white`} />
                  <p>Ya, saya yakin dan hapus resume</p>
                </div>
              </ButtonSys>
            </div>
          }
        >
          <p className="mb-4">
            Apakah Anda yakin ingin melanjutkan penghapusan resume kandidat
            dengan nama <strong>{dataDisplay.name}</strong>?
          </p>
        </Modal>
      </AccessControl>
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
