import { ArrowRightOutlined, UploadOutlined } from "@ant-design/icons";
import { Tabs, notification } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";

import { useAccessControl } from "contexts/access-control";

import {
  EMPLOYEE_CONTRACT_ADD,
  EMPLOYEE_CONTRACT_GET,
  EMPLOYEE_CONTRACT_UPDATE,
  EMPLOYEE_DEVICES_GET,
  EMPLOYEE_DEVICE_ADD,
  EMPLOYEE_GET,
  EMPLOYEE_INVENTORIES_GET,
  EMPLOYEE_INVENTORY_ADD,
  EMPLOYEE_UPDATE,
} from "lib/features";

import ButtonSys from "../../../../components/button";
import {
  CheckIconSvg,
  ClipboardListIconSvg,
  CloudUploadIconSvg,
  LeftIconSvg,
  RightIconSvg,
  UploadIconSvg,
  XIconSvg,
} from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import httpcookie from "cookie";

const EmployeeProfileForm = dynamic(
  () => import("../../../../components/screen/employee/create/profile"),
  { ssr: false }
);
const EmployeeContractForm = dynamic(
  () => import("../../../../components/screen/employee/create/contract"),
  { ssr: false }
);
const EmployeeInventoryForm = dynamic(
  () => import("../../../../components/screen/employee/create/inventory"),
  { ssr: false }
);

const EmployeeCreateIndex = ({ initProps, dataProfile, sidemenu }) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetEmployee = hasPermission(EMPLOYEE_GET);
  const isAllowedToUpdateEmployee = hasPermission(EMPLOYEE_UPDATE);
  const isAllowedToGetEmployeeContract = hasPermission(EMPLOYEE_CONTRACT_GET);
  const isAllowedToAddEmployeeContract = hasPermission(EMPLOYEE_CONTRACT_ADD);
  const isAllowedToUpdateEmployeeContract = hasPermission(
    EMPLOYEE_CONTRACT_UPDATE
  );
  const isAllowedToGetEmployeeInventories = hasPermission(
    EMPLOYEE_INVENTORIES_GET
  );
  const isAllowedToAddEmployeeInventory = hasPermission(EMPLOYEE_INVENTORY_ADD);
  const isAllowedToGetEmployeeDevices = hasPermission(EMPLOYEE_DEVICES_GET);
  const isAllowedToAddEmployeeDevice = hasPermission(EMPLOYEE_DEVICE_ADD);

  // INIT
  const rt = useRouter();
  const employeeId = rt?.query?.id;

  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 2);
  pathTitleArr.splice(1, 2, "Daftar Karyawan", "Tambah Karyawan");

  // 1. USE STATE
  const [refresh, setRefresh] = useState(-1);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingEmployee, setLoadingEmployee] = useState(false);

  const [currentTab, setCurrentTab] = useState("1");
  const [dataEmployee, setDataEmployee] = useState({
    // id_photo: "",
    id: 0,
    name: "",
    nip: "",
    nik: "",
    alias: "",
    phone_number: "",
    email_office: "",
    email_personal: "",
    domicile: "",
    birth_place: "",
    birth_date: "",
    gender: "",
    blood_type: "",
    marital_status: "",
    child_total: "",
    bio_mother_name: "",
    npwp: "",
    bpjs_kesehatan: "",
    bpjs_ketenagakerjaan: "",
    acc_number_bukopin: "",
    acc_number_another: "",
    is_posted: 0,
    contracts: [],
    inventories: [],
  });

  const [dataContract, setDataContract] = useState({
    id: null,
    is_employee_active: 0,
    contract_name: "",
    contract_status_id: "",
    role_id: "",
    employee_status: false,
    contract_doc: "",
    pkwt_reference: "",
    contract_start_at: "",
    contract_end_at: "",
    placement: "",
    new_office: "",
    resign_at: "",
    benefit: {},
  });

  const [inventoryList, setInventoryList] = useState([]);
  console.log(dataEmployee);
  // 2. USE EFFECT
  // 2.1. Get Employee Data
  useEffect(() => {
    if (!isAllowedToGetEmployee) {
      permissionWarningNotification("Mendapatkan", "Data Employee");
      setLoadingEmployee(false);
      return;
    }

    if (employeeId) {
      setLoadingEmployee(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployee?id=${employeeId}`,
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
            setDataEmployee(res2.data);
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
          setLoadingEmployee(false);
        });
    }
  }, [isAllowedToGetEmployee, refresh]);

  // 3. HANDLER
  // Save as draft or posted
  const handleSaveEmployee = (isPosted) => {
    if (!isAllowedToUpdateEmployee) {
      permissionWarningNotification("Menyimpan", "Draft Karyawan");
      return;
    }
    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateEmployee`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...dataEmployee, is_posted: isPosted }),
    })
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          notification.success({
            message: `Draft karyawan berhasil disimpan.`,
            duration: 3,
          });
          if (isPosted === 1) {
            setTimeout(() => {
              setDataEmployee({});
              rt.push(`/admin/employees`);
            }, 500);
          }
        } else {
          notification.error({
            message: `Gagal menyimpan draft karyawan. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menyimpan draft karyawan. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingUpdate(false);
      });
  };

  const handleAddEmployeeContract = () => {
    const payload = {
      employee_id: employeeId,
    };

    if (!isAllowedToAddEmployeeContract) {
      permissionWarningNotification("Menambah", "Kontrak Karyawan");
      return;
    }

    if (employeeId) {
      setLoadingAdd(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addEmployeeContract`, {
        method: "POST",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((response2) => {
          setRefresh((prev) => prev + 1);
          if (!response2.success) {
            notification.error({
              message: `Gagal menambahkan kontrak karyawan. ${response2.message}`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: `Gagal menambahkan kontrak karyawan. ${err.response}`,
            duration: 3,
          });
        })
        .finally(() => setLoadingAdd(false));
    }
  };

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className=" shadow-lg rounded-md bg-white py-7 px-4">
        <div className="flex flex-row items-center justify-between mb-4 px-1">
          <h3 className="mig-heading--3">Tambah Karyawan</h3>
          <div className="flex flex-row space-x-6">
            {currentTab == "1" ? (
              <ButtonSys
                type={"default"}
                color={"danger"}
                className="flex flex-row"
                onClick={() => {
                  rt.push("/admin/employees");
                }}
              >
                <XIconSvg size={18} color={`#BF4A40`} />
                <p className="ml-2">Batalkan</p>
              </ButtonSys>
            ) : (
              <ButtonSys
                type={"default"}
                className="flex flex-row"
                onClick={() => {
                  let numTab = Number(currentTab);
                  currentTab <= 3 && setCurrentTab(String(numTab - 1));
                }}
              >
                <LeftIconSvg size={18} color={`#35763B`} />
                <p className="ml-2">Kembali</p>
              </ButtonSys>
            )}
            <ButtonSys
              type={"default"}
              className="flex flex-row"
              onClick={() => handleSaveEmployee(0)}
            >
              <ClipboardListIconSvg size={18} color={`#35763B`} />
              <p className="ml-2">Simpan Draft</p>
            </ButtonSys>
            {currentTab == "3" ? (
              <ButtonSys
                type={"primary"}
                className="flex flex-row"
                onClick={() => handleSaveEmployee(1)}
              >
                <CheckIconSvg size={18} color={`white`} />
                <p className="ml-2">Simpan Karyawan</p>
              </ButtonSys>
            ) : (
              <ButtonSys
                type={"primary"}
                className="flex flex-row"
                onClick={() => {
                  let numTab = Number(currentTab);
                  currentTab < 3 && setCurrentTab(String(numTab + 1));
                }}
                disabled={loadingUpdate}
              >
                <p className="mr-2">Selanjutnya</p>
                <RightIconSvg size={18} color={`white`} />
              </ButtonSys>
            )}
          </div>
        </div>
        <Tabs
          defaultActiveKey="1"
          tabBarGutter={60}
          className="px-1"
          activeKey={currentTab}
          onTabClick={(key) => setCurrentTab(key)}
          onChange={(key) => {
            // add employee contract if it has no contract yet
            key == "2" &&
              dataEmployee.contracts?.length === 0 &&
              handleAddEmployeeContract();
          }}
        >
          <Tabs.TabPane tab="Profil Karyawan" key="1">
            <EmployeeProfileForm
              dataEmployee={dataEmployee}
              setDataEmployee={setDataEmployee}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Kontrak Karyawan" key="2">
            <EmployeeContractForm
              initProps={initProps}
              dataContract={dataContract}
              setDataContract={setDataContract}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Inventaris & Piranti" key="3">
            <EmployeeInventoryForm
              initProps={initProps}
              inventoryList={inventoryList}
              setInventoryList={setInventoryList}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res }) {
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
      sidemenu: "employee-list",
    },
  };
}

export default EmployeeCreateIndex;
