import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  notification,
} from "antd";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useCallback } from "react";

import { useAccessControl } from "contexts/access-control";

import { RESUME_ADD, RESUME_ASSESSMENT_LIST } from "lib/features";

import { UploadIconSvg } from "../../../../../components/icon";
import {
  beforeUploadFileMaxSize,
  permissionWarningNotification,
} from "../../../../../lib/helper";

const EmployeeProfileForm = ({
  dataEmployeeProfile,
  setDataEmployeeProfile,
}) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToCreateCandidate = hasPermission(RESUME_ADD);
  const isAllowedToGetAssessmentList = hasPermission(RESUME_ASSESSMENT_LIST);

  const [instanceForm] = Form.useForm();

  // 1. USE STATE
  const [fileList, setFileList] = useState([]);
  const [uploadPictureLoading, setUploadPictureLoading] = useState(false);
  const [uploadedIDCardPicture, setUploadedIDCardPicture] = useState(null);

  // 3. HANDLER
  const onChangeInput = (e) => {
    setDataEmployeeProfile({
      ...dataEmployeeProfile,
      [e.target.name]: e.target.value,
    });
  };

  const beforeUploadIDCardPicture = useCallback((uploadedFile) => {
    const checkMaxFileSizeFilter = beforeUploadFileMaxSize();
    const isReachedMaxFileSize =
      checkMaxFileSizeFilter(uploadedFile) === Upload.LIST_IGNORE;
    const allowedFileTypes = [`image/png`, `image/jpg`, `image/jpeg`];

    if (!allowedFileTypes.includes(uploadedFile.type)) {
      notification.error({
        message: "File harus berupa gambar",
      });
      return Upload.LIST_IGNORE;
    }

    if (isReachedMaxFileSize) {
      return Upload.LIST_IGNORE;
    }

    setUploadedIDCardPicture(uploadedFile);
  }, []);

  const onUploadChange = useCallback(({ file }) => {
    setUploadPictureLoading(file.status === "uploading");

    if (file.status !== "removed") {
      setFileList([file]);
    }
  }, []);

  const onUploadRemove = useCallback(() => {
    setFileList([]);
    setUploadedIDCardPicture(null);
  }, []);

  return (
    <Form
      layout="vertical"
      form={instanceForm}
      className="grid grid-cols-2 gap-x-8"
    >
      <Form.Item label="ID Card" className="relative col-span-2 w-full">
        <em className="text-mono50 mr-10">Unggah File JPEG (Maksimal 5 MB)</em>
        <Upload
          accept=".png, .jpg, .jpeg"
          listType="picture"
          maxCount={1}
          beforeUpload={beforeUploadIDCardPicture}
          onChange={onUploadChange}
          onRemove={onUploadRemove}
          disabled={uploadPictureLoading}
          fileList={fileList}
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
      </Form.Item>
      <Form.Item
        label="Nama"
        name={"name"}
        rules={[
          {
            required: true,
            message: "Nama karyawan wajib diisi",
          },
        ]}
        className="col-span-2"
      >
        <div>
          <Input
            value={dataEmployeeProfile.name}
            name={"name"}
            onChange={onChangeInput}
            placeholder="Masukkan nama"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="NIP"
        name={"nip"}
        rules={[
          {
            required: true,
            message: "NIP karyawan wajib diisi",
          },
        ]}
        className="col-span-2"
      >
        <div>
          <Input
            value={dataEmployeeProfile.nip}
            name={"nip"}
            onChange={onChangeInput}
            placeholder="Masukkan NIP"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="NIK"
        name={"nik"}
        rules={[
          {
            required: true,
            message: "NIK karyawan wajib diisi",
          },
        ]}
      >
        <div>
          <Input
            value={dataEmployeeProfile.nik}
            name={"nik"}
            onChange={onChangeInput}
            placeholder="Masukkan NIK"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Alias"
        name={"alias"}
        rules={[
          {
            required: true,
            message: "Alias karyawan wajib diisi",
          },
        ]}
      >
        <div>
          <Input
            value={dataEmployeeProfile.alias}
            name={"alias"}
            onChange={onChangeInput}
            placeholder="Masukkan alias"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Email Kantor"
        name={"office_email"}
        rules={[
          {
            required: true,
            message: "Email kantor wajib diisi",
          },
          {
            pattern:
              /(\-)|(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,
            message: "Email belum diisi dengan benar",
          },
        ]}
      >
        <div>
          <Input
            value={dataEmployeeProfile.email_office}
            name={"office_email"}
            onChange={onChangeInput}
            placeholder="Masukkan email kantor"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Email Pribadi"
        name={"personal_email"}
        rules={[
          {
            required: true,
            message: "Email pribadi wajib diisi",
          },
          {
            pattern:
              /(\-)|(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,
            message: "Email belum diisi dengan benar",
          },
        ]}
      >
        <div>
          <Input
            value={dataEmployeeProfile.email_personal}
            name={"personal_email"}
            onChange={onChangeInput}
            placeholder="Masukkan email pribadi"
          />
        </div>
      </Form.Item>
      <Form.Item label="Domisili" name={"domisili"}>
        <div>
          <Input
            value={dataEmployeeProfile.domicile}
            name={"domisili"}
            onChange={onChangeInput}
            placeholder="Masukkan domisili"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Nomor Telepon"
        name={"phone"}
        rules={[
          {
            required: true,
            message: "Nomor telepon wajib diisi",
          },
        ]}
      >
        <div>
          <Input
            value={dataEmployeeProfile.telp}
            name={"phone"}
            onChange={onChangeInput}
            placeholder="Masukkan nomor telepon"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Tempat Lahir"
        name={"birth_place"}
        rules={[
          {
            required: true,
            message: "Tempat lahir wajib diisi",
          },
        ]}
      >
        <div>
          <Input
            value={dataEmployeeProfile.birth_place}
            name={"birth_place"}
            onChange={onChangeInput}
            placeholder="Masukkan tempat lahir"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Tanggal Lahir"
        name={"birth_date"}
        rules={[
          {
            required: true,
            message: "Tanggal lahir wajib diisi",
          },
        ]}
      >
        <DatePicker
          name="birth_date"
          placeholder="Pilih tanggal lahir"
          className="w-full"
          value={[
            dataEmployeeProfile.birth_date
              ? moment(dataEmployeeProfile.birth_date)
              : null,
          ]}
          onChange={(value, datestring) => {
            let selectedDate = datestring[0];
            setDataEmployeeProfile((prev) => ({
              ...prev,
              birth_date: selectedDate,
            }));
          }}
        />
      </Form.Item>

      <Form.Item
        label="Jenis Kelamin"
        name={"gender"}
        rules={[
          {
            required: true,
            message: "Jenis kelamin wajib diisi",
          },
        ]}
      >
        <Select
          value={dataEmployeeProfile.gender}
          onChange={(value) => {
            setDataEmployeeProfile({
              ...dataEmployeeProfile,
              gender: value,
            });
          }}
          placeholder="Pilih jenis kelamin"
        >
          {["Laki-laki", "Perempuan"].map((option, idx) => (
            <Select.Option key={idx} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Golongan Darah" name={"blood_type"}>
        <Select
          value={dataEmployeeProfile.blood_type}
          onChange={(value) => {
            setDataEmployeeProfile({
              ...dataEmployeeProfile,
              blood_type: value,
            });
          }}
          placeholder="Pilih jenis kelamin"
        >
          {["A", "B", "AB", "O"].map((option, idx) => (
            <Select.Option key={idx} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Status Kawin" name={"marital_status"}>
        <Select
          value={dataEmployeeProfile.marital_status}
          onChange={(value) => {
            setDataEmployeeProfile({
              ...dataEmployeeProfile,
              marital_status: value,
            });
          }}
          placeholder="Pilih status kawin"
        >
          {["Belum kawin", "Kawin", "Cerai hidup", "Cerai mati"].map(
            (option, idx) => (
              <Select.Option key={idx} value={option}>
                {option}
              </Select.Option>
            )
          )}
        </Select>
      </Form.Item>
      <Form.Item label="Jumlah Anak" name={"child_total"}>
        <div>
          <Input
            value={dataEmployeeProfile.child_total}
            name={"child_total"}
            onChange={onChangeInput}
            placeholder="Masukkan jumlah anak"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Nama Ibu Kandung"
        name={"mother_name"}
        className="col-span-2"
      >
        <div>
          <Input
            value={dataEmployeeProfile.mother_name}
            name={"mother_name"}
            placeholder="Masukkan nama ibu kandung"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item label="Nomor NPWP" name={"npwp"} className="col-span-2">
        <div className="flex flex-row space-x-3">
          <Input
            value={dataEmployeeProfile.npwp}
            name={"npwp"}
            placeholder="Masukkan nomor NPWP"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item label="Nomor BPJS Kesehatan" name={"bpjsk"}>
        <div className="flex flex-row space-x-3">
          <Input
            value={dataEmployeeProfile.bpjsk}
            name={"bpjsk"}
            placeholder="Masukkan nomor BPJS Kesehatan"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item label="Nomor BPJS Ketenagakerjaan" name={"bpjstk"}>
        <div className="flex flex-row space-x-3">
          <Input
            value={dataEmployeeProfile.bpjstk}
            name={"bpjstk"}
            placeholder="Masukkan nomor BPJS Ketenagakerjaan"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item label="Nomor Rekening Bank KB Bukopin" name={"rek_bukopin"}>
        <div className="flex flex-row space-x-3">
          <Input
            value={dataEmployeeProfile.rek_bukopin}
            name={"rek_bukopin"}
            placeholder="Masukkan nomor rekening Bank KB Bukopin"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item label="Nomor Rekening Bank Lainnya" name={"rek_other"}>
        <div className="flex flex-row space-x-3">
          <Input
            value={dataEmployeeProfile.rek_other}
            name={"rek_other"}
            placeholder="Masukkan nomor rekening bank lainnya"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
    </Form>
  );
};

export default EmployeeProfileForm;
