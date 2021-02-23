import { useState } from 'react'
import Form from 'antd/lib/form';
import { Input, Checkbox, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import notification from 'antd/lib/notification'
import jscookie from 'js-cookie'
import httpcookie from 'cookie'


export default function Home({ initProps }) {
  // console.log("token di login abis dari logout: " + jscookie.get('token'))
  const rt = useRouter()
  const [formdata, setFormdata] = useState({
    email: '',
    password: ''
  })
  const [alerterror, setAlerterror] = useState(false)
  const onChangeLogin = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }
  const handleLogin = () => {
    fetch(`https://boiling-thicket-46501.herokuapp.com/login`, {
      method: "POST",
      body: new URLSearchParams(formdata)
    })
      .then(res => res.json())
      .then(res2 => {
        if (res2.data) {
          notification['success']({
            message: "Selamat datang di MIGSYS",
            duration: 3
          })
          // console.log("token: " + res2.data.token)
          var date = new Date();
          date.setTime(date.getTime() + (3600 * 1000));
          jscookie.set('token', JSON.stringify(res2.data.token), { expires: date })
          // console.log("token di session: " + JSON.parse(jscookie.get('token')))
          rt.push('/dashboard/home')
        }
        else if (!res2.success) {
          // console.log("masuk ke error login")
          message.error({
            content: res2.message.errorInfo.status_detail,
            style: {
              marginTop: `1rem`
            }
          }, 5)
          setAlerterror(true)
        }
      })
  }
  return (
    <>
      {/* {
        spin1 ?
          <Spin size="large"> */}
      <div className="container-xl bg-blue-600 h-screen">
        <div className="pt-20 relative" id="wrapper">
          <div className="mx-auto bg-white rounded-lg w-10/12 md:w-5/12 h-80 md:h-80 text-black shadow-lg px-3 md:px-5 py-10 text-center">
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
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} name="password" value={formdata} placeholder="Password" type="password" onChange={onChangeLogin} />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                {/* <a className="login-form-forgot ml-60" href="">
                  Forgot password
                    </a> */}
              </Form.Item>
              <Form.Item style={{ justifyContent: `center` }}>
                <Button type="primary" htmlType="submit" className="login-form-button mb-5" style={{ width: `100%` }}>
                  Log in
                    </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      {/* </Spin> */}
      {/* } */}
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  const initProps = {};
  if (req && req.headers) {
    const cookies = req.headers.cookie;
    if (cookies) {
      res.writeHead(302, { Location: '/dashboard/home' })
      res.end()
    }
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
