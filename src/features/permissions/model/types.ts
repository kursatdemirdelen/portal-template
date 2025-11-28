/**
 * Permissions Feature - Type Definitions
 * ======================================
 * 
 * Bu dosya, Permissions/Roles feature'ının tüm TypeScript type'larını içerir.
 * Temel tipler @/shared/types'dan re-export edilir.
 * 
 * 📦 İÇERİK:
 * 
 * 1. DOMAIN TYPES (Core Entities) - from @/shared/types
 *    - Permission          → Tek bir izin kaydı
 *    - PermissionModule    → Modül tipi (tickets, projects, users, vb.)
 *    - PermissionAction    → Eylem tipi (view, create, edit, delete, export)
 *    - RolePermissionMap   → Rol-izin eşlemesi
 *    - PermissionStats     → İstatistik özeti
 * 
 * 2. LOCAL TYPES (Feature Specific)
 *    - PermissionRequest   → İzin kontrolü request
 *    - API Request/Response types
 * 
 * 🔧 BACKEND ENTEGRASYONU:
 * Bu type'lar backend API response'larıyla uyumlu olmalıdır.
 */

// Re-export shared types
export type {
  PermissionModule,
  PermissionAction,
  Permission,
  RolePermissionMap,
  PermissionStats,
} from '@/shared/types';

// Import for local use
import type { PermissionModule, PermissionAction, Permission, RolePermissionMap } from '@/shared/types';

// Local types
export interface PermissionRequest {
  module: PermissionModule;
  action: PermissionAction;
}

// API Request/Response Models
export interface GetPermissionsRequest {
  page?: number;
  limit?: number;
  module?: PermissionModule;
  roleId?: string;
  search?: string;
}

export interface GetPermissionsResponse {
  data: Permission[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetRolePermissionsRequest {
  roleId: string;
}

export interface GetRolePermissionsResponse {
  rolePermissionMap: RolePermissionMap;
  permissions: Permission[];
}

export interface CreatePermissionRequest {
  module: PermissionModule;
  action: PermissionAction;
  description: string;
}

export interface CreatePermissionResponse {
  id: string;
  message: string;
  permission: Permission;
}

export interface UpdatePermissionRequest {
  id: string;
  description?: string;
  isEnabled?: boolean;
}

export interface UpdatePermissionResponse {
  message: string;
  permission: Permission;
}

export interface UpdateRolePermissionsRequest {
  roleId: string;
  permissionIds: string[];
}

export interface UpdateRolePermissionsResponse {
  message: string;
  rolePermissionMap: RolePermissionMap;
}

export interface BulkUpdatePermissionsRequest {
  permissionIds: string[];
  isEnabled?: boolean;
}

export interface BulkUpdatePermissionsResponse {
  message: string;
  updatedCount: number;
  permissions: Permission[];
}

// PermissionStats is re-exported from @/shared/types above
