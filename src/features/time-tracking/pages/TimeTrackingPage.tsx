import React from "react";
import { PageContainer } from "@/shared/ui/PageContainer";
import { TimeSummaryCards } from "@/features/time-tracking/ui/TimeSummaryCards";
import { TimeEntriesTable } from "@/features/time-tracking/ui/TimeEntriesTable";
import { colorPalette } from "@/shared/styles/styleConstants";
import type { TimeEntry } from "@/features/time-tracking/model";

const entries: TimeEntry[] = [
  {
    id: "TRK001",
    date: "2025-01-20",
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
    date: "2025-01-20",
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
    date: "2025-01-20",
    project: "Scrumboard",
    task: "Hata düzeltme",
    startTime: "10:00",
    endTime: "10:45",
    duration: 0.75,
    status: "completed",
  },
  {
    id: "TRK004",
    date: "2025-01-21",
    project: "Portal Intellium",
    task: "Veritabanı optimizasyonu",
    startTime: "09:15",
    endTime: null,
    duration: 2.5,
    status: "in-progress",
  },
];

const todayTotal = () => {
  const today = new Date().toISOString().split("T")[0];
  return entries
    .filter((entry) => entry.date === today)
    .reduce((sum, entry) => sum + entry.duration, 0);
};

const weeklyTotal = () =>
  entries.reduce((sum, entry) => sum + entry.duration, 0);

const stats = [
  {
    title: "Bugünkü Çalışma Süresi",
    value: todayTotal().toFixed(2),
    suffix: "saat",
    color: colorPalette.primary,
  },
  {
    title: "Bu Haftanın Toplamı",
    value: weeklyTotal().toFixed(2),
    suffix: "saat",
    color: "#52c41a",
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
    <TimeEntriesTable entries={entries} />
  </PageContainer>
);

export default TimeTrackingPage;
