/**
 * Settings Feature - Kapsamlı Type Definitions
 * =============================================
 * Tüm ayar kategorileri için tip tanımlamaları
 */

// ============================================
// SETTING CATEGORIES
// ============================================

export type SettingCategory =
  | 'company'
  | 'notifications'
  | 'sla'
  | 'tickets'
  | 'workHours'
  | 'theme'
  | 'security';

// ============================================
// GENERIC SETTING TYPES
// ============================================

export interface SettingItem {
  id: string;
  key: string;
  label: string;
  description?: string;
  value: string | boolean | number | string[];
  type: 'text' | 'toggle' | 'select' | 'number' | 'color' | 'image' | 'tags' | 'time' | 'email' | 'password';
  options?: { label: string; value: string }[];
  category: SettingCategory;
  editable?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  placeholder?: string;
}

export interface SettingSection {
  id: SettingCategory;
  title: string;
  description: string;
  icon: string;
  settings: SettingItem[];
}

// ============================================
// 1. COMPANY SETTINGS
// ============================================

export interface CompanyInfo {
  name: string;
  shortName: string;
  logo?: string;
  favicon?: string;
  primaryColor: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  taxNumber?: string;
  registrationNumber?: string;
}

// ============================================
// 2. NOTIFICATION SETTINGS (Basitleştirilmiş)
// ============================================

export type DigestFrequency = 'realtime' | 'daily' | 'weekly';

export interface NotificationSettings {
  // Email
  emailEnabled: boolean;
  emailDigestFrequency: DigestFrequency;
}

// ============================================
// 3. SLA SETTINGS
// ============================================

export interface SLASettings {
  // Response Time
  responseTimeHours: number;
  responseTimeEnabled: boolean;
  
  // Resolution Time
  resolutionTimeHours: number;
  resolutionTimeEnabled: boolean;
  
  // Priority-based SLA
  prioritySLAEnabled: boolean;
  criticalResponseHours: number;
  criticalResolutionHours: number;
  highResponseHours: number;
  highResolutionHours: number;
  mediumResponseHours: number;
  mediumResolutionHours: number;
  lowResponseHours: number;
  lowResolutionHours: number;
  
  // Escalation
  escalationEnabled: boolean;
  escalationThresholdPercent: number;
  escalationNotifyEmail: string[];
}

// ============================================
// 4. TICKET SETTINGS (Öncelik ve Otomatik Atama kaldırıldı)
// ============================================

export interface TicketSettings {
  // Request Types (İstek Tipleri - Kategoriler yerine)
  requestTypes: string[];
  defaultRequestType: string;
  
  // Statuses
  statuses: string[];
  defaultStatus: string;
  
  // Attachments
  attachmentMaxSizeMB: number;
  allowedAttachmentTypes: string[];
}

// ============================================
// 5. WORK HOURS SETTINGS (Tatiller kaldırıldı - Leaves feature'da yönetiliyor)
// ============================================

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface WorkHoursSettings {
  // Daily Schedule
  workStartTime: string;
  workEndTime: string;
  
  // Work Days
  workDays: DayOfWeek[];
  
  // Breaks
  breakEnabled: boolean;
  breakStartTime: string;
  breakEndTime: string;
}

// ============================================
// 6. THEME/APPEARANCE SETTINGS
// ============================================

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeSettings {
  // Theme Mode
  mode: ThemeMode;
  
  // Colors
  primaryColor: string;
  accentColor: string;
  
  // Typography
  fontSize: 'small' | 'medium' | 'large';
  fontFamily: string;
  
  // Misc
  animationsEnabled: boolean;
}

// ============================================
// 7. SECURITY SETTINGS
// ============================================

export interface SecuritySettings {
  // Session
  sessionTimeoutMinutes: number;
  rememberMeEnabled: boolean;
  
  // Two Factor Auth
  twoFactorRequired: boolean;
  
  // Password Policy
  passwordMinLength: number;
  
  // Login
  maxLoginAttempts: number;
}

// ============================================
// COMBINED SETTINGS TYPE
// ============================================

export interface AllSettings {
  company: CompanyInfo;
  notifications: NotificationSettings;
  sla: SLASettings;
  tickets: TicketSettings;
  workHours: WorkHoursSettings;
  theme: ThemeSettings;
  security: SecuritySettings;
}

// ============================================
// API TYPES
// ============================================

export interface UpdateSettingsRequest<T> {
  category: SettingCategory;
  data: Partial<T>;
}

export interface UpdateSettingsResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
