import { Menu } from "antd";
import Link from "next/link";
import React from "react";

import { useAccessControl } from "contexts/access-control";

import {
  MENU_SETUP_REGISTRATION,
  MENU_SETUP_ROLE,
  MENU_SETUP_STAGE,
  MENU_SETUP_STATUS,
  MENU_SETUP_TEMPLATE,
} from "lib/features";

import {
  BriefcaseIconSvg,
  ClickIconSvg,
  EmailIconSvg,
  InfoSquareIconSvg,
  TrendingUpIconSvg,
} from "./icon";
import clsx from "clsx";

const SetupMenu = ({ menu }) => {
  /**
   * Dependencies
   */
  const { hasPermission, hasRole } = useAccessControl();

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={[menu]}
      triggerSubMenuAction="hover"
    >
      {hasPermission(MENU_SETUP_ROLE) && (
        <Menu.Item
          key="1"
          icon={<BriefcaseIconSvg color={"#808080"} />}
          title="Role"
        >
          <Link href="/admin/recruitment/role">Role</Link>
        </Menu.Item>
      )}

      {hasPermission(MENU_SETUP_REGISTRATION) && (
        <Menu.Item
          key="2"
          icon={<ClickIconSvg color={"#808080"} />}
          title="Registration"
        >
          <Link href="/admin/recruitment/registration">Jalur Daftar</Link>
        </Menu.Item>
      )}

      {hasPermission(MENU_SETUP_STAGE) && (
        <Menu.Item
          key="3"
          icon={<TrendingUpIconSvg color={"#808080"} />}
          title="Stage"
        >
          <Link href="/admin/recruitment/stage">Stage</Link>
        </Menu.Item>
      )}

      {hasPermission(MENU_SETUP_STATUS) && (
        <Menu.Item
          key="4"
          icon={<InfoSquareIconSvg color={"#808080"} />}
          title="Status"
        >
          <Link href="/admin/recruitment/status">Status</Link>
        </Menu.Item>
      )}

      {hasPermission(MENU_SETUP_TEMPLATE) && (
        <Menu.Item
          key="5"
          icon={<EmailIconSvg color={"#808080"} />}
          title="Template"
        >
          <Link href="/admin/recruitment/template">Template Email</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default SetupMenu;
