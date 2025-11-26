/**
 * Customers UI Constants - Labels, Colors, Configurations
 */

import type { CustomerStatus, LicenseType, LicenseStatus } from '../model/types';

// Status Labels
export const STATUS_LABELS: Record<CustomerStatus, string> = {
  active: 'Aktif',
  inactive: 'Pasif',
  pending: 'Beklemede',
};

// Status Colors (Ant Design Tag colors)
export const STATUS_COLORS: Record<CustomerStatus, string> = {
  active: 'green',
  inactive: 'default',
  pending: 'orange',
};

// License Type Labels
export const LICENSE_TYPE_LABELS: Record<LicenseType, string> = {
  trial: 'Deneme',
  standard: 'Standart',
  premium: 'Premium',
  enterprise: 'Kurumsal',
};

// License Type Colors
export const LICENSE_TYPE_COLORS: Record<LicenseType, string> = {
  trial: 'default',
  standard: 'blue',
  premium: 'purple',
  enterprise: 'gold',
};

// License Status Labels
export const LICENSE_STATUS_LABELS: Record<LicenseStatus, string> = {
  active: 'Aktif',
  expired: 'Süresi Dolmuş',
  suspended: 'Askıya Alınmış',
};

// License Status Colors
export const LICENSE_STATUS_COLORS: Record<LicenseStatus, string> = {
  active: 'green',
  expired: 'red',
  suspended: 'orange',
};

// Türkiye şehirleri (en yaygın olanlar)
export const CITIES = [
  'İstanbul',
  'Ankara',
  'İzmir',
  'Bursa',
  'Antalya',
  'Adana',
  'Konya',
  'Gaziantep',
  'Kayseri',
  'Mersin',
  'Eskişehir',
  'Diyarbakır',
  'Samsun',
  'Denizli',
  'Şanlıurfa',
];

// Ülkeler
export const COUNTRIES = ['Türkiye', 'Almanya', 'İngiltere', 'ABD', 'Fransa', 'Hollanda'];

// Tablo konfigürasyonu
export const TABLE_CONFIG = {
  defaultPageSize: 10,
  pageSizeOptions: ['10', '20', '50'],
  scrollX: 1000,
};

// All statuses
export const ALL_STATUSES: CustomerStatus[] = ['active', 'inactive', 'pending'];

// All license types
export const ALL_LICENSE_TYPES: LicenseType[] = ['trial', 'standard', 'premium', 'enterprise'];
