import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, message } from "antd";
import { Form, notification } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

import httpcookie from "cookie";

export default function ChangePassword({ initProps }) {
  const rt = useRouter();
  const { token } = rt.query;
  const [formdata, setFormdata] = useState({
    new_password: "",
  });
  const [konfirmpass, setkonfirmpass] = useState("");
  const [alerterror, setAlerterror] = useState(false);
  const [loadingbuatpass, setloadingbuatpass] = useState(false);
  const onChangeBuatPassword = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  const handleBuatPassword = () => {
    if (formdata.new_password !== konfirmpass) {
      notification["error"]({
        message: "Konfirmasi password tidak sama dengan password",
        duration: 2,
      });
    } else {
      setloadingbuatpass(true);
      fetch(`https://boiling-thicket-46501.herokuapp.com/changePassword`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      })
        .then((res) => res.json())
        .then((res2) => {
          console.log("2");
          setloadingbuatpass(false);
          if (res2.success) {
            notification["success"]({
              message: "Berhasil membuat password baru",
              duration: 3,
            });
            rt.push("/login");
          } else if (!res2.success) {
            message.error(
              {
                content: res2.message,
                style: {
                  marginTop: `1rem`,
                },
              },
              5
            );
            setAlerterror(true);
          }
        });
    }
  };
  return (
    <>
      <div
        className="container-xl bg-blue-600 h-screen" /*style={{background:`linear-gradient(#035ea3, #198e07)`}}*/
      >
        <div className="pt-20 relative" id="wrapper">
          <div className=" mx-auto bg-white rounded-lg w-10/12 md:w-5/12 max-h-80 md:max-h-80 text-black shadow-lg px-3 md:px-5 pt-10 pb-1 text-center">
            <h1 className="mb-5 font-mont text-xl font-semibold">
              Buat Password Baru
            </h1>
            <Form className="loginForm" onFinish={handleBuatPassword}>
              <Form.Item
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
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  name="new_password"
                  value={formdata}
                  placeholder="Password Baru"
                  type={`password`}
                  onChange={onChangeBuatPassword}
                />
              </Form.Item>
              <Form.Item
                name="confirm_new_password"
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
                style={{ marginBottom: `3rem` }}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  name="confirm_new_password"
                  value={formdata}
                  placeholder="Konfirmasi Password Baru"
                  type="password"
                  onChange={(e) => {
                    setkonfirmpass(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item style={{ justifyContent: `center` }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loadingbuatpass}
                  className="login-form-button mb-5"
                  style={{ width: `100%` }}
                >
                  Buat Password
                </Button>
              </Form.Item>
            </Form>
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
