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

function TaskCard({ initProps }) {
  // const [statustaskdata, setstatustaskdata] = useState([
  //     {
  //       "status": 1,
  //       "status_count": 76,
  //       "status_name": "Overdue",
  //       "percentage": 21.65
  //     },
  //     {
  //       "status": 2,
  //       "status_count": 194,
  //       "status_name": "Open",
  //       "percentage": 55.27
  //     },
  //     {
  //       "status": 3,
  //       "status_count": 1,
  //       "status_name": "On progress",
  //       "percentage": 0.28
  //     },
  //     {
  //       "status": 4,
  //       "status_count": 17,
  //       "status_name": "On hold",
  //       "percentage": 4.84
  //     },
  //     {
  //       "status": 5,
  //       "status_count": 33,
  //       "status_name": "Completed",
  //       "percentage": 9.4
  //     },
  //     {
  //       "status": 6,
  //       "status_count": 30,
  //       "status_name": "Closed",
  //       "percentage": 8.55
  //     }])
  const [statustaskdata, setstatustaskdata] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getProjectTasksCountClient `,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setstatustaskdata(res2.status);
        setTotal(res2.total);
        if (res2.success) {
          //   setscdata({
          //     total_hadir:res2.data.users_attendances_count,
          //     total_staff:res2.data.total_users,
          //     percentage:res2.data.users_attendances_count==0 ? 0 : (res2.data.users_attendances_count/res2.data.total_users)/100
          //   })
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

  return (
    <div className="md:col-span-5 lg:col-span-3 flex flex-col shadow-md rounded-md p-5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <H1>Status Tugas</H1>
      </div>
      <div className="flex justify-center mb-4">
        <Doughnut
          data={{
            labels: statustaskdata.map((doc) => doc.name),
            datasets: [
              {
                data: statustaskdata.map((doc) => doc.project_tasks_count),
                backgroundColor: [
                  "#fbbc74",
                  "#5ef71d",
                  "#77caf3",
                  "#c670e6",
                  "#f1f514",
                ],
                borderColor: [
                  "#fbbc74",
                  "#5ef71d",
                  "#77caf3",
                  "#c670e6",
                  "#f1f514",
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
            maintainAspectRatio: false,
            cutout: 55,
            spacing: 5,
          }}
        />
      </div>
      <div className=" mb-4 flex flex-col items-center">
        <div>
          <H2>{total}</H2>
        </div>
        <div>
          <Label>Total Tugas</Label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {statustaskdata.map((doc, idx) => {
          return (
            <div className="flex justify-between items-center mb-1">
              <div className="flex">
                <div
                  className={`w-1 mr-1`}
                  style={{ backgroundColor: doc.color }}
                ></div>
                <Text>{doc.name}</Text>
              </div>
              <div className="flex">
                <H2>{doc.project_tasks_count}</H2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TaskCard;
