import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Result, message } from "antd";
import { Form, notification } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

import httpcookie from "cookie";

export default function RequestForgetPassword({ initProps }) {
  const rt = useRouter();
  const { token } = rt.query;
  const [formdata, setFormdata] = useState({
    email: "",
  });
  const [success, setsuccess] = useState(false);
  const [loadingforgetpass, setloadingforgetpass] = useState(false);
  const onChangeForgetPassword = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  const handleForgetPassword = () => {
    setloadingforgetpass(true);
    fetch(`https://boiling-thicket-46501.herokuapp.com/mailForgetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingforgetpass(false);
        if (res2.success) {
          setsuccess(true);
          notification["success"]({
            message: res2.data,
            duration: 3,
          });
          // rt.push('/login')
        } else if (!res2.success) {
          message.error(
            {
              content: res2.data,
              style: {
                marginTop: `1rem`,
              },
            },
            5
          );
        }
      });
  };
  return (
    <>
      <div
        className="container-xl bg-blue-600 h-screen" /*style={{background:`linear-gradient(#035ea3, #198e07)`}}*/
      >
        <div className="pt-20 relative" id="wrapper">
          <div className=" mx-auto bg-white rounded-lg w-10/12 md:w-5/12 max-h-80 md:max-h-80 text-black shadow-lg px-3 md:px-5 pt-10 pb-1 text-center">
            {success ? (
              <Result
                status="success"
                subTitle="Silahkan cek Email anda untuk verifikasi akun"
                title="Berhasil"
              />
            ) : (
              <>
                <h1 className="mb-5 font-mont text-xl font-semibold">
                  Lupa Password
                </h1>
                <Form className="loginForm" onFinish={handleForgetPassword}>
                  <Form.Item
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
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      name="email"
                      value={formdata}
                      placeholder="Email"
                      onChange={onChangeForgetPassword}
                    />
                  </Form.Item>
                  <Form.Item style={{ justifyContent: `center` }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loadingforgetpass}
                      className="login-form-button mb-5"
                      style={{ width: `100%` }}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const initProps = {};
  if (req && req.headers) {
    if (req.headers.cookie) {
      const cookies = req.headers.cookie;
      const cookiesJSON1 = httpcookie.parse(cookies);
      if (cookiesJSON1.token) {
        return {
          redirect: {
            permanent: false,
            destination: "/dashboard/home",
          },
        };
      }
    }
  }
  return {
    props: {
      initProps,
    },
  };
}
