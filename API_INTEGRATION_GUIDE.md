# 🔌 API Entegrasyon Rehberi

Mock servisleriyle çalışan uygulamayı gerçek backend API'sine bağlamak için bu rehberi kullan.

---

## 📋 Mevcut Durum

- ✅ API client merkezi noktada (`src/shared/api/apiClient.ts`)
- ✅ Servisleri merkezi yerde (`userService.ts`, `permissionService.ts`, vb.)
- ✅ TypeScript tiplemesi tam
- ✅ Mock veriler `src/shared/data/mocks/` klasöründe
- ✅ Auth sistemi hazır (AuthProvider, tokenService, ProtectedRoute)

---

## 🔐 Authentication & Token Setup

### Test Kimlik Bilgileri

**Mock giriş için kullanılabilecek hesaplar:**

| Email | Şifre | Role |
|-------|-------|------|
| admin@example.com | admin123 | admin |
| worker@example.com | worker123 | worker |
| user@example.com | user123 | user |

> ℹ️ **Not:** Detaylı bilgi için [ARCHITECTURE.md#-authentication-sistemi](../ARCHITECTURE.md#-authentication-sistemi) bölümüne bakın.

### 1️⃣ Token Storage

`src/shared/api/tokenService.ts` kullanarak token'ları yönet:

```typescript
import { tokenService } from '@/shared/api/tokenService';

tokenService.setToken(token)      // Token kaydet
tokenService.getToken()            // Token oku
tokenService.removeToken()         // Token sil
tokenService.getUserFromToken()    // JWT decode + user çıkart
```

### 2️⃣ API Client Interceptor'ı

`src/shared/api/apiClient.ts` zaten hazır (token otomatik eklenir):

```typescript
// Request interceptor'ı
apiClient.interceptors.request.use((config) => {
  const token = tokenService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor'ı - 401'de logout
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new Event('auth:unauthorized'));
      // AuthProvider bu event'i dinler ve logout çağırır
    }
    return Promise.reject(error);
  }
);
```

### 3️⃣ Login Service Güncelle

`src/features/auth/services/authService.ts` dosyasında mock'u gerçek API'ye değiştir:

```typescript
// ❌ MOCK (şu an)
function generateMockToken(user: AuthUser): string { ... }

// ✅ GERÇEK API
export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data as LoginResponse; // { user, token }
  },
};
```

### 4️⃣ Login Response Format

Backend'in şu format dönmesi gerekir:

```json
{
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## � Mock Data Sistemi

Uygulamada kullanılan tüm mock veriler merkezi olarak yönetilir:

```
src/shared/data/mocks/
├── users.mock.ts           # Kullanıcı verileri
├── approvals.mock.ts       # Onay talepleri
├── teams.mock.ts           # Takım verileri
├── tickets.mock.ts         # Bilet verileri
└── index.ts                # ← Tüm mock'lar buradan export
```

### Kullanım Örneği

**Feature'da mock veriler:**
```typescript
// ✅ DOĞRU
import { mockApprovals, mockTickets } from '@/shared/data/mocks';

// ❌ YAPMAAAA
import { mockApprovals } from '../mockData'; // Deprecated
```

### Backend'e Geçiş

Mock verilerini gerçek API çağrılarıyla değiştirirken:

1. **Service'i güncelle:** `src/shared/api/[feature]Service.ts`
   ```typescript
   // ❌ Mock
   export const getApprovals = () => Promise.resolve(mockApprovals);
   
   // ✅ API çağrısı
   export const getApprovals = () => apiClient.get('/approvals');
   ```

2. **Component'te değişiklik yok:** Service interface'i aynı kalırsa, component'te kod değişiklik gerekmez.

---

### 1️⃣ Backend URL Ayarla

`.env` dosyasında:

```bash
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
```

### 2️⃣ API Client Konfigürasyonu

`src/shared/api/apiClient.ts` örneği:

```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT || 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Token interceptor'ı (Auth için)
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
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 3️⃣ Servisleri Güncelle

Mock verilerini gerçek API çağrılarıyla değiştir:

```typescript
// src/shared/api/userService.ts
import apiClient from './apiClient';

export const userService = {
  getAll: () => apiClient.get('/users'),
  getById: (id: string) => apiClient.get(`/users/${id}`),
  create: (data) => apiClient.post('/users', data),
  update: (id: string, data) => apiClient.put(`/users/${id}`, data),
  delete: (id: string) => apiClient.delete(`/users/${id}`),
};
```

### 4️⃣ CORS Ayarı

Backend'de CORS etkinleştir (Express örneği):

```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
```

---

## � Token Refresh & Invalidation

### 401 Handling

API 401 dönürse (token geçersiz/expired), `apiClient` otomatik olarak `auth:unauthorized` event'i tetikler ve AuthProvider logout yapar.

### Token Refresh (Opsiyonel)

Refresh token pattern'ı uygulamak isterseniz:

```typescript
// apiClient.ts response interceptor'ında
if (error.response?.status === 401) {
  // 1. Refresh token kullanarak yeni token al
  const newToken = await refreshAccessToken();
  // 2. Token'ı kaydet
  tokenService.setToken(newToken);
  // 3. Original request'i retry et
  return apiClient(config);
}
```

---

## 📊 API Endpoint Referansı

### Authentication Endpoints

| Operasyon | Method | Endpoint | Request Body |
|-----------|--------|----------|---------------|
| Login | POST | `/auth/login` | `{ email, password }` |
| Logout | POST | `/auth/logout` | - |
| Refresh Token | POST | `/auth/refresh` | `{ refreshToken }` |

### User Endpoints

| Operasyon | Method | Endpoint |
|-----------|--------|----------|
| Tüm kullanıcılar | GET | `/users` |
| Kullanıcı getir | GET | `/users/:id` |
| Kullanıcı oluştur | POST | `/users` |
| Kullanıcı güncelle | PUT | `/users/:id` |
| Kullanıcı sil | DELETE | `/users/:id` |

---

## ✅ Kontrol Listesi

- [ ] `.env` dosyası oluşturuldu
- [ ] `VITE_API_URL` backend'e işaret ediyor
- [ ] Servisleri gerçek API çağrılarına güncelledin
- [ ] Backend'de CORS etkinleştirildi
- [ ] Authentication token setup yapıldı
- [ ] `npm run dev` ile test ettiniz

---

## 🆘 Sık Karşılaşılan Sorunlar

### CORS Hatası
Backend'de CORS'u etkinleştir ve origin'i ayarla.

### 401 Unauthorized
Token'ın `localStorage`'da saklandığını ve request'e eklendiğini kontrol et.

### 404 Not Found
Backend endpoint'inin doğru olduğunu ve `.env`'deki base URL'in eşleştiğini kontrol et.

### Timeout
`VITE_API_TIMEOUT` değerini artır veya backend yanıt süresini iyileştir.

---

## 🔍 Debugging

Browser DevTools'da (F12):
- **Network tab:** API çağrılarını ve response'ları göster
- **Console tab:** Hataları kontrol et
- **Redux DevTools:** State değişikliklerini izle

---

*Son güncelleme: 24 Aralık 2025*
