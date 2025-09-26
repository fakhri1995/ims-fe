import { LoadingOutlined } from "@ant-design/icons";
import { Calendar, Modal, Radio, Select, Spin, notification } from "antd";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

// import enUS from 'antd/es/calendar/locale/en_US';
import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  CalendarEventIconSvg,
  CloseIconSvg,
  EditCvIconSvg,
  EditIconSvg,
  EditSquareIconSvg,
  LayoutGridSvg,
  PlusIconSvg,
  TrashIconSvg,
  TrashXIconSvg,
  UsersFilledIconSvg,
  WarningIconSvg,
} from "../../../components/icon";
import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

const WorkDayDetail = ({ initProps, dataProfile, sidemenu, workdayId }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const tok = initProps;
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState(null);
  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 1, "Detail Company");
  const [rawdata, setrawdata] = useState({
    id: "",
    name: "",
  });
  const [active, setActive] = useState({
    id: null,
    name: null,
  });
  const workdays = [
    { id: 1, name: "Engineer Workday" },
    { id: 2, name: "Marketing Workday" },
    { id: 3, name: "Technician Workday" },
  ];
  const [dataStatistics, setDataStatistics] = useState({
    total_employees: 0,
    total_workday_schedules: 0,
    total_workdays_in_month: 0,
  });

  const [dataWorkDay, setDataWorkDay] = useState([]);

  const [selectedIdWorkDays, setSelectedIdWorkDays] = useState(null);
  // const customLocale = {
  //   ...enUS, // Spread the default locale to keep other settings
  //   lang: {
  //     ...enUS.lang,
  //     shortMonths: [
  //       'January', 'February', 'March', 'April', '          May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  //     ],
  //   },
  // };
  const [holidaysArray, setHolidaysArray] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [defaultHeaders, setDefaultHeaders] = useState([]);
  const [workHours, setWorkHours] = useState([]);
  const dateFullCellRender = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const day = value.date();
    const isSunday = value.day() === 0;
    const holiday = holidaysArray.find(
      (item) => moment(item.tanggal).format("YYYY-MM-DD") === dateStr
    );

    let style = {
      borderTop: "1px solid #E6E6E6",
      boxSizing: "border-box",
      height: "100%",
      backgroundColor: isSunday ? "#F5851E19" : "inherit",
      color: isSunday ? "#4D4D4D" : "inherit",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      fontSize: 14,
      height: 85,
      marginRight: 8,
      paddingTop: 1,
    };

    if (holiday) {
      style.backgroundColor = holiday.is_cuti ? "#FFEBEE" : "#E3F2FD";
      style.color = "#4D4D4D";
    }

    return (
      <div style={style}>
        <div
          style={{
            fontWeight: "bold",
            marginBottom: 4,
            textAlign: "left",
            marginTop: 1,
          }}
        >
          {day}
        </div>
        {holiday && (
          <div className="px-1" style={{ fontSize: 11, textAlign: "center" }}>
            {holiday.keterangan}
          </div>
        )}
      </div>
    );
  };

  const cancelDelete = () => {
    setModalDelete(false);
  };
  const dayMap = {
    Sunday: "Su",
    Monday: "Mo",
    Tuesday: "Tu",
    Wednesday: "We",
    Thursday: "Th",
    Friday: "Fr",
    Saturday: "Sa",
  };
  const getWorkhourText = (day) => {
    const d = workHours.find((w) => w.day === day);
    if (!d) return "";
    if (d.range.length == 0) return "";
    return `${d.range[0]} - ${d.range[1]}`;
  };
  useEffect(() => {
    // ambil text default cuma sekali
    if (defaultHeaders.length === 0) {
      const ths = document.querySelectorAll(
        ".ant-picker-calendar .ant-picker-content th"
      );
      const headers = Array.from(ths).map((th) => th.innerText);
      setDefaultHeaders(headers);
    }
  }, [defaultHeaders]);

  useEffect(() => {
    if (defaultHeaders.length === 0) return;

    const ths = document.querySelectorAll(
      ".ant-picker-calendar .ant-picker-content th"
    );

    ths.forEach((th, idx) => {
      const dayName = Object.keys(dayMap)[idx]; // Sunday, Monday, dst
      const shortName = dayMap[dayName]; // Su, Mo, dst
      const workText = getWorkhourText(dayName);

      th.innerHTML = `
        <div style="display:flex; flex-direction:column;">
      <span>${shortName}</span>
      <span style="font-size: 12px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.45); /* sama kayak teks secondary Antd */
  font-weight: normal;">${workText}</span>
    </div>
        
      `;
    });
  }, [active, defaultHeaders]);
  const handleDeleteSchedule = () => {
    setLoadingDelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteWorkday`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(active?.id),
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setLoadingDelete(false);
          setModalDelete(false);
          notification["success"]({
            message: "Engineer Workday Schedule successfully deleted",
            duration: 3,
          });
          fetchDataDetail();
        } else if (!res2.success) {
          setLoadingDelete(false);
          setModalDelete(false);
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const res = await axios.get("https://dayoffapi.vercel.app/api");
        // console.log('res api ', res.data)
        setHolidaysArray(res.data); // data dari API
      } catch (err) {
        // setError(err.message || "Something went wrong");
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchDataDetail();
  }, []);
  const fetchDataDetail = async () => {
    try {
      // setLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getWorkdays?company_id=${workdayId}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          // console.log('res2 work day ', res2)
          setCompanyName(res2.data.company_name);
          let datatemp = res2.data.workdays;
          if (datatemp.length > 0) {
            // fetchDataDetailStatistic(datatemp[0].id)
            setDataWorkDay(datatemp);
            setActive({
              id: datatemp[0].id,
              name: datatemp[0].name,
            });
            setWorkHours(datatemp[0].schedule);
          }
          // let dataholidays = res2.data
          // setCutiBersamaOptions(dataholidays.filter(item => item.is_cuti === 1))
          // setLiburNasionalOptions(dataholidays.filter(item => item.is_cuti === 0))
        });
    } catch (err) {
      // setError(err.message || "Something went wrong");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (!active.id) return;
    // fetchDataDetail()
    getStatistic();
  }, [active]);

  const getStatistic = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getWorkdayStatistics?id=${
        active?.id
      }&year=2025&month=${moment().format("MM")}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        // console.log('res2 statistic ', res2)
        if (res2.success) {
          setDataStatistics({
            ...dataStatistics,
            total_employees: res2.data.total_employees,
            total_workday_schedules: res2.data.total_workday_schedules,
            total_workdays_in_month: res2.data.total_workdays_in_month,
          });
        }
        // let dataholidays = res2.data
        // setCutiBersamaOptions(dataholidays.filter(item => item.is_cuti === 1))
        // setLiburNasionalOptions(dataholidays.filter(item => item.is_cuti === 0))
      });
  };
  const breadcrumbValues = useMemo(() => {
    const pageBreadcrumbValue = [
      { name: "Company", hrefValue: "/company/clients" },
      { name: "Workday Schedule", hrefValue: "/company/workdayschedule" },
    ];

    if (companyName) {
      pageBreadcrumbValue.push({ name: companyName });
    }

    return pageBreadcrumbValue;
  }, [companyName]);
  const handleActive = (w) => {
    setActive({
      ...active,
      id: w.id,
      name: w.name,
    });
    if (w.schedule.length > 0) {
      setWorkHours(w.schedule);
    } else {
      setWorkHours([]);
    }
  };
  // const workHours = {
  //   0: "08:00-17:00", // Sunday
  //   1: "08:00-17:00", // Monday
  //   2: "08:00-17:00", // Tuesday
  //   3: "08:00-17:00",
  //   4: "09:00-18:00",
  //   5: "Libur",
  //   6: "Libur",
  // };
  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      pathArr={pathTitleArr}
      st={st}
      idpage={workdayId}
      fixedBreadcrumbValues={breadcrumbValues}
    >
      <div className="">
        <div className={"md:flex md:gap-5"}>
          <div
            className={
              "w-1/3 h-[108px] rounded-[10px] p-4 bg-white border border-neutrals70 shadow-desktopCard"
            }
          >
            <div className={"flex justify-between h-full"}>
              <div className={"flex flex-col justify-between"}>
                <h4
                  className={"text-[#4D4D4D] text-lg/6 font-inter font-bold "}
                >
                  {dataStatistics.total_workdays_in_month}
                </h4>
                <div className={"flex flex-col"}>
                  <p
                    className={"text-[#4D4D4D] text-xs/5 font-bold font-inter"}
                  >
                    Total Work Days
                  </p>
                  <p className={"text-[#4D4D4D] text-[10px]/4 font-inter"}>
                    This month
                  </p>
                </div>
              </div>
              <div>
                <CalendarEventIconSvg size={24} color={"#35763B"} />
              </div>
            </div>
          </div>
          <div
            className={
              "w-1/3 h-[108px] rounded-[10px] p-4 bg-white border border-neutrals70 shadow-desktopCard"
            }
          >
            <div className={"flex justify-between h-full"}>
              <div className={"flex flex-col justify-between"}>
                <h4
                  className={"text-[#4D4D4D] text-lg/6 font-inter font-bold "}
                >
                  {dataStatistics.total_employees}
                </h4>
                <div className={"flex flex-col"}>
                  <p
                    className={"text-[#4D4D4D] text-xs/5 font-bold font-inter"}
                  >
                    Total Employees
                  </p>
                  <p className={"text-[#4D4D4D] text-[10px]/4 font-inter"}>
                    for this company
                  </p>
                </div>
              </div>
              <div>
                <UsersFilledIconSvg size={24} color={"#00589F"} />
              </div>
            </div>
          </div>
          <div
            className={
              "w-1/3 h-[108px] rounded-[10px] p-4 bg-white border border-neutrals70 shadow-desktopCard"
            }
          >
            <div className={"flex justify-between h-full"}>
              <div className={"flex flex-col justify-between"}>
                <h4
                  className={"text-[#4D4D4D] text-lg/6 font-inter font-bold "}
                >
                  {dataStatistics.total_workday_schedules}
                </h4>
                <div className={"flex flex-col"}>
                  <p
                    className={"text-[#4D4D4D] text-xs/5 font-bold font-inter"}
                  >
                    Total Workday Schedule
                  </p>
                  <p className={"text-[#4D4D4D] text-[10px]/4 font-inter"}>
                    for this company
                  </p>
                </div>
              </div>
              <div>
                <LayoutGridSvg size={24} color={"#800080"} />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 flex flex-col rounded-[10px] pb-4 border border-neutrals70 shadow-desktopCard bg-white mt-5">
          <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between px-4 pt-4 pb-3 ">
            <p className="text-[14px] leading-6 text-mono30 font-bold mb-2 md:mb-4">
              {companyName} Workday Calendar
            </p>
          </div>
          <div className={"flex items-center gap-3 px-4 pb-4 border-b"}>
            {dataWorkDay.map((w) => (
              <div
                key={w.id}
                onClick={() => handleActive(w)}
                className={`flex items-center gap-1 hover:cursor-pointer h-8 py-1 px-4 rounded-[48px] ${
                  active.id === w.id
                    ? "bg-[#35763B]"
                    : " border border-[#808080]"
                }`}
              >
                <p
                  className={`${
                    active.id === w.id ? "text-white" : "text-[#808080]"
                  }  font-inter text-sm/6`}
                >
                  {w.name}
                </p>
                {active.id === w.id && (
                  <EditSquareIconSvg size={18} color={"white"} />
                )}
              </div>
            ))}
            <Link href={`/company/workdayschedule/create`}>
              <div
                className={
                  "h-8 w-8 rounded-[48px] bg-[#35763B] flex justify-center items-center"
                }
              >
                <PlusIconSvg size={20} color={"white"} />
              </div>
            </Link>
            <div className="flex-1" />
            <div
              onClick={() => setModalDelete(true)}
              className={
                "hover:cursor-pointer py-2 px-4 border border-[#BF4A40] rounded-[5px] flex gap-1.5"
              }
            >
              <TrashXIconSvg size={16} color={"#BF4A40"} />
              <p className={"text-[#BF4A40] text-sm/4 font-roboto"}>
                Delete Schedule
              </p>
            </div>
          </div>
          <div className={"px-4"}>
            <Calendar
              // locale={customLocale}
              headerRender={({ value, type, onChange, onTypeChange }) => {
                const monthOptions = moment.months().map((month, index) => ({
                  label: month,
                  value: month,
                }));

                return (
                  <div className="flex justify-between items-center mb-4 mt-4">
                    {/* Kiri: kontrol default */}
                    <div className="flex gap-2 items-center">
                      <Select
                        disabled
                        value={String(value.year())}
                        onChange={(newYear) => {
                          const now = value.clone().year(newYear);
                          onChange(now);
                        }}
                        style={{ width: 137 }}
                      >
                        {Array.from({ length: 10 }).map((_, i) => (
                          <Select.Option key={i} value={2020 + i}>
                            {2020 + i}
                          </Select.Option>
                        ))}
                      </Select>

                      <Select
                        value={value.format("MMMM")}
                        onChange={(newMonthName) => {
                          // cari index bulan dari namanya
                          const newMonthIndex = moment
                            .months()
                            .indexOf(newMonthName);
                          const now = value.clone().month(newMonthIndex);
                          onChange(now);
                        }}
                        style={{ width: 137 }}
                        options={monthOptions}
                      />

                      {/* </Select> */}

                      <Radio.Group
                        value={type}
                        onChange={(e) => onTypeChange(e.target.value)}
                      >
                        <Radio.Button value="month">Month</Radio.Button>
                        <Radio.Button value="year">Year</Radio.Button>
                      </Radio.Group>
                    </div>

                    {/* Kanan: Legend custom */}
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2.5">
                        <span className="w-3 h-3 bg-[#00589F] inline-block rounded-sm"></span>
                        <span className="text-xs/5 font-medium font-inter text-[#4D4D4D]">
                          Libur Nasional
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="w-3 h-3 bg-[#F5851E] inline-block rounded-sm"></span>
                        <span className="text-xs/5 font-medium font-inter text-[#4D4D4D]">
                          Cuti Bersama
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="w-3 h-3 bg-[#BF4A40] inline-block rounded-sm"></span>
                        <span className="text-xs/5 font-medium font-inter text-[#4D4D4D]">
                          Libur
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
              fullscreen={true}
              // headerRender={headerRender}
              dateFullCellRender={dateFullCellRender}
            />
          </div>
        </div>
        <Modal
          closeIcon={<CloseIconSvg size={10} color={"#808080"} />}
          title={
            <div className={"flex gap-2"}>
              <WarningIconSvg />
              <p
                className={
                  "font-medium text-sm leading-6 text-[#4D4D4D] font-inter"
                }
              >
                Delete Workday Schedule?
              </p>
            </div>
          }
          open={modalDelete}
          onCancel={() => {
            // setmodaldelete(false);
            cancelDelete();
          }}
          footer={
            <div className={"flex gap-4 justify-end"}>
              <div
                onClick={() => cancelDelete()}
                className={
                  "bg-white border border-solid border-[#808080] py-2 px-4 rounded-md hover:cursor-pointer"
                }
              >
                <p
                  className={
                    "text-sm leading-4 text-[#808080] font-medium font-roboto"
                  }
                >
                  Cancel
                </p>
              </div>
              <div
                onClick={() => handleDeleteSchedule()}
                className={
                  "bg-[#BF4A40] flex items-center gap-1.5 py-2 px-4 rounded-md hover:cursor-pointer"
                }
              >
                {loadingDelete ? (
                  <Spin
                    spinning={loadingDelete}
                    indicator={<LoadingOutlined />}
                    size={"default"}
                  />
                ) : (
                  <TrashIconSvg color={"white"} size={16} />
                )}
                <p className="text-white text-sm leading-4 font-medium font-roboto">
                  Delete
                </p>
              </div>
            </div>
          }
          // onOk={handleDelete}

          maskClosable={true}
          style={{ top: `3rem` }}
          width={440}
          destroyOnClose={true}
        >
          <p className={"text-[#4D4D4D] "}>
            Are you sure you want to delete workday schedule for{" "}
            <span className={"font-bold"}>{active?.name}</span>?
          </p>
        </Modal>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const workdayId = params.workdayId;
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
      sidemenu: "workdayschedule",
      workdayId,
    },
  };
}

export default WorkDayDetail;
