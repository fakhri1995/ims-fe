import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { DatePicker, Empty, Input, Select, Spin, Tree } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";

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

const MyTaskStatus = ({
  isAllowedToGetTaskStatuses,
  canOpenLocationTreeDropdown,
  setstatusloctoggle,
  statusloctoggle,
  setloadingstatustaskdata,
  setstatustaskdata,
  setstatustasklocstate,
  statustaskloc,
  setstatustaskdatefilter,
  statustaskdatestate,
  statustaskdatefilter,
  loadingstatustaskdata,
  setstatustaskdatestate,
  statustaskdata,
  statustasklocstate,
  initProps,
}) => {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-col shadow-md rounded-md bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <H1>Status Task</H1>
        <div className="flex items-center">
          <div className=" dropdown">
            <div
              tabIndex={`0`}
              className="mx-1 cursor-pointer"
              onClick={() => {
                if (!isAllowedToGetTaskStatuses) {
                  permissionWarningNotification(
                    "Mendapatkan",
                    "Informasi Status Task"
                  );
                  return;
                }

                if (canOpenLocationTreeDropdown()) {
                  setstatusloctoggle((prev) => !prev);
                }
              }}
            >
              <MappinIconSvg color={`#000000`} size={25} />
            </div>
            {statusloctoggle ? (
              <div
                tabIndex={`0`}
                className="p-5 shadow menu dropdown-content bg-white rounded-box w-72 flex flex-col max-h-72 overflow-scroll"
              >
                <div
                  className=" flex justify-end mb-1 cursor-pointer"
                  onClick={() => {
                    setstatusloctoggle(false);
                    setloadingstatustaskdata(true);
                    fetch(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTaskStatusList?from=${statustaskdatestate.from}&to=${statustaskdatestate.to}&location=`,
                      {
                        method: `GET`,
                        headers: {
                          Authorization: JSON.parse(initProps),
                        },
                      }
                    )
                      .then((res) => res.json())
                      .then((res2) => {
                        setstatustasklocstate("");
                        setstatustaskdata(res2.data.status_list);
                        setloadingstatustaskdata(false);
                      });
                  }}
                >
                  <p className=" text-xs text-gray-500 mr-1">Reset</p>
                  <CircleXIconSvg size={15} color={`#BF4A40`} />
                </div>
                <Tree
                  className="treeTaskStatusList"
                  defaultExpandAll
                  treeData={statustaskloc}
                  switcherIcon={<DownOutlined />}
                  showIcon
                  blockNode={true}
                  titleRender={(nodeData) => (
                    <div
                      className="flex items-start w-full py-3 rounded-md px-2"
                      onClick={() => {
                        setstatusloctoggle(false);
                        setloadingstatustaskdata(true);
                        fetch(
                          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTaskStatusList?from=${statustaskdatestate.from}&to=${statustaskdatestate.to}&location=${nodeData.key}`,
                          {
                            method: `GET`,
                            headers: {
                              Authorization: JSON.parse(initProps),
                            },
                          }
                        )
                          .then((res) => res.json())
                          .then((res2) => {
                            setstatustasklocstate(nodeData.key);
                            setstatustaskdata(res2.data.status_list);
                            setloadingstatustaskdata(false);
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
              if (!isAllowedToGetTaskStatuses) {
                permissionWarningNotification(
                  "Mendapatkan",
                  "Informasi Status Task"
                );
                return;
              }

              setstatustaskdatefilter((prev) => !prev);
            }}
          >
            <CalendartimeIconSvg color={`#000000`} size={25} />
          </div>
          <DatePicker.RangePicker
            value={
              statustaskdatestate.from === ""
                ? ["", ""]
                : [
                    moment(statustaskdatestate.from),
                    moment(statustaskdatestate.to),
                  ]
            }
            allowEmpty
            style={{ visibility: `hidden`, width: `0`, padding: `0` }}
            className="datepickerStatus"
            open={statustaskdatefilter}
            onChange={(dates, datestrings) => {
              setstatustaskdatefilter((prev) => !prev);
              setloadingstatustaskdata(true);
              fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTaskStatusList?from=${datestrings[0]}&to=${datestrings[1]}&location=${statustasklocstate}`,
                {
                  method: `GET`,
                  headers: {
                    Authorization: JSON.parse(initProps),
                  },
                }
              )
                .then((res) => res.json())
                .then((res2) => {
                  setstatustaskdatestate({
                    from: datestrings[0],
                    to: datestrings[1],
                  });
                  setstatustaskdata(res2.data.status_list);
                  setloadingstatustaskdata(false);
                });
            }}
            renderExtraFooter={() => (
              <div className=" flex items-center">
                <p
                  className=" mb-0 text-primary100 hover:text-primary75 cursor-pointer"
                  onClick={() => {
                    setstatustaskdatefilter((prev) => !prev);
                    setloadingstatustaskdata(true);
                    fetch(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTaskStatusList?from=&to=&location=${statustasklocstate}`,
                      {
                        method: `GET`,
                        headers: {
                          Authorization: JSON.parse(initProps),
                        },
                      }
                    )
                      .then((res) => res.json())
                      .then((res2) => {
                        setstatustaskdatestate({ from: "", to: "" });
                        setstatustaskdata(res2.data.status_list);
                        setloadingstatustaskdata(false);
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
      {loadingstatustaskdata ? (
        <>
          <Spin />
        </>
      ) : statustaskdata.every((docevery) => docevery.status_count === 0) ? (
        <>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </>
      ) : (
        <>
          <div className="flex justify-center mb-4">
            <Doughnut
              data={{
                labels: statustaskdata.map((doc) => doc.status_name),
                datasets: [
                  {
                    data: statustaskdata.map((doc) => doc.status_count),
                    backgroundColor: [
                      "#BF4A40",
                      "#2F80ED",
                      "#ED962F",
                      "#E5C471",
                      "#6AAA70",
                      "#808080",
                    ],
                    borderColor: [
                      "#BF4A40",
                      "#2F80ED",
                      "#ED962F",
                      "#E5C471",
                      "#6AAA70",
                      "#808080",
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
          <div className="flex flex-col">
            {statustaskdata.map((doc, idx) => {
              if (doc.status === 1) {
                return (
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex">
                      <div className=" w-1 bg-overdue mr-1"></div>
                      <div className="mr-1">
                        <Text>{doc.status_name}</Text>
                      </div>
                      <AlerttriangleIconSvg size={15} color={`#BF4A40`} />
                    </div>
                    <div className="flex">
                      <H2>{doc.status_count}</H2>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex">
                      <div
                        className={`w-1 mr-1 ${
                          doc.status === 1 && `bg-overdue`
                        } ${doc.status === 2 && `bg-open`} ${
                          doc.status === 3 && `bg-onprogress`
                        } ${doc.status === 4 && `bg-onhold`} ${
                          doc.status === 5 && `bg-completed`
                        } ${doc.status === 6 && `bg-closed`}`}
                      ></div>
                      <Text>{doc.status_name}</Text>
                    </div>
                    <div className="flex">
                      <H2>{doc.status_count}</H2>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default MyTaskStatus;
