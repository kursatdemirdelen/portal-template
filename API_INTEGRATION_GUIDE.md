# 🔌 API Entegrasyon Rehberi

Bu rehber, mock API servisleriyle oluşturulmuş uygulamayı gerçek backend API'sine bağlamak için adım adım talimatlar sağlar.

## 📋 Mevcut Durum

### ✅ Yapılmış İşler
- Mock servislerdeki tüm `setTimeout` gecikmeler kaldırıldı
- API client merkezi noktada (`src/shared/api/apiClient.ts`)
- Tüm feature servisleri `src/shared/api/` altında merkezi
- TypeScript tiplemesi tam
- Error boundary ve global hata yönetimi kurulu

### 📁 API Servisleri Konumu
```
src/shared/api/
├── apiClient.ts           # Axios instance (HTTP istemcisi)
├── userService.ts         # Kullanıcı CRUD servisi
├── permissionService.ts   # İzin/Rol servisi
└── index.ts               # Barrel export
```

---

## 🚀 Entegrasyon Adımları

### 1️⃣ Backend URL Konfigürasyonu

**.env.example** veya **.env** dosyasını düzenle:

```bash
# .env
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
```

**veya** production için:

```bash
VITE_API_URL=https://api.example.com/api
```

### 2️⃣ API Client Ayarları

`src/shared/api/apiClient.ts` - Zaten kurulu, gerekli değişiklikleri yap:

```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token interceptor'ı (eğer gerekli)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Error interceptor'ı
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global hata yönetimi
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 3️⃣ Servisleri Güncelle

Her serviste mock veritabanı ve `setTimeout` bloklarını gerçek API çağrıları ile değiştir.

#### 📌 Örnek: userService.ts

**Eski (Mock):**
```typescript
export async function getUsers(request: GetUsersRequest): Promise<GetUsersResponse> {
  // await new Promise((resolve) => setTimeout(resolve, API_DELAY)); // ← Kaldırıldı
  
  let filtered = [...userDatabase]; // ← Mock veri
  // ... filtre ve sıralama
}
```

**Yeni (Real API):**
```typescript
export async function getUsers(request: GetUsersRequest): Promise<GetUsersResponse> {
  try {
    const response = await apiClient.get('/users', { params: request });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
}
```

#### 📌 Tüm Servislerde Yapılacak İşler

| Servis | Fonksiyon | Endpoint | Metod |
|--------|-----------|----------|-------|
| **userService** | `getUsers()` | `/users` | GET |
| | `getUser(id)` | `/users/{id}` | GET |
| | `createUser()` | `/users` | POST |
| | `updateUser()` | `/users/{id}` | PUT |
| | `deleteUser()` | `/users/{id}` | DELETE |
| | `bulkUpdateUsers()` | `/users/bulk` | PATCH |
| | `getUserStats()` | `/users/stats` | GET |
| | `exportUsersToCSV()` | `/users/export` | GET |
| **permissionService** | `getPermissions()` | `/permissions` | GET |
| | `getPermission(id)` | `/permissions/{id}` | GET |
| | `createPermission()` | `/permissions` | POST |
| | `updatePermission()` | `/permissions/{id}` | PUT |
| | `getRolePermissions()` | `/roles/{id}/permissions` | GET |
| | `updateRolePermissions()` | `/roles/{id}/permissions` | PUT |
| | `bulkUpdatePermissions()` | `/permissions/bulk` | PATCH |
| | `getPermissionStats()` | `/permissions/stats` | GET |
| | `exportPermissionsToCSV()` | `/permissions/export` | GET |

### 4️⃣ Authentication Kurulumu

Login sayfasında token alma:

```typescript
// auth/api/authService.ts (veya similar)
import apiClient from '@/shared/api/apiClient';

export async function login(email: string, password: string) {
  const response = await apiClient.post('/auth/login', {
    email,
    password,
  });
  
  // Token'ı localStorage'a kaydet
  localStorage.setItem('authToken', response.data.token);
  
  return response.data;
}
```

### 5️⃣ Error Handling Standardı

Tüm servislerde aynı hata yapısını kullan:

```typescript
try {
  const response = await apiClient.get('/endpoint');
  return response.data;
} catch (error) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message || 'Bir hata oluştu';
    
    // Global toast/notification
    console.error(`Error ${status}: ${message}`);
    throw new Error(message);
  }
  throw error;
}
```

---

## 🧪 Test Etme

### Local Backend Testi

```bash
# Terminal 1: Backend API (3000 portunda)
npm start --prefix ../your-backend

# Terminal 2: Frontend
npm run dev

# .env güncellenmiş olmalı:
VITE_API_URL=http://localhost:3000/api
```

### Mock Mode Koruması

Hala mock test etmek istiyorsan:

```typescript
const API_ENABLED = import.meta.env.VITE_ENABLE_MOCK === 'false';

export async function getUsers(request: GetUsersRequest) {
  if (!API_ENABLED) {
    // Mock mod
    return mockImplementation(request);
  }
  
  // Real API
  return apiClient.get('/users', { params: request });
}
```

---

## ⚠️ Yaygın Sorunlar

### 1. CORS Hatası
**Çözüm:** Backend'de CORS kurulumu yap
```typescript
// Backend (Express örneği)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
```

### 2. 401 Unauthorized
**Çözüm:** Token'ın doğru gönderildiğini kontrol et
```typescript
// apiClient.ts içinde
console.log('Auth Header:', config.headers.Authorization);
```

### 3. 404 Not Found
**Çözüm:** Endpoint'in doğru olduğunu kontrol et
- Backend kodu: `GET /api/users` (prefix `/api` ekleme)
- .env: `VITE_API_URL=http://localhost:3000/api`

### 4. Timeout
**Çözüm:** Timeout değerini artır
```bash
VITE_API_TIMEOUT=30000  # 30 saniye
```

---

## 📚 Referanslar

- **API Client:** `src/shared/api/apiClient.ts`
- **Services:** `src/shared/api/*.ts`
- **Error Boundary:** `src/shared/ui/ErrorBoundary.tsx`
- **Auth Store:** `src/features/auth/providers/AuthProvider.tsx`

---

*Son güncelleme: 24 Aralık 2025*
