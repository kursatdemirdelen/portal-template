/**
 * Proje Ekipleri - Mock Data
 */

import type { ProjectTeamDetail, ProjectTeamListItem } from "./types";
import { avatarColors } from "@/shared/styles";

// Mevcut kullanıcılardan avatar bilgileri - merkezi mockUsers ile uyumlu
const teamMembers = {
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
    leaderId: teamMembers.ahmet.id,
    leaderName: teamMembers.ahmet.name,
    leaderAvatar: teamMembers.ahmet.avatarUrl,
    leaderColor: teamMembers.ahmet.color,
    members: [
      { ...teamMembers.ahmet, role: "Project Manager" },
      { ...teamMembers.can, role: "Developer" },
      { ...teamMembers.fatih, role: "Developer" },
      { ...teamMembers.zeynep, role: "QA Engineer" },
      { ...teamMembers.mehmet, role: "Support Specialist" },
      { ...teamMembers.elif, role: "Support Specialist" },
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
    leaderId: teamMembers.burak.id,
    leaderName: teamMembers.burak.name,
    leaderAvatar: teamMembers.burak.avatarUrl,
    leaderColor: teamMembers.burak.color,
    members: [
      { ...teamMembers.burak, role: "Tech Lead" },
      { ...teamMembers.zeynep, role: "Backend Developer" },
      { ...teamMembers.mehmet, role: "Backend Developer" },
      { ...teamMembers.melis, role: "DevOps Engineer" },
      { ...teamMembers.ayse, role: "API Specialist" },
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
    leaderId: teamMembers.ayse.id,
    leaderName: teamMembers.ayse.name,
    leaderAvatar: teamMembers.ayse.avatarUrl,
    leaderColor: teamMembers.ayse.color,
    members: [
      { ...teamMembers.ayse, role: "Design Lead" },
      { ...teamMembers.can, role: "UI Designer" },
      { ...teamMembers.elif, role: "UX Researcher" },
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
    leaderId: teamMembers.elif.id,
    leaderName: teamMembers.elif.name,
    leaderAvatar: teamMembers.elif.avatarUrl,
    leaderColor: teamMembers.elif.color,
    members: [
      { ...teamMembers.elif, role: "QA Lead" },
      { ...teamMembers.melis, role: "Test Engineer" },
      { ...teamMembers.ahmet, role: "Automation Engineer" },
      { ...teamMembers.zeynep, role: "Test Analyst" },
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
    leaderId: teamMembers.fatih.id,
    leaderName: teamMembers.fatih.name,
    leaderAvatar: teamMembers.fatih.avatarUrl,
    leaderColor: teamMembers.fatih.color,
    members: [
      { ...teamMembers.fatih, role: "Mobile Lead" },
      { ...teamMembers.emre, role: "iOS Developer" },
      { ...teamMembers.burak, role: "Android Developer" },
      { ...teamMembers.can, role: "React Native Developer" },
      { ...teamMembers.mehmet, role: "Mobile QA" },
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
    leaderId: teamMembers.zeynep.id,
    leaderName: teamMembers.zeynep.name,
    leaderAvatar: teamMembers.zeynep.avatarUrl,
    leaderColor: teamMembers.zeynep.color,
    members: [
      { ...teamMembers.zeynep, role: "Data Lead" },
      { ...teamMembers.emre, role: "Data Engineer" },
      { ...teamMembers.melis, role: "Data Analyst" },
      { ...teamMembers.ayse, role: "BI Specialist" },
      { ...teamMembers.ahmet, role: "Data Scientist" },
      { ...teamMembers.elif, role: "Report Developer" },
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
    leaderId: teamMembers.emre.id,
    leaderName: teamMembers.emre.name,
    leaderAvatar: teamMembers.emre.avatarUrl,
    leaderColor: teamMembers.emre.color,
    members: [
      { ...teamMembers.emre, role: "DevOps Lead" },
      { ...teamMembers.burak, role: "Cloud Engineer" },
      { ...teamMembers.fatih, role: "SRE" },
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
    leaderId: teamMembers.mehmet.id,
    leaderName: teamMembers.mehmet.name,
    leaderAvatar: teamMembers.mehmet.avatarUrl,
    leaderColor: teamMembers.mehmet.color,
    members: [
      { ...teamMembers.mehmet, role: "Security Lead" },
      { ...teamMembers.can, role: "Security Engineer" },
      { ...teamMembers.melis, role: "Compliance Analyst" },
      { ...teamMembers.emre, role: "Penetration Tester" },
    ],
    createdAt: "2024-08-01",
    updatedAt: "2025-11-24",
  },
];

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
