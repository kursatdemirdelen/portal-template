import { colors, avatarColors } from "@/shared/styles";

/**
 * Proje Ekipleri UI Constants
 */

// Ekip üye rolleri
export const TEAM_ROLES = [
  "Project Manager",
  "Tech Lead",
  "Developer",
  "Backend Developer",
  "Frontend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "iOS Developer",
  "Android Developer",
  "DevOps Engineer",
  "QA Engineer",
  "Test Engineer",
  "UI Designer",
  "UX Designer",
  "Data Engineer",
  "Data Analyst",
  "Security Engineer",
  "Support Specialist",
] as const;

export type TeamRole = (typeof TEAM_ROLES)[number];

// Rol renkleri (badge için)
export const ROLE_COLORS: Record<string, string> = {
  "Project Manager": colors.primary,
  "Tech Lead": colors.accent,
  Developer: colors.info,
  "Backend Developer": avatarColors.teal,
  "Frontend Developer": colors.error,
  "Full Stack Developer": avatarColors.deepPurple,
  "Mobile Developer": avatarColors.deepOrange,
  "iOS Developer": avatarColors.indigo,
  "Android Developer": avatarColors.green,
  "DevOps Engineer": avatarColors.deepPurple,
  "QA Engineer": colors.warning,
  "Test Engineer": avatarColors.orange,
  "UI Designer": avatarColors.cyan,
  "UX Designer": colors.info,
  "Data Engineer": colors.textPrimary,
  "Data Analyst": colors.textSecondary,
  "Security Engineer": avatarColors.darkRed,
  "Support Specialist": avatarColors.neutral,
};

// Mock Proje Listesi (form select için)
export const PROJECTS = [
  { id: "proj-01", name: "Portal Müşteri Destek" },
  { id: "proj-02", name: "API Gateway" },
  { id: "proj-03", name: "Portal UI/UX" },
  { id: "proj-04", name: "Test & QA" },
  { id: "proj-05", name: "Mobile App" },
  { id: "proj-06", name: "Analytics Platform" },
  { id: "proj-07", name: "Infrastructure" },
  { id: "proj-08", name: "Security Ops" },
  { id: "proj-09", name: "CRM Integration" },
  { id: "proj-10", name: "E-Commerce Platform" },
] as const;

// Mock Kullanıcı Listesi (üye seçimi için) - merkezi mockUsers ile uyumlu
export const AVAILABLE_USERS = [
  { id: "USER001", name: "Ahmet Yılmaz", email: "ahmet.yilmaz@portal.com", avatarUrl: "https://i.pravatar.cc/150?img=68", color: avatarColors.blue },
  { id: "USER002", name: "Zeynep Ünal", email: "zeynep.unal@portal.com", avatarUrl: "https://i.pravatar.cc/150?img=47", color: avatarColors.purple },
  { id: "USER003", name: "Mehmet Can", email: "mehmet.can@portal.com", avatarUrl: "https://i.pravatar.cc/150?img=12", color: avatarColors.red },
  { id: "USER004", name: "Elif Yıldız", email: "elif.yildiz@portal.com", avatarUrl: "https://i.pravatar.cc/150?img=32", color: avatarColors.green },
  { id: "USER005", name: "Burak Kaya", email: "burak.kaya@portal.com", avatarUrl: "https://i.pravatar.cc/150?img=53", color: avatarColors.teal },
  { id: "USER006", name: "Can Şimşek", email: "can.simsek@portal.com", avatarUrl: "https://i.pravatar.cc/150?img=59", color: avatarColors.deepOrange },
  { id: "USER007", name: "Fatih Aksu", email: "fatih.aksu@portal.com", avatarUrl: "https://i.pravatar.cc/150?img=14", color: avatarColors.deepPurple },
  { id: "USER008", name: "Ayşe Demir", email: "ayse.demir@portal.com", avatarUrl: "https://i.pravatar.cc/150?img=44", color: avatarColors.orange },
  { id: "USER009", name: "Melis Kara", email: "melis.kara@portal.com", avatarUrl: "https://i.pravatar.cc/150?img=25", color: avatarColors.darkRed },
  { id: "USER010", name: "Ali Öztürk", email: "ali.ozturk@portal.com", avatarUrl: "https://i.pravatar.cc/150?img=60", color: colors.textPrimary },
  { id: "USER011", name: "Kürşat Demirdelen", email: "kursat.demirdelen@portal.com", avatarUrl: "https://i.pravatar.cc/150?img=12", color: avatarColors.indigo },
  { id: "USER012", name: "Emre Şahin", email: "emre.sahin@portal.com", avatarUrl: "https://i.pravatar.cc/150?img=12", color: avatarColors.amber },
] as const;

export type AvailableUser = (typeof AVAILABLE_USERS)[number];
