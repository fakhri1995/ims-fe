import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Switch,
  Tabs,
  Upload,
  notification,
} from "antd";
import moment from "moment";
import React from "react";
import { useState } from "react";

import { useAccessControl } from "contexts/access-control";

import { EMPLOYEE_DEVICE_DELETE } from "lib/features";

import {
  beforeUploadFileMaxSize,
  permissionWarningNotification,
} from "../../../../../lib/helper";
import ButtonSys from "../../../../button";
import { TrashIconSvg, UploadIconSvg } from "../../../../icon";

const DeviceForm = ({
  idxInv,
  idxDev,
  inventoryList,
  setInventoryList,
  deviceList,
  setDeviceList,
  setDataModalDelete,
  setModalDelete,
  debouncedApiCall,
  isAllowedToDeleteDevice,
}) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const [instanceForm] = Form.useForm();

  // 1. USE STATE
  const [loadingCreate, setLoadingCreate] = useState(false);

  // 3. HANDLER
  const onChangeDeviceInput = (e) => {
    let dataDevices = [...deviceList];
    dataDevices[idxDev][e.target.name] = e.target.value;
    setDeviceList(dataDevices);

    let dataInventories = [...inventoryList];
    dataInventories[idxInv].devices = dataDevices;
    setInventoryList(dataInventories);

    // use for auto save
    if (debouncedApiCall) {
      debouncedApiCall(dataInventories[idxInv]);
    }
  };

  return (
    <Form
      layout="vertical"
      form={instanceForm}
      className="grid grid-cols-2 gap-x-8"
    >
      <div className="flex flex-row items-center space-x-1 col-span-2 mb-3">
        <h5 className="mig-heading--5 ">
          INVENTARIS {idxInv + 1}/PIRANTI {idxDev + 2}
        </h5>
        {isAllowedToDeleteDevice && (
          <Button
            className="bg-transparent hover:opacity-70 border-0"
            onClick={(e) => {
              e.stopPropagation();
              setDataModalDelete({
                deviceId: inventoryList[idxInv]?.devices[idxDev]?.id,
                deviceName:
                  inventoryList[idxInv]?.devices[idxDev]?.device_name || "-",
              });
              setModalDelete(true);
            }}
            icon={<TrashIconSvg color={"#BF4A40"} size={20} />}
          />
        )}
      </div>
      <Form.Item
        label="ID"
        name={"id_number"}
        rules={[
          {
            required: true,
            message: "ID piranti wajib diisi",
          },
        ]}
      >
        <div>
          <Input
            value={inventoryList[idxInv]?.devices[idxDev]?.id_number}
            name={"id_number"}
            onChange={(e) => onChangeDeviceInput(e)}
            placeholder="Masukkan ID"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Nama Piranti"
        name={"device_name"}
        rules={[
          {
            required: true,
            message: "Nama piranti wajib diisi",
          },
        ]}
      >
        <div>
          <Input
            value={inventoryList[idxInv]?.devices[idxDev]?.device_name}
            name={"device_name"}
            onChange={(e) => onChangeDeviceInput(e)}
            placeholder="Masukkan nama piranti"
          />
        </div>
      </Form.Item>
      <Form.Item label="Tipe" name={"device_type"}>
        <div>
          <Input
            value={inventoryList[idxInv]?.devices[idxDev]?.device_type}
            name={"device_type"}
            onChange={(e) => onChangeDeviceInput(e)}
            placeholder="Masukkan tipe"
          />
        </div>
      </Form.Item>
      <Form.Item label="Nomor Serial" name={"serial_number"}>
        <div>
          <Input
            value={inventoryList[idxInv]?.devices[idxDev]?.serial_number}
            name={"serial_number"}
            onChange={(e) => onChangeDeviceInput(e)}
            placeholder="Masukkan nomor serial"
          />
        </div>
      </Form.Item>
    </Form>
  );
};

export default DeviceForm;
