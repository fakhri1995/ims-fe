import { Button, Calendar, Input, Select, Table } from "antd";
import axios from "axios";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { COMPANY_CLIENTS_GET, COMPANY_CLIENT_ADD } from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import DrawerCompanyAdd from "../../../components/drawer/companies/workdayschedule/drawerCompanyAdd";
import DrawerCompanyUpdate from "../../../components/drawer/companies/workdayschedule/drawerCompanyUpdate";
import {
  EditTablerIconSvg,
  EyeIconSvg,
  PlusIconSvg,
} from "../../../components/icon";
import Layout from "../../../components/layout-dashboard-management";
import st from "../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

function WorkdayScheduleIndex({ initProps, dataProfile, sidemenu }) {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetCompanyClientList = hasPermission(COMPANY_CLIENTS_GET);

  const rt = useRouter();

  const tok = initProps;
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 1, "Workday Schedule");
  // const pathArr = rt.pathname.split("/").slice(1);
  // pathArr.splice(1, 1);
  const specialDates = {
    "2025-08-17": {
      label: "HUT Kemerdekaan RI",
      bgColor: "#fde3cf",
    },
    "2025-08-18": {
      label: "Cuti Bersama\nKemerdekaan RI",
      bgColor: "#00589F19",
    },
    "2025-09-05": {
      label: "Maulid Nabi",
      bgColor: "#00589F19",
    },
  };
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    recruitment_role_id: withDefault(NumberParam, undefined),
    recruitment_stage_id: withDefault(NumberParam, undefined),
    recruitment_status_id: withDefault(NumberParam, undefined),
  });
  const [refresh, setRefresh] = useState(-1);
  const tempIdUpdate = useRef(-1);
  const [triggerUpdate, setTriggerUpdate] = useState(-1);
  // 2.2. Create Role
  const [isCreateDrawerShown, setCreateDrawerShown] = useState(false);
  const [isUpdateDrawerShown, setIsUpdateDrawerShown] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [holidaysArray, setHolidaysArray] = useState([]);
  const dataSource = [
    {
      key: "1",
      num: 1,
      name: "John Doe",
      type: "Full Day",
      total: 20,
    },
    {
      key: "2",
      num: 2,
      name: "Jane Smith",
      type: "Half Day",
      total: 12,
    },
    {
      key: "3",
      num: 3,
      name: "Michael Johnson",
      type: "Remote",
      total: 8,
    },
    {
      key: "4",
      num: 4,
      name: "Sarah Connor",
      type: "Shift",
      total: 15,
    },
  ];
  const dataWorkDayTypes = [
    {
      key: "1",
      id: 1,
      name: "Cuti Bersama dihitung kerja",
    },
    {
      key: "2",
      id: 2,
      name: "Mengikuti Peraturan Pemerintah",
    },
  ];
  const [loading, setLoading] = useState(false);
  const columnWorkDay = [
    {
      title: "No",
      key: "num",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <div className="flex justify-center">{text}</div>,
        };
      },
    },
    {
      title: "Company Name",
      key: "name",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: (
            <div className="xl:w-40">{record.name ? record.name : ""}</div>
          ),
        };
      },
    },
    {
      title: "Workday Type",
      key: "type",
      width: 200,
      dataIndex: "type",
      render: (text, record, index) => {
        return {
          children: <>{text}</>,
        };
      },
    },
    {
      title: "Workday(s) Total",
      key: "total",
      dataIndex: "total",
      render: (text, record, index) => {
        return {
          children: <>{text}</>,
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
                  "hover:cursor-pointer flex justify-center items-center"
                }
                onClick={(event) => {
                  event.stopPropagation();
                  tempIdUpdate.current = record.id;
                  setTriggerUpdate((prev) => prev + 1);
                  setIsUpdateDrawerShown(true);
                }}
              >
                <EditTablerIconSvg size={20} color={"#808080"} />
              </div>
              <Link href={`/company/workdayschedule/${record.id}`}>
                <EyeIconSvg size={20} color={"#808080"} />
              </Link>
            </div>
          ),
        };
      },
    },
  ];
  const [datatable, setdatatable] = useState([]);
  // const [datatable2, setdatatable2] = useState([]);
  const [loaddatatable, setloaddatatable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const res = await axios.get("https://dayoffapi.vercel.app/api");
        setHolidaysArray(res.data); // data dari API
      } catch (err) {
        // setError(err.message || "Something went wrong");
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  const holidays = holidaysArray.reduce((acc, item) => {
    acc[item.tanggal] = item;
    return acc;
  }, {});

  const dateFullCellRender = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const day = value.date();
    const isSunday = value.day() === 0;
    const holiday = holidaysArray.find(
      (item) => moment(item.tanggal).format("YYYY-MM-DD") === dateStr
    );

    let style = {
      borderTop: "1px solid #E6E6E6",
      boxSizing: "border-box",
      height: "100%",
      backgroundColor: isSunday ? "#F5851E19" : "inherit",
      color: isSunday ? "#4D4D4D" : "inherit",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      fontSize: 14,
      height: 85,
      marginRight: 8,
      paddingTop: 1,
    };

    if (holiday) {
      style.backgroundColor = holiday.is_cuti ? "#FFEBEE" : "#E3F2FD";
      style.color = "#4D4D4D";
    }

    return (
      <div style={style}>
        <div style={{ fontWeight: "bold", marginBottom: 4, textAlign: "left" }}>
          {day}
        </div>
        {holiday && (
          <div className="px-1" style={{ fontSize: 11, textAlign: "center" }}>
            {holiday.keterangan}
          </div>
        )}
      </div>
    );
  };

  const [refreshCompanyClientList, triggerRefreshCompanyClientList] =
    useState(0);

  //useEffect
  useEffect(() => {
    if (!isAllowedToGetCompanyClientList && !isAccessControlPending) {
      permissionWarningNotification("Mendapatkan", "Daftar Company Client");
      setloaddatatable(false);
      return;
    }

    setloaddatatable(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyClientList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdatatable(res2.data);
        // setdatatable2(res2.data);
        setloaddatatable(false);
      });
  }, [
    refreshCompanyClientList,
    isAllowedToGetCompanyClientList,
    isAccessControlPending,
  ]);

  const dataWorkType = [
    { id: 1, name: "Full Day" },
    { id: 2, name: "Half Day" },
    { id: 3, name: "Remote" },
    { id: 4, name: "Shift" },
    { id: 5, name: "Flexible" },
  ];
  const [rowstate, setrowstate] = useState(0);

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      pathArr={pathArr}
      st={st}
    >
      <div className="lg:col-span-3 flex flex-col px-4 pt-3 pb-0 border-neutrals70 bg-white">
        <Calendar
          fullscreen={true}
          // headerRender={headerRender}
          dateFullCellRender={dateFullCellRender}
        />
      </div>
      <div className="lg:col-span-3 flex flex-col rounded-[10px] border border-neutrals70 shadow-desktopCard bg-white mt-5">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between px-4 pt-4 pb-3 ">
          <h4 className="text-[14px] leading-6 text-mono30 font-bold mb-2 md:mb-0">
            Company List
          </h4>
          <Button
            type={"primary"}
            onClick={() => setCreateDrawerShown(true)}
            className="btn btn-sm text-white font-semibold px-2 py-2 border 
                        bg-primary100 hover:bg-primary75 border-primary100 
                        hover:border-primary75 focus:bg-primary100 focus:border-primary100 
                        flex-nowrap w-full md:w-fit"
            icon={<PlusIconSvg size={16} color="#FFFFFF" />}
          >
            Add Company
          </Button>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between w-full px-4 md:items-center mb-4 border-b pb-3">
          <div className="w-full md:w-9/12">
            <Input
              //   defaultValue={searchingFilterRecruitments}
              style={{ width: `100%` }}
              placeholder="Search Company Name..."
              allowClear
              //   onChange={(e) => {
              //     setSearchingFilterRecruitments(e.target.value);
              //     setQueryParams({ page: 1 });
              //   }}
              //   onKeyPress={onKeyPressHandler}
              //   disabled={!isAllowedToGetRecruitments}
            />
          </div>
          <div className="w-full md:w-3/12">
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
          </div>
        </div>
        <div className={"px-4"}>
          <Table
            dataSource={dataSource}
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
        <AccessControl hasPermission={true}>
          <DrawerCompanyAdd
            visible={isCreateDrawerShown}
            initProps={initProps}
            onvisible={setCreateDrawerShown}
            setRefresh={setRefresh}
            isAllowedToAddCompany={true}
            dataWorkDayTypes={dataWorkDayTypes}
            setLoadingCreate={setLoadingCreate}
            loadingCreate={loadingCreate}
          />
        </AccessControl>
        <AccessControl hasPermission={true}>
          <DrawerCompanyUpdate
            id={tempIdUpdate}
            visible={isUpdateDrawerShown}
            initProps={initProps}
            onvisible={setIsUpdateDrawerShown}
            setRefresh={setRefresh}
            trigger={triggerUpdate}
            isAllowedToAddCompany={true}
            isAllowedToUpdateCompany={true}
            dataWorkDayTypes={dataWorkDayTypes}
            setLoadingUpdate={setLoadingUpdate}
            loadingUpdate={loadingUpdate}
          />
        </AccessControl>
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
      sidemenu: "workdayschedule",
    },
  };
}

export default WorkdayScheduleIndex;
