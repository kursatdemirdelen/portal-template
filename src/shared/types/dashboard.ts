/**
 * Dashboard Domain Types
 * =======================
 * 
 * Dashboard sayfası için özel TypeScript type'ları.
 * 
 * @module shared/types/dashboard
 */

import type { ProjectTeam, DashboardProject } from './project';

// =============================================================================
// KULLANICI KARTI TİPLERİ
// =============================================================================

/**
 * Dashboard için kullanıcı rol tipi
 */
export type DashboardUserRole = 'admin' | 'manager' | 'developer' | 'user';

/**
 * Dashboard kullanıcı istatistikleri
 */
export interface DashboardUserStats {
  openTickets: number;
  todayClosed: number;
  activeProjects: number;
}

/**
 * Dashboard kullanıcı kartı için kullanıcı bilgisi
 */
export interface DashboardUserInfo {
  name: string;
  role: string;
  department: string;
  email: string;
  avatar: string;
  avatarUrl?: string;
  company: string;
  stats?: DashboardUserStats;
  weeklyProgress?: number;
  statusText?: string;
  statusColor?: string;
}

// =============================================================================
// BİLET DAĞILIMI TİPLERİ
// =============================================================================

/**
 * Bilet dağılımı pasta/bar grafiği için
 */
export interface TicketDistributionItem {
  label: string;
  value: number;
  color: string;
}

/**
 * Bilet durum özeti
 */
export interface TicketStatusSummary {
  key: string;
  label: string;
  color: string;
  count: number;
}

// =============================================================================
// HIZLI ERİŞİM TİPLERİ
// =============================================================================

/**
 * Hızlı erişim aksiyonu
 */
export interface QuickAction {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  roles?: DashboardUserRole[];
}

// =============================================================================
// DASHBOARD GENEL TİPLERİ
// =============================================================================

/**
 * Dashboard sayfası için tam data yapısı
 */
export interface DashboardData {
  user: DashboardUserInfo;
  projects: DashboardProject[];
  teams: ProjectTeam[];
  ticketDistribution: TicketDistributionItem[];
  ticketStatusSummary: TicketStatusSummary[];
}
