import { LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Spin, Table, Tag, notification } from "antd";
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

import {
  ATTENDANCE_CODES_GET,
  ATTENDANCE_CODE_ADD,
  ATTENDANCE_CODE_DELETE,
  ATTENDANCE_CODE_UPDATE,
  CHARGE_CODES_GET,
  CHARGE_CODE_ADD,
  CHARGE_CODE_DELETE,
  CHARGE_CODE_UPDATE,
} from "lib/features";

import DrawerAddAttendanceCode from "../../../components/drawer/companies/chargecode/drawerAddAttendanceCode";
import DrawerAddChargeCode from "../../../components/drawer/companies/chargecode/drawerAddChargeCode";
import DrawerEditAttendanceCode from "../../../components/drawer/companies/chargecode/drawerEditAttendanceCode";
import DrawerEditChargeCode from "../../../components/drawer/companies/chargecode/drawerEditChargeCode";
import {
  ArrowLeftIconSvg,
  CheckBoldSvg,
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
  const [searchingFilterChargeCode, setSearchingFilterChargeCode] =
    useState("");

  const isAllowedToGetAttendanceCodes = hasPermission(ATTENDANCE_CODES_GET);
  const isAllowedToAddAttendanceCodes = hasPermission(ATTENDANCE_CODE_ADD);
  const isAllowedToUpdateAttendanceCodes = hasPermission(
    ATTENDANCE_CODE_UPDATE
  );
  const isAllowedToDeleteAttendanceCode = hasPermission(ATTENDANCE_CODE_DELETE);
  const isAllowedToGetChargeCodes = hasPermission(CHARGE_CODES_GET);
  const isAllowedToAddChargeCodes = hasPermission(CHARGE_CODE_ADD);
  const isAllowedToUpdateChargeCodes = hasPermission(CHARGE_CODE_UPDATE);
  const isAllowedToDeleteChargeCode = hasPermission(CHARGE_CODE_DELETE);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [companyName, setCompanyName] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalDeleteAttendance, setModalDeleteAttendance] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [active, setActive] = useState({
    id: null,
    name: null,
  });
  const [activeAttendance, setActiveAttendance] = useState({
    id: null,
    name: null,
  });
  const [dataRawAttendanceCode, setDataRawAttendanceCode] = useState({
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
  const [dataRawChargeCode, setDataRawChargeCode] = useState({
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

  const [queryParamsAttendance, setQueryParamsAttendance] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
  });
  const rt = useRouter();
  const pathArr = rt.pathname.split("/").slice(1);
  const [datatableAttendance, setdatatableAttendance] = useState([]);
  const [datatable, setdatatable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowstate, setrowstate] = useState(0);
  const [rowstateAttendance, setrowstateAttendance] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [idChargeCode, setIdChargeCode] = useState(null);
  const [isRefresh, setIsRefresh] = useState(-1);
  const [idEdit, setIdEdit] = useState(null);
  const [showDrawerEdit, setShowDrawerEdit] = useState(false);
  const [showDrawerAttendance, setShowDrawerAttendance] = useState(false);
  const [showEditDrawerAttendance, setShowEditDrawerAttendance] =
    useState(false);
  const [dataAttendanceCode, setDataAttendanceCode] = useState(null);
  const [activeTab, setActiveTab] = useState("attendance_code");
  const columnChargeCode = [
    {
      title: "No",
      key: "num",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              {dataRawChargeCode?.from + index}
            </div>
          ),
        };
      },
    },
    {
      title: "Charge Code",
      key: "name",
      dataIndex: "name",
      sorter: true,
      render: (text, record, index) => {
        return {
          children: (
            <Tag
              color={`${record?.color}1A`}
              style={{
                color: "#800080", // ungu tua untuk teks
                borderRadius: "20px",
                fontWeight: 600,
                border: "none",
                padding: "2px 10px",
              }}
            >
              <p
                className={`text-[${record?.color}] bg-[#165BB61A
]`}
              >
                {record.name ? record.name : ""}
              </p>
            </Tag>
          ),
        };
      },
    },
    {
      title: "Description",
      key: "description",
      width: 700,
      //   sorter: true,
      dataIndex: "description",
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
              {isAllowedToUpdateChargeCodes && (
                <div
                  className={"hover:cursor-pointer"}
                  onClick={() => handleEdit(record)}
                >
                  <EditTablerIconSvg size={20} color={"#808080"} />
                </div>
              )}
              {isAllowedToDeleteChargeCode && (
                <div
                  className={"hover:cursor-pointer"}
                  onClick={() => handleModalDelete(record)}
                >
                  <TrashIconSvg size={20} color={"#BF4A40"} />
                </div>
              )}
            </div>
          ),
        };
      },
    },
  ];
  const columnAttendanceCode = [
    {
      title: "No",
      key: "num",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex justify-center">
              {dataRawChargeCode?.from + index}
            </div>
          ),
        };
      },
    },
    {
      title: "Attendance Code",
      key: "name",
      dataIndex: "name",
      sorter: true,
      render: (text, record, index) => {
        return {
          children: (
            <Tag
              color={`${
                record?.name == "Present"
                  ? "#35763B1A"
                  : record?.name == "Overtime"
                  ? "#00589F1A"
                  : record?.name == "Paid Leave"
                  ? "#F5851E1A"
                  : "#F5851E1A"
              }`}
              style={{
                borderRadius: "20px",
                fontWeight: 600,
                border: "none",
                padding: "2px 10px",
              }}
            >
              <p
                className={`${
                  record?.name == "Present"
                    ? "text-primary100"
                    : record?.name == "Overtime"
                    ? "text-[#00589F]"
                    : record?.name == "Paid Leave"
                    ? "#F5851E"
                    : "#BF4A40"
                }`}
              >
                {record.name ? record.name : ""}
              </p>
            </Tag>
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
      title: "Hari Masuk",
      key: "hari_masuk",
      dataIndex: "hari_masuk",
      render: (text, record, index) => {
        return {
          children:
            text == 1 ? (
              <div className="flex gap-3">
                <div className="flex justify-center items-center bg-[#35763B1A] w-6 h-6 rounded-[100px]">
                  <CheckBoldSvg color={"#35763B"} size={18} />
                </div>
                <p className="text-sm/6 font-inter text-mono30">1</p>
              </div>
            ) : (
              <div className="flex gap-3">
                <div className="flex justify-center items-center bg-[#BF4A401A] w-6 h-6 rounded-[100px]">
                  <CloseIconSvg color={"#BF4A40"} size={18} />
                </div>
                <p className="text-sm/6 font-inter text-mono30">0</p>
              </div>
            ),
        };
      },
    },
    {
      title: "Penggajian",
      key: "hari_penggajian",
      dataIndex: "hari_penggajian",
      render: (text, record, index) => {
        return {
          children:
            text == 1 ? (
              <div className="flex gap-3">
                <div className="flex justify-center items-center bg-[#35763B1A] w-6 h-6 rounded-[100px]">
                  <CheckBoldSvg color={"#35763B"} size={18} />
                </div>
                <p className="text-sm/6 font-inter text-mono30">1</p>
              </div>
            ) : (
              <div className="flex gap-3">
                <div className="flex justify-center items-center bg-[#BF4A401A] w-6 h-6 rounded-[100px]">
                  <CloseIconSvg color={"#BF4A40"} size={18} />
                </div>
                <p className="text-sm/6 font-inter text-mono30">0</p>
              </div>
            ),
        };
      },
    },
    {
      title: "Dapat Ditagih",
      key: "dapat_ditagih",
      dataIndex: "dapat_ditagih",
      render: (text, record, index) => {
        return {
          children:
            text == 1 ? (
              <div className="flex gap-3">
                <div className="flex justify-center items-center bg-[#35763B1A] w-6 h-6 rounded-[100px]">
                  <CheckBoldSvg color={"#35763B"} size={18} />
                </div>
                <p className="text-sm/6 font-inter text-mono30">1</p>
              </div>
            ) : (
              <div className="flex gap-3">
                <div className="flex justify-center items-center bg-[#BF4A401A] w-6 h-6 rounded-[100px]">
                  <CloseIconSvg color={"#BF4A40"} size={18} />
                </div>
                <p className="text-sm/6 font-inter text-mono30">0</p>
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
              {isAllowedToUpdateChargeCodes && (
                <div
                  className={"hover:cursor-pointer"}
                  onClick={() => handleEditAttendance(record)}
                >
                  <EditTablerIconSvg size={20} color={"#808080"} />
                </div>
              )}
              {isAllowedToDeleteAttendanceCode && (
                <div
                  className={"hover:cursor-pointer"}
                  onClick={() => handleModalDeleteAttendance(record)}
                >
                  <TrashIconSvg size={20} color={"#BF4A40"} />
                </div>
              )}
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
      { name: "Attendance & Charge Code", hrefValue: "/company/chargecode" },
      { name: "Manage Charge Code" },
    ];

    // if (companyName) {
    //   pageBreadcrumbValue.push({ name: companyName });
    // }

    return pageBreadcrumbValue;
  }, [companyName]);

  useEffect(() => {
    fetchDataDetail();
  }, [isAllowedToGetChargeCodes, searchingFilterChargeCode]);

  useEffect(() => {
    fetchDataDetailAttendance();
  }, [isAllowedToGetAttendanceCodes, searchingFilterWorkingDays]);

  useEffect(() => {
    if (isRefresh == -1) {
      return;
    }
    fetchDataDetailAttendance();
    fetchDataDetail();
  }, [isRefresh]);

  const handleEdit = (record) => {
    setIdEdit(record.id);
    setShowDrawerEdit(true);
  };

  const fetchDataDetailAttendance = async () => {
    try {
      // setLoading(true);
      if (!isAllowedToGetChargeCodes) {
        permissionWarningNotification("Mendapatkan", "Get Charge Code Data");
        return;
      }
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getAttendanceCodes?company_id=${chargeCodeId}&keyword=${searchingFilterWorkingDays}`,
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
          if (res2.data.charge_codes) {
            setdatatableAttendance(res2.data.charge_codes.data);
            setDataRawAttendanceCode(res2.data.charge_codes);
          }
        });
    } catch (err) {
      // setError(err.message || "Something went wrong");
    } finally {
      // setLoading(false);
    }
  };

  const fetchDataDetail = async () => {
    try {
      // setLoading(true);
      if (!isAllowedToGetChargeCodes) {
        permissionWarningNotification("Mendapatkan", "Get Charge Code Data");
        return;
      }
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getChargeCodes?company_id=${chargeCodeId}&keyword=${searchingFilterChargeCode}`,
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
            setDataRawChargeCode(res2.data.charge_codes);
          }
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

  const cancelDeleteAttendance = () => {
    setModalDeleteAttendance(false);
  };

  const handleEditAttendance = (record) => {
    setShowEditDrawerAttendance(true);
    setDataAttendanceCode(record);
  };

  const handleModalDelete = (record) => {
    setActive({
      ...active,
      name: record.name,
      id: record.id,
    });
    setModalDelete(true);
  };

  const handleModalDeleteAttendance = (record) => {
    setActiveAttendance({
      ...activeAttendance,
      name: record.name,
      id: record.id,
    });
    setModalDeleteAttendance(true);
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

  const handleDeleteAttendanceCode = () => {
    setLoadingDelete(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteAttendanceCode`, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(activeAttendance?.id),
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setLoadingDelete(false);
          setModalDeleteAttendance(false);
          setIsRefresh(1);
          notification["success"]({
            message: `${activeAttendance?.name} Attendance Code successfully deleted`,
            duration: 3,
          });
        } else if (!res2.success) {
          setLoadingDelete(false);
          setModalDeleteAttendance(false);
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
          {activeTab == "attendance_code" && isAllowedToAddAttendanceCodes && (
            <Button
              type={"primary"}
              onClick={() => setShowDrawerAttendance(true)}
              className="btn btn-sm text-white font-semibold px-2 py-2 border 
                        bg-primary100 hover:bg-primary75 border-primary100 
                        hover:border-primary75 focus:bg-primary100 focus:border-primary100 
                        flex-nowrap w-full md:w-fit"
              icon={<PlusIconSvg size={16} color="#FFFFFF" />}
            >
              Create Attendance Code
            </Button>
          )}
          {activeTab == "charge_code" && isAllowedToAddChargeCodes && (
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
          )}
        </div>
        <div className={"my-4 px-4 border-b flex"}>
          <div
            onClick={() => setActiveTab("attendance_code")}
            className={`hover:cursor-pointer flex pb-2 justify-center px-6 ${
              activeTab == "attendance_code"
                ? "border-b-2 border-primary100"
                : ""
            }`}
          >
            <p
              className={`text-sm/6 font-inter ${
                activeTab == "attendance_code"
                  ? "font-bold text-primary100"
                  : "text-[#808080] font-normal"
              }`}
            >
              Attendance Code
            </p>
          </div>
          <div
            onClick={() => setActiveTab("charge_code")}
            className={`hover:cursor-pointer pb-2 flex justify-center px-6 ${
              activeTab == "charge_code" ? "border-b-2 border-primary100" : ""
            }`}
          >
            <p
              className={`text-sm/6 font-inter ${
                activeTab == "charge_code"
                  ? "font-bold text-primary100"
                  : "text-[#808080] font-normal"
              }`}
            >
              Charge Code
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between w-full px-4 md:items-center mb-4 border-b pb-3">
          <div className="w-full md:w-full">
            <Input
              value={
                activeTab == "attendance_code"
                  ? searchingFilterWorkingDays
                  : searchingFilterChargeCode
              }
              style={{ width: `100%` }}
              placeholder="Search Code's Name..."
              allowClear
              onChange={(e) => {
                if (activeTab == "attendance_code") {
                  setSearchingFilterWorkingDays(e.target.value);
                  setQueryParamsAttendance({ page: 1 });
                } else {
                  setSearchingFilterChargeCode(e.target.value);
                  setQueryParams({ page: 1 });
                }
              }}
            />
          </div>
        </div>
        <div className={"px-4"}>
          {activeTab == "charge_code" ? (
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
          ) : (
            <Table
              dataSource={datatableAttendance}
              columns={columnAttendanceCode}
              rowKey={(record) => record.id}
              loading={loading}
              scroll={{ x: 200 }}
              pagination={{
                current: queryParamsAttendance.page,
                pageSize: queryParamsAttendance.rows,
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
                return `${record.id === rowstateAttendance && `cursor-pointer`}
                        }`;
              }}
            />
          )}
        </div>
        <DrawerAddChargeCode
          visible={showDrawerAdd}
          onvisible={setShowDrawerAdd}
          initProps={initProps}
          isAllowedToAddChargeCode={isAllowedToAddChargeCodes}
          setLoadingCreate={setLoadingCreate}
          loadingCreate={loadingCreate}
          setIsRefresh={setIsRefresh}
          companyName={companyName}
          id_company={chargeCodeId}
        />

        <DrawerAddAttendanceCode
          visible={showDrawerAttendance}
          onvisible={setShowDrawerAttendance}
          initProps={initProps}
          isAllowedToAddAttendanceCode={isAllowedToAddAttendanceCodes}
          setLoadingCreate={setLoadingCreate}
          loadingCreate={loadingCreate}
          idChargeCode={chargeCodeId}
          setIsRefresh={setIsRefresh}
          companyName={companyName}
        />

        <DrawerEditChargeCode
          visible={showDrawerEdit}
          onvisible={setShowDrawerEdit}
          initProps={initProps}
          isAllowedToAddCompany={isAllowedToUpdateChargeCodes}
          setLoadingCreate={setLoadingCreate}
          loadingCreate={loadingCreate}
          setIsRefresh={setIsRefresh}
          id_company={chargeCodeId}
          id={idEdit}
        />
        <DrawerEditAttendanceCode
          visible={showEditDrawerAttendance}
          onvisible={setShowEditDrawerAttendance}
          initProps={initProps}
          isAllowedToUpdateAttendanceCode={isAllowedToUpdateAttendanceCodes}
          setLoadingCreate={setLoadingCreate}
          loadingCreate={loadingCreate}
          idChargeCode={idChargeCode}
          setIsRefresh={setIsRefresh}
          dataAttendanceCode={dataAttendanceCode}
        />
        {/* <ModalAttendanceCode
          visible={showModal}
          onClose={() => setShowModal(false)}
          idChargeCode={idChargeCode}
          initProps={initProps}
          setIdChargeCode={setIdChargeCode}
        /> */}
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
                Delete Attendance Code?
              </p>
            </div>
          }
          open={modalDeleteAttendance}
          onCancel={() => {
            // setmodaldelete(false);
            cancelDeleteAttendance();
          }}
          footer={
            <div className={"flex gap-4 justify-end"}>
              <div
                onClick={() => cancelDeleteAttendance()}
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
                onClick={() => handleDeleteAttendanceCode()}
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
            Are you sure you want to delete attendance code name{" "}
            <span className={"font-bold"}>{activeAttendance?.name}</span>?
          </p>
        </Modal>
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
