export type AssignmentStatus = "active" | "completed" | "overdue" | "pending";
export type AssignmentPriority = "high" | "medium" | "low";

export interface Assignment {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  startDate: string;
  dueDate: string;
  status: AssignmentStatus;
  priority: AssignmentPriority;
}

export type AssignmentDetailStatus = "active" | "maintenance" | "returned";

export interface AssignmentDetail {
  id: string;
  asset: string;
  owner: string;
  location: string;
  status: AssignmentDetailStatus;
  checkoutDate: string;
  dueDate: string;
}
