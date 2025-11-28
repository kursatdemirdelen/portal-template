/**
 * Projects Feature - Type Definitions
 * ====================================
 * 
 * Bu dosya, Projects feature'ının TypeScript type'larını içerir.
 * Temel tipler @/shared/types'dan import edilir.
 */

// Shared types'dan re-export
export type { 
  ProjectStatus, 
  Project, 
  ProjectOption,
  DashboardProject,
  ProjectTeam,
  ProjectTeamMember,
  GetProjectsRequest,
  CreateProjectRequest,
  UpdateProjectRequest,
  GetProjectsResponse,
  CreateProjectResponse,
  UpdateProjectResponse,
  ProjectStats,
} from '@/shared/types';
