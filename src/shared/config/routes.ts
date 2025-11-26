import type { ComponentType } from "react";
import {
  DashboardOutlined,
  TagsOutlined,
  FolderOpenOutlined,
  TeamOutlined,
  CalendarOutlined,
  SolutionOutlined,
  CustomerServiceOutlined,
  ToolOutlined,
  ProfileOutlined,
  SettingOutlined,
  LockOutlined,
} from "@ant-design/icons";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import { TicketsPage, TicketsCreatePage } from "@/features/tickets";
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
    menuIcon: DashboardOutlined,
    groupRoot: true,
  },
  {
    path: "/tickets/create",
    label: "Bilet Oluştur",
    component: TicketsCreatePage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuGroup: "Biletler",
    menuIcon: TagsOutlined,
  },
  {
    path: "/tickets",
    label: "Biletler",
    component: TicketsPage,
    layout: "app",
    roles: ["admin", "worker", "user"],
    showInMenu: true,
    menuGroup: "Biletler",
    menuIcon: TagsOutlined,
    groupRoot: true,
  },
  {
    path: "/customers",
    label: "Müşteri",
    component: CustomersPage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
    menuGroup: "Müşteri",
    menuIcon: CustomerServiceOutlined,
    groupRoot: true,
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
    label: "Parametreler Yönetimi",
    component: ParametersPage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
    menuGroup: "Ayarlar",
    menuIcon: SettingOutlined,
    groupRoot: true,
  },
  {
    path: "/projects",
    label: "Projeler",
    component: ProjectsPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuGroup: "Projeler",
    menuIcon: FolderOpenOutlined,
    groupRoot: true,
  },
  {
    path: "/project-team",
    label: "Proje Ekibi",
    component: ProjectTeamPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuGroup: "Projeler",
    menuIcon: FolderOpenOutlined,
  },
  {
    path: "/scrum-board",
    label: "Scrum Board",
    component: ScrumBoardPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuGroup: "Projeler",
    menuIcon: FolderOpenOutlined,
  },
  {
    path: "/users",
    label: "Kullanıcılar",
    component: UsersPage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
    menuIcon: TeamOutlined,
    groupRoot: true,
  },
  {
    path: "/permissions",
    label: "Yetkilendirme",
    component: PermissionsPage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
    menuIcon: LockOutlined,
    groupRoot: true,
  },
  {
    path: "/parameters",
    label: "Parametreler",
    component: ParametersPage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
    menuIcon: SettingOutlined,
    groupRoot: true,
  },
  {
    path: "/assignments",
    label: "Zimmetler",
    component: AssignmentsPage,
    layout: "app",
    roles: ["admin", "worker", "user"],
    showInMenu: true,
    menuGroup: "Zimmetler",
    menuIcon: SolutionOutlined,
    groupRoot: true,
  },
  {
    path: "/assignments/info",
    label: "Zimmet Bilgileri",
    component: AssignmentInfoPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuGroup: "Zimmetler",
    menuIcon: SolutionOutlined,
  },
  {
    path: "/approvals",
    label: "Onay Süreçleri",
    component: ApprovalsPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuGroup: "İşlemler",
    menuIcon: ToolOutlined,
    groupRoot: true,
  },
  {
    path: "/time-tracking",
    label: "Puantaj",
    component: TimeTrackingPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuGroup: "Çalışma & Tatil",
    menuIcon: CalendarOutlined,
    groupRoot: true,
  },
  {
    path: "/leaves",
    label: "Tatil Bilgileri",
    component: LeavesPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuGroup: "Çalışma & Tatil",
    menuIcon: CalendarOutlined,
  },
  {
    path: "/logs",
    label: "Logs",
    component: LogsPage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
    menuIcon: ToolOutlined,
  },
  {
    path: "/profile",
    label: "Profil",
    component: ProfilePage,
    layout: "app",
    roles: ["admin", "worker", "user"],
    showInMenu: false,
    menuGroup: "Profil",
    menuIcon: ProfileOutlined,
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
    menuIcon: ProfileOutlined,
  },
];
