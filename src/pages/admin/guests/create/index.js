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

import { GUEST_ADD, ROLES_GET } from "lib/features";
import { getBase64 } from "lib/helper";

import { AttendanceFormAktivitasService } from "apis/attendance";
import { AgentService } from "apis/user";

import Layout from "../../../../components/layout-dashboard-management";
import st from "../../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

function GuestCreate({ initProps, dataProfile, sidemenu }) {
  /**
   * Dependencies
   */
  const axiosClient = useAxiosClient();
  const rt = useRouter();
  const { hasPermission } = useAccessControl();
  const isAllowedToGetRolesList = hasPermission(ROLES_GET);
  const isAllowedToAddGuest = hasPermission(GUEST_ADD);

  const { originPath } = rt.query;
  const tok = initProps;
  //Breadcrumb
  var pathArr = rt.pathname.split("/").slice(1);
  pathArr[pathArr.length - 1] = "Create";
  //init Form instance
  const [instanceForm] = Form.useForm();

  //useState
  //data payload
  const [newuser, setNewuser] = useState({
    fullname: "",
    email: "",
    role_ids: [],
    phone_number: "",
    // profile_image: "",
    // profile_image_file: null,
    // password: "",
    // confirm_password: "",
  });
  //is loading upload image
  const [loadingupload, setLoadingupload] = useState(false);
  //is loading upddate
  const [loadingsave, setLoadingsave] = useState(false);
  //data roles
  const [dataroles, setdataroles] = useState([]);

  //handle CreataGuest
  const handleCreateGuest = () => {
    if (!isAllowedToAddGuest) {
      permissionWarningNotification("Menambah", "Guest");
      return;
    }
    setLoadingsave(true);

    // const createPayload = {
    //   ...newuser,
    //   profile_image: newuser.profile_image_file,
    // };
    // if ("profile_image_file" in createPayload) {
    //   delete createPayload["profile_image_file"];
    // }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addGuestMember`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newuser),
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          notification.success({
            message: response2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(`/admin/guests/detail/${response2.id}`);
          }, 1000);
        } else {
          notification.error({
            message: response2.message,
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: err.response,
          duration: 3,
        });
      })
      .finally(() => {
        setLoadingsave(false);
      });
  };

  //on change create guest
  const onChangeCreateGuest = (e) => {
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
    if (!isAllowedToAddGuest || !isAllowedToGetRolesList) {
      permissionWarningNotification("Mendapatkan", "List Role");
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
  }, [isAllowedToGetRolesList, isAllowedToAddGuest]);

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
              <h1 className="font-semibold py-2">Buat Akun Guest</h1>
              <div className="flex space-x-2">
                <Link href="/admin/guests" legacyBehavior>
                  <Button type="default">Batal</Button>
                </Link>
                <Button
                  disabled={!isAllowedToAddGuest}
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
              Akun Guest - {newuser.fullname}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="p-3 col-span-1 md:col-span-3">
                <Form
                  layout="vertical"
                  form={instanceForm}
                  className="createAgentsForm"
                  onFinish={handleCreateGuest}
                >
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
                      onChange={onChangeCreateGuest}
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
                      onChange={onChangeCreateGuest}
                    />
                  </Form.Item>
                  <Form.Item label="Role" name="role">
                    <Select
                      mode="multiple"
                      disabled={!isAllowedToGetRolesList}
                      onChange={(value) => {
                        setNewuser({ ...newuser, role_ids: value });
                      }}
                      style={{ width: `100%` }}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    >
                      {dataroles.map((doc, idx) => {
                        return (
                          <Select.Option key={doc.id} value={doc.id}>
                            {doc.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
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
      sidemenu: "64",
    },
  };
}

export default GuestCreate;
