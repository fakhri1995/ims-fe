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

function LayoutDashboardClients({ children, tok, dataProfile, pathArr, sidemenu, originPath, dataDetailCompany, st }) {
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
    const [collsmall, setCollsmall] = useState(true)
    const [tinggi, setTinggi] = useState(90)
    const handleColl = () => {
        setColl(prev => !prev)
    };
    const handleCollSmall = () => {
        setCollsmall(prev => !prev)
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
                        <Link href={`/profile`}>Profile Settings</Link>
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
            <div style={{ fontSize: '14px' }} className="w-auto h-auto grid grid-cols-1 md:grid-cols-3 shadow-md rounded bg-white">
                <div className=" col-span-1 md:col-span-1 text-xs md:text-sm m-3 md:m-2 space-y-3 px-8">
                    <div className="flex justify-center">
                        <p><AlertOutlined className="p-2" />Incident</p>
                    </div>
                    <div className="flex justify-center">
                        <p><AlertOutlined className="p-2" />Release</p>
                    </div>
                    <div className="flex justify-center">
                        <p><AlertOutlined className="p-2" />Project</p>
                    </div>
                    <div className="flex justify-center">
                        <p><AlertOutlined className="p-2" />Project</p>
                    </div>
                </div>
                <div className=" col-span-1 md:col-span-1 text-xs md:text-sm m-3 md:m-2 space-y-3 px-8">
                    <div className="flex justify-center">
                        <p><AlertOutlined className="p-2" />Incident</p>
                    </div>
                    <div className="flex justify-center">
                        <p><AlertOutlined className="p-2" />Release</p>
                    </div>
                    <div className="flex justify-center">
                        <p><AlertOutlined className="p-2" />Project</p>
                    </div>
                    <div className="flex justify-center">
                        <p><AlertOutlined className="p-2" />Project</p>
                    </div>
                </div>
                <div className=" col-span-1 md:col-span-1 text-xs md:text-sm m-3 md:m-2 space-y-3 px-8">
                    <div className="flex justify-center">
                        <p><AlertOutlined className="p-2" />Incident</p>
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
            <Sider collapsible collapsed={coll} trigger={null} theme="light" style={{ borderRight: `1px solid #f0f0f0` }} className={`${st.siderLayout} sider`}>
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
            <Sider collapsible collapsed={collsmall} trigger={null} collapsedWidth={0} width={45} theme="light" className={st.siderLayoutSmall} style={{ borderRight: `1px solid #f0f0f0` }}>
                <div className="logo" style={{ height: `32px`, margin: `16px` }}></div>
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
                <Header className="site-layout-background" style={{ padding: 0, backgroundColor: `white`, display: `flex`, flexDirection: `row`, flexWrap: `wrap`, justifyContent: `space-between`, width: `100%`, height: `auto`, alignItems: `center` }}>
                    <div className=" flex">
                        {coll ? <MenuUnfoldOutlined onClick={handleColl} style={{ padding: `24px`, float: `left`, marginTop: `0.3rem` }} className={st.trigger}></MenuUnfoldOutlined> : <MenuFoldOutlined onClick={handleColl} style={{ padding: `24px`, float: `left` }} className={st.trigger}></MenuFoldOutlined>}
                        {collsmall ? <MenuUnfoldOutlined onClick={handleCollSmall} style={{ padding: `24px`, float: `left`, marginTop: `0.3rem` }} className={st.triggerSmall}></MenuUnfoldOutlined> : <MenuFoldOutlined onClick={handleCollSmall} style={{ padding: `24px`, float: `left` }} className={st.triggerSmall}></MenuFoldOutlined>}
                        {
                            pathArr ?
                                <Breadcrumb separator=">" style={{ float: `left`, padding: `24px 10px` }} className={st.breadcrumbClients}>
                                    {pathArr[0] === "dashboard" && <Breadcrumb.Item> <strong>{rootBreadcrumb}</strong></Breadcrumb.Item>}
                                    {pathArr[0] !== "dashboard" && <Breadcrumb.Item href={`/dashboard/${oriPath.toLowerCase()}`}><strong>{oriPath}</strong></Breadcrumb.Item>}
                                    {childBreacrumbCC.length !== 0 ?
                                        childBreacrumbCC.map((doc, idx) => {
                                            pathBuilder = pathBuilder + `/${pathArr[idx]}`
                                            if (idx === childBreacrumbCC.length - 1 && idx > 0) {
                                                return (
                                                    <Breadcrumb.Item key={idx}> <strong>{dataDetailCompany.data.company_name}</strong> </Breadcrumb.Item>
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
                                                        }} className="cursor-pointer">
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
                    </div>
                    <label htmlFor={`menutoggle`} className="pointer-cursor md:hidden block cursor-pointer">
                        <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
                            <title>menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </label>
                    <input className={`hidden ${st.menuToggle}`} type="checkbox" id={`menutoggle`} />
                    <div className={`hidden md:flex md:w-auto w-full ${st.menu}`}>
                        <div style={{ marginRight: `3rem` }}>
                            <Dropdown overlay={addMenu} placement="bottomRight" trigger={['click']}>
                                <PlusCircleTwoTone className="" style={{ fontSize: '20px', cursor: `pointer` }} />
                            </Dropdown>
                        </div>
                        <div style={{ marginRight: `3rem`, cursor: `pointer` }}>
                            <NotificationOutlined />
                        </div>
                        <div style={{ marginRight: `3rem`, cursor: `pointer` }}>
                            <QuestionCircleOutlined />
                        </div>
                        <div style={{ marginRight: `3rem`, marginTop: `1rem` }}>
                            <Dropdown overlay={menuProfile2} trigger={['click']}>
                                {
                                    dataProfile.data.image_profile ?
                                        <img src={dataProfile.data.image_profile} alt="ava" className="w-8 h-8 rounded-full object-cover cursor-pointer" />
                                        :
                                        <Avatar icon={<UserOutlined></UserOutlined>} style={{ cursor: `pointer` }} />
                                }
                            </Dropdown>
                        </div>
                    </div>
                    {
                        pathArr ?
                            <Breadcrumb separator=">" style={{ float: `left`, padding: `24px 24px`, fontSize: `0.825rem`, width:`100%` }} className={st.breadcrumbClientsSmall}>
                                {pathArr[0] === "dashboard" && <Breadcrumb.Item> <strong>{rootBreadcrumb}</strong></Breadcrumb.Item>}
                                {pathArr[0] !== "dashboard" && <Breadcrumb.Item href={`/dashboard/${oriPath.toLowerCase()}`}><strong>{oriPath}</strong></Breadcrumb.Item>}
                                {childBreacrumbCC.length !== 0 ?
                                    childBreacrumbCC.map((doc, idx) => {
                                        pathBuilder = pathBuilder + `/${pathArr[idx]}`
                                        if (idx === childBreacrumbCC.length - 1 && idx > 0) {
                                            return (
                                                <Breadcrumb.Item key={idx}> <strong>{dataDetailCompany.data.company_name}</strong> </Breadcrumb.Item>
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
                                                    }} className="cursor-pointer">
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
                </Header>
                <Content className="slb" style={{ padding: 24, height: `auto` }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default LayoutDashboardClients