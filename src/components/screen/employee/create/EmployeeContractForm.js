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
  CheckIconSvg,
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

const EmployeeContractForm = () => {
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

  const rt = useRouter();
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

  const [addMode, setAddMode] = useState("");

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
      className="grid grid-cols-2 gap-x-8 px-1"
    >
      <h5 className="mig-heading--5 col-span-2 mb-3">INFORMASI UMUM</h5>
      <Form.Item
        label="Nama Kontrak"
        name={"contract_name"}
        rules={[
          {
            required: true,
            message: "Nama kontrak wajib diisi",
          },
        ]}
        className="col-span-1"
      >
        <div>
          <Input
            // value={dataUpdateBasic.name}
            name={"contract_name"}
            onChange={onChangeInput}
            placeholder="Masukkan nama kontrak"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Status Kontrak"
        name={"contract_status"}
        rules={[
          {
            required: true,
            message: "Status kontrak wajib diisi",
          },
        ]}
        className="col-span-1"
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
            placeholder="Pilih status kontrak"
          >
            {["Laki-laki", "Perempuan"].map((option, idx) => (
              <Select.Option key={idx} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Form.Item>
      <Form.Item
        label="Posisi"
        name={"position"}
        rules={[
          {
            required: true,
            message: "Posisi wajib diisi",
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
            placeholder="Pilih posisi"
          >
            {["Laki-laki", "Perempuan"].map((option, idx) => (
              <Select.Option key={idx} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Form.Item>
      <Form.Item
        label="Status Karyawan"
        name={"employee_status"}
        rules={[
          {
            required: true,
            message: "Status karyawan wajib diisi",
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
            placeholder="Pilih status karyawan"
          >
            {["Laki-laki", "Perempuan"].map((option, idx) => (
              <Select.Option key={idx} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Form.Item>
      <Form.Item
        label="Dokumen Kontrak"
        name={"contract_doc"}
        className="col-span-2 w-full"
        rules={[
          {
            required: true,
            message: "Dokumen kontrak wajib diisi",
          },
        ]}
      >
        <div className="flex flex-col space-y-2">
          <p className="text-mono50 italic">Unggah File PDF (Maksimal 5 MB)</p>
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
        label="Referensi PKWT"
        name={"pkwt"}
        rules={[
          {
            required: true,
            message: "Referensi PKWT wajib diisi",
          },
        ]}
        className="col-span-2"
      >
        <div>
          <Input
            // value={dataUpdateBasic.name}
            name={"pkwt"}
            onChange={onChangeInput}
            placeholder="Masukkan PKWT"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Awal Kontrak"
        name={"contract_starts"}
        rules={[
          {
            required: true,
            message: "Awal kontrak wajib diisi",
          },
        ]}
      >
        <div>
          <DatePicker
            name="contract_start"
            placeholder="Pilih tanggal awal kontrak"
            className="w-full"
            // value={[
            //   dataUpdateExp.start_date
            //     ? moment(dataUpdateExp.start_date)
            //     : null,
            //   dataUpdateExp.end_date ? moment(dataUpdateExp.end_date) : null,
            // ]}
            // onChange={(value, datestring) => {
            //   let startDate = datestring[0];
            //   let endDate = datestring[1];
            //   setDataUpdateExp((prev) => ({
            //     ...prev,
            //     start_date: startDate,
            //     end_date: endDate,
            //   }));
            // }}
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Akhir Kontrak"
        name={"contract_ends"}
        rules={[
          {
            required: true,
            message: "Akhir kontrak wajib diisi",
          },
        ]}
      >
        <div>
          <DatePicker
            name="contract_ends"
            placeholder="Pilih tanggal akhir kontrak"
            className="w-full"
            // value={[
            //   dataUpdateExp.start_date
            //     ? moment(dataUpdateExp.start_date)
            //     : null,
            //   dataUpdateExp.end_date ? moment(dataUpdateExp.end_date) : null,
            // ]}
            // onChange={(value, datestring) => {
            //   let startDate = datestring[0];
            //   let endDate = datestring[1];
            //   setDataUpdateExp((prev) => ({
            //     ...prev,
            //     start_date: startDate,
            //     end_date: endDate,
            //   }));
            // }}
          />
        </div>
      </Form.Item>
      <Form.Item label="Penempatan" name={"placement"}>
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
            placeholder="Pilih penempatan"
          >
            {["Laki-laki", "Perempuan"].map((option, idx) => (
              <Select.Option key={idx} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Form.Item>
      <Form.Item label="Kantor Baru" name={"new_office"}>
        <div>
          <Input
            // value={dataUpdateBasic.name}
            name={"new_office"}
            onChange={onChangeInput}
            placeholder="Masukkan kantor baru"
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Tanggal Resign"
        name={"resign_date"}
        className="col-span-2"
      >
        <div>
          <DatePicker
            name="resign_date"
            placeholder="Pilih tanggal resign"
            className="w-full"
            // value={[
            //   dataUpdateExp.start_date
            //     ? moment(dataUpdateExp.start_date)
            //     : null,
            //   dataUpdateExp.end_date ? moment(dataUpdateExp.end_date) : null,
            // ]}
            // onChange={(value, datestring) => {
            //   let startDate = datestring[0];
            //   let endDate = datestring[1];
            //   setDataUpdateExp((prev) => ({
            //     ...prev,
            //     start_date: startDate,
            //     end_date: endDate,
            //   }));
            // }}
          />
        </div>
      </Form.Item>

      <div className="flex flex-col space-y-3">
        <p className="mig-heading--5">BENEFIT PENERIMAAN</p>
        <Form.Item
          label="Gaji Pokok"
          name={"main_salary"}
          rules={[
            {
              required: true,
              message: "Gaji pokok wajib diisi",
            },
          ]}
        >
          <div>
            <Input
              // value={dataUpdateBasic.name}
              name={"main_salary"}
              onChange={onChangeInput}
              placeholder="Masukkan gaji pokok"
            />
          </div>
        </Form.Item>
        <Form.Item label="Tunjangan Uang Makan" name={"meal_allowance"}>
          <div>
            <Input
              // value={dataUpdateBasic.name}
              name={"meal_allowance"}
              onChange={onChangeInput}
              placeholder="Masukkan tunjangan uang makan"
            />
          </div>
        </Form.Item>
        {addMode === "allowance" ? (
          <div className="flex flex-col space-y-2 pt-1">
            <div className="flex flex-row space-x-4">
              <Input
                // value={dataUpdateBasic.name}
                // name={"meal_allowance"}
                // onChange={onChangeInput}
                placeholder="Nama Benefit"
              />
              <button
                // onClick={() => {
                // 	handleAddSection("experience", dataUpdateExp);
                // 	setIsAdd(false);
                // 	clearDataUpdate();
                // }}
                className="bg-transparent"
              >
                <CheckIconSvg size={24} color={"#35763B"} />
              </button>
              <button
                onClick={() => {
                  setAddMode("");
                  // clearDataUpdate();
                }}
                className="bg-transparent"
              >
                <XIconSvg size={24} color={"#BF4A40"} />
              </button>
            </div>
            {/* <Input
							// value={dataUpdateBasic.name}
							// name={"meal_allowance"}
							// onChange={onChangeInput}
							placeholder="Nilai Benefit"
						/> */}
          </div>
        ) : (
          <ButtonSys
            type={"dashed"}
            onClick={() => {
              // clearDataUpdate();
              setAddMode("allowance");
            }}
          >
            <p className="text-primary100 hover:text-primary75">
              + Tambah Variable Penerimaan
            </p>
          </ButtonSys>
        )}
      </div>

      <div className="flex flex-col space-y-3">
        <p className="mig-heading--5">BENEFIT PENGURANGAN</p>
        <Form.Item label="PPh 21" name={"income_tax"}>
          <div>
            <Input
              // value={dataUpdateBasic.name}
              name={"income_tax"}
              onChange={onChangeInput}
              placeholder="Masukkan pajak penghasilan"
            />
          </div>
        </Form.Item>
        {addMode === "deduction" ? (
          <div className="flex flex-col space-y-2 pt-1">
            <div className="flex flex-row space-x-4">
              <Input
                // value={dataUpdateBasic.name}
                // name={"meal_allowance"}
                // onChange={onChangeInput}
                placeholder="Nama Benefit"
              />
              <button
                // onClick={() => {
                // 	handleAddSection("experience", dataUpdateExp);
                // 	setIsAdd(false);
                // 	clearDataUpdate();
                // }}
                className="bg-transparent"
              >
                <CheckIconSvg size={24} color={"#35763B"} />
              </button>
              <button
                onClick={() => {
                  setAddMode("");
                  // clearDataUpdate();
                }}
                className="bg-transparent"
              >
                <XIconSvg size={24} color={"#BF4A40"} />
              </button>
            </div>
            {/* <Input
							// value={dataUpdateBasic.name}
							// name={"meal_allowance"}
							// onChange={onChangeInput}
							placeholder="Nilai Benefit"
						/> */}
          </div>
        ) : (
          <ButtonSys
            type={"dashed"}
            onClick={() => {
              // clearDataUpdate();
              setAddMode("deduction");
            }}
          >
            <p className="text-primary100 hover:text-primary75">
              + Tambah Variable Pengurangan
            </p>
          </ButtonSys>
        )}
      </div>
    </Form>
  );
};

export default EmployeeContractForm;
