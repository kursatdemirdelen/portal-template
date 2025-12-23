import React, { type ComponentType } from "react";
import {
  LayoutDashboard,
  Ticket,
  FolderKanban,
  Users,
  Calendar,
  Package,
  Building,
  CheckSquare,
  FileText,
  User,
  Cog,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
// Route components are lazy-loaded to enable code-splitting
const DashboardPage = React.lazy(() => import("@/features/dashboard/pages/DashboardPage"));
const TicketsPage = React.lazy(() => import("@/features/tickets/pages/TicketsPage"));
const NewTicketPage = React.lazy(() => import("@/features/tickets/pages/NewTicketPage"));
const TicketDetailPage = React.lazy(() => import("@/features/tickets/pages/TicketDetailPage"));

const ProjectsPage = React.lazy(() => import("@/features/projects/pages/ProjectsPage"));
const ProjectDetailPage = React.lazy(() => import("@/features/projects/pages/ProjectDetailPage"));
const ProjectTeamPage = React.lazy(() => import("@/features/projects/pages/ProjectTeamPage"));
const ScrumBoardPage = React.lazy(() => import("@/features/projects/pages/ScrumBoardPage"));

const AssignmentsPage = React.lazy(() => import("@/features/assignments/pages/AssignmentsPage"));
const AssignmentInfoPage = React.lazy(() => import("@/features/assignments/pages/AssignmentInfoPage"));

const TimeTrackingPage = React.lazy(() => import("@/features/time-tracking/pages/TimeTrackingPage"));
const LeavesPage = React.lazy(() => import("@/features/leaves/pages/LeavesPage"));

const LoginPage = React.lazy(() => import("@/features/auth/pages/LoginPage"));
const LogoutPage = React.lazy(() => import("@/features/auth/pages/LogoutPage"));

const CustomersPage = React.lazy(() => import("@/features/customers/pages/CustomersPage"));
const CustomerDetailPage = React.lazy(() =>
  import("@/features/customers/pages/CustomerDetailPage").then((m) => ({ default: m.CustomerDetailPage }))
);

const SettingsPage = React.lazy(() => import("@/features/settings/pages/SettingsPage"));

const UsersPage = React.lazy(() => import("@/features/users/pages/UsersPage"));
const PermissionsPage = React.lazy(() => import("@/features/permissions/pages/PermissionsPage"));

const ApprovalsPage = React.lazy(() => import("@/features/approvals/pages/ApprovalsPage"));
const LogsPage = React.lazy(() => import("@/features/logs/pages/LogsPage"));
const ProfilePage = React.lazy(() => import("@/features/profile/pages/ProfilePage"));
const NotificationsPage = React.lazy(() =>
  import("@/features/notifications/pages/NotificationsPage").then((m) => ({ default: m.NotificationsPage }))
);

const ProjectTeamListPage = React.lazy(() => import("@/features/project-teams/pages/ProjectTeamListPage"));
const ProjectTeamDetailPage = React.lazy(() => import("@/features/project-teams/pages/ProjectTeamDetailPage"));
const ProjectTeamCreatePage = React.lazy(() => import("@/features/project-teams/pages/ProjectTeamCreatePage"));
const ProjectTeamEditPage = React.lazy(() => import("@/features/project-teams/pages/ProjectTeamEditPage"));
import type { Role } from "./roles";

export type LayoutType = "app" | "auth";

export interface AppRoute {
  path: string;
  label?: string;
  component: ComponentType;
  layout: LayoutType;
  roles?: Role[];
  showInMenu?: boolean;
  menuGroup?: string;
  menuIcon?: ComponentType;
  groupRoot?: boolean;
}

// Uygulamanın rota konfigürasyonu
// Tüm sayfalar implement edilmiş ve komponentleriyle bağlı
export const appRoutes: AppRoute[] = [
  {
    path: "/login",
    label: "Giriş Yap",
    component: LoginPage,
    layout: "auth",
    showInMenu: false,
  },
  {
    path: "/dashboard",
    label: "Dashboard",
    component: DashboardPage,
    layout: "app",
    roles: ["admin", "worker", "user"],
    showInMenu: true,
    menuIcon: LayoutDashboard,
  },
  {
    path: "/tickets/create",
    label: "Bilet Oluştur",
    component: NewTicketPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: false,
  },
  {
    path: "/tickets/:id",
    label: "Bilet Detay",
    component: TicketDetailPage,
    layout: "app",
    roles: ["admin", "worker", "user"],
    showInMenu: false,
  },
  {
    path: "/tickets",
    label: "Biletler",
    component: TicketsPage,
    layout: "app",
    roles: ["admin", "worker", "user"],
    showInMenu: true,
    menuIcon: Ticket,
  },
  {
    path: "/customers",
    label: "Müşteriler",
    component: CustomersPage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
    menuIcon: Building,
  },
  {
    path: "/customers/:id",
    label: "Müşteri Detay",
    component: CustomerDetailPage,
    layout: "app",
    roles: ["admin"],
    showInMenu: false,
  },
  {
    path: "/settings",
    label: "Ayarlar",
    component: SettingsPage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
    menuIcon: Cog,
  },
  {
    path: "/projects",
    label: "Projeler",
    component: ProjectsPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuIcon: FolderKanban,
  },
  {
    path: "/projects/:id",
    label: "Proje Detayı",
    component: ProjectDetailPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: false,
  },
  {
    path: "/project-teams",
    label: "Proje Ekipleri",
    component: ProjectTeamListPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuIcon: UsersRound,
  },
  {
    path: "/project-teams/create",
    label: "Proje Ekibi Oluştur",
    component: ProjectTeamCreatePage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: false,
  },
  {
    path: "/project-teams/:id",
    label: "Proje Ekip Detayı",
    component: ProjectTeamDetailPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: false,
  },
  {
    path: "/project-teams/:id/edit",
    label: "Proje Ekibi Düzenle",
    component: ProjectTeamEditPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: false,
  },
  {
    path: "/project-team",
    label: "Proje Ekibi",
    component: ProjectTeamPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: false,
  },
  {
    path: "/scrum-board",
    label: "Scrum Board",
    component: ScrumBoardPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: false,
  },
  {
    path: "/users",
    label: "Kullanıcılar",
    component: UsersPage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
    menuIcon: Users,
  },
  {
    path: "/permissions",
    label: "Yetkilendirme",
    component: PermissionsPage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
    menuIcon: ShieldCheck,
  },
  {
    path: "/assignments",
    label: "Zimmetler",
    component: AssignmentsPage,
    layout: "app",
    roles: ["admin", "worker", "user"],
    showInMenu: true,
    menuIcon: Package,
  },
  {
    path: "/assignments/info",
    label: "Zimmet Bilgileri",
    component: AssignmentInfoPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: false,
  },
  {
    path: "/approvals",
    label: "Onay Süreçleri",
    component: ApprovalsPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuIcon: CheckSquare,
  },
  {
    path: "/time-tracking",
    label: "Puantaj",
    component: TimeTrackingPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuIcon: Calendar,
  },
  {
    path: "/leaves",
    label: "Tatil Bilgileri",
    component: LeavesPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuIcon: Calendar,
  },
  {
    path: "/logs",
    label: "Logs",
    component: LogsPage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
    menuIcon: FileText,
  },
  {
    path: "/profile",
    label: "Profil",
    component: ProfilePage,
    layout: "app",
    roles: ["admin", "worker", "user"],
    showInMenu: false,
    menuGroup: "Profil",
    menuIcon: User,
    groupRoot: true,
  },
  {
    path: "/logout",
    label: "Çıkış",
    component: LogoutPage,
    layout: "app",
    roles: ["admin", "worker", "user"],
    showInMenu: false,
    menuGroup: "Profil",
    menuIcon: User,
  },
  {
    path: "/notifications",
    label: "Bildirimler",
    component: NotificationsPage,
    layout: "app",
    roles: ["admin", "worker", "user"],
    showInMenu: false,
  },
];
