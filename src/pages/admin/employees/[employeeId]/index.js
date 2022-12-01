import { Tabs, notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  EMPLOYEE_CONTRACT_ADD,
  EMPLOYEE_CONTRACT_UPDATE,
  EMPLOYEE_DELETE,
  EMPLOYEE_GET,
  EMPLOYEE_INVENTORY_ADD,
  EMPLOYEE_INVENTORY_UPDATE,
  EMPLOYEE_UPDATE,
} from "lib/features";

import ButtonSys from "../../../../components/button";
import {
  CirclePlusIconSvg,
  EditIconSvg,
  OneUserIconSvg,
  TrashIconSvg,
} from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import { ModalHapus2 } from "../../../../components/modal/modalCustom";
import EmployeeContractDetail from "../../../../components/screen/employee/detail/contract";
import EmployeeInventoryDetail from "../../../../components/screen/employee/detail/inventory";
import EmployeeProfileDetail from "../../../../components/screen/employee/detail/profile";
import {
  generateStaticAssetUrl,
  permissionWarningNotification,
} from "../../../../lib/helper";
import httpcookie from "cookie";

const EmployeeDetailIndex = ({
  initProps,
  dataProfile,
  sidemenu,
  employeeId,
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
  const isAllowedToUpdateEmployee = hasPermission(EMPLOYEE_UPDATE);
  const isAllowedToDeleteEmployee = hasPermission(EMPLOYEE_DELETE);
  const isAllowedToAddEmployeeContract = hasPermission(EMPLOYEE_CONTRACT_ADD);
  const isAllowedToUpdateEmployeeContract = hasPermission(
    EMPLOYEE_CONTRACT_UPDATE
  );
  const isAllowedToAddEmployeeInventory = hasPermission(EMPLOYEE_INVENTORY_ADD);
  const isAllowedToUpdateEmployeeInventory = hasPermission(
    EMPLOYEE_INVENTORY_UPDATE
  );

  //INIT
  const rt = useRouter();
  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 2);
  pathTitleArr.splice(1, 2, "Daftar Karyawan", "Karyawan");

  // 1. STATE
  // 1.1. display
  const [praloading, setpraloading] = useState(true);
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

  const [refresh, setRefresh] = useState(-1);

  // 1.2 Update
  const [drawerUpdate, setDrawerUpdate] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(-1);

  // 1.3. Delete
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // 1.4 Add Contract
  const [loadingAdd, setLoadingAdd] = useState(false);

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

  // 3. Event
  const onAddContractButtonClicked = useCallback(() => {
    handleAddEmployeeContract();
  }, []);

  const onAddInventoryButtonClicked = useCallback(() => {
    handleAddEmployeeInventory();
  }, []);

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
          if (response2.success) {
            rt.push(`${employeeId}/addContract?id=${response2.data?.id}`);
          } else {
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

  const handleAddEmployeeInventory = () => {
    const payload = {
      employee_id: employeeId,
    };

    if (!isAllowedToAddEmployeeInventory) {
      permissionWarningNotification("Menambah", "Inventaris Karyawan");
      return;
    }

    if (employeeId) {
      setLoadingAdd(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addEmployeeInventory`, {
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
            rt.push(`${employeeId}/addInventory?id=${response2.data?.id}`);
          } else {
            notification.error({
              message: `Gagal menambahkan inventaris karyawan. ${response2.message}`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: `Gagal menambahkan inventaris karyawan. ${err.response}`,
            duration: 3,
          });
        })
        .finally(() => setLoadingAdd(false));
    }
  };

  const handleDeleteEmployee = () => {
    if (!isAllowedToDeleteEmployee) {
      permissionWarningNotification("Menonaktifkan", "Karyawan");
      return;
    }
    setLoadingDelete(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteEmployee?id=${Number(
        employeeId
      )}`,
      {
        method: "DELETE",
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          notification.success({
            message: res2.message,
            duration: 3,
          });
          setModalDelete(false);
          rt.push("/admin/employees");
        } else {
          notification.error({
            message: `Gagal menonaktifkan karyawan. ${res2.response}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus kandidat. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingDelete(false);
        setModalDelete(false);
      });
  };

  // Tab Button
  const tabButton = () => {
    let renderedButton = <></>;
    switch (currentTab) {
      case "1":
        renderedButton = (
          <ButtonSys
            type={"default"}
            onClick={() => rt.push(`${employeeId}/editProfile`)}
            disabled={!isAllowedToUpdateEmployee}
          >
            <div className="flex flex-row items-center space-x-2">
              <EditIconSvg color={"#35763B"} size={16} />
              <p>Edit Profil</p>
            </div>
          </ButtonSys>
        );
        break;
      case "2":
        renderedButton = (
          <ButtonSys
            type={"default"}
            onClick={onAddContractButtonClicked}
            disabled={!isAllowedToAddEmployeeContract}
          >
            <div className="flex flex-row items-center space-x-2">
              <CirclePlusIconSvg color={"#35763B"} size={16} />
              <p>Tambah Kontrak</p>
            </div>
          </ButtonSys>
        );
        break;
      case "3":
        renderedButton = (
          <ButtonSys
            type={"default"}
            onClick={onAddInventoryButtonClicked}
            disabled={!isAllowedToAddEmployeeInventory}
          >
            <div className="flex flex-row items-center space-x-2">
              <CirclePlusIconSvg color={"#35763B"} size={16} />
              <p>Tambah Inventaris</p>
            </div>
          </ButtonSys>
        );
    }
    return renderedButton;
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
      <div>
        <div className="flex flex-row gap-5 w-full">
          {/* Left Column - ID Card Photo */}
          {dataEmployee.id_card_photo ? (
            <img
              src={generateStaticAssetUrl(dataEmployee.id_card_photo?.link)}
              alt={dataEmployee.id_card_photo?.description}
              className="w-1/5 bg-cover object-cover rounded-md shadow-lg"
            />
          ) : (
            <div
              className="w-1/5 bg-white rounded-md shadow-lg flex flex-col items-center 
                justify-center space-y-2 p-4"
            >
              <OneUserIconSvg size={200} color={"black"} strokeWidth={1} />
              <h4 className="mig-heading--4 text-center">
                {dataEmployee?.name}
              </h4>
            </div>
          )}

          {/* Right column */}
          <div className="flex flex-col w-4/5 gap-5">
            {/* Employee Status */}
            <div
              className="shadow-lg rounded-md bg-white px-6 py-3 flex flex-row 
							justify-between items-center"
            >
              <div className="flex flex-col space-y-2">
                <p className="mig-caption--medium text-mono80">
                  Status Karyawan
                </p>
                {dataEmployee?.contracts[0]?.is_employee_active ? (
                  <div className="flex flex-row space-x-2 items-center">
                    <div className="rounded-full w-4 h-4 bg-primary100"></div>
                    <h4 className="mig-heading--4">Aktif</h4>
                  </div>
                ) : (
                  <div className="flex flex-row space-x-2 items-center">
                    <div className="rounded-full w-4 h-4 bg-warning"></div>
                    <h4 className="mig-heading--4">Tidak Aktif</h4>
                  </div>
                )}
              </div>
              <ButtonSys
                type={!isAllowedToDeleteEmployee ? "primary" : "default"}
                color={"danger"}
                onClick={() => setModalDelete(true)}
                disabled={!isAllowedToDeleteEmployee}
              >
                <TrashIconSvg color={"#BF4A40"} size={16} />
                <p className="ml-2">Nonaktifkan Karyawan</p>
              </ButtonSys>
            </div>

            {/* Profile summary */}
            <div className="shadow-lg rounded-md bg-white py-4 px-6 divide-y-2 h-full">
              <h4 className="mig-heading--4 mb-3">Ringkasan Profil</h4>
              <div className="grid grid-cols-2 gap-4 pt-3">
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">Nama</p>
                  <p>{dataEmployee?.name}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">NIP</p>
                  <p>{dataEmployee?.nip}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">Posisi</p>
                  <p>{dataEmployee?.role_name}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">
                    Status Kontrak
                  </p>
                  <p>{dataEmployee?.contracts[0]?.contract_status_name}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">E-mail</p>
                  <p>{dataEmployee?.email_office}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="mig-caption--medium text-mono80">
                    Nomor Telepon
                  </p>
                  <p>{dataEmployee?.phone_number}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Employee detail */}
        <div className="shadow-lg rounded-md bg-white p-4 mt-8">
          <Tabs
            defaultActiveKey="1"
            tabBarGutter={60}
            className="px-1"
            activeKey={currentTab}
            onTabClick={(key) => setCurrentTab(key)}
            tabBarExtraContent={tabButton()}
          >
            <Tabs.TabPane tab="Detail Profil" key="1">
              <EmployeeProfileDetail dataEmployee={dataEmployee} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Kontrak Karyawan" key="2">
              <EmployeeContractDetail
                initProps={initProps}
                employeeId={employeeId}
                isAllowedToUpdateEmployeeContract={
                  isAllowedToUpdateEmployeeContract
                }
                dataEmployee={dataEmployee}
                setRefresh={setRefresh}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Inventaris & Piranti" key="3">
              <EmployeeInventoryDetail
                initProps={initProps}
                employeeId={employeeId}
                isAllowedToUpdateEmployeeInventory={
                  isAllowedToUpdateEmployeeInventory
                }
                dataEmployee={dataEmployee}
                setRefresh={setRefresh}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>

      {/* Modal Delete Employee */}
      <AccessControl hasPermission={EMPLOYEE_DELETE}>
        <ModalHapus2
          title={`Peringatan`}
          visible={modalDelete}
          onvisible={setModalDelete}
          onOk={handleDeleteEmployee}
          onCancel={() => {
            setModalDelete(false);
          }}
          loading={loadingDelete}
          okButtonText={"Ya, saya yakin"}
        >
          Apakah Anda yakin ingin menonaktifkan karyawan{" "}
          <strong>{dataEmployee?.name}</strong>?
        </ModalHapus2>
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

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "employee-list",
      employeeId,
    },
  };
}

export default EmployeeDetailIndex;
