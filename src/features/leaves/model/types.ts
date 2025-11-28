export interface LeaveBalance {
  type: string;
  used: number;
  remaining: number;
}

export type HolidayType = "official" | "company" | "personal";

export interface Holiday {
  date: string;
  title: string;
  type: HolidayType;
}

export interface LeaveRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
}
