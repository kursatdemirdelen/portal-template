import type { ComponentType } from "react";
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
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import { TicketsPage, NewTicketPage, TicketDetailPage } from "@/features/tickets";
import { ProjectsPage, ProjectTeamPage, ScrumBoardPage } from "@/features/projects";
import {
  AssignmentInfoPage,
  AssignmentsPage,
} from "@/features/assignments";
import { TimeTrackingPage } from "@/features/time-tracking";
import { LeavesPage } from "@/features/leaves";
import { LoginPage, LogoutPage } from "@/features/auth";
import { CustomersPage, CustomerDetailPage } from "@/features/customers";
import ParametersPage from "@/features/parameters/pages/ParametersPage";
import UsersPage from "@/features/users/pages/UsersPage";
import PermissionsPage from "@/features/permissions/pages/PermissionsPage";
import { ApprovalsPage } from "@/features/approvals";
import { LogsPage } from "@/features/logs";
import { ProfilePage } from "@/features/profile";
import { NotificationsPage } from "@/features/notifications";
import { ProjectTeamListPage, ProjectTeamDetailPage, ProjectTeamCreatePage, ProjectTeamEditPage } from "@/features/project-teams";
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

// TODO: Gerçek sayfalar eklendikçe placeholder rotalar gerçek bileşenlerle bağlanacak.
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
    path: "/parameters",
    label: "Ayarlar",
    component: ParametersPage,
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
