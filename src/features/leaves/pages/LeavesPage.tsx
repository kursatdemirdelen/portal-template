import React from "react";
import { PageContainer } from "@/shared/ui";
import { LeaveList } from "@/features/leaves/ui/LeaveList";
import type { LeaveBalance, Holiday } from "@/features/leaves/model";

const balances: LeaveBalance[] = [
  { type: "Yıllık İzin", used: 8, remaining: 12 },
  { type: "Hastalık İzni", used: 2, remaining: 5 },
  { type: "Ücretsiz İzin", used: 0, remaining: 10 },
];

const holidays: Holiday[] = [
  { date: "2025-04-23", title: "Ulusal Egemenlik ve Çocuk Bayramı", type: "official" },
  { date: "2025-05-01", title: "Emek ve Dayanışma Günü", type: "official" },
  { date: "2025-06-10", title: "Şirket Tatili - Offsite", type: "company" },
];

const LeavesPage: React.FC = () => (
  <PageContainer title="Tatil Bilgileri" subtitle="İzin hakları ve tatil takvimi">
    <LeaveList balances={balances} holidays={holidays} />
  </PageContainer>
);

export default LeavesPage;
