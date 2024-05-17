import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Empty,
  Input,
  Progress,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  notification,
} from "antd";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import { useAccessControl } from "contexts/access-control";

import {
  AddNoteSvg,
  EyeIconSvg,
  SettingsIconSvg,
} from "../../../components/icon";
import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard.module.css";
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

const AnnualLeaveIndex = ({ initProps, dataProfile, sidemenu }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }

  //1.Init
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 1, "Manajemen Cuti");

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
  });
  const [loadingAnualLeave, setLoadingAnnualLeave] = useState(true);
  const [dataAnnualLeave, setDataAnnualLeave] = useState([
    {
      id: 1,
      nama: "Alex",
      tgl_awal_cuti: "10 April 2024",
      tgl_pengajuan_cuti: "12 April 2024",
      durasi_cuti: "2 hari",
    },
    {
      id: 2,
      nama: "Alex Chrsiti",
      tgl_awal_cuti: "10 April 2024",
      tgl_pengajuan_cuti: "12 April 2024",
      durasi_cuti: "2 hari",
    },
  ]);
  const [dataRawAnnualLeave, setDataRawAnnualLeave] = useState({
    current_page: "",
    data: [],
    first_page_url: "",
    from: null,
    last_page: null,
    last_page_url: "",
    next_page_url: "",
    path: "",
    per_page: null,
    prev_page_url: null,
    to: null,
    total: null,
  });

  const columns = [
    {
      title: "Nama Karyawan",
      dataIndex: "nama",
      key: "nama",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tanggal Awal Cuti",
      dataIndex: "tgl_awal_cuti",
      key: "tgl_awal_cuti",
    },
    {
      title: "Tanggal Pengajuan Cuti",
      dataIndex: "tgl_pengajuan_cuti",
      key: "tgl_pengajuan_cuti",
    },
    {
      title: "Durasi Cuti",
      dataIndex: "durasi_cuti",
      key: "durasi_cuti",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: `center`,
      render: (text, record, index) => {
        return {
          children: (
            <>
              {record.status === 1 && (
                <div className="flex flex-row gap-8">
                  <div className={"bg-[#E6E6E6] rounded-[5px] py-1 px-4 h-6"}>
                    <p
                      className={"text-[#BF4A40] text-xs leading-4 font-medium"}
                    >
                      Pending
                    </p>
                  </div>
                  <EyeIconSvg size={16} />
                </div>
              )}
              {record.status === 2 && (
                <div className="flex flex-row gap-8">
                  <div className={"bg-[#35763B] rounded-[5px] py-1 px-4 h-6"}>
                    <p
                      className={"text-[#F3F3F3] text-xs leading-4 font-medium"}
                    >
                      Disetujui
                    </p>
                  </div>
                  <EyeIconSvg size={16} />
                </div>
              )}
              {record.status === 3 && (
                <div className="flex flex-row gap-8">
                  <div className={"bg-[#BF4A40] rounded-[5px] py-1 px-4 h-6"}>
                    <p
                      className={"text-[#FFFFFF] text-xs leading-4 font-medium"}
                    >
                      Ditolak
                    </p>
                  </div>
                  <EyeIconSvg size={16} />
                </div>
              )}
            </>
          ),
        };
      },
    },
  ];
  const data = [
    {
      id: 1,
      nama: "Alex",
      tgl_awal_cuti: "10 April 2024",
      tgl_pengajuan_cuti: "12 April 2024",
      durasi_cuti: "2 hari",
      status: 1,
    },
    {
      id: 2,
      nama: "Alex Chrsiti",
      tgl_awal_cuti: "10 April 2024",
      tgl_pengajuan_cuti: "12 April 2024",
      durasi_cuti: "2 hari",
      status: 2,
    },
  ];

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
      st={st}
    >
      <div className="flex flex-col" id="mainWrapper">
        <div className={"flex flex-row gap-8"}>
          <div
            className={"h-[232px] w-1/2 p-6 rounded-[5px] bg-white"}
            style={{ boxShadow: " 0px 6px 25px 0px rgba(0, 0, 0, 0.05)" }}
          >
            <h4 className={"text-lg leading-[18px] font-bold text-[#4D4D4D]"}>
              Status Cuti
            </h4>
            <div className={"mt-4 flex items-center"}>
              <div className={"w-1/2"}>
                <Bar
                  data={{
                    labels: ["Disetujui", "Dipending", "Ditolak"],
                    datasets: [
                      {
                        data: [213, 10, 36],
                        backgroundColor: ["#35763B", "#E6E6E6", "#BF4A40"],
                        borderColor: ["#35763B", "#E6E6E6", "#BF4A40"],
                        barPercentage: 1.0,
                        barThickness: 18,
                        maxBarThickness: 15,
                        minBarLength: 2,
                        borderRadius: 3,
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
                    scales: {
                      x: {
                        grid: {
                          display: false,
                          drawBorder: false,
                        },
                      },
                      y: {
                        beginAtZero: true,
                        ticks: {
                          display: false,
                        },
                        grid: {
                          display: false,
                          drawBorder: false,
                        },
                        border: {
                          display: false,
                        },
                      },
                    },
                  }}
                />
              </div>
              <div className={"w-1/2"}>
                <div className={"flex flex-col gap-4"}>
                  <div className={"flex gap-4"}>
                    <div className="w-1 h-6 bg-[#35763B]" />
                    <div className={"flex justify-between w-full"}>
                      <p
                        className={
                          "text-[#4D4D4D] text-xs leading-5 font-medium"
                        }
                      >
                        Disetujui
                      </p>
                      <p
                        className={"text-[#4D4D4D] text-sm leading-6 font-bold"}
                      >
                        213
                      </p>
                    </div>
                  </div>
                  <div className={"flex gap-4"}>
                    <div className="w-1 h-6 bg-[#E6E6E6]" />
                    <div className={"flex justify-between w-full"}>
                      <p
                        className={
                          "text-[#4D4D4D] text-xs leading-5 font-medium"
                        }
                      >
                        Pending
                      </p>
                      <p
                        className={"text-[#4D4D4D] text-sm leading-6 font-bold"}
                      >
                        10
                      </p>
                    </div>
                  </div>
                  <div className={"flex gap-4"}>
                    <div className="w-1 h-6 bg-[#BF4A40]" />
                    <div className={"flex justify-between w-full"}>
                      <p
                        className={
                          "text-[#4D4D4D] text-xs leading-5 font-medium"
                        }
                      >
                        Ditolak
                      </p>
                      <p
                        className={"text-[#4D4D4D] text-sm leading-6 font-bold"}
                      >
                        36
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={"h-[232px] w-1/2 p-6 rounded-[5px] bg-white"}
            style={{ boxShadow: "0px 6px 25px 0px rgba(0, 0, 0, 0.05)" }}
          >
            <h4 className={"text-lg leading-[18px] font-bold text-[#4D4D4D]"}>
              Status Pengajuan
            </h4>
            <div className={"mt-4 flex items-center gap-4"}>
              <div className={"w-1/2 flex"}>
                <Doughnut
                  data={{
                    labels: [
                      "Karyawan Mengajukan",
                      "Karyawan Tidak Mengajukan",
                    ],
                    datasets: [
                      {
                        data: [10, 70],
                        backgroundColor: ["#35763B", "#BF4A40"],
                        borderColor: ["#35763B", "#BF4A40"],
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
              <div className={"w-1/2"}>
                <div className={"flex gap-4"}>
                  <div className="w-1 h-6 bg-[#35763B]" />
                  <div className={"flex justify-between w-full"}>
                    <p
                      className={"text-[#4D4D4D] text-xs leading-5 font-medium"}
                    >
                      Karyawan Mengajukan
                    </p>
                    <p className={"text-[#4D4D4D] text-sm leading-6 font-bold"}>
                      10
                    </p>
                  </div>
                </div>
                <div className={"flex gap-4 mt-4"}>
                  <div className="w-1 h-6 bg-[#BF4A40]" />
                  <div className={"flex justify-between w-full"}>
                    <p
                      className={"text-[#4D4D4D] text-xs leading-5 font-medium"}
                    >
                      Karyawan Tidak Mengajukan
                    </p>
                    <p className={"text-[#4D4D4D] text-sm leading-6 font-bold"}>
                      70
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={"flex flex-col p-6  mt-8"}
          style={{ boxShadow: " 0px 6px 25px 0px rgba(0, 0, 0, 0.05)" }}
        >
          <div className={"flex w-full justify-between items-center"}>
            <p className="text-lg leading-6 font-bold text-[#4D4D4D]">
              Daftar Pengajuan Cuti
            </p>
            <div className={"flex gap-4"}>
              <div
                className={
                  "flex hover:cursor-pointer gap-2 justify-center items-center px-5 h-9 rounded-[5px] bg-[#00589F]"
                }
                style={{ boxShadow: " 0px 6px 25px 0px rgba(0, 0, 0, 0.05)" }}
              >
                <SettingsIconSvg size={16} color={"white"} />
                <p className={"text-white text-xs leading-5 font-bold"}>
                  Kelola Cuti
                </p>
              </div>
              <div
                className={
                  "flex hover:cursor-pointer gap-2 justify-center items-center px-5 h-9 rounded-[5px] bg-[#35763B]"
                }
                style={{ boxShadow: " 0px 6px 25px 0px rgba(0, 0, 0, 0.05)" }}
              >
                <AddNoteSvg />
                <p className={"text-white text-xs leading-5 font-bold"}>
                  Tambah Pengajuan
                </p>
              </div>
            </div>
          </div>
          <div className={"mt-6"}>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    </Layout>
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
      sidemenu: "annualleave",
    },
  };
}

export default AnnualLeaveIndex;
