/**
 * Log Mock Data - Merkezi Log Verileri
 *
 * Tüm log kayıtları burada tutulur.
 * Tarihler Kasım 2025 bağlamında ayarlanmıştır.
 * 
 * @see @/shared/types/log.ts
 */

import type { LogEntry, LogStats } from '@/shared/types';

export const mockLogs: LogEntry[] = [
  {
    id: 'LOG001',
    timestamp: '2025-11-20T14:30:00Z',
    level: 'info',
    source: 'auth',
    event: 'Kullanıcı Girişi',
    message: 'Kullanıcı başarıyla giriş yaptı',
    userId: 'USER001',
    userName: 'Ahmet Yılmaz',
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome/120.0',
  },
  {
    id: 'LOG002',
    timestamp: '2025-11-20T14:25:00Z',
    level: 'warn',
    source: 'api',
    event: 'Yavaş Sorgu',
    message: 'API yanıt süresi 2000ms üzerinde',
    metadata: { endpoint: '/api/reports', duration: 2450 },
  },
  {
    id: 'LOG003',
    timestamp: '2025-11-20T14:20:00Z',
    level: 'error',
    source: 'system',
    event: 'Veritabanı Hatası',
    message: 'Bağlantı zaman aşımı',
    metadata: { errorCode: 'CONN_TIMEOUT', retryCount: 3 },
  },
  {
    id: 'LOG004',
    timestamp: '2025-11-20T14:15:00Z',
    level: 'info',
    source: 'user',
    event: 'Parametre Güncelleme',
    message: 'Sistem parametresi güncellendi: MAX_UPLOAD_SIZE',
    userId: 'USER003',
    userName: 'Mehmet Can',
  },
  {
    id: 'LOG005',
    timestamp: '2025-11-20T14:10:00Z',
    level: 'debug',
    source: 'scheduler',
    event: 'Cron Job',
    message: 'Günlük rapor oluşturma görevi başlatıldı',
  },
  {
    id: 'LOG006',
    timestamp: '2025-11-20T13:55:00Z',
    level: 'info',
    source: 'auth',
    event: 'Şifre Değişikliği',
    message: 'Kullanıcı şifresini değiştirdi',
    userId: 'USER004',
    userName: 'Ayşe Demir',
    ipAddress: '192.168.1.105',
  },
  {
    id: 'LOG007',
    timestamp: '2025-11-20T13:50:00Z',
    level: 'warn',
    source: 'system',
    event: 'Bellek Uyarısı',
    message: 'Bellek kullanımı %85 üzerinde',
    metadata: { memoryUsage: 87, threshold: 85 },
  },
  {
    id: 'LOG008',
    timestamp: '2025-11-20T13:45:00Z',
    level: 'error',
    source: 'api',
    event: 'Doğrulama Hatası',
    message: 'Geçersiz token ile erişim denemesi',
    ipAddress: '10.0.0.55',
    metadata: { endpoint: '/api/admin/users', reason: 'TOKEN_EXPIRED' },
  },
  {
    id: 'LOG009',
    timestamp: '2025-11-20T13:30:00Z',
    level: 'info',
    source: 'user',
    event: 'Dosya Yükleme',
    message: 'Dosya başarıyla yüklendi: rapor_2025.pdf',
    userId: 'USER001',
    userName: 'Ahmet Yılmaz',
    metadata: { fileName: 'rapor_2025.pdf', fileSize: 2540000 },
  },
  {
    id: 'LOG010',
    timestamp: '2025-11-20T13:15:00Z',
    level: 'info',
    source: 'scheduler',
    event: 'Yedekleme',
    message: 'Otomatik yedekleme tamamlandı',
    metadata: { backupSize: '2.4GB', duration: 180 },
  },
  {
    id: 'LOG011',
    timestamp: '2025-11-20T12:00:00Z',
    level: 'warn',
    source: 'auth',
    event: 'Başarısız Giriş',
    message: '3 başarısız giriş denemesi',
    ipAddress: '192.168.1.200',
    metadata: { attempts: 3, username: 'admin' },
  },
  {
    id: 'LOG012',
    timestamp: '2025-11-20T11:30:00Z',
    level: 'error',
    source: 'system',
    event: 'Disk Alanı Kritik',
    message: 'Disk alanı %95 dolu',
    metadata: { diskUsage: 95, availableGB: 5 },
  },
  {
    id: 'LOG013',
    timestamp: '2025-11-19T18:00:00Z',
    level: 'info',
    source: 'user',
    event: 'Proje Oluşturma',
    message: 'Yeni proje oluşturuldu: Portal Geliştirme',
    userId: 'USER002',
    userName: 'Zeynep Kaya',
  },
  {
    id: 'LOG014',
    timestamp: '2025-11-19T16:45:00Z',
    level: 'debug',
    source: 'api',
    event: 'Cache Temizleme',
    message: 'Redis cache temizlendi',
    metadata: { clearedKeys: 156 },
  },
  {
    id: 'LOG015',
    timestamp: '2025-11-19T14:20:00Z',
    level: 'info',
    source: 'auth',
    event: 'Oturum Sonlandırma',
    message: 'Kullanıcı çıkış yaptı',
    userId: 'USER007',
    userName: 'Emre Şahin',
  },
];

/**
 * Log istatistiklerini hesapla
 */
export const getLogStats = (): LogStats => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);

  return {
    total: mockLogs.length,
    byLevel: {
      info: mockLogs.filter((l) => l.level === 'info').length,
      warn: mockLogs.filter((l) => l.level === 'warn').length,
      error: mockLogs.filter((l) => l.level === 'error').length,
      debug: mockLogs.filter((l) => l.level === 'debug').length,
    },
    bySource: {
      system: mockLogs.filter((l) => l.source === 'system').length,
      user: mockLogs.filter((l) => l.source === 'user').length,
      api: mockLogs.filter((l) => l.source === 'api').length,
      auth: mockLogs.filter((l) => l.source === 'auth').length,
      scheduler: mockLogs.filter((l) => l.source === 'scheduler').length,
    },
    today: mockLogs.filter((l) => new Date(l.timestamp) >= todayStart).length,
    thisWeek: mockLogs.filter((l) => new Date(l.timestamp) >= weekStart).length,
  };
};

/**
 * Log'ları filtrele
 */
export const filterLogs = (
  logs: LogEntry[],
  filter: {
    level?: string;
    source?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
  }
): LogEntry[] => {
  return logs.filter((log) => {
    if (filter.level && log.level !== filter.level) return false;
    if (filter.source && log.source !== filter.source) return false;
    if (filter.startDate && new Date(log.timestamp) < new Date(filter.startDate)) return false;
    if (filter.endDate && new Date(log.timestamp) > new Date(filter.endDate)) return false;
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      const matchesSearch =
        log.event.toLowerCase().includes(searchLower) ||
        log.message.toLowerCase().includes(searchLower) ||
        log.userName?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    return true;
  });
};
