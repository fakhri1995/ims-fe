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

import { useAccessControl } from "contexts/access-control";

import { RESUME_ADD, RESUME_ASSESSMENT_LIST } from "lib/features";

import { UploadIconSvg } from "../../../../components/icon";
import {
  beforeUploadFileMaxSize,
  permissionWarningNotification,
} from "../../../../lib/helper";

const EmployeeProfileForm = () => {
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
  const [dataProfile, setDataProfile] = useState({
    id_photo: "",
    name: "",
    nip: "",
    nik: "",
    alias: "",
    telp: "",
    email_office: "",
    email_personal: "",
    domicile: "",
    birth_place: "",
    birth_date: "",
    gender: "",
    blood_type: "",
    marital_status: "",
    child_total: "",
    mother_name: "",
    npwp: "",
    bpjsk: "",
    bpjstk: "",
    rek_bukopin: "",
    rek_other: "",
  });

  // 3. HANDLER
  const onChangeInput = (e) => {
    setDataProfile({
      ...dataProfile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form
      layout="vertical"
      form={instanceForm}
      className="grid grid-cols-2 gap-x-8  px-1"
    >
      <Form.Item
        label="ID Card"
        name={"id_card"}
        className="relative col-span-2 w-full"
      >
        <em className="text-mono50 mr-10">Unggah File JPEG (Maksimal 5 MB)</em>
        <Upload
          accept=".png, .jpg, .jpeg"
          listType="picture"
          maxCount={1}
          beforeUpload={(file) => {
            const checkMaxFileSizeFilter = beforeUploadFileMaxSize();
            const isReachedMaxFileSize =
              checkMaxFileSizeFilter(file) === Upload.LIST_IGNORE;
            const isImage =
              file.type === `image/png` ||
              file.type === `image/jpg` ||
              file.type === `image/jpeg`;
            if (!isImage) {
              notification.error({
                message: "File harus berupa gambar",
              });
            }
            const allowedUpload = !isReachedMaxFileSize && isImage;
            return allowedUpload || Upload.LIST_IGNORE;
          }}
          // disabled={true}
          // onChange={}
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
            value={dataProfile.name}
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
            value={dataProfile.nip}
            name={"nip"}
            onChange={onChangeInput}
            placeholder="Masukkan nama"
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
            value={dataProfile.nik}
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
            value={dataProfile.alias}
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
            value={dataProfile.email_office}
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
            value={dataProfile.email_personal}
            name={"personal_email"}
            onChange={onChangeInput}
            placeholder="Masukkan email pribadi"
          />
        </div>
      </Form.Item>
      <Form.Item label="Domisili" name={"domisili"}>
        <div>
          <Input
            value={dataProfile.domicile}
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
            value={dataProfile.telp}
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
            value={dataProfile.birth_place}
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
            dataProfile.birth_date ? moment(dataProfile.birth_date) : null,
          ]}
          onChange={(value, datestring) => {
            let selectedDate = datestring[0];
            setDataProfile((prev) => ({
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
          value={dataProfile.gender}
          onChange={(value) => {
            setDataProfile({
              ...dataProfile,
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
          value={dataProfile.blood_type}
          onChange={(value) => {
            setDataProfile({
              ...dataProfile,
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
          value={dataProfile.marital_status}
          onChange={(value) => {
            setDataProfile({
              ...dataProfile,
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
            value={dataProfile.child_total}
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
            value={dataProfile.mother_name}
            name={"mother_name"}
            placeholder="Masukkan nama ibu kandung"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item label="Nomor NPWP" name={"npwp"} className="col-span-2">
        <div className="flex flex-row space-x-3">
          <Input
            value={dataProfile.npwp}
            name={"npwp"}
            placeholder="Masukkan nomor NPWP"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item label="Nomor BPJS Kesehatan" name={"bpjsk"}>
        <div className="flex flex-row space-x-3">
          <Input
            value={dataProfile.bpjsk}
            name={"bpjsk"}
            placeholder="Masukkan nomor BPJS Kesehatan"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item label="Nomor BPJS Ketenagakerjaan" name={"bpjstk"}>
        <div className="flex flex-row space-x-3">
          <Input
            value={dataProfile.bpjstk}
            name={"bpjstk"}
            placeholder="Masukkan nomor BPJS Ketenagakerjaan"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item label="Nomor Rekening Bank KB Bukopin" name={"rek_bukopin"}>
        <div className="flex flex-row space-x-3">
          <Input
            value={dataProfile.rek_bukopin}
            name={"rek_bukopin"}
            placeholder="Masukkan nomor rekening Bank KB Bukopin"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item label="Nomor Rekening Bank Lainnya" name={"rek_other"}>
        <div className="flex flex-row space-x-3">
          <Input
            value={dataProfile.rek_other}
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
