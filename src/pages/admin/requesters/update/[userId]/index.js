import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, TreeSelect, notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sticky from "wil-react-sticky";

import { AccessControl } from "components/features/AccessControl";

import { useAccessControl } from "contexts/access-control";

import { useAxiosClient } from "hooks/use-axios-client";

import {
  COMPANY_LOCATIONS_GET,
  REQUESTER_GET,
  REQUESTER_UPDATE,
  ROLES_GET,
} from "lib/features";
import {
  generateStaticAssetUrl,
  getBase64,
  permissionWarningNotification,
} from "lib/helper";

import { RequesterService } from "apis/user";

import Layout from "../../../../../components/layout-dashboard";
import st from "../../../../../components/layout-dashboard.module.css";
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

function RequestersUpdate({
  initProps,
  dataProfile,
  dataDetailRequester,
  dataRoles,
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
  const isAllowedToGetRequesterDetail = hasPermission(REQUESTER_GET);
  const isAllowedToUpdateRequester = hasPermission(REQUESTER_UPDATE);
  const isAllowedToGetLocations = hasPermission(COMPANY_LOCATIONS_GET);

  const axiosClient = useAxiosClient();
  const rt = useRouter();

  const tok = initProps;
  // var pathArr = rt.pathname.split("/").slice(1)
  // pathArr[pathArr.length - 1] = dataDetailRequester.data.fullname
  const [instanceForm] = Form.useForm();
  const { Option } = Select;

  const [loadingfoto, setLoadingfoto] = useState(false);
  // const [data1, setData1] = useState({
  //     id: dataDetailRequester.data.user_id,
  //     fullname: dataDetailRequester.data.fullname,
  //     role: dataDetailRequester.data.role,
  //     phone_number: dataDetailRequester.data.phone_number,
  //     profile_image: dataDetailRequester.data.profile_image === "" ? `/default-users.jpeg` : dataDetailRequester.data.profile_image
  // })
  const [data1, setData1] = useState({
    id: "",
    fullname: "",
    role: "",
    phone_number: "",
    profile_image: `/default-users.jpeg`,
    profile_image_file: null, // File | null
    company_id: 0,
    email: "",
    role_ids: [],
    position: "",
  });
  const [idrole, setidrole] = useState(0);
  const [patharr, setpatharr] = useState([]);
  const [preloading, setpreloading] = useState(true);
  const [datacompanylist, setdatacompanylist] = useState([]);
  const [companyid, setcompanyid] = useState(0);
  // const [datarole, setdatarole] = useState({
  //     account_id: dataDetailRequester.data.user_id,
  //     role_ids: [dataDetailRequester.data.feature_roles[0]]
  // })
  const [datarole, setdatarole] = useState({
    account_id: Number(data1.id),
    role_ids: [],
  });
  // const [datapass, setDatapass] = useState({
  //   user_id: data1.id,
  //   new_password: "",
  // });
  const [loadingupdate, setLoadingupdate] = useState(false);
  const [dataraw1, setdataraw1] = useState({ data: [] });

  const onChangeRole = (value) => {
    // const arr = []
    // arr.push(value)
    // setdatarole({
    //     ...datarole,
    //     role_ids: arr
    // })
    setData1({ ...data1, role_ids: value });
  };
  const onChangeEditAgents = (e) => {
    setData1({
      ...data1,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeEditFoto = async (e) => {
    setLoadingfoto(true);
    const blobFile = e.target.files[0];
    const base64Data = await getBase64(blobFile);

    setData1({
      ...data1,
      profile_image: base64Data,
      profile_image_file: blobFile,
    });

    setLoadingfoto(false);
  };

  const handleSubmitEditAccount = () => {
    setLoadingupdate(true);

    const updatePayload = { ...data1, profile_image: data1.profile_image_file };
    if ("profile_image_file" in updatePayload) {
      delete updatePayload["profile_image_file"];
    }

    RequesterService.update(axiosClient, updatePayload)
      .then((response) => {
        const res2 = response.data;

        setLoadingupdate(false);
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(`/admin/requesters/detail/${data1.id}`);
          }, 300);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message.errorInfo.status_detail,
            duration: 3,
          });
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Terjadi kesalahan saat memperbarui profil",
          duration: 3,
        });
      });
  };

  // const handleActivationRequesters = (status) => {
  //   var keaktifan = false;
  //   if (status === "aktif") {
  //     keaktifan = false;
  //     setloadingubahaktif(true);
  //   } else if (status === "nonAktif") {
  //     keaktifan = true;
  //     setloadingubahnonaktif(true);
  //   }
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/requesterActivation`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: JSON.parse(tok),
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       user_id: data1.id,
  //       is_enabled: keaktifan,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res2) => {
  //       if (res2.success) {
  //         setVisible(false);
  //         setVisiblenon(false);
  //         notification["success"]({
  //           message: res2.message,
  //           duration: 3,
  //         });
  //         setTimeout(() => {
  //           if (status === "aktif") {
  //             setloadingubahaktif(false);
  //           } else if (status === "nonAktif") {
  //             setloadingubahnonaktif(false);
  //           }
  //           rt.push(`/admin/requesters/${data1.id}`);
  //         }, 500);
  //       } else if (!res2.success) {
  //         setVisible(false);
  //         setVisiblenon(false);
  //         notification["error"]({
  //           message: res2.message.errorInfo.status_detail,
  //           duration: 3,
  //         });
  //       }
  //     });
  // };
  // const handleUbahPassword = () => {
  //   setloadingubahpass(true);
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/changeRequesterPassword`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: JSON.parse(tok),
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(datapass),
  //   })
  //     .then((res) => res.json())
  //     .then((res2) => {
  //       if (res2.success) {
  //         setVisibleubahpass(false);
  //         notification["success"]({
  //           message: res2.message,
  //           duration: 3,
  //         });
  //         setTimeout(() => {
  //           setloadingubahpass(false);
  //           rt.push(`/admin/requesters/${data1.id}`);
  //         }, 500);
  //       } else if (!res2.success) {
  //         setVisibleubahpass(false);
  //         notification["error"]({
  //           message: res2.message.errorInfo.status_detail,
  //           duration: 3,
  //         });
  //       }
  //     });
  // };

  //useEffect
  useEffect(() => {
    if (!isAllowedToGetRequesterDetail) {
      permissionWarningNotification("Mendapatkan", "Detail Requester");
      setpreloading(false);
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getRequesterDetail?account_id=${userid}`,
      {
        method: `GET`,
        headers: {
          Authorization: JSON.parse(initProps),
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //     account_id: userid
        // })
      }
    )
      .then((res) => res.json())
      .then((res2) => {
        var temp = {
          id: res2.data.id,
          fullname: res2.data.name,
          role: res2.data.role,
          phone_number: res2.data.phone_number,
          profile_image: generateStaticAssetUrl(res2.data.profile_image?.link),
          // profile_image:
          //   res2.data.profile_image === "" || res2.data.profile_image === "-"
          //     ? `/default-users.jpeg`
          //     : res2.data.profile_image,
          company_id: res2.data.company_id,
          email: res2.data.email,
          role_ids: res2.data.roles.map((docmap) => docmap.id),
          position: res2.data.position,
        };
        setData1(temp);
        setdatarole({ ...datarole, account_id: res2.data.id });
        setidrole(res2.data.roles.map((docmap) => docmap.id));
        var pathArr = rt.pathname.split("/").slice(1);
        pathArr.splice(3, 1);
        pathArr[pathArr.length - 1] =
          `Ubah Profil Requester - ` + res2.data.name;
        setpatharr(pathArr);
        setcompanyid(res2.data.company.id);
      })
      .then(() => {
        if (isAllowedToGetRolesList) {
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRoles`, {
            method: `GET`,
            headers: {
              Authorization: JSON.parse(initProps),
            },
          })
            .then((res) => res.json())
            .then((res2) => {
              setdataraw1(res2);
              setpreloading(false);
            });
          return;
        }

        setpreloading(false);
      });
  }, [isAllowedToGetRolesList, isAllowedToGetRequesterDetail]);

  useEffect(() => {
    if (!isAllowedToGetLocations) {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getLocations`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdatacompanylist(res2.data.children);
      });
  }, [isAllowedToGetLocations]);

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      pathArr={patharr}
      sidemenu={sidemenu}
      dataDetailAccount={data1}
      st={st}
    >
      <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 md:col-span-4">
          <Sticky containerSelectorFocus="#formAgentsWrapper">
            <div className="flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white mb-8">
              <h1 className="font-semibold py-2">Ubah Profil Requester</h1>
              <div className="flex space-x-2">
                <Link href={`/admin/requesters/detail/${data1.id}`}>
                  <Button disabled={preloading} type="default">
                    Batal
                  </Button>
                </Link>
                {
                  // [116, 133].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                  <Button
                    disabled={preloading || !isAllowedToUpdateRequester}
                    type="primary"
                    loading={loadingupdate}
                    onClick={instanceForm.submit}
                  >
                    Simpan
                  </Button>
                }
              </div>
            </div>
          </Sticky>
        </div>
        <AccessControl hasPermission={REQUESTER_UPDATE}>
          <div
            className=" col-span-1 md:col-span-3 flex flex-col"
            id="formAgentsWrapper"
          >
            <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-5">
              <div className="border-b border-black p-4 font-semibold mb-5 flex">
                <div className=" mr-3 md:mr-5 pt-1">
                  Ubah Profil Requester - {data1.fullname}
                </div>
                {/* {
                                [114].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                                    <div className="pt-1">
                                        {
                                            dataDetailRequester.data.attribute.is_enabled ?
                                                <Switch checked={true} onChange={() => { setVisible(true) }} checkedChildren={"AKTIF"}></Switch>
                                                :
                                                <Switch checked={false} onChange={() => { setVisiblenon(true) }} unCheckedChildren={"NON-AKTIF"}></Switch>
                                        }
                                    </div>
                                    :
                                    <div className="pt-1">
                                        {
                                            dataDetailRequester.data.attribute.is_enabled ?
                                                <Switch disabled checked={true} onChange={() => { setVisible(true) }} checkedChildren={"AKTIF"}></Switch>
                                                :
                                                <Switch disabled checked={false} onChange={() => { setVisiblenon(true) }} unCheckedChildren={"NON-AKTIF"}></Switch>
                                        }
                                    </div>
                            } */}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="p-3 col-span-1 md:col-span-1 flex flex-col items-center">
                  <img
                    src={data1.profile_image}
                    alt="imageProfile"
                    className=" object-cover w-32 h-32 rounded-full mb-4"
                  />
                  {
                    // [116].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                    <label className="custom-file-upload py-2 px-2 inline-block cursor-pointer text-sm text-black border rounded-sm bg-white hover:border-blue-500 hover:text-blue-500 mb-3">
                      <input
                        type="file"
                        style={{ display: `none` }}
                        name="profile_image"
                        onChange={onChangeEditFoto}
                      />
                      {loadingfoto ? (
                        <LoadingOutlined />
                      ) : (
                        <EditOutlined style={{ fontSize: `1.2rem` }} />
                      )}
                      Ganti Foto
                    </label>
                  }
                  {/* {
                                    [115].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                    <div className="w-full h-auto">
                                        <button className="w-full h-auto py-2 text-center bg-primary hover:bg-secondary text-white rounded-sm" onClick={() => { setVisibleubahpass(true) }}>
                                            Ubah Password
                                        </button>
                                    </div >
                                } */}
                </div>
                {preloading ? null : (
                  <div className="p-3 col-span-1 md:col-span-3">
                    <Form
                      layout="vertical"
                      initialValues={data1}
                      form={instanceForm}
                      onFinish={handleSubmitEditAccount}
                    >
                      <Form.Item
                        label="Asal Lokasi"
                        name="company_id"
                        rules={[
                          {
                            required: true,
                            message: "Asal lokasi wajib diisi",
                          },
                        ]}
                      >
                        <TreeSelect
                          allowClear
                          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                          treeData={datacompanylist}
                          placeholder="Pilih Asal Lokasi"
                          treeDefaultExpandAll
                          defaultValue={companyid}
                          disabled
                        />
                      </Form.Item>
                      <Form.Item
                        label="Nama Lengkap"
                        required
                        tooltip="Wajib diisi"
                        name="fullname"
                        rules={[
                          {
                            required: true,
                            message: "Nama Lengkap wajib diisi",
                          },
                        ]}
                      >
                        {
                          // [116].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                          <Input
                            defaultValue={data1.fullname}
                            onChange={onChangeEditAgents}
                            name="fullname"
                          />
                          // :
                          // <div className="col-span-1 flex flex-col mb-5">
                          //     <h1 className="font-semibold text-sm">Nama Lengkap:</h1>
                          //     <h1 className="text-sm font-normal text-black">{data1.fullname}</h1>
                          // </div>
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
                          value={data1.email}
                          name={`email`}
                          onChange={onChangeEditAgents}
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
                          value={data1.position}
                          name={`position`}
                          onChange={onChangeEditAgents}
                        />
                      </Form.Item>
                      <Form.Item
                        label="No. Handphone"
                        required
                        tooltip="Wajib diisi"
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
                        {
                          // [116].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                          <Input
                            defaultValue={data1.phone_number}
                            onChange={onChangeEditAgents}
                            name="phone_number"
                          />
                          // :
                          // <div className="col-span-1 flex flex-col mb-5">
                          //     <h1 className="font-semibold text-sm">Nomor Telepon:</h1>
                          //     <h1 className="text-sm font-normal text-black">{data1.phone_number}</h1>
                          // </div>
                        }
                      </Form.Item>
                      <h1 className="font-semibold">Role:</h1>
                      {
                        // [133].every((curr) => dataProfile.data.registered_feature.includes(curr)) ?
                        <Select
                          mode="multiple"
                          disabled={!isAllowedToGetRolesList}
                          onChange={(value) => {
                            onChangeRole(value);
                          }}
                          defaultValue={
                            isAllowedToGetRolesList ? idrole : undefined
                          }
                          style={{ width: `100%` }}
                        >
                          {dataraw1.data.map((doc, idx) => {
                            return (
                              <Option key={idx} value={doc.id}>
                                {doc.name}
                              </Option>
                            );
                          })}
                        </Select>
                        // :
                        // <Select disabled onChange={(value) => { onChangeRole(value) }} defaultValue={idrole} style={{ width: `100%` }}>
                        //     {
                        //         dataraw1.data.map((doc, idx) => {
                        //             return (
                        //                 <Option key={idx} value={doc.id}>{doc.name}</Option>
                        //             )
                        //         })
                        //     }
                        // </Select>
                      }
                      {/* <Form.Item label="Role" required tooltip="Wajib diisi" name="role" initialValue={data1.role}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Role harus diisi',
                                            },
                                        ]}>
                                        <input type="number" defaultValue={data1.role} name={'role'} onChange={onChangeEditAgents} />
                                    </Form.Item> */}
                    </Form>
                  </div>
                )}
              </div>
            </div>
            {/* <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-14">
                        <div className="border-b border-black p-4 font-semibold mb-5">
                            Detail Perusahaan
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="p-3 col-span-1 md:col-span-1">
                                <img src={dataDetailAccount.data.data.company.image_logo} alt="imageProfile" className=" object-cover w-32 h-32 rounded-full" />
                            </div>
                            <div className="col-span-1 md:col-span-3 p-3 space-y-4">
                                <div>
                                    <h1 className="font-semibold text-sm">ID Perusahaan:</h1>
                                    <h1 className="font-normal text-sm">{dataDetailAccount.data.data.company.company_id}</h1>
                                </div>
                                <div>
                                    <h1 className="font-semibold text-sm">Nama Perusahaan:</h1>
                                    <h1 className="font-normal text-sm">{dataDetailAccount.data.data.company.company_name}</h1>
                                </div>
                            </div>
                        </div>
                    </div> */}
            {/* <div className="w-full p-3 md:p-5 h-auto">
                        {
                            dataDetailAccount.data.data.attribute.is_enabled ?
                                <button className=" w-full h-auto py-2 text-center bg-red-600 text-white hover:bg-red-800 rounded-md" onClick={() => { setVisible(true) }}>
                                    Non Aktifkan Akun
                                </button>
                                :
                                <button className=" w-full h-auto py-2 text-center bg-blue-600 text-white hover:bg-blue-800 rounded-md" onClick={() => { setVisiblenon(true) }}>
                                    Aktifkan Akun
                                </button>
                        }
                    </div > */}
            {/* <Modal
                        title="Konfirmasi untuk menon-aktifkan akun"
                        visible={visible}
                        onOk={() => { handleActivationRequesters("aktif") }}
                        onCancel={() => setVisible(false)}
                        okButtonProps={{ disabled: loadingubahaktif }}
                    >
                        Apakah anda yakin ingin menon-aktifkan akun agent <strong>{dataDetailRequester.data.fullname}</strong>?
                    </Modal>
                    <Modal
                        title="Konfirmasi untuk mengakaktifkan akun"
                        visible={visiblenon}
                        onOk={() => { handleActivationRequesters("nonAktif") }}
                        onCancel={() => setVisiblenon(false)}
                        okButtonProps={{ disabled: loadingubahnonaktif }}
                    >
                        Apakah anda yakin ingin melakukan aktivasi akun agent <strong>{dataDetailRequester.data.fullname}</strong>?`
                    </Modal>
                    <Modal
                        title="Ubah Password"
                        visible={visibleubahpass}
                        onOk={handleUbahPassword}
                        onCancel={() => setVisibleubahpass(false)}
                        destroyOnClose={true}
                        okButtonProps={{ disabled: loadingubahpass }}
                    >
                        <Input.Password name="new_password" value={datapass.new_password} placeholder="Password Baru" type="password" onChange={(e) => { setDatapass({ ...datapass, [e.target.name]: e.target.value }) }} style={{ marginBottom: `2rem` }} />
                    </Modal> */}
          </div>
        </AccessControl>
        {/* <div className="col-span-1 md:col-span-1 hidden md:flex flex-col space-y-4 p-4">
                    <div className="font-semibold text-base">Requesters</div>
                    <p className="font-normal text-sm">
                        This page lets you handpick a set of requesters and add them to your help desk. These requesters will have selective privileges to submit requests to your helpdesk. You can restrict access such that only people who have been added here are allowed to login to your self-service portal and access your knowledge base. <br /> <br />
                        You can fill in the details of each of your new requesters manually or import a list of users from a CSV file. Once you have populated your list, your agents can open up each of your requesters and view their ticket history and contact information.
                    </p>
                </div> */}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res, resolvedUrl, params }) {
  // const userid = resolvedUrl.split("/").slice(1)[2]
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

  // if (!([114, 115, 116, 118, 133].every((curr) => dataProfile.data.registered_feature.includes(curr)))) {
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  // const resourcesDA = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRequesterDetail`, {
  //     method: `POST`,
  //     headers: {
  //         'Authorization': JSON.parse(initProps),
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //         account_id: userid
  //     })
  // })
  // const resjsonDA = await resourcesDA.json()
  // if (!resjsonDA) {
  //     res.writeHead(302, { Location: '/admin/requesters' })
  //     res.end()
  // }
  // const dataDetailRequester = resjsonDA

  // const resourcesRoles = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRoles`, {
  //     method: `GET`,
  //     headers: {
  //         'Authorization': JSON.parse(initProps)
  //     }
  // })
  // const resjsonRoles = await resourcesRoles.json()
  // const dataRoles = resjsonRoles

  return {
    props: {
      initProps,
      // dataDetailRequester,
      dataProfile,
      // dataRoles,
      sidemenu: "62",
      userid,
    },
  };
}

export default RequestersUpdate;
