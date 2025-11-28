/**
 * Dashboard Mock Data
 * ====================
 * 
 * Dashboard sayfası için özel mock veriler.
 * mockUsers'daki Kürşat Demirdelen ile tutarlıdır.
 * 
 * @module shared/data/mocks/dashboard.mock
 */

import type { 
  DashboardUserInfo, 
  DashboardProject, 
  TicketDistributionItem 
} from '@/shared/types';
import { colors } from '@/shared/styles';

// =============================================================================
// VARSAYILAN KULLANICI (mockUsers USER011 ile tutarlı)
// =============================================================================

export const mockCurrentUser: DashboardUserInfo = {
  name: "Kürşat Demirdelen",
  role: "Senior Developer",
  department: "Portal Squad",
  email: "kursat.demirdelen@portal.com",
  avatar: "KD",
  avatarUrl: "https://i.pravatar.cc/150?img=12",
  company: "Intellium",
  weeklyProgress: 72,
  statusText: "Çevrimiçi",
  statusColor: colors.success,
  stats: {
    openTickets: 8,
    todayClosed: 2,
    activeProjects: 3,
  },
};

// =============================================================================
// DASHBOARD AKTİF PROJELER (mockProjects ile tutarlı)
// =============================================================================

export const mockActiveProjects: DashboardProject[] = [
  {
    name: "Portal Intellium",
    code: "PRJ-001",
    progress: 76,
    status: "On Track",
  },
  {
    name: "Mobile App",
    code: "PRJ-003",
    progress: 42,
    status: "At Risk",
  },
  {
    name: "Scrumboard",
    code: "PRJ-005",
    progress: 23,
    status: "Planning",
  },
];

// =============================================================================
// İSTEK TİPLERİ SEÇENEKLERİ
// =============================================================================

export const requestTypeOptions = [
  { label: "🐛 Hata / Bug", value: "bug" },
  { label: "✨ Yeni Özellik", value: "feature" },
  { label: "📚 Dokümantasyon", value: "documentation" },
  { label: "⚡ Performans", value: "performance" },
  { label: "🔒 Güvenlik", value: "security" },
  { label: "🎨 Tasarım", value: "design" },
  { label: "❓ Soru / Destek", value: "question" },
] as const;

export type RequestType = typeof requestTypeOptions[number]['value'];

// =============================================================================
// YARDIMCI FONKSİYONLAR
// =============================================================================

/**
 * Varsayılan bilet dağılımı oluştur
 */
export const createTicketDistribution = (
  newCount: number,
  assignedCount: number,
  resolvedCount: number
): TicketDistributionItem[] => [
  {
    label: "Yeni İstek",
    value: newCount,
    color: colors.info,
  },
  {
    label: "Atanan",
    value: assignedCount,
    color: colors.warning,
  },
  {
    label: "Çözümlenen",
    value: resolvedCount,
    color: colors.success,
  },
];
