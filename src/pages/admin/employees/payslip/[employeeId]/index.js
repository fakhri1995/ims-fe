import { UpOutlined } from "@ant-design/icons";
import {
  Collapse,
  Input,
  Select,
  Table,
  Tabs,
  Tooltip,
  notification,
} from "antd";
import moment from "moment";
import "moment/locale/id";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  EMPLOYEE_GET,
  EMPLOYEE_PAYSLIPS_GET,
  EMPLOYEE_PAYSLIP_ADD,
  EMPLOYEE_PAYSLIP_GET,
  EMPLOYEE_PAYSLIP_UPDATE,
} from "lib/features";

import ButtonSys from "../../../../../components/button";
import DrawerCore from "../../../../../components/drawer/drawerCore";
import DrawerPayslipDetail from "../../../../../components/drawer/employees/drawerPayslipDetail";
import {
  AlertIconSvg,
  CirclePlusIconSvg,
  DownloadIconSvg,
  EditIconSvg,
  EyeCheckIconSvg,
  OneUserIconSvg,
  SearchIconSvg,
  TrashIconSvg,
  UploadIconSvg,
} from "../../../../../components/icon";
import { FilePlusIconSvg } from "../../../../../components/icon";
import LayoutDashboard from "../../../../../components/layout-dashboard";
import st from "../../../../../components/layout-dashboard.module.css";
import {
  TableCustomPayslipEmployeeList,
  TableCustomPayslipList,
} from "../../../../../components/table/tableCustom";
import {
  generateStaticAssetUrl,
  permissionWarningNotification,
} from "../../../../../lib/helper";
import { createKeyPressHandler } from "../../../../../lib/helper";
import httpcookie from "cookie";

moment.locale("id");

const EmployeePayslipDetailIndex = ({
  initProps,
  dataProfile,
  sidemenu,
  employeeId,
  employeeName,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetEmployee = hasPermission(EMPLOYEE_GET);
  const isAllowedToAddPayslip = hasPermission(EMPLOYEE_PAYSLIP_ADD);
  const isAllowedToUpdatePayslip = hasPermission(EMPLOYEE_PAYSLIP_UPDATE);
  const isAllowedToGetPayslip = hasPermission(EMPLOYEE_PAYSLIP_GET);
  const isAllowedToGetPayslips = hasPermission(EMPLOYEE_PAYSLIPS_GET);

  //INIT
  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 3);
  pathTitleArr.splice(1, 3, "Daftar Karyawan", "Slip Gaji", employeeName);

  // 1. STATE
  // 1.1. display
  const [praloading, setpraloading] = useState(true);
  const [currentTab, setCurrentTab] = useState("1");
  const [dataEmployee, setDataEmployee] = useState({
    // id_photo: "",
    id: 0,
    name: "",
    nip: "",
    phone_number: "",
    email_office: "",
    is_posted: 0,
    contracts: [],
    inventories: [],
  });

  // 1.2. Table Payslips
  // filter data
  const [dataPayslipStatusList, setDataContractStatusList] = useState([]);

  // filter search & selected options
  const [searchingFilterPayslips, setSearchingFilterPayslips] = useState("");
  const [selectedPayslipStatusId, setSelectedPayslipStatusId] = useState(0);

  // sorting
  const [sortingPayslips, setSortingEmployees] = useState({
    sort_by: "",
    sort_type: "",
  });

  // table data
  const [loadingPayslips, setLoadingPayslips] = useState(true);
  const [dataPayslips, setDataPayslips] = useState([]);
  const [dataRawPayslips, setDataRawPayslips] = useState({
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
  const [pagePayslips, setPagePayslips] = useState(1);
  const [rowsPayslips, setRowsPayslips] = useState(10);

  const [refresh, setRefresh] = useState(-1);
  const [dataRowClicked, setDataRowClicked] = useState({});

  // 1.3. Add
  const [loadingAdd, setLoadingAdd] = useState(false);

  // 1.4 View payslip detail
  const [drawerDetail, setDrawerDetail] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [dataPayslip, setDataPayslip] = useState({ status: "kosong" });

  // 2. USE EFFECT
  // 2.1 Get employee detail
  useEffect(() => {
    if (!isAllowedToGetEmployee) {
      permissionWarningNotification("Mendapatkan", "Detail Karyawan");
      setpraloading(false);
      return;
    }
    if (employeeId) {
      setpraloading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployee?id=${employeeId}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((response) => response.json())
        .then((response2) => {
          if (response2.success) {
            setDataEmployee(response2.data);
          } else {
            notification.error({
              message: `${response2.message}`,
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
        .finally(() => setpraloading(false));
    }
  }, [isAllowedToGetEmployee, employeeId, refresh]);

  // 2.2. Get employee payslips
  useEffect(() => {
    if (!isAllowedToGetPayslips) {
      permissionWarningNotification("Mendapatkan", "Daftar Slip Gaji Karyawan");
      setpraloading(false);
      return;
    }
    if (employeeId) {
      setpraloading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployees?rows=${rowsPayslips}&is_employee_active=1&page=${pagePayslips}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((response) => response.json())
        .then((response2) => {
          if (response2.success) {
            setDataRawPayslips(response2.data);
            setDataPayslips(response2.data.data);
          } else {
            notification.error({
              message: `${response2.message}`,
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
        .finally(() => setpraloading(false));
    }
  }, [isAllowedToGetPayslips, employeeId, refresh]);

  // 2.1 Get employee payslip detail
  useEffect(() => {
    if (!isAllowedToGetPayslip) {
      permissionWarningNotification("Mendapatkan", "Detail Slip Gaji Karyawan");
      setLoadingDetail(false);
      return;
    }

    setLoadingDetail(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeePayslip?id=${employeeId}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          setDataPayslip(response2.data);
        } else {
          notification.error({
            message: `${response2.message}`,
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
      .finally(() => setLoadingDetail(false));
  }, [isAllowedToGetPayslip, employeeId, refresh]);

  // 3. Event
  const onFilterPayslips = () => {
    setLoadingPayslips(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeePayslips?sort_by=${sortingPayslips.sort_by}&sort_type=${sortingPayslips.sort_type}&payslip_status_id=${selectedPayslipStatusId}&keyword=${searchingFilterPayslips}&page=${pagePayslips}&rows=${rowsPayslips}`,
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
          setDataRawPayslips(res2.data);
          setDataPayslips(res2.data.data);
        } else {
          notification.error({
            message: `${res2.message}`,
            duration: 3,
          });
        }
        setLoadingPayslips(false);
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
        setLoadingPayslips(false);
      });
  };

  const { onKeyPressHandler } = createKeyPressHandler(
    onFilterPayslips,
    "Enter"
  );

  const onAddPayslipButtonClicked = useCallback(() => {
    handleAddEmployeePayslip();
  }, []);

  const handleAddEmployeePayslip = () => {
    if (!isAllowedToAddPayslip) {
      permissionWarningNotification("Menambah", "Slip Gaji Karyawan");
      return;
    }

    const payload = {
      employee_id: employeeId,
    };

    setLoadingAdd(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addEmployeePayslip`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          rt.push(`${employeeId}/addPayslip?id=${response2.data?.id}`);
        } else {
          notification.error({
            message: `Gagal menambahkan slip gaji karyawan. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menambahkan slip gaji karyawan. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => setLoadingAdd(false));
  };

  // Slip gaji table's columns
  const columnPayslip = [
    {
      title: "No.",
      dataIndex: "num",
      render: (text, record, index) => {
        return {
          children: <>{dataRawPayslips?.from + index}</>,
        };
      },
    },
    {
      title: "Periode",
      dataIndex: "period",
      // TODO: sort by month
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex flex-row space-x-2 items-center">
              {/* <p>{record.period}</p> */}
              <p>Oktober 2022</p>
              {record.is_main_salary_changed && (
                <Tooltip
                  placement="top"
                  title="Gaji pokok diubah"
                  color="#E6E6E6"
                  overlayInnerStyle={{ color: "#4D4D4D" }}
                >
                  <span>
                    <AlertIconSvg color={"#DDB44A"} size={16} />
                  </span>
                </Tooltip>
              )}
            </div>
          ),
        };
      },
      sorter: isAllowedToGetPayslips
        ? (a, b) => a.period?.toLowerCase() > b.period?.toLowerCase()
        : false,
    },
    {
      title: "Penerimaan (IDR)",
      dataIndex: "receive",
      render: (text, record, index) => {
        return {
          children: <>{record.receive || "-"}</>,
        };
      },
    },
    {
      title: "Pengurangan (IDR)",
      dataIndex: "reduction",
      render: (text, record, index) => {
        return {
          children: <>{record.reduction || "-"}</>,
        };
      },
    },
    {
      title: "Total (IDR)",
      dataIndex: "total",
      render: (text, record, index) => {
        return {
          children: <>{record.total || "-"}</>,
        };
      },
    },
    {
      title: "Status Slip Gaji",
      dataIndex: "payslip_status",
      render: (text, record, index) => {
        return {
          children: (
            <>
              {record.status === "kosong" ? (
                <p
                  className="bg-mono30 bg-opacity-10 text-mono30 
                  py-1 px-7 rounded-md text-center"
                >
                  Kosong
                </p>
              ) : record.status === "draft" ? (
                <p
                  className="bg-state2 bg-opacity-10 text-state2 
                  py-1 px-7 rounded-md text-center"
                >
                  Draft
                </p>
              ) : (
                <p
                  className="bg-primary100 bg-opacity-10 text-primary100 
                  py-1 px-4 rounded-md text-center"
                >
                  Diterbitkan
                </p>
              )}
            </>
          ),
        };
      },
    },
    {
      title: "Aksi",
      key: "button_action",
      render: (text, record) => {
        return {
          children: (
            <>
              {record.status == "kosong" ? (
                <div className="flex flex-col space-y-2">
                  <ButtonSys
                    type={isAllowedToAddPayslip ? "default" : "primary"}
                    disabled={!isAllowedToAddPayslip}
                    onClick={(event) => {
                      event.stopPropagation();
                      // handleAddEmployeePayslip();
                    }}
                  >
                    <div className="flex flex-row space-x-2 items-center">
                      <FilePlusIconSvg size={16} color={`#35763B`} />
                      <p className="whitespace-nowrap">Buat Slip Gaji</p>
                    </div>
                  </ButtonSys>
                </div>
              ) : record.status == "draft" ? (
                <div className="flex flex-col space-y-2">
                  <ButtonSys
                    type={isAllowedToUpdatePayslip ? "default" : "primary"}
                    disabled={!isAllowedToUpdatePayslip}
                    onClick={(event) => {
                      event.stopPropagation();
                      // rt.push(`${employeeId}/addPayslip?id=${payslipId}`)
                    }}
                  >
                    <div className="flex flex-row space-x-2 items-center">
                      <EditIconSvg size={16} color={`#35763B`} />
                      <p className="whitespace-nowrap">Edit Draft</p>
                    </div>
                  </ButtonSys>
                </div>
              ) : (
                <div className="flex flex-row space-x-2 items-center">
                  <ButtonSys
                    type={isAllowedToGetPayslip ? "default" : "primary"}
                    disabled={!isAllowedToGetPayslip}
                    onClick={(event) => {
                      event.stopPropagation();
                      setDrawerDetail(true);
                    }}
                  >
                    <EyeCheckIconSvg size={16} color={`#35763B`} />
                  </ButtonSys>
                  <ButtonSys
                    type={isAllowedToGetPayslip ? "default" : "primary"}
                    disabled={!isAllowedToGetPayslip}
                    onClick={(event) => {
                      event.stopPropagation();
                      // download pdf payslip
                    }}
                  >
                    <DownloadIconSvg size={16} color={`#35763B`} />
                  </ButtonSys>
                </div>
              )}
            </>
          ),
        };
      },
    },
  ];

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="grid grid-cols-1" id="mainWrapper">
        <div className="flex flex-col md:flex-row md:gap-5 w-full">
          {/* Left Column - ID Card Photo */}
          {dataEmployee.id_card_photo ? (
            <img
              src={generateStaticAssetUrl(dataEmployee.id_card_photo?.link)}
              alt={dataEmployee.id_card_photo?.description}
              className="md:w-1/5 bg-cover object-cover rounded-md shadow-lg"
            />
          ) : (
            <div
              className="md:w-1/5 bg-white rounded-md shadow-lg flex flex-col items-center 
                  justify-center space-y-2 p-4"
            >
              <OneUserIconSvg size={200} color={"black"} strokeWidth={1} />
              <h4 className="mig-heading--4 text-center">
                {dataEmployee?.name || "-"}
              </h4>
            </div>
          )}

          {/* Right column */}
          <div className="md:flex md:flex-col md:w-4/5 md:gap-5">
            {/* Payslip Status */}
            <div
              className="shadow-lg rounded-md bg-white md:px-6 py-3 
              flex flex-row justify-between items-center"
            >
              <div className="flex flex-col space-y-2 justify-between">
                <p className="mig-caption--medium text-mono80">
                  Status Slip Gaji (
                  {moment(dataPayslip.month).isValid()
                    ? moment(dataPayslip.month).format("MMMM YYYY")
                    : "-"}
                  )
                </p>
                {dataPayslip?.status === "kosong" ? (
                  <div className="flex flex-row space-x-2 items-center">
                    <div className="rounded-full w-4 h-4 bg-mono80"></div>
                    <h4 className="mig-heading--4">Kosong</h4>
                  </div>
                ) : dataPayslip?.status === "draft" ? (
                  <div className="flex flex-row space-x-2 items-center">
                    <div className="rounded-full w-4 h-4 bg-notice"></div>
                    <h4 className="mig-heading--4">Draft</h4>
                  </div>
                ) : (
                  <div className="flex flex-row space-x-2 items-center">
                    <div className="rounded-full w-4 h-4 bg-primary100"></div>
                    <h4 className="mig-heading--4">Diterbitkan</h4>
                  </div>
                )}
              </div>
              {dataPayslip?.status === "kosong" ? (
                <ButtonSys
                  type={!isAllowedToAddPayslip ? "primary" : "default"}
                  // onClick={handleAddEmployeePayslip}
                  disabled={!isAllowedToAddPayslip}
                >
                  <FilePlusIconSvg color={"#35763B"} size={16} />
                  <p className="ml-2">Buat Slip Gaji</p>
                </ButtonSys>
              ) : dataPayslip?.status === "draft" ? (
                <ButtonSys
                  type={!isAllowedToUpdatePayslip ? "primary" : "default"}
                  // onClick={() => rt.push(`${employeeId}/addPayslip?id=${payslipId}`)}
                  onClick={() => rt.push(`${employeeId}/addPayslip?id=1`)}
                  disabled={!isAllowedToUpdatePayslip}
                >
                  <EditIconSvg color={"#35763B"} size={16} />
                  <p className="ml-2">Edit Draft</p>
                </ButtonSys>
              ) : (
                <ButtonSys
                  type={!isAllowedToGetPayslip ? "primary" : "default"}
                  // onClick={() => download pdf payslip}
                  disabled={!isAllowedToGetPayslip}
                >
                  <DownloadIconSvg color={"#35763B"} size={16} />
                  <p className="ml-2">Unduh Slip Gaji</p>
                </ButtonSys>
              )}
            </div>

            {/* Profile summary */}
            <div className="shadow-lg rounded-md bg-white pb-4 md:py-4 md:px-6 divide-y-2 h-full">
              <h4 className="mig-heading--4 mb-3">Ringkasan Profil</h4>
              <div className="grid grid-cols-2 gap-4 pt-3">
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">Nama</p>
                  <p>{dataEmployee?.name || "-"}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">NIP</p>
                  <p>{dataEmployee?.nip || "-"}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">Posisi</p>
                  <p>{dataEmployee?.role_name || "-"}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">
                    Status Kontrak
                  </p>
                  <p>
                    {dataEmployee?.contracts[0]?.contract_status_name || "-"}
                  </p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">E-mail</p>
                  <p>{dataEmployee?.email_office || "-"}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">
                    Nomor Telepon
                  </p>
                  <p>{dataEmployee?.phone_number || "-"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Table Daftar Slip Gaji */}
        <div className="col-span-3 flex flex-col shadow-md rounded-md bg-white md:p-4 mb-6 mt-8">
          <h4 className="mig-heading--4 mb-6">Daftar Slip Gaji</h4>

          {/* Start: Search criteria */}
          <div className="flex flex-row justify-between w-full items-center mb-4">
            {/* Search by keyword (kata kunci) */}
            <div className="w-7/12">
              <Input
                value={
                  searchingFilterPayslips === ""
                    ? null
                    : searchingFilterPayslips
                }
                style={{ width: `100%` }}
                placeholder="Kata Kunci.."
                allowClear
                onChange={(e) => {
                  if (e.target.value === "") {
                    setSearchingFilterPayslips("");
                  } else {
                    setSearchingFilterPayslips(e.target.value);
                  }
                }}
                onKeyPress={onKeyPressHandler}
                disabled={!isAllowedToGetPayslips}
              />
            </div>

            {/* Filter by payslip status (dropdown) */}
            <div className="w-3/12">
              <Select
                value={
                  selectedPayslipStatusId === 0 ? null : selectedPayslipStatusId
                }
                allowClear
                name={`status`}
                // disabled={!isAllowedToGetRoleTypeList}
                placeholder="Semua Status Slip Gaji"
                defaultValue={0}
                style={{ width: `100%` }}
                onChange={(value) => {
                  typeof value === "undefined"
                    ? setSelectedPayslipStatusId(0)
                    : setSelectedPayslipStatusId(value);
                }}
              >
                {dataPayslipStatusList.map((status) => (
                  <Select.Option key={status.id} value={status.id}>
                    <p>{status.name}</p>
                  </Select.Option>
                ))}
              </Select>
            </div>

            <ButtonSys
              type={`primary`}
              onClick={onFilterPayslips}
              disabled={!isAllowedToGetPayslips}
            >
              <div className="flex flex-row space-x-2.5 w-full items-center">
                <SearchIconSvg size={15} color={`#ffffff`} />
                <p>Cari</p>
              </div>
            </ButtonSys>
          </div>
          {/* End: Search criteria */}
          <TableCustomPayslipEmployeeList
            dataSource={dataPayslips}
            setDataSource={setDataPayslips}
            columns={columnPayslip}
            loading={praloading}
            setpraloading={setpraloading}
            pageSize={rowsPayslips}
            setPageSize={setRowsPayslips}
            total={dataRawPayslips?.total}
            initProps={initProps}
            setpage={setPagePayslips}
            pagefromsearch={pagePayslips}
            setdataraw={setDataRawPayslips}
            setsorting={setSortingEmployees}
            sorting={sortingPayslips}
            searching={searchingFilterPayslips}
            selectedPayslipStatusId={selectedPayslipStatusId}
          />
        </div>
      </div>

      {/* Drawer Payslip Detail */}
      <AccessControl hasPermission={EMPLOYEE_PAYSLIP_GET}>
        <DrawerPayslipDetail
          title={`Slip Gaji (Oktober 2022)`}
          visible={drawerDetail}
          onvisible={setDrawerDetail}
          isAllowedToGetPayslip={isAllowedToGetPayslip}
        />
      </AccessControl>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res, params }) {
  const employeeId = params.employeeId;
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

  const resourcesGE = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployee?id=${employeeId}`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGE = await resourcesGE.json();
  const employeeName = resjsonGE?.data?.name || "-";

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "employee-salary",
      employeeId,
      employeeName,
    },
  };
}

export default EmployeePayslipDetailIndex;
