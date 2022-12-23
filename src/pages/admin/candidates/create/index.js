import { DatePicker, Form, Input, Select, notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useAccessControl } from "contexts/access-control";

import {
  ASSESSMENT_GET,
  RESUME_ADD,
  RESUME_ASSESSMENT_LIST,
} from "lib/features";

import ButtonSys from "../../../../components/button";
import BasicInfoCard from "../../../../components/cards/resume/BasicInfoCard";
import LayoutDashboard from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import { H1, H2 } from "../../../../components/typography";
import { permissionWarningNotification } from "../../../../lib/helper";
import httpcookie from "cookie";

const CandidateCreate = ({ initProps, dataProfile, sidemenu }) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToCreateCandidate = hasPermission(RESUME_ADD);
  const isAllowedToGetAssessmentList = hasPermission(RESUME_ASSESSMENT_LIST);
  const isAllowedToGetAssessment = hasPermission(ASSESSMENT_GET);

  const rt = useRouter();

  const tok = initProps;
  const pathArr = rt.pathname.split("/").slice(1);
  // pathArr.splice(2, 1);
  pathArr[pathArr.length - 1] = "Tambah Kandidat";

  // 1. USE STATE
  const [dataAddCandidate, setDataAddCandidate] = useState({
    name: "",
    telp: "",
    email: "",
    city: "",
    province: "",
    assessment_id: "",
  });

  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingRoleList, setLoadingRoleList] = useState(false);
  const [assessmentRoles, setAssessmentRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [roleCriteria, setRoleCriteria] = useState([]);

  // 2. USE EFFECT
  // 2.1. Get Role List
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
      });
  }, [isAllowedToGetAssessmentList]);

  // 2.2. Get Role Criteria
  useEffect(() => {
    if (!isAllowedToGetAssessmentList) {
      permissionWarningNotification("Mendapatkan", "Detail Role Assessment");
      setLoadingRoleList(false);
      return;
    }

    if (dataAddCandidate?.assessment_id) {
      setLoadingRoleList(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssessment?id=${dataAddCandidate?.assessment_id}`,
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
            setRoleCriteria(res2?.data?.details || []);
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
        .finally(() => setLoadingRoleList(false));
    }
  }, [isAllowedToGetAssessment, dataAddCandidate?.assessment_id]);

  // 2.2. Get Role Name For Section Technical Assessment Result
  useEffect(() => {
    if (dataAddCandidate.assessment_id !== undefined) {
      const filterRole = assessmentRoles.filter(
        (role) => role.id === dataAddCandidate?.assessment_id
      )[0]?.name;

      setRoleName(filterRole);
    }
  }, [dataAddCandidate.assessment_id]);

  // 3. HANDLER
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
              city: "",
              province: "",
              assessment_id: "",
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

  // Open warning when add section is clicked in create form
  const onClickAddSection = () => {
    notification.warning({
      message: `Harap mengisi Basic Information terlebih dahulu sebelum menambahkan informasi lainnya`,
      duration: 3,
    });
  };

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
    >
      <div className="grid grid-cols-1">
        <BasicInfoCard
          dataUpdateBasic={dataAddCandidate}
          setDataUpdateBasic={setDataAddCandidate}
          handleUpdate={handleCreateCandidate}
          loadingUpdate={loadingCreate}
          assessmentRoles={assessmentRoles}
          isCreateForm={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col w-full gap-6">
            {/* SECTION ACADEMIC */}
            <div className="shadow-lg rounded-md bg-white p-5">
              <h4 className="mig-heading--4">Academic History</h4>
              <hr className="my-4" />

              <ButtonSys type={"dashed"} onClick={onClickAddSection}>
                <p className="text-primary100 hover:text-primary75">
                  + Add academic history
                </p>
              </ButtonSys>
            </div>

            {/* SECTION EXPERIENCE */}
            <div className="shadow-lg rounded-md bg-white p-5">
              <h4 className="mig-heading--4">Experience</h4>
              <hr className="my-4" />

              <ButtonSys type={"dashed"} onClick={onClickAddSection}>
                <p className="text-primary100 hover:text-primary75">
                  + Add experience
                </p>
              </ButtonSys>
            </div>

            {/* SECTION PROJECT */}
            <div className="shadow-lg rounded-md bg-white p-5">
              <h4 className="mig-heading--4">Projects</h4>
              <hr className="my-4" />

              <ButtonSys type={"dashed"} onClick={onClickAddSection}>
                <p className="text-primary100 hover:text-primary75">
                  + Add project
                </p>
              </ButtonSys>
            </div>
          </div>
          <div className="flex flex-col w-full gap-6">
            {/* SECTION SKILLS */}
            <div className="shadow-lg rounded-md bg-white p-5">
              <h4 className="mig-heading--4">Skills</h4>
              <hr className="my-4" />

              <ButtonSys type={"dashed"} onClick={onClickAddSection}>
                <p className="text-primary100 hover:text-primary75">
                  + Add skill
                </p>
              </ButtonSys>
            </div>

            {/* SECTION TRAINING */}
            <div className="shadow-lg rounded-md bg-white p-5">
              <h4 className="mig-heading--4">Training</h4>
              <hr className="my-4" />

              <ButtonSys type={"dashed"} onClick={onClickAddSection}>
                <p className="text-primary100 hover:text-primary75">
                  + Add training
                </p>
              </ButtonSys>
            </div>

            {/* SECTION CERTIFICATION */}
            <div className="shadow-lg rounded-md bg-white p-5">
              <h4 className="mig-heading--4">Certifications</h4>
              <hr className="my-4" />

              <ButtonSys type={"dashed"} onClick={onClickAddSection}>
                <p className="text-primary100 hover:text-primary75">
                  + Add certification
                </p>
              </ButtonSys>
            </div>

            {/* SECTION ACHIEVEMENT */}
            <div className="shadow-lg rounded-md bg-white p-5">
              <h4 className="mig-heading--4">Achievements</h4>
              <hr className="my-4" />

              <ButtonSys type={"dashed"} onClick={onClickAddSection}>
                <p className="text-primary100 hover:text-primary75">
                  + Add achievement
                </p>
              </ButtonSys>
            </div>

            {/* SECTION ASSESSMENT RESULT */}
            <div className="shadow-lg rounded-md bg-white p-5">
              <h4 className="mig-heading--4">Technical Assessment Results</h4>
              <hr className="my-4" />
              <div>
                <div className="flex flex-col space-y-2 mb-3">
                  <p className="text-xs text-gray-400">Assessment Role</p>
                  <p>{roleName || "-"}</p>
                </div>

                <div className="flex flex-col space-y-2 mb-3">
                  <p className="text-xs text-gray-400 mb-2">Criteria</p>
                  <ul>
                    {roleCriteria.map((assessment) => (
                      <li key={assessment.id}>
                        <div className="flex flex-row justify-between items-center mb-1">
                          <p className="w-full mr-5">{assessment.criteria}</p>
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

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "112",
    },
  };
}

export default CandidateCreate;
