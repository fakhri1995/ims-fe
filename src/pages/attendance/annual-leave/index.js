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
import QueryString from "qs";
import { useCallback, useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import DrawerCutiSatuan from "components/drawer/attendance/drawerCutiSatuan";

import { useAccessControl } from "contexts/access-control";

import {
  LEAVES_GET,
  LEAVE_ADD,
  LEAVE_STATISTICS_GET,
  LEAVE_STATUSES_GET,
  LEAVE_TYPES_GET,
} from "lib/features";

import DrawerAnnualLeave from "../../../components/drawer/attendance/drawerAnnualLeave";
import {
  AddNoteSvg,
  EyeIconSvg,
  SettingsIconSvg,
} from "../../../components/icon";
import Layout from "../../../components/layout-dashboard-management";
import st from "../../../components/layout-dashboard-management.module.css";
import ModalPengajuanCuti from "../../../components/modal/attendance/modalPengajuanCuti";
import ModalSetujuiCuti from "../../../components/modal/attendance/modalSetujuiCuti";
import ModalTipeCuti from "../../../components/modal/attendance/modalTipeCuti";
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
  const [showDrawerCutiSatuan, setShowDrawerCutiSatuan] = useState(false);
  const [displayDataLeaves, setDisplayDataLeaves] = useState({
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
  const [dataAnnualLeave, setDataAnnualLeave] = useState([]);
  const [dataStatusCuti, setDataStatusCuti] = useState([]);
  const [dataStatusPengajuan, setDataStatusPengajuan] = useState([]);
  const isAllowedToManageLeaveTypes = hasPermission(LEAVE_TYPES_GET);
  const isAllowedToAddLeave = hasPermission(LEAVE_ADD);
  const isAllowedToGetLeave = hasPermission(LEAVES_GET);
  const isAllowedToGetLeaveStatus = hasPermission(LEAVE_STATUSES_GET);
  const isAllowedToGetLeaveStatics = hasPermission(LEAVE_STATISTICS_GET);
  const [dataDefault, setDataDefault] = useState(null);
  useEffect(() => {
    fetchData();
  }, [queryParams.page, queryParams.rows]);

  useEffect(() => {
    fetchDataStatus();
    fetchDataStatusPengajuan();
  }, []);

  const fetchData = async () => {
    if (!isAllowedToGetLeave) {
      permissionWarningNotification("Mendapatkan", "Data Cuti");
    } else {
      const params = QueryString.stringify(queryParams, {
        addQueryPrefix: true,
      });
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getLeaves${params}`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          setDisplayDataLeaves(res2.data); // table-related data source
          setDataAnnualLeave(res2.data.data);
        });
    }
  };

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

  const columns = [
    {
      title: "Nama Karyawan",
      dataIndex: "nama",
      key: "nama",
      render: (text, record, index) => <p>{record.employee?.name}</p>,
    },
    {
      title: "Tanggal Awal Cuti",
      dataIndex: "start_date",
      key: "start_date",
      render: (text, record, index) => (
        <p>{moment(record.start_date).format("DD MMMM YYYY")}</p>
      ),
    },
    {
      title: "Tanggal Pengajuan Cuti",
      dataIndex: "issued_date",
      key: "issued_date",
      render: (text, record, index) => (
        <p>{moment(record.issued_date).format("DD MMMM YYYY")}</p>
      ),
    },
    {
      title: "Durasi Cuti",
      dataIndex: "durasi_cuti",
      key: "durasi_cuti",
      render: (text, record, index) => (
        <p>
          {moment(record.end_date).diff(moment(record.start_date), "days")} Hari
        </p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      align: `center`,
      render: (text, record, index) => {
        return {
          children: (
            <div className={"flex gap-8 justify-center"}>
              <div
                className={`${
                  record.status == 1
                    ? "bg-[#E6E6E6]"
                    : record.status == 2
                    ? "bg-[#35763B]"
                    : "bg-[#BF4A40]"
                } py-1 px-4 max-w-max rounded-[5px]`}
              >
                <p
                  className={`${
                    record.status == 2
                      ? "text-[#F3F3F3]"
                      : record.status == 1
                      ? "text-[#4D4D4D]"
                      : "text-white"
                  } leading-4 text-[10px] font-medium`}
                >
                  {record.status == 1
                    ? "Pending"
                    : record.status == 2
                    ? "Diterima"
                    : "Ditolak"}
                </p>
              </div>
              <div
                onClick={() => detailCuti(record)}
                className={"hover:cursor-pointer"}
              >
                <EyeIconSvg size={16} />
              </div>
            </div>
          ),
        };
      },
    },
  ];

  const [showDrawer, setShowDrawer] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalTipeCuti, setModalTipeCuti] = useState(false);

  const closeModalAdd = () => {
    setModalAdd(false);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
  };
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
                        data: dataStatusCuti,
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
                        {dataStatusCuti.length > 0 ? dataStatusCuti[0] : "-"}
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
                        {dataStatusCuti.length > 0 ? dataStatusCuti[1] : "-"}
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
                        {dataStatusCuti.length > 0 ? dataStatusCuti[2] : "-"}
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
                        data: dataStatusPengajuan,
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
                      {dataStatusPengajuan.length > 0
                        ? dataStatusPengajuan[0]
                        : "-"}
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
                      {dataStatusPengajuan.length > 0
                        ? dataStatusPengajuan[1]
                        : "-"}
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
              {isAllowedToManageLeaveTypes && (
                <div
                  onClick={() => setModalTipeCuti(true)}
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
              )}
              {isAllowedToAddLeave && (
                <div
                  onClick={() => setModalAdd(true)}
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
              )}
            </div>
          </div>
          <div className={"mt-6"}>
            <Table
              columns={columns}
              dataSource={dataAnnualLeave}
              pagination={{
                current: queryParams.page,
                pageSize: queryParams.rows,
                total: displayDataLeaves.total,
              }}
              onChange={(pagination, _, sorter) => {
                setQueryParams({
                  page: pagination.current,
                  rows: pagination.pageSize,
                });
              }}
            />
          </div>
          <DrawerAnnualLeave
            dataDefault={dataDefault}
            visible={showDrawer}
            closeDrawer={closeDrawer}
            initProps={initProps}
            fetchData={fetchData}
          />
          <ModalPengajuanCuti
            visible={modalAdd}
            onClose={closeModalAdd}
            setShowDrawerCutiSatuan={() => setShowDrawerCutiSatuan(true)}
          />
          <DrawerCutiSatuan
            dataToken={initProps}
            visible={showDrawerCutiSatuan}
            onCancel={() => setShowDrawerCutiSatuan(false)}
          />
          <ModalSetujuiCuti />
          <ModalTipeCuti
            visible={modalTipeCuti}
            onClose={() => setModalTipeCuti(false)}
            initProps={initProps}
          />
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
