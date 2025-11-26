# Portal Template (React + TypeScript + Vite)

Modern şirket içi portallar için hazırlanmış, modüler ve okunabilir bir başlangıç seti. Ant Design bileşenleri, feature bazlı klasörleme ve merkezi stil sistemi ile yeni modülleri hızla inşa etmeyi hedefler.

## 📋 İçindekiler

- [Ana Özellikler](#ana-özellikler)
- [Teknoloji Yığını](#teknoloji-yığını)
- [Kurulum ve Çalıştırma](#kurulum-ve-çalıştırma)
- [Proje Yapısı](#proje-yapısı)
- [Feature Mimarisi](#feature-mimarisi)
- [API Servisleri](#api-servisleri)
- [Navigasyon ve Yetkilendirme](#navigasyon-ve-yetkilendirme)
- [Stil Sistemi](#stil-sistemi)
- [Geliştirme Rehberi](#geliştirme-rehberi)
- [Dokümanlar](#dokümanlar)

---

## Ana Özellikler

- **Feature-based mimari**: Her iş alanı `features/<feature>` altında kendi `model`, `ui` ve `pages` katmanına sahip.
- **Tip güvenliği**: TypeScript ve Redux Toolkit ile tiplenmiş global durum ve hook seti.
- **Mock API Services**: Gerçek backend hazır olana kadar kullanılabilir async service katmanı.
- **Hazır layout ve navigasyon**: `AppLayout`, `ProtectedRoute` ve `appRoutes` metadata'sı ile yan menü/breadcrumb otomatik oluşur.
- **UI taslakları**: Placeholder sayfalar, SectionCard/PageContainer bileşenleri ve renk/spacing token'larıyla tutarlı görünüm.
- **Ant Design temelli tasarım**: Tema override'ları ve componentStyles ile kolayca özelleştirilebilir.

---

## Teknoloji Yığını

| Amaç | Teknoloji |
| --- | --- |
| UI & bileşen modeli | React 19, Ant Design 5 |
| Dil & araçlama | TypeScript 5.9, Vite 7 (SWC React plugin) |
| Durum yönetimi | Redux Toolkit + React-Redux |
| Routing | React Router DOM 7 |
| HTTP katmanı | Axios + paylaşılmış helper'lar |
| Kalite & lint | ESLint 9, TypeScript ESLint, @eslint/js |

> **Gereksinimler:** Node.js 20+, npm 10+. Proje ESNext modül sistemiyle çalışır.

---

## Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu (http://localhost:5173)
npm run dev

# Production build (tip kontrol + optimize)
npm run build

# Build çıktılarını önizle
npm run preview

# ESLint denetimleri
npm run lint
```

---

## Proje Yapısı

```
src/
├── app/                          # Uygulama yapılandırması
│   ├── providers/                # Context providers
│   ├── router/                   # Router ve ProtectedRoute
│   └── store.ts                  # Redux store
│
├── features/                     # İş alanları (feature-based, modüler)
│   ├── parameters/               # Sistem parametreleri yönetimi
│   │   ├── model/                # Tipler ve veri modelleri
│   │   │   ├── types.ts          # TypeScript interface/types
│   │   │   └── index.ts          # Barrel exports
│   │   ├── ui/                   # UI bileşenleri
│   │   │   ├── constants.ts      # Label/color mappings
│   │   │   ├── ParameterStatsCards.tsx
│   │   │   ├── ParameterFiltersBar.tsx
│   │   │   ├── ParameterTable.tsx
│   │   │   ├── ParameterFormModal.tsx
│   │   │   └── index.ts          # Barrel exports
│   │   ├── hooks/                # State yönetimi
│   │   │   ├── useParameters.tsx # Custom hook
│   │   │   └── index.ts
│   │   ├── pages/                # Sayfa bileşenleri (kompakt)
│   │   │   └── ParametersPage.tsx
│   │   └── index.ts              # Feature exports
│   ├── users/                    # Kullanıcı yönetimi (modüler)
│   ├── permissions/              # Yetki yönetimi (modüler)
│   ├── logs/                     # Sistem logları (modüler)
│   ├── customers/                # Müşteri yönetimi (modüler)
│   ├── tickets/                  # Bilet sistemi
│   └── ...                       # Diğer features
│
├── shared/                       # Paylaşılan kod
│   ├── api/                      # API servisleri
│   │   ├── httpClient.ts         # Axios instance
│   │   ├── apiClient.ts          # Base API client
│   │   ├── parameterService.ts   # Parameter CRUD operations
│   │   ├── userService.ts        # User CRUD operations
│   │   └── permissionService.ts  # Permission CRUD operations
│   ├── config/                   # Uygulama ayarları
│   │   ├── routes.ts             # Route tanımları
│   │   ├── theme.ts              # Ant Design tema
│   │   └── roles.ts              # Rol tanımları
│   ├── layout/                   # Layout bileşenleri
│   ├── styles/                   # Stil sabitleri ve yardımcılar
│   └── ui/                       # Ortak UI bileşenleri
│
└── docs/                         # Dokümanlar
    ├── API_INTEGRATION.md        # API entegrasyon rehberi
    ├── FEATURE_BACKLOG.md        # Özellik listesi
    └── DEV_TODO.md               # Geliştirme yapılacaklar
```

---

## Feature Mimarisi

Her feature aşağıdaki standart modüler yapıyı takip eder:

```
features/<feature-name>/
├── model/                        # VERİ KATMANI
│   ├── types.ts                  # TypeScript types ve interfaces
│   └── index.ts                  # export * from './types'
│
├── ui/                           # UI KATMANI
│   ├── constants.ts              # Labels, colors, UI mappings
│   ├── <Feature>StatsCards.tsx   # İstatistik kartları
│   ├── <Feature>FiltersBar.tsx   # Filtre araç çubuğu
│   ├── <Feature>Table.tsx        # Ana tablo bileşeni
│   ├── <Feature>FormModal.tsx    # CRUD modalı
│   └── index.ts                  # Barrel exports
│
├── hooks/                        # STATE KATMANI
│   ├── use<Feature>.ts           # State yönetimi hook'u
│   └── index.ts                  # Barrel exports
│
├── pages/                        # SAYFA KATMANI
│   └── <Feature>Page.tsx         # Kompakt ana sayfa (~60-100 satır)
│
├── mockData.ts                   # Geçici mock data (opsiyonel)
└── index.ts                      # Feature exports
```

### Modüler Yapı Avantajları

- **Küçük dosyalar:** Sayfa bileşenleri 60-100 satır (eskiden 400-800 satır)
- **Tekrar kullanılabilirlik:** UI bileşenleri farklı sayfalarda kullanılabilir
- **Test edilebilirlik:** Hook'lar ve bileşenler bağımsız test edilebilir
- **Separation of Concerns:** Her dosya tek bir sorumluluk taşır

### Katman Sorumlulukları

| Katman | Dosya | Sorumluluk |
|--------|-------|------------|
| **model/** | `types.ts` | Domain entities, API request/response types |
| **ui/** | `constants.ts` | UI labels, colors, dropdown options |
| **ui/** | `*StatsCards.tsx` | İstatistik kart bileşenleri |
| **ui/** | `*FiltersBar.tsx` | Filtre ve aksiyon araç çubuğu |
| **ui/** | `*Table.tsx` | Tablo bileşeni |
| **ui/** | `*FormModal.tsx` | Form modal bileşeni |
| **hooks/** | `use*.ts` | State yönetimi ve iş mantığı |
| **pages/** | `*Page.tsx` | Bileşen kompozisyonu (kompakt) |

---

## API Servisleri

### Mevcut Servisler

| Servis | Dosya | Açıklama |
|--------|-------|----------|
| Parameters | `shared/api/parameterService.ts` | Sistem parametreleri CRUD |
| Users | `shared/api/userService.ts` | Kullanıcı yönetimi CRUD |
| Permissions | `shared/api/permissionService.ts` | Yetki ve rol yönetimi |

### Servis Pattern'i

Tüm servisler aşağıdaki pattern'i takip eder:

```typescript
// 1. Types import from feature model
import type { Entity, GetRequest, GetResponse } from '@/features/<feature>/model';

// 2. Mock database (geliştirme için)
const database: Entity[] = [...];

// 3. Async CRUD functions
export async function getEntities(request: GetRequest): Promise<GetResponse> { ... }
export async function createEntity(request: CreateRequest): Promise<CreateResponse> { ... }
export async function updateEntity(request: UpdateRequest): Promise<UpdateResponse> { ... }
export async function deleteEntity(id: string): Promise<void> { ... }

// 4. Utility functions
export async function getStats(): Promise<Stats> { ... }
export async function exportToCSV(): Promise<{ csv: string; filename: string }> { ... }
```

> **Not:** Detaylı API entegrasyon rehberi için bkz. `docs/API_INTEGRATION.md`

---

## Navigasyon ve Yetkilendirme

### Route Tanımlama

```typescript
// shared/config/routes.ts
{
  path: '/parameters',
  element: <ParametersPage />,
  menuTitle: 'Parametreler',
  menuGroup: 'admin',
  menuIcon: <SettingOutlined />,
  roles: ['admin'],
  showInMenu: true,
}
```

### Menü Oluşturma

- `AppLayout`, `menuGroup` ve `menuIcon` bilgilerini kullanarak yan menüyü otomatik oluşturur
- Breadcrumb'ler `PageContainer` içindeki `useRouteBreadcrumbs` hook'u ile türetilir
- Auth sayfaları `layout: "auth"` ve `showInMenu: false` olarak işaretlenir

### Rol Bazlı Erişim

- `appRoutes` içinde her rota için `roles` alanı bulunur
- `useAuth` ile dönen kullanıcının rolü menüde ve protected sayfalarda filtrelenir
- `ProtectedRoute` yetkisiz kullanıcıları login'e yönlendirir

---

## Stil Sistemi

### Token'lar ve Sabitler

| Dosya | İçerik |
|-------|--------|
| `styleConstants.ts` | Renk, tipografi, spacing, gölge token'ları |
| `componentStyles.ts` | Layout, tablo, kart için ortak stiller |
| `styleHelpers.ts` | Badge/rozet gibi tekrar eden stil üreticileri |
| `theme.ts` | Ant Design ConfigProvider tema ayarları |

### Örnek Kullanım

```typescript
import { colorPalette, spacing } from '@/shared/styles/styleConstants';
import { tableStyles, toolbarStyles } from '@/shared/styles/componentStyles';

// Inline style
<div style={{ padding: spacing.lg, background: colorPalette.background }}>

// Object spread
<Table {...tableStyles.standard} />
```

---

## Geliştirme Rehberi

### Yeni Feature Ekleme

1. **Klasör oluştur:** `features/<feature-name>/`
2. **Model tanımla:** `model/types.ts` içinde types
3. **UI sabitleri:** `ui/constants.ts` içinde labels/colors
4. **UI bileşenleri:** `ui/` altında kompakt bileşenler
5. **Hook yaz:** `hooks/use<Feature>.ts` içinde state yönetimi
6. **Sayfa yaz:** `pages/<Feature>Page.tsx` (sadece kompozisyon)
7. **Route ekle:** `shared/config/routes.ts`
8. **Service oluştur:** `shared/api/<feature>Service.ts` (opsiyonel)

### Modüler Yapı Pattern'i

```typescript
// pages/<Feature>Page.tsx - Kompakt sayfa (örnek)
import { PageContainer } from "@/shared/ui";
import { StatsCards, FiltersBar, Table, FormModal } from "../ui";
import { useFeature } from "../hooks/useFeature";

const FeaturePage: React.FC = () => {
  const { data, filters, handlers } = useFeature();

  return (
    <PageContainer title="Feature">
      <StatsCards stats={data.stats} />
      <FiltersBar filters={filters} onFilter={handlers.filter} />
      <Table data={data.items} onAction={handlers.action} />
      <FormModal {...handlers.modal} />
    </PageContainer>
  );
};
```

### Kod Standartları

- ✅ TypeScript strict mode
- ✅ ESLint kurallarına uyum
- ✅ Barrel exports (index.ts)
- ✅ Async/await pattern
- ✅ Tip güvenli props

### Commit Convention

```
feat: Yeni özellik
fix: Bug düzeltme
docs: Dokümantasyon
refactor: Kod iyileştirme
style: Stil değişikliği
```

---

## Dokümanlar

| Dosya | Açıklama |
|-------|----------|
| `docs/API_INTEGRATION.md` | Backend API entegrasyon rehberi |
| `docs/FEATURE_BACKLOG.md` | Planlanan özellikler ve eksikler |
| `docs/DEV_TODO.md` | Teknik yapılacaklar listesi |

---

## Lisans

Bu proje özel kullanım için hazırlanmıştır.

---

*Son güncelleme: 26 Kasım 2025*
