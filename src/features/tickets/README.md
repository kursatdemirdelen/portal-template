# Tickets Feature

Bilet/Talep yönetimi modülü - Merkezi ve modüler yapı

## 📁 Yapı

```
tickets/
├── data/                     # Mock data exports
│   └── tickets.ts           # Merkezi mock'tan re-export
├── hooks/                    # Custom React hooks
│   ├── useTicketFilters.ts  # Filtreleme logic
│   ├── useTicketStats.ts    # İstatistik hesaplamaları
│   ├── useTicketExport.ts   # CSV export
│   └── useTicketFilterOptions.ts
├── model/                    # Type definitions & constants
│   ├── constants.ts         # Ticket sabitleri
│   ├── status.ts            # Durum tanımları
│   ├── types.ts             # TypeScript types
│   └── utils.ts             # Yardımcı fonksiyonlar
├── pages/                    # Page components
│   ├── TicketsPage.tsx      # Liste/Grid görünümü
│   ├── TicketDetailPage.tsx # Detay sayfası
│   └── NewTicketPage.tsx    # Yeni bilet oluşturma
├── ui/                       # UI components
│   ├── forms/               # Form bileşenleri
│   ├── ticket-detail/       # Detay sayfası bileşenleri
│   ├── ticket-list/         # Liste/Grid bileşenleri
│   └── shared/              # Ortak stil tanımları
└── index.ts                  # Feature exports
```

## 🎯 Ticket Durumları (Status)

### Merkezi Tanım
Ticket durumları `@/shared/config/constants.ts` dosyasında tanımlıdır:

```typescript
export const TICKET_STATUSES = [
  "Yeni İstek",
  "Atanan",
  "Çözümlenen",
  "Kapatılan",
] as const;

export const TICKET_STATUS_DATA = [
  { key: 'Yeni İstek', label: 'Yeni', color: colors.info, bgColor: backgrounds.infoBg },
  { key: 'Atanan', label: 'Atanan', color: colors.warning, bgColor: backgrounds.warningBg },
  { key: 'Çözümlenen', label: 'Çözümlenen', color: colors.success, bgColor: backgrounds.successBg },
  { key: 'Kapatılan', label: 'Kapatıldı', color: colors.textSecondary, bgColor: backgrounds.neutral100 },
];
```

### Durum Açıklamaları

| Durum | Açıklama | Renk | Kullanım |
|-------|----------|------|----------|
| **Yeni İstek** | Yeni açılan, henüz atanmamış biletler | Mavi | İlk oluşturulan biletler |
| **Atanan** | Birisine atanmış, üzerinde çalışılıyor | Turuncu | Aktif olarak işlem gören |
| **Çözümlenen** | Sorun çözüldü, tamamlandı | Yeşil | Bitmiş işler |
| **Kapatılan** | Arşivlenmiş, kapatılmış biletler | Gri | Arşiv |

### Mock Veride Kullanım

Mock verilerde durum tanımları:
```typescript
// src/shared/data/mocks/tickets.mock.ts
{
  id: "TCK-1243",
  title: "Dashboard yükleme sorunu",
  status: "Yeni İstek",  // ✅ Doğru
  // status: "Açık"       // ❌ Yanlış (eski format)
}
```

## 📊 Stats Kartları

### TicketsPage İstatistikleri

```typescript
// useTicketStats hook'u şu istatistikleri hesaplar:
- myTicketsCount      // Kullanıcıya atanan biletler
- openTicketsCount    // "Yeni İstek" durumundaki biletler
- inProgressCount     // "Atanan" durumundaki biletler
- closedCount         // "Çözümlenen" durumundaki biletler
```

### Kart Başlıkları

| Kart | Değer | Açıklama | Tıklama Filtresi |
|------|-------|----------|------------------|
| **Bana Atanan** | myTicketsCount | Mevcut kullanıcıya atanan | Assignee filtresi |
| **Yeni Biletler** | openTicketsCount | Bekleyen istekler | "Yeni İstek" |
| **Atanan** | inProgressCount | Üzerinde çalışılan | "Atanan" |
| **Çözümlenen** | closedCount | Tamamlanan biletler | "Çözümlenen" |

## 🚀 Kullanım

### Pages
```typescript
import { 
  TicketsPage, 
  TicketDetailPage, 
  NewTicketPage 
} from '@/features/tickets';
```

### Hooks
```typescript
import { 
  useTicketFilters, 
  useTicketStats,
  useTicketExport 
} from '@/features/tickets/hooks';

const {
  filteredTickets,
  searchTerm,
  statusFilter,
  setStatusFilter
} = useTicketFilters({ tickets });

const {
  myTicketsCount,
  openTicketsCount,
  inProgressCount,
  closedCount
} = useTicketStats({ tickets, filteredTickets, currentUser });
```

### Types
```typescript
import type { 
  Ticket, 
  TicketRecord, 
  TicketDetail,
  TicketStatus 
} from '@/features/tickets/model';
```

## ✨ Özellikler

### TicketsPage
- **Responsive Tasarım**
  - Desktop: Tablo görünümü
  - Mobile: Card list görünümü
- **Filtreleme**
  - Durum, İstek Tipi, Atanan kişi
  - Gelişmiş arama (ID, başlık, proje)
- **İstatistik Kartları** (Tıklanabilir filtreleme)
- **Sıralama & Pagination**
- **CSV Export**
- **Tablo satırı tıklama** - Detaya gider

### TicketDetailPage
- **Sol Panel**
  - Açıklama (Description)
  - Ekler (Attachments)
  - Efor Takibi (Efforts)
  - Yorumlar (Comments)
- **Sağ Panel**
  - Meta Bilgiler (Durum, Öncelik, Tarihler)
  - Proje Bilgisi (İlişkili proje)
  - Timeline (Geçmiş)

### NewTicketPage
- **Multi-step Form**
  - Adım 1: Temel Bilgiler
  - Adım 2: Detaylar & Ekler
- **Rich Text Editor** (TipTap)
- **Dosya Yükleme**
- **Form Validation**

## 🎨 Styling

### Shared Styles
```typescript
// src/features/tickets/ui/shared/
├── ticketDetailStyles.ts    # Detay sayfası stilleri
├── ticketCardStyles.ts      # Kart stilleri
└── ticketTableColumns.tsx   # Tablo kolon tanımları
```

### Hover Effects
- Ekler, Efor, Yorumlar: Hover'da mavi border + shadow
- Kart'lar: Hover'da transform + shadow

## 🔧 Teknik Detaylar

### Dependency Management
- React Hooks bağımlılıkları optimize
- `useMemo` ile performans optimizasyonu
- `useCallback` ile fonksiyon memoization

### Type Safety
- Merkezi type definitions (`@/shared/types/ticket.ts`)
- Strict TypeScript checking
- Enum yerine `as const` kullanımı

### Code Quality
- ✅ ESLint geçer
- ✅ TypeScript compiler geçer
- ✅ Build başarılı
- 📝 İyi dokümante edilmiş

## 🔗 İlişkili Dosyalar

### Merkezi Kaynaklar
- Types: `@/shared/types/ticket.ts`
- Mock Data: `@/shared/data/mocks/tickets.mock.ts`
- Constants: `@/shared/config/constants.ts` (TICKET_STATUS_DATA)
- Styles: `@/shared/styles/` (colors, spacing, theme)

### API Entegrasyonu
```typescript
// src/shared/api/ticketService.ts (gelecekte eklenecek)
export const ticketService = {
  getTickets: () => apiClient.get('/tickets'),
  getTicket: (id: string) => apiClient.get(`/tickets/${id}`),
  createTicket: (data) => apiClient.post('/tickets', data),
  updateTicket: (id, data) => apiClient.put(`/tickets/${id}`, data),
  deleteTicket: (id) => apiClient.delete(`/tickets/${id}`),
};
```

## 📝 Notlar

- Ticket durumları merkezi `TICKET_STATUS_DATA` ile senkronize edilmelidir
- Mock verilerde eski durumlar ("Açık", "İşlemde", "Çözüldü") kullanılmamalı
- Stats hesaplamaları `TICKET_STATUS` constant'larını kullanmalı
- Yeni durum eklendiğinde `TICKET_STATUS_DATA` güncellenmelidir
