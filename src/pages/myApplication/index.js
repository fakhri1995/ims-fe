import { Tag, Timeline, notification } from "antd";
import parse from "html-react-parser";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useAccessControl } from "contexts/access-control";

import { RECRUITMENT_GET, RESUME_GET, RESUME_UPDATE } from "lib/features";

import ButtonSys from "../../components/button";
import { EditIconSvg } from "../../components/icon";
import LayoutDashboard2 from "../../components/layout-dashboard2";
import st from "../../components/layout-dashboard.module.css";
import { permissionWarningNotification } from "../../lib/helper";
import httpcookie from "cookie";

const CandidateRecruitmentDetailIndex = ({
  initProps,
  dataProfile,
  sidemenu,
}) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetRecruitment = hasPermission(RECRUITMENT_GET);
  const isAllowedToGetResume = hasPermission(RESUME_GET);
  const isAllowedToUpdateResume = hasPermission(RESUME_UPDATE);

  //INIT
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  // console.log(pathArr);
  pathArr[pathArr.length - 1] = "Lamaran Saya";

  // 1. STATE
  // 1.1. display
  const [praloading, setpraloading] = useState(true);
  const [dataRecruitment, setDataRecruitment] = useState({});

  const [resumeId, setResumeId] = useState(0);
  const [dataResume, setDataResume] = useState({});
  const [loadingDataResume, setLoadingDataResume] = useState(true);

  const [refresh, setRefresh] = useState(-1);

  // 2. USE EFFECT
  // 2.1 Get recruitment candidate detail
  useEffect(() => {
    if (!isAllowedToGetRecruitment) {
      permissionWarningNotification("Mendapatkan", "Detail Rekrutmen Kandidat");
      setpraloading(false);
      return;
    }
    setpraloading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitment`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          setDataRecruitment(response2.data);
          setResumeId(response2.data.resume?.id);
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
  }, [isAllowedToGetRecruitment, refresh]);
  // console.log(dataRecruitment)

  // 2.5. Get resume data (use for "Profil Kandidat")
  useEffect(() => {
    if (!isAllowedToGetResume) {
      permissionWarningNotification("Mendapatkan", "Data Resume Kandidat");
      setLoadingDataResume(false);
      return;
    }
    // console.log(resumeId)
    if (resumeId !== 0) {
      setLoadingDataResume(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getResume?id=${resumeId}`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      })
        .then((response) => response.json())
        .then((response2) => {
          if (response2.success) {
            setDataResume(response2.data);
          } else {
            notification.error({
              message: `${response2.message}`,
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
        .finally(() => {
          setLoadingDataResume(false);
        });
    }
  }, [isAllowedToGetResume, resumeId, refresh]);

  return (
    <LayoutDashboard2
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
    >
      <div className="flex flex-row gap-6 w-full">
        {/* Left Column */}
        <div className="flex flex-col gap-6 w-1/3">
          {/* Card Primary Info */}
          <div className="flex flex-col shadow-lg rounded-md bg-white p-6 space-y-4">
            <h4 className="mig-heading--4">Detail Lamaran</h4>
            <div className="space-y-2">
              <p className="mig-caption--medium text-mono80">Email</p>
              <p className="text-md">{dataRecruitment.email}</p>
            </div>
            {/* <div className="space-y-2">
                                        <p className="mig-caption--medium text-mono80">Password</p>
                                        <p className="text-md">pass</p>
                                </div> */}
            <div className="space-y-2">
              <p className="mig-caption--medium text-mono80">Universitas</p>
              <p className="text-md">{dataRecruitment.university}</p>
            </div>
            <div className="space-y-2">
              <p className="mig-caption--medium text-mono80">
                Role yang Didaftarkan
              </p>
              <p className="text-md">{dataRecruitment.role?.name}</p>
            </div>
            <div className="space-y-2">
              <p className="mig-caption--medium text-mono80">Tipe Role</p>
              <p className="text-md">{dataRecruitment.role?.type?.name}</p>
            </div>
            <div className="space-y-2">
              <p className="mig-caption--medium text-mono80">Jalur Daftar</p>
              <p className="text-md">{dataRecruitment.jalur_daftar?.name}</p>
            </div>
            <div className="space-y-2">
              <p className="mig-caption--medium text-mono80">Tanggal Daftar</p>
              <p className="text-md">
                {moment(dataRecruitment.created_at).format("LL")},&nbsp;
                {moment(dataRecruitment.created_at).format("LT")}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 w-2/3">
          {/* Card Profil Kandidat */}
          <div className="shadow-lg rounded-md bg-white p-6 divide-y-2">
            <div className="flex flex-row justify-between items-center mb-4">
              <h4 className="mig-heading--4">Profil Kandidat</h4>
              <ButtonSys
                type={
                  !isAllowedToUpdateResume ||
                  dataRecruitment.user?.is_enabled === 0
                    ? "primary"
                    : "default"
                }
                disabled={
                  !isAllowedToUpdateResume ||
                  dataRecruitment.user?.is_enabled === 0
                }
                onClick={() => rt.push(`/myApplication/edit/${resumeId}`)}
              >
                <div className="flex flex-row space-x-3 items-center">
                  <EditIconSvg size={16} color="#35763B" />
                  <p>Ubah Profil</p>
                </div>
              </ButtonSys>
            </div>
            <div className="flex flex-col pt-4 pb-8">
              <p className="text-sm font-bold text-primary100 mb-4">
                Informasi Dasar
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <p className="mig-caption--medium text-mono80">Nama</p>
                  <p className="text-md">{dataResume.name}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="mig-caption--medium text-mono80">
                    Nomor Telepon
                  </p>
                  <p className="text-md">{dataResume.telp}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="mig-caption--medium text-mono80">Email</p>
                  <p className="text-md">{dataResume.email}</p>
                </div>
                <div className="flex flex-col space-y-2 col-span-2">
                  <p className="mig-caption--medium text-mono80">Alamat</p>
                  <p className="text-md">
                    {`${dataResume.city}, ${dataResume.province}`}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col pt-4 pb-2">
              <p className="text-sm font-bold text-primary100 mb-9">
                Pengalaman Kerja
              </p>
              <Timeline className="pl-6">
                {dataResume.experiences?.map((experience) => (
                  <Timeline.Item color="#35763B" key={experience.id}>
                    <p className="text-sm text-mono30 font-bold mb-1">
                      {experience.role}
                    </p>
                    <div className="flex flex-row">
                      <p className="mig-caption text-mono50 mb-2">
                        {experience.company},&nbsp;
                      </p>
                      <p className="mig-caption text-mono80">
                        {moment(experience.start_date).format("MMMM YYYY")}{" "}
                        -&nbsp;
                        {moment(experience.end_date).format("MMMM YYYY")}
                      </p>
                    </div>
                    <p className="mig-caption text-mono50">
                      {parse(experience.description || "")}
                    </p>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
            <div className="flex flex-col pt-4 pb-2">
              <p className="text-sm font-bold text-primary100 mb-9">
                Riwayat Pendidikan
              </p>
              <Timeline className="pl-6">
                {dataResume.educations?.map((edu) => (
                  <Timeline.Item color="#35763B" key={edu.id}>
                    <p className="text-sm text-mono30 font-bold mb-1">
                      {edu.university}
                    </p>
                    <div className="flex flex-row">
                      <p className="mig-caption text-mono50 mb-2">
                        {edu.major},&nbsp;
                      </p>
                      <p className="mig-caption text-mono80">
                        {moment(edu.graduation_year).format("YYYY")}
                      </p>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
            <div className="flex flex-col pt-4 pb-4">
              <p className="text-sm font-bold text-primary100 mb-4">Skill</p>
              <div className="flex flex-wrap">
                {dataResume.skills?.map((skill) => (
                  <Tag
                    key={skill.id}
                    color="#35763B1A"
                    className="text-primary100 mb-3"
                  >
                    {skill.name}
                  </Tag>
                ))}
              </div>
            </div>
            <div className="flex flex-col pt-4 pb-4">
              <p className="text-sm font-bold text-primary100 mb-4">Proyek</p>
              <div className="flex flex-col space-y-4">
                {dataResume.projects?.map((proj) => (
                  <div key={proj.id}>
                    <p className="text-sm text-mono30 font-bold mb-1">
                      {proj.name}
                    </p>
                    <p className="mig-caption text-mono50 mb-2">
                      {proj.description}
                    </p>
                    <p className="mig-caption text-mono80">
                      {moment(proj.year).format("YYYY")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col pt-4 pb-4">
              <p className="text-sm font-bold text-primary100 mb-4">
                Pelatihan
              </p>
              <div className="flex flex-col space-y-4">
                {dataResume.trainings?.map((train) => (
                  <div key={train.id}>
                    <p className="text-sm text-mono30 font-bold mb-1">
                      {train.name}
                    </p>
                    <p className="mig-caption text-mono50 mb-2">
                      {train.organizer}, {moment(train.year).format("YYYY")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col pt-4 pb-4">
              <p className="text-sm font-bold text-primary100 mb-4">
                Lisensi dan Sertifikasi
              </p>
              <div className="flex flex-col space-y-4">
                {dataResume.certificates?.map((certif) => (
                  <div key={certif.id}>
                    <p className="text-sm text-mono30 font-bold mb-1">
                      {certif.name}
                    </p>
                    <p className="mig-caption text-mono50 mb-2">
                      {certif.organizer}, {moment(certif.year).format("YYYY")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col pt-4 pb-4">
              <p className="text-sm font-bold text-primary100 mb-4">
                Penghargaan
              </p>
              <div className="flex flex-col space-y-4">
                {dataResume.achievements?.map((achiev) => (
                  <div key={achiev.id}>
                    <p className="text-sm text-mono30 font-bold mb-1">
                      {achiev.name}
                    </p>
                    <p className="mig-caption text-mono50 mb-2">
                      {achiev.organizer}, {moment(achiev.year).format("YYYY")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboard2>
  );
};

export async function getServerSideProps({ req, res, params }) {
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
    },
  };
}

export default CandidateRecruitmentDetailIndex;
