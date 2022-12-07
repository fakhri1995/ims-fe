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
    <div className="flex flex-col shadow-md rounded-md bg-white p-5 ">
      <div className="flex items-center justify-between mb-4">
        <h4 className="mig-heading--4">{title}</h4>
      </div>
      <div className=" w-full flex justify-center">
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
            maintainAspectRatio: false,
            cutout: 55,
            spacing: 5,
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

export { ChartDoughnut };
