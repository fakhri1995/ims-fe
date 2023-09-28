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
import { Bar, Doughnut, Line } from "react-chartjs-2";

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
  });

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
                <p className=" mb-0 font-bold text-3xl">{scdata.total_hadir}</p>
              </div>
              {/* <div>
                                                        <p className=' mb-0 text-xs text-gray-500'>
                                                            Persentase staff tidak memiliki task
                                                        </p>
                                                    </div> */}
            </div>
          )}
        />
      </div>
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
    </div>
  );
}

export default KehadiranCard;
