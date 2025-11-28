/**
 * Log Domain Types
 *
 * Sistem log kayıtları için merkezi tip tanımları.
 */

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export type LogSource = 'system' | 'user' | 'api' | 'auth' | 'scheduler';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  source: LogSource;
  event: string;
  message: string;
  userId?: string;
  userName?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

export interface LogStats {
  total: number;
  byLevel: Record<LogLevel, number>;
  bySource: Record<LogSource, number>;
  today: number;
  thisWeek: number;
}

export interface LogFilter {
  level?: LogLevel;
  source?: LogSource;
  startDate?: string;
  endDate?: string;
  search?: string;
}
