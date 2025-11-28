import React from "react";
import { PageContainer } from "@/shared/ui";
import { TimeSummaryCards } from "@/features/time-tracking/ui/TimeSummaryCards";
import { TimeEntriesTable } from "@/features/time-tracking/ui/TimeEntriesTable";
import { colors as colorPalette } from "@/shared/styles";
import {
  mockTimeEntries,
  calculateTodayTotal,
  calculateWeeklyTotal,
} from "@/shared/data/mocks";

const stats = [
  {
    title: "Bugünkü Çalışma Süresi",
    value: calculateTodayTotal(mockTimeEntries).toFixed(2),
    suffix: "saat",
    color: colorPalette.primary,
  },
  {
    title: "Bu Haftanın Toplamı",
    value: calculateWeeklyTotal(mockTimeEntries).toFixed(2),
    suffix: "saat",
    color: colorPalette.success,
  },
  {
    title: "Hedef Saatler",
    value: "40",
    suffix: "saat",
    color: colorPalette.textSecondary,
  },
];

const TimeTrackingPage: React.FC = () => (
  <PageContainer title="Puantaj" subtitle="Zaman takibi ve raporlama">
    <TimeSummaryCards items={stats} />
    <TimeEntriesTable entries={mockTimeEntries} />
  </PageContainer>
);

export default TimeTrackingPage;
