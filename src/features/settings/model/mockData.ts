/**
 * Settings Mock Data
 * ==================
 * parameterService ile senkronize varsayılan ayarlar
 */

import type {
  CompanyInfo,
  NotificationSettings,
  SLASettings,
  TicketSettings,
  WorkHoursSettings,
  ThemeSettings,
  SecuritySettings,
  AllSettings,
} from './types';

// ============================================
// 1. COMPANY SETTINGS
// ============================================

export const defaultCompanyInfo: CompanyInfo = {
  name: 'Intellium Portal',
  shortName: 'Intellium',
  logo: undefined,
  favicon: undefined,
  primaryColor: '#5b7aed',
  website: 'https://intellium.com.tr',
  email: 'info@intellium.com.tr',
  phone: '+90 (216) 388 40 33',
  address: 'Sarıgazi, İstanbul, Türkiye',
  taxNumber: '',
  registrationNumber: '',
};

// ============================================
// 2. NOTIFICATION SETTINGS (Basitleştirilmiş)
// ============================================

export const defaultNotificationSettings: NotificationSettings = {
  emailEnabled: true,
  emailDigestFrequency: 'realtime',
};

// ============================================
// 3. SLA SETTINGS
// ============================================

export const defaultSLASettings: SLASettings = {
  // Response Time
  responseTimeHours: 24,
  responseTimeEnabled: true,
  
  // Resolution Time
  resolutionTimeHours: 72,
  resolutionTimeEnabled: true,
  
  // Priority-based SLA
  prioritySLAEnabled: true,
  criticalResponseHours: 1,
  criticalResolutionHours: 4,
  highResponseHours: 4,
  highResolutionHours: 24,
  mediumResponseHours: 24,
  mediumResolutionHours: 72,
  lowResponseHours: 48,
  lowResolutionHours: 168,
  
  // Escalation
  escalationEnabled: true,
  escalationThresholdPercent: 80,
  escalationNotifyEmail: ['manager@example.com'],
};

// ============================================
// 4. TICKET SETTINGS (Proje ile uyumlu - Öncelik ve Otomatik Atama yok)
// ============================================

export const defaultTicketSettings: TicketSettings = {
  // Request Types (Proje'deki istek tipleri ile uyumlu)
  requestTypes: ['Hata', 'Özellik', 'Dokümantasyon', 'Performans', 'Güvenlik', 'Tasarım'],
  defaultRequestType: 'Hata',
  
  // Statuses (Proje'deki durumlar ile uyumlu)
  statuses: ['Yeni İstek', 'Atanan', 'Çözümlenen', 'Kapatılan'],
  defaultStatus: 'Yeni İstek',
  
  attachmentMaxSizeMB: 10,
  allowedAttachmentTypes: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.png', '.jpg', '.jpeg', '.gif', '.zip'],
};

// ============================================
// 5. WORK HOURS SETTINGS (Tatiller kaldırıldı - Leaves feature'da yönetiliyor)
// ============================================

export const defaultWorkHoursSettings: WorkHoursSettings = {
  // Daily Schedule
  workStartTime: '09:00',
  workEndTime: '18:00',
  
  // Work Days
  workDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  
  // Breaks
  breakEnabled: true,
  breakStartTime: '12:00',
  breakEndTime: '13:00',
  
};

// ============================================
// 6. THEME SETTINGS
// ============================================

export const defaultThemeSettings: ThemeSettings = {
  // Theme Mode
  mode: 'light',
  
  // Colors
  primaryColor: '#5b7aed',
  accentColor: '#f0ad4e',
  
  
  // Typography
  fontSize: 'medium',
  fontFamily: 'Inter, system-ui, sans-serif',
  
  // Misc
  animationsEnabled: true,
};

// ============================================
// 7. SECURITY SETTINGS
// ============================================

export const defaultSecuritySettings: SecuritySettings = {
  // Session
  sessionTimeoutMinutes: 30,
  rememberMeEnabled: true,
  // Two Factor Auth
  twoFactorRequired: false,
  // Password Policy
  passwordMinLength: 8,
  // Login
  maxLoginAttempts: 5,
};

// ============================================
// ALL SETTINGS COMBINED
// ============================================

export const defaultAllSettings: AllSettings = {
  company: defaultCompanyInfo,
  notifications: defaultNotificationSettings,
  sla: defaultSLASettings,
  tickets: defaultTicketSettings,
  workHours: defaultWorkHoursSettings,
  theme: defaultThemeSettings,
  security: defaultSecuritySettings,
};

// ============================================
// HELPER OPTIONS
// ============================================

export const digestFrequencyOptions = [
  { label: 'Anlık', value: 'realtime' },
  { label: 'Saatlik', value: 'hourly' },
  { label: 'Günlük', value: 'daily' },
  { label: 'Haftalık', value: 'weekly' },
];

export const autoAssignMethodOptions = [
  { label: 'Sıralı (Round Robin)', value: 'round-robin' },
  { label: 'Yük Dengeleme', value: 'load-balanced' },
  { label: 'Yetenek Bazlı', value: 'skill-based' },
  { label: 'Kapalı', value: 'none' },
];

export const themeModeOptions = [
  { label: 'Açık', value: 'light' },
  { label: 'Koyu', value: 'dark' },
  { label: 'Sistem', value: 'system' },
];

export const fontSizeOptions = [
  { label: 'Küçük', value: 'small' },
  { label: 'Orta', value: 'medium' },
  { label: 'Büyük', value: 'large' },
];

export const workDayOptions = [
  { label: 'Pazartesi', value: 'monday' },
  { label: 'Salı', value: 'tuesday' },
  { label: 'Çarşamba', value: 'wednesday' },
  { label: 'Perşembe', value: 'thursday' },
  { label: 'Cuma', value: 'friday' },
  { label: 'Cumartesi', value: 'saturday' },
  { label: 'Pazar', value: 'sunday' },
];

export const timezoneOptions = [
  { label: 'İstanbul (GMT+3)', value: 'Europe/Istanbul' },
  { label: 'Londra (GMT+0)', value: 'Europe/London' },
  { label: 'New York (GMT-5)', value: 'America/New_York' },
  { label: 'Berlin (GMT+1)', value: 'Europe/Berlin' },
  { label: 'Dubai (GMT+4)', value: 'Asia/Dubai' },
];

export const twoFactorMethodOptions = [
  { label: 'E-posta', value: 'email' },
  { label: 'SMS', value: 'sms' },
  { label: 'Authenticator App', value: 'authenticator' },
];
