/**
 * Users Feature - Type Definitions
 * =================================
 * 
 * Bu dosya, Users feature'ının tüm TypeScript type'larını içerir.
 * Temel tipler @/shared/types'dan import edilir.
 * 
 * 📦 İÇERİK:
 * 
 * 1. DOMAIN TYPES (Core Entities)
 *    - User             → Tek bir kullanıcı kaydı (@/shared/types'dan)
 *    - UserRole         → Rol tipi (@/shared/types'dan)
 *    - UserStatus       → Durum (@/shared/types'dan)
 *    - RoleInfo         → Rol detay bilgisi (@/shared/types'dan)
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

// Temel tipler shared types'dan re-export edilir
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
  UserStats,
} from '@/shared/types';

// Feature-specific extended types (shared types'ı genişletir)
import type { UserRole, UserStatus, User } from '@/shared/types';

/**
 * Kullanıcı güncelleme isteği
 */
export interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  status?: UserStatus;
  department?: string;
}

/**
 * Kullanıcı güncelleme yanıtı
 */
export interface UpdateUserResponse {
  message: string;
  user: User;
}

/**
 * Kullanıcı silme isteği
 */
export interface DeleteUserRequest {
  id: string;
}

/**
 * Toplu kullanıcı güncelleme isteği
 */
export interface BulkUpdateUsersRequest {
  userIds: string[];
  status?: UserStatus;
  role?: UserRole;
  department?: string;
}

/**
 * Toplu kullanıcı güncelleme yanıtı
 */
export interface BulkUpdateUsersResponse {
  message: string;
  updatedCount: number;
  users: User[];
}

/**
 * Feature-specific UserStats (byDepartment ve lastModified ekli)
 */
export interface UserStatsExtended {
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
