import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { Form, notification } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";

import httpcookie from "cookie";

export default function Home({ initProps }) {
  // console.log("token di login abis dari logout: " + jscookie.get('token'))
  const rt = useRouter();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  // const [alerterror, setAlerterror] = useState(false);
  const [loadinglogin, setLoadinglogin] = useState(false);
  const onChangeLogin = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = () => {
    setLoadinglogin(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: new URLSearchParams(formdata)
      body: JSON.stringify(formdata),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.data) {
          notification["success"]({
            message: "Selamat datang di MIGSYS",
            duration: 3,
          });
          // console.log("token: " + res2.data.token)
          /** Token will be expired in 1 day */
          Cookies.set("token", JSON.stringify(res2.data.token), { expires: 1 });
          // console.log("token di session: " + JSON.parse(jscookie.get('token')))
          rt.push("/dashboard/home").then(() => setLoadinglogin(false));
          // rt.push("/dashboard/company").then(() => setLoadinglogin(false));
        } else if (!res2.success) {
          // console.log("masuk ke error login")
          const errorMessage =
            res2.message?.errorInfo?.status_detail ||
            res2.message ||
            "Terjadi kesalahan saat melakukan login.";

          message.error(
            {
              content: errorMessage,
              style: {
                marginTop: `1rem`,
              },
            },
            5
          );
          setLoadinglogin(false);
        }
      })
      .catch(() => {
        message.error({
          content: "Terjadi kesalahan saat melakukan login.",
          style: {
            marginTop: "1rem",
          },
        });

        setLoadinglogin(false);
      });
  };
  return (
    <>
      {/* {
        spin1 ?
          <Spin size="large"> */}
      <div
        className="container-xl bg-blue-600 h-screen" /*style={{background:`linear-gradient(#035ea3, #198e07)`}}*/
      >
        <div className="pt-20 relative" id="wrapper">
          <div className="mx-auto bg-white rounded-lg w-10/12 md:w-5/12 max-h-80 md:max-h-80 text-black shadow-lg px-3 md:px-5 pt-10 pb-1 text-center">
            <h1 className="mb-5 font-mont text-xl font-semibold">
              LogIn MIGSYS v3
            </h1>
            <Form
              name="email"
              className="loginForm"
              initialValues={{ remember: true }}
              onFinish={handleLogin}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  name="email"
                  value={formdata}
                  placeholder="Email"
                  onChange={onChangeLogin}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Password!",
                  },
                ]}
                style={{ marginBottom: `3rem` }}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  name="password"
                  value={formdata}
                  placeholder="Password"
                  type="password"
                  onChange={onChangeLogin}
                />
              </Form.Item>
              <Form.Item style={{ justifyContent: `center` }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loadinglogin}
                  className="login-form-button"
                  style={{ width: `100%` }}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
            <div className=" flex justify-center items-center">
              <p
                className=" mb-5 text-primary hover:text-secondary cursor-pointer"
                onClick={() => {
                  rt.push(`/requestForgetPassword`);
                }}
              >
                Lupa Password
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* </Spin> */}
      {/* } */}
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
            // destination: "/dashboard/company",
            destination: "/dashboard/home",
          },
        };
      }
    }
    // if (typeof cookies === 'string') {
    //   const cookiesJSON = httpcookie.parse(cookies);
    //   initProps.token = cookiesJSON.token;
    // }
  }
  return {
    props: {
      initProps,
    },
  };
}
