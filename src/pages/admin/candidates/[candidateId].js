import {
  Document,
  Font,
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
import Html from "react-pdf-html";

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
  const pathArr = rt.pathname.split("/")?.slice(1);
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

export const ResumePDFTemplate = ({ dataResume }) => {
  const isAllResultEmpty = dataResume.assessment_results?.every(
    (result) => result.value === ""
  );

  function breakText(text) {
    return [text];
  }

  return (
    <Document>
      <Page size={"A4"} style={styles.page} wrap>
        {/* Header */}
        <View
          fixed
          render={({ pageNumber }) =>
            pageNumber !== 1 && (
              <View style={styles.header}>
                <Text
                  style={{
                    fontFamily: "Helvetica-Bold",
                    fontWeight: "bold",
                    fontSize: 10,
                    color: "#808080",
                  }}
                >
                  {dataResume.name}
                </Text>
                <Text style={{ fontSize: 10, color: "#808080" }}>
                  &nbsp;-&nbsp;
                </Text>
                <Text style={{ fontSize: 10, color: "#808080" }}>
                  {dataResume.assessment?.name}
                </Text>
              </View>
            )
          }
          // debug={true}
        />

        {/* Name Section */}
        <View style={{ paddingHorizontal: 48, paddingBottom: 26 }}>
          <Text
            style={{
              fontSize: 26,
              fontFamily: "Inter",
              fontWeight: "bold",
              color: `#4D4D4D`,
              borderBottomWidth: 1,
              borderColor: `1px solid #4D4D4D`,
              paddingBottom: 8,
              marginBottom: 8,
            }}
          >
            {dataResume.name?.toUpperCase()}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 12, height: 12 }}
              src={`/image/userIcon.png`}
            />

            <Text style={{ fontSize: 10, color: `#4D4D4D`, marginLeft: 10 }}>
              {dataResume.assessment?.name}
            </Text>
          </View>
        </View>

        {/* Body */}
        {/* EXPERIENCE SECTION */}
        {dataResume.experiences?.length !== 0 && (
          <View style={{ ...styles.rowOneCol, paddingBottom: 30 }}>
            <Text style={styles.sectionHeader}>EXPERIENCE</Text>
            {dataResume.experiences.map((exp, idx) => (
              <View style={styles.sectionBlock1} key={exp.id}>
                <View style={{ flexDirection: "column" }}>
                  <Image
                    style={{ width: 10, height: 10, padding: 1, marginTop: 2 }}
                    src={`/image/circleResume.png`}
                  />
                </View>
                <View style={{ flexDirection: "col", marginHorizontal: 15 }}>
                  <Text
                    style={styles.title}
                    hyphenationCallback={(e) => breakText(e)}
                  >
                    {exp.role}
                  </Text>
                  <View
                    style={{
                      ...styles.desc,
                      flexDirection: "row",
                      paddingBottom: 2,
                    }}
                  >
                    <Text>{exp.company} ·&nbsp;</Text>
                    <Text style={styles.textYear}>
                      {moment(exp.start_date).format("MMM YYYY")} -&nbsp;
                      {moment(exp.end_date).format("MMM YYYY")}
                    </Text>
                  </View>
                  <Html
                    // hyphenationCallback={e => breakText(e)}
                    style={styles.desc}
                    stylesheet={{
                      p: {
                        margin: 0,
                        marginBottom: 2,
                        color: "#808080",
                        lineHeight: 1.5,
                        marginRight: 10,
                      },
                      ul: {
                        margin: 0,
                        paddingLeft: 0,
                        color: "#808080",
                        lineHeight: 1.5,
                        marginRight: 10,
                      },
                      ".ql-indent-1": { marginLeft: 30 },
                      ".ql-indent-2": { marginLeft: 40 },
                      ".ql-indent-3": { marginLeft: 50 },
                    }}
                  >
                    {exp.description}
                  </Html>
                </View>
              </View>
            ))}
          </View>
        )}
        <View style={styles.rowTwoCol} wrap={false}>
          {/* ACADEMIC SECTION */}
          {dataResume.educations?.length !== 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>ACADEMIC HISTORY</Text>
              {dataResume.educations.map((edu, idx) => (
                <View style={styles.sectionBlock1} key={edu.id}>
                  <View style={{ flexDirection: "column" }}>
                    <Image
                      style={{
                        width: 10,
                        height: 10,
                        padding: 1,
                        marginTop: 2,
                      }}
                      src={`/image/circleResume.png`}
                    />
                  </View>

                  <View style={{ flexDirection: "col", marginLeft: 15 }}>
                    <Text
                      style={styles.title}
                      hyphenationCallback={(e) => breakText(e)}
                    >
                      {edu.university}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        paddingBottom: 4,
                        ...styles.desc,
                      }}
                    >
                      <Text hyphenationCallback={(e) => breakText(e)}>
                        {edu.major} ·&nbsp;
                      </Text>
                      <Text style={styles.textYear}>
                        {edu.graduation_year
                          ? edu.graduation_year.slice(0, 4)
                          : "-"}
                      </Text>
                    </View>
                    <Text style={styles.desc}>GPA {edu.gpa}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* SKILL SECTION */}
          {dataResume.skills?.length !== 0 && (
            <View style={styles.section} wrap={false}>
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
          )}
        </View>

        {/* PROJECT SECTION */}
        {dataResume.projects?.length !== 0 && (
          <View
            style={styles.rowOneCol}
            // wrap={false}
          >
            <Text style={styles.sectionHeader}>PROJECTS</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {dataResume.projects.map((proj) => (
                <View
                  style={{
                    width: "45%",
                    ...styles.sectionBlock2,
                  }}
                  key={proj.id}
                  wrap={false}
                >
                  <Text style={styles.textGreen}>
                    {proj.year ? proj.year.slice(0, 4) : "-"}
                  </Text>
                  <View style={styles.sectionCol2}>
                    <Text
                      style={styles.title}
                      hyphenationCallback={(e) => breakText(e)}
                    >
                      {proj.name}
                    </Text>
                    <Text
                      style={styles.desc}
                      hyphenationCallback={(e) => breakText(e)}
                    >
                      {proj.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        <View
          style={{
            ...styles.rowTwoCol,
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {/* TRAINING SECTION */}
          {dataResume.trainings?.length !== 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionHeader}>TRAINING</Text>
              {dataResume.trainings.map((train) => (
                <View style={styles.sectionBlock2} key={train.id}>
                  <Text style={styles.textGreen}>
                    {train.year ? train.year.slice(0, 4) : "-"}
                  </Text>
                  <View style={styles.sectionCol2}>
                    <Text
                      style={styles.title}
                      hyphenationCallback={(e) => breakText(e)}
                    >
                      {train.name}
                    </Text>
                    <Text
                      style={styles.desc}
                      hyphenationCallback={(e) => breakText(e)}
                    >
                      {train.organizer}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* CERTIFICATION SECTION */}
          {dataResume.certificates?.length !== 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionHeader}>CERTIFICATIONS</Text>
              {dataResume.certificates.map((cert) => (
                <View style={styles.sectionBlock2} key={cert.id}>
                  <Text style={styles.textGreen}>
                    {cert.year ? cert.year.slice(0, 4) : "-"}
                  </Text>
                  <View style={styles.sectionCol2}>
                    <Text
                      style={styles.title}
                      hyphenationCallback={(e) => breakText(e)}
                    >
                      {cert.name}
                    </Text>
                    <Text
                      style={styles.desc}
                      hyphenationCallback={(e) => breakText(e)}
                    >
                      {cert.organizer}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* ACHIEVEMENT SECTION */}
          {dataResume.achievements?.length !== 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionHeader}>ACHIEVEMENTS</Text>
              {dataResume.achievements.map((achiev) => (
                <View style={styles.sectionBlock2} key={achiev.id}>
                  <Text style={styles.textGreen}>
                    {achiev.year ? achiev.year.slice(0, 4) : "-"}
                  </Text>
                  <View style={styles.sectionCol2}>
                    <Text
                      style={styles.title}
                      hyphenationCallback={(e) => breakText(e)}
                    >
                      {achiev.name}
                    </Text>
                    <Text
                      style={styles.desc}
                      hyphenationCallback={(e) => breakText(e)}
                    >
                      {achiev.organizer}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* ASSESSMENT SECTION */}
          {isAllResultEmpty === false && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionHeader}>
                TECHNICAL ASSESSMENT{"\n"}
                RESULTS
              </Text>
              {dataResume.assessment_results?.map(
                (result) =>
                  result.value !== "" && (
                    <View
                      key={result.id}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "top",
                        marginBottom: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                      >
                        <Text style={{ marginRight: 10, fontSize: 10 }}>•</Text>
                        <Text
                          style={{
                            color: `#4D4D4D`,
                            fontSize: 10,
                            width: 160,
                            lineHeight: 1.5,
                          }}
                          hyphenationCallback={(e) => breakText(e)}
                        >
                          {result.criteria}
                        </Text>
                      </View>

                      <Text style={styles.textGreen}>{result.value}</Text>
                    </View>
                  )
              )}
            </View>
          )}
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
                fontSize: 6,
                fontFamily: "Inter",
                fontWeight: "bold",
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

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
      fontWeight: "bold",
    },
  ],
});
const styles = StyleSheet.create({
  page: {
    flexDirection: "col",
    backgroundColor: "#ffffff",
    paddingTop: 30,
    paddingBottom: 88,
    fontFamily: "Inter",
    color: "#4D4D4D",
  },

  rowOneCol: {
    paddingHorizontal: 48,
    paddingBottom: 30,
  },

  rowTwoCol: {
    paddingHorizontal: 48,
    flexDirection: "row",
    justifyContent: `space-between`,
  },

  section: {
    width: `45%`,
    paddingBottom: 20,
  },

  sectionHeader: {
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "bold",
    letterSpacing: 1.5,
    color: `#35763B`,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: `1px solid #E6E6E6`,
  },

  sectionBlock1: {
    paddingHorizontal: 6,
    paddingTop: 6,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  sectionBlock2: {
    paddingTop: 6,
    paddingBottom: 10,
    paddingRight: 6,
    flexDirection: "row",
  },

  sectionCol2: {
    flexDirection: "col",
    marginLeft: 16,
  },

  title: {
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: 10,
    color: `#4D4D4D`,
    paddingBottom: 4,
    marginRight: 20,
  },

  desc: {
    fontSize: 10,
    color: `#808080`,
    marginBottom: 2,
    marginRight: 0,
  },

  textGreen: {
    color: `#35763B`,
    fontSize: 10,
    fontFamily: "Inter",
    fontWeight: "bold",
    width: 40,
  },

  textYear: {
    fontFamily: "Inter",
    fontWeight: "bold",
    color: `#808080`,
    fontSize: 10,
    // marginBottom: 2,
  },

  skillTag: {
    color: `#35763B`,
    fontSize: 10,
    backgroundColor: `rgba(53, 118, 59, 0.1)`,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
  },

  header: {
    fontSize: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingBottom: 28,
    paddingRight: 48,
    color: "#4D4D4D",
  },

  footer: {
    position: "absolute",
    fontSize: 10,
    bottom: 20,
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
