/**
 * Shared Types - Central Export
 * ==============================
 * 
 * Tüm domain type'larının merkezi export dosyası.
 * 
 * @usage
 * import type { User, Project, DashboardUserInfo } from '@/shared/types';
 */

// User types
export type {
  UserRole,
  UserStatus,
  MockUser,
  User,
  UserCreateInput,
  RoleInfo,
  GetUsersRequest,
  CreateUserRequest,
  UpdateUserRequest,
  DeleteUserRequest,
  BulkUpdateUsersRequest,
  GetUsersResponse,
  CreateUserResponse,
  UpdateUserResponse,
  BulkUpdateUsersResponse,
  UserStats,
} from './user';

// Project types
export type {
  ProjectStatus,
  ProjectProgressStatus,
  ProjectOption,
  Project,
  DashboardProject,
  ProjectTeamMember,
  ProjectTeam,
  GetProjectsRequest,
  CreateProjectRequest,
  UpdateProjectRequest,
  GetProjectsResponse,
  CreateProjectResponse,
  UpdateProjectResponse,
  ProjectStats,
} from './project';

// Dashboard types
export type {
  DashboardUserRole,
  DashboardUserInfo,
  DashboardUserStats,
  TicketDistributionItem,
  TicketStatusSummary,
  QuickAction,
  DashboardData,
} from './dashboard';

// Ticket types
export type {
  TicketStatusSimple,
  TicketStatusDetailed,
  RequestTypeSimple,
  RequestTypeDetailed,
  Ticket,
  TicketRecord,
  TicketEffort,
  TicketComment,
  TicketHistoryItem,
  TicketAttachment,
  TicketProjectInfo,
  TicketDetail,
  TicketStatusMeta,
} from './ticket';

// Log types
export type {
  LogLevel,
  LogSource,
  LogEntry,
  LogStats,
  LogFilter,
} from './log';

// Customer types
export type {
  CustomerStatus,
  LicenseType,
  LicenseStatus,
  CustomerContact,
  CustomerBank,
  CustomerLicense,
  Customer,
  CustomerStats,
  CustomerFilter,
} from './customer';

// Permission types
export type {
  PermissionModule,
  PermissionAction,
  Permission,
  RolePermissionMap,
  PermissionStats,
} from './permission';

// Notification types
export type {
  NotificationType,
  Notification,
  NotificationStats,
  NotificationFilter,
} from './notification';
