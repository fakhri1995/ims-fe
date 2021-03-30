import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import { useState, useEffect } from 'react'
import lm from '../components/layout-menu.module.css'
import InboxOutlined from '@ant-design/icons/InboxOutlined'
import SettingOutlined from '@ant-design/icons/SettingOutlined'
import DashboardTwoTone from '@ant-design/icons/DashboardTwoTone'
import Icon from '@ant-design/icons'
import Link from 'next/link'

const LayoutMenu = ({ sidemenu, coll, collsmall, st, handleCollSmall }) => {
    const { SubMenu } = Menu;
    const { Sider } = Layout
    // const [collsmall, setCollsmall] = useState(true)
    // const handleCollSmall = () => {
    //     setCollsmall(prev => !prev)
    // };
    const click = () => {
        this.props.parentMethod();
    }
    const ticketIconSvg = () => (
        <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 32 32">
            <path d="M18 10l4 4-8 8-4-4zM31.298 9.297l-2.297-2.297-1 1c-0.512 0.512-1.219 0.828-2 0.828-1.562 0-2.829-1.266-2.829-2.828 0-0.781 0.317-1.489 0.829-2.001l1-1-2.297-2.297c-0.936-0.936-2.469-0.936-3.405 0l-18.595 18.595c-0.936 0.936-0.936 2.469 0 3.405l2.297 2.297 0.999-0.999c0.512-0.513 1.22-0.83 2.001-0.83 1.562 0 2.828 1.266 2.828 2.828 0 0.781-0.317 1.489-0.829 2.001l-1 1 2.297 2.297c0.936 0.936 2.469 0.936 3.405 0l18.595-18.595c0.936-0.937 0.936-2.469 0-3.406zM14 26l-8-8 12-12 8 8-12 12z"></path>
        </svg>
    )
    return (
        <div>
            <div className={`${lm.modal}`} hidden={collsmall} onClick={handleCollSmall}></div>
            <Sider collapsible collapsed={coll} trigger={null} theme="light" className={`${st.siderLayout} sider`} style={{ borderRight: `1px solid #f0f0f0`, height: '100%' }}>
                <div className="logo" style={{ height: `32px`, margin: `16px`, background: `gray` }}></div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={[sidemenu]}>
                    <Menu.Item key="1" icon={<DashboardTwoTone />}>
                        <Link href="/dashboard/home">
                            Dashboard
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<Icon component={ticketIconSvg} />}>
                        <Link href="/tickets">
                            Ticket
                        </Link>
                    </Menu.Item>
                    <SubMenu key="3" icon={<InboxOutlined />} title="Assets">
                        {/* <Menu.Item key="sub31">
                            <Link href="/vendors">
                                Vendor
                            </Link>
                        </Menu.Item> */}
                        <Menu.Item key="sub32">
                            <Link href="/inventories">
                                Inventory
                            </Link>
                        </Menu.Item>
                        {/* <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu> */}
                    </SubMenu>
                    {/* <Menu.Item key="3" icon={<InboxOutlined />}>
                        <Link href="/dashboard/assets">
                            Assets
                        </Link>
                    </Menu.Item> */}
                    <Menu.Item key="4" icon={<SettingOutlined />}>
                        <Link href="/dashboard/admin">
                            Admin
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Sider collapsible collapsed={collsmall} trigger={null} collapsedWidth={0} width={200} theme="light" className={st.siderLayoutSmall} style={{ borderRight: `1px solid #f0f0f0`, position: 'absolute', height: `100%`, backgroundColor: 'white', zIndex: '40' }}>
                <div className="logo" style={{ height: `32px`, margin: `16px` }}></div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={[sidemenu]}>
                    <Menu.Item key="1" icon={<DashboardTwoTone />}>
                        <Link href="/dashboard/home">
                            Dashboard
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<Icon component={ticketIconSvg} />}>
                        <Link href="/tickets">
                            Ticket
                        </Link>
                    </Menu.Item>
                    <SubMenu key="3" icon={<InboxOutlined />} title="Assets">
                        <Menu.Item key="sub31">
                            <Link href="/vendors">
                                Vendor
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="sub32">
                            <Link href="/inventories">
                                Inventory
                            </Link>
                        </Menu.Item>
                        {/* <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu> */}
                    </SubMenu>
                    {/* <Menu.Item key="3" icon={<InboxOutlined />}>
                        <Link href="/dashboard/assets">
                            Assets
                        </Link>
                    </Menu.Item> */}
                    <Menu.Item key="4" icon={<SettingOutlined />}>
                        <Link href="/dashboard/admin">
                            Admin
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        </div>
    )
}

export default LayoutMenu
