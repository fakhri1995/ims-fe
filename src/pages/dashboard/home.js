import { useEffect, useState } from "react";

import LayoutDashboard from "components/layout-dashboardNew";
import {
  AttendanceCompanyLeafletMapNoSSR,
  AttendanceCompanyListSection,
  AttendanceCompanyTodayStatCard,
  CheckInOutCard,
} from "components/screen/attendance";

import { useAccessControl } from "contexts/access-control";

import { ROLE_SUPER_ADMIN } from "../../lib/constants";
import { SIDEBAR_CLIENT_ATTENDANCE } from "../../lib/features";
import httpcookie from "cookie";

function DashboardIndex({ initProps, dataProfile, sidemenu }) {
  const { hasPermission, hasRole } = useAccessControl();
  const [loading, setLoading] = useState(true);
  const pageBreadcrumbValue = [
    { name: "Dashboard Kehadiran " + dataProfile.data.company.name },
  ];

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={initProps}
      sidemenu={sidemenu}
      fixedBreadcrumbValues={
        hasPermission(SIDEBAR_CLIENT_ATTENDANCE) && !hasRole(ROLE_SUPER_ADMIN)
          ? pageBreadcrumbValue
          : null
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
      {hasPermission(SIDEBAR_CLIENT_ATTENDANCE) &&
      !hasRole(ROLE_SUPER_ADMIN) ? (
        <div className="px-5 space-y-6">
          {/* First row: real time clock, today attendance stat, maps */}
          <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
            {/* First column: real time clock, today attendance stat */}
            <div className="flex flex-col w-full lg:w-2/5 xl:w-1/3 2xl:w-1/5 space-y-6 justify-around">
              <div className="min-h-[12rem] flex-grow">
                <CheckInOutCard onlyShowTime />
              </div>

              <div className="min-h-[12rem] flex-grow h-full">
                <AttendanceCompanyTodayStatCard />
              </div>
            </div>

            {/* Second column: maps */}
            <div className="flex w-full lg:w-3/5 xl:w-2/3 2xl:w-4/5">
              <div className="mig-platform w-full">
                <AttendanceCompanyLeafletMapNoSSR />
              </div>
            </div>
          </div>
          {/* Second row: Table all attendance */}
          <div className="grid grid-cols-12">
            <div className="col-span-full">
              <AttendanceCompanyListSection
                companyId={dataProfile.data.company.id.toString()}
              />
            </div>
          </div>
        </div>
      ) : (
        <h1>Selamat datang di dashboard</h1>
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
