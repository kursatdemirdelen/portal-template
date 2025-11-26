import React from "react";
import { Layout, Menu, Avatar, Dropdown, Badge, Tooltip } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Settings,
  BellRing,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  UserCircle,
  Building2,
  ChevronDown,
} from "lucide-react";
import type { MenuProps } from "antd";
import { useAuth } from "@/features/auth";
import { appRoutes } from "@/shared/config/routes";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useAppStore";
import { setSidebarCollapsed } from "@/shared/store/uiSlice";

const { Sider } = Layout;

// Styles
const styles = {
  sider: {
    background: "#0f172a",
    borderRight: "1px solid rgba(255,255,255,0.06)",
    position: "fixed" as const,
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
  },
  container: {
    display: "flex",
    flexDirection: "column" as const,
    height: "100%",
  },
  logo: {
    padding: "20px 16px",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    flex: 1,
    overflow: "auto",
    padding: "0 8px",
  },
  footer: {
    marginTop: "auto",
    padding: 12,
    borderTop: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    flexDirection: "column" as const,
    gap: 4,
  },
  footerBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 8,
    cursor: "pointer",
    color: "rgba(255,255,255,0.6)",
    transition: "all 0.15s",
  },
};

// Menu group order
const GROUP_ORDER = [
  "Dashboard",
  "Biletler",
  "Projeler",
  "Zimmetler",
  "Çalışma & Tatil",
  "Kullanıcılar",
  "Müşteri",
  "İşlemler",
  "Ayarlar",
];

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);

  const toggle = () => dispatch(setSidebarCollapsed(!collapsed));

  // Build menu items from routes
  const visibleRoutes = appRoutes
    .filter((r) => r.layout === "app" && r.showInMenu !== false)
    .filter((r) =>
      r.roles ? (user ? r.roles.includes(user.role) : false) : true
    );

  const grouped: Record<string, MenuProps["items"]> = {};
  const rootItems: MenuProps["items"] = [];

  visibleRoutes.forEach((route) => {
    const Icon = route.menuIcon as
      | React.ComponentType<{ size?: number }>
      | undefined;
    const item = {
      key: route.path,
      icon: Icon ? <Icon size={16} /> : undefined,
      label: route.label,
    };

    if (route.menuGroup) {
      if (!grouped[route.menuGroup]) grouped[route.menuGroup] = [];
      grouped[route.menuGroup]!.push(item);
    } else {
      rootItems.push(item);
    }
  });

  const menuItems: MenuProps["items"] = [...rootItems];
  GROUP_ORDER.forEach((group) => {
    const items = grouped[group];
    if (!items) return;
    if (items.length === 1) {
      menuItems.push(items[0]);
    } else {
      menuItems.push({
        key: `g-${group}`,
        label: group,
        children: items,
      });
    }
  });

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (!key.startsWith("g-")) navigate(key);
  };

  // User dropdown
  const userMenu: MenuProps["items"] = [
    { key: "profile", icon: <UserCircle size={16} />, label: "Profil" },
    {
      key: "notifications",
      icon: <BellRing size={16} />,
      label: "Bildirimler",
    },
    { key: "settings", icon: <Settings size={16} />, label: "Ayarlar" },
    { type: "divider" },
    { key: "logout", icon: <LogOut size={16} />, label: "Çıkış", danger: true },
  ];

  const handleUserMenu: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") navigate("/logout");
    else if (key === "profile") navigate("/profile");
  };

  return (
    <Sider
      width={220}
      collapsedWidth={64}
      collapsed={collapsed}
      style={styles.sider}
      trigger={null}
    >
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <Building2 size={18} color="#fff" />
          </div>
          {!collapsed && (
            <span style={{ color: "#fff", fontSize: 15, fontWeight: 600 }}>
              Portal
            </span>
          )}
        </div>

        {/* Menu */}
        <div style={styles.menu}>
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{ background: "transparent", border: "none" }}
            inlineIndent={16}
          />
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          {/* Collapse */}
          <Tooltip title={collapsed ? "Genişlet" : ""} placement="right">
            <div
              style={styles.footerBtn}
              onClick={toggle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {collapsed ? (
                <PanelLeft size={18} />
              ) : (
                <PanelLeftClose size={18} />
              )}
              {!collapsed && <span style={{ fontSize: 13 }}>Daralt</span>}
            </div>
          </Tooltip>

          {/* User */}
          {user && (
            <Dropdown
              menu={{ items: userMenu, onClick: handleUserMenu }}
              placement="topRight"
              trigger={["click"]}
              overlayStyle={{ minWidth: 180 }}
            >
              <Tooltip title={collapsed ? user.name : ""} placement="right">
                <div
                  style={{
                    ...styles.footerBtn,
                    background: "rgba(99,102,241,0.08)",
                    border: "1px solid rgba(99,102,241,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(99,102,241,0.15)";
                    e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(99,102,241,0.08)";
                    e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
                  }}
                >
                  <Badge count={3} size="small" offset={[-4, 4]}>
                    <Avatar
                      size={36}
                      src={user.avatar}
                      style={{
                        background: user.avatar
                          ? "transparent"
                          : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        flexShrink: 0,
                      }}
                    >
                      {!user.avatar && <UserCircle size={20} color="#fff" />}
                    </Avatar>
                  </Badge>
                  {!collapsed && (
                    <>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            color: "#fff",
                            fontSize: 13,
                            fontWeight: 500,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {user.name}
                        </div>
                        <div
                          style={{
                            color: "rgba(255,255,255,0.5)",
                            fontSize: 11,
                            textTransform: "capitalize",
                          }}
                        >
                          {user.role}
                        </div>
                      </div>
                      <ChevronDown
                        size={14}
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      />
                    </>
                  )}
                </div>
              </Tooltip>
            </Dropdown>
          )}
        </div>
      </div>
    </Sider>
  );
};

// Content styles export
export const contentStyles = {
  layout: {
    marginLeft: 220,
    minHeight: "100vh",
    background: "#f8fafc",
    transition: "margin-left 0.2s",
  },
  layoutCollapsed: {
    marginLeft: 64,
  },
  content: {
    padding: 20,
    minHeight: "100vh",
  },
};
