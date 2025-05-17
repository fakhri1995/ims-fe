import { Progress, Spin } from "antd";

import { permissionWarningNotification } from "../../../../lib/helper";
import { UserIconSvg } from "../../../icon";
import { H1, H2, Label, Text } from "../../../typography";
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

const TaskStaff = ({
  isAllowedToGetTaskStaffList,
  setviewdetailstaff,
  loadingscdata,
  scdata,
}) => {
  return (
    <div className="md:col-span-5 lg:col-span-3 flex flex-col shadow-md rounded-md p-5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <H1>Staff</H1>
        <div className="flex items-center">
          <div
            className=" cursor-pointer"
            onClick={() => {
              if (!isAllowedToGetTaskStaffList) {
                permissionWarningNotification("Melihat", "Daftar Staff");
                return;
              }

              setviewdetailstaff(true);
            }}
          >
            <Label color="green" cursor="pointer">
              Lihat Semua
            </Label>
          </div>
        </div>
      </div>
      {loadingscdata ? (
        <>
          <Spin />
        </>
      ) : (
        <>
          <div className="flex justify-center mb-4 h-40">
            <Progress
              type="dashboard"
              percent={scdata.percentage}
              strokeColor={{
                from: `#65976a`,
                to: `#35763B`,
              }}
              strokeWidth={8}
              width={170}
              format={(percent) => (
                <div className=" flex flex-col items-center">
                  <div>
                    <p className=" mb-0 font-bold text-3xl">{percent}%</p>
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
                  {scdata.total_staff_without_task} / {scdata.total_staff}
                </H2>
              </div>
            </div>
            <div>
              <Label>Staff tidak memiliki task</Label>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <div className="flex">
                <Text>Total Staff</Text>
              </div>
              <div className="flex">
                <H2>{scdata.total_staff}</H2>
              </div>
            </div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex">
                <Text>Staff tidak memiliki task</Text>
              </div>
              <div className="flex">
                <H2>{scdata.total_staff_without_task}</H2>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskStaff;
