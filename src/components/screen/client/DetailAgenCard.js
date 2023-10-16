import { ArrowRightOutlined } from "@ant-design/icons";
import {
  Calendar,
  Checkbox,
  DatePicker,
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
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import Link from "next/link";
import { useRouter } from "next/router";
import QueryString from "qs";
import { useEffect, useRef, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import Slider from "react-slick";

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
import { useAccessControl } from "../../../contexts/access-control";
import { PROJECTS_GET } from "../../../lib/features";
import {
  generateStaticAssetUrl,
  momentFormatDate,
  permissionWarningNotification,
} from "../../../lib/helper";
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
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

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
  const { hasPermission } = useAccessControl();
  const isAllowedToGetProject = hasPermission(PROJECTS_GET);
  const [dataProject, setDataProject] = useState([]);
  const [dataMonth, setDataMonth] = useState([]);
  const slider = useRef(null);
  // const [jumlahAktifitas, setJumlahAktifitas] = useState(0);
  // const [imageUrl, setImageUrl] = useState(null);
  // const [checkinTIme, setCheckInTIme] = useState(null);
  const [totalProject, setTotalProject] = useState(0);
  const [attendanceActive, setAttendanceActive] = useState(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [monthActive, setMonthActive] = useState(null);
  const [yearActive, setYearActive] = useState(null);
  const [dataAttendance, setDataAttendance] = useState({
    imageUrl: null,
    checkinTIme: null,
    jumlahAktifitas: 0,
    attendanceUser: null,
  });
  const router = useRouter();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    initialSlide: 8,
  };

  useEffect(() => {
    // if (dataAgen.attendance_user == null) {
    //   setJumlahAktifitas(0);
    //   setImageUrl(null);
    //   setCheckInTIme(null);
    // } else {
    //   fetchData(dataAgen.attendance_user.id);
    // }
    if (dataAgen.id != null) {
      let month = moment().format("MM");
      let year = moment().format("YYYY");
      setMonthActive(month);
      setYearActive(year);
      fetchDataProject();
      fetchDataAttendance(month, year);
    }
  }, [dataAgen]);

  const fetchData = async (id) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAttendanceUserAdmin?id=${id}`,
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
          setDataAttendance({
            imageUrl: res2.data.user_attendance.evidence[0].link,
            checkinTIme: res2.data.user_attendance.check_in,
            jumlahAktifitas: res2.data.activities_count,
            attendanceUser: res2.data.user_attendance,
          });
        } else {
          // notification.error({
          //   message: `${res2.message}`,
          //   duration: 3,
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
    if (!isAllowedToGetProject) {
      permissionWarningNotification("Mendapatkan", "Daftar Project");
      return;
    }
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjects?user_id=${dataAgen.id}`,
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

  const checkAttendance = (attendanceCheck) => {
    if (attendanceCheck != null) {
      fetchData(attendanceCheck.id);
    } else {
      emptyAttendance();
    }
  };

  const emptyAttendance = () => {
    setDataAttendance({
      imageUrl: null,
      checkinTIme: null,
      jumlahAktifitas: 0,
      attendanceUser: null,
    });
  };
  const fetchDataAttendance = async (month, year) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAttendancesUserMonthly?user_id=${dataAgen.id}&month=${month}&year=${year}`,
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
          if (month == moment().format("MM")) {
            let dataAttendanceTemp = null;
            // for (let a = 0; a < res2.data.length; a++) {
            //   if (
            //     moment(res2.data[a].date).isBefore(
            //       moment().format("YYYYY-MM-DD")
            //     )
            //   ) {
            //     let dateCompare = moment(res2.data[a].date).add(4, "days");
            //     if (dateCompare.isAfter(moment().format("YYYY-MM-DD"))) {
            //       dataTemp.push(res2.data[a]);
            //     }
            //   } else {
            //     dataTemp.push(res2.data[a]);
            //   }

            //   if (
            //     moment(res2.data[a].date).format("YYYY-MM-DD") ==
            //     moment().format("YYYY-MM-DD")
            //   ) {
            //     dataAttendanceTemp = res2.data[a].attendance;
            //   }
            // }
            let index = moment().format("DD");
            dataAttendanceTemp = res2.data[index - 1].attendance;
            checkAttendance(dataAttendanceTemp);
            slider.current.slickGoTo(index - 4);
            setDataMonth(res2.data);
            setAttendanceActive(moment().format("YYYY-MM-DD"));
          } else {
            setDataMonth(res2.data);
            let dataAttendanceTemp = res2.data[0].attendance;
            slider.current.slickGoTo(0);
            checkAttendance(dataAttendanceTemp);
            setAttendanceActive(moment(res2.data[a].date).format("YYYY-MM-DD"));
          }
        } else {
          // notification.error({
          //   message: `${res2.message}`,
          //   duration: 3,
          // });
        }
      })
      .catch((err) => {
        // notification.error({
        //   message: `${err.response}`,
        //   duration: 3,
        // });
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

  const getDate = (date) => {
    let tgl = new Date(date);
    return tgl.getDate();
  };

  const getDay = (date) => {
    let tgl = new Date(date);
    let day_get = moment(tgl).format("dddd").substring(0, 3);
    return day_get;
  };

  const clickAttendance = (data) => {
    setAttendanceActive(data.date);
    if (data.attendance != null) {
      fetchData(data.attendance.id);
    } else {
      emptyAttendance();
    }
  };

  const renderDate = (data) => {
    if (
      moment(data.date).format("YYYY-MM-DD") > moment().format("YYYY-MM-DD")
    ) {
      return (
        <Popover
          content={
            <div>
              <p>Belum Berlangsung</p>
            </div>
          }
        >
          <div
            className={`px-2.5 py-1 rounded-[5px] w-10 flex flex-col items-center bg-mono100`}
          >
            <p
              className={"text-xs font-bold leading-5 text-mono50 text-center"}
            >
              {getDate(data.date)}
            </p>
            <p
              className={
                "leading-4 font-normal text-[10px] text-mono50 text-center"
              }
            >
              {getDay(data.date)}
            </p>
          </div>
        </Popover>
      );
    } else {
      return (
        <div
          onClick={() => clickAttendance(data)}
          className={`px-2.5 py-1 rounded-[5px] w-10 flex flex-col items-center ${
            data.attendance == null
              ? `bg-mono100`
              : data.attendance.is_late == 1
              ? `bg-primary100`
              : data.attendance.is_late == 0
              ? `bg-primary75`
              : ``
          } ${
            data.date == moment().format("YYYY-MM-DD") ||
            attendanceActive == data.date
              ? `border border-blue-400`
              : ``
          } hover:cursor-pointer`}
        >
          <p
            className={`text-xs font-bold leading-5 ${
              data.attendance == null ? `text-mono50` : `text-white`
            } text-center`}
          >
            {getDate(data.date)}
          </p>
          <p
            className={`leading-4 font-normal text-[10px] ${
              data.attendance == null ? `text-mono50` : `text-white`
            }  text-center`}
          >
            {getDay(data.date)}
          </p>
        </div>
      );
    }
  };

  const onChangeDate = (date, dateString) => {
    setShowMonthPicker(false);
    if (moment(date).format("YYYY-MM") > moment().format("YYYY-MM")) {
      notification.info({
        message: `Belum Berlangsung`,
        duration: 3,
      });
    } else {
      let month = moment(date).format("MM");
      let year = moment(date).format("YYYY");
      setMonthActive(month);
      setYearActive(year);
      fetchDataAttendance(month, year);
    }
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
          <div className={"flex justify-between"}>
            <p className="text-mono30 leading-6 font-bold text-sm ">
              Data Kehadiran
            </p>
            <div className={"flex flex-col"}>
              <div
                onClick={() => setShowMonthPicker(!showMonthPicker)}
                className={"flex items-center hover:cursor-pointer"}
              >
                <p className={"text-mono50 text-xs font-bold leading-5"}>
                  {moment(monthActive).format("MMMM")}{" "}
                  {moment(yearActive).format("YYYY")}
                </p>
                {showMonthPicker ? (
                  <DownIconSvg size={20} color={"#808080"} />
                ) : (
                  <UpIconSvg size={20} color={"#808080"} />
                )}
              </div>
              <DatePicker
                picker="month"
                className={"custom-picker self-end mt-6"}
                open={showMonthPicker}
                onChange={onChangeDate}
              />
            </div>
          </div>

          <div className={"calendarslide"}>
            <Slider ref={slider} className="mt-4 mx-4" {...settings}>
              {dataMonth?.map((data) => renderDate(data))}
            </Slider>
          </div>

          <div
            className={
              "mt-4 p-4 border border-mono100 rounded-[4px] flex items-center"
            }
          >
            {dataAttendance.imageUrl == null ? (
              <div className={"p-6 bg-mono100 rounded-[4px] mr-4"}>
                <CameraIconSvg size={24} color={"#4D4D4D"} />
              </div>
            ) : (
              <img
                src={generateStaticAssetUrl(dataAttendance.imageUrl)}
                className={"mr-4"}
                height={87}
                width={87}
              />
            )}
            <div className={"flex flex-col w-1/2"}>
              {dataAttendance.attendanceUser == null ? (
                <div
                  className={"bg-onprogress py-0.5 px-2 rounded-[2px] w-[92px]"}
                >
                  <p className={"text-[10px] text-white font-bold leading-4"}>
                    Belum Check In
                  </p>
                </div>
              ) : (
                <div className={"flex gap-2.5"}>
                  {dataAttendance.attendanceUser.is_late == 0 ? (
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
                      {dataAttendance.attendanceUser.is_wfo == 1
                        ? "WFO"
                        : "WFH"}
                    </p>
                  </div>
                </div>
              )}
              <div className={"mt-3 flex flex-row gap-2 items-center"}>
                <TimelineIconSvg />
                <p className={"text-mono50 text-[10px] leading-4 font-bold "}>
                  {dataAttendance.checkinTIme
                    ? momentFormatDate(
                        dataAttendance.checkinTIme,
                        "-",
                        "D MMMM YYYY, H:mm"
                      )
                    : "-"}
                </p>
              </div>
              <div className={"mt-3 flex flex-row gap-2"}>
                <CheckboxIconSvg size={16} color={"#808080"} />
                <p className={"text-mono50 text-[10px] leading-4 font-bold "}>
                  {dataAttendance.jumlahAktifitas} Aktivitas terisi
                </p>
              </div>
            </div>
            {dataAttendance.attendanceUser != null && (
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
