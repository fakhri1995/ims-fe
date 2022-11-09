import { ArrowRightOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Tabs,
  Upload,
  notification,
} from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useAccessControl } from "contexts/access-control";

import { RESUME_ADD, RESUME_ASSESSMENT_LIST } from "lib/features";

import ButtonSys from "../../../../components/button";
import BasicInfoCard from "../../../../components/cards/resume/BasicInfoCard";
import {
  CloudUploadIconSvg,
  UploadIconSvg,
  XIconSvg,
} from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import { H1, H2 } from "../../../../components/typography";
import {
  beforeUploadFileMaxSize,
  permissionWarningNotification,
} from "../../../../lib/helper";
import httpcookie from "cookie";

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
  const [dataAddEmployee, setDataAddEmployee] = useState({
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
    other: "",
  });

  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingRoleList, setLoadingRoleList] = useState(false);
  const [assessmentRoles, setAssessmentRoles] = useState([]);
  const [roleName, setRoleName] = useState("");

  // 2. USE EFFECT
  // 2.1. Get Role List
  // useEffect(() => {
  //   if (!isAllowedToGetAssessmentList) {
  //     permissionWarningNotification("Mendapatkan", "Daftar Role");
  //     setLoadingRoleList(false);
  //     return;
  //   }

  //   setLoadingRoleList(true);
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getAssessmentList`, {
  //     method: `GET`,
  //     headers: {
  //       Authorization: JSON.parse(initProps),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res2) => {
  //       if (res2.success) {
  //         setAssessmentRoles(res2.data);
  //       } else {
  //         notification.error({
  //           message: `${res2.message}`,
  //           duration: 3,
  //         });
  //       }
  //       setLoadingRoleList(false);
  //     })
  //     .catch((err) => {
  //       notification.error({
  //         message: `${err.response}`,
  //         duration: 3,
  //       });
  //       setLoadingRoleList(false);
  //     });
  // }, [isAllowedToGetAssessmentList]);

  // 3. HANDLER
  const onChangeInput = (e) => {
    setDataAddEmployee({
      ...dataAddEmployee,
      [e.target.name]: e.target.value,
    });
  };

  // const handleCreateCandidate = () => {
  //   if (!isAllowedToCreateCandidate) {
  //     permissionWarningNotification("Menambah", "Kandidat");
  //     return;
  //   }
  //   setLoadingCreate(true);
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addResume`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: JSON.parse(initProps),
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(dataAddEmployee),
  //   })
  //     .then((response) => response.json())
  //     .then((response2) => {
  //       if (response2.success) {
  //         notification.success({
  //           message: `Kandidat berhasil ditambahkan.`,
  //           duration: 3,
  //         });
  //         setTimeout(() => {
  //           setLoadingCreate(false);
  //           setDataAddEmployee({
  //             name: "",
  //             telp: "",
  //             email: "",
  //             city: "",
  //             province: "",
  //             assessment_id: "",
  //           });
  //           rt.push(`/admin/candidates/${response2.id}`);
  //         }, 500);
  //       } else {
  //         notification.error({
  //           message: `Gagal menambahkan kandidat. ${response2.message}`,
  //           duration: 3,
  //         });
  //         setTimeout(() => {
  //           setLoadingCreate(false);
  //         }, 500);
  //       }
  //     })
  //     .catch((err) => {
  //       notification.error({
  //         message: `Gagal menambahkan kandidat. ${err.response}`,
  //         duration: 3,
  //       });
  //       setLoadingCreate(false);
  //     });
  // };

  return (
    <Form
      layout="vertical"
      form={instanceForm}
      className="grid grid-cols-2 gap-x-8  px-1"
    >
      <Form.Item label="ID Card" name={"id_card"} className="col-span-2 w-full">
        <div className="flex flex-col space-y-2">
          <p className="text-mono50 italic">Unggah File JPEG (Maksimal 5 MB)</p>
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
            // value={dataUpdateBasic.name}
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
            // value={dataUpdateBasic.name}
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
            // value={dataUpdateBasic.name}
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
            // value={dataUpdateBasic.name}
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
            // value={dataUpdateBasic.name}
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
            // value={dataUpdateBasic.name}
            name={"personal_email"}
            onChange={onChangeInput}
            placeholder="Masukkan email pribadi"
          />
        </div>
      </Form.Item>
      <Form.Item label="Domisili" name={"domisili"}>
        <div>
          <Input
            // value={dataUpdateBasic.name}
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
            // value={dataUpdateBasic.name}
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
            // value={dataUpdateBasic.name}
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
        <div>
          <Input
            // value={dataUpdateBasic.name}
            name={"birth_date"}
            onChange={onChangeInput}
            placeholder="Masukkan tanggal lahir"
          />
        </div>
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
        <div>
          <Select
            // defaultValue={dataUpdateBasic.assessment_id}
            // onChange={(value) => {
            //   // console.log(value)
            //   setDataUpdateBasic({
            //     ...dataUpdateBasic,
            //     assessment_id: value,
            //   });
            // }}
            placeholder="Pilih jenis kelamin"
          >
            {["Laki-laki", "Perempuan"].map((option, idx) => (
              <Select.Option key={idx} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Form.Item>
      <Form.Item label="Golongan Darah" name={"blood_type"}>
        <div>
          <Select
            // defaultValue={dataUpdateBasic.assessment_id}
            // onChange={(value) => {
            //   // console.log(value)
            //   setDataUpdateBasic({
            //     ...dataUpdateBasic,
            //     assessment_id: value,
            //   });
            // }}
            placeholder="Pilih jenis kelamin"
          >
            {["A", "B", "AB", "O"].map((option, idx) => (
              <Select.Option key={idx} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Form.Item>
      <Form.Item label="Status Kawin" name={"marital_status"}>
        <div>
          <Select
            // defaultValue={dataUpdateBasic.assessment_id}
            // onChange={(value) => {
            //   // console.log(value)
            //   setDataUpdateBasic({
            //     ...dataUpdateBasic,
            //     assessment_id: value,
            //   });
            // }}
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
        </div>
      </Form.Item>
      <Form.Item label="Jumlah Anak" name={"child_total"}>
        <div>
          <Input
            // value={dataUpdateBasic.telp}
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
            // value={dataUpdateBasic.telp}
            name={"mother_name"}
            placeholder="Masukkan nama ibu kandung"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item label="Nomor NPWP" name={"npwp"} className="col-span-2">
        <div className="flex flex-row space-x-3">
          <Input
            // value={dataUpdateBasic.city}
            name={"npwp"}
            placeholder="Masukkan nomor NPWP"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item label="Nomor BPJS Kesehatan" name={"bpjsk"}>
        <div className="flex flex-row space-x-3">
          <Input
            // value={dataUpdateBasic.city}
            name={"bpjsk"}
            placeholder="Masukkan nomor BPJS Kesehatan"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item label="Nomor BPJS Ketenagakerjaan" name={"bpjstk"}>
        <div className="flex flex-row space-x-3">
          <Input
            // value={dataUpdateBasic.city}
            name={"bpjstk"}
            placeholder="Masukkan nomor BPJS Ketenagakerjaan"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item label="Nomor Rekening Bank KB Bukopin" name={"rek_bukopin"}>
        <div className="flex flex-row space-x-3">
          <Input
            // value={dataUpdateBasic.city}
            name={"rek_bukopin"}
            placeholder="Masukkan nomor rekening Bank KB Bukopin"
            onChange={onChangeInput}
          />
        </div>
      </Form.Item>
      <Form.Item label="Nomor Rekening Bank Lainnya" name={"rek_other"}>
        <div className="flex flex-row space-x-3">
          <Input
            // value={dataUpdateBasic.city}
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
