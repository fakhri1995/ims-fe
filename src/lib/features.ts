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
 * Daftar feature untuk User Management.
 *
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/72187905/User+Management
 */
/**
 * /getFilterUsers | UserService.filterUsers
 *
 * - [ ] components/drawer/tasks/drawerTaskUpdate
 * - [ ] components/drawer/tickets/drawerTicketExports
 * - [ ] components/drawer/tickets/drawerTicketUpdate
 * - [ ] components/screen/form-aktivitas/DetailAktivitas/AktivitasUserListEditableCard
 * - [x] /admin/groups/update/agents/[groupId]
 * - [x] /admin/groups/create/agents
 */
export const USERS_GET = "USERS_GET";
/**
 * /getFilterGroups
 *
 * - [ ] components/drawer/tasks/drawerTaskUpdate
 * - [ ] components/drawer/tickets/drawerTicketExports
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

/**
 * Daftar feature untuk Company management.
 *
 * @see https://mighty-mig.atlassian.net/wiki/spaces/MIGHTY/pages/67076466/Company+Management
 */
/**
 * /getAllCompanyList
 *
 * - [ ] components/screen/ticket/detail/TicketDetailTaskCreateDrawer
 * - [ ] components/drawer/tasks/drawerTaskUpdate
 * - [ ] components/drawer/tasks/drawerTaskCreate
 *
 * - [ ] pages/tasks/mytask
 * - [ ] pages/tasks/admin
 * - [ ] pages/tasks
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
 * - [x] pages/admin/requesters
 *
 * - [x] pages/company/clients
 * - [x] pages/company/clients/locations
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
 * - [ ] pages/items/create
 *
 * - [ ] components/screen/ticket/detail/TicketDetailTaskCreateDrawer
 * - [ ] components/modal/modalCustom
 * - [ ] components/drawer/tasks/drawerTaskCreate
 * - [ ] components/drawer/tasks/drawerTaskUpdate
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
 * - [ ] pages/items/index
 * - [ ] pages/items/detail/[itemId]
 * - [ ] pages/items/createpart/[itemId]
 *
 * - [x] pages/admin/assets/index
 * - [x] pages/admin/assets/update/[assettypeId]
 * - [x] pages/admin/assets/detail/[assettypeId]
 * - [x] pages/admin/assets/create/index
 *
 * - [ ] pages/admin/models/index
 * - [ ] pages/admin/models/create/index
 * - [ ] pages/admin/models/update2/[modelId]
 *
 * - [ ] components/drawer/tickets/drawerTicketConnectItem
 */
export const ASSETS_GET = "ASSETS_GET";
/**
 * /getAsset
 *
 * - [x] pages/admin/assets/update/[assettypeId]
 * - [x] pages/admin/assets/detail/[assettypeId]
 *
 * - [ ] pages/admin/models/index
 * - [ ] pages/admin/models/update2/[modelId]
 * - [ ] pages/admin/models/create/index
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
 * - [ ] pages/admin/models/create/index
 * - [ ] pages/admin/models/update2/[modelId]
 */
export const MANUFACTURERS_GET = "MANUFACTURERS_GET";
/**
 * /addManufacturer
 *
 * - [ ] pages/admin/models/update2/[modelId]
 * - [ ] pages/admin/models/create/index
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
 * - [ ] pages/items/detail/[itemId]
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
 *
 * - [x] pages/admin/assets/detail/[assettypeId]
 */
export const MODELS_GET = "MODELS_GET";
export const MODEL_GET = "MODEL_GET";
export const MODEL_ADD = "MODEL_ADD";
export const MODEL_UPDATE = "MODEL_UPDATE";
export const MODEL_DELETE = "MODEL_DELETE";
