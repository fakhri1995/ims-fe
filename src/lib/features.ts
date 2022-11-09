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

/** Lamaran Saya */
export const SIDEBAR_MY_APPLICATION = "SIDEBAR_MY_APPLICATION";

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
export const SIDEBAR_USER_GUEST = "SIDEBAR_USER_GUEST";

/** Karyawan */
export const SIDEBAR_EMPLOYEE = "SIDEBAR_EMPLOYEE";
export const SIDEBAR_EMPLOYEE_LIST = "SIDEBAR_EMPLOYEE_LIST";
export const SIDEBAR_EMPLOYEE_SALARY = "SIDEBAR_EMPLOYEE_SALARY";

/** CMS */
export const SIDEBAR_CMS = "SIDEBAR_CMS";
export const SIDEBAR_CMS_CAREER = "SIDEBAR_CMS_CAREER";
export const SIDEBAR_CMS_MESSAGE = "SIDEBAR_CMS_MESSAGE";

/** Resume */
export const SIDEBAR_RESUME = "SIDEBAR_RESUME";
export const SIDEBAR_RESUME_ROLE_ASSESSMENT = "SIDEBAR_RESUME_ROLE_ASSESSMENT";
export const SIDEBAR_RESUME_DAFTAR_KANDIDAT = "SIDEBAR_RESUME_DAFTAR_KANDIDAT";

/** Recruitment Management */
export const SIDEBAR_RECRUITMENT = "SIDEBAR_RECRUITMENT";
export const SIDEBAR_RECRUITMENT_CANDIDATE = "SIDEBAR_RECRUITMENT_CANDIDATE";
export const SIDEBAR_RECRUITMENT_SETUP = "SIDEBAR_RECRUITMENT_SETUP";

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
export const ROLES_GET = "ROLES_GET"; // routes: `/admin/agents/update/[userId]`, `/admin/agents/create`, `/admin/requesters/create`, `/admin/requesters/update/[userId]`, `/admin/roles`
export const ROLE_GET = "ROLE_GET"; // route: `/admin/roles/update/[rolesId]`, `/admin/roles/detail/[rolesId]`
export const ROLE_USER_FEATURES_GET = "ROLE_USER_FEATURES_GET"; // route: `/admin/roles/detail/[rolesId]`
export const ROLE_ADD = "ROLE_ADD"; // route: `/admin/roles/create`
export const ROLE_UPDATE = "ROLE_UPDATE"; // route: `/admin/roles/update/[rolesId]`
export const ROLE_DELETE = "ROLE_DELETE"; // route: `/admin/roles/detail/[rolesId]`

/** Modules */
export const MODULES_GET = "MODULES_GET"; // routes: `/admin/modules/update/module/[moduleId]`, `/admin/modules`, `/admin/roles/create`, `/admin/roles/update/[rolesId]`
export const MODULE_ADD = "MODULE_ADD"; // route: `/admin/modules/create/module`
export const MODULE_UPDATE = "MODULE_UPDATE"; // route: `/admin/modules/update/module`
export const MODULE_DELETE = "MODULE_DELETE"; // route: `/admin/modules`
export const MODULE_FEATURES_ADD = "MODULE_FEATURES_ADD"; // route: `/admin/modules`
export const MODULE_FEATURES_DELETE = "MODULE_FEATURES_DELETE"; // route: `/admin/modules`

/**
 * Daftar feature untuk Resume Builder management.
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/266174467/Assessment+Management
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/266207258/Resume+Management
 */

/** Assessment */
export const ASSESSMENT_GET = "ASSESSMENT_GET";
export const ASSESSMENTS_GET = "ASSESSMENTS_GET";
export const ASSESSMENT_ADD = "ASSESSMENT_ADD";
export const ASSESSMENT_UPDATE = "ASSESSMENT_UPDATE";
export const ASSESSMENT_DELETE = "ASSESSMENT_DELETE";
export const ASSESSMENT_COUNT_GET = "ASSESSMENT_COUNT_GET";
export const RESUME_ASSESSMENT_LIST = "RESUME_ASSESSMENT_LIST";

/** Resume */
export const RESUME_GET = "RESUME_GET";
export const RESUMES_GET = "RESUMES_GET";
export const RESUME_ADD = "RESUME_ADD";
export const RESUME_DELETE = "RESUME_DELETE";
export const RESUME_UPDATE = "RESUME_UPDATE";
export const RESUME_COUNT_GET = "RESUME_COUNT_GET";
export const RESUME_SECTION_ADD = "RESUME_SECTION_ADD";
export const RESUME_SECTION_DELETE = "RESUME_SECTION_DELETE";
export const RESUME_ASSESSMENT_UPDATE = "RESUME_ASSESSMENT_UPDATE";
export const RESUME_ASSESSMENT_ADD = "RESUME_ASSESSMENT_ADD";
export const RESUME_ASSESSMENT_DELETE = "RESUME_ASSESSMENT_DELETE";
export const RESUME_SKILL_LISTS = "RESUME_SKILL_LISTS";

/**
 * Daftar feature untuk Recruitment Management .
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/280494081/Recruitment+Management
 */

/** Recruitment Setup Menu*/
export const RECRUITMENT_SETUP_ROLE = "RECRUITMENT_SETUP_ROLE";
export const RECRUITMENT_SETUP_REGISTRATION = "RECRUITMENT_SETUP_REGISTRATION";
export const RECRUITMENT_SETUP_STAGE = "RECRUITMENT_SETUP_STAGE";
export const RECRUITMENT_SETUP_STATUS = "RECRUITMENT_SETUP_STATUS";
export const RECRUITMENT_SETUP_TEMPLATE = "RECRUITMENT_SETUP_TEMPLATE";

/** Recruitment Candidate*/
export const RECRUITMENTS_GET = "RECRUITMENTS_GET";
export const RECRUITMENT_GET = "RECRUITMENT_GET";
export const RECRUITMENT_ADD = "RECRUITMENT_ADD";
export const RECRUITMENTS_ADD = "RECRUITMENTS_ADD";
export const RECRUITMENT_UPDATE = "RECRUITMENT_UPDATE";
export const RECRUITMENT_DELETE = "RECRUITMENT_DELETE";
export const RECRUITMENTS_DELETE = "RECRUITMENTS_DELETE";
export const RECRUITMENT_COUNT_GET = "RECRUITMENT_COUNT_GET";
export const RECRUITMENT_UPDATE_STATUS = "RECRUITMENT_UPDATE_STATUS";
export const RECRUITMENT_UPDATE_STAGE = "RECRUITMENT_UPDATE_STAGE";
export const RECRUITMENT_LOG_NOTES_ADD = "RECRUITMENT_LOG_NOTES_ADD";
export const RECRUITMENT_LOG_GET = "RECRUITMENT_LOG_GET";
export const RECRUITMENT_SEND_EMAIL_TEMPLATE =
  "RECRUITMENT_SEND_EMAIL_TEMPLATE";
export const RECRUITMENT_SEND_ACCESS = "RECRUITMENT_SEND_ACCESS";
export const RECRUITMENT_DOWNLOAD_TEMPLATE = "RECRUITMENT_DOWNLOAD_TEMPLATE";
export const RECRUITMENT_PREVIEW_GET = "RECRUITMENT_PREVIEW_GET";

/** Recruitment Role */
export const RECRUITMENT_ROLES_GET = "RECRUITMENT_ROLES_GET";
export const RECRUITMENT_ROLES_LIST_GET = "RECRUITMENT_ROLES_LIST_GET";
export const RECRUITMENT_ROLE_TYPES_LIST_GET =
  "RECRUITMENT_ROLE_TYPES_LIST_GET";
export const RECRUITMENT_ROLE_GET = "RECRUITMENT_ROLE_GET";
export const RECRUITMENT_ROLE_ADD = "RECRUITMENT_ROLE_ADD";
export const RECRUITMENT_ROLE_UPDATE = "RECRUITMENT_ROLE_UPDATE";
export const RECRUITMENT_ROLE_DELETE = "RECRUITMENT_ROLE_DELETE";

/** Recruitment Stage */
export const RECRUITMENT_STAGES_GET = "RECRUITMENT_STAGES_GET";
export const RECRUITMENT_STAGES_LIST_GET = "RECRUITMENT_STAGES_LIST_GET";
export const RECRUITMENT_STAGE_GET = "RECRUITMENT_STAGE_GET";
export const RECRUITMENT_STAGE_ADD = "RECRUITMENT_STAGE_ADD";
export const RECRUITMENT_STAGE_UPDATE = "RECRUITMENT_STAGE_UPDATE";
export const RECRUITMENT_STAGE_DELETE = "RECRUITMENT_STAGE_DELETE";

/** Recruitment Jalur Daftar */
export const RECRUITMENT_JALUR_DAFTARS_GET = "RECRUITMENT_JALUR_DAFTARS_GET";
export const RECRUITMENT_JALUR_DAFTARS_LIST_GET =
  "RECRUITMENT_JALUR_DAFTARS_LIST_GET";
export const RECRUITMENT_JALUR_DAFTAR_GET = "RECRUITMENT_JALUR_DAFTAR_GET";
export const RECRUITMENT_JALUR_DAFTAR_ADD = "RECRUITMENT_JALUR_DAFTAR_ADD";
export const RECRUITMENT_JALUR_DAFTAR_UPDATE =
  "RECRUITMENT_JALUR_DAFTAR_UPDATE";
export const RECRUITMENT_JALUR_DAFTAR_DELETE =
  "RECRUITMENT_JALUR_DAFTAR_DELETE";

/** Recruitment Status */
export const RECRUITMENT_STATUSES_GET = "RECRUITMENT_STATUSES_GET";
export const RECRUITMENT_STATUSES_LIST_GET = "RECRUITMENT_STATUSES_LIST_GET";
export const RECRUITMENT_STATUS_GET = "RECRUITMENT_STATUS_GET";
export const RECRUITMENT_STATUS_ADD = "RECRUITMENT_STATUS_ADD";
export const RECRUITMENT_STATUS_UPDATE = "RECRUITMENT_STATUS_UPDATE";
export const RECRUITMENT_STATUS_DELETE = "RECRUITMENT_STATUS_DELETE";

/** Recruitment Email Template */
export const RECRUITMENT_EMAIL_TEMPLATES_GET =
  "RECRUITMENT_EMAIL_TEMPLATES_GET";
export const RECRUITMENT_EMAIL_TEMPLATES_LIST_GET =
  "RECRUITMENT_EMAIL_TEMPLATES_LIST_GET";
export const RECRUITMENT_EMAIL_TEMPLATE_GET = "RECRUITMENT_EMAIL_TEMPLATE_GET";
export const RECRUITMENT_EMAIL_TEMPLATE_ADD = "RECRUITMENT_EMAIL_TEMPLATE_ADD";
export const RECRUITMENT_EMAIL_TEMPLATE_UPDATE =
  "RECRUITMENT_EMAIL_TEMPLATE_UPDATE";
export const RECRUITMENT_EMAIL_TEMPLATE_DELETE =
  "RECRUITMENT_EMAIL_TEMPLATE_DELETE";

/**
 * Daftar feature untuk Employee Management.
 * @see
 */

/** Employee List */
export const EMPLOYEES_GET = "EMPLOYEES_GET";
export const EMPLOYEE_GET = "EMPLOYEE_GET";
export const EMPLOYEE_ADD = "EMPLOYEE_ADD";
export const EMPLOYEE_UPDATE = "EMPLOYEE_UPDATE";
export const EMPLOYEE_DELETE = "EMPLOYEE_DELETE";

/** Employee Salary */
export const EMPLOYEE_SALARIES_GET = "EMPLOYEE_SALARIES_GET";
export const EMPLOYEE_SALARY_GET = "EMPLOYEE_SALARY_GET";
export const EMPLOYEE_SALARY_ADD = "EMPLOYEE_SALARY_ADD";
export const EMPLOYEE_SALARY_UPDATE = "EMPLOYEE_SALARY_UPDATE";
export const EMPLOYEE_SALARY_DELETE = "EMPLOYEE_SALARY_DELETE";

/**
 * Daftar feature untuk User Management.
 *
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/72187905/User+Management
 */
/**
 * /getFilterUsers | UserService.filterUsers
 *
 * - [x] components/drawer/tasks/drawerTaskUpdate
 *
 * - [x] components/drawer/tickets/drawerTicketExports
 * - [x] components/drawer/tickets/drawerTicketUpdate
 *
 * - [ ] components/screen/form-aktivitas/DetailAktivitas/AktivitasUserListEditableCard
 *
 * - [x] /admin/groups/update/agents/[groupId]
 * - [x] /admin/groups/create/agents
 */
export const USERS_GET = "USERS_GET";
/**
 * /getFilterGroups
 *
 * - [x] components/drawer/tasks/drawerTaskUpdate
 * - [x] components/drawer/tickets/drawerTicketExports
 */
export const GROUPS_GET = "GROUPS_GET";

/**
 * /getAgentList
 *
 * - [x] /admin/agents
 */
export const AGENTS_GET = "AGENTS_GET";
/**
 * /getAgentDetail
 *
 * - [x] /admin/agents/update/[userId]
 * - [x] /admin/agents/detail/[userId]
 */
export const AGENT_GET = "AGENT_GET";
/**
 * /addAgentMember
 *
 * - [x] /admin/agents/create
 * - [x] /admin/agents
 */
export const AGENT_ADD = "AGENT_ADD";
/**
 * /updateAgentDetail
 *
 * - [x] /admin/agents/update/[userId]
 * - [x] /admin/agents/detail/[userId]
 */
export const AGENT_UPDATE = "AGENT_UPDATE";
/**
 * /changeAgentPassword
 *
 * - [x] /admin/agents/password/[userId]
 * - [x] /admin/agents/detail/[userId]
 */
export const AGENT_PASSWORD_UPDATE = "AGENT_PASSWORD_UPDATE";
/**
 * /agentActivation
 *
 * - [x] /admin/agents/detail/[userId]
 */
export const AGENT_STATUS = "AGENT_STATUS";
/**
 * /deleteAgent
 *
 * - [x] /admin/agents/detail/[userId]
 */
export const AGENT_DELETE = "AGENT_DELETE";
/**
 * /getAgentGroups
 *
 * - [x] /admin/groups
 * - [x] /admin/groups/update/agents/[groupsId]
 */
export const AGENT_GROUPS_GET = "AGENT_GROUPS_GET";
/**
 * /getAgentGroup
 *
 * - There is no implementation on the client-side for this feature.
 */
export const AGENT_GROUP_GET = "AGENT_GROUP_GET";
/**
 * /addAgentGroup
 *
 * - [x] /admin/groups/create/agents
 * - [x] /admin/groups
 */
export const AGENT_GROUP_ADD = "AGENT_GROUP_ADD";
/**
 * /updateAgentGroup
 *
 * - [x] /admin/groups/update/agents/[groupsId]
 * - [x] /admin/groups
 */
export const AGENT_GROUP_UPDATE = "AGENT_GROUP_UPDATE";
/**
 * /deleteAgentGroup
 *
 * - [x] /admin/groups
 */
export const AGENT_GROUP_DELETE = "AGENT_GROUP_DELETE";

/**
 * /getRequesterList
 *
 * - [x] /admin/groups/update/requesters/[groupsId]
 * - [x] /admin/groups/create/requesters
 * - [x] /admin/requesters
 */
export const REQUESTERS_GET = "REQUESTERS_GET";
/**
 * /getRequesterDetail
 *
 * - [x] /admin/requesters/detail/[userId]
 * - [x] /admin/requesters/update/[userId]
 */
export const REQUESTER_GET = "REQUESTER_GET";
/**
 * /addRequesterMember
 *
 * - [x] /admin/requesters/create
 * - [x] /admin/requesters
 */
export const REQUESTER_ADD = "REQUESTER_ADD";
/**
 * /updateRequesterDetail
 *
 * - [x] /admin/requesters/update/[userId]
 * - [x] /admin/requesters/detail/[userId]
 */
export const REQUESTER_UPDATE = "REQUESTER_UPDATE";
/**
 * /changeRequesterPassword
 *
 * - [x] /admin/requesters/detail/[userId]
 * - [x] /admin/requesters/password/[userId]
 */
export const REQUESTER_PASSWORD_UPDATE = "REQUESTER_PASSWORD_UPDATE";
/**
 * /requesterActivation
 *
 * - [x] /admin/requesters/detail/[userId]
 */
export const REQUESTER_STATUS = "REQUESTER_STATUS";
/**
 * /deleteRequester
 *
 * - [x] /admin/requesters/detail/[userId]
 */
export const REQUESTER_DELETE = "REQUESTER_DELETE";
/**
 * /getRequesterGroups
 *
 * - [x] /admin/groups
 * - [x] /admin/groups/update/requesters/[groupsId]
 */
export const REQUESTER_GROUPS_GET = "REQUESTER_GROUPS_GET";
/**
 * /addRequesterGroup
 *
 * - [x] /admin/groups/create/requesters
 * - [x] /admin/groups
 */
export const REQUESTER_GROUP_ADD = "REQUESTER_GROUP_ADD";
/**
 * /getRequesterGroup
 *
 * - [x] /admin/groups/update/requesters/[groupId]
 */
export const REQUESTER_GROUP_GET = "REQUESTER_GROUP_GET";
/**
 * /updateRequesterGroup
 *
 * - [x] /admin/groups/update/requesters/[groupsId]
 * - [x] /admin/groups
 */
export const REQUESTER_GROUP_UPDATE = "REQUESTER_GROUP_UPDATE";
/**
 * /deleteRequesterGroup
 *
 * - [x] /admin/groups
 */
export const REQUESTER_GROUP_DELETE = "REQUESTER_GROUP_DELETE";

/** User Management - Guests */
export const GUESTS_GET = "GUESTS_GET";
export const GUEST_GET = "GUEST_GET";
export const GUEST_ADD = "GUEST_ADD";
export const GUEST_STATUS = "GUEST_STATUS";
export const GUEST_PASSWORD_UPDATE = "GUEST_PASSWORD_UPDATE";
export const GUEST_UPDATE = "GUEST_UPDATE";
export const GUEST_DELETE = "GUEST_DELETE";

/**
 * Daftar feature untuk Company management.
 *
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/67076466/Company+Management
 */
/**
 * /getAllCompanyList
 *
 * - [x] components/screen/ticket/detail/TicketDetailTaskCreateDrawer
 * - [x] components/screen/ticket/detail/TicketDetailTaskList
 * - [x] components/drawer/tasks/drawerTaskUpdate
 * - [x] components/drawer/tasks/drawerTaskCreate
 *
 * - [x] pages/tasks/mytask
 * - [x] pages/tasks/admin
 */
export const COMPANY_LISTS_GET = "COMPANY_LISTS_GET";
/**
 * /getBranchCompanyList
 *
 * - [ ] components/drawer/companies/mycompany/drawerMyCompanyLokasiCreate
 * - [ ] components/drawer/companies/drawerSubLokasi
 *
 * - [x] pages/company/myCompany/locations
 *
 * - [x] pages/admin/agents
 * - [x] pages/admin/agents/create
 * - [ ] pages/admin/agents/update/[userId]
 */
export const COMPANY_BRANCHS_GET = "COMPANY_BRANCHS_GET";
/**
 * /getCompanyClientList
 * /getClientCompanyList
 *
 * - [x] pages/items/create
 *
 * - [x] pages/admin/requesters
 *
 * - [x] pages/company/clients
 * - [x] pages/company/clients/locations
 *
 * - [x] pages/items/update/[itemId]
 */
export const COMPANY_CLIENTS_GET = "COMPANY_CLIENTS_GET";

/**
 * /getCompanyRelationshipInventory
 *
 * - [ ] componets/table/tableCustom
 *
 * - [x] pages/company/clients/[companyId]
 * - [x] pages/company/myCompany
 */
export const COMPANY_RELATIONSHIP_INVENTORIES_GET =
  "COMPANY_RELATIONSHIP_INVENTORIES_GET";
/**
 * /getCompanyInventories
 *
 * - [ ] components/table/tableCustom
 *
 * - [x] pages/company/clients/locations/[locId]
 * - [x] pages/company/myCompany/locations/[locId]
 */
export const COMPANY_INVENTORIES_GET = "COMPANY_INVENTORIES_GET";

/**
 * /getMainLocations
 *
 * - [x] pages/company/myCompany
 * - [x] pages/company/myCompany/locations
 */
export const COMPANY_MAIN_LOCATIONS_GET = "COMPANY_MAIN_LOCATIONS_GET";
/**
 * /getLocations
 *
 * - [x] pages/admin/requesters/update/[userId]
 * - [x] pages/admin/requesters
 *
 * - [x] pages/company/myCompany
 * - [x] pages/company/myCompany/locations/[locId]
 * - [x] pages/company/myCompany/locations
 * - [x] pages/company/clients/locations/[locId]
 * - [x] pages/company/clients/locations
 */
export const COMPANY_LOCATIONS_GET = "COMPANY_LOCATIONS_GET";
/**
 * /getSubLocations
 *
 * - [x] pages/items/create
 * - [x] pages/items/update/[itemId]
 *
 * - [x] components/screen/ticket/detail/TicketDetailTaskCreateDrawer
 * - [ ] components/modal/modalCustom
 * - [x] components/drawer/tasks/drawerTaskCreate
 * - [x] components/drawer/tasks/drawerTaskUpdate
 */
export const COMPANY_SUB_LOCATIONS_GET = "COMPANY_SUB_LOCATIONS_GET";

/**
 * /getCompanyDetail
 *
 * - [x] pages/company/myCompany
 * - [x] pages/company/clients/[companyId]
 */
export const COMPANY_DETAIL_GET = "COMPANY_DETAIL_GET";
/**
 * /getSubCompanyDetail?id
 *
 * - [x] pages/company/myCompany/locations/[locId]
 *
 * - [x] pages/company/clients/locations/[locId]
 */
export const COMPANY_SUB_DETAIL_GET = "COMPANY_SUB_DETAIL_GET";
/**
 * /getSubCompanyProfile
 *
 * - [x] pages/company/clients/locations
 * - [x] pages/company/myCompany/locations
 */
export const COMPANY_SUB_PROFILE_GET = "COMPANY_SUB_PROFILE_GET";

/**
 * /getCompanyLog
 *
 * - [x] pages/company/myCompany
 * - [x] pages/company/clients/[companyId]
 */
export const COMPANY_LOG_GET = "COMPANY_LOG_GET";

/**
 * /companyActivation
 *
 * - [x] pages/company/clients/[companyId]
 */
export const COMPANY_STATUS = "COMPANY_STATUS";
/**
 * /updateCompany
 *
 * - [x] pages/company/clients/[companyId]
 * - [x] pages/company/clients/locations/[locId]
 *
 * - [x] pages/company/myCompany/locations/[locId]
 */
export const COMPANY_UPDATE = "COMPANY_UPDATE";
/**
 * /deleteCompany
 *
 * - [x] pages/company/clients/locations/[locId]
 * - [x] pages/company/myCompany/locations/[locId]
 */
export const COMPANY_DELETE = "COMPANY_DELETE";

/**
 * /updateMainCompany
 *
 * - [x] pages/company/myCompany
 */
export const COMPANY_MAIN_UPDATE = "COMPANY_MAIN_UPDATE";

/**
 * /addCompanyBranch
 *
 * - [ ] components/drawer/companies/mycompany/drawerMyCompanyLokasiCreate
 * - [x] pages/company/myCompany/locations
 */
export const COMPANY_BRANCH_ADD = "COMPANY_BRANCH_ADD";
/**
 * /addCompanyClient
 *
 * - [x] pages/company/clients
 * - [x] pages/company/clients/locations
 *
 * - [ ] components/drawer/companies/clients/drawerClientCompanyLokasiCreate
 * - [ ] components/drawer/companies/clients/drawerClientCompanyCreate
 */
export const COMPANY_CLIENT_ADD = "COMPANY_CLIENT_ADD";
/**
 * /addCompanySub
 *
 * - [ ] components/drawer/companies/drawerSubLokasi
 *
 * - [x] company/myCompany/locations/[locId]
 * - [x] company/clients/locations/[locId]
 */
export const COMPANY_SUB_ADD = "COMPANY_SUB_ADD";

/**
 * /getMainBanks
 *
 * - [x] pages/company/myCompany
 */
export const COMPANY_MAIN_BANKS_GET = "COMPANY_MAIN_BANKS_GET";
/**
 * /addMainBank
 *
 * - [ ] components/drawer/companies/mycompany/drawerMyCompanyBankCreate
 * - [x] pages/company/myCompany
 */
export const COMPANY_MAIN_BANK_ADD = "COMPANY_MAIN_BANK_ADD";
/**
 * /updateMainBank
 *
 * - [x] pages/company/myCompany
 */
export const COMPANY_MAIN_BANK_UPDATE = "COMPANY_MAIN_BANK_UPDATE";
/**
 * /deleteMainBank
 *
 * - [x] pages/company/myCompany
 */
export const COMPANY_MAIN_BANK_DELETE = "COMPANY_MAIN_BANK_DELETE";

/**
 * /getClientBanks
 *
 * - [x] pages/company/clients/[companyId]
 */
export const COMPANY_CLIENT_BANKS_GET = "COMPANY_CLIENT_BANKS_GET";
/**
 * /addClientBank
 *
 * - [ ] components/drawer/companies/clients/drawerClientCompanyBankCreate
 *
 * - [x] pages/company/clients/[companyId]
 */
export const COMPANY_CLIENT_BANK_ADD = "COMPANY_CLIENT_BANK_ADD";
/**
 * /updateClientBank
 *
 * - [x] pages/company/clients/[companyId]
 */
export const COMPANY_CLIENT_BANK_UPDATE = "COMPANY_CLIENT_BANK_UPDATE";
/**
 * /deleteClientBank
 *
 * - [x] pages/company/clients/[companyId]
 */
export const COMPANY_CLIENT_BANK_DELETE = "COMPANY_CLIENT_BANK_DELETE";

/**
 * Daftar feature untuk Asset management.
 *
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/67076627/Asset+Management
 */
/**
 * /getAssets
 *
 * - [x] pages/items/index
 * - [x] pages/items/detail/[itemId]
 * - [x] pages/items/createpart/[itemId]
 *
 * - [x] pages/tickets/detail/[ticketId]
 *
 * - [x] pages/admin/assets/index
 * - [x] pages/admin/assets/update/[assettypeId]
 * - [x] pages/admin/assets/detail/[assettypeId]
 * - [x] pages/admin/assets/create/index
 *
 * - [x] pages/admin/models/index
 * - [x] pages/admin/models/create/index
 * - [x] pages/admin/models/update2/[modelId]
 *
 * - [x] components/drawer/tickets/drawerTicketConnectItem
 */
export const ASSETS_GET = "ASSETS_GET";
/**
 * /getAsset
 *
 * - [x] pages/admin/assets/update/[assettypeId]
 * - [x] pages/admin/assets/detail/[assettypeId]
 *
 * - [x] pages/admin/models/update2/[modelId]
 * - [x] pages/admin/models/create/index
 *
 * - [ ] pages/items/index
 * - [ ] pages/items/detail/[itemId]
 * - [ ] pages/items/createpart/[itemId]
 *
 * - [ ] components/drawer/tickets/drawerTicketConnectItem
 */
export const ASSET_GET = "ASSETS_GET";
/**
 * /addAsset
 *
 * - [x] pages/admin/assets/index
 * - [x] pages/admin/assets/create/index
 */
export const ASSET_ADD = "ASSET_ADD";
/**
 * /updateAsset
 *
 * - [x] pages/admin/assets/update/[assettypeId]
 * - [x] pages/admin/assets/detail/[assettypeId]
 */
export const ASSET_UPDATE = "ASSET_UPDATE";
/**
 * /deleteAsset
 *
 * - [x] pages/admin/assets/detail/[assettypeId]
 */
export const ASSET_DELETE = "ASSET_DELETE";

/**
 * /getVendors
 *
 * - [x] pages/admin/vendors/index
 */
export const VENDORS_GET = "VENDORS_GET";
/**
 * /addVendor
 *
 * - [x] pages/admin/vendors/index
 */
export const VENDOR_ADD = "VENDOR_ADD";
/**
 * /updateVendor
 *
 * - [x] pages/admin/vendors/index
 */
export const VENDOR_UPDATE = "VENDOR_UPDATE";
/**
 * /deleteVendor
 *
 * - [x] pages/admin/vendors/index
 */
export const VENDOR_DELETE = "VENDOR_DELETE";

/**
 * /getManufacturers
 *
 * - [x] pages/admin/manufacturers/index
 *
 * - [x] pages/admin/models/create/index
 * - [x] pages/admin/models/update2/[modelId]
 */
export const MANUFACTURERS_GET = "MANUFACTURERS_GET";
/**
 * /addManufacturer
 *
 * - [x] pages/admin/models/update2/[modelId]
 * - [x] pages/admin/models/create/index
 *
 * - [x] pages/admin/manufacturers/index
 */
export const MANUFACTURER_ADD = "MANUFACTURER_ADD";
/**
 * /updateManufacturer
 *
 * - [x] pages/admin/manufacturers/index
 */
export const MANUFACTURER_UPDATE = "MANUFACTURER_UPDATE";
/**
 * /deleteManufacturer
 *
 * - [x] pages/admin/manufacturers/index
 */
export const MANUFACTURER_DELETE = "MANUFACTURER_DELETE";

/**
 * /getRelationships
 *
 * - [x] pages/items/detail/[itemId]
 *
 * - [ ] pages/company/myCompany/index
 *
 * - [x] pages/admin/relationships/index
 *
 * - [ ] components/drawer/companies/mycompany/drawerMyCompanyRelasiUpdate
 * - [ ] components/drawer/companies/mycompany/drawerMyCompanyRelasiCreate
 */
export const RELATIONSHIPS_GET = "RELATIONSHIPS_GET";
/**
 * /addRelationship
 *
 * - [ ] pages/items/detail/[itemId]
 *
 * - [ ] pages/items/createrelationship/[itemId]
 *
 * - [x] pages/admin/relationships/index
 *
 * - [ ] components/drawer/companies/mycompany/drawerMyCompanyRelasiCreate
 */
export const RELATIONSHIP_ADD = "RELATIONSHIP_ADD";
/**
 * /updateRelationship
 *
 * - [x] pages/admin/relationships/index
 *
 * - [ ] pages/company/myCompany/index
 *
 * - [ ] components/drawer/companies/mycompany/drawerMyCompanyRelasiUpdate
 */
export const RELATIONSHIP_UPDATE = "RELATIONSHIP_UPDATE";
/**
 * /deleteRelationship
 *
 * - [ ] pages/items/detail/[itemId]
 *
 * - [ ] pages/company/myCompany/index
 *
 * - [x] pages/admin/relationships/index
 */
export const RELATIONSHIP_DELETE = "RELATIONSHIP_DELETE";

/**
 * /getModels
 * /getFilterModels
 *
 * - [x] pages/admin/assets/detail/[assettypeId]
 *
 * - [x] pages/items/index
 * - [x] pages/items/detail/[itemId]
 * - [x] pages/items/createpart/[itemId]
 * - [x] pages/items/update/[itemId]
 * - [x] pages/items/create/index
 *
 * - [x] pages/admin/models/index
 * - [x] pages/admin/models/update2/[modelId]
 *
 * - [ ] pages/admin/assets/detail/[assettypeId]
 *
 * - [ ] hooks/api/models
 */
export const MODELS_GET = "MODELS_GET";
/**
 * /getModel
 *
 * - [ ] components/screen/models/CreateConfigurationPart/InputPart
 *
 * - [x] pages/items/create/index
 *
 * - [x] pages/admin/models/detail/[modelId]
 * - [x] pages/admin/models/update2/[modelId]
 */
export const MODEL_GET = "MODEL_GET";
/**
 * /addModel
 *
 * - [x] pages/admin/models/update2/[modelId]
 * - [x] pages/admin/models/create/index
 * - [x] pages/admin/models/index
 *
 * - [ ] components/screen/models/CreateConfigurationPart/index
 * - [ ] components/screen/models/CreateConfigurationPart/CreateConfigurationPart
 */
export const MODEL_ADD = "MODEL_ADD";
/**
 * /updateModel
 *
 * - [x] pages/admin/models/detail/[modelId]
 * - [x] pages/admin/models/update2/[modelId]
 */
export const MODEL_UPDATE = "MODEL_UPDATE";
/**
 * /deleteModel
 *
 * - [x] pages/admin/models/detail/[modelId]
 */
export const MODEL_DELETE = "MODEL_DELETE";

/**
 * Daftar feature untuk Inventory management.
 *
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/67076719/Inventori
 */
/**
 * /getInventories
 *
 * - [x] pages/items/index
 *
 * - [x] pages/tickets/detail/[ticketId]
 *
 * - [x] components/screen/ticket/detail/TicketDetailTaskCreateDrawer
 * - [x] components/drawer/tickets/drawerTicketConnectItem
 * - [x] components/drawer/tasks/drawerTaskCreate
 * - [x] components/drawer/tasks/drawerTaskUpdate
 */
export const INVENTORIES_GET = "INVENTORIES_GET";
/**
 * /getInventoryRelations
 * /getInventory
 *
 * - [x] pages/items/index
 * - [x] pages/items/createpart/[itemId]
 * - [x] pages/items/create/index
 * - [x] pages/items/detail/[itemId]
 * - [x] pages/items/update/[itemId]
 *
 * - [ ] pages/admin/contracts/[contractId]
 */
export const INVENTORY_GET = "INVENTORY_GET";
/**
 * /addInventory
 *
 * - [x] pages/items/index
 * - [x] pages/items/create/index
 * - [ ] pages/items/createpart/[itemId]
 * - [ ] pages/items/detail/[itemId]
 */
export const INVENTORY_ADD = "INVENTORY_ADD";
/**
 * /updateInventory
 *
 * - [x] pages/items/update/[itemId]
 * - [x] pages/items/detail/[itemId]
 */
export const INVENTORY_UPDATE = "INVENTORY_UPDATE";
/**
 * /deleteInventory
 *
 * - [x] pages/items/detail/[itemId]
 */
export const INVENTORY_DELETE = "INVENTORY_DELETE";
/**
 * /addInventoryNotes
 *
 * - [x] pages/items/detail/[itemId]
 */
export const INVENTORY_NOTES_ADD = "INVENTORY_NOTES_ADD";
/**
 * /changeStatusUsage
 * /getChangeStatusUsageDetailList
 *
 *
 * - [x] pages/items/detail/[itemId]
 */
export const INVENTORY_STATUS_USAGE = "INVENTORY_STATUS_USAGE";
/**
 * /changeStatusCondition
 *
 * - [x] pages/items/detail/[itemId]
 */
export const INVENTORY_STATUS_CONDITION = "INVENTORY_STATUS_CONDITION";
/**
 * /getInventoryAddable
 * /addInventoryParts
 *
 * - [x] pages/items/createpart/[itemId]
 * - [x] pages/items/detail/[itemId]
 */
export const INVENTORY_PARTS_ADD = "INVENTORY_PARTS_ADD";
/**
 * /removeInventoryPart
 *
 * - [x] pages/items/detail/[itemId]
 */
export const INVENTORY_PART_REMOVE = "INVENTORY_PART_REMOVE";
/**
 * /replaceInventoryPart
 * /getInventoryReplacements
 *
 * - [x] pages/items/detail/[itemId]
 */
export const INVENTORY_PART_REPLACE = "INVENTORY_PART_REPLACE";
/**
 * /getActivityInventoryLogs
 *
 * - [x] pages/items/detail/[itemId]
 */
export const INVENTORY_LOG_GET = "INVENTORY_LOG_GET";
export const INVENTORY_IMPORT = "INVENTORY_IMPORT";
export const RELATIONSHIP_INVENTORY_GET = "RELATIONSHIP_INVENTORY_GET";
export const AGENT_RELATIONSHIP_INVENTORY_GET =
  "AGENT_RELATIONSHIP_INVENTORY_GET";
export const REQUESTER_RELATIONSHIP_INVENTORY_GET =
  "REQUESTER_RELATIONSHIP_INVENTORY_GET";
/**
 * /getRelationshipInventory
 * /getRelationshipInventoryRelation
 * /getRelationshipInventoryDetailList
 *
 * - [x] pages/items/detail/[itemId]
 *
 * - [ ] pages/company/myCompany/index
 *
 * - [ ] components/drawer/companies/mycompany/drawerMyCompanyRelasiCreate
 * - [ ] components/drawer/companies/mycompany/drawerMyCompanyRelasiUpdate
 */
export const COMPANY_RELATIONSHIP_INVENTORY_GET =
  "COMPANY_RELATIONSHIP_INVENTORY_GET";
/**
 * /addRelationshipInventories
 *
 * - [x] pages/items/detail/[itemId]
 *
 * - [ ] components/drawer/companies/mycompany/drawerMyCompanyRelasiCreate
 */
export const RELATIONSHIP_INVENTORY_ADD = "RELATIONSHIP_INVENTORY_ADD";
export const RELATIONSHIP_INVENTORY_UPDATE = "RELATIONSHIP_INVENTORY_UPDATE";
/**
 * /deleteRelationshipInventory
 *
 * - [x] pages/items/detail/[itemId]
 */
export const RELATIONSHIP_INVENTORY_DELETE = "RELATIONSHIP_INVENTORY_DELETE";

/**
 * Daftar feature untuk Ticket management.
 *
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/67077022/Ticket+Management
 */
export const TICKET_TASK_STATUS_COUNTS_GET = "TICKET_TASK_STATUS_COUNTS_GET";
/**
 * /updateStatusTicket
 *
 * - [x] pages/tickets/detail/[ticketId]
 * - [ ] components/screen/ticket/detail/TicketDetailUpdateStatusModal
 */
export const TICKET_STATUS_UPDATE = "TICKET_STATUS_UPDATE";
/**
 * /addTicket
 *
 * - [x] components/drawer/tickets/drawerTicketCreate
 */
export const TICKET_ADD = "TICKET_ADD";
/**
 * /getClientTickets
 * /getClientTicketStatusCounts
 *
 * - [x] pages/tickets/index
 *
 * - [x] components/table/tableCustom
 */
export const TICKETS_CLIENT_GET = "TICKETS_CLIENT_GET";
export const TICKETS_CLIENT_CLOSED_GET = "TICKETS_CLIENT_CLOSED_GET";
/**
 * /getClientTicketRelation
 *
 * - [x] pages/tickets/index
 * - [x] pages/tickets/histories/index
 * - [x] pages/tickets/detail/[ticketId]
 *
 * - [x] components/drawer/tickets/drawerTicketCreate
 */
export const TICKET_CLIENT_GET = "TICKET_CLIENT_GET";
/**
 * /getClientTicketLog
 *
 * - [x] components/screen/ticket/detail/TicketDetailCatatanCard
 * - [x] pages/tickets/detail/[ticketId]
 */
export const TICKET_CLIENT_LOG_GET = "TICKET_CLIENT_LOG_GET";
export const TICKET_CLIENT_CANCEL = "TICKET_CLIENT_CANCEL";
/**
 * /clientAddNoteTicket
 *
 * - [x] components/screen/ticket/detail/TicketDetailCatatanCard
 */
export const TICKET_CLIENT_NOTE_ADD = "TICKET_CLIENT_NOTE_ADD";
/**
 * /clientUpdateNoteTicket
 *
 * - [x] components/screen/ticket/detail/TicketDetailCatatanCard
 */
export const TICKET_CLIENT_NOTE_UPDATE = "TICKET_CLIENT_NOTE_UPDATE";
/**
 * /clientDeleteNoteTicket
 *
 * - [x] components/screen/ticket/detail/TicketDetailCatatanCard
 */
export const TICKET_CLIENT_NOTE_DELETE = "TICKET_CLIENT_NOTE_DELETE";
/**
 * /clientTicketExport
 *
 * - [x] pages/tickets/detail/[ticketId]
 */
export const TICKET_CLIENT_EXPORT = "TICKET_CLIENT_EXPORT";
/**
 * /getTickets
 * /getTicketStatusCounts
 *
 * - [x] pages/tickets/index
 *
 * - [x] components/table/tableCustom
 * - [x] components/drawer/tasks/drawerTaskCreate
 * - [x] components/drawer/tasks/drawerTaskUpdate
 */
export const TICKETS_GET = "TICKETS_GET";
/**
 * /getClosedTickets
 *
 * - [x] pages/tickets/histories/index
 */
export const TICKETS_CLOSED_GET = "TICKETS_CLOSED_GET";
/**
 * /getTicketRelation
 *
 * - [x] pages/tickets/index
 * - [x] pages/tickets/detail/[ticketId]
 * - [x] pages/tickets/histories/index
 *
 * - [ ] pages/tasks/index
 *
 * - [x] components/screen/ticket/detail/TicketDetailTaskList
 *
 * - [x] components/drawer/tickets/drawerTicketUpdate
 * - [x] components/drawer/tickets/drawerTicketTypeUpdate
 * - [x] components/drawer/tickets/drawerTicketCreate
 * - [x] components/drawer/tickets/drawerTicketTypeCreate
 */
export const TICKET_GET = "TICKET_GET";
/**
 * /getTicketLog
 *
 * - [x] components/screen/ticket/detail/TicketDetailCatatanCard
 * - [x] pages/tickets/detail/[ticketId]
 */
export const TICKET_LOG_GET = "TICKET_LOG_GET";
export const TICKET_CANCEL = "TICKET_CANCEL";
/**
 * /updateTicket
 *
 * - [] pages/tickets/tickettypes/index
 * - [x] pages/tickets/detail/[ticketId]
 *
 * - [x] components/screen/ticket/detail/TicketDetailTaskCreateDrawer
 * - [x] components/drawer/tickets/drawerTicketUpdate
 * - [] components/drawer/tickets/drawerTicketTypeUpdate
 */
export const TICKET_UPDATE = "TICKET_UPDATE";
/**
 * /getAssignToList
 *
 * - [x] components/screen/ticket/detail/TicketDetailTaskCreateDrawer
 * - [x] components/drawer/tasks/drawerTaskCreate
 * - [ ] components/drawer/tickets/drawerTicketAssign
 */
export const TICKET_ASSIGN = "TICKET_ASSIGN";
/**
 * /setItemTicket
 *
 * - [x] components/drawer/tickets/drawerTicketConectItem
 * - [x] pages/tickets/detail/[ticketId]
 */
export const TICKET_ITEM_SET = "TICKET_ITEM_SET";
/**
 * /setDeadline
 *
 * - [x] src/components/drawer/tickets/drawerTicketDeadline
 * - [x] pages/tickets/detail/[ticketId]
 */
export const TICKET_DEADLINE_SET = "TICKET_DEADLINE_SET";
/**
 * /addNoteTicket
 *
 * - [x] components/screen/ticket/detail/TicketDetailCatatanCard
 */
export const TICKET_NOTE_ADD = "TICKET_NOTE_ADD";
/**
 * /updateNoteTicket
 *
 * - [x] components/screen/ticket/detail/TicketDetailCatatanCard
 */
export const TICKET_NOTE_UPDATE = "TICKET_NOTE_UPDATE";
/**
 * /deleteNoteTicket
 *
 * - [x] components/screen/ticket/detail/TicketDetailCatatanCard
 */
export const TICKET_NOTE_DELETE = "TICKET_NOTE_DELETE";
/**
 * /ticketExport
 *
 * - [x] pages/tickets/detail/[ticketId]
 */
export const TICKET_EXPORT = "TICKET_EXPORT";
/**
 * /ticketsExport
 *
 * - [x] components/drawer/tickets/drawerTicketExports
 */
export const TICKETS_EXPORT = "TICKETS_EXPORT";

/**
 * /getTicketDetailTypes
 *
 * - [x] pages/tickets/tickettypes/index
 */
export const TICKET_DETAIL_TYPES_GET = "TICKET_DETAIL_TYPES_GET";
/**
 * /addTicketDetailType
 *
 * - [x] components/drawer/tickets/drawerTicketTypeCreate
 */
export const TICKET_DETAIL_TYPE_ADD = "TICKET_DETAIL_TYPE_ADD";
/**
 * /updateTicketDetailType
 *
 * - [x] components/drawer/tickets/drawerTicketTypeUpdate
 */
export const TICKET_DETAIL_TYPE_UPDATE = "TICKET_DETAIL_TYPE_UPDATE";
/**
 * /deleteTicketDetailType
 *
 * - [x] pages/tickets/tickettypes/index
 */
export const TICKET_DETAIL_TYPE_DELETE = "TICKET_DETAIL_TYPE_DELETE";

/**
 * /getTasks
 *
 * - [x] pages/tasks/admin
 *
 * - [ ] components/table/tableCustom
 */
export const TASKS_GET = "TASKS_GET";
/**
 * /getTaskPickList
 *
 * - [x] pages/tasks/mytask/index
 * - [] components/table/tableCustom
 */
export const TASK_PICK_LIST_GET = "TASK_PICK_LIST_GET";
/**
 * /getTask
 *
 * - [x] pages/tasks/detail/[taskId]
 */
export const TASK_GET = "TASK_GET";
/**
 * /addTask
 *
 * - [x] pages/tasks/admin
 *
 * - [x] components/screen/ticket/detail/TicketDetailTaskCreateDrawer
 * - [x] components/screen/ticket/detail/TicketDetailTaskList
 *
 * - [x] components/drawer/tasks/drawerTaskCreate
 * - [] components/drawer/tasks/drawerTaskTypesCreate
 * - [] components/drawer/tasks/drawerTaskDetailCreate
 */
export const TASK_ADD = "TASK_ADD";
/**
 * /updateTask
 *
 * - [x] components/drawer/tasks/drawerTaskUpdate
 *
 * - [x] pages/tasks/detail/[taskId]
 */
export const TASK_UPDATE = "TASK_UPDATE";
/**
 * /deleteTask
 *
 * - [x] pages/tasks/detail/[taskId]
 */
export const TASK_DELETE = "TASK_DELETE";
/**
 * /saveFilesTask
 *
 * - [x] pages/tasks/detail/[taskId]
 */
export const TASK_FILES_SAVE = "TASK_FILES_SAVE";
/**
 * /changeStatusToggle
 *
 * - [x] pages/tasks/detail/[taskId]
 */
export const TASK_STATUS_TOGGLE = "TASK_STATUS_TOGGLE";
/**
 * /changeAttendanceToggle
 *
 * - [x] pages/tasks/detail/[taskId]
 */
export const TASK_ATTENDANCE_TOGGLE = "TASK_ATTENDANCE_TOGGLE";
/**
 * /submitTask
 *
 * - [x] pages/tasks/detail/[taskId]
 */
export const TASK_SUBMIT = "TASK_SUBMIT";
/**
 * /declineTask
 *
 * - [x] pages/tasks/detail/[taskId]
 */
export const TASK_DECLINE = "TASK_DECLINE";
/**
 * /approveTask
 *
 * - [x] pages/tasks/detail/[taskId]
 */
export const TASK_APPROVE = "TASK_APPROVE";
/**
 * /assignSelfTask
 *
 * - [x] pages/tasks/mytask/index
 */
export const TASK_ASSIGN_SELF = "TASK_ASSIGN_SELF";
/**
 * /getFilterTaskTypes
 *
 * - [x] components/screen/ticket/detail/TicketDetailTaskCreateDrawer
 * - [x] components/screen/ticket/detail/TicketDetailTaskList
 *
 * - [x] pages/tasks/mytask/index
 * - [x] pages/tasks/admin/index
 * - [x] pages/tasks/tasktypes
 *
 * - [x] components/drawer/tasks/drawerTaskUpdate
 * - [x] components/drawer/tasks/drawerTaskCreate
 * - [x] components/drawer/tasks/drawerTaskTypesCreate
 *
 * - [x] components/drawer/tickets/drawerTicketTypeCreate
 * - [x] components/drawer/tickets/drawerTicketTypeUpdate
 */
export const TASK_TYPES_GET = "TASK_TYPES_GET";
/**
 * /getTaskType
 *
 * - [x] pages/tasks/tasktypes
 *
 * - [x] components/drawer/tasks/drawerTaskTypesUpdate
 */
export const TASK_TYPE_GET = "TASK_TYPE_GET";
/**
 * /addTaskType
 *
 * - [x] pages/tasks/tasktypes
 *
 * - [x] components/drawer/tasks/drawerTaskTypesCreate
 */
export const TASK_TYPE_ADD = "TASK_TYPE_ADD";
/**
 * /updateTaskType
 *
 * - [x] pages/tasks/tasktypes
 *
 * - [x] components/drawer/tasks/drawerTaskTypesUpdate
 */
export const TASK_TYPE_UPDATE = "TASK_TYPE_UPDATE";
/**
 * /deleteTaskType
 *
 * - [x] pages/tasks/tasktypes
 */
export const TASK_TYPE_DELETE = "TASK_TYPE_DELETE";
/**
 * /fillTaskDetail
 *
 * - [x] pages/tasks/detail/[taskId]
 */
export const TASK_DETAIL_FILL = "TASK_DETAIL_FILL";
/**
 * /assignTaskDetail
 *
 * - [x] pages/tasks/detail/[taskId]
 */
export const TASK_DETAIL_ASSIGN = "TASK_DETAIL_ASSIGN";
/**
 * /addTaskDetail
 *
 * - [x] pages/tasks/detail/[taskId]
 */
export const TASK_DETAIL_ADD = "TASK_DETAIL_ADD";
/**
 * /updateTaskDetail
 *
 * - [x] components/drawer/tasks/drawerTaskDetailUpdaate
 *
 * - [x] pages/tasks/detail/[taskId]
 */
export const TASK_DETAIL_UPDATE = "TASK_DETAIL_UPDATE";
/**
 * /deleteTaskDetail
 *
 * - [x] pages/tasks/detail/[taskId]
 */
export const TASK_DETAIL_DELETE = "TASK_DETAIL_DELETE";
/**
 * /getStaffTaskStatuses
 *
 * - [x] pages/tasks/admin/index
 *
 * - [ ] components/table/tableCustom
 */
export const TASK_STAFF_STATUSES_GET = "TASK_STAFF_STATUSES_GET";
/**
 * /getStatusTaskList
 *
 * - [x] pages/tasks/admin/index
 */
export const TASK_STATUS_LIST_GET = "TASK_STATUS_LIST_GET";
/**
 * /getTaskTypeCounts
 *
 * - [x] pages/tasks/admin/index
 */
export const TASK_TYPE_COUNTS_GET = "TASK_TYPE_COUNTS_GET";
/**
 * /getDeadlineTasks
 *
 * - [x] pages/tasks/admin/index
 */
export const TASK_DEADLINE_GET = "TASK_DEADLINE_GET";
/**
 * /getTaskStaffCounts
 *
 * - [x] pages/tasks/admin/index
 */
export const TASK_STAFF_COUNTS_GET = "TASK_STAFF_COUNTS_GET";
/**
 * /getUserTaskStatusList
 *
 * - [x] pages/tasks/mytask/index
 */
export const TASK_USER_STATUSES_GET = "TASK_USER_STATUSES_GET";
/**
 * /getUserLastTwoTasks
 *
 * - [x] pages/tasks/mytask/index
 */
export const TASKS_USER_LAST_TWO_GET = "TASKS_USER_LAST_TWO_GET";
/**
 * /getUserTasks
 *
 * - [x] pages/tasks/mytask/index
 * - [] components/table/tableCustom
 */
export const TASKS_USER_GET = "TASKS_USER_GET";
/**
 * /getUserTaskTypeCounts
 *
 * - [x] pages/tasks/mytask/index
 */
export const TASK_TYPE_USER_COUNTS_GET = "TASK_TYPE_USER_COUNTS_GET";
/**
 * /getTaskSparePartList
 *
 * - [x] components/drawer/tasks/drawerTaskSpareParts
 */
export const TASK_SPARE_PART_LIST_GET = "TASK_SPARE_PART_LIST_GET";
/**
 * /sendInventoriesTask
 *
 * - [x] components/drawer/tasks/drawerTaskSpareParts
 */
export const TASK_SEND_INVENTORIES = "TASK_SEND_INVENTORIES";
export const TASK_CANCEL_SEND_IN_INVENTORY = "TASK_CANCEL_SEND_IN_INVENTORY";
export const TASK_CANCEL_SEND_OUT_INVENTORY = "TASK_CANCEL_SEND_OUT_INVENTORY";
