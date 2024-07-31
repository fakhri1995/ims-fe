import { DatePicker, Form, Input, Select, Table } from "antd";
import { SorterResult } from "antd/lib/table/interface";
import moment from "moment";
import {
  DateParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import QueryString from "qs";
import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import ButtonSys from "components/button";
import DrawerCutiSatuan from "components/drawer/attendance/drawerCutiSatuan";
import {
  AddNoteSvg,
  AdjusmentsHorizontalIconSvg,
  CirclePlusIconSvg,
  EyeIconSvg,
  SettingsIconSvg,
} from "components/icon";
import ModalPengajuanCuti from "components/modal/attendance/modalPengajuanCuti";
import { AttendanceAdminLeaveStatisticCards } from "components/screen/attendance/leave/AttendanceAdminLeaveStatisticCards";
import BadgeLeaveStatus from "components/screen/attendance/leave/BadgeLeaveStatus";

import { useAccessControl } from "contexts/access-control";

import {
  LEAVES_GET,
  LEAVE_ADD,
  LEAVE_STATISTICS_GET,
  LEAVE_STATUSES_GET,
  LEAVE_TYPES_GET,
} from "lib/features";

import { LeaveStatus } from "apis/attendance";

import DrawerAnnualLeave from "../../../components/drawer/attendance/drawerAnnualLeave";
import Layout from "../../../components/layout-dashboard-management";
import st from "../../../components/layout-dashboard-management.module.css";
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
    sort_by: withDefault(StringParam, /** @type {"status"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    keyword: withDefault(StringParam, ""),
    date: withDefault(DateParam, undefined),
    status: withDefault(StringParam, undefined),
  });

  let timer: NodeJS.Timeout; // use for delay time in table's search

  const leaveStatuses = [
    {
      label: "Pending",
      value: LeaveStatus.PENDING,
    },
    {
      label: "Accepted",
      value: LeaveStatus.ACCEPTED,
    },
    {
      label: "Rejected",
      value: LeaveStatus.REJECTED,
    },
  ];

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
  const [dataDefault, setDataDefault] = useState(null);
  useEffect(() => {
    fetchData();
  }, [queryParams.page, queryParams.rows]);

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
          setDataAnnualLeave(res2?.data?.data);
        });
    }
  };

  const detailCuti = (record) => {
    setShowDrawer(true);
    setDataDefault(record);
  };

  const columns: typeof dataAnnualLeave = [
    {
      title: "No.",
      dataIndex: "num",
      align: "center",
      render: (text, record, index) => {
        return {
          children: <>{Number(displayDataLeaves?.from + index)}</>,
        };
      },
    },
    {
      title: "Employee Name",
      dataIndex: ["employee", "name"],
      key: "employee_name",
      width: 100,
      render: (text, record, index) => (
        <p className="whitespace-nowrap truncate w-32" title={text}>
          {text}
        </p>
      ),
    },
    {
      title: "Role",
      dataIndex: ["employee", "contract", "role", "alias"],
      key: "role",
      align: "center",
      render: (text, record, index) => (
        <p className="whitespace-nowrap truncate">{text}</p>
      ),
    },
    {
      title: "Leave Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (text, record, index) => (
        <p className="whitespace-nowrap truncate">
          {moment(text).format("D MMMM YYYY")}
        </p>
      ),
      sorter: isAllowedToGetLeave
        ? (a, b) => a?.start_date?.localeCompare(b?.start_date)
        : false,
    },
    {
      title: "Issued Date",
      dataIndex: "issued_date",
      key: "issued_date",
      render: (text, record, index) => (
        <p className="whitespace-nowrap truncate">
          {moment(text).format("D MMMM YYYY")}
        </p>
      ),
      sorter: isAllowedToGetLeave
        ? (a, b) => a?.issued_date?.localeCompare(b?.issued_date)
        : false,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (text, record, index) => <p>{text} days</p>,
    },
    {
      title: "Leave Type",
      dataIndex: ["type", "name"],
      key: "type",
      render: (text, record, index) => (
        <p className="whitespace-nowrap truncate">{text}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: `center`,
      render: (text, record, index) => {
        return {
          children: (
            <div className={"flex justify-center"}>
              <BadgeLeaveStatus status={record.status} />
            </div>
          ),
        };
      },
      sorter: isAllowedToGetLeave
        ? (a, b) => {
            const dataStatusListIds = leaveStatuses?.map(
              (status) => status.value
            );
            const indexA = dataStatusListIds?.indexOf(Number(a?.status));
            const indexB = dataStatusListIds?.indexOf(Number(b?.status));
            return indexA - indexB;
          }
        : false,
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
      <div className="grid grid-cols-1 gap-5" id="mainWrapper">
        <AttendanceAdminLeaveStatisticCards dataToken={initProps} />

        <div className={"mig-platform--p-0 flex flex-col"}>
          <div
            className={
              "flex w-full justify-between items-center py-3 px-4 border-b"
            }
          >
            <p className="mig-body--bold ">List of Leave Requests</p>
            <div className={"flex flex-col sm:flex-row gap-4 items-end"}>
              <ButtonSys
                square
                type="primary"
                color="mono100"
                onClick={() => setModalTipeCuti(true)}
                disabled={!isAllowedToManageLeaveTypes}
              >
                <AdjusmentsHorizontalIconSvg
                  className="text-neutrals100"
                  size={20}
                />
              </ButtonSys>

              <ButtonSys
                type="primary"
                onClick={() => setModalAdd(true)}
                disabled={!isAllowedToAddLeave}
              >
                <div className="flex items-center gap-2 text-white whitespace-nowrap">
                  <CirclePlusIconSvg size={20} />
                  <p>Apply Leave Request</p>
                </div>
              </ButtonSys>
            </div>
          </div>
          {/* Table's filter */}
          <div className="px-4 py-3">
            <Form
              className="flex flex-col sm:flex-row w-full sm:justify-between sm:items-center gap-2"
              onFinish={(values) => {
                setQueryParams({ keyword: values.search, page: 1 });
              }}
            >
              <div className="sm:w-2/4">
                <Form.Item noStyle name="search">
                  <Input
                    placeholder="Search employee's name..."
                    disabled={!isAllowedToGetLeave}
                    allowClear
                    className="w-full"
                    onChange={(event) => {
                      if (
                        event.target.value.length === 0 ||
                        event.target.value === ""
                      ) {
                        setQueryParams({ keyword: "" });
                      } else {
                        clearTimeout(timer);
                        timer = setTimeout(() => {
                          setQueryParams({ keyword: event.target.value });
                        }, 500);
                      }
                    }}
                  />
                </Form.Item>
              </div>
              <div className="sm:w-1/4">
                <Form.Item noStyle>
                  <DatePicker
                    allowClear
                    className="w-full"
                    defaultValue={queryParams.date}
                    disabled={!isAllowedToGetLeave}
                    placeholder="Select Date"
                    onChange={(value) => {
                      setQueryParams({ date: value, page: 1 });
                    }}
                  />
                </Form.Item>
              </div>
              <div className="sm:w-1/4">
                <Form.Item noStyle>
                  <Select
                    allowClear
                    className="w-full"
                    defaultValue={queryParams.status}
                    disabled={!isAllowedToGetLeaveStatus}
                    placeholder="Status"
                    onChange={(value) => {
                      setQueryParams({ status: value, page: 1 });
                    }}
                  >
                    {leaveStatuses?.map((item) => (
                      <Select.Option key={item.label} value={item.value}>
                        <BadgeLeaveStatus status={item.value} />
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </Form>
          </div>
          <div className={"mt-6 px-4 "}>
            <Table
              columns={columns}
              dataSource={dataAnnualLeave}
              pagination={{
                current: queryParams.page,
                pageSize: queryParams.rows,
                total: displayDataLeaves?.total,
                showSizeChanger: true,
              }}
              scroll={{ x: "max-content" }}
              onChange={(pagination, _, sorter: SorterResult<any>) => {
                const sortTypePayload =
                  sorter.order === "ascend"
                    ? "asc"
                    : sorter.order === "descend"
                    ? "desc"
                    : undefined;

                setQueryParams({
                  page: pagination.current,
                  rows: pagination.pageSize,
                  sort_type: sortTypePayload,
                  sort_by:
                    sortTypePayload === undefined ? undefined : sorter.field,
                });
              }}
              onRow={(datum, rowIndex) => {
                return {
                  className: "hover:cursor-pointer",
                  onClick: () => detailCuti(datum),
                };
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
            onCancel={() => {
              setShowDrawerCutiSatuan(false);
              closeModalAdd();
            }}
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
  var initProps = "";
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
