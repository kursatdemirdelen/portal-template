/**
 * Parameters Feature - Type Definitions
 * =====================================
 * 
 * Bu dosya, Parameters feature'ının tüm TypeScript type'larını içerir.
 * 
 * 📦 İÇERİK:
 * 
 * 1. DOMAIN TYPES (Core Entities)
 *    - Parameter          → Tek bir parametre kaydı
 *    - ParameterType      → Değer tipi (text, number, boolean, select, json)
 *    - ParameterCategory  → Kategori (system, notification, sla, ticket)
 *    - ParameterStatus    → Durum (active, inactive)
 * 
 * 2. API REQUEST TYPES
 *    - GetParametersRequest      → Liste sorgusu (filter, pagination)
 *    - CreateParameterRequest    → Yeni parametre oluşturma
 *    - UpdateParameterRequest    → Parametre güncelleme
 *    - BulkUpdateParametersRequest → Toplu güncelleme
 * 
 * 3. API RESPONSE TYPES
 *    - GetParametersResponse     → Paginated liste yanıtı
 *    - ParameterStats            → İstatistik özeti
 * 
 * 🔧 BACKEND ENTEGRASYONU:
 * Bu type'lar backend API response'larıyla uyumlu olmalıdır.
 * Eğer backend farklı bir yapı dönerse, buradaki type'ları güncelleyin.
 * 
 * 📁 KULLANIM:
 * - Service:  shared/api/parameterService.ts
 * - Page:     features/parameters/pages/ParametersPage.tsx
 * - UI:       features/parameters/ui/constants.ts (labels için)
 */

export type ParameterType = 'text' | 'number' | 'boolean' | 'select' | 'json';
export type ParameterCategory = 'system' | 'notification' | 'sla' | 'ticket';
export type ParameterStatus = 'active' | 'inactive';

/**
 * Core Parameter domain model
 * Represents a system configuration parameter
 */
export interface Parameter {
  id: string;
  key: string;
  value: string;
  description: string;
  category: ParameterCategory;
  type: ParameterType;
  status: ParameterStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/**
 * Category metadata for UI organization
 */
export interface ParameterCategoryInfo {
  id: ParameterCategory;
  name: string;
  description: string;
  icon?: string;
}

/**
 * API Request/Response models
 */
export interface GetParametersRequest {
  category?: ParameterCategory;
  status?: ParameterStatus;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface GetParametersResponse {
  data: Parameter[];
  total: number;
  limit: number;
  offset: number;
}

export interface CreateParameterRequest {
  key: string;
  value: string;
  description: string;
  category: ParameterCategory;
  type: ParameterType;
}

export interface UpdateParameterRequest {
  id: string;
  value?: string;
  description?: string;
  status?: ParameterStatus;
}

export interface BulkUpdateParametersRequest {
  ids: string[];
  status?: ParameterStatus;
}

/**
 * Statistics for dashboard/analytics
 */
export interface ParameterStats {
  total: number;
  active: number;
  inactive: number;
  byCategory: Record<ParameterCategory, number>;
  lastModified: string;
}
