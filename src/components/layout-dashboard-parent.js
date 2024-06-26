import { Layout } from "antd";
import { Breadcrumb, Spin } from "antd";
import jscookie from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import BrandLogo from "components/BrandLogo.tsx";
import { LayoutMenu } from "components/base/LayoutMenu";
import st from "components/layout-dashboard-management.module.css";

import { Menu2IconSvg, RightIconSvg } from "./icon";
import LayoutMenuHeader from "./layout-menu-header";

const { Header } = Layout;

/**
 * @param {{ fixedBreadcrumbValues: { name: string; hrefValue?: string; }[] }} param0
 */
function LayoutDashboardParent({
  children,
  tok,
  dataProfile,
  pathArr = [],
  sidemenu,
  bgColor = "#f4faf5",
  breadcrumbComponent,
  isPublic, // use for public talent pool
}) {
  const rt = useRouter();

  const [coll, setColl] = useState(false);
  const [collsmall, setCollsmall] = useState(true);
  // const [tinggi, setTinggi] = useState(90);
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
          // console.log("token abis logout: " + jscookie.get("token"));
          rt.push("/login");
        }
      })
      .catch((err) => {
        setloadingspin(false);
        // console.log(err.message);
      });
  };

  return (
    <Spin spinning={loadingspin}>
      <div className="min-h-screen flex ">
        {/* Left sider */}
        <LayoutMenu
          handleCollSmall={handleCollSmall}
          sidemenu={sidemenu}
          coll={coll}
          collsmall={collsmall}
          dataPerusahaan={dataProfile.data?.company?.name || "-"}
          isPublic={isPublic}
        />

        {/* Header + Main Content */}
        <div className="w-full">
          <Header
            className="site-layout-background border-b border-mono70 bg-white
            p-4 md:p-0 h-auto"
          >
            <div className="flex justify-between">
              <div className="block md:hidden">
                <BrandLogo />
              </div>
              <div className="md:w-full flex flex-wrap justify-end md:justify-between items-center ">
                <div className="flex z-50 items-center px-5 py-3 gap-5">
                  <div className="hover:bg-neutrals50 p-1 rounded-full">
                    {/* Desktop menu button */}
                    <Menu2IconSvg
                      onClick={handleColl}
                      className={st.trigger}
                    ></Menu2IconSvg>
                  </div>

                  {/* Desktop Breadcrumb*/}
                  {pathArr ? breadcrumbComponent : null}
                </div>

                <LayoutMenuHeader
                  dataProfile={dataProfile}
                  Linkheader={Link}
                  handleLogout={handleLogout}
                  st={st}
                  isPublic={isPublic}
                />

                {/* Mobile menu button */}
                <Menu2IconSvg
                  onClick={handleCollSmall}
                  className={st.triggerSmall}
                ></Menu2IconSvg>
              </div>
            </div>

            {/* <label
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
            </label> */}

            {/* <input
              className={`hidden ${st.menuToggle}`}
              type="checkbox"
              id={`menutoggle`}
            /> */}

            {/* Breadcrumb for mobile view */}
            {/* {pathArr ? (
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
                {isUseNewBreadcrumbStrategy
                  ? fixedBreadcrumbValues?.map((breadcrumbItem, idx) => {
                    const isEmptyHrefValue =
                      breadcrumbItem.hrefValue === undefined ||
                      breadcrumbItem.hrefValue === "";

                    let breadcrumbContent = null;

                    if (isEmptyHrefValue) {
                      breadcrumbContent = (
                        <strong>{breadcrumbItem.name}</strong>
                      );
                    } else {
                      const isShouldPushBack =
                        breadcrumbItem.hrefValue.toLowerCase() === "back";

                      if (isShouldPushBack) {
                        breadcrumbContent = (
                          <a
                            href="#"
                            className="font-bold"
                            onClick={(e) => {
                              e.preventDefault();
                              rt.back();
                            }}
                          >
                            {breadcrumbItem.name}
                          </a>
                        );
                      } else {
                        breadcrumbContent = (
                          <Link href={breadcrumbItem.hrefValue}>
                            <a className="font-bold">{breadcrumbItem.name}</a>
                          </Link>
                        );
                      }
                    }

                    return (
                      <Breadcrumb.Item key={idx}>
                        {breadcrumbContent}
                      </Breadcrumb.Item>
                    );
                  })
                  : childBreacrumbDD.length !== 0 &&
                  childBreacrumbDD.map((doc, idx) => {
                    pathBuilder = pathBuilder + `/${pathArr[idx]}`;
                    if (idx === 0) {
                      return (
                        <Breadcrumb.Item
                          key={idx}
                          href={`/${doc?.toLowerCase()}`}
                        >
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
                  })}
              </Breadcrumb>
            ) : null} */}
          </Header>

          <main
            className="h-full p-6"
            style={{
              backgroundColor: bgColor,
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </Spin>
  );
}

export default LayoutDashboardParent;
