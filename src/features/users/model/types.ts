/**
 * Users Feature - Type Definitions
 * =================================
 * 
 * Bu dosya, Users feature'ının tüm TypeScript type'larını içerir.
 * Temel tipler @/shared/types'dan re-export edilir.
 * Feature-specific tipler burada tanımlanır.
 * 
 * @usage
 * import type { User, UserRole, UserFilters } from '../model/types';
 */

// =============================================================================
// RE-EXPORTS FROM SHARED TYPES
// =============================================================================

export type { 
  UserRole, 
  UserStatus, 
  User, 
  UserCreateInput, 
  RoleInfo,
  MockUser,
  GetUsersRequest,
  GetUsersResponse,
  CreateUserRequest,
  CreateUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  DeleteUserRequest,
  BulkUpdateUsersRequest,
  BulkUpdateUsersResponse,
  UserStats,
} from '@/shared/types';

// =============================================================================
// FEATURE-SPECIFIC TYPES
// =============================================================================

import type { UserRole, UserStatus } from '@/shared/types';

/**
 * Kullanıcı filtreleme seçenekleri
 */
export interface UserFilters {
  search: string;
  role: UserRole | 'all';
  status: UserStatus | 'all';
}

/**
 * Kullanıcı form verisi (Create/Edit)
 */
export interface UserFormData {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  language?: string;
  role: UserRole;
  department: string;
  company?: string;
  timezone?: string;
  isActive?: boolean;
  status?: UserStatus;
}

/**
 * Kullanıcı istatistik özeti (UI için)
 */
export interface UserStatsDisplay {
  total: number;
  active: number;
  inactive: number;
  admins: number;
}
