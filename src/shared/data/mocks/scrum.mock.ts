/**
 * Scrum Board - Mock Data
 * Merkezi sprint ve görev verileri
 */

export interface ScrumColumn {
  title: string;
  items: string[];
}

export const mockScrumColumns: ScrumColumn[] = [
  { title: "Backlog", items: ["Kullanıcı yetkilendirme", "Bildirim ayarları"] },
  { title: "In Progress", items: ["Dashboard UI revizyonu"] },
  { title: "Review", items: ["API hata logları"] },
  { title: "Done", items: ["Login form validasyonu"] },
];

export const mockScrumStats = {
  totalTasks: 12,
  blockedTasks: 1,
  completedTasks: 4,
  inProgressTasks: 3,
};
