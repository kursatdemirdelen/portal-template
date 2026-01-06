# Users Feature

Kullanıcı yönetimi modülü - Merkezi ve modüler yapı

## 📁 Yapı

```
users/
├── hooks/           # Custom React hooks
│   └── useUsers.ts  # Kullanıcı CRUD işlemleri hook'u
├── model/           # Type definitions
│   ├── index.ts     # Model exports
│   └── types.ts     # TypeScript type'lar (merkezi shared/types'dan import)
├── pages/           # Page components
│   ├── UsersPage.tsx         # Liste sayfası
│   ├── UserDetailPage.tsx    # Detay sayfası (Premium tasarım)
│   ├── UserCreatePage.tsx    # Oluşturma sayfası
│   └── UserEditPage.tsx      # Düzenleme sayfası
├── ui/              # UI components & constants
│   ├── constants.ts          # UI sabitler (merkezi constants'lardan re-export)
│   ├── UserFormModal.tsx     # Form modal komponenti
│   ├── UserStatsCards.tsx    # İstatistik kartları
│   └── UserTableColumns.tsx  # Tablo kolonları
├── index.ts         # Feature exports
└── mockData.ts      # Mock data (merkezi shared/data'dan re-export)
```

## 🎯 Merkezi Yapı

### Type Definitions
- `@/shared/types/user.ts` - Merkezi user type'ları
- `UserRole`: 'admin' | 'manager' | 'worker' | 'user'
- `UserStatus`: 'active' | 'inactive' | 'suspended'

### Constants
- `@/shared/config/constants.ts` - Merkezi constants
- `USER_ROLE_LABELS` - Rol etiketleri
- `USER_ROLE_COLORS` - Rol renkleri
- `USER_STATUS_LABELS` - Durum etiketleri
- `USER_STATUS_COLORS` - Durum renkleri

### API Service
- `@/shared/api/userService.ts` - Merkezi user servisi
- CRUD operations
- Pagination
- Filtering
- Search

### Mock Data
- `@/shared/data/mocks/users.mock.ts` - Merkezi mock data
- Geriye dönük uyumluluk için `mockData.ts` re-export eder

## 🚀 Kullanım

### Pages
```typescript
import { 
  UsersPage, 
  UserDetailPage, 
  UserCreatePage, 
  UserEditPage 
} from '@/features/users';
```

### Hooks
```typescript
import { useUsers } from '@/features/users/hooks';

const {
  users,
  loading,
  handleCreate,
  handleEdit,
  handleDelete
} = useUsers();
```

### Types
```typescript
import type { User, UserRole, UserStatus } from '@/features/users/model';
```

## ✨ Özellikler

### UserDetailPage (Premium Tasarım)
- **Sol Panel - Birleşik Profil Kartı**
  - Gradient header (rol bazlı renk)
  - Büyük avatar (160px) + online status badge
  - E-posta ve telefon info kartları
  - Organizasyon bilgileri
  - Bölgesel ayarlar
  - Sistem bilgileri

- **Sağ Panel - Aktivite & Yetkiler**
  - Aktivite timeline (son giriş, güncelleme, kayıt)
  - Rol & Yetkiler kartı
  - İstatistik kartları
  - Yetkiler sayfasına yönlendirme

### UsersPage
- Tablo görünümü
- Filtreleme (rol, durum, departman)
- Arama
- Pagination
- Toplu işlemler
- İstatistik kartları

## 🔧 Teknik Detaylar

### Dependency Management
- React Hooks bağımlılıkları doğru yönetilir
- `useCallback` ile optimize edilmiş fonksiyonlar
- `useEffect` dependency array'leri eksiksiz

### Type Safety
- Tüm component'ler TypeScript ile yazılmış
- Merkezi type definitions
- Strict type checking

### Code Quality
- ✅ ESLint geçer
- ✅ TypeScript compiler geçer
- ✅ Build başarılı
- 📝 İyi dokümante edilmiş

## 🎨 Styling

- Ant Design components
- Custom gradients
- Glassmorphism effects
- Responsive design
- Rol bazlı renk kodlaması
