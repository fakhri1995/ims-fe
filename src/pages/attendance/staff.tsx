import { AppstoreAddOutlined, DownloadOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { GetServerSideProps, NextPage } from "next";

import ButtonSys from "components/button";
import styles from "components/layout-dashboard.module.css";
import LayoutDashboard from "components/layout-dashboardNew";
import {
  CheckInOutCard,
  StaffAttendanceStatisticCard,
  StaffDetailCard,
} from "components/screen/attendance";
import { StaffAttendanceKehadiranTable } from "components/screen/attendance/staff/StaffAttendanceKehadiranTable";

import { parseToken } from "lib/auth";
import { getAxiosClient } from "lib/axios-client";

import { AuthService } from "apis/auth";

import { PageBreadcrumbValue, ProtectedPageProps } from "types/common";

// import { DataEmptyState } from "components/states/DataEmptyState";

const { TabPane } = Tabs;

const StaffAttendancePage: NextPage<ProtectedPageProps> = ({
  dataProfile,
  token,
}) => {
  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Absensi Saya",
    },
  ];

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      tok={token}
      fixedBreadcrumbValues={pageBreadcrumb}
      st={styles}
      sidemenu={"attendance/staff"}
      forceNewBreadcrumbStrategy
    >
      <div className="px-5 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Column 1: Check In/Out Button, Staff detail card, Statistic Card */}
        <div className="w-full lg:w-2/5 xl:w-1/5 space-y-6">
          {/* Card Check In/Out */}
          <CheckInOutCard />

          {/* Staff Detail Card */}
          <StaffDetailCard staffId={0} />

          {/* Statistic Card */}
          <StaffAttendanceStatisticCard staffId={0} />
        </div>

        {/* Column 2: Aktivitas card (Table and Tabs), Kehadiran card (table) */}
        <div className="w-full lg:w-3/5 xl:w-4/5 space-y-6">
          {/* <div className="w-full lg:w-3/5 xl:w-4/5 bg-red-400 space-y-6"> */}
          {/* Card: Aktivitas Table */}
          <div className="bg-white rounded-md shadow-md p-6 space-y-6">
            <h3 className="mig-heading--4">Aktivitas</h3>

            <div className="flex items-center justify-between">
              <Tabs defaultActiveKey="1" className="w-1/2">
                <TabPane tab="Hari Ini" key="1" />
                <TabPane tab="Riwayat" key="2" />
              </Tabs>

              <div className="flex space-x-6 w-1/2 justify-end items-center">
                <ButtonSys
                  type="default"
                  onClick={() => {
                    alert("Button Unduh Tabel clicked");
                  }}
                >
                  <DownloadOutlined className="mr-2" />
                  Unduh Tabel
                </ButtonSys>

                <ButtonSys
                  type="primary"
                  onClick={() => {
                    alert("Button Masukkan Aktivitas Clicked");
                  }}
                >
                  <AppstoreAddOutlined className="mr-2" />
                  Masukkan Aktivitas
                </ButtonSys>
              </div>
            </div>
          </div>

          {/* Card: Kehadiran Table */}
          <div className="bg-white rounded-md shadow-md p-6 space-y-6">
            {/* Header: Title and Unduh Table button */}
            <div className="flex items-center justify-between">
              <h3 className="mig-heading--4">Kehadiran</h3>
              <ButtonSys
                type="default"
                onClick={() => {
                  alert("Button Unduh Tabel clicked");
                }}
              >
                <DownloadOutlined className="mr-2" />
                Unduh Tabel
              </ButtonSys>
            </div>

            {/* TODO: Table */}
            <StaffAttendanceKehadiranTable />
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export const getServerSideProps: GetServerSideProps<
  ProtectedPageProps
> = async (ctx) => {
  let defaultProps: ProtectedPageProps = {} as ProtectedPageProps;

  const { token, hasNoToken } = parseToken(ctx);
  if (hasNoToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      props: defaultProps,
    };
  }

  defaultProps.token = token;

  const axiosClient = getAxiosClient(token);
  try {
    const { data } = await AuthService.whoAmI(axiosClient);

    defaultProps.dataProfile = data;
  } catch {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      props: defaultProps,
    };
  }

  return {
    props: defaultProps,
  };
};

export default StaffAttendancePage;
