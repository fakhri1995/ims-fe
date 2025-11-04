import { LoadingOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Select,
  TreeSelect,
  Upload,
  notification,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Sticky from "wil-react-sticky";

import { CheckIconSvg, UploadIconSvg } from "components/icon";
import { ModalAccept } from "components/modal/modalConfirmation";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";
import { useDebounce } from "hooks/use-debounce-value";

import { AGENT_ADD, COMPANY_CLIENTS_GET, ROLES_GET } from "lib/features";
import { getBase64, notificationError } from "lib/helper";

import { AttendanceFormAktivitasService } from "apis/attendance";
import { AgentService } from "apis/user";

import UserPicturUploadIcon from "assets/vectors/user-picture-upload.svg";

import Layout from "../../../../components/layout-dashboard-management";
import st from "../../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

function AgentsCreate({ initProps, dataProfile, sidemenu }) {
  /**
   * Dependencies
   */
  const axiosClient = useAxiosClient();
  const rt = useRouter();
  const { hasPermission } = useAccessControl();
  const isAllowedToGetRolesList = hasPermission(ROLES_GET);
  const isAllowedToAddAgent = hasPermission(AGENT_ADD);
  const isAllowedToGetCompanyClients = hasPermission(COMPANY_CLIENTS_GET);

  const { originPath } = rt.query;
  const tok = initProps;
  //Breadcrumb
  var pathArr = rt.pathname.split("/").slice(1);
  pathArr[pathArr.length - 1] = "Create";
  //init Form instance
  const [instanceForm] = Form.useForm();

  const [searchFormAktivitasValue, setFormAktivitasValue] = useState("");
  const [modalConfirm, setModalConfirm] = useState(false);
  const debouncedSearchFormAktivitasValue = useDebounce(
    searchFormAktivitasValue
  );

  const { data: formAktivitasData, refetch: findFormAktivitas } = useQuery(
    ["ATTENDANCE_FORMS_GET", debouncedSearchFormAktivitasValue],
    (query) => {
      const searchKeyword = query.queryKey[1];

      return AttendanceFormAktivitasService.find(axiosClient, {
        keyword: searchKeyword,
      });
    },
    {
      enabled: false,
      select: (response) =>
        response.data.data.data.map((formAktivitasDatum) => ({
          id: formAktivitasDatum.id,
          name: formAktivitasDatum.name,
        })),
    }
  );

  useEffect(() => {
    if (!isAllowedToAddAgent) {
      return;
    }

    findFormAktivitas({
      queryKey: ["ATTENDANCE_FORMS_GET", debouncedSearchFormAktivitasValue],
      exact: true,
    });
  }, [debouncedSearchFormAktivitasValue, isAllowedToAddAgent]);

  //useState
  //data payload
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
  //is loading upload image
  const [loadingupload, setLoadingupload] = useState(false);
  //is loading upddate
  const [loadingsave, setLoadingsave] = useState(false);
  //data companies
  const [datacompanylist, setdatacompanylist] = useState([]);
  //data roles
  const [dataroles, setdataroles] = useState([]);
  //is pra rendered loading
  const [praloading, setpraloading] = useState(true);

  const handleExternalSubmit = async () => {
    try {
      const values = await instanceForm.validateFields();
      if (values) {
        setModalConfirm(true);
        // Kirim ke API
      }
    } catch (errorInfo) {
      console.log("❌ Form invalid:", errorInfo);
    }
  };

  //handle CreateAgent
  const handleCreateAgents = () => {
    setLoadingsave(true);

    const createPayload = {
      ...newuser,
      profile_image: newuser.profile_image_file,
    };
    if ("profile_image_file" in createPayload) {
      delete createPayload["profile_image_file"];
    }

    AgentService.create(axiosClient, createPayload)
      .then((response) => {
        const res2 = response.data;
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(`/admin/agents/detail/${res2.id}`);
          }, 1000);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message;

        notification["error"]({
          message: errorMessage || "Terjadi kesalahan saat memperbarui profil",
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingsave(false);
      });
  };

  //on change create agent
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

  //handle before upload
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

  const uploadButton = (
    <div>
      {loadingupload ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Unggah</div>
    </div>
  );

  //useEffect
  //data Roles
  useEffect(() => {
    if (!isAllowedToAddAgent || !isAllowedToGetRolesList) {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRoles`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdataroles(res2.data);
      });
  }, [isAllowedToGetRolesList, isAllowedToAddAgent]);

  // Get Company options
  useEffect(() => {
    if (!isAllowedToGetCompanyClients) {
      setpraloading(false);
      return;
    }
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCompanyClientList?with_mig=1`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        setdatacompanylist(res2.data);
      })
      .catch((err) => {
        notification.error({
          message: "Gagal mendapatkan daftar company",
          duration: 3,
        });
      })
      .finally(() => setpraloading(false));
  }, [isAllowedToGetCompanyClients]);

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      pathArr={pathArr}
      sidemenu={sidemenu}
      originPath={originPath}
      st={st}
    >
      <div className="w-full bg-white rounded-[10px] border border-neutrals70 shadow-desktopCard">
        <div className={"border-b px-6 py-5 flex justify-between items-center"}>
          <div className={"flex flex-col gap-1.5"}>
            <p className={"text-[16px]/6 font-bold font-inter text-[#424242]"}>
              Create Agent Account
            </p>
            <p className={"text-sm/6 font-inter font-normal text-[#757575]"}>
              Please fill the required field
            </p>
          </div>
          <div className={"flex flex-row gap-3"}>
            <Link href="/admin/agents" legacyBehavior>
              <div
                className={
                  "hover:cursor-pointer border border-primary100 text-primary100 rounded-[5px] h-[36px] w-[76px] flex justify-center items-center"
                }
              >
                <p className={"text-sm/4 font-inter font-normal"}>Cancel</p>
              </div>
            </Link>
            <div
              onClick={() => handleExternalSubmit()}
              className={
                "hover:cursor-pointer border bg-primary100 border-primary100 text-white rounded-[5px] h-[36px] w-[79px] gap-1.5 flex justify-center items-center"
              }
            >
              <CheckIconSvg size={16} />
              <p className={"text-sm/4 font-inter font-normal"}>Save</p>
            </div>
          </div>
        </div>
        <div
          className={"grid grid-cols-1 md:grid-cols-3 md:space-x-5 px-6 pt-5"}
        >
          <div className={"col-span-1"}>
            <div className={"flex items-center gap-5"}>
              {newuser.profile_image ? (
                <img
                  src={newuser.profile_image}
                  alt="avatar"
                  style={{ width: 120, height: 120 }}
                />
              ) : (
                <div
                  className={
                    "w-[120px] h-[120px] flex justify-center items-center shadow-desktopCard rounded-[15px]"
                  }
                >
                  <UserPicturUploadIcon />
                </div>
              )}

              <div className={"flex flex-col gap-2.5 justify-center"}>
                <p
                  className={"font-inter font-medium text-xs/5 text-[#4D4D4D]"}
                >
                  Account Picture <span className={"text-[#BF4A40]"}>*</span>
                </p>
                <Upload
                  name="profile_image"
                  // listType="picture-card"
                  className="profileImage"
                  showUploadList={false}
                  beforeUpload={beforeUploadProfileImage}
                  onChange={onChangeProfileImage}
                >
                  <Button
                    className="btn-sm btn font-semibold px-4 flex gap-1.5 border
                           hover:text-white bg-white border-[#4D4D4D]
                          hover:bg-primary75 hover:border-primary75  
                          focus:border-primary75 focus:text-primary100 "
                  >
                    <UploadIconSvg size={16} color={"#4D4D4D"} />
                    <p
                      className={
                        "text-sm/4 font-roboto font-medium text-[#4D4D4D]"
                      }
                    >
                      Upload File
                    </p>
                  </Button>
                </Upload>
              </div>
            </div>
          </div>
          <Form
            name="agentForm"
            layout="vertical"
            form={instanceForm}
            className="createAgentsForm col-span-2"
            onFinish={handleCreateAgents}
          >
            <div className={"grid grid-cols-2 space-x-5"}>
              <Form.Item
                className={"col-span-1"}
                label="Company"
                name="company_id"
              >
                <Select
                  showSearch
                  allowClear
                  className={"w-full"}
                  placeholder="Select company"
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
                label="Full Name"
                className={"col-span-1"}
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
                  placeholder="input name"
                  onChange={onChangeCreateAgents}
                />
              </Form.Item>
            </div>
            <div className={"grid grid-cols-2 space-x-5"}>
              <Form.Item
                label="Email"
                className={"col-span-1"}
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
                label="Position"
                className="col-span-1"
                required
                name="position"
                rules={[
                  {
                    required: true,
                    message: "Position must be filled",
                  },
                ]}
              >
                <Input
                  value={newuser.position}
                  name={`position`}
                  onChange={onChangeCreateAgents}
                />
              </Form.Item>
            </div>
            <div className={"grid grid-cols-2 space-x-5"}>
              <Form.Item
                label="Phone Number"
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Phone Number must be filled",
                  },
                  {
                    pattern: /(\-)|(^\d*$)/,
                    message: "Phone Number must number",
                  },
                ]}
              >
                <Input
                  placeholder="input phone bumber"
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
                    message: "NIP must be filled",
                  },
                  {
                    pattern: /^[0-9]*$/,
                    message: "NIP must be number",
                  },
                ]}
              >
                <Input
                  value={newuser.nip}
                  placeholder="input nip"
                  name="nip"
                  onChange={onChangeCreateAgents}
                />
              </Form.Item>
            </div>
            <div className={"grid grid-cols-2 space-x-5"}>
              <Form.Item label="Activity Form" name="attendance_form_ids">
                <Select
                  showSearch
                  allowClear
                  placeholder="Select Activity form"
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
              <Form.Item label="Account Role" name="role">
                <Select
                  mode="multiple"
                  placeholder={"Select Account Role"}
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
                    option?.label?.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </div>
            <div className={"grid grid-cols-2 space-x-5"}>
              <Form.Item
                label="Account Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Password must be filled",
                  },
                  {
                    pattern: /([A-z0-9]{8})/,
                    message: "Password minimum 8 character",
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
                label="Confirm Account Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Confirm Account must be filled",
                  },
                  {
                    pattern: /([A-z0-9]{8})/,
                    message: "Confirm Account minimum 8 character",
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
                      Confirm Password must be same with password
                    </p>
                  )}
                </>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
      <ModalAccept
        visible={modalConfirm}
        loading={loadingsave}
        disabled={!isAllowedToAddAgent}
        htmlType="submit"
        form="agentForm"
        onOk={() => {
          setModalConfirm(false);
        }}
        onCancel={() => setModalConfirm(false)}
        title="Buat Profil Agent"
      >
        <p>
          Apakah Anda yakin ingin membuat profil agent dengan nama{" "}
          <strong>{newuser?.fullname}</strong>?
        </p>
      </ModalAccept>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  var initProps = "";
  const reqBody = {
    page: 1,
    rows: 50,
    order_by: "asc",
  };
  if (req && req.headers) {
    const cookies = req.headers.cookie;
    if (!cookies) {
      res.writeHead(302, { Location: "/login" });
      res.end();
    }
    if (typeof cookies === "string") {
      const cookiesJSON = httpcookie.parse(cookies);
      initProps = cookiesJSON.token;
    }
  }

  const resources = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailProfile`,
    {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    }
  );
  const resjson = await resources.json();
  const dataProfile = resjson;

  // if (![109].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "61",
    },
  };
}

export default AgentsCreate;
