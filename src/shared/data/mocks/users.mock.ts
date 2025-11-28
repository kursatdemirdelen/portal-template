/**
 * Users Mock Data
 * ================
 * 
 * Merkezi kullanıcı mock verileri.
 * 
 * @module shared/data/mocks/users.mock
 */

import type { MockUser, UserStatus } from '@/shared/types';
import { avatarColors } from '@/shared/styles/tokens';

// =============================================================================
// KULLANICI VERİLERİ
// =============================================================================

export const mockUsers: MockUser[] = [
  {
    id: "USER001",
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@portal.com",
    phone: "+90 532 123 4567",
    avatar: "AY",
    avatarColor: avatarColors.blue,
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    role: "admin",
    status: "active",
    department: "Portal Squad",
    createdAt: "2024-01-15",
    updatedAt: "2025-11-20",
    lastLogin: "2025-11-28 14:30",
  },
  {
    id: "USER002",
    name: "Zeynep Ünal",
    email: "zeynep.unal@portal.com",
    phone: "+90 532 234 5678",
    avatar: "ZÜ",
    avatarColor: avatarColors.deepPurple,
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    role: "manager",
    status: "active",
    department: "API Squad",
    createdAt: "2024-02-10",
    updatedAt: "2025-11-19",
    lastLogin: "2025-11-28 10:15",
  },
  {
    id: "USER003",
    name: "Mehmet Can",
    email: "mehmet.can@portal.com",
    phone: "+90 532 345 6789",
    avatar: "MC",
    avatarColor: avatarColors.red,
    avatarUrl: "https://i.pravatar.cc/150?img=33",
    role: "worker",
    status: "active",
    department: "API Squad",
    createdAt: "2024-03-05",
    updatedAt: "2025-11-20",
    lastLogin: "2025-11-28 09:45",
  },
  {
    id: "USER004",
    name: "Ayşe Demir",
    email: "ayse.demir@portal.com",
    phone: "+90 532 456 7890",
    avatar: "AD",
    avatarColor: avatarColors.orange,
    avatarUrl: "https://i.pravatar.cc/150?img=45",
    role: "worker",
    status: "active",
    department: "Product Team",
    createdAt: "2024-04-20",
    updatedAt: "2025-11-18",
    lastLogin: "2025-11-27 16:20",
  },
  {
    id: "USER005",
    name: "Burak Kaya",
    email: "burak.kaya@portal.com",
    phone: "+90 532 567 8901",
    avatar: "BK",
    avatarColor: avatarColors.teal,
    avatarUrl: "https://i.pravatar.cc/150?img=68",
    role: "worker",
    status: "active",
    department: "Design Team",
    createdAt: "2024-05-12",
    updatedAt: "2025-11-10",
    lastLogin: "2025-11-25 11:30",
  },
  {
    id: "USER006",
    name: "Elif Yıldız",
    email: "elif.yildiz@portal.com",
    phone: "+90 532 678 9012",
    avatar: "EY",
    avatarColor: avatarColors.green,
    avatarUrl: "https://i.pravatar.cc/150?img=49",
    role: "user",
    status: "active",
    department: "Quality Team",
    createdAt: "2024-06-08",
    updatedAt: "2025-11-17",
    lastLogin: "2025-11-28 13:00",
  },
  {
    id: "USER007",
    name: "Can Şimşek",
    email: "can.simsek@portal.com",
    phone: "+90 532 789 0123",
    avatar: "CŞ",
    avatarColor: avatarColors.deepOrange,
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    role: "worker",
    status: "active",
    department: "Portal Squad",
    createdAt: "2024-03-05",
    updatedAt: "2025-11-20",
    lastLogin: "2025-11-28 09:45",
  },
  {
    id: "USER008",
    name: "Nur Çelik",
    email: "nur.celik@portal.com",
    phone: "+90 532 890 1234",
    avatar: "NÇ",
    avatarColor: avatarColors.cyan,
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    role: "user",
    status: "active",
    department: "Sales",
    createdAt: "2024-06-08",
    updatedAt: "2025-11-17",
    lastLogin: "2025-11-28 13:00",
  },
  {
    id: "USER009",
    name: "Fatih Aksu",
    email: "fatih.aksu@portal.com",
    phone: "+90 532 901 2345",
    avatar: "FA",
    avatarColor: avatarColors.deepPurple,
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    role: "worker",
    status: "inactive",
    department: "Portal Squad",
    createdAt: "2024-05-12",
    updatedAt: "2025-11-10",
    lastLogin: "2025-10-15 11:30",
  },
  {
    id: "USER010",
    name: "Melis Kara",
    email: "melis.kara@portal.com",
    phone: "+90 532 012 3456",
    avatar: "MK",
    avatarColor: avatarColors.darkRed,
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    role: "worker",
    status: "active",
    department: "Quality Team",
    createdAt: "2024-04-20",
    updatedAt: "2025-11-18",
    lastLogin: "2025-11-27 16:20",
  },
  // Dashboard currentUser - sistemde mevcut
  {
    id: "USER011",
    name: "Kürşat Demirdelen",
    email: "kursat.demirdelen@portal.com",
    phone: "+90 532 111 2233",
    avatar: "KD",
    avatarColor: avatarColors.indigo,
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    role: "worker",
    status: "active",
    department: "Portal Squad",
    createdAt: "2024-01-01",
    updatedAt: "2025-11-28",
    lastLogin: "2025-11-28 08:00",
  },
  // Ek kullanıcı - çeşitli modüllerde referans ediliyor
  {
    id: "USER012",
    name: "Emre Şahin",
    email: "emre.sahin@portal.com",
    phone: "+90 532 456 7890",
    avatar: "EŞ",
    avatarColor: avatarColors.amber,
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    role: "worker",
    status: "active",
    department: "IT",
    createdAt: "2024-03-15",
    updatedAt: "2025-11-28",
    lastLogin: "2025-11-28 09:30",
  },
];

// =============================================================================
// DEPARTMAN VERİLERİ
// =============================================================================

export const mockDepartments = [
  "Portal Squad",
  "API Squad",
  "Mobile Squad",
  "Product Team",
  "Design Team",
  "Quality Team",
  "Sales",
] as const;

export type Department = typeof mockDepartments[number];

// =============================================================================
// YARDIMCI FONKSİYONLAR
// =============================================================================

/**
 * İsme göre kullanıcı bul
 */
export const getUserByName = (name: string): MockUser | undefined => {
  return mockUsers.find((u) => u.name === name);
};

/**
 * ID'ye göre kullanıcı bul
 */
export const getUserById = (id: string): MockUser | undefined => {
  return mockUsers.find((u) => u.id === id);
};

/**
 * Avatar bilgisi döner (initials ve renk)
 */
export const getAvatarByName = (name: string): { avatar: string; color: string; avatarUrl?: string } => {
  const user = getUserByName(name);
  return user
    ? { avatar: user.avatar, color: user.avatarColor, avatarUrl: user.avatarUrl }
    : { avatar: name.substring(0, 2).toUpperCase(), color: avatarColors.neutral, avatarUrl: undefined };
};

/**
 * Rol'e göre kullanıcılar
 */
export const getUsersByRole = (role: string): MockUser[] => {
  return mockUsers.filter((u) => u.role === role);
};

/**
 * Durum'a göre kullanıcılar
 */
export const getUsersByStatus = (status: UserStatus): MockUser[] => {
  return mockUsers.filter((u) => u.status === status);
};

/**
 * Departman'a göre kullanıcılar
 */
export const getUsersByDepartment = (department: string): MockUser[] => {
  return mockUsers.filter((u) => u.department === department);
};

/**
 * İsimden avatar initials oluştur
 */
export const getInitials = (name: string): string => {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.charAt(0).toUpperCase();
};

/**
 * Kullanıcı istatistikleri
 */
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
