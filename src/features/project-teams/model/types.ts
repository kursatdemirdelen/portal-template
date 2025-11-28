/**
 * Proje Ekipleri - Type Definitions
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  color: string;
}

export interface ProjectTeamDetail {
  id: string;
  name: string;
  projectName: string;
  projectId: string;
  description: string;
  leaderId: string;
  leaderName: string;
  leaderAvatar?: string;
  leaderColor: string;
  members: TeamMember[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectTeamListItem {
  id: string;
  name: string;
  projectName: string;
  leaderId: string;
  members: Array<{
    id: string;
    name: string;
    avatarUrl?: string;
    color: string;
  }>;
  memberCount: number;
}
