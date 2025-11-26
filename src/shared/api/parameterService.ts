/**
 * Parameter Service - API Integration Layer
 * ==========================================
 * 
 * Bu servis, sistem parametrelerinin CRUD işlemlerini yönetir.
 * 
 * 🔧 ENTEGRASYON NOTU:
 * Şu an MOCK implementation kullanılıyor. Gerçek backend entegrasyonu için:
 * 
 * 1. httpClient import'u ekle:
 *    import { httpClient } from './httpClient';
 * 
 * 2. Mock database ve API_DELAY'ı kaldır
 * 
 * 3. Her fonksiyonda mock logic'i HTTP call ile değiştir:
 *    ÖNCE:  await new Promise(resolve => setTimeout(resolve, API_DELAY));
 *    SONRA: const response = await httpClient.get('/parameters', { params: request });
 * 
 * 📍 BACKEND ENDPOINTS:
 * - GET    /api/parameters          → getParameters()
 * - GET    /api/parameters/:id      → getParameter(id)
 * - POST   /api/parameters          → createParameter()
 * - PUT    /api/parameters/:id      → updateParameter()
 * - DELETE /api/parameters/:id      → deleteParameter()
 * - PATCH  /api/parameters/bulk     → bulkUpdateParameters()
 * - GET    /api/parameters/stats    → getParameterStats()
 * - GET    /api/parameters/export   → exportParametersToCSV()
 * 
 * 📁 İLGİLİ DOSYALAR:
 * - Types: src/features/parameters/model/types.ts
 * - Page:  src/features/parameters/pages/ParametersPage.tsx
 * - Docs:  docs/API_INTEGRATION.md
 */

import type {
  Parameter,
  GetParametersRequest,
  GetParametersResponse,
  CreateParameterRequest,
  UpdateParameterRequest,
  BulkUpdateParametersRequest,
  ParameterStats,
} from '@/features/parameters/model';

// ============================================
// 🔴 MOCK CONFIGURATION - Production'da kaldırılacak
// ============================================

// Simulated API delay (ms) - Backend entegrasyonunda kaldır
const API_DELAY = 200;

/**
 * In-memory mock database
 * 🔴 Production'da kaldırılacak - Veriler backend'den gelecek
 */
const parameterDatabase: Parameter[] = [
  // System Parameters
  {
    id: 'PARAM001',
    key: 'max_ticket_priority',
    value: '5',
    description: 'Maksimum bilet öncelik seviyesi',
    category: 'system',
    type: 'number',
    status: 'active',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-15',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },
  {
    id: 'PARAM002',
    key: 'system_name',
    value: 'Portal Intellium',
    description: 'Sistem adı',
    category: 'system',
    type: 'text',
    status: 'active',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-10',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },
  {
    id: 'PARAM003',
    key: 'maintenance_mode',
    value: 'false',
    description: 'Bakım modu aktif mi',
    category: 'system',
    type: 'boolean',
    status: 'active',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-14',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },

  // Notification Parameters
  {
    id: 'PARAM004',
    key: 'notification_email_enabled',
    value: 'true',
    description: 'E-posta bildirimleri etkinleştirilsin mi',
    category: 'notification',
    type: 'boolean',
    status: 'active',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-12',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },
  {
    id: 'PARAM005',
    key: 'notification_email_recipients',
    value: 'admin@example.com,support@example.com',
    description: 'Bildirim alacak e-posta adresleri',
    category: 'notification',
    type: 'text',
    status: 'active',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-13',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },
  {
    id: 'PARAM006',
    key: 'notification_sms_enabled',
    value: 'false',
    description: 'SMS bildirimleri etkinleştirilsin mi',
    category: 'notification',
    type: 'boolean',
    status: 'inactive',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-11',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },

  // SLA Parameters
  {
    id: 'PARAM007',
    key: 'sla_response_hours',
    value: '24',
    description: 'SLA yanıt süresi (saat)',
    category: 'sla',
    type: 'number',
    status: 'active',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-15',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },
  {
    id: 'PARAM008',
    key: 'sla_resolution_hours',
    value: '72',
    description: 'SLA çözüm süresi (saat)',
    category: 'sla',
    type: 'number',
    status: 'active',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-15',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },

  // Ticket Parameters
  {
    id: 'PARAM009',
    key: 'ticket_categories',
    value: 'Bug,Feature,Enhancement,Documentation',
    description: 'Bilet kategorileri (virgülle ayrılmış)',
    category: 'ticket',
    type: 'text',
    status: 'active',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-13',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },
  {
    id: 'PARAM010',
    key: 'ticket_priority_levels',
    value: 'Low,Medium,High,Critical',
    description: 'Bilet öncelik seviyeleri',
    category: 'ticket',
    type: 'text',
    status: 'active',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-14',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },
];

/**
 * Get parameters with filtering and pagination
 */
export async function getParameters(request?: GetParametersRequest): Promise<GetParametersResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = [...parameterDatabase];

      // Filter by category
      if (request?.category) {
        result = result.filter((p) => p.category === request.category);
      }

      // Filter by status
      if (request?.status) {
        result = result.filter((p) => p.status === request.status);
      }

      // Filter by search text
      if (request?.search) {
        const searchLower = request.search.toLowerCase();
        result = result.filter(
          (p) =>
            p.key.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower) ||
            p.value.toLowerCase().includes(searchLower)
        );
      }

      // Pagination
      const limit = request?.limit || 10;
      const offset = request?.offset || 0;
      const paginatedResult = result.slice(offset, offset + limit);

      resolve({
        data: paginatedResult,
        total: result.length,
        limit,
        offset,
      });
    }, API_DELAY);
  });
}

/**
 * Get single parameter by ID
 */
export async function getParameter(id: string): Promise<Parameter | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(parameterDatabase.find((p) => p.id === id) || null);
    }, API_DELAY);
  });
}

/**
 * Create new parameter
 */
export async function createParameter(request: CreateParameterRequest): Promise<Parameter> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newParameter: Parameter = {
        id: `PARAM${String(parameterDatabase.length + 1).padStart(3, '0')}`,
        ...request,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        createdBy: 'current-user',
        updatedBy: 'current-user',
      };
      parameterDatabase.push(newParameter);
      resolve(newParameter);
    }, API_DELAY);
  });
}

/**
 * Update parameter
 */
export async function updateParameter(request: UpdateParameterRequest): Promise<Parameter> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = parameterDatabase.findIndex((p) => p.id === request.id);
      if (index === -1) {
        reject(new Error(`Parameter with id ${request.id} not found`));
        return;
      }

      const updatedParam: Parameter = {
        ...parameterDatabase[index],
        ...request,
        updatedAt: new Date().toISOString().split('T')[0],
        updatedBy: 'current-user',
      };
      parameterDatabase[index] = updatedParam;
      resolve(updatedParam);
    }, API_DELAY);
  });
}

/**
 * Delete parameter
 */
export async function deleteParameter(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = parameterDatabase.findIndex((p) => p.id === id);
      if (index === -1) {
        reject(new Error(`Parameter with id ${id} not found`));
        return;
      }
      parameterDatabase.splice(index, 1);
      resolve();
    }, API_DELAY);
  });
}

/**
 * Bulk update parameters (e.g., change status for multiple)
 */
export async function bulkUpdateParameters(request: BulkUpdateParametersRequest): Promise<Parameter[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updated = parameterDatabase.map((p) => {
        if (request.ids.includes(p.id)) {
          return {
            ...p,
            ...request,
            ids: undefined, // Remove ids from individual records
            updatedAt: new Date().toISOString().split('T')[0],
            updatedBy: 'current-user',
          } as Parameter;
        }
        return p;
      });

      const result = updated.filter((p) => request.ids.includes(p.id));
      resolve(result);
    }, API_DELAY);
  });
}

/**
 * Get parameter statistics
 */
export async function getParameterStats(): Promise<ParameterStats> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: parameterDatabase.length,
        active: parameterDatabase.filter((p) => p.status === 'active').length,
        inactive: parameterDatabase.filter((p) => p.status === 'inactive').length,
        byCategory: {
          system: parameterDatabase.filter((p) => p.category === 'system').length,
          notification: parameterDatabase.filter((p) => p.category === 'notification').length,
          sla: parameterDatabase.filter((p) => p.category === 'sla').length,
          ticket: parameterDatabase.filter((p) => p.category === 'ticket').length,
        },
        lastModified: new Date().toISOString(),
      });
    }, API_DELAY);
  });
}

/**
 * Export parameters to CSV
 */
export async function exportParametersToCSV(parameters: Parameter[]): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const headers = ['Anahtar', 'Değer', 'Açıklama', 'Kategori', 'Tip', 'Durum', 'Güncellenme'];
      const rows = parameters.map((p) => [p.key, p.value, p.description, p.category, p.type, p.status, p.updatedAt]);

      const csv = [headers, ...rows]
        .map((row) => row.map((cell) => `"${cell}"`).join(','))
        .join('\n');

      resolve(csv);
    }, API_DELAY);
  });
}
