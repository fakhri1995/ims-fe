import { UpOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";

import ButtonSys from "../../components/button";
import { ChartDoughnut } from "../../components/chart/chartCustom";
import {
  AdjusmentsHorizontalIconSvg,
  ClipboardListIconSvg,
  PlusIconSvg,
} from "../../components/icon";
import st from "../../components/layout-dashboard.module.css";
import LayoutDashboard from "../../components/layout-dashboardNew";
import httpcookie from "cookie";

const ProjectIndex = ({ dataProfile, sidemenu, initProps }) => {
  // 1. Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  const dataColorBar = [
    "#2F80ED",
    "#BF4A40",
    "#ED962F",
    "#DDB44A",
    "#6AAA70",
    "#808080",
  ];

  // 2. useState
  const [loadingChart, setLoadingChart] = useState(false);
  const [projectStatusCount, setProjectStatusCount] = useState([
    {
      project_status: "Open",
      project_status_count: 24,
    },
    {
      project_status: "On Progress",
      project_status_count: 10,
    },
    {
      project_status: "Overdue",
      project_status_count: 4,
    },
    {
      project_status: "Closed",
      project_status_count: 24,
    },
    {
      project_status: "On Hold",
      project_status_count: 10,
    },
    {
      project_status: "Canceled",
      project_status_count: 4,
    },
  ]);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
    >
      <div
        className="flex flex-col md:grid md:grid-cols-10 md:grid-rows-6 gap-6 px-4 md:px-5"
        id="mainWrapper"
      >
        {/* Statistik Proyek */}
        <div className="md:col-span-7 md:row-span-1 gap-6">
          <Collapse
            className="shadow-md rounded-md bg-white"
            bordered={false}
            ghost={true}
            expandIconPosition="right"
            expandIcon={({ isActive }) => (
              <UpOutlined rotate={isActive ? 180 : 0} />
            )}
          >
            <Collapse.Panel
              header={
                <div className="mig-heading--4 flex space-x-2 items-center">
                  <ClipboardListIconSvg size={32} />
                  <p>Statistik Proyek</p>
                </div>
              }
            >
              {/* CHART PENEMPATAN KARYAWAN */}
              {loadingChart ? (
                <Spin />
              ) : (
                <div className="grid md:grid-cols-3 gap-2 lg:gap-6">
                  <ChartDoughnut
                    title={"Status Proyek"}
                    dataChart={projectStatusCount}
                    objName={"project_status"}
                    value={"project_status_count"}
                    customLegend={
                      <div className="text-md flex justify-between items-center mt-4">
                        <p className="text-mono30 font-semibold">
                          Total Proyek Saya
                        </p>
                        <p className="text-primary100 font-bold">20</p>
                      </div>
                    }
                  />
                  <div className="grid md:col-span-2 grid-cols-2 gap-2 lg:gap-6">
                    {projectStatusCount.map((status, idx) => (
                      <div
                        key={status.project_status}
                        className="flex items-center justify-between shadow-md rounded-md bg-white p-5"
                      >
                        <ClipboardListIconSvg
                          size={36}
                          color={
                            dataColorBar[idx + (1 % dataColorBar.length) - 1]
                          }
                        />
                        <div className="flex flex-col text-right">
                          <p className="text-lg font-bold text-mono30">
                            {status.project_status_count}
                          </p>
                          <p className="text-mono50">{status.project_status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Collapse.Panel>
          </Collapse>
        </div>

        {/* Semua Proyek */}
        <div className="order-last md:col-span-7 md:row-span-5 gap-6">
          Semua Proyek
        </div>

        <div className="grid grid-cols-2 md:flex flex-col md:col-span-3 md:row-span-6 gap-6">
          {/* Tambah Proyek Baru */}
          <div className="">
            <button className="mig-platform--p-0 px-4 py-2 w-full flex space-x-2 items-center text-white bg-primary100 disabled:bg-gray-200 hover:bg-primary75 overflow-hidden">
              <PlusIconSvg color={"#ffffff"} size={32} />
              <p className="font-bold text-sm">Tambah Proyek Baru</p>
            </button>
          </div>

          {/* Kelola Status Task & Proyek */}
          <div className="">
            <button className="mig-platform--p-0 px-4 py-2 w-full flex space-x-2 items-center text-white bg-mono50 disabled:bg-gray-200 hover:bg-opacity-75 overflow-hidden">
              <AdjusmentsHorizontalIconSvg color={"#ffffff"} size={32} />
              <p className="font-bold text-sm">Kelola Status Task & Proyek</p>
            </button>
          </div>

          {/* Task Saya */}
          <div className="col-span-2">Task Saya</div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res }) {
  let initProps = {};
  if (!req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
  if (!cookiesJSON1.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  initProps = cookiesJSON1.token;
  const resourcesGP = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: "GET",
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "projects",
    },
  };
}

export default ProjectIndex;
