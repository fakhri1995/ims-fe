import { Layout, Menu } from "antd";
import Link from "next/link";
import type { FC } from "react";

import { KehadiranCompanyIconSvg, ProyekCompanyIconSvg } from "components/icon";
import commonLayoutStyle from "components/layout-dashboard-management.module.css";

import { useAccessControl } from "contexts/access-control";

import { ROLE_SUPER_ADMIN } from "lib/constants";
import {
  SIDEBAR_ASSET,
  SIDEBAR_ASSET_MANUFACTURER,
  SIDEBAR_ASSET_MODEL,
  SIDEBAR_ASSET_RELATIONSHIP_TYPE,
  SIDEBAR_ASSET_TYPE,
  SIDEBAR_ASSET_VENDOR,
  SIDEBAR_ATTENDANCE,
  SIDEBAR_ATTENDANCE_ADMIN,
  SIDEBAR_ATTENDANCE_FORM_ACTIVITY,
  SIDEBAR_ATTENDANCE_MY,
  SIDEBAR_CMS,
  SIDEBAR_CMS_BLOG,
  SIDEBAR_CMS_CAREER,
  SIDEBAR_CMS_FORM_SOLUTION,
  SIDEBAR_CMS_MESSAGE,
  SIDEBAR_CMS_PRODUCT,
  SIDEBAR_COMPANY,
  SIDEBAR_COMPANY_PROFILE,
  SIDEBAR_CONTRACT,
  SIDEBAR_CONTRACT_LIST,
  SIDEBAR_DASHBOARD,
  SIDEBAR_EMPLOYEE,
  SIDEBAR_EMPLOYEE_LIST,
  SIDEBAR_EMPLOYEE_PAYSLIP,
  SIDEBAR_FEATURE,
  SIDEBAR_FEATURE_MODULE,
  SIDEBAR_FEATURE_ROLE,
  SIDEBAR_ITEMS,
  SIDEBAR_MY_APPLICATION,
  SIDEBAR_PROJECT,
  SIDEBAR_PROJECT_TASK,
  SIDEBAR_PROJECT_TASK_ADMIN,
  SIDEBAR_RECRUITMENT,
  SIDEBAR_RECRUITMENT_CANDIDATE,
  SIDEBAR_RECRUITMENT_SETUP,
  SIDEBAR_RESUME,
  SIDEBAR_RESUME_DAFTAR_KANDIDAT,
  SIDEBAR_RESUME_ROLE_ASSESSMENT,
  SIDEBAR_TASK,
  SIDEBAR_TASK_ADMIN,
  SIDEBAR_TASK_MY,
  SIDEBAR_TICKET,
  SIDEBAR_USER,
  SIDEBAR_USER_AGENT,
  SIDEBAR_USER_GROUP,
  SIDEBAR_USER_GUEST,
  SIDEBAR_USER_REQUESTER,
} from "lib/features";

import CmsNavIcon from "assets/vectors/icon-cms-nav.svg";

import layoutMenuStyles from "./LayoutMenuCompany.module.scss";
import clsx from "clsx";

const { SubMenu } = Menu;
const { Sider } = Layout;

/**
 * Component LayoutMenu's props.
 */
export interface ILayoutMenuCompany {
  /**
   * Identifier menu item mana yang sedang aktif (e.g. reflect to currently active page).
   */
  sidemenu: string;

  /**
   * Flag apakah sider desktop collapsed atau tidak.
   *
   * TODO: rename this variable name karena sangat membingungkan.
   */
  coll: boolean;

  /**
   * Flag apakah sider pada smaller width device collapsed atau tidak.
   *
   * TODO: rename this variable name karena sangat membingungkan.
   */
  collsmall: boolean;

  /**
   * Handler untuk toggle collapsed state pada smaller width device.
   */
  handleCollSmall: () => void;
}

/**
 * Component LayoutMenu
 */
export const LayoutMenuCompany: FC<ILayoutMenuCompany> = ({
  sidemenu,
  coll,
  collsmall,
  handleCollSmall,
}) => {
  /**
   * Class names
   */
  const menuSectionLabelClassName = clsx(
    "mb-2 font-sans text-gray-400 uppercase text-sm px-[10px]",
    {
      hidden: coll,
    }
  );

  /**
   * Dependencies
   */
  const { hasPermission, hasRole } = useAccessControl();

  /**
   * JSX
   */
  const menuSitusContent = (
    <>
      <p className={menuSectionLabelClassName}>MENU SITUS</p>

      {/* ------------------ Menu Situs ------------------ */}
      {/* Dashboard */}
      {hasPermission(SIDEBAR_DASHBOARD) && (
        <Menu.Item key="1" icon={<KehadiranCompanyIconSvg />} title="Dashboard">
          <Link href="/dashboard/company" legacyBehavior>
            <p>Kehadiran AQRO</p>
          </Link>
        </Menu.Item>
      )}
      {hasPermission(SIDEBAR_DASHBOARD) && (
        <Menu.Item
          key="projectscompany"
          icon={<ProyekCompanyIconSvg />}
          title="projectscompany"
        >
          <Link href="/projectCompany/" legacyBehavior>
            <p>Proyek AQRO</p>
          </Link>
        </Menu.Item>
      )}
    </>
  );

  const siderHeader = (
    <div className="logo flex items-center justify-center my-5">
      <img
        src="/image/Brand.png"
        alt="brand"
        className={`object-contain w-12 h-12 ${
          !coll || (!collsmall && "mr-0")
        }`}
      />
      {(!coll || !collsmall) && (
        <h1 className="text-sm mb-0">
          <span className="font-bold text-2xl mb-0">MIG</span> sys
        </h1>
      )}
    </div>
  );

  return (
    <div>
      {/* Untuk toggle sidebar pada smaller screen device */}
      <div
        className={`${layoutMenuStyles.modal}`}
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
        className={`${commonLayoutStyle.siderLayout} sider`}
        style={{
          borderRight: `1px solid #f0f0f0`,
          height: "100%",
          paddingInline: "14px",
        }}
      >
        {/* Sider Header (image) */}
        {siderHeader}

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[sidemenu]}
          triggerSubMenuAction="hover"
        >
          {menuSitusContent}
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
        className={commonLayoutStyle.siderLayoutSmall}
        style={{
          borderRight: `1px solid #f0f0f0`,
          position: "absolute",
          height: `100%`,
          backgroundColor: "white",
          zIndex: 9999,
        }}
      >
        {
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
        }
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[sidemenu]}
          style={{ paddingInline: "14px" }}
        >
          {menuSitusContent}
        </Menu>
      </Sider>
    </div>
  );
};
