import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, TreeSelect, notification } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Sticky from "wil-react-sticky";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";
import { useDebounce } from "hooks/use-debounce-value";

import { GUEST_GET, GUEST_UPDATE, ROLES_GET } from "lib/features";
import {
  generateStaticAssetUrl,
  getBase64,
  permissionWarningNotification,
} from "lib/helper";

import { AttendanceFormAktivitasService } from "apis/attendance";
import { AgentService } from "apis/user";

import Layout from "../../../../../components/layout-dashboard-management";
import st from "../../../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

function GuestUpdate({
  initProps,
  dataProfile,
  dataDetailRequester,
  sidemenu,
  userid,
}) {
  /**
   * Dependencies
   */
  const { hasPermission, isPending: isAccessControlPending } =
    useAccessControl();
  if (isAccessControlPending) {
    return null;
  }
  const isAllowedToGetRolesList = hasPermission(ROLES_GET);
  const isAllowedToGetGuestDetail = hasPermission(GUEST_GET);
  const isAllowedToUpdateGuest = hasPermission(GUEST_UPDATE);

  const axiosClient = useAxiosClient();
  const rt = useRouter();

  const tok = initProps;
  const [instanceForm] = Form.useForm();
  const { Option } = Select;

  //loading upload image
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  //data payload
  const [dataUpdate, setDataUpdate] = useState({
    id: Number(userid),
    fullname: "",
    email: "",
    profile_image: `/default-users.jpeg`,
    profile_image_file: null, // File | null (hanya digunakan sebagai payload)
    role_ids: [],
  });

  //data default roles
  const [defaultRoles, setDefaultRoles] = useState(0);
  //data breadcrumb
  const [patharr, setpatharr] = useState([]);
  //loading pre render
  const [preloading, setpreloading] = useState(true);
  //loading update button
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  //data roles
  const [dataRoles, setdDataRoles] = useState({ data: [] });

  const onChangeRole = (value) => {
    setDataUpdate({
      ...dataUpdate,
      role_ids: value,
    });
  };
  const onChangeEditGuest = (e) => {
    setDataUpdate({
      ...dataUpdate,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeEditPhoto = async (e) => {
    setLoadingPhoto(true);
    const blobFile = e.target.files[0];
    const base64Data = await getBase64(blobFile);

    setDataUpdate({
      ...dataUpdate,
      profile_image: base64Data,
      profile_image_file: blobFile,
    });
    setLoadingPhoto(false);
  };
  const handleSubmitEditAccount = () => {
    if (!isAllowedToUpdateGuest) {
      permissionWarningNotification("Mengubah", "Guest");
      return;
    }
    setLoadingUpdate(true);

    const updatePayload = {
      ...dataUpdate,
      profile_image: dataUpdate.profile_image_file,
    };
    if ("profile_image_file" in updatePayload) {
      delete updatePayload["profile_image_file"];
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateGuestDetail`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(initProps),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePayload),
    })
      .then((response) => response.json())
      .then((response2) => {
        if (response2.success) {
          notification.success({
            message: response2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.back();
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
        setLoadingUpdate(false);
      });
  };

  //useEffect
  useEffect(() => {
    if (!isAllowedToGetGuestDetail) {
      permissionWarningNotification("Mendapatkan", "Detail Guest");
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getGuestDetail?account_id=${userid}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        var temp = {
          id: res2.data.id,
          fullname: res2.data.name,
          role: res2.data.role,
          profile_image: generateStaticAssetUrl(res2.data.profile_image?.link),
          // profile_image:
          //   res2.data.profile_image === "" || res2.data.profile_image === "-"
          //     ? `/default-users.jpeg`
          //     : res2.data.profile_image,
          email: res2.data.email,
          role_ids: res2.data.roles.map((docmap) => docmap.id),
        };
        setDataUpdate(temp);
        setDefaultRoles(res2.data.roles.map((docmap) => docmap.id));
        var pathArr = rt.pathname.split("/").slice(1);
        pathArr.splice(3, 1);
        pathArr[pathArr.length - 1] = `Ubah Profil Guest - ` + res2.data.name;
        setpatharr(pathArr);
        setpreloading(false);
      });
  }, [isAllowedToGetGuestDetail]);

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
          setdDataRoles(res2);
        });
      return;
    }
  }, [isAllowedToGetRolesList]);

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      pathArr={patharr}
      sidemenu={sidemenu}
      dataDetailAccount={dataUpdate}
      st={st}
    >
      <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 md:col-span-4">
          <Sticky containerSelectorFocus="#formAgentsWrapper">
            <div className="flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white mb-8">
              <h1 className="font-semibold py-2">Ubah Profil Guest</h1>
              <div className="flex space-x-2">
                <Button
                  disabled={preloading}
                  onClick={() => {
                    rt.back();
                  }}
                  type="default"
                >
                  Batal
                </Button>
                {
                  <Button
                    disabled={preloading || !isAllowedToUpdateGuest}
                    type="primary"
                    loading={loadingUpdate}
                    onClick={instanceForm.submit}
                  >
                    Simpan
                  </Button>
                }
              </div>
            </div>
          </Sticky>
        </div>
        <div
          className=" col-span-1 md:col-span-3 flex flex-col"
          id="formAgentsWrapper"
        >
          <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-5">
            <div className="border-b border-black p-4 font-semibold mb-5 flex">
              <div className=" mr-3 md:mr-5 pt-1">
                Ubah Profil Guest - {dataUpdate.fullname}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="p-3 col-span-1 md:col-span-1 flex flex-col items-center">
                <img
                  src={dataUpdate.profile_image}
                  alt="imageProfile"
                  className=" object-cover w-32 h-32 rounded-full mb-4"
                />
                {
                  <label
                    className="custom-file-upload py-2 px-2 inline-block cursor-pointer text-sm text-black border rounded-sm bg-white hover:border-blue-500 hover:text-blue-500 mb-3"
                    onClick={(e) => {
                      if (!isAllowedToUpdateGuest) {
                        permissionWarningNotification(
                          "Memperbarui",
                          "Detail Guest"
                        );
                        e.stopPropagation();
                        return;
                      }
                    }}
                  >
                    <AccessControl hasPermission={GUEST_UPDATE}>
                      <input
                        type="file"
                        style={{ display: `none` }}
                        name="profile_image"
                        onChange={onChangeEditPhoto}
                      />
                    </AccessControl>
                    {loadingPhoto ? (
                      <LoadingOutlined />
                    ) : (
                      <EditOutlined style={{ fontSize: `1.2rem` }} />
                    )}
                    Ganti Foto
                  </label>
                }
              </div>
              {preloading ? null : (
                <div className="p-3 col-span-1 md:col-span-3">
                  <Form
                    layout="vertical"
                    initialValues={dataUpdate}
                    form={instanceForm}
                    onFinish={handleSubmitEditAccount}
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
                      {
                        <Input
                          defaultValue={dataUpdate.fullname}
                          onChange={onChangeEditGuest}
                          name="fullname"
                        />
                      }
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
                        disabled
                        value={dataUpdate.email}
                        name={`email`}
                        onChange={onChangeEditGuest}
                      />
                    </Form.Item>

                    <h1 className="text-sm">Role:</h1>
                    {
                      <Select
                        mode="multiple"
                        disabled={!isAllowedToGetRolesList}
                        placeholder="Pilih Role"
                        onChange={(value) => {
                          onChangeRole(value);
                        }}
                        defaultValue={defaultRoles}
                        style={{ width: `100%` }}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      >
                        {dataRoles.data.map((doc, idx) => {
                          return (
                            <Option key={idx} value={doc.id}>
                              {doc.name}
                            </Option>
                          );
                        })}
                      </Select>
                    }
                  </Form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res, resolvedUrl, params }) {
  const userid = params.userId;
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

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "64",
      userid,
    },
  };
}

export default GuestUpdate;
