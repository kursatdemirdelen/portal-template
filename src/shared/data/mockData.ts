/**
 * Merkezi Mock Data
 * ===================
 * Tüm projede tutarlı mock datalar için tek kaynak.
 * 
 * İÇERİK:
 * - mockUsers: Sistem kullanıcıları (avatar, renk, departman bilgisi ile)
 * - mockProjects: Projeler
 * - mockCustomers: Müşteriler (basit liste)
 * - mockTickets: Biletler (dashboard/sidebar için)
 * - mockTicketRecords: Biletler (detaylı, TicketsPage için)
 * - mockDepartments: Departmanlar
 * - requestTypeOptions: İstek tipi seçenekleri
 * 
 * UTILITY FONKSİYONLAR:
 * - getUserByName(name): Kullanıcı bilgisi döner
 * - getUserById(id): ID ile kullanıcı döner
 * - getAvatarByName(name): Avatar initials ve renk döner
 * - getTicketsByDepartment(dept): Departmana göre biletler
 * - getRecentTickets(count): Son biletler
 */

import type { Ticket, TicketRecord } from "@/features/tickets/model/types";

// =============================================================================
// TİPLER
// =============================================================================

export type UserRole = "admin" | "manager" | "worker" | "user" | "Developer" | "Tech Lead" | "Product Owner" | "Designer" | "QA Engineer";
export type UserStatus = "active" | "inactive" | "suspended";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  avatarColor: string;
  avatarUrl: string;
  role: string;
  status?: UserStatus;
  department: string;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
}

// =============================================================================
// KULLANICILAR
// =============================================================================

export const mockUsers: MockUser[] = [
  {
    id: "USER001",
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@portal.com",
    phone: "+90 532 123 4567",
    avatar: "AY",
    avatarColor: "#3498db",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    role: "admin",
    status: "active",
    department: "Portal Squad",
    createdAt: "2024-01-15",
    updatedAt: "2025-01-20",
    lastLogin: "2025-01-20 14:30",
  },
  {
    id: "USER002",
    name: "Zeynep Ünal",
    email: "zeynep.unal@portal.com",
    phone: "+90 532 234 5678",
    avatar: "ZÜ",
    avatarColor: "#9b59b6",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    role: "manager",
    status: "active",
    department: "API Squad",
    createdAt: "2024-02-10",
    updatedAt: "2025-01-19",
    lastLogin: "2025-01-20 10:15",
  },
  {
    id: "USER003",
    name: "Mehmet Can",
    email: "mehmet.can@portal.com",
    phone: "+90 532 345 6789",
    avatar: "MC",
    avatarColor: "#e74c3c",
    avatarUrl: "https://i.pravatar.cc/150?img=33",
    role: "worker",
    status: "active",
    department: "API Squad",
    createdAt: "2024-03-05",
    updatedAt: "2025-01-20",
    lastLogin: "2025-01-20 09:45",
  },
  {
    id: "USER004",
    name: "Ayşe Demir",
    email: "ayse.demir@portal.com",
    phone: "+90 532 456 7890",
    avatar: "AD",
    avatarColor: "#f39c12",
    avatarUrl: "https://i.pravatar.cc/150?img=45",
    role: "worker",
    status: "active",
    department: "Product Team",
    createdAt: "2024-04-20",
    updatedAt: "2025-01-18",
    lastLogin: "2025-01-19 16:20",
  },
  {
    id: "USER005",
    name: "Burak Kaya",
    email: "burak.kaya@portal.com",
    phone: "+90 532 567 8901",
    avatar: "BK",
    avatarColor: "#16a085",
    avatarUrl: "https://i.pravatar.cc/150?img=68",
    role: "worker",
    status: "active",
    department: "Design Team",
    createdAt: "2024-05-12",
    updatedAt: "2025-01-10",
    lastLogin: "2024-12-15 11:30",
  },
  {
    id: "USER006",
    name: "Elif Yıldız",
    email: "elif.yildiz@portal.com",
    phone: "+90 532 678 9012",
    avatar: "EY",
    avatarColor: "#27ae60",
    avatarUrl: "https://i.pravatar.cc/150?img=49",
    role: "user",
    status: "active",
    department: "Quality Team",
    createdAt: "2024-06-08",
    updatedAt: "2025-01-17",
    lastLogin: "2025-01-20 13:00",
  },
  {
    id: "USER007",
    name: "Can Şimşek",
    email: "can.simsek@portal.com",
    phone: "+90 532 789 0123",
    avatar: "CŞ",
    avatarColor: "#e67e22",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    role: "worker",
    status: "active",
    department: "Portal Squad",
    createdAt: "2024-03-05",
    updatedAt: "2025-01-20",
    lastLogin: "2025-01-20 09:45",
  },
  {
    id: "USER008",
    name: "Nur Çelik",
    email: "nur.celik@portal.com",
    phone: "+90 532 890 1234",
    avatar: "NÇ",
    avatarColor: "#1abc9c",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    role: "user",
    status: "active",
    department: "Sales",
    createdAt: "2024-06-08",
    updatedAt: "2025-01-17",
    lastLogin: "2025-01-20 13:00",
  },
  {
    id: "USER009",
    name: "Fatih Aksu",
    email: "fatih.aksu@portal.com",
    phone: "+90 532 901 2345",
    avatar: "FA",
    avatarColor: "#8e44ad",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    role: "worker",
    status: "inactive",
    department: "Portal Squad",
    createdAt: "2024-05-12",
    updatedAt: "2025-01-10",
    lastLogin: "2024-12-15 11:30",
  },
  {
    id: "USER010",
    name: "Melis Kara",
    email: "melis.kara@portal.com",
    phone: "+90 532 012 3456",
    avatar: "MK",
    avatarColor: "#c0392b",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    role: "worker",
    status: "active",
    department: "Quality Team",
    createdAt: "2024-04-20",
    updatedAt: "2025-01-18",
    lastLogin: "2025-01-19 16:20",
  },
];

// Projeler
export const mockProjects = [
  { id: "portal-intellium", label: "Portal Intellium", value: "portal-intellium" },
  { id: "portal-support", label: "Portal Support", value: "portal-support" },
  { id: "mobile-core", label: "Mobile Core", value: "mobile-core" },
  { id: "api-gateway", label: "API Gateway", value: "api-gateway" },
  { id: "customer-dashboard", label: "Customer Dashboard", value: "customer-dashboard" },
] as const;

// Müşteriler
export const mockCustomers = [
  { id: "CUST001", name: "Acme Corp" },
  { id: "CUST002", name: "TechStart" },
  { id: "CUST003", name: "InnovateCo" },
  { id: "CUST004", name: "Digital Solutions" },
  { id: "CUST005", name: "Cloud Systems" },
] as const;

// Biletler - Tutarlı ve gerçekçi (Basit format - dashboard/sidebar için)
// Her kullanıcıya dengeli dağıtılmış biletler
export const mockTickets: Ticket[] = [
  // Portal Squad biletleri (Ahmet, Can, Fatih)
  {
    id: "TCK-1243",
    title: "Dashboard yükleme sorunu",
    customer: "Acme Corp",
    requestType: "Hata",
    status: "Açık",
    assignee: "Ahmet Yılmaz",
    avatar: "AY",
    project: "Portal Intellium",
    createdAt: "2024-03-20T10:30:00Z",
  },
  {
    id: "TCK-1242",
    title: "Sidebar responsive sorunu",
    customer: "TechStart",
    requestType: "Hata",
    status: "İşlemde",
    assignee: "Can Şimşek",
    avatar: "CŞ",
    project: "Portal Intellium",
    createdAt: "2024-03-19T14:20:00Z",
  },
  {
    id: "TCK-1241",
    title: "Kullanıcı profil sayfası eksik",
    customer: "InnovateCo",
    requestType: "Özellik",
    status: "Açık",
    assignee: "Fatih Aksu",
    avatar: "FA",
    project: "Portal Intellium",
    createdAt: "2024-03-18T09:15:00Z",
  },
  {
    id: "TCK-1240",
    title: "Tablo pagination hatası",
    customer: "Digital Solutions",
    requestType: "Hata",
    status: "Çözüldü",
    assignee: "Can Şimşek",
    avatar: "CŞ",
    project: "Portal Support",
    createdAt: "2024-03-17T11:45:00Z",
  },
  {
    id: "TCK-1239",
    title: "Dark mode implementasyonu",
    customer: "Cloud Systems",
    requestType: "Özellik",
    status: "İşlemde",
    assignee: "Ahmet Yılmaz",
    avatar: "AY",
    project: "Portal Intellium",
    createdAt: "2024-03-16T08:30:00Z",
  },
  // API Squad biletleri (Zeynep, Mehmet)
  {
    id: "TCK-1238",
    title: "API rate limiting gerekli",
    customer: "Acme Corp",
    requestType: "Güvenlik",
    status: "İşlemde",
    assignee: "Zeynep Ünal",
    avatar: "ZÜ",
    project: "API Gateway",
    createdAt: "2024-03-15T16:20:00Z",
  },
  {
    id: "TCK-1237",
    title: "Endpoint dokümantasyonu eksik",
    customer: "TechStart",
    requestType: "Dokümantasyon",
    status: "Açık",
    assignee: "Mehmet Can",
    avatar: "MC",
    project: "API Gateway",
    createdAt: "2024-03-14T13:10:00Z",
  },
  {
    id: "TCK-1236",
    title: "GraphQL schema güncelleme",
    customer: "InnovateCo",
    requestType: "Özellik",
    status: "Çözüldü",
    assignee: "Zeynep Ünal",
    avatar: "ZÜ",
    project: "API Gateway",
    createdAt: "2024-03-13T10:00:00Z",
  },
  // Product Team biletleri (Ayşe)
  {
    id: "TCK-1235",
    title: "Yeni özellik roadmap planlaması",
    customer: "Digital Solutions",
    requestType: "Özellik",
    status: "İşlemde",
    assignee: "Ayşe Demir",
    avatar: "AD",
    project: "Portal Intellium",
    createdAt: "2024-03-12T09:00:00Z",
  },
  // Design Team biletleri (Burak)
  {
    id: "TCK-1234",
    title: "UI/UX iyileştirme önerileri",
    customer: "Cloud Systems",
    requestType: "Tasarım",
    status: "Açık",
    assignee: "Burak Kaya",
    avatar: "BK",
    project: "Portal Intellium",
    createdAt: "2024-03-11T14:30:00Z",
  },
  // Quality Team biletleri (Elif, Melis)
  {
    id: "TCK-1233",
    title: "E2E test senaryoları yazılmalı",
    customer: "Acme Corp",
    requestType: "Performans",
    status: "İşlemde",
    assignee: "Elif Yıldız",
    avatar: "EY",
    project: "Portal Intellium",
    createdAt: "2024-03-10T11:00:00Z",
  },
  {
    id: "TCK-1232",
    title: "Regresyon test raporu",
    customer: "TechStart",
    requestType: "Dokümantasyon",
    status: "Çözüldü",
    assignee: "Melis Kara",
    avatar: "MK",
    project: "Portal Support",
    createdAt: "2024-03-09T15:45:00Z",
  },
];

// Detaylı biletler - TicketsPage için (accessibleDepartments ile)
// Her kullanıcının departmanına göre erişim hakları belirlenir
export const mockTicketRecords: TicketRecord[] = mockTickets.map((ticket) => {
  // Assignee'nin departmanını bul
  const assigneeUser = mockUsers.find((u) => u.name === ticket.assignee);
  const assigneeDepartment = assigneeUser?.department || "Portal Squad";

  return {
    ...ticket,
    requestType: ticket.requestType === "Hata" ? "Report a BUG" :
                 ticket.requestType === "Özellik" ? "Suggest a New Feature" :
                 ticket.requestType === "Dokümantasyon" ? "Technical Support" :
                 ticket.requestType === "Performans" ? "Suggest Improvement" :
                 ticket.requestType === "Güvenlik" ? "Technical Support" :
                 ticket.requestType === "Tasarım" ? "Suggest Improvement" :
                 "Technical Support",
    status: ticket.status === "Açık" ? "Yeni İstek" :
            ticket.status === "İşlemde" ? "Atanan" :
            ticket.status === "Çözüldü" ? "Çözümlenen" :
            ticket.status,
    accessibleDepartments: [
      assigneeDepartment,
      "Product Team", // Product team her şeyi görebilir
    ].filter((d, i, arr) => arr.indexOf(d) === i), // unique
  };
});

// Departmanlar
export const mockDepartments = [
  "Portal Squad",
  "API Squad",
  "Mobile Squad",
  "Product Team",
  "Design Team",
  "Quality Team",
  "Sales",
] as const;

// Proje Ekipleri - Dashboard için
export interface ProjectTeamMember {
  name: string;
  initials: string;
  color: string;
}

export interface ProjectTeam {
  id: string;
  name: string;
  projectName: string;
  role: string;
  members: number;
  status: "Aktif" | "Beklemede";
  people: ProjectTeamMember[];
}

export const mockProjectTeams: ProjectTeam[] = [
  {
    id: "team-01",
    name: "Portal Support Team",
    projectName: "Portal Müşteri Destek",
    role: "Product Owner",
    members: 6,
    status: "Aktif",
    people: [
      { name: "Ahmet Yılmaz", initials: "AY", color: "#3498db" },
      { name: "Can Şimşek", initials: "CŞ", color: "#e67e22" },
      { name: "Fatih Aksu", initials: "FA", color: "#8e44ad" },
      { name: "Zeynep Ünal", initials: "ZÜ", color: "#9b59b6" },
      { name: "Mehmet Can", initials: "MC", color: "#e74c3c" },
      { name: "Elif Yıldız", initials: "EY", color: "#27ae60" },
    ],
  },
  {
    id: "team-02",
    name: "API Squad",
    projectName: "API Gateway",
    role: "Delivery Lead",
    members: 5,
    status: "Aktif",
    people: [
      { name: "Zeynep Ünal", initials: "ZÜ", color: "#9b59b6" },
      { name: "Mehmet Can", initials: "MC", color: "#e74c3c" },
      { name: "Burak Kaya", initials: "BK", color: "#16a085" },
      { name: "Melis Kara", initials: "MK", color: "#c0392b" },
      { name: "Ayşe Demir", initials: "AD", color: "#f39c12" },
    ],
  },
  {
    id: "team-03",
    name: "Design Team",
    projectName: "Portal Intellium UI/UX",
    role: "Danışman",
    members: 3,
    status: "Aktif",
    people: [
      { name: "Burak Kaya", initials: "BK", color: "#16a085" },
      { name: "Can Şimşek", initials: "CŞ", color: "#e67e22" },
      { name: "Fatih Aksu", initials: "FA", color: "#8e44ad" },
    ],
  },
  {
    id: "team-04",
    name: "Quality Team",
    projectName: "Test & QA",
    role: "QA Lead",
    members: 4,
    status: "Aktif",
    people: [
      { name: "Elif Yıldız", initials: "EY", color: "#27ae60" },
      { name: "Melis Kara", initials: "MK", color: "#c0392b" },
      { name: "Ahmet Yılmaz", initials: "AY", color: "#3498db" },
      { name: "Zeynep Ünal", initials: "ZÜ", color: "#9b59b6" },
    ],
  },
  {
    id: "team-05",
    name: "Product Team",
    projectName: "Product Management",
    role: "Product Manager",
    members: 3,
    status: "Aktif",
    people: [
      { name: "Ayşe Demir", initials: "AD", color: "#f39c12" },
      { name: "Mehmet Can", initials: "MC", color: "#e74c3c" },
      { name: "Burak Kaya", initials: "BK", color: "#16a085" },
    ],
  },
];

// İstek tipleri
export const requestTypeOptions = [
  { label: "🐛 Hata / Bug", value: "bug" },
  { label: "✨ Yeni Özellik", value: "feature" },
  { label: "📚 Dokümantasyon", value: "documentation" },
  { label: "⚡ Performans", value: "performance" },
  { label: "🔒 Güvenlik", value: "security" },
  { label: "🎨 Tasarım", value: "design" },
  { label: "❓ Soru / Destek", value: "question" },
] as const;

// Utility fonksiyonlar
export const getTicketsByDepartment = (department: string): TicketRecord[] => {
  if (department === "Product Team") {
    return [...mockTicketRecords];
  }
  return mockTicketRecords.filter((ticket) =>
    ticket.accessibleDepartments.includes(department)
  );
};

export const getRecentTickets = (count: number = 5): Ticket[] => {
  return mockTickets.slice(0, count);
};

// Türkçe karakter normalize helper
const normalizeString = (str: string): string => str.normalize("NFC").toLowerCase();

export const getRecentTicketsForDepartment = (
  department: string,
  limit = 6
): Ticket[] => {
  const departmentUsers = mockUsers.filter((u) => u.department === department);
  const userNames = departmentUsers.map((u) => normalizeString(u.name));
  return mockTickets
    .filter((ticket) => userNames.includes(normalizeString(ticket.assignee)))
    .slice(0, limit);
};

export const getUserByName = (name: string) => {
  return mockUsers.find((u) => u.name === name);
};

export const getProjectById = (id: string) => {
  return mockProjects.find((p) => p.id === id);
};

// Avatar helper - kullanıcı adına göre avatar ve renk döner
export const getAvatarByName = (name: string) => {
  const user = getUserByName(name);
  return user
    ? { avatar: user.avatar, color: user.avatarColor, avatarUrl: user.avatarUrl }
    : { avatar: name.substring(0, 2).toUpperCase(), color: "#95a5a6", avatarUrl: undefined };
};

// Kullanıcı ID'ye göre
export const getUserById = (id: string) => {
  return mockUsers.find((u) => u.id === id);
};

// Kullanıcı istatistikleri
export const getUserStats = () => {
  return {
    total: mockUsers.length,
    active: mockUsers.filter((u) => u.status === "active").length,
    inactive: mockUsers.filter((u) => u.status === "inactive").length,
    suspended: mockUsers.filter((u) => u.status === "suspended").length,
    byRole: {
      admin: mockUsers.filter((u) => u.role === "admin").length,
      manager: mockUsers.filter((u) => u.role === "manager").length,
      worker: mockUsers.filter((u) => u.role === "worker").length,
      user: mockUsers.filter((u) => u.role === "user").length,
    },
  };
};

// Role göre kullanıcılar
export const getUsersByRole = (role: string) => {
  return mockUsers.filter((u) => u.role === role);
};

// Status göre kullanıcılar
export const getUsersByStatus = (status: UserStatus) => {
  return mockUsers.filter((u) => u.status === status);
};

// Departman göre kullanıcılar
export const getUsersByDepartment = (department: string) => {
  return mockUsers.filter((u) => u.department === department);
};

// Avatar initials helper
export const getInitials = (name: string): string => {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.charAt(0).toUpperCase();
};
