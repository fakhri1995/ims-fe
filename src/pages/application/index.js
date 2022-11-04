import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Button, Popover, Timeline, notification } from "antd";
import moment from "moment";
import "moment/locale/id";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Html from "react-pdf-html";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { RECRUITMENT_GET, RESUME_GET, RESUME_UPDATE } from "lib/features";

import ButtonSys from "../../components/button";
import {
  DotsIconSvg,
  DownloadIconSvg,
  EditIconSvg,
  ExternalLinkIconSvg,
  InfoCircleIconSvg,
  MailForwardIconSvg,
  OneUserIconSvg,
  PlusIconSvg,
} from "../../components/icon";
import LayoutDashboard2 from "../../components/layout-dashboard2";
import st from "../../components/layout-dashboard.module.css";
import { permissionWarningNotification } from "../../lib/helper";
import httpcookie from "cookie";

moment.locale("id");

const CandidateRecruitmentDetailIndex = ({
  initProps,
  dataProfile,
  sidemenu,
  recruitmentId,
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
  const isAllowedToUpdateResume = hasPermission(RESUME_UPDATE);
  const isAllowedToGetResume = hasPermission(RESUME_GET);

  //INIT
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  // console.log(pathArr);
  pathArr[pathArr.length - 1] = "Lamaran Saya";

  // 1. STATE
  // 1.1. display
  const [praloading, setpraloading] = useState(true);
  const [dataRecruitment, setDataRecruitment] = useState({});
  const [dataResume, setDataResume] = useState({});
  const [refresh, setRefresh] = useState(-1);

  // 2. USE EFFECT
  // 2.1 Get recruitment candidate detail
  // useEffect(() => {
  // 	if (!isAllowedToGetRecruitment) {
  // 		permissionWarningNotification("Mendapatkan", "Detail Rekrutmen Kandidat");
  // 		setpraloading(false);
  // 		return;
  // 	}

  // 	if (recruitmentId) {
  // 		setpraloading(true);
  // 		fetch(
  // 			`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitment?id=${recruitmentId}`,
  // 			{
  // 				method: `GET`,
  // 				headers: {
  // 					Authorization: JSON.parse(initProps),
  // 				},
  // 			}
  // 		)
  // 			.then((response) => response.json())
  // 			.then((response2) => {
  // 				if (response2.success) {
  // 					setDataRecruitment(response2.data);
  // 				} else {
  // 					notification.error({
  // 						message: `${response2.message}`,
  // 						duration: 3,
  // 					});
  // 				}
  // 				setpraloading(false);
  // 			})
  // 			.catch((err) => {
  // 				notification.error({
  // 					message: `${err.response}`,
  // 					duration: 3,
  // 				});
  // 				setpraloading(false);
  // 			});
  // 	}
  // }, [isAllowedToGetRecruitment, recruitmentId, refresh]);

  // 3. Event

  return (
    <LayoutDashboard2
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
    >
      <div className="flex flex-row gap-6 w-full">
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

        <div className="flex flex-col gap-6 w-2/3">
          {/* Card Profil Kandidat */}
          <div className="shadow-lg rounded-md bg-white p-6 divide-y-2">
            <div className="flex flex-row justify-between items-center mb-4">
              <h4 className="mig-heading--4">Profil Kandidat</h4>
              <ButtonSys
                type={isAllowedToUpdateResume ? "default" : "primary"}
                disabled={!isAllowedToUpdateResume}
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
                {/* {dataResume.experiences(data => (
                   <Timeline.Item color="#35763B">
                    <p className="text-sm text-mono30 font-bold mb-1">
                      Associate Product Manager
                    </p>
                    <p className="mig-caption text-mono50 mb-2">
                      PT ABC, Internship
                    </p>
                    <p className="mig-caption text-mono80">
                      Agustus 2021 - Sekarang
                    </p>
                  </Timeline.Item> 
                ))} */}

                <Timeline.Item color="#35763B">
                  <p className="text-sm text-mono30 font-bold mb-1">
                    Associate Product Manager
                  </p>
                  <p className="mig-caption text-mono50 mb-2">
                    PT ABC, Internship
                  </p>
                  <p className="mig-caption text-mono80">
                    Agustus 2021 - Sekarang
                  </p>
                </Timeline.Item>
              </Timeline>
            </div>
            <div className="flex flex-col pt-4 pb-2">
              <p className="text-sm font-bold text-primary100 mb-9">
                Riwayat Pendidikan
              </p>
              <Timeline className="pl-6">
                <Timeline.Item color="#35763B">
                  <p className="text-sm text-mono30 font-bold mb-1">
                    Institut Teknologi Bandung
                  </p>
                  <p className="mig-caption text-mono50 mb-2">S2, Manajemen</p>
                  <p className="mig-caption text-mono80">
                    Agustus 2021 - Sekarang
                  </p>
                </Timeline.Item>
              </Timeline>
            </div>
            <div className="flex flex-col pt-4 pb-2">
              <p className="text-sm font-bold text-primary100 mb-9">
                Pengalaman Organisasi/Relawan
              </p>
              <Timeline className="pl-6">
                <Timeline.Item color="#35763B">
                  <p className="text-sm text-mono30 font-bold mb-1">
                    Anggota Divisi Intrakampus
                  </p>
                  <p className="mig-caption text-mono50 mb-2">
                    Himpunan Mahasiswa Teknik Informatika (HMIF) ITB
                  </p>
                  <p className="mig-caption text-mono80">
                    Agustus 2021 - Sekarang
                  </p>
                </Timeline.Item>
              </Timeline>
            </div>
            <div className="flex flex-col py-4">
              <p className="text-sm font-bold text-primary100 mb-4">
                Lisensi dan Sertifikasi
              </p>
              <div className="flex flex-col space-y-2">
                <p className="mig-caption--bold text-mono30">
                  Machine Learning
                </p>
                <p className="mig-caption text-mono50">
                  Kaggle, berlaku sampai Juni 2025
                </p>
                <div className="flex items-center space-x-2">
                  <p className="mig-caption text-mono50">0000-0000-0000</p>
                  <ExternalLinkIconSvg size={16} color={"#808080"} />
                </div>
              </div>
            </div>
            <div className="flex flex-col py-4">
              <p className="text-sm font-bold text-primary100 mb-4">
                Penghargaan
              </p>
              <div className="flex flex-col space-y-2">
                <p className="mig-caption--bold text-mono30">
                  Juara II, Competitive Programming
                </p>
                <p className="mig-caption text-mono50">Compfest, Juni 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboard2>
  );
};

export async function getServerSideProps({ req, res, params }) {
  // const recruitmentId = params.recruitmentId;
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
      // recruitmentId,
    },
  };
}

export default CandidateRecruitmentDetailIndex;
