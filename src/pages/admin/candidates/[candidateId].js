import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { notification } from "antd";
import moment from "moment";
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
import AcademicCard from "../../../components/cards/resume/academic/AcademicCard";
import AchievementCard from "../../../components/cards/resume/achievement/AchievementCard";
import CertificationCard from "../../../components/cards/resume/certification/CertificationCard";
import ExperienceCard from "../../../components/cards/resume/experience/ExperienceCard";
import ProjectCard from "../../../components/cards/resume/project/ProjectCard";
import TrainingCard from "../../../components/cards/resume/training/TrainingCard";
import LayoutDashboard from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
import { permissionWarningNotification } from "../../../lib/helper";
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
  const pathArr = rt.pathname.split("/").slice(1);
  // console.log(pathArr);
  pathArr[pathArr.length - 1] = "Detail Kandidat";

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
    assessment_result_values: [],
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
    const payload = {
      id: Number(candidateId),
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

  // 3.2. Assessment Result
  const handleUpdateAssessment = () => {
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
      body: JSON.stringify(dataUpdateAssessment),
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
      <div className="flex flex-col gap-6">
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
              isAllowedToAddSection={isAllowedToAddSection}
              isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
              isAllowedToDeleteSection={isAllowedToDeleteSection}
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
              isAllowedToAddSection={isAllowedToAddSection}
              isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
              isAllowedToDeleteSection={isAllowedToDeleteSection}
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
              dataUpdateSkill={dataUpdateSkill}
              setDataUpdateSkill={setDataUpdateSkill}
              handleAddSection={handleAddSection}
              handleDeleteSection={handleDeleteSection}
              isAllowedToGetSkillLists={isAllowedToGetSkillLists}
              isAllowedToAddSection={isAllowedToAddSection}
              isAllowedToDeleteSection={isAllowedToDeleteSection}
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
              isAllowedToAddSection={isAllowedToAddSection}
              isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
              isAllowedToDeleteSection={isAllowedToDeleteSection}
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
              isAllowedToAddSection={isAllowedToAddSection}
              isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
              isAllowedToDeleteSection={isAllowedToDeleteSection}
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
              isAllowedToAddSection={isAllowedToAddSection}
              isAllowedToUpdateCandidate={isAllowedToUpdateCandidate}
              isAllowedToDeleteSection={isAllowedToDeleteSection}
            />

            {/* SECTION ASSESSMENT RESULT */}
            <AssessmentResultCard
              dataDisplay={dataDisplay}
              setDataDisplay={setDataDisplay}
              dataUpdate={dataUpdateAssessment}
              setDataUpdate={setDataUpdateAssessment}
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

export const ResumePDFTemplate = ({ dataResume }) => {
  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 32,
              fontFamily: "Helvetica-Bold",
              color: `#4D4D4D`,
              borderBottomWidth: 2,
              borderColor: `1px solid #bbbbbb`,
            }}
          >
            {dataResume.name?.toUpperCase()}
          </Text>

          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <View
              style={{
                marginRight: 16,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 12, height: 12 }}
                src={`/image/userIcon.png`}
              />

              <Text style={{ fontSize: 12, color: `#4D4D4D`, marginLeft: 8 }}>
                {dataResume.assessment?.name}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{ width: 12, height: 12 }}
                src={`/image/mapPinIcon.png`}
              />
              <Text style={{ fontSize: 12, color: `#4D4D4D`, marginLeft: 8 }}>
                {dataResume.city}, {dataResume.province}
              </Text>
            </View>
          </View>
        </View>
        {/* Body */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: `space-between`,
            marginTop: 30,
          }}
        >
          <View style={{ flexDirection: "col", width: `45%` }}>
            <View wrap={false}>
              <Text style={styles.sectionHeader}>ACADEMIC HISTORY</Text>
              {dataResume.educations.map((edu) => (
                <View style={styles.sectionBlock1} key={edu.id}>
                  <Image
                    style={{ width: 10, height: 10, padding: 1, marginTop: 2 }}
                    src={`/image/circleResume.png`}
                  />
                  <View style={{ flexDirection: "col", marginLeft: 15 }}>
                    <Text style={styles.title}>{edu.university}</Text>
                    <View style={{ flexDirection: "row", marginBottom: 4 }}>
                      <Text style={styles.desc}>{edu.major} ·&nbsp;</Text>
                      <Text style={styles.textYear}>
                        {edu.graduation_year.slice(0, 4)}
                      </Text>
                    </View>
                    <Text style={styles.desc}>{edu.gpa}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View wrap={false}>
              <Text style={styles.sectionHeader}>EXPERIENCE</Text>
              {dataResume.experiences.map((exp) => (
                <View style={styles.sectionBlock1} key={exp.id}>
                  <Image
                    style={{ width: 10, height: 10, padding: 1, marginTop: 2 }}
                    src={`/image/circleResume.png`}
                  />
                  <View style={{ flexDirection: "col", marginLeft: 15 }}>
                    <Text style={styles.title}>{exp.role}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginBottom: 4,
                      }}
                    >
                      <Text style={styles.desc}>{exp.company} ·&nbsp;</Text>
                      <Text style={styles.textYear}>
                        {moment(exp.start_date).format("MMM YYYY")} -&nbsp;
                        {moment(exp.end_date).format("MMM YYYY")}
                      </Text>
                    </View>
                    <Text style={styles.desc}>{exp.description}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View wrap={false}>
              <Text style={styles.sectionHeader}>PROJECTS</Text>
              {dataResume.projects.map((proj) => (
                <View style={styles.sectionBlock2} key={proj.id}>
                  <Text style={styles.textGreen}>{proj.year.slice(0, 4)}</Text>
                  <View
                    style={{
                      flexDirection: "col",
                      marginLeft: 10,
                    }}
                  >
                    <Text style={styles.title}>{proj.name}</Text>
                    <Text style={styles.desc}>{proj.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View style={{ flexDirection: "col", width: `45%` }}>
            <View wrap={false}>
              <Text style={styles.sectionHeader}>SKILLS</Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {dataResume.skills.map((skill) => (
                  <View style={styles.skillTag} key={skill.id}>
                    <Text>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View wrap={false}>
              <Text style={styles.sectionHeader}>TRAINING</Text>
              {dataResume.trainings.map((train) => (
                <View style={styles.sectionBlock2} key={train.id}>
                  <Text style={styles.textGreen}>{train.year.slice(0, 4)}</Text>
                  <View
                    style={{
                      flexDirection: "col",
                      marginLeft: 10,
                    }}
                  >
                    <Text style={styles.title}>{train.name}</Text>
                    <Text style={styles.desc}>{train.organizer}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View wrap={false}>
              <Text style={styles.sectionHeader}>CERTIFICATIONS</Text>
              {dataResume.certificates.map((cert) => (
                <View style={styles.sectionBlock2} key={cert.id}>
                  <Text style={styles.textGreen}>{cert.year.slice(0, 4)}</Text>
                  <View
                    style={{
                      flexDirection: "col",
                      marginLeft: 10,
                    }}
                  >
                    <Text style={styles.title}>{cert.name}</Text>
                    <Text style={styles.desc}>{cert.organizer}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View wrap={false}>
              <Text style={styles.sectionHeader}>ACHIEVEMENTS</Text>
              {dataResume.achievements.map((achiev) => (
                <View style={styles.sectionBlock2} key={achiev.id}>
                  <Text style={styles.textGreen}>
                    {achiev.year.slice(0, 4)}
                  </Text>
                  <View
                    style={{
                      flexDirection: "col",
                      marginLeft: 10,
                    }}
                  >
                    <Text style={styles.title}>{achiev.name}</Text>
                    <Text style={styles.desc}>{achiev.organizer}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View wrap={false}>
              <Text style={styles.sectionHeader}>
                TECHNICAL ASSESSMENT{"\n"}
                RESULTS
              </Text>
              {dataResume.assessment_results?.map((result) => (
                <View
                  key={result.id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ marginRight: 5 }}>•</Text>
                    <Text style={{ color: `#4D4D4D`, fontSize: 12 }}>
                      {result.criteria}
                    </Text>
                  </View>

                  <Text style={styles.textGreen}>{result.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Footer */}
        <View fixed style={styles.footer}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ color: `black` }}
              render={({ pageNumber }) => `${pageNumber}`}
            />
            <Text>&nbsp;/ </Text>
            <Text render={({ totalPages }) => `${totalPages}`} />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 8,
                fontFamily: "Helvetica-Bold",
                letterSpacing: 1,
                marginRight: 5,
              }}
            >
              {" "}
              APPROVED BY:
            </Text>
            <Image
              style={{ width: 80, height: 31.86 }}
              src={`/image/LogoMig2.png`}
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  // viewer: {
  // 	width: window.innerWidth, //the pdf viewer will take up all of the width and height
  // 	height: window.innerHeight,
  // },
  page: {
    flexDirection: "col",
    backgroundColor: "#ffffff",
    paddingTop: 32,
    paddingBottom: 88,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: `col`,
  },
  sectionHeader: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
    color: `#35763B`,
    paddingBottom: 12,
    marginBottom: 12,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: `1px solid #E6E6E6`,
  },

  sectionBlock1: {
    paddingRight: 10,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  sectionBlock2: {
    paddingBottom: 10,
    flexDirection: "row",
  },

  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    color: `#4D4D4D`,
    marginBottom: 4,
  },

  desc: {
    fontSize: 12,
    color: `#808080`,
    marginBottom: 4,
  },

  textGreen: {
    color: `#35763B`,
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
  },

  textYear: {
    fontFamily: "Helvetica-Bold",
    color: `#808080`,
    fontSize: 12,
  },

  skillTag: {
    color: `#35763B`,
    fontSize: 12,
    backgroundColor: `rgba(53, 118, 59, 0.1)`,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 12,
    marginBottom: 12,
    borderRadius: 5,
  },

  footer: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#4D4D4D",
  },

  pageNumber: {
    textAlign: "left",
    color: "#4D4D4D",
  },
});

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
