import { ArrowRightOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Drawer,
  Empty,
  Input,
  Popover,
  Progress,
  Select,
  Spin,
  Table,
  notification,
} from "antd";
import jscookie from "js-cookie";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import Link from "next/link";
import { useRouter } from "next/router";
import QueryString from "qs";
import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import ButtonSys from "../../../components/button";
import {
  AlerttriangleIconSvg,
  CalendartimeIconSvg,
  CameraIconSvg,
  CheckIconSvg,
  CheckboxIconSvg,
  DownIconSvg,
  NewsIconSvg,
  PakaiSewaIconSvg,
  SearchIconSvg,
  TimelineIconSvg,
  UpIconSvg,
  UserCheckIconSvg,
  UserIconSvg,
} from "../../../components/icon";
import { H1, H2, Label, Text } from "../../../components/typography";
import { generateStaticAssetUrl, momentFormatDate } from "../../../lib/helper";
import DrawerCore from "../../drawer/drawerCore";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

Chart.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

function DetailAgenCard({ initProps, visible, onClose, dataAgen }) {
  // const [dataProject,setDataProject] = useState([
  //     {
  //         id:1,
  //         name_project:'Mobile Apps Dashboard',
  //         estimation:'Estimasi selesai 8 Juli 2023',
  //         status:'On Going'
  //     },
  //     {
  //         id:2,
  //         name_project:'Pengembangan Modul Rekrutmen Talent',
  //         estimation:'Estimasi selesai 2 Oktober 2023',
  //         status:'On Going'
  //     },
  //     {
  //         id:3,
  //         name_project:'Talent Pool Requester',
  //         estimation:'Estimasi selesai 2 Desember 2023',
  //         status:'On Going'
  //     },
  // ])
  const [dataProject, setDataProject] = useState([]);

  const [jumlahAktifitas, setJumlahAktifitas] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [checkinTIme, setCheckInTIme] = useState(null);
  const [totalProject, setTotalProject] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (dataAgen.attendance_user == null) {
      setJumlahAktifitas(0);
      setImageUrl(null);
      setCheckInTIme(null);
    } else {
      fetchData();
    }
    if (dataAgen.id != null) {
      fetchDataProject();
    }
  }, [dataAgen]);

  const fetchData = async () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAttendanceUserAdmin?id=${dataAgen.attendance_user.id}`,
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
          setJumlahAktifitas(res2.data.activities_count);
          setImageUrl(res2.data.user_attendance.evidence[0].link);
          setCheckInTIme(res2.data.user_attendance.check_in);
        } else {
          // notification.error({
          //     message: `${res2.message}`,
          //     duration: 3,
          // });
        }
      })
      .catch((err) => {
        // notification.error({
        //     message: `${err.response}`,
        //     duration: 3,
        // });
      })
      .finally(() => {});
  };

  const fetchDataProject = async () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}//getProjects?user_id=${dataAgen.id}`,
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
          setDataProject(res2.data.data);
          setTotalProject(res2.data.total);
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
      .finally(() => {});
  };
  const renderName = (name) => {
    if (name.length > 23) {
      return name.slice(0, 23) + "...";
    } else {
      return name;
    }
  };
  const lihatDetailKehadiran = () => {
    router.push(`/kehadiran/detail/${dataAgen.attendance_user.id}`);
  };
  const lihatDetailProject = () => {
    router.push(`/kehadiran/projects/${dataAgen.id}`);
  };
  return (
    <Drawer
      visible={visible}
      title="Detail Agen"
      width={466}
      maskClosable={false}
      destroyOnClose={true}
      onClose={onClose}
    >
      <div className={""}>
        <div
          className={"p-4 flex border border-mono100 rounded-lg items-center"}
        >
          <div
            className={
              "w-16 h-16 rounded-[200px] flex justify-center items-center bg-backdrop"
            }
          >
            <p className={"leading-6 font-bold text-[14px] text-primary100"}>
              {dataAgen && dataAgen.name != null
                ? dataAgen.name
                    .match(/(\b\S)?/g)
                    .join("")
                    .toUpperCase()
                : "-"}
            </p>
          </div>
          <div className={"ml-6 flex-col justify-center items-center"}>
            <p className={"leading-6 font-bold text-[18px] text-mono30 "}>
              {dataAgen?.name}
            </p>
            <p className={"text-xs text-mono50 leading-5  "}>
              {dataAgen?.role}
            </p>
          </div>
        </div>
        <div className={"p-4 mt-4 border border-mono100 rounded-lg"}>
          <p className="text-mono30 leading-6 font-bold text-sm ">
            Data Kehadiran
          </p>
          <div
            className={
              "mt-4 p-4 border border-mono100 rounded-[4px] flex items-center"
            }
          >
            {imageUrl == null ? (
              <div className={"p-6 bg-mono100 rounded-[4px] mr-4"}>
                <CameraIconSvg size={24} color={"#4D4D4D"} />
              </div>
            ) : (
              <img
                src={generateStaticAssetUrl(imageUrl)}
                className={"mr-4"}
                height={87}
                width={87}
              />
            )}
            <div className={"flex flex-col w-1/2"}>
              {dataAgen.attendance_user == null ? (
                <div
                  className={"bg-onprogress py-0.5 px-2 rounded-[2px] w-[92px]"}
                >
                  <p className={"text-[10px] text-white font-bold leading-4"}>
                    Belum Check In
                  </p>
                </div>
              ) : (
                <div className={"flex gap-2.5"}>
                  {dataAgen.attendance_user.is_late == 0 ? (
                    <div className={"bg-primary100 px-2 py-0.5 rounded-[2px]"}>
                      <p
                        className={"text-[10px] text-white font-bold leading-4"}
                      >
                        Tepat Waktu
                      </p>
                    </div>
                  ) : (
                    <div className={"bg-state1 px-2 py-0.5 rounded-[2px]"}>
                      <p
                        className={"text-[10px] text-white font-bold leading-4"}
                      >
                        Terlambat
                      </p>
                    </div>
                  )}
                  <div className={"bg-closed px-2 py-0.5 rounded-[2px]"}>
                    <p className={"text-[10px] text-white font-bold leading-4"}>
                      {dataAgen.attendance_user.is_wfo == 1 ? "WFO" : "WFH"}
                    </p>
                  </div>
                </div>
              )}
              <div className={"mt-3 flex flex-row gap-2 items-center"}>
                <TimelineIconSvg />
                <p className={"text-mono50 text-[10px] leading-4 font-bold "}>
                  {checkinTIme
                    ? momentFormatDate(checkinTIme, "-", "D MMMM YYYY, H:mm")
                    : "-"}
                </p>
              </div>
              <div className={"mt-3 flex flex-row gap-2"}>
                <CheckboxIconSvg size={16} color={"#808080"} />
                <p className={"text-mono50 text-[10px] leading-4 font-bold "}>
                  {jumlahAktifitas} Aktivitas terisi
                </p>
              </div>
            </div>
            {dataAgen.attendance_user != null && (
              <div
                className={"flex flex-row hover:cursor-pointer"}
                onClick={() => lihatDetailKehadiran()}
              >
                <p
                  className={
                    "text-primary100 text-[10px] leading-4 font-bold mr-1"
                  }
                >
                  Lihat Detail
                </p>
                <ArrowRightOutlined size={16} color={"#35763B"} />
              </div>
            )}
          </div>
        </div>
        {totalProject > 0 && (
          <div className={"p-4 mt-4 border border-mono100 rounded-lg"}>
            <div className={"flex justify-between"}>
              <p className="text-mono30 leading-6 font-bold text-sm ">
                Daftar Proyek
              </p>
              <p className={"text-xs leading-5 font-bold text-mono50"}>
                {totalProject} Proyek Aktif
              </p>
            </div>
            {dataProject?.map((data) => (
              <div
                className={
                  "mt-4 rounded-[5px] border border-mono100 p-4 flex flex-row"
                }
              >
                <div className={"w-1/2 mr-4"}>
                  <p className={"text-xs text-mono50 leading-5"}>
                    {renderName(data.name)}
                  </p>
                  <div className={"flex flex-row gap-1.5"}>
                    <CalendartimeIconSvg size={16} color={"#808080"} />
                    <p className={"text-[10px] text-mono50 leading-4"}>
                      Estimasi selesai{" "}
                      {momentFormatDate(data.end_date, "-", "D MMMM YYYY")}
                    </p>
                  </div>
                </div>
                <div></div>
                {data.status ? (
                  <div
                    style={{ backgroundColor: data.status.color }}
                    className={
                      "px-2 py-0.5 rounded-[2px] flex justify-center items-center self-center w-[62px] h-[20px] mr-4"
                    }
                  >
                    <p className={"text-[10px] font-bold leading-4 text-white"}>
                      {data.status.name}
                    </p>
                  </div>
                ) : (
                  <div
                    className={
                      "px-2 py-0.5 rounded-[2px] flex justify-center items-center self-center w-[62px] h-[20px] mr-4"
                    }
                  >
                    <p
                      className={"text-[10px] font-bold leading-4 text-white"}
                    ></p>
                  </div>
                )}
                <div
                  className={"flex flex-row items-center hover:cursor-pointer"}
                  onClick={() => lihatDetailProject()}
                >
                  <p
                    className={
                      "text-primary100 text-[10px] leading-4 font-bold mr-1"
                    }
                  >
                    Lihat Detail
                  </p>
                  <ArrowRightOutlined size={16} color={"#35763B"} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Drawer>
  );
}

export default DetailAgenCard;
