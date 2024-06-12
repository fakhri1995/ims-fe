import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Result, message } from "antd";
import { Form, notification } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

import AuthScreen from "../../components/screen/login/AuthScreen";
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
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mailForgetPassword`, {
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
    <AuthScreen>
      {success ? (
        <Result
          status="success"
          subTitle="Silahkan cek email Anda untuk reset kata sandi"
          title="Berhasil"
        />
      ) : (
        <>
          <h1 className="mb-5 text-xl font-semibold text-mono30">
            Lupa Kata Sandi
          </h1>
          <Form
            layout="vertical"
            className="loginForm"
            requiredMark={false}
            onFinish={handleForgetPassword}
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
              style={{ marginBottom: `2rem` }}
            >
              <Input
                // prefix={<UserOutlined className="site-form-item-icon" />}
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
                className="login-form-button font-semibold"
                style={{ width: `100%` }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
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
