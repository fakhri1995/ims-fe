import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import Avatar from 'antd/lib/avatar'
import Dropdown from 'antd/lib/dropdown'
import Breadcrumb from 'antd/lib/breadcrumb'
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined'
import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import BankOutlined from '@ant-design/icons/BankOutlined'
import InboxOutlined from '@ant-design/icons/InboxOutlined'
import SettingOutlined from '@ant-design/icons/SettingOutlined'
import ExportOutlined from '@ant-design/icons/ExportOutlined'
import DashboardOutlined from '@ant-design/icons/DashboardOutlined'
import NotificationOutlined from '@ant-design/icons/NotificationOutlined'
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'
import jscookie from 'js-cookie'
import 'antd/dist/antd.css';

function LayoutDashboard({ children, tok, pathArr }) {
    var rootBreadcrumb = ""
    var rootBreadcrumb2 = ""
    if (pathArr) {
        rootBreadcrumb = pathArr[1]
        rootBreadcrumb2 = rootBreadcrumb[0].toUpperCase() + rootBreadcrumb.slice(1)
    }
    const rt = useRouter()
    const { Sider, Content, Header } = Layout
    const [coll, setColl] = useState(true)
    const [tinggi, setTinggi] = useState(90)
    const handleColl = () => {
        setColl(prev => !prev)
    };
    const handleLogout = () => {
        fetch(`https://go.cgx.co.id/auth/v1/logout`, {
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
    const menuProfile = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="#">
                    <UserOutlined /> Profile
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" onClick={handleLogout}>
                    <ExportOutlined /> Logout
                </a>
            </Menu.Item>
        </Menu>
    );
    useEffect(() => {
        var h = window.innerHeight
        setTinggi(h)
    }, [])
    return (
        <Layout>
            <Sider collapsible collapsed={coll} trigger={null} breakpoint="lg" theme="light">
                <div className="logo" style={{ height: `32px`, margin: `16px`, background: `gray` }}></div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<DashboardOutlined />}>
                        <Link href="/dashboard">
                            Dashboard
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<BankOutlined />}>
                        Companies
                    </Menu.Item>
                    <Menu.Item key="3" icon={<InboxOutlined />}>
                        Assets
                    </Menu.Item>
                    <Menu.Item key="4" icon={<SettingOutlined />}>
                        <Link href="/dashboard/admin">
                            Admin
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0, backgroundColor: `white` }}>
                    {coll ? <MenuUnfoldOutlined onClick={handleColl} style={{ padding: `24px`, float: `left`, marginTop: `0.3rem` }} className="trigger"></MenuUnfoldOutlined> : <MenuFoldOutlined onClick={handleColl} style={{ padding: `24px`, float: `left` }} className="trigger"></MenuFoldOutlined>}
                    {
                        pathArr ?
                            <Breadcrumb separator=">" style={{ float: `left`, padding: `24px 10px` }}>
                                {pathArr.length == 2 && <Breadcrumb.Item>{rootBreadcrumb2}</Breadcrumb.Item>}
                                {pathArr.length > 2 && <Breadcrumb.Item href={`/dashboard/${pathArr[1]}`}>{rootBreadcrumb2}</Breadcrumb.Item>}
                                {pathArr.length >= 2 ?
                                    pathArr.map((doc, idx) => {
                                        if (idx > 1) {
                                            return (
                                                <Breadcrumb.Item>{doc}</Breadcrumb.Item>
                                            )
                                        }
                                    })
                                    :
                                    null
                                }
                            </Breadcrumb>
                            :
                            null
                    }
                    <div style={{ float: `right`, marginRight: `2rem` }}>
                        <Dropdown overlay={menuProfile}>
                            <Avatar icon={<UserOutlined></UserOutlined>} style={{ cursor: `pointer` }} />
                        </Dropdown>
                    </div>
                    <div style={{ float: `right`, marginRight: `2rem` }}>
                        <NotificationOutlined />
                    </div>
                    <div style={{ float: `right`, marginRight: `2rem` }}>
                        <QuestionCircleOutlined />
                    </div>
                </Header>
                <Content className="slb" style={{ padding: 24, height: `${tinggi}px` }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default LayoutDashboard