import { Checkbox, Form, notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useAccessControl } from "contexts/access-control";

import {
  COMPANY_LISTS_GET,
  EMPLOYEE_INVENTORIES_GET,
  EMPLOYEE_INVENTORY_ADD,
} from "lib/features";

import {
  beforeUploadFileMaxSize,
  permissionWarningNotification,
} from "../../../../../lib/helper";
import ButtonSys from "../../../../button";
import InventoryForm from "./inventoryForm";

const EmployeeInventoryForm = ({
  initProps,
  isAdd,
  inventoryList,
  setInventoryList,
  employeeId,
  debouncedApiCall,
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

  // 1. USE STATE
  const [isOwn, setIsOwn] = useState(false);
  const [addMode, setAddMode] = useState(false);

  const [loadingInventories, setLoadingInventories] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const [refresh, setRefresh] = useState(-1);

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
              setInventoryList(res2.data);
              setIsOwn(true);
            } else {
              setIsOwn(false);
            }
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

  // 2.2. Auto add new inventory form when it's use in add inventory
  useEffect(() => {
    if (isAdd) {
      handleAddNewInventory();
    }
  }, [isAdd]);

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

  const handleRemoveInventory = (idx) => {
    let data = [...inventoryList];
    data.splice(idx, 1);
    setInventoryList(data);
  };

  return (
    <>
      {!isAdd && (
        <Checkbox
          checked={isOwn}
          onChange={(e) => {
            setIsOwn(e.target.checked);
            isOwn ? setInventoryList([]) : handleAddNewInventory();
          }}
        >
          Memiliki inventaris & piranti
        </Checkbox>
      )}

      {(isOwn || isAdd) && (
        <>
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
            />
          ))}
          <ButtonSys type={"dashed"} onClick={handleAddNewInventory}>
            <p className="text-primary100 hover:text-primary75">
              + Tambah Inventaris
            </p>
          </ButtonSys>
        </>
      )}
    </>
  );
};

export default EmployeeInventoryForm;
