import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, message } from "antd";
import { Form, notification } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

import AuthScreen from "../../components/screen/login/AuthScreen";
import httpcookie from "cookie";

export default function ResetPassword({ initProps }) {
  const rt = useRouter();
  const { token } = rt.query;
  const [formdata, setFormdata] = useState({
    token: token,
    password: "",
    confirm_password: "",
  });
  const [loadingresetpass, setloadingresetpass] = useState(false);
  const onChangeResetPassword = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  const handleResetPassword = () => {
    if (formdata.password !== formdata.confirm_password) {
      notification["error"]({
        message: "Konfirmasi password tidak sama dengan password",
        duration: 2,
      });
    } else {
      setloadingresetpass(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/resetPassword`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      })
        .then((res) => res.json())
        .then((res2) => {
          setloadingresetpass(false);
          if (res2.success) {
            notification["success"]({
              message: "Berhasil Mengubah Kata Sandi",
              duration: 3,
            });
            rt.push("/login");
          } else if (!res2.success) {
            notification["error"]({
              message: res2.data,
              duration: 3,
            });
          }
        })
        .catch((err) =>
          notification["error"]({
            message: "Gagal Mengubah Kata Sandi",
            duration: 3,
          })
        );
    }
  };
  return (
    <AuthScreen>
      <h1 className="mb-5 text-xl font-semibold text-mono30">
        Reset Kata Sandi
      </h1>
      <Form
        layout="vertical"
        className="loginForm"
        onFinish={handleResetPassword}
      >
        <Form.Item
          label="Kata Sandi"
          name="password"
          rules={[
            {
              required: true,
              message: "Kata Sandi Baru wajib diisi",
            },
            {
              pattern: /([A-z0-9]{8})/,
              message: "Kata Sandi minimal 8 karakter",
            },
          ]}
        >
          <Input.Password
            // prefix={<LockOutlined className="site-form-item-icon" />}
            name="password"
            value={formdata}
            placeholder="Kata Sandi Baru"
            type={`password`}
            onChange={onChangeResetPassword}
          />
        </Form.Item>
        <Form.Item
          label="Konfirmasi Kata Sandi"
          name="confirm_password"
          rules={[
            {
              required: true,
              message: "Konfirmasi Kata Sandi wajib diisi",
            },
            {
              pattern: /([A-z0-9]{8})/,
              message: "Kata Sandi minimal 8 karakter",
            },
          ]}
          style={{ marginBottom: `2rem` }}
        >
          <Input.Password
            // prefix={<LockOutlined className="site-form-item-icon" />}
            name="confirm_password"
            value={formdata}
            placeholder="Konfirmasi Kata Sandi Baru"
            type="password"
            onChange={onChangeResetPassword}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loadingresetpass}
          className="login-form-button"
          style={{ width: `100%` }}
        >
          Reset Kata Sandi
        </Button>
      </Form>
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
