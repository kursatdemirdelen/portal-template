/**
 * Project Domain Types
 * =====================
 * 
 * Tüm projede kullanılacak proje ile ilgili TypeScript type'ları.
 * 
 * @module shared/types/project
 */

// =============================================================================
// TEMEL ENUMLAR / TİPLER
// =============================================================================

/**
 * Proje durumları
 */
export type ProjectStatus = 'Active' | 'On Hold' | 'Completed' | 'Planning';

/**
 * Proje ilerleme durumu (dashboard için)
 */
export type ProjectProgressStatus = 'On Track' | 'At Risk' | 'Planning' | 'Delayed';

/**
 * Proje durum renklendirilmesi
 */
export const projectStatusColorMap: Record<ProjectStatus, string> = {
  'Active': '#2563eb',      // Mavi - Devam Ediyor
  'Completed': '#10b981',   // Yeşil - Tamamlandı
  'On Hold': '#f59e0b',     // Turuncu - Beklemede
  'Planning': '#6b7280',    // Gri - Planlama
};

/**
 * Proje ilerleme durumu renklendirilmesi
 */
export const projectProgressStatusColorMap: Record<ProjectProgressStatus, string> = {
  'On Track': '#10b981',    // Yeşil
  'At Risk': '#f59e0b',     // Turuncu
  'Planning': '#6b7280',    // Gri
  'Delayed': '#ef4444',     // Kırmızı
};

// =============================================================================
// ANA ENTITY TİPLERİ
// =============================================================================

/**
 * Basit proje referansı (select/dropdown için)
 */
export interface ProjectOption {
  id: string;
  label: string;
  value: string;
}

/**
 * Tam proje entity'si
 */
export interface Project {
  id: string;
  name: string;
  code: string;
  status: ProjectStatus;
  progress: number;
  teamSize: number;
  startDate: string;
  endDate: string;
  description: string;
  manager: string;
  customer: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Dashboard aktif proje kartı için
 */
export interface DashboardProject {
  name: string;
  code: string;
  progress: number;
  status: ProjectProgressStatus | string;
}

// =============================================================================
// EKİP TİPLERİ
// =============================================================================

/**
 * Ekip üyesi
 */
export interface ProjectTeamMember {
  name: string;
  initials: string;
  color: string;
}

/**
 * Proje ekibi
 */
export interface ProjectTeam {
  id: string;
  name: string;
  projectName: string;
  role: string;
  members: number;
  status: 'Aktif' | 'Beklemede' | 'Tamamlandı';
  people: ProjectTeamMember[];
}

// =============================================================================
// API REQUEST TİPLERİ
// =============================================================================

export interface GetProjectsRequest {
  page?: number;
  limit?: number;
  search?: string;
  status?: ProjectStatus;
}

export interface CreateProjectRequest {
  name: string;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  teamSize?: number;
}

export interface UpdateProjectRequest {
  id: string;
  name?: string;
  code?: string;
  status?: ProjectStatus;
  progress?: number;
  description?: string;
}

// =============================================================================
// API RESPONSE TİPLERİ
// =============================================================================

export interface GetProjectsResponse {
  data: Project[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateProjectResponse {
  id: string;
  message: string;
  project: Project;
}

export interface UpdateProjectResponse {
  message: string;
  project: Project;
}

/**
 * Proje istatistikleri özeti
 */
export interface ProjectStats {
  total: number;
  active: number;
  onHold: number;
  completed: number;
}
