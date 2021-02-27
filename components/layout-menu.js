import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import { useState, useEffect } from 'react'
import lm from '../components/layout-menu.module.css'
import BankOutlined from '@ant-design/icons/BankOutlined'
import InboxOutlined from '@ant-design/icons/InboxOutlined'
import SettingOutlined from '@ant-design/icons/SettingOutlined'
import DashboardTwoTone from '@ant-design/icons/DashboardTwoTone'
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
    // console.log(st)
    return (
        <div>
            <div className={`${lm.modal}`} hidden={collsmall} onClick={handleCollSmall}></div>
            <Sider collapsible collapsed={coll} trigger={null} theme="light" className={`${st.siderLayout} sider`} style={{ borderRight: `1px solid #f0f0f0`, height:'100%' }}>
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
                    <SubMenu key="3" icon={<InboxOutlined />} title="Assets">
                        <Menu.Item key="sub31">
                            {/* <Link href="/dashboard/assets"> */}
                                Assets
                            {/* </Link> */}
                        </Menu.Item>
                        <Menu.Item key="sub32">
                            <Link href="/dashboard/inventory">
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
            <Sider collapsible collapsed={collsmall} trigger={null} collapsedWidth={0} width={200} theme="light" className={st.siderLayoutSmall} style={{ borderRight: `1px solid #f0f0f0`, position: 'absolute', height: `100%`, backgroundColor:'white', zIndex: '40' }}>
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
                    <SubMenu key="3" icon={<InboxOutlined />} title="Assets">
                        <Menu.Item key="sub31">
                            <Link href="/dashboard/assets">
                                Assets
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="sub32">
                            <Link href="/dashboard/inventory">
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
