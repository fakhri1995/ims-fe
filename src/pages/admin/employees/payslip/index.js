import { UpOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  Form,
  Input,
  Menu,
  Select,
  Spin,
  Switch,
  Tag,
  notification,
} from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { Bar } from "react-chartjs-2";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  COMPANY_LISTS_GET,
  EMPLOYEES_PAYSLIPS_GET,
  EMPLOYEES_PAYSLIPS_POST,
  EMPLOYEE_PAYSLIP_ADD,
  EMPLOYEE_PAYSLIP_GET,
  RECRUITMENT_ROLES_LIST_GET,
} from "lib/features";
import { permissionWarningNotification } from "lib/helper";

import SettingsIcon from "assets/vectors/icon-settings.svg";

import ButtonSys from "../../../../components/button";
import ButtonSysColor from "../../../../components/buttonColor";
import {
  CheckIconSvg,
  EditIconSvg,
  SearchIconSvg,
  TrashIconSvg,
  UserPlusIconSvg,
} from "../../../../components/icon";
import { DownloadIconSvg, SettingsIconSvg } from "../../../../components/icon";
import Layout from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import {
  ModalHapus2,
  ModalUbah,
} from "../../../../components/modal/modalCustom";
import {
  TableCustomEmployeeList,
  TableCustomPayslipList,
} from "../../../../components/table/tableCustom";
import { H2 } from "../../../../components/typography";
import { createKeyPressHandler } from "../../../../lib/helper";
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
  const isAllowedToGetEmployeesPayslips = hasPermission(EMPLOYEES_PAYSLIPS_GET);
  const isAllowedToGetPayslip = hasPermission(EMPLOYEE_PAYSLIP_GET);
  const isAllowedToAddPayslip = hasPermission(EMPLOYEE_PAYSLIP_ADD);
  const isAllowedToPostEmployeesPayslips = hasPermission(
    EMPLOYEES_PAYSLIPS_POST
  );

  const isAllowedToGetCompanyList = hasPermission(COMPANY_LISTS_GET);
  const isAllowedToGetRoleList = hasPermission(RECRUITMENT_ROLES_LIST_GET);

  // 1. Init
  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 1);
  pathTitleArr.splice(1, 1, "Slip Gaji");

  // 2. Use state
  // 2.1. Charts
  const [loadingChart, setLoadingChart] = useState(false);
  const [payslipStatusCount, setTopCompanyCount] = useState([
    {
      name: "Diterbitkan",
      status_count: 20,
    },
    {
      name: "Draft",
      status_count: 30,
    },
  ]);
  const [dataColorBar, setDataColorBar] = useState(["#35763B", "#E5C471"]);

  // 2.2. Table Employee List
  // filter data
  const [isEmployeeActive, setIsEmployeeActive] = useState(1);

  const [loadingCompanyList, setLoadingCompanyList] = useState(false);
  const [dataCompanyList, setDataCompanyList] = useState([]);

  const [loadingRoleList, setLoadingRoleList] = useState(false);
  const [dataRoleList, setDataRoleList] = useState([]);

  const [loadingContractStatusList, setLoadingContractStatusList] =
    useState(false);
  const [dataPayslipStatusList, setDataContractStatusList] = useState([]);

  // filter search & selected options
  const [searchingFilterPayslips, setSearchingFilterPayslips] = useState("");
  const [selectedPlacement, setSelectedPlacement] = useState(0);
  const [selectedRoleId, setSelectedRoleId] = useState(0);
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

  // 2.3. Post payslip
  const [loadingPost, setLoadingPost] = useState(false);
  const [modalPost, setModalPost] = useState(false);

  // 2.4. Delete payslip
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // 3. UseEffect
  // 3.1. Get Payslips
  useEffect(() => {
    if (!isAllowedToGetEmployeesPayslips) {
      permissionWarningNotification("Mendapatkan", "Daftar Slip Gaji");
      setLoadingPayslips(false);
      return;
    }

    setLoadingPayslips(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployees?rows=10&is_employe_active=${isEmployeeActive}`,
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
  }, [isAllowedToGetEmployeesPayslips, refresh]);

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

  // 4. Event
  const handlePostPayslips = () => {
    if (!isAllowedToPostEmployeesPayslips) {
      permissionWarningNotification("Menerbitkan", "Slip Gaji Semua Karyawan");
      return;
    }
    setLoadingPost(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/postPayslips`, {
      method: "POST",
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
            message: `Draft slip gaji untuk semua karyawan berhasil diterbitkan. ${response2.message}`,
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

  const onFilterPayslips = () => {
    setLoadingPayslips(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getPayslips?sort_by=${sortingPayslips.sort_by}&sort_type=${sortingPayslips.sort_type}&role_id=${selectedRoleId}&placement=${selectedPlacement}&contract_status_id=${selectedPayslipStatusId}&is_employe_active=${isEmployeeActive}&keyword=${searchingFilterPayslips}&page=${pagePayslips}&rows=${rowsPayslips}`,
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
      sorter: isAllowedToGetEmployeesPayslips
        ? (a, b) => a.name?.toLowerCase() > b.name?.toLowerCase()
        : false,
    },
    {
      title: "NIP",
      dataIndex: "nip",
    },
    {
      title: "Penempatan",
      dataIndex: "placement",
      render: (text, record, index) => {
        return {
          children: <>{record.contracts[0]?.placement || "-"}</>,
        };
      },
    },
    {
      title: "Posisi",
      dataIndex: "position",
      render: (text, record, index) => {
        return {
          children: <>{record.contracts[0]?.role_id || "-"}</>,
        };
      },
    },
    {
      title: "No. Telepon",
      dataIndex: "phone_number",
    },
    {
      title: "Status Slip Gaji",
      dataIndex: "payslip_status",
      render: (text, record, index) => {
        return {
          children: (
            <>
              {record.status == "draft" ? (
                <div className="bg-state2 bg-opacity-10 text-state2 py-1 px-7 rounded-md">
                  Draft
                </div>
              ) : (
                <div className="bg-primary100 bg-opacity-10 text-primary100 py-1 px-4 rounded-md">
                  Diterbitkan
                </div>
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
              {record.status == "draft" ? (
                <div className="flex flex-col space-y-2">
                  <ButtonSys
                    type={isAllowedToGetPayslip ? "default" : "primary"}
                    disabled={!isAllowedToGetPayslip}
                    onClick={(event) => {
                      event.stopPropagation();
                      // rt.push(
                      //   `/admin/employees/${record.id}/editContract?id=${record?.contracts[0]?.id}`
                      // );
                    }}
                  >
                    <div className="flex flex-row space-x-2 items-center">
                      <EditIconSvg size={16} color={`#35763B`} />
                      <p className="whitespace-nowrap">Edit Draft</p>
                    </div>
                  </ButtonSys>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <ButtonSys
                    // TODO: ubah role access
                    type={isAllowedToGetPayslip ? "default" : "primary"}
                    disabled={!isAllowedToGetPayslip}
                    onClick={(event) => {
                      event.stopPropagation();
                      // rt.push(
                      //   `/admin/employees/${record.id}/editContract?id=${record?.contracts[0]?.id}`
                      // );
                    }}
                  >
                    <div className="flex flex-row space-x-2 items-center">
                      <DownloadIconSvg size={16} color={`#35763B`} />
                      <p className="whitespace-nowrap">Unduh</p>
                    </div>
                  </ButtonSys>
                </div>
              )}
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
      <div className="flex flex-col" id="mainWrapper">
        <div className="shadow-md rounded-md bg-white p-4 mb-6">
          <h4 className="mig-heading--4 ">Status Slip Gaji (Oktober 2022)</h4>
          {/* CHART STATUS SLIP GAJI */}
          {loadingChart ? (
            <>
              <Spin />
            </>
          ) : (
            <div className="flex flex-row justify-between items-center">
              <div className="w-2/3 h-24">
                <Bar
                  data={{
                    labels: payslipStatusCount.map((doc) =>
                      doc.name.split(" ")
                    ),
                    datasets: [
                      {
                        data: payslipStatusCount.map((doc) => doc.status_count),
                        backgroundColor: payslipStatusCount.map(
                          (doc, idx) =>
                            dataColorBar[idx + (1 % dataColorBar.length) - 1]
                        ),
                        borderColor: payslipStatusCount.map(
                          (doc, idx) =>
                            dataColorBar[idx + (1 % dataColorBar.length) - 1]
                        ),
                        barPercentage: 1.0,
                        barThickness: 24,
                        maxBarThickness: 34,
                        minBarLength: 2,
                        borderRadius: 5,
                      },
                    ],
                  }}
                  options={{
                    title: {
                      display: false,
                    },
                    legend: {
                      display: false,
                    },
                    maintainAspectRatio: false,
                    indexAxis: "y",
                    scales: {
                      x: {
                        grid: {
                          display: false,
                          drawBorder: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                      y: {
                        grid: {
                          display: false,
                        },
                        // ticks: {
                        //   font: {
                        //     family: "Inter, sans-serif",
                        //     size: 10,
                        //   },
                        // },
                      },
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          title: (context) => {
                            return context[0].label.replaceAll(",", " ");
                          },
                        },
                      },
                    },
                  }}
                />
              </div>

              <div className="flex flex-col">
                {payslipStatusCount.map((doc, idx) => (
                  <div key={idx} className="flex items-center space-x-32">
                    <p className="w-3/4">{doc.name}</p>
                    <p className="mig-heading--4 ">{doc.status_count}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Table Karyawan */}
        <div className="col-span-3 flex flex-col shadow-md rounded-md bg-white p-4 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="mig-heading--4 ">Slip Gaji</h4>
            <div className="flex flex-col md:flex-row items-center space-x-6">
              <ButtonSys
                type={"default"}
                // onClick={}
                // disabled
              >
                <div className="flex space-x-2 items-center">
                  <SettingsIconSvg size={16} color="#35763B" />
                  <p>Kelola Variabel Gaji</p>
                </div>
              </ButtonSys>
              <ButtonSys
                type={isAllowedToPostEmployeesPayslips ? "primary" : "default"}
                onClick={() => setModalPost(true)}
                disabled={!isAllowedToPostEmployeesPayslips}
              >
                <div className="flex space-x-2 items-center">
                  <CheckIconSvg size={16} color="#FFFFFF" />
                  <p className="">Terbitkan Draft Slip Gaji</p>
                </div>
              </ButtonSys>
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
                disabled={!isAllowedToGetEmployeesPayslips}
              />
            </div>

            {/* Filter by position (dropdown) */}
            <div className="w-2/12">
              <Select
                value={selectedRoleId === 0 ? null : selectedRoleId}
                allowClear
                name={`role`}
                disabled={!isAllowedToGetRoleList}
                placeholder="Semua Posisi"
                style={{ width: `100%` }}
                onChange={(value) => {
                  typeof value === "undefined"
                    ? setSelectedRoleId(0)
                    : setSelectedRoleId(value);
                }}
              >
                {/* <Select.Option value={0}>Semua Role</Select.Option> */}
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
                value={selectedPlacement === 0 ? null : selectedPlacement}
                allowClear
                name={`role`}
                disabled={!isAllowedToGetCompanyList}
                placeholder="Semua Penempatan"
                style={{ width: `100%` }}
                onChange={(value) => {
                  typeof value === "undefined"
                    ? setSelectedPlacement(0)
                    : setSelectedPlacement(value);
                }}
              >
                {/* <Select.Option value={0}>Semua Role</Select.Option> */}
                {dataCompanyList.map((company) => (
                  <Select.Option key={company.id} value={company.id}>
                    {company.name}
                  </Select.Option>
                ))}
              </Select>
            </div>

            {/* Filter by payslip status (dropdown) */}
            <div className="w-2/12">
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
              disabled={!isAllowedToGetEmployeesPayslips}
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
      <AccessControl hasPermission={EMPLOYEES_PAYSLIPS_POST}>
        <ModalUbah
          title={"Konfirmasi Penerbitan Draft Slip Gaji"}
          visible={modalPost}
          onvisible={setModalPost}
          onOk={handlePostPayslips}
          onCancel={() => setModalPost(false)}
          loading={loadingPost}
          disabled={!isAllowedToPostEmployeesPayslips}
          okButtonText="Ya, saya yakin"
        >
          Apakah Anda yakin inign menerbitkan draft slip gaji untuk semua
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
