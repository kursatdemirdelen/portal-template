/**
 * Permission Domain Types
 *
 * Yetki yönetimi için merkezi tip tanımları.
 */

export type PermissionModule = 
  | 'tickets' 
  | 'projects' 
  | 'assignments' 
  | 'time-tracking' 
  | 'users' 
  | 'parameters' 
  | 'reports'
  | 'customers'
  | 'leaves'
  | 'approvals';

export type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'export' | 'approve';

export interface Permission {
  id: string;
  module: PermissionModule;
  action: PermissionAction;
  description: string;
  isEnabled: boolean;
}

export interface RolePermissionMap {
  id: string;
  roleId: string;
  roleName: string;
  description: string;
  isSystem: boolean;
  permissions: Permission[];
}

export interface PermissionStats {
  totalPermissions: number;
  totalRoles: number;
  systemRoles: number;
  byModule: Partial<Record<PermissionModule, number>>;
  enabledPermissions?: number;
  lastModified?: string;
}
