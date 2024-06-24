import {
  DashboardTwoTone,
  InboxOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CheckSquareOutlined } from "@ant-design/icons";
import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import Link from "next/link";
import { useEffect, useState } from "react";

import st from "components/layout-dashboard.module.css";

import {
  IconAgents,
  IconAssets,
  IconCareer,
  IconCatalog,
  IconClientsCompany,
  IconContract,
  IconDepreciation,
  IconFeatures,
  IconMIGCompany,
  IconMessages,
  IconModules,
  IconRequesters,
  IconRoles,
  IconVendors,
  Icongroups,
} from "../components/icon-admin";
import lm from "../components/layout-menu.module.css";
import {
  AsetIconSvg,
  CompanyIconSvg,
  DashboardIconSvg,
  FiturIconSvg,
  ItemIconSvg,
  TaskIconSvg,
  TicketIconSvg,
  UserIconSvg,
} from "./icon";

/** Currently not in use */
const LayoutMenu = ({
  dataProfile,
  sidemenu,
  coll,
  collsmall,
  handleCollSmall,
}) => {
  const userFeat = [
    107, 108, 109, 110, 111, 112, 132, 119, 118, 117, 116, 115, 114, 133, 134,
    135, 136, 137, 138, 139, 140, 141, 142, 143,
  ];
  const featureFeat = [173, 174, 175, 176, 177, 178, 179, 180, 181, 182];
  const serviceFeat = [
    183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197,
    198, 199, 200, 201, 202, 203, 204, 205, 206,
  ];
  const companyFeat = [
    144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158,
    159, 160, 161, 162, 163,
  ];
  const depreFeat = [169, 170, 171, 172];
  const ticketFeat = [107, 108, 109, 110, 111, 112, 113];
  // const isIncludesFeat = (curr) => dataProfile.data.registered_feature.includes(curr);
  const { SubMenu } = Menu;
  const { Sider } = Layout;
  // const [collsmall, setCollsmall] = useState(true)
  // const handleCollSmall = () => {
  //     setCollsmall(prev => !prev)
  // };
  const click = () => {
    this.props.parentMethod();
  };
  const ticketIconSvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 32 32">
      <path d="M18 10l4 4-8 8-4-4zM31.298 9.297l-2.297-2.297-1 1c-0.512 0.512-1.219 0.828-2 0.828-1.562 0-2.829-1.266-2.829-2.828 0-0.781 0.317-1.489 0.829-2.001l1-1-2.297-2.297c-0.936-0.936-2.469-0.936-3.405 0l-18.595 18.595c-0.936 0.936-0.936 2.469 0 3.405l2.297 2.297 0.999-0.999c0.512-0.513 1.22-0.83 2.001-0.83 1.562 0 2.828 1.266 2.828 2.828 0 0.781-0.317 1.489-0.829 2.001l-1 1 2.297 2.297c0.936 0.936 2.469 0.936 3.405 0l18.595-18.595c0.936-0.937 0.936-2.469 0-3.406zM14 26l-8-8 12-12 8 8-12 12z"></path>
    </svg>
  );

  return (
    <div>
      {/* Untuk toggle sidebar pada smaller screen device */}
      <div
        className={`${lm.modal}`}
        hidden={collsmall}
        onClick={handleCollSmall}
      ></div>

      {/* Sider untuk desktop */}
      <Sider
        collapsible
        collapsed={coll}
        trigger={null}
        width={230}
        theme="light"
        className={`${st.siderLayout} sider`}
        style={{ borderRight: `1px solid #f0f0f0`, height: "100%" }}
      >
        {/* Sider Header (image) */}
        <div className="logo flex items-center justify-center my-5">
          <img
            src="/image/Brand.png"
            alt="brand"
            className={`object-contain w-12 h-12 ${!coll && "mr-0"}`}
          />
          {!coll && (
            <h1 className="text-sm mb-0">
              <span className="font-bold text-2xl mb-0">MIG</span> sys
            </h1>
          )}
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[sidemenu]}
          triggerSubMenuAction="hover"
        >
          {!coll && (
            <p
              className={`mb-2 ${
                coll ? "text-xs" : "text-sm"
              } font-sans text-gray-400 md:pl-6`}
            >
              MENU SITUS
            </p>
          )}
          <Menu.Item key="1" icon={<DashboardIconSvg />} title="Dashboard">
            <Link href="/dashboard/home">Dashboard</Link>
          </Menu.Item>
          {dataProfile.data.role === 1 ? (
            <Menu.Item
              key="2"
              icon={<TicketIconSvg size={20} color={`#597e8d`} />}
              title="Tickets"
            >
              {/* <Menu.Item key="21"> */}
              <Link href="/tickets">Ticket</Link>
              {/* </Menu.Item> */}
            </Menu.Item>
          ) : (
            <>
              {dataProfile.data.features.includes(107) && (
                <Menu.Item
                  key="2"
                  icon={<TicketIconSvg size={20} color={`#597e8d`} />}
                  title="Tickets"
                >
                  {/* <Menu.Item key="21"> */}
                  <Link href="/tickets">Ticket</Link>
                  {/* </Menu.Item> */}
                </Menu.Item>
              )}
            </>
          )}
          <SubMenu title="Task" key="20" icon={<TaskIconSvg />}>
            {
              // [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
              <Menu.Item key="201" icon={<TaskIconSvg />} title="Admin Task">
                <Link href="/tasks/admin">Admin Task</Link>
              </Menu.Item>
            }
            {
              // [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
              <Menu.Item key="202" icon={<TaskIconSvg />} title="My Task">
                <Link href="/tasks/mytask">My Task</Link>
              </Menu.Item>
            }
          </SubMenu>
          <Menu.Item key="3" icon={<ItemIconSvg />} title="Items">
            {/* <Menu.Item key="31"> */}
            <Link href="/items">Items</Link>
            {/* </Menu.Item> */}
          </Menu.Item>
          <SubMenu title="Perusahaan" key="5" icon={<CompanyIconSvg />}>
            {
              // [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
              <Menu.Item key="51">
                <Link href="/company/myCompany">Profil Perusahaan</Link>
              </Menu.Item>
            }
            {
              // [155, 156, 157, 158, 159, 160, 161, 162, 163].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
              <Menu.Item key="52">
                <Link href="/company/clients">Klien</Link>
              </Menu.Item>
            }
          </SubMenu>

          {/* Q: ASsign key ke menu/submenu apakah ada aturan / ketentuan tertenu? */}
          <SubMenu
            style={{ marginBottom: `1.5rem` }}
            title="Attendance"
            key="124124"
            icon={<CheckSquareOutlined rev={""} className="text-[#597e8d]" />}
          >
            {
              // [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
              <>
                <Menu.Item key="attendance/form-aktivitas">
                  <Link href="/attendance/form-aktivitas">Form Aktivitas</Link>
                </Menu.Item>
                <Menu.Item key="attendance/admin">
                  <Link href="/attendance/admin">Admin Attendance</Link>
                </Menu.Item>
                <Menu.Item key="attendance/staff">
                  <Link href="/attendance/staff">My Attendance</Link>
                </Menu.Item>
              </>
            }
            {/* {
              // [155, 156, 157, 158, 159, 160, 161, 162, 163].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
              <Menu.Item key="52">
                <Link href="/company/clients">Klien</Link>
              </Menu.Item>
            } */}
          </SubMenu>

          {!coll && (
            <p
              className={`mb-2 ${
                coll ? "text-xs" : "text-sm"
              } font-sans text-gray-400 md:pl-6`}
            >
              MANAJEMEN
            </p>
          )}
          {
            // userFeat.every(isIncludesFeat) ?
            <SubMenu title="Pengguna" key="6" icon={<UserIconSvg />}>
              {/* {[107, 108, 109, 110, 111, 112, 132].every(isIncludesFeat) && */}
              <Menu.Item key="61">
                <Link href="/admin/agents">Agents</Link>
              </Menu.Item>
              {/* // } */}
              {/* {[119, 118, 117, 116, 115, 114, 133].every(isIncludesFeat) && */}
              <Menu.Item key="62">
                <Link href="/admin/requesters">Requesters</Link>
              </Menu.Item>
              {/* // } */}
              {/* {[134, 135, 136, 137, 138, 139, 140, 141, 142, 143].every(isIncludesFeat) && */}
              <Menu.Item key="63">
                <Link href="/admin/groups">Groups</Link>
              </Menu.Item>
              {/* // } */}
            </SubMenu>
            // :
            // null
          }
          <SubMenu title="Fitur" key="7" icon={<FiturIconSvg />}>
            {
              // [173, 174, 175, 176, 177, 178].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
              <Menu.Item key="71">
                <Link href="/admin/roles">Roles</Link>
              </Menu.Item>
            }
            {
              // [179, 180, 181, 182].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
              <Menu.Item key="72">
                <Link href="/admin/modules?module=&featuredisplay=">
                  Modules
                </Link>
              </Menu.Item>
            }
            {/* <Menu.Item key="412" icon={<IconFeatures width={25} height={25} />}>
                                <Link href="/admin/features">
                                    Features
                                </Link>
                            </Menu.Item> */}
          </SubMenu>
          <SubMenu title="Aset" key="8" icon={<AsetIconSvg />}>
            <Menu.Item key="81">
              <Link href="/admin/assets">Asset Types</Link>
            </Menu.Item>
            <Menu.Item key="82">
              <Link href="/admin/models">Models</Link>
            </Menu.Item>
            <Menu.Item key="83">
              <Link href="/admin/vendors">Vendors</Link>
            </Menu.Item>
            <Menu.Item key="84">
              <Link href="/admin/manufacturers">Manufacturers</Link>
            </Menu.Item>
            <Menu.Item key="85">
              <Link href="/admin/relationships">Relationship Type</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="4" icon={<SettingOutlined />} title="Admin">
            <Menu.Item key="41" icon={<SettingOutlined />}>
              <Link href="/dashboard/admin">Admin</Link>
            </Menu.Item>
            {
              // userFeat.every(isIncludesFeat) ?
              <SubMenu title="Users Management" key="42">
                {/* {[107, 108, 109, 110, 111, 112, 132].every(isIncludesFeat) && */}
                <Menu.Item
                  key="421"
                  icon={<IconAgents width={25} height={25} />}
                >
                  <Link href="/admin/agents">Agents</Link>
                </Menu.Item>
                {/* // } */}
                {/* {[119, 118, 117, 116, 115, 114, 133].every(isIncludesFeat) && */}
                <Menu.Item
                  key="422"
                  icon={<IconRequesters width={25} height={25} />}
                >
                  <Link href="/admin/requesters">Requesters</Link>
                </Menu.Item>
                {/* // } */}
                {/* {[134, 135, 136, 137, 138, 139, 140, 141, 142, 143].every(isIncludesFeat) && */}
                <Menu.Item
                  key="423"
                  icon={<Icongroups width={25} height={25} />}
                >
                  <Link href="/admin/groups">Groups</Link>
                </Menu.Item>
                {/* // } */}
              </SubMenu>
              // :
              // null
            }
            <SubMenu title="Features Management" key="43">
              {
                // [173, 174, 175, 176, 177, 178].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                <Menu.Item
                  key="431"
                  icon={<IconRoles width={25} height={25} />}
                >
                  <Link href="/admin/roles">Roles</Link>
                </Menu.Item>
              }
              {
                // [179, 180, 181, 182].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                <Menu.Item
                  key="432"
                  icon={<IconModules width={25} height={25} />}
                >
                  <Link href="/admin/modules?module=&featuredisplay=">
                    Modules
                  </Link>
                </Menu.Item>
              }
              {/* <Menu.Item key="412" icon={<IconFeatures width={25} height={25} />}>
                                <Link href="/admin/features">
                                    Features
                                </Link>
                            </Menu.Item> */}
            </SubMenu>
            {
              // companyFeat.every(isIncludesFeat) ?
              <SubMenu title="Company Management" key="44">
                {
                  // [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                  <Menu.Item
                    key="441"
                    icon={<IconMIGCompany width={25} height={25} />}
                  >
                    <Link href="/admin/myCompany">My Company</Link>
                  </Menu.Item>
                }
                {
                  // [155, 156, 157, 158, 159, 160, 161, 162, 163].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                  <Menu.Item
                    key="442"
                    icon={<IconClientsCompany width={25} height={25} />}
                  >
                    <Link href="/admin/clients">Clients</Link>
                  </Menu.Item>
                }
              </SubMenu>
              // :
              // null
            }
            <SubMenu title="Assets" key="45">
              <Menu.Item key="451" icon={<IconAssets width={25} height={25} />}>
                <Link href="/admin/assets">Asset Types</Link>
              </Menu.Item>
              <Menu.Item key="452" icon={<IconAssets width={25} height={25} />}>
                <Link href="/admin/models">Models</Link>
              </Menu.Item>
              <Menu.Item
                key="453"
                icon={<IconVendors width={25} height={25} />}
              >
                <Link href="/admin/vendors">Vendors</Link>
              </Menu.Item>
              <Menu.Item
                key="454"
                icon={<IconVendors width={25} height={25} />}
              >
                <Link href="/admin/manufacturers">Manufacturers</Link>
              </Menu.Item>
              <Menu.Item key="455" icon={<IconAssets width={25} height={25} />}>
                <Link href="/admin/relationships">Relationship Type</Link>
              </Menu.Item>
            </SubMenu>
            {
              // serviceFeat.every(isIncludesFeat) ?
              <SubMenu title="Service Management" key="46">
                {
                  // [183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193].every(isIncludesFeat) &&
                  <Menu.Item
                    key="461"
                    icon={<IconCatalog width={25} height={25} />}
                  >
                    <Link href="/admin/service">Service Catalog</Link>
                  </Menu.Item>
                }
                {
                  // [194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206].every(isIncludesFeat) &&
                  <Menu.Item
                    key="462"
                    icon={<IconContract width={25} height={25} />}
                  >
                    <Link href="/admin/contracts">Contracts</Link>
                  </Menu.Item>
                }
              </SubMenu>
              // :
              // null
            }
            {
              // depreFeat.every(isIncludesFeat) ?
              <SubMenu title="Financial Management" key="47">
                <Menu.Item
                  key="471"
                  icon={<IconDepreciation width={25} height={25} />}
                >
                  <Link href="/admin/financial">Depreciation</Link>
                </Menu.Item>
              </SubMenu>
              // :
              // null
            }
            <SubMenu title="MIG CMS" key="48">
              <Menu.Item key="481" icon={<IconCareer width={25} height={25} />}>
                <Link href="/admin/careers">Careers</Link>
              </Menu.Item>
              <Menu.Item
                key="482"
                icon={<IconMessages width={25} height={25} />}
              >
                <Link href="/admin/messages">Messages</Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </Sider>

      {/* Sider untuk mobile */}
      <Sider
        collapsible
        collapsed={collsmall}
        trigger={null}
        collapsedWidth={0}
        width={250}
        theme="light"
        className={st.siderLayoutSmall}
        style={{
          borderRight: `1px solid #f0f0f0`,
          position: "absolute",
          height: `100%`,
          backgroundColor: "white",
          zIndex: 9999,
        }}
      >
        <div className="logo flex items-center justify-center my-5">
          <img
            src="/image/Brand.png"
            alt="brand"
            className={`object-contain w-12 h-12 ${!collsmall && "mr-0"}`}
          />
          {!coll && (
            <h1 className="text-sm mb-0">
              <span className="font-bold text-2xl mb-0">MIG</span> sys
            </h1>
          )}
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={[sidemenu]}>
          {!collsmall && (
            <p
              className={`mb-2 ${
                coll ? "text-xs" : "text-sm"
              } font-sans text-gray-400 md:pl-6`}
            >
              MENU SITUS
            </p>
          )}
          <Menu.Item key="1" icon={<DashboardTwoTone />}>
            <Link href="/dashboard/home">Dashboard</Link>
          </Menu.Item>
          {dataProfile.data.role === 1 ? (
            <Menu.Item
              key="2"
              icon={<TicketIconSvg size={20} color={`#597e8d`} />}
              title="Tickets"
            >
              {/* <Menu.Item key="21"> */}
              <Link href="/tickets">Ticket</Link>
              {/* </Menu.Item> */}
            </Menu.Item>
          ) : (
            <>
              {dataProfile.data.features.includes(107) && (
                <Menu.Item
                  key="2"
                  icon={<TicketIconSvg size={20} color={`#597e8d`} />}
                  title="Tickets"
                >
                  {/* <Menu.Item key="21"> */}
                  <Link href="/tickets">Ticket</Link>
                  {/* </Menu.Item> */}
                </Menu.Item>
              )}
            </>
          )}
          <Menu.Item key="20" icon={<TaskIconSvg />} title="Task">
            <Link href="/tasks">Task</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ItemIconSvg />} title="Items">
            {/* <Menu.Item key="31"> */}
            <Link href="/items">Inventori</Link>
            {/* </Menu.Item> */}
          </Menu.Item>
          <SubMenu
            style={{ marginBottom: `1.5rem` }}
            title="Perusahaan"
            key="5"
            icon={<CompanyIconSvg />}
          >
            {
              // [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
              <Menu.Item key="51">
                <Link href="/company/myCompany">Profil Perusahaan</Link>
              </Menu.Item>
            }
            {
              // [155, 156, 157, 158, 159, 160, 161, 162, 163].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
              <Menu.Item key="52">
                <Link href="/company/clients">Klien</Link>
              </Menu.Item>
            }
          </SubMenu>
          {!collsmall && (
            <p
              className={`mb-2 ${
                collsmall ? "text-xs" : "text-sm"
              } font-sans text-gray-400 md:pl-6`}
            >
              MANAJEMEN
            </p>
          )}
          {
            // userFeat.every(isIncludesFeat) ?
            <SubMenu title="Pengguna" key="6" icon={<UserIconSvg />}>
              {/* {[107, 108, 109, 110, 111, 112, 132].every(isIncludesFeat) && */}
              <Menu.Item key="61">
                <Link href="/admin/agents">Agents</Link>
              </Menu.Item>
              {/* // } */}
              {/* {[119, 118, 117, 116, 115, 114, 133].every(isIncludesFeat) && */}
              <Menu.Item key="62">
                <Link href="/admin/requesters">Requesters</Link>
              </Menu.Item>
              {/* // } */}
              {/* {[134, 135, 136, 137, 138, 139, 140, 141, 142, 143].every(isIncludesFeat) && */}
              <Menu.Item key="63">
                <Link href="/admin/groups">Groups</Link>
              </Menu.Item>
              {/* // } */}
            </SubMenu>
            // :
            // null
          }
          <SubMenu title="Fitur" key="7" icon={<FiturIconSvg />}>
            {
              // [173, 174, 175, 176, 177, 178].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
              <Menu.Item key="71">
                <Link href="/admin/roles">Roles</Link>
              </Menu.Item>
            }
            {
              // [179, 180, 181, 182].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
              <Menu.Item key="72">
                <Link href="/admin/modules?module=&featuredisplay=">
                  Modules
                </Link>
              </Menu.Item>
            }
            {/* <Menu.Item key="412" icon={<IconFeatures width={25} height={25} />}>
                                <Link href="/admin/features">
                                    Features
                                </Link>
                            </Menu.Item> */}
          </SubMenu>
          <SubMenu title="Aset" key="8" icon={<AsetIconSvg />}>
            <Menu.Item key="81">
              <Link href="/admin/assets">Asset Types</Link>
            </Menu.Item>
            <Menu.Item key="82">
              <Link href="/admin/models">Models</Link>
            </Menu.Item>
            <Menu.Item key="83">
              <Link href="/admin/vendors">Vendors</Link>
            </Menu.Item>
            <Menu.Item key="84">
              <Link href="/admin/manufacturers">Manufacturers</Link>
            </Menu.Item>
            <Menu.Item key="85">
              <Link href="/admin/relationships">Relationship Type</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="4" icon={<SettingOutlined />} title="Assets">
            <Menu.Item key="41" icon={<SettingOutlined />}>
              <Link href="/dashboard/admin">Admin</Link>
            </Menu.Item>
            {
              // userFeat.every(isIncludesFeat) ?
              <SubMenu title="Users Management" key="42">
                {/* {dataProfile.data.registered_feature.includes(108) && */}
                <Menu.Item
                  key="421"
                  icon={<IconAgents width={20} height={20} />}
                >
                  <Link href="/admin/agents">Agents</Link>
                </Menu.Item>
                {/* // } */}
                {/* {dataProfile.data.registered_feature.includes(119) && */}
                <Menu.Item
                  key="422"
                  icon={<IconRequesters width={20} height={20} />}
                >
                  <Link href="/admin/requesters">Requesters</Link>
                </Menu.Item>
                {/* } */}
                {/* {dataProfile.data.registered_feature.includes(134) && */}
                <Menu.Item
                  key="423"
                  icon={<Icongroups width={20} height={20} />}
                >
                  <Link href="/admin/groups">Groups</Link>
                </Menu.Item>
                {/* // } */}
              </SubMenu>
              // :
              // null
            }
            <SubMenu title="Features Management" key="43">
              {
                // [173, 174, 175, 176, 177, 178].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                <Menu.Item
                  key="431"
                  icon={<IconRoles width={20} height={20} />}
                >
                  <Link href="/admin/roles">Roles</Link>
                </Menu.Item>
              }
              {
                // [179, 180, 181, 182].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
                <Menu.Item
                  key="432"
                  icon={<IconModules width={20} height={20} />}
                >
                  <Link href="/admin/modules?module=&featuredisplay=">
                    Modules
                  </Link>
                </Menu.Item>
              }
              {/* <Menu.Item key="412" icon={<IconFeatures width={20} height={20} />}>
                                <Link href="/admin/features">
                                    Features
                                </Link>
                            </Menu.Item> */}
            </SubMenu>
            {
              // dataProfile.data.registered_feature.includes(144) && dataProfile.data.registered_feature.includes(155) && dataProfile.data.registered_feature.includes(150) ?
              <SubMenu title="Company Management" key="44">
                {
                  // dataProfile.data.registered_feature.includes(144) &&
                  <Menu.Item
                    key="4141"
                    icon={<IconMIGCompany width={20} height={20} />}
                  >
                    <Link href="/admin/myCompany">My Company</Link>
                  </Menu.Item>
                }
                {
                  // dataProfile.data.registered_feature.includes(155) &&
                  <Menu.Item
                    key="442"
                    icon={<IconClientsCompany width={20} height={20} />}
                  >
                    <Link href="/admin/clients">Clients</Link>
                  </Menu.Item>
                }
              </SubMenu>
              // :
              // null
            }
            <SubMenu title="Assets" key="45">
              <Menu.Item key="451" icon={<IconAssets width={20} height={20} />}>
                <Link href="/admin/assets">Asset Types</Link>
              </Menu.Item>
              <Menu.Item key="452" icon={<IconAssets width={20} height={20} />}>
                <Link href="/admin/models">Models</Link>
              </Menu.Item>
              <Menu.Item
                key="453"
                icon={<IconVendors width={20} height={20} />}
              >
                <Link href="/admin/vendors">Vendors</Link>
              </Menu.Item>
              <Menu.Item
                key="454"
                icon={<IconVendors width={25} height={25} />}
              >
                <Link href="/admin/manufacturers">Manufacturers</Link>
              </Menu.Item>
              <Menu.Item key="455" icon={<IconAssets width={25} height={25} />}>
                <Link href="/admin/relationships">Relationship Type</Link>
              </Menu.Item>
            </SubMenu>
            {
              // serviceFeat.every(isIncludesFeat) ?
              <SubMenu title="Service Management" key="46">
                {
                  // [183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193].every(isIncludesFeat) &&
                  <Menu.Item
                    key="461"
                    icon={<IconCatalog width={20} height={20} />}
                  >
                    <Link href="/admin/service">Service Catalog</Link>
                  </Menu.Item>
                }
                {
                  // [194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206].every(isIncludesFeat) &&
                  <Menu.Item
                    key="462"
                    icon={<IconContract width={20} height={20} />}
                  >
                    <Link href="/admin/contracts">Contracts</Link>
                  </Menu.Item>
                }
              </SubMenu>
              // :
              // null
            }
            {
              // depreFeat.every(isIncludesFeat) ?
              <SubMenu title="Financial Management" key="47">
                <Menu.Item
                  key="471"
                  icon={<IconDepreciation width={20} height={20} />}
                >
                  <Link href="/admin/financial">Depreciation</Link>
                </Menu.Item>
              </SubMenu>
              // :
              // null
            }
            <SubMenu title="MIG CMS" key="48">
              <Menu.Item key="481" icon={<IconCareer width={20} height={20} />}>
                <Link href="/admin/careers">Careers</Link>
              </Menu.Item>
              <Menu.Item
                key="482"
                icon={<IconMessages width={20} height={20} />}
              >
                <Link href="/admin/messages">Messages</Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </Sider>
    </div>
  );
};

export default LayoutMenu;
