/**
 * API Layer - Barrel Exports
 * ==========================
 * 
 * Bu modül, tüm API servislerini merkezi bir noktadan export eder.
 * 
 * 📁 DOSYA YAPISI:
 * - httpClient.ts     → Axios base instance (interceptors, base URL)
 * - apiClient.ts      → Generic helper fonksiyonlar (get, post, put, delete)
 * - userService       → Kullanıcı yönetimi CRUD
 * - permissionService → İzin ve rol yönetimi CRUD
 * 
 * 🔧 KULLANIM:
 * ```typescript
 * import { getUsers } from '@/shared/api/userService';
 * ```
 * 
 * 📝 YENİ SERVİS EKLEME:
 * 1. shared/api/<feature>Service.ts dosyası oluştur
 * 2. Types'ı features/<feature>/model/types.ts'den import et
 * 3. CRUD fonksiyonları yaz (getX, createX, updateX, deleteX)
 * 4. Bu index.ts'e export ekle
 */

// HTTP Layer
export * from './httpClient';
export * from './apiClient';

// Feature Services
// Not: Servisler doğrudan import edilmeli, barrel export yerine
// Örnek: import { getParameters } from '@/shared/api/parameterService';
