import { LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Spin, Table, notification } from "antd";
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

import { CHARGE_CODES_GET } from "lib/features";

import DrawerAddChargeCode from "../../../components/drawer/companies/chargecode/drawerAddChargeCode";
import DrawerEditChargeCode from "../../../components/drawer/companies/chargecode/drawerEditChargeCode";
import {
  ArrowLeftIconSvg,
  CloseIconSvg,
  EditTablerIconSvg,
  EyeIconSvg,
  PlusIconSvg,
  TrashIconSvg,
  WarningIconSvg,
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
  const isAllowedToGetWorkdays = hasPermission(CHARGE_CODES_GET);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [companyName, setCompanyName] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [active, setActive] = useState({
    id: null,
    name: null,
  });
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
  const [idChargeCode, setIdChargeCode] = useState(null);
  const [isRefresh, setIsRefresh] = useState(-1);
  const [idEdit, setIdEdit] = useState(null);
  const [showDrawerEdit, setShowDrawerEdit] = useState(false);

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
      key: "description",
      width: 200,
      //   sorter: true,
      dataIndex: "description",
      render: (text, record, index) => {
        return {
          children: <>{text}</>,
        };
      },
    },
    {
      title: "Attendance Code",
      key: "attendance_codes",
      dataIndex: "attendance_codes",
      sorter: true,
      render: (text, record, index) => {
        return {
          children:
            record.attendance_codes.length == 0 ? (
              <p>-</p>
            ) : (
              <div className={"flex flex-row gap-3"}>
                {record.attendance_codes.map((item, index) =>
                  item.name == "Present" ? (
                    <div
                      className={"bg-[#35763B1A] px-2.5 py-0.5 rounded-[100px]"}
                    >
                      <p
                        className={
                          "text-[#35763B] text-xs/5 font-bold font-inter"
                        }
                      >
                        Present
                      </p>
                    </div>
                  ) : item.name == "Overtime" ? (
                    <div
                      className={"bg-[#00589F1A] px-2.5 py-0.5 rounded-[100px]"}
                    >
                      <p
                        className={
                          "text-[#00589F] text-xs/5 font-bold font-inter"
                        }
                      >
                        Overtime
                      </p>
                    </div>
                  ) : item.name == "Paid Leave" ? (
                    <div
                      className={"bg-[#F5851E1A] px-2.5 py-0.5 rounded-[100px]"}
                    >
                      <p
                        className={
                          "text-[#F5851E] text-xs/5 font-bold font-inter"
                        }
                      >
                        Paid Leave
                      </p>
                    </div>
                  ) : item.name == "Unpaid Leave" ? (
                    <div
                      className={"bg-[#BF4A401A] px-2.5 py-0.5 rounded-[100px]"}
                    >
                      <p
                        className={
                          "text-[#BF4A40] text-xs/5 font-bold font-inter"
                        }
                      >
                        Unpaid Leave
                      </p>
                    </div>
                  ) : (
                    <p className={"text-xs/5 font-bold font-inter"}>
                      {item.name}
                    </p>
                  )
                )}
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
                onClick={() => showModalAttendance(record)}
              >
                <EyeIconSvg size={20} color={"#808080"} />
              </div>
              <div
                className={"hover:cursor-pointer"}
                onClick={() => handleEdit(record)}
              >
                <EditTablerIconSvg size={20} color={"#808080"} />
              </div>

              <div
                className={"hover:cursor-pointer"}
                onClick={() => handleModalDelete(record)}
              >
                <TrashIconSvg size={20} color={"#BF4A40"} />
              </div>
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

  const showModalAttendance = (record) => {
    setShowModal(true);
    setIdChargeCode(record.id);
  };

  useEffect(() => {
    fetchDataDetail();
  }, [isAllowedToGetWorkdays]);

  useEffect(() => {
    if (isRefresh == -1) {
      return;
    }
    fetchDataDetail();
  }, [isRefresh]);

  const handleEdit = (record) => {
    setIdEdit(record.id);
    setShowDrawerEdit(true);
  };

  const fetchDataDetail = async () => {
    try {
      // setLoading(true);
      if (!isAllowedToGetWorkdays) {
        permissionWarningNotification("Mendapatkan", "Get Charge Code Data");
        return;
      }
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getChargeCodes?company_id=${chargeCodeId}`,
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
          setCompanyName(res2.data.company_name);
          if (res2.data.charge_codes) {
            setdatatable(res2.data.charge_codes.data);
            setDataRawWorkDay(res2.data.charge_codes);
          }
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

  const cancelDelete = () => {
    setModalDelete(false);
  };

  const handleModalDelete = (record) => {
    setActive({
      ...active,
      name: record.name,
      id: record.id,
    });
    setModalDelete(true);
  };

  const handleDeleteChargeCode = () => {
    setLoadingDelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteChargeCode`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(active?.id),
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setLoadingDelete(false);
          setModalDelete(false);
          setIsRefresh(1);
          notification["success"]({
            message: `${active?.name} Charge Code successfully deleted`,
            duration: 3,
          });
        } else if (!res2.success) {
          setLoadingDelete(false);
          setModalDelete(false);
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
  };

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
          <div className={"flex flex-row gap-3"}>
            <div className="hover:cursor-pointer" onClick={() => rt.back()}>
              <ArrowLeftIconSvg />
            </div>
            <h4 className="text-[14px] leading-6 text-mono30 font-bold mb-2 md:mb-0">
              {companyName || "-"}
            </h4>
          </div>
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
          setIsRefresh={setIsRefresh}
          id_company={chargeCodeId}
        />

        <DrawerEditChargeCode
          visible={showDrawerEdit}
          onvisible={setShowDrawerEdit}
          initProps={initProps}
          isAllowedToAddCompany={true}
          setLoadingCreate={setLoadingCreate}
          loadingCreate={loadingCreate}
          setIsRefresh={setIsRefresh}
          id_company={chargeCodeId}
          id={idEdit}
        />

        <ModalAttendanceCode
          visible={showModal}
          onClose={() => setShowModal(false)}
          idChargeCode={idChargeCode}
          initProps={initProps}
        />
        <Modal
          closeIcon={<CloseIconSvg size={20} color={"#808080"} />}
          title={
            <div className={"flex gap-2"}>
              <WarningIconSvg />
              <p
                className={
                  "font-medium text-sm leading-6 text-[#4D4D4D] font-inter"
                }
              >
                Delete Charge Code?
              </p>
            </div>
          }
          open={modalDelete}
          onCancel={() => {
            // setmodaldelete(false);
            cancelDelete();
          }}
          footer={
            <div className={"flex gap-4 justify-end"}>
              <div
                onClick={() => cancelDelete()}
                className={
                  "bg-white border border-solid border-[#808080] py-2 px-4 rounded-md hover:cursor-pointer"
                }
              >
                <p
                  className={
                    "text-sm leading-4 text-[#808080] font-medium font-roboto"
                  }
                >
                  Cancel
                </p>
              </div>
              <div
                onClick={() => handleDeleteChargeCode()}
                className={
                  "bg-[#BF4A40] flex items-center gap-1.5 py-2 px-4 rounded-md hover:cursor-pointer"
                }
              >
                {loadingDelete ? (
                  <Spin
                    spinning={loadingDelete}
                    indicator={<LoadingOutlined />}
                    size={"default"}
                  />
                ) : (
                  <TrashIconSvg color={"white"} size={16} />
                )}
                <p className="text-white text-sm leading-4 font-medium font-roboto">
                  Delete
                </p>
              </div>
            </div>
          }
          // onOk={handleDelete}

          maskClosable={true}
          style={{ top: `3rem` }}
          width={440}
          destroyOnClose={true}
        >
          <p className={"text-[#4D4D4D] "}>
            Are you sure you want to delete charge code name{" "}
            <span className={"font-bold"}>{active?.name}</span>?
          </p>
        </Modal>
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
      sidemenu: "chargecodes",
      chargeCodeId,
    },
  };
}

export default ChargeCodeDetail;
