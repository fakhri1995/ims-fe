import { DashboardTwoTone } from "@ant-design/icons";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { MenuFoldOutlined, UserOutlined } from "@ant-design/icons";
import ExportOutlined from "@ant-design/icons/ExportOutlined";
import { Layout } from "antd";
import { Menu } from "antd";
import { Avatar } from "antd";
import { Dropdown } from "antd";
import jscookie from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function LayoutDashboardProfile({
  children,
  tok,
  dataProfile,
  edit,
  setedit,
  st,
}) {
  const rt = useRouter();
  const { Sider, Content, Header } = Layout;
  const [coll, setColl] = useState(true);
  const [collsmall, setCollsmall] = useState(true);
  const [tinggi, setTinggi] = useState(90);
  const handleColl = () => {
    setColl((prev) => !prev);
  };
  const handleCollSmall = () => {
    setCollsmall((prev) => !prev);
  };
  const handleLogout = () => {
    fetch(`https://boiling-thicket-46501.herokuapp.com/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(tok),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        console.log("isi dari res2: " + res2);
        if (res2.data.is_success) {
          jscookie.remove("token");
          console.log("token abis logout: " + jscookie.get("token"));
          rt.push("/");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const menuProfile2 = () => {
    return (
      <div className="w-auto h-auto flex flex-col shadow-md rounded bg-white space-y-4 px-10 py-5">
        <div className="flex justify-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex text-white text-center justify-center items-center">
            <img
              src={dataProfile.data.profile_image}
              alt="imageProfile"
              className=" object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-1">
              {dataProfile.data.fullname}
            </h2>
            <h2 className="text-sm font-normal mb-1">
              {dataProfile.data.email}
            </h2>
          </div>
        </div>
        <div>
          <a onClick={setedit}>Edit Profile</a>
        </div>
        <div>
          <a>Security Settings</a>
        </div>
        <div>
          <a target="_blank" rel="noopener noreferrer" onClick={handleLogout}>
            <ExportOutlined /> Logout
          </a>
        </div>
      </div>
    );
  };

  useEffect(() => {
    var h = window.innerHeight;
    setTinggi(h);
  }, []);
  var pathBuilder = "";
  return (
    <Layout>
      <Sider
        collapsible
        collapsed={coll}
        trigger={null}
        theme="light"
        style={{ borderRight: `1px solid #f0f0f0` }}
        className={`${st.siderLayout} sider`}
      >
        <div
          className="logo"
          style={{
            height: `32px`,
            marginTop: `24px`,
            marginLeft: `16px`,
            marginRight: `16px`,
            background: `gray`,
          }}
        ></div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardTwoTone />}>
            <Link href="/dashboard/home">Dashboard</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Sider
        collapsible
        collapsed={collsmall}
        trigger={null}
        collapsedWidth={0}
        width={45}
        theme="light"
        className={st.siderLayoutSmall}
        style={{ borderRight: `1px solid #f0f0f0` }}
      >
        <div
          className="logo"
          style={{
            height: `32px`,
            marginTop: `24px`,
            marginLeft: `16px`,
            marginRight: `16px`,
          }}
        ></div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardTwoTone />}>
            <Link href="/dashboard/home">Dashboard</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            backgroundColor: `white`,
            display: `flex`,
            flexDirection: `row`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            width: `100%`,
            height: `auto`,
            alignItems: `center`,
          }}
        >
          <div className="flex">
            {coll ? (
              <MenuUnfoldOutlined
                onClick={handleColl}
                style={{ padding: `24px`, float: `left`, marginTop: `0.3rem` }}
                className={st.trigger}
              ></MenuUnfoldOutlined>
            ) : (
              <MenuFoldOutlined
                onClick={handleColl}
                style={{ padding: `24px`, float: `left` }}
                className={st.trigger}
              ></MenuFoldOutlined>
            )}
            {collsmall ? (
              <MenuUnfoldOutlined
                onClick={handleCollSmall}
                style={{ padding: `24px`, float: `left`, marginTop: `0.3rem` }}
                className={st.triggerSmall}
              ></MenuUnfoldOutlined>
            ) : (
              <MenuFoldOutlined
                onClick={handleCollSmall}
                style={{ padding: `24px`, float: `left` }}
                className={st.triggerSmall}
              ></MenuFoldOutlined>
            )}
            <div className="float-left px-8 py-8 font-bold text-base">
              Profile
            </div>
          </div>
          <label
            htmlFor={`menutoggle`}
            className="pointer-cursor md:hidden block cursor-pointer"
          >
            <svg
              className="fill-current text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
            >
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </label>
          <input
            className={`hidden ${st.menuToggle}`}
            type="checkbox"
            id={`menutoggle`}
          />
          <div className={`hidden md:flex md:w-auto w-full ${st.menu}`}>
            <div
              style={{
                marginRight: `3rem`,
                marginTop: `2rem`,
                marginBottom: `2rem`,
              }}
            >
              <Dropdown overlay={menuProfile2} trigger={["click"]}>
                {dataProfile.data.profile_image ? (
                  <img
                    src={dataProfile.data.profile_image}
                    alt="ava"
                    className="w-8 h-8 rounded-full object-cover cursor-pointer"
                  />
                ) : (
                  <Avatar
                    icon={<UserOutlined></UserOutlined>}
                    style={{ cursor: `pointer` }}
                  />
                )}
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          className="slb"
          style={{
            padding: 24,
            height: `${tinggi}px`,
            backgroundColor: `white`,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutDashboardProfile;
