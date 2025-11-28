/**
 * Settings UI Constants
 */

import { colors } from '@/shared/styles';
import type { SettingCategory } from '../model/types';

export const CATEGORY_META: Record<SettingCategory, {
  title: string;
  description: string;
  color: string;
  icon: string;
}> = {
  company: {
    title: 'Şirket Bilgileri',
    description: 'Logo, isim ve iletişim bilgileri',
    color: colors.primary,
    icon: 'Building2',
  },
  notifications: {
    title: 'Bildirimler',
    description: 'Bildirim kanalları ve tercihleri',
    color: colors.warning,
    icon: 'Bell',
  },
  sla: {
    title: 'SLA Ayarları',
    description: 'Yanıt ve çözüm süreleri',
    color: colors.info,
    icon: 'Clock',
  },
  tickets: {
    title: 'Bilet Ayarları',
    description: 'İstek türleri ve durumlar',
    color: colors.success,
    icon: 'Ticket',
  },
  workHours: {
    title: 'Çalışma Saatleri',
    description: 'Mesai saatleri ve günler',
    color: colors.orange,
    icon: 'Calendar',
  },
  theme: {
    title: 'Görünüm',
    description: 'Tema ve renk tercihleri',
    color: colors.accent,
    icon: 'Palette',
  },
  security: {
    title: 'Güvenlik',
    description: 'Oturum ve şifre politikaları',
    color: colors.error,
    icon: 'Shield',
  },
};

export const SLA_OPTIONS = [
  { label: '1 Saat', value: 1 },
  { label: '2 Saat', value: 2 },
  { label: '4 Saat', value: 4 },
  { label: '8 Saat', value: 8 },
  { label: '24 Saat', value: 24 },
  { label: '48 Saat', value: 48 },
  { label: '72 Saat', value: 72 },
  { label: '1 Hafta', value: 168 },
];

export const DIGEST_OPTIONS = [
  { label: 'Anlık', value: 'realtime' },
  { label: 'Saatlik', value: 'hourly' },
  { label: 'Günlük', value: 'daily' },
  { label: 'Haftalık', value: 'weekly' },
];

export const THEME_MODE_OPTIONS = [
  { label: 'Açık Tema', value: 'light' },
  { label: 'Koyu Tema', value: 'dark' },
  { label: 'Sistem Varsayılanı', value: 'system' },
];

export const FONT_SIZE_OPTIONS = [
  { label: 'Küçük', value: 'small' },
  { label: 'Orta', value: 'medium' },
  { label: 'Büyük', value: 'large' },
];

export const WORK_DAY_OPTIONS = [
  { label: 'Pazartesi', value: 'monday', short: 'Pzt' },
  { label: 'Salı', value: 'tuesday', short: 'Sal' },
  { label: 'Çarşamba', value: 'wednesday', short: 'Çar' },
  { label: 'Perşembe', value: 'thursday', short: 'Per' },
  { label: 'Cuma', value: 'friday', short: 'Cum' },
  { label: 'Cumartesi', value: 'saturday', short: 'Cmt' },
  { label: 'Pazar', value: 'sunday', short: 'Paz' },
];

export const TIMEZONE_OPTIONS = [
  { label: 'İstanbul (GMT+3)', value: 'Europe/Istanbul' },
  { label: 'Londra (GMT+0)', value: 'Europe/London' },
  { label: 'New York (GMT-5)', value: 'America/New_York' },
  { label: 'Berlin (GMT+1)', value: 'Europe/Berlin' },
  { label: 'Dubai (GMT+4)', value: 'Asia/Dubai' },
];

export const TWO_FACTOR_METHOD_OPTIONS = [
  { label: 'E-posta', value: 'email' },
  { label: 'SMS', value: 'sms' },
  { label: 'Authenticator App', value: 'authenticator' },
];
