import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";
import { Layout } from "antd";
import { Breadcrumb, Spin } from "antd";
import jscookie from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { LayoutMenu } from "components/base/LayoutMenu";

// import LayoutMenu from "../components/layout-menu";
import LayoutMenuHeader from "./layout-menu-header";

function LayoutDashboard2({
  children,
  tok,
  dataProfile,
  pathArr,
  pathTitleArr,
  sidemenu,
  st,
}) {
  const rt = useRouter();
  var childBreacrumb = [];
  let breadcrumbTitleArr = [];

  if (pathTitleArr) {
    breadcrumbTitleArr = pathTitleArr;
  } else if (pathArr) {
    breadcrumbTitleArr = pathArr;
  }

  if (breadcrumbTitleArr) {
    for (var i = 0; i < breadcrumbTitleArr.length; i++) {
      childBreacrumb.push(breadcrumbTitleArr[i]);
    }
  }

  const childBreacrumbCC = childBreacrumb.map((doc, idx) => {
    return doc[0].toUpperCase() + doc.slice(1);
  });
  const childBreacrumbDD = childBreacrumbCC;
  const { Sider, Content, Header } = Layout;
  const [coll, setColl] = useState(true);
  const [collsmall, setCollsmall] = useState(true);
  const [tinggi, setTinggi] = useState(90);
  const [loadingspin, setloadingspin] = useState(false);
  const handleColl = () => {
    setColl((prev) => !prev);
  };
  const handleCollSmall = () => {
    setCollsmall((prev) => !prev);
  };
  const handleLogout = () => {
    setloadingspin(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(tok),
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setloadingspin(false);
        if (res2.success) {
          jscookie.remove("token");
          console.log("token abis logout: " + jscookie.get("token"));
          rt.push("/login");
        }
      })
      .catch((err) => {
        setloadingspin(false);
        console.log(err.message);
      });
  };
  useEffect(() => {
    var h = window.innerHeight;
    setTinggi(h);
  }, []);
  var pathBuilder = "";
  return (
    <Spin spinning={loadingspin}>
      <div className=" min-h-screen flex">
        <LayoutMenu
          handleCollSmall={handleCollSmall}
          sidemenu={sidemenu}
          coll={coll}
          collsmall={collsmall}
        />
        <div className="h-auto w-full">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              backgroundColor: `white`,
              display: `flex`,
              alignItems: `center`,
              flexDirection: `row`,
              flexWrap: `wrap`,
              width: `100%`,
              justifyContent: `space-between`,
              height: `auto`,
            }}
          >
            <div className="flex z-50">
              {coll ? (
                <MenuUnfoldOutlined
                  rev={""}
                  onClick={handleColl}
                  style={{
                    padding: `24px`,
                    float: `left`,
                    marginTop: `0.3rem`,
                  }}
                  className={st.trigger}
                ></MenuUnfoldOutlined>
              ) : (
                <MenuFoldOutlined
                  rev={""}
                  onClick={handleColl}
                  style={{ padding: `24px`, float: `left` }}
                  className={st.trigger}
                ></MenuFoldOutlined>
              )}
              {collsmall ? (
                <MenuUnfoldOutlined
                  rev={""}
                  onClick={handleCollSmall}
                  style={{
                    padding: `24px`,
                    float: `left`,
                    marginTop: `0.3rem`,
                  }}
                  className={st.triggerSmall}
                ></MenuUnfoldOutlined>
              ) : (
                <MenuFoldOutlined
                  rev={""}
                  onClick={handleCollSmall}
                  style={{ padding: `24px`, float: `left` }}
                  className={st.triggerSmall}
                ></MenuFoldOutlined>
              )}
              {pathArr ? (
                <Breadcrumb
                  separator=">"
                  style={{
                    float: `left`,
                    padding: `24px 10px`,
                    backgroundColor: `white`,
                  }}
                  className={st.breadcrumbClients}
                >
                  {childBreacrumbDD.length !== 0
                    ? childBreacrumbDD.map((doc, idx) => {
                        pathBuilder = pathBuilder + `/${pathArr[idx]}`;
                        if (idx === 0) {
                          if (pathArr[idx] === "incidents") {
                            return (
                              <Breadcrumb.Item key={idx}>
                                {" "}
                                <strong>{doc}</strong>{" "}
                              </Breadcrumb.Item>
                            );
                          } else {
                            return (
                              <Breadcrumb.Item
                                key={idx}
                                href={`/${pathArr[idx]}`}
                              >
                                {" "}
                                <strong>{doc}</strong>{" "}
                              </Breadcrumb.Item>
                            );
                          }
                        } else if (
                          idx === childBreacrumbDD.length - 1 &&
                          idx > 0
                        ) {
                          return (
                            <Breadcrumb.Item key={idx}>
                              {" "}
                              <strong>{doc}</strong>{" "}
                            </Breadcrumb.Item>
                          );
                        } else {
                          return (
                            <Breadcrumb.Item key={idx} href={pathBuilder}>
                              <strong>{doc}</strong>
                            </Breadcrumb.Item>
                          );
                        }
                      })
                    : null}
                </Breadcrumb>
              ) : null}
            </div>
            <label
              htmlFor={`menutoggle`}
              className="pointer-cursor md:hidden block cursor-pointer mr-4"
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
            <LayoutMenuHeader
              dataProfile={dataProfile}
              Linkheader={Link}
              handleLogout={handleLogout}
              st={st}
            ></LayoutMenuHeader>
            {pathArr ? (
              <Breadcrumb
                separator=">"
                style={{
                  float: `left`,
                  padding: `24px 24px`,
                  fontSize: `0.825rem`,
                  width: `100%`,
                }}
                className={st.breadcrumbClientsSmall}
              >
                {childBreacrumbDD.length !== 0
                  ? childBreacrumbDD.map((doc, idx) => {
                      pathBuilder = pathBuilder + `/${pathArr[idx]}`;
                      if (idx === 0) {
                        return (
                          <Breadcrumb.Item key={idx} href={`/${pathArr[idx]}`}>
                            {" "}
                            <strong>{doc}</strong>{" "}
                          </Breadcrumb.Item>
                        );
                      } else if (
                        idx === childBreacrumbDD.length - 1 &&
                        idx > 0
                      ) {
                        return (
                          <Breadcrumb.Item key={idx}>
                            {" "}
                            <strong>{doc}</strong>{" "}
                          </Breadcrumb.Item>
                        );
                      } else {
                        return (
                          <Breadcrumb.Item key={idx} href={pathBuilder}>
                            <strong>{doc}</strong>
                          </Breadcrumb.Item>
                        );
                      }
                    })
                  : null}
              </Breadcrumb>
            ) : null}
          </Header>
          <main
            className="slb bg-white"
            style={{ padding: 24, height: `auto` }}
          >
            {children}
          </main>
        </div>
      </div>
    </Spin>
  );
}

export default LayoutDashboard2;
