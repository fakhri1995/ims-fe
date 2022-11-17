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
import { UploadIconSvg } from "../../../../icon";

const InventoryForm = ({ idx, deviceList, setDeviceList, dataPICList }) => {
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
  const onChangeInput = (e) => {
    let data = [...deviceList];
    data[idx][e.target.name] = e.target.value;
    setDeviceList(data);
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
      className="grid grid-cols-2 gap-x-8 mt-6"
    >
      <h5 className="mig-heading--5 col-span-2 mb-3">PIRANTI {idx + 1}</h5>
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
            value={deviceList[idx].id}
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
            value={deviceList[idx].device_name}
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
            value={deviceList[idx].reference}
            name={"reference"}
            onChange={onChangeInput}
            placeholder="Masukkan referensi inventaris"
          />
        </div>
      </Form.Item>
      <Form.Item label="Tipe" name={"type"}>
        <div>
          <Input
            value={deviceList[idx].type}
            name={"type"}
            onChange={onChangeInput}
            placeholder="Masukkan tipe"
          />
        </div>
      </Form.Item>
      <Form.Item label="Nomor Serial" name={"serial_num"}>
        <div>
          <Input
            value={deviceList[idx].serial_num}
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
            deviceList[idx].assign_date
              ? moment(deviceList[idx].assign_date)
              : null,
          ]}
          onChange={(value, datestring) => {
            let selectedDate = datestring;

            let data = [...deviceList];
            data[idx].assign_date = selectedDate;
            setDeviceList(data);
          }}
        />
      </Form.Item>

      <Form.Item label="Tanggal Pengembalian" name={"return_date"}>
        <DatePicker
          placeholder="Pilih tanggal pengembalian"
          className="w-full"
          value={[
            deviceList[idx].return_date
              ? moment(deviceList[idx].return_date)
              : null,
          ]}
          onChange={(value, datestring) => {
            let selectedDate = datestring;

            let data = [...deviceList];
            data[idx].return_date = selectedDate;
            setDeviceList(data);
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
          value={deviceList[idx].assign_pic}
          onChange={(value) => {
            let data = [...deviceList];
            data[idx].assign_pic = value;
            setDeviceList(data);
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
          value={deviceList[idx].return_pic}
          onChange={(value) => {
            let data = [...deviceList];
            data[idx].return_pic = value;
            setDeviceList(data);
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
          <em className="text-mono50 mr-3">Unggah File PDF (Maksimal 5 MB)</em>
          <Upload
            accept=".pdf"
            listType="picture"
            maxCount={1}
            beforeUpload={(file) => {
              const checkMaxFileSizeFilter = beforeUploadFileMaxSize();
              const isReachedMaxFileSize =
                checkMaxFileSizeFilter(file) === Upload.LIST_IGNORE;
              const isPDF = file.type === `application/pdf`;
              if (!isPDF) {
                notification.error({
                  message: "File harus memilki format .pdf",
                });
              }
              const allowedUpload = !isReachedMaxFileSize && isPDF;
              return allowedUpload || Upload.LIST_IGNORE;
            }}
            // disabled={true}
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
          <em className="text-mono50 mr-3">Unggah File PDF (Maksimal 5 MB)</em>
          <Upload
            accept=".pdf"
            listType="picture"
            maxCount={1}
            beforeUpload={(file) => {
              const checkMaxFileSizeFilter = beforeUploadFileMaxSize();
              const isReachedMaxFileSize =
                checkMaxFileSizeFilter(file) === Upload.LIST_IGNORE;
              const isPDF = file.type === `application/pdf`;
              if (!isPDF) {
                notification.error({
                  message: "File harus memilki format .pdf",
                });
              }
              const allowedUpload = !isReachedMaxFileSize && isPDF;
              return allowedUpload || Upload.LIST_IGNORE;
            }}
            // disabled={true}
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
  );
};

export default InventoryForm;
