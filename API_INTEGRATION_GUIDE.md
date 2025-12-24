# 🔌 API Entegrasyon Rehberi

Mock servisleriyle çalışan uygulamayı gerçek backend API'sine bağlamak için bu rehberi kullan.

---

## 📋 Mevcut Durum

- ✅ API client merkezi noktada (`src/shared/api/apiClient.ts`)
- ✅ Servisleri merkezi yerde (`userService.ts`, `permissionService.ts`, vb.)
- ✅ TypeScript tiplemesi tam
- ✅ Mock veriler `src/shared/data/mocks/` klasöründe

---

## 🚀 Entegrasyon Adımları

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

## 📊 API Endpoint Referansı

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
