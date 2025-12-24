/**
 * Takım / Ekip - Mock Data
 * Merkezi takım üyesi ve seremoni verileri
 */

import { TEAM_ROLES, USER_ROLE_LABELS } from '@/shared/config/constants';
import { avatarColors } from '@/shared/styles';

// =============================================================================
// TİPLER
// =============================================================================

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  color: string;
}

export interface ProjectTeamDetail {
  id: string;
  name: string;
  projectName: string;
  projectId: string;
  description: string;
  leaderId: string;
  leaderName: string;
  leaderAvatar?: string;
  leaderColor: string;
  members: TeamMember[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectTeamListItem {
  id: string;
  name: string;
  projectName: string;
  leaderId: string;
  members: Array<{
    id: string;
    name: string;
    avatarUrl?: string;
    color: string;
  }>;
  memberCount: number;
}

// =============================================================================
// BASİT TAKIM ÜYELERİ (Dashboard/Sidebar için)
// =============================================================================

// Takım üyeleri (projects/ProjectTeamPage için)
// Merkezi TEAM_ROLES kullanılır
export const mockTeamMembers = [
  { name: "Ayşe Demir", role: "Project Manager", load: 70 },
  { name: "Mehmet Can", role: "Developer", load: 50 },
  { name: "Melis Kara", role: "QA Engineer", load: 40 },
];

// Sprint seremonileri
export const mockCeremonies = [
  { children: "Sprint Planning - 24 Kasım" },
  { children: "Daily Standup - Her gün 09:30" },
  { children: "Sprint Review - 07 Aralık" },
];

// Rol şablonları (UserCreatePage için)
// Merkezi USER_ROLE_LABELS'den otomatik oluşturulur
export const mockRoleTemplates = Object.entries(USER_ROLE_LABELS).map(
  ([roleKey, roleLabel]) => `${roleLabel} (${roleKey})`
);

// =============================================================================
// PROJE EKİPLERİ (ProjectTeamListPage, ProjectTeamDetailPage için)
// =============================================================================

// Mevcut kullanıcılardan avatar bilgileri - merkezi mockUsers ile uyumlu
const teamMembersData = {
  ahmet: { id: "USER001", name: "Ahmet Yılmaz", color: avatarColors.blue, avatarUrl: "https://i.pravatar.cc/150?img=68" },
  zeynep: { id: "USER002", name: "Zeynep Ünal", color: avatarColors.purple, avatarUrl: "https://i.pravatar.cc/150?img=47" },
  mehmet: { id: "USER003", name: "Mehmet Can", color: avatarColors.red, avatarUrl: "https://i.pravatar.cc/150?img=12" },
  elif: { id: "USER004", name: "Elif Yıldız", color: avatarColors.green, avatarUrl: "https://i.pravatar.cc/150?img=32" },
  burak: { id: "USER005", name: "Burak Kaya", color: avatarColors.teal, avatarUrl: "https://i.pravatar.cc/150?img=53" },
  can: { id: "USER006", name: "Can Şimşek", color: avatarColors.deepOrange, avatarUrl: "https://i.pravatar.cc/150?img=59" },
  fatih: { id: "USER007", name: "Fatih Aksu", color: avatarColors.deepPurple, avatarUrl: "https://i.pravatar.cc/150?img=14" },
  ayse: { id: "USER008", name: "Ayşe Demir", color: avatarColors.orange, avatarUrl: "https://i.pravatar.cc/150?img=44" },
  melis: { id: "USER009", name: "Melis Kara", color: avatarColors.darkRed, avatarUrl: "https://i.pravatar.cc/150?img=25" },
  emre: { id: "USER012", name: "Emre Şahin", color: avatarColors.amber, avatarUrl: "https://i.pravatar.cc/150?img=12" },
};

export const mockProjectTeamDetails: ProjectTeamDetail[] = [
  {
    id: "team-01",
    name: "Portal Support Team",
    projectName: "Portal Müşteri Destek",
    projectId: "proj-01",
    description: "Müşteri destek ve çağrı yönetimi ekibi",
    leaderId: teamMembersData.ahmet.id,
    leaderName: teamMembersData.ahmet.name,
    leaderAvatar: teamMembersData.ahmet.avatarUrl,
    leaderColor: teamMembersData.ahmet.color,
    members: [
      { ...teamMembersData.ahmet, role: "Project Manager" },
      { ...teamMembersData.can, role: "Developer" },
      { ...teamMembersData.fatih, role: "Developer" },
      { ...teamMembersData.zeynep, role: "QA Engineer" },
      { ...teamMembersData.mehmet, role: "Support Specialist" },
      { ...teamMembersData.elif, role: "Support Specialist" },
    ],
    createdAt: "2024-01-15",
    updatedAt: "2025-11-20",
  },
  {
    id: "team-02",
    name: "API Squad",
    projectName: "API Gateway",
    projectId: "proj-02",
    description: "API geliştirme ve entegrasyon ekibi",
    leaderId: teamMembersData.burak.id,
    leaderName: teamMembersData.burak.name,
    leaderAvatar: teamMembersData.burak.avatarUrl,
    leaderColor: teamMembersData.burak.color,
    members: [
      { ...teamMembersData.burak, role: "Tech Lead" },
      { ...teamMembersData.zeynep, role: "Backend Developer" },
      { ...teamMembersData.mehmet, role: "Backend Developer" },
      { ...teamMembersData.melis, role: "DevOps Engineer" },
      { ...teamMembersData.ayse, role: "API Specialist" },
    ],
    createdAt: "2024-03-01",
    updatedAt: "2025-11-18",
  },
  {
    id: "team-03",
    name: "Design Team",
    projectName: "Portal UI/UX",
    projectId: "proj-03",
    description: "Kullanıcı deneyimi ve arayüz tasarım ekibi",
    leaderId: teamMembersData.ayse.id,
    leaderName: teamMembersData.ayse.name,
    leaderAvatar: teamMembersData.ayse.avatarUrl,
    leaderColor: teamMembersData.ayse.color,
    members: [
      { ...teamMembersData.ayse, role: "Design Lead" },
      { ...teamMembersData.can, role: "UI Designer" },
      { ...teamMembersData.elif, role: "UX Researcher" },
    ],
    createdAt: "2024-02-10",
    updatedAt: "2025-11-15",
  },
  {
    id: "team-04",
    name: "Quality Team",
    projectName: "Test & QA",
    projectId: "proj-04",
    description: "Kalite güvence ve test otomasyonu ekibi",
    leaderId: teamMembersData.elif.id,
    leaderName: teamMembersData.elif.name,
    leaderAvatar: teamMembersData.elif.avatarUrl,
    leaderColor: teamMembersData.elif.color,
    members: [
      { ...teamMembersData.elif, role: "QA Lead" },
      { ...teamMembersData.melis, role: "Test Engineer" },
      { ...teamMembersData.ahmet, role: "Automation Engineer" },
      { ...teamMembersData.zeynep, role: "Test Analyst" },
    ],
    createdAt: "2024-04-05",
    updatedAt: "2025-11-22",
  },
  {
    id: "team-05",
    name: "Mobile Team",
    projectName: "Mobile App",
    projectId: "proj-05",
    description: "Mobil uygulama geliştirme ekibi",
    leaderId: teamMembersData.fatih.id,
    leaderName: teamMembersData.fatih.name,
    leaderAvatar: teamMembersData.fatih.avatarUrl,
    leaderColor: teamMembersData.fatih.color,
    members: [
      { ...teamMembersData.fatih, role: "Mobile Lead" },
      { ...teamMembersData.emre, role: "iOS Developer" },
      { ...teamMembersData.burak, role: "Android Developer" },
      { ...teamMembersData.can, role: "React Native Developer" },
      { ...teamMembersData.mehmet, role: "Mobile QA" },
    ],
    createdAt: "2024-05-20",
    updatedAt: "2025-11-25",
  },
  {
    id: "team-06",
    name: "Data Team",
    projectName: "Analytics Platform",
    projectId: "proj-06",
    description: "Veri analizi ve raporlama ekibi",
    leaderId: teamMembersData.zeynep.id,
    leaderName: teamMembersData.zeynep.name,
    leaderAvatar: teamMembersData.zeynep.avatarUrl,
    leaderColor: teamMembersData.zeynep.color,
    members: [
      { ...teamMembersData.zeynep, role: "Data Lead" },
      { ...teamMembersData.emre, role: "Data Engineer" },
      { ...teamMembersData.melis, role: "Data Analyst" },
      { ...teamMembersData.ayse, role: "BI Specialist" },
      { ...teamMembersData.ahmet, role: "Data Scientist" },
      { ...teamMembersData.elif, role: "Report Developer" },
    ],
    createdAt: "2024-06-01",
    updatedAt: "2025-11-27",
  },
  {
    id: "team-07",
    name: "DevOps Team",
    projectName: "Infrastructure",
    projectId: "proj-07",
    description: "Altyapı ve sürekli entegrasyon ekibi",
    leaderId: teamMembersData.emre.id,
    leaderName: teamMembersData.emre.name,
    leaderAvatar: teamMembersData.emre.avatarUrl,
    leaderColor: teamMembersData.emre.color,
    members: [
      { ...teamMembersData.emre, role: "DevOps Lead" },
      { ...teamMembersData.burak, role: "Cloud Engineer" },
      { ...teamMembersData.fatih, role: "SRE" },
    ],
    createdAt: "2024-07-15",
    updatedAt: "2025-11-20",
  },
  {
    id: "team-08",
    name: "Security Team",
    projectName: "Security Ops",
    projectId: "proj-08",
    description: "Güvenlik ve uyumluluk ekibi",
    leaderId: teamMembersData.mehmet.id,
    leaderName: teamMembersData.mehmet.name,
    leaderAvatar: teamMembersData.mehmet.avatarUrl,
    leaderColor: teamMembersData.mehmet.color,
    members: [
      { ...teamMembersData.mehmet, role: "Security Lead" },
      { ...teamMembersData.can, role: "Security Engineer" },
      { ...teamMembersData.melis, role: "Compliance Analyst" },
      { ...teamMembersData.emre, role: "Penetration Tester" },
    ],
    createdAt: "2024-08-01",
    updatedAt: "2025-11-24",
  },
];

// =============================================================================
// LİSTE GÖRÜNÜMÜ VE YARDIMCI FONKSİYONLAR
// =============================================================================

// Liste görünümü için dönüşüm
export const mockProjectTeamList: ProjectTeamListItem[] = mockProjectTeamDetails.map((team) => ({
  id: team.id,
  name: team.name,
  projectName: team.projectName,
  leaderId: team.leaderId,
  members: team.members.slice(0, 5).map((m) => ({
    id: m.id,
    name: m.name,
    avatarUrl: m.avatarUrl,
    color: m.color,
  })),
  memberCount: team.members.length,
}));

// ID'ye göre takım getir
export const getProjectTeamById = (id: string): ProjectTeamDetail | undefined => {
  return mockProjectTeamDetails.find((team) => team.id === id);
};

// Tüm takım istatistiklerini getir
export const getProjectTeamStats = () => {
  return {
    totalTeams: mockProjectTeamDetails.length,
    totalMembers: mockProjectTeamDetails.reduce((sum, t) => sum + t.members.length, 0),
  };
};
