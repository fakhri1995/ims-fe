import { CheckSquareOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "next/link";
import type { FC } from "react";

import BrandLogo from "components/BrandLogo";
import {
  AsetIconSvg,
  CompanyIconSvg,
  DashboardCompanyIconSvg,
  DashboardIconSvg,
  FiturIconSvg,
  FoldersIconSvg,
  ItemIconSvg,
  KatalogIconSvg,
  KehadiranCompanyIconSvg,
  MessageIconSvg,
  ProyekCompanyIconSvg,
  ResumeIconSvg,
  TaskIconSvg,
  TicketIconSvg,
  UserCheckIconSvg,
  UserIconSvg,
  UserPlusIconSvg,
  UsersIconSvg,
} from "components/icon";
import commonLayoutStyle from "components/layout-dashboard-management.module.css";

import { useAccessControl } from "contexts/access-control";

import { ROLE_SUPER_ADMIN } from "lib/constants";
import {
  LEAVES_GET,
  SIDEBAR_ANNOUNCEMENT,
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
  SIDEBAR_ATTENDANCE_SCHEDULE,
  SIDEBAR_ATTENDANCE_SHIFT,
  SIDEBAR_CLIENT_ATTENDANCE,
  SIDEBAR_CLIENT_DASHBOARD,
  SIDEBAR_CLIENT_PROJECT,
  SIDEBAR_CMS,
  SIDEBAR_CMS_BLOG,
  SIDEBAR_CMS_CAREER,
  SIDEBAR_CMS_FORM_SOLUTION,
  SIDEBAR_CMS_MESSAGE,
  SIDEBAR_CMS_PRODUCT,
  SIDEBAR_COMPANY,
  SIDEBAR_COMPANY_CLIENT,
  SIDEBAR_COMPANY_PROFILE,
  SIDEBAR_CONTRACT,
  SIDEBAR_CONTRACT_INVOICE,
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
  SIDEBAR_RECRUITMENT_CAREER,
  SIDEBAR_RECRUITMENT_SETUP,
  SIDEBAR_RECRUITMENT_TALENT_POOL,
  SIDEBAR_RESUME,
  SIDEBAR_RESUME_DAFTAR_KANDIDAT,
  SIDEBAR_RESUME_ROLE_ASSESSMENT,
  SIDEBAR_TALENT_POOL,
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

import layoutMenuStyles from "./LayoutMenu.module.scss";
import clsx from "clsx";

const { SubMenu } = Menu;
const { Sider } = Layout;

/**
 * Component LayoutMenu's props.
 */
export interface ILayoutMenu {
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
  dataPerusahaan: string;
  /**
   * Handler untuk toggle collapsed state pada smaller width device.
   */
  handleCollSmall: () => void;
  /**
   * use for Public Talent Pool
   */
  isPublic?: boolean;
}

/**
 * Component LayoutMenu
 */
export const LayoutMenu: FC<ILayoutMenu> = ({
  sidemenu,
  coll,
  collsmall,
  dataPerusahaan,
  handleCollSmall,
  isPublic,
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
        <Menu.Item
          key="1"
          icon={<DashboardIconSvg />}
          className="text-mono50"
          title="Dashboard"
        >
          <Link href="/dashboard/home">
            <p>Dashboard</p>
          </Link>
        </Menu.Item>
      )}
      {hasPermission(SIDEBAR_CLIENT_DASHBOARD) &&
        !hasRole(ROLE_SUPER_ADMIN) && (
          <Menu.Item
            key="1"
            icon={<DashboardCompanyIconSvg />}
            className="text-mono50"
            title={`Dashboard ${dataPerusahaan}`}
          >
            <Link href="/dashboard/home">
              <p>Dashboard {dataPerusahaan}</p>
            </Link>
          </Menu.Item>
        )}
      {hasPermission(SIDEBAR_CLIENT_ATTENDANCE) &&
        !hasRole(ROLE_SUPER_ADMIN) && (
          <Menu.Item
            key="kehadirancompany"
            icon={<KehadiranCompanyIconSvg />}
            className="text-mono50 "
            title={`Kehadiran ${dataPerusahaan}`}
          >
            <Link href="/kehadiran/">
              <p>Kehadiran {dataPerusahaan}</p>
            </Link>
          </Menu.Item>
        )}
      {hasPermission(SIDEBAR_CLIENT_PROJECT) && !hasRole(ROLE_SUPER_ADMIN) && (
        <Menu.Item
          key="projectscompany"
          icon={<ProyekCompanyIconSvg />}
          className="text-mono50"
          title={`Proyek ${dataPerusahaan}`}
        >
          <Link href="/projectCompany/">
            <p>Proyek {dataPerusahaan}</p>
          </Link>
        </Menu.Item>
      )}

      {/* Ticket */}
      {(hasRole(ROLE_SUPER_ADMIN) || hasPermission(SIDEBAR_TICKET)) && (
        <Menu.Item
          key="2"
          title="Tickets"
          icon={<TicketIconSvg size={20} />}
          className="text-mono50"
        >
          <Link href="/tickets">
            <p>Ticket</p>
          </Link>
        </Menu.Item>
      )}

      {/* Task: Admin Task, My Task */}
      {hasPermission(SIDEBAR_TASK) && (
        <SubMenu
          title="Task"
          key="20"
          icon={<TaskIconSvg />}
          className="text-mono50"
        >
          {hasPermission(SIDEBAR_TASK_ADMIN) && (
            <Menu.Item key="201" title="Admin Task" className="text-mono50">
              <Link href="/tasks/admin">
                <p>Admin Task</p>
              </Link>
            </Menu.Item>
          )}

          {hasPermission(SIDEBAR_TASK_MY) && (
            <Menu.Item key="202" title="My Task" className="text-mono50">
              <Link href="/tasks/mytask">
                <p>My Task</p>
              </Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Items */}
      {hasPermission(SIDEBAR_ITEMS) && (
        <Menu.Item
          key="3"
          icon={<ItemIconSvg />}
          className="text-mono50"
          title="Items"
        >
          <Link href="/items">
            <p>Items</p>
          </Link>
        </Menu.Item>
      )}

      {/* Perusahaan: Profil Perusahaan, Klien */}
      {hasPermission(SIDEBAR_COMPANY) && (
        <SubMenu
          title="Perusahaan"
          key="5"
          icon={<CompanyIconSvg />}
          className="text-mono50"
        >
          {hasPermission(SIDEBAR_COMPANY_PROFILE) && (
            <Menu.Item key="51" className="text-mono50">
              <Link href="/company/myCompany">
                <p>Profil Perusahaan</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_COMPANY_CLIENT) && (
            <Menu.Item key="52" className="text-mono50">
              <Link href="/company/clients">
                <p>Klien</p>
              </Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Proyek: Proyek & Tugas, Admin Tugas */}
      {hasPermission(SIDEBAR_PROJECT) && (
        <SubMenu
          title="Proyek"
          key="project"
          icon={<FoldersIconSvg />}
          className="text-mono50"
        >
          {hasPermission(SIDEBAR_PROJECT_TASK) && (
            <Menu.Item key="projects" className="text-mono50">
              <Link href="/projects">
                <p>Proyek & Tugas</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_PROJECT_TASK_ADMIN) && (
            <Menu.Item key="projects/task-admin" className="text-mono50">
              <Link href="/projects/task-admin">
                <p>Admin Tugas</p>
              </Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Attendance: Form Aktivitas, Admin Attendance, My Attendance */}
      {hasPermission(SIDEBAR_ATTENDANCE) && (
        <SubMenu
          title="Attendance"
          key="attendance"
          icon={<CheckSquareOutlined className="px-0.5" />}
          className="text-mono50"
        >
          {hasPermission(SIDEBAR_ATTENDANCE_FORM_ACTIVITY) && (
            <Menu.Item key="attendance/form-aktivitas" className="text-mono50">
              <Link href="/attendance/form-aktivitas">
                <p>Form Aktivitas</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_ATTENDANCE_ADMIN) && (
            <Menu.Item key="attendance/admin" className="text-mono50">
              <Link href="/attendance/admin">
                <p>Admin Attendance</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_ATTENDANCE_MY) && (
            <Menu.Item key="attendance/staff" className="text-mono50">
              <Link href="/attendance/staff">
                <p>My Attendance</p>
              </Link>
            </Menu.Item>
          )}

          {hasPermission(SIDEBAR_ATTENDANCE_SHIFT) && (
            <Menu.Item key="attendance/shift" className="text-mono50">
              <Link href="/attendance/shift">
                <p>Shift Work</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_ATTENDANCE_SCHEDULE) && (
            <Menu.Item key="attendance/schedule" className="text-mono50">
              <Link href="/attendance/schedule">
                <p>Work Schedule</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(LEAVES_GET) && (
            <Menu.Item key="attendance/annualLeave" className="text-mono50">
              <Link href="/attendance/annual-leave">
                <p>Cuti/Libur</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(LEAVES_GET) && (
            <Menu.Item key="attendance/overtime" className="text-mono50">
              <Link href="/attendance/overtime">
                <p>Overtime</p>
              </Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Lamaran Saya */}
      {hasPermission(SIDEBAR_MY_APPLICATION) && (
        <Menu.Item
          key="application"
          icon={<TaskIconSvg />}
          className="text-mono50"
          title="Items"
        >
          <Link href="/myApplication">
            <p>Lamaran Saya</p>
          </Link>
        </Menu.Item>
      )}

      {/* Public Talent Pool */}
      {(hasPermission(SIDEBAR_TALENT_POOL) || isPublic) && (
        <SubMenu
          title="Talent"
          key="talent"
          icon={<UsersIconSvg size={16} />}
          className="text-mono50"
        >
          {(hasPermission(SIDEBAR_TALENT_POOL) || isPublic) && (
            <Menu.Item key="talent/daftar-talent" className="text-mono50">
              <Link href="#">
                <p>Daftar Talent</p>
              </Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Announcement */}
      {hasPermission(SIDEBAR_ANNOUNCEMENT) && (
        <Menu.Item
          key="announcement"
          icon={<MessageIconSvg size={16} />}
          className="text-mono50"
          title="Announcement"
        >
          <Link href="/announcement">
            <p>Announcement</p>
          </Link>
        </Menu.Item>
      )}
    </>
  );

  const manajemenContent = (
    <>
      <p className={menuSectionLabelClassName}>MANAJEMEN</p>
      {/* Pengguna: Agents, Requesters, Groups, Guests */}
      {hasPermission(SIDEBAR_USER) && (
        <SubMenu
          title="Pengguna"
          key="6"
          icon={<UserIconSvg />}
          className="text-mono50"
        >
          {hasPermission(SIDEBAR_USER_AGENT) && (
            <Menu.Item key="61" className="text-mono50">
              <Link href="/admin/agents">
                <p>Agents</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_USER_REQUESTER) && (
            <Menu.Item key="62" className="text-mono50">
              <Link href="/admin/requesters">
                <p>Requesters</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_USER_GROUP) && (
            <Menu.Item key="63" className="text-mono50">
              <Link href="/admin/groups">
                <p>Groups</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_USER_GUEST) && (
            <Menu.Item key="64" className="text-mono50">
              <Link href="/admin/guests">
                <p>Guests</p>
              </Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {hasPermission(SIDEBAR_EMPLOYEE) && (
        <SubMenu
          title="Karyawan"
          key="employee"
          icon={<UserCheckIconSvg />}
          className="text-mono50"
        >
          {hasPermission(SIDEBAR_EMPLOYEE_LIST) && (
            <Menu.Item key="employee-list" className="text-mono50">
              <Link href="/admin/employees">
                <p>Daftar Karyawan</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_EMPLOYEE_PAYSLIP) && (
            <Menu.Item key="employee-salary" className="text-mono50">
              <Link href="/admin/employees/payslip">
                <p>Slip Gaji</p>
              </Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Fitur: Roles. Modules */}
      {hasPermission(SIDEBAR_FEATURE) && (
        <SubMenu
          title="Fitur"
          key="7"
          icon={<FiturIconSvg />}
          className="text-mono50"
        >
          {hasPermission(SIDEBAR_FEATURE_ROLE) && (
            <Menu.Item key="71" className="text-mono50">
              <Link href="/admin/roles">
                <p>Roles</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_FEATURE_MODULE) && (
            <Menu.Item key="72" className="text-mono50">
              <Link href="/admin/modules?module=&featuredisplay=">
                <p>Modules</p>
              </Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Aset: Asset Types, Models, Vendors, Manufacturers, Relationship Type */}
      {hasPermission(SIDEBAR_ASSET) && (
        <SubMenu
          title="Aset"
          key="8"
          icon={<AsetIconSvg />}
          className="text-mono50"
        >
          {hasPermission(SIDEBAR_ASSET_TYPE) && (
            <Menu.Item key="81" className="text-mono50">
              <Link href="/admin/assets">
                <p>Asset Types</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_ASSET_MODEL) && (
            <Menu.Item key="82" className="text-mono50">
              <Link href="/admin/models">
                <p>Models</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_ASSET_VENDOR) && (
            <Menu.Item key="83" className="text-mono50">
              <Link href="/admin/vendors">
                <p>Vendors</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_ASSET_MANUFACTURER) && (
            <Menu.Item key="84" className="text-mono50">
              <Link href="/admin/manufacturers">
                <p>Manufacturers</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_ASSET_RELATIONSHIP_TYPE) && (
            <Menu.Item key="85" className="text-mono50">
              <Link href="/admin/relationships">
                <p>Relationship Type</p>
              </Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}
      {/* Product */}
      {hasPermission(SIDEBAR_ASSET) && (
        <SubMenu
          title="Katalog"
          key="12"
          icon={<KatalogIconSvg />}
          className="text-mono50"
        >
          {hasPermission(SIDEBAR_ASSET_TYPE) && (
            <Menu.Item key="113" className="text-mono50">
              <Link href="/admin/product-catalog">
                <p>Product</p>
              </Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}
      {/* CMS: Career. Messages */}
      {hasPermission(SIDEBAR_CMS) && (
        <SubMenu
          title="CMS"
          key="9"
          icon={<CmsNavIcon />}
          className="text-mono50"
        >
          {hasPermission(SIDEBAR_CMS_CAREER) && (
            <Menu.Item key="91" className="text-mono50">
              <Link href="/admin/careers">
                <p>Career</p>
              </Link>
            </Menu.Item>
          )}

          {hasPermission(SIDEBAR_CMS_MESSAGE) && (
            <Menu.Item key="92" className="text-mono50">
              <Link href="/admin/messages">
                <p>Message</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_CMS_FORM_SOLUTION) && (
            <Menu.Item key="93" className="text-mono50">
              <Link href="/admin/form-solution">
                <p>Form Solution</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_CMS_BLOG) && (
            <Menu.Item key="94" className="text-mono50">
              <Link href="/admin/blog">
                <p>Blog</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_CMS_PRODUCT) && (
            <Menu.Item key="95" className="text-mono50">
              <Link href="/admin/product">
                <p>Product</p>
              </Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Resume: Role Assessment, Daftar Kandidat */}
      {hasPermission(SIDEBAR_RESUME) && (
        <SubMenu
          title="Resume"
          key="10"
          icon={<ResumeIconSvg />}
          className="text-mono50"
        >
          {hasPermission(SIDEBAR_RESUME_ROLE_ASSESSMENT) && (
            <Menu.Item key="101" className="text-mono50">
              <Link href="/admin/role-assessment">
                <p>Role Assessment</p>
              </Link>
            </Menu.Item>
          )}

          {hasPermission(SIDEBAR_RESUME_DAFTAR_KANDIDAT) && (
            <Menu.Item key="102" className="text-mono50">
              <Link href="/admin/candidates">
                <p>Daftar Kandidat</p>
              </Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Recruitment Management */}
      {hasPermission(SIDEBAR_RECRUITMENT) && (
        <SubMenu
          title="Recruitment"
          key="11"
          icon={<UserPlusIconSvg />}
          className="text-mono50"
        >
          {hasPermission(SIDEBAR_RECRUITMENT_CAREER) && (
            <Menu.Item key="career-management" className="text-mono50">
              <Link href="/admin/career">
                <p>Career Management</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_RECRUITMENT_CANDIDATE) && (
            <Menu.Item key="111" className="text-mono50">
              <Link href="/admin/recruitment">
                <p>Candidates</p>
              </Link>
            </Menu.Item>
          )}

          {hasPermission(SIDEBAR_RECRUITMENT_SETUP) && (
            <Menu.Item key="112" className="text-mono50">
              <Link href="/admin/recruitment/role">
                <p>Setup</p>
              </Link>
            </Menu.Item>
          )}

          {hasPermission(SIDEBAR_RECRUITMENT_TALENT_POOL) && (
            <Menu.Item key="recruitment-talent-pool" className="text-mono50">
              <Link href="/admin/recruitment/talent-pool">
                <p>Talent Pool</p>
              </Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Contract Management */}
      {hasPermission(SIDEBAR_CONTRACT) && (
        <SubMenu
          title="Kontrak"
          key="contract"
          icon={<ResumeIconSvg />}
          className="text-mono50"
        >
          {hasPermission(SIDEBAR_CONTRACT_LIST) && (
            <Menu.Item key="contract-list" className="text-mono50">
              <Link href="/admin/contracts">
                <p>Kontrak</p>
              </Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_CONTRACT_INVOICE) && (
            <Menu.Item key="contract-invoice" className="text-mono50">
              <Link href="/admin/contracts/invoice">
                <p>Invoice</p>
              </Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}
    </>
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
          borderRight: `1px solid #E6E6E6`,
          height: "100%",
          paddingInline: "14px",
        }}
      >
        {/* Sider Header (image) */}
        <div className="my-5">
          <BrandLogo isUseText={!coll || !collsmall} />
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[sidemenu]}
          triggerSubMenuAction="hover"
          style={{
            borderRight: 0,
          }}
        >
          {menuSitusContent}
          <hr className="my-3 invisible" />
          {manajemenContent}
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
          // borderRight: `1px solid #f0f0f0`,
          position: "absolute",
          height: `100%`,
          backgroundColor: "white",
          zIndex: 9999,
        }}
      >
        <div className="my-5">
          <BrandLogo isUseText={!coll || !collsmall} />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[sidemenu]}
          style={{ paddingInline: "14px" }}
        >
          {menuSitusContent}
          <hr className="my-3 invisible" />
          {manajemenContent}
        </Menu>
      </Sider>
    </div>
  );
};
