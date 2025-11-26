# API Entegrasyon Rehberi

Bu doküman, projede API servislerinin nasıl çalıştığını ve gerçek backend entegrasyonu yapılırken izlenecek adımları açıklar.

---

## 📋 İçindekiler

1. [Mevcut Mimari](#mevcut-mimari)
2. [Mock'tan Gerçek API'ye Geçiş](#mocktan-gerçek-apiye-geçiş)
3. [Servis Katmanı Yapısı](#servis-katmanı-yapısı)
4. [HTTP Client Kullanımı](#http-client-kullanımı)
5. [Error Handling](#error-handling)
6. [Örnek Entegrasyon](#örnek-entegrasyon)

---

## Mevcut Mimari

Proje şu an **mock API** pattern'i kullanmaktadır. Bu sayede:
- Frontend geliştirmesi backend'den bağımsız ilerleyebilir
- UI/UX testleri yapılabilir
- Veri yapıları ve tipler önceden tanımlanabilir

### Dosya Yapısı

```
src/shared/api/
├── httpClient.ts          # Axios instance (base config)
├── apiClient.ts           # API helper functions
├── index.ts               # Barrel exports
├── parameterService.ts    # Parameter CRUD (mock)
├── userService.ts         # User CRUD (mock)
└── permissionService.ts   # Permission CRUD (mock)
```

### Mock Servis Örneği

```typescript
// shared/api/parameterService.ts

// 🔴 GEÇİCİ: Mock database - Production'da kaldırılacak
const parameterDatabase: Parameter[] = [...];

// 🔴 GEÇİCİ: Simulated delay - Production'da kaldırılacak
const API_DELAY = 200;

// ✅ KALICI: Async function imzası korunacak
export async function getParameters(
  request: GetParametersRequest
): Promise<GetParametersResponse> {
  // 🔴 Mock implementation - Production'da HTTP call olacak
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  // Filtering logic...
  return { data, total, page, limit, totalPages };
}
```

---

## Mock'tan Gerçek API'ye Geçiş

### Adım 1: HTTP Client Yapılandırması

`httpClient.ts` dosyasında base URL ve interceptor'ları ayarlayın:

```typescript
// shared/api/httpClient.ts
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Auth token ekleme
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Error handling
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired - redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Adım 2: Environment Variables

`.env` dosyası oluşturun:

```env
# .env.development
VITE_API_BASE_URL=http://localhost:3000/api

# .env.production
VITE_API_BASE_URL=https://api.production.com/api
```

### Adım 3: Servis Fonksiyonlarını Güncelleme

Mock implementasyonu HTTP call ile değiştirin:

```typescript
// ÖNCE (Mock)
export async function getParameters(
  request: GetParametersRequest
): Promise<GetParametersResponse> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  // ... mock filtering logic
  return { data, total, page, limit, totalPages };
}

// SONRA (Gerçek API)
export async function getParameters(
  request: GetParametersRequest
): Promise<GetParametersResponse> {
  const response = await httpClient.get('/parameters', { params: request });
  return response.data;
}
```

---

## Servis Katmanı Yapısı

Her servis dosyası aşağıdaki pattern'i takip etmelidir:

### 1. Type Imports

```typescript
/**
 * Parameter Service
 * 
 * Bu servis, sistem parametrelerinin CRUD işlemlerini yönetir.
 * 
 * 🔧 ENTEGRASYON NOTU:
 * - Types: features/parameters/model/types.ts
 * - Endpoint: /api/parameters
 * - Auth: Bearer token required
 */

import type {
  Parameter,
  GetParametersRequest,
  GetParametersResponse,
  CreateParameterRequest,
  // ... diğer types
} from '@/features/parameters/model';

import { httpClient } from './httpClient';
```

### 2. CRUD Functions

```typescript
/**
 * Parametreleri listeler (filtreleme ve pagination ile)
 * 
 * @example
 * const { data, total } = await getParameters({ 
 *   category: 'system', 
 *   status: 'active',
 *   page: 1,
 *   limit: 10 
 * });
 * 
 * 🔧 BACKEND ENDPOINT: GET /api/parameters
 * 🔧 QUERY PARAMS: category, status, search, page, limit
 */
export async function getParameters(
  request: GetParametersRequest = {}
): Promise<GetParametersResponse> {
  const response = await httpClient.get('/parameters', { params: request });
  return response.data;
}

/**
 * Tek bir parametreyi ID ile getirir
 * 
 * 🔧 BACKEND ENDPOINT: GET /api/parameters/:id
 */
export async function getParameter(id: string): Promise<Parameter> {
  const response = await httpClient.get(`/parameters/${id}`);
  return response.data;
}

/**
 * Yeni parametre oluşturur
 * 
 * 🔧 BACKEND ENDPOINT: POST /api/parameters
 * 🔧 BODY: { key, value, description, category, type }
 */
export async function createParameter(
  request: CreateParameterRequest
): Promise<CreateParameterResponse> {
  const response = await httpClient.post('/parameters', request);
  return response.data;
}

/**
 * Mevcut parametreyi günceller
 * 
 * 🔧 BACKEND ENDPOINT: PUT /api/parameters/:id
 * 🔧 BODY: { value?, description?, status? }
 */
export async function updateParameter(
  request: UpdateParameterRequest
): Promise<UpdateParameterResponse> {
  const { id, ...body } = request;
  const response = await httpClient.put(`/parameters/${id}`, body);
  return response.data;
}

/**
 * Parametreyi siler
 * 
 * 🔧 BACKEND ENDPOINT: DELETE /api/parameters/:id
 */
export async function deleteParameter(id: string): Promise<void> {
  await httpClient.delete(`/parameters/${id}`);
}
```

### 3. Batch/Utility Functions

```typescript
/**
 * Toplu parametre güncelleme
 * 
 * 🔧 BACKEND ENDPOINT: PATCH /api/parameters/bulk
 * 🔧 BODY: { ids: string[], updates: { status?, ... } }
 */
export async function bulkUpdateParameters(
  request: BulkUpdateParametersRequest
): Promise<BulkUpdateParametersResponse> {
  const response = await httpClient.patch('/parameters/bulk', request);
  return response.data;
}

/**
 * Parametre istatistiklerini getirir
 * 
 * 🔧 BACKEND ENDPOINT: GET /api/parameters/stats
 */
export async function getParameterStats(): Promise<ParameterStats> {
  const response = await httpClient.get('/parameters/stats');
  return response.data;
}

/**
 * Parametreleri CSV olarak export eder
 * 
 * 🔧 BACKEND ENDPOINT: GET /api/parameters/export?format=csv
 */
export async function exportParametersToCSV(
  parameterIds?: string[]
): Promise<{ csv: string; filename: string }> {
  const response = await httpClient.get('/parameters/export', {
    params: { format: 'csv', ids: parameterIds?.join(',') }
  });
  return response.data;
}
```

---

## HTTP Client Kullanımı

### Base Client

```typescript
// shared/api/httpClient.ts
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
});
```

### Request Helpers

```typescript
// shared/api/apiClient.ts

/**
 * Generic GET request
 */
export async function get<T>(url: string, params?: object): Promise<T> {
  const response = await httpClient.get(url, { params });
  return response.data;
}

/**
 * Generic POST request
 */
export async function post<T, D = unknown>(url: string, data?: D): Promise<T> {
  const response = await httpClient.post(url, data);
  return response.data;
}

/**
 * Generic PUT request
 */
export async function put<T, D = unknown>(url: string, data?: D): Promise<T> {
  const response = await httpClient.put(url, data);
  return response.data;
}

/**
 * Generic DELETE request
 */
export async function del<T>(url: string): Promise<T> {
  const response = await httpClient.delete(url);
  return response.data;
}
```

---

## Error Handling

### Centralized Error Handler

```typescript
// shared/api/errorHandler.ts

export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, unknown>;
}

export function handleApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const response = error.response;
    
    return {
      message: response?.data?.message || 'Bir hata oluştu',
      code: response?.data?.code || 'UNKNOWN_ERROR',
      status: response?.status || 500,
      details: response?.data?.details,
    };
  }
  
  return {
    message: 'Beklenmeyen bir hata oluştu',
    code: 'UNEXPECTED_ERROR',
    status: 500,
  };
}
```

### Servis İçinde Kullanım

```typescript
export async function getParameters(
  request: GetParametersRequest
): Promise<GetParametersResponse> {
  try {
    const response = await httpClient.get('/parameters', { params: request });
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error);
    
    // Loglama
    console.error('getParameters failed:', apiError);
    
    // UI'a error throw
    throw apiError;
  }
}
```

### Sayfa İçinde Kullanım

```typescript
// pages/ParametersPage.tsx
import { message } from 'antd';
import { getParameters } from '@/shared/api/parameterService';

const loadData = async () => {
  try {
    setLoading(true);
    const response = await getParameters({ category: 'system' });
    setParameters(response.data);
  } catch (error) {
    // TypeScript-safe error handling
    if (error && typeof error === 'object' && 'message' in error) {
      message.error(error.message as string);
    } else {
      message.error('Veriler yüklenemedi');
    }
  } finally {
    setLoading(false);
  }
};
```

---

## Örnek Entegrasyon

### Tam Servis Dosyası (Production-Ready)

```typescript
/**
 * Parameter Service - Production Version
 * 
 * API Endpoints:
 * - GET    /api/parameters          → List all
 * - GET    /api/parameters/:id      → Get one
 * - POST   /api/parameters          → Create
 * - PUT    /api/parameters/:id      → Update
 * - DELETE /api/parameters/:id      → Delete
 * - PATCH  /api/parameters/bulk     → Bulk update
 * - GET    /api/parameters/stats    → Statistics
 * - GET    /api/parameters/export   → CSV export
 */

import { httpClient } from './httpClient';
import { handleApiError } from './errorHandler';
import type {
  Parameter,
  GetParametersRequest,
  GetParametersResponse,
  CreateParameterRequest,
  CreateParameterResponse,
  UpdateParameterRequest,
  UpdateParameterResponse,
  BulkUpdateParametersRequest,
  BulkUpdateParametersResponse,
  ParameterStats,
} from '@/features/parameters/model';

// ============================================
// LIST & GET
// ============================================

export async function getParameters(
  request: GetParametersRequest = {}
): Promise<GetParametersResponse> {
  try {
    const response = await httpClient.get('/parameters', { params: request });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getParameter(id: string): Promise<Parameter> {
  try {
    const response = await httpClient.get(`/parameters/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

// ============================================
// CREATE & UPDATE
// ============================================

export async function createParameter(
  request: CreateParameterRequest
): Promise<CreateParameterResponse> {
  try {
    const response = await httpClient.post('/parameters', request);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function updateParameter(
  request: UpdateParameterRequest
): Promise<UpdateParameterResponse> {
  try {
    const { id, ...body } = request;
    const response = await httpClient.put(`/parameters/${id}`, body);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

// ============================================
// DELETE
// ============================================

export async function deleteParameter(id: string): Promise<{ message: string }> {
  try {
    const response = await httpClient.delete(`/parameters/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

// ============================================
// BULK OPERATIONS
// ============================================

export async function bulkUpdateParameters(
  request: BulkUpdateParametersRequest
): Promise<BulkUpdateParametersResponse> {
  try {
    const response = await httpClient.patch('/parameters/bulk', request);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

// ============================================
// UTILITY
// ============================================

export async function getParameterStats(): Promise<ParameterStats> {
  try {
    const response = await httpClient.get('/parameters/stats');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function exportParametersToCSV(
  parameterIds?: string[]
): Promise<Blob> {
  try {
    const response = await httpClient.get('/parameters/export', {
      params: { 
        format: 'csv', 
        ids: parameterIds?.join(',') 
      },
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
```

---

## Checklist: API Entegrasyonu

Yeni bir feature için API entegrasyonu yaparken:

- [ ] `.env` dosyasında `VITE_API_BASE_URL` tanımlı mı?
- [ ] `httpClient.ts` içinde auth interceptor var mı?
- [ ] Feature types (`model/types.ts`) backend response ile uyumlu mu?
- [ ] Servis fonksiyonları async/await pattern kullanıyor mu?
- [ ] Error handling (`handleApiError`) implement edildi mi?
- [ ] Sayfa bileşenlerinde loading/error states yönetiliyor mu?
- [ ] TypeScript type assertions doğru mu?

---

## İlgili Dosyalar

| Dosya | Açıklama |
|-------|----------|
| `shared/api/httpClient.ts` | Axios base instance |
| `shared/api/apiClient.ts` | Generic helpers |
| `shared/api/*Service.ts` | Feature-specific CRUD |
| `features/*/model/types.ts` | Request/Response types |
