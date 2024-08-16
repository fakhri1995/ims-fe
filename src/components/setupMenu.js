import { Menu } from "antd";
import Link from "next/link";
import React from "react";

import { useAccessControl } from "contexts/access-control";

import {
  RECRUITMENT_SETUP_REGISTRATION,
  RECRUITMENT_SETUP_ROLE,
  RECRUITMENT_SETUP_STAGE,
  RECRUITMENT_SETUP_STATUS,
  RECRUITMENT_SETUP_TEMPLATE,
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
    <div>
      <Menu
        className="miniMenu"
        theme="light"
        mode="inline"
        defaultSelectedKeys={[menu]}
        triggerSubMenuAction="hover"
        inlineIndent={10}
      >
        {hasPermission(RECRUITMENT_SETUP_ROLE) && (
          <Menu.Item
            key="1"
            icon={<BriefcaseIconSvg />}
            className="text-mono50"
            title="Role"
          >
            <Link href="/admin/recruitment/role" legacyBehavior>
              <p>Role</p>
            </Link>
          </Menu.Item>
        )}

        {hasPermission(RECRUITMENT_SETUP_REGISTRATION) && (
          <Menu.Item
            key="2"
            icon={<ClickIconSvg />}
            className="text-mono50"
            title="Registration"
          >
            <Link href="/admin/recruitment/registration" legacyBehavior>
              <p>Jalur Daftar</p>
            </Link>
          </Menu.Item>
        )}

        {hasPermission(RECRUITMENT_SETUP_STAGE) && (
          <Menu.Item
            key="3"
            icon={<TrendingUpIconSvg />}
            className="text-mono50"
            title="Stage"
          >
            <Link href="/admin/recruitment/stage" legacyBehavior>
              <p>Stage</p>
            </Link>
          </Menu.Item>
        )}

        {hasPermission(RECRUITMENT_SETUP_STATUS) && (
          <Menu.Item
            key="4"
            icon={<InfoSquareIconSvg />}
            className="text-mono50"
            title="Status"
          >
            <Link href="/admin/recruitment/status" legacyBehavior>
              <p>Status</p>
            </Link>
          </Menu.Item>
        )}

        {hasPermission(RECRUITMENT_SETUP_TEMPLATE) && (
          <Menu.Item
            key="5"
            icon={<EmailIconSvg />}
            className="text-mono50"
            title="Template"
          >
            <Link href="/admin/recruitment/email-template" legacyBehavior>
              <p>Template Email</p>
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
};

export default SetupMenu;
