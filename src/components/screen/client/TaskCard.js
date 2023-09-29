import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import { H1, H2, Label, Text } from "../../../components/typography";
import { useAccessControl } from "../../../contexts/access-control";
import { PROJECT_TASKS_COUNT_CLIENT_GET } from "../../../lib/features";
import { permissionWarningNotification } from "../../../lib/helper";
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
  const { hasPermission, hasRole } = useAccessControl();
  const [statustaskdata, setstatustaskdata] = useState([]);
  const [total, setTotal] = useState(0);
  const isAllowedToGetProjectTaskCountCLinet = hasPermission(
    PROJECT_TASKS_COUNT_CLIENT_GET
  );
  useEffect(() => {
    if (!isAllowedToGetProjectTaskCountCLinet) {
      permissionWarningNotification("Mendapatkan", "Data Jumlah Project");
      return;
    }
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
