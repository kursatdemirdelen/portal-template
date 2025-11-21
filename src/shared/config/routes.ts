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
} from "@ant-design/icons";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import { TicketsPage } from "@/features/tickets";
import { ProjectsPage } from "@/features/projects";
import {
  AssignmentInfoPage,
  AssignmentsPage,
} from "@/features/assignments";
import { TimeTrackingPage } from "@/features/time-tracking";
import { LeavesPage } from "@/features/leaves";
import { LoginPage } from "@/features/auth";
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
} from "@/features/placeholders";
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
    label: "Bilet Olu\u015ftur",
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
    label: "M\u00fc\u015fteri",
    component: CustomersPage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
    menuGroup: "M\u00fc\u015fteri",
    menuIcon: CustomerServiceOutlined,
    groupRoot: true,
  },
  {
    path: "/parameters",
    label: "Parametreler Y\u00f6netimi",
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
    label: "Kullan\u0131c\u0131 Listesi",
    component: UsersPage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
    menuGroup: "Kullan\u0131c\u0131lar",
    menuIcon: TeamOutlined,
    groupRoot: true,
  },
  {
    path: "/users/create",
    label: "Kullan\u0131c\u0131 Olu\u015ftur",
    component: UserCreatePage,
    layout: "app",
    roles: ["admin"],
    showInMenu: true,
    menuGroup: "Kullan\u0131c\u0131lar",
    menuIcon: TeamOutlined,
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
    label: "Onay S\u00fcre\u00e7leri",
    component: ApprovalsPage,
    layout: "app",
    roles: ["admin", "worker"],
    showInMenu: true,
    menuGroup: "\u0130\u015flemler",
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
    menuGroup: "\u00c7al\u0131\u015fma & Tatil",
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
    menuGroup: "\u00c7al\u0131\u015fma & Tatil",
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
    showInMenu: true,
    menuGroup: "Profil",
    menuIcon: ProfileOutlined,
    groupRoot: true,
  },
  {
    path: "/logout",
    label: "\u00c7\u0131k\u0131\u015f",
    component: LogoutPage,
    layout: "app",
    roles: ["admin", "worker", "user"],
    showInMenu: true,
    menuGroup: "Profil",
    menuIcon: ProfileOutlined,
  },
  {
    path: "/login",
    label: "Giri\u015f",
    component: EmptyPage,
    layout: "auth",
    showInMenu: false,
  },
];
