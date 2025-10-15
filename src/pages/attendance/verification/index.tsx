import { CalendarOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Table,
  notification,
} from "antd";
import { SorterResult } from "antd/lib/table/interface";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import Link from "next/link";
import QueryString from "qs";
import { useEffect, useState } from "react";

import { CheckIconSvg, CloseIconSvg, EyeIconSvg } from "components/icon";
import LayoutDashboard from "components/layout-dashboard";

import { useAccessControl } from "contexts/access-control";

import {
  EMPLOYEE_LEAVE_QUOTAS_GET,
  EMPLOYEE_LEAVE_QUOTA_ADD,
  EMPLOYEE_LEAVE_QUOTA_DELETE,
  EMPLOYEE_LEAVE_QUOTA_UPDATE,
  RECRUITMENT_ROLES_LIST_GET,
} from "lib/features";

import { LeaveStatus } from "apis/attendance";

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
import httpcookie from "cookie";

import { PageBreadcrumbValue } from "types/common";

Chart.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

const AttendanceVerificationIndex = ({ initProps, dataProfile, sidemenu }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const { RangePicker } = DatePicker;
  //1.Init
  // Breadcrumb title
  const pageBreadcrumb: PageBreadcrumbValue[] = [
    {
      name: "Employee Attendance Verification",
    },
  ];

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"status"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    role_ids: withDefault(StringParam, undefined),
  });

  const [theForm] = Form.useForm();

  let timer: NodeJS.Timeout; // use for delay time in table's search

  const [displayDataVerification, setDisplayDataVerification] = useState({
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
  const [dataVerification, setDataVerification] = useState([]);
  const [searchingFilterEmployee, setSearchingFilterEmployee] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);
  const columns: typeof dataVerification = [
    {
      title: "No",
      key: "num",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              {displayDataVerification?.from + index}
            </div>
          ),
        };
      },
    },
    {
      title: "Employee Name",
      key: "name",
      dataIndex: "name",
      sorter: true,
      render: (text, record, index) => {
        return {
          children: (
            <div className="xl:w-40">{record.name ? record.name : ""}</div>
          ),
        };
      },
    },
    {
      title: "Attendance Code",
      key: "charge_codes_count",
      width: 200,
      sorter: true,
      dataIndex: "charge_codes_count",
      render: (text, record, index) => {
        return {
          children: <>{text} Charge Code</>,
        };
      },
    },
    {
      title: "Company",
      key: "employees_count",
      dataIndex: "employees_count",
      render: (text, record, index) => {
        return {
          children: <>{text} employees</>,
        };
      },
    },
    {
      title: "Issued Date",
      key: "employees_count",
      dataIndex: "employees_count",
      sorter: true,
      render: (text, record, index) => {
        return {
          children: <>{text} employees</>,
        };
      },
    },
    {
      title: "Supporting File",
      key: "employees_count",
      dataIndex: "employees_count",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <a
                key={index}
                href={"www.google.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 h-11 flex items-center text-[#1D4ED8] hover:underline hover:text-[#2563EB]"
              >
                filename.pdf
              </a>
            </>
          ),
        };
      },
    },
    {
      title: "Action",
      key: "button_action",
      width: 50,
      render: (text, record) => {
        return {
          children: (
            <div className="flex flex-row gap-2">
              <div
                className={
                  "flex justify-center items-center hover:cursor-pointer bg-primary100 rounded-[4px] h-7 w-7"
                }
              >
                <CheckIconSvg size={20} color={"white"} />
              </div>
              <div
                className={
                  "flex justify-center items-center hover:cursor-pointer bg-state1 rounded-[4px] h-7 w-7"
                }
              >
                <CloseIconSvg size={20} color={"white"} />
              </div>
            </div>
          ),
        };
      },
    },
  ];

  const columnsHistory: typeof dataVerification = [
    {
      title: "No",
      key: "num",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              {displayDataVerification?.from + index}
            </div>
          ),
        };
      },
    },
    {
      title: "Employee Name",
      key: "name",
      dataIndex: "name",
      sorter: true,
      render: (text, record, index) => {
        return {
          children: (
            <div className="xl:w-40">{record.name ? record.name : ""}</div>
          ),
        };
      },
    },
    {
      title: "Attendance Code",
      key: "charge_codes_count",
      width: 200,
      sorter: true,
      dataIndex: "charge_codes_count",
      render: (text, record, index) => {
        return {
          children: <>{text} Charge Code</>,
        };
      },
    },
    {
      title: "Company",
      key: "employees_count",
      dataIndex: "employees_count",
      render: (text, record, index) => {
        return {
          children: <>{text} employees</>,
        };
      },
    },
    {
      title: "Issued Date",
      key: "employees_count",
      dataIndex: "employees_count",
      sorter: true,
      render: (text, record, index) => {
        return {
          children: <>{text} employees</>,
        };
      },
    },
    {
      title: "Supporting File",
      key: "employees_count",
      dataIndex: "employees_count",
      render: (text, record, index) => {
        return {
          children: (
            <>
              <a
                key={index}
                href={"www.google.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 h-11 flex items-center text-[#1D4ED8] hover:underline hover:text-[#2563EB]"
              >
                filename.pdf
              </a>
            </>
          ),
        };
      },
    },
    {
      title: "Action",
      key: "button_action",
      width: 50,
      render: (text, record) => {
        return {
          children: (
            <div className="flex flex-row gap-2">
              <div
                className={
                  "flex justify-center items-center hover:cursor-pointer bg-primary100 rounded-[4px] h-7 w-7"
                }
              >
                <CheckIconSvg size={20} color={"white"} />
              </div>
              <div
                className={
                  "flex justify-center items-center hover:cursor-pointer bg-state1 rounded-[4px] h-7 w-7"
                }
              >
                <CloseIconSvg size={20} color={"white"} />
              </div>
            </div>
          ),
        };
      },
    },
    {
      title: "Status",
      key: "employees_count",
      dataIndex: "employees_count",
      sorter: true,
      render: (text, record, index) => {
        return {
          children: <>{text} employees</>,
        };
      },
    },
  ];

  useEffect(() => {
    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const fetchData = async () => {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getChargeCodeCompanies${payload}&keyword=${searchingFilterEmployee}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          if (res2.success) {
            setDisplayDataVerification(res2.data);
            setDataVerification(res2.data.data);
          } else {
            notification.error({
              message: `${res2.message}`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
        })
        .finally(() => setLoading(false));
    };

    const timer = setTimeout(() => fetchData(), 500);

    return () => clearTimeout(timer);
  }, [
    queryParams.page,
    searchingFilterEmployee,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
  ]);

  return (
    <LayoutDashboard
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      fixedBreadcrumbValues={pageBreadcrumb}
    >
      <div className="lg:col-span-3 flex flex-col rounded-[10px] border border-neutrals70 shadow-desktopCard bg-white">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between px-4 pt-4 pb-3 ">
          <h4 className="text-[14px] leading-6 text-mono30 font-bold mb-2 md:mb-0">
            Employee List
          </h4>
        </div>
        <div className={"border-b mb-4"}>
          <div className={"px-4 flex"}>
            <div
              onClick={() => (activeTab != "1" ? setActiveTab("1") : "")}
              className={`hover:cursor-pointer px-3 pb-2 ${
                activeTab == "1"
                  ? "border-b-2 border-[#35763B] text-[#35763B] font-bold "
                  : "text-[#808080] font-normal"
              } font-inter text-sm/6`}
            >
              <p>Perlu Diverifikasi</p>
            </div>
            <div
              onClick={() => (activeTab != "2" ? setActiveTab("2") : "")}
              className={` hover:cursor-pointer px-3 pb-2 ${
                activeTab == "2"
                  ? "border-b-2 border-[#35763B] text-[#35763B] font-bold "
                  : "text-[#808080] font-normal"
              } font-inter text-sm/6`}
            >
              <p>Riwayat</p>
            </div>
          </div>
        </div>
        {activeTab == "1" ? (
          <div>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between w-full px-4 md:items-center mb-4 pb-3">
              <div className="w-full md:w-full">
                <Input
                  defaultValue={searchingFilterEmployee}
                  style={{ width: `100%` }}
                  placeholder="Search Employee..."
                  allowClear
                  onChange={(e) => {
                    setSearchingFilterEmployee(e.target.value);
                    setQueryParams({ page: 1 });
                  }}
                  //   onChange={(e) => {
                  //     setSearchingFilterRecruitments(e.target.value);
                  //     setQueryParams({ page: 1 });
                  //   }}
                  //   onKeyPress={onKeyPressHandler}
                  //   disabled={!isAllowedToGetRecruitments}
                />
              </div>
            </div>
            <div className={"px-4 "}>
              <Table
                columns={columns}
                dataSource={dataVerification}
                pagination={{
                  current: queryParams.page,
                  pageSize: queryParams.rows,
                  total: displayDataVerification?.total,
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
                //   onRow={(datum, rowIndex) => {
                //     return {
                //       className: "hover:cursor-pointer",
                //       onClick: () => detailCuti(datum),
                //     };
                //   }}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between w-full px-4 md:items-center mb-4 pb-3">
              <div className="w-full md:w-full">
                <Input
                  defaultValue={searchingFilterEmployee}
                  style={{ width: `100%` }}
                  placeholder="Search Employee..."
                  allowClear
                  onChange={(e) => {
                    setSearchingFilterEmployee(e.target.value);
                    setQueryParams({ page: 1 });
                  }}
                  //   onChange={(e) => {
                  //     setSearchingFilterRecruitments(e.target.value);
                  //     setQueryParams({ page: 1 });
                  //   }}
                  //   onKeyPress={onKeyPressHandler}
                  //   disabled={!isAllowedToGetRecruitments}
                />
              </div>
            </div>
            <div className={"px-4 "}>
              <Table
                columns={columnsHistory}
                dataSource={dataVerification}
                pagination={{
                  current: queryParams.page,
                  pageSize: queryParams.rows,
                  total: displayDataVerification?.total,
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
                //   onRow={(datum, rowIndex) => {
                //     return {
                //       className: "hover:cursor-pointer",
                //       onClick: () => detailCuti(datum),
                //     };
                //   }}
              />
            </div>
          </div>
        )}
      </div>
    </LayoutDashboard>
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
      sidemenu: "attendance/verification",
    },
  };
}

export default AttendanceVerificationIndex;
