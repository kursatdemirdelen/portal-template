/**
 * Parameter Category Labels and Metadata
 */

import type { ParameterCategory } from '../model/types';

export const CATEGORY_LABELS: Record<ParameterCategory, string> = {
  system: 'Sistem',
  notification: 'Bildirim',
  sla: 'SLA',
  ticket: 'Bilet',
};

export const CATEGORY_DESCRIPTIONS: Record<ParameterCategory, string> = {
  system: 'Temel sistem ayarları ve konfigürasyonları',
  notification: 'Bildirim tercihleri ve kanal ayarları',
  sla: 'Hizmet seviyesi anlaşmaları ve SLA kuralları',
  ticket: 'Bilet sistemi ayarları ve kategorileri',
};

export const CATEGORY_COLORS: Record<ParameterCategory, string> = {
  system: '#5b7aed',
  notification: '#f39c12',
  sla: '#e74c3c',
  ticket: '#27ae60',
};

/**
 * Parameter Type Labels
 */
export const TYPE_LABELS: Record<string, string> = {
  text: 'Metin',
  number: 'Sayı',
  boolean: 'Evet/Hayır',
  select: 'Seçim Listesi',
  json: 'JSON',
};

/**
 * Status Labels
 */
export const STATUS_LABELS: Record<string, string> = {
  active: 'Aktif',
  inactive: 'İnaktif',
};

export const STATUS_COLORS: Record<string, string> = {
  active: '#27ae60',
  inactive: '#f39c12',
};
