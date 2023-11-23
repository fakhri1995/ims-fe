import {
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Input, Select, Tooltip, notification } from "antd";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import QueryString from "qs";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useQuery } from "react-query";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  EMPLOYEE_CONTRACT_SALARY_READ,
  EMPLOYEE_GET,
  EMPLOYEE_PAYSLIPS_GET,
  EMPLOYEE_PAYSLIP_ADD,
  EMPLOYEE_PAYSLIP_DOWNLOAD,
  EMPLOYEE_PAYSLIP_GET,
  EMPLOYEE_PAYSLIP_UPDATE,
} from "lib/features";

import { PayslipService } from "../../../../../apis/employee";
import ButtonSys from "../../../../../components/button";
import DrawerPayslipDetail from "../../../../../components/drawer/employees/drawerPayslipDetail";
import {
  AlertIconSvg,
  OneUserIconSvg,
  SearchIconSvg,
} from "../../../../../components/icon";
import LayoutDashboard from "../../../../../components/layout-dashboard";
import st from "../../../../../components/layout-dashboard.module.css";
import EmployeeProfileSummary from "../../../../../components/screen/employee/detail/summary";
import { TableCustomPayslipEmployeeList } from "../../../../../components/table/tableCustom";
import {
  generateStaticAssetUrl,
  permissionWarningNotification,
} from "../../../../../lib/helper";
import { createKeyPressHandler } from "../../../../../lib/helper";
import httpcookie from "cookie";

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
  const {
    hasRole,
    hasPermission,
    isPending: isAccessControlPending,
  } = useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetEmployee = hasPermission(EMPLOYEE_GET);
  const isAllowedToAddPayslip = hasPermission(EMPLOYEE_PAYSLIP_ADD);
  const isAllowedToUpdatePayslip = hasPermission(EMPLOYEE_PAYSLIP_UPDATE);
  const isAllowedToGetPayslip = hasPermission(EMPLOYEE_PAYSLIP_GET);
  const isAllowedToGetPayslips = hasPermission(EMPLOYEE_PAYSLIPS_GET);
  const isAllowedToDownloadPayslip = hasPermission(EMPLOYEE_PAYSLIP_DOWNLOAD);
  const isAllowedToSeeSalary =
    employeeId == dataProfile?.data?.employee?.id ||
    hasPermission(EMPLOYEE_CONTRACT_SALARY_READ);

  //INIT
  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 3);
  pathTitleArr.splice(1, 3, "Daftar Karyawan", "Slip Gaji", employeeName);

  // Array of 12 month names
  const monthNames = moment.months();

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"period"} */ "period"),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ "desc"),
    employee_id: withDefault(NumberParam, employeeId),
    is_posted: withDefault(NumberParam, undefined),
  });

  // 1. STATE
  // 1.1. display

  // 1.2. Table Payslips
  // filter data
  const dataPayslipStatusList = [
    {
      id: 0,
      name: "Draft",
    },
    {
      id: 1,
      name: "Diterbitkan",
    },
  ];

  // filter search & selected options
  const [searchingFilterPayslips, setSearchingFilterPayslips] = useState("");
  const [selectedPayslipStatusId, setSelectedPayslipStatusId] =
    useState(undefined);

  // table data
  const [dataPayslips, setDataPayslips] = useState([]);

  // 1.3. Add & Download
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  // 1.4 View payslip detail
  const [drawerDetail, setDrawerDetail] = useState(false);
  const [payslipId, setPayslipId] = useState(0);
  const [payslipIdSelected, setPayslipIdSelected] = useState(null);
  // Current payslip status: 0-kosong, 1-draft, 2-diterbitkan
  const [payslipStatus, setPayslipStatus] = useState(0);

  // 2. USE QUERY & USE EFFECT
  // 2.1 Get employee detail
  const {
    data: dataEmployee,
    isLoading: loadingEmployee,
    refetch: refetchEmployee,
  } = useQuery(
    [EMPLOYEE_GET, employeeId],
    () =>
      PayslipService.getEmployee(initProps, isAllowedToGetEmployee, employeeId),
    {
      enabled: isAllowedToGetEmployee,
      select: (response) => response.data,
      onSuccess: (data) => {
        setPayslipId(data?.last_month_payslip?.id);
        if (data?.last_month_payslip) {
          if (data?.last_month_payslip?.is_posted) {
            setPayslipStatus(2);
          } else {
            setPayslipStatus(1);
          }
        }
      },
    }
  );

  // 2.2. Get employee payslips
  const {
    data: dataRawPayslips,
    isLoading: loadingPayslips,
    refetch: refetchPayslips,
  } = useQuery(
    [EMPLOYEE_PAYSLIPS_GET, queryParams],
    () =>
      PayslipService.getEmployeePayslips(
        initProps,
        isAllowedToGetPayslips,
        queryParams,
        searchingFilterPayslips
      ),
    {
      enabled: isAllowedToGetPayslips,
      select: (response) => {
        return response.data;
      },
      onSuccess: (data) => {
        setDataPayslips(data.data);
      },
    }
  );

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      refetchPayslips();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchingFilterPayslips]);

  // 3. Event
  const onFilterPayslips = () => {
    setQueryParams({
      is_posted: selectedPayslipStatusId,
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

  const handleDownloadPayslip = (payslip) => {
    if (!isAllowedToDownloadPayslip) {
      permissionWarningNotification("Mengunduh", "Slip Gaji");
      return;
    }

    setLoadingDownload(true);
    setPayslipIdSelected(payslip?.id);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/downloadEmployeePayslip?id=${payslip?.id}`,
      {
        method: "POST",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/pdf",
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.blob();
        }
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);

        // Create download link element
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = `Slip Gaji ${monthNames[payslip?.month - 1]} ${
          payslip?.year
        } - ${dataEmployee?.name}`;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        downloadLink.click();

        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengunduh slip gaji. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingDownload(false);
        setPayslipIdSelected(null);
      });
  };

  // Slip gaji table's columns
  const columnPayslip = [
    {
      title: "No.",
      dataIndex: "num",
      render: (text, record, index) => {
        return { children: <>{dataRawPayslips?.from + index}</> };
      },
    },
    {
      title: "Periode",
      dataIndex: "period",
      render: (text, record, index) => {
        return {
          children: (
            <div className="flex flex-row space-x-2 items-center">
              <p>{record?.month_string}</p>
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
        ? (a, b) => a?.tanggal_dibayarkan?.localeCompare(b?.tanggal_dibayarkan)
        : false,
    },
    {
      title: "Penerimaan (IDR)",
      dataIndex: "total_gross_penerimaan",
      render: (text, record, index) => {
        return {
          children: (
            <p className={!isAllowedToSeeSalary ? `blur-text` : undefined}>
              {Number(record.total_gross_penerimaan)?.toLocaleString("id-ID") ||
                "-"}
            </p>
          ),
        };
      },
    },
    {
      title: "Pengurangan (IDR)",
      dataIndex: "total_gross_pengurangan",
      render: (text, record, index) => {
        return {
          children: (
            <p className={!isAllowedToSeeSalary ? `blur-text` : undefined}>
              {Number(record.total_gross_pengurangan)?.toLocaleString(
                "id-ID"
              ) || "-"}
            </p>
          ),
        };
      },
    },
    {
      title: "Total (IDR)",
      dataIndex: "take_home_pay",
      render: (text, record, index) => {
        return {
          children: (
            <p className={!isAllowedToSeeSalary ? `blur-text` : undefined}>
              {Number(record.take_home_pay)?.toLocaleString("id-ID") || "-"}
            </p>
          ),
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
              {record.is_posted ? (
                <p
                  className="bg-primary100 bg-opacity-10 text-primary100 
                  py-1 px-4 rounded-md text-center"
                >
                  Diterbitkan
                </p>
              ) : (
                <p
                  className="bg-state2 bg-opacity-10 text-state2 
                    py-1 px-7 rounded-md text-center"
                >
                  Draft
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
              {record.is_posted ? (
                <div className="flex flex-row space-x-2 items-center">
                  <ButtonSys
                    type={"default"}
                    disabled={!isAllowedToGetPayslip}
                    onClick={(event) => {
                      event.stopPropagation();
                      setPayslipId(record.id);
                      setDrawerDetail(true);
                    }}
                  >
                    <EyeOutlined />
                  </ButtonSys>
                  <ButtonSys
                    type={"default"}
                    disabled={
                      !isAllowedToGetPayslip || record.id == payslipIdSelected
                    }
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDownloadPayslip(record);
                    }}
                  >
                    <DownloadOutlined />
                  </ButtonSys>
                </div>
              ) : (
                <ButtonSys
                  type={"default"}
                  disabled={!isAllowedToUpdatePayslip}
                  onClick={(event) => {
                    event.stopPropagation();
                    rt.push(`${employeeId}/addPayslip?id=${record.id}`);
                  }}
                >
                  <div className="flex flex-row space-x-2 items-center">
                    <EditOutlined />
                    <p className="whitespace-nowrap">Edit Draft</p>
                  </div>
                </ButtonSys>
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
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full">
          {/* Left Column - ID Card Photo */}
          {dataEmployee?.id_card_photo ? (
            <img
              src={generateStaticAssetUrl(dataEmployee?.id_card_photo?.link)}
              alt={dataEmployee?.id_card_photo?.description}
              className="md:w-2/5 lg:w-1/5 bg-cover object-cover rounded-md shadow-lg"
            />
          ) : (
            <div
              className="md:w-2/5 lg:w-1/5 bg-white rounded-md shadow-lg flex flex-col items-center 
                  justify-center space-y-2 p-4"
            >
              <OneUserIconSvg size={200} color={"black"} strokeWidth={1} />
              <h4 className="mig-heading--4 text-center">
                {dataEmployee?.name || "-"}
              </h4>
            </div>
          )}

          {/* Right column */}
          <div className="md:flex md:flex-col md:w-3/5 lg:w-4/5 gap-3 md:gap-5">
            {/* Payslip Status */}
            <div
              className="shadow-lg rounded-md bg-white px-3 md:px-6 py-3 
              flex flex-row justify-between items-center mb-3 md:mb-0"
            >
              <div className="flex flex-col space-y-2 justify-between">
                <p className="mig-caption--medium text-mono80">
                  Status Slip Gaji (
                  {moment().subtract(1, "month").format("MMMM YYYY")})
                </p>
                {payslipStatus === 0 ? (
                  <div className="flex flex-row space-x-2 items-center">
                    <div className="rounded-full w-4 h-4 bg-mono80"></div>
                    <h4 className="mig-heading--4">Kosong</h4>
                  </div>
                ) : payslipStatus === 1 ? (
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
              {payslipStatus === 0 ? (
                <ButtonSys
                  type={"default"}
                  onClick={onAddPayslipButtonClicked}
                  disabled={!isAllowedToAddPayslip}
                >
                  <FileAddOutlined />
                  <p className="ml-2">Buat Slip Gaji</p>
                </ButtonSys>
              ) : payslipStatus === 1 ? (
                <ButtonSys
                  type={"default"}
                  onClick={() =>
                    rt.push(`${employeeId}/addPayslip?id=${payslipId}`)
                  }
                  disabled={!isAllowedToUpdatePayslip}
                >
                  <EditOutlined />
                  <p className="ml-2">Edit Draft</p>
                </ButtonSys>
              ) : (
                <ButtonSys
                  type={"default"}
                  onClick={() =>
                    handleDownloadPayslip(dataEmployee?.last_month_payslip)
                  }
                  disabled={
                    !isAllowedToDownloadPayslip ||
                    dataEmployee?.last_month_payslip?.id == payslipIdSelected
                  }
                >
                  <DownloadOutlined />
                  <p className="ml-2">Unduh Slip Gaji</p>
                </ButtonSys>
              )}
            </div>

            {/* Profile summary */}
            <EmployeeProfileSummary dataEmployee={dataEmployee} />
          </div>
        </div>
        {/* Table Daftar Slip Gaji */}
        <div className="col-span-3 flex flex-col shadow-md rounded-md bg-white p-3 md:p-4 mb-6 mt-3 md:mt-8">
          <h4 className="mig-heading--4 mb-6">Daftar Slip Gaji</h4>

          {/* Start: Search criteria */}
          <div className="flex flex-row gap-2 justify-between w-full items-center mb-4">
            {/* Search by keyword (kata kunci) */}
            <div className="w-7/12">
              <Input
                defaultValue={searchingFilterPayslips}
                style={{ width: `100%` }}
                placeholder="Kata Kunci.."
                allowClear
                onChange={(e) => {
                  setSearchingFilterPayslips(e.target.value);
                }}
                disabled={!isAllowedToGetPayslips}
              />
            </div>

            {/* Filter by payslip status (dropdown) */}
            <div className="w-3/12">
              <Select
                defaultValue={queryParams.is_posted}
                allowClear
                name={`status`}
                placeholder="Semua Status"
                style={{ width: `100%` }}
                onChange={(value) => {
                  setQueryParams({ is_posted: value });
                  setSelectedPayslipStatusId(value);
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
            rt={rt}
            dataSource={dataPayslips}
            columns={columnPayslip}
            loading={loadingPayslips}
            total={dataRawPayslips?.total}
            queryParams={queryParams}
            setQueryParams={setQueryParams}
          />
        </div>
      </div>

      {/* Drawer Payslip Detail */}
      <AccessControl hasPermission={EMPLOYEE_PAYSLIP_GET}>
        <DrawerPayslipDetail
          initProps={initProps}
          visible={drawerDetail}
          onvisible={setDrawerDetail}
          isAllowedToGetPayslip={isAllowedToGetPayslip}
          payslipId={payslipId}
          employeeId={employeeId}
          myEmployeeId={dataProfile?.data?.employee?.id}
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
