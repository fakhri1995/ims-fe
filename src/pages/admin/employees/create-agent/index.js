import {
  CloseOutlined,
  LeftOutlined,
  LoadingOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Form,
  Input,
  Select,
  Spin,
  Tabs,
  Tooltip,
  Upload,
  notification,
} from "antd";
import debounce from "lodash.debounce";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { useAccessControl } from "contexts/access-control";

import {
  AGENT_ADD,
  COMPANY_CLIENTS_GET,
  EMPLOYEE_GET,
  EMPLOYEE_INVENTORY_UPDATE,
  ROLES_GET,
} from "lib/features";

import ButtonSys from "../../../../components/button";
import { CheckIconSvg } from "../../../../components/icon";
import LayoutDashboard from "../../../../components/layout-dashboard-management";
import st from "../../../../components/layout-dashboard-management.module.css";
import { objectToFormData } from "../../../../lib/helper";
import httpcookie from "cookie";

const EmployeeProfileForm = dynamic(
  () => import("../../../../components/screen/employee/create/profile"),
  { ssr: false }
);
const EmployeeContractForm = dynamic(
  () => import("../../../../components/screen/employee/create/contract"),
  { ssr: false }
);
const EmployeeInventoryForm = dynamic(
  () => import("../../../../components/screen/employee/create/inventory"),
  { ssr: false }
);

const EmployeeCreateAgentIndex = ({ initProps, dataProfile, sidemenu }) => {
  /**
   * Dependencies
   */

  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();

  if (isAccessControlPending) {
    return null;
  }

  const isAllowedToGetEmployee = hasPermission(EMPLOYEE_GET);
  const isAllowedToGetRolesList = hasPermission(ROLES_GET);
  const isAllowedToAddAgent = hasPermission(AGENT_ADD);
  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);
  const isAllowedToUpdateEmployeeInventory = hasPermission(
    EMPLOYEE_INVENTORY_UPDATE
  );

  // INIT
  const rt = useRouter();
  const { id: employeeId, prevpath } = rt.query;

  // Breadcrumb url
  const pathArr = rt.pathname.split("/").slice(1);

  // Breadcrumb title
  const pathTitleArr = [...pathArr];
  pathTitleArr.splice(1, 2);
  pathTitleArr.splice(1, 2, "Daftar Karyawan", "Tambah Karyawan");

  // 1. USE STATE
  const [refresh, setRefresh] = useState(-1);
  const [refreshContract, setRefreshContract] = useState(-1);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEmployee, setLoadingEmployee] = useState(false);

  // Use for auto save
  const [loadingupload, setLoadingUpload] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [showSuccessIcon, setShowSuccessIcon] = useState(false);
  const [currentTab, setCurrentTab] = useState("1");
  const [loadingsave, setLoadingsave] = useState(false);
  //data companies
  const [datacompanylist, setdatacompanylist] = useState([]);
  const [searchFormAktivitasValue, setFormAktivitasValue] = useState("");
  const [formAktivitasData, setFormAktivitasData] = useState([]);
  //data roles
  const [dataroles, setdataroles] = useState([]);
  const prevTab = useRef();
  const [instanceForm] = Form.useForm();
  const [loadingUpload, setLoadingupload] = useState(false);
  const [dataEmployee, setDataEmployee] = useState({
    id: null,
    user_id: null,
    id_card_photo: null,
    name: "",
    nip: "",
    nik: "",
    alias: "",
    phone_number: "",
    email_office: "",
    email_personal: "",
    domicile: "",
    birth_place: "",
    birth_date: "",
    gender: "",
    blood_type: "",
    marital_status: "",
    number_of_children: "",
    bio_mother_name: "",
    npwp: "",
    bpjs_kesehatan: "",
    bpjs_ketenagakerjaan: "",
    acc_number_bukopin: "",
    acc_number_another: "",
    acc_name_another: "",
    is_posted: 0,
    contract: {},
    contracts: [],
    inventories: [],
    join_at: "",
  });

  const [dataContract, setDataContract] = useState({
    id: dataEmployee?.contract?.id,
    employee_id: employeeId,
    is_employee_active: 0,
    contract_name: "",
    contract_files: [],
    contract_status_id: null,
    role_id: null,
    pkwt_reference: "",
    annual_leave: 0,
    contract_start_at: "",
    contract_end_at: "",
    placement: "",
    new_office: "",
    resign_at: "",
    salaries: [
      {
        id: 0,
        employee_salary_column_id: 0,
        employee_payslip_id: 0,
        value: 0,
        column: [],
      },
    ],
    gaji_pokok: 0,
    pph21: 0,
    salaries: [],
    bpjs_ks: "",
    bpjs_tk_jht: "",
    bpjs_tk_jkk: "",
    bpjs_tk_jkm: "",
    bpjs_tk_jp: "",
    removed_file_ids: [],
  });

  const [newuser, setNewuser] = useState({
    fullname: "",
    email: "",
    role_ids: [],
    phone_number: "",
    nip: 0,
    profile_image: "",
    profile_image_file: null,
    company_id: 1,
    password: "",
    confirm_password: "",
    position: "",
    attendance_form_ids: [],
  });

  const [inventoryList, setInventoryList] = useState([]);

  // Required form fields
  const [requiredFields, setRequiredFields] = useState([]);

  // 2. USE EFFECT
  useEffect(() => {
    prevTab.current = currentTab;
  }, [currentTab]);

  // 2.1. Get Employee Data
  useEffect(() => {
    if (!isAllowedToGetEmployee) {
      permissionWarningNotification("Mendapatkan", "Data Employee");
      setLoadingEmployee(false);
      return;
    }

    if (employeeId) {
      setLoadingEmployee(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getEmployee?id=${employeeId}`,
        {
          method: `GET`,
          headers: {
            Authorization: JSON.parse(initProps),
          },
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          if (res2.success) {
            setDataEmployee(res2.data);
          } else {
            notification.error({
              message: `${res2.message}`,
              duration: 3,
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: `${err.response}`,
            duration: 3,
          });
        })
        .finally(() => {
          setLoadingEmployee(false);
        });
    }
  }, [isAllowedToGetEmployee, refresh]);

  const beforeUploadProfileImage = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      notificationError({ message: "You can only upload JPG/PNG file!" });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      notificationError({ message: "Image must smaller than 2MB!" });
    }
    return isJpgOrPng && isLt2M;
  };

  const onChangeProfileImage = async (info) => {
    if (info.file.status === "uploading") {
      setLoadingupload(true);
      return;
    }
    if (info.file.status === "done") {
      const blobFile = info.file.originFileObj;
      const base64Data = await getBase64(blobFile);

      setNewuser({
        ...newuser,
        profile_image: base64Data,
        profile_image_file: blobFile,
      });
    }
  };

  const onChangeCreateAgents = (e) => {
    var val = e.target.value;
    if (e.target.name === "role") {
      val = parseInt(e.target.value);
    }

    setNewuser((prev) => ({
      ...prev,
      [e.target.name]: val,
    }));
  };

  const uploadButton = (
    <div>
      {loadingupload ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Unggah</div>
    </div>
  );

  const handleCreateAgents = () => {
    setLoadingsave(true);

    const createPayload = {
      ...newuser,
      profile_image: newuser.profile_image_file,
    };
    if ("profile_image_file" in createPayload) {
      delete createPayload["profile_image_file"];
    }

    setLoadingsave(false);
  };

  return (
    <LayoutDashboard
      dataProfile={dataProfile}
      sidemenu={sidemenu}
      tok={initProps}
      st={st}
      pathArr={pathArr}
      pathTitleArr={pathTitleArr}
    >
      <div className="shadow-lg rounded-md bg-white p-3 md:py-7 md:px-4">
        <div className="grid grid-cols-1">
          <div className="col-span-1 md:col-span-3 flex flex-col">
            <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-14">
              <div className="border-b border-black p-4 font-semibold mb-5">
                Akun Agent - {newuser.fullname}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="p-3 col-span-1 md:col-span-1">
                  <Upload
                    name="profile_image"
                    listType="picture-card"
                    className="profileImage"
                    showUploadList={false}
                    beforeUpload={beforeUploadProfileImage}
                    onChange={onChangeProfileImage}
                  >
                    {newuser.profile_image ? (
                      <img
                        src={newuser.profile_image}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </div>
                <div className="p-3 col-span-1 md:col-span-3">
                  <Form
                    name="agentForm"
                    layout="vertical"
                    form={instanceForm}
                    className="createAgentsForm"
                    onFinish={handleCreateAgents}
                  >
                    <Form.Item label="Company" name="company_id">
                      <Select
                        showSearch
                        allowClear
                        placeholder="Pilih company"
                        value={newuser?.company_id}
                        options={datacompanylist.map((company) => ({
                          label: company.name,
                          value: company.id,
                        }))}
                        filterOption={(input, option) => {
                          return (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase());
                        }}
                        onChange={(value) => {
                          setNewuser({ ...newuser, company_id: value });
                        }}
                        disabled={!isAllowedToGetCompanyClients}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Nama Lengkap"
                      required
                      name="fullname"
                      rules={[
                        {
                          required: true,
                          message: "Nama Lengkap wajib diisi",
                        },
                      ]}
                    >
                      <Input
                        value={newuser.fullname}
                        name={`fullname`}
                        onChange={onChangeCreateAgents}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      required
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Email wajib diisi",
                        },
                        {
                          pattern:
                            /(\-)|(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,
                          message: "Email belum diisi dengan benar",
                        },
                      ]}
                    >
                      <Input
                        value={newuser.email}
                        name={`email`}
                        onChange={onChangeCreateAgents}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Posisi"
                      required
                      name="position"
                      rules={[
                        {
                          required: true,
                          message: "Posisi wajib diisi",
                        },
                      ]}
                    >
                      <Input
                        value={newuser.position}
                        name={`position`}
                        onChange={onChangeCreateAgents}
                      />
                    </Form.Item>
                    <Form.Item
                      label="No. Handphone"
                      name="phone_number"
                      rules={[
                        {
                          required: true,
                          message: "No.Handphone wajib diisi",
                        },
                        {
                          pattern: /(\-)|(^\d*$)/,
                          message: "No. Handphone harus berisi angka",
                        },
                      ]}
                    >
                      <Input
                        value={newuser.phone_number}
                        name={`phone_number`}
                        onChange={onChangeCreateAgents}
                      />
                    </Form.Item>
                    <Form.Item
                      label="NIP"
                      name="nip"
                      rules={[
                        {
                          required: true,
                          message: "NIP wajib diisi",
                        },
                        {
                          pattern: /^[0-9]*$/,
                          message: "NIP harus berisi angka",
                        },
                      ]}
                    >
                      <Input
                        value={newuser.nip}
                        name="nip"
                        onChange={onChangeCreateAgents}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Form Aktivitas"
                      name="attendance_form_ids"
                    >
                      <Select
                        showSearch
                        allowClear
                        placeholder="Pilih form aktivitas"
                        filterOption={false}
                        onSearch={(value) => setFormAktivitasValue(value)}
                        onChange={(value) => {
                          if (value === undefined || value === "") {
                            setFormAktivitasValue("");
                            return;
                          }

                          setNewuser((prev) => ({
                            ...prev,
                            attendance_form_ids: [value],
                          }));
                        }}
                      >
                        {formAktivitasData?.map(({ id, name }) => (
                          <Select.Option key={id} value={id}>
                            {name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Password wajib diisi",
                        },
                        {
                          pattern: /([A-z0-9]{8})/,
                          message: "Password minimal 8 karakter",
                        },
                      ]}
                    >
                      <Input.Password
                        value={newuser.password}
                        name={`password`}
                        onChange={onChangeCreateAgents}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Konfirmasi Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Confirm Password wajib diisi",
                        },
                        {
                          pattern: /([A-z0-9]{8})/,
                          message: "Confirm Password minimal 8 karakter",
                        },
                      ]}
                    >
                      <>
                        <Input.Password
                          value={newuser.confirm_password}
                          name={`confirm_password`}
                          onChange={onChangeCreateAgents}
                        />
                        {newuser.password !== newuser.confirm_password && (
                          <p className=" text-red-500 mb-0">
                            Confirm Password harus sesuai dengan password
                          </p>
                        )}
                      </>
                    </Form.Item>
                    <Form.Item label="Role" name="role">
                      <Select
                        mode="multiple"
                        showSearch
                        disabled={!isAllowedToGetRolesList}
                        onChange={(value) => {
                          setNewuser({ ...newuser, role_ids: value });
                        }}
                        /*defaultValue={idrole}*/
                        style={{ width: `100%` }}
                        options={dataroles.map((doc) => ({
                          label: doc.name,
                          value: doc.id,
                        }))}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option?.label
                            ?.toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      />
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export async function getServerSideProps({ req, res }) {
  var initProps = {};
  if (!req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const cookiesJSON1 = httpcookie.parse(req.headers.cookie);
  if (!cookiesJSON1.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  initProps = cookiesJSON1.token;
  const resourcesGP = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP;

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "employee-list",
    },
  };
}

export default EmployeeCreateAgentIndex;
