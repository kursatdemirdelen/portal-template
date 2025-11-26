/**
 * Permissions UI Constants - Labels, Colors, Descriptions
 */

import type { PermissionModule, PermissionAction } from '../model';

// Module Labels
export const MODULE_LABELS: Record<PermissionModule, string> = {
  tickets: 'Biletler',
  projects: 'Projeler',
  assignments: 'Zimmetler',
  'time-tracking': 'Puantaj',
  users: 'Kullanıcılar',
  parameters: 'Parametreler',
  reports: 'Raporlar',
};

// Module Descriptions
export const MODULE_DESCRIPTIONS: Record<PermissionModule, string> = {
  tickets: 'Bilet yönetimi ve takip işlemleri',
  projects: 'Proje yönetimi ve koordinasyon',
  assignments: 'Zimmet ve kaynak atama',
  'time-tracking': 'Zaman takip ve puantaj',
  users: 'Kullanıcı yönetimi',
  parameters: 'Sistem parametreleri',
  reports: 'Raporlama ve analiz',
};

// Module Colors
export const MODULE_COLORS: Record<PermissionModule, string> = {
  tickets: '#3b82f6',
  projects: '#8b5cf6',
  assignments: '#ec4899',
  'time-tracking': '#f59e0b',
  users: '#ef4444',
  parameters: '#14b8a6',
  reports: '#6366f1',
};

// Action Labels
export const ACTION_LABELS: Record<PermissionAction, string> = {
  view: 'Görüntüle',
  create: 'Oluştur',
  edit: 'Düzenle',
  delete: 'Sil',
  export: 'Dışa Aktar',
};

// Action Descriptions
export const ACTION_DESCRIPTIONS: Record<PermissionAction, string> = {
  view: 'Verileri görüntüleme yeteneği',
  create: 'Yeni kayıt oluşturma yeteneği',
  edit: 'Mevcut kayıtları düzenleme yeteneği',
  delete: 'Kayıtları silme yeteneği',
  export: 'Verileri dışarı aktarma yeteneği',
};

// Action Colors
export const ACTION_COLORS: Record<PermissionAction, string> = {
  view: '#22c55e',
  create: '#3b82f6',
  edit: '#f59e0b',
  delete: '#ef4444',
  export: '#8b5cf6',
};

// Permission Status Colors
export const PERMISSION_STATUS_COLORS = {
  enabled: '#22c55e',
  disabled: '#6b7280',
};

// Role Colors
export const ROLE_COLORS = {
  admin: '#ef4444',
  manager: '#f97316',
  worker: '#3b82f6',
  user: '#8b5cf6',
};

// All Modules List
export const ALL_MODULES: PermissionModule[] = [
  'tickets',
  'projects',
  'assignments',
  'time-tracking',
  'users',
  'parameters',
  'reports',
];

// All Actions List
export const ALL_ACTIONS: PermissionAction[] = [
  'view',
  'create',
  'edit',
  'delete',
  'export',
];

// Table Columns Configuration
export const TABLE_COLUMNS = {
  id: { label: 'ID', width: '10%' },
  module: { label: 'Modül', width: '15%' },
  action: { label: 'İşlem', width: '12%' },
  description: { label: 'Açıklama', width: '35%' },
  isEnabled: { label: 'Durum', width: '10%' },
  updatedAt: { label: 'Güncellenme', width: '12%' },
  actions: { label: 'İşlemler', width: '8%' },
};
