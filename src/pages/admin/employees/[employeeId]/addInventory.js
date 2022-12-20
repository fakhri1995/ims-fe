import { Spin, notification } from "antd";
import parse from "html-react-parser";
import moment from "moment";
import "moment/locale/id";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Html from "react-pdf-html";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import {
  EMPLOYEE_INVENTORY_DELETE,
  EMPLOYEE_INVENTORY_GET,
  EMPLOYEE_INVENTORY_UPDATE,
} from "lib/features";

import ButtonSys from "../../../../components/button";
import { CheckIconSvg, XIconSvg } from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import ModalCore from "../../../../components/modal/modalCore";
import InventoryForm from "../../../../components/screen/employee/create/inventory/inventoryForm";
import {
  objectToFormData,
  permissionWarningNotification,
} from "../../../../lib/helper";
import httpcookie from "cookie";

moment.locale("id");

const EmployeeInventoryAddIndex = ({
  initProps,
  dataProfile,
  sidemenu,
  employeeId,
  dataEmployee,
}) => {
  /**
   * Dependencies
   */
  console.log(dataEmployee);
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetEmployeeInventory = hasPermission(EMPLOYEE_INVENTORY_GET);
  const isAllowedToUpdateEmployeeInventory = hasPermission(
    EMPLOYEE_INVENTORY_UPDATE
  );
  const isAllowedToDeleteEmployeeInventory = hasPermission(
    EMPLOYEE_INVENTORY_DELETE
  );

  //INIT
  const rt = useRouter();
  const { id: inventoryId } = rt.query;

  // Breadcrumb url
  const pathArr = rt.asPath.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 3);
  pathTitleArr.splice(
    1,
    3,
    "Daftar Karyawan",
    dataEmployee?.name,
    "Tambah Inventaris"
  );

  // 1. STATE
  // 1.1. display
  const [praloading, setpraloading] = useState(true);
  const [dataInventory, setDataInventory] = useState([
    {
      id: null,
      employee_id: null,
      id_number: "",
      device_name: "",
      referance_invertory: "",
      device_type: "",
      serial_number: "",
      delivery_date: "",
      return_date: "",
      pic_delivery: "",
      pic_return: "",
      delivery_file: "",
      return_file: "",
    },
  ]);

  const [refresh, setRefresh] = useState(-1);

  // 1.2 Update
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [modalSave, setModalSave] = useState(false);
  const [disablePublish, setDisablePublish] = useState(true);

  // 1.3. Delete
  const [loadingDelete, setLoadingDelete] = useState(false);

  // 2. USE EFFECT
  // 2.1 Get employee inventory detail
  useEffect(() => {
    if (!isAllowedToGetEmployeeInventory) {
      permissionWarningNotification(
        "Mendapatkan",
        "Detail Inventaris Karyawan"
      );
      setpraloading(false);
      return;
    }
    if (inventoryId) {
      setpraloading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeeInventory?id=${inventoryId}`,
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
            setDataInventory([response2.data]);
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
  }, [isAllowedToGetEmployeeInventory, inventoryId, refresh]);

  // 2.2 Disable "Simpan" button if any required field is empty
  useEffect(() => {
    let requiredInventoryField = dataInventory.every((inventory) => {
      let isDevicesFilled = inventory.devices?.every((device) =>
        Boolean(device.id_number && device.device_name)
      );
      return Boolean(
        inventory.id_number &&
          inventory.device_name &&
          inventory.referance_invertory &&
          inventory.delivery_date &&
          inventory.pic_delivery &&
          isDevicesFilled
      );
    });

    if (!requiredInventoryField) {
      setDisablePublish(true);
    } else {
      setDisablePublish(false);
    }
  }, [dataInventory]);

  // 3. Event
  // Save Employee Inventory
  const handleSaveInventory = () => {
    if (!isAllowedToUpdateEmployeeInventory) {
      permissionWarningNotification("Menyimpan", "Inventaris Karyawan");
      return;
    }

    if (!dataInventory[0]) {
      notification.error({
        message: `Gagal menyimpan data inventaris`,
        duration: 3,
      });
    }

    // Setup form data to be sent in API
    let payloadFormData;
    if (dataInventory[0]?.devices) {
      // Mapping devices list of objects to required format in API updateEmployeeInventory form-data
      let devicesObjectList = dataInventory[0]?.devices?.map((device, idx) => {
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
        Object.assign(allDevicesObject, deviceObject);
      }

      let inventoryDataWithDevice = {
        ...dataInventory[0],
        ...allDevicesObject,
      };

      // convert object to form data
      payloadFormData = objectToFormData(inventoryDataWithDevice);
    } else {
      payloadFormData = objectToFormData(dataInventory[0]);
    }

    // Fetch API
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
        if (response2.success) {
          setModalSave(false);
          notification.success({
            message: `Inventaris karyawan berhasil ditambahkan.`,
            duration: 3,
          });
          rt.push(`/admin/employees/${employeeId}?tab=3`);
        } else {
          notification.error({
            message: `Gagal menyimpan inventaris karyawan. ${response2.message}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menyimpan inventaris karyawan. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingUpdate(false);
      });
  };

  // Delete Employee Inventory
  const handleDeleteInventory = () => {
    if (!isAllowedToDeleteEmployeeInventory) {
      permissionWarningNotification("Menghapus", "Inventaris Karyawan");
      return;
    }
    setLoadingDelete(true);
    fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/deleteEmployeeInventory?id=${Number(
        dataInventory[0].id
      )}&employee_id=${Number(employeeId)}`,
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
          rt.back();
        } else {
          notification.error({
            message: `Gagal menghapus inventaris karyawan. ${res2.response}`,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: `Gagal menghapus inventaris karyawan. ${err.response}`,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingDelete(false);
      });
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
      <div className="shadow-lg rounded-md bg-white py-7 px-5">
        <div className="flex flex-row items-center justify-between mb-7">
          <h4 className="mig-heading--4">Tambah Inventaris</h4>
          <div className="space-x-6">
            <ButtonSys
              color={"danger"}
              type={"default"}
              onClick={handleDeleteInventory}
            >
              <div className="flex flex-row space-x-2">
                <XIconSvg color={"#BF4A40"} size={16} />
                <p>Batalkan</p>
              </div>
            </ButtonSys>
            <ButtonSys
              type={"primary"}
              onClick={() => setModalSave(true)}
              disabled={!isAllowedToUpdateEmployeeInventory || disablePublish}
            >
              <div className="flex flex-row space-x-2">
                <CheckIconSvg color={"white"} size={16} />
                <p>Simpan</p>
              </div>
            </ButtonSys>
          </div>
        </div>
        <InventoryForm
          initProps={initProps}
          idx={0}
          inventoryList={dataInventory}
          setInventoryList={setDataInventory}
          inventoryId={inventoryId}
          setRefresh={setRefresh}
        />
      </div>

      {/* Modal Save Inventory */}
      <AccessControl hasPermission={EMPLOYEE_INVENTORY_UPDATE}>
        <ModalCore
          title={"Konfirmasi Penambahan Inventaris"}
          visible={modalSave}
          onCancel={() => setModalSave(false)}
          footer={
            <Spin spinning={loadingUpdate}>
              <div className="flex justify-between items-center">
                <ButtonSys type="default" onClick={() => setModalSave(false)}>
                  Batalkan
                </ButtonSys>
                <ButtonSys
                  type={"primary"}
                  onClick={handleSaveInventory}
                  disabled={!isAllowedToUpdateEmployeeInventory}
                >
                  <div className="flex flex-row space-x-2">
                    <CheckIconSvg size={16} color={`white`} />
                    <p>Ya, saya yakin</p>
                  </div>
                </ButtonSys>
              </div>
            </Spin>
          }
        >
          Apakah Anda yakin ingin menambahkan Inventaris&nbsp;
          <strong>{dataInventory[0].device_name}?</strong>
        </ModalCore>
      </AccessControl>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res, query }) {
  const employeeId = query.employeeId;
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
  const dataEmployee = resjsonGE?.data;

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "employee-list",
      employeeId,
      dataEmployee,
    },
  };
}

export default EmployeeInventoryAddIndex;
