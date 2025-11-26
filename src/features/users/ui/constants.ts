/**
 * Users UI Constants - Labels, Colors, Descriptions
 */

import type { UserRole, UserStatus } from '../model';

// Role Labels
export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Administrator',
  manager: 'Manager',
  worker: 'Çalışan',
  user: 'Kullanıcı',
};

// Role Descriptions
export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  admin: 'Sistem yöneticisi - Tüm yetkilere erişim',
  manager: 'Proje yöneticisi - Temel yönetim yetkileri',
  worker: 'Çalışan - Temel görüntüleme ve oluşturma yetkileri',
  user: 'Kullanıcı - Sınırlı erişim',
};

// Role Colors
export const ROLE_COLORS: Record<UserRole, string> = {
  admin: '#ef4444',
  manager: '#f97316',
  worker: '#3b82f6',
  user: '#8b5cf6',
};

// Status Labels
export const STATUS_LABELS: Record<UserStatus, string> = {
  active: 'Aktif',
  inactive: 'İnaktif',
  suspended: 'Askıya Alınmış',
};

// Status Colors
export const STATUS_COLORS: Record<UserStatus, string> = {
  active: '#22c55e',
  inactive: '#6b7280',
  suspended: '#f59e0b',
};

// Department Common Values
export const DEPARTMENTS = [
  'IT',
  'Project Management',
  'Development',
  'QA',
  'Sales',
  'HR',
  'Finance',
  'Operations',
];

// Table Columns Configuration
export const TABLE_COLUMNS = {
  id: { label: 'ID', width: '10%' },
  name: { label: 'Ad Soyad', width: '15%' },
  email: { label: 'E-posta', width: '20%' },
  phone: { label: 'Telefon', width: '15%' },
  role: { label: 'Rol', width: '12%' },
  department: { label: 'Bölüm', width: '15%' },
  status: { label: 'Durum', width: '10%' },
  updatedAt: { label: 'Güncellenme', width: '12%' },
  actions: { label: 'İşlemler', width: '8%' },
};
