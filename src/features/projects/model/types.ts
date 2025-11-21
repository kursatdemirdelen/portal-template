export type ProjectStatus = "Active" | "On Hold" | "Completed";

export interface Project {
  id: string;
  name: string;
  code: string;
  status: ProjectStatus;
  progress: number;
  teamSize: number;
  startDate: string;
  endDate: string;
  description: string;
}
