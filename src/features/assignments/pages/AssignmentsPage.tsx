import React from "react";
import { PageContainer } from "@/shared/ui/PageContainer";
import { SectionCard } from "@/shared/ui/SectionCard";
import { AssignmentsTable } from "@/features/assignments/ui/AssignmentsTable";
import type { Assignment } from "@/features/assignments/model";

const assignments: Assignment[] = [
  {
    id: "ASG001",
    title: "API Entegrasyonu",
    description: "Portal API ile backend entegrasyonu",
    assignedTo: "Ahmet Yılmaz",
    assignedBy: "Emre Kaya",
    startDate: "2025-01-15",
    dueDate: "2025-01-25",
    status: "active",
    priority: "high",
  },
  {
    id: "ASG002",
    title: "Dashboard Tasarımı",
    description: "Yeni dashboard taslakları",
    assignedTo: "Zeynep Demir",
    assignedBy: "Emre Kaya",
    startDate: "2025-01-10",
    dueDate: "2025-01-20",
    status: "completed",
    priority: "medium",
  },
  {
    id: "ASG003",
    title: "Veritabanı Optimizasyonu",
    description: "Sorgu performans iyileştirmesi",
    assignedTo: "Can Çimşek",
    assignedBy: "Fatih Aksu",
    startDate: "2025-01-08",
    dueDate: "2025-01-18",
    status: "overdue",
    priority: "high",
  },
  {
    id: "ASG004",
    title: "Dokümantasyon",
    description: "Proje dokümanlarının yazılması",
    assignedTo: "Melis Kara",
    assignedBy: "Emre Kaya",
    startDate: "2025-01-16",
    dueDate: "2025-01-28",
    status: "pending",
    priority: "low",
  },
];

const AssignmentsPage: React.FC = () => (
  <PageContainer
    title="Zimmetler"
    subtitle="Atanan görevleri ve zimmetleri yönetin"
  >
    <SectionCard variant="default">
      <AssignmentsTable assignments={assignments} />
    </SectionCard>
  </PageContainer>
);

export default AssignmentsPage;
