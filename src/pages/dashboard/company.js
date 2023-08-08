import { useMemo } from "react";

import LayoutDashboard from "components/layout-dashboard-company";
import {
  AttendanceAdminLeafletMapNoSSR,
  AttendanceAdminListSection,
  AttendanceAdminTodayStatCard,
  CheckInOutCard,
} from "components/screen/attendance";

import httpcookie from "cookie";

function DashboardCompany({ initProps, dataProfile, sidemenu }) {
  const pageBreadcrumbValue = useMemo(
    () => [
      {
        name: "Dashboar Kehadiran PT Maju Jaya",
        hrefValue: "/projectsCompany",
      },
    ],
    []
  );
  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={initProps}
      sidemenu={sidemenu}
      fixedBreadcrumbValues={pageBreadcrumbValue}
    >
      <div className="px-5 space-y-6">
        {/* First row: real time clock, today attendance stat, maps */}
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
          {/* First column: real time clock, today attendance stat */}
          <div className="flex flex-col w-full lg:w-2/5 xl:w-1/3 2xl:w-1/5 space-y-6 justify-around">
            <div className="min-h-[12rem] flex-grow">
              <CheckInOutCard onlyShowTime />
            </div>

            <div className="min-h-[12rem] flex-grow h-full">
              <AttendanceAdminTodayStatCard />
            </div>
          </div>

          {/* Second column: maps */}
          <div className="flex w-full lg:w-3/5 xl:w-2/3 2xl:w-4/5">
            <div className="mig-platform w-full">
              <AttendanceAdminLeafletMapNoSSR />
            </div>
          </div>
        </div>

        {/* Second row: Table all attendance */}
        <div className="grid grid-cols-12">
          <div className="col-span-full">
            <AttendanceAdminListSection />
          </div>
        </div>
      </div>
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

export default DashboardCompany;
