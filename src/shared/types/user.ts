/**
 * User Domain Types
 * ==================
 * 
 * Tüm projede kullanılacak kullanıcı ile ilgili TypeScript type'ları.
 * 
 * @module shared/types/user
 */

// =============================================================================
// TEMEL ENUMLAR / TİPLER
// =============================================================================

/**
 * Kullanıcı rolleri
 */
export type UserRole = 'admin' | 'manager' | 'worker' | 'user';

/**
 * Kullanıcı durumları
 */
export type UserStatus = 'active' | 'inactive' | 'suspended';

// =============================================================================
// ANA ENTITY TİPLERİ
// =============================================================================

/**
 * Temel kullanıcı bilgileri (Mock data için)
 */
export interface MockUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  avatarColor: string;
  avatarUrl: string;
  role: string;
  status?: UserStatus;
  department: string;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
}

/**
 * Tam kullanıcı entity'si (API response / form data için)
 */
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  department?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  avatar?: string;
}

/**
 * Kullanıcı oluşturma input'u
 */
export interface UserCreateInput {
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  department?: string;
}

/**
 * Rol detay bilgisi
 */
export interface RoleInfo {
  id: UserRole;
  name: string;
  description: string;
  permissionCount: number;
}

// =============================================================================
// API REQUEST TİPLERİ
// =============================================================================

export interface GetUsersRequest {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  department?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  department?: string;
}

export interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  status?: UserStatus;
  department?: string;
}

export interface DeleteUserRequest {
  id: string;
}

export interface BulkUpdateUsersRequest {
  ids: string[];
  status?: UserStatus;
  role?: UserRole;
}

// =============================================================================
// API RESPONSE TİPLERİ
// =============================================================================

export interface GetUsersResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateUserResponse {
  id: string;
  message: string;
  user: User;
}

export interface UpdateUserResponse {
  message: string;
  user: User;
}

export interface BulkUpdateUsersResponse {
  message: string;
  updatedCount: number;
}

/**
 * Kullanıcı istatistikleri özeti
 */
export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  suspended: number;
  byRole: {
    admin: number;
    manager: number;
    worker: number;
    user: number;
  };
  byDepartment?: Record<string, number>;
  lastModified?: string;
}
