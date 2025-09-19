import { Table } from "antd";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import Layout from "../../../components/layout-dashboard";
import st from "../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

const WorkDayDetail = ({ initProps, dataProfile, sidemenu, workdayId }) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const tok = initProps;
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  const [loading, setLoading] = useState(false);
  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 1, "Detail Company");
  const [rawdata, setrawdata] = useState({
    id: "",
    name: "",
  });
  const dataSource = [
    {
      key: "1",
      month: "January",
      workdayType: "Weekday",
      total: 23,
    },
    {
      key: "2",
      month: "January",
      workdayType: "Weekend",
      total: 8,
    },
    {
      key: "3",
      month: "February",
      workdayType: "Weekday",
      total: 20,
    },
    {
      key: "4",
      month: "Maret",
      workdayType: "Weekend",
      total: 8,
    },
    // ... lanjut sampai December
  ];
  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    recruitment_role_id: withDefault(NumberParam, undefined),
    recruitment_stage_id: withDefault(NumberParam, undefined),
    recruitment_status_id: withDefault(NumberParam, undefined),
  });
  const [rowstate, setrowstate] = useState(0);
  const columnsWorkdayDetail = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Workday Type",
      dataIndex: "workdayType",
      key: "workdayType",
    },
    {
      title: "Total Workdays",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Total Workdays",
      dataIndex: "total",
      key: "total",
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
              <div
                onClick={(event) => {
                  event.stopPropagation();
                  rt.push(`/admin/recruitment/cv`);
                }}
                className={
                  "hover:cursor-pointer flex justify-center items-center"
                }
              >
                <EyeIconSvg size={20} color={"#808080"} />
              </div> */}
            </div>
          ),
        };
      },
    },
  ];

  useEffect(() => {
    setrawdata({
      ...rawdata,
      name: "Bukopin",
    });
  }, []);
  const breadcrumbValues = useMemo(() => {
    const pageBreadcrumbValue = [
      { name: "Company", hrefValue: "/company/clients" },
      { name: "Work Day Schedule", hrefValue: "/company/workdayschedule" },
    ];

    if (rawdata?.name) {
      pageBreadcrumbValue.push({ name: rawdata.name });
    }

    return pageBreadcrumbValue;
  }, [rawdata]);
  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      pathArr={pathTitleArr}
      st={st}
      idpage={workdayId}
      fixedBreadcrumbValues={breadcrumbValues}
    >
      <div className="lg:col-span-3 flex flex-col rounded-[10px] border border-neutrals70 shadow-desktopCard bg-white">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between px-4 py-3 border-b">
          <h4 className="text-[14px] leading-6 text-mono30 font-bold mb-2 md:mb-0">
            Durian Pay
          </h4>
        </div>
        <div className={"px-4 py-3"}>
          <Table
            dataSource={dataSource}
            columns={columnsWorkdayDetail}
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
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const workdayId = params.workdayId;
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
      workdayId,
    },
  };
}

export default WorkDayDetail;
