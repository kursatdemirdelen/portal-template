import type { ComponentType } from "react";
import type { Role } from "./roles";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import TicketsPage from "@/features/tickets/pages/TicketsPage";
import ProjectsPage from "@/features/projects/pages/ProjectsPage";
import AssignmentInfoPage from "@/features/assignments/pages/AssignmentInfoPage";
import TimeTrackingPage from "@/features/time-tracking/pages/TimeTrackingPage";
import LeaveInfoPage from "@/features/leaves/pages/LeaveInfoPage";
import {
  TicketsCreatePage,
  CustomersPage,
  ParametersPage,
  ProjectTeamPage,
  ScrumBoardPage,
  UsersPage,
  UserCreatePage,
  ApprovalsPage,
  LogsPage,
  ProfilePage,
  LogoutPage,
} from "@/features/placeholders/pages/PlaceholderPages";

export type LayoutType = "app" | "auth";

export interface AppRoute {
  path: string;
  label?: string;
  component: ComponentType;
  layout: LayoutType;
  roles?: Role[];
  showInMenu?: boolean;
  menuGroup?: string;
}

const EmptyPage: ComponentType = () => null;
// TODO: Gerçek sayfalar eklendikçe placeholder rotalar gerçek bileşenlerle bağlanacak.

export const appRoutes: AppRoute[] = [
  {
    path: "/dashboard",
    label: "Dashboard",
    component: DashboardPage,
    layout: "app",
    roles: ["admin", "worker", "user"],
    showInMenu: true,
  },
  {
    path: "/tickets/create",
    label: "Bilet Oluştur",
    component: TicketsCreatePage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuGroup: "Biletler",
  },
  {
    path: "/tickets",
    label: "Biletler",
    component: TicketsPage,
    layout: "app",
    roles: ["admin", "worker", "user"],
    showInMenu: true,
    menuGroup: "Biletler",
  },
  {
    path: "/customers",
    label: "Müşteri",
    component: CustomersPage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
    menuGroup: "Müşteri",
  },
  {
    path: "/parameters",
    label: "Parametreler Yönetimi",
    component: ParametersPage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
    menuGroup: "Ayarlar",
  },
  {
    path: "/projects",
    label: "Projeler",
    component: ProjectsPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuGroup: "Projeler",
  },
  {
    path: "/project-team",
    label: "Proje Ekibi",
    component: ProjectTeamPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuGroup: "Projeler",
  },
  {
    path: "/scrum-board",
    label: "Scrum Board",
    component: ScrumBoardPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuGroup: "Projeler",
  },
  {
    path: "/users",
    label: "Kullanıcı Listesi",
    component: UsersPage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
    menuGroup: "Kullanıcılar",
  },
  {
    path: "/users/create",
    label: "Kullanıcı Oluştur",
    component: UserCreatePage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
    menuGroup: "Kullanıcılar",
  },
  {
    path: "/assignments/info",
    label: "Zimmet Bilgileri",
    component: AssignmentInfoPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuGroup: "Zimmetler",
  },
  {
    path: "/approvals",
    label: "Onay Süreçleri",
    component: ApprovalsPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuGroup: "İşlemler",
  },
  {
    path: "/time-tracking",
    label: "Puantaj",
    component: TimeTrackingPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuGroup: "Çalışma & Tatil",
  },
  {
    path: "/leaves",
    label: "Tatil Bilgileri",
    component: LeaveInfoPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuGroup: "Çalışma & Tatil",
  },
  {
    path: "/logs",
    label: "Logs",
    component: LogsPage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
  },
  {
    path: "/profile",
    label: "Profil",
    component: ProfilePage,
    layout: "app",
    roles: ["admin", "worker", "user"],
    showInMenu: true,
    menuGroup: "Profil",
  },
  {
    path: "/logout",
    label: "Çıkış",
    component: LogoutPage,
    layout: "app",
    roles: ["admin", "worker", "user"],
    showInMenu: true,
    menuGroup: "Profil",
  },
  {
    path: "/login",
    label: "Giriş",
    component: EmptyPage,
    layout: "auth",
    showInMenu: false,
  },
];
