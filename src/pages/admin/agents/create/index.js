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

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";
import { useDebounce } from "hooks/use-debounce-value";

import { AGENT_ADD, COMPANY_CLIENTS_GET, ROLES_GET } from "lib/features";
import { getBase64 } from "lib/helper";

import { AttendanceFormAktivitasService } from "apis/attendance";
import { AgentService } from "apis/user";

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
    nip: "",
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
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
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
      <div
        className="w-full h-auto grid grid-cols-1 md:grid-cols-4"
        id="createAgentsWrapper"
      >
        <div className=" col-span-1 md:col-span-4">
          <Sticky containerSelectorFocus="#createAgentsWrapper">
            <div className=" col-span-4 flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white mb-8">
              <h1 className="font-semibold py-2">Buat Akun Agent</h1>
              <div className="flex space-x-2">
                <Link href="/admin/agents">
                  <Button type="default">Batal</Button>
                </Link>
                <Button
                  disabled={
                    praloading ||
                    !isAllowedToAddAgent ||
                    !isAllowedToGetCompanyClients
                  }
                  type="primary"
                  loading={loadingsave}
                  onClick={instanceForm.submit}
                >
                  Simpan
                </Button>
              </div>
            </div>
          </Sticky>
        </div>
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

                  <Form.Item label="Form Aktivitas" name="attendance_form_ids">
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
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  var initProps = {};
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
