/**
 * Permission Service - API Integration Layer
 * ==========================================
 * 
 * Bu servis, izin ve rol yönetimi CRUD işlemlerini yönetir.
 * 
 * 🔧 ENTEGRASYON NOTU:
 * Şu an MOCK implementation kullanılıyor. Gerçek backend entegrasyonu için:
 * 
 * 1. httpClient import'u ekle:
 *    import { httpClient } from './httpClient';
 * 
 * 2. Mock database ve API_DELAY'ı kaldır
 * 
 * 3. Her fonksiyonda mock logic'i HTTP call ile değiştir:
 *    ÖNCE:  await new Promise(resolve => setTimeout(resolve, API_DELAY));
 *    SONRA: const response = await httpClient.get('/permissions', { params: request });
 * 
 * 📍 BACKEND ENDPOINTS:
 * - GET    /api/permissions              → getPermissions()
 * - GET    /api/permissions/:id          → getPermission(id)
 * - POST   /api/permissions              → createPermission()
 * - PUT    /api/permissions/:id          → updatePermission()
 * - GET    /api/roles/:id/permissions    → getRolePermissions()
 * - PUT    /api/roles/:id/permissions    → updateRolePermissions()
 * - PATCH  /api/permissions/bulk         → bulkUpdatePermissions()
 * - GET    /api/permissions/stats        → getPermissionStats()
 * - GET    /api/permissions/export       → exportPermissionsToCSV()
 * 
 * 📁 İLGİLİ DOSYALAR:
 * - Types: src/features/permissions/model/types.ts
 * - Page:  src/features/permissions/pages/PermissionsPage.tsx
 * - Docs:  docs/API_INTEGRATION.md
 * 
 * ⚠️ SAYFA ENTEGRASYONU:
 * PermissionsPage şu an mockData.ts kullanıyor. API-driven yapmak için:
 * - mockData import'larını kaldır
 * - Bu servis fonksiyonlarını import et
 * - useState + useEffect ile async data fetching yap
 * - ParametersPage.tsx örnek alınabilir
 */

import type {
  Permission,
  RolePermissionMap,
  GetPermissionsRequest,
  GetPermissionsResponse,
  GetRolePermissionsRequest,
  GetRolePermissionsResponse,
  CreatePermissionRequest,
  CreatePermissionResponse,
  UpdatePermissionRequest,
  UpdatePermissionResponse,
  UpdateRolePermissionsRequest,
  UpdateRolePermissionsResponse,
  BulkUpdatePermissionsRequest,
  BulkUpdatePermissionsResponse,
  PermissionStats,
} from '../../features/permissions/model';

// ============================================
// 🔴 MOCK CONFIGURATION - Production'da kaldırılacak
// ============================================

// Simulated API delay (ms) - Backend entegrasyonunda kaldır
const API_DELAY = 200;

/**
 * In-memory mock database - All Permissions
 * 🔴 Production'da kaldırılacak - Veriler backend'den gelecek
 */
const permissionDatabase: Permission[] = [
  // Tickets
  { id: 'PERM001', module: 'tickets', action: 'view', description: 'Biletleri görüntüle', isEnabled: true },
  { id: 'PERM002', module: 'tickets', action: 'create', description: 'Bilet oluştur', isEnabled: true },
  { id: 'PERM003', module: 'tickets', action: 'edit', description: 'Bilet düzenle', isEnabled: true },
  { id: 'PERM004', module: 'tickets', action: 'delete', description: 'Bilet sil', isEnabled: false },
  { id: 'PERM005', module: 'tickets', action: 'export', description: 'Bilet dışa aktar', isEnabled: true },

  // Projects
  { id: 'PERM006', module: 'projects', action: 'view', description: 'Projeleri görüntüle', isEnabled: true },
  { id: 'PERM007', module: 'projects', action: 'create', description: 'Proje oluştur', isEnabled: true },
  { id: 'PERM008', module: 'projects', action: 'edit', description: 'Proje düzenle', isEnabled: true },
  { id: 'PERM009', module: 'projects', action: 'delete', description: 'Proje sil', isEnabled: false },
  { id: 'PERM010', module: 'projects', action: 'export', description: 'Proje dışa aktar', isEnabled: true },

  // Assignments
  { id: 'PERM011', module: 'assignments', action: 'view', description: 'Zimmetleri görüntüle', isEnabled: true },
  { id: 'PERM012', module: 'assignments', action: 'create', description: 'Zimmet oluştur', isEnabled: true },
  { id: 'PERM013', module: 'assignments', action: 'edit', description: 'Zimmet düzenle', isEnabled: true },
  { id: 'PERM014', module: 'assignments', action: 'delete', description: 'Zimmet sil', isEnabled: false },

  // Time Tracking
  { id: 'PERM015', module: 'time-tracking', action: 'view', description: 'Puantajı görüntüle', isEnabled: true },
  { id: 'PERM016', module: 'time-tracking', action: 'create', description: 'Puantaj kaydı oluştur', isEnabled: true },
  { id: 'PERM017', module: 'time-tracking', action: 'edit', description: 'Puantaj kaydı düzenle', isEnabled: true },

  // Users
  { id: 'PERM018', module: 'users', action: 'view', description: 'Kullanıcıları görüntüle', isEnabled: true },
  { id: 'PERM019', module: 'users', action: 'create', description: 'Kullanıcı oluştur', isEnabled: false },
  { id: 'PERM020', module: 'users', action: 'edit', description: 'Kullanıcı düzenle', isEnabled: false },
  { id: 'PERM021', module: 'users', action: 'delete', description: 'Kullanıcı sil', isEnabled: false },

  // Parameters
  { id: 'PERM022', module: 'parameters', action: 'view', description: 'Parametreleri görüntüle', isEnabled: true },
  { id: 'PERM023', module: 'parameters', action: 'edit', description: 'Parametre düzenle', isEnabled: false },

  // Reports
  { id: 'PERM024', module: 'reports', action: 'view', description: 'Raporları görüntüle', isEnabled: true },
  { id: 'PERM025', module: 'reports', action: 'export', description: 'Rapor dışa aktar', isEnabled: true },
];

// In-Memory Database - Role Permissions
const rolePermissionDatabase: RolePermissionMap[] = [
  {
    id: 'ROLE_ADMIN',
    roleId: 'admin',
    roleName: 'Administrator',
    description: 'Sistem yöneticisi - Tüm yetkilere erişim',
    isSystem: true,
    permissions: permissionDatabase.map((p) => ({ ...p, isEnabled: true })),
  },
  {
    id: 'ROLE_MANAGER',
    roleId: 'manager',
    roleName: 'Manager',
    description: 'Proje yöneticisi - Temel yönetim yetkileri',
    isSystem: true,
    permissions: permissionDatabase.filter((p) => p.module !== 'users' && p.module !== 'parameters'),
  },
  {
    id: 'ROLE_WORKER',
    roleId: 'worker',
    roleName: 'Worker',
    description: 'Çalışan - Temel görüntüleme ve oluşturma yetkileri',
    isSystem: true,
    permissions: permissionDatabase.filter(
      (p) => p.action !== 'delete' && p.module !== 'users' && p.module !== 'parameters'
    ),
  },
  {
    id: 'ROLE_USER',
    roleId: 'user',
    roleName: 'User',
    description: 'Kullanıcı - Sınırlı erişim',
    isSystem: true,
    permissions: permissionDatabase.filter((p) => p.action === 'view'),
  },
];

/**
 * Get permissions with filtering and pagination
 */
export async function getPermissions(
  request: GetPermissionsRequest = {}
): Promise<GetPermissionsResponse> {
  await new Promise((resolve) => setTimeout(resolve, API_DELAY));

  let filtered = [...permissionDatabase];

  // Apply filters
  if (request.search) {
    const search = request.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.module.toLowerCase().includes(search) ||
        p.action.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
    );
  }

  if (request.module) {
    filtered = filtered.filter((p) => p.module === request.module);
  }

  // Pagination
  const page = request.page || 1;
  const limit = request.limit || 10;
  const offset = (page - 1) * limit;

  const data = filtered.slice(offset, offset + limit);
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    total,
    page,
    limit,
    totalPages,
  };
}

/**
 * Get single permission by ID
 */
export async function getPermission(id: string): Promise<Permission> {
  await new Promise((resolve) => setTimeout(resolve, API_DELAY));

  const permission = permissionDatabase.find((p) => p.id === id);
  if (!permission) {
    throw new Error(`İzin bulunamadı: ${id}`);
  }
  return permission;
}

/**
 * Get role permissions
 */
export async function getRolePermissions(
  request: GetRolePermissionsRequest
): Promise<GetRolePermissionsResponse> {
  await new Promise((resolve) => setTimeout(resolve, API_DELAY));

  const rolePermissionMap = rolePermissionDatabase.find((r) => r.roleId === request.roleId);
  if (!rolePermissionMap) {
    throw new Error(`Rol bulunamadı: ${request.roleId}`);
  }

  return {
    rolePermissionMap,
    permissions: rolePermissionMap.permissions,
  };
}

/**
 * Create new permission
 */
export async function createPermission(
  request: CreatePermissionRequest
): Promise<CreatePermissionResponse> {
  await new Promise((resolve) => setTimeout(resolve, API_DELAY));

  // Check if permission already exists
  if (permissionDatabase.some((p) => p.module === request.module && p.action === request.action)) {
    throw new Error(`Bu modül ve işlem kombinasyonu zaten mevcut`);
  }

  const newPermission: Permission = {
    id: `PERM${String(permissionDatabase.length + 1).padStart(3, '0')}`,
    module: request.module,
    action: request.action,
    description: request.description,
    isEnabled: true,
  };

  permissionDatabase.push(newPermission);

  // Update all role permissions
  rolePermissionDatabase.forEach((role) => {
    role.permissions.push(newPermission);
  });

  return {
    id: newPermission.id,
    message: 'İzin başarıyla oluşturuldu',
    permission: newPermission,
  };
}

/**
 * Update permission
 */
export async function updatePermission(
  request: UpdatePermissionRequest
): Promise<UpdatePermissionResponse> {
  await new Promise((resolve) => setTimeout(resolve, API_DELAY));

  const permission = permissionDatabase.find((p) => p.id === request.id);
  if (!permission) {
    throw new Error(`İzin bulunamadı: ${request.id}`);
  }

  if (request.description) permission.description = request.description;
  if (request.isEnabled !== undefined) permission.isEnabled = request.isEnabled;

  // Update in role permissions
  rolePermissionDatabase.forEach((role) => {
    const rolePermission = role.permissions.find((p) => p.id === request.id);
    if (rolePermission) {
      if (request.description) rolePermission.description = request.description;
      if (request.isEnabled !== undefined) rolePermission.isEnabled = request.isEnabled;
    }
  });

  return {
    message: 'İzin başarıyla güncellendi',
    permission,
  };
}

/**
 * Update role permissions
 */
export async function updateRolePermissions(
  request: UpdateRolePermissionsRequest
): Promise<UpdateRolePermissionsResponse> {
  await new Promise((resolve) => setTimeout(resolve, API_DELAY));

  const rolePermissionMap = rolePermissionDatabase.find((r) => r.roleId === request.roleId);
  if (!rolePermissionMap) {
    throw new Error(`Rol bulunamadı: ${request.roleId}`);
  }

  if (rolePermissionMap.isSystem) {
    throw new Error('Sistem rolleri değiştirilemez');
  }

  rolePermissionMap.permissions = permissionDatabase.filter((p) => request.permissionIds.includes(p.id));

  return {
    message: 'Rol izinleri başarıyla güncellendi',
    rolePermissionMap,
  };
}

/**
 * Bulk update permissions
 */
export async function bulkUpdatePermissions(
  request: BulkUpdatePermissionsRequest
): Promise<BulkUpdatePermissionsResponse> {
  await new Promise((resolve) => setTimeout(resolve, API_DELAY));

  const permissionsToUpdate = permissionDatabase.filter((p) => request.permissionIds.includes(p.id));

  if (permissionsToUpdate.length === 0) {
    throw new Error('Güncellenecek izin bulunamadı');
  }

  permissionsToUpdate.forEach((permission) => {
    if (request.isEnabled !== undefined) permission.isEnabled = request.isEnabled;
  });

  // Update in role permissions
  rolePermissionDatabase.forEach((role) => {
    role.permissions = role.permissions.map((p) => {
      const updated = permissionsToUpdate.find((u) => u.id === p.id);
      return updated || p;
    });
  });

  return {
    message: `${permissionsToUpdate.length} izin başarıyla güncellendi`,
    updatedCount: permissionsToUpdate.length,
    permissions: permissionsToUpdate,
  };
}

/**
 * Get permission statistics
 */
export async function getPermissionStats(): Promise<PermissionStats> {
  await new Promise((resolve) => setTimeout(resolve, API_DELAY));

  const byModule: Record<string, number> = {};
  permissionDatabase.forEach((p) => {
    byModule[p.module] = (byModule[p.module] || 0) + 1;
  });

  return {
    totalPermissions: permissionDatabase.length,
    totalRoles: rolePermissionDatabase.length,
    systemRoles: rolePermissionDatabase.filter((r) => r.isSystem).length,
    enabledPermissions: permissionDatabase.filter((p) => p.isEnabled).length,
    byModule,
    lastModified: new Date().toISOString(),
  };
}

/**
 * Export permissions to CSV
 */
export async function exportPermissionsToCSV(
  permissionIds?: string[]
): Promise<{ csv: string; filename: string }> {
  await new Promise((resolve) => setTimeout(resolve, API_DELAY));

  let permissionsToExport = permissionDatabase;
  if (permissionIds && permissionIds.length > 0) {
    permissionsToExport = permissionDatabase.filter((p) => permissionIds.includes(p.id));
  }

  const headers = ['ID', 'Modül', 'İşlem', 'Açıklama', 'Durum'];
  const rows = permissionsToExport.map((p) => [
    p.id,
    p.module,
    p.action,
    p.description,
    p.isEnabled ? 'Aktif' : 'İnaktif',
  ]);

  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
  const filename = `izinler_${new Date().toISOString().split('T')[0]}.csv`;

  return { csv, filename };
}
