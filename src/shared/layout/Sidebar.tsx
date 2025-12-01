import React, { useEffect } from "react";
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
  X,
} from "lucide-react";
import type { MenuProps } from "antd";
import { useAuth } from "@/features/auth";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import { appRoutes } from "@/shared/config/routes";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useAppStore";
import {
  setSidebarCollapsed,
  setSidebarMobileOpen,
  setThemePreset,
} from "@/shared/store/uiSlice";
import {
  SIDEBAR_WIDTH,
  SIDEBAR_COLLAPSED_WIDTH,
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
  SIDEBAR_TRANSITION,
} from "./sidebarStyles";

const { Sider } = Layout;

// Custom hook for responsive behavior
const useResponsiveSidebar = () => {
  const dispatch = useAppDispatch();
  const [isMobile, setIsMobile] = React.useState(
    window.innerWidth < MOBILE_BREAKPOINT
  );
  const [isTablet, setIsTablet] = React.useState(
    window.innerWidth >= MOBILE_BREAKPOINT &&
      window.innerWidth < TABLET_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newIsMobile = width < MOBILE_BREAKPOINT;
      const newIsTablet =
        width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT;

      setIsMobile(newIsMobile);
      setIsTablet(newIsTablet);

      // Auto-collapse on tablet, close mobile drawer on desktop
      if (newIsMobile) {
        dispatch(setSidebarMobileOpen(false));
      } else if (newIsTablet) {
        dispatch(setSidebarCollapsed(true));
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return { isMobile, isTablet };
};

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
    transition: SIDEBAR_TRANSITION,
  },
  siderMobile: {
    transform: "translateX(-100%)",
  },
  siderMobileOpen: {
    transform: "translateX(0)",
  },
  overlay: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(2px)",
    zIndex: 99,
    opacity: 0,
    visibility: "hidden" as const,
    transition: "all 0.3s ease",
  },
  overlayVisible: {
    opacity: 1,
    visibility: "visible" as const,
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
    transition: SIDEBAR_TRANSITION,
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
    flexShrink: 0,
    transition: SIDEBAR_TRANSITION,
  },
  logoIconCollapsed: {
    width: 40,
    height: 40,
  },
  logoImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  logoText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    opacity: 1,
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    transition: "opacity 0.2s ease, width 0.3s ease",
  },
  logoTextHidden: {
    opacity: 0,
    width: 0,
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
  mobileCloseBtn: {
    position: "absolute" as const,
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    cursor: "pointer",
    color: "rgba(255,255,255,0.6)",
    background: "rgba(255,255,255,0.05)",
    transition: "all 0.15s",
  },
};

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);
  const mobileOpen = useAppSelector((s) => s.ui.sidebarMobileOpen);
  const logoUrl = useAppSelector((s) => s.ui.logoUrl);
  const themePreset = useAppSelector((s) => s.ui.themePreset);
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);

  const { isMobile } = useResponsiveSidebar();

  const toggle = () => dispatch(setSidebarCollapsed(!collapsed));
  const closeMobile = () => dispatch(setSidebarMobileOpen(false));
  const setPreset = (p: "default" | "slate" | "midnight" | "ocean") =>
    dispatch(setThemePreset(p));

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
    if (!key.startsWith("g-")) {
      navigate(key);
      // Close mobile drawer on navigation
      if (isMobile) closeMobile();
    }
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
    // Close mobile drawer
    if (isMobile) closeMobile();
  };

  // Calculate sidebar styles for mobile/desktop
  const getSiderStyle = () => {
    const base: React.CSSProperties = {
      ...styles.sider,
    } as React.CSSProperties;
    // Apply preset variables
    base.background = "var(--sidebar-bg)";
    base.borderRight = `1px solid var(--sidebar-border)`;
    if (isMobile) {
      return {
        ...base,
        ...styles.siderMobile,
        ...(mobileOpen ? styles.siderMobileOpen : {}),
      };
    }
    return base;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && (
        <div
          style={{
            ...styles.overlay,
            ...(mobileOpen ? styles.overlayVisible : {}),
          }}
          onClick={closeMobile}
        />
      )}

      <Sider
        width={SIDEBAR_WIDTH}
        collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}
        collapsed={isMobile ? false : collapsed}
        style={getSiderStyle()}
        trigger={null}
        collapsible
      >
        <div style={styles.container}>
          {/* Mobile close button */}
          {isMobile && mobileOpen && (
            <div
              style={styles.mobileCloseBtn}
              onClick={closeMobile}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
              }
            >
              <X size={18} />
            </div>
          )}

          {/* Logo */}
          <div style={styles.logo}>
            <div
              style={{
                ...styles.logoIcon,
                ...(collapsed && !isMobile ? styles.logoIconCollapsed : {}),
              }}
            >
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" style={styles.logoImage} />
              ) : (
                <Building2
                  size={collapsed && !isMobile ? 20 : 24}
                  color="#fff"
                />
              )}
            </div>
            <span
              style={{
                ...styles.logoText,
                ...(collapsed && !isMobile ? styles.logoTextHidden : {}),
              }}
            >
              Portal
            </span>
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
            {/* Theme preset dropdown */}
            <Dropdown
              placement="top"
              trigger={["click"]}
              menu={{
                items: [
                  { key: "default", label: "Default" },
                  { key: "slate", label: "Slate" },
                  { key: "midnight", label: "Midnight" },
                  { key: "ocean", label: "Ocean" },
                ],
                onClick: ({ key }) =>
                  setPreset(key as "default" | "slate" | "midnight" | "ocean"),
              }}
            >
              <Tooltip
                title={collapsed ? "Tema" : ""}
                placement={collapsed ? "right" : "top"}
              >
                <div
                  style={{
                    ...styles.footerBtn,
                    height: 36,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.08)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.04)")
                  }
                >
                  {/* Nice icon when collapsed */}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    {/* Palette icon for theme */}
                    {/* Reuse Building2 if Palette is not imported */}
                    <span style={{ display: "inline-flex" }}>
                      {/* Placeholder circle to avoid import changes */}
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: 999,
                          background: "#fff",
                          opacity: 0.85,
                          display: "inline-block",
                        }}
                      />
                    </span>
                    {!collapsed && (
                      <span style={{ fontSize: 12, opacity: 0.9 }}>
                        {themePreset.charAt(0).toUpperCase() +
                          themePreset.slice(1)}
                      </span>
                    )}
                  </span>
                </div>
              </Tooltip>
            </Dropdown>
            {/* Collapse - only show on desktop */}
            {!isMobile && (
              <Tooltip title={collapsed ? "Genişlet" : ""} placement="right">
                <div
                  style={styles.footerBtn}
                  onClick={toggle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.05)")
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
            )}

            {/* User */}
            {user && (
              <Dropdown
                menu={{ items: userMenu, onClick: handleUserMenu }}
                placement="topRight"
                trigger={["click"]}
                overlayStyle={{ minWidth: 200 }}
              >
                <Tooltip
                  title={collapsed && !isMobile ? user.name : ""}
                  placement="right"
                >
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
                    {(!collapsed || isMobile) && (
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
    </>
  );
};
