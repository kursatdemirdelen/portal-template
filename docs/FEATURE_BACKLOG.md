# Feature Backlog

Bu doküman her feature için mevcut durum ve eksik işlevlerin özetini içerir.

---

## 📊 Feature Durumları

| Durum | Emoji | Açıklama |
|-------|-------|----------|
| Tamamlandı | ✅ | Production-ready |
| Geliştirildi | 🔄 | Çalışıyor, iyileştirme bekliyor |
| Placeholder | 📋 | Şablon UI, işlevsel değil |
| Planlandı | 🗓️ | Tasarım aşamasında |

### Hızlı Özet

| Feature | Durum | Öncelik |
|---------|-------|----------|
| Parameters | ✅ Tamamlandı | Admin |
| Users | ✅ Tamamlandı | Admin |
| Permissions | ✅ Tamamlandı | Admin |
| Logs | ✅ Tamamlandı | Admin |
| **Customers** | ✅ **Tamamlandı** | Secondary |
| Tickets | 📋 Placeholder | Core |
| Projects | 📋 Placeholder | Core |
| Assignments | 📋 Placeholder | Core |
| Time Tracking | 📋 Placeholder | Core |
| Leaves | 📋 Placeholder | Secondary |
| Approvals | 📋 Placeholder | Secondary |
| Dashboard | ⚠️ Static | Core |

---

## Admin Paneli

### ✅ Parameters (Sistem Parametreleri)

**Durum:** Tamamlandı (Modüler Yapı)

**Mevcut Özellikler:**
- Kategori tabları (Sistem, Bildirim, SLA, Bilet)
- Arama ve durum filtresi
- CRUD işlemleri (Ekle, Düzenle, Sil)
- Toplu işlemler (Durum değiştir, Sil)
- CSV export
- İstatistik dashboard
- Async API-driven architecture

**Dosya Yapısı:**
```
features/parameters/
├── model/types.ts          # Parameter, GetRequest, GetResponse...
├── ui/
│   ├── constants.ts         # CATEGORY_LABELS, STATUS_COLORS...
│   ├── ParameterStatsCards.tsx
│   ├── ParameterFiltersBar.tsx
│   ├── ParameterTable.tsx
│   ├── ParameterFormModal.tsx
│   └── index.ts
├── hooks/
│   ├── useParameters.tsx    # State yönetimi hook'u
│   └── index.ts
├── pages/ParametersPage.tsx # ~105 satır (kompakt)
└── index.ts
```

**API Servisi:** `shared/api/parameterService.ts`

---

### ✅ Users (Kullanıcı Yönetimi)

**Durum:** Tamamlandı (Modüler Yapı)

**Mevcut Özellikler:**
- Kullanıcı listesi (tablo)
- Rol ve durum filtreleri
- Toplu seçim ve durum değiştirme
- CRUD modal
- Async API entegrasyonu

**Dosya Yapısı:**
```
features/users/
├── model/types.ts          # User, UserRole, UserStatus...
├── ui/
│   ├── constants.ts         # ROLE_LABELS, STATUS_COLORS...
│   ├── UserStatsCards.tsx
│   ├── UserFiltersBar.tsx
│   ├── UserTable.tsx
│   ├── UserFormModal.tsx
│   └── index.ts
├── hooks/
│   ├── useUsers.ts          # State yönetimi hook'u
│   └── index.ts
├── pages/
│   ├── UsersPage.tsx        # ~85 satır (kompakt)
│   └── UserCreatePage.tsx
├── mockData.ts
└── index.ts
```

---

### ✅ Permissions (Yetki Yönetimi)

**Durum:** Tamamlandı (Modüler Yapı)

**Mevcut Özellikler:**
- Rol listesi ve seçimi
- Modül bazlı izin matrisi
- İzin toggle (checkbox)
- Rol istatistikleri
- Rol kopyalama ve silme

**Dosya Yapısı:**
```
features/permissions/
├── model/types.ts           # Permission, RolePermissionMap...
├── ui/
│   ├── constants.ts          # MODULE_LABELS, ACTION_COLORS...
│   ├── PermissionStatsCards.tsx
│   ├── RoleSelector.tsx
│   ├── PermissionMatrixTable.tsx
│   ├── RolesSummaryTable.tsx
│   └── index.ts
├── hooks/
│   ├── usePermissions.ts     # State yönetimi hook'u
│   └── index.ts
├── pages/PermissionsPage.tsx # ~80 satır (kompakt)
├── mockData.ts
└── index.ts
```

---

### ✅ Logs (Sistem Logları)

**Durum:** Tamamlandı (Modüler Yapı)

**Mevcut Özellikler:**
- Log listesi (tablo)
- Seviye ve kaynak filtreleri
- Tarih aralığı seçimi
- Arama
- Log detay modalı
- CSV export

**Dosya Yapısı:**
```
features/logs/
├── model/types.ts          # LogEntry, LogLevel, LogSource...
├── ui/
│   ├── constants.ts         # LOG_LEVEL_LABELS, LOG_SOURCE_COLORS...
│   ├── LogStatsCards.tsx
│   ├── LogFiltersBar.tsx
│   ├── LogTable.tsx
│   ├── LogDetailModal.tsx
│   └── index.ts
├── hooks/
│   ├── useLogs.ts           # State yönetimi hook'u
│   └── index.ts
├── pages/LogsPage.tsx       # ~65 satır (kompakt)
├── mockData.ts
└── index.ts
```

---

## Core Features

### 📋 Tickets (Bilet Sistemi)

**Durum:** Placeholder

**Mevcut:**
- Liste görünümü (mock data)
- Temel tablo yapısı

**Planlanan Özellikler:**
- [ ] Ticket detay modalı/sayfası
- [ ] Yeni ticket oluşturma formu
- [ ] Durum değiştirme aksiyonları
- [ ] Departman/atanan filtresi
- [ ] Öncelik renk kodları
- [ ] Rol bazlı görünüm (customer vs internal)
- [ ] Yorum/activity timeline

**API Gereksinimleri:**
```typescript
GET    /tickets           # Liste
GET    /tickets/:id       # Detay
POST   /tickets           # Oluştur
PUT    /tickets/:id       # Güncelle
DELETE /tickets/:id       # Sil
POST   /tickets/:id/comments  # Yorum ekle
```

---

### 📋 Projects (Proje Yönetimi)

**Durum:** Placeholder

**Mevcut:**
- Kart listesi görünümü (mock data)

**Planlanan Özellikler:**
- [ ] Proje detay sayfası
- [ ] Proje oluşturma/düzenleme formu (stepper)
- [ ] Ekip yönetimi
- [ ] Durum ve progress takibi
- [ ] Gantt chart / timeline
- [ ] Filtreleme (durum, tarih, ekip)

**API Gereksinimleri:**
```typescript
GET    /projects          # Liste
GET    /projects/:id      # Detay
POST   /projects          # Oluştur
PUT    /projects/:id      # Güncelle
DELETE /projects/:id      # Sil
GET    /projects/:id/team # Ekip listesi
POST   /projects/:id/team # Ekip ata
```

---

### 📋 Assignments (Zimmet Yönetimi)

**Durum:** Placeholder

**Mevcut:**
- Liste ve detay tablosu (mock data)

**Planlanan Özellikler:**
- [ ] Zimmet oluşturma modalı
- [ ] Tamamla/Düzenle aksiyonları
- [ ] Devir alma/verme akışı
- [ ] Ekipman kategorileri
- [ ] Audit log / geçmiş
- [ ] Barkod/QR entegrasyonu

**API Gereksinimleri:**
```typescript
GET    /assignments           # Liste
GET    /assignments/:id       # Detay
POST   /assignments           # Oluştur
PUT    /assignments/:id       # Güncelle
POST   /assignments/:id/transfer  # Devir
GET    /assignments/:id/history   # Geçmiş
```

---

### 📋 Time Tracking (Zaman Takibi)

**Durum:** Placeholder

**Mevcut:**
- Tablo/istatistik görünümü (mock data)

**Planlanan Özellikler:**
- [ ] Start/Stop timer
- [ ] Manuel süre girişi
- [ ] Haftalık/aylık görünüm
- [ ] Proje bazlı süre takibi
- [ ] Hedef yönetimi
- [ ] CSV/Excel export
- [ ] Yönetici: ekip filtresi

**API Gereksinimleri:**
```typescript
GET    /timetracking          # Kayıtlar
POST   /timetracking          # Kayıt oluştur
PUT    /timetracking/:id      # Güncelle
DELETE /timetracking/:id      # Sil
GET    /timetracking/stats    # İstatistikler
POST   /timetracking/timer/start  # Timer başlat
POST   /timetracking/timer/stop   # Timer durdur
```

---

## Secondary Features

### 📋 Leaves (İzin Yönetimi)

**Durum:** Placeholder

**Planlanan:**
- İzin talep formu
- Onay/Red akışı
- Balance takibi
- Takvim görünümü
- Manager dashboard

---

### ✅ Customers (Müşteri Yönetimi)

**Durum:** Tamamlandı

**Mevcut Özellikler:**
- Modern gradient stat kartları (Toplam, Aktif, Beklemede, Pasif)
- Müşteri listesi (responsive tablo)
- Arama ve durum filtreleri
- CRUD işlemleri (Modal form)
- Müşteri detay sayfası (Hero card, bilgi kartları)
- Lisans bilgileri kartı (süre progress bar)
- Responsive tasarım (xs/sm/md breakpoints)

**Dosya Yapısı:**
```
features/customers/
├── model/
│   └── types.ts           # Customer, LicenseInfo, ContactInfo...
├── hooks/
│   └── useCustomers.ts    # State ve handlers hook
├── ui/
│   ├── constants.ts       # STATUS_LABELS, LICENSE_COLORS...
│   ├── CustomerStatsCards.tsx   # İstatistik kartları
│   ├── CustomerFiltersBar.tsx   # Arama/filtre alanı
│   ├── CustomerTable.tsx        # Liste tablosu
│   ├── CustomerFormModal.tsx    # Oluştur/Düzenle modalı
│   ├── CustomerHeroCard.tsx     # Detay hero section
│   ├── CustomerInfoCard.tsx     # Temel bilgiler
│   ├── CustomerContactCard.tsx  # Yetkili kişi
│   ├── CustomerCompanyCard.tsx  # Firma bilgileri
│   ├── CustomerLicenseCard.tsx  # Lisans bilgileri
│   └── index.ts
├── pages/
│   ├── CustomersPage.tsx        # Liste sayfası (~80 satır)
│   └── CustomerDetailPage.tsx   # Detay sayfası
├── mockData.ts
└── index.ts
```

**Notlar:**
- CustomersPage modüler refactoring yapıldı (839 satır → 80 satır + 4 component + 1 hook)
- Tüm kartlar responsive (mobilde alt alta)
- Modern Ant Design 5 stilleri kullanıldı

---

### 📋 Approvals (Onay Merkezi)

**Durum:** Placeholder

**Planlanan:**
- Bekleyen onaylar listesi
- Onay/Red işlemleri
- Workflow görünümü
- Bildirimler

---

### 📋 Logs (Sistem Logları)

**Durum:** Placeholder

**Planlanan:**
- Aktivite logları
- Filtreleme (kullanıcı, tarih, aksiyon)
- Export

---

## Dashboard

### ⚠️ Ana Dashboard

**Durum:** Static Data

**Mevcut:**
- Widget'lar (statik verilerle)
- Recent tickets
- Project overview
- Quick actions

**Eksikler:**
- [ ] Widget'ların API'ye bağlanması
- [ ] Rol bazlı widget görünürlüğü
- [ ] Lazy loading / skeleton
- [ ] KPI grafikleri

---

## Auth

### 🔄 Login/Logout

**Durum:** Geliştirildi

**Mevcut:**
- Login formu
- Logout redirect
- Mock auth context

**Eksikler:**
- [ ] Backend entegrasyonu
- [ ] Token yönetimi (refresh)
- [ ] Remember me
- [ ] Şifre sıfırlama
- [ ] MFA desteği

---

## Shared Layer

### 🔧 Gerekli İyileştirmeler

**API Layer:**
- [ ] Auth token interceptor
- [ ] Error handler standardizasyonu
- [ ] Request/Response logging
- [ ] Retry logic

**UI Kit:**
- [ ] `FilterToolbar` bileşeni genelleştirme
- [ ] `DataTable` wrapper bileşeni
- [ ] `ConfirmDialog` standardizasyonu
- [ ] Form validation helpers

**State Management:**
- [ ] Auth slice (Redux)
- [ ] Notifications slice
- [ ] Loading states management

---

## Öncelik Sıralaması

### P0 - Kritik
1. Users ve Permissions async entegrasyonu
2. Auth token yönetimi

### P1 - Yüksek
1. Tickets CRUD
2. Dashboard API bağlantıları
3. Error handling

### P2 - Orta
1. Projects detay
2. Time tracking timer
3. Assignments aksiyon

### P3 - Düşük
1. Leaves workflow
2. ~~Customers~~ ✅ Tamamlandı
3. Advanced filters

---

*Son güncelleme: 26 Kasım 2025*
