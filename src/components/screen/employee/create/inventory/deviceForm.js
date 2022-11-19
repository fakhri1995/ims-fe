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
import { UploadIconSvg } from "../../../../icon";

const DeviceForm = ({
  idxInv,
  idxDev,
  inventoryList,
  setInventoryList,
  deviceList,
  setDeviceList,
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
  const onChangeDeviceInput = (e, idxDev) => {
    let dataDevices = [...deviceList];
    dataDevices[idxDev][e.target.name] = e.target.value;
    setDeviceList(dataDevices);

    let dataInventories = [...inventoryList];
    dataInventories[idxInv].device_list = dataDevices;
    setInventoryList(dataInventories);
  };

  // const onChangeFile = async (e) => {
  //   if (datapayload.files.length === MAX_FILE_UPLOAD_COUNT) {
  //     notification.warning({
  //       message: `Jumlah unggahan sudah mencapai batas maksimum yaitu ${MAX_FILE_UPLOAD_COUNT} file.`,
  //     });
  //     return;
  //   }

  //   setloadingfile(true);

  //   const blobFile = e.target.files[0];
  //   const base64Data = await getBase64(blobFile);

  //   const newFiles = [...datapayload.files, base64Data];
  //   const newAttachments = [...datapayload.attachments, blobFile];

  //   setdatapayload({
  //     ...datapayload,
  //     files: newFiles,
  //     attachments: newAttachments,
  //   });

  //   setloadingfile(false);
  // };

  return (
    <Form
      layout="vertical"
      form={instanceForm}
      className="grid grid-cols-2 gap-x-8"
    >
      <h5 className="mig-heading--5 col-span-2 mb-3">
        INVENTARIS {idxInv + 1}/PIRANTI {idxDev + 2}
      </h5>
      <Form.Item
        label="ID"
        name={"id_2"}
        rules={[
          {
            required: true,
            message: "ID piranti wajib diisi",
          },
        ]}
      >
        <div>
          <Input
            value={inventoryList[idxInv]?.device_list[idxDev]?.id_2}
            name={"id_2"}
            onChange={(e) => onChangeDeviceInput(e, idxDev)}
            placeholder="Masukkan ID"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Nama Piranti"
        name={"device_name_2"}
        rules={[
          {
            required: true,
            message: "Nama piranti wajib diisi",
          },
        ]}
      >
        <div>
          <Input
            value={inventoryList[idxInv]?.device_list[idxDev]?.device_name_2}
            name={"device_name_2"}
            onChange={(e) => onChangeDeviceInput(e, idxDev)}
            placeholder="Masukkan nama piranti"
          />
        </div>
      </Form.Item>
      <Form.Item label="Tipe" name={"type_2"}>
        <div>
          <Input
            value={inventoryList[idxInv]?.device_list[idxDev]?.type_2}
            name={"type_2"}
            onChange={(e) => onChangeDeviceInput(e, idxDev)}
            placeholder="Masukkan tipe"
          />
        </div>
      </Form.Item>
      <Form.Item label="Nomor Serial" name={"serial_num_2"}>
        <div>
          <Input
            value={inventoryList[idxInv]?.device_list[idxDev]?.serial_num_2}
            name={"serial_num_2"}
            onChange={(e) => onChangeDeviceInput(e, idxDev)}
            placeholder="Masukkan nomor serial"
          />
        </div>
      </Form.Item>
    </Form>
  );
};

export default DeviceForm;
