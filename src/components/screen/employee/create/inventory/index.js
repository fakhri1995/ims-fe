import { Checkbox, Form, notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useAccessControl } from "contexts/access-control";

import {
  COMPANY_LISTS_GET,
  RECRUITMENT_ROLES_LIST_GET,
  RECRUITMENT_ROLE_TYPES_LIST_GET,
} from "lib/features";

import {
  beforeUploadFileMaxSize,
  permissionWarningNotification,
} from "../../../../../lib/helper";
import ButtonSys from "../../../../button";
import InventoryForm from "./inventoryForm";

const EmployeeInventoryForm = ({ initProps }) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  // TODO: change constant
  const isAllowedToGetPICList = hasPermission(COMPANY_LISTS_GET);
  const isAllowedToGetRoleList = hasPermission(RECRUITMENT_ROLES_LIST_GET);
  const isAllowedToGetRoleTypeList = hasPermission(
    RECRUITMENT_ROLE_TYPES_LIST_GET
  );

  const rt = useRouter();
  const [instanceForm] = Form.useForm();

  // 1. USE STATE
  const [isOwn, setIsOwn] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);

  const [addMode, setAddMode] = useState(false);

  const [loadingCreate, setLoadingCreate] = useState(false);

  const [loadingPICList, setLoadingPICList] = useState(false);
  const [dataPICList, setDataPICList] = useState([]);

  // 2. USE EFFECT
  // 2.1. Get PIC List
  useEffect(() => {
    if (!isAllowedToGetPICList) {
      permissionWarningNotification("Mendapatkan", "Daftar Penanggung Jawab");
      setLoadingPICList(false);
      return;
    }

    setLoadingPICList(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRecruitmentRolesList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setDataPICList(res2.data);
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
        setLoadingPICList(false);
      });
  }, [isAllowedToGetPICList]);

  // 3. HANDLER
  const handleAddNewInventory = () => {
    let newDataInventory = {
      id: -1,
      device_name: "",
      reference: "",
      type: "",
      serial_num: "",
      assign_date: "",
      return_date: "",
      assign_pic: "",
      return_pic: "",
      assign_doc: "",
      return_doc: "",
      device_list: [],
    };
    setInventoryList([...inventoryList, newDataInventory]);
  };

  const handleRemoveInventory = (idx) => {
    let data = [...inventoryList];
    data.splice(idx, 1);
    setInventoryList(data);
  };

  // console.log(inventoryList);
  return (
    <>
      <Checkbox
        value={isOwn}
        onChange={(e) => {
          setIsOwn(e.target.checked);
          isOwn ? setInventoryList([]) : handleAddNewInventory();
        }}
      >
        Memiliki inventaris & piranti
      </Checkbox>

      {isOwn && (
        <>
          {/* TODO: loop inventoryList */}
          {inventoryList.map((inventory, idx) => (
            <InventoryForm
              key={idx}
              idx={idx}
              inventoryList={inventoryList}
              setInventoryList={setInventoryList}
              dataPICList={dataPICList}
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
