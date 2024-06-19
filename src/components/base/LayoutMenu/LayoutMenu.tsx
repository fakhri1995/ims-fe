import { CheckSquareOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "next/link";
import type { FC } from "react";

import MigsysLogo from "components/MigsysLogo";
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
import commonLayoutStyle from "components/layout-dashboard.module.css";

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
    "mb-2 font-sans text-gray-400 pl-4 md:pl-0 uppercase text-sm",
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
          // style={{ paddingInline: 0 }}
          title="Dashboard"
        >
          <Link href="/dashboard/home">Dashboard</Link>
        </Menu.Item>
      )}
      {hasPermission(SIDEBAR_CLIENT_DASHBOARD) &&
        !hasRole(ROLE_SUPER_ADMIN) && (
          <Menu.Item
            key="1"
            icon={<DashboardCompanyIconSvg />}
            title="Dashboard"
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
            title="Dashboard"
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
          title="projectscompany"
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
          icon={<TicketIconSvg size={20} color={`#597e8d`} />}
        >
          <Link href="/tickets">Ticket</Link>
        </Menu.Item>
      )}

      {/* Task: Admin Task, My Task */}
      {hasPermission(SIDEBAR_TASK) && (
        <SubMenu title="Task" key="20" icon={<TaskIconSvg />}>
          {hasPermission(SIDEBAR_TASK_ADMIN) && (
            <Menu.Item key="201" title="Admin Task">
              <Link href="/tasks/admin">Admin Task</Link>
            </Menu.Item>
          )}

          {hasPermission(SIDEBAR_TASK_MY) && (
            <Menu.Item key="202" title="My Task">
              <Link href="/tasks/mytask">My Task</Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Items */}
      {hasPermission(SIDEBAR_ITEMS) && (
        <Menu.Item key="3" icon={<ItemIconSvg />} title="Items">
          <Link href="/items">Items</Link>
        </Menu.Item>
      )}

      {/* Perusahaan: Profil Perusahaan, Klien */}
      {hasPermission(SIDEBAR_COMPANY) && (
        <SubMenu title="Perusahaan" key="5" icon={<CompanyIconSvg />}>
          {hasPermission(SIDEBAR_COMPANY_PROFILE) && (
            <Menu.Item key="51">
              <Link href="/company/myCompany">Profil Perusahaan</Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_COMPANY_CLIENT) && (
            <Menu.Item key="52">
              <Link href="/company/clients">Klien</Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Proyek: Proyek & Tugas, Admin Tugas */}
      {hasPermission(SIDEBAR_PROJECT) && (
        <SubMenu
          title="Proyek"
          key="project"
          icon={<FoldersIconSvg color={"#597e8d"} />}
        >
          {hasPermission(SIDEBAR_PROJECT_TASK) && (
            <Menu.Item key="projects">
              <Link href="/projects">Proyek & Tugas</Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_PROJECT_TASK_ADMIN) && (
            <Menu.Item key="projects/task-admin">
              <Link href="/projects/task-admin">Admin Tugas</Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Attendance: Form Aktivitas, Admin Attendance, My Attendance */}
      {hasPermission(SIDEBAR_ATTENDANCE) && (
        <SubMenu
          title="Attendance"
          key="attendance"
          icon={<CheckSquareOutlined className="text-[#597e8d] px-0.5" />}
        >
          {hasPermission(SIDEBAR_ATTENDANCE_FORM_ACTIVITY) && (
            <Menu.Item key="attendance/form-aktivitas">
              <Link href="/attendance/form-aktivitas">Form Aktivitas</Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_ATTENDANCE_ADMIN) && (
            <Menu.Item key="attendance/admin">
              <Link href="/attendance/admin">Admin Attendance</Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_ATTENDANCE_MY) && (
            <Menu.Item key="attendance/staff">
              <Link href="/attendance/staff">My Attendance</Link>
            </Menu.Item>
          )}

          {hasPermission(SIDEBAR_ATTENDANCE_SHIFT) && (
            <Menu.Item key="attendance/shift">
              <Link href="/attendance/shift">Shift Work</Link>
            </Menu.Item>
          )}

          {hasPermission(SIDEBAR_ATTENDANCE_SCHEDULE) && (
            <Menu.Item key="attendance/schedule">
              <Link href="/attendance/schedule">Work Schedule</Link>
            </Menu.Item>
          )}
          {hasPermission(LEAVES_GET) && (
            <Menu.Item key="attendance/annualLeave">
              <Link href="/attendance/annual-leave">Cuti/Libur</Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Lamaran Saya */}
      {hasPermission(SIDEBAR_MY_APPLICATION) && (
        <Menu.Item key="application" icon={<TaskIconSvg />} title="Items">
          <Link href="/myApplication">Lamaran Saya</Link>
        </Menu.Item>
      )}

      {/* Public Talent Pool */}
      {(hasPermission(SIDEBAR_TALENT_POOL) || isPublic) && (
        <SubMenu
          title="Talent"
          key="talent"
          icon={<UsersIconSvg size={16} color={"#597e8d"} />}
        >
          {(hasPermission(SIDEBAR_TALENT_POOL) || isPublic) && (
            <Menu.Item key="talent/daftar-talent">
              <Link href="#">Daftar Talent</Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Announcement */}
      {hasPermission(SIDEBAR_ANNOUNCEMENT) && (
        <Menu.Item
          key="announcement"
          icon={<MessageIconSvg size={16} />}
          title="Announcement"
        >
          <Link href="/announcement">Announcement</Link>
        </Menu.Item>
      )}
    </>
  );

  const manajemenContent = (
    <>
      <p className={menuSectionLabelClassName}>MANAJEMEN</p>
      {/* Pengguna: Agents, Requesters, Groups, Guests */}
      {hasPermission(SIDEBAR_USER) && (
        <SubMenu title="Pengguna" key="6" icon={<UserIconSvg />}>
          {hasPermission(SIDEBAR_USER_AGENT) && (
            <Menu.Item key="61">
              <Link href="/admin/agents">Agents</Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_USER_REQUESTER) && (
            <Menu.Item key="62">
              <Link href="/admin/requesters">Requesters</Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_USER_GROUP) && (
            <Menu.Item key="63">
              <Link href="/admin/groups">Groups</Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_USER_GUEST) && (
            <Menu.Item key="64">
              <Link href="/admin/guests">Guests</Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {hasPermission(SIDEBAR_EMPLOYEE) && (
        <SubMenu title="Karyawan" key="employee" icon={<UserCheckIconSvg />}>
          {hasPermission(SIDEBAR_EMPLOYEE_LIST) && (
            <Menu.Item key="employee-list">
              <Link href="/admin/employees">Daftar Karyawan</Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_EMPLOYEE_PAYSLIP) && (
            <Menu.Item key="employee-salary">
              <Link href="/admin/employees/payslip">Slip Gaji</Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Fitur: Roles. Modules */}
      {hasPermission(SIDEBAR_FEATURE) && (
        <SubMenu title="Fitur" key="7" icon={<FiturIconSvg />}>
          {hasPermission(SIDEBAR_FEATURE_ROLE) && (
            <Menu.Item key="71">
              <Link href="/admin/roles">Roles</Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_FEATURE_MODULE) && (
            <Menu.Item key="72">
              <Link href="/admin/modules?module=&featuredisplay=">Modules</Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Aset: Asset Types, Models, Vendors, Manufacturers, Relationship Type */}
      {hasPermission(SIDEBAR_ASSET) && (
        <SubMenu title="Aset" key="8" icon={<AsetIconSvg />}>
          {hasPermission(SIDEBAR_ASSET_TYPE) && (
            <Menu.Item key="81">
              <Link href="/admin/assets">Asset Types</Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_ASSET_MODEL) && (
            <Menu.Item key="82">
              <Link href="/admin/models">Models</Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_ASSET_VENDOR) && (
            <Menu.Item key="83">
              <Link href="/admin/vendors">Vendors</Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_ASSET_MANUFACTURER) && (
            <Menu.Item key="84">
              <Link href="/admin/manufacturers">Manufacturers</Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_ASSET_RELATIONSHIP_TYPE) && (
            <Menu.Item key="85">
              <Link href="/admin/relationships">Relationship Type</Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}
      {/* Product */}
      {hasPermission(SIDEBAR_ASSET) && (
        <SubMenu title="Katalog" key="12" icon={<KatalogIconSvg />}>
          {hasPermission(SIDEBAR_ASSET_TYPE) && (
            <Menu.Item key="113">
              <Link href="/admin/product-catalog">Product</Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}
      {/* CMS: Career. Messages */}
      {hasPermission(SIDEBAR_CMS) && (
        <SubMenu
          title="CMS"
          key="9"
          icon={<CmsNavIcon className="text-[#597e8d]" />}
        >
          {hasPermission(SIDEBAR_CMS_CAREER) && (
            <Menu.Item key="91">
              <Link href="/admin/careers">Career</Link>
            </Menu.Item>
          )}

          {hasPermission(SIDEBAR_CMS_MESSAGE) && (
            <Menu.Item key="92">
              <Link href="/admin/messages">Message</Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_CMS_FORM_SOLUTION) && (
            <Menu.Item key="93">
              <Link href="/admin/form-solution">Form Solution</Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_CMS_BLOG) && (
            <Menu.Item key="94">
              <Link href="/admin/blog">Blog</Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_CMS_PRODUCT) && (
            <Menu.Item key="95">
              <Link href="/admin/product">Product</Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Resume: Role Assessment, Daftar Kandidat */}
      {hasPermission(SIDEBAR_RESUME) && (
        <SubMenu
          title="Resume"
          key="10"
          icon={<ResumeIconSvg className="text-[#597e8d]" />}
        >
          {hasPermission(SIDEBAR_RESUME_ROLE_ASSESSMENT) && (
            <Menu.Item key="101">
              <Link href="/admin/role-assessment">Role Assessment</Link>
            </Menu.Item>
          )}

          {hasPermission(SIDEBAR_RESUME_DAFTAR_KANDIDAT) && (
            <Menu.Item key="102">
              <Link href="/admin/candidates">Daftar Kandidat</Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Recruitment Management */}
      {hasPermission(SIDEBAR_RECRUITMENT) && (
        <SubMenu
          title="Recruitment"
          key="11"
          icon={<UserPlusIconSvg className="text-[#597e8d]" />}
        >
          {hasPermission(SIDEBAR_RECRUITMENT_CAREER) && (
            <Menu.Item key="career-management">
              <Link href="/admin/career">Career Management</Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_RECRUITMENT_CANDIDATE) && (
            <Menu.Item key="111">
              <Link href="/admin/recruitment">Candidates</Link>
            </Menu.Item>
          )}

          {hasPermission(SIDEBAR_RECRUITMENT_SETUP) && (
            <Menu.Item key="112">
              <Link href="/admin/recruitment/role">Setup</Link>
            </Menu.Item>
          )}

          {hasPermission(SIDEBAR_RECRUITMENT_TALENT_POOL) && (
            <Menu.Item key="recruitment-talent-pool">
              <Link href="/admin/recruitment/talent-pool">Talent Pool</Link>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {/* Contract Management */}
      {hasPermission(SIDEBAR_CONTRACT) && (
        <SubMenu
          title="Kontrak"
          key="contract"
          icon={<ResumeIconSvg className="text-[#597e8d]" />}
        >
          {hasPermission(SIDEBAR_CONTRACT_LIST) && (
            <Menu.Item key="contract-list">
              <Link href="/admin/contracts">Kontrak</Link>
            </Menu.Item>
          )}
          {hasPermission(SIDEBAR_CONTRACT_INVOICE) && (
            <Menu.Item key="contract-invoice">
              <Link href="/admin/contracts/invoice">Invoice</Link>
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
          // borderRight: `1px solid #f0f0f0`,
          height: "100%",
          paddingInline: "14px",
        }}
      >
        {/* Sider Header (image) */}
        <div className="my-5">
          <MigsysLogo isUseText={!coll || !collsmall} />
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[sidemenu]}
          triggerSubMenuAction="hover"
          style={{
            borderRight: 0,
            paddingInline: "10px",
            // paddingLeft: "0px",
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
          <MigsysLogo isUseText={!coll || !collsmall} />
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={[sidemenu]}>
          {menuSitusContent}
          <hr className="my-3 invisible" />
          {manajemenContent}
        </Menu>
      </Sider>
    </div>
  );
};
