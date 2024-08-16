import { Layout } from "antd";
import { Breadcrumb, Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

import st from "components/layout-dashboard-management.module.css";

import LayoutDashboardParent from "./layout-dashboard-parent";

const { Header } = Layout;

/**
 * @param {{ fixedBreadcrumbValues: { name: string; hrefValue?: string; }[] }} param0
 */
function LayoutDashboardCompany({
  children,
  tok,
  dataProfile,
  pathArr = [],
  sidemenu,
  prevpath,
  idpage,

  fixedBreadcrumbValues = [],
}) {
  const rt = useRouter();
  var rootBreadcrumb = "";
  var childBreacrumb = [];

  if (pathArr) {
    if (pathArr[0] === "dashboard") {
      rootBreadcrumb = pathArr[1];
      rootBreadcrumb =
        rootBreadcrumb[0].toUpperCase() + rootBreadcrumb.slice(1);
    } else {
      for (var i = 0; i < pathArr.length; i++) {
        childBreacrumb.push(pathArr[i]);
      }
    }
  }

  const childBreacrumbCC = childBreacrumb.map((doc, idx) => {
    return doc[0]?.toUpperCase() + doc.slice(1);
  });

  const childBreacrumbDD = childBreacrumbCC;

  // useEffect(() => {
  //   var h = window.innerHeight;
  //   setTinggi(h);
  // }, []);
  var pathBuilder = "";

  /**
   * Ini cara saya untuk setup breadcrumb lebih mudah by passing props
   *  ke component ini instead of hardcoding the entire things here
   *  whenever a new page is created.
   */
  const isUseNewBreadcrumbStrategy =
    fixedBreadcrumbValues && fixedBreadcrumbValues.length > 0;

  return (
    <LayoutDashboardParent
      tok={tok}
      dataProfile={dataProfile}
      pathArr={pathArr}
      sidemenu={sidemenu}
      bgColor="#ffffff"
      breadcrumbComponent={
        <Breadcrumb separator=">" className={st.breadcrumbClients}>
          {isUseNewBreadcrumbStrategy &&
            fixedBreadcrumbValues.map((breadcrumbItem, idx) => {
              const isEmptyHrefValue =
                breadcrumbItem.hrefValue === undefined ||
                breadcrumbItem.hrefValue === "";

              let breadcrumbContent = null;

              if (isEmptyHrefValue) {
                breadcrumbContent = <strong>{breadcrumbItem.name}</strong>;
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
                    <Link
                      href={breadcrumbItem.hrefValue}
                      className="font-bold"
                      legacyBehavior
                    >
                      {breadcrumbItem.name}
                    </Link>
                  );
                }
              }

              return (
                <Breadcrumb.Item key={idx}>{breadcrumbContent}</Breadcrumb.Item>
              );
            })}

          {!isUseNewBreadcrumbStrategy && (
            <>
              {childBreacrumbDD[0] === "Tickets" && (
                <>
                  {childBreacrumbDD.map((doc, idx) => {
                    pathBuilder = pathBuilder + `/${pathArr[idx]}`;
                    if (idx === 0) {
                      if (childBreacrumbDD[1] === "Detail Tiket")
                        return (
                          <Breadcrumb.Item key={idx} href={`/tickets`}>
                            {" "}
                            <strong>{doc}</strong>{" "}
                          </Breadcrumb.Item>
                        );
                      else if (childBreacrumbDD[1] === "Riwayat Tiket")
                        return (
                          <Breadcrumb.Item key={idx} href={`/tickets`}>
                            {" "}
                            <strong>{doc}</strong>{" "}
                          </Breadcrumb.Item>
                        );
                      else if (childBreacrumbDD[1] === "Tipe Task Tiket")
                        return (
                          <Breadcrumb.Item key={idx} href={`/tickets`}>
                            {" "}
                            <strong>{doc}</strong>{" "}
                          </Breadcrumb.Item>
                        );
                      else if (childBreacrumbDD.length === 1) {
                        return (
                          <Breadcrumb.Item key={idx}>
                            <strong>{doc}</strong>
                          </Breadcrumb.Item>
                        );
                      }
                    } else if (idx === childBreacrumbDD.length - 1 && idx > 0)
                      return (
                        <Breadcrumb.Item key={idx}>
                          {" "}
                          <strong>{doc}</strong>{" "}
                        </Breadcrumb.Item>
                      );
                    else
                      return (
                        <Breadcrumb.Item key={idx} href={pathBuilder}>
                          <strong>{doc}</strong>{" "}
                        </Breadcrumb.Item>
                      );
                  })}
                </>
              )}

              {childBreacrumbDD[0] === "Tasks" && (
                <>
                  {childBreacrumbDD.map((doc, idx) => {
                    pathBuilder = pathBuilder + `/${pathArr[idx]}`;
                    if (idx === 0) {
                      if (
                        childBreacrumbDD[1] === "Admin" ||
                        childBreacrumbDD[1] === "My Task"
                      )
                        return (
                          <Breadcrumb.Item
                            key={idx}
                            href={`/tasks/${prevpath}`}
                          >
                            {" "}
                            <strong>
                              {childBreacrumbDD[1] === "Admin"
                                ? "Admin Task"
                                : "My Task"}
                            </strong>{" "}
                          </Breadcrumb.Item>
                        );
                      else if (childBreacrumbDD[1] === "Detail Task")
                        return (
                          <Breadcrumb.Item
                            key={idx}
                            href={`/tasks/${prevpath}`}
                          >
                            {" "}
                            <strong>
                              {prevpath === "admin" ? "Admin Task" : "My Task"}
                            </strong>{" "}
                          </Breadcrumb.Item>
                        );
                      else if (childBreacrumbDD[1] === "Tasktypes")
                        return (
                          <Breadcrumb.Item key={idx} href={`/tasks/admin`}>
                            {" "}
                            <strong>Admin Task</strong>{" "}
                          </Breadcrumb.Item>
                        );
                    } else if (idx === childBreacrumbDD.length - 1 && idx > 0)
                      return (
                        <Breadcrumb.Item key={idx}>
                          {" "}
                          <strong>{doc}</strong>{" "}
                        </Breadcrumb.Item>
                      );
                    else
                      return (
                        <Breadcrumb.Item key={idx} href={pathBuilder}>
                          <strong>{doc}</strong>{" "}
                        </Breadcrumb.Item>
                      );
                  })}
                </>
              )}

              {childBreacrumbDD[0] === "Company" && (
                <>
                  {childBreacrumbDD.map((doc, idx) => {
                    pathBuilder = pathBuilder + `/${pathArr[idx]}`;
                    if (idx === 0) {
                      if (childBreacrumbDD[1] !== "Clients") {
                        if (childBreacrumbDD[1] !== "myCompany") {
                          return (
                            <Breadcrumb.Item
                              key={idx}
                              href={`/company/myCompany`}
                            >
                              {" "}
                              <strong>My Company</strong>{" "}
                            </Breadcrumb.Item>
                          );
                        } else {
                          childBreacrumbDD[1] === "Locations" && (
                            <Breadcrumb.Item
                              key={idx}
                              href={`/company/myCompany`}
                            >
                              {" "}
                              <strong>My Company</strong>{" "}
                            </Breadcrumb.Item>
                          );
                          childBreacrumbDD[1] !== "Locations" && (
                            <Breadcrumb.Item
                              key={idx}
                              href={`/company/myCompany`}
                            >
                              {" "}
                              <strong>My Company</strong>{" "}
                            </Breadcrumb.Item>
                          );
                        }
                      } else if (childBreacrumbDD[1] === "Clients") {
                        return (
                          <Breadcrumb.Item
                            key={idx}
                            href={`/company/clients/${idpage}`}
                          >
                            {" "}
                            <strong>Clients</strong>{" "}
                          </Breadcrumb.Item>
                        );
                      }
                    } else if (idx === childBreacrumbDD.length - 1 && idx > 0)
                      return (
                        <Breadcrumb.Item key={idx}>
                          {" "}
                          <strong>{doc}</strong>{" "}
                        </Breadcrumb.Item>
                      );
                    else if (childBreacrumbDD[2] === "Detail Lokasi") {
                      return (
                        <Breadcrumb.Item
                          key={idx}
                          href={`/company/myCompany/locations`}
                        >
                          {" "}
                          <strong>{doc}</strong>{" "}
                        </Breadcrumb.Item>
                      );
                    }
                    if (childBreacrumbDD[1] === "Clients") {
                      if (childBreacrumbDD[2] === "Locations") {
                        return (
                          <Breadcrumb.Item key={idx} href={`/company/clients`}>
                            {" "}
                            <strong>{doc}</strong>{" "}
                          </Breadcrumb.Item>
                        );
                      } else {
                        return (
                          <Breadcrumb.Item
                            key={idx}
                            href={`/company/clients/${idpage}`}
                          >
                            {" "}
                            <strong>{doc}</strong>{" "}
                          </Breadcrumb.Item>
                        );
                      }
                    } else {
                      return (
                        <Breadcrumb.Item key={idx} href={pathBuilder}>
                          <strong>{doc}</strong>{" "}
                        </Breadcrumb.Item>
                      );
                    }
                  })}
                </>
              )}
            </>
          )}
        </Breadcrumb>
      }
    >
      {children}
    </LayoutDashboardParent>
  );
}

export default LayoutDashboardCompany;
