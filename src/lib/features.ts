/**
 * Daftar feature untuk Sidebar.
 *
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/70352909/Group+of+Features
 */
/** ------------------ Menu Situs ------------------ */
/** Attendance */
export const SIDEBAR_ATTENDANCE = "SIDEBAR_ATTENDANCE";
export const SIDEBAR_ATTENDANCE_ADMIN = "SIDEBAR_ATTENDANCE_ADMIN";
export const SIDEBAR_ATTENDANCE_FORM_ACTIVITY =
  "SIDEBAR_ATTENDANCE_FORM_ACTIVITY";
export const SIDEBAR_ATTENDANCE_MY = "SIDEBAR_ATTENDANCE_MY";

/** Dashboard */
export const SIDEBAR_DASHBOARD = "SIDEBAR_DASHBOARD";

/** Items */
export const SIDEBAR_ITEMS = "SIDEBAR_ITEMS";

/** Perusahaan */
export const SIDEBAR_COMPANY = "SIDEBAR_COMPANY";
export const SIDEBAR_COMPANY_CLIENT = "SIDEBAR_COMPANY_CLIENT";
export const SIDEBAR_COMPANY_PROFILE = "SIDEBAR_COMPANY_PROFILE";

/** Task */
export const SIDEBAR_TASK = "SIDEBAR_TASK";
export const SIDEBAR_TASK_ADMIN = "SIDEBAR_TASK_ADMIN";
export const SIDEBAR_TASK_MY = "SIDEBAR_TASK_MY";

/** Ticket */
export const SIDEBAR_TICKET = "SIDEBAR_TICKET";

/** ------------------ Manajemen ------------------ */
/** Asset */
export const SIDEBAR_ASSET = "SIDEBAR_ASSET";
export const SIDEBAR_ASSET_TYPE = "SIDEBAR_ASSET_TYPE";
export const SIDEBAR_ASSET_MANUFACTURER = "SIDEBAR_ASSET_MANUFACTURER";
export const SIDEBAR_ASSET_MODEL = "SIDEBAR_ASSET_MODEL";
export const SIDEBAR_ASSET_RELATIONSHIP_TYPE =
  "SIDEBAR_ASSET_RELATIONSHIP_TYPE";
export const SIDEBAR_ASSET_VENDOR = "SIDEBAR_ASSET_VENDOR";

/** Fitur */
export const SIDEBAR_FEATURE = "SIDEBAR_FEATURE";
export const SIDEBAR_FEATURE_MODULE = "SIDEBAR_FEATURE_MODULE";
export const SIDEBAR_FEATURE_ROLE = "SIDEBAR_FEATURE_ROLE";

/** Pengguna */
export const SIDEBAR_USER = "SIDEBAR_USER";
export const SIDEBAR_USER_AGENT = "SIDEBAR_USER_AGENT";
export const SIDEBAR_USER_REQUESTER = "SIDEBAR_USER_REQUESTER";
export const SIDEBAR_USER_GROUP = "SIDEBAR_USER_GROUP";

/** CMS */
export const SIDEBAR_CMS = "SIDEBAR_CMS";
export const SIDEBAR_CMS_CAREER = "SIDEBAR_CMS_CAREER";
export const SIDEBAR_CMS_MESSAGE = "SIDEBAR_CMS_MESSAGE";

/**
 * Daftar feature untuk halaman Attendance.
 *
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/223805455/Attendance+Management
 */
/** Attendance Form (Form Aktivitas) */
export const ATTENDANCE_FORMS_GET = "ATTENDANCE_FORMS_GET";
export const ATTENDANCE_FORM_ADD = "ATTENDANCE_FORM_ADD";
export const ATTENDANCE_FORM_GET = "ATTENDANCE_FORM_GET";
export const ATTENDANCE_FORM_UPDATE = "ATTENDANCE_FORM_UPDATE";
export const ATTENDANCE_FORM_DELETE = "ATTENDANCE_FORM_DELETE";
export const ATTENDANCE_FORM_USERS_ADD = "ATTENDANCE_FORM_USERS_ADD";
export const ATTENDANCE_FORM_USERS_REMOVE = "ATTENDANCE_FORM_USERS_REMOVE";

/** Attendance Activity */
export const ATTENDANCE_ACTIVITIES_GET = "ATTENDANCE_ACTIVITIES_GET";
export const ATTENDANCE_ACTIVITY_ADD = "ATTENDANCE_ACTIVITY_ADD";
export const ATTENDANCE_ACTIVITY_UPDATE = "ATTENDANCE_ACTIVITY_UPDATE";
export const ATTENDANCE_ACTIVITY_DELETE = "ATTENDANCE_ACTIVITY_DELETE";

/** Attendance User */
export const ATTENDANCES_USERS_GET = "ATTENDANCES_USERS_GET";
export const ATTENDANCES_USER_GET = "ATTENDANCES_USER_GET";
export const ATTENDANCE_USER_ADMIN_GET = "ATTENDANCE_USER_ADMIN_GET";
export const ATTENDANCE_USER_GET = "ATTENDANCE_USER_GET";
export const ATTENDANCE_TOGGLE_SET = "ATTENDANCE_TOGGLE_SET";
export const ATTENDANCE_ACTIVITY_USER_EXPORT =
  "ATTENDANCE_ACTIVITY_USER_EXPORT";
export const ATTENDANCE_ACTIVITY_USERS_EXPORT =
  "ATTENDANCE_ACTIVITY_USERS_EXPORT";

/**
 * Daftar feature untuk Company Profile.
 *
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/89718792/Careers
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/89653264/Messages
 */
export const CAREER_ADD = "CAREER_ADD";
export const CAREER_UPDATE = "CAREER_UPDATE";
export const CAREER_DELETE = "CAREER_DELETE";
export const MESSAGES_GET = "MESSAGES_GET";
export const MESSAGE_DELETE =
  "MESSAGE_DELETE"; /** It's not yet implemented: route `/admin/messages` */

/**
 * Daftar feature untuk Feature management.
 *
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/72876058/Feature
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/69599236/Roles
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/72810531/Module
 */
export const FEATURES_GET = "FEATURES_GET"; // routes: `/admin/features`, `/admin/modules`, `/admin/modules/update/feature/[featureId]`

/** Roles */
export const ROLES_GET = "ROLES_GET"; // routes: `/admin/agents/update/[userId]`, `/admin/agents/create`, `/admin/requesters/detail/[userId]`, `/admin/requesters/create`, `/admin/requesters/update/[userId]`, `/admin/roles/detail/[rolesId]`, `/admin/roles`
export const ROLE_GET = "ROLE_GET"; // route: `/admin/roles/update/[rolesId]`
export const ROLE_USER_FEATURES_GET = "ROLE_USER_FEATURES_GET"; // route: `/admin/roles/detail/[rolesId]`
export const ROLE_ADD = "ROLE_ADD"; // route: `/admin/roles/create`
export const ROLE_UPDATE = "ROLE_UPDATE"; // route: `/admin/roles/update/[rolesId]`
export const ROLE_DELETE = "ROLE_DELETE"; // routes: `/admin/roles/detail/[rolesId]`, `/admin/roles/update/[rolesId]`, `/admin/roles`.

/** Modules */
export const MODULES_GET = "MODULES_GET"; // routes: `/admin/modules/update/module/[moduleId]`, `/admin/modules`, `/admin/roles/create`, `/admin/roles/update/[rolesId]`
export const MODULE_ADD = "MODULE_ADD"; // routes: `/admin/modules/create/module`, `/admin/modules`
export const MODULE_UPDATE = "MODULE_UPDATE"; // routes: `/admin/modules/update/module`, `/admin/modules`
export const MODULE_DELETE = "MODULE_DELETE"; // route: `/admin/modules`
export const MODULE_FEATURES_ADD = "MODULE_FEATURES_ADD"; // route: `/admin/modules`
export const MODULE_FEATURES_DELETE = "MODULE_FEATURES_DELETE"; // route: `/admin/modules`
