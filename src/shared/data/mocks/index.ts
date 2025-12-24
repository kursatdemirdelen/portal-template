/**
 * Centralized Mock Data - Index
 * ==============================
 * 
 * Tüm mock verilerin merkezi export dosyası.
 * 
 * @usage
 * import { mockUsers, mockProjects, getUserByName } from '@/shared/data/mocks';
 */

// =============================================================================
// KULLANICI VERİLERİ
// =============================================================================

export {
  mockUsers,
  mockDepartments,
  getUserByName,
  getUserById,
  getAvatarByName,
  getUsersByRole,
  getUsersByStatus,
  getUsersByDepartment,
  getInitials,
  getUserStats,
} from './users.mock';

export type { Department } from './users.mock';

// =============================================================================
// PROJE VERİLERİ
// =============================================================================

export {
  mockProjectOptions,
  mockProjects,
  mockDashboardProjects,
  mockProjectTeams,
  mockCustomers,
  getProjectById,
  getProjectByCode,
  getProjectStats,
  getTeamById,
} from './projects.mock';

export type { Customer } from './projects.mock';

// =============================================================================
// DASHBOARD VERİLERİ
// =============================================================================

export {
  mockCurrentUser,
  mockActiveProjects,
  requestTypeOptions,
  createTicketDistribution,
} from './dashboard.mock';

export type { RequestType } from './dashboard.mock';

// =============================================================================
// BİLET VERİLERİ
// =============================================================================

export {
  TICKET_STATUS_META,
  mockTickets,
  mockTicketRecords,
  mockTicketDetail,
  getTicketsByDepartment,
  getRecentTickets,
  getRecentTicketsForDepartment,
  getTicketById,
  getTicketStats,
} from './tickets.mock';

// =============================================================================
// LOG VERİLERİ
// =============================================================================

export {
  mockLogs,
  getLogStats,
  filterLogs,
} from './logs.mock';

// =============================================================================
// MÜŞTERİ VERİLERİ (EK)
// =============================================================================

export {
  mockCustomers as mockCustomerList,
  getCustomerStats,
  getCustomerById,
  filterCustomers,
} from './customers.mock';

// =============================================================================
// YETKİ VERİLERİ
// =============================================================================

export {
  allPermissions,
  mockRolePermissions,
  getAllPermissions,
  getPermissionsByModule,
  getPermissionsByRole,
  getPermissionStats,
} from './permissions.mock';

// =============================================================================
// BİLDİRİM VERİLERİ
// =============================================================================

export {
  mockNotifications,
  getNotificationStats,
  getUnreadNotifications,
  filterNotifications,
} from './notifications.mock';

// =============================================================================
// ONAY SÜREÇLERİ VERİLERİ
// =============================================================================

export {
  mockApprovals,
  getApprovalsByStatus,
  getApprovalsByType,
  getPendingApprovalsCount,
} from './approvals.mock';

export type { 
  ApprovalRequest, 
  ApprovalStatus, 
  ApprovalType 
} from './approvals.mock';

// =============================================================================
// ZAMAN TAKİBİ VERİLERİ
// =============================================================================

export {
  mockTimeEntries,
  calculateTodayTotal,
  calculateWeeklyTotal,
} from './time-tracking.mock';

// =============================================================================
// SCRUM BOARD VERİLERİ
// =============================================================================

export {
  mockScrumColumns,
  mockScrumStats,
} from './scrum.mock';

export type { ScrumColumn } from './scrum.mock';

// =============================================================================
// PROFİL VERİLERİ
// =============================================================================

export {
  mockProfileSummary,
  mockProfileStats,
  mockNotificationPreferences,
  mockSecurityChecklist,
  mockActivityTimeline,
  mockSessions,
  mockConnectedApps,
} from './profile.mock';

// =============================================================================
// TAKIM VERİLERİ
// =============================================================================

export {
  mockTeamMembers,
  mockCeremonies,
  mockRoleTemplates,
  mockProjectTeamDetails,
  mockProjectTeamList,
  getProjectTeamById,
  getProjectTeamStats,
} from './teams.mock';

export type { 
  TeamMember, 
  ProjectTeamDetail, 
  ProjectTeamListItem 
} from './teams.mock';

// =============================================================================
// ZİMMET VERİLERİ
// =============================================================================

export {
  mockAssignments,
} from './assignments.mock';