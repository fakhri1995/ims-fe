import { DatePicker, Form, Input, Select, notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useAccessControl } from "contexts/access-control";

import { ASSESSMENTS_GET, RESUME_ADD } from "lib/features";

import ButtonSys from "../../../../components/button";
import BasicInfoCard from "../../../../components/cards/resume/BasicInfoCard";
import LayoutDashboard from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import { H1, H2 } from "../../../../components/typography";
import httpcookie from "cookie";

const CandidateCreate = ({
  initProps,
  dataProfile,
  sidemenu,
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
  const isAllowedToGetRoleAssessmentList = hasPermission(ASSESSMENTS_GET);

  const rt = useRouter();

  const tok = initProps;
  const pathArr = rt.pathname.split("/").slice(1);
  // pathArr.splice(2, 1);
  pathArr[pathArr.length - 1] = "Tambah Kandidat";

  const [instanceForm] = Form.useForm();

  const [dataAddCandidate, setDataAddCandidate] = useState({
    name: "",
    telp: "",
    email: "",
    role: "",
    city: "",
    province: "",
  });

  const [dataAddEducation, setDataAddEducation] = useState({
    university: "",
    major: "",
    gpa: 0,
    graduation_year: "",
  });

  const [loadingCreate, setLoadingCreate] = useState(false);
  const [assessmentRoles, setAssessmentRoles] = useState([]);
  const [criterias, setCriterias] = useState([]);
  const [selected, setSelected] = useState();

  //HANDLER
  const onChangeInputCandidate = (e) => {
    setDataAddCandidate({
      ...dataAddCandidate,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateCandidate = () => {
    if (!isAllowedToCreateCandidate) {
      permissionWarningNotification("Menambah", "Kandidat");
      return;
    }
    setLoadingCreate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addResume`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataAddCandidate),
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          notification.success({
            message: `Kandidat berhasil ditambahkan.`,
            duration: 3,
          });
          setTimeout(() => {
            setLoadingCreate(false);
            setDataAddCandidate({
              name: "",
              telp: "",
              email: "",
              role: "",
              city: "",
              province: "",
            });
            rt.push(`/admin/candidates/${response2.id}`);
          }, 500);
        } else {
          notification.error({
            message: `Gagal menambahkan kandidat. ${response2.message}`,
            duration: 3,
          });
          setTimeout(() => {
            setLoadingCreate(false);
          }, 500);
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan kandidat. ${err.response}`,
          duration: 3,
        });
        setLoadingCreate(false);
      });
  };

  // USE EFFECT
  useEffect(() => {
    if (!isAllowedToGetRoleAssessmentList) {
      return;
    }

    const roles = dataListRoleAssessments.data.data;
    setAssessmentRoles(roles);
  }, [isAllowedToGetRoleAssessmentList, dataListRoleAssessments]);

  useEffect(() => {
    if (!isAllowedToGetRoleAssessmentList) {
      return;
    }

    if (selected !== undefined) {
      let findCriterias = assessmentRoles.find(
        (assessment) => assessment.name === selected
      );
      // console.log(findCriterias)
      setCriterias(findCriterias.details);
    }
  }, [isAllowedToGetRoleAssessmentList, selected]);

  //DEBUG
  // console.log(dataAddCandidate);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
    >
      <div className="flex flex-col gap-6 ">
        <BasicInfoCard
          dataUpdateBasic={dataAddCandidate}
          setDataUpdateBasic={setDataAddCandidate}
          handleUpdate={handleCreateCandidate}
          assessmentRoles={assessmentRoles}
          isCreateForm={true}
        />

        <div className="flex flex-row gap-6">
          <div className="flex flex-col w-full gap-6">
            {/* SECTION ACADEMIC */}
            <div className="shadow-lg rounded-md bg-white p-5">
              <H2>Academic History</H2>
              <hr className="my-4" />

              <ButtonSys type={"dashed"}>
                <p className="text-primary100 hover:text-primary75">
                  + Add academic history
                </p>
              </ButtonSys>
            </div>

            {/* SECTION EXPERIENCE */}
            <div className="shadow-lg rounded-md bg-white p-5">
              <H2>Experience</H2>
              <hr className="my-4" />

              <ButtonSys
                type={"dashed"}
                // disabled={true}
              >
                <p className="text-primary100 hover:text-primary75">
                  + Add experience
                </p>
              </ButtonSys>
            </div>

            {/* SECTION PROJECT */}
            <div className="shadow-lg rounded-md bg-white p-5">
              <H2>Projects</H2>
              <hr className="my-4" />

              <ButtonSys type={"dashed"}>
                <p className="text-primary100 hover:text-primary75">
                  + Add project
                </p>
              </ButtonSys>
            </div>
          </div>
          <div className="flex flex-col w-full gap-6">
            {/* SECTION SKILLS */}
            <div className="shadow-lg rounded-md bg-white p-5">
              <H2>Skills</H2>
              <hr className="my-4" />

              <ButtonSys type={"dashed"}>
                <p className="text-primary100 hover:text-primary75">
                  + Add skill
                </p>
              </ButtonSys>
            </div>

            {/* SECTION TRAINING */}
            <div className="shadow-lg rounded-md bg-white p-5">
              <H2>Training</H2>
              <hr className="my-4" />

              <ButtonSys type={"dashed"}>
                <p className="text-primary100 hover:text-primary75">
                  + Add training
                </p>
              </ButtonSys>
            </div>

            {/* SECTION CERTIFICATION */}
            <div className="shadow-lg rounded-md bg-white p-5">
              <H2>Certifications</H2>
              <hr className="my-4" />

              <ButtonSys type={"dashed"}>
                <p className="text-primary100 hover:text-primary75">
                  + Add certification
                </p>
              </ButtonSys>
            </div>

            {/* SECTION ACHIEVEMENT */}
            <div className="shadow-lg rounded-md bg-white p-5">
              <H2>Achievements</H2>
              <hr className="my-4" />

              <ButtonSys type={"dashed"}>
                <p className="text-primary100 hover:text-primary75">
                  + Add achievement
                </p>
              </ButtonSys>
            </div>

            {/* SECTION ASSESSMENT RESULT */}
            <div className="shadow-lg rounded-md bg-white p-5">
              <H2>Technical Assessment Results</H2>

              <hr className="my-4" />

              {/* Input Assessment Result */}

              <div>
                <div className="flex flex-col space-y-2 mb-3">
                  <p className="text-xs text-gray-400">Assessment Role</p>
                  <Select
                    defaultValue={"Choose assessment role..."}
                    onChange={(value) => {
                      // console.log(value)
                      setSelected(value);
                    }}
                  >
                    {assessmentRoles.map((role) => (
                      <Select.Option key={role.id} value={role.name}>
                        {role.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-2">Criteria</p>
                  <ul>
                    {criterias.map((assessment) => (
                      <li key={assessment.id}>
                        <div className="flex flex-row justify-between items-center mb-1">
                          <p className="w-full mr-5">{assessment.criteria}</p>
                          {/* <Input
                            className="w-20"
                            value={assessment.value}
                            onChange={}
                          /> */}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res }) {
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
      sidemenu: "112",
      dataListRoleAssessments,
    },
  };
}

export default CandidateCreate;
