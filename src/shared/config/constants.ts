/**
 * Merkezi Shared Constants
 * =========================
 * Tüm features'da kullanılan ortak konfigürasyon ve etiketler
 */

import type { UserRole, UserStatus } from "@/features/users/model";
import { colors, avatarColors, backgrounds } from "@/shared/styles";

// ============ KULLANICI ROL & DURUM ============

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: "Administrator",
  manager: "Manager",
  worker: "Çalışan",
  user: "Kullanıcı",
};

export const USER_ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  admin: "Sistem yöneticisi - Tüm yetkilere erişim",
  manager: "Proje yöneticisi - Temel yönetim yetkileri",
  worker: "Çalışan - Temel görüntüleme ve oluşturma yetkileri",
  user: "Kullanıcı - Sınırlı erişim",
};

export const USER_ROLE_COLORS: Record<UserRole, string> = {
  admin: colors.error,
  manager: colors.warning,
  worker: colors.info,
  user: colors.accent,
};

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  active: "Aktif",
  inactive: "İnaktif",
  suspended: "Askıya Alınmış",
};

export const USER_STATUS_COLORS: Record<UserStatus, string> = {
  active: colors.success,
  inactive: colors.textSecondary,
  suspended: colors.warning,
};

// ============ MÜŞTERİ DURUM & LİSANS ============

export const CUSTOMER_STATUS_LABELS: Record<string, string> = {
  active: "Aktif",
  inactive: "Pasif",
  pending: "Beklemede",
};

export const CUSTOMER_STATUS_COLORS: Record<string, string> = {
  active: colors.success,
  inactive: colors.textSecondary,
  pending: colors.warning,
};

export const LICENSE_TYPE_LABELS: Record<string, string> = {
  trial: "Deneme",
  standard: "Standart",
  premium: "Premium",
  enterprise: "Kurumsal",
};

export const LICENSE_TYPE_COLORS: Record<string, string> = {
  trial: colors.textSecondary,
  standard: colors.primary,
  premium: colors.accent,
  enterprise: colors.warning,
};

export const LICENSE_STATUS_LABELS: Record<string, string> = {
  active: "Aktif",
  expired: "Süresi Dolmuş",
  suspended: "Askıya Alınmış",
};

export const LICENSE_STATUS_COLORS: Record<string, string> = {
  active: colors.success,
  expired: colors.error,
  suspended: colors.warning,
};

// ============ PROJE EKİBİ ROLLERI ============

export const TEAM_ROLES = [
  "Project Manager",
  "Tech Lead",
  "Developer",
  "Backend Developer",
  "Frontend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "iOS Developer",
  "Android Developer",
  "DevOps Engineer",
  "QA Engineer",
  "Test Engineer",
  "UI Designer",
  "UX Designer",
  "Data Engineer",
  "Data Analyst",
  "Security Engineer",
  "Support Specialist",
] as const;

export type TeamRole = (typeof TEAM_ROLES)[number];

export const TEAM_ROLE_COLORS: Record<string, string> = {
  "Project Manager": colors.primary,
  "Tech Lead": colors.accent,
  Developer: colors.info,
  "Backend Developer": avatarColors.teal,
  "Frontend Developer": colors.error,
  "Full Stack Developer": avatarColors.deepPurple,
  "Mobile Developer": avatarColors.deepOrange,
  "iOS Developer": avatarColors.indigo,
  "Android Developer": avatarColors.green,
  "DevOps Engineer": avatarColors.deepPurple,
  "QA Engineer": colors.warning,
  "Test Engineer": avatarColors.orange,
  "UI Designer": avatarColors.cyan,
  "UX Designer": colors.info,
  "Data Engineer": colors.textPrimary,
  "Data Analyst": colors.textSecondary,
  "Security Engineer": avatarColors.darkRed,
  "Support Specialist": avatarColors.neutral,
};

// ============ ORTAK LİSTELER ============

export const DEPARTMENTS = [
  "IT",
  "Project Management",
  "Development",
  "QA",
  "Sales",
  "HR",
  "Finance",
  "Operations",
];

export const CITIES = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Bursa",
  "Antalya",
  "Adana",
  "Konya",
  "Gaziantep",
  "Kayseri",
  "Mersin",
  "Eskişehir",
  "Diyarbakır",
  "Samsun",
  "Denizli",
  "Şanlıurfa",
];

// =============================================================================
// LOG CONSTANTS
// =============================================================================

export const LOG_LEVELS = [
  "debug",
  "info",
  "warn",
  "error",
] as const;

export type LogLevel = (typeof LOG_LEVELS)[number];

export const LOG_SOURCES = [
  "auth",
  "api",
  "system",
  "user",
  "scheduler",
  "payment",
  "email",
  "file",
] as const;

export type LogSource = (typeof LOG_SOURCES)[number];

// Loglama renkleri (status badge için)
export const LOG_LEVEL_COLORS: Record<LogLevel, string> = {
  debug: colors.textSecondary,
  info: colors.info,
  warn: colors.warning,
  error: colors.error,
};

// =============================================================================
// TICKET CONSTANTS
// =============================================================================

export const TICKET_STATUSES = [
  "Yeni İstek",
  "Atanan",
  "Çözümlenen",
  "Kapatılan",
] as const;

export type TicketStatus = (typeof TICKET_STATUSES)[number];

// Ticket status meta bilgileri (Mock data ve UI için)
// Bu liste status renklemeleri ve gösterim bilgilerini içerir
export const TICKET_STATUS_DATA = [
  { key: 'Yeni İstek', label: 'Yeni', color: colors.info, bgColor: backgrounds.infoBg },
  { key: 'Atanan', label: 'Atanan', color: colors.warning, bgColor: backgrounds.warningBg },
  { key: 'Çözümlenen', label: 'Çözümlenen', color: colors.success, bgColor: backgrounds.successBg },
  { key: 'Kapatılan', label: 'Kapatıldı', color: colors.textSecondary, bgColor: backgrounds.neutral100 },
];

export const COUNTRIES = ["Türkiye", "Almanya", "İngiltere", "ABD", "Fransa", "Hollanda"];

// ============ TABLO DEFAULT'LARI ============

export const TABLE_DEFAULTS = {
  pageSize: 10,
  pageSizeOptions: ["10", "20", "50"],
  scrollX: 1000,
};
