import { useRouter } from "next/router";
import QueryString from "qs";
import { useCallback, useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import { AttendanceAdminListOvertime } from "components/screen/attendance/admin/AttendanceAdminListOvertime";
import { AttendanceAdminStatisticOvertime } from "components/screen/attendance/admin/AttendanceAdminStatisticOvertime";

import { useAccessControl } from "contexts/access-control";

import {
  LEAVE_STATISTICS_GET,
  LEAVE_STATUSES_GET,
  OVERTIME_STATISTICS_GET,
} from "lib/features";

import { CompanyService, CompanyServiceQueryKeys } from "apis/company";

import {
  AddNoteSvg,
  EyeIconSvg,
  SettingsIconSvg,
} from "../../../components/icon";
import LayoutDashboard from "../../../components/layout-dashboard";
import Layout from "../../../components/layout-dashboard-management";
import st from "../../../components/layout-dashboard-management.module.css";
import { permissionWarningNotification } from "../../../lib/helper";
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
import clsx from "clsx";
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

const OvertimeIndex = ({ initProps, dataProfile, sidemenu }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  //1.Init
  // Breadcrumb title
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 1, "Overtime");
  const [dataStatistic, setDataStatistic] = useState(null);
  const isAllowedTogetStatistics = hasPermission(OVERTIME_STATISTICS_GET);
  const [dataDefault, setDataDefault] = useState(null);
  const pageBreadcrumb = [
    {
      name: "Overtime",
    },
  ];

  useEffect(() => {
    fetchDataStatistic();
  }, []);

  const fetchDataStatistic = async () => {
    if (!isAllowedTogetStatistics) {
      permissionWarningNotification("Mendapatkan", "Data Statistik Overtime");
    } else {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getOvertimeStatistics`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          let dataGet = res2.data;
          if (dataGet) {
            let dataSave = {
              request: dataGet.total_overtime,
              accepted: dataGet.approved_overtime,
              rejected: dataGet.rejected_overtime,
              pending: dataGet.pending_overtime,
            };
            setDataStatistic(dataSave);
          }
        });
    }
  };

  return (
    <LayoutDashboard
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      fixedBreadcrumbValues={pageBreadcrumb}
    >
      <div className="flex flex-col" id="mainWrapper">
        {dataStatistic && (
          <AttendanceAdminStatisticOvertime
            initProps={initProps}
            rejected={dataStatistic?.rejected}
            request={dataStatistic?.request}
            accepted={dataStatistic?.accepted}
            pending={dataStatistic?.pending}
          />
        )}
        <AttendanceAdminListOvertime initProps={initProps} />
      </div>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res }) {
  var initProps = {};
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
      method: `GET`,
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
      sidemenu: "attendance/overtime",
    },
  };
}

export default OvertimeIndex;
