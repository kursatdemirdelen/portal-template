# 🏗️ Mimari Rehberi

Projenin yapısını ve tasarım ilkelerini anlamak için bu rehberi okuyun.

---

## 📁 Klasör Yapısı

```
src/
├── app/                      # Redux store & router
│   ├── store.ts             # Redux configuration
│   ├── providers/           # Context providers
│   └── router/              # Route definitions
│
├── features/                 # Business features (modüler)
│   ├── users/               # Kullanıcı yönetimi
│   ├── tickets/             # Bilet sistemi
│   ├── projects/            # Proje yönetimi
│   ├── approvals/           # Onay süreçleri
│   └── [feature]/
│       ├── pages/           # Sayfa bileşenleri
│       ├── ui/              # Feature-specific UI
│       ├── hooks/           # Feature hooks
│       ├── model/           # Types & mock data (re-export)
│       └── index.ts         # Barrel export
│
└── shared/                   # Ortak kaynaklar
    ├── api/                 # API servisleri
    │   ├── apiClient.ts    # Axios instance
    │   ├── userService.ts  # User API
    │   └── index.ts        # Exports
    │
    ├── styles/             # Design system
    │   ├── tokens.ts       # Renkler, spacing, typography
    │   ├── theme.ts        # Ant Design konfigürasyonu
    │   ├── appTheme.ts     # Semantic tema objesi
    │   ├── helpers.ts      # Stil helper'lar
    │   └── index.ts        # Barrel export
    │
    ├── data/mocks/         # MERKEZI MOCK DATA
    │   ├── users.mock.ts
    │   ├── approvals.mock.ts
    │   ├── teams.mock.ts
    │   ├── tickets.mock.ts
    │   └── index.ts        # Tüm mock'lar buradan export
    │
    ├── types/              # TypeScript tanımları
    │   ├── user.ts
    │   ├── ticket.ts
    │   └── index.ts        # Barrel export
    │
    ├── ui/                 # Ortak UI bileşenleri
    │   ├── EmptyState.tsx
    │   ├── StatCard.tsx
    │   └── index.ts
    │
    ├── config/             # Konfigürasyonlar
    │   ├── constants.ts    # Global constants
    │   ├── routes.ts       # Route tanımları
    │   └── theme.ts        # DEPRECATED (merkezi sistemde)
    │
    ├── hooks/              # Ortak hooks
    │   └── useAppStore.ts
    │
    └── layout/             # Layout bileşenleri
        ├── AppLayout.tsx
        └── Sidebar.tsx
```

---

## 🎨 Stil Sistemi

### Design Tokens (`src/shared/styles/tokens.ts`)

Tüm tasarım değerleri burada tanımlanır:

```typescript
import { colors, spacing, radius, typography } from '@/shared/styles';

// Renkler
colors.primary        // Ana renk
colors.success        // Başarı rengi
colors.error          // Hata rengi

// Spacing
spacing.xs, spacing.sm, spacing.md, spacing.lg, spacing.xl

// Border Radius
radius.sm, radius.md, radius.lg
```

### Tema Konfigürasyonu

1. **tokens.ts** - Ham tasarım değerleri
2. **theme.ts** - Ant Design ConfigProvider'ı
3. **appTheme.ts** - Semantic tema objesi (bileşenlerde kullanılır)

**✅ Kural:** Hardcoded hex değerleri **asla** kullanma, her zaman `tokens` kullan.

---

## � Authentication Sistemi

### Dosya Yapısı

```
src/features/auth/
├── pages/
│   ├── LoginPage.tsx          # Giriş sayfası
│   └── LogoutPage.tsx         # Çıkış (yükleme + redirect)
├── ui/
│   ├── LoginForm.tsx          # Form bileşeni
│   ├── LoginBranding.tsx      # Left panel branding
│   └── DemoCredentials.tsx    # Demo bilgileri
├── providers/
│   └── AuthProvider.tsx       # Global auth state (Context)
├── services/
│   └── authService.ts         # Login/logout logic
├── hooks/
│   └── useAuth.ts             # useAuth hook
└── model/
    └── types.ts               # Auth types
```

### Mock Kullanıcılar

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | admin |
| worker@example.com | worker123 | worker |
| user@example.com | user123 | user |

### AuthProvider Usage

```typescript
const { user, isAuthenticated, login, logout } = useAuth();
```

### ProtectedRoute Usage

```typescript
<ProtectedRoute roles={['admin']}>
  <AdminPage />
</ProtectedRoute>
```

### Logout Flow

1. Sidebar "Çıkış" → `/logout` navigate
2. LogoutPage mount → `logout()` çağır
3. Token ve localStorage temizle
4. 300ms loader göster
5. `/login` sayfasına yönlendir

---

## �📊 Mock Data Sistemi

Tüm mock veriler **merkezi** olarak yönetilir:

```
src/shared/data/mocks/
├── users.mock.ts           # Kullanıcı verileri
├── approvals.mock.ts       # Onay talepleri
├── teams.mock.ts           # Takım verileri
├── tickets.mock.ts         # Bilet verileri
└── index.ts                # ← Burada tüm mock'lar export edilir
```

### Feature'da Mock Kullanımı

**ESKI (❌ Deprecated):**
```typescript
// features/approvals/model/mockData.ts
export const mockApprovals = [ ... ]
```

**YENİ (✅ Current):**
```typescript
// features/approvals/model/mockData.ts
export { mockApprovals } from '@/shared/data/mocks'
```

---

## 🔌 API Entegrasyonu

Merkezi API client'i kullanılır:

```typescript
import { apiClient } from '@/shared/api';

// GET
const users = await apiClient.get('/users');

// POST
await apiClient.post('/users', userData);

// Environment variable
// .env: VITE_API_URL=http://localhost:3000/api
```

---

## 📦 Type Safety

Tüm types merkezi konumda:

```typescript
// src/shared/types/
├── user.ts         // User type tanımları
├── ticket.ts       // Ticket type tanımları
└── index.ts        # Tüm types buradan import

// Feature'da kullanımı
import type { User, Ticket } from '@/shared/types';
```

---

## ✅ Best Practices

### 1. Stil Tanımlama
```typescript
// ❌ YAPMAAAA
style={{ color: "#5b7aed", padding: "16px" }}

// ✅ YAPMALI
import { colors, spacing } from '@/shared/styles';
style={{ color: colors.primary, padding: spacing.lg }}
```

### 2. Mock Data İçe Aktarımı
```typescript
// ❌ YAPMAAAA
import { mockUsers } from '../mockData';

// ✅ YAPMALI
import { mockUsers } from '@/shared/data/mocks';
```

### 3. Type Tanımı
```typescript
// ❌ YAPMAAAA
interface User { /* inline tanım */ }

// ✅ YAPMALI
import type { User } from '@/shared/types';
```

---

## 🚀 Yeni Feature Ekleme Adımları

1. **Klasör oluştur:** `src/features/[feature-name]`
2. **Yapı oluştur:**
   ```
   [feature-name]/
   ├── pages/
   ├── ui/
   ├── hooks/
   ├── model/
   │   ├── types.ts (veya @/shared/types'dan import)
   │   ├── mockData.ts (veya @/shared/data/mocks'dan import)
   │   └── index.ts
   └── index.ts
   ```
3. **Merkezi mock'a ekle:** `src/shared/data/mocks/[feature].mock.ts`
4. **Merkezi types'a ekle:** `src/shared/types/[feature].ts`
5. **Route tanımla:** `src/shared/config/routes.ts`

---

## 📈 Performans

- ✅ Code splitting (Vite)
- ✅ Lazy loading (React.lazy)
- ✅ Tree shaking
- ✅ Image optimization

Build size:
```
antd: ~1.2 MB (gzip: 388 KB)
react: ~44 KB (gzip: 16 KB)
app code: ~244 KB (gzip: 78 KB)
```

---

## 🔍 Debugging

### Mock Data Kontrol Et
```typescript
import { mockUsers } from '@/shared/data/mocks';
console.log(mockUsers); // Merkezi mock veriye bak
```

### Tema Değişkenlerini Kontrol Et
```typescript
import { colors, spacing } from '@/shared/styles';
console.log(colors.primary);  // Token değerini kontrol et
```

### Browser DevTools
- Redux DevTools ile state'i izle
- React DevTools ile component tree'yi gör
- Network tab'de API çağrılarını kontrol et

---

## 📚 API Entegrasyonu

API entegrasyonu için detaylar: [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md)
