import { Button, Form, Input, notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Sticky from "wil-react-sticky";

import { useAccessControl } from "contexts/access-control";

import { AGENT_PASSWORD_UPDATE } from "lib/features";

import Layout from "../../../../../components/layout-dashboard-management";
import st from "../../../../../components/layout-dashboard-management.module.css";
import httpcookie from "cookie";

function AgentPassword({ initProps, dataProfile, sidemenu, userid }) {
  /**
   * Dependencies
   */
  const rt = useRouter();
  const { hasPermission } = useAccessControl();
  const isAllowedToUpdatePassword = hasPermission(AGENT_PASSWORD_UPDATE);

  const { name } = rt.query;
  const tok = initProps;
  var pathArr = rt.pathname.split("/").slice(1);
  pathArr.splice(2, 1);
  pathArr[pathArr.length - 1] = `Ubah Password Agent - ${name}`;
  const [instanceForm] = Form.useForm();

  //useState
  //data payload
  const [datapass, setdatapass] = useState({
    id: Number(userid),
    new_password: "",
  });
  //loading ubah password button
  const [loadingubahpass, setloadingubahpass] = useState(false);
  //data password confirm
  const [konfirmpass, setkonfirmpass] = useState("");
  //loading pra render
  const [praloading, setpraloading] = useState(false);

  //handlePasswordUbahButton
  const handleUbahPassword = () => {
    if (datapass.new_password !== konfirmpass) {
      notification["error"]({
        message: "Konfirmasi password tidak sama dengan password",
        duration: 2,
      });
    } else {
      setloadingubahpass(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/changeAgentPassword`, {
        method: "PUT",
        headers: {
          Authorization: JSON.parse(tok),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datapass),
      })
        .then((res) => res.json())
        .then((res2) => {
          setloadingubahpass(false);
          if (res2.success) {
            notification["success"]({
              message: res2.message,
              duration: 3,
            });
            setTimeout(() => {
              rt.push(`/admin/agents/detail/${userid}`);
            }, 500);
          } else if (!res2.success) {
            notification["error"]({
              message: res2.message,
              duration: 3,
            });
          }
        });
    }
  };

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
              <h1 className="font-semibold py-2">Ubah Password Agent</h1>
              <div className="flex space-x-2">
                <Link href={`/admin/agents/detail/${userid}`} legacyBehavior>
                  <Button disabled={praloading} type="default">
                    Batal
                  </Button>
                </Link>
                <Button
                  disabled={praloading || !isAllowedToUpdatePassword}
                  loading={loadingubahpass}
                  onClick={instanceForm.submit}
                  type="primary"
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
              Akun Agent - {name}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="p-3 col-span-1 md:col-span-3">
                <Form
                  layout="vertical"
                  className="createAgentsForm"
                  onFinish={handleUbahPassword}
                  form={instanceForm}
                >
                  <Form.Item
                    label="Password Baru"
                    name="new_password"
                    rules={[
                      {
                        required: true,
                        message: "Password baru wajib diisi",
                      },
                      {
                        pattern: /([A-z0-9]{8})/,
                        message: "Password minimal 8 karakter",
                      },
                    ]}
                  >
                    <Input.Password
                      name={`new_password`}
                      onChange={(e) => {
                        setdatapass({
                          ...datapass,
                          new_password: e.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Konfirmasi Password Baru"
                    name="konfirmpass"
                    rules={[
                      {
                        required: true,
                        message: "Konfirmasi Password baru wajib diisi",
                      },
                      {
                        pattern: /([A-z0-9]{8})/,
                        message: "Password minimal 8 karakter",
                      },
                    ]}
                  >
                    <Input.Password
                      name={`konfirmpass`}
                      onChange={(e) => {
                        setkonfirmpass(e.target.value);
                      }}
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

export async function getServerSideProps({ req, res, params }) {
  const userid = params.userId;
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

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "61",
      userid,
    },
  };
}

export default AgentPassword;
