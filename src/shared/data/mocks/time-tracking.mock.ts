/**
 * Zaman Takibi - Mock Data
 * Merkezi puantaj verileri
 */

import type { TimeEntry } from "@/features/time-tracking/model";

export const mockTimeEntries: TimeEntry[] = [
  {
    id: "TRK001",
    date: "2025-11-20",
    project: "Portal Intellium",
    task: "API geliştirmesi",
    startTime: "09:00",
    endTime: "12:30",
    duration: 3.5,
    status: "completed",
    notes: "Authentication uçları tamamlandı",
  },
  {
    id: "TRK002",
    date: "2025-11-20",
    project: "Mobile App",
    task: "UI tasarımı",
    startTime: "13:30",
    endTime: "17:45",
    duration: 4.25,
    status: "completed",
    notes: "Dashboard ekranları tasarlandı",
  },
  {
    id: "TRK003",
    date: "2025-11-20",
    project: "Scrumboard",
    task: "Hata düzeltme",
    startTime: "10:00",
    endTime: "10:45",
    duration: 0.75,
    status: "completed",
  },
  {
    id: "TRK004",
    date: "2025-11-21",
    project: "Portal Intellium",
    task: "Veritabanı optimizasyonu",
    startTime: "09:15",
    endTime: null,
    duration: 2.5,
    status: "in-progress",
  },
  {
    id: "TRK005",
    date: "2025-11-22",
    project: "API Gateway",
    task: "Endpoint testleri",
    startTime: "14:00",
    endTime: "16:30",
    duration: 2.5,
    status: "completed",
    notes: "Tüm testler başarılı",
  },
];

// Zaman takibi istatistikleri hesaplama yardımcıları
export const calculateTodayTotal = (entries: TimeEntry[]): number => {
  const today = new Date().toISOString().split("T")[0];
  return entries
    .filter((entry) => entry.date === today)
    .reduce((sum, entry) => sum + entry.duration, 0);
};

export const calculateWeeklyTotal = (entries: TimeEntry[]): number => {
  return entries.reduce((sum, entry) => sum + entry.duration, 0);
};
