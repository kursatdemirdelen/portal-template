/**
 * Permissions UI Constants - Labels, Colors, Descriptions
 */

import type { PermissionModule, PermissionAction } from '../model';
import { colors, avatarColors } from '@/shared/styles';

// Module Labels
export const MODULE_LABELS: Record<PermissionModule, string> = {
  tickets: 'Biletler',
  projects: 'Projeler',
  assignments: 'Zimmetler',
  'time-tracking': 'Puantaj',
  users: 'Kullanıcılar',
  parameters: 'Parametreler',
  reports: 'Raporlar',
  customers: 'Müşteriler',
  leaves: 'İzinler',
  approvals: 'Onaylar',
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
  customers: 'Müşteri yönetimi',
  leaves: 'İzin talep ve yönetimi',
  approvals: 'Onay süreçleri',
};

// Module Colors
export const MODULE_COLORS: Record<PermissionModule, string> = {
  tickets: colors.info,
  projects: colors.accent,
  assignments: avatarColors.deepPurple,
  'time-tracking': colors.warning,
  users: colors.error,
  parameters: avatarColors.teal,
  reports: colors.primary,
  customers: colors.success,
  leaves: avatarColors.cyan,
  approvals: avatarColors.deepOrange,
};

// Action Labels
export const ACTION_LABELS: Record<PermissionAction, string> = {
  view: 'Görüntüle',
  create: 'Oluştur',
  edit: 'Düzenle',
  delete: 'Sil',
  export: 'Dışa Aktar',
  approve: 'Onayla',
};

// Action Descriptions
export const ACTION_DESCRIPTIONS: Record<PermissionAction, string> = {
  view: 'Verileri görüntüleme yeteneği',
  create: 'Yeni kayıt oluşturma yeteneği',
  edit: 'Mevcut kayıtları düzenleme yeteneği',
  delete: 'Kayıtları silme yeteneği',
  export: 'Verileri dışarı aktarma yeteneği',
  approve: 'Onay verme yeteneği',
};

// Action Colors
export const ACTION_COLORS: Record<PermissionAction, string> = {
  view: colors.success,
  create: colors.info,
  edit: colors.warning,
  delete: colors.error,
  export: colors.accent,
  approve: avatarColors.deepOrange,
};

// Permission Status Colors
export const PERMISSION_STATUS_COLORS = {
  enabled: colors.success,
  disabled: colors.textSecondary,
};

// Role Colors
export const ROLE_COLORS = {
  admin: colors.error,
  manager: colors.warning,
  worker: colors.info,
  user: colors.accent,
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
