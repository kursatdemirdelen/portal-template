export interface Ticket {
  id: string;
  title: string;
  customer: string;
  requestType: string;
  status: string;
  assignee: string;
  avatar: string;
  project: string;
  createdAt: string;
  tags?: string[];
  accessibleDepartments?: string[];
}

export type TicketRecord = Ticket & {
  accessibleDepartments: string[];
};

// Ticket Detail Types
export interface TicketEffort {
  id: string;
  date: string;
  time: string;
  description: string;
  hours: number;
  user: string;
  userAvatar?: string;
}

export interface TicketComment {
  id: string;
  user: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  isInternal?: boolean;
  replies?: TicketComment[];
}

export interface TicketHistoryItem {
  id: string;
  user: string;
  userAvatar?: string;
  action: string;
  field?: string;
  oldValue?: string;
  newValue?: string;
  timestamp: string;
}

export interface TicketAttachment {
  id: string;
  name: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  url: string;
}

export interface TicketProjectInfo {
  projectId: string;
  projectName: string;
  projectStatus: "active" | "completed" | "on-hold";
  progress?: number;
  teamSize?: number;
  endDate?: string;
}

export interface TicketDetail extends Ticket {
  description: string;
  createdBy: string;
  createdByAvatar?: string;
  assignedDate: string;
  closedDate?: string;
  resolved: boolean;
  resolvedAt?: string;
  efforts: TicketEffort[];
  comments: TicketComment[];
  history: TicketHistoryItem[];
  attachments: TicketAttachment[];
  projectInfo?: TicketProjectInfo;
}
