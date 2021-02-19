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
import jscookie from 'js-cookie'
import 'antd/dist/antd.css';

function LayoutDashboard({ children, tok, dataProfile, pathArr, sidemenu, originPath, dataDetailAccount }) {
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
            <div style={{ fontSize: '14px' }} className="w-224 h-auto flex flex-col shadow-md rounded bg-white space-y-4 p-5 text-sm">
                <div className="">
                    <div className="grid md:grid-cols-3 justify-center">
                        <div className="md:col-span-1">
                            <p><AlertOutlined style={{ verticalAlign: '0.2em' }} className="pr-2" />Incident</p>
                        </div>
                        <div className="md:col-span-1">
                            <p><AlertOutlined style={{ verticalAlign: '0.2em' }} className="pr-2" />Release</p>
                        </div>
                        <div className="md:col-span-1">
                            <p><AlertOutlined style={{ verticalAlign: '0.2em' }} className="pr-2" />Project</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 justify-center">
                        <div className="md:col-span-1">
                            <p><AlertOutlined style={{ verticalAlign: '0.2em' }} className="pr-2" />Service Request</p>
                        </div>
                        <div className="md:col-span-1">
                            <p><AlertOutlined style={{ verticalAlign: '0.2em' }} className="pr-2" />Asset</p>
                        </div>
                        <div className="md:col-span-1">
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 justify-center">
                        <div className="md:col-span-1">
                            <p><AlertOutlined style={{ verticalAlign: '0.2em' }} className="pr-2" />Problem</p>
                        </div>
                        <div className="md:col-span-1">
                            <p><AlertOutlined style={{ verticalAlign: '0.2em' }} className="pr-2" />Contract</p>
                        </div>
                        <div className="md:col-span-1">
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 justify-center">
                        <div className="md:col-span-1">
                            <p><AlertOutlined style={{ verticalAlign: '0.2em' }} className="pr-2" />Change</p>
                        </div>
                        <div className="md:col-span-1">
                            <p><AlertOutlined style={{ verticalAlign: '0.2em' }} className="pr-2" />Purchase Order</p>
                        </div>
                        <div className="md:col-span-1">
                        </div>
                    </div>


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
                                        pathBuilder = pathBuilder + `/${pathArr[idx]}`
                                        if (idx === childBreacrumbCC.length - 1 && idx > 0) {
                                            if (childBreacrumbCC[idx] === "Create") {
                                                return (
                                                    <Breadcrumb.Item key={idx}> <strong>{doc}</strong> </Breadcrumb.Item>
                                                )
                                            }
                                            return (
                                                <Breadcrumb.Item key={idx}> <strong>{dataDetailAccount.data.fullname}</strong> </Breadcrumb.Item>
                                            )
                                        }
                                        else {
                                            return (
                                                <Breadcrumb.Item key={idx}>
                                                    <Link href={{
                                                        pathname: pathBuilder,
                                                        query: {
                                                            originPath: oriPath
                                                        }
                                                    }}>
                                                        <strong>{doc}</strong>
                                                    </Link>
                                                </Breadcrumb.Item>
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
                    <div style={{ float: `right`, marginRight: `2rem`, marginTop:`1rem` }}>
                        <Dropdown overlay={menuProfile2} trigger={['click']}>
                            {
                                dataProfile.data.image_profile ?
                                    <img src={dataProfile.data.image_profile} alt="ava" className="w-8 h-8 rounded-full object-cover cursor-pointer" />
                                    :
                                    <Avatar icon={<UserOutlined></UserOutlined>} style={{ cursor: `pointer` }} />
                            }
                        </Dropdown>
                    </div>
                    <div style={{ float: `right`, marginRight: `2rem`, cursor: `pointer` }}>
                        <NotificationOutlined />
                    </div>
                    <div style={{ float: `right`, marginRight: `2rem`, cursor: `pointer` }}>
                        <QuestionCircleOutlined />
                    </div>
                    <div style={{ float: `right`, marginRight: `2rem` }}>
                        <Dropdown overlay={addMenu} placement="bottomRight" trigger={['click']}>
                            <PlusCircleTwoTone className="" style={{ fontSize: '20px', cursor: `pointer` }} />
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

export default LayoutDashboard