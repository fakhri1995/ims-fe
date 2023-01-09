import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import { H1, H2, Text } from "../typography";
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

const dataColorBar = [
  "#2F80ED",
  "#BF4A40",
  "#ED962F",
  "#DDB44A",
  "#6AAA70",
  "#808080",
];

const ChartDoughnut = ({ title, dataChart, objName, value }) => {
  return (
    <div className="grid grid-cols-1 shadow-md rounded-md bg-white p-5">
      <h4 className="mig-heading--4 mb-4">{title}</h4>
      <div className="w-9/12 xl:w-7/12 flex mx-auto">
        <Doughnut
          data={{
            labels: dataChart.map((doc) => doc[objName]),
            datasets: [
              {
                data: dataChart.map((doc) => doc[value]),
                backgroundColor: dataChart.map(
                  (doc, idx) =>
                    dataColorBar[idx + (1 % dataColorBar.length) - 1]
                ),
                borderColor: dataChart.map(
                  (doc, idx) =>
                    dataColorBar[idx + (1 % dataColorBar.length) - 1]
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

      <div className="flex flex-col w-full mt-5">
        {dataChart.map((doc, idx) => (
          <div key={idx} className="flex justify-between items-center mb-1">
            <div className="flex">
              <div
                className=" w-1 mr-2"
                style={{
                  backgroundColor: `${
                    dataColorBar[idx + (1 % dataColorBar.length) - 1]
                  }`,
                }}
              ></div>
              <Text>{doc[objName] || "-"}</Text>
            </div>
            <div className="flex">
              <H2>{doc[value]}</H2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChartHorizontalBar = ({ dataChart, objName, value, colorBarList }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center md:space-x-2">
      <div className="w-2/3 h-24">
        <Bar
          data={{
            labels: dataChart.map((doc) => doc[objName].split(" ")),
            datasets: [
              {
                data: dataChart.map((doc) => doc[value]),
                backgroundColor: dataChart.map(
                  (doc, idx) =>
                    colorBarList[idx + (1 % colorBarList.length) - 1]
                ),
                borderColor: dataChart.map(
                  (doc, idx) =>
                    colorBarList[idx + (1 % colorBarList.length) - 1]
                ),
                barPercentage: 1.0,
                barThickness: 24,
                maxBarThickness: 34,
                minBarLength: 2,
                borderRadius: 5,
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
            indexAxis: "y",
            scales: {
              x: {
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    family: "Inter, sans-serif",
                    size: 10,
                  },
                  color: "#808080",
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  title: (context) => {
                    return context[0].label.replaceAll(",", " ");
                  },
                },
              },
            },
          }}
        />
      </div>

      <div className="flex flex-col">
        {dataChart.map((doc, idx) => (
          <div key={idx} className="flex items-center space-x-32">
            <p className="w-3/4 font-medium">{doc[objName]}</p>
            <p className="mig-heading--4 ">{doc[value]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ChartDoughnut, ChartHorizontalBar };
