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
import DashboardTwoTone from '@ant-design/icons/DashboardTwoTone'
import NotificationOutlined from '@ant-design/icons/NotificationOutlined'
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'
import PlusCircleTwoTone from '@ant-design/icons/PlusCircleTwoTone'
import AlertOutlined from '@ant-design/icons/AlertOutlined'
import { Row, Col } from 'antd';
import { Space, Button, Typography, Divider } from 'antd';
import jscookie from 'js-cookie'
import 'antd/dist/antd.css';

function LayoutDashboard({ children, tok, dataProfile, pathArr, sidemenu, originPath }) {
    const rt = useRouter()
    var rootBreadcrumb = ""
    var oriPath = ""
    var childBreacrumb = []
    if (originPath) {
        oriPath = originPath
    }
    if (pathArr) {
        if (pathArr[0] === "dashboard") {
            rootBreadcrumb = pathArr[1]
            rootBreadcrumb = rootBreadcrumb[0].toUpperCase() + rootBreadcrumb.slice(1)
        }
        else {
            for (var i = 0; i < pathArr.length; i++) {
                childBreacrumb.push(pathArr[i])
            }
        }
    }
    const childBreacrumbCC = childBreacrumb.map((doc, idx) => {
        return doc[0].toUpperCase() + doc.slice(1)
    })
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
    // const menuProfile = (
    //     <Menu>
    //         <Menu.Item>
    //             <a target="_blank" rel="noopener noreferrer" href="#">
    //                 <UserOutlined /> Profile
    //             </a>
    //         </Menu.Item>
    //         <Menu.Item>
    //             <a target="_blank" rel="noopener noreferrer" onClick={handleLogout}>
    //                 <ExportOutlined /> Logout
    //             </a>
    //         </Menu.Item>
    //     </Menu>
    // );
    const menuProfile2 = () => {
        return (
            <div className="w-auto h-auto flex flex-col shadow-md rounded bg-white space-y-4 p-5">
                <div className="flex justify-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex text-white text-center justify-center items-center">
                        <img src={dataProfile.data.image_profile} alt="imageProfile" className=" object-cover w-full h-full"/>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold mb-1">{dataProfile.data.fullname}</h2>
                        <h2 className="text-sm font-normal mb-1">{dataProfile.data.email}</h2>
                        <a>Profile Settings</a>
                    </div>
                </div>
                <div>
                    <a target="_blank" rel="noopener noreferrer" onClick={handleLogout}>
                        <ExportOutlined /> Logout
                    </a>
                </div>
            </div>
        )
    }
    
    const addMenu = () => {
        return (
            <div className="w-96 h-auto flex flex-col shadow-md rounded bg-white space-y-4 p-5">
                <div className="">
                    <Row justify="center">
                            <Col span={10}>
                                <AlertOutlined className="" />Incident
                            </Col>
                            <Col span={9}>
                                <AlertOutlined className="" />Release
                            </Col>
                            <Col span={5}>
                                <AlertOutlined className="" />Project
                            </Col>
                    </Row>
                    <Row justify="center"> 
                            <Col span={10}>
                                <AlertOutlined className="" />Service Request
                            </Col>
                            <Col span={9}>
                                <AlertOutlined className="" />Asset
                            </Col>
                            <Col span={5}>
                            </Col>
                    </Row>
                    <Row justify="center"> 
                            <Col span={10}>
                                <AlertOutlined className="" />Problem
                            </Col>
                            <Col span={9}>
                                <AlertOutlined className="" />Contract
                            </Col>
                            <Col span={5}>
                            </Col>
                    </Row>
                    <Row justify="center"> 
                            <Col span={10}>
                                <AlertOutlined className="" />Change
                            </Col>
                            <Col span={9}>
                                <AlertOutlined className="" />Purchase Order
                            </Col>
                            <Col span={5}>
                            </Col>
                    </Row>
                
                    
                </div>
            </div>
                
        )
    }
    
    useEffect(() => {
        var h = window.innerHeight
        setTinggi(h)
    }, [])
    return (
        <Layout>
            <Sider collapsible collapsed={coll} trigger={null} breakpoint="lg" theme="light">
                <div className="logo" style={{ height: `32px`, margin: `16px`, background: `gray` }}></div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={[sidemenu]}>
                    <Menu.Item key="1" icon={<DashboardTwoTone />}>
                        <Link href="/dashboard/home">
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
                                {pathArr[0] === "dashboard" && <Breadcrumb.Item> <strong>{rootBreadcrumb}</strong></Breadcrumb.Item>}
                                {pathArr[0] !== "dashboard" && <Breadcrumb.Item href={`/dashboard/${oriPath.toLowerCase()}`}><strong>{oriPath}</strong></Breadcrumb.Item>}
                                {childBreacrumbCC.length !== 0 ?
                                    childBreacrumbCC.map((doc, idx) => {
                                        return (
                                            <Breadcrumb.Item key={idx}> <strong>{doc}</strong> </Breadcrumb.Item>
                                        )
                                    })
                                    :
                                    null
                                }
                            </Breadcrumb>
                            :
                            null
                    }
                    <div style={{ float: `right`, marginRight: `2rem` }}>
                        <Dropdown overlay={menuProfile2} trigger={['click']}>
                            <Avatar icon={<UserOutlined></UserOutlined>} style={{ cursor: `pointer` }} />
                        </Dropdown>
                    </div>
                    <div style={{ float: `right`, marginRight: `2rem`, cursor: `pointer` }}>
                        <NotificationOutlined />
                    </div>
                    <div style={{ float: `right`, marginRight: `2rem`, cursor: `pointer` }}>
                        <QuestionCircleOutlined />
                    </div>
                    <div style={{ float: `right`, marginRight: `2rem`}}>
                        <Dropdown overlay={addMenu} placement="bottomCenter" trigger={['click']}>
                            <PlusCircleTwoTone className="" style={{ fontSize: '30px', cursor: `pointer` }} />
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