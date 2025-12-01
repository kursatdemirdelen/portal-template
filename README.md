# Portal Template

Modern şirket içi portallar için hazırlanmış, modüler ve ölçeklenebilir React başlangıç seti.

## 🚀 Hızlı Başlangıç

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu (http://localhost:5173)
npm run dev

# Production build
npm run build

# Lint kontrolü
npm run lint
```

## 📦 Teknoloji Yığını

| Amaç | Teknoloji |
|------|-----------|
| UI Framework | React 19 + Ant Design 5 |
| Dil | TypeScript 5.9 |
| Build Tool | Vite 7 (SWC) |
| State | Redux Toolkit |
| Routing | React Router DOM 7 |
| HTTP | Axios |
| Lint | ESLint 9 |

## 📁 Proje Yapısı

```
src/
├── app/                    # Uygulama yapılandırması
│   ├── providers/          # Context providers (Redux, Auth, Theme)
│   ├── router/             # Router ve ProtectedRoute
│   └── store.ts            # Redux store
│
├── features/               # İş alanları (feature-based)
│   ├── auth/               # Kimlik doğrulama
│   ├── dashboard/          # Ana sayfa ve widget'lar
│   ├── tickets/            # Bilet sistemi ⭐
│   ├── projects/           # Proje yönetimi
│   ├── assignments/        # Görev atama
│   ├── users/              # Kullanıcı yönetimi
│   ├── permissions/        # Yetki yönetimi
│   ├── parameters/         # Sistem parametreleri
│   ├── customers/          # Müşteri yönetimi
│   ├── logs/               # Sistem logları
│   ├── notifications/      # Bildirimler
│   ├── leaves/             # İzin yönetimi
│   ├── approvals/          # Onay akışları
│   ├── time-tracking/      # Zaman takibi
│   └── profile/            # Kullanıcı profili
│
└── shared/                 # Paylaşılan kod
    ├── api/                # API servisleri (mock)
    ├── config/             # Uygulama ayarları
    ├── data/               # Merkezi mock data
    ├── hooks/              # Ortak hook'lar
    ├── layout/             # Layout bileşenleri
    ├── store/              # Redux slice'lar
    ├── styles/             # Stil sabitleri
    └── ui/                 # Ortak UI bileşenleri
```

## 🏗️ Feature Mimarisi

Her feature modüler yapıyı takip eder:

```
features/<feature>/
├── model/                  # Tipler ve sabitler
│   ├── types.ts
│   ├── constants.ts
│   └── index.ts
├── ui/                     # UI bileşenleri
│   ├── <Feature>Table.tsx
│   ├── <Feature>Form.tsx
│   └── index.ts
├── hooks/                  # State yönetimi
│   └── use<Feature>.ts
├── pages/                  # Sayfa bileşenleri
│   └── <Feature>Page.tsx
└── index.ts                # Barrel exports
```

## 🎨 UI Bileşenleri

### Paylaşılan Bileşenler (`shared/ui/`)

| Bileşen | Açıklama |
|---------|----------|
| `PageContainer` | Sayfa wrapper (breadcrumb, başlık) |
| `SectionCard` | İçerik kartı (başlık, aksiyonlar) |
| `UserAvatar` | Kullanıcı avatarı (foto veya baş harf) |
| `FilterToolbar` | Filtre araç çubuğu |
| `StatCard` | İstatistik kartı |
| `RoleBadge` | Rol etiketi |

### Stil Sistemi (`shared/styles/`)

| Dosya | İçerik |
|-------|--------|
| `tokens.ts` | Renk, spacing, radius, shadow gibi tasarım token'ları |
| `helpers.ts` | Durum renkleri, etiket stilleri, layout yardımcıları |
| `appTheme.ts` | Token'lar üstünden oluşturulan semantik tema objesi |
| `theme.ts` | Ant Design tema ayarları |
| `globals.css` | Uygulama genelinde kullanılan CSS değişkenleri |

## 📱 Responsive Tasarım

- **Desktop (>1024px):** Tam sidebar, geniş tablolar
- **Tablet (768-1024px):** Daraltılmış sidebar
- **Mobil (<768px):** Drawer menü, kart görünümü

## 🔐 Yetkilendirme

- Route bazlı rol kontrolü (`roles` array)
- `ProtectedRoute` ile yetkisiz erişim engeli
- `useAuth` hook ile kullanıcı bilgisi

### Mock Giriş
- E-posta ve şifre serbesttir (mock mod).
- E-postadaki anahtar kelimeye göre rol atanır:
    - `admin` → Admin
    - `worker` → Worker
    - Diğer → User
- Oturum bilgisi `localStorage` içinde saklanır; Logout ile temizlenir.

## 📊 Merkezi Mock Data

Tüm mock veriler `shared/data/mocks/` altında gruplanmıştır:

- 10 kullanıcı (avatar, rol, departman)
- Projeler ve takımlar
- Bilet kayıtları
- Departman bilgileri

## 🎯 Önemli Özellikler

### Bilet Sistemi (Tickets)
- Liste ve detay görünümü
- Mobil kart view + sıralama/sayfalama
- Yorum ve efor takibi
- Timeline görünümü
- Rich text editör (Tiptap)
 - Standart loading ve empty state (Skeleton + EmptyTicketList)

### Dashboard
- İstatistik kartları
- Aktif projeler
- Son biletler
- Proje takımları

### Sidebar
- Otomatik responsive davranış
- Smooth animasyonlar
- Mobil drawer modu
- Görünüm Ayarları: Basit tema presetleri (Default, Slate, Midnight, Ocean)
    - Etki kapsamı: Sadece sidebar ve sayfa arkaplanı renkleri
    - Kalıcılık: Seçim `localStorage` içinde saklanır (`appThemePreset`)

### Hata Yönetimi
- Global `ErrorBoundary` ile beklenmeyen hatalarda güvenli fallback.
- 500 ekranı ve "Yenile" aksiyonu.

### Performans
- Route bazlı `React.lazy` ile kod bölme.
- Vite Rollup `manualChunks` ile vendor split:
    - `react`, `antd`, `tiptap`, `icons` ayrı chunk’lar.
    - `chunkSizeWarningLimit` 1500.

## 🎛️ Görünüm Ayarları

- Preset Seçenekleri:
    - `Default`: Açık arkaplan, koyu slate sidebar
    - `Slate`: Biraz daha koyu arkaplan, slate sidebar
    - `Midnight`: Koyu arkaplan ve sidebar (gece modu görünümü olmadan)
    - `Ocean`: Mavi tonlu arkaplan ve derin mavi sidebar (marka uyumlu)
- Not: Global dark mode yok; sadece sidebar ve arkaplan rengi özelleştirilir.

## 📝 Geliştirme Notları

### Yeni Feature Ekleme

1. `features/<name>/` klasörü oluştur
2. `model/types.ts` ile tipleri tanımla
3. `ui/` altında bileşenleri yaz
4. `hooks/use<Name>.ts` ile state yönetimi
5. `pages/<Name>Page.tsx` ile sayfa
6. `shared/config/routes.ts`'e route ekle

### Kod Standartları

- ✅ TypeScript strict mode
- ✅ ESLint kurallarına uyum
- ✅ Barrel exports (index.ts)
- ✅ Feature-based klasörleme
- ✅ Küçük, tek sorumluluklu bileşenler

## 🧪 Komutlar

- `npm run dev`: Geliştirme sunucusu
- `npm run build`: Production derleme
- `npm run preview`: Production build önizleme
- `npm run lint`: ESLint ile statik analiz

---

*Son güncelleme: 2 Aralık 2025*
