import React from "react";
import { Layout, Menu, Avatar, Dropdown, Space, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
import { UserOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useAuth } from "@/features/auth";
import { appRoutes } from "@/shared/config/routes";
import { layoutStyles } from "@/shared/styles/componentStyles";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useAppStore";
import { setSidebarCollapsed } from "@/shared/store/uiSlice";

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
  "Çalışma & Tatil",
  "Kullanıcılar",
  "Müşteri",
  "İşlemler",
  "Ayarlar",
  "Profil",
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const sidebarCollapsed = useAppSelector((state) => state.ui.sidebarCollapsed);

  const visibleRoutes = appRoutes
    .filter((route) => route.layout === "app" && route.showInMenu !== false)
    .filter((route) => (route.roles ? (user ? route.roles.includes(user.role) : false) : true));

  const groupedItems: Record<string, MenuGroupItem> = {};
  const rootItems: NonNullable<MenuProps["items"]> = [];
  const groupIcons: Record<string, React.ReactNode | undefined> = {};

  visibleRoutes.forEach((route) => {
    if (route.menuGroup && route.menuIcon && route.groupRoot) {
      const Icon = route.menuIcon;
      groupIcons[route.menuGroup] = Icon ? <Icon /> : undefined;
    }
  });

  visibleRoutes.forEach((route) => {
    const Icon = route.menuIcon;

    const item: MenuItem = {
      key: route.path,
      label: <Link to={route.path}>{route.label ?? route.path}</Link>,
      icon: Icon ? <Icon /> : undefined,
    };

    if (route.menuGroup) {
      if (!groupedItems[route.menuGroup]) {
        groupedItems[route.menuGroup] = {
          key: `group-${route.menuGroup}`,
          label: route.menuGroup,
          children: [],
          icon: groupIcons[route.menuGroup],
        } as MenuGroupItem;
      } else if (!groupedItems[route.menuGroup].icon) {
        groupedItems[route.menuGroup].icon = groupIcons[route.menuGroup];
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
    { key: "logout", icon: <LogoutOutlined />, label: "Çıkış Yap", danger: true },
  ];

  const handleUserMenuClick: MenuProps["onClick"] = (e) => {
    // TODO: Handle menu actions
    console.log("Menu item clicked:", e.key);
  };

  return (
    <Layout style={layoutStyles.appLayout.container}>
      <Sider
        breakpoint="lg"
        collapsedWidth={64}
        theme="dark"
        collapsed={sidebarCollapsed}
        onCollapse={(value) => dispatch(setSidebarCollapsed(value))}
      >
        <div style={layoutStyles.appLayout.sider.logo}>Portal</div>

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
        <Header style={layoutStyles.appLayout.header}>
          {user && (
            <Dropdown menu={{ items: userMenuItems, onClick: handleUserMenuClick }}>
              <Space size={12} style={{ cursor: "pointer", padding: "8px 12px", borderRadius: 8 }}>
                <Avatar
                  size={32}
                  icon={<UserOutlined />}
                  style={{ background: "linear-gradient(135deg, #5b7aed 0%, #6c5ce7 100%)" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text style={{ fontSize: 13, fontWeight: 600, color: "#2c3e50" }}>{user.name}</Text>
                  <Text
                    type="secondary"
                    style={{ fontSize: 11, textTransform: "capitalize", color: "#7f8c8d" }}
                  >
                    {user.role}
                  </Text>
                </div>
              </Space>
            </Dropdown>
          )}
        </Header>

        <Content style={layoutStyles.appLayout.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};
