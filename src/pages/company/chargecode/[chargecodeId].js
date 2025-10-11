import { Button, Input, Table, notification } from "antd";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import Link from "next/link";
import { useRouter } from "next/router";
import QueryString from "qs";
import { useEffect, useMemo, useState } from "react";

import ModalAttendanceCode from "components/modal/company/modalAttendanceCode";

// import enUS from 'antd/es/calendar/locale/en_US';
import { useAccessControl } from "contexts/access-control";

import { WORKDAYS_GET } from "lib/features";

import DrawerAddChargeCode from "../../../components/drawer/companies/chargecode/drawerAddChargeCode";
import {
  EditTablerIconSvg,
  EyeIconSvg,
  PlusIconSvg,
  TrashIconSvg,
} from "../../../components/icon";
import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

const ChargeCodeDetail = ({
  initProps,
  dataProfile,
  sidemenu,
  chargeCodeId,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const [showDrawerAdd, setShowDrawerAdd] = useState(false);
  const [searchingFilterWorkingDays, setSearchingFilterWorkingDays] =
    useState("");
  const isAllowedToGetWorkdays = hasPermission(WORKDAYS_GET);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [companyName, setCompanyName] = useState(null);
  const [dataRawWorkDay, setDataRawWorkDay] = useState({
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
  const tok = initProps;
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
  });
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  const [datatable, setdatatable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowstate, setrowstate] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const columnChargeCode = [
    {
      title: "No",
      key: "num",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              {dataRawWorkDay?.from + index}
            </div>
          ),
        };
      },
    },
    {
      title: "Code Name",
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
      title: "Description",
      key: "workdays_count",
      width: 200,
      //   sorter: true,
      dataIndex: "workdays_count",
      render: (text, record, index) => {
        return {
          children: <>{text} schedules</>,
        };
      },
    },
    {
      title: "Attendance Code",
      key: "employees_count",
      dataIndex: "employees_count",
      sorter: true,
      render: (text, record, index) => {
        return {
          children: (
            <div className={"flex flex-row gap-3"}>
              <div className={"bg-[#35763B1A] px-2.5 py-0.5 rounded-[100px]"}>
                <p className={"text-[#35763B] text-xs/5 font-bold font-inter"}>
                  Present
                </p>
              </div>
              <div className={"bg-[#00589F1A] px-2.5 py-0.5 rounded-[100px]"}>
                <p className={"text-[#00589F] text-xs/5 font-bold font-inter"}>
                  Overtime
                </p>
              </div>
              <div className={"bg-[#F5851E1A] px-2.5 py-0.5 rounded-[100px]"}>
                <p className={"text-[#F5851E] text-xs/5 font-bold font-inter"}>
                  Paid Leave
                </p>
              </div>
              <div className={"bg-[#BF4A401A] px-2.5 py-0.5 rounded-[100px]"}>
                <p className={"text-[#BF4A40] text-xs/5 font-bold font-inter"}>
                  Unpaid Leave
                </p>
              </div>
            </div>
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
                className={"hover:cursor-pointer"}
                onClick={() => setShowModal(true)}
              >
                <EyeIconSvg size={20} color={"#808080"} />
              </div>
              <Link href={`/company/workdayschedule/edit/${record.id}`}>
                <EditTablerIconSvg size={20} color={"#808080"} />
              </Link>

              <Link href={`/company/chargecode/${record.id}`}>
                <TrashIconSvg size={20} color={"#BF4A40"} />
              </Link>
            </div>
          ),
        };
      },
    },
  ];
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 1, "Detail Company");
  const breadcrumbValues = useMemo(() => {
    const pageBreadcrumbValue = [
      { name: "Charge Code", hrefValue: "/company/chargecode" },
      { name: "Manage Charge Code" },
    ];

    // if (companyName) {
    //   pageBreadcrumbValue.push({ name: companyName });
    // }

    return pageBreadcrumbValue;
  }, [companyName]);

  useEffect(() => {
    fetchDataDetail();
  }, [isAllowedToGetWorkdays]);

  const fetchDataDetail = async () => {
    try {
      // setLoading(true);
      if (!isAllowedToGetWorkdays) {
        permissionWarningNotification("Mendapatkan", "Get Work Days Data");
        return;
      }
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getWorkdays?company_id=${chargeCodeId}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          // console.log('res2 work day ', res2)
          setCompanyName(res2.data.company_name);
          // let datatemp = res2.data.workdays;
          // if (datatemp.length > 0) {
          //   // fetchDataDetailStatistic(datatemp[0].id)
          //   setDataWorkDay(datatemp);
          //   setActive({
          //     id: datatemp[0].id,
          //     name: datatemp[0].name,
          //     company_id: datatemp[0].company_id,
          //   });
          //   setDataSchedule(datatemp[0].schedule);
          //   setWorkHours(datatemp[0].schedule);
          // } else {
          //   setDataWorkDay([]);
          //   setActive({
          //     ...active,
          //     id: null,
          //     name: null,
          //     company_id: null,
          //   });
          //   setWorkHours([]);
          // }
          // let dataholidays = res2.data
          // setCutiBersamaOptions(dataholidays.filter(item => item.is_cuti === 1))
          // setLiburNasionalOptions(dataholidays.filter(item => item.is_cuti === 0))
        });
    } catch (err) {
      // setError(err.message || "Something went wrong");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const fetchData = async () => {
      //   if (!isAllowedToGetCompanyWorkday) {
      //     permissionWarningNotification("Mendapatkan", "Daftar Company Workday");
      //     // setloaddatatable(false);
      //     return;
      //   }
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getWorkdayCompanies${payload}&keyword=${searchingFilterWorkingDays}`,
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
            // console.log('isi datanya ',res2)
            setDataRawWorkDay(res2.data);
            setdatatable(res2.data.data);
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
    // isAllowedToGetCompanyWorkday,
    searchingFilterWorkingDays,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
  ]);

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      pathArr={pathTitleArr}
      st={st}
      idpage={chargeCodeId}
      fixedBreadcrumbValues={breadcrumbValues}
    >
      <div className="lg:col-span-3 flex flex-col rounded-[10px] border border-neutrals70 shadow-desktopCard bg-white">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between px-4 pt-4 pb-3 ">
          <h4 className="text-[14px] leading-6 text-mono30 font-bold mb-2 md:mb-0">
            {companyName || "-"}
          </h4>
          <Button
            type={"primary"}
            onClick={() => setShowDrawerAdd(true)}
            className="btn btn-sm text-white font-semibold px-2 py-2 border 
                        bg-primary100 hover:bg-primary75 border-primary100 
                        hover:border-primary75 focus:bg-primary100 focus:border-primary100 
                        flex-nowrap w-full md:w-fit"
            icon={<PlusIconSvg size={16} color="#FFFFFF" />}
          >
            Create Charge Code
          </Button>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between w-full px-4 md:items-center mb-4 border-b pb-3">
          <div className="w-full md:w-full">
            <Input
              defaultValue={searchingFilterWorkingDays}
              style={{ width: `100%` }}
              placeholder="Search Code's Name..."
              allowClear
              onChange={(e) => {
                setSearchingFilterWorkingDays(e.target.value);
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
        <div className={"px-4"}>
          <Table
            dataSource={datatable}
            columns={columnChargeCode}
            rowKey={(record) => record.id}
            loading={loading}
            scroll={{ x: 200 }}
            pagination={{
              current: queryParams.page,
              pageSize: queryParams.rows,
              total: 10,
              showSizeChanger: true,
            }}
            onChange={(pagination, filters, sorter, extra) => {
              const sortTypePayload =
                sorter.order === "ascend"
                  ? "asc"
                  : sorter.order === "descend"
                  ? "desc"
                  : undefined;

              setQueryParams({
                sort_type: sortTypePayload,
                sort_by:
                  sortTypePayload === undefined ? undefined : sorter.field,
                page: pagination.current,
                rows: pagination.pageSize,
              });
            }}
            onRow={(record, rowIndex) => {
              return {
                //   onMouseOver: () => {
                //     setrowstate(record.id);
                //   },
                // onClick: () => {
                //   !isBulk && setDrawerShown(true);
                //   tempIdClicked.current = record.id;
                //   setTriggerRowClicked((prev) => prev + 1);
                // },
              };
            }}
            rowClassName={(record, idx) => {
              return `${record.id === rowstate && `cursor-pointer`}
                        }`;
            }}
          />
        </div>
        <DrawerAddChargeCode
          visible={showDrawerAdd}
          onvisible={setShowDrawerAdd}
          initProps={initProps}
          isAllowedToAddCompany={true}
          setLoadingCreate={setLoadingCreate}
          loadingCreate={loadingCreate}
        />

        <ModalAttendanceCode
          visible={showModal}
          onClose={() => setShowModal(false)}
          initProps={initProps}
        />
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const chargeCodeId = params.chargecodeId;
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
      sidemenu: "workdayschedule",
      chargeCodeId,
    },
  };
}

export default ChargeCodeDetail;
