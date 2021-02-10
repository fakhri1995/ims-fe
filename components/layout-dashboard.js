import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import Avatar from 'antd/lib/avatar'
import Dropdown from 'antd/lib/dropdown'
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined'
import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import BankOutlined from '@ant-design/icons/BankOutlined'
import InboxOutlined from '@ant-design/icons/InboxOutlined'
import SettingOutlined from '@ant-design/icons/SettingOutlined'
import ExportOutlined from '@ant-design/icons/ExportOutlined'
import DashboardTwoTone from '@ant-design/icons/DashboardTwoTone'
import jscookie from 'js-cookie'
import 'antd/dist/antd.css';

function LayoutDashboard({ children, tok }) {
    const rt = useRouter()
    const { Sider, Content, Header } = Layout
    const [coll, setColl] = useState(true)
    const [tinggi, setTinggi] = useState(90)
    const handleColl = () => {
        setColl(prev => !prev)
    };
    const handleLogout = () => {
        jscookie.remove('token')
        rt.push('/')
        // fetch(`https://go.cgx.co.id/auth/v1/logout`, {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization':  `${tok}`
        //     }
        // })
        // .then(res => res.json())
        // .then(res2 => {
        //     if(res2.data.is_success){
        //         jscookie.remove('token')
        //         rt.push('/')
        //     }
        // })
    }
    const menuProfile = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
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
                    <Menu.Item key="1" icon={<DashboardTwoTone />}>
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
                        <Link href="/dashboard/admin/">
                            Admin
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0, backgroundColor: `white` }}>
                    {coll ? <MenuUnfoldOutlined onClick={handleColl} style={{ padding: `24px` }} className="trigger"></MenuUnfoldOutlined> : <MenuFoldOutlined onClick={handleColl} style={{ padding: `24px` }} className="trigger"></MenuFoldOutlined>}
                    <div style={{ float: `right`, marginRight: `2rem` }}>
                        <Dropdown overlay={menuProfile}>
                            <Avatar icon={<UserOutlined></UserOutlined>} style={{ cursor: `pointer` }} />
                        </Dropdown>
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