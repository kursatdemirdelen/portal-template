/**
 * Notification Domain Types
 *
 * Bildirim yönetimi için merkezi tip tanımları.
 */

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  date: string;
  link?: string;
}

export interface NotificationStats {
  total: number;
  unread: number;
  byType: Record<NotificationType, number>;
}

export interface NotificationFilter {
  type?: NotificationType;
  read?: boolean;
  startDate?: string;
  endDate?: string;
}
