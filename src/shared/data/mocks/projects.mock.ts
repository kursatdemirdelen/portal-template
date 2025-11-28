/**
 * Projects Mock Data
 * ===================
 * 
 * Merkezi proje mock verileri.
 * Tüm projeler tutarlı ID/Code yapısına sahiptir.
 * 
 * @module shared/data/mocks/projects.mock
 */

import type { 
  ProjectOption, 
  Project, 
  DashboardProject, 
  ProjectTeam 
} from '@/shared/types';
import { avatarColors } from '@/shared/styles';

// =============================================================================
// PROJE SEÇENEKLERİ (Select/Dropdown için)
// =============================================================================

export const mockProjectOptions: ProjectOption[] = [
  { id: "PRJ-001", label: "Portal Intellium", value: "PRJ-001" },
  { id: "PRJ-002", label: "Portal Support", value: "PRJ-002" },
  { id: "PRJ-003", label: "Mobile App", value: "PRJ-003" },
  { id: "PRJ-004", label: "API Gateway", value: "PRJ-004" },
  { id: "PRJ-005", label: "Scrumboard", value: "PRJ-005" },
];

// =============================================================================
// TAM PROJE VERİLERİ
// =============================================================================

export const mockProjects: Project[] = [
  {
    id: "PRJ-001",
    code: "PRJ-001",
    name: "Portal Intellium",
    status: "Active",
    progress: 76,
    teamSize: 6,
    startDate: "2025-03-01",
    endDate: "2026-03-31",
    description: "Kurumsal portal uygulaması - Ana ürün",
  },
  {
    id: "PRJ-002",
    code: "PRJ-002",
    name: "Portal Support",
    status: "Active",
    progress: 85,
    teamSize: 4,
    startDate: "2025-04-01",
    endDate: "2025-12-31",
    description: "Müşteri destek portalı",
  },
  {
    id: "PRJ-003",
    code: "PRJ-003",
    name: "Mobile App",
    status: "Active",
    progress: 42,
    teamSize: 3,
    startDate: "2025-06-01",
    endDate: "2026-02-28",
    description: "iOS ve Android mobil uygulama",
  },
  {
    id: "PRJ-004",
    code: "PRJ-004",
    name: "API Gateway",
    status: "Active",
    progress: 90,
    teamSize: 5,
    startDate: "2025-01-15",
    endDate: "2025-12-15",
    description: "Merkezi API yönetim sistemi",
  },
  {
    id: "PRJ-005",
    code: "PRJ-005",
    name: "Scrumboard",
    status: "Active",
    progress: 23,
    teamSize: 3,
    startDate: "2025-09-01",
    endDate: "2026-04-30",
    description: "Proje yönetim ve scrum board aracı",
  },
];

// =============================================================================
// DASHBOARD AKTİF PROJELER (mockProjects ile tutarlı)
// =============================================================================

export const mockDashboardProjects: DashboardProject[] = [
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
// PROJE EKİPLERİ (mockProjects ile tutarlı)
// =============================================================================

export const mockProjectTeams: ProjectTeam[] = [
  {
    id: "team-01",
    name: "Portal Squad",
    projectName: "Portal Intellium",
    role: "Core Development",
    members: 6,
    status: "Aktif",
    people: [
      { name: "Ahmet Yılmaz", initials: "AY", color: avatarColors.blue },
      { name: "Can Şimşek", initials: "CŞ", color: avatarColors.deepOrange },
      { name: "Fatih Aksu", initials: "FA", color: avatarColors.deepPurple },
      { name: "Kürşat Demirdelen", initials: "KD", color: avatarColors.indigo },
      { name: "Zeynep Ünal", initials: "ZÜ", color: avatarColors.purple },
      { name: "Mehmet Can", initials: "MC", color: avatarColors.red },
    ],
  },
  {
    id: "team-02",
    name: "API Squad",
    projectName: "API Gateway",
    role: "Backend Development",
    members: 5,
    status: "Aktif",
    people: [
      { name: "Zeynep Ünal", initials: "ZÜ", color: avatarColors.purple },
      { name: "Mehmet Can", initials: "MC", color: avatarColors.red },
      { name: "Burak Kaya", initials: "BK", color: avatarColors.teal },
      { name: "Melis Kara", initials: "MK", color: avatarColors.darkRed },
      { name: "Ayşe Demir", initials: "AD", color: avatarColors.orange },
    ],
  },
  {
    id: "team-03",
    name: "Design Team",
    projectName: "Portal Intellium",
    role: "UI/UX Design",
    members: 3,
    status: "Aktif",
    people: [
      { name: "Burak Kaya", initials: "BK", color: avatarColors.teal },
      { name: "Can Şimşek", initials: "CŞ", color: avatarColors.deepOrange },
      { name: "Fatih Aksu", initials: "FA", color: avatarColors.deepPurple },
    ],
  },
  {
    id: "team-04",
    name: "Quality Team",
    projectName: "Portal Intellium",
    role: "QA & Testing",
    members: 4,
    status: "Aktif",
    people: [
      { name: "Elif Yıldız", initials: "EY", color: avatarColors.green },
      { name: "Melis Kara", initials: "MK", color: avatarColors.darkRed },
      { name: "Ahmet Yılmaz", initials: "AY", color: avatarColors.blue },
      { name: "Zeynep Ünal", initials: "ZÜ", color: avatarColors.purple },
    ],
  },
  {
    id: "team-05",
    name: "Product Team",
    projectName: "Portal Intellium",
    role: "Product Management",
    members: 3,
    status: "Aktif",
    people: [
      { name: "Ayşe Demir", initials: "AD", color: avatarColors.orange },
      { name: "Mehmet Can", initials: "MC", color: avatarColors.red },
      { name: "Burak Kaya", initials: "BK", color: avatarColors.teal },
    ],
  },
  {
    id: "team-06",
    name: "Support Team",
    projectName: "Portal Support",
    role: "Customer Support",
    members: 4,
    status: "Aktif",
    people: [
      { name: "Nur Çelik", initials: "NÇ", color: avatarColors.cyan },
      { name: "Elif Yıldız", initials: "EY", color: avatarColors.green },
      { name: "Can Şimşek", initials: "CŞ", color: avatarColors.deepOrange },
      { name: "Melis Kara", initials: "MK", color: avatarColors.darkRed },
    ],
  },
];

// =============================================================================
// MÜŞTERİLER
// =============================================================================

export const mockCustomers = [
  { id: "CUST001", name: "Acme Corp" },
  { id: "CUST002", name: "TechStart" },
  { id: "CUST003", name: "InnovateCo" },
  { id: "CUST004", name: "Digital Solutions" },
  { id: "CUST005", name: "Cloud Systems" },
] as const;

export type Customer = typeof mockCustomers[number];

// =============================================================================
// YARDIMCI FONKSİYONLAR
// =============================================================================

/**
 * ID'ye göre proje bul
 */
export const getProjectById = (id: string): Project | undefined => {
  return mockProjects.find((p) => p.id === id);
};

/**
 * Kod'a göre proje bul
 */
export const getProjectByCode = (code: string): Project | undefined => {
  return mockProjects.find((p) => p.code === code);
};

/**
 * Proje istatistikleri
 */
export const getProjectStats = () => {
  return {
    total: mockProjects.length,
    active: mockProjects.filter((p) => p.status === "Active").length,
    onHold: mockProjects.filter((p) => p.status === "On Hold").length,
    completed: mockProjects.filter((p) => p.status === "Completed").length,
  };
};

/**
 * Ekip ID'sine göre ekip bul
 */
export const getTeamById = (id: string): ProjectTeam | undefined => {
  return mockProjectTeams.find((t) => t.id === id);
};
