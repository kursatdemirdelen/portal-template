export type TimeEntryStatus = "completed" | "in-progress";

export interface TimeEntry {
  id: string;
  date: string;
  project: string;
  task: string;
  startTime: string;
  endTime: string | null;
  duration: number;
  status: TimeEntryStatus;
  notes?: string;
}
