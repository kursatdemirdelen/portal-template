/**
 * User Service - API Integration Layer
 * =====================================
 * 
 * Bu servis, kullanıcı yönetimi CRUD işlemlerini yönetir.
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
 *    SONRA: const response = await httpClient.get('/users', { params: request });
 * 
 * 📍 BACKEND ENDPOINTS:
 * - GET    /api/users          → getUsers()
 * - GET    /api/users/:id      → getUser(id)
 * - POST   /api/users          → createUser()
 * - PUT    /api/users/:id      → updateUser()
 * - DELETE /api/users/:id      → deleteUser()
 * - PATCH  /api/users/bulk     → bulkUpdateUsers()
 * - GET    /api/users/stats    → getUserStats()
 * - GET    /api/users/export   → exportUsersToCSV()
 * 
 * 📁 İLGİLİ DOSYALAR:
 * - Types: src/features/users/model/types.ts
 * - Page:  src/features/users/pages/UsersPage.tsx
 * - Docs:  docs/API_INTEGRATION.md
 * 
 * ⚠️ SAYFA ENTEGRASYONU:
 * UsersPage şu an mockData.ts kullanıyor. API-driven yapmak için:
 * - mockData import'larını kaldır
 * - Bu servis fonksiyonlarını import et
 * - useState + useEffect ile async data fetching yap
 * - ParametersPage.tsx örnek alınabilir
 */

import type {
  User,
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
} from '../../features/users/model';

// ============================================
// MOCK CONFIGURATION
// Production'da kaldırılacak
// ============================================

/**
 * In-memory mock database
 * 🔴 Production'da kaldırılacak - Veriler backend'den gelecek
 */
const userDatabase: User[] = [
  {
    id: 'USER001',
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@company.com',
    phone: '+90 532 123 4567',
    role: 'admin',
    status: 'active',
    department: 'IT',
    company: 'Teknoloji A.Ş.',
    language: 'tr',
    timezone: 'Europe/Istanbul',
    createdAt: '2024-01-15',
    updatedAt: '2025-01-20',
    lastLogin: '2025-01-20 14:30',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'USER002',
    name: 'Zeynep Demir',
    email: 'zeynep.demir@company.com',
    phone: '+90 532 234 5678',
    role: 'manager',
    status: 'active',
    department: 'Project Management',
    company: 'Teknoloji A.Ş.',
    language: 'tr',
    timezone: 'Europe/Istanbul',
    createdAt: '2024-02-10',
    updatedAt: '2025-01-19',
    lastLogin: '2025-01-20 10:15',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 'USER003',
    name: 'Can Şimşek',
    email: 'can.simsek@company.com',
    phone: '+90 532 345 6789',
    role: 'worker',
    status: 'active',
    department: 'Development',
    company: 'Pazarlama Inc.',
    language: 'en',
    timezone: 'America/New_York',
    createdAt: '2024-03-05',
    updatedAt: '2025-01-20',
    lastLogin: '2025-01-20 09:45',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 'USER004',
    name: 'Melis Kara',
    email: 'melis.kara@company.com',
    phone: '+90 532 456 7890',
    role: 'worker',
    status: 'active',
    department: 'QA',
    company: 'Finans Ltd.',
    language: 'tr',
    timezone: 'Europe/Istanbul',
    createdAt: '2024-04-20',
    updatedAt: '2025-01-18',
    lastLogin: '2025-01-19 16:20',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 'USER005',
    name: 'Fatih Aksu',
    email: 'fatih.aksu@company.com',
    phone: '+90 532 567 8901',
    role: 'worker',
    status: 'inactive',
    department: 'Development',
    company: 'Teknoloji A.Ş.',
    language: 'en',
    timezone: 'America/New_York',
    createdAt: '2024-05-12',
    updatedAt: '2025-01-10',
    lastLogin: '2024-12-15 11:30',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 'USER006',
    name: 'Nur Çelik',
    email: 'nur.celik@company.com',
    phone: '+90 532 678 9012',
    role: 'user',
    status: 'active',
    department: 'Sales',
    company: 'Operasyon A.Ş.',
    language: 'tr',
    timezone: 'Europe/Istanbul',
    createdAt: '2024-06-08',
    updatedAt: '2025-01-17',
    lastLogin: '2025-01-20 13:00',
    avatar: 'https://i.pravatar.cc/150?img=6',
  },
];

/**
 * Get users with filtering and pagination
 */
export async function getUsers(request: GetUsersRequest = {}): Promise<GetUsersResponse> {
  let filtered = [...userDatabase];

  // Apply filters
  if (request.search) {
    const search = request.search.toLowerCase();
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search) ||
        u.phone?.includes(search)
    );
  }

  if (request.role) {
    filtered = filtered.filter((u) => u.role === request.role);
  }

  if (request.status) {
    filtered = filtered.filter((u) => u.status === request.status);
  }

  if (request.department) {
    filtered = filtered.filter((u) => u.department === request.department);
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
 * Get single user by ID
 */
export async function getUser(id: string): Promise<User> {
  const user = userDatabase.find((u) => u.id === id);
  if (!user) {
    throw new Error(`Kullanıcı bulunamadı: ${id}`);
  }
  return user;
}

/**
 * Create new user
 */
export async function createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
  // Validate email uniqueness
  if (userDatabase.some((u) => u.email === request.email)) {
    throw new Error(`Bu e-posta zaten kullanılıyor: ${request.email}`);
  }

  // Validate name
  if (!request.name || request.name.trim().length === 0) {
    throw new Error('Ad soyad gerekli');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(request.email)) {
    throw new Error('Geçersiz e-posta formatı');
  }

  const newUser: User = {
    id: `USER${String(userDatabase.length + 1).padStart(3, '0')}`,
    name: request.name,
    email: request.email,
    phone: request.phone,
    role: request.role || 'user',
    status: 'active',
    department: request.department,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 100)}`,
  };

  userDatabase.push(newUser);

  return {
    id: newUser.id,
    message: 'Kullanıcı başarıyla oluşturuldu',
    user: newUser,
  };
}

/**
 * Update user
 */
export async function updateUser(request: UpdateUserRequest): Promise<UpdateUserResponse> {
  const user = userDatabase.find((u) => u.id === request.id);
  if (!user) {
    throw new Error(`Kullanıcı bulunamadı: ${request.id}`);
  }

  // Check email uniqueness if email is being changed
  if (request.email && request.email !== user.email) {
    if (userDatabase.some((u) => u.email === request.email)) {
      throw new Error(`Bu e-posta zaten kullanılıyor: ${request.email}`);
    }
  }

  // Update fields
  if (request.name) user.name = request.name;
  if (request.email) user.email = request.email;
  if (request.phone) user.phone = request.phone;
  if (request.role) user.role = request.role;
  if (request.status) user.status = request.status;
  if (request.department) user.department = request.department;

  user.updatedAt = new Date().toISOString().split('T')[0];

  return {
    message: 'Kullanıcı başarıyla güncellendi',
    user,
  };
}

/**
 * Delete user
 */
export async function deleteUser(request: DeleteUserRequest): Promise<{ message: string }> {
  const index = userDatabase.findIndex((u) => u.id === request.id);
  if (index === -1) {
    throw new Error(`Kullanıcı bulunamadı: ${request.id}`);
  }

  userDatabase.splice(index, 1);

  return {
    message: 'Kullanıcı başarıyla silindi',
  };
}

/**
 * Bulk update users
 */
export async function bulkUpdateUsers(request: BulkUpdateUsersRequest): Promise<BulkUpdateUsersResponse> {
  const userIds = request.userIds || request.ids || [];
  const usersToUpdate = userDatabase.filter((u) => userIds.includes(u.id));

  if (usersToUpdate.length === 0) {
    throw new Error('Güncellenecek kullanıcı bulunamadı');
  }

  usersToUpdate.forEach((user) => {
    if (request.status) user.status = request.status;
    if (request.role) user.role = request.role;
    if (request.department) user.department = request.department;
    user.updatedAt = new Date().toISOString().split('T')[0];
  });

  return {
    message: `${usersToUpdate.length} kullanıcı başarıyla güncellendi`,
    updatedCount: usersToUpdate.length,
    users: usersToUpdate,
  };
}

/**
 * Get user statistics
 */
export async function getUserStats(): Promise<UserStats> {
  const stats: UserStats = {
    total: userDatabase.length,
    active: userDatabase.filter((u) => u.status === 'active').length,
    inactive: userDatabase.filter((u) => u.status === 'inactive').length,
    suspended: userDatabase.filter((u) => u.status === 'suspended').length,
    byRole: {
      admin: userDatabase.filter((u) => u.role === 'admin').length,
      manager: userDatabase.filter((u) => u.role === 'manager').length,
      worker: userDatabase.filter((u) => u.role === 'worker').length,
      user: userDatabase.filter((u) => u.role === 'user').length,
    },
    byDepartment: {},
    lastModified: new Date().toISOString(),
  };

  // Count by department
  userDatabase.forEach((u) => {
    if (u.department && stats.byDepartment) {
      stats.byDepartment[u.department] = (stats.byDepartment[u.department] || 0) + 1;
    }
  });

  return stats;
}

/**
 * Export users to CSV
 */
export async function exportUsersToCSV(userIds?: string[]): Promise<{ csv: string; filename: string }> {
  let usersToExport = userDatabase;
  if (userIds && userIds.length > 0) {
    usersToExport = userDatabase.filter((u) => userIds.includes(u.id));
  }

  const headers = ['ID', 'Ad Soyad', 'E-posta', 'Telefon', 'Rol', 'Bölüm', 'Durum', 'Güncellenme'];
  const rows = usersToExport.map((u) => [
    u.id,
    u.name,
    u.email,
    u.phone || '',
    u.role,
    u.department || '',
    u.status,
    u.updatedAt,
  ]);

  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
  const filename = `kullanicilar_${new Date().toISOString().split('T')[0]}.csv`;

  return { csv, filename };
}

/**
 * User Service Object
 * Kolay import için tüm fonksiyonları bir objede toplar
 *
 * @example
 * import { userService } from '@/shared/api/userService';
 * const users = await userService.getUsers();
 */
export const userService = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  bulkUpdateUsers,
  getUserStats,
  exportUsersToCSV,
};
