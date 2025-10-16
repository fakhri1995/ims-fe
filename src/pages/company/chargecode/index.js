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
import { useEffect, useRef, useState } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  CHARGE_CODES_COMPANY_ADD,
  CHARGE_CODE_COMPANIES_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import DrawerCompanyAddChargeCode from "../../../components/drawer/companies/chargecode/drawerCompanyAddChargeCode";
import {
  EditTablerIconSvg,
  EyeIconSvg,
  PlusIconSvg,
} from "../../../components/icon";
import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

function ChargeCodeIndex({ initProps, dataProfile, sidemenu }) {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetChargeCodeCompany = hasPermission(
    CHARGE_CODE_COMPANIES_GET
  );
  const isAllowedToAddChargeCodeCompany = hasPermission(
    CHARGE_CODES_COMPANY_ADD
  );
  const rt = useRouter();

  const tok = initProps;
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 1, "Workday Schedule");
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
  });
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [showDrawerAdd, setShowDrawerAdd] = useState(false);
  const [showDrawerEdit, setShowDrawerEdit] = useState(false);
  const [idCompany, setIdCompany] = useState(null);
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
  const [searchingFilterWorkingDays, setSearchingFilterWorkingDays] =
    useState("");
  const [loading, setLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(-1);
  const columnWorkDay = [
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
      title: "Company Name",
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
      title: "Total Attendance Code",
      key: "attendance_codes_count",
      // width: 200,
      sorter: true,
      dataIndex: "attendance_codes_count",
      render: (text, record, index) => {
        return {
          children: <>{text} Attendance Code</>,
        };
      },
    },
    {
      title: "Total Charge Code",
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
      title: "Employees Total",
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
      title: "Action",
      key: "button_action",
      width: 50,
      render: (text, record) => {
        return {
          children: (
            <div className="flex flex-row gap-2">
              {/* <div
                className={"hover:cursor-pointer"}
                onClick={() => handleEdit(record)}
              >
                <EditTablerIconSvg size={20} color={"#808080"} />
              </div> */}
              <Link href={`/company/chargecode/${record.id}`}>
                <EyeIconSvg size={20} color={"#808080"} />
              </Link>
            </div>
          ),
        };
      },
    },
  ];
  const [datatable, setdatatable] = useState([]);
  const pageBreadcrumbValue = [
    // { name: "Company", hrefValue: "/company/clients" },
    { name: "Attendance & Charge Code" },
  ];

  const handleEdit = (record) => {
    setIdCompany(record.id);
    setShowDrawerEdit(true);
  };
  useEffect(() => {
    const payload = QueryString.stringify(queryParams, {
      addQueryPrefix: true,
    });

    const fetchData = async () => {
      if (!isAllowedToGetChargeCodeCompany) {
        permissionWarningNotification(
          "Mendapatkan",
          "Daftar Company Charge C0de"
        );
        // setloaddatatable(false);
        return;
      }
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getChargeCodeCompanies${payload}&keyword=${searchingFilterWorkingDays}`,
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
    isAllowedToGetChargeCodeCompany,
    searchingFilterWorkingDays,
    queryParams.rows,
    queryParams.sort_by,
    queryParams.sort_type,
    isRefresh != -1,
  ]);

  const [rowstate, setrowstate] = useState(0);

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      pathArr={pathArr}
      fixedBreadcrumbValues={pageBreadcrumbValue}
      st={st}
    >
      {/* <div className="lg:col-span-3 flex flex-col px-4 pt-3 pb-0 border-neutrals70 bg-white">
        <Calendar
          fullscreen={true}
          // headerRender={headerRender}
          dateFullCellRender={dateFullCellRender}
        />
      </div> */}
      <div className="lg:col-span-3 flex flex-col rounded-[10px] border border-neutrals70 shadow-desktopCard bg-white">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between px-4 pt-4 pb-3 ">
          <h4 className="text-[14px] leading-6 text-mono30 font-bold mb-2 md:mb-0">
            Company List
          </h4>
          {isAllowedToAddChargeCodeCompany && (
            <Button
              type={"primary"}
              onClick={() => setShowDrawerAdd(true)}
              className="btn btn-sm text-white font-semibold px-2 py-2 border 
                        bg-primary100 hover:bg-primary75 border-primary100 
                        hover:border-primary75 focus:bg-primary100 focus:border-primary100 
                        flex-nowrap w-full md:w-fit"
              icon={<PlusIconSvg size={16} color="#FFFFFF" />}
            >
              Set Up Code
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between w-full px-4 md:items-center mb-4 border-b pb-3">
          <div className="w-full md:w-full">
            <Input
              defaultValue={searchingFilterWorkingDays}
              style={{ width: `100%` }}
              placeholder="Search Company's Name..."
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
          {/* <div className="w-full md:w-3/12">
            <Select
              //   defaultValue={queryParams.recruitment_role_id}
              allowClear
              name={`role`}
              //   disabled={!isAllowedToGetRecruitmentRolesList}
              placeholder="All work day type"
              style={{ width: `100%` }}
              //   onChange={(value) => {
              //     setQueryParams({ recruitment_role_id: value, page: 1 });
              //     setSelectedRoleId(value);
              //   }}
            >
              {dataWorkType.map((worktype) => (
                <Select.Option key={worktype.id} value={worktype.id}>
                  {worktype.name}
                </Select.Option>
              ))}
            </Select>
          </div> */}
        </div>
        <div className={"px-4"}>
          <Table
            dataSource={datatable}
            columns={columnWorkDay}
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
        <DrawerCompanyAddChargeCode
          visible={showDrawerAdd}
          onvisible={setShowDrawerAdd}
          initProps={initProps}
          isAllowedToAddChargeCodeCompany={isAllowedToAddChargeCodeCompany}
          setLoadingCreate={setLoadingCreate}
          loadingCreate={loadingCreate}
          setIsRefresh={setIsRefresh}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  var initProps = {};
  const reqBody = {
    page: 1,
    rows: 50,
    order_by: "asc",
  };
  if (req && req.headers) {
    const cookies = req.headers.cookie;
    if (!cookies) {
      res.writeHead(302, { Location: "/login" });
      res.end();
    }
    if (typeof cookies === "string") {
      const cookiesJSON = httpcookie.parse(cookies);
      initProps = cookiesJSON.token;
    }
  }
  const resourcesGP = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;
  return {
    props: {
      initProps,
      dataProfile,
      // dataCompanyList,
      // dataLocations,
      sidemenu: "chargecodes",
    },
  };
}

export default ChargeCodeIndex;
