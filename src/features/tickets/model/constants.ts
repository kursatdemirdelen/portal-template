/**
 * Ticket modülü için sabit değerler
 * Magic string'leri önlemek ve merkezi yönetim sağlamak için
 */

// Mock kullanıcı - gerçek uygulamada auth context'ten gelecek
export const MOCK_CURRENT_USER = "Ahmet Yılmaz";

// İstek Tipleri
export const REQUEST_TYPES = {
  TECHNICAL_SUPPORT: "Technical Support",
  SUGGEST_IMPROVEMENT: "Suggest Improvement",
  SUGGEST_NEW_FEATURE: "Suggest a New Feature",
  REPORT_BUG: "Report a BUG",
  CRITICAL_ERROR: "Kritik Hata",
  URGENT_SUPPORT: "Acil Destek",
} as const;

export type RequestType = (typeof REQUEST_TYPES)[keyof typeof REQUEST_TYPES];

// İstek Tipi Görüntüleme İsimleri (Türkçe)
export const REQUEST_TYPE_LABELS: Record<string, string> = {
  [REQUEST_TYPES.TECHNICAL_SUPPORT]: "Teknik Destek",
  [REQUEST_TYPES.SUGGEST_IMPROVEMENT]: "İyileştirme Önerisi",
  [REQUEST_TYPES.SUGGEST_NEW_FEATURE]: "Yeni Özellik Önerisi",
  [REQUEST_TYPES.REPORT_BUG]: "Hata Bildirimi",
  [REQUEST_TYPES.CRITICAL_ERROR]: "Kritik Hata",
  [REQUEST_TYPES.URGENT_SUPPORT]: "Acil Destek",
};

// Öncelik Seviyeleri
export const PRIORITY_LEVELS = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
} as const;

export type PriorityLevel = (typeof PRIORITY_LEVELS)[keyof typeof PRIORITY_LEVELS];

// Öncelik Etiketleri
export const PRIORITY_LABELS: Record<PriorityLevel, string> = {
  [PRIORITY_LEVELS.LOW]: "Düşük",
  [PRIORITY_LEVELS.MEDIUM]: "Orta",
  [PRIORITY_LEVELS.HIGH]: "Yüksek",
  [PRIORITY_LEVELS.CRITICAL]: "Kritik",
};

// Ticket Durumları (TICKET_STATUS_META ile senkronize)
export const TICKET_STATUS = {
  NEW: "Yeni İstek",
  OPEN: "Açık",
  ASSIGNED: "Atanan",
  IN_PROGRESS: "İşlemde",
  RESOLVED: "Çözümlenen",
  CLOSED: "Çözüldü",
  ARCHIVED: "Kapalı",
} as const;

export type TicketStatus = (typeof TICKET_STATUS)[keyof typeof TICKET_STATUS];

// Acil/Kritik istek tipleri (istatistikler için)
export const URGENT_REQUEST_TYPES = [
  REQUEST_TYPES.CRITICAL_ERROR,
  REQUEST_TYPES.URGENT_SUPPORT,
] as const;

// Form Validasyon Limitleri
export const VALIDATION_LIMITS = {
  TITLE_MIN_LENGTH: 10,
  TITLE_MAX_LENGTH: 120,
  DESCRIPTION_MIN_LENGTH: 20,
  DESCRIPTION_MAX_LENGTH: 2000,
  COMMENT_MIN_LENGTH: 1,
  COMMENT_MAX_LENGTH: 1000,
  ATTACHMENT_MAX_SIZE_MB: 10,
  ATTACHMENT_MAX_SIZE_BYTES: 10 * 1024 * 1024,
  EFFORT_MIN_MINUTES: 1,
  EFFORT_MAX_MINUTES: 480, // 8 saat
} as const;

// Dosya Tipleri (Attachments için)
export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
] as const;

// Tablo Pagination Ayarları
export const TABLE_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: ["10", "20", "50", "100"],
  SHOW_SIZE_CHANGER: true,
  SHOW_QUICK_JUMPER: true,
} as const;

// Tarih Formatları
export const DATE_FORMATS = {
  DISPLAY: "DD.MM.YYYY",
  DISPLAY_WITH_TIME: "DD.MM.YYYY HH:mm",
  API: "YYYY-MM-DDTHH:mm:ss[Z]",
  FILE_EXPORT: "YYYY-MM-DD",
} as const;
