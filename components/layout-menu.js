import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import { useState, useEffect } from 'react'
import lm from '../components/layout-menu.module.css'
import { UserOutlined, SettingOutlined, InboxOutlined, DashboardTwoTone, TeamOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons'
import Link from 'next/link'
import { IconRoles, IconModules, IconFeatures, IconAgents, IconRequesters, Icongroups, IconMIGCompany, IconClientsCompany, IconAssets, IconVendors, IconCatalog, IconContract, IconDepreciation, IconCareer, IconMessages } from '../components/icon-admin'

const LayoutMenu = ({ dataProfile, sidemenu, coll, collsmall, st, handleCollSmall }) => {
    const userFeat = [107, 108, 109, 110, 111, 112, 132, 119, 118, 117, 116, 115, 114, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143]
    const featureFeat = [173, 174, 175, 176, 177, 178, 179, 180, 181, 182]
    const serviceFeat = [183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206]
    const companyFeat = [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163]
    const depreFeat = [169, 170, 171, 172]
    const isIncludesFeat = (curr) => dataProfile.data.registered_feature.includes(curr);
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
            <Sider collapsible collapsed={coll} trigger={null} width={250} theme="light" className={`${st.siderLayout} sider`} style={{ borderRight: `1px solid #f0f0f0`, height: '100%' }}>
                <div className="logo" style={{ height: `32px`, margin: `16px`, background: `gray` }}></div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={[sidemenu]} triggerSubMenuAction="hover">
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
                        <Menu.Item key="sub32">
                            <Link href="/inventories">
                                Inventory
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="4" icon={<SettingOutlined />} title="Admin">
                        <Menu.Item key="4" icon={<SettingOutlined />}>
                            <Link href="/dashboard/admin">
                                Admin
                            </Link>
                        </Menu.Item>
                        {
                            userFeat.every(isIncludesFeat) ?
                                <SubMenu title="Users Management">
                                    {[107, 108, 109, 110, 111, 112, 132].every(isIncludesFeat) &&
                                        <Menu.Item key="411" icon={<IconAgents width={25} height={25} />}>
                                            <Link href="/admin/agents">
                                                Agents
                                        </Link>
                                        </Menu.Item>
                                    }
                                    {[119, 118, 117, 116, 115, 114, 133].every(isIncludesFeat) &&
                                        <Menu.Item key="412" icon={<IconRequesters width={25} height={25} />}>
                                            <Link href="/admin/requesters">
                                                Requesters
                                        </Link>
                                        </Menu.Item>
                                    }
                                    {[134, 135, 136, 137, 138, 139, 140, 141, 142, 143].every(isIncludesFeat) &&
                                        <Menu.Item key="413" icon={<Icongroups width={25} height={25} />}>
                                            <Link href="/admin/groups">
                                                Groups
                                        </Link>
                                        </Menu.Item>
                                    }
                                </SubMenu>
                                :
                                null
                        }
                        <SubMenu title="Features Management">
                            {
                                [173, 174, 175, 176, 177, 178].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                <Menu.Item key="411" icon={<IconRoles width={25} height={25} />}>
                                    <Link href="/admin/roles">
                                        Roles
                                    </Link>
                                </Menu.Item>
                            }
                            {
                                [179, 180, 181, 182].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                <Menu.Item key="412" icon={<IconModules width={25} height={25} />}>
                                    <Link href="/admin/modules?idmodule=&idfeature=">
                                        Modules
                                    </Link>
                                </Menu.Item>
                            }
                            <Menu.Item key="412" icon={<IconFeatures width={25} height={25} />}>
                                <Link href="/admin/features">
                                    Features
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        {
                            companyFeat.every(isIncludesFeat) ?
                                <SubMenu title="Company Management">
                                    {
                                        [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                        <Menu.Item key="411" icon={<IconMIGCompany width={25} height={25} />}>
                                            <Link href="/admin/myCompany">
                                                My Company
                                            </Link>
                                        </Menu.Item>
                                    }
                                    {
                                        [155, 156, 157, 158, 159, 160, 161, 162, 163].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                        <Menu.Item key="412" icon={<IconClientsCompany width={25} height={25} />}>
                                            <Link href="/admin/clients">
                                                Clients
                                            </Link>
                                        </Menu.Item>
                                    }
                                </SubMenu>
                                :
                                null
                        }
                        <SubMenu title="Assets">
                            <Menu.Item key="411" icon={<IconAssets width={25} height={25} />}>
                                <Link href="/admin/assets">
                                    Assets Type & Field
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="412" icon={<IconVendors width={25} height={25} />}>
                                <Link href="/admin/vendors">
                                    Vendors
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        {
                            serviceFeat.every(isIncludesFeat) ?
                                <SubMenu title="Service Management">
                                    {
                                        [183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193].every(isIncludesFeat) &&
                                        <Menu.Item key="411" icon={<IconCatalog width={25} height={25} />}>
                                            <Link href="/admin/service">
                                                Service Catalog
                                        </Link>
                                        </Menu.Item>
                                    }
                                    {
                                        [194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206].every(isIncludesFeat) &&
                                        <Menu.Item key="412" icon={<IconContract width={25} height={25} />}>
                                            <Link href="/admin/contracts">
                                                Contracts
                                            </Link>
                                        </Menu.Item>
                                    }
                                </SubMenu>
                                :
                                null
                        }
                        {
                            depreFeat.every(isIncludesFeat) ?
                                <SubMenu title="Financial Management">
                                    <Menu.Item key="411" icon={<IconDepreciation width={25} height={25} />}>
                                        <Link href="/admin/financial">
                                            Depreciation
                                        </Link>
                                    </Menu.Item>
                                </SubMenu>
                                :
                                null
                        }
                        <SubMenu title="MIG CMS">
                            <Menu.Item key="411" icon={<IconCareer width={25} height={25} />}>
                                <Link href="/admin/careers">
                                    Careers
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="412" icon={<IconMessages width={25} height={25} />}>
                                <Link href="/admin/messages">
                                    Messages
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </Sider>
            <Sider collapsible collapsed={collsmall} trigger={null} collapsedWidth={0} width={250} theme="light" className={st.siderLayoutSmall} style={{ borderRight: `1px solid #f0f0f0`, position: 'absolute', height: `100%`, backgroundColor: 'white', zIndex: '40' }}>
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
                    </SubMenu>
                    <SubMenu key="4" icon={<SettingOutlined />} title="Assets">
                        <Menu.Item key="4" icon={<SettingOutlined />}>
                            <Link href="/dashboard/admin">
                                Admin
                            </Link>
                        </Menu.Item>
                        {
                            userFeat.every(isIncludesFeat) ?
                                <SubMenu title="Users Management">
                                    {dataProfile.data.registered_feature.includes(108) &&
                                        <Menu.Item key="411" icon={<IconAgents width={20} height={20} />}>
                                            <Link href="/admin/agents">
                                                Agents
                                        </Link>
                                        </Menu.Item>
                                    }
                                    {dataProfile.data.registered_feature.includes(119) &&
                                        <Menu.Item key="412" icon={<IconRequesters width={20} height={20} />}>
                                            <Link href="/admin/requesters">
                                                Requesters
                                        </Link>
                                        </Menu.Item>
                                    }
                                    {dataProfile.data.registered_feature.includes(134) &&
                                        <Menu.Item key="413" icon={<Icongroups width={20} height={20} />}>
                                            <Link href="/admin/groups">
                                                Groups
                                        </Link>
                                        </Menu.Item>
                                    }
                                </SubMenu>
                                :
                                null
                        }
                        <SubMenu title="Features Management">
                            {
                                [173, 174, 175, 176, 177, 178].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                <Menu.Item key="411" icon={<IconRoles width={20} height={20} />}>
                                    <Link href="/admin/roles">
                                        Roles
                                    </Link>
                                </Menu.Item>
                            }
                            {
                                [179, 180, 181, 182].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                                <Menu.Item key="412" icon={<IconModules width={20} height={20} />}>
                                    <Link href="/admin/modules?module=&featuredisplay=">
                                        Modules
                                    </Link>
                                </Menu.Item>
                            }
                            <Menu.Item key="412" icon={<IconFeatures width={20} height={20} />}>
                                <Link href="/admin/features">
                                    Features
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        {
                            dataProfile.data.registered_feature.includes(144) && dataProfile.data.registered_feature.includes(155) && dataProfile.data.registered_feature.includes(150) ?
                                <SubMenu title="Company Management">
                                    {
                                        dataProfile.data.registered_feature.includes(144) &&
                                        <Menu.Item key="411" icon={<IconMIGCompany width={20} height={20} />}>
                                            <Link href="/admin/myCompany">
                                                My Company
                                        </Link>
                                        </Menu.Item>
                                    }
                                    {
                                        dataProfile.data.registered_feature.includes(155) &&
                                        <Menu.Item key="412" icon={<IconClientsCompany width={20} height={20} />}>
                                            <Link href="/admin/clients">
                                                Clients
                                        </Link>
                                        </Menu.Item>
                                    }
                                </SubMenu>
                                :
                                null
                        }
                        <SubMenu title="Assets">
                            <Menu.Item key="411" icon={<IconAssets width={20} height={20} />}>
                                <Link href="/admin/assets">
                                    Assets Type & Field
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="412" icon={<IconVendors width={20} height={20} />}>
                                <Link href="/admin/vendors">
                                    Vendors
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        {
                            serviceFeat.every(isIncludesFeat) ?
                                <SubMenu title="Service Management">
                                    {
                                        [183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193].every(isIncludesFeat) &&
                                        <Menu.Item key="411" icon={<IconCatalog width={20} height={20} />}>
                                            <Link href="/admin/service">
                                                Service Catalog
                                        </Link>
                                        </Menu.Item>
                                    }
                                    {
                                        [194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206].every(isIncludesFeat) &&
                                        <Menu.Item key="412" icon={<IconContract width={20} height={20} />}>
                                            <Link href="/admin/contracts">
                                                Contracts
                                            </Link>
                                        </Menu.Item>
                                    }
                                </SubMenu>
                                :
                                null
                        }
                        {
                            depreFeat.every(isIncludesFeat) ?
                                <SubMenu title="Financial Management">
                                    <Menu.Item key="411" icon={<IconDepreciation width={20} height={20} />}>
                                        <Link href="/admin/financial">
                                            Depreciation
                                        </Link>
                                    </Menu.Item>
                                </SubMenu>
                                :
                                null
                        }
                        <SubMenu title="MIG CMS">
                            <Menu.Item key="411" icon={<IconCareer width={20} height={20} />}>
                                <Link href="/admin/careers">
                                    Careers
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="412" icon={<IconMessages width={20} height={20} />}>
                                <Link href="/admin/messages">
                                    Messages
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </Sider>
        </div>
    )
}

export default LayoutMenu
