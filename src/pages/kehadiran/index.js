import {
  CaretDownOutlined,
  CaretUpOutlined,
  UpOutlined,
} from "@ant-design/icons";
import {
  Collapse,
  DatePicker,
  Input,
  Select,
  Spin,
  Table,
  notification,
} from "antd";
import moment from "moment";
import {
  ArrayParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import QueryString from "qs";
import React, { useState } from "react";
import { useEffect } from "react";

import { AccessControl } from "components/features/AccessControl";
import {
  AttendanceCompanyLeafletMapNoSSR,
  AttendanceCompanyListSection,
  AttendanceCompanyTodayStatCard,
  CheckInOutCard,
} from "components/screen/attendance";

import { useAccessControl } from "contexts/access-control";

import st from "../../components/layout-dashboard.module.css";
import LayoutDashboard from "../../components/layout-dashboardNew";
import httpcookie from "cookie";

const KehadiranIndex = ({ dataProfile, sidemenu, initProps }) => {
  // 1. Init
  /**
   * Dependencies
   */
  const [rowsMyTaskList, setRowsMyTaskList] = useState(4);
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const pageBreadcrumbValue = [
    { name: "Dashboard Kehadiran " + dataProfile.data.company.name },
  ];

  // 3.8. Update number of rows in task table based on the device width
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 820) {
  //       setRowsMyTaskList(3); // Set smaller page size for smaller devices
  //     } else {
  //       setRowsMyTaskList(4); // Set default page size for larger devices
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
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
              initProps={initProps}
              companyId={dataProfile.data.company.id.toString()}
            />
          </div>
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
      sidemenu: "kehadirancompany",
    },
  };
}

export default KehadiranIndex;
