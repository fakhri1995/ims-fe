import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from 'antd/lib/layout'
import jscookie from 'js-cookie'

import Menu from 'antd/lib/menu'
import Avatar from 'antd/lib/avatar'
import Dropdown from 'antd/lib/dropdown'
import ExportOutlined from '@ant-design/icons/ExportOutlined'
import DashboardTwoTone from '@ant-design/icons/DashboardTwoTone'
import 'antd/dist/antd.css';

function LayoutDashboardProfile({ children, tok, dataProfile }) {
    const rt = useRouter()
    const { Sider, Content, Header } = Layout
    const [coll, setColl] = useState(true)
    const [tinggi, setTinggi] = useState(90)
    const handleColl = () => {
        setColl(prev => !prev)
    };
    const handleLogout = () => {
        fetch(`https://boiling-thicket-46501.herokuapp.com/logout`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.parse(tok)
            }
        })
            .then(res => res.json())
            .then(res2 => {
                console.log("isi dari res2: " + res2)
                if (res2.data.is_success) {
                    jscookie.remove('token')
                    console.log("token abis logout: " + jscookie.get('token'))
                    rt.push('/')
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    const menuProfile2 = () => {
        return (
            <div className="w-auto h-auto flex flex-col shadow-md rounded bg-white space-y-4 px-10 py-5">
                <div className="flex justify-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex text-white text-center justify-center items-center">
                        <img src={dataProfile.data.image_profile} alt="imageProfile" className=" object-cover w-full h-full" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold mb-1">{dataProfile.data.fullname}</h2>
                        <h2 className="text-sm font-normal mb-1">{dataProfile.data.email}</h2>
                    </div>
                </div>
                <div>
                    <a onClick={handleLogout}>
                        Edit Profile
                    </a>
                </div>
                <div>
                    <a onClick={handleLogout}>
                        Security Settings
                    </a>
                </div>
                <div>
                    <a target="_blank" rel="noopener noreferrer" onClick={handleLogout}>
                        <ExportOutlined /> Logout
                    </a>
                </div>
            </div>
        )
    }

    useEffect(() => {
        var h = window.innerHeight
        setTinggi(h)
    }, [])
    var pathBuilder = ""
    return (
        <Layout>
            <Sider collapsible collapsed={coll} trigger={null} breakpoint="lg" theme="light">
                <div className="logo" style={{ height: `32px`, marginTop: `24px`, marginLeft:`16px`, marginRight:`16px`, background: `gray` }}></div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<DashboardTwoTone />}>
                        <Link href="/dashboard/home">
                            Dashboard
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0, backgroundColor: `white` }}>
                    <div className="float-left px-8 py-8 font-bold text-base">
                        Profile
                    </div>
                    <div style={{ float: `right`, marginRight: `2rem`, marginTop: `2rem`, marginBottom:`2rem` }}>
                        <Dropdown overlay={menuProfile2} trigger={['click']}>
                            {
                                dataProfile.data.image_profile ?
                                    <img src={dataProfile.data.image_profile} alt="ava" className="w-8 h-8 rounded-full object-cover cursor-pointer" />
                                    :
                                    <Avatar icon={<UserOutlined></UserOutlined>} style={{ cursor: `pointer` }} />
                            }
                        </Dropdown>
                    </div>
                </Header>
                <Content className="slb" style={{ padding: 24, height: `${tinggi}px`, backgroundColor: `white` }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default LayoutDashboardProfile