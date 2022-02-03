import Layout from "../../../../../components/layout-dashboard";
import st from "../../../../../components/layout-dashboard.module.css";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, TreeSelect, notification } from "antd";
import httpcookie from "cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sticky from "wil-react-sticky";

function AgentUpdate({
  initProps,
  dataProfile,
  dataDetailRequester,
  dataRoles,
  sidemenu,
  userid,
}) {
  const rt = useRouter();
  const tok = initProps;
  const [instanceForm] = Form.useForm();
  const { Option } = Select;

  //loading upload image
  const [loadingfoto, setLoadingfoto] = useState(false);
  //data payload
  const [dataupdate, setdataupdate] = useState({
    id: Number(userid),
    fullname: "",
    phone_number: "",
    profile_image: `/default-users.jpeg`,
    role_ids: [],
    position: "",
  });
  //data asal lokasi
  const [datacompanylist, setdatacompanylist] = useState([]);
  //data default roles
  const [defaultroles, setdefaultroles] = useState(0);
  //data breadcrumb
  const [patharr, setpatharr] = useState([]);
  //loading pre render
  const [preloading, setpreloading] = useState(true);
  //data default asal lokasi
  const [defaultcompany, setdefaultcompany] = useState(0);
  //loading update button
  const [loadingupdate, setLoadingupdate] = useState(false);
  //data roles
  const [dataroles, setdataroles] = useState({ data: [] });

  const onChangeRole = (value) => {
    setdataupdate({
      ...dataupdate,
      role_ids: value,
    });
  };
  const onChangeEditAgents = (e) => {
    setdataupdate({
      ...dataupdate,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeEditFoto = async (e) => {
    setLoadingfoto(true);
    const foto = e.target.files;
    const formdata = new FormData();
    formdata.append("file", foto[0]);
    formdata.append("upload_preset", "migsys");
    const fetching = await fetch(
      `https://api.Cloudinary.com/v1_1/aqlpeduli/image/upload`,
      {
        method: "POST",
        body: formdata,
      }
    );
    const datajson = await fetching.json();
    setdataupdate({
      ...dataupdate,
      profile_image: datajson.secure_url,
    });
    setLoadingfoto(false);
  };
  const handleSubmitEditAccount = () => {
    setLoadingupdate(true);
    fetch(`https://boiling-thicket-46501.herokuapp.com/updateAgentDetail`, {
      method: "PUT",
      headers: {
        Authorization: JSON.parse(tok),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataupdate),
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoadingupdate(false);
        if (res2.success) {
          notification["success"]({
            message: res2.message,
            duration: 3,
          });
          setTimeout(() => {
            rt.push(`/admin/agents/detail/${dataupdate.id}`);
          }, 300);
        } else if (!res2.success) {
          notification["error"]({
            message: res2.message,
            duration: 3,
          });
        }
      });
    // }
  };

  //useEffect
  useEffect(() => {
    fetch(
      `https://boiling-thicket-46501.herokuapp.com/getAgentDetail?account_id=${userid}`,
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
          phone_number: res2.data.phone_number,
          profile_image:
            res2.data.profile_image === "" || res2.data.profile_image === "-"
              ? `/default-users.jpeg`
              : res2.data.profile_image,
          email: res2.data.email,
          role_ids: res2.data.roles.map((docmap) => docmap.id),
          position: res2.data.position,
        };
        setdataupdate(temp);
        setdefaultroles(res2.data.roles.map((docmap) => docmap.id));
        var pathArr = rt.pathname.split("/").slice(1);
        pathArr.splice(3, 1);
        pathArr[pathArr.length - 1] = `Ubah Profil Agent - ` + res2.data.name;
        setpatharr(pathArr);
        setdefaultcompany(res2.data.company_id);
        setpreloading(false);
      });
  }, []);
  useEffect(() => {
    fetch(`https://boiling-thicket-46501.herokuapp.com/getBranchCompanyList`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdatacompanylist([res2.data]);
      });
  }, []);
  useEffect(() => {
    fetch(`https://boiling-thicket-46501.herokuapp.com/getRoles`, {
      method: `GET`,
      headers: {
        Authorization: JSON.parse(initProps),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setdataroles(res2);
      });
  }, []);

  return (
    <Layout
      tok={tok}
      dataProfile={dataProfile}
      pathArr={patharr}
      sidemenu={sidemenu}
      dataDetailAccount={dataupdate}
      st={st}
    >
      <div className="w-full h-auto grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 md:col-span-4">
          <Sticky containerSelectorFocus="#formAgentsWrapper">
            <div className="flex justify-between p-2 pt-4 border-t-2 border-b-2 bg-white mb-8">
              <h1 className="font-semibold py-2">Ubah Profil Agent</h1>
              <div className="flex space-x-2">
                <Button
                  disabled={preloading}
                  onClick={() => {
                    rt.push(`/admin/agents/detail/${userid}`);
                  }}
                  type="default"
                >
                  Batal
                </Button>
                {
                  <Button
                    disabled={preloading}
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
        <div
          className=" col-span-1 md:col-span-3 flex flex-col"
          id="formAgentsWrapper"
        >
          <div className="shadow-lg flex flex-col rounded-md w-full h-auto p-4 mb-5">
            <div className="border-b border-black p-4 font-semibold mb-5 flex">
              <div className=" mr-3 md:mr-5 pt-1">
                Ubah Profil Agent - {dataupdate.fullname}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="p-3 col-span-1 md:col-span-1 flex flex-col items-center">
                <img
                  src={dataupdate.profile_image}
                  alt="imageProfile"
                  className=" object-cover w-32 h-32 rounded-full mb-4"
                />
                {
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
              </div>
              {preloading ? null : (
                <div className="p-3 col-span-1 md:col-span-3">
                  <Form
                    layout="vertical"
                    initialValues={dataupdate}
                    form={instanceForm}
                    onFinish={handleSubmitEditAccount}
                  >
                    <div className="flex flex-col mb-5">
                      <div className="flex mb-2">
                        <span className="asal"></span>
                        <p className="mb-0 ml-1">Asal Lokasi</p>
                        <style jsx>
                          {`
                                                            .asal::before{
                                                                content: '*';
                                                                color: red;
                                                            }
                                                        `}
                        </style>
                      </div>
                      <TreeSelect
                        allowClear
                        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                        treeData={datacompanylist}
                        placeholder="Pilih Asal Lokasi"
                        treeDefaultExpandAll
                        defaultValue={defaultcompany}
                        disabled
                      />
                    </div>
                    {/* </Form.Item> */}
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
                          defaultValue={dataupdate.fullname}
                          onChange={onChangeEditAgents}
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
                        value={dataupdate.email}
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
                        value={dataupdate.position}
                        name={`position`}
                        onChange={onChangeEditAgents}
                      />
                    </Form.Item>
                    <Form.Item
                      label="No. Handphone"
                      required
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
                        <Input
                          defaultValue={dataupdate.phone_number}
                          onChange={onChangeEditAgents}
                          name="phone_number"
                        />
                      }
                    </Form.Item>
                    <h1 className="text-sm">Role:</h1>
                    {
                      <Select
                        mode="multiple"
                        placeholder="Pilih Role"
                        onChange={(value) => {
                          onChangeRole(value);
                        }}
                        defaultValue={defaultroles}
                        style={{ width: `100%` }}
                      >
                        {dataroles.data.map((doc, idx) => {
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
    `https://boiling-thicket-46501.herokuapp.com/detailProfile`,
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
      sidemenu: "61",
      userid,
    },
  };
}

export default AgentUpdate;
