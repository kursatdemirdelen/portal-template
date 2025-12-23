/**
 * API Layer - Barrel Exports
 * ==========================
 * 
 * Bu modül, tüm API servislerini merkezi bir noktadan export eder.
 * 
 * 📁 DOSYA YAPISI:
 * - apiClient.ts      → Axios base instance ve helper fonksiyonlar (get, post)
 * - userService       → Kullanıcı yönetimi CRUD
 * - permissionService → İzin ve rol yönetimi CRUD
 * 
 * 🔧 KULLANIM:
 * ```typescript
 * import { apiClient, apiGet, apiPost } from '@/shared/api';
 * import { getUsers } from '@/shared/api/userService';
 * ```
 * 
 * 📝 YENİ SERVİS EKLEME:
 * 1. shared/api/<feature>Service.ts dosyası oluştur
 * 2. Types'ı features/<feature>/model/types.ts'den import et
 * 3. CRUD fonksiyonları yaz (getX, createX, updateX, deleteX)
 * 4. Bu index.ts'e export ekle
 */

// HTTP Layer - Axios tabanlı tek client
export * from './apiClient';

// Feature Services
// Not: Servisler doğrudan import edilmeli, barrel export yerine
// Örnek: import { getParameters } from '@/shared/api/parameterService';
