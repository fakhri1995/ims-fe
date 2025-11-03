import { UploadOutlined } from "@ant-design/icons";
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
import React, { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";

import { useAccessControl } from "contexts/access-control";

import UserPicturUploadIcon from "assets/vectors/user-picture-upload.svg";

import { beforeUploadFileMaxSize } from "../../../../../lib/helper";
import { UploadIconSvg } from "../../../../icon";
import { maritalStatusList } from "../../detail/profile";

const EmployeeProfileForm = ({
  initProps,
  dataEmployee,
  setDataEmployee,
  debouncedApiCall,
  handleFormChange,
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
  const [fileList, setFileList] = useState([]);
  const [uploadPictureLoading, setUploadPictureLoading] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  // 2. USE EFFECT
  // 2.1. Display id card filename when available
  useEffect(() => {
    if (dataEmployee?.id_card_photo?.link) {
      const currentFileName = dataEmployee?.id_card_photo?.link?.split("/")[2];
      setFileList([{ name: currentFileName }]);
    } else {
      setFileList([]);
    }
  }, [dataEmployee?.id_card_photo]);

  // 2.2. Get bank list for options
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getBankLists`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setBankList(res2.data);
        } else {
          notification.error({
            message: res2?.message?.errorInfo?.reason,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: err?.message,
          duration: 3,
        });
      });
  }, []);

  // 3. HANDLER
  // 3.1. Handle input change and auto save in "Tambah Karyawan"
  const onChangeInput = (e) => {
    setDataEmployee({
      ...dataEmployee,
      [e.target.name]: e.target.value,
    });

    // use for auto save in
    if (debouncedApiCall) {
      debouncedApiCall({
        ...dataEmployee,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onChangeSelect = (value, attributeName) => {
    setDataEmployee({
      ...dataEmployee,
      [attributeName]: value,
    });

    // use for auto save in
    if (debouncedApiCall) {
      debouncedApiCall({
        ...dataEmployee,
        [attributeName]: value,
      });
    }
  };

  // 3.2. Handle upload file
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
      console.log("isi file ", file);
      setFileList([file]);
      const file_new = file.originFileObj;

      // Baca file sebagai URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result); // simpan data URL base64 ke state
      };
      reader.readAsDataURL(file_new);
    }
  }, []);

  const onUploadRemove = useCallback(() => {
    setFileList([]);
    setDataEmployee((prev) => ({
      ...prev,
      id_card_photo: null,
    }));
  }, []);

  // console.log({ dataEmployee });

  return (
    <Form
      layout="vertical"
      form={instanceForm}
      onValuesChange={handleFormChange && handleFormChange}
      className=""
    >
      <Form.Item label="" className="relative col-span-2 w-full">
        <div className={"flex gap-5 mt-4"}>
          {!imageUrl ? (
            <div
              className={
                "h-[186px] w-[139px] flex justify-center items-center rounded-[15px] border-[#35763B1A] shadow-desktopCard bg-white"
              }
            >
              <UserPicturUploadIcon />
            </div>
          ) : (
            <div className={""}>
              <img
                src={imageUrl}
                alt="preview"
                style={{ width: 139, height: 186, borderRadius: 15 }}
              />
            </div>
          )}
          <div className={"flex flex-col gap-2.5 justify-center"}>
            <p className={"font-inter font-medium text-xs/5 text-[#4D4D4D]"}>
              ID Card <span className={"text-[#BF4A40]"}>*</span>
            </p>
            <Upload
              accept=".png, .jpg, .jpeg"
              listType="picture"
              showUploadList={false}
              maxCount={1}
              beforeUpload={beforeUploadIDCardPicture}
              onChange={onUploadChange}
              onRemove={onUploadRemove}
              disabled={uploadPictureLoading}
              fileList={fileList}
            >
              <Button
                className="btn-sm btn font-semibold px-4 flex gap-1.5 border
             hover:text-white bg-white border-[#4D4D4D]
            hover:bg-primary75 hover:border-primary75  
            focus:border-primary75 focus:text-primary100 "
              >
                <UploadIconSvg size={16} color={"#4D4D4D"} />
                <p
                  className={"text-sm/4 font-roboto font-medium text-[#4D4D4D]"}
                >
                  Upload File
                </p>
              </Button>
            </Upload>
            <p className="text-[#808080] mr-10 font-inter font-semibold">
              Upload Files (Maximum 5 MB)
            </p>
          </div>
        </div>
      </Form.Item>
      <p className={"text-lg/6 text-[#424242] font-inter font-bold my-5"}>
        Personal Information
      </p>

      <Form.Item
        label="Name"
        name={"name"}
        rules={[
          {
            required: true,
            message: "Nama karyawan wajib diisi",
          },
        ]}
        className="w-1/2 pr-4"
      >
        <div>
          <Input
            value={dataEmployee.name}
            name={"name"}
            onChange={onChangeInput}
            placeholder="Input Name"
          />
        </div>
      </Form.Item>
      <div className="md:grid md:grid-cols-2 md:gap-x-8">
        <Form.Item
          label="NIP"
          name={"nip"}
          rules={[
            {
              pattern: /[0-9]+/,
              message: "NIP hanya boleh diisi dengan angka",
            },
          ]}
          className="col-span-1"
        >
          <div>
            <Input
              value={dataEmployee.nip}
              name={"nip"}
              onChange={onChangeInput}
              placeholder="Input NIP"
            />
          </div>
        </Form.Item>
        <Form.Item
          label="MIG Join Date"
          name={"join_at"}
          className="col-span-1"
        >
          <>
            <DatePicker
              name="join_at"
              placeholder="Input join date"
              className="w-full"
              value={
                moment(dataEmployee.join_at ?? "").isValid()
                  ? moment(dataEmployee.join_at)
                  : null
              }
              onChange={(value, datestring) => {
                setDataEmployee((prev) => ({
                  ...prev,
                  join_at: datestring,
                }));

                if (debouncedApiCall) {
                  debouncedApiCall({
                    ...dataEmployee,
                    join_at: datestring,
                  });
                }
              }}
            />
          </>
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
              placeholder="Input NIK"
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
              placeholder="Input alias"
            />
          </div>
        </Form.Item>
        <Form.Item
          label="Office Email"
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
              placeholder="Input Office Email"
            />
          </div>
        </Form.Item>
        <Form.Item
          label="Personal Email"
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
              placeholder="Personal Email"
            />
          </div>
        </Form.Item>
        <Form.Item label="Domiscle" name={"domicile"}>
          <div>
            <Input
              value={dataEmployee.domicile}
              name={"domicile"}
              onChange={onChangeInput}
              placeholder="Input Domiscle"
            />
          </div>
        </Form.Item>
        <Form.Item
          label="Phone Number"
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
              placeholder="Input Phone Number"
            />
          </div>
        </Form.Item>
        <Form.Item
          label="Birth Place"
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
              placeholder="Input Birth Place"
            />
          </div>
        </Form.Item>
        <Form.Item
          label="Birthday"
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
              placeholder="Input Birthday"
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

                if (debouncedApiCall) {
                  debouncedApiCall({
                    ...dataEmployee,
                    birth_date: datestring,
                  });
                }
              }}
            />
          </>
        </Form.Item>

        <Form.Item
          label="Gender"
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
              onChange={(value) => onChangeSelect(value, "gender")}
              placeholder="Select Gender"
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
        <Form.Item label="Blood Type" name={"blood_type"}>
          <>
            <Select
              value={dataEmployee.blood_type}
              onChange={(value) => onChangeSelect(value, "blood_type")}
              placeholder="Input Blood Type"
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
        <Form.Item label="Marriage Status" name={"marital_status"}>
          <>
            <Select
              value={dataEmployee.marital_status}
              onChange={(value) => onChangeSelect(value, "marital_status")}
              placeholder="Select Status"
              options={maritalStatusList}
            />
          </>
        </Form.Item>
        <Form.Item label="Children(s)" name={"number_of_children"}>
          <div>
            <InputNumber
              min={0}
              value={dataEmployee.number_of_children}
              name={"number_of_children"}
              onChange={(value) => onChangeSelect(value, "number_of_children")}
              placeholder="Input Children"
              className="w-full"
            />
          </div>
        </Form.Item>
        <Form.Item
          label="Mother's Name"
          name={"bio_mother_name"}
          className="col-span-1"
        >
          <div>
            <Input
              value={dataEmployee.bio_mother_name}
              name={"bio_mother_name"}
              placeholder="Input Mother's Name"
              onChange={onChangeInput}
            />
          </div>
        </Form.Item>
      </div>
      <div className="md:grid md:grid-cols-3 md:gap-x-8">
        <Form.Item
          label="NPWP Number"
          name={"npwp"}
          className="col-span-1"
          rules={[
            {
              pattern: /[0-9]+/,
              message: "Nomor NPWP hanya boleh diisi dengan angka",
            },
          ]}
        >
          <div className="flex flex-row space-x-3">
            <Input
              value={
                dataEmployee.npwp == null || dataEmployee.npwp == false
                  ? ""
                  : dataEmployee.npwp
              }
              name={"npwp"}
              placeholder="Input NPWP Number"
              onChange={onChangeInput}
            />
          </div>
        </Form.Item>
        <Form.Item
          label="BPJS Kesehatan Number"
          name={"bpjs_kesehatan"}
          className="col-span-1"
          rules={[
            {
              pattern: /[0-9]+/,
              message: "Nomor BPJS Kesehatan hanya boleh diisi dengan angka",
            },
          ]}
        >
          <div className="flex flex-row space-x-3">
            <Input
              value={
                dataEmployee.bpjs_kesehatan == null ||
                dataEmployee.bpjs_kesehatan == false
                  ? ""
                  : dataEmployee.bpjs_kesehatan
              }
              name={"bpjs_kesehatan"}
              placeholder="Input BPJS Kesehatan Number"
              onChange={onChangeInput}
            />
          </div>
        </Form.Item>
        <Form.Item
          label="BPJS Ketenagakerjaan Number"
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
              value={
                dataEmployee.bpjs_ketenagakerjaan == null ||
                dataEmployee.bpjs_ketenagakerjaan == false
                  ? ""
                  : dataEmployee.bpjs_ketenagakerjaan
              }
              name={"bpjs_ketenagakerjaan"}
              placeholder="Input BPJS Ketenagakerjaan Number"
              onChange={onChangeInput}
            />
          </div>
        </Form.Item>
        <Form.Item
          label="KB Bukopin Account Number"
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
              value={
                dataEmployee.acc_number_bukopin == null ||
                dataEmployee.acc_number_bukopin == false
                  ? ""
                  : dataEmployee.acc_number_bukopin
              }
              name={"acc_number_bukopin"}
              placeholder="Input KB Bukopin Account Number"
              onChange={onChangeInput}
            />
          </div>
        </Form.Item>
        <Form.Item label="Bank Account Number" className="col-span-1">
          <Form.Item
            name={"acc_name_another"}
            rules={[
              {
                required: true,
                message: "Nama bank wajib diisi",
              },
            ]}
            className=""
          >
            <>
              <Select
                showSearch
                value={dataEmployee.acc_name_another}
                name={"acc_name_another"}
                placeholder="Select Bank"
                onChange={(value) => onChangeSelect(value, "acc_name_another")}
                defaultActiveFirstOption={false}
                optionFilterProp="children"
                notFoundContent={null}
                filterOption={(input, option) => {
                  return (option?.value ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase());
                }}
                options={bankList.map((bank) => ({
                  value: bank.name,
                  // label: bank.bank_code,
                }))}
              />
            </>
          </Form.Item>
        </Form.Item>
        <Form.Item
          label={<p className={"text-white"}>oke</p>}
          name={"acc_number_another"}
          rules={[
            {
              pattern: /[0-9]+/,
              message: "Nomor rekening hanya boleh diisi dengan angka",
            },
          ]}
          className="col-span-1"
        >
          <>
            <Input
              value={
                dataEmployee.acc_number_another == null ||
                dataEmployee.acc_number_another == false
                  ? ""
                  : dataEmployee.acc_number_another
              }
              name={"acc_number_another"}
              placeholder="Bank Account Number"
              onChange={onChangeInput}
            />
          </>
        </Form.Item>
      </div>
    </Form>
  );
};

export default EmployeeProfileForm;
