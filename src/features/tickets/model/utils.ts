/**
 * Ticket Utility Functions
 * Bilet modülü için yardımcı fonksiyonlar
 */

/**
 * Tarih formatla - Türkçe formatında gösterir
 * @param date - ISO 8601 formatında tarih string
 * @returns Formatlanmış tarih (örn: "28 Kas 2025")
 */
export const formatTicketDate = (date: string): string => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }
  
  const formatter = new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  
  return formatter.format(parsed);
};

/**
 * İki tarih arasındaki gün farkını hesaplar
 * @param startDate - Başlangıç tarihi
 * @param endDate - Bitiş tarihi (opsiyonel, varsayılan: şimdi)
 * @returns Gün cinsinden fark
 */
export const getDaysDifference = (startDate: string, endDate?: string): number => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

/**
 * Tarihin kaç gün önce/sonra olduğunu gösterir
 * @param date - ISO 8601 formatında tarih string
 * @returns Relatif tarih string (örn: "3 gün önce", "2 saat önce")
 */
export const getRelativeTime = (date: string): string => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffMs = now.getTime() - targetDate.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return "Az önce";
  if (diffMins < 60) return `${diffMins} dakika önce`;
  if (diffHours < 24) return `${diffHours} saat önce`;
  if (diffDays < 7) return `${diffDays} gün önce`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} hafta önce`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} ay önce`;
  return `${Math.floor(diffDays / 365)} yıl önce`;
};
