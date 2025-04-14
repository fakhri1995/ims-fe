import parse from "html-react-parser";
import React from "react";
import { Bar } from "react-chartjs-2";

import { DownIconSvg } from "../../../icon";
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
const CareerTopChart = ({
  dataLabelStatistic,
  dataSets,
  setShowCollapsible,
}) => {
  return (
    <div
      className={"bg-white p-6 h-[282px] rounded-[5px]"}
      style={{ boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.10)" }}
    >
      <div className={"flex flex-row justify-between"}>
        <p className={"text-mono30 text-lg leading-6 font-bold "}>
          Top 5 Lowongan
        </p>
        <div
          className={"cursor-pointer"}
          onClick={() => setShowCollapsible(false)}
        >
          <DownIconSvg size={24} color={"#4D4D4D"} />
        </div>
      </div>
      {dataLabelStatistic.length > 0 && (
        <div className={"mt-4"}>
          <Bar
            data={{
              labels: dataLabelStatistic,
              datasets: dataSets,
            }}
            options={{
              layout: {
                margin: {
                  top: 10,
                },
              },
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
                    drawBorder: false,
                  },
                  ticks: {
                    font: {
                      family: "Montserrat, sans-serif",
                      size: 9,
                    },
                  },
                },
                y: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    display: false,
                  },
                  display: false,
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
      )}
    </div>
  );
};

export default CareerTopChart;
