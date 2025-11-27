/**
 * Users Mock Data - Re-exported from central mock data
 * 
 * Bu dosya geriye dönük uyumluluk için merkezi mock data'yı re-export eder.
 * Yeni kodlarda doğrudan @/shared/data/mockData kullanılmalıdır.
 */

import {
  mockUsers as centralMockUsers,
  getUserStats as getCentralUserStats,
  getUsersByRole as getCentralUsersByRole,
  getUsersByStatus as getCentralUsersByStatus,
  type MockUser,
} from "@/shared/data/mockData";

import type { User } from "./model";

// Merkezi kullanıcıları User tipine dönüştür
export const mockUsers: User[] = centralMockUsers.map((u) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  phone: u.phone,
  role: u.role as User["role"],
  status: u.status || "active",
  department: u.department,
  createdAt: u.createdAt || "2024-01-01",
  updatedAt: u.updatedAt || "2025-01-01",
  lastLogin: u.lastLogin,
  avatar: u.avatarUrl,
}));

export const getUserStats = getCentralUserStats;

export const getUsersByRole = (role: string): User[] => {
  return mockUsers.filter((u) => u.role === role);
};

export const getUsersByStatus = (status: string): User[] => {
  return mockUsers.filter((u) => u.status === status);
};
