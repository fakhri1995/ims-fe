import { useRouter } from "next/router";
import QueryString from "qs";
import { useCallback, useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import { AttendanceAdminListOvertime } from "components/screen/attendance/admin/AttendanceAdminListOvertime";
import { AttendanceAdminStatisticOvertime } from "components/screen/attendance/admin/AttendanceAdminStatisticOvertime";

import { useAccessControl } from "contexts/access-control";

import { LEAVE_STATISTICS_GET, LEAVE_STATUSES_GET } from "lib/features";

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
  const [dataStatusCuti, setDataStatusCuti] = useState([]);
  const [dataStatusPengajuan, setDataStatusPengajuan] = useState([]);
  const isAllowedToGetLeaveStatus = hasPermission(LEAVE_STATUSES_GET);
  const isAllowedToGetLeaveStatics = hasPermission(LEAVE_STATISTICS_GET);
  const [dataDefault, setDataDefault] = useState(null);
  const pageBreadcrumb = [
    {
      name: "Overtime",
    },
  ];

  useEffect(() => {
    fetchDataStatus();
    fetchDataStatusPengajuan();
  }, []);

  const fetchDataStatus = async () => {
    if (!isAllowedToGetLeaveStatus) {
      permissionWarningNotification("Mendapatkan", "Data Status Cuti");
    } else {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getLeaveStatuses`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          let dataTemp = [];
          for (let a = 0; a < res2.data.length; a++) {
            if (res2.data[a].status == 2) {
              dataTemp[0] = res2.data[a].total;
            }
            if (res2.data[a].status == 1) {
              dataTemp[1] = res2.data[a].total;
            }
            if (res2.data[a].status == 3) {
              dataTemp[2] = res2.data[a].total;
            }
          }
          setDataStatusCuti(dataTemp);
        });
    }
  };

  const fetchDataStatusPengajuan = async () => {
    if (!isAllowedToGetLeaveStatics) {
      permissionWarningNotification(
        "Mendapatkan",
        "Data Status Pengajuan Cuti"
      );
    } else {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getLeaveStatistics`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          let dataTemp = [];
          dataTemp.push(res2.data.has_leave);
          dataTemp.push(res2.data.no_leave);
          setDataStatusPengajuan(dataTemp);
        });
    }
  };

  const detailCuti = (record) => {
    setShowDrawer(true);
    setDataDefault(record);
  };

  return (
    <LayoutDashboard
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      fixedBreadcrumbValues={pageBreadcrumb}
    >
      <div className="flex flex-col" id="mainWrapper">
        <AttendanceAdminStatisticOvertime initProps={initProps} />
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
