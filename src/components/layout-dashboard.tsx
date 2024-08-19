import { Layout } from "antd";
import { Breadcrumb, Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import st from "components/layout-dashboard-management.module.css";

import { IDetailProfileSucceedResponse } from "apis/auth";

import LayoutDashboardParent from "./layout-dashboard-parent";

import { PageBreadcrumbValue } from "types/common";

/**
 * @param {{ fixedBreadcrumbValues: { name: string; hrefValue?: string; }[] }} param0
 */
function LayoutDashboard({
  children,
  tok,
  dataProfile,
  pathArr = [],
  sidemenu,
  prevpath,
  idpage,
  fixedBreadcrumbValues = [],
  isPublic, // use for public talent pool
}: {
  children: ReactNode;
  tok: string;
  dataProfile: IDetailProfileSucceedResponse;

  pathArr?: any[];
  sidemenu?: string;
  prevpath?: string;
  idpage?: string;
  fixedBreadcrumbValues?: PageBreadcrumbValue[];
  isPublic?: boolean;
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
      fixedBreadcrumbValues={fixedBreadcrumbValues}
      isPublic={isPublic}
      breadcrumbComponent={
        <Breadcrumb separator=">" className={st.breadcrumbClients}>
          {/* <div className="flex items-center"> */}
          {isUseNewBreadcrumbStrategy &&
            fixedBreadcrumbValues.map((breadcrumbItem, idx) => {
              const isEmptyHrefValue =
                breadcrumbItem.hrefValue === undefined ||
                breadcrumbItem.hrefValue === "";

              let breadcrumbContent = null;

              if (isEmptyHrefValue) {
                breadcrumbContent = (
                  <p className="text-sm font-semibold">{breadcrumbItem.name}</p>
                );
              } else {
                const isShouldPushBack =
                  breadcrumbItem.hrefValue.toLowerCase() === "back";

                if (isShouldPushBack) {
                  breadcrumbContent = (
                    <Link
                      href="#"
                      className="text-sm font-semibold"
                      onClick={(e) => {
                        e.preventDefault();
                        rt.back();
                      }}
                      legacyBehavior
                    >
                      {breadcrumbItem.name}
                    </Link>
                  );
                } else {
                  breadcrumbContent = (
                    <Link
                      href={breadcrumbItem.hrefValue}
                      className="text-sm font-semibold"
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
          {/* </div> */}
        </Breadcrumb>
      }
    >
      {children}
    </LayoutDashboardParent>
  );
}

export default LayoutDashboard;
