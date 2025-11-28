/**
 * Permissions Mock Data - For PermissionsPage temporary usage
 *
 * Re-export from centralized mocks for backward compatibility.
 * @see @/shared/data/mocks/permissions.mock.ts
 */

export { 
  allPermissions,
  mockRolePermissions, 
  getAllPermissions,
  getPermissionsByModule,
  getPermissionsByRole,
  getPermissionStats,
} from '@/shared/data/mocks';

// Re-export types
export type { Permission, RolePermissionMap, PermissionStats } from '@/shared/types';
