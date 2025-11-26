/**
 * Users Feature - Type Definitions
 * =================================
 * 
 * Bu dosya, Users feature'ının tüm TypeScript type'larını içerir.
 * 
 * 📦 İÇERİK:
 * 
 * 1. DOMAIN TYPES (Core Entities)
 *    - User             → Tek bir kullanıcı kaydı
 *    - UserRole         → Rol tipi (admin, manager, worker, user)
 *    - UserStatus       → Durum (active, inactive, suspended)
 *    - RoleInfo         → Rol detay bilgisi
 * 
 * 2. API REQUEST TYPES
 *    - GetUsersRequest          → Liste sorgusu (filter, pagination)
 *    - CreateUserRequest        → Yeni kullanıcı oluşturma
 *    - UpdateUserRequest        → Kullanıcı güncelleme
 *    - DeleteUserRequest        → Kullanıcı silme
 *    - BulkUpdateUsersRequest   → Toplu güncelleme
 * 
 * 3. API RESPONSE TYPES
 *    - GetUsersResponse         → Paginated liste yanıtı
 *    - CreateUserResponse       → Oluşturma yanıtı
 *    - UpdateUserResponse       → Güncelleme yanıtı
 *    - BulkUpdateUsersResponse  → Toplu güncelleme yanıtı
 *    - UserStats                → İstatistik özeti
 * 
 * 🔧 BACKEND ENTEGRASYONU:
 * Bu type'lar backend API response'larıyla uyumlu olmalıdır.
 * 
 * 📁 KULLANIM:
 * - Service:  shared/api/userService.ts
 * - Page:     features/users/pages/UsersPage.tsx
 * - UI:       features/users/ui/constants.ts (labels için)
 */

export type UserRole = 'admin' | 'manager' | 'worker' | 'user';
export type UserStatus = 'active' | 'inactive' | 'suspended';

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

export interface UserCreateInput {
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  department?: string;
}

export interface RoleInfo {
  id: UserRole;
  name: string;
  description: string;
  permissionCount: number;
}

// API Request/Response Models
export interface GetUsersRequest {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  department?: string;
}

export interface GetUsersResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  department?: string;
}

export interface CreateUserResponse {
  id: string;
  message: string;
  user: User;
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

export interface UpdateUserResponse {
  message: string;
  user: User;
}

export interface DeleteUserRequest {
  id: string;
}

export interface BulkUpdateUsersRequest {
  userIds: string[];
  status?: UserStatus;
  role?: UserRole;
  department?: string;
}

export interface BulkUpdateUsersResponse {
  message: string;
  updatedCount: number;
  users: User[];
}

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
  byDepartment: Record<string, number>;
  lastModified: string;
}
