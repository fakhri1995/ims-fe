import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { DatePicker, Input, Select, Spin, Tree } from "antd";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import { permissionWarningNotification } from "../../../../lib/helper";
import {
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

const MyTaskType = ({
  isAllowedToGetTaskCount,
  canOpenLocationTreeDropdown,
  setttloctoggle,
  ttloctoggle,
  setloadingttcdata,
  setttcdata,
  ttcloc,
  loadingttcdata,
  ttcdata,
  ttccolorbar,
  initProps,
}) => {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-col shadow-md rounded-md bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <H1>Tipe Task Terbanyak</H1>
        <div className="flex items-center">
          <div className="dropdown dropdown-left">
            <div
              tabIndex={`1`}
              className="mx-1 cursor-pointer"
              onClick={() => {
                if (!isAllowedToGetTaskCount) {
                  permissionWarningNotification(
                    "Mendapatkan",
                    "Informasi Tipe Task Terbanyak"
                  );
                  return;
                }

                if (canOpenLocationTreeDropdown()) {
                  setttloctoggle((prev) => !prev);
                }
              }}
            >
              <MappinIconSvg color={`#000000`} size={25} />
            </div>
            {ttloctoggle ? (
              <div
                tabIndex={`1`}
                className="p-5 shadow menu dropdown-content bg-white rounded-box w-72 flex flex-col max-h-72 overflow-scroll"
              >
                <div
                  className=" flex justify-end mb-1 cursor-pointer"
                  onClick={() => {
                    setttloctoggle(false);
                    setloadingttcdata(true);
                    fetch(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTaskTypeCounts?location=`,
                      {
                        method: `GET`,
                        headers: {
                          Authorization: JSON.parse(initProps),
                        },
                      }
                    )
                      .then((res) => res.json())
                      .then((res2) => {
                        setttcdata(res2.data);
                        setloadingttcdata(false);
                      });
                  }}
                >
                  <p className=" text-xs text-gray-500 mr-1">Reset</p>
                  <CircleXIconSvg size={15} color={`#BF4A40`} />
                </div>
                <Tree
                  className="treeTaskStatusList"
                  defaultExpandAll
                  treeData={ttcloc}
                  switcherIcon={<DownOutlined />}
                  showIcon
                  blockNode={true}
                  titleRender={(nodeData) => (
                    <div
                      className="flex items-start w-full py-3 rounded-md px-2"
                      onClick={() => {
                        setttloctoggle(false);
                        setloadingttcdata(true);
                        fetch(
                          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserTaskTypeCounts?location=${nodeData.key}`,
                          {
                            method: `GET`,
                            headers: {
                              Authorization: JSON.parse(initProps),
                            },
                          }
                        )
                          .then((res) => res.json())
                          .then((res2) => {
                            setttcdata(res2.data);
                            setloadingttcdata(false);
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
        </div>
      </div>
      {loadingttcdata ? (
        <>
          <Spin />
        </>
      ) : (
        <>
          <div className="flex justify-center mb-5 h-4/6">
            <Bar
              data={{
                labels: ttcdata.map((doc) => doc.name),
                datasets: [
                  {
                    data: ttcdata.map((doc) => doc.tasks_count),
                    backgroundColor: ttcdata.map(
                      (doc, idx) =>
                        ttccolorbar[idx + (1 % ttccolorbar.length) - 1]
                    ),
                    borderColor: ttcdata.map(
                      (doc, idx) =>
                        ttccolorbar[idx + (1 % ttccolorbar.length) - 1]
                    ),
                    barPercentage: 1.0,
                    barThickness: 18,
                    maxBarThickness: 15,
                    minBarLength: 2,
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
            {ttcdata.map((doc, idx) => (
              <div key={idx} className="flex justify-between items-center mb-1">
                <div className="flex">
                  <div
                    className=" w-1 mr-2"
                    style={{
                      backgroundColor: `${
                        ttccolorbar[idx + (1 % ttccolorbar.length) - 1]
                      }`,
                    }}
                  ></div>
                  <Text>{doc.name}</Text>
                </div>
                <div className="flex">
                  <H2>{doc.tasks_count}</H2>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyTaskType;
