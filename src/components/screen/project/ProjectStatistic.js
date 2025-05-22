import { UpOutlined } from "@ant-design/icons";
import { Collapse, DatePicker, Spin } from "antd";
import moment from "moment";
import { Doughnut, Line } from "react-chartjs-2";

import { permissionWarningNotification } from "../../../lib/helper";
import { CalendartimeIconSvg, ClipboardListIconSvg } from "../../icon";
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
const ProjectStatistic = ({
  loadingDeadlineCount,
  dateState,
  dateFilter,
  loadingStatusCount,
  setDateFilter,
  projectStatusCount,
  projectTotalCount,
  isAllowedToGetProjectDeadlineCount,
  setDateState,
  dataProjectDeadline,
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
            <p>Statistik Proyek</p>
          </div>
        }
      >
        {loadingDeadlineCount || loadingStatusCount ? (
          <div className="text-center">
            <Spin />
          </div>
        ) : (
          <div className="grid grid-cols-6 xl:grid-cols-12 gap-6 py-3 px-2">
            {/* CARD STATUS PROYEK */}
            <div className="col-span-6 md:col-span-4 xl:col-span-6">
              <div className="grid grid-cols-1 shadow-md rounded-md bg-white p-5">
                <h4 className="mig-heading--4 mb-4">Status Proyek</h4>
                <div className="w-9/12 xl:w-7/12 flex mx-auto">
                  <Doughnut
                    data={{
                      labels: projectStatusCount?.map((doc) => doc?.name),
                      datasets: [
                        {
                          data: projectStatusCount?.map(
                            (doc) => doc?.projects_count
                          ),
                          backgroundColor: projectStatusCount?.map(
                            (doc, idx) => doc?.color
                          ),
                          borderColor: projectStatusCount?.map(
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
                      cutout: 60,
                      spacing: 10,
                    }}
                  />
                </div>
                <div className="text-md flex justify-between items-center mt-4">
                  <p className="text-mono30 font-semibold">Total Proyek Saya</p>
                  <p className="text-primary100 font-bold">
                    {projectTotalCount}
                  </p>
                </div>
              </div>
            </div>

            {/* CARD DEADLINE PROYEK BULAN INI */}
            <div className="grid order-last xl:order-none col-span-6 xl:col-span-6 shadow-md rounded-md p-5 bg-white">
              <div className="flex items-center space-x-2 justify-between mb-4">
                <h4 className="mig-heading--4 text-mono30">
                  Deadline Proyek Bulan Ini
                </h4>
                <div className="flex items-center text-right">
                  <div
                    className=" cursor-pointer"
                    onClick={() => {
                      if (!isAllowedToGetProjectDeadlineCount) {
                        permissionWarningNotification(
                          "Mendapatkan",
                          "Informasi Deadline Proyek"
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
                    picker="month"
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

              {/* CHART */}
              {loadingDeadlineCount ? (
                <Spin />
              ) : (
                <div>
                  <div className="grid grid-cols-1 mb-4">
                    <Line
                      data={{
                        labels: dataProjectDeadline?.map(
                          (deadline) => deadline?.year_month_str
                        ),
                        datasets: [
                          {
                            data: dataProjectDeadline?.map(
                              (deadline) => deadline?.total
                            ),
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
                              display: true,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center space-x-2 mb-1 ">
                    <h5 className="mig-caption--medium text-mono30">
                      Proyek yang berakhir bulan ini
                    </h5>
                    <h5 className="font-bold text-mono30 text-right">
                      {dataProjectDeadline?.find((project) => {
                        const today = new Date();
                        const todayMonth = today.getMonth(); // today's month in number, start from 0
                        return project.month === todayMonth + 1;
                      })?.total ?? "0"}
                    </h5>
                  </div>
                </div>
              )}
            </div>

            {/* LEGEND STATUS PROYEK */}
            <div className="flex flex-wrap col-span-6 md:col-span-2 xl:col-span-12 gap-4 xl:justify-between">
              {projectStatusCount?.map((status, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center space-x-5"
                >
                  <div className="flex">
                    <div
                      className="w-1 mr-2"
                      style={{
                        backgroundColor: `${status?.color}`,
                      }}
                    ></div>
                    <p className="mig-caption--medium text-mono30 whitespace-nowrap">
                      {status.name || "-"}
                    </p>
                  </div>
                  <p className="font-bold text-right text-mono30">
                    {status.projects_count}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Collapse.Panel>
    </Collapse>
  );
};

export default ProjectStatistic;
