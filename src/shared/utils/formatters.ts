/**
 * Shared Formatters & Utilities
 * =============================
 * Tüm feature'lar için ortak yardımcı fonksiyonlar.
 * Kod tekrarını önler ve tutarlılık sağlar.
 * 
 * @module shared/utils/formatters
 */

// ============================================================================
// DATE FORMATTERS
// ============================================================================

/**
 * Tarihi Türkçe formatında gösterir (örn: "24 Aralık 2025")
 */
export const formatDateLong = (date: string): string => {
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Tarihi kısa formatında gösterir (örn: "24 Ara 2025")
 */
export const formatDateShort = (date: string): string => {
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Tarihi sayısal formatında gösterir (örn: "24.12.2025")
 */
export const formatDateNumeric = (date: string): string => {
  return new Date(date).toLocaleDateString('tr-TR');
};

/**
 * Tarih ve saati gösterir (örn: "24.12.2025 14:30")
 */
export const formatDateTime = (date: string): string => {
  return new Date(date).toLocaleString('tr-TR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Relative tarih gösterir (örn: "2 gün önce")
 */
export const formatRelativeDate = (date: string): string => {
  const now = new Date();
  const target = new Date(date);
  const diffMs = now.getTime() - target.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Bugün';
  if (diffDays === 1) return 'Dün';
  if (diffDays < 7) return `${diffDays} gün önce`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} hafta önce`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} ay önce`;
  return `${Math.floor(diffDays / 365)} yıl önce`;
};

// ============================================================================
// PROJECT STATUS MAPPINGS
// ============================================================================

export type ProjectStatus = 'Active' | 'On Hold' | 'Completed' | 'Planning';

export const projectStatusLabels: Record<ProjectStatus, string> = {
  'Active': 'Devam Ediyor',
  'Completed': 'Tamamlandı',
  'On Hold': 'Beklemede',
  'Planning': 'Planlama',
};

export const projectStatusColors: Record<ProjectStatus, string> = {
  'Active': '#2563eb',
  'Completed': '#10b981',
  'On Hold': '#f59e0b',
  'Planning': '#6b7280',
};

export const getProjectStatusLabel = (status: ProjectStatus): string => {
  return projectStatusLabels[status] || status;
};

export const getProjectStatusColor = (status: ProjectStatus): string => {
  return projectStatusColors[status] || '#6b7280';
};

// ============================================================================
// TICKET STATUS MAPPINGS
// ============================================================================

export type TicketStatus = 'Open' | 'In Progress' | 'Closed' | 'On Hold' | 'Yeni' | 'Atanan' | 'İşlemde' | 'Çözümlenen' | 'Kapalı';

export const ticketStatusLabels: Record<string, string> = {
  'Open': 'Açık',
  'In Progress': 'Devam Ediyor',
  'Closed': 'Kapalı',
  'On Hold': 'Beklemede',
  'Yeni': 'Yeni',
  'Atanan': 'Atanan',
  'İşlemde': 'İşlemde',
  'Çözümlenen': 'Çözümlenen',
  'Kapalı': 'Kapalı',
};

export const ticketStatusColors: Record<string, string> = {
  'Open': '#3b82f6',
  'In Progress': '#f59e0b',
  'Closed': '#10b981',
  'On Hold': '#6b7280',
  'Yeni': '#3b82f6',
  'Atanan': '#8b5cf6',
  'İşlemde': '#f59e0b',
  'Çözümlenen': '#10b981',
  'Kapalı': '#6b7280',
};

export const getTicketStatusLabel = (status: string): string => {
  return ticketStatusLabels[status] || status;
};

export const getTicketStatusColor = (status: string): string => {
  return ticketStatusColors[status] || '#6b7280';
};

// ============================================================================
// PRIORITY MAPPINGS
// ============================================================================

export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

export const priorityLabels: Record<Priority, string> = {
  'Critical': 'Kritik',
  'High': 'Yüksek',
  'Medium': 'Orta',
  'Low': 'Düşük',
};

export const priorityColors: Record<Priority, string> = {
  'Critical': '#ef4444',
  'High': '#f59e0b',
  'Medium': '#3b82f6',
  'Low': '#10b981',
};

export const getPriorityLabel = (priority: Priority): string => {
  return priorityLabels[priority] || priority;
};

export const getPriorityColor = (priority: Priority): string => {
  return priorityColors[priority] || '#6b7280';
};

// ============================================================================
// TEAM STATUS MAPPINGS
// ============================================================================

export type TeamStatus = 'Aktif' | 'Beklemede' | 'Tamamlandı';

export const teamStatusColors: Record<TeamStatus, string> = {
  'Aktif': '#10b981',
  'Beklemede': '#f59e0b',
  'Tamamlandı': '#6b7280',
};

export const getTeamStatusColor = (status: TeamStatus): string => {
  return teamStatusColors[status] || '#6b7280';
};

// ============================================================================
// NUMBER FORMATTERS
// ============================================================================

/**
 * Sayıyı Türkçe formatında gösterir (örn: "1.234.567")
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('tr-TR');
};

/**
 * Yüzdeyi formatlar (örn: "75%")
 */
export const formatPercent = (num: number): string => {
  return `${Math.round(num)}%`;
};

/**
 * Para birimini formatlar (örn: "₺1.234,56")
 */
export const formatCurrency = (num: number, currency: string = 'TRY'): string => {
  return num.toLocaleString('tr-TR', {
    style: 'currency',
    currency,
  });
};

// ============================================================================
// STRING UTILITIES
// ============================================================================

/**
 * Metni belirli uzunlukta keser ve "..." ekler
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};

/**
 * İsimden baş harfleri çıkarır (örn: "Ahmet Yılmaz" → "AY")
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// ============================================================================
// DATE UTILITIES
// ============================================================================

/**
 * İki tarih arasındaki gün farkını hesaplar
 */
export const getDaysDifference = (date1: string, date2: string = new Date().toISOString()): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffMs = d1.getTime() - d2.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};

/**
 * Bitiş tarihine göre durum belirler
 */
export const getDeadlineStatus = (endDate: string): { color: string; text: string } => {
  const daysUntilEnd = getDaysDifference(endDate);
  
  if (daysUntilEnd < 0) return { color: '#ef4444', text: 'Gecikmiş' };
  if (daysUntilEnd === 0) return { color: '#ef4444', text: 'Bugün' };
  if (daysUntilEnd <= 7) return { color: '#f59e0b', text: 'Bu Hafta' };
  if (daysUntilEnd <= 30) return { color: '#f59e0b', text: 'Yaklaşan' };
  return { color: '#10b981', text: 'Yeterli' };
};
