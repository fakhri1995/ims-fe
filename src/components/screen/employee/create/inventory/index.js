import { Checkbox, Form, Tooltip, notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useAccessControl } from "contexts/access-control";

import {
  EMPLOYEE_INVENTORIES_GET,
  EMPLOYEE_INVENTORY_ADD,
  EMPLOYEE_INVENTORY_DELETE,
} from "lib/features";

import {
  beforeUploadFileMaxSize,
  permissionWarningNotification,
} from "../../../../../lib/helper";
import ButtonSys from "../../../../button";
import InventoryForm from "./inventoryForm";

const EmployeeInventoryForm = ({
  initProps,
  inventoryList,
  setInventoryList,
  employeeId,
  debouncedApiCall,
  refresh,
  setRefresh,
  handleSaveInventory,
}) => {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetEmployeeInventories = hasPermission(
    EMPLOYEE_INVENTORIES_GET
  );
  const isAllowedToAddEmployeeInventory = hasPermission(EMPLOYEE_INVENTORY_ADD);
  const isAllowedToDeleteInventory = hasPermission(EMPLOYEE_INVENTORY_DELETE);

  // 1. USE STATE
  const [isOwn, setIsOwn] = useState(false);
  const [addMode, setAddMode] = useState(false);

  const [loadingInventories, setLoadingInventories] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);

  // const [refresh, setRefresh] = useState(-1);

  // 2. USE EFFECT
  // 2.1. Get Employee Inventories Data
  useEffect(() => {
    if (!isAllowedToGetEmployeeInventories) {
      permissionWarningNotification(
        "Mendapatkan",
        "Daftar Inventaris Employee"
      );
      setLoadingInventories(false);
      return;
    }

    if (employeeId) {
      setLoadingInventories(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployeeInventories?employee_id=${employeeId}`,
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
            if (res2.data.length !== 0) {
              setIsOwn(true);
            } else {
              setIsOwn(false);
            }
            setInventoryList(res2.data);
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
          setLoadingInventories(false);
        });
    }
  }, [isAllowedToGetEmployeeInventories, employeeId, refresh]);

  // 3. HANDLER
  const handleAddNewInventory = () => {
    const payload = {
      employee_id: employeeId,
    };

    if (!isAllowedToAddEmployeeInventory) {
      permissionWarningNotification("Menambah", "Inventaris Karyawan");
      return;
    }

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
          setRefresh((prev) => prev + 1);
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
  };

  return (
    <>
      <Tooltip
        title={inventoryList.length > 0 && "Karyawan masih memiliki inventaris"}
        placement="right"
      >
        <Checkbox
          checked={isOwn}
          disabled={inventoryList.length > 0}
          onChange={(e) => setIsOwn(e.target.checked)}
          className="mb-6"
        >
          Memiliki inventaris & piranti
        </Checkbox>
      </Tooltip>

      {inventoryList.map((inventory, idx) => (
        <InventoryForm
          key={idx}
          idx={idx}
          initProps={initProps}
          inventoryList={inventoryList}
          setInventoryList={setInventoryList}
          inventoryId={inventory.id}
          debouncedApiCall={debouncedApiCall}
          setRefresh={setRefresh}
          handleSaveInventory={handleSaveInventory}
          isFormAddEmployee={true}
        />
      ))}

      {isOwn && (
        <ButtonSys
          type={"dashed"}
          onClick={async () => {
            await handleSaveInventory(inventoryList[inventoryList.length - 1]);
            handleAddNewInventory();
          }}
        >
          <p className="text-primary100 hover:text-primary75">
            + Tambah Inventaris
          </p>
        </ButtonSys>
      )}
    </>
  );
};

export default EmployeeInventoryForm;
