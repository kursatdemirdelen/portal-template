/**
 * Users UI Constants
 * 
 * Kullanıcı modülü için sabit değerler.
 * Merkezi constants'lardan re-export ve feature-specific constants.
 * 
 * @usage
 * import { ROLE_LABELS, STATUS_COLORS, TABLE_COLUMNS } from '../ui/constants';
 */

// =============================================================================
// RE-EXPORTS FROM SHARED CONFIG
// =============================================================================

export { 
  USER_ROLE_LABELS as ROLE_LABELS,
  USER_ROLE_DESCRIPTIONS as ROLE_DESCRIPTIONS,
  USER_ROLE_COLORS as ROLE_COLORS,
  USER_STATUS_LABELS as STATUS_LABELS,
  USER_STATUS_COLORS as STATUS_COLORS,
  DEPARTMENTS,
} from '@/shared/config/constants';

// =============================================================================
// FEATURE-SPECIFIC CONSTANTS
// =============================================================================

/**
 * Tablo kolon konfigürasyonu
 */
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
} as const;

/**
 * Şirket listesi
 */
export const COMPANIES = [
  { label: "Teknoloji A.Ş.", value: "Teknoloji A.Ş." },
  { label: "İnsan Kaynakları Ltd.", value: "İnsan Kaynakları Ltd." },
  { label: "Pazarlama Inc.", value: "Pazarlama Inc." },
  { label: "Finans Ltd.", value: "Finans Ltd." },
  { label: "Operasyon A.Ş.", value: "Operasyon A.Ş." },
] as const;

/**
 * Dil seçenekleri
 */
export const LANGUAGES = [
  { label: "Türkçe", value: "tr" },
  { label: "English", value: "en" },
  { label: "Deutsch", value: "de" },
  { label: "Français", value: "fr" },
] as const;

/**
 * Zaman dilimi seçenekleri
 */
export const TIMEZONES = [
  { label: "(GMT+3:00) Istanbul, Minsk, Moscow...", value: "Europe/Istanbul" },
  { label: "(GMT+0:00) London, Dublin, Lisbon...", value: "Europe/London" },
  { label: "(GMT+1:00) Paris, Berlin, Amsterdam...", value: "Europe/Berlin" },
  { label: "(GMT+2:00) Cairo, Athens, Helsinki...", value: "Europe/Athens" },
] as const;

