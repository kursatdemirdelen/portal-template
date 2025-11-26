/**
 * Permissions Mock Data - For PermissionsPage temporary usage
 * TODO: Convert PermissionsPage to use permissionService API directly
 */

import type { Permission, RolePermissionMap } from './model';

const allPermissions: Permission[] = [
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

export const mockRolePermissions: RolePermissionMap[] = [
  {
    id: 'ROLE_ADMIN',
    roleId: 'admin',
    roleName: 'Administrator',
    description: 'Sistem yöneticisi - Tüm yetkilere erişim',
    isSystem: true,
    permissions: allPermissions.map((p) => ({ ...p, isEnabled: true })),
  },
  {
    id: 'ROLE_MANAGER',
    roleId: 'manager',
    roleName: 'Manager',
    description: 'Proje yöneticisi - Temel yönetim yetkileri',
    isSystem: true,
    permissions: allPermissions.filter((p) => p.module !== 'users' && p.module !== 'parameters'),
  },
  {
    id: 'ROLE_WORKER',
    roleId: 'worker',
    roleName: 'Worker',
    description: 'Çalışan - Temel görüntüleme ve oluşturma yetkileri',
    isSystem: true,
    permissions: allPermissions.filter(
      (p) => p.action !== 'delete' && p.module !== 'users' && p.module !== 'parameters'
    ),
  },
  {
    id: 'ROLE_USER',
    roleId: 'user',
    roleName: 'User',
    description: 'Kullanıcı - Sınırlı erişim',
    isSystem: true,
    permissions: allPermissions.filter((p) => p.action === 'view'),
  },
];

export const getAllPermissions = (): Permission[] => allPermissions;

export const getPermissionsByModule = (module: string): Permission[] => {
  return allPermissions.filter((p) => p.module === module);
};

export const getPermissionsByRole = (roleId: string): Permission[] => {
  const roleMap = mockRolePermissions.find((r) => r.roleId === roleId);
  return roleMap?.permissions || [];
};

export const getPermissionStats = () => {
  return {
    totalPermissions: allPermissions.length,
    totalRoles: mockRolePermissions.length,
    systemRoles: mockRolePermissions.filter((r) => r.isSystem).length,
    byModule: {
      tickets: allPermissions.filter((p) => p.module === 'tickets').length,
      projects: allPermissions.filter((p) => p.module === 'projects').length,
      assignments: allPermissions.filter((p) => p.module === 'assignments').length,
      'time-tracking': allPermissions.filter((p) => p.module === 'time-tracking').length,
      users: allPermissions.filter((p) => p.module === 'users').length,
      parameters: allPermissions.filter((p) => p.module === 'parameters').length,
      reports: allPermissions.filter((p) => p.module === 'reports').length,
    },
  };
};
