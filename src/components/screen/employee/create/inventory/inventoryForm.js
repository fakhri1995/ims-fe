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
import { useCallback } from "react";

import { useAccessControl } from "contexts/access-control";

import {
  COMPANY_LISTS_GET,
  RECRUITMENT_ROLES_LIST_GET,
  RECRUITMENT_ROLE_TYPES_LIST_GET,
} from "lib/features";

import {
  beforeUploadFileMaxSize,
  getBase64,
  permissionWarningNotification,
} from "../../../../../lib/helper";
import ButtonSys from "../../../../button";
import { UploadIconSvg } from "../../../../icon";
import DeviceForm from "./deviceForm";

const InventoryForm = ({
  idx,
  inventoryList,
  setInventoryList,
  dataPICList,
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
  const [deviceList, setDeviceList] = useState([]);

  const [assignFileList, setAssignFileList] = useState([]);
  const [returnFileList, setReturnFileList] = useState([]);

  const [uploadAssignDocumentLoading, setUploadAssignDocumentLoading] =
    useState(false);
  const [uploadReturnDocumentLoading, setUploadReturnDocumentLoading] =
    useState(false);

  const [uploadedAssignDocument, setUploadedAssignDocument] = useState(null);
  const [uploadedReturnDocument, setUploadedReturnDocument] = useState(null);

  // 3. HANDLER
  const onChangeInput = (e) => {
    let data = [...inventoryList];
    data[idx][e.target.name] = e.target.value;
    setInventoryList(data);
  };

  const handleAddNewDevice = () => {
    let newDataDevice = {
      id_2: -1,
      device_name_2: "",
      type_2: "",
      serial_num_2: "",
    };

    let newDeviceList = [...deviceList, newDataDevice];
    setDeviceList(newDeviceList);

    let dataInventories = [...inventoryList];
    dataInventories[idx].device_list = newDeviceList;
    setInventoryList(dataInventories);
  };

  const beforeUploadAssignDocument = useCallback((uploadedFile) => {
    const checkMaxFileSizeFilter = beforeUploadFileMaxSize();
    const isReachedMaxFileSize =
      checkMaxFileSizeFilter(uploadedFile) === Upload.LIST_IGNORE;
    const allowedFileTypes = "application/pdf";

    if (uploadedFile.type !== allowedFileTypes) {
      notification.error({
        message: "File harus memilki format .pdf",
      });
      return Upload.LIST_IGNORE;
    }

    if (isReachedMaxFileSize) {
      return Upload.LIST_IGNORE;
    }

    setUploadedAssignDocument(uploadedFile);

    let data = [...inventoryList];
    data[idx]["assign_doc"] = uploadedFile;
    setInventoryList(data);

    // const blobFile = e.target.files[0];

    // const base64Data = getBase64(uploadedFile);
    // console.log(base64Data)

    // const newFiles = [...datapayload.files, base64Data];
    // const newAttachments = [...datapayload.attachments, blobFile];
  }, []);

  const beforeUploadReturnDocument = useCallback((uploadedFile) => {
    const checkMaxFileSizeFilter = beforeUploadFileMaxSize();
    const isReachedMaxFileSize =
      checkMaxFileSizeFilter(uploadedFile) === Upload.LIST_IGNORE;
    const allowedFileTypes = "application/pdf";

    if (uploadedFile.type !== allowedFileTypes) {
      notification.error({
        message: "File harus memilki format .pdf",
      });
      return Upload.LIST_IGNORE;
    }

    if (isReachedMaxFileSize) {
      return Upload.LIST_IGNORE;
    }

    setUploadedReturnDocument(uploadedFile);

    let data = [...inventoryList];
    data[idx]["return_doc"] = uploadedFile;
    setInventoryList(data);

    // const blobFile = e.target.files[0];

    // const base64Data = getBase64(uploadedFile);
    // console.log(base64Data)

    // const newFiles = [...datapayload.files, base64Data];
    // const newAttachments = [...datapayload.attachments, blobFile];
  }, []);

  console.log(inventoryList);

  const onUploadAssignChange = useCallback(({ file }) => {
    setUploadAssignDocumentLoading(file.status === "uploading");

    if (file.status !== "removed") {
      setAssignFileList([file]);
    }
  }, []);

  const onUploadReturnChange = useCallback(({ file }) => {
    setUploadReturnDocumentLoading(file.status === "uploading");

    if (file.status !== "removed") {
      setReturnFileList([file]);
    }
  }, []);

  const onUploadAssignRemove = useCallback(() => {
    setAssignFileList([]);
    setUploadAssignDocumentLoading(null);

    let data = [...inventoryList];
    data[idx]["assign_doc"] = "";
    setInventoryList(data);
  }, []);

  const onUploadReturnRemove = useCallback(() => {
    setReturnFileList([]);
    setUploadReturnDocumentLoading(null);

    let data = [...inventoryList];
    data[idx]["return_doc"] = "";
    setInventoryList(data);
  }, []);

  // console.log(fileList, uploadedDocument)

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
    <div>
      <Form
        layout="vertical"
        form={instanceForm}
        className="grid grid-cols-2 gap-x-8 mt-6"
      >
        <h5 className="mig-heading--5 col-span-2 mb-3">
          INVENTARIS {idx + 1}/PIRANTI 1
        </h5>
        <Form.Item
          label="ID"
          name={"id"}
          rules={[
            {
              required: true,
              message: "ID piranti wajib diisi",
            },
          ]}
        >
          <div>
            <Input
              value={inventoryList[idx].id}
              name={"id"}
              onChange={onChangeInput}
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
              value={inventoryList[idx].device_name}
              name={"device_name"}
              onChange={onChangeInput}
              placeholder="Masukkan nama piranti"
            />
          </div>
        </Form.Item>
        <Form.Item
          label="Referensi Inventaris"
          name={"reference"}
          rules={[
            {
              required: true,
              message: "Referensi Inventaris wajib diisi",
            },
          ]}
          className="col-span-2"
        >
          <div>
            <Input
              value={inventoryList[idx].reference}
              name={"reference"}
              onChange={onChangeInput}
              placeholder="Masukkan referensi inventaris"
            />
          </div>
        </Form.Item>
        <Form.Item label="Tipe" name={"type"}>
          <div>
            <Input
              value={inventoryList[idx].type}
              name={"type"}
              onChange={onChangeInput}
              placeholder="Masukkan tipe"
            />
          </div>
        </Form.Item>
        <Form.Item label="Nomor Serial" name={"serial_num"}>
          <div>
            <Input
              value={inventoryList[idx].serial_num}
              name={"serial_num"}
              onChange={onChangeInput}
              placeholder="Masukkan nomor serial"
            />
          </div>
        </Form.Item>

        <Form.Item
          label="Tanggal Penyerahan"
          name={"assign_date"}
          rules={[
            {
              required: true,
              message: "Tanggal penyerahan wajib diisi",
            },
          ]}
        >
          <DatePicker
            name="assign_date"
            placeholder="Pilih tanggal penyerahan"
            className="w-full"
            value={[
              inventoryList[idx].assign_date
                ? moment(inventoryList[idx].assign_date)
                : null,
            ]}
            onChange={(value, datestring) => {
              let selectedDate = datestring;

              let data = [...inventoryList];
              data[idx].assign_date = selectedDate;
              setInventoryList(data);
            }}
          />
        </Form.Item>

        <Form.Item label="Tanggal Pengembalian" name={"return_date"}>
          <DatePicker
            placeholder="Pilih tanggal pengembalian"
            className="w-full"
            value={[
              inventoryList[idx].return_date
                ? moment(inventoryList[idx].return_date)
                : null,
            ]}
            onChange={(value, datestring) => {
              let selectedDate = datestring;

              let data = [...inventoryList];
              data[idx].return_date = selectedDate;
              setInventoryList(data);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Penanggung Jawab Penyerahan"
          name={"assign_pic"}
          rules={[
            {
              required: true,
              message: "Penanggung jawab penyerahan wajib diisi",
            },
          ]}
        >
          <Select
            value={inventoryList[idx].assign_pic}
            onChange={(value) => {
              let data = [...inventoryList];
              data[idx].assign_pic = value;
              setInventoryList(data);
            }}
            placeholder="Pilih penanggung jawab penyerahan"
          >
            {dataPICList.map((option) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Penanggung Jawab Pengembalian" name={"return_pic"}>
          <Select
            value={inventoryList[idx].return_pic}
            onChange={(value) => {
              let data = [...inventoryList];
              data[idx].return_pic = value;
              setInventoryList(data);
            }}
            placeholder="Pilih penanggung jawab pengembalian"
          >
            {dataPICList.map((option) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Dokumen Penyerahan"
          name={"assign_doc"}
          className="w-full"
        >
          <div className="relative">
            <em className="text-mono50 mr-3">
              Unggah File PDF (Maksimal 5 MB)
            </em>
            <Upload
              accept=".pdf"
              listType="picture"
              maxCount={1}
              beforeUpload={beforeUploadAssignDocument}
              onChange={onUploadAssignChange}
              onRemove={onUploadAssignRemove}
              disabled={uploadAssignDocumentLoading}
              fileList={assignFileList}
            >
              <Button
                className="btn-sm btn text-white font-semibold px-6 border
                text-primary100 hover:bg-primary75 border-primary100 
                hover:border-primary75 hover:text-white bg-white space-x-2
                focus:border-primary75 focus:text-primary100"
              >
                <UploadIconSvg size={16} color="#35763B" />
                <p>Unggah File</p>
              </Button>
            </Upload>
          </div>
        </Form.Item>
        <Form.Item
          label="Dokumen Pengembalian"
          name={"return_doc"}
          className="w-full"
        >
          <div className="relative">
            <em className="text-mono50 mr-3">
              Unggah File PDF (Maksimal 5 MB)
            </em>
            <Upload
              accept=".pdf"
              listType="picture"
              maxCount={1}
              beforeUpload={beforeUploadReturnDocument}
              onChange={onUploadReturnChange}
              onRemove={onUploadReturnRemove}
              disabled={uploadReturnDocumentLoading}
              fileList={returnFileList}
            >
              <Button
                className="btn-sm btn text-white font-semibold px-6 border
                text-primary100 hover:bg-primary75 border-primary100 
                hover:border-primary75 hover:text-white bg-white space-x-2
                focus:border-primary75 focus:text-primary100"
              >
                <UploadIconSvg size={16} color="#35763B" />
                <p>Unggah File</p>
              </Button>
            </Upload>
          </div>
        </Form.Item>
      </Form>

      {/* Add Device Form */}
      {deviceList.map((device, idxDev) => (
        <DeviceForm
          key={idxDev}
          idxInv={idx}
          idxDev={idxDev}
          inventoryList={inventoryList}
          setInventoryList={setInventoryList}
          deviceList={deviceList}
          setDeviceList={setDeviceList}
        />
      ))}

      <div className="mb-6">
        <ButtonSys type={"dashed"} onClick={handleAddNewDevice}>
          <p className="text-primary100 hover:text-primary75">
            + Tambah Piranti
          </p>
        </ButtonSys>
      </div>
    </div>
  );
};

export default InventoryForm;
