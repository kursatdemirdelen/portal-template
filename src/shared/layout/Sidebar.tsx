import React from "react";
import { Layout, Menu, Dropdown, Tooltip } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Settings,
  BellRing,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  User,
  Building2,
} from "lucide-react";
import type { MenuProps } from "antd";
import { useAuth } from "@/features/auth";
import { UserAvatar } from "@/shared/ui/UserAvatar";
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
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
    justifyContent: "center",
  },
  logoIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative" as const,
  },
  logoImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  menu: {
    flex: 1,
    overflow: "auto",
    padding: "0 8px",
  },
  footer: {
    marginTop: "auto",
    padding: "12px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
  },
  footerBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 0,
    borderRadius: 8,
    cursor: "pointer",
    color: "rgba(255,255,255,0.6)",
    transition: "all 0.15s",
    height: 40,
    width: "100%",
  },
  profileCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 0,
    borderRadius: 8,
    cursor: "pointer",
    transition: "all 0.2s ease",
    height: 40,
    width: "100%",
  },
};

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);
  const logoUrl = useAppSelector((s) => s.ui.logoUrl);
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);

  const toggle = () => dispatch(setSidebarCollapsed(!collapsed));

  // Build menu items from routes
  const visibleRoutes = appRoutes
    .filter((r) => r.layout === "app" && r.showInMenu !== false)
    .filter((r) =>
      r.roles ? (user ? r.roles.includes(user.role) : false) : true
    );

  const grouped: Record<
    string,
    { icon?: React.ReactNode; items: MenuProps["items"] }
  > = {};
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
      if (!grouped[route.menuGroup]) {
        grouped[route.menuGroup] = { items: [] };
      }
      if (route.groupRoot && Icon) {
        grouped[route.menuGroup]!.icon = <Icon size={16} />;
      }
      grouped[route.menuGroup]!.items!.push(item);
    } else {
      rootItems.push(item);
    }
  });

  const menuItems: MenuProps["items"] = [
    ...rootItems,
    ...Object.entries(grouped).map(([groupName, groupData]) => ({
      key: `group-${groupName}`,
      icon: groupData.icon,
      label: groupName,
      children: groupData.items,
    })),
  ];

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (!key.startsWith("g-")) navigate(key);
  };

  // User dropdown
  const userMenu: MenuProps["items"] = [
    { key: "profile", icon: <User size={16} />, label: "Profil" },
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
    else if (key === "notifications") navigate("/notifications");
  };

  return (
    <Sider
      width={220}
      collapsedWidth={64}
      collapsed={collapsed}
      style={styles.sider}
      trigger={null}
      collapsible
    >
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" style={styles.logoImage} />
            ) : (
              <Building2 size={24} color="#fff" />
            )}
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
            openKeys={openKeys}
            onOpenChange={setOpenKeys}
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
              overlayStyle={{ minWidth: 200 }}
            >
              <Tooltip title={collapsed ? user.name : ""} placement="right">
                <div
                  style={styles.profileCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <UserAvatar
                    size={32}
                    user={{
                      name: user.name,
                      avatar: user.avatar,
                    }}
                    backgroundColor="#334155"
                  />
                  {!collapsed && (
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          color: "#fff",
                          fontSize: 13,
                          fontWeight: 500,
                          lineHeight: "1.2",
                        }}
                      >
                        {user.name}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,0.45)",
                          fontSize: 11,
                          marginTop: 2,
                          textTransform: "capitalize",
                        }}
                      >
                        {user.role}
                      </div>
                    </div>
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
