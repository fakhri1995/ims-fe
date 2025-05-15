import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Empty,
  Input,
  Select,
  Spin,
  Tree,
  notification,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import { permissionWarningNotification } from "../../../../lib/helper";
import {
  AlerttriangleIconSvg,
  CalendartimeIconSvg,
  CircleXIconSvg,
  LocationIconSvg,
  MappinIconSvg,
  SearchIconSvg,
} from "../../../icon";
import { H1, H2, Text } from "../../../typography";
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

const TaskDeadline = ({
  isAllowedToGetTaskDeadlineList,
  canOpenLocationTreeDropdown,
  setdtloctoggle,
  dtloctoggle,
  setdtlocstate,
  setdtdata,
  setloadingdtdata,
  dtdatefilter,
  setdtdatefilter,
  dtdatestate,
  dtlocstate,
  dtloc,
  setdtdatestate,
  loadingdtdata,
  dtdata,
  initProps,
}) => {
  return (
    <div className="md:col-span-5 lg:col-span-3 flex flex-col shadow-md rounded-md p-5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <H1>Deadline Task</H1>
        <div className="flex items-center">
          <div className=" dropdown">
            <div
              tabIndex={`2`}
              className="mx-1 cursor-pointer"
              onClick={() => {
                if (!isAllowedToGetTaskDeadlineList) {
                  permissionWarningNotification(
                    "Mendapatkan",
                    "Informasi Deadline Task"
                  );
                  return;
                }

                if (canOpenLocationTreeDropdown()) {
                  setdtloctoggle((prev) => !prev);
                }
              }}
            >
              <MappinIconSvg color={`#000000`} size={25} />
            </div>
            {dtloctoggle ? (
              <div
                tabIndex={`2`}
                className="p-5 shadow menu dropdown-content bg-white rounded-box w-72 flex flex-col max-h-72 overflow-scroll"
              >
                <div
                  className=" flex justify-end mb-1 cursor-pointer"
                  onClick={() => {
                    setdtloctoggle(false);
                    setloadingdtdata(true);
                    fetch(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getDeadlineTasks?location=`,
                      {
                        method: `GET`,
                        headers: {
                          Authorization: JSON.parse(initProps),
                        },
                      }
                    )
                      .then((res) => res.json())
                      .then((res2) => {
                        setdtlocstate("");
                        setdtdata(res2.data);
                        setloadingdtdata(false);
                      });
                  }}
                >
                  <p className=" text-xs text-gray-500 mr-1">Reset</p>
                  <CircleXIconSvg size={15} color={`#BF4A40`} />
                </div>
                <Tree
                  className="treeTaskStatusList"
                  defaultExpandAll
                  treeData={dtloc}
                  switcherIcon={<DownOutlined />}
                  showIcon
                  blockNode={true}
                  titleRender={(nodeData) => (
                    <div
                      className="flex items-start w-full py-3 rounded-md px-2"
                      onClick={() => {
                        setdtloctoggle(false);
                        setloadingdtdata(true);
                        fetch(
                          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getDeadlineTasks?location=${nodeData.key}`,
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
                              setdtlocstate(nodeData.key);
                              setdtdata(res2.data);
                              setloadingdtdata(false);
                            } else {
                              notification["error"]({
                                message: res2.message,
                                duration: 3,
                              });
                              setloadingdtdata(false);
                            }
                          });
                      }}
                    >
                      <div className="mr-3 flex items-start">
                        <LocationIconSvg
                          id={`icon${nodeData.key}`}
                          size={15}
                          color={`#808080`}
                        />
                      </div>
                      <div className="mr-3">
                        <p
                          className=" text-gray-500 mb-0"
                          id={`text${nodeData.key}`}
                        >
                          {nodeData.title}
                        </p>
                      </div>
                    </div>
                  )}
                />
              </div>
            ) : null}
          </div>
          <div
            className="mx-1 cursor-pointer"
            onClick={() => {
              if (!isAllowedToGetTaskDeadlineList) {
                permissionWarningNotification(
                  "Mendapatkan",
                  "Informasi Deadline Task"
                );
                return;
              }
              setdtdatefilter((prev) => !prev);
            }}
          >
            <CalendartimeIconSvg color={`#000000`} size={25} />
          </div>
          <DatePicker.RangePicker
            value={
              dtdatestate.from === ""
                ? ["", ""]
                : [moment(dtdatestate.from), moment(dtdatestate.to)]
            }
            allowEmpty
            style={{ visibility: `hidden`, width: `0`, padding: `0` }}
            className="datepickerStatus"
            open={dtdatefilter}
            onChange={(dates, datestrings) => {
              setdtdatefilter((prev) => !prev);
              setloadingdtdata(true);
              fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/getDeadlineTasks?from=${datestrings[0]}&to=${datestrings[1]}&location=${dtlocstate}`,
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
                    setdtdatestate({
                      from: datestrings[0],
                      to: datestrings[1],
                    });
                    setdtdata(res2.data);
                    setloadingdtdata(false);
                  } else {
                    notification["error"]({
                      message: res2.message,
                      duration: 3,
                    });
                    setloadingdtdata(false);
                  }
                });
            }}
            renderExtraFooter={() => (
              <div className=" flex items-center">
                <p
                  className=" mb-0 text-primary100 hover:text-primary75 cursor-pointer"
                  onClick={() => {
                    setdtdatefilter((prev) => !prev);
                    setloadingdtdata(true);
                    fetch(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getDeadlineTasks?from=&to=&location=${dtlocstate}`,
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
                          setdtdatestate({ from: "", to: "" });
                          setdtdata(res2.data);
                          setloadingdtdata(false);
                        } else {
                          notification["error"]({
                            message: res2.message,
                            duration: 3,
                          });
                          setloadingdtdata(false);
                        }
                      });
                  }}
                >
                  Reset
                </p>
              </div>
            )}
          />
        </div>
      </div>
      {loadingdtdata ? (
        <>
          <Spin />
        </>
      ) : (
        <>
          <div className="flex justify-center mb-4 h-56">
            <Line
              data={{
                labels: [
                  `${moment(dtdata.date.first_start_date)
                    .locale("id")
                    .format("Do MMM")}-${moment(dtdata.date.first_end_date)
                    .locale("id")
                    .format("Do MMM")}`,
                  `${moment(dtdata.date.second_start_date)
                    .locale("id")
                    .format("Do MMM")}-${moment(dtdata.date.second_end_date)
                    .locale("id")
                    .format("Do MMM")}`,
                  `${moment(dtdata.date.third_start_date)
                    .locale("id")
                    .format("Do MMM")}-${moment(dtdata.date.third_end_date)
                    .locale("id")
                    .format("Do MMM")}`,
                ],
                datasets: [
                  {
                    data: [
                      dtdata.deadline.first_range_deadline,
                      dtdata.deadline.second_range_deadline,
                      dtdata.deadline.third_range_deadline,
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
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <div className="flex">
                <Text>Berakhir hari ini</Text>
              </div>
              <div className="flex">
                <H2>{dtdata.deadline.today_deadline}</H2>
              </div>
            </div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex">
                <Text>Berakhir besok</Text>
              </div>
              <div className="flex">
                <H2>{dtdata.deadline.tomorrow_deadline}</H2>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskDeadline;
