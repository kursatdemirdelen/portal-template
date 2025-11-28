/**
 * Takım / Ekip - Mock Data
 * Merkezi takım üyesi ve seremoni verileri
 */

// Takım üyeleri (projects/ProjectTeamPage için)
export const mockTeamMembers = [
  { name: "Ayşe Demir", role: "Product Owner", load: 70 },
  { name: "Mehmet Can", role: "Developer", load: 50 },
  { name: "Melis Kara", role: "QA", load: 40 },
];

// Sprint seremonileri
export const mockCeremonies = [
  { children: "Sprint Planning - 24 Kasım" },
  { children: "Daily Standup - Her gün 09:30" },
  { children: "Sprint Review - 07 Aralık" },
];

// Rol şablonları (UserCreatePage için)
export const mockRoleTemplates = [
  "Admin (tam yetki)",
  "Manager (yönetici)",
  "Worker (operasyonel)",
  "User (sadece görüntüleme)",
];
