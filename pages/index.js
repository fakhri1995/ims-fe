// import { useState } from 'react'
// import { Input, Checkbox, Button, message } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { useRouter } from 'next/router'
// import jscookie from 'js-cookie'
// import httpcookie from 'cookie'
// import { Form, notification } from 'antd'
import LandingPage from '../pages/migwebsite/landingpage'

export default function Home({ }) {
  // console.log("token di login abis dari logout: " + jscookie.get('token'))
  
  return (
    <>
      <LandingPage/>
    </>
  )
}

// export async function getServerSideProps({ req, res }) {
  // const initProps = {};
  // if (req && req.headers) {
  //   const cookies = req.headers.cookie;
  //   if (cookies) {
  //     res.writeHead(302, { Location: '/dashboard/home' })
  //     res.end()
  //   }
  //   if (typeof cookies === 'string') {
  //     const cookiesJSON = httpcookie.parse(cookies);
  //     initProps.token = cookiesJSON.token;
  //   }
  // }
  // return {
    // props: {
      // initProps,
    // },
  // }
// }
