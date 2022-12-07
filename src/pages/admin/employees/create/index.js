import { Tabs, notification } from "antd";
import debounce from "lodash.debounce";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useCallback } from "react";

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
  EMPLOYEE_INVENTORY_UPDATE,
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
import { objectToFormData } from "../../../../lib/helper";
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
  const isAllowedToUpdateEmployeeInventory = hasPermission(
    EMPLOYEE_INVENTORY_UPDATE
  );

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
  const prevTab = useRef();
  const [dataEmployee, setDataEmployee] = useState({
    id: null,
    id_card_photo: null,
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
    number_of_children: "",
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
    employee_id: null,
    is_employee_active: 0,
    contract_name: "",
    contract_file: null,
    contract_status_id: null,
    role_id: null,
    employee_status: false,
    pkwt_reference: "",
    annual_leave: 0,
    contract_start_at: "",
    contract_end_at: "",
    placement: "",
    new_office: "",
    resign_at: "",
    benefit: {},
  });

  const [inventoryList, setInventoryList] = useState([]);

  // 2. USE EFFECT
  useEffect(() => {
    prevTab.current = currentTab;
  }, [currentTab]);

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
            setDataContract(res2.data?.contracts[0]);
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

  // 2.2. Debounce function for auto save draft
  const debouncedSaveProfile = useCallback(
    debounce((data) => {
      handleSaveProfile(0, data);
    }, 10000),
    []
  );
  const debouncedSaveContract = useCallback(
    debounce((data) => {
      handleSaveContract(data);
    }, 10000),
    []
  );
  const debouncedSaveInventory = useCallback(
    debounce((data) => {
      handleSaveInventory(data);
    }, 10000),
    []
  );

  // 2.3. Cleanup debounce function
  useEffect(() => {
    return () => {
      debouncedSaveProfile.cancel();
      debouncedSaveContract.cancel();
      debouncedSaveInventory.cancel();
    };
  }, []);

  // 3. HANDLER
  const handleAddEmployeeContract = () => {
    const payload = {
      employee_id: employeeId,
    };

    if (!isAllowedToAddEmployeeContract) {
      permissionWarningNotification("Menambah", "Kontrak Karyawan");
      return;
    }

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
  };

  // Save profile as draft or posted
  const handleSaveProfile = (isPosted, employeeProfileData) => {
    if (!isAllowedToUpdateEmployee) {
      permissionWarningNotification("Menyimpan", "Draft Karyawan");
      return;
    }

    if (employeeProfileData) {
      const payloadFormData = objectToFormData({
        ...employeeProfileData,
        is_posted: isPosted,
      });

      setLoadingUpdate(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateEmployee`, {
        method: "POST",
        headers: {
          Authorization: JSON.parse(initProps),
        },
        body: payloadFormData,
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
    }
  };

  // Save contract
  const handleSaveContract = (contractData) => {
    if (!isAllowedToUpdateEmployeeContract) {
      permissionWarningNotification("Menyimpan", "Kontrak Karyawan");
      return;
    }

    if (contractData) {
      const payloadFormData = objectToFormData(contractData);

      setLoadingUpdate(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateEmployeeContract`, {
        method: "POST",
        headers: {
          Authorization: JSON.parse(initProps),
        },
        body: payloadFormData,
      })
        .then((response) => response.json())
        .then((response2) => {
          setRefresh((prev) => prev + 1);
          if (response2.success) {
            notification.success({
              message: `Draft karyawan berhasil disimpan.`,
              duration: 3,
            });
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
    }
  };

  // Save inventory
  const handleSaveInventory = (inventoryData) => {
    if (!isAllowedToUpdateEmployeeInventory) {
      permissionWarningNotification("Menyimpan", "Inventaris Karyawan");
      return;
    }

    if (!inventoryData) {
      notification.error({
        message: `Gagal menyimpan data inventaris`,
        duration: 3,
      });
    }

    // Mapping devices list of objects to required format in API updateEmployeeInventory form-data
    let devicesObjectList = inventoryData?.devices?.map((device, idx) => {
      let obj = {};
      obj[`device[${idx}][id]`] = device.id;
      obj[`device[${idx}][employee_inventory_id]`] =
        device.employee_inventory_id;
      obj[`device[${idx}][id_number]`] = device.id_number;
      obj[`device[${idx}][device_name]`] = device.device_name;
      obj[`device[${idx}][device_type]`] = device.device_type;
      obj[`device[${idx}][serial_number]`] = device.serial_number;
      return obj;
    });

    let allDevicesObject = {};
    for (let deviceObject of devicesObjectList) {
      allDevicesObject = { ...allDevicesObject, ...deviceObject };
    }

    let inventoryDataWithDevice = { ...inventoryData, ...allDevicesObject };

    // convert object to form data
    const payloadFormData = objectToFormData(inventoryDataWithDevice);

    setLoadingUpdate(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateEmployeeInventory`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
      },
      body: payloadFormData,
    })
      .then((response) => response.json())
      .then((response2) => {
        setRefresh((prev) => prev + 1);
        if (response2.success) {
          notification.success({
            message: `Draft karyawan berhasil disimpan.`,
            duration: 3,
          });
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

  const handleAutoSaveOnTabChange = () => {
    if (prevTab.current == "1") {
      debouncedSaveProfile.cancel();
      handleSaveProfile(0, dataEmployee);
    } else if (prevTab.current == "2") {
      debouncedSaveContract.cancel();
      handleSaveContract(dataContract);
    } else {
      debouncedSaveInventory.cancel();
      handleSaveInventory(inventoryList[0]);
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
                  handleAutoSaveOnTabChange();
                }}
              >
                <LeftIconSvg size={18} color={`#35763B`} />
                <p className="ml-2">Kembali</p>
              </ButtonSys>
            )}
            {/* <ButtonSys
              type={"default"}
              className="flex flex-row"
              onClick={() => {
                handleSaveProfile(0, dataEmployee);
                dataEmployee.contracts.length !== 0 && handleSaveContract(dataContract);
                dataEmployee.inventories.length !== 0 && handleSaveInventory(inventoryList);
              }}
            >
              <ClipboardListIconSvg size={18} color={`#35763B`} />
              <p className="ml-2">Simpan Draft</p>
            </ButtonSys> */}
            {currentTab == "3" ? (
              <ButtonSys
                type={"primary"}
                className="flex flex-row"
                onClick={() => {
                  debouncedSaveInventory.cancel();
                  handleSaveProfile(1, dataEmployee);
                  dataEmployee.contracts.length !== 0 &&
                    handleSaveContract(dataContract);
                  dataEmployee.inventories.length !== 0 &&
                    handleSaveInventory(inventoryList[0]);
                }}
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
                  handleAutoSaveOnTabChange();
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
            handleAutoSaveOnTabChange();
            key == "2" &&
              dataEmployee.contracts?.length === 0 &&
              handleAddEmployeeContract();
          }}
        >
          <Tabs.TabPane tab="Profil Karyawan" key="1">
            <EmployeeProfileForm
              dataEmployee={dataEmployee}
              setDataEmployee={setDataEmployee}
              debouncedApiCall={debouncedSaveProfile}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Kontrak Karyawan" key="2">
            <EmployeeContractForm
              initProps={initProps}
              dataContract={dataContract}
              setDataContract={setDataContract}
              debouncedApiCall={debouncedSaveContract}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Inventaris & Piranti" key="3">
            <EmployeeInventoryForm
              initProps={initProps}
              inventoryList={inventoryList}
              setInventoryList={setInventoryList}
              employeeId={employeeId}
              debouncedApiCall={debouncedSaveInventory}
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
