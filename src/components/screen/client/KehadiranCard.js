import { CloseCircleFilled } from "@ant-design/icons";
import {
  Checkbox,
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
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

import ButtonSys from "../../../components/button";
import {
  AlerttriangleIconSvg,
  DownIconSvg,
  NewsIconSvg,
  PakaiSewaIconSvg,
  SearchIconSvg,
  UpIconSvg,
  UserCheckIconSvg,
  UserIconSvg,
} from "../../../components/icon";
import { H1, H2, Label, Text } from "../../../components/typography";
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

function KehadiranCard({ initProps }) {
  const [scdata, setscdata] = useState({
    total_hadir: 125,
    total_staff: 150,
    percentage: 0,
    absent_users_count: 0,
    late_count: 0,
    on_time_count: 0,
    wfo_count: 0,
    wfh_count: 0,
  });
  const [buttonActive, setButtonActive] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getAttendancesClient`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setscdata({
            total_hadir: res2.data.users_attendances_count,
            total_staff: res2.data.total_users,
            percentage:
              res2.data.users_attendances_count == 0
                ? 0
                : res2.data.users_attendances_count /
                  res2.data.total_users /
                  100,

            late_count: res2.data.late_count,
            absent_users_count: res2.data.absent_users_count,
            on_time_count: res2.data.on_time_count,
            wfo_count: res2.data.wfo_count,
            wfh_count: res2.data.wfh_count,
          });
        } else {
          // notification.error({
          //   message: `${res2.message}`,
          //   duration: 3,
          // });
        }
      })
      .catch((err) => {
        // console.log('error kehadiran ',err)
        // notification.error({
        //   message: `${err.response}`,
        //   duration: 3,
        // });
      })
      .finally(() => {});
  };

  return (
    <div className="md:col-span-5 lg:col-span-3 flex flex-col shadow-md rounded-md p-5 bg-white">
      <div className="mb-4">
        <H1>Kehadiran</H1>
      </div>
      <div className="flex justify-center mb-4 h-40">
        {buttonActive == null ? (
          <Progress
            type="dashboard"
            percent={(scdata.total_hadir / scdata.total_staff) * 100}
            strokeColor={{
              from: `#65976a`,
              to: `#35763B`,
            }}
            strokeWidth={8}
            width={170}
            format={() => (
              <div className=" flex flex-col items-center">
                <div>
                  <p className=" mb-0 font-bold text-3xl">
                    {scdata.total_hadir}
                  </p>
                </div>
                {/* <div>
                                                        <p className=' mb-0 text-xs text-gray-500'>
                                                            Persentase staff tidak memiliki task
                                                        </p>
                                                    </div> */}
              </div>
            )}
          />
        ) : (
          <div className="w-40 h-40" id="chart">
            <Pie
              data={{
                datasets: [
                  {
                    label: ["Hadir", "Absen"],
                    data:
                      buttonActive == "Kehadiran"
                        ? [scdata.total_hadir, scdata.absent_users_count]
                        : buttonActive == "Tepat Waktu"
                        ? [scdata.on_time_count, scdata.late_count]
                        : [scdata.wfo_count, scdata.wfh_count],
                    backgroundColor: [
                      "#35763B",
                      buttonActive != "WFH" ? "#BF4A40" : "#00589F",
                    ],
                    borderColor: [
                      "#35763B",
                      buttonActive != "WFH" ? "#BF4A40" : "#00589F",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                title: {
                  display: false,
                },
                legend: {
                  display: false,
                },
              }}
            />
          </div>
        )}
      </div>
      {buttonActive == null ? (
        <div className=" mb-4 flex flex-col items-center">
          <div className=" flex items-center">
            <div className=" mb-1 mr-1">
              <UserIconSvg />
            </div>
            <div>
              <H2>
                {scdata.total_hadir} / {scdata.total_staff}
              </H2>
            </div>
          </div>
          <div>
            <Label>Karyawan Hadir</Label>
          </div>
        </div>
      ) : (
        <div className=" mb-4 flex flex-col items-center">
          <div className={"flex flex-row items-center gap-1"}>
            <div className={"h-4 w-4 rounded bg-primary100"}></div>
            {console.log("button active ", buttonActive)}
            <p className={"text-[10px] font-normal leading-4 text-mono50"}>
              {buttonActive == "Kehadiran"
                ? scdata.total_hadir
                : buttonActive == "Tepat Waktu"
                ? scdata.on_time_count
                : scdata.wfo_count}{" "}
              {buttonActive == "Kehadiran"
                ? " Karyawan Hadir"
                : buttonActive == "Tepat Waktu"
                ? " Tepat Waktu"
                : "Karyawan WFO"}
            </p>
          </div>
          <div className={"mt-1 flex flex-row items-center gap-1"}>
            <div className={"h-4 w-4 rounded bg-warning"}></div>
            <p>
              <p className={"text-[10px] font-normal leading-4 text-mono50"}>
                {buttonActive == "Kehadiran"
                  ? scdata.absent_users_count
                  : buttonActive == "Tepat Waktu"
                  ? scdata.late_count
                  : scdata.wfh_count}{" "}
                {buttonActive == "Kehadiran"
                  ? " Karyawan Absen"
                  : buttonActive == "Tepat Waktu"
                  ? " Terlambat"
                  : "Karyawan WFH"}
              </p>
            </p>
          </div>
        </div>
      )}
      <div className={"mt-[39px] gap-2 flex flex-wrap"}>
        {buttonActive == "Kehadiran" ? (
          <div
            className={
              "px-4 py-1.5 rounded-[48px]  hover:cursor-pointer bg-bgprimary25persen"
            }
            onClick={() => setButtonActive(null)}
          >
            <div className={"flex flex-row gap-1"}>
              <p className={"text-[10px] font-bold leading-4 text-primary100"}>
                Status Kehadiran
              </p>
              <CloseCircleFilled
                style={{ color: "#35763B", fontSize: "16px" }}
              />
            </div>
          </div>
        ) : (
          <div
            className={
              "px-4 py-1.5 rounded-[48px] border border-mono50 hover:cursor-pointer"
            }
            onClick={() => setButtonActive("Kehadiran")}
          >
            <p className={"text-[10px] font-normal leading-4 text-mono50"}>
              Status Kehadiran
            </p>
          </div>
        )}
        {buttonActive == "Tepat Waktu" ? (
          <div
            className={
              "px-4 py-1.5 rounded-[48px]  hover:cursor-pointer bg-bgprimary25persen"
            }
            onClick={() => setButtonActive(null)}
          >
            <div className={"flex flex-row gap-1"}>
              <p className={"text-[10px] font-normal leading-4 text-mono50"}>
                Tepat Waktu - Terlambat
              </p>
              <CloseCircleFilled
                style={{ color: "#35763B", fontSize: "16px" }}
              />
            </div>
          </div>
        ) : (
          <div
            className={
              "px-4 py-1.5 rounded-[48px] border border-mono50 hover:cursor-pointer"
            }
            onClick={() => setButtonActive("Tepat Waktu")}
          >
            <p className={"text-[10px] font-normal leading-4 text-mono50"}>
              Tepat Waktu - Terlambat
            </p>
          </div>
        )}
        {buttonActive == "WFH" ? (
          <div
            className={
              "px-4 py-1.5 rounded-[48px]  hover:cursor-pointer bg-bgprimary25persen"
            }
            onClick={() => setButtonActive(null)}
          >
            <div className={"flex flex-row gap-1"}>
              <p className={"text-[10px] font-normal leading-4 text-mono50"}>
                WFO - WFH
              </p>
              <CloseCircleFilled
                style={{ color: "#35763B", fontSize: "16px" }}
              />
            </div>
          </div>
        ) : (
          <div
            className={
              "px-4 py-1.5 rounded-[48px] border border-mono50 hover:cursor-pointer"
            }
            onClick={() => setButtonActive("WFH")}
          >
            <p className={"text-[10px] font-normal leading-4 text-mono50"}>
              WFO - WFH
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default KehadiranCard;
