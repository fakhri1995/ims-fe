import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  notification,
} from "antd";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useCallback } from "react";

import { useAccessControl } from "contexts/access-control";

import { UploadIconSvg } from "../../../../../components/icon";
import {
  beforeUploadFileMaxSize,
  generateStaticAssetUrl,
  permissionWarningNotification,
} from "../../../../../lib/helper";

const EmployeeProfileForm = ({
  dataEmployee,
  setDataEmployee,
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

  const [instanceForm] = Form.useForm();

  // const currentFileName = dataEmployee?.id_card_photo?.link?.split('/')[2];

  // 1. USE STATE
  const [fileList, setFileList] = useState([]);
  const [uploadPictureLoading, setUploadPictureLoading] = useState(false);
  const [uploadedIDCardPicture, setUploadedIDCardPicture] = useState(null);

  // 2. HANDLER
  const onChangeInput = (e) => {
    setDataEmployee({
      ...dataEmployee,
      [e.target.name]: e.target.value,
    });

    if (debouncedApiCall) {
      debouncedApiCall({
        ...dataEmployee,
        [e.target.name]: e.target.value,
      });
    }
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

    setDataEmployee((prev) => ({
      ...prev,
      id_card_photo: uploadedFile,
    }));
  }, []);

  const onUploadChange = useCallback(({ file }) => {
    setUploadPictureLoading(file.status === "uploading");

    if (file.status !== "removed") {
      setFileList([file]);
    }
  }, []);

  const onUploadRemove = useCallback(() => {
    setFileList([]);
    setDataEmployee((prev) => ({
      ...prev,
      id_card_photo: null,
    }));
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
            value={dataEmployee.name}
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
          {
            pattern: /[0-9]+/,
            message: "NIP hanya boleh diisi dengan angka",
          },
        ]}
        className="col-span-2"
      >
        <div>
          <Input
            value={dataEmployee.nip}
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
          {
            pattern: /[0-9]+/,
            message: "NIK hanya boleh diisi dengan angka",
          },
        ]}
      >
        <div>
          <Input
            value={dataEmployee.nik}
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
            value={dataEmployee.alias}
            name={"alias"}
            onChange={onChangeInput}
            placeholder="Masukkan alias"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Email Kantor"
        name={"email_office"}
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
            value={dataEmployee.email_office}
            name={"email_office"}
            onChange={onChangeInput}
            placeholder="Masukkan email kantor"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Email Pribadi"
        name={"email_personal"}
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
            value={dataEmployee.email_personal}
            name={"email_personal"}
            onChange={onChangeInput}
            placeholder="Masukkan email pribadi"
          />
        </div>
      </Form.Item>
      <Form.Item label="Domisili" name={"domicile"}>
        <div>
          <Input
            value={dataEmployee.domicile}
            name={"domicile"}
            onChange={onChangeInput}
            placeholder="Masukkan domisili"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Nomor Telepon"
        name={"phone_number"}
        rules={[
          {
            required: true,
            message: "Nomor telepon wajib diisi",
          },
          {
            pattern: /[0-9]+/,
            message: "Nomor HP hanya boleh diisi dengan angka",
          },
        ]}
      >
        <div>
          <Input
            value={dataEmployee.phone_number}
            name={"phone_number"}
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
            value={dataEmployee.birth_place}
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
        <>
          <DatePicker
            name="birth_date"
            placeholder="Pilih tanggal lahir"
            className="w-full"
            value={
              moment(dataEmployee.birth_date).isValid()
                ? moment(dataEmployee.birth_date)
                : null
            }
            onChange={(value, datestring) => {
              setDataEmployee((prev) => ({
                ...prev,
                birth_date: datestring,
              }));
            }}
          />
        </>
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
        <>
          <Select
            value={dataEmployee.gender}
            onChange={(value) => {
              setDataEmployee({
                ...dataEmployee,
                gender: value,
              });
            }}
            placeholder="Pilih jenis kelamin"
            options={[
              {
                value: "Laki-laki",
              },
              {
                value: "Perempuan",
              },
            ]}
          />
        </>
      </Form.Item>
      <Form.Item label="Golongan Darah" name={"blood_type"}>
        <>
          <Select
            value={dataEmployee.blood_type}
            onChange={(value) => {
              setDataEmployee({
                ...dataEmployee,
                blood_type: value,
              });
            }}
            placeholder="Pilih jenis kelamin"
            options={[
              {
                value: "A",
              },
              {
                value: "B",
              },
              {
                value: "AB",
              },
              {
                value: "O",
              },
            ]}
          />
        </>
      </Form.Item>
      <Form.Item label="Status Kawin" name={"marital_status"}>
        <>
          <Select
            value={dataEmployee.marital_status}
            onChange={(value) => {
              setDataEmployee({
                ...dataEmployee,
                marital_status: value,
              });
            }}
            placeholder="Pilih status kawin"
            options={[
              {
                value: 0,
                label: "Belum kawin",
              },
              {
                value: 1,
                label: "Kawin",
              },
              {
                value: 2,
                label: "Cerai hidup",
              },
              {
                value: 3,
                label: "Cerai mati",
              },
            ]}
          />
        </>
      </Form.Item>
      <Form.Item label="Jumlah Anak" name={"number_of_children"}>
        <div>
          <InputNumber
            min={0}
            value={dataEmployee.number_of_children}
            name={"number_of_children"}
            onChange={(value) =>
              setDataEmployee({
                ...dataEmployee,
                number_of_children: value,
              })
            }
            placeholder="Masukkan jumlah anak"
            className="w-full"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Nama Ibu Kandung"
        name={"bio_mother_name"}
        className="col-span-2"
      >
        <div>
          <Input
            value={dataEmployee.bio_mother_name}
            name={"bio_mother_name"}
            placeholder="Masukkan nama ibu kandung"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Nomor NPWP"
        name={"npwp"}
        className="col-span-2"
        rules={[
          {
            pattern: /[0-9]+/,
            message: "Nomor NPWP hanya boleh diisi dengan angka",
          },
        ]}
      >
        <div className="flex flex-row space-x-3">
          <Input
            value={dataEmployee.npwp}
            name={"npwp"}
            placeholder="Masukkan nomor NPWP"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Nomor BPJS Kesehatan"
        name={"bpjs_kesehatan"}
        rules={[
          {
            pattern: /[0-9]+/,
            message: "Nomor BPJS Kesehatan hanya boleh diisi dengan angka",
          },
        ]}
      >
        <div className="flex flex-row space-x-3">
          <Input
            value={dataEmployee.bpjs_kesehatan}
            name={"bpjs_kesehatan"}
            placeholder="Masukkan nomor BPJS Kesehatan"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Nomor BPJS Ketenagakerjaan"
        name={"bpjs_ketenagakerjaan"}
        rules={[
          {
            pattern: /[0-9]+/,
            message:
              "Nomor BPJS Ketenagakerjaan hanya boleh diisi dengan angka",
          },
        ]}
      >
        <div className="flex flex-row space-x-3">
          <Input
            value={dataEmployee.bpjs_ketenagakerjaan}
            name={"bpjs_ketenagakerjaan"}
            placeholder="Masukkan nomor BPJS Ketenagakerjaan"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Nomor Rekening Bank KB Bukopin"
        name={"acc_number_bukopin"}
        rules={[
          {
            pattern: /[0-9]+/,
            message: "Nomor rekening hanya boleh diisi dengan angka",
          },
        ]}
      >
        <div className="flex flex-row space-x-3">
          <Input
            value={dataEmployee.acc_number_bukopin}
            name={"acc_number_bukopin"}
            placeholder="Masukkan nomor rekening Bank KB Bukopin"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Nomor Rekening Bank Lainnya"
        name={"acc_number_another"}
        rules={[
          {
            pattern: /[0-9]+/,
            message: "Nomor rekening hanya boleh diisi dengan angka",
          },
        ]}
      >
        <div className="flex flex-row space-x-3">
          <Input
            value={dataEmployee.acc_number_another}
            name={"acc_number_another"}
            placeholder="Masukkan nomor rekening bank lainnya"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
    </Form>
  );
};

export default EmployeeProfileForm;
