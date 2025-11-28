export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type ApprovalType = 'leave' | 'expense' | 'overtime' | 'project';

export interface ApprovalRequest {
  id: string;
  type: ApprovalType;
  title: string;
  requesterName: string;
  requesterAvatar?: string;
  requestDate: string;
  status: ApprovalStatus;
  amount?: number; // For expenses
  description?: string;
}
