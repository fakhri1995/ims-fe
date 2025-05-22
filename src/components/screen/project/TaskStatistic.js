import { UpOutlined } from "@ant-design/icons";
import { Collapse, DatePicker, Progress, Spin } from "antd";
import moment from "moment";
import { Doughnut, Line } from "react-chartjs-2";

import { permissionWarningNotification } from "../../../lib/helper";
import {
  CalendartimeIconSvg,
  ClipboardListIconSvg,
  UserIconSvg,
} from "../../icon";
import { H2 } from "../../typography";
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
const TaskStatistic = ({
  loadingDeadlineCount,
  dateState,
  dateFilter,
  loadingStatusCount,
  setDateFilter,
  taskTotal,
  setDateState,
  taskStatusCount,
  isAllowedToGetTaskDeadlineCount,
  dataTaskDeadline,
  staffCount,
  dataColorBar,
  loadingStaffCount,
}) => {
  return (
    <Collapse
      className="shadow-md rounded-md bg-white"
      bordered={false}
      ghost={true}
      expandIconPosition="right"
      expandIcon={({ isActive }) => <UpOutlined rotate={isActive ? 180 : 0} />}
    >
      <Collapse.Panel
        header={
          <div className="mig-heading--4 flex space-x-2 items-center">
            <ClipboardListIconSvg size={32} />
            <p>Statistik Task</p>
          </div>
        }
      >
        {loadingStatusCount || loadingDeadlineCount || loadingStaffCount ? (
          <div className="text-center">
            <Spin />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-3 px-2">
            {/* CARD STATUS TASK */}
            <div className="grid grid-cols-1 shadow-md rounded-md bg-white p-5 gap-6">
              <h4 className="mig-heading--4 ">Status Task</h4>
              {/* CHART STATUS TASK */}
              <div className="flex flex-col items-center">
                <div className="w-1/2 space-y-4">
                  <Doughnut
                    data={{
                      labels: taskStatusCount?.map((doc) => doc?.name),
                      datasets: [
                        {
                          data: taskStatusCount?.map(
                            (doc) => doc?.project_tasks_count
                          ),
                          backgroundColor: taskStatusCount?.map(
                            (doc, idx) => doc?.color
                          ),
                          borderColor: taskStatusCount?.map(
                            (doc, idx) => doc?.color
                          ),
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
                      maintainAspectRatio: true,
                      cutout: 50,
                      spacing: 10,
                    }}
                  />

                  <div className="text-center">
                    <h4 className="mig-heading--4 text-primary100">
                      {taskTotal}
                    </h4>
                    <p className="mig-caption--medium text-mono50">
                      Total Task
                    </p>
                  </div>
                </div>
              </div>

              {/* LEGEND STATUS TASK */}
              <div className="flex flex-wrap gap-4">
                {taskStatusCount?.map((status, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center space-x-5"
                  >
                    <div className="flex">
                      <div
                        className="w-1 mr-2"
                        style={{
                          backgroundColor: status?.color,
                        }}
                      ></div>
                      <p className="mig-caption--medium text-mono30 whitespace-nowrap">
                        {status?.name || "-"}
                      </p>
                    </div>
                    <p className="font-bold text-right text-mono30">
                      {status?.project_tasks_count || 0}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD DEADLINE TASK */}
            <div className="grid grid-cols-1 shadow-md rounded-md bg-white p-5 gap-6">
              <div className="flex items-center space-x-2 justify-between ">
                <h4 className="mig-heading--4 text-mono30">
                  Deadline Task Bulan Ini
                </h4>
                <div className="flex items-center text-right">
                  <div
                    className=" cursor-pointer"
                    onClick={() => {
                      if (!isAllowedToGetTaskDeadlineCount) {
                        permissionWarningNotification(
                          "Mendapatkan",
                          "Informasi Deadline Task"
                        );
                        return;
                      }
                      setDateFilter((prev) => !prev);
                    }}
                  >
                    <CalendartimeIconSvg color={`#4D4D4D`} size={24} />
                  </div>

                  <DatePicker.RangePicker
                    value={
                      moment(dateState.from).isValid()
                        ? [moment(dateState.from), moment(dateState.to)]
                        : [null, null]
                    }
                    allowEmpty
                    style={{
                      visibility: `hidden`,
                      width: `0`,
                      padding: `0`,
                    }}
                    className="datepickerStatus"
                    open={dateFilter}
                    onOpenChange={setDateFilter}
                    onChange={(dates, datestrings) => {
                      setDateFilter((prev) => !prev);
                      setDateState({
                        from: datestrings[0],
                        to: datestrings[1],
                      });
                    }}
                    renderExtraFooter={() => (
                      <div className=" flex items-center">
                        <p
                          className=" mb-0 text-primary100 hover:text-primary75 cursor-pointer"
                          onClick={() => {
                            setDateFilter((prev) => !prev);
                            setDateState({ from: "", to: "" });
                          }}
                        >
                          Reset
                        </p>
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* CHART DEADLINE TASK*/}
              {loadingDeadlineCount ? (
                <Spin />
              ) : (
                <div className="">
                  <div className="grid grid-cols-1 mb-6 h-60">
                    <Line
                      data={{
                        labels: [
                          `${
                            moment(
                              dataTaskDeadline?.date.first_start_date
                            ).isValid()
                              ? moment(dataTaskDeadline?.date.first_start_date)
                                  .locale("id")
                                  .format("Do MMM")
                              : ""
                          }-${
                            moment(
                              dataTaskDeadline?.date.first_end_date
                            ).isValid()
                              ? moment(dataTaskDeadline?.date.first_end_date)
                                  .locale("id")
                                  .format("Do MMM")
                              : ""
                          }`,
                          `${
                            moment(
                              dataTaskDeadline?.date.second_start_date
                            ).isValid()
                              ? moment(dataTaskDeadline?.date.second_start_date)
                                  .locale("id")
                                  .format("Do MMM")
                              : ""
                          }-${
                            moment(
                              dataTaskDeadline?.date.second_end_date
                            ).isValid()
                              ? moment(dataTaskDeadline?.date.second_end_date)
                                  .locale("id")
                                  .format("Do MMM")
                              : ""
                          }`,
                          `${
                            moment(
                              dataTaskDeadline?.date.third_start_date
                            ).isValid()
                              ? moment(dataTaskDeadline?.date.third_start_date)
                                  .locale("id")
                                  .format("Do MMM")
                              : ""
                          }-${
                            moment(
                              dataTaskDeadline?.date.third_end_date
                            ).isValid()
                              ? moment(dataTaskDeadline?.date.third_end_date)
                                  .locale("id")
                                  .format("Do MMM")
                              : ""
                          }`,
                        ],
                        datasets: [
                          {
                            data: [
                              dataTaskDeadline?.deadline.first_range_deadline,
                              dataTaskDeadline?.deadline.second_range_deadline,
                              dataTaskDeadline?.deadline.third_range_deadline,
                            ],
                            borderColor: "#35763B",
                            tension: 0.5,
                            fill: false,
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
                        scales: {
                          x: {
                            grid: {
                              display: false,
                            },
                          },
                          y: {
                            suggestedMin: 0,
                            ticks: {
                              callback: (value) => {
                                return Number.isInteger(value) ? value : "";
                              },
                            },
                            grid: {
                              display: false,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  {/* LEGEND DEADLINE TASK */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center space-x-5">
                      <div className="flex">
                        <div
                          className="w-1 mr-2"
                          style={{
                            backgroundColor: `${dataColorBar[0]}`,
                          }}
                        ></div>
                        <p className="mig-caption--medium text-mono30 whitespace-nowrap">
                          Berakhir hari ini
                        </p>
                      </div>
                      <p className="font-bold text-right text-mono30">
                        {dataTaskDeadline?.deadline.today_deadline}
                      </p>
                    </div>
                    <div className="flex justify-between items-center space-x-5">
                      <div className="flex">
                        <div
                          className="w-1 mr-2"
                          style={{
                            backgroundColor: `${dataColorBar[4]}`,
                          }}
                        ></div>
                        <p className="mig-caption--medium text-mono30 whitespace-nowrap">
                          Berakhir besok
                        </p>
                      </div>
                      <p className="font-bold text-right text-mono30">
                        {dataTaskDeadline?.deadline.tomorrow_deadline}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CARD STAFF */}
            <div className="grid grid-cols-1 gap-6 shadow-md rounded-md bg-white p-5">
              <h4 className="mig-heading--4 ">Staff</h4>

              {loadingStaffCount ? (
                <>
                  <Spin />
                </>
              ) : (
                <>
                  <div className="flex justify-center mb-3 h-40">
                    <Progress
                      type="dashboard"
                      percent={staffCount?.percentage}
                      strokeColor={"#35763B"}
                      strokeWidth={8}
                      width={170}
                      format={(percent) => (
                        <div className=" flex flex-col items-center">
                          <div>
                            <p className="font-bold text-3xl">{percent}%</p>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center">
                      <div className="mb-1 mr-1">
                        <UserIconSvg />
                      </div>
                      <div>
                        <H2>
                          {staffCount?.total_staff_without_task} /{" "}
                          {staffCount?.total_staff}
                        </H2>
                      </div>
                    </div>
                    <div>
                      <p className="mig-caption--medium text-mono50">
                        Staff tidak memiliki task
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center space-x-5 mb-2">
                      <div className="flex">
                        <div
                          className="w-1 mr-2"
                          style={{
                            backgroundColor: `${dataColorBar[0]}`,
                          }}
                        ></div>
                        <p className="mig-caption--medium text-mono30 whitespace-nowrap">
                          Total Staff
                        </p>
                      </div>
                      <p className="font-bold text-right text-mono30">
                        {staffCount?.total_staff}
                      </p>
                    </div>
                    <div className="flex justify-between items-center space-x-5 mb-2">
                      <div className="flex">
                        <div
                          className="w-1 mr-2"
                          style={{
                            backgroundColor: `${dataColorBar[4]}`,
                          }}
                        ></div>
                        <p className="mig-caption--medium text-mono30 whitespace-nowrap">
                          Staff tidak memiliki task
                        </p>
                      </div>
                      <p className="font-bold text-right text-mono30">
                        {staffCount?.total_staff_without_task}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </Collapse.Panel>
    </Collapse>
  );
};

export default TaskStatistic;
