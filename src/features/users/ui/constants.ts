/**
 * Users UI Constants
 * Re-exports merkezi constants'lardan - backward compatibility
 */

// Merkezi constants'lardan import et
export { 
  USER_ROLE_LABELS as ROLE_LABELS,
  USER_ROLE_DESCRIPTIONS as ROLE_DESCRIPTIONS,
  USER_ROLE_COLORS as ROLE_COLORS,
  USER_STATUS_LABELS as STATUS_LABELS,
  USER_STATUS_COLORS as STATUS_COLORS,
  DEPARTMENTS,
} from '@/shared/config/constants';

// Table Columns Configuration
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
};
