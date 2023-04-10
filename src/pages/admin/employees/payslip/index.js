import {
  DownloadOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Input, Select, Spin, notification } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";

import { AccessControl } from "components/features/AccessControl";
import { DataEmptyState } from "components/states/DataEmptyState";

import { useAccessControl } from "contexts/access-control";

import {
  COMPANY_LISTS_GET,
  EMPLOYEES_PAYSLIPS_POST,
  EMPLOYEE_PAYSLIPS_GET,
  EMPLOYEE_PAYSLIP_ADD,
  EMPLOYEE_PAYSLIP_DOWNLOAD,
  EMPLOYEE_PAYSLIP_GET,
  EMPLOYEE_PAYSLIP_RAISE,
  EMPLOYEE_PAYSLIP_STATUS_COUNT_GET,
  EMPLOYEE_SALARY_COLUMNS_GET,
  EMPLOYEE_SALARY_COLUMN_ADD,
  EMPLOYEE_SALARY_COLUMN_DELETE,
  EMPLOYEE_SALARY_COLUMN_UPDATE,
  RECRUITMENT_ROLES_LIST_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

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
import {
  ModalManageSalaryVar,
  ModalUbah,
} from "../../../../components/modal/modalCustom";
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
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetPayslips = hasPermission(EMPLOYEE_PAYSLIPS_GET);
  const isAllowedToGetPayslip = hasPermission(EMPLOYEE_PAYSLIP_GET);
  const isAllowedToAddPayslip = hasPermission(EMPLOYEE_PAYSLIP_ADD);
  const isAllowedToPostPayslips = hasPermission(EMPLOYEES_PAYSLIPS_POST);
  const isAllowedToRaisePayslip = hasPermission(EMPLOYEE_PAYSLIP_RAISE);
  const isAllowedToDownloadPayslip = hasPermission(EMPLOYEE_PAYSLIP_DOWNLOAD);

  const isAllowedToGetCompanyList = hasPermission(COMPANY_LISTS_GET);
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

  // 2. useState
  // 2.1. Charts
  const [loadingChart, setLoadingChart] = useState(false);
  const [payslipStatusCount, setPayslipStatusCount] = useState([]);
  const dataColorBar = ["#35763B", "#E5C471"];

  // 2.2. Table Employee List
  // filter data
  const [loadingCompanyList, setLoadingCompanyList] = useState(false);
  const [dataCompanyList, setDataCompanyList] = useState([]);

  const [loadingRoleList, setLoadingRoleList] = useState(false);
  const [dataRoleList, setDataRoleList] = useState([]);

  const dataPayslipStatusList = [
    {
      id: 3,
      name: "Kosong",
    },
    {
      id: 1,
      name: "Draft",
    },
    {
      id: 2,
      name: "Diterbitkan",
    },
  ];

  // filter search & selected options
  const [searchingFilterPayslips, setSearchingFilterPayslips] = useState("");
  const [selectedPlacement, setSelectedPlacement] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState(0);
  const [selectedPayslipStatusId, setSelectedPayslipStatusId] = useState("");

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

  // 2.3. Post, download payslip
  const [loadingPost, setLoadingPost] = useState(false);
  const [modalPost, setModalPost] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  // 2.4. Delete payslip
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // 2.5. Add salary variable
  const [modalSalaryVar, setModalSalaryVar] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  // 3. UseEffect
  // 3.1. Get Payslips
  useEffect(() => {
    if (!isAllowedToGetPayslips) {
      permissionWarningNotification("Mendapatkan", "Daftar Slip Gaji");
      setLoadingPayslips(false);
      return;
    }

    setLoadingPayslips(true);
    fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/getEmployeesPayslip?rows=${rowsPayslips}&page=${pagePayslips}${
        selectedPayslipStatusId && `&is_posted=${selectedPayslipStatusId - 1}`
      }`,
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
      })
      .catch((err) => {
        notification.error({
          message: `${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingPayslips(false);
      });
  }, [isAllowedToGetPayslips, refresh]);

  // 3.2. Get Company Client List
  useEffect(() => {
    if (!isAllowedToGetCompanyList) {
      permissionWarningNotification("Mendapatkan", "Daftar Company Client");
      setLoadingCompanyList(false);
      return;
    }

    setLoadingCompanyList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyClientList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataCompanyList(res2.data);
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
      .finally(() => {
        setLoadingCompanyList(false);
      });
  }, [isAllowedToGetCompanyList]);

  // 3.3. Get Employee Role List
  useEffect(() => {
    if (!isAllowedToGetRoleList) {
      permissionWarningNotification("Mendapatkan", "Daftar Employee Role");
      setLoadingRoleList(false);
      return;
    }

    setLoadingRoleList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRolesList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataRoleList(res2.data);
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
      .finally(() => {
        setLoadingRoleList(false);
      });
  }, [isAllowedToGetRoleList, refresh]);

  // 3.4. Get Payslip Status Count
  useEffect(() => {
    if (!isAllowedToGetPayslipStatusCount) {
      permissionWarningNotification(
        "Mendapatkan",
        "Data Chart Status Karyawan"
      );
      setLoadingChart(false);
      return;
    }

    setLoadingChart(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeePayslipStatusCount`,
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
          let statusCountRes = res2.data;
          let mappedStatusCount = statusCountRes.map((data) => {
            return {
              total: data?.total,
              is_posted: Number(data?.is_posted) ? "Diterbitkan" : "Draft",
            };
          });
          setPayslipStatusCount(mappedStatusCount);
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
      .finally(() => {
        setLoadingChart(false);
      });
  }, [isAllowedToGetPayslipStatusCount, refresh]);

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
          setRefresh((prev) => prev + 1);
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
          setRefresh((prev) => prev + 1);
          // TODO: display employee name from response
          notification.success({
            message: `Draft slip gaji berhasil dibuat.`,
            duration: 3,
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

  const handleDownloadPayslip = (payslipId) => {
    if (!isAllowedToDownloadPayslip) {
      permissionWarningNotification("Mengunduh", "Slip Gaji");
      return;
    }
    setLoadingDownload(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/downloadEmployeePayslip?id=${payslipId}`,
      {
        method: "GET",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          notification.success({
            message: `Slip gaji berhasil diunduh.`,
            duration: 3,
          });
        } else {
          notification.error({
            message: `Gagal mengunduh slip gaji. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal mengunduh slip gaji. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingDownload(false);
      });
  };

  const onFilterPayslips = () => {
    setLoadingPayslips(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeesPayslip?sort_by=${
        sortingPayslips.sort_by
      }&sort_type=${
        sortingPayslips.sort_type
      }&role_ids=${selectedRoleId}&placements=${selectedPlacement}&is_posted=${
        selectedPayslipStatusId ? selectedPayslipStatusId - 1 : ""
      }&keyword=${searchingFilterPayslips}&page=${pagePayslips}&rows=${rowsPayslips}`,
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
                    disabled={!isAllowedToDownloadPayslip || loadingDownload}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDownloadPayslip(record.last_month_payslip.id);
                    }}
                  >
                    <div className="flex flex-row space-x-2 items-center">
                      <DownloadOutlined />
                      <p className="whitespace-nowrap">Unduh</p>
                    </div>
                  </ButtonSys>
                ) : (
                  <ButtonSys
                    type={isAllowedToGetPayslip ? "default" : "primary"}
                    disabled={!isAllowedToGetPayslip}
                    onClick={(event) => {
                      event.stopPropagation();
                      rt.push(
                        `/admin/employees/payslip/${record.employee_id}/addPayslip?id=${record.id}`
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
      <div className="grid grid-cols-1 md:px-5" id="mainWrapper">
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
              className="flex flex-col md:flex-row space-y-2 md:space-y-0 
              md:space-x-6 items-end md:items-center"
            >
              <ButtonSys
                type={"default"}
                onClick={() => setModalSalaryVar(true)}
                // disabled
              >
                <div className="flex space-x-2 items-center">
                  <SettingOutlined />
                  <p>Kelola Variabel Gaji</p>
                </div>
              </ButtonSys>
              {dataPayslips.some(
                (employee) => !employee?.last_month_payslip
              ) ? (
                <ButtonSys
                  type={"primary"}
                  onClick={handleRaisePayslip}
                  disabled={!isAllowedToAddPayslip}
                >
                  <div className="flex space-x-2 items-center">
                    <CirclePlusIconSvg size={16} color="#FFFFFF" />
                    <p>Buat Draft Slip Gaji</p>
                  </div>
                </ButtonSys>
              ) : (
                <ButtonSys
                  type={isAllowedToPostPayslips ? "primary" : "default"}
                  onClick={() => setModalPost(true)}
                  disabled={!isAllowedToPostPayslips}
                >
                  <div className="flex space-x-2 items-center">
                    <CheckIconSvg size={16} color="#FFFFFF" />
                    <p>Terbitkan Draft Slip Gaji</p>
                  </div>
                </ButtonSys>
              )}
            </div>
          </div>

          {/* Start: Search criteria */}
          <div className="flex flex-row justify-between w-full items-center mb-4">
            {/* Search by keyword (kata kunci) */}
            <div className="w-4/12">
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

            {/* Filter by position (dropdown) */}
            <div className="w-2/12">
              <Select
                allowClear
                showSearch
                value={selectedRoleId === 0 ? null : selectedRoleId}
                name={`role`}
                disabled={!isAllowedToGetRoleList}
                placeholder="Semua Posisi"
                style={{ width: `100%` }}
                onChange={(value) => {
                  typeof value === "undefined"
                    ? setSelectedRoleId(0)
                    : setSelectedRoleId(value);
                }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {dataRoleList.map((role) => (
                  <Select.Option key={role.id} value={role.id}>
                    {role.name}
                  </Select.Option>
                ))}
              </Select>
            </div>

            {/* Filter by company (dropdown) */}
            <div className="w-2/12">
              <Select
                allowClear
                showSearch
                value={selectedPlacement}
                name={`placement`}
                disabled={!isAllowedToGetCompanyList}
                placeholder="Semua Penempatan"
                style={{ width: `100%` }}
                onChange={(value) => {
                  typeof value === "undefined"
                    ? setSelectedPlacement("")
                    : setSelectedPlacement(value);
                }}
                filterOption={(input, option) =>
                  (option?.value ?? "")
                    .toLowerCase()
                    .includes(input.toLocaleLowerCase())
                }
                optionFilterProp="children"
              >
                <Select.Option key={-1} value={""}>
                  Semua Penempatan
                </Select.Option>
                {dataCompanyList.map((company) => (
                  <Select.Option key={company.id} value={company.name}>
                    {company.name}
                  </Select.Option>
                ))}
              </Select>
            </div>

            {/* Filter by payslip status (dropdown) */}
            <div className="w-2/12">
              <Select
                value={selectedPayslipStatusId}
                allowClear
                name={`status`}
                defaultValue={""}
                style={{ width: `100%` }}
                onChange={(value) => {
                  value == undefined
                    ? setSelectedPayslipStatusId("")
                    : setSelectedPayslipStatusId(value);
                }}
              >
                <Select.Option key={-1} value={""}>
                  <p>Semua Status</p>
                </Select.Option>
                {dataPayslipStatusList.map((status, idx) => (
                  <Select.Option key={idx} value={status.id}>
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
          <TableCustomPayslipList
            dataSource={dataPayslips}
            setDataSource={setDataPayslips}
            columns={columnPayslip}
            loading={loadingPayslips}
            setpraloading={setLoadingPayslips}
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
            selectedRoleId={selectedRoleId}
            selectedPayslipStatusId={selectedPayslipStatusId}
            selectedPlacement={selectedPlacement}
          />
        </div>
      </div>
      {/* Modal Kelola Variabel Gaji */}
      <AccessControl hasPermission={EMPLOYEE_SALARY_COLUMN_ADD}>
        <ModalManageSalaryVar
          initProps={initProps}
          visible={modalSalaryVar}
          onvisible={setModalSalaryVar}
          loading={loadingSave}
          isAllowedToGetSalaryColumns={isAllowedToGetSalaryColumns}
          isAllowedToAddSalaryColumn={isAllowedToAddSalaryColumn}
          isAllowedToDeleteSalaryColumn={isAllowedToDeleteSalaryColumn}
          isAllowedToUpdateSalaryColumn={isAllowedToUpdateSalaryColumn}
          onOk={() => setModalSalaryVar(false)}
          // disabled
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
