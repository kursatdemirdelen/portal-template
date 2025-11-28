/**
 * Ticket Domain Types
 * ====================
 * 
 * Tüm projede kullanılacak bilet ile ilgili TypeScript type'ları.
 * 
 * @module shared/types/ticket
 */

// =============================================================================
// TEMEL TİPLER
// =============================================================================

/**
 * Bilet durumları (Basit - Dashboard için)
 */
export type TicketStatusSimple = 'Açık' | 'İşlemde' | 'Çözüldü' | 'Kapatıldı';

/**
 * Bilet durumları (Detaylı - TicketsPage için)
 */
export type TicketStatusDetailed = 'Yeni İstek' | 'Atanan' | 'Çözümlenen' | 'Kapatılan';

/**
 * İstek tipleri (Basit - Türkçe)
 */
export type RequestTypeSimple = 'Hata' | 'Özellik' | 'Dokümantasyon' | 'Performans' | 'Güvenlik' | 'Tasarım';

/**
 * İstek tipleri (Detaylı - İngilizce)
 */
export type RequestTypeDetailed = 
  | 'Report a BUG'
  | 'Suggest a New Feature'
  | 'Technical Support'
  | 'Suggest Improvement';

// =============================================================================
// ANA ENTITY TİPLERİ
// =============================================================================

/**
 * Temel bilet entity'si (Dashboard/Sidebar için)
 */
export interface Ticket {
  id: string;
  title: string;
  customer: string;
  requestType: string;
  status: string;
  assignee: string;
  avatar: string;
  project: string;
  createdAt: string;
  tags?: string[];
  accessibleDepartments?: string[];
}

/**
 * Detaylı bilet kaydı (TicketsPage için)
 */
export interface TicketRecord extends Ticket {
  accessibleDepartments: string[];
}

/**
 * Bilet efor kaydı
 */
export interface TicketEffort {
  id: string;
  date: string;
  time: string;
  description: string;
  hours: number;
  user: string;
  userAvatar?: string;
}

/**
 * Bilet yorumu
 */
export interface TicketComment {
  id: string;
  user: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  isInternal?: boolean;
  replies?: TicketComment[];
}

/**
 * Bilet geçmiş kaydı
 */
export interface TicketHistoryItem {
  id: string;
  user: string;
  userAvatar?: string;
  action: string;
  field?: string;
  oldValue?: string;
  newValue?: string;
  timestamp: string;
}

/**
 * Bilet eki
 */
export interface TicketAttachment {
  id: string;
  name: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  url: string;
}

/**
 * Bilet proje bilgisi
 */
export interface TicketProjectInfo {
  projectId: string;
  projectName: string;
  projectStatus: 'active' | 'completed' | 'on-hold';
  progress?: number;
  teamSize?: number;
  endDate?: string;
}

/**
 * Tam bilet detayı
 */
export interface TicketDetail extends Ticket {
  description: string;
  createdBy: string;
  createdByAvatar?: string;
  assignedDate: string;
  closedDate?: string;
  resolved: boolean;
  resolvedAt?: string;
  efforts: TicketEffort[];
  comments: TicketComment[];
  history: TicketHistoryItem[];
  attachments: TicketAttachment[];
  projectInfo?: TicketProjectInfo;
}

// =============================================================================
// DURUM META BİLGİLERİ
// =============================================================================

/**
 * Bilet durum meta bilgisi
 */
export interface TicketStatusMeta {
  key: string;
  label: string;
  color: string;
  bgColor: string;
}
