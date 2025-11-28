// UI bileşenleri
export * from "./ui/UserCard";
export * from "./ui/TicketDistributionCard";
export * from "./ui/ProjectTeams";
export * from "./ui/ActiveProjects";
export * from "./ui/QuickActions";
export * from "./ui/SprintInfo"; // varsa

// Page
export * from "./pages/DashboardPage";

// Types re-exported from shared (for backward compatibility)
export type { 
  DashboardUserInfo as UserInfo,
  DashboardProject as Project,
  DashboardUserRole as UserRole,
  ProjectTeam,
} from "@/shared/types";
