/**
 * Permissions Feature - Type Definitions
 * ======================================
 * 
 * Bu dosya, Permissions/Roles feature'ının tüm TypeScript type'larını içerir.
 * 
 * 📦 İÇERİK:
 * 
 * 1. DOMAIN TYPES (Core Entities)
 *    - Permission          → Tek bir izin kaydı
 *    - PermissionModule    → Modül tipi (tickets, projects, users, vb.)
 *    - PermissionAction    → Eylem tipi (view, create, edit, delete, export)
 *    - RolePermissionMap   → Rol-izin eşlemesi
 *    - PermissionRequest   → İzin kontrolü request
 * 
 * 2. API REQUEST TYPES
 *    - GetPermissionsRequest         → Liste sorgusu
 *    - GetRolePermissionsRequest     → Rol izinleri sorgusu
 *    - CreatePermissionRequest       → Yeni izin oluşturma
 *    - UpdatePermissionRequest       → İzin güncelleme
 *    - UpdateRolePermissionsRequest  → Rol izinleri güncelleme
 *    - BulkUpdatePermissionsRequest  → Toplu güncelleme
 * 
 * 3. API RESPONSE TYPES
 *    - GetPermissionsResponse        → Paginated liste yanıtı
 *    - GetRolePermissionsResponse    → Rol izinleri yanıtı
 *    - PermissionStats               → İstatistik özeti
 * 
 * 🔧 BACKEND ENTEGRASYONU:
 * Bu type'lar backend API response'larıyla uyumlu olmalıdır.
 * 
 * 📁 KULLANIM:
 * - Service:  shared/api/permissionService.ts
 * - Page:     features/permissions/pages/PermissionsPage.tsx
 * - UI:       features/permissions/ui/constants.ts (labels için)
 */

export type PermissionModule = 
  | 'tickets' 
  | 'projects' 
  | 'assignments' 
  | 'time-tracking' 
  | 'users' 
  | 'parameters' 
  | 'reports';

export type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'export';

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
  permissions: Permission[];
  description: string;
  isSystem: boolean; // System roles (admin) cannot be deleted
}

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

export interface PermissionStats {
  totalPermissions: number;
  totalRoles: number;
  systemRoles: number;
  enabledPermissions: number;
  byModule: Record<PermissionModule, number>;
  lastModified: string;
}
