import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";
import { Layout } from "antd";
import { Breadcrumb, Spin } from "antd";
import jscookie from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { LayoutMenu } from "components/base/LayoutMenu";

import LayoutDashboardParent from "./layout-dashboard-parent";
import LayoutMenuHeader from "./layout-menu-header";

const { Header } = Layout;

function LayoutDashboard({
  children,
  tok,
  dataProfile,
  pathArr,
  pathTitleArr,
  sidemenu,
  st,
}) {
  var rootBreadcrumb = "";
  var childBreacrumb = [];
  let breadcrumbTitleArr = [];

  if (pathTitleArr) {
    breadcrumbTitleArr = pathTitleArr;
  } else if (pathArr) {
    breadcrumbTitleArr = pathArr;
  }

  if (breadcrumbTitleArr[0] === "dashboard") {
    rootBreadcrumb = breadcrumbTitleArr[1];
    rootBreadcrumb = rootBreadcrumb[0].toUpperCase() + rootBreadcrumb.slice(1);
  } else {
    for (var i = 0; i < breadcrumbTitleArr.length; i++) {
      childBreacrumb.push(breadcrumbTitleArr[i]);
    }
  }

  const childBreacrumbCC = childBreacrumb.map((doc, idx) => {
    return doc[0].toUpperCase() + doc.slice(1);
  });
  const childBreacrumbDD = childBreacrumbCC;

  var pathBuilder = "";
  return (
    <LayoutDashboardParent
      tok={tok}
      dataProfile={dataProfile}
      pathArr={pathArr}
      sidemenu={sidemenu}
      breadcrumbComponent={
        <Breadcrumb separator=">" className={st.breadcrumbClients}>
          {/* {pathArr[0] !== "dashboard" && <Breadcrumb.Item href={`/dashboard/${pathArr[0]}`}><strong>{pathArr[0]}</strong></Breadcrumb.Item>} */}
          {childBreacrumbDD.length !== 0
            ? childBreacrumbDD.map((doc, idx) => {
                pathBuilder = pathBuilder + `/${pathArr[idx]}`;
                if (idx === 0) {
                  return (
                    <Breadcrumb.Item
                      key={idx}
                      href={`/dashboard/${pathArr[idx]}`}
                    >
                      <span className="text-sm font-semibold">{doc}</span>{" "}
                    </Breadcrumb.Item>
                  );
                } else if (idx === childBreacrumbDD.length - 1 && idx > 0) {
                  if (doc === "Assets") {
                    return (
                      <Breadcrumb.Item key={idx}>
                        {" "}
                        <span className="text-sm font-semibold">
                          {"Assets Types & Fields"}
                        </span>{" "}
                      </Breadcrumb.Item>
                    );
                  } else {
                    return (
                      <Breadcrumb.Item key={idx}>
                        {" "}
                        <span className="text-sm font-semibold">
                          {doc}
                        </span>{" "}
                      </Breadcrumb.Item>
                    );
                  }
                } else {
                  return (
                    <Breadcrumb.Item key={idx} href={pathBuilder}>
                      <span className="text-sm font-semibold">{doc}</span>
                    </Breadcrumb.Item>
                  );
                }
              })
            : null}
        </Breadcrumb>
      }
    >
      {children}
    </LayoutDashboardParent>
  );
}

export default LayoutDashboard;
