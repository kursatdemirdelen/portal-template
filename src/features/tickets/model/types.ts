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

