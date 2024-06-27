import { Layout } from "antd";
import { Breadcrumb, Spin } from "antd";
import { useRouter } from "next/router";

import LayoutDashboardParent from "./layout-dashboard-parent";

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
  var pathBuilder = "";
  return (
    <LayoutDashboardParent
      tok={tok}
      dataProfile={dataProfile}
      pathArr={pathArr}
      sidemenu={sidemenu}
      bgColor="#ffffff"
      breadcrumbComponent={
        <Breadcrumb separator=">" className={st.breadcrumbClients}>
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
                      <Breadcrumb.Item key={idx} href={`/${pathArr[idx]}`}>
                        {" "}
                        <strong>{doc}</strong>{" "}
                      </Breadcrumb.Item>
                    );
                  }
                } else if (idx === childBreacrumbDD.length - 1 && idx > 0) {
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
      }
    >
      {children}
    </LayoutDashboardParent>
  );
}

export default LayoutDashboard2;
