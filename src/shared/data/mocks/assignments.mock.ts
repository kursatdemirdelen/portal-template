/**
 * Zimmetler / Görevler - Mock Data
 * Merkezi atama verileri
 */

import type { Assignment } from "@/features/assignments/model";

export const mockAssignments: Assignment[] = [
  {
    id: "ASG001",
    title: "API Entegrasyonu",
    description: "Portal API ile backend entegrasyonu",
    assignedTo: "Ahmet Yılmaz",
    assignedBy: "Emre Şahin",
    startDate: "2025-11-15",
    dueDate: "2025-11-25",
    status: "active",
    priority: "high",
  },
  {
    id: "ASG002",
    title: "Dashboard Tasarımı",
    description: "Yeni dashboard taslakları",
    assignedTo: "Zeynep Ünal",
    assignedBy: "Emre Şahin",
    startDate: "2025-11-10",
    dueDate: "2025-11-20",
    status: "completed",
    priority: "medium",
  },
  {
    id: "ASG003",
    title: "Veritabanı Optimizasyonu",
    description: "Sorgu performans iyileştirmesi",
    assignedTo: "Can Şimşek",
    assignedBy: "Fatih Aksu",
    startDate: "2025-11-08",
    dueDate: "2025-11-18",
    status: "overdue",
    priority: "high",
  },
  {
    id: "ASG004",
    title: "Dokümantasyon",
    description: "Proje dokümanlarının yazılması",
    assignedTo: "Melis Kara",
    assignedBy: "Emre Şahin",
    startDate: "2025-11-16",
    dueDate: "2025-11-28",
    status: "pending",
    priority: "low",
  },
];
