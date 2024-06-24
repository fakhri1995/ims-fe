import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { Form, notification } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";

import BrandLogo from "../../components/BrandLogo";
import { CopyrightIconSvg } from "../../components/icon";
import AuthScreen from "../../components/screen/login/AuthScreen";
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
            message: "Selamat datang di MIGhty",
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
    <AuthScreen>
      <div className="pb-8">
        <BrandLogo />
      </div>
      <Form
        name="email"
        layout="vertical"
        className="loginForm"
        requiredMark={false}
        initialValues={{ remember: true }}
        onFinish={handleLogin}
      >
        <Form.Item
          label="Email"
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
            // prefix={<UserOutlined className="site-form-item-icon" />}
            name="email"
            value={formdata}
            placeholder="Email"
            onChange={onChangeLogin}
          />
        </Form.Item>
        <Form.Item
          label="Kata Sandi"
          name="password"
          rules={[
            {
              required: true,
              message: "Kata Sandi wajib diisi",
            },
          ]}
          style={{ marginBottom: `2rem` }}
        >
          <Input.Password
            // prefix={<LockOutlined className="site-form-item-icon" />}
            name="password"
            value={formdata}
            placeholder="Kata Sandi"
            type="password"
            onChange={onChangeLogin}
          />
        </Form.Item>
        <Form.Item style={{ justifyContent: `center` }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loadinglogin}
            className="login-form-button font-semibold"
            style={{ width: `100%` }}
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
    </AuthScreen>
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
