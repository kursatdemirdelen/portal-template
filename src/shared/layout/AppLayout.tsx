import React from "react";
import { Layout, Menu, Avatar, Dropdown, Space, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
import { UserOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { appRoutes } from "@/shared/config/routes";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

type MenuItem = Required<MenuProps>["items"][number];
type MenuItemWithChildren = Extract<MenuItem, { children?: MenuProps["items"] }>;
type MenuGroupItem = MenuItemWithChildren & { icon?: React.ReactNode };

const GROUP_ORDER: string[] = [
  "Dashboard",
  "Biletler",
  "Projeler",
  "Zimmetler",
  "\u00c7al\u0131\u015fma & Tatil",
  "Kullan\u0131c\u0131lar",
  "M\u00fc\u015fteri",
  "\u0130\u015flemler",
  "Ayarlar",
  "Profil",
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const visibleRoutes = appRoutes
    .filter((route) => route.layout === "app" && route.showInMenu !== false)
    .filter((route) => (route.roles ? (user ? route.roles.includes(user.role) : false) : true));

  const groupedItems: Record<string, MenuGroupItem> = {};
  const rootItems: NonNullable<MenuProps["items"]> = [];
  const groupIcons: Record<string, React.ReactNode | undefined> = {};

  visibleRoutes.forEach((route) => {
    if (route.menuGroup && route.menuIcon && route.groupRoot) {
      groupIcons[route.menuGroup] = route.menuIcon;
    }
  });

  visibleRoutes.forEach((route) => {
    const item: MenuItem = {
      key: route.path,
      label: <Link to={route.path}>{route.label ?? route.path}</Link>,
      icon: route.menuIcon,
    };

    if (route.menuGroup) {
      if (!groupedItems[route.menuGroup]) {
        groupedItems[route.menuGroup] = {
          key: `group-${route.menuGroup}`,
          label: route.menuGroup,
          children: [],
          icon: groupIcons[route.menuGroup] ?? route.menuIcon,
        } as MenuGroupItem;
      } else if (!groupedItems[route.menuGroup].icon) {
        groupedItems[route.menuGroup].icon = groupIcons[route.menuGroup] ?? route.menuIcon;
      }

      const children = groupedItems[route.menuGroup].children || [];
      children.push(item);
      groupedItems[route.menuGroup].children = children;
    } else {
      rootItems.push(item);
    }
  });

  const menuItems: MenuProps["items"] = [
    ...rootItems,
    ...GROUP_ORDER.filter((group) => groupedItems[group]).map((group) => groupedItems[group]),
  ];

  const selectedGroupKey = visibleRoutes.find((route) => route.path === location.pathname)?.menuGroup;
  const defaultOpenKeys = selectedGroupKey ? [`group-${selectedGroupKey}`] : [];

  const userMenuItems: MenuProps["items"] = [
    { key: "profile", icon: <UserOutlined />, label: "Profil" },
    { key: "settings", icon: <SettingOutlined />, label: "Ayarlar" },
    { type: "divider" },
    { key: "logout", icon: <LogoutOutlined />, label: "\u00c7\u0131k\u0131\u015f Yap", danger: true },
  ];

  const handleUserMenuClick: MenuProps["onClick"] = (e) => {
    // TODO: Handle menu actions
    console.log("Menu item clicked:", e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "transparent" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth={64}
        theme="dark"
        style={{
          background: "linear-gradient(180deg, #2c3e50 0%, #263648 100%)",
          borderRight: "1px solid #34495e",
          boxShadow: "4px 0 12px rgba(0,0,0,0.18)",
        }}
      >
        <div
          style={{
            height: 56,
            margin: 12,
            color: "#ecf0f1",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            fontSize: 18,
            letterSpacing: 0.6,
            paddingInline: 4,
            borderRadius: 10,
            background: "rgba(255,255,255,0.06)",
          }}
        >
          Portal
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={defaultOpenKeys}
          items={menuItems}
          style={{ background: "transparent", paddingInline: 8, paddingBottom: 12 }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#ffffff",
            paddingInline: 20,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
            borderBottom: "1px solid #e8eefb",
          }}
        >
          {user && (
            <Dropdown menu={{ items: userMenuItems, onClick: handleUserMenuClick }}>
              <Space size={12} style={{ cursor: "pointer", padding: "8px 12px", borderRadius: 8 }}>
                <Avatar
                  size={32}
                  icon={<UserOutlined />}
                  style={{ background: "linear-gradient(135deg, #5b7aed 0%, #6c5ce7 100%)" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text style={{ fontSize: 13, fontWeight: 600, color: "#2c3e50" }}>
                    {user.name}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 11, textTransform: "capitalize", color: "#7f8c8d" }}>
                    {user.role}
                  </Text>
                </div>
              </Space>
            </Dropdown>
          )}
        </Header>

        <Content style={{ margin: 16, padding: 0, background: "#f8f9fa" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};
