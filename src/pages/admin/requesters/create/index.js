import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import {
  Button,
  Form,
  Input,
  Select,
  TreeSelect,
  Upload,
  notification,
} from "antd";
// import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sticky from "wil-react-sticky";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import { COMPANY_CLIENTS_GET, REQUESTER_ADD, ROLES_GET } from "lib/features";
import { getBase64 } from "lib/helper";

import { RequesterService } from "apis/user";

import Layout from "../../../../components/layout-dashboard";
import st from "../../../../components/layout-dashboard.module.css";
import httpcookie from "cookie";

// function modifData(dataa) {
//   for (var i = 0; i < dataa.length; i++) {
//     dataa[i]["key"] = dataa[i].id;
//     dataa[i]["value"] = dataa[i].id;
//     dataa[i]["title"] = dataa[i].name;
//     dataa[i]["children"] = dataa[i].members;
//     delete dataa[i].members;
//     if (dataa[i].children) [modifData(dataa[i].children)];
//   }
//   return dataa;
// }

function RequestersCreate({
  initProps,
  dataProfile,
  sidemenu,
  dataCompanyList,
}) {
  /**
   * Dependencies
   */
  const { hasPermission } = useAccessControl();
  const isAllowedToGetRolesList = hasPermission(ROLES_GET);
  const isAllowedToAddRequester = hasPermission(REQUESTER_ADD);
  const isAllowedToGetClientCompanyList = hasPermission(COMPANY_CLIENTS_GET);

  const axiosClient = useAxiosClient();
  const rt = useRouter();
  const tok = initProps;
  var pathArr = rt.pathname.split("/").slice(1);
  pathArr[pathArr.length - 1] = "Create";
  // dataCompanyList = dataCompanyList.data.members.filter(data => data.company_id !== 66)
  const [instanceForm] = Form.useForm();

  //useState
  const [newuserrequesters, setNewuserrequesters] = useState({
    fullname: "",
    email: "",
    role_ids: [],
    phone_number: "",
    profile_image: "",
    profile_image_file: null, // File | null
    company_id: 0,
    password: "",
    confirm_password: "",
    position: "",
  });
  const [loadingupload, setLoadingupload] = useState(false);
  const [loadingcreate, setLoadingcreate] = useState(false);
  const [datacompanylist, setdatacompanylist] = useState([]);
  const [dataraw1, setdataraw1] = useState([]);
  const [praloading, setpraloading] = useState(true);

  //handleCreateButton
  const handleCreateAgents = () => {
    setLoadingcreate(true);

    const createPayload = {
      ...newuserrequesters,
      profile_image: newuserrequesters.profile_image_file,
    };
    if ("profile_image_file" in createPayload) {
      delete createPayload["profile_image_file"];
    }

    RequesterService.create(axiosClient, createPayload)
      .then((response) => {
        const res2 = response.data;

        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(`/admin/requesters/detail/${res2.id}`);
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
        setLoadingcreate(false);
      });
  };

  const onChangeCreateRequesters = (e) => {
    setNewuserrequesters({
      ...newuserrequesters,
      [e.target.name]: e.target.value,
    });
  };

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

      setNewuserrequesters({
        ...newuserrequesters,
        profile_image: base64Data,
        profile_image_file: blobFile,
      });
    }
  };
  const uploadButton = (
    <div>
      {loadingupload ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  //useEffect
  useEffect(() => {
    if (!isAllowedToGetClientCompanyList) {
      setpraloading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getClientCompanyList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdatacompanylist(res2.data.children);
        setpraloading(false);
      });
  }, [isAllowedToGetClientCompanyList]);

  useEffect(() => {
    if (isAllowedToGetRolesList) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRoles`, {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          setdataraw1(res2.data);
        });
      return;
    }
  }, [isAllowedToGetRolesList]);

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      pathArr={pathArr}
      sidemenu={sidemenu}
      st={st}
    >
      <div
        className="w-full h-auto grid grid-cols-1 md:grid-cols-4"
        id="createAgentsWrapper"
      >
        <div className="col-span-1 md:col-span-4">
          <Sticky containerSelectorFocus="#createAgentsWrapper">
            <div className="flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white mb-8">
              <h1 className="font-semibold py-2">Buat Akun Requester</h1>
              <div className="flex space-x-2">
                {/* <Link href="/admin/requesters"> */}
                <Button
                  disabled={praloading}
                  onClick={() => {
                    rt.push(`/admin/requesters`);
                  }}
                  type="default"
                >
                  Batal
                </Button>
                {/* <button className=" bg-white border hover:bg-gray-200 border-gray-300 text-black py-1 px-3 rounded-md">Cancel</button> */}
                {/* </Link> */}
                <Button
                  disabled={
                    praloading ||
                    !isAllowedToAddRequester ||
                    !isAllowedToGetClientCompanyList
                  }
                  loading={loadingcreate}
                  onClick={instanceForm.submit}
                  type="primary"
                >
                  Simpan
                </Button>
                {/* <button className=" bg-gray-700 hover:bg-gray-800 border text-white py-1 px-3 rounded-md" onClick={handleCreateAgents}>Save</button> */}
              </div>
            </div>
          </Sticky>
        </div>
        <div className="col-span-1 md:col-span-3 flex flex-col">
          <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-14">
            <div className="border-b border-black p-4 font-semibold mb-5">
              Akun Requester - {newuserrequesters.fullname}
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
                  {newuserrequesters.profile_image ? (
                    <img
                      src={newuserrequesters.profile_image}
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
                  className="createAgentsForm"
                  onFinish={handleCreateAgents}
                  form={instanceForm}
                >
                  <Form.Item
                    label="Asal Lokasi"
                    name="company_id"
                    rules={[
                      {
                        required: true,
                        message: "Asal Lokasi wajib diisi",
                      },
                    ]}
                  >
                    <TreeSelect
                      allowClear
                      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                      treeData={datacompanylist}
                      disabled={!isAllowedToGetClientCompanyList}
                      placeholder="Pilih Asal Lokasi"
                      treeDefaultExpandAll
                      onChange={(value) => {
                        setNewuserrequesters({
                          ...newuserrequesters,
                          company_id: value,
                        });
                      }}
                      showSearch
                      treeNodeFilterProp="title"
                      filterTreeNode={(search, item) => {
                        /** `showSearch`, `filterTreeNode`, and `treeNodeFilterProp` */
                        /** @see https://stackoverflow.com/questions/58499570/search-ant-design-tree-select-by-title */
                        return (
                          item.title
                            .toLowerCase()
                            .indexOf(search.toLowerCase()) >= 0
                        );
                      }}
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
                      value={newuserrequesters.fullname}
                      name={`fullname`}
                      onChange={onChangeCreateRequesters}
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
                      value={newuserrequesters.email}
                      name={`email`}
                      onChange={onChangeCreateRequesters}
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
                      value={newuserrequesters.position}
                      name={`position`}
                      onChange={onChangeCreateRequesters}
                    />
                  </Form.Item>
                  <Form.Item
                    label="No. Handphone"
                    name="phone_number"
                    rules={[
                      {
                        required: true,
                        message: "No. Handphone wajib diisi",
                      },
                      {
                        pattern: /(\-)|(^\d*$)/,
                        message: "No. Handphone harus berisi angka",
                      },
                    ]}
                  >
                    <Input
                      value={newuserrequesters.phone_number}
                      name={`phone_number`}
                      onChange={onChangeCreateRequesters}
                    />
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
                      value={newuserrequesters.password}
                      name={`password`}
                      onChange={onChangeCreateRequesters}
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
                        value={newuserrequesters.confirm_password}
                        name={`confirm_password`}
                        onChange={onChangeCreateRequesters}
                      />
                      {newuserrequesters.password !==
                        newuserrequesters.confirm_password && (
                        <p className=" text-red-500 mb-0">
                          Confirm Password harus sesuai dengan password
                        </p>
                      )}
                    </>
                  </Form.Item>
                  <Form.Item label="Role" name="role">
                    <Select
                      mode="multiple"
                      disabled={!isAllowedToGetRolesList}
                      onChange={(value) => {
                        setNewuserrequesters({
                          ...newuserrequesters,
                          role_ids: value,
                        });
                      }}
                      style={{ width: `100%` }}
                      options={dataraw1.map((doc) => ({
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
  const reqBody = {
    page: 1,
    rows: 50,
    order_by: "asc",
  };
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

  // if (![117].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  // const resourcesGCL = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getClientCompanyList`, {
  //     method: `POST`,
  //     headers: {
  //         'Authorization': JSON.parse(initProps),
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(reqBody)
  // })
  // const resjsonGCL = await resourcesGCL.json()
  // const dataCompanyList = resjsonGCL

  return {
    props: {
      initProps,
      dataProfile,
      // dataCompanyList,
      sidemenu: "62",
    },
  };
}

export default RequestersCreate;
