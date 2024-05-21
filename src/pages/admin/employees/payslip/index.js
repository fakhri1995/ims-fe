import {
  DownloadOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Input, Select, Spin, notification } from "antd";
import moment from "moment";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "next-query-params";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { AccessControl } from "components/features/AccessControl";
import { DataEmptyState } from "components/states/DataEmptyState";

import { useAccessControl } from "contexts/access-control";

import {
  COMPANY_CLIENTS_GET,
  EMPLOYEES_PAYSLIPS_POST,
  EMPLOYEE_CONTRACT_SALARY_READ,
  EMPLOYEE_PAYSLIPS_GET,
  EMPLOYEE_PAYSLIP_ADD,
  EMPLOYEE_PAYSLIP_DOWNLOAD,
  EMPLOYEE_PAYSLIP_RAISE,
  EMPLOYEE_PAYSLIP_STATUS_COUNT_GET,
  EMPLOYEE_PAYSLIP_UPDATE,
  EMPLOYEE_SALARY_COLUMNS_GET,
  EMPLOYEE_SALARY_COLUMN_ADD,
  EMPLOYEE_SALARY_COLUMN_DELETE,
  EMPLOYEE_SALARY_COLUMN_UPDATE,
  RECRUITMENT_ROLES_LIST_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import { EmployeeService, PayslipService } from "../../../../apis/employee";
import ButtonSys from "../../../../components/button";
import { ChartHorizontalBar } from "../../../../components/chart/chartCustom";
import {
  CheckIconSvg,
  CircleCheckIconSvg,
  CirclePlusIconSvg,
  SearchIconSvg,
} from "../../../../components/icon";
import Layout from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import { ModalUbah } from "../../../../components/modal/modalCustom";
import ModalSalaryVarManage from "../../../../components/modal/payslips/modalSalaryVarManage";
import { TableCustomPayslipList } from "../../../../components/table/tableCustom";
import {
  createKeyPressHandler,
  momentFormatDate,
} from "../../../../lib/helper";
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

Chart.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement
);

const PayslipIndex = ({ dataProfile, sidemenu, initProps }) => {
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
  const isAllowedToGetPayslips = hasPermission(EMPLOYEE_PAYSLIPS_GET);
  const isAllowedToUpdatePayslip = hasPermission(EMPLOYEE_PAYSLIP_UPDATE);

  const isAllowedToPostPayslips = hasPermission(EMPLOYEES_PAYSLIPS_POST);
  const isAllowedToRaisePayslip = hasPermission(EMPLOYEE_PAYSLIP_RAISE);
  const isAllowedToDownloadPayslip = hasPermission(EMPLOYEE_PAYSLIP_DOWNLOAD);

  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);
  const isAllowedToGetRoleList = hasPermission(RECRUITMENT_ROLES_LIST_GET);

  const isAllowedToGetSalaryColumns = hasPermission(
    EMPLOYEE_SALARY_COLUMNS_GET
  );
  const isAllowedToAddSalaryColumn = hasPermission(EMPLOYEE_SALARY_COLUMN_ADD);
  const isAllowedToDeleteSalaryColumn = hasPermission(
    EMPLOYEE_SALARY_COLUMN_DELETE
  );
  const isAllowedToUpdateSalaryColumn = hasPermission(
    EMPLOYEE_SALARY_COLUMN_UPDATE
  );
  const isAllowedToGetPayslipStatusCount = hasPermission(
    EMPLOYEE_PAYSLIP_STATUS_COUNT_GET
  );

  // 1. Init
  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 2);
  pathTitleArr.splice(1, 2, "Daftar Karyawan", "Slip Gaji");

  // Array of 12 month names
  const monthNames = moment.months();

  const [queryParams, setQueryParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    rows: withDefault(NumberParam, 10),
    sort_by: withDefault(StringParam, /** @type {"name"|"count"} */ undefined),
    sort_type: withDefault(StringParam, /** @type {"asc"|"desc"} */ undefined),
    role_ids: withDefault(NumberParam, undefined),
    placements: withDefault(StringParam, undefined),
    is_posted: withDefault(NumberParam, undefined),
  });

  // 2. useState
  // 2.1. Charts
  const [payslipId, setPayslipId] = useState(null);
  const dataColorBar = ["#E5C471", "#35763B"];

  // 2.2. Table Employee List
  // filter data

  const dataPayslipStatusList = [
    {
      id: -1,
      name: "Kosong",
    },
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
  const [selectedPlacement, setSelectedPlacement] = useState(undefined);
  const [selectedRoleId, setSelectedRoleId] = useState(undefined);
  const [selectedPayslipStatusId, setSelectedPayslipStatusId] =
    useState(undefined);

  // table data
  const [dataPayslips, setDataPayslips] = useState([]);

  // 2.3. Post, download payslip
  const [loadingPost, setLoadingPost] = useState(false);
  const [modalPost, setModalPost] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  // 2.5. Add salary variable
  const [modalSalaryVar, setModalSalaryVar] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  // 3. UseQuery & UseEffect
  // 3.1. Get Payslips
  const {
    data: dataRawPayslips,
    isLoading: loadingPayslips,
    refetch: refetchPayslips,
  } = useQuery(
    [EMPLOYEE_PAYSLIPS_GET, queryParams],
    () =>
      PayslipService.getPayslips(
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

  // 3.2. Get Company Client List
  const {
    data: dataCompanyList,
    isLoading: loadingCompanyList,
    refetch: refetchCompanyList,
  } = useQuery(
    [COMPANY_CLIENTS_GET],
    () =>
      EmployeeService.getCompanyClientList(
        initProps,
        isAllowedToGetCompanyClients
      ),
    {
      enabled: isAllowedToGetCompanyClients,
      select: (response) => response.data,
    }
  );

  // 3.3. Get Employee Role List
  const {
    data: dataRoleList,
    isLoading: loadingRoleList,
    refetch: refetchRoleList,
  } = useQuery(
    [RECRUITMENT_ROLES_LIST_GET],
    () =>
      EmployeeService.getEmployeeRoleList(initProps, isAllowedToGetRoleList),
    {
      enabled: isAllowedToGetRoleList,
      select: (response) => response.data,
    }
  );

  // 3.4. Get Payslip Status Count
  const {
    data: payslipStatusCount,
    isLoading: loadingChart,
    refetch: refetchPayslipStatusCount,
  } = useQuery(
    [EMPLOYEE_PAYSLIP_STATUS_COUNT_GET],
    () =>
      PayslipService.getPayslipStatusCount(
        initProps,
        isAllowedToGetPayslipStatusCount
      ),
    {
      enabled: isAllowedToGetPayslipStatusCount,
      select: (response) => {
        let statusCountRes = response.data;
        let mappedStatusCount = statusCountRes.map((data) => {
          return {
            total: data?.total,
            is_posted: Number(data?.is_posted) ? "Diterbitkan" : "Draft",
          };
        });
        return mappedStatusCount;
      },
    }
  );

  // 4. Event
  const handlePostPayslips = () => {
    if (!isAllowedToPostPayslips) {
      permissionWarningNotification("Menerbitkan", "Slip Gaji Semua Karyawan");
      return;
    }
    setLoadingPost(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/postedEmployeeLastPayslips`, {
      method: "GET",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          refetchPayslips();
          refetchRoleList();
          refetchPayslipStatusCount();
          notification.success({
            message: `Draft slip gaji untuk semua karyawan berhasil diterbitkan.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal menerbitkan slip gaji. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menerbitkan slip gaji. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingPost(false);
        setModalPost(false);
      });
  };

  const handleRaisePayslip = () => {
    if (!isAllowedToRaisePayslip) {
      permissionWarningNotification("Membuat", "Draft Slip Gaji");
      return;
    }
    setLoadingPost(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/raiseLastPeriodPayslip`, {
      method: "GET",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          refetchPayslips();
          refetchRoleList();
          refetchPayslipStatusCount();

          notification.success({
            message: (
              <div>
                <p>Draft slip gaji berhasil dibuat untuk karyawan berikut:</p>
                {response2?.data?.map((item, idx) => (
                  <p key={idx}>
                    {idx + 1}. {item?.employee?.name}
                  </p>
                ))}
              </div>
            ),
            duration: 5,
          });
        } else {
          notification.error({
            message: `Gagal membuat slip gaji. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal membuat slip gaji. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingPost(false);
      });
  };

  const handleDownloadPayslip = (employee) => {
    if (!isAllowedToDownloadPayslip) {
      permissionWarningNotification("Mengunduh", "Slip Gaji");
      return;
    }

    setLoadingDownload(true);
    const payslip = employee?.last_month_payslip;
    setPayslipId(payslip?.id);
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
        } - ${employee?.name}`;
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
        setPayslipId(null);
      });
  };

  const onFilterPayslips = () => {
    setQueryParams({
      role_ids: selectedRoleId,
      placements: selectedPlacement,
      is_posted: selectedPayslipStatusId,
      page: 1,
    });
  };

  const { onKeyPressHandler } = createKeyPressHandler(
    onFilterPayslips,
    "Enter"
  );

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
      title: "Nama",
      dataIndex: "name",
      render: (text, record, index) => {
        return {
          children: <>{record?.name || "-"}</>,
        };
      },
      sorter: isAllowedToGetPayslips
        ? (a, b) => a.name?.toLowerCase() > b.name?.toLowerCase()
        : false,
    },
    {
      title: "NIP",
      dataIndex: "nip",
      render: (text, record, index) => {
        return {
          children: <>{record?.nip || "-"}</>,
        };
      },
    },
    {
      title: "Penempatan",
      dataIndex: "placement",
      render: (text, record, index) => {
        return {
          children: <>{record?.contract?.placement || "-"}</>,
        };
      },
    },
    {
      title: "Posisi",
      dataIndex: "position",
      render: (text, record, index) => {
        return {
          children: <>{record?.contract?.role?.name || "-"}</>,
        };
      },
    },
    {
      title: "No. Telepon",
      dataIndex: "phone_number",
      render: (text, record, index) => {
        return {
          children: <>{record?.phone_number || "-"}</>,
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
              {record.last_month_payslip ? (
                record.last_month_payslip?.is_posted ? (
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
                )
              ) : (
                <p
                  className="bg-mono30 bg-opacity-10 text-mono30 
                    py-1 px-7 rounded-md text-center"
                >
                  Kosong
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
              {record.last_month_payslip &&
                (record.last_month_payslip?.is_posted ? (
                  <ButtonSys
                    type={"default"}
                    disabled={
                      !isAllowedToDownloadPayslip ||
                      record.last_month_payslip?.id == payslipId
                    }
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDownloadPayslip(record);
                    }}
                  >
                    <div className="flex flex-row space-x-2 items-center">
                      <DownloadOutlined />
                      <p className="whitespace-nowrap">Unduh</p>
                    </div>
                  </ButtonSys>
                ) : (
                  <ButtonSys
                    type={"default"}
                    disabled={!isAllowedToUpdatePayslip}
                    onClick={(event) => {
                      event.stopPropagation();
                      rt.push(
                        `/admin/employees/payslip/${record.id}/addPayslip?id=${record.last_month_payslip?.id}`
                      );
                    }}
                  >
                    <div className="flex flex-row space-x-2 items-center">
                      <EditOutlined />
                      <p className="whitespace-nowrap">Edit Draft</p>
                    </div>
                  </ButtonSys>
                ))}
            </>
          ),
        };
      },
    },
  ];

  // DEBUG

  return (
    <Layout
      tok={initProps}
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="grid grid-cols-1" id="mainWrapper">
        <div className="shadow-md rounded-md bg-white p-4 mb-6">
          <h4 className="mig-heading--4 ">
            Status Slip Gaji (
            {moment().subtract(1, "month").format("MMMM YYYY")})
          </h4>
          {/* CHART STATUS SLIP GAJI */}
          {loadingChart ? (
            <>
              <Spin />
            </>
          ) : payslipStatusCount.length !== 0 ? (
            <ChartHorizontalBar
              dataChart={payslipStatusCount}
              objName="is_posted"
              value="total"
              colorBarList={dataColorBar}
            />
          ) : (
            <DataEmptyState caption="Data status slip gaji kosong." />
          )}
        </div>

        {/* Table Karyawan */}
        <div className="col-span-3 flex flex-col shadow-md rounded-md bg-white p-4 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="mig-heading--4 ">Slip Gaji</h4>
            <div
              className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 
              lg:space-x-3 xl:space-x-6 items-end lg:items-center"
            >
              <div className="w-full">
                <ButtonSys
                  type={"default"}
                  onClick={() => setModalSalaryVar(true)}
                  disabled={!isAllowedToGetSalaryColumns}
                  fullWidth={true}
                >
                  <div className="flex space-x-2 items-center">
                    <SettingOutlined />
                    <p>Kelola Variabel Gaji</p>
                  </div>
                </ButtonSys>
              </div>

              <div className="w-full">
                {dataPayslips.some(
                  (employee) => !employee?.last_month_payslip
                ) ? (
                  <ButtonSys
                    type={"primary"}
                    onClick={handleRaisePayslip}
                    disabled={!isAllowedToRaisePayslip}
                    fullWidth={true}
                  >
                    <div className="flex space-x-2 items-center whitespace-nowrap">
                      <CirclePlusIconSvg size={16} color="#FFFFFF" />
                      <p>Buat Draft Slip Gaji</p>
                    </div>
                  </ButtonSys>
                ) : (
                  <ButtonSys
                    type={"primary"}
                    onClick={() => setModalPost(true)}
                    disabled={!isAllowedToPostPayslips}
                    fullWidth={true}
                  >
                    <div className="flex space-x-2 items-center whitespace-nowrap">
                      <CheckIconSvg size={16} color="#FFFFFF" />
                      <p>Terbitkan Draft Slip Gaji</p>
                    </div>
                  </ButtonSys>
                )}
              </div>
            </div>
          </div>

          {/* Start: Search criteria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:flex lg:flex-row justify-between w-full items-center mb-4">
            {/* Search by keyword (kata kunci) */}
            <div className="lg:w-4/12">
              <Input
                defaultValue={searchingFilterPayslips}
                style={{ width: `100%` }}
                placeholder="Kata Kunci.."
                allowClear
                onChange={(e) => {
                  setQueryParams({ page: 1 });
                  setSearchingFilterPayslips(e.target.value);
                }}
                disabled={!isAllowedToGetPayslips}
              />
            </div>

            {/* Filter by position (dropdown) */}
            <div className="lg:w-2/12">
              <Select
                allowClear
                showSearch
                defaultValue={queryParams.role_ids}
                name={`role`}
                disabled={!isAllowedToGetRoleList}
                placeholder="Semua Posisi"
                style={{ width: `100%` }}
                onChange={(value) => {
                  setQueryParams({ role_ids: value, page: 1 });
                  setSelectedRoleId(value);
                }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {dataRoleList?.map((role) => (
                  <Select.Option key={role.id} value={role.id}>
                    {role.name}
                  </Select.Option>
                ))}
              </Select>
            </div>

            {/* Filter by company (dropdown) */}
            <div className="lg:w-2/12">
              <Select
                allowClear
                showSearch
                defaultValue={queryParams.placements}
                name={`placement`}
                disabled={!isAllowedToGetCompanyClients}
                placeholder="Semua Penempatan"
                style={{ width: `100%` }}
                onChange={(value) => {
                  setQueryParams({ placements: value, page: 1 });
                  setSelectedPlacement(value);
                }}
                filterOption={(input, option) =>
                  (option?.value ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                optionFilterProp="children"
              >
                {dataCompanyList?.map((company) => (
                  <Select.Option key={company.id} value={company.name}>
                    {company.name}
                  </Select.Option>
                ))}
              </Select>
            </div>

            {/* Filter by payslip status (dropdown) */}
            <div className="lg:w-2/12">
              <Select
                defaultValue={queryParams.is_posted}
                allowClear
                name={`status`}
                style={{ width: `100%` }}
                placeholder="Semua status"
                onChange={(value) => {
                  setQueryParams({ is_posted: value, page: 1 });
                  setSelectedPayslipStatusId(value);
                }}
              >
                {dataPayslipStatusList.map((status, idx) => (
                  <Select.Option key={idx} value={status.id}>
                    <p>{status.name}</p>
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div className="md:col-span-2">
              <ButtonSys
                type={`primary`}
                onClick={onFilterPayslips}
                disabled={!isAllowedToGetPayslips}
                fullWidth={true}
              >
                <div className="flex space-x-2.5 items-center">
                  <SearchIconSvg size={15} color={`#ffffff`} />
                  <p>Cari</p>
                </div>
              </ButtonSys>
            </div>
          </div>
          {/* End: Search criteria */}
          <TableCustomPayslipList
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
      {/* Modal Kelola Variabel Gaji */}
      <AccessControl hasPermission={EMPLOYEE_SALARY_COLUMN_ADD}>
        <ModalSalaryVarManage
          initProps={initProps}
          visible={modalSalaryVar}
          onvisible={setModalSalaryVar}
          loading={loadingSave}
          isAllowedToGetSalaryColumns={isAllowedToGetSalaryColumns}
          isAllowedToAddSalaryColumn={isAllowedToAddSalaryColumn}
          isAllowedToDeleteSalaryColumn={isAllowedToDeleteSalaryColumn}
          isAllowedToUpdateSalaryColumn={isAllowedToUpdateSalaryColumn}
          onOk={() => setModalSalaryVar(false)}
        />
      </AccessControl>
      <AccessControl hasPermission={EMPLOYEES_PAYSLIPS_POST}>
        <ModalUbah
          title={
            <div className="flex flex-row items-center justify-between">
              <p>Konfirmasi Penerbitan Draft Slip Gaji</p>
              <CircleCheckIconSvg color={"#35763B"} size={28} />
            </div>
          }
          visible={modalPost}
          onvisible={setModalPost}
          onOk={handlePostPayslips}
          loading={loadingPost}
          disabled={!isAllowedToPostPayslips}
          closable={false}
          okButtonText="Ya, saya yakin"
        >
          Apakah Anda yakin ingin menerbitkan draft slip gaji untuk semua
          karyawan?
        </ModalUbah>
      </AccessControl>
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
  let initProps = {};
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
      method: "GET",
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
      sidemenu: "employee-salary",
    },
  };
}

export default PayslipIndex;
