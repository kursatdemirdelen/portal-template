/**
 * Permission Mock Data - Merkezi Yetki Verileri
 *
 * Tüm izin ve rol tanımları burada tutulur.
 * 
 * @see @/shared/types/permission.ts
 */

import type { Permission, RolePermissionMap, PermissionStats } from '@/shared/types';
import { USER_ROLE_LABELS } from '@/shared/config/constants';

export const allPermissions: Permission[] = [
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

  // Customers
  { id: 'PERM026', module: 'customers', action: 'view', description: 'Müşterileri görüntüle', isEnabled: true },
  { id: 'PERM027', module: 'customers', action: 'create', description: 'Müşteri oluştur', isEnabled: true },
  { id: 'PERM028', module: 'customers', action: 'edit', description: 'Müşteri düzenle', isEnabled: true },
  { id: 'PERM029', module: 'customers', action: 'delete', description: 'Müşteri sil', isEnabled: false },

  // Leaves
  { id: 'PERM030', module: 'leaves', action: 'view', description: 'İzinleri görüntüle', isEnabled: true },
  { id: 'PERM031', module: 'leaves', action: 'create', description: 'İzin talebi oluştur', isEnabled: true },
  { id: 'PERM032', module: 'leaves', action: 'approve', description: 'İzin onayla', isEnabled: false },

  // Approvals
  { id: 'PERM033', module: 'approvals', action: 'view', description: 'Onayları görüntüle', isEnabled: true },
  { id: 'PERM034', module: 'approvals', action: 'approve', description: 'Onay ver', isEnabled: false },
];

export const mockRolePermissions: RolePermissionMap[] = [
  {
    id: 'ROLE_ADMIN',
    roleId: 'admin',
    roleName: USER_ROLE_LABELS['admin'],
    description: 'Sistem yöneticisi - Tüm yetkilere erişim',
    isSystem: true,
    permissions: allPermissions.map((p) => ({ ...p, isEnabled: true })),
  },
  {
    id: 'ROLE_MANAGER',
    roleId: 'manager',
    roleName: USER_ROLE_LABELS['manager'],
    description: 'Proje yöneticisi - Temel yönetim yetkileri',
    isSystem: true,
    permissions: allPermissions.filter((p) => p.module !== 'users' && p.module !== 'parameters'),
  },
  {
    id: 'ROLE_WORKER',
    roleId: 'worker',
    roleName: USER_ROLE_LABELS['worker'],
    description: 'Çalışan - Temel görüntüleme ve oluşturma yetkileri',
    isSystem: true,
    permissions: allPermissions.filter(
      (p) => p.action !== 'delete' && p.module !== 'users' && p.module !== 'parameters'
    ),
  },
  {
    id: 'ROLE_USER',
    roleId: 'user',
    roleName: USER_ROLE_LABELS['user'],
    description: 'Kullanıcı - Sınırlı erişim',
    isSystem: true,
    permissions: allPermissions.filter((p) => p.action === 'view'),
  },
];

/**
 * Tüm izinleri getir
 */
export const getAllPermissions = (): Permission[] => allPermissions;

/**
 * Modüle göre izinleri getir
 */
export const getPermissionsByModule = (module: string): Permission[] => {
  return allPermissions.filter((p) => p.module === module);
};

/**
 * Role göre izinleri getir
 */
export const getPermissionsByRole = (roleId: string): Permission[] => {
  const roleMap = mockRolePermissions.find((r) => r.roleId === roleId);
  return roleMap?.permissions || [];
};

/**
 * İzin istatistiklerini hesapla
 */
export const getPermissionStats = (): PermissionStats => {
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
      customers: allPermissions.filter((p) => p.module === 'customers').length,
      leaves: allPermissions.filter((p) => p.module === 'leaves').length,
      approvals: allPermissions.filter((p) => p.module === 'approvals').length,
    },
  };
};
