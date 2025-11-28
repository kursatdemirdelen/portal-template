/**
 * Profil - Mock Data
 * Merkezi kullanıcı profil verileri
 */

// Profil özeti
export const mockProfileSummary = {
  name: "Kürşat Demirdelen",
  title: "Dijital Portal Ürün Yöneticisi",
  email: "kursat.demirdelen@portal.com",
  phone: "+90 532 111 2233",
  location: "İstanbul, Türkiye",
  timezone: "GMT+3 · TR",
  squad: ["Merkez Portal Takımı", "Deneyim Platformu"],
  languages: ["Türkçe", "İngilizce"],
  manager: "Elif Yıldız",
  startDate: "Mayıs 2020",
};

// Profil istatistikleri
export const mockProfileStats = [
  { label: "Kapatılan talepler", value: "128", helper: "Son 30 günde +12%" },
  { label: "Aktif projeler", value: "6", helper: "Portal, CRM, İK" },
  { label: "Eğitim kredisi", value: "18", helper: "2 modülle kullanılabilir" },
];

// Bildirim tercihleri
export const mockNotificationPreferences = [
  {
    key: "productUpdates",
    label: "Ürün güncellemeleri",
    description: "Versiyon notları ve planlı bakım duyuruları",
    channel: "E-posta",
    enabled: true,
  },
  {
    key: "ticketMentions",
    label: "Ticket mention uyarısı",
    description: "Adınız geçen yorumlarda anlık mobil bildirim",
    channel: "Mobil bildirim",
    enabled: true,
  },
  {
    key: "digest",
    label: "Haftalık özet",
    description: "Takım aktivitesi ve sprint raporu",
    channel: "E-posta",
    enabled: false,
  },
];

// Güvenlik kontrol listesi
export const mockSecurityChecklist = [
  { label: "İki adımlı doğrulama", status: "Aktif", tone: "success" },
  { label: "Kilitli oturumlar", status: "Yok", tone: "success" },
  { label: "Yedek kodlar", status: "30 gün önce yenilendi", tone: "warning" },
  { label: "Cihaz güveni", status: "3 yetkili cihaz", tone: "info" },
];

// Aktivite zaman çizelgesi
export const mockActivityTimeline = [
  {
    title: "Bildirim tercihleri güncellendi",
    time: "Bugün, 09:24",
    detail: "Slack mention tetikleyicisi aktifleştirildi",
  },
  {
    title: "Yeni cihaz doğrulandı",
    time: "Dün, 21:12",
    detail: "iOS uygulamasından giriş onaylandı",
  },
  {
    title: "Takım odağı güncellendi",
    time: "22 Kasım",
    detail: "Deneyim Platformu ekibine atandı",
  },
  {
    title: "Güvenlik taraması tamamlandı",
    time: "18 Kasım",
    detail: "Parola ve token setleri yenilendi",
  },
];

// Oturumlar
export const mockSessions = [
  {
    id: "desktop",
    label: "Chrome - Windows",
    location: "İstanbul - 10 dk önce",
    ip: "10.24.32.11",
    type: "desktop",
    trusted: true,
  },
  {
    id: "mobile",
    label: "Portal Mobile - iOS",
    location: "Kadıköy - 2 saat önce",
    ip: "10.18.10.4",
    type: "mobile",
    trusted: true,
  },
  {
    id: "edge",
    label: "Edge - Windows",
    location: "Ankara - 1 gün önce",
    ip: "10.44.12.98",
    type: "desktop",
    trusted: false,
  },
];

// Bağlı uygulamalar
export const mockConnectedApps = [
  {
    id: "slack",
    name: "Slack",
    description: "Mention ve ticket bildirimleri",
    status: "Gerçek zamanlı",
    iconType: "slack",
  },
  {
    id: "jira",
    name: "Jira Cloud",
    description: "Sprint planlama ve issue senkronu",
    status: "Günde 3 kez",
    iconType: "api",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Pull request ve deploy bağlantıları",
    status: "Aktif",
    iconType: "github",
  },
];
