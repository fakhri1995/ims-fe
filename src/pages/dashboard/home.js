import { Empty, Input, Progress, Select, Spin } from "antd";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import LayoutDashboard from "components/layout-dashboardNew";
import {
  AttendanceCompanyLeafletMapNoSSR,
  AttendanceCompanyListSection,
  AttendanceCompanyTodayStatCard,
  CheckInOutCard,
} from "components/screen/attendance";
import { ClockCard } from "components/screen/client";
import EmployeeList from "components/screen/client/EmployeeList";
import { AnnouncementCard } from "components/screen/dashboard";

import { useAccessControl } from "contexts/access-control";

import {
  AlerttriangleIconSvg,
  NewsIconSvg,
  UserCheckIconSvg,
  UserIconSvg,
} from "../../components/icon";
import KehadiranCard from "../../components/screen/client/KehadiranCard";
import TaskCard from "../../components/screen/client/TaskCard";
import { H1, H2, Label, Text } from "../../components/typography";
import { ROLE_SUPER_ADMIN } from "../../lib/constants";
import {
  PROJECT_TASKS_COUNT_CLIENT_GET,
  SIDEBAR_CLIENT_ATTENDANCE,
  SIDEBAR_CLIENT_DASHBOARD,
  TASK_STATUS_LIST_GET,
} from "../../lib/features";
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
import httpcookie from "cookie";

Chart.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

function DashboardIndex({ initProps, dataProfile, sidemenu }) {
  const { hasPermission, hasRole } = useAccessControl();

  const [loadingstatustaskdata, setloadingstatustaskdata] = useState(true);
  const pageBreadcrumbValue = [
    { name: "Dashboard Kehadiran " + dataProfile.data.company.name },
  ];
  const isAllowedToGetStatusTaskList = hasPermission(TASK_STATUS_LIST_GET);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={initProps}
      sidemenu={sidemenu}
      fixedBreadcrumbValues={
        hasPermission(SIDEBAR_CLIENT_DASHBOARD) && !hasRole(ROLE_SUPER_ADMIN)
          ? pageBreadcrumbValue
          : [{ name: "Dashboard" }]
      }
    >
      {/* <div className="grid grid-cols-3">
                <div className="w-auto h-auto border rounded-xl flex flex-col mx-3">
                    <div className="p-3 flex flex-col border-b">
                        <h1 className="font-bold text-xl mb-0">Total Inventories</h1>
                        <p className="text-sm text-gray-500 mb-0">Total inventories specifically:</p>
                    </div>
                    <div className="flex-col flex">
                        <div className="text-2xl px-5 py-2">
                            Total: 100 units
                        </div>
                        <div className="text-2xl px-5 py-2">
                            Rented: 20 units
                        </div>
                    </div>
                </div>
                <div className="w-auto h-auto border rounded-xl flex flex-col mx-3">
                    <div className="p-3 flex flex-col border-b">
                        <h1 className="font-bold text-xl mb-0">Total Inventories</h1>
                        <p className="text-sm text-gray-500 mb-0">Total inventories specifically:</p>
                    </div>
                    <div className="flex-col flex">
                        <div className="text-2xl px-5 py-2">
                            Total: 100 units
                        </div>
                        <div className="text-2xl px-5 py-2">
                            Rented: 20 units
                        </div>
                    </div>
                </div>
                <div className="w-auto h-auto border rounded-xl flex flex-col mx-3">
                    <div className="p-3 flex flex-col border-b">
                        <h1 className="font-bold text-xl mb-0">Total Inventories</h1>
                        <p className="text-sm text-gray-500 mb-0">Total inventories specifically:</p>
                    </div>
                    <div className="flex-col flex">
                        <div className="text-2xl px-5 py-2">
                            Total: 100 units
                        </div>
                        <div className="text-2xl px-5 py-2">
                            Rented: 20 units
                        </div>
                    </div>
                </div>
            </div> */}
      {hasPermission(SIDEBAR_CLIENT_DASHBOARD) && !hasRole(ROLE_SUPER_ADMIN) ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-10 px-5 gap-x-3 gap-y-6">
            <KehadiranCard initProps={initProps} />
            {hasPermission(PROJECT_TASKS_COUNT_CLIENT_GET) && (
              <TaskCard initProps={initProps} />
            )}
            {/* <div className="md:col-span-5 lg:col-span-3 flex flex-col shadow-md rounded-md"> */}
            {/* <div className="flex items-center justify-between mb-4">
              <H1>Waktu Lokal</H1>
            </div> */}
            <ClockCard onlyShowTime initProps={initProps} />
            {/* </div> */}
          </div>
          <EmployeeList
            initProps={initProps}
            companyId={dataProfile.data.company.id.toString()}
          />
        </div>
      ) : (
        <AnnouncementCard />
        // <h1 className=" md:px-0">Selamat datang di dashboard</h1>
      )}
    </LayoutDashboard>
  );
}

export async function getServerSideProps({ req, res }) {
  var initProps = {};
  if (req && req.headers) {
    if (req.headers.cookie) {
      const cookies = req.headers.cookie;
      const cookiesJSON1 = httpcookie.parse(cookies);
      if (!cookiesJSON1.token) {
        return {
          redirect: {
            permanent: false,
            destination: "/login",
          },
        };
      } else {
        if (typeof cookies === "string") {
          const cookiesJSON = httpcookie.parse(cookies);
          initProps = cookiesJSON.token;
        }
        const resources = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
          {
            method: `GET`,
            headers: {
              Authorization: JSON.parse(initProps),
            },
          }
        );
        const resjson = await resources.json();
        const dataProfile = resjson;
        return {
          props: {
            initProps,
            dataProfile,
            sidemenu: "1",
          },
        };
      }
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
}

export default DashboardIndex;
