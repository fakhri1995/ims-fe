import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { Form, notification } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";

import MigsysLogo from "../../components/MigsysLogo";
import { CopyrightIconSvg } from "../../components/icon";
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
        className=" h-screen flex flex-col-reverse md:flex-row" /*style={{background:`linear-gradient(#035ea3, #198e07)`}}*/
      >
        {/* Left Side */}
        <div
          className="relative h-full md:w-1/2 bg-[#F4F6F9] flex flex-col justify-center items-center"
          id="wrapper"
        >
          <div className="bg-white rounded-lg w-10/12 md:w-8/12 text-black shadow-lg p-9 text-center">
            <div className="pb-8">
              <MigsysLogo />
            </div>
            <Form
              name="email"
              layout="vertical"
              className="loginForm"
              initialValues={{ remember: true }}
              onFinish={handleLogin}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Email belum terisi",
                  },
                  {
                    pattern:
                      /(\-)|(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,
                    message: "Email belum diisi dengan benar",
                  },
                ]}
              >
                <Input
                  // prefix={<UserOutlined className="site-form-item-icon" />}
                  name="email"
                  value={formdata}
                  placeholder="Masukkan Email..."
                  onChange={onChangeLogin}
                />
              </Form.Item>
              <Form.Item
                label="Kata Sandi"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Kata Sandi belum terisi",
                  },
                ]}
                style={{ marginBottom: `2rem` }}
              >
                <Input.Password
                  // prefix={<LockOutlined className="site-form-item-icon" />}
                  name="password"
                  value={formdata}
                  placeholder="Masukkan Kata Sandi..."
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
                  size="large"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div className=" flex justify-center items-center">
              <p
                className=" mb-5 text-secondary100 hover:text-secondary cursor-pointer"
                onClick={() => {
                  rt.push(`/requestForgetPassword`);
                }}
              >
                Lupa Kata Sandi
              </p>
            </div>
          </div>
          <div className="absolute bottom-10 flex items-center gap-2 ">
            <CopyrightIconSvg size={16} />
            <p className="font-medium text-mono50">
              2024 Mitramas Infosys Global
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative h-1/3 md:h-full md:w-1/2">
          <img
            className="w-full h-full object-cover"
            src={`/image/cover.png`}
            alt=""
          ></img>
          <div
            className="absolute top-0 left-0 w-full h-full bg-[#1C3B67CC] 
            flex flex-col items-center justify-center opacity-80 text-white"
          >
            <div className="p-10 md:p-20 ">
              <h1 className="text-3xl text-white font-medium pb-3 mb-4 border-b-2">
                Welcome to <strong>MIG</strong>
              </h1>
              <p>
                Bringing the advantages to you! At MIG, we’re all about doing
                awesome things together and taking on any challenge.
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
