import { useState } from 'react'
import { Form } from 'antd';
import { Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useRouter } from 'next/router'
import jscookie from 'js-cookie'
import httpcookie from 'cookie'


export default function Home({ initProps }) {
  const rt = useRouter()
  const tok = initProps
  const [formdata, setFormdata] = useState({
    email: '',
    password: ''
  })
  const onChangeLogin = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }
  const handleLogin = () => {
    fetch('https://go.cgx.co.id/auth/v1/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(formdata)
    })
      .then(res => res.json())
      .then(res2 => {
        if (res2.data) {
          console.log("token: " + res2.data.token)
          jscookie.set('token', JSON.stringify(res2.data.token))
          // sessionStorage.setItem('token', JSON.stringify(res2.data.token))
          console.log("token di session: " + JSON.parse(jscookie.get('token')))
          rt.push('/dashboard/')
        }
      })
  }
  return (
    <div className="container-xl bg-blue-600 h-screen">
      <div className="pt-20" id="wrapper">
        <div className="mx-auto bg-white rounded-lg w-5/12 h-96 text-black shadow-lg px-5 py-10 text-center">
          <h1 className="mb-5 font-mont text-xl font-semibold">Log In MIGSYS v3</h1>
          <Form name="email" className="loginForm" initialValues={{ remember: true }} onFinish={handleLogin}>
            <Form.Item name="email" rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} name="email" value={formdata} placeholder="Email" onChange={onChangeLogin} />
            </Form.Item>
            <Form.Item name="password" rules={[
              {
                required: true,
                message: 'Password!',
              },
            ]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} name="password" value={formdata} placeholder="Password" type="password" onChange={onChangeLogin} />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className="login-form-forgot ml-60" href="">
                Forgot password
              </a>
            </Form.Item>
            <Form.Item style={{ justifyContent: `center` }}>
              <Button type="primary" htmlType="submit" className="login-form-button mb-5" style={{ width: `100%` }}>
                Log in
              </Button>
              <a href="">Register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const initProps = {};
  if (req && req.headers) {
    const cookies = req.headers.cookie;
    if (typeof cookies === 'string') {
      const cookiesJSON = httpcookie.parse(cookies);
      initProps.token = cookiesJSON.token;
    }
  }
  return {
    props: {
      initProps,
    },
  }
}
